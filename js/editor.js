// 刘晓欣学术网站 - 编辑器 & 评论逻辑

const Editor = {
  getData(key) { const r = localStorage.getItem(key); return r ? JSON.parse(r) : null; },
  saveData(key, data) { localStorage.setItem(key, JSON.stringify(data)); },

  getViewsData() {
    const local = this.getData('views_data');
    if (local && local.modules) return local;
    const initial = { modules: VIEWS_DATA.modules.map(m => ({...m})), versions: [] };
    this.saveData('views_data', initial);
    return initial;
  },

  saveViews(data, action, moduleId) {
    const snapshot = data.modules.find(m => m.id === moduleId);
    if (!data.versions) data.versions = [];
    data.versions.push({ timestamp: Date.now(), action, module: moduleId, snapshot: snapshot ? {...snapshot} : null });
    this.saveData('views_data', data);
    showToast('保存成功');
  },

  addModule(data) {
    const id = 'custom_' + Date.now();
    data.modules.push({ id, title: '新模块', subtitle: '', summary: '请编辑此模块的内容', detail: '', papers: [], order: data.modules.length + 1 });
    this.saveViews(data, 'add', id);
    return data;
  },

  async deleteModule(data, moduleId) {
    const ok = await showConfirm('确定删除此模块？此操作可通过版本历史恢复。');
    if (!ok) return null;
    const mod = data.modules.find(m => m.id === moduleId);
    data.versions.push({ timestamp: Date.now(), action: 'delete', module: moduleId, snapshot: mod ? {...mod} : null });
    data.modules = data.modules.filter(m => m.id !== moduleId);
    this.saveData('views_data', data);
    showToast('已删除');
    return data;
  },

  async rollback(data, version) {
    const ok = await showConfirm(`确定回滚到 ${formatTimestamp(version.timestamp)} 的版本？`);
    if (!ok) return null;
    if (version.action === 'delete' && version.snapshot) data.modules.push(version.snapshot);
    else if (version.action === 'add') data.modules = data.modules.filter(m => m.id !== version.module);
    else if (version.snapshot) {
      const idx = data.modules.findIndex(m => m.id === version.module);
      if (idx >= 0) data.modules[idx] = {...version.snapshot};
      else data.modules.push({...version.snapshot});
    }
    data.versions.push({ timestamp: Date.now(), action: 'rollback', module: version.module, snapshot: version.snapshot });
    this.saveData('views_data', data);
    showToast('已回滚');
    return data;
  },

  showVersionHistory(data) {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay active';
    const versions = (data.versions || []).slice().reverse();
    const actionLabel = { edit: '编辑', add: '新增', delete: '删除', rollback: '回滚' };
    overlay.innerHTML = `
      <div class="modal">
        <div class="flex-between mb-16">
          <h3 style="margin:0;">版本历史</h3>
          <button class="edit-icon" onclick="this.closest('.modal-overlay').remove()">✕</button>
        </div>
        <div class="version-list">
          ${versions.length === 0 ? '<p class="text-light text-sm">暂无历史记录</p>' :
            versions.map((v, i) => `
              <div class="version-item" data-idx="${i}">
                <div class="ts">${formatTimestamp(v.timestamp)}</div>
                <div class="action">${actionLabel[v.action] || v.action} · ${v.module}</div>
              </div>
            `).join('')}
        </div>
      </div>`;
    document.body.appendChild(overlay);
    overlay.querySelectorAll('.version-item').forEach((el, i) => {
      el.addEventListener('click', async () => {
        overlay.remove();
        const result = await Editor.rollback(data, versions[i]);
        if (result && typeof renderViews === 'function') renderViews(result);
      });
    });
  },

  exportData() {
    const data = { views: this.getData('views_data'), news: this.getData('news_data'), paperMods: this.getData('papers_mods'), comments: this.getData('all_comments'), customPapers: this.getData('custom_papers'), photos: this.getData('photos_data') };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `刘晓欣学术网站_数据备份_${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('导出成功');
  },

  importData(callback) {
    const input = document.createElement('input');
    input.type = 'file'; input.accept = '.json';
    input.onchange = async (e) => {
      const file = e.target.files[0]; if (!file) return;
      const ok = await showConfirm('导入将覆盖当前所有数据，确定继续？');
      if (!ok) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const data = JSON.parse(ev.target.result);
          if (data.views) this.saveData('views_data', data.views);
          if (data.news) this.saveData('news_data', data.news);
          if (data.paperMods) this.saveData('papers_mods', data.paperMods);
          if (data.comments) this.saveData('all_comments', data.comments);
          if (data.customPapers) this.saveData('custom_papers', data.customPapers);
          if (data.photos) this.saveData('photos_data', data.photos);
          showToast('导入成功');
          if (callback) callback(data);
        } catch (err) { showToast('文件格式错误'); }
      };
      reader.readAsText(file);
    };
    input.click();
  }
};

// 论文分类修改
const PaperMods = {
  getMods() { return Editor.getData('papers_mods') || {}; },
  saveMods(mods) { Editor.saveData('papers_mods', mods); },
  getCategory(paperId, defaultCat) {
    const mods = this.getMods();
    return mods[paperId] ? mods[paperId].category || defaultCat : defaultCat;
  },
  setCategory(paperId, category) {
    const mods = this.getMods();
    if (!mods[paperId]) mods[paperId] = {};
    mods[paperId].category = category;
    this.saveMods(mods);
  },
  setMeta(paperId, meta) {
    const mods = this.getMods();
    if (!mods[paperId]) mods[paperId] = {};
    Object.assign(mods[paperId], meta);
    this.saveMods(mods);
  }
};

// 评论系统
const Comments = {
  getAll() { return Editor.getData('all_comments') || {}; },
  saveAll(data) { Editor.saveData('all_comments', data); },
  getForPaper(paperId) { return this.getAll()[paperId] || []; },
  add(paperId, author, text, replyTo) {
    const all = this.getAll();
    if (!all[paperId]) all[paperId] = [];
    const comment = { id: 'c_' + Date.now(), author, text, timestamp: Date.now(), replies: [] };
    if (replyTo) {
      const parent = all[paperId].find(c => c.id === replyTo);
      if (parent) parent.replies.push({ id: 'r_' + Date.now(), author, text, timestamp: Date.now() });
    } else {
      all[paperId].push(comment);
    }
    this.saveAll(all);
    return all[paperId];
  },
  delete(paperId, commentId, isReply, parentId) {
    const all = this.getAll();
    if (!all[paperId]) return [];
    if (isReply && parentId) {
      const parent = all[paperId].find(c => c.id === parentId);
      if (parent) parent.replies = parent.replies.filter(r => r.id !== commentId);
    } else {
      all[paperId] = all[paperId].filter(c => c.id !== commentId);
    }
    this.saveAll(all);
    return all[paperId];
  }
};

// 新闻编辑
const NewsEditor = {
  getData() { const local = Editor.getData('news_data'); if (local) return local; Editor.saveData('news_data', NEWS_DATA); return NEWS_DATA; },
  save(data) { Editor.saveData('news_data', data); showToast('保存成功'); },
  add(data, item) { item.id = 'n_' + Date.now(); data.unshift(item); this.save(data); return data; },
  async delete(data, id) { const ok = await showConfirm('确定删除此条新闻？'); if (!ok) return null; const filtered = data.filter(n => n.id !== id); this.save(filtered); return filtered; }
};

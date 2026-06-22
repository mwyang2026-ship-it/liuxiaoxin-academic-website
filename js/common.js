// 刘晓欣学术网站 - 公共组件

const FRIEND_LINKS = [
  { name: '南开大学', url: 'http://www.nankai.edu.cn' },
  { name: '南开大学经济学院', url: 'https://economics.nankai.edu.cn/main.htm' },
  { name: '南开大学虚拟经济与管理研究中心', url: 'https://xnjj.nankai.edu.cn/main.htm' },
  { name: '中国科学院虚拟经济与数据科学研究中心', url: 'http://www.feds.ac.cn/index.php/zh-cn/' }
];

function renderHeader(currentPage) {
  return `
  <header class="site-header">
    <div class="header-content">
      <img src="nankai-emblem.png" alt="南开大学" class="header-emblem">
      <div>
        <h1>刘晓欣</h1>
        <div class="affiliation">南开大学经济学院</div>
        <div class="affiliation">南开大学虚拟经济与管理研究中心</div>
      </div>
    </div>
    <div class="header-building">
      <svg viewBox="0 0 480 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="40" y="6" width="50" height="38" rx="0.5" stroke="white" stroke-width="0.8"/>
        <rect x="48" y="10" width="5" height="5" rx="0.3" stroke="white" stroke-width="0.5"/>
        <rect x="57" y="10" width="5" height="5" rx="0.3" stroke="white" stroke-width="0.5"/>
        <rect x="66" y="10" width="5" height="5" rx="0.3" stroke="white" stroke-width="0.5"/>
        <rect x="48" y="20" width="5" height="5" rx="0.3" stroke="white" stroke-width="0.5"/>
        <rect x="57" y="20" width="5" height="5" rx="0.3" stroke="white" stroke-width="0.5"/>
        <rect x="66" y="20" width="5" height="5" rx="0.3" stroke="white" stroke-width="0.5"/>
        <rect x="48" y="30" width="5" height="5" rx="0.3" stroke="white" stroke-width="0.5"/>
        <rect x="57" y="30" width="5" height="5" rx="0.3" stroke="white" stroke-width="0.5"/>
        <rect x="66" y="30" width="5" height="5" rx="0.3" stroke="white" stroke-width="0.5"/>
        <rect x="90" y="22" width="30" height="22" stroke="white" stroke-width="0.6"/>
        <line x1="90" y1="20" x2="170" y2="20" stroke="white" stroke-width="0.6"/>
        <rect x="120" y="10" width="240" height="34" rx="0.5" stroke="white" stroke-width="0.8"/>
        <rect x="128" y="15" width="5" height="4" rx="0.3" stroke="white" stroke-width="0.4"/>
        <rect x="140" y="15" width="5" height="4" rx="0.3" stroke="white" stroke-width="0.4"/>
        <rect x="152" y="15" width="5" height="4" rx="0.3" stroke="white" stroke-width="0.4"/>
        <rect x="164" y="15" width="5" height="4" rx="0.3" stroke="white" stroke-width="0.4"/>
        <rect x="176" y="15" width="5" height="4" rx="0.3" stroke="white" stroke-width="0.4"/>
        <rect x="188" y="15" width="5" height="4" rx="0.3" stroke="white" stroke-width="0.4"/>
        <rect x="200" y="15" width="5" height="4" rx="0.3" stroke="white" stroke-width="0.4"/>
        <rect x="212" y="15" width="5" height="4" rx="0.3" stroke="white" stroke-width="0.4"/>
        <rect x="224" y="15" width="5" height="4" rx="0.3" stroke="white" stroke-width="0.4"/>
        <rect x="236" y="15" width="5" height="4" rx="0.3" stroke="white" stroke-width="0.4"/>
        <rect x="248" y="15" width="5" height="4" rx="0.3" stroke="white" stroke-width="0.4"/>
        <rect x="260" y="15" width="5" height="4" rx="0.3" stroke="white" stroke-width="0.4"/>
        <rect x="272" y="15" width="5" height="4" rx="0.3" stroke="white" stroke-width="0.4"/>
        <rect x="284" y="15" width="5" height="4" rx="0.3" stroke="white" stroke-width="0.4"/>
        <rect x="296" y="15" width="5" height="4" rx="0.3" stroke="white" stroke-width="0.4"/>
        <rect x="308" y="15" width="5" height="4" rx="0.3" stroke="white" stroke-width="0.4"/>
        <rect x="320" y="15" width="5" height="4" rx="0.3" stroke="white" stroke-width="0.4"/>
        <rect x="332" y="15" width="5" height="4" rx="0.3" stroke="white" stroke-width="0.4"/>
        <rect x="344" y="15" width="5" height="4" rx="0.3" stroke="white" stroke-width="0.4"/>
        <rect x="128" y="24" width="5" height="4" rx="0.3" stroke="white" stroke-width="0.4"/>
        <rect x="140" y="24" width="5" height="4" rx="0.3" stroke="white" stroke-width="0.4"/>
        <rect x="152" y="24" width="5" height="4" rx="0.3" stroke="white" stroke-width="0.4"/>
        <rect x="164" y="24" width="5" height="4" rx="0.3" stroke="white" stroke-width="0.4"/>
        <rect x="176" y="24" width="5" height="4" rx="0.3" stroke="white" stroke-width="0.4"/>
        <rect x="188" y="24" width="5" height="4" rx="0.3" stroke="white" stroke-width="0.4"/>
        <rect x="200" y="24" width="5" height="4" rx="0.3" stroke="white" stroke-width="0.4"/>
        <rect x="212" y="24" width="5" height="4" rx="0.3" stroke="white" stroke-width="0.4"/>
        <rect x="224" y="24" width="5" height="4" rx="0.3" stroke="white" stroke-width="0.4"/>
        <rect x="236" y="24" width="5" height="4" rx="0.3" stroke="white" stroke-width="0.4"/>
        <rect x="248" y="24" width="5" height="4" rx="0.3" stroke="white" stroke-width="0.4"/>
        <rect x="260" y="24" width="5" height="4" rx="0.3" stroke="white" stroke-width="0.4"/>
        <rect x="272" y="24" width="5" height="4" rx="0.3" stroke="white" stroke-width="0.4"/>
        <rect x="284" y="24" width="5" height="4" rx="0.3" stroke="white" stroke-width="0.4"/>
        <rect x="296" y="24" width="5" height="4" rx="0.3" stroke="white" stroke-width="0.4"/>
        <rect x="308" y="24" width="5" height="4" rx="0.3" stroke="white" stroke-width="0.4"/>
        <rect x="320" y="24" width="5" height="4" rx="0.3" stroke="white" stroke-width="0.4"/>
        <rect x="332" y="24" width="5" height="4" rx="0.3" stroke="white" stroke-width="0.4"/>
        <rect x="344" y="24" width="5" height="4" rx="0.3" stroke="white" stroke-width="0.4"/>
        <rect x="128" y="34" width="5" height="4" rx="0.3" stroke="white" stroke-width="0.4"/>
        <rect x="140" y="34" width="5" height="4" rx="0.3" stroke="white" stroke-width="0.4"/>
        <rect x="152" y="34" width="5" height="4" rx="0.3" stroke="white" stroke-width="0.4"/>
        <rect x="164" y="34" width="5" height="4" rx="0.3" stroke="white" stroke-width="0.4"/>
        <rect x="176" y="34" width="5" height="4" rx="0.3" stroke="white" stroke-width="0.4"/>
        <rect x="188" y="34" width="5" height="4" rx="0.3" stroke="white" stroke-width="0.4"/>
        <rect x="200" y="34" width="5" height="4" rx="0.3" stroke="white" stroke-width="0.4"/>
        <rect x="212" y="34" width="5" height="4" rx="0.3" stroke="white" stroke-width="0.4"/>
        <rect x="224" y="34" width="5" height="4" rx="0.3" stroke="white" stroke-width="0.4"/>
        <rect x="236" y="34" width="5" height="4" rx="0.3" stroke="white" stroke-width="0.4"/>
        <rect x="248" y="34" width="5" height="4" rx="0.3" stroke="white" stroke-width="0.4"/>
        <rect x="260" y="34" width="5" height="4" rx="0.3" stroke="white" stroke-width="0.4"/>
        <rect x="272" y="34" width="5" height="4" rx="0.3" stroke="white" stroke-width="0.4"/>
        <rect x="284" y="34" width="5" height="4" rx="0.3" stroke="white" stroke-width="0.4"/>
        <rect x="296" y="34" width="5" height="4" rx="0.3" stroke="white" stroke-width="0.4"/>
        <rect x="308" y="34" width="5" height="4" rx="0.3" stroke="white" stroke-width="0.4"/>
        <rect x="320" y="34" width="5" height="4" rx="0.3" stroke="white" stroke-width="0.4"/>
        <rect x="332" y="34" width="5" height="4" rx="0.3" stroke="white" stroke-width="0.4"/>
        <rect x="344" y="34" width="5" height="4" rx="0.3" stroke="white" stroke-width="0.4"/>
        <line x1="310" y1="20" x2="370" y2="20" stroke="white" stroke-width="0.6"/>
        <rect x="360" y="22" width="30" height="22" stroke="white" stroke-width="0.6"/>
        <rect x="390" y="6" width="50" height="38" rx="0.5" stroke="white" stroke-width="0.8"/>
        <rect x="398" y="10" width="5" height="5" rx="0.3" stroke="white" stroke-width="0.5"/>
        <rect x="407" y="10" width="5" height="5" rx="0.3" stroke="white" stroke-width="0.5"/>
        <rect x="416" y="10" width="5" height="5" rx="0.3" stroke="white" stroke-width="0.5"/>
        <rect x="398" y="20" width="5" height="5" rx="0.3" stroke="white" stroke-width="0.5"/>
        <rect x="407" y="20" width="5" height="5" rx="0.3" stroke="white" stroke-width="0.5"/>
        <rect x="416" y="20" width="5" height="5" rx="0.3" stroke="white" stroke-width="0.5"/>
        <rect x="398" y="30" width="5" height="5" rx="0.3" stroke="white" stroke-width="0.5"/>
        <rect x="407" y="30" width="5" height="5" rx="0.3" stroke="white" stroke-width="0.5"/>
        <rect x="416" y="30" width="5" height="5" rx="0.3" stroke="white" stroke-width="0.5"/>
        <text x="240" y="7" text-anchor="middle" fill="white" font-family="SimSun,Songti SC,serif" font-size="5" opacity="0.5">范孙楼</text>
      </svg>
    </div>
  </header>
  <nav class="site-nav">
    <a href="index.html" class="${currentPage === 'index' ? 'active' : ''}">首页</a>
    <a href="views.html" class="${currentPage === 'views' ? 'active' : ''}">学术观点</a>
    <a href="papers.html" class="${currentPage === 'papers' ? 'active' : ''}">关键论文</a>
    <a href="news.html" class="${currentPage === 'news' ? 'active' : ''}">学术新闻</a>
    <a href="recommend.html" class="${currentPage === 'recommend' ? 'active' : ''}">推荐阅读</a>
    <a href="about.html" class="${currentPage === 'about' ? 'active' : ''}">其他信息</a>
  </nav>`;
}

function renderFooter() {
  const linksHtml = FRIEND_LINKS.map(l => `<a href="${l.url}" target="_blank" rel="noopener">${l.name}</a>`).join(' \u00b7 ');
  return `
  <footer class="site-footer">
    <div class="friend-links">
      <span class="friend-links-label">友情链接：</span>${linksHtml}
    </div>
    <p style="margin-top:8px;">&copy; 刘晓欣 · 南开大学经济学院 · 虚拟经济与管理研究中心</p>
    <p style="margin-top:4px;">如有问题请联系：<a href="mailto:mw.yang@foxmail.com" style="color:var(--primary);text-decoration:none;">mw.yang@foxmail.com</a></p>
  </footer>`;
}

function mdToHtml(md) {
  if (!md) return '';
  return md
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h4>$1</h4>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/^(\d+)\. (.+)$/gm, '<li>$2</li>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>');
}

function showToast(msg, duration = 2000) {
  let toast = document.querySelector('.toast');
  if (!toast) { toast = document.createElement('div'); toast.className = 'toast'; document.body.appendChild(toast); }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), duration);
}

function showConfirm(msg) {
  return new Promise(resolve => {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay active';
    overlay.innerHTML = `<div class="modal"><h3>确认操作</h3><p style="margin-bottom:20px;">${msg}</p><div class="flex-between"><button class="btn btn-outline" id="confirm-no">取消</button><button class="btn btn-primary" id="confirm-yes">确定</button></div></div>`;
    document.body.appendChild(overlay);
    overlay.querySelector('#confirm-yes').onclick = () => { overlay.remove(); resolve(true); };
    overlay.querySelector('#confirm-no').onclick = () => { overlay.remove(); resolve(false); };
  });
}

function formatTimestamp(ts) {
  const d = new Date(ts);
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0') + ' ' + String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
}

function escHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function initPage(pageName) {
  const header = document.getElementById('site-header');
  const footer = document.getElementById('site-footer');
  if (header) header.innerHTML = renderHeader(pageName);
  if (footer) footer.innerHTML = renderFooter();
  initFeedback();
}

// === Feedback system (shared via GitHub Issues) ===
const FEEDBACK_REPO = 'mwyang2026-ship-it/liuxiaoxin-academic-website';

function initFeedback() {
  // Floating action button
  const fab = document.createElement('div');
  fab.className = 'fab';
  fab.innerHTML = '<button class="fab-btn" title="提交修改意见">+</button>';
  document.body.appendChild(fab);
  fab.querySelector('.fab-btn').addEventListener('click', () => openFeedbackModal());

  // Right-click context menu for selected text
  document.addEventListener('contextmenu', (e) => {
    const sel = window.getSelection().toString().trim();
    if (!sel || sel.length < 2) return;
    e.preventDefault();
    showContextMenu(e.clientX, e.clientY, sel);
  });
  document.addEventListener('click', () => removeContextMenu());
}

function openFeedbackModal(quote) {
  let modal = document.querySelector('.fab-modal');
  if (modal) modal.remove();
  modal = document.createElement('div');
  modal.className = 'fab-modal active';
  modal.innerHTML = `<div class="modal">
    <div class="flex-between mb-16">
      <h3 style="margin:0">提交修改意见</h3>
      <button class="edit-icon" onclick="this.closest('.fab-modal').remove()">&#10005;</button>
    </div>
    ${quote ? `<div class="quote-block">${escHtml(quote)}</div>` : ''}
    <textarea id="fb-text" placeholder="请描述您的修改建议或意见...">${quote ? '> ' + quote + '\n\n' : ''}</textarea>
    <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:12px;">
      <button class="btn btn-outline btn-sm" onclick="this.closest('.fab-modal').remove()">取消</button>
      <button class="btn btn-primary btn-sm" onclick="submitFeedback()">提交</button>
    </div>
    <p style="font-size:11px;color:var(--text-light);margin-top:8px;">提交后将跳转至 GitHub，需登录后确认发布</p>
  </div>`;
  document.body.appendChild(modal);
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });
}

function submitFeedback() {
  const text = document.getElementById('fb-text').value.trim();
  if (!text) { showToast('请填写意见内容'); return; }
  const page = location.pathname.split('/').pop() || 'index.html';
  const title = '[反馈] ' + page + ' - ' + text.slice(0, 50);
  const body = '**页面**: ' + location.href + '\n\n' + text;
  const url = `https://github.com/${FEEDBACK_REPO}/issues/new?labels=feedback&title=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`;
  window.open(url, '_blank');
  document.querySelector('.fab-modal').remove();
  showToast('已跳转至 GitHub 提交');
}

function showContextMenu(x, y, quote) {
  removeContextMenu();
  const menu = document.createElement('div');
  menu.className = 'ctx-menu';
  menu.style.left = x + 'px';
  menu.style.top = y + 'px';
  menu.innerHTML = '<button>对此内容提意见</button>';
  menu.querySelector('button').addEventListener('click', () => {
    removeContextMenu();
    openFeedbackModal(quote);
  });
  document.body.appendChild(menu);
  // Adjust position if overflows
  const rect = menu.getBoundingClientRect();
  if (rect.right > window.innerWidth) menu.style.left = (x - rect.width) + 'px';
  if (rect.bottom > window.innerHeight) menu.style.top = (y - rect.height) + 'px';
}

function removeContextMenu() {
  const menu = document.querySelector('.ctx-menu');
  if (menu) menu.remove();
}

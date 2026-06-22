// 刘晓欣学术网站 - URL 解析器
// 通过 CORS 代理抓取网页内容，自动解析标题、日期、正文

const UrlParser = {
  // CORS 代理列表（按优先级）
  PROXIES: [
    url => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
    url => `https://corsproxy.io/?${encodeURIComponent(url)}`
  ],

  // 通过代理抓取网页
  async fetchHtml(url) {
    for (const proxy of this.PROXIES) {
      try {
        const resp = await fetch(proxy(url), { signal: AbortSignal.timeout(15000) });
        if (resp.ok) return await resp.text();
      } catch (e) { continue; }
    }
    return null;
  },

  // 从 HTML 中提取信息
  parseHtml(html) {
    const result = { title: '', date: '', content: '', source: '' };
    if (!html) return result;

    const doc = new DOMParser().parseFromString(html, 'text/html');

    // 提取标题
    const ogTitle = doc.querySelector('meta[property="og:title"]');
    const titleEl = doc.querySelector('h1') || doc.querySelector('#activity-name') || doc.querySelector('.rich_media_title');
    if (ogTitle) result.title = ogTitle.content;
    else if (titleEl) result.title = titleEl.textContent.trim();

    // 提取日期
    const ogTime = doc.querySelector('meta[property="article:published_time"]');
    const pubTime = doc.querySelector('#publish_time') || doc.querySelector('.rich_media_meta_text') || doc.querySelector('time');
    if (ogTime) result.date = ogTime.content.slice(0, 10);
    else if (pubTime) result.date = pubTime.textContent.trim().slice(0, 10);

    // 提取正文
    const contentEl = doc.querySelector('#js_content') || doc.querySelector('.rich_media_content') || doc.querySelector('article') || doc.querySelector('.article-content');
    if (contentEl) {
      // 清除 script/style 标签
      contentEl.querySelectorAll('script, style').forEach(el => el.remove());
      let text = contentEl.innerText || contentEl.textContent;
      text = text.replace(/\n{3,}/g, '\n\n').trim();
      result.content = text.length > 500 ? text.slice(0, 500) + '...' : text;
    }

    return result;
  },

  // 主入口：输入 URL，自动解析
  async parse(url) {
    if (!url || !url.startsWith('http')) {
      return { success: false, message: '请输入有效的 URL（以 http 开头）' };
    }

    const html = await this.fetchHtml(url);
    if (!html) {
      return { success: false, message: '无法获取网页内容。微信文章可能有反爬保护，请使用方式二手动填写。' };
    }

    const parsed = this.parseHtml(html);
    if (!parsed.title) {
      return { success: false, message: '无法自动解析此页面，请使用方式二手动填写。' };
    }

    return { success: true, data: parsed };
  },

  // 从粘贴内容中解析（备用）
  parseWechatPaste(text) {
    if (!text || !text.trim()) return null;
    const result = { title: '', date: '', content: '', source: '' };
    const lines = text.split('\n').map(l => l.trim()).filter(l => l);
    if (lines.length > 0) result.title = lines[0];

    const datePatterns = [/(\d{4})年(\d{1,2})月(\d{1,2})日/, /(\d{4})-(\d{1,2})-(\d{1,2})/, /(\d{4})\.(\d{1,2})\.(\d{1,2})/];
    for (const line of lines.slice(0, 10)) {
      for (const p of datePatterns) {
        const m = line.match(p);
        if (m) { result.date = m[0]; break; }
      }
      if (result.date) break;
    }

    let start = 1;
    // 第二行如果是日期或短行，跳过
    if (lines.length > 1) {
      for (const p of datePatterns) { if (p.test(lines[1])) { start = 2; break; } }
      // 第二行是 URL 则提取为 source
      if (/^https?:\/\//.test(lines[1])) { result.source = lines[1]; start = 2; }
    }
    if (start < lines.length && lines[start].length < 20 && !lines[start].includes('\u3002')) start++;
    // 跳过空行和 URL 行
    while (start < lines.length && /^https?:\/\//.test(lines[start])) { if (!result.source) result.source = lines[start]; start++; }
    result.content = lines.slice(start).join('\n').trim();
    if (result.content.length > 500) result.content = result.content.slice(0, 500) + '...';
    return result;
  }
};

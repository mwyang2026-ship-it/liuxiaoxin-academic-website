// Chrome Extension Background Script
chrome.action.onClicked.addListener(async (tab) => {
  try {
    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: extractPageContent
    });

    if (results && results[0] && results[0].result) {
      const data = results[0].result;
      // 将提取的数据复制到剪贴板，并提示用户
      const text = `${data.title}\n${data.date || ''}\n${data.source}\n\n${data.content}`;
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: (clipText) => { navigator.clipboard.writeText(clipText); },
        args: [text]
      });
      // 显示提示
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
          const tip = document.createElement('div');
          tip.style.cssText = 'position:fixed;top:20px;left:50%;transform:translateX(-50%);background:#4B0082;color:#fff;padding:12px 24px;border-radius:8px;font-size:14px;z-index:999999;box-shadow:0 4px 12px rgba(0,0,0,0.3);';
          tip.textContent = '已提取内容并复制到剪贴板，请打开学术网站新闻页面粘贴添加';
          document.body.appendChild(tip);
          setTimeout(() => tip.remove(), 4000);
        }
      });
    }
  } catch (e) {
    console.error('Extraction failed:', e);
  }
});

// 此函数在目标页面上下文中执行
function extractPageContent() {
  const result = { title: '', date: '', content: '', source: window.location.href };

  const ogTitle = document.querySelector('meta[property="og:title"]');
  const titleEl = document.querySelector('h1') || document.querySelector('#activity-name') || document.querySelector('.rich_media_title');
  result.title = (ogTitle && ogTitle.content) || (titleEl && titleEl.textContent.trim()) || document.title;

  const ogTime = document.querySelector('meta[property="article:published_time"]');
  const pubTime = document.querySelector('#publish_time') || document.querySelector('.rich_media_meta_text') || document.querySelector('time');
  if (ogTime && ogTime.content) result.date = ogTime.content.slice(0, 10);
  else if (pubTime) result.date = pubTime.textContent.trim().slice(0, 10);

  const contentEl = document.querySelector('#js_content') || document.querySelector('.rich_media_content') || document.querySelector('article') || document.querySelector('.article-content');
  if (contentEl) {
    contentEl.querySelectorAll('script, style').forEach(el => el.remove());
    let text = contentEl.innerText || contentEl.textContent;
    text = text.replace(/\n{3,}/g, '\n\n').trim();
    result.content = text.length > 500 ? text.slice(0, 500) + '...' : text;
  } else {
    let text = document.body.innerText;
    text = text.replace(/\n{3,}/g, '\n\n').trim();
    result.content = text.length > 500 ? text.slice(0, 500) + '...' : text;
  }

  return result;
}

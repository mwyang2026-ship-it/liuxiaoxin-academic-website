# 刘晓欣学术网站

南开大学经济学院刘晓欣教授的个人学术网站，展示学术观点、关键论文、学术动态等内容。

## 在线访问

https://mwyang2026-ship-it.github.io/liuxiaoxin-academic-website/

## 网站结构

```
├── index.html          # 首页（个人简介、学术观点、代表论文、最近动态）
├── views.html          # 学术观点（6大理论模块）
├── papers.html         # 关键论文列表（按主题/时间分类、搜索）
├── paper.html          # 论文详情（摘要、PDF预览、评论）
├── news.html           # 学术新闻动态
├── recommend.html      # 推荐阅读
├── about.html          # 其他信息
├── css/
│   └── style.css       # 全站样式（紫金配色，SimSun标题字体）
├── js/
│   ├── data.js         # 论文数据（PAPERS_DATA 数组）
│   ├── common.js       # 公共组件（header/footer渲染、工具函数）
│   └── editor.js       # 编辑器功能（localStorage 持久化）
├── papers/             # PDF 文件（约 44MB，已压缩）
├── photos/             # 照片资源
└── nankai-emblem.png   # 南开大学校徽
```

## 技术栈

- 纯静态 HTML/CSS/JS，无框架依赖
- GitHub Pages 部署（main 分支直接部署）
- 数据存储：`js/data.js`（内置）+ localStorage（用户自定义）

## 编辑方式

### 修改论文数据
编辑 `js/data.js` 中的 `PAPERS_DATA` 数组，每条记录包含：
- `id`, `title`, `authors`, `journal`, `year`, `category`
- `abstract`（摘要）或 `contribution`（贡献）
- `pdf`（文件路径）, `topCited`（高引标记）

### 修改样式
- 全局样式：`css/style.css`
- 页面特有样式：各 HTML 文件的 `<style>` 标签内

### 修改公共组件
- Header/Footer：`js/common.js` 中的 `renderHeader()` / `renderFooter()`
- 导航栏：`js/common.js` 中的 `renderHeader()` 内的 `<nav>` 部分

## 部署流程

```bash
# 本地修改后
git add <修改的文件>
git commit -m "修改说明"
git push origin main
# 1-3分钟后 GitHub Pages 自动部署生效
```

## 配色方案

- 主色（紫）：`#4B0082`
- 辅色（深蓝）：`#1a3a5c`
- 点缀（金）：`#B8860B`
- 背景：`#fafafa`

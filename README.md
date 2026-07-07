# Psyduck2887's Blog

> 个人技术博客，记录学习笔记、项目实践与踩坑总结。

🌐 线上地址：<https://psyduck2887.github.io>

## 技术栈

- [Hexo](https://hexo.io/) —— 静态站点生成器（基于 Node.js）
- [NexT](https://theme-next.js.org/) —— 博客主题
- [GitHub Pages](https://pages.github.com/) —— 站点托管
- [GitHub Actions](https://github.com/features/actions) —— 自动构建与部署

## 关于 Hexo

[Hexo](https://hexo.io/) 是一个**静态站点生成器（SSG）**——把 Markdown 文章 + 主题模板，一次性"编译"成纯静态的 HTML/CSS/JS 文件。

**印刷机比喻：**

| 角色 | 比喻 |
|---|---|
| Markdown 文章 | 书稿 |
| NexT 主题 | 排版模板 |
| Hexo | 印刷机（书稿 + 模板 → 成书） |
| `public/` 目录 | 印好的成书（HTML） |
| GitHub Pages | 书店（摆书给读者翻） |

Hexo 只在"印刷"环节运行一次（`hexo generate`），印完就下班。访客访问的是现成的 HTML，**不需要 Hexo 在背后运行**——所以本博客无后端、无数据库、不用管服务器。

**和 GitHub 的关系**：Hexo 与 GitHub 互不认识。是 GitHub Actions（CI 服务）在云端调用 Hexo 生成 HTML，再交给 Pages 托管。换别的框架（Hugo/Jekyll）或手写 HTML 也行，Hexo 只是这里选用的"翻译机"。

> 本文件位于项目根目录，**不会显示在博客网页上**（Hexo 只渲染 `source/` 下的内容）。

## 工作流

```
本地写 Markdown → git push 到 main → GitHub Actions 自动构建 → GitHub Pages 发布
```

全程静态，无后端、无数据库。推送即发布。

## 目录结构

```
.
├── _config.yml              # 站点配置（标题、作者、URL、主题等）
├── package.json             # 依赖与脚本
├── source/
│   └── _posts/              # ← 文章目录（Markdown 写这里）
├── scaffolds/               # 文章模板
└── .github/workflows/
    └── deploy.yml           # 自动部署配置
```

## 本地开发

### 环境要求

- Node.js（建议 LTS 版本，CI 使用 Node 22）

### 安装依赖

```bash
npm install
```

### 本地预览

有两种预览方式，配合使用最舒服：

**方式一：VS Code Markdown 预览（看文章结构）**

在 VS Code 打开 md 文件，按 `Cmd+K` 然后按 `V`，侧边打开预览，边写边看 Markdown 结构实时更新。适合快速写内容、查错别字。

**方式二：hexo server（看博客最终样式）**

```bash
npm run server
# 或 npx hexo server
```

浏览器打开 <http://localhost:4000>，看到的是套了 NexT 主题的最终效果（访客看到的样子）。

> 已安装 `hexo-browsersync` 插件，**支持热重载**：修改 md 保存后浏览器自动刷新，无需手动刷新。

**推荐工作流**：写的时候用 VS Code 侧边预览看结构；想看主题样式时开 hexo server。

### 写新文章

```bash
npx hexo new post "文章标题"
```

会在 `source/_posts/` 下生成 `文章标题.md`，编辑该文件写正文。

文章头部 front-matter 示例：

```markdown
---
title: 文章标题
date: 2026-07-06 22:00:00
tags:
  - 标签1
categories:
  - 分类
---

正文内容...
```

## 发布

```bash
git add .
git commit -m "post: 文章标题"
git push
```

推送后 GitHub Actions 会自动构建并部署，约 1-2 分钟后线上生效。

## 配置说明

站点核心配置在 `_config.yml`：

| 字段 | 说明 | 当前值 |
|------|------|--------|
| `title` | 博客标题 | Psyduck2887's Blog |
| `description` | 站点描述（SEO） | Psyduck2887 的个人技术博客 |
| `author` | 作者 | Psyduck2887 |
| `url` | 站点 URL | https://psyduck2887.github.io |
| `permalink` | 文章链接格式 | posts/:title/ |
| `theme` | 主题 | next |

## 维护指南

### 日常写文章（最常用）

1. `npx hexo new post "标题"` 生成文章草稿
2. 编辑 `source/_posts/标题.md` 写正文
3. `npx hexo server` 本地预览（http://localhost:4000，支持热重载）
4. 满意后发布：

   ```bash
   git add .
   git commit -m "post: 标题"
   git push
   ```

### 修改站点配置

编辑 `_config.yml` → `npx hexo server` 预览 → 确认后 `git push`。

### 更新依赖

```bash
npm update          # 更新所有依赖
npm install hexo@latest   # 单独更新某个包
```

> Dependabot 会自动检查依赖更新并提 PR（配置见 `.github/dependabot.yml`）。

### 删除文章

直接删除 `source/_posts/` 下对应的 `.md` 文件，然后 `git push`。

## 后续计划

- [ ] 阶段 4：主题深度美化、评论系统（Giscus）、RSS、访问统计、SEO
- [ ] 阶段 5：绑定自定义域名

## 许可

博客文章版权归作者所有。

# Psyduck2887's Blog

> 个人技术博客，记录学习笔记、项目实践与踩坑总结。

🌐 线上地址：<https://psyduck2887.github.io>

## 技术栈

- [Hexo](https://hexo.io/) —— 静态站点生成器（基于 Node.js）
- [NexT](https://theme-next.js.org/) —— 博客主题
- [GitHub Pages](https://pages.github.com/) —— 站点托管
- [GitHub Actions](https://github.com/features/actions) —— 自动构建与部署

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

- Node.js（建议 LTS 版本，CI 使用 Node 20）

### 安装依赖

```bash
npm install
```

### 本地预览

```bash
npm run server
# 或 npx hexo server
```

浏览器打开 <http://localhost:4000> 查看效果。

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
3. `npx hexo server` 本地预览（http://localhost:4000）
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

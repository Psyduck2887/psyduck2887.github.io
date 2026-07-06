---
title: 博客搭建笔记
date: 2026-07-06 22:17:00
tags:
  - Hexo
  - GitHub Pages
  - CI/CD
categories:
  - 建站
---

记录一下这个博客从零搭建的完整流程，方便日后维护，也供参考。

## 整体架构

```
本地 Markdown → Git 推送 → GitHub Actions 构建 → GitHub Pages 发布
```

全程静态，无后端、无数据库、无服务器运维。

## 关键决策

### 1. 框架选择：Hexo

静态博客生成器很多（Hugo、Jekyll、Astro 等），选 Hexo 的原因：

- 中文社区生态成熟，教程丰富
- 基于 Node.js，前端友好
- 主题插件多

### 2. 主题：NexT

NexT 是 Hexo 最经典的主题，功能全面、文档完善，适合技术博客。

### 3. 部署：GitHub Actions

不使用传统的 `hexo deploy`（推到 gh-pages 分支），而是用 GitHub Actions 直接部署 `public/` 目录：

- 构建过程可复现、可版本化
- Node 版本可控（锁定 LTS）
- 依赖可缓存，构建快

### 4. 域名

暂用 GitHub 默认域名，后续绑定自定义域名时只需：

1. 在 `source/` 下放 `CNAME` 文件
2. 配置 DNS 记录
3. 在 Pages 设置开启强制 HTTPS

## 目录结构

```
.
├── _config.yml          # 站点配置
├── package.json
├── source/
│   └── _posts/          # 文章目录
├── themes/              # 主题
└── .github/workflows/   # CI 配置
```

## 日常写作

新建文章：

```bash
hexo new post "文章标题"
```

本地预览：

```bash
hexo server
```

发布：只需 `git push`，剩下交给 Actions。

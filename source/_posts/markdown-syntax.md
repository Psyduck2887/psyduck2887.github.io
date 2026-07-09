---
title: Markdown 语法示例
date: 2026-07-06 22:16:00
tags:
  - Markdown
  - 测试
categories:
  - 文档
---

这篇文章用于测试 Markdown 各类语法的渲染效果。

## 文字样式

- **加粗文字**
- *斜体文字*
- ~~删除线~~
- `行内代码`

## 列表

无序列表：

- 项目一
- 项目二
  - 子项目 A
  - 子项目 B

有序列表：

1. 第一步
2. 第二步
3. 第三步

## 代码块

行内代码：使用 `npm install` 安装依赖。

JavaScript 代码：

```javascript
function greet(name) {
  console.log(`Hello, ${name}!`);
}

greet('World');
```

Bash 代码：

```bash
# 常用命令
hexo new post "文章标题"
hexo clean && hexo generate && hexo server
```

## 表格

| 工具 | 用途 | 说明 |
|------|------|------|
| Hexo | 站点生成 | 基于 Node.js |
| Anatolo | 主题 | 深色极简 |
| Pages | 托管 | 免费静态托管 |

## 引用

> 这是一段引用文字。
>
> 可以有多行。

## 链接

[Hexo 官网](https://hexo.io)

[Anatolo 主题](https://github.com/Lhcfl/hexo-theme-anatolo)

## 分割线

---

以上语法测试完毕。

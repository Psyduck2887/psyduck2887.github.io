---
title: 飞书私聊 Agent 助手
layout: engineering-post
permalink: engineering/feishu-agent/
comments: false
engineering_space: true
engineering_category: PERSONAL PROJECT / 个人项目
---

## 项目概览

这是一个已经持续使用数月的单用户飞书私聊助手，主要用于在手机上快速记录想法和执行轻量任务。

项目真正的重点不是飞书接入，而是如何在长期运行中限制 Agent 能够接触的文件和命令范围。

## 安全边界

- 工作区固定在指定目录。
- 所有路径参数先经过校验。
- Bash 命令在工具层执行拦截。
- 支持离线 Mock，便于不依赖真实飞书环境完成验证。

这一页将在后续阶段复制主博客文章，并针对工程展示重新组织内容。

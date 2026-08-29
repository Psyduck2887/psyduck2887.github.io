---
title: 给 Agent 装上眼睛
layout: engineering-post
permalink: engineering/code-agent-observability/
comments: false
engineering_space: true
engineering_category: ARCHITECTURE & EXPLORATION / 架构与探索
---

## 核心观点

Code Agent 能看见什么，决定了它能够发现什么。

如果 Agent 只能看到本地代码，却看不到远程编译过程、SOC 开发板状态和真实日志，那么再强的推理能力也难以形成自动迭代闭环。

## 实践方向

- 通过受限 SSH 接口观察远程编译。
- 通过串口或 SSH 读取开发板状态。
- 使用最小权限逐步开放环境能力。
- 对大规模日志采用落盘、截取和按需读取策略。

这一页将在后续阶段复制主博客文章并形成独立版本。

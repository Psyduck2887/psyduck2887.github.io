---
title: 较为实用的 Multi-Agent 编排
layout: engineering-post
permalink: engineering/multi-agent-orchestration/
comments: false
engineering_space: true
engineering_category: ARCHITECTURE & EXPLORATION / 架构与探索
---

## 核心观点

Coding 场景中的 Multi-Agent 编排，重点不是增加层级和 Agent 数量，而是降低节点之间的耦合。

Manager、Executor 和 Reviewer 三种角色通常已经足够。不同节点只通过明确协议交换数据，并且能够独立运行、模拟和测试。

## 实践原则

- 先拆节点，再启动 Agent。
- 节点之间只保留协议耦合。
- 使用模拟输入解除开发和测试阶段的依赖。
- 根据冲突风险选择同目录并行或 Git Worktree。

这一页将在后续阶段复制主博客文章并形成独立版本。

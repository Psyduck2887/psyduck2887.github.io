---
title: Agent 驱动的版本测试全流程
layout: engineering-post
permalink: engineering/workflow-mock/
comments: false
engineering_space: true
engineering_category: WORK PROJECT / 工作项目
engineering_cover: /images/workflow-mock-header.png
desc: 使用 Workflow Mock 离线复现 Agent 驱动的自动化版本测试闭环。
---

## 项目定位

真实版本测试流程通常依赖 Jenkins、编译服务器、Jira、SOC 开发板和内部通知系统，不适合直接搬到公开环境中展示。

Workflow Mock 的目标不是一比一复制生产环境，而是把关键行为抽象成一套轻量、可控、可重复验证的本地系统，用于说明 Agent 如何完成一条版本测试闭环。

## 系统拓扑

本地使用五个 Docker 实例分别模拟 Jenkins、编译节点、Jira、SOC 开发板和飞书通知网关。

```text
Jenkins 发现版本
        ↓
Init 初始化 SDK 并完成编译
        ↓
SOC 查询 Jira 任务、烧录、执行并生成报告
        ↓
Notify 单向发送阶段结果
```

Jira 作为任务查询旁路接入 SOC，通知网关则作为只出不进的旁路服务，避免消息入口反向控制 Agent。

## 为什么要拆成节点

Jenkins、Init 和 SOC 三个主节点都只通过明确协议传递结果，每个节点可以单独启动、模拟和测试。

这种拆分允许下游节点在上游尚未完成时使用模拟输入继续开发，也能把故障限制在单个节点内，避免多个 Agent 同时修改同一片逻辑。

## Agent 与脚本的边界

确定性强、输入输出稳定的动作优先交给脚本；需要理解任务、观察环境和处理异常的部分交给 Agent。

编排层使用 LangGraph 管理节点状态，并允许按配置切换脚本执行者或 CLI Agent。SOC 环节保留 Agent 操作，因为真实开发板上的状态判断和异常处理很难仅靠固定脚本覆盖。

## 可演示性

项目提供一键启动、模拟发版、任务执行和停止脚本，同时配有实时展示台。整个闭环可以脱离内网运行，适合复现正常流程以及编译失败、任务失败等异常场景。

当前页面只展示脱敏后的系统结构，不包含真实项目名称、内部地址、账号或生产数据。

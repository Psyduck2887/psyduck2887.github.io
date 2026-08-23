---
title: Duck Guard 1.0：给 AI Coding 配一个后悔药
date: 2026-08-23 10:30:00
categories:
  - 技术
tags:
  - Agent
  - AI Coding
  - 开源
---

![Duck Guard 1.0](/images/duck-guard-header.png)

## 先说结论

用 Agent 写代码，改动快、动作大，一不留神文件就被改坏甚至删掉——手动 commit 又跟不上节奏。

Duck Guard 把「自动保存文件历史」做成一个启动即用的守护进程：`start` 之后 watcher 持续快照，`undo` 找回任意版本，数据只在本机。v1.0.0 已发布上架 PyPI，并且自带 Agent Skill。

## 目录

- [1. 为什么不是直接 Git](#1-为什么不是直接-git)
- [2. 工作流：start 到 stop](#2-工作流start-到-stop)
- [3. 默认保护哪些文件](#3-默认保护哪些文件)
- [4. 容量与清理](#4-容量与清理)
- [5. 给 Agent 用：自带 Skill](#5-给-agent-用自带-skill)
- [6. 发布与验证](#6-发布与验证)
- [7. 收个尾](#7-收个尾)

## 1. 为什么不是直接 Git

最常见的第一反应是：项目里自己 commit 不就行了？Duck Guard 的答案是不行——Git 的两个默认行为正好和 AI Coding 的场景错位：

坑一：Git 要**手动** commit。Agent 一跑十几分钟，你不可能盯着它每次改完就提交；等你想起来，中间的文件状态已经没有版本可回。

坑二：Git 历史存在**项目内**（`.git/`）。AI 删东西从不留情面，目录和 `.git` 一起没了，历史就跟着没了。

所以 Duck Guard 把历史放到项目外（`~/.duck-guard/`），自动保存，不需要手动 commit 也不需要手动管理节点。**项目和 .git 一起被删，只要有快照就能恢复。**

## 2. 工作流：start 到 stop

```text
duck-guard start        # 进入项目目录启动；首次运行只完成配置，再执行一次才开始保护
duck-guard status       # 查看状态、容量与提醒
duck-guard undo         # 先列出可恢复候选，不修改工作区
duck-guard undo app.py --version <commit> --yes   # 恢复到指定版本
duck-guard stop         # 保存最终快照，历史保留 7 天后自动清理
```

几个细节是踩过坑才加上的：`start` 会拒绝 Home、文件系统根目录这类危险工作区；`undo` 不带参数时**只列候选不动文件**，选错了版本也不至于造成第二次事故。

## 3. 默认保护哪些文件

自动排除依赖与构建产物、二进制文件、超限文件（默认 20MB），以及 `.env`、私钥、credentials 等敏感文件——这些要么是大噪音，要么动错了后果严重。

排除不等于不能保护，规则冲突时给明确的出路：

```text
duck-guard include .env --yes   # 显示敏感提醒后，明确保护；显示原因，经你确认才生效
duck-guard exclude .env --yes   # 停止后续保护，既有历史仍保留
```

## 4. 容量与清理

全局硬上限是所有项目 Session 共享的预算，多项目并发时共同消耗。接近上限（80%／90%）`status` 会提前提醒，不会悄悄写满磁盘。

到期清理由 daemon 每 24 小时自动执行，`cleanup` 可立即触发；每次维护还会对每个 vault 执行 `git gc`，把同一文件的多个历史版本压缩成差异链——高频修改场景下磁盘占用会显著下降。

## 5. 给 Agent 用：自带 Skill

值得单独说的一件事情：Duck Guard 装好后，Skill 同时可以安装到 Codex 和 Claude Code：

```text
duck-guard skill install all    # 或 codex / claude 单独装
$duck-guard status              # Agent 里直接调用
$duck-guard undo app.py         # Agent 里发起恢复
```

Skill 只做一件薄事——把 Agent 的意图映射到 CLI 命令，状态永远存在 CLI 和本地 daemon 里。**Agent 不持有状态**，就不会出现「Skill 里记了一个已过期的 session、CLI 里却是另一个」的错位。

## 6. 发布与验证

`uv tool install duck-guard-git`／`pipx install duck-guard-git` 即可安装，需要 macOS 或 Linux、Python 3.11+ 和 Git。

可信度靠 `verify`：只读完整性审计（配置、registry、metadata、Git vault 全套 `git fsck --strict`），不自动修复也不删数据。**发现损坏就老实报告，而不是假装没关系。**

## 7. 收个尾

| 场景 | 自动 Git | Duck Guard |
|---|---|---|
| 提交时机 | 要人记得 | watcher 自动 |
| 历史位置 | 项目内 `.git` | 项目外 `~/.duck-guard` |
| 恢复方式 | 手动 checkout | `undo` 按版本恢复 |
| 数据去向 | 可能被推到远端 | 只在本机 |

AI Coding 不需要更强的模型来「少犯错」，它需要一个可靠的「后悔」机制——错了能回去，才能放开手脚跑。

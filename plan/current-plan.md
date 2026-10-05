# 当前执行计划

`current-plan.md` 是当前执行合同与进度记录，记录本轮从博客下架小游戏《补夜》的范围、状态和验收要求。

## 当前目标和范围

按用户要求，把 2026-10-05 上线的小游戏《补夜》从博客下架：删除 `source/nightmend/`，撤回 `_config.yml` 里对应的 `skip_render` 配置，`https://humpy.site/nightmend/` 不再可访问。不动文章、主题、导航与 Engineering。

## 执行纪律

- 用户已明确要求下架；本地构建确认后提交并推送 `main`，由 GitHub Actions 部署。
- 只撤回上线时新增的内容，Git 历史保留，不改写。

## 上下文恢复规则

任务中断后，先读取本文件和 `plan/struct.md`，再检查 `git status` 与最近一次 Actions 运行，从第一个未完成阶段继续。

## 计划变更规则

如需重新上线或改用其它方式发布游戏，先询问用户。

## 阶段状态

1. 删除游戏文件、撤回 `skip_render` 配置、同步 `plan/struct.md`：已完成。
2. 本地构建确认不再生成 `/nightmend/`：已完成。
3. 提交推送 `main` 并确认 Actions 部署成功：进行中。
4. 线上确认 `https://humpy.site/nightmend/` 返回 404、首页正常：待完成。

## 下一步

本地构建确认后提交推送，跟踪 Actions，并在线上确认。

## 测试、Review、Commit 和交付门禁

- 测试：`npx hexo generate` 成功，`public/` 下没有 `nightmend/`。
- 真实验证：线上 `/nightmend/` 返回 404，首页返回 200。
- Review：确认改动只有删除游戏文件、撤回一行配置和两份计划文档。
- Commit：本轮一次提交并推送 `main`。
- 交付门禁：线上确认下架后才算完成。

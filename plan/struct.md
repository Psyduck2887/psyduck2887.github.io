# 项目结构快照

`struct.md` 是当前项目快照，记录博客的实际结构和已确认的工程页面约定。

## 当前项目作用

这是一个使用 Hexo 生成、通过 GitHub Pages 托管的个人博客。文章内容同时包含技术实践、项目记录、随笔和诗词。

## 当前工作流

Markdown 内容位于 `source/`，Hexo 读取根目录 `_config.yml` 和 `themes/Anatolo/` 主题，执行 `npm run build` 生成 `public/` 静态站点。

## 已确认的工程页约定

- 工程精选页路径为 `/engineering/`。
- 页面面向 HR 和技术面试官，只展示精选工程内容，不展示个人简历信息。
- 主博客 A 与 Engineering B 是两个独立内容空间，仅复用 Anatolo 的基础视觉语言。
- A 不提供进入 B 的入口；B 首页只有一个返回 A 的链接。
- 新增或修改文章时，如果用户没有明确说明发布范围，必须先询问该内容是仅放 A、仅放 B，还是同时同步到 A 和 B；得到确认后才能实施。
- 需要同时发布到 A 和 B 时，必须维护两份独立内容文件，不使用跨空间文章链接、共享正文或自动同步；后续修改也要先询问用户是否同步另一端。
- B 详情页只返回 `/engineering/`，不使用主博客的 `BACK`、侧栏、搜索、分享和相邻文章导航。
- B 内部导航使用浏览器原生整页跳转，不经过主博客的 SPA 路由。
- B 的内容位于 `source/engineering/`，需要复用 A 的文章时复制后独立维护。
- Engineering 文章可通过 `engineering_cover` 配置独立封面，同一图片复用于首页卡片和文章头图。
- B 使用 `noindex,nofollow`，并从主站 `site.json`、`content.json` 和单页 JSON 生成中排除。

## 重要文件

- `source/_posts/`：博客文章。
- `source/engineering/index.md`：工程精选页内容。
- `themes/Anatolo/layout/engineering.pug`：工程精选页专用布局。
- `themes/Anatolo/layout/engineering-post.pug`：Engineering 详情页专用布局。
- `themes/Anatolo/source/css/engineering.css`：工程精选页专用样式。
- `themes/Anatolo/source/js/engineering.js`：横向卡片箭头交互。
- `source/images/workflow-mock-header.png`：Workflow Mock 工作项目封面。
- `source/images/long-log-analysis-header.png`：Agent 长日志分析的布偶风封面。
- `source/engineering/personal-test-automation/index.md`：个人测试工作流自动化文章。
- `source/images/agent-testing-overview.svg`：公司 Agent 自动化测试整体流程、接入状态和本地模拟范围图。
- `source/images/long-log-routing.png`、`long-log-pipeline.png`：Agent 长日志分析的布偶风分流图与处理流程图。
- `source/images/personal-test-automation-header.png`：个人测试工作自动化经历的古希腊陶绘风封面。
- `_config.yml`：Hexo 根配置。
- `package.json`：构建和本地预览命令。

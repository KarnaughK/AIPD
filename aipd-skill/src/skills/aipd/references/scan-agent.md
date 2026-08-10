# AIPD 项目状态扫描指引

本指引只用于用户没有明确开发任务，或明确说“查看项目 / 当前状态 / 初始化 / 看 Case”时的状态扫描。有具体任务时，应先走任务上下文轻量加载，不调用本流程。

## 输入

- 项目根目录绝对路径。
- 用户当前的状态查询或初始化请求。

## 扫描边界

1. 先按路径项存在性检查 `{project_root}/_aipd/` 与主 Skill 定义的旧根拒绝性哨兵；损坏 symlink 和同名普通文件也算存在。双根同时存在时返回 `schemaState: invalid`，立即停止。
2. 只有当前根路径项时，它必须是真实目录而不是 symlink，工作区内不得有 symlink，且 `manifest.json`、`index.md`、`map.md` 都必须是非 symlink 的普通文件。manifest 仅含并精确等于 `{"schema":"aipd-project","schemaVersion":2}` 时才标记为已初始化；任一类型或内容不符都返回 `schemaState: invalid`。
3. 当前工作区不存在而旧根哨兵命中时返回 `schemaState: legacy-needs-migration`，停止扫描并指向一次性迁移器。
4. 新旧根路径项均不存在时返回 `schemaState: absent` 和初始化建议，不扫描其他路径。
5. 已识别 Knowledge Schema v2 时，按需读取 `_aipd/index.md` 和 `_aipd/map.md`，不全量读取知识正文。

## 状态统计

只统计用于面板的轻量信息：

- `_aipd/knowledge/intent/`：是否存在 `intent.md`。
- `_aipd/knowledge/research/`、`core/`、`product/`、`engineering/`：各自的 Markdown 文件或子模块数量，不读取全文。
- `_aipd/sop/index.md` 和 `_aipd/sop/map.md`：是否存在。
- `_aipd/inbox.md`：是否存在；除非用户要查收件箱，不读取条目。

## Agent Entry

- Codex 项目优先检查 `AGENTS.md`，Claude Code 项目可检查 `CLAUDE.md`。
- 只判断是否存在 `<!-- AIPD:START -->` 区块，不重写用户内容。
- 工作区已初始化但 Agent Entry 缺失时，建议用 `aipd-update` 补齐。

## OKR

只在用户要查状态或 OKR 时读取 `_aipd/okr/index.md`。返回当前飞书入口、周期或目标的最小摘要，不输出远端 JSON 或长日志。

## Case

读取 `_aipd/case/index.md` 定位进行中 Case，再只读其 `case.md` 中的：

- Case Contract 摘要。
- `Current Phase` 和 `Phase State`。
- 当前游标、待确认项和阻塞项。
- Execute phase 的 Work Package 完成数量，不默认读取所有 Work Package 正文。

## 输出

返回压缩状态卡：

```md
AIPD 项目状态：
- Schema：v2 / invalid / absent
- Agent Entry：已安装 / 缺失
- Intent：已定义 / 未定义
- Knowledge：Research ... / Core ... / Product ... / Engineering ...
- SOP：...
- OKR：...
- Case：...
- 阻塞 / 风险：...
- 推荐下一步：...
```

不返回完整文件正文、长搜索日志或全量目录树。

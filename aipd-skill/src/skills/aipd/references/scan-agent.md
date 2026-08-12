# AIPD 项目状态扫描指引

本指引只用于用户没有明确开发任务，或明确说“查看项目 / 当前状态 / 初始化 / 看 Case”时的状态扫描。有具体任务时，应先走任务上下文轻量加载，不调用本流程。

## 输入

- 项目根目录绝对路径。
- 用户当前的状态查询或初始化请求。

## 扫描边界

1. 先读取 `@references/workspace/project-state.md` 和 `@references/updates/catalog.json`，验证本机目录并取得 `currentVersion=I`。
2. 按路径项存在性检查 `{project_root}/_aipd/` 与旧根拒绝性哨兵；损坏 symlink 和同名普通文件也算存在。双根返回 `schemaState: invalid`并立即停止。
3. 只有当前根时，按状态合同检查真实目录、工作区 symlink、manifest 普通文件 / JSON object 和精确双形态。身份通过时返回 `schemaState: recognized`；非法类型、未知 key 或值返回 `schemaState: invalid`。
4. 将 Schema 与发布版本分开：精确两键 manifest 返回 `versionState: unversioned-v2`；`P < I` 返回 `stale`；`P = I` 返回 `current`；`P > I` 返回 `future-project`。项目版本不从 `AGENTS.md` 推断。
5. 旧根哨兵命中时返回 `schemaState: legacy-needs-migration`；新旧根都不存在时返回 `schemaState: absent`。两者都不扫描其他路径。
6. `unversioned-v2` / `stale` 的推荐动作是 `needs-aipd-update`；`future-project` / `invalid` 硬停止；只有 `current` 才继续状态统计。必要 index / map 缺失时返回 drift repair 建议，不把 Schema 改判 invalid；存在但是 symlink / 类型冲突仍 invalid。
7. 安全的额外 Workspace 文件或目录是项目定制，只列为“可保留定制”，不因未知名称判 invalid；保留名、代码目录、symlink 和类型冲突仍按合同拒绝。

## 状态统计

只统计用于面板的轻量信息：

- `_aipd/knowledge/intent/`：是否存在 `intent.md`。
- `_aipd/knowledge/research/`、`core/`、`product/`、`engineering/`：各自的 Markdown 文件或子模块数量，不读取全文。
- `_aipd/sop/index.md` 和 `_aipd/sop/map.md`：是否存在。
- `_aipd/inbox.md`：是否存在；除非用户要查收件箱，不读取条目。

## Agent Entry

- 检查 Codex 项目的 `AGENTS.md`。
- 只判断是否存在 `<!-- AIPD:START -->` 区块，不重写用户内容。
- 工作区已初始化但 Agent Entry 缺失时只报告当前安装状态；等级 0 本来就允许缺失。只有用户明确要求安装 Entry 时才路由 `aipd-update` 补装。

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
- Schema：recognized-v2 / legacy-needs-migration / invalid / absent
- AIPD 版本：unversioned-v2 / stale(V{P}->V{I}) / current(V{I}) / future-project(V{P}>V{I})
- Agent Entry：已安装 / 缺失
- Intent：已定义 / 未定义
- Knowledge：Research ... / Core ... / Product ... / Engineering ...
- SOP：...
- OKR：...
- Case：...
- 阻塞 / 风险：...
- 可保留项目定制：...
- 推荐下一步：...
```

不返回完整文件正文、长搜索日志或全量目录树。

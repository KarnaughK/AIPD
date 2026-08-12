# AIPD V1 Current Snapshot Guide

本文件是本机 AIPD V1 发布快照的当前事实入口。机器可读的当前版本只以同目录 `catalog.json#currentVersion` 为准；不要从 Git tag、远端仓库、`AGENTS.md` 或项目正文推断版本。

## 读取顺序

1. 先读取 `catalog.json`，验证发布目录并取得本机版本 `I`。
2. 按项目版本选择并完整读取 `(P,I]` 的 Release Records；无版本 v2 项目读取全部 bootstrap records。
3. 把 records 只作为演进、替代关系、保护点和风险上下文，不逐版修改目标项目。
4. 再读取 `catalog.json#currentAuthority` 列出的当前文档和模板，以它们作为最终态权威。
5. 对照目标项目实际内容，一次收敛到 V1；保留可兼容的项目定制。

Release Record 不是迁移脚本、待办清单或中间版本回放。若历史记录与当前权威文档不同，以当前权威文档为最终目标；只有确定性的底层结构迁移可以在内部按依赖排序。

## 当前权威面

`currentAuthority` 中的路径都相对 AIPD core 根；安装到 Skill 后对应 `@references/{path}`。

| 权威面 | 主要职责 |
|---|---|
| `overview.md` | AIPD 总体定位与边界 |
| `aipd-project-structure.md` | 当前 Workspace、Knowledge、Map 与流程结构 |
| `workspace/project-state.md` | Schema 安全门、manifest 双形态和项目版本状态机 |
| `workspace/templates/*` | manifest、index、map、inbox、SOP 与 update log 的当前入口模板 |
| `knowledge/{intent,research,core,product,engineering}/guide.md` | 五类并列 Knowledge 的当前分类边界 |
| `agent-entry/{template,interaction-style}.md` | 项目 Agent Entry 与可选交互协议 |
| `agent-guides/aipd_context_retriever.md` | 上下文检索 Agent 当前职责 |
| `case/overview.md`、`case/templates/*` | 当前 Case / Work Package 结构与模板 |
| `okr/templates/index.md` | 项目 OKR 入口模板 |

当前权威只定义 AIPD 管理的结构与运行语义，不覆盖目标项目已经确认的业务知识、项目正文或安全的自定义 Workspace 模块。

## 本机边界

- V1 更新只面向当前安装包，不检查 GitHub 或其他远端是否有更高版本。
- `schemaVersion` 表达 Workspace 数据形状；`aipdVersion` 表达项目已经成功应用的完整发布快照。
- 只有完成最终态合并和验证后，才把项目 manifest 写为 V1，并追加项目 `_aipd/update-log.md`。
- 一次性 `_adoc -> _aipd` 迁移器只建立无版本 Schema v2；迁移完成后仍须由 Update 应用 V1。

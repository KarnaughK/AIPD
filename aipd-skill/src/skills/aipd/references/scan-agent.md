# 项目状态扫描指南

本指南既可由 Main 直接执行，也可在运行时判断有明确上下文隔离收益后交给扫描分身。分身只接收项目路径、结果文件和必要边界，不需要继承 Main 完整聊天；每条状态证据只有一个 owner。

## 适用边界

本文件只在 `aipd` 进入“项目状态与初始化”模式时读取。

如果用户带着明确开发、分析、讨论或修改任务触发 `aipd`，主 Agent 应优先走 ADOC 轻量认知加载，不要调用本扫描流程，也不要展示完整状态面板。

## 你的任务

扫描项目状态，汇总信息，写入结果文件。

## 执行步骤

### 1. 检查 _adoc 目录

先检查 `{project_root}/_adoc/` 是否存在。不存在时不要读取其内部文件，直接返回 `hasAdoc: false` 和初始化建议。

存在时按需读取：`{project_root}/_adoc/index.md`、`{project_root}/_adoc/map.md`。

检查：
- _adoc 目录是否存在
- intent.md 是否存在且完整
- L4-product/ 模块数量
- L5-dev/ 模块数量

### 1.5 检查 Agent Entry

检查项目根目录：

- `AGENTS.md` 是否存在
- `AGENTS.md` 是否包含 `<!-- AIPD:START -->` 和 `<!-- AIPD:END -->`
- `CLAUDE.md` 是否存在
- `CLAUDE.md` 是否包含 AIPD 标记

Codex 项目优先关注 `AGENTS.md`。如果 `_adoc/` 已存在但 `AGENTS.md` 缺失 AIPD 区块，建议补齐 Agent Entry。

### 2. 扫描 OKR

文件存在时读取：`{project_root}/_adoc/okr/index.md`

查找当前飞书 OKR 的本地索引 / 经验包入口和最后同步信息；如果索引只负责路由，不臆造 O / KR 内容，返回 `indexed` 与可见摘要即可。

### 3. 扫描 Case

检查：`{project_root}/_adoc/case/index.md` 和根目录下每个进行中 Case 的 `case.md`。

统计并提取：
- 进行中的 Case（根目录下有 `case.md` 的 `c*` 目录）。
- 每个 Case 的 `Current Phase`、`Phase State`、当前执行游标。
- Execute phase 下 Work Package 的 completed / total；没有 Work Package 时返回 0 / 0，不把它解释为 Step。
- 已归档 Case 数量（`archive/` 目录）。

### 4. 写入结果

将结果写入：`{result_file}`

格式（JSON）：
```json
{
  "hasAdoc": true,
  "hasIntent": true,
  "agentEntry": {
    "agentsMd": "present-with-aipd-block",
    "claudeMd": "missing"
  },
  "productModules": 5,
  "devModules": 2,
  "currentOKR": {
    "status": "indexed",
    "summary": "当前索引可见摘要或 null",
    "lastSyncedAt": "2026-03-24 或 null"
  },
  "currentCase": {
    "name": "c9-功能名",
    "currentPhase": "Execute",
    "phaseState": "in_progress",
    "currentCursor": "03-execute/work-packages/wp-03.md",
    "workPackagesCompleted": 2,
    "workPackagesTotal": 4
  },
  "archivedCases": 8,
  "recommendation": "继续当前 Case 的 Execute / wp-03"
}
```

### 5. 返回通知

返回：「项目状态扫描完成」

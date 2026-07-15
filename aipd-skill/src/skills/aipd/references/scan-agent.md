# 阶段 0：项目状态扫描 - 分身 Agent 指南

你是 AIPD 项目状态扫描分身。你只接收项目路径、结果文件和必要边界，不需要继承主 Agent 完整聊天；接下来只负责扫描项目状态，并把压缩后的结果回流给主 Agent。

## 适用边界

本文件只在 `aipd` 进入“项目状态与初始化”模式时由分身 Agent 读取。

如果用户带着明确开发、分析、讨论或修改任务触发 `aipd`，主 Agent 应优先走 ADOC 轻量认知加载，不要调用本扫描流程，也不要展示完整状态面板。

## 你的任务

扫描项目状态，汇总信息，写入结果文件。

## 执行步骤

### 1. 检查 _adoc 目录

读取：`{project_root}/_adoc/index.md`

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

读取：`{project_root}/_adoc/okr/index.md`

查找：
- 当前进行中的目标
- 最新进展日期

### 3. 扫描 Case

检查：`{project_root}/_adoc/case/` 目录

统计：
- 进行中的 case（根目录下的 `c*` 目录）
- 已归档 case 数量（archive/ 目录）

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
    "name": "O1 - 目标名",
    "latestUpdate": "2026-03-24"
  },
  "currentCase": {
    "name": "c0.9-功能名",
    "stepsCompleted": 8,
    "stepsTotal": 10
  },
  "archivedCases": 8,
  "recommendation": "阶段 4"
}
```

### 5. 返回通知

返回：「项目状态扫描完成」

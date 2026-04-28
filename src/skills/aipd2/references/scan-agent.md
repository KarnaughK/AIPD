# 阶段 0：项目状态扫描 - 子 Agent 指南

你是 AIPD 项目状态扫描者。

## 你的任务

扫描项目状态，汇总信息，写入结果文件。

## 执行步骤

### 1. 检查 _adoc 目录

读取：`{project_root}/_adoc/index.md`

检查：
- _adoc 目录是否存在
- intent.md 是否存在且完整
- business/ 模块数量
- dev/ 模块数量

### 2. 扫描 OKR

读取：`{project_root}/_adoc/okr/index.md`

查找：
- 当前进行中的目标
- 最新进展日期

### 3. 扫描 Plan

检查：`{project_root}/_adoc/plan/` 目录

统计：
- 进行中的计划（根目录下的 v*.md 文件）
- 已归档计划数量（archive/ 目录）

### 4. 写入结果

将结果写入：`{result_file}`

格式（JSON）：
```json
{
  "hasAdoc": true,
  "hasIntent": true,
  "businessModules": 5,
  "devModules": 2,
  "currentOKR": {
    "name": "O1 - 目标名",
    "latestUpdate": "2026-03-24"
  },
  "currentPlan": {
    "name": "v0.9-功能名",
    "stepsCompleted": 8,
    "stepsTotal": 10
  },
  "archivedPlans": 8,
  "recommendation": "阶段 4"
}
```

### 5. 返回通知

返回：「项目状态扫描完成」

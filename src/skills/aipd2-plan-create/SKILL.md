---
name: aipd2-plan-create
description: >
  创建 AIPD2 迭代计划。与用户讨论需求，按需扫描相关代码，将关键上下文和步骤写入 plan。
  关键词：plan、创建计划、拆解任务、step
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
  - Agent
  - AskUserQuestion
inject-from-core:
  - overview.md
  - plan/overview.md
  - plan/templates/plan.md
  - plan/templates/step.md
---

# AIPD2 Plan Create

## 职责边界

**只做**：与用户讨论需求 → 按需扫描代码 → 将关键认知写入 plan.md → 拆分 steps

**不做**：不执行任何 step（执行用 `/aipd2-plan-run`），不写业务代码

---

## 执行流程

### 第一步：问用户要做什么

触发后不要先扫描，直接问用户要完成什么。

### 第二步：按需扫描相关上下文

根据用户描述，精准读取相关文件：
1. 主 Agent 读 `_adoc/index.md` 了解项目模块分布（一次，轻量）
2. 需要深入了解代码细节时，**派子 Agent 调查**，结果写入 `doc/`，主 Agent 只读摘要

**原则**：主 Agent 不直接读代码文件。用户说做表单，就派子 Agent 只查表单相关模块。

### 第三步：与用户确认方案

把扫到的关键认知汇总给用户，讨论执行方案，确认步骤拆分。

### 第四步：生成 plan 文件

```bash
mkdir -p _adoc/plan/v{X.Y}-{名称}/steps
mkdir -p _adoc/plan/v{X.Y}-{名称}/doc
```

**plan.md 必须包含**：
- 目标：这个 plan 要完成什么
- 上下文文件列表：执行时需要读哪些文件（绝对路径）
- steps 列表：每个 step 的文件名和一句话描述

步骤文件写入 `steps/`，格式参考 `@references/templates/step.md`。

### 第五步：告知下一步

告知用户执行 `/aipd2-plan-run` 开始执行。

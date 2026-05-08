---
name: aipd2-case-create
description: >
  创建 AIPD2 case。与用户讨论事项，按需扫描相关上下文，将上下文索引、边界和步骤写入 case。
  关键词：case、创建事项、上下文索引、拆解任务、step
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
  - case/overview.md
  - case/templates/case.md
  - case/templates/step.md
---

# AIPD2 Case Create

## 职责边界

**只做**：与用户讨论事项 → 按需扫描上下文 → 将上下文索引、边界和步骤写入 case.md → 拆分 steps

**不做**：不执行任何 step（执行用 `/aipd2-case-run`），不写业务代码

---

## 执行流程

### 第一步：问用户要做什么

触发后不要先扫描，直接问用户要完成什么。

### 第二步：按需扫描相关上下文

根据用户描述，精准读取相关文件：
1. 主 Agent 读 `_adoc/index.md` 了解项目模块分布（一次，轻量）
2. 优先寻找本次事项相关的模块文档、页面 README、设计/原型资料和代码入口
3. 需要探索、验证、批量读取或整理 case 草案时，按 Agent Entry 中的 Main / Sub Agent Mode 派发 fork 子 Agent，主 Agent 只审阅摘要和方案

**原则**：主 Agent 不直接消费高噪声上下文。用户说做表单，就派子 Agent 基于当前上下文调查表单相关模块，并先返回 case 草案摘要供主 Agent 审核。

### 第三步：与用户确认方案

把子 Agent 返回的关键认知和 case 草案汇总给用户，讨论执行方案，确认上下文索引、边界和步骤拆分。

### 第四步：生成 case 文件

```bash
mkdir -p _adoc/case/c{X.Y}-{名称}/steps
mkdir -p _adoc/case/c{X.Y}-{名称}/doc
```

**case.md 必须包含**：
- 目标：这个 case 要完成什么
- 上下文索引：执行时优先读哪些 `_adoc` 文档、页面 README、代码入口、设计/原型/调研资料
- 本次边界：明确做什么和不做什么
- steps 列表：每个 step 的文件名和一句话描述
- 验收标准和经验沉淀位置

步骤文件写入 `steps/`，格式参考 `@references/case/templates/step.md`。

### 第五步：告知下一步

告知用户执行 `/aipd2-case-run` 开始执行。

---
name: aipd
description: >
  AIPD - 面向软件开发的 AI Harness 框架。
  将软件项目的经验和决策按领域规则结构化沉淀为项目认知，让 AI 基于这些认知持续、准确地参与项目。
  关键词：AI Harness、项目认知、intent、plan、okr
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
  - AskUserQuestion
  - WebSearch
  - Agent
---

# AIPD - 面向软件开发的 AI Harness 框架

AIPD 把软件项目从构想到交付过程中产生的经验和决策，按领域规则结构化沉淀为项目认知，让 AI 能基于这些认知持续、准确地参与项目。

## 核心行为

当用户提出需求时，AI 必须按以下顺序加载项目上下文：

1. **先读 `_adoc/index.md`**（大索引）→ 了解项目有哪些模块和能力，检查是否已有对应的 SOP
2. **再读模块 `index.md`** → 了解核心能力和通用规则
3. **按需读取具体文档** → 只有确定要执行时才加载 SOP/Spec

- **找到已有 SOP** → 按文档执行，不重复造轮子
- **没找到，且是流程性任务** → 询问用户：现场定义流程 / 先建 SOP 再执行 / 直接执行不记录

禁止：
- 跳过模块 `index.md` 直接读 SOP（会遗漏通用规则）
- 看到大索引里的名称就猜路径去读（路径在模块索引里）

---

## 多 Agent 架构

- **主 Agent（你）= 项目负责人**：与用户对话、规划任务、调度子 Agent、审查结果
- **子 Agent = 独立执行者**：拿到步骤文件，独立完成开发/调研/审查

核心价值：主 Agent 上下文保持干净，随时响应用户。子 Agent 的执行细节不污染主 Agent。

子 Agent 指南：
- 开发执行者: `@references/planning/execute-plan/worker-guide.md`
- 调研执行者: `@references/planning/execute-plan/researcher-guide.md`
- Agent Team 使用: `@references/agent-team-guide.md`

---

## 初始化

每次用户触发 `/aipd` 时，先执行项目状态扫描：

1. 使用子 Agent 扫描项目 `_adoc/` 目录（保持主 Agent 上下文干净）
2. 展示状态面板，推荐下一步行动
3. 用户确认后，按需加载对应的详细指引执行

详细指引（含状态面板格式）: `@references/init/main-agent.md`

---

## 项目认知五层结构

AIPD 将项目认知组织为从抽象到具象的五个层级。每一层都可以独立工作，也可以向下细化。

### 第一层：方向（Intent）

项目为什么存在、做给谁、成功长什么样。

- 产出: `_adoc/intent.md`（唯一，一个项目只有一个方向）
- 规则: 保持抽象，不绑定具体工具/技术/团队规模
- 详细指引: `@references/L1-intent/main-agent.md`
- 写作指南: `@references/L1-intent/intent-guide.md`

### 第二层：场景需求

从方向出发，发散探索具体的痛点、用户场景、需求。

- 产出: `_adoc/business/` 各模块的需求描述
- 这一层重在发散和调研，不急于收敛
- 基础指引: `@references/L2-scenario/index.md`
- ⚠️ 当前状态: 基础指引为方向性参考，尚未经过实践验证

### 第三层：核心引擎

从场景需求中提炼最不变的抽象——核心对象、数据模型、核心交互关系。

- 产出: 核心数据模型定义、对象关系
- 这是项目的"发动机"，一旦确定，后续一切围绕它生长
- 设计引擎时就要带着数据模型的技术思维
- 基础指引: `@references/L3-engine/index.md`
- ⚠️ 当前状态: 基础指引为方向性参考，尚未经过实践验证

### 第四层：产品架构

围绕核心引擎 + 场景需求，定义产品的功能模块和整体形态。

- 产出: `_adoc/business/` 各模块的完整定义（Spec + SOP）
- 详细指引: `@references/L4-product-arch/index.md`

### 第五层：技术架构

基于产品架构，确定技术选型、系统结构、工程规范。

- 产出: `_adoc/dev/` 各项目的技术文档
- 技术架构引用产品架构，但额外引入：技术选型、平台差异、部署运维、工程规范
- 基础指引: `@references/L5-tech-arch/index.md`
- 上下文量级远大于产品层

---

## 项目执行

执行与五层认知是两个维度：任何一层的认知都可以产生执行动作。

### Plan（迭代计划）

具体任务的执行载体。可以是开发、调研、设计——不限于写代码。

- Plan 体系说明: `@references/planning/index.md`
- 创建计划: `@references/planning/create-plan/main-agent.md`
- 执行计划: `@references/planning/execute-plan/main-agent.md`
- 归档计划: `@references/planning/execute-plan/archive-guide.md`

### OKR（目标管理）

中短期目标与复盘。Plan 可以挂在 OKR 下，也可以独立存在。

- 产出: `_adoc/okr/` 目录
- OKR 和 Plan 松耦合，并行运作
- 基础指引: `@references/okr/index.md`

---

## 目录体系

AIPD 涉及两套目录，不要混淆：

- AIPD Skill 自身结构: `@references/map-skill-structure.md`
- 项目 _adoc/ 文档结构: `@references/map-adoc-structure.md`

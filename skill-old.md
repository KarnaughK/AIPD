---
name: aipd
description: >
  AIPD - 面向软件开发的 AI Harness 框架。
  将软件项目从构想到交付过程中产生的经验和决策，按领域规则结构化沉淀为项目认知，
  让 AI 能基于这些认知持续、准确地参与项目。
  使用场景：当用户需要启动新项目、设计产品功能、创建开发计划、继续中断的工作时。
  关键词：AI Harness、项目认知、需求分析、迭代开发、plan、spec、intent
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

> AIPD 把软件项目从构想到交付过程中产生的经验和决策，按领域规则结构化沉淀为项目认知，让 AI 能基于这些认知持续、准确地参与项目。
>
> 用户只需记住 `/aipd`，AI 自动判断项目状态并推荐下一步行动。

## 核心行为准则

**当用户提出需求或功能时，AI 必须先读取 `_adoc/index.md` 大索引，检查 `business/` 和 `dev/` 各模块中是否已有对应的标准流程（SOP）。**

- **如果找到** → 按已有文档执行，不要重复造轮子
- **如果没找到，且该需求是流程性任务** → 询问用户：
  - 选项 A：现场定义流程，边做边记录
  - 选项 B：先创建 SOP 文档，再执行
  - 选项 C：直接执行，不记录流程

---

## 多 Agent 架构

AIPD 采用主 Agent + 子 Agent 的协作模式：

- **主 Agent（你）= 项目经理**：跟用户聊天、规划任务、调度子 Agent、审查结果
- **子 Agent = 独立执行者**：拿到精确的步骤文件，独立完成开发/调研/审查全循环

**核心价值**：主 Agent 上下文保持干净，随时响应用户。子 Agent 的执行细节不污染主 Agent。

**重要**：AIPD 使用 Agent Team 机制，技术细节见 `@references/agent-team-guide.md`

子 Agent 指南：
- 开发执行者：`@references/planning/execute-plan/worker-guide.md`
- 调研执行者：`@references/planning/execute-plan/researcher-guide.md`
- Agent Team 使用指南：`@references/agent-team-guide.md`（创建新模块/流程时必读）

---

## 工作流程

详细指令按功能模块组织在 `@references/` 中，按需加载。

### 阶段 0: 状态检测（每次 `/aipd` 必执行）

扫描项目，判断当前处于哪个阶段，展示状态并推荐下一步。

**执行方式**：
- 使用子 Agent 扫描项目状态（保持主 Agent 上下文干净）
- 详细指引: `@references/aipd-init/main-agent.md`

状态面板格式：
```
项目状态

_adoc/ 目录:     ✅ / ❌
intent.md:       ✅ / ⚠️ / ❌
business/ 模块:  X 个
dev/ 模块:       X 个

当前目标 (OKR):
- O1 - 目标名 (KR: X/Y 完成) 📍最新: YYYY-MM-DD

当前计划 (Plan):
- v0.x-功能名-日期 (X/Y 步骤完成)

已归档计划:      X 个

→ 推荐: 阶段 X - xxx
```

### 阶段 1: 方向规划 — 明确工作空间的大方向

触发条件: 用户想明确或调整工作空间的方向
目标: 通过对话帮助用户明确方向，产出 `intent.md`
详细指引: `@references/intent/main-agent.md`

**说明**: 这不是必须的第一步，用户可以随时规划或调整方向

### 阶段 2: 设计功能模块

触发条件: `intent.md` 完整，但 `business/` 为空或模块很少
目标: 基于项目方向，设计具体的业务模块和技术模块，产出 `business/` 和 `dev/` 文档
详细指引: `@references/phase-2-design.md`

### 阶段 3: 创建迭代计划

触发条件: 有 `business/` 模块，但 `plan/` 下无进行中的计划
目标: 确定本次迭代范围，产出 Plan 文档 + C 级步骤文件
详细指引: `@references/planning/create-plan/main-agent.md`

**关键变化**：Plan 现在包含三级版本号（A.B.C），其中 C 级步骤是子 Agent 执行的最小单元。
版本号和 Plan 类型（dev/research/review）详见 `@references/planning/create-plan/plan-guide.md`

### 阶段 4: 执行计划 — 调度子 Agent

触发条件: `plan/` 下存在进行中的计划（非 archive/）
目标: 主 Agent 调度子 Agent 逐步执行 C 级步骤，自身保持空闲随时响应用户
详细指引: `@references/planning/execute-plan/main-agent.md`

**核心流程**：
1. 加载 Plan，检查步骤进度
2. 找到下一个未完成的 C 级步骤
3. 使用 Agent 工具派发给子 Agent（run_in_background）
4. 主 Agent 回到空闲状态，随时跟用户聊天
5. 子 Agent 完成后，主 Agent 审查结果并派发下一个
6. 所有步骤完成后，归档计划（详见 `@references/planning/execute-plan/archive-guide.md`）

---

## 文档体系结构

```
_adoc/
├── intent.md              # 唯一，项目方向
├── index.md               # 大索引（入口文件，串联一切）
│
├── business/              # 业务模块（按业务价值划分）
│   └── 模块A/
│       ├── index.md       # 模块索引：核心能力 + SOP 导航
│       └── sop-xxx.md     # 标准流程（按需）
│
├── dev/                   # 技术模块/项目（按技术实现划分）
│   ├── index.md           # 技术模块总索引
│   └── 项目A/
│       ├── index.md       # 项目索引：技术栈 + 文档导航
│       └── sop-deploy.md  # 部署 SOP（按需）
│
├── okr/                   # 目标与关键结果
│   ├── index.md           # 目标索引
│   └── O1-目标名/
│       ├── index.md       # O + KR 定义
│       └── YYYY-MM-DD.md  # 每日进展
│
└── plan/                  # 迭代计划
    ├── README.md          # 规则说明
    ├── v0.9-功能名-260323/  # B 级文件夹（带日期）
    │   ├── plan.md        # B 级计划说明
    │   └── steps/
    │       ├── v0.9.1-步骤名.md
    │       └── v0.9.2-步骤名.md
    └── archive/           # 已归档计划
```

### 渐进式披露加载顺序

AI 必须按以下顺序加载上下文：

1. **读取 `_adoc/index.md`**（大索引）
   - 了解项目有哪些业务模块、技术模块
   - 看到各模块有哪些 SOP（名称，但无路径）
   - 目的：让 AI 知道"有什么能力"，避免误以为缺失而重复创建

2. **读取模块的 `index.md`**（模块索引）
   - 了解该模块的核心能力和通用规则
   - 看到 SOP 的路径和选择原则
   - **关键**：模块索引包含的通用规则适用于所有 SOP，必须先读

3. **按需读取具体文档**（SOP、Spec 等）
   - 只有确定要执行某个流程时，才读对应的 SOP
   - 避免一次性加载过多内容

**禁止行为**：
- ❌ 跳过模块 `index.md` 直接读 SOP（会遗漏通用规则）
- ❌ 看到大索引里的 SOP 名称就自己猜路径去读（路径在模块索引里）

### 两大维度

| 维度 | 文档 | 关注点 |
|------|------|--------|
| **业务** | business/ 各模块 | 做什么、为什么做、怎么操作（Spec + SOP 聚合在模块内） |
| **技术** | dev/ 各项目 | 怎么实现、技术约束、部署运维 |
| **目标** | okr/ 各目标 | 中短期目标、推进思路、执行复盘 |

### 文档类型归属

| 文档类型 | 用途 | 归属 |
|---------|------|------|
| **SOP** | 标准流程怎么走 | 归属到对应的 business/ 或 tech/ 模块 |
| **Plan** | 本次迭代做什么 | 保持在 plan/ 顶层，独立于模块 |
| **Step** | 子 Agent 的执行单元 | plan/steps/ 目录下 |

---

## 关键规则

### Intent（方向）
- **唯一性**: 一个项目只有一个方向
- **上提原则**: 多个平行方向应上提到共同父层级

### Plan 生命周期
```
创建 B 级 Plan → 拆分 C 级步骤 → 子 Agent 逐步执行 → 完成 → 归档
```
- `plan/` 根目录下的 .md 文件（排除 index.md）= 进行中
- `plan/steps/` 下的文件 = C 级步骤
- `plan/archive/` 目录下的文件 = 已完成
- `plan/index.md` = 按模块分类的索引

### Tech 独立性
- 独立于业务层（intent/business/plan）
- 可在任何阶段补充或修改
- 遵循: 先文档 → 开发 → 回写文档

### SOP 渐进式
- 随项目演进逐步补充，下沉到各模块内部
- 记录"怎么操作"而非"为什么这样设计"
- 每个流程一个文件，保持简洁

---

## 错误处理

| 场景 | 处理方式 |
|------|---------|
| 用户不确定方向 | 帮助调研竞品，提出 2-3 个可能方向，不催促 |
| 功能拆分困难 | 提供思考框架（用户视角/数据视角/价值视角） |
| 计划范围过大 | 建议拆分成多个 plan，MVP 优先 |
| 任务受阻 | 明确阻塞原因，讨论解决方案，更新 plan 标记 blocked |
| 子 Agent 失败 | 告知用户失败原因，提供重试/跳过/手动处理选项 |

---

## 用户体验要点

1. **状态可见**: 每次调用都展示当前状态
2. **推荐明确**: 基于状态给出清晰的下一步建议
3. **可选择**: 始终提供备选操作
4. **不催促**: 允许用户思考和讨论
5. **保持同步**: 每完成一步就更新文档
6. **主 Agent 始终空闲**: 执行任务交给子 Agent，主 Agent 随时响应用户

---

## 参考文档

- `@references/intent/intent-guide.md` - 如何写好项目方向
- `@references/planning/create-plan/plan-guide.md` - 迭代计划编写指南（含版本号规范）
- `@references/planning/execute-plan/worker-guide.md` - 子 Agent 开发者指南
- `@references/planning/execute-plan/researcher-guide.md` - 子 Agent 调研者指南
- `@templates/` - 各类文档模板（含 step.md 步骤模板）
- `@examples/` - 示例文档

---

## 开始执行

当用户触发 `/aipd` 时:
1. 立即开始阶段 0（状态检测）
2. 根据检测结果展示状态并推荐操作
3. 用户确认后，**读取对应阶段的详细指令文件**，按指令执行
4. 每个阶段完成后提示下一步
5. 遇到问题时提供清晰的解决方案

记住: 这个 Skill 的核心价值是 **让用户专注于业务思考，AI 负责文档组织、流程引导和任务调度**。

# AIPD Think 对象与状态流转设计

> Step: `s4-think-object-state-design`  
> 时间：2026-06-20  
> 范围：设计 `_adoc/think/` 的建议目录、单个 Think 对象文件、状态字段、出口字段、恢复链路和最小模板草案。本文只做设计，不创建正式 `_adoc/think/` 目录，不实现模板文件。

## 结论先行

AIPD Think 应作为 Case 之前的一等对象落到 `_adoc/think/`，但不能把每个想法都做成重型目录。

推荐结构是：

```text
_adoc/think/
├── index.md
├── active/
│   └── t{N}-{slug}/
│       ├── think.md
│       ├── research.md        # 可选；轻量调研
│       ├── research/          # 可选；深度调研或并行分身调研
│       ├── options.md         # 可选；多方案比较
│       ├── decision.md        # 可选；出现明确出口后生成
│       ├── handoff.md         # 可选；Create 出口时生成，交给 Case Create
│       └── doc/               # 可选；附件、摘录、草图、临时材料
└── archive/
    └── {YYYY}/
        └── t{N}-{slug}/
```

其中只有 `index.md`、`active/`、`archive/` 和单个 Think 的 `think.md` 是基础能力。`research.md`、`research/`、`options.md`、`decision.md`、`handoff.md`、`doc/` 都按需要渐进创建。

Think 的状态核心不是执行进度，而是决策出口：

```text
Continue / Research / Create / Kill / Defer / Weave
```

只有 `Create` 会进入 Case Create。`Kill`、`Defer`、`Weave` 都是有效产物，不是“没有做成 case”的失败状态。

## 设计原则

### 1. Think 与 Case 同层

Think 不放进 `_adoc/case/`。它解决的是“要不要做、做什么、还缺什么、是否值得进入执行”。Case 解决的是“已经决定要推进后怎么规划、拆分、执行和验收”。

### 2. 默认轻量，按需加重

Think 必须支持长讨论和深调研，但不应让每个想法都背负完整目录。默认只创建 `think.md`；当出现明确调研、多方案比较或 Create 交接需求时，再增加对应文件。

### 3. 状态比聊天重要

Think 不是聊天存档。它记录的是当前判断、关键依据、已排除方案、缺口、下一步问题和出口状态。原始聊天只在必要时摘录，不保存完整对话。

### 4. Research 服务决策

Think 可以包含 deep research，但 research 必须绑定关键未知点。不要把 Research-heavy Think 变成泛行业报告或资料仓库。

### 5. Create 必须显式

Think 不能自动创建 Case。即使建议出口是 `Create`，也要通过 `handoff.md` 把稳定输入交给 Case Create，并等待用户或上层流程确认。

### 6. 稳定知识走 Weave

Think 内的研究材料和讨论过程不直接写入 L1-L5。只有稳定结论、长期规则、检索入口或外部资料吸收结果，才输出 Weave Candidate。

## `_adoc/think/` 目录设计

### 推荐目录

```text
_adoc/think/
├── index.md
├── active/
└── archive/
```

基础目录只保留三项：

| 路径 | 是否需要 | 作用 |
|---|---|---|
| `_adoc/think/index.md` | 需要 | Think 总索引，记录 active / decided / archived 的状态、出口和恢复入口 |
| `_adoc/think/active/` | 需要 | 当前仍可能继续讨论、调研、决策或转 Case 的 Think 对象 |
| `_adoc/think/archive/` | 需要 | 已完成出口并归档的 Think；可按年份分目录 |
| `_adoc/think/doc/` | 不建议作为全局目录 | 全局 doc 容易变成资料堆；附件应放到具体 Think 的 `doc/` |
| `_adoc/think/research/` | 不建议作为全局目录 | Research 应服务具体 Think；跨项目稳定资料应由 Weave 进入 L2/L3 |

### 为什么不设全局 doc / research

Think 的价值是围绕一个问题形成决策。如果设置全局 `doc/` 或 `research/`，很容易把资料从问题里剥离出来，重新变成不可判断的资料仓库。

更稳的方式是：

```text
具体 Think 的研究材料 -> 当前 Think 目录
稳定外部世界认知 -> Weave 到 L2
稳定核心判断 -> Weave 到 L3/L4/L5/map
暂时只想存一下 -> Inbox
```

### index.md 应记录什么

`_adoc/think/index.md` 是恢复和检索入口，不写完整正文。建议字段：

```md
# AIPD Think Index

## Active

| ID | 标题 | Mode | Phase | Current Exit | Updated | 入口 |
|---|---|---|---|---|---|---|
| t0.1 | 桌面端是否值得做 | research-heavy | researching | Research | 2026-06-20 | `active/t0.1-desktop-app/think.md` |

## Decided / Pending Handoff

| ID | 标题 | Outcome | Next | 入口 |
|---|---|---|---|---|
| t0.2 | Think 体系设计 | Create | Case Create | `active/t0.2-think-system/handoff.md` |

## Archive

| ID | 标题 | Outcome | Archived | 入口 |
|---|---|---|---|---|
| t0.0 | 示例 | Kill | 2026-06-20 | `archive/2026/t0.0-example/decision.md` |
```

`index.md` 只保存状态摘要和入口，避免变成第二份 `think.md`。

## 单个 Think 对象文件设计

### 最小对象：Light Think

适用场景：

- 用户只是想把一个想法聊清楚。
- 不需要深度外部调研。
- 不需要多个分身并行调查。
- 可能很快 Kill / Defer / Create。

最小结构：

```text
active/t{N}-{slug}/
└── think.md
```

`think.md` 同时承担状态、讨论摘要、当前判断和下一步问题。轻量 Think 不强制创建 `research.md`、`options.md`、`decision.md`。

### 研究对象：Research-heavy Think

适用场景：

- 陌生领域或陌生技术路线。
- 需要 GitHub / 官方文档 / 博客 / 论文等多源资料。
- 需要分身 Agent 并行研究。
- 没有研究结论就无法判断 Create / Kill / Defer。

建议结构：

```text
active/t{N}-{slug}/
├── think.md
├── research.md
├── research/
│   ├── r1-{topic}.md
│   └── r2-{topic}.md
└── options.md
```

规则：

- `research.md` 是研究总表和综合结论。
- `research/` 存具体研究分支，通常由分身 Agent 产出。
- `options.md` 在需要比较路线时创建，不强制每次研究都有。
- 研究问题必须写进 `think.md` 或 `research.md`，避免泛调研。

### 交接对象：Create Handoff

适用场景：

- Think 已经建议进入 Case Create。
- 目标、非目标、关键依据、方案取舍和风险已经足够清晰。
- 需要把前置讨论压缩成交给 Case Create 的稳定输入。

建议结构：

```text
active/t{N}-{slug}/
├── think.md
├── decision.md
└── handoff.md
```

如果此前有研究和方案比较，可同时保留：

```text
├── research.md
├── research/
└── options.md
```

`handoff.md` 不是 case 文件，而是 Case Create 的输入。Case Create 仍负责按 map 读取上下文、设计架构、上下文索引、steps 和验收标准。

## 文件职责

| 文件 / 目录 | 是否默认创建 | 职责 | 不承担 |
|---|---:|---|---|
| `think.md` | 是 | Think 主状态、问题、讨论摘要、当前判断、下一步 | 不保存完整聊天全文 |
| `research.md` | 否 | 研究问题、资料层级、综合结论、证据缺口 | 不做泛资料仓库 |
| `research/` | 否 | 并行调研分支、专题报告、分身回流结果 | 不直接写长期 L2 |
| `options.md` | 否 | 方案列表、取舍、排除理由、推荐路线 | 不替代最终 decision |
| `decision.md` | 否 | 明确出口、理由、后续动作、风险和 Weave Candidate | 不拆执行 step |
| `handoff.md` | 否 | Create 出口时交给 Case Create 的稳定输入 | 不替代 case.md |
| `doc/` | 否 | 附件、草图、摘录、临时材料 | 不作为全局资料库 |

## 状态字段设计

### 主状态字段

建议在 `think.md` 顶部使用轻量 YAML front matter 或等价表格。字段保持少而稳定：

```yaml
think_id: t0.1
title: "桌面端是否值得做"
status: active
mode: light
phase: clarifying
current_exit: Continue
created_at: 2026-06-20
updated_at: 2026-06-20
source: "用户对话 / inbox / case / 外部资料"
related_case:
related_inbox:
```

字段解释：

| 字段 | 候选值 | 含义 |
|---|---|---|
| `status` | `active` / `paused` / `decided` / `archived` | Think 对象生命周期 |
| `mode` | `light` / `research-heavy` / `handoff` | 当前文件化重量级别 |
| `phase` | `framing` / `clarifying` / `researching` / `comparing` / `deciding` / `handoff` | 当前主要工作 |
| `current_exit` | `Continue` / `Research` / `Create` / `Kill` / `Defer` / `Weave` | 当前建议出口 |
| `related_case` | case 路径或空 | 如果已转 Case，记录关联 |
| `related_inbox` | inbox 条目或空 | 如果从 Inbox 升级，记录来源 |

### status 与 current_exit 的区别

`status` 是对象生命周期，`current_exit` 是决策出口。

例如：

```text
status: active
current_exit: Research
```

表示 Think 还没结束，但当前最合理动作是继续研究。

```text
status: decided
current_exit: Kill
```

表示已经形成不做的决策，可以归档。

### phase 与 mode 的区别

`mode` 是对象重量：

```text
light / research-heavy / handoff
```

`phase` 是当前正在做什么：

```text
framing / clarifying / researching / comparing / deciding / handoff
```

一个 `research-heavy` Think 后期也可能进入 `handoff` phase；一个 `light` Think 也可以直接 `deciding`。

## 出口字段设计

`decision.md` 或 `think.md` 的决策区应明确记录出口：

```yaml
outcome: Create
confidence: medium
reason: "目标清楚，执行收益高，风险可进入 case 管理"
next_action: "创建 Case，读取 handoff.md"
decided_at: 2026-06-20
```

不同出口的必要字段：

| 出口 | 必填字段 | 后续动作 |
|---|---|---|
| `Continue` | 当前问题、下一轮要澄清的问题 | 继续更新 `think.md` |
| `Research` | research questions、资料范围、成功标准 | 创建 / 更新 `research.md`，按需派发分身 |
| `Create` | why、目标、非目标、建议方案、风险、handoff 路径 | 生成 `handoff.md`，进入 Case Create |
| `Kill` | kill reason、排除依据、避免重复触发的关键词 | 生成或更新 `decision.md`，归档 |
| `Defer` | defer reason、触发条件、重新评估时间或信号 | 生成 `decision.md`，可归档或 paused |
| `Weave` | stable insight、建议归属、证据 | 输出 Weave Candidate，不直接写长期 ADOC |

### 出口状态流

```text
Inbox / 用户模糊想法
-> Think active
   -> Continue
   -> Research -> Continue / Create / Kill / Defer / Weave
   -> Create -> handoff.md -> Case Create
   -> Kill -> archive
   -> Defer -> paused 或 archive
   -> Weave -> Weave Candidate -> archive 或 Continue
```

`Research` 和 `Continue` 通常不是终态；`Create`、`Kill`、`Defer`、`Weave` 可以是终态，也可以在用户确认后继续迭代。

## 恢复链路

Think 恢复链路建议写入后续 Agent Entry / map / skill：

```text
AGENTS.md
-> _adoc/index.md
-> _adoc/map.md
-> _adoc/think/index.md
-> _adoc/think/active/{think}/think.md
-> 按 think.md 引用读取 research.md / options.md / decision.md / handoff.md
```

恢复规则：

1. 用户明确说 Think / 讨论任务 / 要不要做 / 从模糊到清晰时，先经 `_adoc/map.md` 命中 AIPD Think。
2. 如果用户指定某个 Think，读 `_adoc/think/index.md` 找入口。
3. 如果只有一个 active Think 且语义匹配，默认继续该 Think；多个候选时询问用户。
4. 读取 `think.md` 后，只按其中的“当前需要读取”继续读 `research.md`、`options.md`、`decision.md` 或 `handoff.md`。
5. 不全量扫描所有 active/archive Think。
6. 如果聊天记忆与 Think 文件冲突，以 Think 文件为事实源，并指出冲突。
7. 已归档 Think 默认不参与普通上下文检索，除非用户明确要求复盘或相关 case / weave 引用它。

## 最小模板草案

以下模板只作为本 step 设计草案，不写入源码模板。

### `_adoc/think/index.md`

```md
# AIPD Think Index

Think 是 Case 之前的一等对象，负责把模糊想法通过讨论、调研、方案比较和决策出口变成 Create / Kill / Defer / Research / Weave / Continue。

## Active

| ID | 标题 | Mode | Phase | Current Exit | Updated | 入口 |
|---|---|---|---|---|---|---|

## Decided / Pending Handoff

| ID | 标题 | Outcome | Next | Updated | 入口 |
|---|---|---|---|---|---|

## Archive

| ID | 标题 | Outcome | Archived | 入口 |
|---|---|---|---|---|
```

### `think.md`

```md
---
think_id: t{N}
title: "{标题}"
status: active
mode: light
phase: framing
current_exit: Continue
created_at: {YYYY-MM-DD}
updated_at: {YYYY-MM-DD}
source: "{用户对话 / inbox / case / 外部资料}"
related_inbox:
related_case:
---

# Think: {标题}

## 1. 当前问题

一句话说明这个 Think 想弄清楚什么。

## 2. 背景和触发

- 来源：
- 为什么现在讨论：
- 已知约束：

## 3. 当前理解

- 用户目标：
- 目标用户 / 场景：
- 可能价值：
- 主要不确定：

## 4. 关键问题

- [ ] {问题 1}
- [ ] {问题 2}
- [ ] {问题 3}

## 5. 当前判断

- 当前出口：Continue / Research / Create / Kill / Defer / Weave
- 判断理由：
- 风险：

## 6. 下一步

- 下一步动作：
- 是否需要 Research：
- 是否需要用户确认：

## 7. 文件索引

- `research.md` - {如有}
- `options.md` - {如有}
- `decision.md` - {如有}
- `handoff.md` - {如有}

## 8. 过程摘要

> 只写压缩摘要，不贴完整聊天。

- {YYYY-MM-DD}：{发生了什么，形成了什么判断}
```

### `research.md`

```md
# Research: {Think 标题}

## 1. 研究目标

本次研究服务哪个决策问题。

## 2. 研究问题

- [ ] {关键未知点 1}
- [ ] {关键未知点 2}

## 3. 资料层级

- 一级资料：GitHub / 官方文档 / 项目 README / release / issue / discussion
- 二级资料：维护者博客 / 实践文章 / 访谈 / 复盘
- 三级资料：论文 / 学术资料，仅限直接相关

## 4. 资料清单

| 资料 | 层级 | 纳入 / 暂缓 / 排除 | 理由 |
|---|---:|---|---|

## 5. 综合结论

- 结论：
- 依据：
- 证据缺口：

## 6. 对决策的影响

- 支持 Create 的证据：
- 支持 Kill / Defer 的证据：
- 仍需继续 Research 的问题：
```

### `options.md`

```md
# Options: {Think 标题}

## 方案总表

| 方案 | 说明 | 收益 | 成本 | 风险 | 判断 |
|---|---|---|---|---|---|

## 推荐方案

- 推荐：
- 理由：
- 前提：

## 排除方案

- {方案}：{排除原因}
```

### `decision.md`

```md
---
outcome: Create
confidence: medium
decided_at: {YYYY-MM-DD}
---

# Decision: {Think 标题}

## 1. 决策出口

Create / Kill / Defer / Research / Weave / Continue

## 2. 决策理由

- 主要依据：
- 关键风险：
- 已排除方案：

## 3. 后续动作

- 如果 Create：读取 `handoff.md` 进入 Case Create。
- 如果 Kill：归档并记录避免重复触发的原因。
- 如果 Defer：记录重新评估条件。
- 如果 Research：更新 `research.md` 的问题清单。
- 如果 Weave：列出 Weave Candidate。

## 4. Weave Candidate

- {候选归属}：{稳定结论}
```

### `handoff.md`

```md
# Think -> Case Create Handoff: {标题}

## 1. Create 结论

- 为什么要做：
- 现在做的理由：
- 不做什么：

## 2. 目标和边界

- 一句话目标：
- 成功标准：
- 非目标：

## 3. 关键依据

- 来自讨论：
- 来自 research：
- 来自 options：

## 4. 推荐方案

- 推荐路径：
- 备选路径：
- 已排除方案：

## 5. 风险和未知

- 可在 Case 管理的风险：
- 需要用户确认的问题：
- 不能进入 Case 前必须解决的问题：

## 6. 上下文入口建议

- `_adoc/map.md`
- {L3 / L4 / L5 / README / 外部资料入口}

## 7. Case Create 建议

- 建议 case 名：
- 建议层级判断：
- 建议 step 方向：
- 建议验收口径：
```

## 轻量 Think / Research-heavy Think / Create Handoff 的分流

### Light Think

进入条件：

- 用户只是想讨论一个想法。
- 预计 1-3 轮可以形成当前判断。
- 不需要外部深度检索。

文件：

```text
think.md
```

出口：

```text
Continue / Create / Kill / Defer / Weave
```

升级条件：

- 出现关键未知点阻碍判断 -> Research-heavy。
- 出现两个以上可行路线且取舍困难 -> 增加 `options.md`。
- 出口为 Create -> 增加 `decision.md` 和 `handoff.md`。

### Research-heavy Think

进入条件：

- 陌生领域、陌生技术或外部生态复杂。
- 需要查 GitHub / 官方文档 / 博客 / 论文。
- 需要分身 Agent 并行读取和总结资料。

文件：

```text
think.md
research.md
research/
options.md 可选
```

约束：

- 先列 research questions，再调研。
- 每个分身只围绕一个问题回流结论、证据、风险和路径。
- `research.md` 必须把资料分为一级 / 二级 / 三级。
- 不把调研材料直接写入 L2/L3，除非后续 Weave。

### Create Handoff

进入条件：

- 当前出口明确为 `Create`。
- 用户或主 Agent 准备进入 Case Create。
- Case Create 需要稳定输入，而不是从聊天重新理解。

文件：

```text
decision.md
handoff.md
```

约束：

- `handoff.md` 只交接 why / what / not doing / evidence / risks / context suggestions。
- 不在 Think 阶段拆正式 Case steps。
- 不替代 Case Create 的上下文索引和架构设计。

## 与现有对象的边界

| 对象 | 与 Think 的关系 |
|---|---|
| Inbox | Inbox 是低承诺 capture。用户想让 AI 主动澄清时，才升级为 Think。 |
| Case | Case 只承接 Create 出口后的规划和执行。Think 不创建执行 step。 |
| SOP | SOP 是可重复 Agent 程序。Think 是一次想法的决策状态。 |
| Weave | Think 产生稳定认知时输出 Weave Candidate，但不直接写 L1-L5。 |
| L2 Research | Think research 是当前决策素材；稳定外部世界资料才进入 L2。 |

## 未决问题

1. **Think 编号规则是否复用 case 风格**
   - 候选：`t0.1-{slug}` 与 case `c0.9-{slug}` 对齐。
   - 风险：如果 Think 数量很多，手动编号会有管理成本。

2. **Defer 的归属**
   - 候选 A：`status: paused` 留在 active。
   - 候选 B：移动到 archive，并在 index 中按 `Outcome: Defer` 可检索。
   - 建议：短期可继续讨论的 Defer 留 active；长期延后归档。

3. **decision.md 是否每次都必须存在**
   - 建议：不是。轻量 Continue / Research 可只写在 `think.md`；当出现 Kill / Defer / Create / Weave 这类明确出口时再生成。

4. **handoff.md 是否可以由 Case Create 自动生成**
   - 候选：Think skill 在 Create 出口时生成；Case Create 读取。
   - 风险：如果自动生成但用户未确认，仍可能过早进入执行。
   - 建议：生成 handoff 可以自动，进入 Case Create 必须显式确认。

5. **是否需要 Think Archive skill**
   - 当前不建议单独做。初期由 `aipd-think` 管理归档即可；成熟后再评估是否拆出 `aipd-think-archive`。

6. **Research 分身报告是否放 `research/` 还是 case doc**
   - Think 阶段放 Think 的 `research/`。
   - 如果已经进入 Case，则执行调研放 case `doc/`。

7. **用户只想聊、不想落文件时怎么办**
   - 需要 `aipd-think` 支持“先讨论，达到阈值再建 Think 对象”的模式。
   - 触发阈值可以是：讨论超过一轮、需要外部调研、需要恢复、出现明确候选出口。

8. **是否需要 Desktop UI**
   - 本 case 不讨论 Desktop UI。后续 Desktop 只应消费 Think 对象，不反向决定 Think 文件结构。

## 对 s5 的输入

s5 设计 Think -> Case Create 交接和 `aipd-think` skill 边界时，应继承：

- Think 基础目录为 `_adoc/think/index.md`、`active/`、`archive/`。
- 单个 Think 只有 `think.md` 必须存在，其余文件按需创建。
- `Research` 是决策前置动作，不是执行 step。
- `Create` 必须输出 `handoff.md`，但不自动进入 Case Create。
- `handoff.md` 不替代 `case.md`，只给 Case Create 提供稳定输入。
- `aipd-think` 必须禁止执行型文件修改，除非修改 Think 自身文档。

## Weave 候选

- L3 Core：补充 Think 的文件化原则：Think 是可恢复决策对象，但默认轻量、按需加重。
- L4 Product：补充 AIPD Think 的三种模式：Light Think / Research-heavy Think / Create Handoff。
- `_adoc/map.md`：后续实现后补 Think 恢复链路和 `_adoc/think/index.md` 入口。
- `aipd-case-create`：后续实现 case 中收窄 Case Create，要求优先读取 Think handoff（如果存在）。

# Case: c0.10-aipd-capability-object-model

> **本次事项目标**：讨论并设计 AIPD 的原子能力层和统一中间对象模型，让 Think / Case Create / Case Run / Weave / SOP 能复用同一组底层能力，而不是各自在 skill 内重复实现上下文扫描、调研、方案比较、决策检查和交接逻辑。
>
> **收口结论（2026-06-27）**：本 case 不再继续推进为独立的能力层重构事项。后续 AIPD 已收敛到 phase-first case 生命周期：`Goal -> Think -> Design -> Execute -> Verify -> Close`。Think 不再作为独立 `_adoc/think/` 系统或独立 `aipd-think` skill 推进，而是作为 Case 内 phase 承接当前目标下的信息同步、调研、比较和抉择。本文保留为原子能力和中间对象模型的参考材料，不作为待执行 case。
>
> **暂停说明（2026-06-27）**：原子能力和统一中间对象模型暂不继续设计或实现。Context Pack、Research Pack、Decision Record、Handoff、Weave Candidate 等对象只作为后续优化 case phase、work package 和 Agent 交接格式时的参考材料。

## 目录结构

```text
_adoc/case/c0.10-aipd-capability-object-model/
├── case.md
├── steps/
│   └── s1-capability-object-model-design.md
└── doc/
    └── discussion-seed.md
```

## 1. 目标

- **保存新架构判断**：把“Think 可能只是阶段，不是单一动作；底层应拆成原子能力”的判断固化下来。
- **设计统一中间对象模型**：明确各原子能力之间交换哪些对象，例如 Context Pack、Research Pack、Decision Record、Spec Pack、Task Plan、Execution Result、Verification Report、Weave Candidate、Handoff。
- **设计原子能力层**：梳理 context.scan、research.deep、domain.lens、options.compare、decision.check、handoff.generate、weave.extract、verify.review、execution.run 等能力的输入输出和复用关系。
- **吸收开源项目精华**：把 OpenSpec、Spec Kit、BMAD、Kiro、Cline、Open SWE、OpenHands、搜索 / RAG / repo map 工具等看作能力范式或外部 adapter 候选，而不是直接拼接多个封闭系统。
- **降低重复实现**：让 Think / Case Create / Case Run / Weave / SOP 通过统一能力和对象组合工作，避免每个 skill 各自重写上下文检索、深度调研、方案比较和回写候选提取。

## 2. 场景分流

- **项目类型**：AIPD 框架项目。
- **Case 类型**：L3 核心模型 + L4 产品能力 + L5 skill 架构边界的底层架构设计 case。
- **适用流程**：目标型 / 认知型 case。当前先沉淀讨论和设计框架，不直接实现能力层。
- **不适用经验**：不套用 Vue 前端实现流程，不创建代码执行 step，不把外部开源项目直接接入 AIPD。
- **和 c0.9 的关系**：`c0.9-aipd-think-system-design` 证明 Think 需要前置讨论和决策对象；本 case 进一步把 Think 中暴露的上下文扫描、深度检索、方案比较、handoff、weave candidate 等能力抽象成跨流程可复用原子能力。

## 3. 上下文索引

### 层级判断

- **L2 Research**：涉及外部开源项目、行业实践、agent workflow、spec-driven development、search / RAG / repo map 工具。
- **L3 Core**：涉及 AIPD 核心成立模型的重构，尤其 Think / 任务澄清决策模型、任务执行模型、项目知识库维护模型、Map-first 上下文检索模型、Agent 协作思考模型、SOP / AI 程序模型。
- **L4 Product**：涉及 AIPD Think、Case Create、Case Run、Weave、SOP 这些产品能力如何调用统一原子能力。
- **L5 Dev**：后续实现会影响 skill 目录、模板、agent 调度、外部 adapter、分身 Agent 调用和可能的模型选择策略。
- **Case / 历史 Step**：需要读取 `c0.9-aipd-think-system-design` 的调研和设计文档作为前置依据。

### 项目认知

- `_adoc/index.md` - AIPD 项目入口和 L3 / L4 / L5 / case / SOP 路由。
- `_adoc/map.md` - Think、Case、Weave、SOP、高频能力入口。
- `_adoc/L3-core/index.md` - AIPD 核心成立模型。
- `_adoc/L3-core/horizontal-capabilities.md` - Think、Case、SOP、Weave、map 等横向能力关系。
- `_adoc/L3-core/vertical-concept-modules.md` - L1-L6、Think、Case、Step、SOP、Agent 使用方案等纵向模块。
- `_adoc/L4-product/index.md` - AIPD 产品能力总览。
- `_adoc/L4-product/map.md` - 产品功能线地图。
- `_adoc/L5-dev/index.md` - Codex / Agent / skill 架构和工程约束。

### 相关 case / doc

- `_adoc/case/archive/c0.9-aipd-think-system-design/case.md` - Think 调研设计 case。
- `_adoc/case/archive/c0.9-aipd-think-system-design/doc/openspec-think-analysis.md` - OpenSpec 机制分析。
- `_adoc/case/archive/c0.9-aipd-think-system-design/doc/peer-framework-survey.md` - Spec Kit、BMAD、Open SWE、Kiro、Cline 等同类资料调研。
- `_adoc/case/archive/c0.9-aipd-think-system-design/doc/aipd-boundary-comparison.md` - Inbox / Think / Case / SOP / Weave 边界矩阵。
- `_adoc/case/archive/c0.9-aipd-think-system-design/doc/think-object-state-design.md` - Think 对象和状态流转设计。
- `_adoc/case/archive/c0.9-aipd-think-system-design/doc/handoff-and-skill-boundary.md` - Think -> Case Create handoff 和 skill 边界设计。
- `_adoc/case/c0.10-aipd-capability-object-model/doc/discussion-seed.md` - 本 case 的原始讨论种子。

### 兜底搜索

- `rg "Think|Case Create|Case Run|Weave|SOP|Context Pack|Research Pack|Decision Record|Handoff|Weave Candidate" _adoc aipd-skill/src docs`
- `rg "OpenSpec|Spec Kit|BMAD|Kiro|Cline|Open SWE|OpenHands|requirements analysis|Plan Act|artifact DAG" _adoc docs aipd-skill/src`
- Web 搜索：`AI coding atomic capability`, `agent workflow intermediate artifacts`, `spec driven development artifact model`, `repo context scan agent`, `AI coding requirements analysis`

## 4. 已确认讨论结论

### 4.1 Think 是阶段，不是一个巨型动作

Think 更像一个阶段 / 工作空间 / 编排场景，而不是单个大 skill 动作。它内部会组合多个原子能力：

- 上下文扫描。
- 深度调研。
- 领域框架选择。
- 方案比较。
- 决策检查。
- handoff 生成。
- Weave Candidate 提取。

因此，`aipd-think` 不应自己实现所有逻辑，而应维护 Think 对象和状态，并调用可复用能力。

### 4.2 原子能力要跨 skill 复用

`context.scan` 不只 Think 需要，Case Create、Weave、普通开发也需要。

`research.deep` 不只 Think 需要，L2 research、技术选型、外部框架吸收也需要。

`weave.extract` 不只 Weave 需要，Think、Case Run、Case Archive、普通开发结束都需要。

如果每个 skill 里各写一遍，AIPD 会变成多个重复的小流程。

### 4.3 外部开源项目不能直接拼接

很多开源项目看起来像原子能力，但实际上是自带闭环的小系统：

- Spec Kit 自带 constitution / specify / clarify / plan / tasks / implement。
- OpenSpec 自带 explore / proposal / specs / design / tasks / apply / verify / archive。
- BMAD 自带角色、分析阶段、PRD、架构、story、dev workflow。
- Cline 自带 Plan / Act、deep planning、task handoff、subagents。
- Open SWE / OpenHands 自带 sandbox、middleware、agent runtime、PR / automation。

直接拼接会导致多套状态、多套文档、多套命名和多套上下文互相打架。AIPD 应抽取能力范式和对象模型，而不是把多个封闭系统堆在一起。

### 4.4 原子能力层的前提是统一中间对象模型

真正的原子能力必须满足：

- 输入清楚。
- 输出清楚。
- 状态可记录。
- 证据可追溯。
- 能被其他能力消费。
- 能被上层 workflow 组合。

因此，AIPD 需要先设计统一中间对象，例如：

| 对象 | 可能用途 |
|---|---|
| Context Pack | 上下文扫描结果，按相关性列出 L1-L5 / case / README / L6 / 外部入口 |
| Research Pack | 研究问题、资料层级、证据、结论、证据缺口 |
| Decision Record | 当前判断、出口、理由、信心、风险、非目标 |
| Spec Pack | 需求、约束、验收、用户可见行为、冲突和缺口 |
| Task Plan | 任务拆分、依赖、并行性、验收口径 |
| Execution Result | step / agent 执行结果、改动、验证、风险 |
| Verification Report | 完整性、正确性、一致性、证据覆盖 |
| Weave Candidate | 可能进入 L3 / L4 / L5 / README / map 的稳定认知 |
| Handoff | 阶段间交接输入，如 Think -> Case Create、Case Create -> Run |

这些对象是能力之间的接口。外部项目只能通过这些对象被 AIPD 吸收。

### 4.5 外部项目的正确用法

正确问题不是“要不要集成某个项目”，而是：

- 这个项目贡献了哪个原子能力？
- 这个能力在 AIPD 中由谁调用？
- 它输出哪个中间对象？
- 它是内置能力、外部 adapter，还是只作为设计参考？

示例：

- OpenSpec / Spec Kit / Kiro：贡献 spec / requirements / plan / tasks / verify 范式。
- BMAD：贡献 brainstorm / PRFAQ / product brief / analysis 范式。
- Cline：贡献 Plan / Act 边界、deep planning、subagent research 范式。
- Open SWE / OpenHands：贡献 execution runtime / sandbox / middleware / validation 范式。
- 搜索 / RAG / repo map 工具：贡献 context scan / evidence pack 范式。

## 5. 本次边界

### 2026-06-27 收口后的边界

- **保留参考**：Context Pack、Research Pack、Decision Record、Handoff、Weave Candidate 等对象模型仍可作为后续优化 Case phase、work package 和 Agent 交接格式的参考。
- **不再单独推进**：不再从本 case 派生独立 Capability Registry、独立 `_adoc/think/` 或独立 `aipd-think` skill。
- **已被吸收的部分**：Think 的运行位置已调整为 Case 生命周期内的 `Think phase`；Case Create / Run / Archive 的旧拆分已收敛为统一 `aipd-case`。
- **上层 Human-AI Think 不归 AIPD 管**：个人助手、日记、个人 OKR、跨项目 Think 和个人经验库属于 Human-AI 协作层；AIPD 只处理项目 case 内的 Think phase 和项目执行交接。

### 要做

- 创建本 case，保存“原子能力层 + 统一对象模型”的核心讨论。
- 将本方向和 c0.9 Think 体系设计区分开。
- 为后续继续讨论能力对象模型、能力注册表、外部项目映射和实现路线提供上下文入口。
- 先创建一个设计 step，后续进入新 case 后再继续推进。

### 不做

- 不实现能力层。
- 不修改 skill。
- 不创建 Capability Registry。
- 不接入任何外部开源项目。
- 不推翻 c0.9 Think 设计；本 case 是在 c0.9 之上进一步抽象。
- 不把所有开源项目当成 AIPD 的依赖。

## 6. Step 列表

- [ ] `steps/s1-capability-object-model-design.md` - 已取消执行；本 case 保留讨论种子和对象模型参考，不再继续拆 step。

## 7. 后续候选事项

- **能力清单设计**：context.scan、research.deep、domain.lens、requirements.analyze、spec.generate、options.compare、decision.check、handoff.generate、weave.extract、verify.review、execution.run。
- **对象模型设计**：Context Pack、Research Pack、Decision Record、Spec Pack、Task Plan、Execution Result、Verification Report、Weave Candidate、Handoff 的字段和落文件规则。
- **能力注册表**：是否需要 `_adoc/capabilities/`、`aipd-skill/src/core/capabilities/` 或 SOP 形式承载能力说明。
- **外部项目映射**：把 OpenSpec、Spec Kit、BMAD、Kiro、Cline、Open SWE、OpenHands、搜索 / RAG 项目映射到能力范式，而不是直接拼接。
- **模型策略**：某些原子能力是否适合用更便宜、更大上下文、更擅长搜索的模型或分身 Agent 执行。
- **和 Think 实现的关系**：是否先做能力对象模型，再实现 `aipd-think`，避免 Think 内部重复实现一堆能力。

## 8. 验收标准

- [x] 新 case 已创建，能承接后续讨论。
- [x] 已保存用户关于“Think 是阶段 / 原子能力层 / 统一对象模型 / 外部项目不能直接拼接”的完整核心认知。
- [x] 已明确本 case 与 c0.9 Think 体系设计的关系。
- [x] 已创建后续设计 step，但未开始执行重构。

## 9. Weave 反向编织候选

- `_adoc/L3-core/index.md` - 若本方向确认，可新增或调整 AIPD 核心成立模型，补充 Capability Object Model / 原子能力层。
- `_adoc/L3-core/horizontal-capabilities.md` - 可补充原子能力层如何支撑 Think / Case / Weave / SOP。
- `_adoc/L4-product/index.md` - 如果原子能力层成为用户可调用 / Agent 可组合能力，可新增产品能力边界。
- `_adoc/map.md`、`_adoc/L3-core/map.md` - 后续补“原子能力 / Capability Object Model / Context Pack / Research Pack”等检索入口。
- `aipd-skill/src/skills/aipd-case-create/SKILL.md`、`aipd-skill/src/skills/aipd-weave/SKILL.md`、未来 `aipd-think` - 后续实现时调整为调用原子能力。

## 10. 自迭代观察锚点

- [ ] 后续讨论是否能区分“阶段 / workflow”和“原子能力”。
- [ ] Agent 是否避免把外部项目当成整体依赖，而是抽取能力范式和对象接口。
- [ ] 设计是否先统一中间对象，再讨论能力实现。
- [ ] 是否发现现有 skill 中重复实现的上下文扫描、调研、方案比较和 Weave Candidate 提取逻辑。
- [ ] 是否能从本 case 派生出更清晰的实现 case，而不是直接大改所有 skill。

## 11. 归档状态

- **状态**：已暂停，暂不推进
- **创建时间**：2026-06-20
- **暂停时间**：2026-06-27
- **归档时间**：

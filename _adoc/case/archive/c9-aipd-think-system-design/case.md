# Case: c9-aipd-think-system-design

> **本次事项目标**：以公开资料调研为目标，系统吸收 GitHub 项目、官方文档、实践博客和必要论文中的前置讨论 / spec / decision / task shaping 机制，设计 AIPD Think 体系，把“模糊想法 -> 讨论 / 调研 / 方案比较 -> 决策出口 -> Case Create”的前置层设计成一等能力。
>
> **归档结论（2026-06-27）**：本 case 设计的独立 Think 问题已被新的 phase-first case 生命周期吸收。Think 不再作为独立 `_adoc/think/` 或独立 `aipd-think` skill 推进，而是作为 Case 内 `Think phase` 承接信息同步、调研、比较和抉择。本 case 作为历史调研、边界矩阵和 handoff 设计参考归档。

## 目录结构

```text
_adoc/case/archive/c9-aipd-think-system-design/
├── case.md
├── steps/
│   ├── s1-openspec-think-analysis.md
│   ├── s2-peer-framework-survey.md
│   ├── s3-aipd-boundary-comparison.md
│   ├── s4-think-object-state-design.md
│   └── s5-handoff-and-skill-boundary.md
└── doc/
    ├── openspec-think-analysis.md
    ├── peer-framework-survey.md
    ├── aipd-boundary-comparison.md
    ├── think-object-state-design.md
    └── handoff-and-skill-boundary.md
```

## 1. 目标

- **公开资料驱动调研**：以 GitHub 项目、官方文档、公开博客文章和必要论文为主要资料源，调查 AI coding / spec-driven development / agent workflow / task shaping 领域的前置讨论和决策机制。
- **吸收同类项目经验**：重点调研 OpenSpec 的 `/opsx:explore`、proposal / specs / design / tasks / verify / archive 机制，并对比 Spec Kit、BMAD、Open SWE 等已知同类项目；调研过程中发现更相关的新项目时，记录候选并继续迭代调查。
- **设计 Think 一等对象**：明确 Think 与 Inbox、Case、SOP、Weave、L1-L5 的边界，避免把前置讨论继续塞在聊天上下文里。
- **定义状态流转**：设计 Think 的 Create / Kill / Defer / Research / Weave / Continue 等出口，以及每个出口如何落文件。
- **设计交接格式**：定义 Think 转 Case Create 时应交付哪些稳定输入，避免 Case Create 继续承担开放式讨论。
- **形成后续实现依据**：产出可用于创建 `aipd-think` 实现 case 的设计文档，但本 case 不实现 skill。

## 2. 场景分流

- **项目类型**：AIPD 框架项目。
- **Case 类型**：L3 / L4 / SOP / skill 边界交叉的目标型 / 认知型 case。
- **适用流程**：通用 case-create + 调研型 steps。每个 step 输出设计或调研文档，不修改业务代码。调研过程允许发现新资料源和新项目，再回补到候选清单和调研报告。
- **不适用经验**：不套用 Vue 前端实现型 case，不创建页面 / 组件 / provider / 架构图实现 step。
- **关键前置认知**：当前已经通过 Weave 沉淀 Think 地基：Think 是 Case 之前的一等对象，是人和 AI 的高带宽思考缓冲层，出口包括 Create / Kill / Defer / Research / Weave / Continue。

## 3. 上下文索引

### 层级判断

- **L2 Research**：涉及 OpenSpec、Spec Kit、BMAD、Open SWE 等外部同类项目和玩法范式。
- **L3 Core**：涉及 Think / 任务澄清决策模型、任务执行模型、项目知识库维护模型、Agent 协作思考模型。
- **L4 Product**：涉及规划中的 AIPD Think 产品能力、Case Create / Run / Archive、Inbox、Weave、SOP。
- **L5 Dev**：后续实现 `aipd-think` skill 时会涉及，但本 case 只记录边界，不写实现。
- **Case / 历史 Step**：本 case 是 Think 体系设计入口；后续实现 case 应读取本 case 的最终设计文档。

### 项目认知

- `_adoc/index.md` - AIPD 项目入口和 Think / Case / SOP / Weave 读取路径。
- `_adoc/map.md` - Think、Case Create、Case Run、Weave、SOP 等高频入口。
- `_adoc/L3-core/index.md` - 七个核心成立模型，尤其 Think / 任务澄清决策模型。
- `_adoc/L3-core/map.md` - Think / AIPD Think / 任务澄清等核心概念索引。
- `_adoc/L3-core/horizontal-capabilities.md` - Think 系统、Case 系统、SOP 系统、Weave 的横向关系。
- `_adoc/L3-core/vertical-concept-modules.md` - Think 与 Case / Step / SOP / OKR 等纵向模块关系。
- `_adoc/L4-product/index.md` - AIPD Think 作为规划中产品能力的边界。
- `_adoc/L4-product/map.md` - AIPD Think、Case Create、Inbox、Weave、SOP 的功能线检索。
- `_adoc/inbox.md` - 已记录的两个前置灵感：横向扩展模型、任务从模糊到清晰的前置讨论层。

### 外部参考入口

- `https://github.com/Fission-AI/OpenSpec` - OpenSpec 主仓库。
- `https://github.com/Fission-AI/OpenSpec/blob/main/docs/opsx.md` - OPSX workflow，重点看 `/opsx:explore`。
- `https://github.com/Fission-AI/OpenSpec/blob/main/docs/commands.md` - 命令文档，重点看 explore / propose / new / continue。
- `https://github.com/Fission-AI/OpenSpec/blob/main/docs/concepts.md` - artifact DAG、custom schema、research-first 等概念。
- `https://github.com/github/spec-kit` - GitHub Spec Kit，对比 specify / plan / tasks / implement / clarify。
- `https://github.com/bmad-code-org/BMAD-METHOD` - BMAD Method，对比 brainstorm / brief / PRD / architecture / implementation。
- `https://github.com/langchain-ai/open-swe` - Open SWE，对比 coding agent 计划和执行机制。

### 资料来源分层

- **一级资料**：GitHub 仓库、官方文档、项目 README、命令文档、模板、示例和 release / issue / discussion 中的项目维护者说明。
- **二级资料**：公开大神 / 维护者 / 实践者博客文章、长文、访谈和项目复盘；重点看它们如何描述真实 workflow、失败经验和取舍。
- **三级资料**：论文和学术资料；只有当它们直接涉及 AI agent planning、task decomposition、specification、requirements clarification、decision making 或 software engineering workflow 时纳入，不做泛论文综述。
- **发现机制**：调研中如果发现比现有候选更相关的项目、文章或论文，应在报告中新增“候选资料”并说明纳入 / 暂缓 / 排除理由。

### 兜底搜索

- `rg "Think|AIPD Think|任务澄清|前置讨论|要不要做|从模糊到清晰" _adoc aipd-skill/src docs`
- `rg "Case Create|Case Run|Inbox|Weave|SOP|Continue|Research|Defer|Kill" _adoc aipd-skill/src docs`
- Web 搜索：`OpenSpec explore propose tasks verify`, `spec driven development AI coding assistant`, `BMAD method PRD AI agent`, `Spec Kit clarify plan tasks`, `AI agent requirements clarification`, `AI coding agent planning workflow`, `task shaping AI software development`

## 4. 本次边界

### 要做

- 调研 OpenSpec 的 Think 类机制，并提炼可借鉴点和不足。
- 搜罗并对比同类项目、公开文档、博客文章和必要论文中的前置讨论、spec、research、decision、task shaping 机制。
- 允许在调研过程中发现新的高相关资料源，并把它们纳入候选清单继续整理。
- 设计 AIPD Think 与 Inbox、Case、SOP、Weave 的边界和状态流转。
- 设计 Think 对象建议结构和 Think -> Case Create 的交接格式。
- 形成后续实现 `aipd-think` skill 的设计依据和 Weave 候选。

### 不做

- 不实现 `aipd-think` skill。
- 不创建 `_adoc/think/` 正式目录结构。
- 不修改 case-create / case-run 代码或模板。
- 不把 OpenSpec / Spec Kit / BMAD 或任何外部流程原样照搬成 AIPD 流程。
- 不做泛行业报告或泛论文综述；只纳入能帮助设计 AIPD Think 的资料。
- 不把调研过程直接写入长期 L2/L3/L4；稳定结论等 case 完成后再 weave。

## 5. Step 列表

- [x] `steps/s1-openspec-think-analysis.md` - 深入分析 OpenSpec 的 explore / artifact DAG / verify / archive 机制。
- [x] `steps/s2-peer-framework-survey.md` - 调研 Spec Kit、BMAD、Open SWE 等同类项目的前置讨论与 spec 机制。
- [x] `steps/s3-aipd-boundary-comparison.md` - 对比 AIPD Inbox / Think / Case / SOP / Weave 边界，形成边界矩阵。
- [x] `steps/s4-think-object-state-design.md` - 设计 Think 对象结构、状态流转和文件化恢复模型。
- [x] `steps/s5-handoff-and-skill-boundary.md` - 设计 Think -> Case Create 交接格式和 `aipd-think` skill 边界。

## 6. 后续候选事项

- **实现 `aipd-think` skill**：本 case 设计稳定后，单独创建实现 case。
- **更新 case-create 边界**：如果 Think 设计确认，应把 Case Create 收窄为“已决定执行后的规划阶段”。
- **新增 `_adoc/think/` 模板**：是否创建目录、index、模板、archive 规则，等本 case 设计完成后再定。
- **Desktop 支持 Think Workspace**：后续 AIPD Desktop 可能需要把 Think 和 Case 一样作为工作空间展示，但不在本 case 实现。
- **新增调研目标回补**：如果 s1 / s2 发现更相关项目、博客或论文，先在 `doc/peer-framework-survey.md` 标注候选，再决定是否补充新 step。

## 7. 验收标准

- [x] OpenSpec 的 Think 类机制已形成调研报告，并明确哪些可借鉴、哪些不适合照搬。
- [x] 至少 3 个同类项目 / 框架已对比，覆盖前置讨论、spec、research、decision 或 task shaping 机制。
- [x] 调研报告说明已使用的资料来源层级：GitHub / 官方文档 / 博客文章 / 必要论文，并列出发现但暂未深入的候选资料。
- [x] AIPD Inbox / Think / Case / SOP / Weave 边界已形成矩阵，能回答“什么信息放哪里”。
- [x] Think 对象结构和状态流转已形成设计文档。
- [x] Think -> Case Create 交接格式和 `aipd-think` skill 边界已形成设计文档。
- [x] 输出清晰后续建议：是否进入实现 case、需要 weave 到哪些 ADOC、哪些问题暂缓。

## 8. Weave 反向编织候选

- `_adoc/L3-core/index.md` - 根据最终设计补充 Think / 任务澄清决策模型的稳定定义。
- `_adoc/L3-core/horizontal-capabilities.md` - 根据最终设计补充 Think 系统的状态流转和与 Case / Weave 的关系。
- `_adoc/L4-product/index.md`、`_adoc/L4-product/map.md` - 根据最终设计更新 AIPD Think 产品能力边界。
- `_adoc/map.md`、`_adoc/L3-core/map.md` - 根据最终命名和用户说法补充检索入口。
- `aipd-skill/src/skills/aipd-case-create/SKILL.md` - 若确认边界变化，后续实现 case 中调整 Case Create 职责。
- 后续 `aipd-think` skill / templates - 本 case 只产出候选，不直接实现。

## 9. 自迭代观察锚点

- [ ] 调研分身是否只回流结论、证据、风险、建议和报告路径，不把长网页摘录塞回主线。
- [ ] Agent 是否区分 OpenSpec 的 explore 与 AIPD Think：前者偏探索聊天，后者应成为状态化决策对象。
- [ ] 设计时是否避免把所有讨论都默认推向 Case Create。
- [ ] 设计时是否保留 Kill / Defer / Research / Weave / Continue 等非执行出口。
- [ ] 设计时是否避免把 Think 误写成 Case 子目录或 Inbox 的增强版。
- [ ] 若发现外部项目资料不足，Agent 是否明确标注证据缺口，而不是凭印象补全。

## 10. 归档状态

- **状态**：已归档
- **创建时间**：2026-06-20
- **归档时间**：2026-06-27

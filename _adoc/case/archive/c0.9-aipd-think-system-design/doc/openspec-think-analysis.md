# OpenSpec Think 机制分析

## 结论先行

OpenSpec 有 AIPD Think 的前置雏形，但还没有形成 AIPD 所需的“一等决策对象”。

它的 `/opsx:explore` 明确用于在创建 change 前思考想法、调查问题、澄清需求和比较方案，并且官方命令文档写明 exploration 阶段不创建 artifacts。也就是说，OpenSpec 已经承认“拆任务前先想清楚”这一步，但默认形态仍是对话式探索，而不是可恢复、可审计、可派发、可归档的决策对象。

OpenSpec 真正强的是 `proposal -> specs/design -> tasks -> apply -> verify -> archive` 这一套 spec-driven change flow。它把“已决定要做”的事项拆成可持久化 artifacts，并用 schema 定义 artifact 依赖。这个机制更接近 AIPD 的 Case Create / Case Run / Archive，而不是完整的 Case Think。

一个重要补充是：OpenSpec 仓库自身已经出现 `openspec/explorations/` 目录，其中 `explore-workflow-ux.md` 正在讨论“exploration 是否应保存为 .md、保存到哪里、如何作为 proposal seed”。这说明 OpenSpec 维护者也意识到当前 explore 的缺口。AIPD 可以在这一点上前进一步：把 Think 从一开始就设计成状态化对象，而不是先做纯聊天再补保存功能。

## 证据链接

- OpenSpec README: https://github.com/Fission-AI/OpenSpec
  - 项目定位为 spec-driven development for AI coding assistants。
  - README 示例展示 `/opsx:propose` 创建 `proposal.md`、`specs/`、`design.md`、`tasks.md`，再 `/opsx:apply`、`/opsx:archive`。
  - README 说明 OpenSpec 目标是在写代码前先对齐 specs，避免需求只留在聊天历史里。
- OPSX workflow: https://github.com/Fission-AI/OpenSpec/blob/main/docs/opsx.md
  - OPSX 是 OpenSpec 的标准 workflow，默认 core profile 包含 `propose`、`explore`、`apply`、`sync`、`archive`。
  - expanded workflow 额外包含 `new`、`continue`、`ff`、`verify`、`bulk-archive`、`onboard`。
  - 文档说明 schema 可自定义 artifact 和依赖，例如 `research -> proposal -> tasks`。
- Commands reference: https://github.com/Fission-AI/OpenSpec/blob/main/docs/commands.md
  - `/opsx:explore` 用于 think through ideas、investigate problems、clarify requirements。
  - `/opsx:explore` 的 tips 明确说 exploration 不创建 artifacts，并可在 insight 清晰后转到 `/opsx:propose` 或 `/opsx:new`。
  - `/opsx:verify` 检查 completeness、correctness、coherence。
  - `/opsx:archive` 检查 artifact / task 状态，按需 sync delta specs，并把 change 移到 archive 保留 audit trail。
- Concepts: https://github.com/Fission-AI/OpenSpec/blob/main/docs/concepts.md
  - flow 图把 OpenSpec 描述为 start change、create artifacts、implement tasks、verify work、archive change。
  - glossary 定义 Artifact、Change、Delta spec、Schema、Source of truth。
  - archive 过程会把 delta spec 合并到 main specs，并保留 change folder 作为历史上下文。
- Default schema: https://raw.githubusercontent.com/Fission-AI/OpenSpec/main/schemas/spec-driven/schema.yaml
  - `proposal` 无依赖，`specs` 和 `design` 依赖 `proposal`，`tasks` 依赖 `specs` 和 `design`，`apply` 依赖 `tasks`。
  - proposal 负责 WHY，specs 负责 WHAT，design 负责 HOW，tasks 负责可追踪执行清单。
- Exploration UX note: https://raw.githubusercontent.com/Fission-AI/OpenSpec/main/openspec/explorations/explore-workflow-ux.md
  - OpenSpec 自身的 exploration 草稿提出：当前 explorations 是 ephemeral conversation，并讨论 optional export、proposal seed、探索文件位置和 explore -> propose handoff。
- Exploration directory: https://github.com/Fission-AI/OpenSpec/tree/main/openspec/explorations
  - 仓库实际存在多个 exploration markdown，说明 OpenSpec 团队已经用文档化探索来推进自身设计。

## 机制拆解

### 1. OpenSpec 的核心定位

OpenSpec 不是单纯任务拆解工具，而是给 AI coding assistant 加一层轻量 spec layer。它关注的是：在写代码前，人和 AI 先对齐要构建什么；在执行后，把变化同步回当前 specs，形成新的 source of truth。

它的默认主链路可以压缩为：

```text
explore 可选
-> propose / new
-> proposal.md
-> specs/ + design.md
-> tasks.md
-> apply
-> verify 可选
-> sync / archive
```

这套链路的中心对象是 `change`，而不是 `exploration`。`change` 一旦创建，就有目录、有 artifacts、有任务状态、有归档路径。`explore` 则默认还没有进入这个状态系统。

### 2. `/opsx:explore` 的职责

`/opsx:explore` 的职责包括：

- 打开非结构化探索对话。
- 调查代码库来回答问题。
- 比较多个方案。
- 生成图示帮助澄清思路。
- insight 清晰后，建议转入 `/opsx:propose` 或 expanded workflow 的 `/opsx:new`。

它适合处理“需求不清、问题要查、方案要比较”的前置阶段。它的价值是阻止用户过早创建正式 change。

但它的边界也很明确：

- 默认不创建 artifacts。
- 不创建 change folder。
- 不维护决策状态。
- 不提供 Kill / Defer / Research / Weave / Continue 这类结构化出口。
- 不保证探索结论自动成为 proposal 的输入。

因此，OpenSpec 的 explore 是“前置探索能力”，不是“前置决策对象”。

### 3. Proposal / specs / design / tasks 的 artifact DAG

OpenSpec 的 `spec-driven` schema 把规划拆成依赖图：

```text
proposal
├── specs
└── design
    └── tasks
```

更准确地说，`specs` 和 `design` 都依赖 `proposal`，`tasks` 同时依赖 `specs` 和 `design`。`apply` 再依赖 `tasks`。

各 artifact 分工清楚：

| Artifact | 主要问题 | 对 AIPD 的对应启发 |
|---|---|---|
| `proposal.md` | 为什么要做、改变什么、影响范围 | Case Create 需要承接 Think 结论中的 why / what / impact |
| `specs/**/*.md` | 系统应有什么用户可见行为和场景 | AIPD 的需求边界要能落到可验收行为 |
| `design.md` | 技术路径、取舍、风险、迁移 | Case Create 的架构 / 边界 / 风险可以独立成 artifact |
| `tasks.md` | 可追踪执行清单 | Step 拆分应依赖已明确的 proposal/spec/design |

这个 DAG 很值得 AIPD 借鉴。AIPD 的 Case Create 不一定永远一次性产出完整 case，可以允许分阶段生成：Think handoff、context index、architecture / boundary、steps、validation plan。

### 4. Verify / sync / archive 的闭环

OpenSpec 的执行闭环不是“任务做完就结束”：

- `/opsx:apply` 读取 `tasks.md` 并按 checkbox 跟踪进度。
- `/opsx:verify` 从 completeness、correctness、coherence 三个维度检查实现是否匹配 artifacts。
- `/opsx:sync` 把 delta specs 合并进 main specs，但 change 仍保持 active。
- `/opsx:archive` 检查 artifacts 和 tasks，必要时 sync，并把 change folder 移到 archive，保留 proposal、design、tasks 等上下文。

这对 AIPD 的启发是：Think / Case / Weave 之间需要一个清楚闭环。尤其 Think 的结果如果进入 Case Create，后面 Case Archive 或 Weave 时应能追溯“当初为什么做”和“哪些方案被排除”。

### 5. Custom schema 与 research-first

OpenSpec 支持 custom schemas，文档示例里可以定义 `research-first`：

```text
research -> proposal -> tasks
```

这说明 OpenSpec 的底层机制允许把 research 放到 proposal 之前。它不是默认 workflow，但证明“先调研，再立项”可以被 schema 化。

AIPD 不需要照搬 schema 系统，但可以吸收这个思想：Think 内部应允许不同路线，例如轻量讨论、deep research、方案比较、技术 spike、外部竞品调研。不同 Think 类型可以有不同 artifact 组合。

### 6. OpenSpec 自身的 exploration 草稿暴露了缺口

`openspec/explorations/explore-workflow-ux.md` 对 AIPD 特别重要，因为它不是普通用户文档，而是 OpenSpec 项目自身在思考 explore 的下一步。

该文档提出的问题包括：

- exploration 是否应该可导出为 `.md`。
- exploration 文件应放在 `openspec/explorations/`，还是 `changes/<change>/explorations/`。
- 格式应是自由 markdown、结构化模板，还是 conversation transcript。
- standalone exploration 如何转成 proposal。
- proposal 是否能读取 exploration 文件作为输入。

这和 AIPD 当前讨论高度重合。它证明 OpenSpec 当前官方命令的 explore 还没完全解决“探索状态化”和“探索到 proposal 的 handoff”。

## 对 AIPD Think 的启发

### 可借鉴点

1. Think 默认不应创建 Case。

OpenSpec 的 `/opsx:explore` 明确不创建 artifacts，这个原则应保留。AIPD Think 的默认出口不应是 Create，而应允许 Continue、Research、Kill、Defer、Weave。

2. Think 需要有可选的持久化探索对象。

OpenSpec 当前 explore 偏对话，但它自己的 exploration 草稿已经在讨论保存探索。AIPD 可以直接把 Think 设计成持久化对象，避免重走“先聊天、后补保存”的路径。

3. Think -> Case Create 应该有 handoff artifact。

OpenSpec 的 proposal 是后续 specs/design/tasks 的根。AIPD 可以设计 `handoff.md` 或 `decision.md`，作为 Case Create 的稳定输入，包含目标、why、what、not doing、已排除方案、风险、上下文入口和建议出口。

4. Case Create 可以吸收 artifact DAG。

OpenSpec 的 proposal/specs/design/tasks DAG 比单一大文档更适合并行与复核。AIPD Case Create 后续可以分 artifact 生成，不必所有场景都一次性吐出完整 case。

5. Verify 应成为独立验收思路。

OpenSpec 的 completeness / correctness / coherence 三分法适合 AIPD 后续补强 Case Run 验收。AIPD 可以把它改写为：任务是否完整、实现是否符合 Think/Case 意图、代码/文档/认知是否一致。

6. Archive 应保留为什么做的上下文。

OpenSpec archive 保留 proposal、design、tasks。AIPD Case Archive 后续若接入 Think，应保留 Think decision 或至少链接 Think handoff，避免只知道“做了什么”，不知道“为什么做”。

7. Research-first 可以作为 Think 内部模式。

对陌生领域、外部项目调研、桌面端技术路线这类场景，AIPD Think 应允许先进入 Research 状态，再决定是否 Create。Research 不是 Case Run 的执行 step，而是 Think 的决策前置材料。

8. Explore 与 Proposal 的手动边界值得保留。

OpenSpec 没有让 explore 自动开始 propose，这降低误执行风险。AIPD Think 也不应自动创建 case，应该让用户确认出口，尤其是 Create / Kill / Defer。

### 不适合照搬点

1. 不应把 AIPD Think 设计成纯 `/explore` 聊天命令。

AIPD 的目标是解决长讨论、深调研、上下文爆炸和可恢复问题。如果 Think 仍然只是聊天命令，就没有补上当前瓶颈。

2. 不应把 OpenSpec change folder 原样映射成 AIPD Think。

OpenSpec 的 change 已经默认面向构建和实现，AIPD Think 还处在“要不要做”的阶段。Think 对象不应被 Case 的执行语义污染。

3. 不应把所有 exploration 都强制结构化。

OpenSpec 强调 fluid / iterative。AIPD Think 也要保留轻量讨论入口。合适的做法是：轻量 Think 可以只有 `think.md` / `decision.md`，复杂 Think 才增加 `research.md`、`options.md`、`handoff.md`。

4. 不应把 spec source of truth 直接等同于 AIPD L1-L5。

OpenSpec 的 main specs 是产品行为 source of truth。AIPD 的 L1-L5 是项目认知层级，范围更宽，包括方向、外部世界、核心模型、产品能力、工程规则。Think 产物只有稳定后才由 Weave 判断回写，不应自动合并进 L1-L5。

5. 不应把 verify 做成阻塞式关卡。

OpenSpec verify 明确是 surfacing issues，不一定阻塞 archive。AIPD 也应避免把 Think / Case 做成僵硬审批流。验证应提供证据和风险，而不是替代人的最终判断。

## OpenSpec 是否有 Create / Kill / Defer / Research / Weave / Continue 出口

结论：没有完整的一等出口系统。

| AIPD 出口 | OpenSpec 是否有近似机制 | 判断 |
|---|---|---|
| Create | 有 | `/opsx:propose` 或 `/opsx:new` 可从 exploration 转入 change |
| Continue | 有一部分 | 可以继续 explore，但没有状态文件或显式状态 |
| Research | 有一部分 | explore 可以调查代码和比较方案；custom schema 可加 research artifact |
| Kill | 没有 | 不做通常只是聊天结束，没有结构化 kill reason |
| Defer | 没有 | 没看到 postponed / deferred change 的正式状态 |
| Weave | 有近似但不同 | sync/archive 合并 delta specs 到 main specs；这只覆盖 spec 演进，不等同 AIPD 的 L2/L3/L4/L5 weave |

所以 OpenSpec 的前置判断可以描述为：

```text
explore
-> insight clear
-> propose / new
```

AIPD Think 应该设计成：

```text
think object
-> Continue / Research / Create / Kill / Defer / Weave
-> 只有 Create 才进入 Case Create
```

## 风险与缺口

1. 官方文档与仓库实践存在轻微张力。

官方 commands 文档说 exploration 不创建 artifacts；但 OpenSpec 自身仓库已有 `openspec/explorations/*.md`。这可能是项目自用探索材料，也可能是未来机制方向。报告中应把它作为“设计信号”，不要误判成已发布稳定功能。

2. OpenSpec 的目标比 AIPD 窄。

OpenSpec 主要服务 coding assistant 的 spec-driven change。AIPD Think 要处理产品想法、深度调研、是否立项、认知回写和 Case 交接，范围更大。照搬 OpenSpec 会低估 L1-L5 和 Weave 的重要性。

3. OpenSpec 的 artifact DAG 强，但不是决策状态机。

proposal/specs/design/tasks 解决“已决定做以后怎么组织”。它不能替代 Think 中的 Kill / Defer / Research 决策。

4. Exploration 保存会引入管理成本。

如果 AIPD Think 每次聊天都创建一堆文件，会污染 `_adoc`。需要区分 Inbox capture、轻量 Think、正式 Think、Research-heavy Think。

5. Deep research 需要证据分层。

OpenSpec 的 schema 能加 research artifact，但没有解决资料可信度、来源分层、调研候选回补、论文/博客/项目资料如何取舍。AIPD Think 需要继承本 case 已定义的一级/二级/三级资料分层。

## Weave 候选

- L3 Core：补充 Think 与 OpenSpec explore 的关键区别：OpenSpec explore 是无 artifact 的探索命令，AIPD Think 应是可恢复的决策对象。
- L4 Product：AIPD Think 的出口应明确比 OpenSpec explore 多：Create / Kill / Defer / Research / Weave / Continue。
- Case Create 边界：吸收 artifact DAG 思路，将 Case Create 收窄到已决定执行后的 proposal/context/design/tasks/validation 规划，不承担开放式“值不值得做”讨论。
- Case Archive / Weave：后续设计中应保留 Think decision / handoff 与 Case archive 的关联，保证执行结果能追溯前置判断。
- 后续 s2 调研：重点比较 Spec Kit / BMAD / Open SWE 是否比 OpenSpec 更强地支持 decision state、research artifact、kill/defer 或 task shaping。

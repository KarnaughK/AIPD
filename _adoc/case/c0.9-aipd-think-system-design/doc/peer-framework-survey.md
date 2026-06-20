# 同类框架前置讨论机制调研

> 调研时间：2026-06-20  
> Step：`s2-peer-framework-survey`  
> 范围：OpenSpec 之外的 AI coding / spec-driven development / agent workflow / task shaping / requirements clarification 资料。OpenSpec 由 s1 深入，本报告只在必要处作为对照。

## 资料层级

- **一级资料**：项目 GitHub、官方文档、官方博客、官方 README、命令文档。
- **二级资料**：公开实践文章、长文、访谈、新闻报道或维护者/实践者复盘。
- **三级资料**：论文、arXiv、学术/经验研究材料。只纳入和 AI coding、spec、task shaping、agent workflow 直接相关者。

## 总表

| 对象 | 资料层级 | 纳入状态 | 前置阶段机制 | Artifact 组织 | 非执行出口 | AIPD Think 可借鉴点 | 与 AIPD 差异 |
|---|---:|---|---|---|---|---|---|
| GitHub Spec Kit | 一级 | 纳入深入 | `constitution -> specify -> clarify -> plan -> tasks -> implement` | `.specify/memory/constitution.md`、`specs/{feature}/spec.md`、`research.md`、`plan.md`、`tasks.md` | 弱；可通过 clarify/analyze 发现问题，但没有 Kill/Defer 状态 | specification 作为源头工件；clarify 在 plan 前强制降低歧义；tasks 标记并行与依赖 | 更偏“已决定要做后的 SDD”，不是立项前的价值判断系统 |
| BMAD Method | 一级 | 纳入深入 | Analysis 可选阶段：brainstorming、market/domain/technical research、product brief、PRFAQ；之后 PRD、architecture、stories、implementation | 多个阶段性文档：brainstorming report、research findings、product-brief、PRFAQ、PRD、decision-log、architecture、stories | 中等；PRFAQ/analysis 可压力测试 idea，但文档中未把 Kill/Defer 做成统一状态 | 把“分析阶段”独立在规划前；按场景选择工具；PRFAQ 适合作为“值不值得做”的压力测试 | 偏完整敏捷产品流程，角色/阶段较重；AIPD Think 应吸收机制，不照搬流程体量 |
| Open SWE | 一级 + 官方博客 | 纳入深入 | issue/thread 上下文预水合，AGENTS.md 注入，subagent orchestration，middleware，PR validation | Linear/Slack/GitHub thread、sandbox、todo、PR、middleware 状态 | 弱；它是执行型 internal coding agent 框架，不是 spec/decision 框架 | “source context + repo rules”双层上下文；subagent 隔离；中途消息注入；validation middleware | 主要解决从任务到 PR 的执行吞吐，缺少前置 idea clarification / kill / defer |
| Kiro Specs | 一级 | 纳入深入 | Feature/Bugfix specs；Requirements-first / Design-first / Quick Plan；Analyze Requirements | `.kiro/specs/` 下 `requirements.md`/`bugfix.md`、`design.md`、`tasks.md` | 中等；Specs vs Vibe、Quick Plan vs gated specs 是流程选择；无显式 Kill/Defer | EARS acceptance criteria；requirements analysis 捕捉 ambiguity/conflict/gaps；并行 task waves | Kiro 已经进入“spec session”，更像 Case Create；Think 可借鉴前置分析和 gated/quick 路径选择 |
| Cline Plan & Act / Deep Planning | 一级 | 纳入深入 | Plan mode 只读讨论与策略；Act mode 执行；`/deep-planning` 做调查、提问、implementation_plan、task | 聊天上下文、`implementation_plan.md`、新 task、Memory Bank、team state | 弱到中等；Plan 可以停留不执行，但没有结构化 Kill/Defer | 清晰分离 thinking/building；复杂任务先 deep planning；子 agent 只读调研保护主上下文 | 主要是工具模式，不是项目级长期 Think 对象；Plan 的可恢复性依赖用户让它写文件 |
| Roo Code | 一级 | 暂缓深入 | Code / Architect / Ask / Debug / Custom modes；Architect plan systems/specs/migrations | 模式和对话为主 | 弱 | “Architect mode”说明多模式分工是通用趋势 | 项目已于 2026-05-15 archived；公开 docs 信息较少，且没有强 spec artifact 状态 |
| OpenHands / Agent Canvas | 一级 + 三级论文 | 暂缓深入 | Agent Canvas、automations、GitHub/Slack/Linear integration、issue decomposition | conversations、automations、sandboxes、tasks/PRs | 弱 | 自动把 GitHub issues 分解成 tasks；多 backend / automation 可参考执行层 | 和 Think 关系间接，更偏 agent runtime/control center |

## 项目展开

### GitHub Spec Kit

**证据链接**

- [GitHub README](https://github.com/github/spec-kit)（一级）
- [Spec Kit docs site](https://github.github.com/spec-kit/)（一级，README 指向）
- [spec-driven.md](https://github.com/github/spec-kit/blob/main/spec-driven.md)（一级）

**定位**

Spec Kit 是 GitHub 的 Spec-Driven Development 工具包。README 明确把目标放在“让你关注 product scenarios 和 predictable outcomes，而不是从零 vibe coding”。它的主流程是先建立项目原则，再写 spec，再 plan，再 tasks，再 implement。

**核心 workflow**

```text
constitution
-> specify
-> clarify
-> plan
-> analyze / checklist
-> tasks
-> implement
-> converge
```

关键机制：

- `constitution` 先建立项目治理原则，作为后续开发的约束源。
- `specify` 聚焦 what/why，不讨论技术栈。
- `clarify` 推荐在 `plan` 前运行，用结构化问题澄清 underspecified areas。
- `plan` 产出技术实现文档，包含 `research.md` 等实现细节。
- `tasks` 从 plan 生成可执行任务，包含依赖、并行标记、文件路径、checkpoint。
- `analyze` / `checklist` 在实现前检查 artifact 一致性、覆盖度和需求质量。

**前置判断机制**

Spec Kit 有强 “clarify before plan”，但缺弱 “should we do this”。它默认用户已经决定要创建一个 feature spec；clarify 解决的是“这件事说清了吗”，不是“这件事值得做吗”。

**可借鉴点**

- Think 可以吸收 `clarify` 的结构化提问：在进入 Case Create 前强制发现缺口。
- Think/Case Create 交界可以学习 `specify -> plan -> tasks` 的分层：先 what/why，再 how，再 execution。
- `checklist` 很适合做 Think 结束前的“决策质量检查”，例如问题、用户、替代方案、风险、非目标是否清楚。
- `converge` 值得后续参考：根据 spec/plan/tasks 和代码现状追加剩余工作。

**与 AIPD 不同点**

Spec Kit 更像“已决定要做后的规格驱动工程”，不是立项前 Think。AIPD Think 的核心要补的是 `Create / Kill / Defer / Research / Weave / Continue`，不能只停在 `clarify -> plan`。

### BMAD Method

**证据链接**

- [BMAD GitHub README](https://github.com/bmad-code-org/BMAD-METHOD)（一级）
- [BMAD Welcome](https://docs.bmad-method.org/)（一级）
- [Analysis Phase: From Idea to Foundation](https://docs.bmad-method.org/explanation/analysis-phase/)（一级）
- [Brainstorming](https://docs.bmad-method.org/explanation/brainstorming/)（一级）
- [Advanced Elicitation](https://docs.bmad-method.org/explanation/advanced-elicitation/)（一级）
- [Workflow Map](https://docs.bmad-method.org/reference/workflow-map/)（一级）

**定位**

BMAD 是一个完整的 AI-driven agile development 框架。它明确覆盖从 brainstorming 到 deployment 的生命周期，并通过多个专门 agent / workflow 逐步产出文档。

**核心 workflow**

```text
Phase 1 Analysis (optional)
  brainstorming / market research / domain research / technical research / product brief / PRFAQ
-> Phase 2 Planning
  PRD / UX
-> Phase 3 Solutioning
  architecture / epics / stories / implementation readiness
-> Phase 4 Implementation
  sprint / story / dev / review / correct-course / retrospective
```

关键机制：

- Analysis phase 是 Planning 前的独立阶段，目标是在承诺构建前澄清产品。
- Brainstorming 强调 AI 作为 facilitator，不是替用户凭空生成想法。
- Research 分 market/domain/technical 三类，按未知维度拆开。
- Product Brief 是轻量进入 PRD 的路径。
- PRFAQ 是 Working Backwards 压力测试，适合判断概念是否值得投入。
- Advanced Elicitation 在文档生成后让 LLM 用命名推理方法做第二遍，例如 pre-mortem、first principles、inversion、red team/blue team、Socratic questioning。
- Workflow Map 中有 implementation readiness gate，输出 PASS / CONCERNS / FAIL。

**前置判断机制**

BMAD 是本次调查里最接近 AIPD Think 的对象。它把“想法到基础”的 Analysis 阶段放在 PRD 前，并明确说 skipping analysis 会让 PRD 建在 assumptions 上。它也有“哪个工具适合当前情况”的路由：模糊想法用 brainstorming，需要市场判断用 research，想确认值不值得做用 PRFAQ。

不足是：它没有把 Kill/Defer/Research/Create 统一做成一个 Think 状态机；更像多个 workflow 输出不同文档，再进入 PRD。

**可借鉴点**

- Think 可以有“工具路由”：Brainstorm / Research / Product Brief / PRFAQ / Direct Create，不必所有 Think 都走同一流程。
- PRFAQ 可作为 `Worth Building` 的强模式，比普通讨论更适合逼出价值主张和弱点。
- Advanced Elicitation 可变成 Think 内的 review pass：每次重要结论后允许选择 pre-mortem / inversion / red team 等方法。
- Readiness gate 的 PASS / CONCERNS / FAIL 可作为 Think -> Case Create 前的质量门。

**与 AIPD 不同点**

BMAD 的流程颗粒度更重，更像完整产品/敏捷套件。AIPD Think 需要服务 AIPD 现有 Inbox / Case / SOP / Weave，不应把 Think 做成大型产品管理框架。

### Open SWE

**证据链接**

- [Open SWE GitHub](https://github.com/langchain-ai/open-swe)（一级）
- [LangChain announcement blog](https://www.langchain.com/blog/open-swe-an-open-source-framework-for-internal-coding-agents)（一级/官方博客）

**定位**

Open SWE 是 LangChain 发布的内部 coding agent 框架。它从 Stripe Minions、Ramp Inspect、Coinbase Cloudbot 等生产部署模式中抽象出 agent harness、sandbox、tool curation、context engineering、subagents、middleware、Slack/Linear/GitHub invocation、validation 等架构。

**核心 workflow**

```text
Slack / Linear / GitHub invocation
-> hydrate source context + AGENTS.md
-> run in isolated sandbox
-> subagents / middleware / todo
-> commit / draft PR
-> validation / reply source channel
```

关键机制：

- 任务启动时读取完整 Linear issue、Slack thread 或 GitHub PR comment，减少需求发现成本。
- `AGENTS.md` 提供 repo-wide conventions、testing requirements、architectural decisions。
- 每个任务在独立 sandbox 中运行，多个任务并行。
- subagents 用独立上下文处理子任务。
- middleware 做 deterministic orchestration，例如中途注入新消息、工具错误处理、自动 PR backstop。
- validation 主要是 prompt-driven，可扩展为 CI、视觉验证或 review gates。

**前置判断机制**

Open SWE 本身没有强 spec/Think。它假设外部 issue/thread 已经代表任务入口。前置价值在于“丰富源上下文启动”和“中途人类消息注入”，不是“判断要不要做”。

**可借鉴点**

- Think 对象可以同时读取项目规则和当前讨论源上下文，形成“双层上下文”：长期约束 + 当前想法。
- Research/Continue 状态下，允许用户中途补充信息，系统在下一轮处理前注入。
- 对调研和执行要分 sandbox / 分身上下文，保护主线。
- Think 后续进入 Case Run 时可参考 middleware 思路：把部分 gate 做成确定性检查，而不是全交给模型自由发挥。

**与 AIPD 不同点**

Open SWE 是 execution throughput framework，AIPD Think 是 pre-case decision object。两者关系是：Open SWE 对 Run 有价值，对 Think 只提供上下文/并行/验证机制。

### Kiro Specs

**证据链接**

- [Kiro Specs](https://kiro.dev/docs/specs/)（一级）
- [Kiro Feature Specs](https://kiro.dev/docs/specs/feature-specs/)（一级）
- [Kiro Analyze Requirements](https://kiro.dev/docs/specs/analyze-requirements/)（一级）
- [Kiro Quick Plan](https://kiro.dev/docs/specs/quick-plan/)（一级）
- [TechRadar: AWS launches Kiro](https://www.techradar.com/pro/aws-launches-kiro-an-agentic-ai-ide-to-end-the-chaos-of-vibe-coding)（二级）

**定位**

Kiro 是面向 agentic development 的 IDE。Specs 是它的核心结构化开发机制，目标是把 high-level ideas 转成 detailed implementation plans，并通过文件追踪执行。

**核心 workflow**

```text
Feature or Bug intent
-> Requirements-first / Design-first / Quick Plan
-> requirements.md or bugfix.md
-> design.md
-> tasks.md
-> task execution UI
```

关键机制：

- 每个 spec 生成三个核心文件：requirements/bugfix、design、tasks。
- Feature Specs 支持 Requirements-first 和 Design-first，取决于起点是产品行为还是技术设计。
- Requirements 使用 EARS notation，形成结构化、可测试 acceptance criteria。
- Analyze Requirements 在设计前检查 requirement set 的逻辑冲突、歧义、约束冲突、未声明假设和缺失边界情况。
- Quick Plan 会一次性生成 requirements/design/tasks，但要求用户先回答 scope、constraints、edge cases 等 clarifying questions。
- `tasks.md` 可由 Kiro 分析依赖图，把独立任务分成 waves 并行执行。

**前置判断机制**

Kiro 的 Specs vs Vibe 是轻量前置路由：复杂、有文档协作需求、要求迭代的任务走 Specs；快速探索或目标不清的原型可以走 Vibe。Quick Plan vs gated Feature Spec 也是前置判断：熟悉任务可以跳过阶段审批，不熟悉或高风险任务保留 gate。

它仍缺少 Kill/Defer 这种立项状态；进入 Spec 后默认仍是“要产出 tasks”。

**可借鉴点**

- Think 可以明确支持“标准 Think”和“Quick Think”：熟悉领域快速澄清，陌生/高风险领域保留 gate。
- EARS 可作为 Case Create 或 Think decision 中验收口径的候选格式。
- Requirements Analysis 很适合在 Think 转 Create 前检查：逻辑冲突、歧义、约束冲突、未声明假设、边界情况缺失。
- 并行 wave 的 task graph 可支持用户“横向摊开”的 Agent 并行理念。

**与 AIPD 不同点**

Kiro 的 spec 已经接近 Case Create，不是 Think。AIPD 需要在 spec 前加一个“是否值得 spec”的状态层。

### Cline Plan & Act / Deep Planning

**证据链接**

- [Cline Plan & Act Mode](https://docs.cline.bot/core-workflows/plan-and-act)（一级）
- [Cline Using Commands](https://docs.cline.bot/core-workflows/using-commands)（一级）
- [Cline Subagents](https://docs.cline.bot/features/subagents)（一级）
- [Cline Agent Teams](https://docs.cline.bot/cli/agent-teams)（一级）
- [Cline Memory Bank](https://docs.cline.bot/best-practices/memory-bank)（一级）

**定位**

Cline 是 agentic coding 工具。Plan & Act 把 thinking 和 building 分成两个模式：Plan mode 可读代码、搜索、讨论策略但不改文件；Act mode 执行计划。

**核心 workflow**

```text
Plan mode
-> explore files / discuss tradeoffs / identify edge cases
-> optional /deep-planning
-> implementation_plan.md / task
-> Act mode
-> implement / test / adjust
```

关键机制：

- Plan mode 强制不写文件、不执行命令，避免还没想清楚就实现。
- Act mode 继承 Plan 上下文，减少重复解释。
- `/deep-planning` 包含四步：silent investigation、targeted questions、`implementation_plan.md`、trackable implementation task。
- `/newtask` 像 developer handoff，把计划、已完成、相关文件、下一步抽取到新 task。
- Subagents 是只读并行 research agents，用来保护 main agent 的上下文。
- Agent Teams 持久化到 `~/.cline/data/teams/[team-name]/`，包含 task board、mailbox、mission log。

**前置判断机制**

Cline 的强点是 mode boundary：Plan 阶段不执行，等方案清晰再 Act。它也根据任务大小区分 Act-only、Plan -> Act、Deep Planning。弱点是 Plan 本身不是项目级持久对象，除非用户要求写 `implementation_plan.md` 或使用团队状态。

**可借鉴点**

- AIPD Think 应天然禁止执行型修改，类似 Plan mode 的硬边界。
- Think 可以按任务大小分层：直接 Case Create、普通 Think、Deep Research Think。
- `newtask` 的 handoff 思路可用于 Think -> Case Create：抽取目标、决策、相关上下文、排除方案、下一步。
- Subagents 的只读调研约束和主上下文保护，与 AIPD 分身 Agent 方向一致。

**与 AIPD 不同点**

Cline 是工具模式，AIPD Think 是项目文件对象。Cline 的 Plan 更多依赖聊天上下文；AIPD Think 需要显式文件化、可恢复、可审计、可 Weave。

### Roo Code

**证据链接**

- [Roo Code GitHub](https://github.com/RooCodeInc/Roo-Code)（一级）

**定位**

Roo Code 是 VS Code 内 AI dev team 工具，支持 Code、Architect、Ask、Debug、Custom modes。仓库 README 显示项目在 2026-05-15 archived。

**前置机制判断**

Architect Mode 用于 plan systems、specs、migrations，说明“规划身份”和“执行身份”分离是通用模式。但目前从公开 README 能看到的 artifact 和状态流不够完整，且项目已归档。

**纳入/暂缓理由**

暂缓深入。可把 Roo Code 作为“多模式分工”的旁证，不作为 AIPD Think 主要参考。

### OpenHands / Agent Canvas

**证据链接**

- [OpenHands GitHub](https://github.com/OpenHands/OpenHands)（一级）
- [OpenHands paper](https://arxiv.org/abs/2407.16741)（三级）
- [OpenHands Software Agent SDK paper](https://arxiv.org/abs/2511.03690)（三级）

**定位**

OpenHands 当前 README 更强调 Agent Canvas：self-hosted developer control center for coding agents and automations，可运行 OpenHands、Claude Code、Codex、Gemini 或 ACP-compatible agents，并支持 Slack/GitHub/Linear 自动化、issue decomposition、agent backends。

**前置机制判断**

OpenHands 对 Think 的直接价值有限。它不是 spec-driven 或 requirements clarification 框架，主要是 agent runtime / control center / automation。不过它的“把 GitHub issue 自动分解成 tasks”和“多 backend 持续运行 agent”可作为 Case Run / automation 层参考。

**纳入/暂缓理由**

暂缓深入。保留为执行层和 automation 参考，不进入 AIPD Think 核心候选。

## 文章 / 博客 / 访谈展开

### LangChain Open SWE announcement

**链接**：[Open SWE: An Open-Source Framework for Internal Coding Agents](https://www.langchain.com/blog/open-swe-an-open-source-framework-for-internal-coding-agents)（一级/官方博客）

**纳入理由**

这篇文章直接总结了内部 coding agent 的生产部署模式：sandbox、curated tools、source context、subagents、middleware、Slack/Linear/GitHub invocation、validation。它对 Think 的直接启发不是 PRD，而是“源上下文启动”和“主线保护”。

**可借鉴点**

- Think / Research 可把用户讨论源、项目长期规则和外部调研分层，而不是混成一段聊天。
- 中途用户补充输入应该进入状态机，而不是被执行 Agent 忽略。
- validation 可拆成模型判断和确定性 middleware 两层。

### Kiro launch / Specs public discussion

**链接**：[TechRadar: AWS launches Kiro](https://www.techradar.com/pro/aws-launches-kiro-an-agentic-ai-ide-to-end-the-chaos-of-vibe-coding)（二级）

**纳入理由**

文章说明 Kiro 的市场定位是把 vibe coding 的 prompt 变成 structured components，用于 implementation、testing、change tracking，并强调 specs / hooks / steering rules。这能作为 Kiro 官方 docs 之外的公开定位佐证。

**可借鉴点**

- Think 的价值表达可以是“把混沌讨论变成可追踪结构”，不是只为了多写文档。
- steering rules 与 AIPD 的 L3/L4/L5/AGENTS.md 类似，可作为长期约束注入。

## 论文候选展开

### Spec-Driven Development: From Code to Contract in the Age of AI Coding Assistants

**链接**：[arXiv:2602.00180](https://arxiv.org/abs/2602.00180)（三级）

**纳入状态**：纳入候选，建议 s4/s5 设计时轻量参考。

**理由**

摘要直接讨论 SDD 在 AI coding assistant 时代的 workflow patterns、supporting tools、三层 specification rigor，以及 decision framework。它可能给 AIPD Think 提供“什么时候需要严格 spec，什么时候轻量就够”的判断框架。

### Spec Kit Agents: Context-Grounded Agentic Workflows

**链接**：[arXiv:2604.05278](https://arxiv.org/abs/2604.05278)（三级）

**纳入状态**：纳入候选，建议深入。

**理由**

它直接在 Spec Kit 的 Specify / Plan / Tasks / Implement 阶段加入 context-grounding hooks 和 validation hooks，解决大仓库 context blind 问题。这和 AIPD map-first / Think 前置调研 / Case Create 上下文索引高度相关。

### Mise en Place for Agentic Coding

**链接**：[arXiv:2605.05400](https://arxiv.org/abs/2605.05400)（三级）

**纳入状态**：纳入候选，建议深入。

**理由**

摘要提出三阶段 preparation methodology：contextual grounding、collaborative specification、task decomposition，并报告准备阶段支撑并行 agent 实现。它和 AIPD Think 的“高带宽思考缓冲层”非常接近。

### Constitutional Spec-Driven Development

**链接**：[arXiv:2602.02584](https://arxiv.org/abs/2602.02584)（三级）

**纳入状态**：暂缓。

**理由**

它关注把安全原则写进 specification layer，适合未来研究“Think/Case 的不可违反约束”或高风险领域安全 gate；但当前 AIPD Think 的主要问题是任务澄清和决策出口，不先深入安全专门化。

### OpenHands papers

**链接**：[OpenHands: An Open Platform for AI Software Developers](https://arxiv.org/abs/2407.16741)、[OpenHands Software Agent SDK](https://arxiv.org/abs/2511.03690)（三级）

**纳入状态**：暂缓。

**理由**

有助于理解 agent runtime、安全 sandbox、多 agent、evaluation，但不直接回答前置讨论 / spec / decision / task shaping。可作为 Case Run/Agent 系统后续参考。

### AIDev / GitTaskBench / SWE-bench / agent empirical studies

**链接**：[AIDev](https://arxiv.org/abs/2602.09185)、[GitTaskBench](https://arxiv.org/abs/2508.18993)、[SWE-bench](https://arxiv.org/abs/2310.06770)、[Empirical Evaluation of Agent Frameworks](https://arxiv.org/abs/2511.00872)（三级）

**纳入状态**：暂缓/背景。

**理由**

这些材料有助于理解 agent 执行成功率、成本、真实 GitHub PR 行为和 benchmark，但不是 Think 机制资料。只建议在后续论证“为什么前置清晰度影响 token yield / execution success”时引用。

## 候选资料发现清单

| 候选 | 类型 | 状态 | 理由 |
|---|---|---|---|
| Kiro Specs | 项目/官方文档 | 纳入深入 | 与 requirements/design/tasks、requirements analysis、parallel task waves 强相关 |
| Cline Plan & Act / Deep Planning | 项目/官方文档 | 纳入深入 | 明确把 thinking/building 分开；`/deep-planning` 直接对应 Think 的调研和计划化 |
| Roo Code | 项目 | 暂缓 | 有 Architect mode，但公开 artifact 机制不够强，且仓库已归档 |
| OpenHands / Agent Canvas | 项目/论文 | 暂缓 | 执行层和 automation 强，Think 前置弱 |
| Spec-Driven Development paper | 论文 | 纳入候选 | 可能提供 SDD 层级和决策框架 |
| Spec Kit Agents paper | 论文 | 纳入候选 | 直接把 context grounding hooks 加到 SDD 阶段 |
| Mise en Place for Agentic Coding | 论文 | 纳入候选 | 与前置准备、collaborative specification、task decomposition 高相关 |
| Constitutional SDD | 论文 | 暂缓 | 高风险/安全 gate 有价值，但当前 Think 设计不以安全合规为中心 |
| AIDev / GitTaskBench / SWE-bench / OpenHands SDK empirical papers | 论文 | 背景/暂缓 | 更适合论证 agent 执行困境，不直接设计 Think 状态流 |
| Kiro launch articles | 文章/报道 | 轻量纳入 | 用于理解 Specs 的公开定位和“vibe to viable”叙事 |

## 综合发现

1. **同类系统普遍先做“澄清/规格/计划”，但很少把“不做/暂缓”结构化**  
   Spec Kit、Kiro、BMAD、Cline 都有前置阶段；但除了 BMAD 的 PRFAQ 有较强压力测试外，大多数工具默认用户最终要进入实现。

2. **最强参考组合是 BMAD + Kiro + Spec Kit + Cline**  
   BMAD 提供 Think 前的产品分析工具箱；Kiro 提供三文件 spec 和 requirements analysis；Spec Kit 提供 constitution/clarify/plan/tasks/checklist；Cline 提供 Plan/Act 硬边界和 deep planning 交接。

3. **Open SWE / OpenHands 更适合 Run 层，不适合主导 Think**  
   它们强调 agent runtime、sandbox、subagents、middleware、PR/automation。AIPD 可以吸收主线保护和上下文注入机制，但不要把 Think 设计成执行平台。

4. **AIPD Think 的差异点应继续保留**  
   外部项目大多缺统一出口状态。AIPD 已沉淀的 `Create / Kill / Defer / Research / Weave / Continue` 是有区分度的，应作为后续 s4/s5 的核心输入。

5. **Research 不应泛化，应绑定具体问题**  
   Spec Kit 文档示例和 BMAD research 都暗示：调研要服务具体未知点。AIPD Think 的 Deep Research 应避免“泛调研”，需要先列关键问题，再派发并行 research。

## Weave 候选

- L3 Think 模型可补一句：Think 不只是澄清需求，还应支持“工具路由”：Brainstorm / Research / PRFAQ / Quick Think / Direct Create。
- L4 AIPD Think 可补候选能力：Analyze Requirements / Decision Checklist / Think Readiness Gate。
- Case Create 边界后续可收窄为：在 Think 出口为 Create 后，承接决策摘要、关键约束、排除方案、上下文索引和验收口径。
- Agent 协作模型可补：Research 分身应默认只读、问题导向、回流报告，不把完整网页和长日志塞回主线。

## 风险与缺口

- 本报告没有深入 OpenSpec，避免和 s1 重复；s4/s5 需要合并 s1 结论后再做 Think 设计。
- 论文只做候选筛选，未逐篇全文阅读；后续如要引用论文结论，应单独开 research step 或在 s4 中补读关键章节。
- Roo Code 已 archived；它的模式机制只能作为旁证，不应成为核心设计依据。
- Kiro 是产品化 IDE，部分行为未开源；只能从官方 docs 和公开文章提取机制，不能确认其内部实现。

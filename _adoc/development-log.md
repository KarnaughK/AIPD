# AIPD 发展日志

本文基于 Git 提交历史整理 AIPD 从早期到当前的演进线索。它不是 release notes，也不是 case 执行记录；目标是给后续 AI 或人回看 AIPD 是否偏离方向、是否过度膨胀、是否把临时做法误沉淀成框架规则时，提供一条长期历史线。

事实基准：截至 2026-06-20 的 Git 历史。未提交的工作区改动不纳入本日志。

## 总览

AIPD 最初不是现在意义上的 AI 原生开发框架，而是一套 AI 驱动的文档化开发流程：用 `intent/spec/system/plan/runbook` 让 AI 从需求到交付沿文档推进。随后它经历了几次明显转向：

1. **文档模板阶段**：重点是“先写文档，再写代码”，让 AI 用结构化文档理解项目。
2. **分层认知阶段**：从具体模板转向 L1-L5 的项目认知结构，开始区分方向、场景、核心模型、产品功能和技术规则。
3. **Skill 工程化阶段**：AIPD 从一组 Markdown 指南变成可构建、可安装、可适配 Claude Code / Codex 的 skill 源码项目。
4. **Plan 到 Case / Step 阶段**：执行系统从迭代计划转向一次事项和可派发 step，更强调恢复、验收、归档和经验回写。
5. **分身 Agent 阶段**：从普通子 Agent 调度发展到 fork-first / clone agent 模型，明确 Main Agent 保护主线，分身承担探索和执行过程成本。
6. **Map / Weave / 三条主线阶段**：AIPD 开始把长期知识库、Case / Step 执行逻辑、AI 原生代码架构实验拆成三条主线，并用 map 做第一跳检索、用 Weave 做经验回写。
7. **AIPD 命名收敛与 Think 前置阶段**：从 AIPD2 收敛回 AIPD，并开始把 Case 之前的模糊讨论、调研和取舍沉淀为 AIPD Think。

一句话看主线：AIPD 从“帮 AI 管文档的流程工具”发展成“让 AI 参与长期软件项目时，项目能记住方向、上下文、执行状态和经验的框架”。

## 大迭代脉络

### 1. 早期文档驱动：`intent/spec/system/plan/runbook`

时间：2026-02-02 到 2026-02-03

最初的 README 将 AIPD 定义为 AI-Powered Document-Driven Development，核心口号是先写文档再写代码。仓库包含 `skill.md`、`templates/`、`examples/`、`references/`，文档体系围绕：

- `intent.md`：项目方向。
- `spec/`：功能模块设计。
- `system/`：技术架构约束。
- `plan/`：迭代计划。
- `runbook/`：操作手册。

这一阶段的价值是把 AI 的开发入口从“直接改代码”前移到“先理解项目文档”。但它仍然比较像传统文档驱动开发的 AI 化版本，核心对象还是模板和流程。

### 2. 文档架构重构：从模板目录到业务 / 技术分层

时间：2026-02-12 到 2026-03-11

这一阶段开始发现 `spec/system/runbook` 容易像固定目录模板，而不是项目真实认知结构。提交 `6a55813` 将文档架构从 `spec/system/runbook` 重构为 `business/tech` 两层，并引入 `index.md` 作为项目入口；后续 3 月的提交移除旧 spec 模板，新增 init / design / plan / execute / archive 五阶段参考文档。

这说明 AIPD 开始从“模板清单”转向“项目状态和阶段推进”。但当时仍然保留较强的阶段流程味道，距离后来的 L1-L5 和 Case / Step 还没有完全成型。

### 3. 五层认知与 Planning 体系成型

时间：2026-04-07 到 2026-04-20

4 月初出现明显的大重构：仓库引入 `references/L1-intent`、`L2-scenario`、`L3-engine`、`L4-product-arch`、`L5-tech-arch`，并开始区分主 Agent、子 Agent、worker-research、worker-dev、worker-archive。`0aa1747` 明确了五层认知结构映射。

这一阶段的重要变化：

- AIPD 不再只围绕文档类型，而是开始沉淀项目认知层级。
- Planning 从简单计划文件，发展成主 Agent / worker 分工的执行系统。
- Agent 团队协作开始进入核心设计，不再只是附属说明。

风险也从这里开始出现：层级、角色、阶段、模板同时增加，框架复杂度快速上升。后续是否“肿”，很大程度要看这些结构是否能被 map 和任务入口有效压缩。

### 4. AIPD2 Skill 工程化

时间：2026-04-28 到 2026-04-29

`18904df` 是一次工程化大版本。AIPD2 被重组为可构建的 skill 工程：

- 新增 `src/core/`、`src/platforms/`、`src/skills/`。
- 新增构建与安装脚本：`scripts/build`、`install`、`dev-codex`、`install-codex` 等。
- 同时支持 Claude Code 和 Codex 平台。
- 旧 v1 材料归档到 `v1/`。
- README 将 AIPD2 定义为“面向软件开发的 AI Harness 框架”。

这是从“文档仓库”到“可安装工具”的关键转折。AIPD 开始拥有真实 L6 代码形态，而不只是被 AI 阅读的 Markdown。

### 5. Plan 改 Case：执行对象重新定义

时间：2026-05-07

`fd93e70` 将 AIPD2 的计划流程改为 Case，删除旧 plan 概念和命名，新增 case 模板与 case-create / case-run / case-archive 技能。这个变化的意义不只是改名：

- Plan 更像预设路线；Case 更像一次具体事项的事实源。
- Case 能容纳目标、边界、上下文索引、steps、验收和归档。
- Step 成为更适合派发、恢复和审查的执行单元。

同日还新增 Git 推送辅助 skill，说明 AIPD 开始把真实项目里的常用操作纳入可复用流程。

### 6. Fork-first 与超级分身：Agent 协作模型升级

时间：2026-05-08 到 2026-05-11

`f86e819` 增加 fork-first 子 Agent 运行模式，明确 Codex 默认 `fork_context: true`。随后 `c285e29` 增加 Codex custom agent workflow，`4ebec79` 和 `805ec85` 将子 Agent 模型推进为“超级分身 / clone agent”：

- Main Agent 保护用户沟通、边界判断、方案审查和最终验收。
- 分身 Agent 从 Main Agent 当前上下文 fork 出去，承担探索、验证、批量修改、日志和 diff 等过程成本。
- 分身不是低上下文执行工人，而是继承主线认知的局部分支。

这是 AIPD 从“流程管理”进入“上下文预算管理”的关键迭代。后续 AIPD 的很多设计，包括 case-run、角色 Agent、step 执行记录，都围绕这个模型展开。

### 7. 自迭代、Context Map、Vue / Mermaid 角色能力

时间：2026-05-16 到 2026-05-27

这一阶段主要补齐 AIPD 自身演进和具体场景能力：

- 新增 AIPD 自迭代能力，形成 c0.3 agent fork role policy。
- 引入 context update workflow 和 `_adoc/context-map.md`，后续演化为 map-first 检索。
- 增强 Vue 架构图指引、Mermaid 预览能力，并最终把 Mermaid 合并为 `aipd-mermaid` skill。
- 增加 Vue provider agent routing，拆出 `aipd_vue_provider` 角色。

这些提交体现了 AIPD 开始面对真实前端工程任务：不只是“创建 case”，还要让 Agent 能按 Vue 组件、Provider、架构图、字段对齐等具体开发边界执行。

需要后续警惕的是：领域角色能力一旦增加，必须有清晰入口和降级规则，否则会让 Agent 先纠结“该用哪个角色”，反而降低执行稳定性。

### 8. L3 横向能力、三条主线与学习文档

时间：2026-06-03 到 2026-06-14

6 月上旬是 AIPD 认知表达的一次大整理：

- 新增 L3 `horizontal-capabilities.md` 和 `vertical-concept-modules.md`，把纵向概念模块和横向功能能力分开。
- 强化 map-first 认知加载。
- Weave 进入核心流程，成为把稳定经验回写到 ADOC、局部 README 或 map 的机制。
- 新增面向用户的学习文档体系，形成 6 篇推荐阅读路径。
- 明确三条主线：知识库最小闭环、Case / Step 开发逻辑、AI 原生代码架构实验。
- `9004445` 澄清 AI 原生上下文解耦，强调纵向黑箱、降低牵连面、Decouple first, DRY later。

这一阶段的 AIPD 不再只是内部 skill 工程，而开始向用户解释“为什么需要 AIPD”和“该如何学习 AIPD”。同时，AIPD 的核心认知从 L1-L5 静态层级，扩展到 map、Weave、Case、分身 Agent 等横向能力。

### 9. SOP、仓库结构重分层与 AIPD 命名收敛

时间：2026-06-16

这是当前仓库形态形成的最大结构调整之一：

- 新增 SOP 知识结构，区分可复用 AI 原生程序与普通 L4/L5 知识。
- 归档已完成 case，更新 case 队列。
- 按 C0.7 思路重构项目结构，将 skill 源码移动到 `aipd-skill/`。
- 清理 legacy 历史材料，避免历史归档继续污染当前入口。
- 将 AIPD2 命名统一收敛为 AIPD，skill 从 `/aipd2*` 迁移为 `/aipd*`。

这一阶段解决了一个关键问题：AIPD 自身也需要符合 AIPD 的结构原则。历史材料、skill 源码、学习文档、Desktop 探索、项目认知不能继续混在同一层。

### 10. AIPD Think 与 L2 / L3 / L4 边界刷新

时间：2026-06-20

`c21f205` 引入 AIPD Think，把 Case Create 之前的模糊讨论、调研和方案比较定义为一个前置能力。Think 的出口包括 Create、Kill、Defer、Research、Weave、Continue，避免所有想法都过早变成 Case。

同日 `7150224` 刷新 C0.7 认知层与流程边界：

- 新增 L2 Research 入口，强调外部世界不只是痛点，还包括竞品、范式、市场观察、流量和变现资料。
- 刷新 L1 intent、L5 dev 和相关模板。
- 新增 `aipd-skill/README.md`、`aipd-desktop/README.md`。
- 删除 `docs/legacy/README.md`，减少历史入口噪声。

这是 AIPD 当前阶段的明显信号：框架正在从“执行 case”前移到“是否应该形成 case”的判断层，同时补齐 L2 外部世界，避免项目知识库只向内部工程规则塌缩。

## 每日更新记录

### 2026-02-02

- 初始化 AIPD 仓库，建立 README、英文 README、技术说明、示例、模板和 `skill.md`。
- 初始定位是 AI-Powered Document-Driven Development，核心是让 AI 通过文档管理从需求到交付的流程。
- 更新 README，突出核心卖点。

大迭代判断：项目起点。

### 2026-02-03

- 持续调整 README 和英文 README，强化价值主张。
- 更新 plan 指南、plan 模板和 skill 规则。
- 新增 `.gitignore`。

大迭代判断：小迭代，主要是早期表达和模板校准。

### 2026-02-12

- 将文档架构从 `spec/system/runbook` 重构为 `business/tech` 两层。
- 引入 `index.md` 大索引作为项目入口。
- 将 spec、技术约束、runbook/SOP 下沉到更贴近业务或技术模块的位置。

大迭代判断：第一次文档架构重构，开始摆脱固定模板目录。

### 2026-03-07

- 完善 init / design / plan / execute / archive 阶段化文档结构。
- 移除旧 spec 示例和模板。
- 新增 `FUTURE_PLAN.md` 记录未来规划。

大迭代判断：阶段化流程成型。

### 2026-03-10

- 删除 runbook 相关旧结构。
- 调整 README、phase 文档和 plan 模板。

大迭代判断：小迭代，是对阶段化结构的清理。

### 2026-03-11

- 小幅更新 `skill.md`。

大迭代判断：小迭代。

### 2026-04-07

- 大更新前期存储，引入 Agent team、AIPD init 主 / 子 Agent、Planning worker 体系等材料。
- 开始把 intent、planning、execute、archive 等能力拆成更明确的角色和参考文档。

大迭代判断：从文档阶段向 Agent 协作阶段过渡。

### 2026-04-08

- 重排目录，形成 L1 intent、L2 scenario、L3 engine、L4 product arch、L5 tech arch 等认知结构。
- 增加 OKR、map-adoc-structure、map-skill-structure 等入口。
- 重组 Planning 结构，按角色分离主 Agent、research worker、dev worker、archive worker。
- 部分旧 phase 文档被删除或迁移。

大迭代判断：五层认知 + Planning 角色体系开始成型。

### 2026-04-09

- README 重新组织核心架构说明。
- 统一目录命名，明确五层认知结构映射。

大迭代判断：对 4 月 8 日大重构的表达和命名收敛。

### 2026-04-20

- 新增 `v2-plan/`，列出 v0.2 / 2.0 版本迁移计划。
- 计划项覆盖目录、核心迁移、worker 迁移、init、skill 编写、build script、install script、cleanup、README 等。

大迭代判断：AIPD2 工程化前的迁移计划。

### 2026-04-28

- 完成 AIPD2 beta 工程化：新增 `src/core`、`src/platforms`、`src/skills`。
- 新增构建、开发安装、用户安装、项目安装脚本，并覆盖 Claude Code / Codex。
- 旧材料归档到 `v1/`，v2-plan 进入 archive。
- skill 拆成 `aipd2`、`aipd2-plan-create`、`aipd2-plan-run`、`aipd2-plan-learn`、`aipd2-plan-archive`。

大迭代判断：从文档包转成可安装 skill 工程。

### 2026-04-29

- README 小幅补充。

大迭代判断：小迭代。

### 2026-05-07

- 将 AIPD2 的 plan 流程统一迁移为 Case。
- 新增 Agent Entry 模板，初始化时写入项目记忆文件。
- 新增 case-create、case-run、case-archive、learn 等 skill。
- 删除旧 v2-plan 执行台账，改用 v2-todo 记录后续讨论。
- 新增 Git 推送辅助 skill，并补充中文提交说明。

大迭代判断：执行系统核心对象从 Plan 转向 Case / Step。

### 2026-05-08

- 增加 fork-first 子 Agent 运行模式。
- Agent Entry 引入 Main / Sub Agent 模式，明确 Codex 默认 `fork_context: true`。
- case-create 和 case-run 调整为优先让 fork 子 Agent 承担探索和 step 执行。
- 整理 v2-todo 归档。

大迭代判断：分身 Agent 模型开始成为默认执行策略。

### 2026-05-09

- 新增 Codex custom agent workflow。
- 新建 AIPD 自身 `_adoc/`、AGENTS、OKR、case index 和 c0.1 Codex custom agents case。
- 新增 Codex Vue architect agent 配置。
- 初始化默认文档壳和 Codex 安装脚本相关能力。

大迭代判断：AIPD 开始用 AIPD 管理自身，进入自举阶段。

### 2026-05-11

- 提出并同步“超级分身 / clone agent”模型。
- 更新 AGENTS、L1 intent、L5 dev、case 模板、core overview、平台 agent guide 和 case-run 规则。
- 新增 c0.2 subagent origin model case。
- README 小幅更新。

大迭代判断：分身 Agent 从执行技巧升级为 AIPD 核心认知。

### 2026-05-16

- 更新 AIPD 自迭代相关 skill。
- 新增 c0.3 agent fork role policy case 和相关研究 / 设计 step。
- 新增 Vue 架构图指引。
- 更新 case 模板和 case-create / learn 规则。

大迭代判断：开始围绕 Agent 分层与角色调度做自迭代。

### 2026-05-19

- 新增 AIPD context update workflow。
- 新增 `_adoc/context-map.md` 和对应模板。
- 更新 AGENTS、index、L5、agent-entry、case 模板、case-create、case-run、learn、update 等入口。

大迭代判断：map-first 检索能力的前身成型。

### 2026-05-20

- 更新 Vue 架构图指引。
- 补充 Mermaid 预览与 AIPD 指引，新增 `mermaid-preview` skill 和渲染脚本。
- 增加 AIPD L1-L5 intro 图片资产。

大迭代判断：面向前端架构表达和可视化能力的小中型迭代。

### 2026-05-25

- 新增 L3 core index，补充核心认知入口。
- 新增 map 模板。
- 更新 context map、index、agent-entry、case 概览、case 模板、overview、case-create、learn、update 等。
- 新增 Vue architect SOP agent 配置。

大迭代判断：L3 核心认知和 map 检索进一步前移。

### 2026-05-27

- 将 Mermaid 支持合并进 `aipd-mermaid` skill，移除独立 `mermaid-preview` skill。
- 新增 Vue case-create guide 和 Vue provider guide。
- 新增 Vue provider agent routing，增加 `aipd_vue_provider` agent。
- 更新 Codex agent guide、case-run 和 step 模板。

大迭代判断：领域角色能力从架构师扩展到 Provider，并清理 Mermaid 能力边界。

### 2026-06-03

- 新增 L3 横向功能能力和纵向概念模块文档。
- 更新 README、AGENTS、context map、index、adoc templates、agent-entry、case 概览、case 模板、overview、Vue agents、多个 aipd2 skills。
- 新增或强化 `aipd2-weave`，进一步把 AIPD 的核心从单纯 L1-L5 分层，扩展到横向能力：map、case、weave、上下文服务等。

大迭代判断：L3 核心模型升级，开始清晰区分纵向模块和横向能力。

### 2026-06-07

- 演进 AIPD2 framework flow，新增或更新大量 case、docs 和 skill 规则。
- 移除过期 AIPD intro 图片资产。
- 新增面向用户的学习文档体系，包括 guide 和 modules。
- `_adoc/map.md`、L3 map、L4 map、Inbox、interaction style、step context isolation 和平台无关 agent guides 集中成型。
- 更新 AIPD2 positioning。

大迭代判断：对外学习路径成型，是从内部框架向用户可理解框架的一次大整理。

### 2026-06-08

- 改进 case-create 确认流程。
- 细化 Agent dispatch rules。

大迭代判断：小中型迭代，主要修正执行入口的交互和派发边界。

### 2026-06-11

- 澄清 AI-native context decoupling。
- 更新上下文解耦相关 docs、README 和 ADOC 文档。
- 强化纵向黑箱、牵连面、Decouple first / DRY later 等判断。

大迭代判断：AI 原生代码架构实验的核心原则成型。

### 2026-06-14

- 重构 AIPD2 学习文档。
- 调整 docs guide 和 modules 的组织方式。

大迭代判断：学习文档 IA 重构。

### 2026-06-16

- 新增 SOP 知识结构，明确可复用 AI 原生程序不等于普通 L4/L5 知识。
- 归档已完成 cases，更新 case queue。
- 按 C0.7 思路重构项目结构，将源码集中到 `aipd-skill/`。
- 清理 legacy 历史材料。
- 将 AIPD2 命名收敛为 AIPD，skill 和 docs 统一迁移到 `/aipd*`。

大迭代判断：当前仓库结构和品牌命名的关键收敛点。

### 2026-06-20

- 建立 AIPD Think 基础，将 Case Create 之前的前置讨论、调研和方案比较定义为独立能力。
- 在 ADOC、用户 docs 和 map 中记录 Think 模型及 Create / Kill / Defer / Research / Weave / Continue 出口。
- 新增 c0.9 AIPD Think system design case，用于研究 OpenSpec 风格流程和同类框架。
- 刷新 C0.7 AIPD 认知层与流程边界。
- 新增 L2 Research 入口，明确外部世界不仅是痛点，也包括竞品、范式、市场、流量和变现。
- 新增 `aipd-skill/README.md` 和 `aipd-desktop/README.md`，删除 legacy README。

大迭代判断：Think 前置能力和 L2 外部世界补齐，AIPD 从“执行系统”继续前移到“任务是否成立”的判断系统。

## 后续评判 AIPD 是否肿歪的观察锚点

### 1. 新概念是否解决真实恢复和判断问题

AIPD 历史上多次新增概念：L1-L5、OKR、Case、Step、分身 Agent、Map、Weave、SOP、Think。后续新增概念时，应追问：

- 它是否减少 Agent 读错上下文、重复探索、错误执行的概率？
- 它是否有明确入口、文件事实源和退出条件？
- 它是否只是把聊天里的临时说法包装成长期框架概念？

如果一个概念不能改善检索、执行、恢复、验收或回写，就可能是肿。

### 2. 分层是否还服务于检索，而不是服务于分类洁癖

AIPD 从 `spec/system/runbook` 发展到 L1-L5，再到 L2 Research、L3 横向能力、L4 产品线、L5 工程规则。分层的目的应是让 Agent 更快找到正确上下文。

观察点：

- `_adoc/map.md` 是否能一跳路由到关键文档和代码入口。
- 新文档是否被 map/index 暴露，还是藏在深层目录里。
- L2/L3/L4/L5 边界是否帮助判断，还是变成“这个东西到底放哪”的消耗。

### 3. Case / Step 是否仍然保留执行价值

Plan 改 Case 的初衷，是让长任务可恢复、可派发、可验收。后续判断 Case 是否变肿，要看：

- Case 是否真的承载目标、边界、上下文索引和验收状态。
- Step 是否是可执行单元，而不是讨论笔记拆碎后的目录。
- 执行记录是否足够恢复，还是只是形式填空。

### 4. 分身 Agent 是否保护主线，而不是制造调度成本

分身模型的价值是消化探索、验证、日志、diff 等过程成本。风险是角色过多、派发过重。

观察点：

- Main Agent 是否因为分身而更清楚，而不是还要管理大量分身输出。
- 推荐 Agent 失败时是否能降级到领域指引，而不是阻塞。
- 角色 Agent 是否按真实执行边界拆分，而不是按知识点拆分。

### 5. AIPD 是否把“工具能力”误当成“框架核心”

Mermaid、Git push、Vue Provider、Desktop 都是有价值的能力，但它们不一定是 AIPD 的核心。后续判断时要区分：

- 核心：项目认知、上下文检索、任务执行、Agent 协作、经验回写。
- 场景能力：Vue、Mermaid、Git、Desktop UI 等具体入口。

场景能力应通过 map、README、skill 边界接入核心，而不是反过来改写核心模型。

### 6. Think 是否防止过早进入 Case

Think 的出现是为了避免把模糊讨论直接包装成 Case。后续观察：

- Think 是否有明确状态和出口。
- Think 是否能输出 Create / Kill / Defer / Research / Weave / Continue，而不是默认走 Create。
- Think 是否让 Case 更少但更准，而不是新增一层必须填写的流程。

### 7. 历史材料是否被正确归档

AIPD 多次清理 legacy。历史材料有价值，但不能污染当前入口。

观察点：

- 旧 AIPD2、旧 plan、旧 docs 是否还会被 Agent 当成当前规则。
- 历史是否通过 Git、日志和归档说明可追溯，而不是散落在主入口。
- 新增文档是否明确“当前规则”还是“历史参考”。

## 维护规则

- 每次大迭代后补充“每日更新记录”和“大迭代脉络”。
- 小提交可以合并到同一天的一句话概括，不必逐条展开。
- 如果某次提交只是改名、清理、修文案，应记录其影响面，不夸大成新概念。
- 如果新增概念，应同时记录它试图解决的问题和未来可能肿歪的风险。
- 本日志记录已提交历史；未提交的 case 执行过程仍留在对应 case / step 文件中。

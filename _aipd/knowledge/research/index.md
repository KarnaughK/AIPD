# AIPD Research

Research 记录 AIPD 所处的外部世界：用户是谁，真实场景是什么，当前 AI 开发方式出现了哪些变化，用户在这些变化下遇到哪些痛点，以及 AIPD 为什么需要这些能力。

Research 不负责解释 AIPD 内部模型细节。Case / Work Package、Weave、SOP、Desktop、Mermaid、Update 等能力的具体设计，分别进入 Core / Product / Engineering / SOP / case；Research 只回答这些能力背后的需求来源。

## 证据与时间边界

- 本文主要依据 AIPD 在真实项目中的使用观察、已归档 Case 及用户明确反馈，观察窗口截至 2026-08-10。
- 带明确日期的产品试用结论只适用于对应时间点；外部工具能力、市场状态和产品形态可能变化，使用前应重新核验。
- “趋势”“典型用户”和“痛点”是当前样本下的归纳，不冒充普遍行业统计。后续引用外部论文、报告或产品事实时，应在对应条目保留来源、访问日期和适用范围。

## 用户画像

AIPD 主要面向已经让 AI 深度参与开发，但发现上下文管理、任务连续性和长期维护变得更难的项目。

当前最典型的用户是：

- **一人公司**：一个人同时承担方向判断、产品设计、研发执行、上线维护和长期迭代。
- **单人开发者**：需要长期维护一个超过个人短期记忆容量的软件项目。
- **一个人配合 AI 开发大型项目的场景**：AI 能提升执行速度，但项目认知、边界和经验需要可持续沉淀。
- **AI 深度参与的持续迭代项目**：有业务语言、历史取舍、跨模块规则、多 Agent 执行、任务恢复和经验回写需求。

AIPD 不优先服务一次性原型、极小项目，或完全不需要长期上下文沉淀的任务。

## 外部趋势

AI Coding 正从 Vibe Coding 进入 Agent Coding。

早期 AI Coding 更像局部协作：人手动 `@` 文件、贴需求、解释背景，AI 在一个小上下文里写函数、补组件或改脚本。

Codex、Cursor Agent 等工具出现后，Agent 可以自己搜索、读文件、跑命令、定位入口、修改多个文件，甚至把任务拆成多个步骤。执行能力变强后，核心问题不再只是“AI 能不能写代码”，而是：

- Agent 能不能稳定找到正确上下文。
- Agent 能不能继承项目历史取舍。
- Agent 长时间工作后能不能恢复状态。
- 人能不能验收、控制和信任 AI 的工作结果。
- 项目架构能不能适配 AI 的上下文读取方式。

## 核心痛点与需求线

### 1. Agent 上下文问题

当前 AI Agent 已经能搜索、读文件、跑命令和修改代码，但它很少能在查询完一个东西后主动丢弃查询过程，只保留稳定结果上下文。

这会导致 Agent 为了找到正确代码和背景吞下大量过程上下文，下一次任务又重新搜索、重新判断、重新踩坑。

AIPD 需要建立项目知识库，把“查询后的稳定结果”沉淀下来，解决 Agent 寻找代码、理解边界和继承经验困难的问题。

### 2. 项目文档完整性问题

项目知识库不只是 AI Agent 时代才出现的问题。

在人类开发时代，一个项目也很难长期拥有完整、可读、可持续维护的知识库。文档往往只记录某个阶段的版本，不断叠加，而不是形成项目完整描述。很多历史原因、业务边界和产品取舍藏在代码、聊天、Issue、PR 或个人记忆里。

AIPD 需要通过知识库持续迭代维护项目描述，并让知识库成为上游事实源，反过来约束和解释后续实现结果。

### 3. AI 长时间工作问题

AI 可以一次性处理很多局部任务，但长时间工作会遇到上下文压缩、聊天分叉、执行记录散落、目标漂移和中途恢复困难。

一个大事项不能只靠单条聊天推进。执行过程需要目标、阶段、边界、上下文索引、work package、验收标准和回写位置。人和 AI 都需要知道当前做到哪里、为什么做、下一步接哪里。

AIPD 需要用 OKR、Case、Phase、Work Package、执行记录、分身 Agent 和 Close 归档候选，解决 AI 长时间工作和长任务恢复的问题。

### 4. AI 原生代码架构扩展问题

现代软件开发不适合先把全部需求想清楚，再一次性设计开发。真实项目往往是先上线一部分功能，看反馈，再持续加工。

在人类主导的代码架构里，很多结构是边写边改形成的；这种结构在 AI 深度参与后会暴露新的问题：横向分层和过早复用会打散上下文，共享 helper / service / 组件容易形成隐性依赖，AI 读取代码时需要跨很多文件拼上下文，漏读和误判概率升高。

AIPD 需要让代码架构在敏捷迭代和 AI 协作下继续扩展，重点从传统“先抽象复用”转向上下文解耦、纵向黑箱、降低牵连面和局部可检索。

这条线后续需要按技术栈沉淀经验库。例如建立 `Vue` 目录，沉淀 Vue 体系下的 MMD / Mermaid 画法、适合 AI 理解和扩展的代码架构、组件经验、provider / 状态组织和局部 README 写法。Nuxt 等 Vue 生态技术也可以复用 Vue 目录的通用经验。

### 5. SOP / AI 程序需求

Agent 叠加 AI 智能能力后，具备很强的行动能力。它可以用较低研发成本、较高运行成本，产出一种可执行的 AI 程序。

这种程序离开 LLM / Agent 运行时就无法运行。执行主体不是代码运行时，而是 LLM 或 Agent 根据步骤、上下文、判断条件和工具调用完成任务。

AIPD 需要用 SOP 目录记录这些 AI 层面的 Agent 运行时工具功能，承接上线流程、日报、检查、整理、审计、发布前确认等繁琐、重复、但很难完全写成传统脚本的任务。

### 6. 未整理信息暂存与分流

AI 协作过程中会产生大量未定型信息：灵感、待确认问题、临时材料、半成型判断、可能的 case、可能的知识库条目。

这些信息既不适合立即写进长期知识库，也不一定已经够资格创建 case。如果没有暂存区，它们会继续散落在聊天里，后续很难找回，也会干扰稳定认知。

AIPD 需要 Inbox 这类中间层，用来临时接住未整理信息，再判断它后续应该 weave 进知识库、转成 case、进入 SOP，还是直接丢弃。

### 7. AI 工作控制、验收和信任

AI 能力增强后，人需要知道 AI 做了什么、如何验收、哪些经验应回写、什么时候可以归档或提交。

这条线对应 Case 验收、Work Package 执行记录、Close 归档候选、Close phase、git push 等能力。它解决的不是让 AI 更能干，而是让 AI 做完之后，人能收得住、验得清、信得过。

### 8. AIPD 框架自迭代

AIPD 不只是给业务项目沉淀知识，它本身也是一个会在真实使用中不断暴露问题的框架。

真实协作里会出现 skill 行为不符合用户真实工作流、`aipd-case` / weave 边界需要调整、Agent 没有按预期读取 map / case / SOP、用户反复纠正同类问题、transcript 暴露框架规则或模板缺口等情况。

AIPD 需要 `aipd-learn` 这类框架自迭代能力，把真实使用经验回流到 AIPD 的 skill、模板、Agent 行为规则和项目认知中。

### 9. 已接入项目的 AIPD 架构升级迁移

AIPD 自身会持续迭代：Agent Entry、map 结构、case 模板、Core / Product / Engineering 边界、SOP 约定、skill 行为规则都可能升级。

已经接入 AIPD 的项目，需要在 AIPD 架构演进后快速、安全地更新到新规则。这个更新不能简单覆盖项目文件，因为项目自己的五类 Knowledge、Case、Map、局部 README 和历史经验都可能已经形成稳定认知。

AIPD 需要 `aipd-update` 这类能力，审计差异、识别旧结构、给出更新方案，并在用户确认后合并新模板和新规则，让已有项目跟随 AIPD 框架升级，同时不破坏项目已有认知。

### 10. AIPD 文件查询与观看

随着 AIPD 使用变大，配套文件会越来越多：五类 Knowledge、Case、phase、Work Package、OKR、Inbox、SOP、MMD、docs、局部 README、执行记录、参考资料。

只靠普通文件树或聊天窗口会越来越难快速查询、定位和观看这些内容。这个痛点继续由 map-first 检索、Case 恢复入口、局部 README、现有 IDE 和 Codex 文件能力共同承接，不再单独建设 AIPD Desktop。

### 11. Agent 桌面化使用观察

当前最强的编程 Agent 很多仍以 CLI 或接近 CLI 的形态存在。Codex 虽然有桌面端，但主要组织形式仍是工作空间下的对话列表；它没有按 AIPD 的五类 Knowledge、Case、Phase、Work Package、SOP、MMD 等工作对象组织界面。

2026-08-07 的实际试用表明，为此再维护一套独立桌面壳的成本和产品收益不匹配。AIPD 继续通过文件协议、Skill、Agent Entry、map 和 Case 适配现有 Agent 客户端，不把客户端本身纳入当前产品范围。

### 12. MMD 高带宽交流

当 AIPD 的工作效率提高后，新的瓶颈会变成人和 AI 的交流速度。

很多复杂结构只靠文字描述会很慢，包括架构关系、模块边界、Case / Work Package 拆解、数据流和状态流、Agent 协作路径、桌面端或产品结构。

MMD / Mermaid 可以把复杂关系压缩成图，让人和 AI 更快对齐结构、发现缺口、讨论边界。这条线不是单纯“画图好看”，而是把图作为人机协作中的高带宽表达方式，降低沟通成本和误解成本。

## 工具生态观察

当前 AIPD 关注的外部工具和范式包括：

- Coding Agent：Codex、Cursor Agent 等。
- Agent 客户端 / 套壳项目：FanBox、OpenCovibe、codex-app-server-web 等。
- 程序化接口路线：Codex App Server、Codex SDK、`codex exec --json`、Codex MCP server、OpenCode 原生接口。
- 桌面技术路线 Electron、Tauri 曾用于 C8 实验，当前不再是 AIPD 产品选型。

这些内容在 Research 中只记录为外部生态观察。具体接入协议、会话模型、adapter 设计和工程选型应进入 Engineering 或 Desktop case。

## Desktop 实验结论

C8 Desktop 实验最初来自三类 Research 需求：

- **文件体系扩大后的查询与观看**：AIPD 配套文件越来越多，需要更贴近 AIPD 结构的浏览、预览和引用界面。
- **强 Agent 的桌面化使用**：CLI / 对话列表形态不适合承载 AIPD 的项目对象组织方式。
- **Case / Work Package 与聊天组织单位不一致**：Codex 桌面端按“聊天”组织工作，AIPD 按 Case / Work Package 组织工作，导致创建 case、执行 case、修改 case、讨论工作包分散在多个聊天里。

实际实现和试用后，这些需求不足以支撑一套独立桌面产品。Desktop 方向于 2026-08-07 取消；上述痛点继续作为外部场景保留，但默认通过现有 Codex / IDE 能力和 AIPD 自身的知识、检索、Case 协议解决。

## 不写入 Research 的内容

- AIPD 三条主线的内部模型细节，进入 Core。
- Case / Work Package 字段、模板和执行机制，进入 Core / Product / case 模板。
- Vue / Nuxt 等具体技术目录结构、组件模板、MMD 画法和代码组织规范，进入 Core / Engineering / 技术栈局部 README。
- SOP 具体执行模板、参数、状态记录和工具调用细节，进入 SOP / Core / Product / Engineering。
- Inbox 具体收件格式和整理流程，进入 Inbox 模块 / Product / Engineering。
- Learn 具体 transcript 审计规则和回写包格式，进入 Learn 功能线 / Product / Engineering。
- Update 具体审计清单、合并策略和模板差异处理流程，进入 Update 功能线 / Product / Engineering。
- 已取消的 Desktop 功能列表、技术栈和 AgentAdapter 讨论只保留在归档 C8，不进入现行 Product / Engineering。
- Mermaid 图具体语法、渲染脚本和图形规范，进入 MMD / Mermaid skill、Product / Engineering 或局部 README。

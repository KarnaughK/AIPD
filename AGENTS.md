<!-- AIPD:START -->
# AIPD Project Entry

本项目使用 AIPD 维护项目认知与协作流程。

AIPD 是面向 AI 协作的软件项目认知框架。它把长期知识、检索地图和 Case / SOP / OKR 等流程状态放进同一个 `_aipd/` 工作区，让 AI 不只看到代码结果，也能理解为什么这样设计。

## 五类并列知识域

- **Intent / `knowledge.intent`**：项目方向、目标和长期取舍。
- **Research / `knowledge.research`**：方向所处的外部世界，包括用户、场景、需求、痛点、竞品、行业或玩法范式和调研结论。
- **Core / `knowledge.core`**：项目内部赖以成立的核心模型，包括核心对象、领域语言、主流程、数据、增长或商业模型。
- **Product / `knowledge.product`**：产品功能、功能边界、业务规则、用户可见行为和相关实现入口。
- **Engineering / `knowledge.engineering`**：产品能力落到代码时的跨模块业务实现逻辑和工程规则，如权限、路由、第三方插件和前后端约定。

五类知识域是并列分类，不是固定的递进读取顺序。具体代码仍分布在项目的真实源码目录中，不放进 `knowledge/`。

## 上下文检索

`_aipd/map.md` 是项目给 AI 准备的第一跳检索地图。它把用户说法、业务词和工程词路由到相关知识域、SOP、局部 README 和真实代码入口。

进入任何 AIPD 读取或写入前，先使用当前已安装 AIPD Skill 中的 `workspace/project-state.md` 与 `updates/catalog.json` 执行项目状态 gate；catalog 的 `currentVersion` 是本机版本 `I`，项目版本永远不从本 Agent Entry 推断。按路径项存在性识别新旧根，损坏 symlink 和同名普通文件也算存在；双根、symlink 工作区 / 工作区内 symlink、manifest 非法、保留路径类型冲突或项目版本高于 `I` 均硬停止。精确两键 manifest 是 `unversioned-v2`；精确三键且 `aipdVersion` 为正整数时是已版本化 v2。`unversioned-v2` 或项目版本低于 `I` 时返回 `needs-aipd-update`；只有版本相等时继续普通 AIPD 读写。必要入口缺失是 Update drift，安全的额外 Workspace 模块作为项目定制保留。

Map 可以有三种分辨率：项目总图、业务线 / 功能线 / shared capability 的上下文 Map、代码就近局部实现图。它们是读取视图，不是新的知识分类，也不是每次都要走完的固定三级流程。

进入任务后按以下顺序取上下文：

1. 先读 `_aipd/manifest.json` 和 `_aipd/index.md`。
2. 读取 `_aipd/map.md`，用它把用户自然语言路由到相关知识域、SOP、局部 README 和代码入口。
3. 按任务需要读取 `knowledge/{intent,research,core,product,engineering}/` 中的必要上下文以及代码就近 README。
4. 地图缺失或命中不清楚时，用 `rg` 搜索 README、核心词、页面名、接口名和权限码等线索；仍不确定时再向用户确认边界。

普通开发、找代码、查业务规则、页面或组件实现时，默认不读取 `_aipd/case/` 或 `_aipd/okr/`。只有用户明确要求创建、执行、恢复、归档 Case，查看或更新 OKR，或当前任务本身就在相应流程中，才进入这些目录。

## 工作区位置

- `_aipd/manifest.json` 是工作区 Schema 身份和已应用 AIPD 版本事实源。
- `_aipd/index.md` 是项目认知入口。
- `_aipd/map.md` 是任务上下文检索地图。
- `_aipd/update-log.md` 记录本项目实际完成的 AIPD 版本跃迁、验证和保留差异。
- `_aipd/knowledge/` 存放五类长期知识。
- `_aipd/leader/` 是显式调用 `$aipd-leader` 后才创建的可选项目主导工作记忆；普通任务不读取。
- `_aipd/sop/` 存放以 Agent 为运行时的可复用项目动作。
- `_aipd/case/`、`_aipd/okr/` 和 `_aipd/inbox.md` 分别承载短周期事项、阶段目标和未整理信息，不属于长期知识正文。
- 页面、弹窗、组件或模块内部的最后一层实现地图放在代码就近 `README.md`。

## 执行概念

- **Case**：一次马上要推进并最终关闭的短周期目标容器；`case.md` 记录 Case Contract 与 Think / Design / Execute / Verify / Close 状态。
- **Work Package**：Case Execute phase 内可执行、可恢复、可验收的目标包，放在 `03-execute/work-packages/`；它不等于子 Agent 派发节点。
- **SOP**：以 Agent 为运行时的可复用 AI 原生程序。
- **OKR**：阶段目标，用来判断工作是否推进了项目方向。
- **Weave**：把已完成、已实现、已验收的稳定信息编织回五类知识域、局部 README 或 Map；未完成 Case 中的候选先留在 Close phase。

Weave 回写时，Intent 只接收用户明确确认的长期方向和边界；Research 只接收带来源与时间边界的稳定外部事实或调研结论；Core、Product、Engineering 只接收已确认或已验证的项目事实。

## 显式 Leader 模式

普通 AIPD 默认停留在 Case 执行层。只有用户主动调用 `$aipd-leader`，当前对话才成为项目 Leader；任务复杂、自然语言提到 Leader 或存在多个 Case 都不自动触发。

- 一个项目同一时刻只有一个 Leader 和一个 active Mission。
- Leader 负责方向澄清、探索、Case 拆分、同级执行层调度和总验收；每个执行层对应一个 Case（Codex task 或 Cursor `cursor-agent`），并在其中使用 `aipd-case`。同一 Case 的 phase 回跳留在该执行层，不要为了推完它再开平级 Case。
- Case task 可以按下文规则使用子 Agent，但不创建新的同级 task，不承担跨 Case 方向判断。
- `_aipd/leader/` 只保存没有更权威归属、但会影响当前 Mission、跨 Case 协调和恢复的信息；Knowledge、Case、OKR、SOP、Map、README 或代码已有正文时只保留链接和影响摘要。
- 用户新方向与项目文档或已验证事实冲突时，先澄清底层逻辑并记录变化依据，不静默覆盖，也不盲目执行。

## 当前 Agent 平台的目标模式 / goal 模式

「目标模式」「goal 模式」指当前这条 Agent 对话所在宿主提供的长效续跑能力（Cursor `/goal` / `CreateGoal`，Codex Goal）。它让**当前这条对话**朝一个可核验结束态继续被拉起。它不替代 Mission，也不替代 Case Contract。用户或宿主未明确要求时不创建。

用户说「目标模式 / goal 模式 / 绑目标 / 自己定义目标」时，先看**本对话身份**，再决定绑谁：

1. 本对话已经显式调用 `$aipd-leader`（或用户明确选择了该 Skill）：这条对话是 Leader。goal 模式绑当前 Mission 的完成判据，不绑某一个 Case。拆 Case、派执行层、验收仍由 Leader 做。不要加载 Case 的 `goal-mode.md`。
2. 否则：这条对话是默认执行层。goal 模式绑当前 Case；还没有 Case 就先走 `aipd-case` 立 Case，再开 goal 模式。不要因为项目里已有 `_aipd/leader/` 或进行中的 Mission，就把自己当成 Leader。

不要凭任务长、有 Case、有 Mission 或怕压缩而自动创建。`/loop` 是叫醒器，不是 goal 模式本身。

## Main / 子 Agent 调度

AIPD 不把子 Agent 当成每个任务的默认步骤。下述 Main / 子 Agent 是单个普通任务或 Case task 内部的运行时选择；显式 Leader 与同级 Case task 的关系由上一节和 `aipd-leader` Skill 约束。Main Agent 根据上下文隔离收益、真实并发收益、主线耦合度和调度成本决定是否派发。

### AIPD 上下文检索 Agent

Main Agent 先按 `_aipd/map.md` 做最小路由。已知入口少、上下文可控时直接读取；需扫描大量项目知识、SOP 或多条独立上下文线时，优先使用 `aipd_context_retriever` 隔离检索过程。

- 检索 Agent 默认检索五类知识域、`_aipd/sop/`、必要 README 和代码入口。
- Inbox、OKR 和 Case 是次级流程检索，只有用户明确提到或任务明显需要时才读取。
- 如果 custom agent 不可用，降级为普通子 Agent，并由已安装的 `aipd-case` Skill 加载 `@references/agent-guides/aipd_context_retriever.md` 作为领域指引。

Main Agent 负责用户沟通、意图判断、边界确认、调度、验收和状态写回。派发后每条证据面只有一个 owner，Main 不重复调查，只吸收压缩结论、依据、风险、建议和必要文件路径。

Build / Install 边界：

- 修改 AIPD 源码后可以直接运行 build 做低风险打包验证。
- build 完成后必须主动询问用户是否 install；install 只能在用户明确确认后执行。

## Case 锚定执行

AIPD 的长期任务状态以 Case / Work Package 文件为准，聊天上下文只是临时工作缓存。当发生上下文压缩、长任务续跑或状态不确定时，按以下链路恢复：

```text
AGENTS.md -> _aipd/manifest.json -> _aipd/index.md -> _aipd/map.md -> _aipd/case/index.md -> 当前 case.md -> 当前 phase -> 当前 work package
```

- 当前 Case、phase 和 Work Package 以 `_aipd/case/index.md`、对应 `case.md`、phase 目录和 `03-execute/work-packages/` 为准。
- 执行 Case 或普通开发前，先确认已经按 `_aipd/map.md` 和 Case 上下文索引完成任务上下文检索。
- 聊天与 Case / Work Package 文件冲突时，先指出冲突，再以文件为事实源。
- 每个会改变项目状态的 Work Package 完成后，必须写回 Work Package 执行记录、`03-execute/execute.md` 和 Case 状态。
- 大调研、长执行、批量验证、子 Agent 派发或 phase 跳转前，先写 checkpoint：当前问题、边界、预期输出、停止条件和返回位置。

子 Agent 看到“你是子 Agent”后不再创建新的子 Agent，而是读取 Work Package、Case 和派发 prompt 列出的上下文，只在边界内完成任务，并压缩返回结论、依据、风险、建议、改动文件和验证结果。

## 冲突规则

用户当前指令定义本次任务目标，AIPD 提供项目默认认知和历史判断。当两者冲突时，先指出冲突和风险，再继续。
<!-- AIPD:END -->

<!-- AIPD-INTERACTION-STYLE:START -->
# AIPD Interaction Protocol

本区块用于在 AIPD 项目中约束 Agent 的回复结构、讨论 / 执行切换方式和长短答边界。它不是 AIPD 项目认知入口；只有用户明确选择 Agent MD 等级 2，才写入 `AGENTS.md`。

写入后，本区块是项目级对话协议，不是可选风格建议。除非用户当前指令明确要求另一种格式，或与更高优先级的平台规则冲突，否则 Agent 必须遵守。

## 基本原则

- 默认先及时回应用户当前问题，不把讨论自动升级成执行。
- 讨论、分析、判断、反驳、方案比较类回复，默认必须先显式复述用户真正想推进、确认、讨论或询问的点，再基于用户原话和这次复述展开，最后形成结论。
- 用户在讨论方案、表达疑问、比较取舍或要求“先聊聊”时，只讨论，不改文件。
- 用户给出明确的小范围修改、实现、运行、验证等执行指令时，进入助手模式，直接执行。
- 如果执行边界不清，先短问一句，不要猜着改。
- 回答服务于当前目标，不把“可能相关”扩成完整教程。
- 可以有判断，可以反驳；如果用户方向绕远、抽象过度或任务边界不清，直接指出。

## 讨论 / 分析时

讨论、分析、判断、反驳、方案比较类回复默认按以下固定顺序组织。这个顺序不只是展示格式，也是可见回复的生成约束：先复述对齐，再基于用户原话与显式复述展开，最后形成结论。不要在前面的模块里提前写入结论，再用后文为它寻找理由。

只有明显的简单事实问答、状态确认、命令输出转述或一句话答复，才可以自然短答。

```md
### 我理解

用一句话复述用户当前真正想推进、确认、讨论或询问的点，包括必要的目标和边界。这里只做对齐，不评价方案，不提前给结论。

### 展开说说

基于用户原话和上面的显式复述，展开会影响结论的关键依据、概念关系和取舍。只呈现对用户有用的判断摘要，不要求输出完整内部推理，也不写成无边界教程。如果展开时发现首段理解有误，先明确修正，再继续形成结论。

### 结论

基于上面的判断给最终答案，通常 1-3 句。

### 横向拓展

最多列 3 个相邻方向，只列标题，不展开。不要把“还能讨论什么”冒充为任务的下一步。

### 下一步

优先只给 1 个最自然的向下动作。它可以是继续讨论、补充信息、确认方案、执行修改、运行验证或结束当前事项，不强行假设当前一定有执行任务。需要新的授权、外部副作用或扩大范围时，只建议或请求确认，不直接执行。
```

## 执行 / 修改时

不要套用讨论格式。按工作流自然更新：

- 开始时：一句话说明正在读什么、为什么读。
- 修改前：一句话说明准备改哪里、改成什么方向。
- 完成后：简短交付结果。

最终回复优先使用：

```md
### 已完成

- 改动：...
- 验证：...
- 说明：...
```

如果有明确风险或没法验证，必须说清楚。

## 长答触发

只有当用户明确说“详细讲”“完整展开”“写成方案”“系统梳理”“多给几个版本”“做报告”时，才长答。

即使长答，也要先给短版结论，再展开。
<!-- AIPD-INTERACTION-STYLE:END -->

# AIPD 产品功能线

Product 负责把 Core 的核心成立模型落成用户可见、Agent 可调用、任务可引用的产品能力。

这里的“产品”不只表示 GUI。对 AIPD 当前阶段来说，产品能力主要表现为 skill、项目文件能力、SOP 库和围绕它们的用户可见行为。具体工程实现、平台适配、脚本细节和角色 Agent 调度规则进入 Engineering 或就近源码。

## Product 和 Core / Engineering 的边界

- Core 回答 AIPD 靠哪些核心模型成立。
- Product 回答这些模型落成哪些可用能力，以及每个能力对用户承诺什么、不承诺什么。
- Engineering 回答能力如何落到当前 Codex / Cursor 适配、通用平台扩展结构、构建脚本、Agent 配置、路径和工程约定。

判断一条信息是否属于 Product，可以问：

- 它是不是用户会主动调用、进入或感知的能力。
- 它是不是一个稳定功能线，而不是某个 skill 内部步骤。
- 它是否需要说明功能边界、输入输出、用户可见行为和相关入口。

## 产品能力总览

| 产品能力 | 用户价值 | 主要入口 | 关联 Core 模型 | 状态 |
|---|---|---|---|---|
| AIPD 总入口与初始化 | 让 Agent 进入项目后知道如何读取 AIPD，并在新项目中创建基础结构 | `aipd`、`AGENTS.md`、`_aipd/` templates | 项目知识库维护模型、Map-first 上下文检索模型 | 已存在 |
| Map-first 认知加载 | 让普通任务先经 `_aipd/map.md` 路由到正确上下文，而不是让 Agent 盲搜 | `aipd`、`_aipd/map.md` | Map-first 上下文检索模型 | 已存在 |
| Inbox 临时收件箱 | 低承诺度接住未整理信息，避免临时想法散落在聊天里 | `aipd-inbox`、`_aipd/inbox.md` | 项目知识库维护模型 | 已存在 |
| AIPD Leader | 让用户把项目级监督和推进责任交给一个显式启动的 AI Leader，由它探索 Mission、协调多个 Case、阶段汇报并总验收 | `aipd-leader`、`_aipd/leader/` | Leader 项目主导编排模型、任务执行模型 | 已存在 |
| AIPD Case | 以统一入口推进短周期目标：Case Contract / Think / Design / Execute / Verify / Close | `aipd-case`、case phase 文档、case 模板 | 任务执行模型、Think / 任务澄清决策模型、AI 原生代码架构模型 | 已存在 |
| Weave 反向编织 | 把稳定知识回写到五类 Knowledge、局部 README 或 Map | `aipd-weave` | 项目知识库维护模型 | 已存在 |
| Learn 框架自迭代（仓库级） | 把真实协作经验回流到 AIPD 框架自身的 skill、模板和规则 | `.agents/skills/aipd-learn/` | 项目知识库维护模型、Agent 协作思考模型 | 已存在，仅 AIPD 源码仓库 |
| Project Schema 一次性迁移 | 把旧 `_adoc` / L1-L5 工作区原子切换到 v2，不保留日常兼容 | `migrate-project-schema` | 项目知识库维护模型 | 已存在 |
| AIPD Update | 把已接入项目一次语义收敛到本机 AIPD 发布快照，同时保护项目已有认知与定制 | `aipd-update`、`_aipd/manifest.json`、`_aipd/update-log.md` | 项目知识库维护模型、Map-first 上下文检索模型 | 已存在 |
| Mermaid / MMD | 用图提高人和 AI 对复杂结构的对齐速度 | `aipd-mermaid`、`.mmd` 文件 | AI 原生代码架构模型、任务执行模型 | 已存在 |
| Git Push 辅助 | 用低风险固定流程完成当前分支推送 | `aipd-git-push` | 任务执行模型 | 已存在 |
| SOP 库 | 把可重复项目动作沉淀为以 Agent 为运行时的 AI 原生程序 | `_aipd/sop/`、SOP map | SOP / AI 程序模型 | 壳子 |

## 能力边界

### AIPD 总入口与初始化

总入口负责判断当前任务应进入普通认知加载、项目状态扫描、初始化、case 流程或其他专门 skill。

初始化只创建基础 AIPD 结构、Agent Entry、Map、Case / OKR / Inbox 壳子。它不替用户完成完整的五类 Knowledge 建模，也不替代后续 Weave 和 Case 流程。

用户选择 Agent MD 等级 2 时，还会安装 Interaction Protocol，约束讨论 / 分析类回复按“我理解 → 展开说说 → 结论 → 横向拓展 → 下一步”生成。“我理解”只复述目标和边界，不提前下结论；“横向拓展”只列相邻方向；“下一步”只给一个自然向下动作，不自动把建议解释成执行授权。具体协议以 `aipd-skill/src/core/agent-entry/interaction-style.md` 为准。

### Map-first 认知加载

Map-first 认知加载是 AIPD 当前最重要的读取能力。它要求 Agent 先读取 `_aipd/index.md` 和 `_aipd/map.md`，用显性 Map 命中当前任务所需的 Knowledge、SOP、局部 README 和真实代码入口；只有任务需要时才进入 Case、OKR 或 Inbox。

搜索和 RAG 是兜底，不是默认主路径。若搜索发现稳定入口，应回写到 map，提升下一次第一跳命中率。

### Inbox 临时收件箱

Inbox 只负责 capture。它接住还没有定型的信息，不自动归类、不创建 case、不直接 weave。

后续信息可能被丢弃、转成 case、进入 SOP，或通过 weave 写回长期知识库。

### AIPD Leader

Leader 是用户显式启动的可选项目主导层。它不会因任务复杂、存在多个 Case 或自然语言提到 Leader 而自动激活。启动后，当前对话在一个 active Mission 内负责方向澄清、探索、Case 拆分、同级执行层调度和总验收；每个 Case 仍通过 `aipd-case` 完成执行闭环。

Leader 是面向用户的受托项目负责人和监督者，Case 是面向目标契约与实现细节的执行者。用户可对主要跟进的项目亲自承担 Leader 责任并直接与 Case 沟通；对无法持续投入精力的项目，则显式委托 AI Leader 掌控状态、处理跨 Case 判断，并在约定节点汇报阶段结果、证据、偏差、风险和待决定事项。AI Leader 已启动时，用户仍可进入 Case 核查细节，但跨 Case 结论必须返回 Leader 汇总。

Codex 上，Leader 默认由用户把当前 task 配置为 `gpt-5.6-sol / max / Fast`，并直接为每个 Case 开独立 Codex 任务，使用 `gpt-5.6-sol / high / Fast`。模型和推理等级由创建接口明确传递；接口没有 Fast 字段时只记录继承或未核验状态。不要在 Codex 上套桌面端 + CLI 组合。Cursor 因为对话内 Agent 不够强，才用桌面端 Leader + 已登录无头 `cursor-agent`；`chatId` 记在 `_aipd/leader/`，不找 DSH，也不用对话内子 Agent 顶执行层。

`_aipd/leader/` 是显式启动后才创建的可选工作记忆。信息若能进入 Knowledge、Case、OKR、SOP、Map、README 或代码事实源，就进入对应 owner；Leader 只保存链接及其对当前 Mission 的影响。

当前 Agent 平台的目标模式 / goal 模式（Cursor `/goal` / `CreateGoal`，Codex Goal）是这条对话的宿主续跑能力，不替代 Mission 或 Case。先看本对话身份：已显式 `$aipd-leader` 时写当前 Mission；默认执行层最多绑那一个 Case。Cursor 上即使挂了 `/goal`，只要不是绑当前 Case，AIPD 仍不加载 Case 覆盖层。Case 的 phase 回跳是短周期校准；Leader 只打回同一执行层，不为了推完一个 Case 再开两三个 Case。插话聊完后只分「继续当前 / 插队 / 进 Mission 排队 / 扔 Inbox」。Inbox 是项目相关的临时仓库，回头再翻，不是 To Do，也不是排队；Leader 做完当前不会自动去翻。

Codex Leader 开出独立 Case task 后，必须先更新 `_aipd/leader/` 进度，再确保本 Leader 对话已有绑 Mission 的 goal 模式，然后才等待执行层。这是把自己拉起来的续跑，不是给 Case task 自动开 goal，也不套到 Cursor。

### AIPD Case

AIPD Case 是新的统一 case 入口。它不再把 create / run / archive 作为用户必须记住的主流程，而是读取 case.md 的 Case Contract、`Current Phase` 和 `Phase State`，按 Think / Design / Execute / Verify / Close 渐进加载对应 phase 文档。目标、边界和验收标准不再放在独立 Goal phase，而是直接进入 `case.md` 顶部的目标契约。

Case 的用户价值是把一个马上要完成的目标做成完整闭环：先定目标和上下文，必要时在 Think 中调研和抉择，在 Design 中找到复杂度爆点并做最小必要解耦，再按 Work Package 执行，最后 Verify 和 Close。后续 phase 发现上游不对时带原因回跳，这是 Case 自己的校准，不是另开一个 Case。

Design phase 的核心边界是：不完整抽象所有概念，而是找到复杂度爆点，对爆点做最小必要解耦，让后续执行围绕架构边界并列扩展独立模块，而不是顺着时间纵向堆版本。

### Weave 反向编织

Weave 是项目知识库维护模型的更新能力。它判断已完成事项、Case 归档、代码 diff、错误日志和外部资料中哪些信息值得沉淀，并决定写入五类 Knowledge、局部 README 或 Map 的哪个位置。

Intent 只接收用户明确确认的长期方向与边界；Research 只接收带来源和时间边界的稳定外部事实或调研结论；Core / Product / Engineering / 局部 README 只接收已确认或已验证的稳定项目事实。未完成 Case 中的候选先留在 Close 归档候选。Case / Work Package 只保留一次性过程、验收记录、临时决策、未实现设计和未来计划。普通找代码或查功能时，不应因为 Product 提到某个能力曾由 Case 推进，就去读取历史 Case。

Weave 面向当前项目知识库；Learn 面向 AIPD 框架自身迭代。

### Learn 框架自迭代

Learn 用来在 AIPD 源码仓库内读取当前对话、外部 transcript、case 经验或用户反馈，并判断是否需要修改 AIPD 框架自己的 skill、模板、Agent 行为规则、项目认知或实践经验库。

它的事实源位于 `.agents/skills/aipd-learn/`，由 Codex 作为仓库级 Skill 发现，不进入公共 build、dist、用户级安装或业务项目级安装。外部项目中的框架反馈需要先带回 AIPD 源码仓库；它不替代业务项目的 weave，不负责归档 case，也不在未确认方案时直接改源码。

### AIPD Update

Update 用来把项目收敛到当前电脑已安装的完整 AIPD 发布快照。项目 manifest 记录已应用版本 `P`，本机安装包声明当前版本 `I`；Update 完整读取 `(P,I]` 的版本记录来理解变化、撤销和保护点，再读取版本 `I` 的当前权威文档与模板，最后结合项目实际内容做一次 `P -> I` 语义合并。它不查询远端版本，也不把项目逐版改到会被后续版本废弃的中间态。

版本记录解释“为什么变”，当前权威文档定义“最后应该是什么”，项目正文定义“哪些真实定制必须保留”。缺失入口、过期模板或旧措辞都是正常更新输入；additive 和无歧义 semantic 合并默认执行，只有需要删除、覆盖、重命名或无法判断所有权的冲突才暂停确认。

旧 `_adoc` / L1-L5 项目可以先由 Update 调用独立的 `migrate-project-schema` 完成确定性结构迁移，再以 `unversioned-v2` 身份继续语义收敛。迁移器只改变 Schema，不写当前 AIPD 版本。验证全部通过后，Update 才把 `aipdVersion=I` 写入 manifest，并在 `_aipd/update-log.md` 留下一条项目级更新记录。

项目版本等于本机版本时，Update 仍可检查 drift；没有差异就 no-op。项目版本高于本机版本时必须停止，不能用旧安装包降级项目。

### Mermaid / MMD

Mermaid / MMD 是高带宽交流能力，用于表达架构关系、Case / Work Package 拆解、状态流、模块边界和产品结构。

它不是默认渲染工具。用户只要求改图时，应优先修改 `.mmd` 源码；用户明确要求预览、渲染或看图时，才生成图片。

### Git Push 辅助

Git Push 是低风险辅助能力，只检查当前分支和提交状态并推送远端。

它不自动 add、commit、merge、rebase、stash，也不修改代码。

### SOP 库

SOP 库不是普通知识库目录，也不是单纯脚本集合。它收纳可重复执行的项目动作：目标、输入、步骤、工具调用、Agent 判断、输出和收尾。

某次 SOP 执行可以进入 Case；执行后产生的稳定知识再由 Weave 判断是否写回五类 Knowledge、Map 或局部 README。

## 不放入 Product 的内容

- Codex 的当前适配方式与其他平台的通用扩展机制，进入 Engineering。
- 构建、安装、dist、agent 模板生成等工程规则，进入 Engineering。
- 单个 skill 内部的执行步骤，留在对应 `SKILL.md`。
- 页面、组件、脚本内部的数据流和修改注意事项，写到就近 README。
- 一次性 case 过程和执行日志，留在 case / work package。
- 当前 case 状态、历史 case 依据和 OKR 执行状态，不写入 Product；需要流程恢复或 OKR 对齐时再读对应目录。

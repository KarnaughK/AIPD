# AIPD Workspace 横向能力

本文记录 AIPD 的横向能力。它回答的是：Agent 做事时，如何把 Workspace 模块串成可读取、可执行、可恢复、可回写的项目级上下文系统。

Workspace 模块负责分类，横向功能负责串联。

本文的“横向”专指 AIPD 知识与流程系统中的串联能力，不等同于代码拓扑中的“横向基座 / 横向共享能力”。真实代码的横纵边界见 `_aipd/knowledge/core/ai-friendly-code-topology.md`。

## 核心判断

AIPD 的核心工作不是只维护一组文档目录，而是基于五类 Knowledge、Map、SOP、OKR / Case / Work Package 流程状态、Agent Entry 和真实代码入口，提供 Agent 可用的项目级上下文能力。

当前这些能力主要通过 `_aipd/` 文档、map、case、phase、work package、AGENTS.md 和 skill 工作流提供。未来也可以通过 MCP、检索工具或上下文服务提供。AIPD 里的 OKR 默认指飞书 OKR。

普通开发、找代码、查业务规则、查页面或组件实现时，横向能力把 Agent 路由到任务所需的 Knowledge、局部 README 和真实代码。Case / OKR 只在对应流程任务中读取，不作为普通知识检索链路的一部分。

## 文件优先上下文承接

AIPD 的任务连续性以文件为核心，不以聊天为核心。聊天上下文只是运行缓存；项目规则、当前状态、设计判断、下一步游标和执行结果应能从 `_aipd/`、case、phase、work package、局部 README 和 map 中恢复。

因此，Agent 推进 case 或长任务时，要在会影响后续恢复路径的小步之后写 checkpoint。典型触发包括：

- 大调研、长日志分析、批量验证或子 Agent 派发前，先写清当前问题、边界、预期输出、停止条件和返回位置。
- 用户确认需求、规则、设计边界或执行结果后，写回 confirmed / assumed / open / deferred / out 或对应状态。
- phase 跳转、回跳、重开、work package 创建或执行完成后，写回当前游标、下一步和受影响下游。

这条规则的判断标准是恢复价值，不是信息大小。压缩后丢失会改变后续方向的信息要落文件；不会改变状态的解释、闲聊和未采纳想法不应写入长期知识库。

## 功能总览

| 横向功能 | 要解决的问题 | 会串起哪些 Workspace 模块 |
|---|---|---|
| 项目入口 / Agent Entry | Agent 进入项目后先知道怎么读上下文、怎么行动 | Agent Entry、map、五类 Knowledge；流程任务再进入 Case / OKR |
| 项目总图 / Map 检索 | 用户说一句自然语言，Agent 怎么找到相关上下文和代码入口 | 五类 Knowledge、SOP、局部 README、真实代码；需要时再进入流程状态 |
| 业务线 / 功能线 / 共享能力 Map | 如何为一个明确上下文划定相关页面、文档、接口与代码范围 | 相关 Knowledge、页面、接口、局部 README、真实代码 |
| Core 概念地图 | 一个业务词、黑话或核心概念到底是什么意思 | Core、Product、Engineering、真实代码 |
| Product 功能地图 | 一个产品功能涉及哪些页面、接口、数据对象、权限和代码入口 | Product、Core、Engineering、真实代码 |
| Engineering 工程规则地图 | 权限、路由、插件、前后端约定等规则怎么查 | Engineering、Product、真实代码 |
| 局部 README 地图 | 某个页面、弹窗、组件或模块内部怎么理解和修改 | Product、Engineering、真实代码 |
| Think phase | 模糊想法或 case 推进中的未知如何讨论、调研、比较方案并形成 Create / Kill / Defer / Research / Weave / Continue / Design 等出口 | 五类 Knowledge、Case、Weave、Agent Entry |
| Leader 项目主导 | 用户不再逐 Case 驾驶时，谁负责方向探索、一个 Mission、多 Case task 调度和总验收 | Leader 工作记忆、Mission、Case、必要 Knowledge、Codex task、Agent Entry |
| Case 系统 | 一个短周期目标如何按 Case Contract / Think / Design / Execute / Verify / Close 完成闭环 | OKR、Case、Work Package、必要 Knowledge、真实代码、Agent Entry |
| SOP 系统 | 项目里可重复执行的动作如何沉淀为以 Agent 为运行时的 AI 原生程序 | SOP、五类 Knowledge、工具代码、Case、Work Package、Agent Entry、Weave |
| Weave 反向编织 | case 完成后把已确认、已验证的稳定判断、规则、入口和外部资料写回哪里 | Intent、Research、Core、Product、Engineering、局部 README、Map；未完成候选先留在 Close 归档候选 |
| AIPD Update | 已接入项目如何理解多版演进、保留项目定制并直接收敛到本机完整发布 | 本机 release catalog / records / current authority、项目 manifest / update log、Agent Entry、Workspace 模板和项目真实内容 |
| OKR 对齐 | 当前 case / work package 是否推进阶段目标，以及如何把高噪声飞书查询压缩成主 Agent 可用结果 | `aipd-okr`、飞书 OKR、`_aipd/okr/` 入口、Case、Intent、子 Agent 经验包 |
| 构建 / 安装 | AIPD skill 怎么生成、安装到不同 Agent 平台 | Engineering、真实代码、Agent Entry |
| 未来上下文服务 | 用 MCP / 检索工具给 Agent 提供上下文 | Map、Knowledge、SOP、流程状态、真实代码、Agent Entry |

## Map 检索功能

Map 是 AIPD 当前最基础的横向能力。它不是五类 Knowledge 的同义词，而是从任务场景出发组织 Knowledge、流程与真实代码入口的检索视图。

Map 负责把用户自然语言、业务词、工程词路由到相关 Knowledge、SOP、局部 README 和真实代码入口；只有任务需要时才路由到 Case、OKR 或 Inbox。

典型 map 类型：

| 地图 | 作用 |
|---|---|
| 项目总图 | `_aipd/map.md`；暴露全局高频入口，让 Agent 知道项目有哪些知识域、业务线、共享能力和代码区域 |
| 上下文 Map | 以业务线、功能线或共享能力为范围，串起相关 Knowledge、页面、接口、权限、README 和代码入口；Core / Product / Engineering map 都可以承担这种视图 |
| 局部实现图 | 代码就近 README 或局部 map；说明页面、弹窗、组件、脚本或模块内部的入口、数据流、组件关系和修改注意事项 |
| 真实代码入口 | 真实代码路径只被 Map 或 README 引用，不复制进 `_aipd/` |

三种分辨率都属于 Map，不是新的知识域或固定三级跳转。Map 不负责承载全部正文，只负责划定范围并把 Agent 带到正确上下文。

## Think Phase

Think phase 是 Case 生命周期里的高带宽讨论和决策能力。它既可以接住模糊想法、陌生领域、新产品方向、需求是否值得做等问题，也可以处理已确定目标推进中的未知、调研和取舍。

Think 不再作为独立 `_aipd/think/` 系统或独立 `aipd-think` skill 推进；它是 phase-first case 生命周期里的一个 phase。各 phase 边界是：

- Think 解决“要不要做、做什么、做到什么程度、还缺什么信息”。
- Case Contract 写在 `case.md` 顶部，解决“这个短周期目标是什么、完成标准是什么、需要哪些上下文和边界”。
- Case Design 解决“复杂度爆点在哪里、如何最小必要解耦、工作包如何围绕架构边界并列扩展”。
- Case Execute / Verify 解决“按 work package 执行、验证和回写状态”。

Think 的核心出口应至少包括：

| 出口 | 含义 | 后续动作 |
|---|---|---|
| Create | 目标清晰且值得执行 | 确认 Case Contract，进入 Design / Execute 等后续 phase |
| Kill | 不值得做或方向不成立 | 记录终止原因，避免重复讨论 |
| Defer | 值得但不是当前阶段 | 记录延后条件，可进入 inbox / OKR / 后续 Think |
| Research | 信息不足 | 继续调研；只有上下文隔离或并发净收益明确时才派发 Child Agent |
| Weave | 产生稳定认知但不形成事项 | 先记录 Close 归档候选；Case 完成后由 Weave 判断是否进入 Intent / Research / Core / Product / Engineering 或 map。Intent 仅限用户明确确认的长期方向与边界，Research 必须保留来源与时间边界 |
| Continue | 尚未清晰 | 继续讨论和澄清 |

Think 可以包含 deep research / 深度检索，但调研资料先服务当前 case 的 Think phase，不直接变成长期认知。经过判断的稳定结论也先记录为 Close 归档候选；Case 完成后再由 Weave 判断是否回写 Intent / Research / Core / Product / Engineering。Intent 需要用户明确确认，Research 需要可追溯来源与时间边界。

Think 和 Inbox 的区别是承诺度：Inbox 只负责 capture，不承诺讨论；Think 已经进入主动澄清和决策。Think 和 SOP 的区别是对象：SOP 是可重复执行程序，Think phase 是当前 case 内的一次具体思考状态。

## Leader 项目主导

Leader 是用户显式增加在 Case 之上的项目主导层。普通 AIPD 默认仍由人驾驶，Agent 在 Case 层完成执行；只有用户主动调用 `$aipd-leader`，当前对话才承担一个 active Mission 的方向探索、Case 拆分、同级执行层调度和总验收。

Leader 与 Main / Child Agent 不是同一层。平台决定执行层，但不要把弱宿主的组合形态套到强宿主上：

- Codex：Leader 直接为每个 Case 开独立 Codex task，不经过桌面端 + CLI。
- Cursor：对话内 Agent 不够强，所以桌面端对话是 Leader；每个 Case 由已登录的无头 `cursor-agent` 做完。`chatId` 记在 `_aipd/leader/`，同一 Case 下一轮 `--resume`，不用对话内子 Agent，也不找 DSH。

Case 执行层内部仍可以按项目规则使用 Child Agent 或工具。执行层不创建新的同级 Case task，也不承担跨 Case 方向判断。同一 Case 的 phase 回跳留在该执行层；Leader 没有第二套 phase 机。当前 Agent 平台的目标模式 / goal 模式是这条对话的宿主续跑能力，不是第三套运行时：本对话已是 Leader 时写 Mission，默认执行层最多绑这一个 Case。

`_aipd/leader/` 保存跨聊天、跨 Case 的短中期恢复信息，但不是第六类 Knowledge。已有 Knowledge、Case、OKR、SOP、Map、README 或代码事实源的信息只在 Leader 保留链接和当前影响。文件结构由 Leader 自主设计，最低要求是能恢复 Mission、方向变化、Case / 执行层绑定、待确认事项和下一位置。

## Case 系统

Case 系统是一组重功能，现在推荐通过 `aipd-case` 统一入口和 phase 状态推进。

| 子功能 | 作用 |
|---|---|
| Case Contract | 定义短周期目标、边界、上下文索引和完成标准；不是独立 phase |
| Think | 在目标推进中承接调研、比较和抉择 |
| Design | 找复杂度爆点，做最小必要解耦，形成设计护栏和工作包 |
| Execute | 按 work package 恢复状态、推进执行、收集结果 |
| Verify | 验收目标、工作包和设计护栏 |
| Close | 归档 case，整理 Close 归档候选，更新索引 |

Case Contract 会横向读取必要 Knowledge、真实代码、Map、局部 README 和必要的 OKR 约束，把一次事项压缩成可恢复的 Case。

Case Execute 会按 case / work package 恢复任务状态，再读取 work package 指定的上下文。Work Package 是状态、恢复和验收边界，不等于 Child 派发节点；运行时选择 Child 后，分身或角色 Agent 才接管唯一证据面，执行后只回流结论、依据、风险、建议、改动文件和验证结果。

## SOP 系统

SOP 是以 Agent 为运行时的可复用 AI 原生程序。它不是 Product / Engineering 里的普通知识条目，也不是单纯的代码脚本；代码只是 SOP 可以调用的工具之一。

SOP 更接近 program / procedure 的本义：一组按部就班、可重复、可检查的执行步骤。一个 SOP 通常会把目标、输入、上下文读取、工具调用、代码脚本、外部资料检索、Agent 二次分析、输出报告和收尾动作编排在一起。

当前先采用最小壳子：

- `_aipd/sop/index.md` 记录 SOP 定位和当前约定。
- `_aipd/sop/map.md` 记录 SOP 局部地图，用用户说法、项目动作、适用范围、输入和输出索引 SOP。
- 遇到一个可复用 SOP 时，在 `_aipd/sop/` 下创建独立目录，把相关说明、脚本入口、样例和草稿先放进去，并登记到 SOP map。
- 高频 SOP 再回写 `_aipd/map.md`，让 Agent 能一跳命中。
- SOP 存储不强行按业务 / 技术拆进 Product 或 Engineering。索引优先保证 Agent 能按场景找到需要的 SOP；存储结构后续再细化。

SOP 和现有模块的关系：

- 五类 Knowledge 提供项目认知和上下文。
- 真实代码、脚本、API 和外部工具可以作为 SOP 的工具。
- Case 可以记录某次 SOP 的执行实例。
- Work Package 可以承载某次执行中的局部任务。
- Weave 可以在 SOP 执行后判断稳定新信息是否回写到知识库、map 或局部 README；一次性执行实例留在 case / work package。

## Weave 反向编织功能

Weave 负责把已完成事项、已实现功能、已验收规则、case 归档、代码 diff、错误日志和外部资料中产生的新稳定信息，编织回稳定位置。稳定位置包括五类 Knowledge、局部 README、项目总图或上下文 Map；case / work package 只保留一次性过程、验收记录、临时决策、未实现设计和未来计划。

如果用户在进行中 case 里说“记一下 / 看需不需要反编织”，默认不写长期知识库。Agent 应提示当前 case 还没有完成，并把候选记到 Close phase 的归档候选。Close 阶段再统一判断哪些已经成为现有项目事实。

常见回写方向：

- 用户明确确认的长期方向、边界和取舍：回写 Intent；Agent 不从一次实现结果自行反推 Intent。
- 带来源和时间边界的稳定外部事实、竞品观察和调研结论：回写 Research。
- 新核心概念、别名、误解：回写 Core。
- 新产品功能边界、业务规则：回写 Product。
- 新实现逻辑、跨模块规则、调试经验：回写 Engineering。
- 页面、弹窗、组件内部修改入口：回写局部 README。
- 高频入口或检索路径：回写总 map 或细节 map。
- 一次性执行过程和验收记录：保留在 case / work package。

Weave 不要求其他执行型 skill 内置完整文档更新逻辑。`aipd-case` 或普通开发流程只需要把候选放入 Close 归档候选；case 完成后，`aipd-weave` 再统一判断知识归属、索引更新和旧知识冲突。

仓库级 `aipd-learn` 只在 AIPD 源码仓库处理框架自迭代和 transcript 诊断；`aipd-weave` 在各业务项目中负责当前项目 Knowledge 的反向编织。

## Agent Entry 功能

Agent Entry 通过 `AGENTS.md` 给新进入项目的 Agent 提供第一跳规则。

它不替代 五类 Knowledge、map、case 或局部 README，而是告诉 Agent：

- 先读哪里。
- 如何判断任务涉及哪些 Workspace 模块。
- 什么时候查 map。
- 如何恢复 case / work package 状态。
- 如何根据上下文隔离、真实并发、主线耦合和调度成本处理 Main / Child 边界，以及分身 Agent、角色 Agent 的选择。

## 功能和概念的关系

可以用一句话概括：

Workspace 模块负责“不同性质的信息放在哪里”，横向能力负责“Agent 做事时怎么把这些东西串起来”。

AIPD 后续设计 README、Map、aipd-case、weave、learn、update、MCP 或上下文服务时，都应先判断当前改动是在扩展 Workspace 模块，还是在扩展横向能力。

## AIPD Update 功能

Update 串起的是“框架演进事实”和“项目当前事实”。本机 release catalog 给出目标版本 `I`，项目 manifest 给出已应用版本 `P`；Agent 先完整读取 `(P,I]` 记录理解发生过什么，再读取 `I` 的 current authority 和项目自身内容，最后只落一次最终态。

版本记录不是按顺序执行的脚本。多个版本反复修改同一个规则时，Agent 不让项目逐次经历已经废弃的中间形态。缺失模板、旧 Agent Entry 或入口漂移是正常 Update 输入；安全 additive 与无歧义 semantic 合并默认完成，只有破坏性或所有权歧义才暂停。验证通过以前不写 `aipdVersion`，因此失败或中断可以安全重跑。

## OKR 对齐功能

OKR 对齐负责把飞书阶段目标、O/KR 和 AIPD case / work package 连接起来。

`aipd-okr` 是 OKR 的可触发入口。它负责读取飞书 OKR 入口、按需查询飞书 OKR、执行用户确认过的飞书写入，并把周期、目标、KR、飞书 ID、风险和建议压缩成 OKR 经验包。

单次 OKR 查询上下文可控时，主 Agent 可以直接完成。涉及大量原始 JSON / CLI 日志，或多个周期、跨项目对齐可以真正并发时，优先让子 Agent 隔离或并发查询，只回流压缩后的 OKR 经验包。

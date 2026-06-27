# AIPD 横向功能能力

本文记录 AIPD 的横向功能能力。横向功能回答的是：Agent 做事时，如何把纵向概念模块串成可读取、可执行、可恢复、可回写的项目级上下文系统。

纵向模块负责分类，横向功能负责串联。

## 核心判断

AIPD 的核心工作不是只维护一组文档目录，而是基于 L1-L6 长期知识库、OKR / Case / Work Package 流程状态、Agent Entry 等纵向模块，提供 Agent 可用的项目级上下文能力。

当前这些能力主要通过 `_adoc/` 文档、map、case、phase、work package、AGENTS.md 和 skill 工作流提供。未来也可以通过 MCP、检索工具或上下文服务提供。AIPD 里的 OKR 默认指飞书 OKR。

普通开发、找代码、查业务规则、查页面或组件实现时，横向功能只把 Agent 路由到 L3 / L4 / L5 / 局部 README / L6。Case / OKR 只在对应流程任务中读取，不作为普通知识检索链路的一部分。

## 功能总览

| 横向功能 | 要解决的问题 | 会串起哪些纵向模块 |
|---|---|---|
| 项目入口 / Agent Entry | Agent 进入项目后先知道怎么读上下文、怎么行动 | Agent Entry、map、L1-L5；流程任务再进入 Case / OKR |
| 大地图 / map 检索 | 用户说一句自然语言，Agent 怎么找到相关上下文和代码入口 | L3、L4、L5、局部 README、L6 |
| L3 概念地图 | 一个业务词、黑话或核心概念到底是什么意思 | L3、L4、L5、L6 |
| L4 功能地图 | 一个产品功能涉及哪些页面、接口、数据对象、权限和代码入口 | L4、L3、L5、L6 |
| L5 工程规则地图 | 权限、路由、插件、前后端约定等规则怎么查 | L5、L4、L6 |
| 局部 README 地图 | 某个页面、弹窗、组件或模块内部怎么理解和修改 | L4、L5、L6 |
| Think phase | 模糊想法或 case 推进中的未知如何讨论、调研、比较方案并形成 Create / Kill / Defer / Research / Weave / Continue / Design 等出口 | L1-L5、Case、L2 Research、Weave、Agent 使用方案 |
| Case 系统 | 一个短周期目标如何按 Case Contract / Think / Design / Execute / Verify / Close 完成闭环 | OKR、Case、Work Package、L1-L6、Agent 使用方案 |
| SOP 系统 | 项目里可重复执行的动作如何沉淀为以 Agent 为运行时的 AI 原生程序 | SOP、L1-L5、L6 工具代码、Case、Work Package、Agent 使用方案、Weave |
| Weave 反向编织 | 做完后把新判断、踩坑、规则、入口和外部资料写回哪里 | L3、L4、L5、局部 README、map；一次性过程留在 Case / Work Package |
| OKR 对齐 | 当前 case / work package 是否推进阶段目标，以及如何把高噪声飞书查询压缩成主 Agent 可用结果 | `aipd-okr`、飞书 OKR、`_adoc/okr/` 入口、Case、L1、子 Agent 经验包 |
| 构建 / 安装 | AIPD skill 怎么生成、安装到不同 Agent 平台 | L5、L6、Agent Entry |
| 未来上下文服务 | 用 MCP / 检索工具给 Agent 提供上下文 | map、L1-L6、Agent 使用方案 |

## Map 检索功能

Map 是 AIPD 当前最基础的横向功能。它不是 L1-L5 的同义词，而是基于 L1-L6 概念模型做出来的检索能力。

Map 负责把用户自然语言、业务词、工程词路由到相关 L3 / L4 / L5 文档、局部 README 和 L6 代码入口。

典型 map 类型：

| 地图 | 作用 |
|---|---|
| `_adoc/map.md` | 项目总地图，从用户自然语言快速路由到相关 L3 / L4 / L5 / README / L6 |
| L3 map | 解释核心概念、项目成立模型、别名、关系、常见误解 |
| L4 map | 以产品功能为单位，说明功能边界和用户可见业务行为，并串起页面、接口、数据对象、权限、相关 L6 |
| L5 map | 以实现规则为单位，说明权限、路由、第三方插件、前后端约定等跨模块逻辑 |
| 局部 README / 局部 map | 说明页面、弹窗、组件、脚本或模块内部的入口、数据流、组件关系和修改注意事项 |
| 局部 README | 面向某个页面、弹窗、组件、模块，说明具体怎么改 |
| L6 入口 | 真实代码路径，不写进 `_adoc/L6`，只被地图引用 |

Map 不负责承载全部正文。它负责把 Agent 带到正确上下文。

## Think Phase

Think phase 是 Case 生命周期里的高带宽讨论和决策能力。它既可以接住模糊想法、陌生领域、新产品方向、需求是否值得做等问题，也可以处理已确定目标推进中的未知、调研和取舍。

Think 不再作为独立 `_adoc/think/` 系统或独立 `aipd-think` skill 推进；它是 phase-first case 生命周期里的一个 phase。各 phase 边界是：

- Think 解决“要不要做、做什么、做到什么程度、还缺什么信息”。
- Case Contract 写在 `case.md` 顶部，解决“这个短周期目标是什么、完成标准是什么、需要哪些上下文和边界”。
- Case Design 解决“复杂度爆点在哪里、如何最小必要解耦、工作包如何横向铺开”。
- Case Execute / Verify 解决“按 work package 执行、验证和回写状态”。

Think 的核心出口应至少包括：

| 出口 | 含义 | 后续动作 |
|---|---|---|
| Create | 目标清晰且值得执行 | 进入 Case 后续 Goal / Design / Execute phase |
| Kill | 不值得做或方向不成立 | 记录终止原因，避免重复讨论 |
| Defer | 值得但不是当前阶段 | 记录延后条件，可进入 inbox / OKR / 后续 Think |
| Research | 信息不足 | 继续调研，必要时派发分身 Agent |
| Weave | 产生稳定认知但不形成事项 | 由 Weave 判断写回 L2 / L3 / L4 / L5 / map |
| Continue | 尚未清晰 | 继续讨论和澄清 |

Think 可以包含 deep research / 深度检索，但调研资料先服务当前 case 的 Think phase，不直接变成长期认知。只有经过判断的稳定结论才回写到 L2 / L3 / L4 / L5。

Think 和 Inbox 的区别是承诺度：Inbox 只负责 capture，不承诺讨论；Think 已经进入主动澄清和决策。Think 和 SOP 的区别是对象：SOP 是可重复执行程序，Think phase 是当前 case 内的一次具体思考状态。

## Case 系统

Case 系统是一组重功能，现在推荐通过 `aipd-case` 统一入口和 phase 状态推进。

| 子功能 | 作用 |
|---|---|
| Case Contract | 定义短周期目标、边界、上下文索引和完成标准；不是独立 phase |
| Think | 在目标推进中承接调研、比较和抉择 |
| Design | 找复杂度爆点，做最小必要解耦，形成设计护栏和工作包 |
| Execute | 按 work package 恢复状态、推进执行、收集结果 |
| Verify | 验收目标、工作包和设计护栏 |
| Close | 归档 case，整理 Weave Candidate，更新索引 |

Case Contract 会横向读取 L1-L6、map、局部 README 和必要的 OKR 约束，把一次事项压缩成可恢复的 case。

Case Execute 会按 case / work package 恢复任务状态，再读取 work package 指定的上下文。Work Package 可以派发给分身 Agent 或角色 Agent，执行后只回流结论、依据、风险、建议、改动文件和验证结果。

## SOP 系统

SOP 是以 Agent 为运行时的可复用 AI 原生程序。它不是 L4 / L5 里的普通知识条目，也不是单纯的代码脚本；代码只是 SOP 可以调用的工具之一。

SOP 更接近 program / procedure 的本义：一组按部就班、可重复、可检查的执行步骤。一个 SOP 通常会把目标、输入、上下文读取、工具调用、代码脚本、外部资料检索、Agent 二次分析、输出报告和收尾动作编排在一起。

当前先采用最小壳子：

- `_adoc/sop/index.md` 记录 SOP 定位和当前约定。
- `_adoc/sop/map.md` 记录 SOP 局部地图，用用户说法、项目动作、适用范围、输入和输出索引 SOP。
- 遇到一个可复用 SOP 时，在 `_adoc/sop/` 下创建独立目录，把相关说明、脚本入口、样例和草稿先放进去，并登记到 SOP map。
- 高频 SOP 再回写 `_adoc/map.md`，让 Agent 能一跳命中。
- SOP 存储不强行按业务 / 技术拆进 L4 或 L5。索引优先保证 Agent 能按场景找到需要的 SOP；存储结构后续再细化。

SOP 和现有模块的关系：

- L1-L5 提供项目认知和上下文。
- L6 代码、脚本、API 和外部工具可以作为 SOP 的工具。
- Case 可以记录某次 SOP 的执行实例。
- Work Package 可以承载某次执行中的局部任务。
- Weave 可以在 SOP 执行后判断稳定新信息是否回写到知识库、map 或局部 README；一次性执行实例留在 case / work package。

## Weave 反向编织功能

Weave 负责把执行、讨论、work package 完成、case 归档、代码 diff、错误日志和外部资料中产生的新信息，编织回稳定位置。稳定位置指 L3 / L4 / L5、局部 README、总 map 或细节 map；case / work package 只保留一次性过程、验收记录和临时决策。

常见回写方向：

- 新核心概念、别名、误解：回写 L3。
- 新产品功能边界、业务规则：回写 L4。
- 新实现逻辑、跨模块规则、调试经验：回写 L5。
- 页面、弹窗、组件内部修改入口：回写局部 README。
- 高频入口或检索路径：回写总 map 或细节 map。
- 一次性执行过程和验收记录：保留在 case / work package。

Weave 不要求其他执行型 skill 内置完整文档更新逻辑。`aipd-case`、兼容归档入口或普通开发流程只需要产出 Weave Candidate；`aipd-weave` 再统一判断知识归属、索引更新和旧知识冲突。

`aipd-learn` 更偏 AIPD 框架自迭代和 transcript 诊断；`aipd-weave` 更偏当前项目 ADOC 的反向编织。

## Agent Entry 功能

Agent Entry 通过 `AGENTS.md` 给新进入项目的 Agent 提供第一跳规则。

它不替代 L1-L5、map、case 或局部 README，而是告诉 Agent：

- 先读哪里。
- 如何判断任务涉及哪些纵向模块。
- 什么时候查 map。
- 如何恢复 case / work package 状态。
- 如何处理 Main Agent、分身 Agent 和角色 Agent 的边界。

## 功能和概念的关系

可以用一句话概括：

纵向模块负责“东西放哪一层”，横向功能负责“Agent 做事时怎么把这些东西串起来”。

AIPD 后续设计 README、map、aipd-case、weave、learn、update、MCP 或上下文服务时，都应先判断当前改动是在扩展纵向概念模块，还是在扩展横向功能能力。

## OKR 对齐功能

OKR 对齐负责把飞书阶段目标、O/KR 和 AIPD case / work package 连接起来。

`aipd-okr` 是 OKR 的可触发入口。它负责读取飞书 OKR 入口、按需查询飞书 OKR、执行用户确认过的飞书写入，并把周期、目标、KR、飞书 ID、风险和建议压缩成 OKR 经验包。

当 OKR 查询涉及 `lark-cli`、多个周期、跨项目对齐或大量工具输出时，主 Agent 应优先让子 Agent 执行查询和验证，只接收压缩后的 OKR 经验包，避免把完整 JSON、CLI 日志或调试过程带入主上下文。

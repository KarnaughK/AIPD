# AIPD2 横向功能能力

本文记录 AIPD2 的横向功能能力。横向功能回答的是：Agent 做事时，如何把纵向概念模块串成可读取、可执行、可恢复、可回写的项目级上下文系统。

纵向模块负责分类，横向功能负责串联。

## 核心判断

AIPD2 的核心工作不是只维护一组文档目录，而是基于 L1-L6、OKR、Case、Step、Agent Entry 等纵向模块，提供 Agent 可用的项目级上下文能力。

当前这些能力主要通过 `_adoc/` 文档、map、case、step、AGENTS.md 和 skill 工作流提供。未来也可以通过 MCP、检索工具或上下文服务提供。

## 功能总览

| 横向功能 | 要解决的问题 | 会串起哪些纵向模块 |
|---|---|---|
| 项目入口 / Agent Entry | Agent 进入项目后先知道怎么读上下文、怎么行动 | Agent Entry、map、L1-L5、Case |
| 大地图 / map 检索 | 用户说一句自然语言，Agent 怎么找到相关上下文和代码入口 | L3、L4、L5、局部 README、L6 |
| L3 概念地图 | 一个业务词、黑话或核心概念到底是什么意思 | L3、L4、L5、L6 |
| L4 功能地图 | 一个产品功能涉及哪些页面、接口、数据对象、权限和代码入口 | L4、L3、L5、L6 |
| L5 工程规则地图 | 权限、路由、插件、前后端约定等规则怎么查 | L5、L4、L6 |
| 局部 README 地图 | 某个页面、弹窗、组件或模块内部怎么理解和修改 | L4、L5、L6 |
| Case 系统 | 一个事项如何创建、拆 step、执行、恢复和验收 | OKR、Case、Step、L1-L6、Agent 使用方案 |
| Weave 反向编织 | 做完后把新判断、踩坑、规则、入口和外部资料写回哪里 | Case、Step、L3、L4、L5、局部 README、map |
| OKR 对齐 | 当前 case / step 是否推进阶段目标 | OKR、Case、L1 |
| 构建 / 安装 | AIPD2 skill 怎么生成、安装到不同 Agent 平台 | L5、L6、Agent Entry |
| 未来上下文服务 | 用 MCP / 检索工具给 Agent 提供上下文 | map、L1-L6、Agent 使用方案 |

## Map 检索功能

Map 是 AIPD2 当前最基础的横向功能。它不是 L1-L5 的同义词，而是基于 L1-L6 概念模型做出来的检索能力。

Map 负责把用户自然语言、业务词、工程词路由到相关 L3 / L4 / L5 文档、局部 README 和 L6 代码入口。

典型 map 类型：

| 地图 | 作用 |
|---|---|
| `_adoc/map.md` 或 `_adoc/context-map.md` | 项目总地图，从用户自然语言快速路由到相关 L3 / L4 / L5 / README / L6 |
| L3 map | 解释核心概念、别名、关系、常见误解 |
| L4 map | 以产品功能为单位，说明功能边界，并串起页面、接口、数据对象、权限、相关 L6 |
| L5 map | 以实现规则为单位，说明权限、路由、第三方插件、前后端约定等跨模块逻辑 |
| 局部 README | 面向某个页面、弹窗、组件、模块，说明具体怎么改 |
| L6 入口 | 真实代码路径，不写进 `_adoc/L6`，只被地图引用 |

Map 不负责承载全部正文。它负责把 Agent 带到正确上下文。

## Case 系统

Case 系统是一组重功能，可以聚合理解，但需要区分子功能。

| 子功能 | 作用 |
|---|---|
| Case 创建 | 定义事项目标、边界、上下文索引、steps、验收标准 |
| Case 执行 | 按 case 恢复状态，推进 step，收集结果并验收 |
| Step 派发 / 恢复 | step 是 case 内的执行、派发、恢复和验收单元 |

Case 创建会横向读取 L1-L6、OKR、map 和局部 README，把一次事项压缩成可恢复的 case。

Case 执行会按 case / step 恢复任务状态，再读取 step 指定的上下文。Step 可以派发给分身 Agent 或角色 Agent，执行后只回流结论、依据、风险、建议、改动文件和验证结果。

## Weave 反向编织功能

Weave 负责把执行、讨论、step 完成、case 归档、代码 diff、错误日志和外部资料中产生的新信息，编织回稳定位置。

常见回写方向：

- 新核心概念、别名、误解：回写 L3。
- 新产品功能边界、业务规则：回写 L4。
- 新实现逻辑、跨模块规则、调试经验：回写 L5。
- 页面、弹窗、组件内部修改入口：回写局部 README。
- 高频入口或检索路径：回写总 map 或细节 map。
- 一次性执行过程和验收记录：保留在 case / step。

Weave 不要求其他执行型 skill 内置完整文档更新逻辑。`case-run`、`case-archive` 或普通开发流程只需要产出 Weave Candidate；`aipd2-weave` 再统一判断知识归属、索引更新和旧知识冲突。

`aipd2-learn` 更偏 AIPD2 框架自迭代和 transcript 诊断；`aipd2-weave` 更偏当前项目 ADOC 的反向编织。

## Agent Entry 功能

Agent Entry 通过 `AGENTS.md` 给新进入项目的 Agent 提供第一跳规则。

它不替代 L1-L5、map、case 或局部 README，而是告诉 Agent：

- 先读哪里。
- 如何判断任务涉及哪些纵向模块。
- 什么时候查 map。
- 如何恢复 case / step 状态。
- 如何处理 Main Agent、分身 Agent 和角色 Agent 的边界。

## 功能和概念的关系

可以用一句话概括：

纵向模块负责“东西放哪一层”，横向功能负责“Agent 做事时怎么把这些东西串起来”。

AIPD2 后续设计 README、map、case-create、case-run、weave、learn、update、MCP 或上下文服务时，都应先判断当前改动是在扩展纵向概念模块，还是在扩展横向功能能力。

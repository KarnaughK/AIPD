# AIPD 项目认知索引

本文件是 AIPD 仓库自身的 `_adoc/` 入口。Agent 进入本项目后，先读这里；再读取 `_adoc/map.md` 做项目记忆检索，最后按任务层级读取对应文档。

## 项目当前状态

- **项目名称**：AIPD
- **当前阶段**：框架自举与 Codex 优先适配
- **SOP**：`_adoc/sop/index.md`、`_adoc/sop/map.md`
- **Inbox**：`_adoc/inbox.md`
- **发展日志**：`_adoc/development-log.md`

流程状态入口只在流程任务中读取：

- **OKR**：`_adoc/okr/index.md`
- **Case**：`_adoc/case/index.md`

## 认知层级

| 层级 | 位置 | 作用 | 当前状态 |
|------|------|------|----------|
| L1 Intent | `_adoc/L1-intent/` | AIPD 的方向、边界和长期取舍 | 已刷新 |
| L2 Research | `_adoc/L2-research/` | 用户、场景、需求、痛点、竞品、行业/玩法范式和调研结论 | 已刷新 |
| L3 Core | `_adoc/L3-core/` | 核心认知、核心对象、核心关系、核心流程和项目成立模型 | 已刷新 |
| L4 Product | `_adoc/L4-product/` | AIPD 产品能力、功能边界、用户可见行为和实现入口地图 | 已刷新 |
| L5 Dev | `_adoc/L5-dev/` | 产品功能落到代码时的跨模块工程规则、平台适配、Agent 调度和协作约定 | 初始 |
| L6 Code | 具体代码实现，不在 `_adoc/` 内 | AIPD 的真实源码、skill、模板、平台适配和脚本 | 已存在 |
| SOP | `_adoc/sop/` | 以 Agent 为运行时的可复用 AI 原生程序，记录项目动作如何按步骤重复执行 | 壳子 |

## 上下文检索

- 项目级记忆地图：`_adoc/map.md`
- 进入具体任务前，先判断任务涉及 L3 核心概念、L4 产品功能、L5 工程实现规则、局部 README、L6 代码入口中的哪些上下文。
- 普通开发、找代码、查业务规则、查页面或组件实现时，不读取 `_adoc/case/` 或 `_adoc/okr/`；只有明确进入 case / OKR 流程时才读取对应状态文件。
- 如果 `map.md` 缺失或未覆盖本次任务，按相关核心词、skill 名、agent 名、平台名、README 使用 `rg` 兜底搜索，并把新发现的稳定入口回写到合适的 map 或 index。
- 如果讨论、work package 结果、case 归档、代码 diff、错误日志或外部资料产生了可复用知识，用 `aipd-weave` 判断回写到 L3 / L4 / L5 / 局部 README / map；一次性过程和验收状态留在 case / work package。

## 任务类型读取入口

- AIPD 方向、边界、定位：`_adoc/L1-intent/intent.md`
- AIPD 历史演进 / 长期回顾 / 是否肿歪审计：`_adoc/development-log.md`
- AIPD 纵向概念模块与横向功能能力：`_adoc/L3-core/index.md`、`_adoc/L3-core/vertical-concept-modules.md`、`_adoc/L3-core/horizontal-capabilities.md`
- Think / AIPD Think / 前置讨论 / 要不要做 / 从模糊到清晰：`_adoc/L3-core/index.md`、`_adoc/L3-core/horizontal-capabilities.md`、`_adoc/L4-product/index.md`、`_adoc/L4-product/map.md`
- AIPD 产品能力、功能边界和入口地图：`_adoc/L4-product/index.md`、`_adoc/L4-product/map.md`
- 上下文检索：`_adoc/map.md`
- Weave 反向编织 / 项目 ADOC 回写：`aipd-skill/src/skills/aipd-weave/SKILL.md`、`_adoc/L3-core/horizontal-capabilities.md`
- SOP / 可复用 AI 原生程序 / Agent 执行流程：`_adoc/sop/index.md`、`_adoc/sop/map.md`
- Codex / Agent / case Execute / 构建安装：`_adoc/L5-dev/index.md`
- 临时收件箱：`_adoc/inbox.md`
- 具体 case 执行：先读对应 case 的 `case.md`，再读 work package 明确列出的上下文文档。

## 读取原则

- 任务处在哪个层级，就读取对应层级及必要上下游认知。
- 代码模块、skill、平台适配的局部认知，优先读取就近源码和 README。
- `_adoc/L2-research/` 应维护方向所处的外部世界，痛点只是 L2 的一部分，竞品、玩法范式、市场观察、流量和变现资料也属于 L2 候选。
- `_adoc/L3-core/` 应维护核心认知和项目成立模型。业务项目可偏核心对象；游戏、内容、SEO 或商业网站也可能包含增长模型、内容模型、流量模型、留存模型和商业模型；AIPD 这类框架项目可偏上下文解耦、记忆存取、扁平化检索等底层认知。
- `_adoc/L5-dev/` 存产品功能到代码实现之间的跨模块业务实现逻辑、工程规则和工程约束；页面、弹窗、组件内部的局部 map 应贴近代码。可复用 Agent 执行程序优先放 `_adoc/sop/`。
- L6 是具体代码实现，不写入 `_adoc/`，按项目类型分布在真实源码目录中。
- 具体 skill、agent、脚本内部的局部实现细节，优先放就近源码和 README，不塞回 L5。
- 如果用户当前指令与 AIPD 认知冲突，先指出冲突和风险，再继续。

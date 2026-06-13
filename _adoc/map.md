# AIPD2 项目记忆地图

本文件是 AI 读取 AIPD2 项目记忆的第一跳。它只负责引路，不承载完整正文；目标是让 Agent 尽量一次读完本文件，就能判断本次任务应进入哪些 L3 / L4 / L5 / 局部 README / case / 源码入口。

新增稳定入口优先回写到本文件，再按需要同步到细节 map。

## 使用规则

- 普通开发、分析、case-create、case-run、update、weave 前，优先读取 `_adoc/map.md`。
- 本文件记录高频入口、稳定路径和兜底搜索词，不记录一次性执行细节。
- 命中不清楚时，用 `rg` 搜索核心词、skill 名、agent 名、平台名、case 名和 README。
- 新发现的稳定入口，后续应回写到本文件或对应 L3 / L4 / L5 map。
- 关键路径尽量扁平暴露，不要求 Agent 通过多层目录链自行发现。

## 高频任务入口

| 用户说法 / 关键词 | 标准入口 | 层级判断 | 必读上下文 | 代码 / 局部入口 | 兜底搜索 |
|---|---|---|---|---|---|
| AIPD 方向 / 分层 / 项目认知 | AIPD2 项目方向与认知层级 | L1 + L3 | `_adoc/L1-intent/intent.md`、`_adoc/L3-core/index.md`、`_adoc/L3-core/vertical-concept-modules.md`、`_adoc/L3-core/horizontal-capabilities.md` | `src/core/overview.md` | `rg "L3|L4|L5|L6|认知|上下文|纵向|横向|功能能力" src _adoc` |
| L2/L3/L4/L5 边界 / 外部世界 / 成立模型 / 局部 map 放哪里 | AIPD 分层边界 | L3 + L5 | `_adoc/L3-core/index.md`、`_adoc/L3-core/vertical-concept-modules.md`、`_adoc/L5-dev/index.md` | `src/core/L2-scenario/guide.md`、`src/core/L3-engine/guide.md`、`src/core/L4-product/guide.md`、`src/core/adoc-structure.md` | `rg "外部世界|痛点|竞品|成立模型|商业模型|增长模型|局部 map|L2 Research|L3 Core|L4 Product|L5 Dev" src _adoc AGENTS.md README.md` |
| 上下文解耦 / 黑箱上移 / 纵向黑箱 / 横向分层 / 牵连面 / DRY 后置 / 扁平化检索 / 记忆存取 / AIPDR | AIPD2 核心认知 | L3 + L5 | `_adoc/L3-core/index.md`、`_adoc/L3-core/horizontal-capabilities.md` | `src/core/overview.md`、`src/core/case/overview.md`、`docs/modules/context-decoupling.md` | `rg "上下文解耦|黑箱上移|纵向黑箱|横向分层|牵连|DRY|Decouple|扁平化检索|记忆|黑箱|Memory Retrieval|面向指令|面向状态" src _adoc docs` |
| 初始化 / AGENTS.md / Agent Entry | AIPD 初始化入口 | L5 + L6 | `_adoc/L5-dev/index.md` | `src/skills/aipd2/SKILL.md`、`src/core/agent-entry/template.md`、`src/core/adoc/templates/index.md` | `rg "agent-entry|AGENTS|初始化" src _adoc` |
| 更新已有项目 AIPD 架构 / aipd update / 过期结构 / 破坏性更新 | AIPD2 Update | L5 + L6 | `_adoc/map.md`、`_adoc/L5-dev/index.md` | `src/skills/aipd2-update/SKILL.md`、`src/core/adoc/templates/map.md`、`src/core/adoc/templates/index.md`、`src/core/agent-entry/template.md` | `rg "aipd2-update|更新 AIPD|破坏性更新|过期结构|map.md|AGENTS" src _adoc` |
| 上下文检索 / 大地图 / map | 项目记忆地图 | L3 + L5 | `_adoc/map.md`、`_adoc/L3-core/index.md` | `src/core/adoc/templates/map.md`、`src/skills/aipd2-case-create/SKILL.md` | `rg "map.md|上下文检索|检索包|观察锚点" src _adoc AGENTS.md` |
| inbox / 收件箱 / 先记一下 / 先存一下 / 回头再整理 | Inbox 临时收件箱 | capture | `_adoc/inbox.md` | `src/skills/aipd2-inbox/SKILL.md`、`src/core/adoc/templates/inbox.md` | `rg "inbox|收件箱|先记一下|先存一下|回头再整理" _adoc src` |
| case 创建 / 上下文索引 / step 拆分 | Case 创建 | L4 + L5 + case | `_adoc/case/index.md`、`_adoc/L3-core/horizontal-capabilities.md` | `src/skills/aipd2-case-create/SKILL.md`、`src/core/case/templates/case.md`、`src/core/case/templates/step.md` | `rg "case-create|上下文索引|step|候选" src _adoc/case` |
| case 执行 / 分身 Agent / fork_context / Agent 指引兜底 | Case 执行 | L5 + case | `_adoc/L5-dev/index.md`、相关 case `case.md` | `src/skills/aipd2-case-run/SKILL.md`、`src/platforms/codex/core/agent-guide.md`、`src/core/agent-guides/` | `rg "fork_context|分身|case-run|推荐 Agent|agent-guides|unknown agent_type" src _adoc/case` |
| Weave / 反向编织 / 项目 ADOC 回写 / 更新 map / 更新局部 README | Weave 反向编织 | L3 + L5 + case | `_adoc/L3-core/horizontal-capabilities.md`、`_adoc/map.md` | `src/skills/aipd2-weave/SKILL.md`、`src/skills/aipd2-case-run/SKILL.md`、`src/skills/aipd2-case-archive/SKILL.md` | `rg "weave|反向编织|Weave Candidate|知识回写|更新 ADOC|更新 map" src _adoc README.md` |
| 自迭代 / learn / transcript / 观察锚点 | AIPD2 Learn | L5 + case | `src/skills/aipd2-learn/SKILL.md`、当前 case 的观察锚点 | `src/platforms/codex/` | `rg "观察锚点|transcript|回流|自迭代|learn" src _adoc` |
| docs / 学习文档 / README / 教学文档 / 三条主线 / 用户学习路径 | AIPD2 面向用户的学习文档体系 | L3 + L5 + docs | `docs/README.md`、`README.md`、`_adoc/case/archive/c0.6-human-docs-three-lines/case.md` | `docs/guide/`、`docs/modules/` | `rg "学习文档|三条主线|知识库最小闭环|Case / Step|AI 原生代码架构|README" README.md docs _adoc/case` |
| Vue 页面 / 组件 / AI 友好前端架构 / 纯前端 case | Vue 角色 Agent 调度 | L5 + 局部 README | `_adoc/L5-dev/index.md`、`src/core/L5-dev/vue-case-create-guide.md`、`src/core/L5-dev/vue-architecture-diagram-guide.md`、`src/core/agent-guides/aipd_vue_architect.md` | `src/platforms/codex/agents/aipd_vue_architect.toml` | `rg "Vue|组件|README|aipd_vue_architect|纯前端|一个文件一个 step|useXxx" src _adoc` |
| Vue useXxx / provide inject / 页面数据源 / API 字段对齐 / 兜底字段 | Vue Provider 角色 Agent 调度 | L5 + 局部 README | `_adoc/L5-dev/index.md`、`src/core/L5-dev/vue-provider-guide.md`、`src/core/agent-guides/aipd_vue_provider.md` | `src/platforms/codex/agents/aipd_vue_provider.toml` | `rg "useXxx|provide|inject|provider|API|字段|兜底|aipd_vue_provider" src _adoc` |

## L3 核心概念总表

| 用户说法 / 黑话 | 标准概念 | 概念 map | 相关 L4 功能线 | 常见误解 |
|---|---|---|---|---|
| 项目认知 / ADOC | ADOC / `_adoc` | `_adoc/L3-core/map.md` | AIPD 初始化、AIPD Update、Weave | 不等同于普通 README；它是 AI 长期上下文结构 |
| 纵向概念模块 | L1-L6 / OKR / Case / Step / Agent Entry | `_adoc/L3-core/vertical-concept-modules.md` | case-create、case-run、update | 不是功能清单；它回答项目认知和代码实现按什么类别沉淀 |
| 横向功能能力 | map 检索 / Case 系统 / Weave / 上下文服务 | `_adoc/L3-core/horizontal-capabilities.md` | case-create、case-run、weave、learn | 不是新的层级；它回答 Agent 做事时怎么串起纵向模块 |
| 外部世界 | L2 Research | `_adoc/L3-core/vertical-concept-modules.md` | AIPD 初始化、case-create | 不只是痛点；竞品、玩法范式、市场观察、流量来源和变现方式也可先放 L2 |
| 项目成立模型 | L3 Core | `_adoc/L3-core/index.md` | AIPD 初始化、AIPD Update | 不等于狭义数据模型；也可能是增长模型、内容模型、流量模型、留存模型和商业模型 |
| 局部 map | 代码就近 README / 局部 map | `_adoc/L5-dev/index.md`、`src/core/adoc-structure.md` | case-create、weave | 页面、弹窗、组件内部实现地图不应大老远塞回 L5 |
| Weave 反向编织 | `aipd2-weave` / 项目 ADOC 回写 | `_adoc/L3-core/horizontal-capabilities.md` | Weave | 和 `aipd2-learn` 分工不同；weave 面向当前项目知识库，learn 面向 AIPD2 框架自迭代 |
| 分身 Agent | fork 出来的 Main Agent 克隆体 | `_adoc/L5-dev/index.md`、`src/platforms/codex/core/agent-guide.md` | case-run、角色 Agent 调度 | 不是低上下文工人 |
| Case / Step | 事项 / 可派发执行单元 | `_adoc/case/index.md`、`src/core/case/overview.md` | case-create、case-run、case-archive | 未确认的讨论点不要包装成 step |
| Inbox | 临时收件箱 / capture | `_adoc/inbox.md` | aipd2-inbox | 不是待办、不是候选 case、不是稳定认知；只接住未整理信息 |

## L4 产品功能线总表

| 用户说法 / 场景 | 标准功能线 | 功能线 map | 前端入口 | 后端入口 | 数据对象 | 相关 L3 | 相关 L5 |
|---|---|---|---|---|---|---|---|
| 初始化新项目 / 安装 AIPD | AIPD 初始化 | `_adoc/L4-product/map.md` | 不适用 | 不适用 | `AGENTS.md`、`_adoc/` | `_adoc/L3-core/map.md` | `_adoc/L5-dev/index.md` |
| 更新已有项目 AIPD 架构 | AIPD Update | `_adoc/L4-product/map.md` | 不适用 | 不适用 | `AGENTS.md`、`_adoc/map.md`、case | `_adoc/L3-core/map.md` | `_adoc/L5-dev/index.md` |
| 创建 case / 拆 step | Case Create | `_adoc/L4-product/map.md` | 不适用 | 不适用 | case.md、steps | `_adoc/L3-core/horizontal-capabilities.md` | `_adoc/L5-dev/index.md` |
| 执行 case / 派发分身 Agent | Case Run | `_adoc/L4-product/map.md` | 不适用 | 不适用 | case.md、step.md、Agent 指引 | `_adoc/L3-core/horizontal-capabilities.md` | `_adoc/L5-dev/index.md` |
| 经验回写 / 反向编织 | Weave | `_adoc/L4-product/map.md` | 不适用 | 不适用 | L3 / L4 / L5 / README / map / case | `_adoc/L3-core/horizontal-capabilities.md` | `_adoc/L5-dev/index.md` |
| 框架自迭代 / transcript 回流 | Learn | `_adoc/L4-product/map.md` | 不适用 | 不适用 | transcript、回流包、AIPD2 源码 | `_adoc/L3-core/horizontal-capabilities.md` | `_adoc/L5-dev/index.md` |

## L5 工程规则总表

| 用户说法 / 工程词 | 标准规则 | 规则 map | 适用范围 | 代码入口 | 常见坑 |
|---|---|---|---|---|---|
| Codex custom agents / 推荐 Agent | Codex Agent 调度 | `_adoc/L5-dev/index.md` | Codex 平台、case-run、Vue 角色 Agent | `src/platforms/codex/core/agent-guide.md`、`src/platforms/codex/agents/` | 不要因 agent 注册失败阻塞任务，应降级读取领域指引 |
| fork_context / 分身 / 克隆体 | 分身 Agent 策略 | `_adoc/L5-dev/index.md` | 普通探索、case-run、角色 Agent | `src/platforms/codex/core/agent-guide.md`、`src/skills/aipd2-case-run/SKILL.md` | 不要把分身 Agent 误解成低上下文工人 |
| skills + agents 构建安装 | Codex 构建安装 | `_adoc/L5-dev/index.md` | AIPD2 开发脚本 | `scripts/build`、`scripts/install-codex`、`scripts/dev-codex`、`scripts/install-project-codex` | 源模板、dist 输出和用户级安装目录要区分 |
| Vue 架构 / Vue Provider | Vue 角色 Agent 规则 | `_adoc/L5-dev/index.md` | Vue 前端 case | `src/core/agent-guides/`、`src/platforms/codex/agents/` | 不要仅因知识点多就继续拆身份；按执行边界拆 |

## 局部 README 入口

| 模块 / 页面 / 弹窗 | README / 局部入口 | 说明 | 关联功能线 |
|---|---|---|---|
| AIPD2 核心说明 | `README.md`、`src/core/overview.md` | 框架对外说明和核心介绍 | AIPD 初始化、AIPD Update |
| Codex 平台适配 | `src/platforms/codex/core/agent-guide.md` | Codex 分身 Agent、角色 Agent、派发与降级策略 | Case Run |
| 平台无关角色指引 | `src/core/agent-guides/` | 角色 Agent 的领域执行指引 | Case Run、Vue 角色 Agent |
| skill 源码 | `src/skills/{skill}/SKILL.md` | skill 执行规则本体 | 对应功能线 |
| case 模板 | `src/core/case/templates/case.md`、`src/core/case/templates/step.md` | case / step 标准结构 | Case Create、Case Run |

## 自迭代观察锚点

后续用 `aipd2-learn` 审计会话或 transcript 时，观察：

- Agent 是否先读取 `_adoc/index.md` 和 `_adoc/map.md`，再进入 L3 / L4 / L5 / 局部 README。
- Agent 是否能从本文件一跳命中功能线或工程规则，而不是依赖多层目录链。
- 如果任务涉及核心概念，Agent 是否读取 L3 map 或相关 L3 文档，而不是直接猜含义。
- 如果任务涉及产品功能线，Agent 是否读取 L4 map，并找到稳定源码入口。
- 如果任务涉及跨模块工程规则，Agent 是否读取 L5 规则。
- 如果本文件缺入口，Agent 是否用 `rg` 兜底，并提出应回写到 map 的稳定入口。

## Weave 反向编织锚点

后续用 `aipd2-weave` 回写项目经验时，观察：

- 新核心概念、别名、误解是否回写到 L3。
- 新产品功能边界、业务规则是否回写到 L4。
- 新实现逻辑、跨模块规则、调试经验是否回写到 L5。
- skill、agent、脚本内部入口是否回写到就近源码或 README。
- 高频检索入口是否回写到本文件或细节 map。
- 一次性执行过程是否留在 case / step，没有误写进长期知识。

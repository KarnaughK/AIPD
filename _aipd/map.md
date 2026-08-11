# AIPD 项目记忆地图

本文件是 AI 读取 AIPD 项目上下文的第一跳。它只负责引路，不承载完整正文；目标是让 Agent 尽量一次读完本文件，就能判断本次任务需要哪些 Knowledge、SOP、局部 README、流程状态和代码入口。

新增稳定入口优先回写到本文件，再按需要同步到细节 map。

## 使用规则

- 普通开发、分析、`aipd-case`、update、weave 前，优先读取 `_aipd/map.md`。
- 本文件记录高频入口、稳定路径和兜底搜索词，不记录一次性执行细节。
- 命中不清楚时，用 `rg` 搜索核心词、skill 名、agent 名、平台名和 README。
- 新发现的稳定入口，后续应回写到本文件或对应 Core / Product / Engineering map。
- 关键路径尽量扁平暴露，不要求 Agent 通过多层目录链自行发现。
- 普通开发、找代码、查业务规则、查页面或组件实现时，本文件不把请求路由到 `_aipd/case/` 或 `_aipd/okr/`。只有用户明确要求 case / OKR 流程，或当前任务本身是 `aipd-case`、OKR 对齐时，才读取对应流程状态。

## 高频任务入口

| 用户说法 / 关键词 | 标准入口 | 上下文范围 | 必读上下文 | 代码 / 局部入口 | 兜底搜索 |
|---|---|---|---|---|---|
| AIPD 方向 / 知识域 / 项目认知 | AIPD 项目方向与 Knowledge Schema | Intent + Core | `_aipd/knowledge/intent/intent.md`、`_aipd/knowledge/core/index.md`、`_aipd/knowledge/core/workspace-modules.md`、`_aipd/knowledge/core/horizontal-capabilities.md` | `aipd-skill/src/core/overview.md` | `rg "Intent|Research|Core|Product|Engineering|Knowledge|上下文|Map|SOP" aipd-skill/src _aipd` |
| 五类 Knowledge 边界 / 外部世界 / 成立模型 / 局部 map 放哪里 | AIPD Knowledge 分类边界 | Core + Engineering | `_aipd/knowledge/core/index.md`、`_aipd/knowledge/core/workspace-modules.md`、`_aipd/knowledge/engineering/index.md` | `aipd-skill/src/core/knowledge/research/guide.md`、`aipd-skill/src/core/knowledge/core/guide.md`、`aipd-skill/src/core/knowledge/product/guide.md`、`aipd-skill/src/core/aipd-project-structure.md` | `rg "外部世界|痛点|竞品|成立模型|商业模型|增长模型|局部 map|Research|Core|Product|Engineering" aipd-skill/src _aipd AGENTS.md README.md` |
| AI 友好代码拓扑 / 横向基座 / 横向共享能力 / 纵向业务上下文 / 纵向业务模块 / 全面纵向 / 纵向黑箱 / 显式组合 / DRY 后置 / Decouple first | AI 友好代码拓扑 | Core + Engineering | `_aipd/knowledge/core/ai-friendly-code-topology.md`、`_aipd/knowledge/core/index.md`、`_aipd/knowledge/engineering/index.md` | 运行时 owner：`aipd-skill/src/core/ai-friendly-code-topology.md`；消费入口：`aipd` / `aipd-case`；具体项目 `_aipd/knowledge/engineering/`、代码就近 `README.md` | `rg "AI 友好代码拓扑|Code Topology Contract|代码拓扑护栏|横向基座|横向共享能力|纵向业务上下文|显式组合|Decouple first|DRY later" _aipd docs aipd-skill/src` |
| 上下文解耦 / 黑箱上移 / 牵连面 / 扁平化检索 / 记忆存取 / 模型底层倾向 / 提示词改不了 / 案例和边界 / AIPDR | AIPD 核心认知 | Core + Engineering | `_aipd/knowledge/core/index.md`、`_aipd/knowledge/core/horizontal-capabilities.md`、`docs/modules/context-decoupling.md` | `aipd-skill/src/core/overview.md`、`aipd-skill/src/core/case/overview.md`、`aipd-skill/src/core/case/phases/design.md` | `rg "上下文解耦|黑箱上移|牵连|扁平化检索|记忆|黑箱|模型底层|提示词|基础逻辑|案例|边界|Memory Retrieval|面向指令|面向状态" aipd-skill/src _aipd docs` |
| 文件优先 / 每一步落文件 / checkpoint / 聊天不是事实源 / 自然压缩 / 压缩后恢复 / 当前游标 | 文件优先上下文承接 | Core + case 流程 + Agent Entry | `_aipd/knowledge/core/index.md`、`_aipd/knowledge/core/horizontal-capabilities.md`、`aipd-skill/src/core/case/overview.md` | `aipd-skill/src/skills/aipd-case/SKILL.md`、`aipd-skill/src/core/case/phases/think.md`、`aipd-skill/src/core/case/phases/design.md`、`aipd-skill/src/core/case/phases/execute.md`、`aipd-skill/src/core/case/templates/case.md`、`aipd-skill/src/core/case/templates/work-package.md`、`aipd-skill/src/core/agent-entry/template.md` | `rg "文件优先|checkpoint|聊天只是运行缓存|恢复入口|当前游标|自然压缩|落文件|落盘" aipd-skill/src _aipd` |
| 初始化 / AGENTS.md / Agent Entry | AIPD 初始化入口 | Engineering + 真实代码 | `_aipd/knowledge/engineering/index.md` | `aipd-skill/src/skills/aipd/SKILL.md`、`aipd-skill/src/core/agent-entry/template.md`、`aipd-skill/src/core/workspace/templates/index.md` | `rg "agent-entry|AGENTS|初始化" aipd-skill/src _aipd` |
| Agent MD 等级 2 / Interaction Protocol / 回复模板 / 我理解 / 展开说说 / 横向拓展 / 下一步 | Interaction Protocol | Product + Agent Entry | `_aipd/knowledge/product/index.md`、`_aipd/knowledge/product/map.md` | `aipd-skill/src/core/agent-entry/interaction-style.md` | `rg "AIPD Interaction Protocol|我理解|展开说说|横向拓展|下一步" AGENTS.md aipd-skill/src _aipd` |
| 旧 `_adoc` / L1-L5 目录 / 升级 Knowledge Schema v2 / 一次性迁移 | AIPD Project Schema 迁移 | Engineering + CLI | `_aipd/knowledge/engineering/index.md`、`docs/modules/build-and-install.md` | `aipd-skill/scripts/migrate-project-schema`；安装后为 `aipd` Skill 内 `scripts/migrate-project-schema` | `rg "migrate-project-schema|schemaVersion|完整旧版|混合状态" aipd-skill/scripts aipd-skill/src docs` |
| 更新已是 v2 的项目 AIPD 架构 / aipd update / 同步新模板 | AIPD Update | Engineering + 真实代码 | `_aipd/map.md`、`_aipd/knowledge/engineering/index.md` | `aipd-skill/src/skills/aipd-update/SKILL.md`、`aipd-skill/src/core/workspace/templates/map.md`、`aipd-skill/src/core/workspace/templates/index.md`、`aipd-skill/src/core/agent-entry/template.md` | `rg "aipd-update|更新 AIPD|同步新模板|map.md|AGENTS" aipd-skill/src _aipd` |
| 上下文检索 / 大地图 / map | 项目记忆地图 | Core + Engineering | `_aipd/map.md`、`_aipd/knowledge/core/index.md` | `aipd-skill/src/core/workspace/templates/map.md`、`aipd-skill/src/skills/aipd-case/SKILL.md` | `rg "map.md|上下文检索|检索包|观察锚点" aipd-skill/src _aipd AGENTS.md` |
| 上下文检索 Agent / 查项目资料 / 项目认知查询 / 保持主 Agent 上下文干净 | 上下文检索 Agent | Engineering + agent-guide | `_aipd/knowledge/engineering/index.md`、`aipd-skill/src/platforms/codex/core/agent-guide.md` | `aipd-skill/src/core/agent-guides/aipd_context_retriever.md`、`aipd-skill/src/platforms/codex/agents/aipd_context_retriever.toml` | `rg "aipd_context_retriever|上下文检索|子 Agent|默认调度" AGENTS.md aipd-skill/src _aipd` |
| inbox / 收件箱 / 先记一下 / 先存一下 / 回头再整理 | Inbox 临时收件箱 | capture | `_aipd/inbox.md` | `aipd-skill/src/skills/aipd-inbox/SKILL.md`、`aipd-skill/src/core/workspace/templates/inbox.md` | `rg "inbox|收件箱|先记一下|先存一下|回头再整理" _aipd aipd-skill/src` |
| think / AIPD Think / 讨论任务 / 定任务 / 前置判断 / 要不要做 / 从模糊到清晰 / 深度调研后再决定 | Case Think / 前置讨论与决策 | Core + Product 规划能力 | `_aipd/knowledge/core/index.md`、`_aipd/knowledge/core/horizontal-capabilities.md`、`_aipd/knowledge/product/index.md`、`_aipd/knowledge/product/map.md` | `aipd-skill/src/skills/aipd-case/SKILL.md`、`aipd-skill/src/core/case/phases/think.md` | `rg "Think|Case Think|任务澄清|前置讨论|要不要做|从模糊到清晰|Create|Kill|Defer|Research|Design" _aipd aipd-skill/src docs` |
| SOP / AI 原生程序 / Agent 程序 / 可复用流程 / 按步骤反复执行 / 查关键词 / 日报 | SOP 项目级 Agent 程序库 | SOP + Core | `_aipd/sop/index.md`、`_aipd/sop/map.md`、`_aipd/knowledge/core/horizontal-capabilities.md` | `_aipd/sop/` | `rg "SOP|AI 原生程序|Agent 程序|可复用流程|procedure|查关键词|日报" _aipd aipd-skill/src docs` |
| OKR / 飞书 OKR / lark-cli / 同步 OKR / 创建 OKR / 删除 OKR / OKR 经验包 | AIPD 飞书 OKR | OKR 流程 + skill + SOP | `aipd-skill/src/skills/aipd-okr/SKILL.md`、`_aipd/okr/index.md`、`aipd-skill/src/core/okr/guide.md` | `aipd-skill/src/core/okr/feishu-cli.md`、`lark-cli okr` | `rg "OKR|飞书|lark-cli|okr \\+cycle|batch-create|objectives delete|经验包" _aipd aipd-skill/src docs` |
| case / Case Contract / 目标边界 / case design / case think / work package / 创建 case / 执行 case / 验收 / 归档 | AIPD Case 统一入口 | case 流程 + Core/Product/Engineering 能力文档 | `_aipd/case/index.md`、`_aipd/knowledge/core/horizontal-capabilities.md`、`_aipd/knowledge/product/map.md` | `aipd-skill/src/skills/aipd-case/SKILL.md`、`aipd-skill/src/core/case/overview.md`、`aipd-skill/src/core/case/phases/`、`aipd-skill/src/core/case/templates/case.md`、`aipd-skill/src/core/case/templates/work-package.md` | `rg "aipd-case|Case Contract|Case Phase|Work Package|复杂度爆点|case design|case think" aipd-skill/src _aipd/case docs` |
| 旧 case-create / 旧 case-run / 旧 case-archive | AIPD Case 旧入口迁移 | case 流程 | `_aipd/case/index.md`、相关 case `case.md` | `aipd-skill/src/skills/aipd-case/SKILL.md`、`aipd-skill/src/core/case/overview.md` | `rg "case-create|case-run|case-archive|旧入口|迁移" aipd-skill/src _aipd docs` |
| Weave / 反向编织 / 项目 Knowledge 回写 / 更新 map / 更新局部 README / Close 归档候选 | Weave 反向编织 | Core + Engineering | `_aipd/knowledge/core/horizontal-capabilities.md`、`_aipd/map.md` | `aipd-skill/src/skills/aipd-weave/SKILL.md` | `rg "weave|反向编织|Close 归档候选|知识回写|更新 Knowledge|更新 map" aipd-skill/src _aipd README.md` |
| 自迭代 / learn / transcript / 观察锚点 | AIPD Learn | Engineering + 框架自迭代 | `aipd-skill/src/skills/aipd-learn/SKILL.md` | `aipd-skill/src/platforms/codex/` | `rg "观察锚点|transcript|回流|自迭代|learn" aipd-skill/src _aipd` |
| 实践经验库 / 附带源码 / experience assets / AipdModalBox / AipdForm / AipdSearch | AIPD 实践经验与源码资产 | Engineering + 仓库级源码资产 | `aipd-skill/src/core/experience/index.md`、`_aipd/knowledge/engineering/index.md` | `experience-assets/README.md`、`experience-assets/vue3-context-decoupling/README.md` | `rg "附带源码|experience-assets|AipdModalBox|AipdForm|AipdSearch" aipd-skill/src experience-assets _aipd` |
| docs / 学习文档 / README / 教学文档 / 三条主线 / 用户学习路径 | AIPD 面向用户的学习文档体系 | Core + Engineering + docs | `docs/README.md`、`README.md` | `docs/guide/`、`docs/modules/` | `rg "学习文档|三条主线|知识库最小闭环|Case / Work Package|AI 原生代码架构|README" README.md docs _aipd` |
| Vue 页面 / 组件 / AI 友好前端架构 / 纯前端 case | Vue 角色 Agent 调度 | Engineering + 局部 README | `_aipd/knowledge/engineering/index.md`、`aipd-skill/src/core/knowledge/engineering/vue-case-create-guide.md`、`aipd-skill/src/core/knowledge/engineering/vue-architecture-diagram-guide.md`、`aipd-skill/src/core/agent-guides/aipd_vue_architect.md` | `aipd-skill/src/platforms/codex/agents/aipd_vue_architect.toml` | `rg "Vue|组件|README|aipd_vue_architect|纯前端|一个文件一个 work package|useXxx" aipd-skill/src _aipd` |
| Vue useXxx / provide inject / 页面数据源 / API 字段对齐 / 兜底字段 | Vue Provider 角色 Agent 调度 | Engineering + 局部 README | `_aipd/knowledge/engineering/index.md`、`aipd-skill/src/core/knowledge/engineering/vue-provider-guide.md`、`aipd-skill/src/core/agent-guides/aipd_vue_provider.md` | `aipd-skill/src/platforms/codex/agents/aipd_vue_provider.toml` | `rg "useXxx|provide|inject|provider|API|字段|兜底|aipd_vue_provider" aipd-skill/src _aipd` |

## Core 核心概念总表

| 用户说法 / 黑话 | 标准概念 | 概念 map | 相关 Product 功能线 | 常见误解 |
|---|---|---|---|---|
| 项目认知 / Knowledge | 五类 Knowledge | `_aipd/knowledge/core/map.md` | AIPD 初始化、AIPD Update、Weave | Knowledge 只指 `_aipd/knowledge/` 中的长期认知，不等于整个 `_aipd/` Workspace |
| AIPD Workspace / 工作区 | Knowledge / Map / SOP / Case / OKR / Inbox / Agent Entry | `_aipd/knowledge/core/workspace-modules.md` | aipd-case、update | 不是功能清单，也不是从上到下的流水线；真实代码位于 Workspace 外并由 Map 索引 |
| 横向功能能力 | Map 检索 / Case 系统 / Weave / 上下文服务 | `_aipd/knowledge/core/horizontal-capabilities.md` | aipd-case、weave、learn | 不是新的知识域；它回答 Agent 做事时怎么串起 Workspace 模块 |
| 代码纵横 / 横向基座 / 横向共享能力 / 纵向业务上下文 | AI 友好代码拓扑 | `_aipd/knowledge/core/ai-friendly-code-topology.md` | AIPD Case Design、技术栈经验 | 与上面两项属于不同命名空间；代码拓扑不是“全面纵向”，黑箱也不是Workspace 模块专有属性 |
| 文件优先上下文承接 | 文件 checkpoint / 当前游标 / 压缩后恢复 | `_aipd/knowledge/core/index.md`、`_aipd/knowledge/core/horizontal-capabilities.md`、`aipd-skill/src/core/case/overview.md` | aipd-case、Agent Entry | 不是聊天存档；它只承接有恢复价值的状态、确认、边界、下一步 |
| Think / AIPD Think / 任务澄清 / 前置讨论 / 要不要做 | Think / 任务澄清决策模型 | `_aipd/knowledge/core/index.md`、`_aipd/knowledge/core/horizontal-capabilities.md` | AIPD Case、weave | Think 可以在 Case 前，也可以作为 Case 内 phase 处理推进中的未知、调研和抉择 |
| 外部世界 | Research | `_aipd/knowledge/core/workspace-modules.md` | AIPD 初始化、aipd-case | 不只是痛点；竞品、玩法范式、市场观察、流量来源和变现方式也可先放 Research |
| 项目成立模型 | Core | `_aipd/knowledge/core/index.md` | AIPD 初始化、AIPD Update | 不等于狭义数据模型；也可能是增长模型、内容模型、流量模型、留存模型和商业模型 |
| 局部 map | 代码就近 README / 局部 map | `_aipd/knowledge/engineering/index.md`、`aipd-skill/src/core/aipd-project-structure.md` | aipd-case、weave | 页面、弹窗、组件内部实现地图不应大老远塞回 Engineering |
| Weave 反向编织 | `aipd-weave` / 项目 Knowledge 回写 | `_aipd/knowledge/core/horizontal-capabilities.md` | Weave | 和 `aipd-learn` 分工不同；weave 面向当前项目知识库，learn 面向 AIPD 框架自迭代 |
| 子 Agent | 用于上下文隔离、真实并发或独立复核的执行 / 调研 Agent | `_aipd/knowledge/engineering/index.md`、`aipd-skill/src/platforms/codex/core/agent-guide.md` | case Execute、角色 Agent 调度 | 不是默认步骤；按隔离收益、并发收益、主线耦合和调度成本选择，派发不扩大外部副作用权限 |
| 上下文检索 Agent | `aipd_context_retriever` | `_aipd/knowledge/engineering/index.md`、`aipd-skill/src/core/agent-guides/aipd_context_retriever.md` | Map-first 认知加载、SOP 检索、次级流程检索 | Main 先最小路由；大量项目认知或多条独立认知线才优先派发；Inbox/OKR/Case 只有明确需要时查 |
| Case / Work Package | 短周期目标契约 / 可执行、可恢复、可验收目标包 | `_aipd/case/index.md`、`aipd-skill/src/core/case/overview.md` | aipd-case | Work Package 是状态与验收边界，不等于子 Agent 派发节点；运行时另选 Main 或 Child |
| OKR | 飞书阶段目标 / 飞书 O/KR | `aipd-skill/src/skills/aipd-okr/SKILL.md`、`_aipd/okr/index.md`、`aipd-skill/src/core/okr/guide.md` | `aipd-okr`、AIPD Case | AIPD 里的 OKR 默认指飞书 OKR；高噪声飞书查询应压缩成 OKR 经验包 |
| SOP | 以 Agent 为运行时的可复用 AI 原生程序 | `_aipd/sop/index.md`、`_aipd/sop/map.md` | SOP、aipd-case、weave | 不是 Product/Engineering 知识条目，也不是单纯脚本；代码只是 SOP 可调用的工具之一 |
| Inbox | 临时收件箱 / capture | `_aipd/inbox.md` | aipd-inbox | 不是待办、不是候选 case、不是稳定认知；只接住未整理信息 |

## Product 产品功能线总表

| 用户说法 / 场景 | 标准功能线 | 功能线 map | 主要入口 | 数据对象 | 相关 Core | 相关 Engineering / 流程入口 |
|---|---|---|---|---|---|---|
| 初始化新项目 / 安装 AIPD / 项目状态 | AIPD 总入口与初始化 | `_aipd/knowledge/product/map.md` | `aipd-skill/src/skills/aipd/SKILL.md` | `AGENTS.md`、`_aipd/`、基础模板 | `_aipd/knowledge/core/map.md` | `_aipd/knowledge/engineering/index.md` |
| 读 map / 加载项目认知 / 找上下文 | Map-first 认知加载 | `_aipd/knowledge/product/map.md` | `aipd-skill/src/skills/aipd/SKILL.md`、`_aipd/map.md` | `_aipd/index.md`、`_aipd/map.md`、Map 命中的必要 Knowledge、SOP、局部 README 和真实代码 | `_aipd/knowledge/core/map.md` | `_aipd/knowledge/engineering/index.md` |
| inbox / 收件箱 / 先记一下 | Inbox 临时收件箱 | `_aipd/knowledge/product/map.md` | `aipd-skill/src/skills/aipd-inbox/SKILL.md` | `_aipd/inbox.md` | `_aipd/knowledge/core/map.md` | `aipd-skill/src/core/workspace/templates/inbox.md` |
| think / AIPD Think / 讨论任务 / 定任务 / 要不要做 | AIPD Case Think phase | `_aipd/knowledge/product/map.md` | `aipd-skill/src/skills/aipd-case/SKILL.md` | case.md、Think phase、discussion、research、options、decision、决策出口 | `_aipd/knowledge/core/index.md` | `_aipd/knowledge/core/horizontal-capabilities.md` |
| 创建 case / Case Contract / 目标边界 / case design / case think / 执行 case / 派发子 Agent / 验收 / 归档 | AIPD Case | `_aipd/knowledge/product/map.md` | `aipd-skill/src/skills/aipd-case/SKILL.md` | case.md、Case Contract、phase state、work package、Agent 指引、Close 归档候选 | `_aipd/knowledge/core/horizontal-capabilities.md` | `_aipd/knowledge/engineering/index.md` |
| 旧创建 case / 旧拆 step / 旧执行 case / 旧归档 case | AIPD Case 旧入口迁移 | `_aipd/knowledge/product/map.md` | `aipd-skill/src/skills/aipd-case/SKILL.md` | 旧命令说法、旧 case 结构迁移提示 | `_aipd/knowledge/core/horizontal-capabilities.md` | `_aipd/knowledge/engineering/index.md` |
| 经验回写 / 反向编织 / Close 归档候选 | Weave | `_aipd/knowledge/product/map.md` | `aipd-skill/src/skills/aipd-weave/SKILL.md` | Intent（仅用户明确确认）/ Research（带来源和时间边界）/ Core / Product / Engineering / README / map；未完成 case 候选先留在 Close 归档候选 | `_aipd/knowledge/core/horizontal-capabilities.md` | `_aipd/knowledge/engineering/index.md` |
| 框架自迭代 / transcript 回流 | Learn | `_aipd/knowledge/product/map.md` | `aipd-skill/src/skills/aipd-learn/SKILL.md` | transcript、回流包、AIPD 源码 | `_aipd/knowledge/core/horizontal-capabilities.md` | `_aipd/knowledge/engineering/index.md` |
| OKR / 飞书 OKR / 目标 / 周期 / OKR 经验包 | AIPD OKR | `_aipd/knowledge/product/map.md` | `aipd-skill/src/skills/aipd-okr/SKILL.md` | 飞书 O/KR、周期 ID、飞书入口、OKR 经验包 | `_aipd/knowledge/core/horizontal-capabilities.md` | `_aipd/okr/index.md`、`aipd-skill/src/core/okr/` |
| 旧 `_adoc` / L1-L5 / Schema v2 迁移 | Project Schema 一次性迁移 | `_aipd/knowledge/product/map.md` | `aipd-skill/scripts/migrate-project-schema` | 旧工作区、新 manifest、五类 Knowledge 目录 | `_aipd/knowledge/core/map.md` | `_aipd/knowledge/engineering/index.md` |
| 更新已是 v2 的项目 AIPD 架构 | AIPD Update | `_aipd/knowledge/product/map.md` | `aipd-skill/src/skills/aipd-update/SKILL.md` | `AGENTS.md`、`_aipd/map.md`、Case 模板 | `_aipd/knowledge/core/map.md` | `_aipd/knowledge/engineering/index.md` |
| Mermaid / MMD / 架构图 / 预览图 | Mermaid / MMD | `_aipd/knowledge/product/map.md` | `aipd-skill/src/skills/aipd-mermaid/SKILL.md` | `.mmd`、Mermaid 源码、按需 PNG | `_aipd/knowledge/core/index.md` | `aipd-skill/src/core/knowledge/engineering/vue-architecture-diagram-guide.md` |
| git push / 推送当前分支 | Git Push | `_aipd/knowledge/product/map.md` | `aipd-skill/src/skills/aipd-git-push/SKILL.md` | 当前分支、提交状态、远端 | `_aipd/knowledge/core/horizontal-capabilities.md` | git 状态 |
| SOP / AI 程序 / 可复用流程 | SOP 库 | `_aipd/knowledge/product/map.md` | `_aipd/sop/index.md`、`_aipd/sop/map.md` | SOP 目录、输入、步骤、工具、输出 | `_aipd/knowledge/core/index.md` | `_aipd/sop/` |

## Engineering 工程规则总表

| 用户说法 / 工程词 | 标准规则 | 规则 map | 适用范围 | 代码入口 | 常见坑 |
|---|---|---|---|---|---|
| Codex custom agents / 推荐 Agent | Codex Agent 调度 | `_aipd/knowledge/engineering/index.md` | Codex 平台、case Execute、Vue 角色 Agent | `aipd-skill/src/platforms/codex/core/agent-guide.md`、`aipd-skill/src/platforms/codex/agents/` | 不要因 agent 注册失败阻塞任务，应降级读取领域指引 |
| 上下文检索 / context retriever / aipd_context_retriever | 上下文检索 Agent 调度 | `_aipd/knowledge/engineering/index.md` | Codex 平台、项目认知加载、SOP 检索 | `aipd-skill/src/core/agent-guides/aipd_context_retriever.md`、`aipd-skill/src/platforms/codex/agents/aipd_context_retriever.toml` | custom agent 身份优先；已知入口少时 Main 直接读，大量扫描时再派发 |
| 子 Agent / sub Agent / agent 调度 / 并发 | Main / Child 运行时判定 | `_aipd/knowledge/engineering/index.md` | 普通探索、case Execute、角色 Agent | `aipd-skill/src/platforms/codex/core/agent-guide.md`、`aipd-skill/src/skills/aipd-case/SKILL.md` | Work Package 不等于派发；按上下文隔离、真实并发、主线耦合和调度成本选择 |
| skills + agents 构建安装 | Codex 构建安装 | `_aipd/knowledge/engineering/index.md` | AIPD 开发脚本 | `aipd-skill/scripts/build`、`aipd-skill/scripts/install-codex`、`aipd-skill/scripts/dev-codex`、`aipd-skill/scripts/install-project-codex` | 源模板、dist 输出和用户级安装目录要区分 |
| Vue 架构 / Vue Provider | Vue 角色 Agent 规则 | `_aipd/knowledge/engineering/index.md` | Vue 前端 case | `aipd-skill/src/core/agent-guides/`、`aipd-skill/src/platforms/codex/agents/` | 不要仅因知识点多就继续拆身份；按执行边界拆 |

## 局部 README 入口

| 模块 / 页面 / 弹窗 | README / 局部入口 | 说明 | 关联功能线 |
|---|---|---|---|
| AIPD 核心说明 | `README.md`、`aipd-skill/src/core/overview.md` | 框架对外说明和核心介绍 | AIPD 初始化、AIPD Update |
| Codex 平台适配 | `aipd-skill/src/platforms/codex/core/agent-guide.md` | Codex 子 Agent 上下文、角色 Agent、派发与降级策略 | Case Execute |
| 平台无关角色指引 | `aipd-skill/src/core/agent-guides/` | 角色 Agent 的领域执行指引 | Case Execute、Vue 角色 Agent |
| skill 源码 | `aipd-skill/src/skills/{skill}/SKILL.md` | skill 执行规则本体 | 对应功能线 |
| OKR skill | `aipd-skill/src/skills/aipd-okr/SKILL.md` | OKR 触发入口、经验包格式、飞书远端操作边界 | AIPD OKR |
| case 模板 | `aipd-skill/src/core/case/templates/case.md`、`aipd-skill/src/core/case/templates/work-package.md` | case / work package 标准结构 | AIPD Case |
| 实践经验源码资产 | `experience-assets/README.md` | 不随 Skill 打包的实现型经验源码、示例、来源与验证入口 | AIPD Learn、Vue3 代码实践经验 |

## Map 的三种分辨率

| Map 分辨率 | 负责划定的范围 | 典型载体 |
|---|---|---|
| 项目总图 | 暴露项目全局高频入口，让 Agent 知道有哪些知识域、业务线、共享能力和代码区域 | `_aipd/map.md` |
| 上下文 Map | 围绕一条业务线、功能线或共享能力，串起相关 Knowledge、页面、接口、README 和代码入口 | Core / Product / Engineering map，或专门的业务线 Map |
| 局部实现图 | 说明页面、组件、脚本或代码模块内部怎么理解、修改和验证 | 代码就近 `README.md` 或局部 map |

三种 Map 都是检索视图，不是新的存储分类。上一级需要暴露下一级的稳定入口，但一次任务不必机械经过全部三层。

## 自迭代观察锚点

后续用 `aipd-learn` 审计会话或 transcript 时，观察：

- Agent 是否先读取 `_aipd/index.md` 和 `_aipd/map.md`，再进入 Map 命中的必要 Knowledge、SOP、局部 README 和真实代码，而不机械全读五域。
- Agent 是否能从本文件一跳命中功能线或工程规则，而不是依赖多层目录链。
- 如果任务涉及核心概念，Agent 是否读取 Core map 或相关 Core 文档，而不是直接猜含义。
- 如果任务涉及产品功能线，Agent 是否读取 Product map，并找到稳定源码入口。
- 如果任务涉及跨模块工程规则，Agent 是否读取 Engineering 规则。
- 如果任务涉及可重复执行的项目动作，Agent 是否检查 `_aipd/sop/` 中是否已有可复用 SOP。
- 如果本文件缺入口，Agent 是否用 `rg` 兜底，并提出应回写到 map 的稳定入口。

## Weave 反向编织锚点

后续用 `aipd-weave` 回写项目经验时，观察：

- 用户明确确认的新长期方向或边界是否回写到 Intent，而不是由 Agent 从实现结果自行反推。
- 带来源和时间边界的稳定外部事实或调研结论是否回写到 Research。
- 新核心概念、别名、误解是否回写到 Core。
- 新产品功能边界、业务规则是否回写到 Product。
- 新实现逻辑、跨模块规则、调试经验是否回写到 Engineering。
- 新的可复用 Agent 执行流程是否进入 `_aipd/sop/`，而不是误写成普通 Product/Engineering 知识条目。
- skill、agent、脚本内部入口是否回写到就近源码或 README。
- 高频检索入口是否回写到本文件或细节 map。
- 一次性执行过程是否留在 case / work package，没有误写进长期知识。

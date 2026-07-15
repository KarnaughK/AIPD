# AIPD 项目记忆地图

本文件是 AI 读取 AIPD 项目记忆的第一跳。它只负责引路，不承载完整正文；目标是让 Agent 尽量一次读完本文件，就能判断本次任务应进入哪些 L3 / L4 / L5 / 局部 README / 源码入口。

新增稳定入口优先回写到本文件，再按需要同步到细节 map。

## 使用规则

- 普通开发、分析、`aipd-case`、update、weave 前，优先读取 `_adoc/map.md`。
- 本文件记录高频入口、稳定路径和兜底搜索词，不记录一次性执行细节。
- 命中不清楚时，用 `rg` 搜索核心词、skill 名、agent 名、平台名和 README。
- 新发现的稳定入口，后续应回写到本文件或对应 L3 / L4 / L5 map。
- 关键路径尽量扁平暴露，不要求 Agent 通过多层目录链自行发现。
- 普通开发、找代码、查业务规则、查页面或组件实现时，本文件不把请求路由到 `_adoc/case/` 或 `_adoc/okr/`。只有用户明确要求 case / OKR 流程，或当前任务本身是 `aipd-case`、OKR 对齐时，才读取对应流程状态。

## 高频任务入口

| 用户说法 / 关键词 | 标准入口 | 层级判断 | 必读上下文 | 代码 / 局部入口 | 兜底搜索 |
|---|---|---|---|---|---|
| AIPD 方向 / 分层 / 项目认知 | AIPD 项目方向与认知层级 | L1 + L3 | `_adoc/L1-intent/intent.md`、`_adoc/L3-core/index.md`、`_adoc/L3-core/vertical-concept-modules.md`、`_adoc/L3-core/horizontal-capabilities.md` | `aipd-skill/src/core/overview.md` | `rg "L3|L4|L5|L6|认知|上下文|纵向|横向|功能能力" aipd-skill/src _adoc` |
| AIPD 历史 / 发展日志 / 长期回顾 / 肿歪审计 / 为什么演变成现在这样 | AIPD 发展日志 | L1 + L3 + 历史回顾 | `_adoc/development-log.md`、`_adoc/L1-intent/intent.md` | `git log --date=short --reverse` | `rg "发展日志|肿歪|历史|演进|大迭代|每日更新" _adoc README.md docs` |
| L2/L3/L4/L5 边界 / 外部世界 / 成立模型 / 局部 map 放哪里 | AIPD 分层边界 | L3 + L5 | `_adoc/L3-core/index.md`、`_adoc/L3-core/vertical-concept-modules.md`、`_adoc/L5-dev/index.md` | `aipd-skill/src/core/L2-scenario/guide.md`、`aipd-skill/src/core/L3-engine/guide.md`、`aipd-skill/src/core/L4-product/guide.md`、`aipd-skill/src/core/adoc-structure.md` | `rg "外部世界|痛点|竞品|成立模型|商业模型|增长模型|局部 map|L2 Research|L3 Core|L4 Product|L5 Dev" aipd-skill/src _adoc AGENTS.md README.md` |
| 上下文解耦 / 黑箱上移 / 纵向黑箱 / 横向分层 / 牵连面 / DRY 后置 / 扁平化检索 / 记忆存取 / 模型底层倾向 / 提示词改不了 / 案例和边界 / AIPDR | AIPD 核心认知 | L3 + L5 | `_adoc/L3-core/index.md`、`_adoc/L3-core/horizontal-capabilities.md`、`docs/modules/context-decoupling.md` | `aipd-skill/src/core/overview.md`、`aipd-skill/src/core/case/overview.md`、`aipd-skill/src/core/case/phases/design.md` | `rg "上下文解耦|黑箱上移|纵向黑箱|横向分层|牵连|DRY|Decouple|扁平化检索|记忆|黑箱|模型底层|提示词|基础逻辑|案例|边界|Memory Retrieval|面向指令|面向状态" aipd-skill/src _adoc docs` |
| 文件优先 / 每一步落文件 / checkpoint / 聊天不是事实源 / 自然压缩 / 压缩后恢复 / 当前游标 | 文件优先上下文承接 | L3 + case 流程 + Agent Entry | `_adoc/L3-core/index.md`、`_adoc/L3-core/horizontal-capabilities.md`、`aipd-skill/src/core/case/overview.md` | `aipd-skill/src/skills/aipd-case/SKILL.md`、`aipd-skill/src/core/case/phases/think.md`、`aipd-skill/src/core/case/phases/design.md`、`aipd-skill/src/core/case/phases/execute.md`、`aipd-skill/src/core/case/templates/case.md`、`aipd-skill/src/core/case/templates/work-package.md`、`aipd-skill/src/core/agent-entry/template.md` | `rg "文件优先|checkpoint|聊天只是运行缓存|恢复入口|当前游标|自然压缩|落文件|落盘" aipd-skill/src _adoc` |
| 初始化 / AGENTS.md / Agent Entry | AIPD 初始化入口 | L5 + L6 | `_adoc/L5-dev/index.md` | `aipd-skill/src/skills/aipd/SKILL.md`、`aipd-skill/src/core/agent-entry/template.md`、`aipd-skill/src/core/adoc/templates/index.md` | `rg "agent-entry|AGENTS|初始化" aipd-skill/src _adoc` |
| 更新已有项目 AIPD 架构 / aipd update / 过期结构 / 破坏性更新 | AIPD Update | L5 + L6 | `_adoc/map.md`、`_adoc/L5-dev/index.md` | `aipd-skill/src/skills/aipd-update/SKILL.md`、`aipd-skill/src/core/adoc/templates/map.md`、`aipd-skill/src/core/adoc/templates/index.md`、`aipd-skill/src/core/agent-entry/template.md` | `rg "aipd-update|更新 AIPD|破坏性更新|过期结构|map.md|AGENTS" aipd-skill/src _adoc` |
| 上下文检索 / 大地图 / map | 项目记忆地图 | L3 + L5 | `_adoc/map.md`、`_adoc/L3-core/index.md` | `aipd-skill/src/core/adoc/templates/map.md`、`aipd-skill/src/skills/aipd-case/SKILL.md` | `rg "map.md|上下文检索|检索包|观察锚点" aipd-skill/src _adoc AGENTS.md` |
| ADOC 检索 Agent / A-DOC 查资料 / 项目认知查询 / 保持主 Agent 上下文干净 | ADOC 检索 Agent | L5 + agent-guide | `_adoc/L5-dev/index.md`、`aipd-skill/src/platforms/codex/core/agent-guide.md` | `aipd-skill/src/core/agent-guides/aipd_adoc_retriever.md`、`aipd-skill/src/platforms/codex/agents/aipd_adoc_retriever.toml` | `rg "aipd_adoc_retriever|ADOC 检索|上下文检索|子 Agent|默认调度" AGENTS.md aipd-skill/src _adoc` |
| inbox / 收件箱 / 先记一下 / 先存一下 / 回头再整理 | Inbox 临时收件箱 | capture | `_adoc/inbox.md` | `aipd-skill/src/skills/aipd-inbox/SKILL.md`、`aipd-skill/src/core/adoc/templates/inbox.md` | `rg "inbox|收件箱|先记一下|先存一下|回头再整理" _adoc aipd-skill/src` |
| think / AIPD Think / 讨论任务 / 定任务 / 前置判断 / 要不要做 / 从模糊到清晰 / 深度调研后再决定 | Case Think / 前置讨论与决策 | L3 + L4 规划能力 | `_adoc/L3-core/index.md`、`_adoc/L3-core/horizontal-capabilities.md`、`_adoc/L4-product/index.md`、`_adoc/L4-product/map.md` | `aipd-skill/src/skills/aipd-case/SKILL.md`、`aipd-skill/src/core/case/phases/think.md` | `rg "Think|Case Think|任务澄清|前置讨论|要不要做|从模糊到清晰|Create|Kill|Defer|Research|Design" _adoc aipd-skill/src docs` |
| SOP / AI 原生程序 / Agent 程序 / 可复用流程 / 按步骤反复执行 / 查关键词 / 日报 | SOP 项目级 Agent 程序库 | SOP + L3 | `_adoc/sop/index.md`、`_adoc/sop/map.md`、`_adoc/L3-core/horizontal-capabilities.md` | `_adoc/sop/` | `rg "SOP|AI 原生程序|Agent 程序|可复用流程|procedure|查关键词|日报" _adoc aipd-skill/src docs` |
| OKR / 飞书 OKR / lark-cli / 同步 OKR / 创建 OKR / 删除 OKR / OKR 经验包 | AIPD 飞书 OKR | OKR 流程 + skill + SOP | `aipd-skill/src/skills/aipd-okr/SKILL.md`、`_adoc/okr/index.md`、`aipd-skill/src/core/okr/guide.md` | `aipd-skill/src/core/okr/feishu-cli.md`、`lark-cli okr` | `rg "OKR|飞书|lark-cli|okr \\+cycle|batch-create|objectives delete|经验包" _adoc aipd-skill/src docs` |
| case / Case Contract / 目标边界 / case design / case think / work package / 创建 case / 执行 case / 验收 / 归档 | AIPD Case 统一入口 | case 流程 + L3/L4/L5 能力文档 | `_adoc/case/index.md`、`_adoc/L3-core/horizontal-capabilities.md`、`_adoc/L4-product/map.md` | `aipd-skill/src/skills/aipd-case/SKILL.md`、`aipd-skill/src/core/case/overview.md`、`aipd-skill/src/core/case/phases/`、`aipd-skill/src/core/case/templates/case.md`、`aipd-skill/src/core/case/templates/work-package.md` | `rg "aipd-case|Case Contract|Case Phase|Work Package|复杂度爆点|case design|case think" aipd-skill/src _adoc/case docs` |
| 旧 case-create / 旧 case-run / 旧 case-archive | AIPD Case 旧入口迁移 | case 流程 | `_adoc/case/index.md`、相关 case `case.md` | `aipd-skill/src/skills/aipd-case/SKILL.md`、`aipd-skill/src/core/case/overview.md` | `rg "case-create|case-run|case-archive|旧入口|迁移" aipd-skill/src _adoc docs` |
| Weave / 反向编织 / 项目 ADOC 回写 / 更新 map / 更新局部 README / Close 归档候选 | Weave 反向编织 | L3 + L5 | `_adoc/L3-core/horizontal-capabilities.md`、`_adoc/map.md` | `aipd-skill/src/skills/aipd-weave/SKILL.md` | `rg "weave|反向编织|Close 归档候选|知识回写|更新 ADOC|更新 map" aipd-skill/src _adoc README.md` |
| 自迭代 / learn / transcript / 观察锚点 | AIPD Learn | L5 + 框架自迭代 | `aipd-skill/src/skills/aipd-learn/SKILL.md` | `aipd-skill/src/platforms/codex/` | `rg "观察锚点|transcript|回流|自迭代|learn" aipd-skill/src _adoc` |
| 实践经验库 / 附带源码 / experience assets / AipdModalBox / AipdForm / AipdSearch | AIPD 实践经验与源码资产 | L5 + 仓库级 L6 资产 | `aipd-skill/src/core/experience/index.md`、`_adoc/L5-dev/index.md` | `experience-assets/README.md`、`experience-assets/vue3-context-decoupling/README.md` | `rg "附带源码|experience-assets|AipdModalBox|AipdForm|AipdSearch" aipd-skill/src experience-assets _adoc` |
| docs / 学习文档 / README / 教学文档 / 三条主线 / 用户学习路径 | AIPD 面向用户的学习文档体系 | L3 + L5 + docs | `docs/README.md`、`README.md` | `docs/guide/`、`docs/modules/` | `rg "学习文档|三条主线|知识库最小闭环|Case / Work Package|AI 原生代码架构|README" README.md docs _adoc` |
| Vue 页面 / 组件 / AI 友好前端架构 / 纯前端 case | Vue 角色 Agent 调度 | L5 + 局部 README | `_adoc/L5-dev/index.md`、`aipd-skill/src/core/L5-dev/vue-case-create-guide.md`、`aipd-skill/src/core/L5-dev/vue-architecture-diagram-guide.md`、`aipd-skill/src/core/agent-guides/aipd_vue_architect.md` | `aipd-skill/src/platforms/codex/agents/aipd_vue_architect.toml` | `rg "Vue|组件|README|aipd_vue_architect|纯前端|一个文件一个 work package|useXxx" aipd-skill/src _adoc` |
| Vue useXxx / provide inject / 页面数据源 / API 字段对齐 / 兜底字段 | Vue Provider 角色 Agent 调度 | L5 + 局部 README | `_adoc/L5-dev/index.md`、`aipd-skill/src/core/L5-dev/vue-provider-guide.md`、`aipd-skill/src/core/agent-guides/aipd_vue_provider.md` | `aipd-skill/src/platforms/codex/agents/aipd_vue_provider.toml` | `rg "useXxx|provide|inject|provider|API|字段|兜底|aipd_vue_provider" aipd-skill/src _adoc` |

## L3 核心概念总表

| 用户说法 / 黑话 | 标准概念 | 概念 map | 相关 L4 功能线 | 常见误解 |
|---|---|---|---|---|
| 项目认知 / ADOC | ADOC / `_adoc` | `_adoc/L3-core/map.md` | AIPD 初始化、AIPD Update、Weave | 不等同于普通 README；它是 AI 长期上下文结构 |
| 纵向概念模块 | L1-L6 / OKR / Case / Work Package / Agent Entry | `_adoc/L3-core/vertical-concept-modules.md` | aipd-case、update | 不是功能清单；它回答项目认知和代码实现按什么类别沉淀；AIPD 里的 OKR 默认指飞书 OKR |
| 横向功能能力 | map 检索 / Case 系统 / Weave / 上下文服务 | `_adoc/L3-core/horizontal-capabilities.md` | aipd-case、weave、learn | 不是新的层级；它回答 Agent 做事时怎么串起纵向模块 |
| 文件优先上下文承接 | 文件 checkpoint / 当前游标 / 压缩后恢复 | `_adoc/L3-core/index.md`、`_adoc/L3-core/horizontal-capabilities.md`、`aipd-skill/src/core/case/overview.md` | aipd-case、Agent Entry | 不是聊天存档；它只承接有恢复价值的状态、确认、边界、下一步 |
| Think / AIPD Think / 任务澄清 / 前置讨论 / 要不要做 | Think / 任务澄清决策模型 | `_adoc/L3-core/index.md`、`_adoc/L3-core/horizontal-capabilities.md` | AIPD Case、weave | Think 可以在 Case 前，也可以作为 Case 内 phase 处理推进中的未知、调研和抉择 |
| 外部世界 | L2 Research | `_adoc/L3-core/vertical-concept-modules.md` | AIPD 初始化、aipd-case | 不只是痛点；竞品、玩法范式、市场观察、流量来源和变现方式也可先放 L2 |
| 项目成立模型 | L3 Core | `_adoc/L3-core/index.md` | AIPD 初始化、AIPD Update | 不等于狭义数据模型；也可能是增长模型、内容模型、流量模型、留存模型和商业模型 |
| 局部 map | 代码就近 README / 局部 map | `_adoc/L5-dev/index.md`、`aipd-skill/src/core/adoc-structure.md` | aipd-case、weave | 页面、弹窗、组件内部实现地图不应大老远塞回 L5 |
| Weave 反向编织 | `aipd-weave` / 项目 ADOC 回写 | `_adoc/L3-core/horizontal-capabilities.md` | Weave | 和 `aipd-learn` 分工不同；weave 面向当前项目知识库，learn 面向 AIPD 框架自迭代 |
| 子 Agent | 用于上下文隔离、真实并发或独立复核的执行 / 调研 Agent | `_adoc/L5-dev/index.md`、`aipd-skill/src/platforms/codex/core/agent-guide.md` | case Execute、角色 Agent 调度 | 不是默认步骤；按隔离收益、并发收益、主线耦合和调度成本选择，派发不扩大外部副作用权限 |
| ADOC 检索 Agent | `aipd_adoc_retriever` | `_adoc/L5-dev/index.md`、`aipd-skill/src/core/agent-guides/aipd_adoc_retriever.md` | Map-first 认知加载、SOP 检索、次级流程检索 | Main 先最小路由；大量项目认知或多条独立认知线才优先派发；Inbox/OKR/Case 只有明确需要时查 |
| Case / Work Package | 短周期目标契约 / 可执行、可恢复、可验收目标包 | `_adoc/case/index.md`、`aipd-skill/src/core/case/overview.md` | aipd-case | Work Package 是状态与验收边界，不等于子 Agent 派发节点；运行时另选 Main 或 Child |
| OKR | 飞书阶段目标 / 飞书 O/KR | `aipd-skill/src/skills/aipd-okr/SKILL.md`、`_adoc/okr/index.md`、`aipd-skill/src/core/okr/guide.md` | `aipd-okr`、AIPD Case | AIPD 里的 OKR 默认指飞书 OKR；高噪声飞书查询应压缩成 OKR 经验包 |
| SOP | 以 Agent 为运行时的可复用 AI 原生程序 | `_adoc/sop/index.md`、`_adoc/sop/map.md` | SOP、aipd-case、weave | 不是 L4/L5 知识条目，也不是单纯脚本；代码只是 SOP 可调用的工具之一 |
| Inbox | 临时收件箱 / capture | `_adoc/inbox.md` | aipd-inbox | 不是待办、不是候选 case、不是稳定认知；只接住未整理信息 |

## L4 产品功能线总表

| 用户说法 / 场景 | 标准功能线 | 功能线 map | 主要入口 | 数据对象 | 相关 L3 | 相关 L5 / 流程入口 |
|---|---|---|---|---|---|---|
| 初始化新项目 / 安装 AIPD / 项目状态 | AIPD 总入口与初始化 | `_adoc/L4-product/map.md` | `aipd-skill/src/skills/aipd/SKILL.md` | `AGENTS.md`、`_adoc/`、基础模板 | `_adoc/L3-core/map.md` | `_adoc/L5-dev/index.md` |
| 读 map / 加载项目认知 / 找上下文 | Map-first 认知加载 | `_adoc/L4-product/map.md` | `aipd-skill/src/skills/aipd/SKILL.md`、`_adoc/map.md` | `_adoc/index.md`、`_adoc/map.md`、L3/L4/L5、局部 README | `_adoc/L3-core/map.md` | `_adoc/L5-dev/index.md` |
| inbox / 收件箱 / 先记一下 | Inbox 临时收件箱 | `_adoc/L4-product/map.md` | `aipd-skill/src/skills/aipd-inbox/SKILL.md` | `_adoc/inbox.md` | `_adoc/L3-core/map.md` | `aipd-skill/src/core/adoc/templates/inbox.md` |
| think / AIPD Think / 讨论任务 / 定任务 / 要不要做 | AIPD Case Think phase | `_adoc/L4-product/map.md` | `aipd-skill/src/skills/aipd-case/SKILL.md` | case.md、Think phase、discussion、research、options、decision、决策出口 | `_adoc/L3-core/index.md` | `_adoc/L3-core/horizontal-capabilities.md` |
| 创建 case / Case Contract / 目标边界 / case design / case think / 执行 case / 派发子 Agent / 验收 / 归档 | AIPD Case | `_adoc/L4-product/map.md` | `aipd-skill/src/skills/aipd-case/SKILL.md` | case.md、Case Contract、phase state、work package、Agent 指引、Close 归档候选 | `_adoc/L3-core/horizontal-capabilities.md` | `_adoc/L5-dev/index.md` |
| 旧创建 case / 旧拆 step / 旧执行 case / 旧归档 case | AIPD Case 旧入口迁移 | `_adoc/L4-product/map.md` | `aipd-skill/src/skills/aipd-case/SKILL.md` | 旧命令说法、旧 case 结构迁移提示 | `_adoc/L3-core/horizontal-capabilities.md` | `_adoc/L5-dev/index.md` |
| 经验回写 / 反向编织 / Close 归档候选 | Weave | `_adoc/L4-product/map.md` | `aipd-skill/src/skills/aipd-weave/SKILL.md` | L3 / L4 / L5 / README / map；未完成 case 候选先留在 Close 归档候选 | `_adoc/L3-core/horizontal-capabilities.md` | `_adoc/L5-dev/index.md` |
| 框架自迭代 / transcript 回流 | Learn | `_adoc/L4-product/map.md` | `aipd-skill/src/skills/aipd-learn/SKILL.md` | transcript、回流包、AIPD 源码 | `_adoc/L3-core/horizontal-capabilities.md` | `_adoc/L5-dev/index.md` |
| OKR / 飞书 OKR / 目标 / 周期 / OKR 经验包 | AIPD OKR | `_adoc/L4-product/map.md` | `aipd-skill/src/skills/aipd-okr/SKILL.md` | 飞书 O/KR、周期 ID、飞书入口、OKR 经验包 | `_adoc/L3-core/horizontal-capabilities.md` | `_adoc/okr/index.md`、`aipd-skill/src/core/okr/` |
| 更新已有项目 AIPD 架构 | AIPD Update | `_adoc/L4-product/map.md` | `aipd-skill/src/skills/aipd-update/SKILL.md` | `AGENTS.md`、`_adoc/map.md`、case 模板 | `_adoc/L3-core/map.md` | `_adoc/L5-dev/index.md` |
| Mermaid / MMD / 架构图 / 预览图 | Mermaid / MMD | `_adoc/L4-product/map.md` | `aipd-skill/src/skills/aipd-mermaid/SKILL.md` | `.mmd`、Mermaid 源码、按需 PNG | `_adoc/L3-core/index.md` | `aipd-skill/src/core/L5-dev/vue-architecture-diagram-guide.md` |
| git push / 推送当前分支 | Git Push | `_adoc/L4-product/map.md` | `aipd-skill/src/skills/aipd-git-push/SKILL.md` | 当前分支、提交状态、远端 | `_adoc/L3-core/horizontal-capabilities.md` | git 状态 |
| SOP / AI 程序 / 可复用流程 | SOP 库 | `_adoc/L4-product/map.md` | `_adoc/sop/index.md`、`_adoc/sop/map.md` | SOP 目录、输入、步骤、工具、输出 | `_adoc/L3-core/index.md` | `_adoc/sop/` |
| AIPD Desktop / 桌面端 / 聊天 UI / 文件树 | AIPD Desktop | `_adoc/L4-product/map.md` | `aipd-desktop/README.md` | AIPD 文件树、聊天、context chip、预览 | `_adoc/L3-core/index.md` | 规划 case 仅在 Desktop case 流程中读取 |

## L5 工程规则总表

| 用户说法 / 工程词 | 标准规则 | 规则 map | 适用范围 | 代码入口 | 常见坑 |
|---|---|---|---|---|---|
| Codex custom agents / 推荐 Agent | Codex Agent 调度 | `_adoc/L5-dev/index.md` | Codex 平台、case Execute、Vue 角色 Agent | `aipd-skill/src/platforms/codex/core/agent-guide.md`、`aipd-skill/src/platforms/codex/agents/` | 不要因 agent 注册失败阻塞任务，应降级读取领域指引 |
| ADOC 检索 / A-DOC retriever / aipd_adoc_retriever | ADOC 检索 Agent 调度 | `_adoc/L5-dev/index.md` | Codex 平台、项目认知加载、SOP 检索 | `aipd-skill/src/core/agent-guides/aipd_adoc_retriever.md`、`aipd-skill/src/platforms/codex/agents/aipd_adoc_retriever.toml` | custom agent 身份优先；已知入口少时 Main 直接读，大量扫描时再派发 |
| 子 Agent / sub Agent / agent 调度 / 并发 | Main / Child 运行时判定 | `_adoc/L5-dev/index.md` | 普通探索、case Execute、角色 Agent | `aipd-skill/src/platforms/codex/core/agent-guide.md`、`aipd-skill/src/skills/aipd-case/SKILL.md` | Work Package 不等于派发；按上下文隔离、真实并发、主线耦合和调度成本选择 |
| skills + agents 构建安装 | Codex 构建安装 | `_adoc/L5-dev/index.md` | AIPD 开发脚本 | `aipd-skill/scripts/build`、`aipd-skill/scripts/install-codex`、`aipd-skill/scripts/dev-codex`、`aipd-skill/scripts/install-project-codex` | 源模板、dist 输出和用户级安装目录要区分 |
| Vue 架构 / Vue Provider | Vue 角色 Agent 规则 | `_adoc/L5-dev/index.md` | Vue 前端 case | `aipd-skill/src/core/agent-guides/`、`aipd-skill/src/platforms/codex/agents/` | 不要仅因知识点多就继续拆身份；按执行边界拆 |

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

## 自迭代观察锚点

后续用 `aipd-learn` 审计会话或 transcript 时，观察：

- Agent 是否先读取 `_adoc/index.md` 和 `_adoc/map.md`，再进入 L3 / L4 / L5 / 局部 README。
- Agent 是否能从本文件一跳命中功能线或工程规则，而不是依赖多层目录链。
- 如果任务涉及核心概念，Agent 是否读取 L3 map 或相关 L3 文档，而不是直接猜含义。
- 如果任务涉及产品功能线，Agent 是否读取 L4 map，并找到稳定源码入口。
- 如果任务涉及跨模块工程规则，Agent 是否读取 L5 规则。
- 如果任务涉及可重复执行的项目动作，Agent 是否检查 `_adoc/sop/` 中是否已有可复用 SOP。
- 如果本文件缺入口，Agent 是否用 `rg` 兜底，并提出应回写到 map 的稳定入口。

## Weave 反向编织锚点

后续用 `aipd-weave` 回写项目经验时，观察：

- 新核心概念、别名、误解是否回写到 L3。
- 新产品功能边界、业务规则是否回写到 L4。
- 新实现逻辑、跨模块规则、调试经验是否回写到 L5。
- 新的可复用 Agent 执行流程是否进入 `_adoc/sop/`，而不是误写成普通 L4/L5 知识条目。
- skill、agent、脚本内部入口是否回写到就近源码或 README。
- 高频检索入口是否回写到本文件或细节 map。
- 一次性执行过程是否留在 case / work package，没有误写进长期知识。

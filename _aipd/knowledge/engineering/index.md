# AIPD Engineering 工程实现索引

Engineering 是产品功能到代码实现之间的工程实现层。它存放跨模块、跨平台、跨 skill、长期稳定的实现规则、工程约定和调试经验。

具体 skill、agent、脚本内部的局部实现细节，优先读取就近源码和 README，不塞回 Engineering。

Engineering 不是远离代码的万能实现地图。某个页面、弹窗、组件、脚本或功能局部的组件关系、数据流和入口文件，应贴近 真实代码写到就近 README 或局部 map；Engineering 只沉淀多个入口共同遵守的规则，例如平台适配、Agent 调度、构建安装、跨模块协作约定和长期稳定的调试经验。

Engineering 也不是 case / OKR 的索引层。普通开发、找代码、查工程规则时，Engineering 应把 Agent 带到稳定规则、源码入口和局部 README；具体 case、当前 case 状态、OKR 执行状态和一次性执行记录只在对应流程任务中读取。

## README / docs / _aipd 分工

AIPD 仓库同时有面向用户的学习文档、面向 Agent 的项目认知和一次性 case 记录，维护时按以下边界放置内容：

- 根 `README.md`：项目首页。负责让第一次打开仓库的用户快速判断 AIPD 是什么、解决什么问题、是否继续读；保留学习入口、短版三条主线、核心能力、快速开始和源码项目入口，不承载完整思想展开。
- `docs/README.md`：面向用户的学习入口。负责给出 1-6 的推荐阅读路径，并按三条主线索引 modules。
- `docs/guide/`：面向用户的入门路径。按“问题引入 -> 三条主线 -> 第一次完整路径”组织。
- `docs/modules/`：面向用户的能力字典。按能力解释 Knowledge、map、weave、OKR、Inbox、Case / Work Package、上下文解耦、构建安装等。
- `_aipd/`：面向 Agent 的项目认知事实源。Agent 执行任务时仍从 `AGENTS.md`、`_aipd/index.md`、`_aipd/map.md` 进入，不用 `docs/` 替代。
- `_aipd/case/`：一次事项的过程、状态、验收和 Close 归档候选。具体执行过程留在 case / work package，不写进面向用户的 README 或 docs。

## Skill 范围与构建合同

AIPD 按 Skill 的服务范围区分两条工程链路。判断依据是“谁需要使用”，不是“它是否叫 Skill”。

### 全局 / 公共 Skill

- 它们是 AIPD 面向其他项目交付的主体产物。
- 源码位于 `aipd-skill/src/skills/`，共享规则位于 `aipd-skill/src/core/`，平台差异位于 `aipd-skill/src/platforms/{platform}/`。
- 统一经过 `build` 生成 `aipd-skill/dist/{platform}/`；构建架构允许同一源码装配到多个 Skill 目录，并通过平台覆盖生成多个平台的 Skill / Agent 产物。
- `dist/` 是生成物，不是源码事实源；用户级或目标项目级 `install` 只消费构建产物。

### 项目 / 仓库级 Skill

- 它们只服务当前源码仓库，不属于 AIPD 对外安装包。
- Skill 本体直接放在仓库 `.agents/skills/{skill}/`，该目录同时是源码事实源和 Codex 运行时加载位置。
- 不建立 `aipd-skill/src/skills/` 镜像，不经过 build，不生成 dist，也不进入用户级或外部项目级 install。
- 通过 Git 随仓库版本化；只有流程本身需要变化时才直接修改，没有变化时不做同步、发布或安装动作。
- Skill 的执行结果仍按真实 owner 写回公共源码、Knowledge、Map、README、Case 或经验资产；目标 owner 若属于公共产物，继续遵守其 build / install 规则。

当前 `aipd-learn` 是第一项正式的仓库级 Skill。后续新增 Skill 时，只有“外部项目也需要直接调用”才进入公共构建链；仅用于维护 AIPD 仓库的能力默认走仓库级链路。

## 当前研发策略

- Codex 优先适配，先跑通 `skills + agents + aipd-case` 的最短闭环。
- `$aipd-leader` 是唯一的显式项目主导入口。Codex 上：当前 Leader task 由用户配置为 `gpt-5.6-sol / max / Fast`；它创建的每个 Case task 明确使用 `gpt-5.6-sol / high`，Fast 由 Codex 配置继承或标记未核验。Cursor 上：桌面端对话是 Leader；Case 执行层是已登录的 `cursor-agent` 无头进程，`chatId` 记在 `_aipd/leader/`，命令写死 `cursor-agent` 而不是裸 `agent`。两种宿主上 Case 执行层都走 `aipd-case`，不得再创建同级 Case task，也不找 DSH。
- Codex 子 Agent 不是默认步骤；Main 根据上下文隔离收益、真实并发收益、主线耦合度和调度成本自然选择是否派发。平台不可用时由 Main 回退执行。
- GPT-5.6 Sol 日常交互以 High 为基线，Ultra 只用于存在多条独立工作线且可接受更长等待的任务；Ultra 自带委派与 AIPD 主动派发不能无条件叠加。
- work package 文件和显式上下文不是替代当前对话的任务源，而是用于校准边界、压缩恢复和沉淀长期事实。
- `aipd-skill/src/platforms/codex/core/agent-guide.md` 是 Codex 子 Agent 上下文、调度和降级策略的主要来源。
- `aipd-skill/src/core/agent-guides/` 存平台无关的领域执行指引。
- `aipd-skill/src/platforms/codex/agents/` 只存 Codex custom agent 打包元数据和指引引用。
- `.agents/skills/aipd-learn/` 是 AIPD 源码仓库专用的框架自迭代 Skill，由 Codex 按仓库级路径发现；它不属于公共 `src/skills`、dist 或安装集合。
- 构建脚本负责把核心指引注入 Codex agent 模板，输出到 `aipd-skill/dist/codex/agents/`。
- 构建脚本默认把一次性 `migrate-project-schema` 复制进 Codex 的 `aipd/scripts/`，让已安装 Skill 能在外部项目中定位迁移器；该脚本不进入日常读取链路。
- 默认安装脚本负责把九个公共 Codex Skill 与 agent 安装到用户级或目标项目的 `.codex/` 目录；带 `-codex` 的脚本保留为显式别名。仓库级 `aipd-learn` 不参与复制。
- 修改 AIPD 源码后，Agent 可以直接运行 `./aipd-skill/scripts/build` 作为低风险打包验证；不要默认执行安装脚本。
- 无参 build 默认只生成 Codex 产物。构建系统保留通用目标装配、平台同路径覆盖、core fallback 和可选 agents 注入；其他目标可自行扩展和打包，但不进入默认交付与验证。
- build 完成后运行 `./aipd-skill/scripts/check-dist`，统一验证 Codex 的 9 个公共 Skill、1 个仓库级 `aipd-learn` 的隔离合同、3 个 Agent、源码 / 产物同步、静态 references、Leader 显式调用合同、关键旧语义、默认入口和通用多目标构建护栏。`check-dist` 只读，不替代 build，也不执行 install。
- `aipd-skill/src/core/updates/catalog.json` 是本机发布版本事实源。每次发布必须保持连续 Release Records、current authority、manifest 模板、默认 Codex Skill references 和 `currentVersion` 一致；`check-release-bundle`、其 fixture 与 `check-dist` 共同阻止 source / dist 版本漂移。
- 一次性 Schema migrator 只把旧工作区切换为精确两键的 `unversioned-v2`，不写本机当前 `aipdVersion`；只有 `aipd-update` 完成语义收敛和验证后才提交项目版本与 `_aipd/update-log.md`。
- 根级 `experience-assets/` 保存实现型经验附带源码，不属于 Skill 源码；构建和安装脚本不得把它复制进 `aipd-skill/dist` 或 Agent Skill 目录。
- 用户级或旧项目级安装中残留的公共 `aipd-learn` 已进入共享退役清理清单；只有用户明确授权执行 install / dev 时才清理，仓库内 `.agents/skills/aipd-learn/` 不受影响。
- install 会改写用户级或项目级 Agent 运行环境。build 完成后，必须主动问用户是否执行 install；不能只说明“可能需要 install”。只有用户明确确认后，才执行 `./aipd-skill/scripts/install`、`./aipd-skill/scripts/install-codex`、`./aipd-skill/scripts/install-cursor`、`./aipd-skill/scripts/install-project` 或 `./aipd-skill/scripts/install-project-codex`。`install-cursor` 只写入 `~/.cursor/skills/`，不写 `~/.dsh/skills/`。

## AI 友好代码拓扑运行时投影

- `_aipd/knowledge/core/ai-friendly-code-topology.md` 是长期抽象认知主事实源；`aipd-skill/src/core/ai-friendly-code-topology.md` 是供外部 Agent 消费的精简运行时投影，不逐字复制研究过程。
- `aipd` 与 `aipd-case` 通过 `inject-from-core` 获得同一 reference。普通结构性开发和 Case Design 条件加载；无关任务以及 Case Execute / Verify 默认不重复加载完整 guide。
- Case Design 把通用判断编译为项目具体的 `Code Topology Contract`；拓扑敏感 Work Package 在 Execute 携带短护栏；Verify 根据真实 diff、目录、依赖和文档回写反查合同。
- `aipd-skill/scripts/check-dist` 验证 Codex 的两个目标 Skill 都包含同一投影、其他 Skill 不包含、两个入口有静态读取规则，并检查三段合同闭环与旧空间术语。
- 默认 build 产物位于 `aipd-skill/dist/codex/skills/{aipd,aipd-case}/references/ai-friendly-code-topology.md`，只由 build 生成，不手改；通用构建器仍使用 `dist/{platform}/` 目标边界。

## 当前 Agent 角色指引与 Codex 装配

`aipd-skill/src/core/agent-guides/` 当前有 4 份平台无关角色指引；`aipd-skill/src/platforms/codex/agents/` 当前只把其中 3 个装配为 Codex custom Agent。`aipd_product_manager` 目前是 Case Design 可按需读取的领域指引，没有对应 Codex `.toml`；因此“4 份指引”与“3 个 Codex Agent”不是数量冲突。

| Agent | 用途 | 源码 |
|---|---|---|
| `aipd_context_retriever` | AIPD 上下文检索：从必要 Knowledge、SOP、流程状态、局部 README 和代码入口中检索并压缩任务上下文，保持 Main Agent 上下文干净 | 指引：`aipd-skill/src/core/agent-guides/aipd_context_retriever.md`；Codex 元数据：`aipd-skill/src/platforms/codex/agents/aipd_context_retriever.toml` |
| `aipd_product_manager` | AIPD Case Design 需求契约角色：梳理需求、规则、边界、验收标准和 `confirmed / assumed / open`，防止未确认假设被固化为工程事实 | 指引：`aipd-skill/src/core/agent-guides/aipd_product_manager.md` |
| `aipd_vue_architect` | Vue 页面、组件、样式、交互、状态组织和 AI 友好型 Vue 架构任务 | 指引：`aipd-skill/src/core/agent-guides/aipd_vue_architect.md`；Codex 元数据：`aipd-skill/src/platforms/codex/agents/aipd_vue_architect.toml` |
| `aipd_vue_provider` | Vue `useXxx.ts/js`、provide/inject、页面数据源、API 字段对齐和局部 controller 边界 | 指引：`aipd-skill/src/core/agent-guides/aipd_vue_provider.md`；Codex 元数据：`aipd-skill/src/platforms/codex/agents/aipd_vue_provider.toml` |

## 上下文检索 Agent 调度原则

- Main 先按 map 做最小路由；已知入口少、上下文可控时直接读取，需要扫描大量项目认知或多条独立认知线时优先使用 `aipd_context_retriever`。
- `aipd_context_retriever` 是 custom agent 身份；Codex 当前不能保证 custom agent 身份和完整上下文继承同时使用，因此身份优先，不要求同时 fork 当前对话上下文。
- 判定 retriever 有明确净收益且平台支持时，Main Agent 创建；平台不可用时由 Main 回退检索。用户明确要求不派子 Agent 时，遵循用户当前指令。派发不扩大用户原始任务范围或外部副作用权限。
- 默认从 Map 路由到必要 Knowledge、SOP、局部 README 和代码入口；`_aipd/inbox.md`、`_aipd/okr/`、`_aipd/case/` 属于次级流程检索，只有用户明确提到或任务明显需要时才读取。
- 派发 prompt 只传用户任务摘要、当前工作目录、必要边界和返回格式；不要复制长对话或大段 `_aipd` 正文。

## Main / Child 运行时判定

- Work Package 是状态、恢复和验收边界，不等于子 Agent 派发节点。
- 内聚模块、高耦合实现 / 调试、上下文规模可控或调度成本更高时，优先由 Main 连续执行。
- 长文档、长日志、大量页面结构、批量扫描等高噪声材料只需回流少量结论时，优先 Child 做上下文隔离。
- 两条以上真正独立、可同时推进且无写入冲突的工作线，优先少量正交 Child 做并发加速。
- 派发时默认最小上下文、single-owner evidence 和压缩回流；Main 不重复调查。
- 浏览器新流程、异常状态或路径不确定时先与用户沟通，不无边界深入或盲目绕路。

## Vue Agent 调度原则

- Vue 前端实现保留一个主角色：`aipd_vue_architect`，用于组件、样式、HTML、交互和整体页面结构。
- `useXxx.ts/js`、provide / inject、页面级 API 数据源和 provider/controller 边界属于稳定执行黑箱，使用 `aipd_vue_provider`。
- AipdForm、AipdSearch、table 展开、页面 README、组件图等暂时沉淀成 Engineering 规则或局部 README，由对应 Agent 按 work package 上下文读取；不要仅因为知识点多就继续拆身份。
- 当某个能力变成稳定基础设施，且需要独立审查或独立执行时，再考虑拆出专题 Agent；拆分依据是“执行边界稳定”，不是“知识点很多”。
- 纯前端 case 的 work package 默认按清晰架构边界切分；运行时决定派发后，角色 Agent 负责局部实现、校验、打磨和自检。高耦合内聚模块也可以由 Main 连续完成。

## Vue 按需指南

- `aipd-skill/src/core/knowledge/engineering/vue-case-create-guide.md`：Vue 前端 case 的前置设计、work package 粒度和 Agent 推荐。
- `aipd-skill/src/core/knowledge/engineering/vue-architecture-diagram-guide.md`：Vue Mermaid 组件图 / 架构图画法。
- `aipd-skill/src/core/knowledge/engineering/vue-provider-guide.md`：`useXxx.ts/js`、provide / inject、页面级 API 数据源和字段对齐规则。

## Case Execute 约束

- work package 如果声明 `推荐 Agent`，只在运行时已经决定派发后优先按该身份选择角色；该字段不强制创建子 Agent。
- 如果当前平台不支持对应 custom agent，`aipd-case` Execute phase 降级为 `worker/explorer + 领域指引`，不因 agent 注册失败阻塞执行。
- Vue 相关 work package 推荐使用 `aipd_vue_architect`。
- 决定派发但没有推荐 Agent 时，再根据 work package 类型和上下文路径兜底选择。
- 子 Agent 必须自己读取 work package 文件和其中明确列出的上下文文档，用它们校准任务边界和恢复锚点。
- 子 Agent 默认只向 Main Agent 回流结论、依据、风险、建议、改动文件和验证结果，不回流长过程。

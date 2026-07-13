# AIPD Dev 工程实现索引

L5 Dev 是产品功能到代码实现之间的工程实现层。它存放跨模块、跨平台、跨 skill、长期稳定的实现规则、工程约定和调试经验。

具体 skill、agent、脚本内部的局部实现细节，优先读取就近源码和 README，不塞回 L5。

L5 不是远离代码的万能实现地图。某个页面、弹窗、组件、脚本或功能局部的组件关系、数据流和入口文件，应贴近 L6 代码写到就近 README 或局部 map；L5 只沉淀多个入口共同遵守的规则，例如平台适配、Agent 调度、构建安装、跨模块协作约定和长期稳定的调试经验。

L5 也不是 case / OKR 的索引层。普通开发、找代码、查工程规则时，L5 应把 Agent 带到稳定规则、源码入口和局部 README；具体 case、当前 case 状态、OKR 执行状态和一次性执行记录只在对应流程任务中读取。

## README / docs / _adoc 分工

AIPD 仓库同时有面向用户的学习文档、面向 Agent 的项目认知和一次性 case 记录，维护时按以下边界放置内容：

- 根 `README.md`：项目首页。负责让第一次打开仓库的用户快速判断 AIPD 是什么、解决什么问题、是否继续读；保留学习入口、短版三条主线、核心能力、快速开始和源码项目入口，不承载完整思想展开。
- `docs/README.md`：面向用户的学习入口。负责给出 1-6 的推荐阅读路径，并按三条主线索引 modules。
- `docs/guide/`：面向用户的入门路径。按“问题引入 -> 三条主线 -> 第一次完整路径”组织。
- `docs/modules/`：面向用户的能力字典。按能力解释 ADOC、map、weave、OKR、Inbox、Case / Work Package、上下文解耦、构建安装等。
- `_adoc/`：面向 Agent 的项目认知事实源。Agent 执行任务时仍从 `AGENTS.md`、`_adoc/index.md`、`_adoc/map.md` 进入，不用 `docs/` 替代。
- `_adoc/case/`：一次事项的过程、状态、验收和 Close 归档候选。具体执行过程留在 case / work package，不写进面向用户的 README 或 docs。

## 当前研发策略

- Codex 优先适配，先跑通 `skills + agents + aipd-case` 的最短闭环。
- Codex 子 Agent 不是默认步骤；Main 根据上下文隔离收益、真实并发收益、主线耦合度和调度成本选择是否派发。判定值得派发、平台支持且用户未明确禁用时，无需为调度本身前置询问。
- GPT-5.6 Sol 日常交互以 High 为基线，Ultra 只用于存在多条独立工作线且可接受更长等待的任务；Ultra 自带委派与 AIPD 主动派发不能无条件叠加。
- work package 文件和显式上下文不是替代当前对话的任务源，而是用于校准边界、压缩恢复和沉淀长期事实。
- `aipd-skill/src/platforms/codex/core/agent-guide.md` 是 Codex 子 Agent 上下文、调度和降级策略的主要来源。
- `aipd-skill/src/core/agent-guides/` 存平台无关的领域执行指引。
- `aipd-skill/src/platforms/codex/agents/` 只存 Codex custom agent 打包元数据和指引引用。
- 构建脚本负责把核心指引注入 Codex agent 模板，输出到 `aipd-skill/dist/codex/agents/`。
- 安装脚本负责把 Codex agent 安装到 `~/.codex/agents/` 或目标项目 `.codex/agents/`。
- 修改 AIPD 源码后，Agent 可以直接运行 `./aipd-skill/scripts/build` 作为低风险打包验证；不要默认执行安装脚本。
- install 会改写用户级或项目级 Agent 运行环境。build 完成后，必须主动问用户是否执行 install；不能只说明“可能需要 install”。只有用户明确确认后，才执行 `./aipd-skill/scripts/install`、`./aipd-skill/scripts/install-codex`、`./aipd-skill/scripts/install-project` 或 `./aipd-skill/scripts/install-project-codex`。

## 当前已知 Agent

| Agent | 用途 | 源码 |
|---|---|---|
| `aipd_adoc_retriever` | AIPD ADOC 检索：从 L1-L5、SOP 和必要的次级流程文档中检索并压缩项目认知，保持 Main Agent 上下文干净 | 指引：`aipd-skill/src/core/agent-guides/aipd_adoc_retriever.md`；Codex 元数据：`aipd-skill/src/platforms/codex/agents/aipd_adoc_retriever.toml` |
| `aipd_product_manager` | AIPD Case Design 需求契约角色：梳理需求、规则、边界、验收标准和 `confirmed / assumed / open`，防止未确认假设被固化为工程事实 | 指引：`aipd-skill/src/core/agent-guides/aipd_product_manager.md` |
| `aipd_vue_architect` | Vue 页面、组件、样式、交互、状态组织和 AI 友好型 Vue 架构任务 | 指引：`aipd-skill/src/core/agent-guides/aipd_vue_architect.md`；Codex 元数据：`aipd-skill/src/platforms/codex/agents/aipd_vue_architect.toml` |
| `aipd_vue_provider` | Vue `useXxx.ts/js`、provide/inject、页面数据源、API 字段对齐和局部 controller 边界 | 指引：`aipd-skill/src/core/agent-guides/aipd_vue_provider.md`；Codex 元数据：`aipd-skill/src/platforms/codex/agents/aipd_vue_provider.toml` |

## ADOC 检索 Agent 调度原则

- Main 先按 map 做最小路由；已知入口少、上下文可控时直接读取，需要扫描大量项目认知或多条独立认知线时优先使用 `aipd_adoc_retriever`。
- `aipd_adoc_retriever` 是 custom agent 身份；Codex 当前不能保证 custom agent 身份和完整上下文继承同时使用，因此身份优先，不要求同时 fork 当前对话上下文。
- 判定 retriever 有明确净收益、平台支持且用户未明确禁用时，Main Agent 直接创建；用户明确禁用或平台不可用时，由 Main 回退检索。派发不扩大用户原始任务范围或外部副作用权限。
- 默认检索范围是 L1-L5 和 `_adoc/sop/`；`_adoc/inbox.md`、`_adoc/okr/`、`_adoc/case/` 属于次级流程检索，只有用户明确提到或任务明显需要时才读取。
- 派发 prompt 只传用户任务摘要、当前工作目录、必要边界和返回格式；不要复制长对话或大段 `_adoc` 正文。

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
- QlmForm、QlmSearch、table 展开、页面 README、组件图等暂时沉淀成 L5 规则或局部 README，由对应 Agent 按 work package 上下文读取；不要仅因为知识点多就继续拆身份。
- 当某个能力变成稳定基础设施，且需要独立审查或独立执行时，再考虑拆出专题 Agent；拆分依据是“执行边界稳定”，不是“知识点很多”。
- 纯前端 case 的 work package 默认按清晰架构边界切分；运行时决定派发后，角色 Agent 负责局部实现、校验、打磨和自检。高耦合内聚模块也可以由 Main 连续完成。

## Vue 按需指南

- `aipd-skill/src/core/L5-dev/vue-case-create-guide.md`：Vue 前端 case 的前置设计、work package 粒度和 Agent 推荐。
- `aipd-skill/src/core/L5-dev/vue-architecture-diagram-guide.md`：Vue Mermaid 组件图 / 架构图画法。
- `aipd-skill/src/core/L5-dev/vue-provider-guide.md`：`useXxx.ts/js`、provide / inject、页面级 API 数据源和字段对齐规则。

## Case Execute 约束

- work package 如果声明 `推荐 Agent`，只在运行时已经决定派发后优先按该身份选择角色；该字段不强制创建子 Agent。
- 如果当前平台不支持对应 custom agent，`aipd-case` Execute phase 降级为 `worker/explorer + 领域指引`，不因 agent 注册失败阻塞执行。
- Vue 相关 work package 推荐使用 `aipd_vue_architect`。
- 决定派发但没有推荐 Agent 时，再根据 work package 类型和上下文路径兜底选择。
- 子 Agent 必须自己读取 work package 文件和其中明确列出的上下文文档，用它们校准任务边界和恢复锚点。
- 子 Agent 默认只向 Main Agent 回流结论、依据、风险、建议、改动文件和验证结果，不回流长过程。

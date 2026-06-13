# AIPD2 Dev 工程实现索引

L5 Dev 是产品功能到代码实现之间的工程实现层。它存放跨模块、跨平台、跨 skill、长期稳定的实现规则、工程约定和调试经验。

具体 skill、agent、脚本内部的局部实现细节，优先读取就近源码和 README，不塞回 L5。

L5 不是远离代码的万能实现地图。某个页面、弹窗、组件、脚本或功能局部的组件关系、数据流和入口文件，应贴近 L6 代码写到就近 README 或局部 map；L5 只沉淀多个入口共同遵守的规则，例如平台适配、Agent 调度、构建安装、跨模块协作约定和长期稳定的调试经验。

## README / docs / _adoc 分工

AIPD2 仓库同时有面向用户的学习文档、面向 Agent 的项目认知和一次性 case 记录，维护时按以下边界放置内容：

- 根 `README.md`：项目首页。负责让第一次打开仓库的用户快速判断 AIPD2 是什么、解决什么问题、是否继续读；保留学习入口、短版三条主线、核心能力、快速开始和源码项目入口，不承载完整思想展开。
- `docs/README.md`：面向用户的学习入口。负责给出 1-6 的推荐阅读路径，并按三条主线索引 modules。
- `docs/guide/`：面向用户的入门路径。按“问题引入 -> 三条主线 -> 第一次完整路径”组织。
- `docs/modules/`：面向用户的能力字典。按能力解释 ADOC、map、weave、OKR、Inbox、Case / Step、上下文解耦、构建安装等。
- `_adoc/`：面向 Agent 的项目认知事实源。Agent 执行任务时仍从 `AGENTS.md`、`_adoc/index.md`、`_adoc/map.md` 进入，不用 `docs/` 替代。
- `_adoc/case/`：一次事项的过程、状态、验收和 Weave Candidate。具体执行过程留在 case / step，不写进面向用户的 README 或 docs。

## 当前研发策略

- Codex 优先适配，先跑通 `skills + agents + case-run` 的最短闭环。
- Codex 分身 Agent 默认使用 `fork_context: true`，把分身 Agent 视为从 Main Agent 当前认知 fork 出来的克隆体。
- step 文件和显式上下文不是替代当前对话的任务源，而是用于校准边界、压缩恢复和沉淀长期事实。
- `src/platforms/codex/core/agent-guide.md` 是 Codex 分身 Agent 调度策略的主要来源。
- `src/core/agent-guides/` 存平台无关的领域执行指引。
- `src/platforms/codex/agents/` 只存 Codex custom agent 打包元数据和指引引用。
- 构建脚本负责把核心指引注入 Codex agent 模板，输出到 `dist/codex/agents/`。
- 安装脚本负责把 Codex agent 安装到 `~/.codex/agents/` 或目标项目 `.codex/agents/`。
- 修改 AIPD2 源码后，Agent 可以直接运行 `./scripts/build` 作为低风险打包验证；不要默认执行安装脚本。
- install 会改写用户级或项目级 Agent 运行环境。build 完成后，必须主动问用户是否执行 install；不能只说明“可能需要 install”。只有用户明确确认后，才执行 `./scripts/install`、`./scripts/install-codex`、`./scripts/install-project` 或 `./scripts/install-project-codex`。

## 当前已知 Agent

| Agent | 用途 | 源码 |
|---|---|---|
| `aipd_vue_architect` | Vue 页面、组件、样式、交互、状态组织和 AI 友好型 Vue 架构任务 | 指引：`src/core/agent-guides/aipd_vue_architect.md`；Codex 元数据：`src/platforms/codex/agents/aipd_vue_architect.toml` |
| `aipd_vue_provider` | Vue `useXxx.ts/js`、provide/inject、页面数据源、API 字段对齐和局部 controller 边界 | 指引：`src/core/agent-guides/aipd_vue_provider.md`；Codex 元数据：`src/platforms/codex/agents/aipd_vue_provider.toml` |

## Vue Agent 调度原则

- Vue 前端实现保留一个主角色：`aipd_vue_architect`，用于组件、样式、HTML、交互和整体页面结构。
- `useXxx.ts/js`、provide / inject、页面级 API 数据源和 provider/controller 边界属于稳定执行黑箱，使用 `aipd_vue_provider`。
- QlmForm、QlmSearch、table 展开、页面 README、组件图等暂时沉淀成 L5 规则或局部 README，由对应 Agent 按 step 上下文读取；不要仅因为知识点多就继续拆身份。
- 当某个能力变成稳定基础设施，且需要独立审查或独立执行时，再考虑拆出专题 Agent；拆分依据是“执行边界稳定”，不是“知识点很多”。
- 纯前端 case 的 step 默认按文件切分；角色 Agent 负责单个文件的实现、校验、打磨和自检，Main Agent 负责确认整体图和 step 顺序。

## Vue 按需指南

- `src/core/L5-dev/vue-case-create-guide.md`：Vue 前端 case-create 的前置设计、step 粒度和 Agent 推荐。
- `src/core/L5-dev/vue-architecture-diagram-guide.md`：Vue Mermaid 组件图 / 架构图画法。
- `src/core/L5-dev/vue-provider-guide.md`：`useXxx.ts/js`、provide / inject、页面级 API 数据源和字段对齐规则。

## Case Run 约束

- step 如果声明 `推荐 Agent`，case-run 优先按该身份派发。
- 如果当前平台不支持对应 custom agent，case-run 降级为 `worker/explorer + 领域指引`，不因 agent 注册失败阻塞执行。
- Vue 相关 step 推荐使用 `aipd_vue_architect`。
- 没有推荐 Agent 时，再根据 step 类型和上下文路径兜底选择。
- 分身 Agent 必须自己读取 step 文件和 step 明确列出的上下文文档，用它们校准任务边界和恢复锚点。
- 分身 Agent 默认只向 Main Agent 回流结论、依据、风险、建议、改动文件和验证结果，不回流长过程。

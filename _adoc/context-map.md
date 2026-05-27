# AIPD2 上下文检索地图

本文件只负责引路，不承载完整正文。它把用户自然语言、AIPD 概念、skill 名、平台名路由到 L3 / L4 / L5 / case / 源码入口。

## 使用规则

- 进入具体任务前，先用本文件判断应读哪些上下文。
- 命中不清楚时，先用 `rg` 搜索核心词、skill 名、agent 名、平台名、case 名和 README，再补充上下文包。
- 本文件记录高频入口和稳定路径，不记录一次性执行细节。
- 关键路径尽量扁平暴露，不要求 Agent 层层跳转后自行发现。

## 任务路由

| 用户意图 / 关键词 | 层级判断 | 必读上下文 | 代码 / 局部入口 | 兜底搜索 |
|---|---|---|---|---|
| AIPD 方向 / 分层 / 项目认知 | L1 + L3 | `_adoc/L1-intent/intent.md`、`_adoc/index.md` | `src/core/overview.md` | `rg "L3|L4|L5|认知|上下文" src _adoc` |
| 上下文解耦 / 黑箱上移 / 决策杠杆 / AI 友好代码组织 / 提示词边界 / SOP 失效 / 扁平化检索 / 记忆存取 / AIPD 核心哲学 / AIPDR | L3 + L5 | `_adoc/L3-core/index.md`、`src/core/overview.md` | `src/core/overview.md`、`src/core/case/overview.md` | `rg "上下文解耦|黑箱上移|决策杠杆|注意力|封装|提示词|SOP|边界|潜意识|模型思维|扁平化检索|记忆|局部上下文|全局规则|黑箱|输入输出|Memory Retrieval" src _adoc` |
| 初始化 / AGENTS.md / Agent Entry | L5 | `_adoc/L5-dev/index.md`、`src/core/agent-entry/template.md` | `src/skills/aipd2/SKILL.md` | `rg "agent-entry|AGENTS|初始化" src` |
| 更新已有项目 AIPD 架构 / aipd update | L5 | `_adoc/context-map.md`、`src/core/adoc-structure.md` | `src/skills/aipd2-update/SKILL.md`、`src/core/agent-entry/template.md`、`src/core/adoc/templates/index.md` | `rg "aipd2-update|更新 AIPD|context-map|AGENTS" src _adoc` |
| 上下文检索 / 大地图 / context-map | L3 + L5 | `_adoc/context-map.md`、`src/core/adoc/templates/context-map.md` | `src/skills/aipd2/SKILL.md`、`src/skills/aipd2-case-create/SKILL.md`、`src/skills/aipd2-learn/SKILL.md` | `rg "context-map|上下文检索|检索包|观察锚点" src _adoc AGENTS.md` |
| case 创建 / 上下文索引 / step 拆分 | L4 + L5 + case | `_adoc/case/index.md`、`src/core/case/overview.md` | `src/skills/aipd2-case-create/SKILL.md`、`src/core/case/templates/case.md`、`src/core/case/templates/step.md` | `rg "case-create|上下文索引|step|候选" src _adoc/case` |
| case 执行 / 分身 Agent / fork_context | L5 + case | `_adoc/L5-dev/index.md`、相关 case `case.md` | `src/skills/aipd2-case-run/SKILL.md`、`src/platforms/codex/core/agent-guide.md` | `rg "fork_context|分身|case-run|推荐 Agent" src _adoc/case` |
| 自迭代 / learn / transcript / 观察锚点 | L5 + case | `src/skills/aipd2-learn/SKILL.md`、当前 case 的观察锚点 | `src/platforms/codex/` | `rg "观察锚点|transcript|回流|自迭代|learn" src _adoc` |
| Vue 页面 / 组件 / AI 友好前端架构 / 纯前端 case / 前端画图 / 一个文件一个 step | L5 + 局部 README | `_adoc/L5-dev/index.md`、`src/core/L5-dev/vue-case-create-guide.md`、`src/core/L5-dev/vue-architecture-diagram-guide.md`、`src/skills/aipd2-case-create/SKILL.md` | `src/platforms/codex/agents/aipd-vue-architect.toml`、`src/platforms/codex/agents/aipd-vue-provider.toml` | `rg "Vue|组件|README|aipd_vue_architect|aipd_vue_provider|纯前端|一个文件一个 step|useXxx" src _adoc` |
| Vue useXxx / provide inject / 页面数据源 / API 字段对齐 / 兜底字段 | L5 + 局部 README | `_adoc/L5-dev/index.md`、`src/core/L5-dev/vue-provider-guide.md`、`src/skills/aipd2-case-create/SKILL.md` | `src/platforms/codex/agents/aipd-vue-provider.toml` | `rg "useXxx|provide|inject|provider|API|字段|兜底|aipd_vue_provider" src _adoc` |

## 核心概念入口

| 概念 | 标准叫法 | 相关文档 | 常见误解 / 别名 |
|---|---|---|---|
| 项目认知 | ADOC / `_adoc` | `_adoc/index.md`、`src/core/adoc-structure.md` | 不等同于普通 README；它是 AI 长期上下文结构 |
| 上下文解耦 | 任务上下文解耦 | `_adoc/L3-core/index.md`、`src/core/overview.md` | 不是否定知识库和上下文检索；它主要约束人与 AI 设计任务、拆 step 和写上下文索引时的目标 |
| 黑箱上移 | 决策杠杆上移 | `_adoc/L3-core/index.md` | 不是传统封装的同义词；封装是构造黑箱的工程手段，黑箱上移是选择人类决策层级的认知策略 |
| 提示词边界 | 边界护栏 / 反例锚点 / 输出验收 | `_adoc/L3-core/index.md` | 提示词不能重训模型或稳定改写模型潜意识；更适合提供短原点、硬边界、反例和验收口径 |
| 扁平化检索 | Memory Retrieval / 大地图 + 细节 Map | `_adoc/L3-core/index.md`、`_adoc/context-map.md` | 不是取消分层维护；它要求 AI 高频读取路径尽量一跳命中，不依赖多层目录链 |
| 上下文检索地图 | `context-map` | `_adoc/context-map.md`、`src/core/adoc/templates/context-map.md` | 不承载正文，不替代 L1-L5 |
| 工程实现层 | L5 Dev | `_adoc/L5-dev/index.md`、`src/core/L5-dev/guide.md` | 不是页面代码细节全集 |
| 分身 Agent | fork 出来的 Main Agent 克隆体 | `AGENTS.md`、`src/platforms/codex/core/agent-guide.md` | 不是低上下文工人 |
| Case | 一次具体事项 | `_adoc/case/index.md`、`src/core/case/overview.md` | 不是普通任务列表 |
| Step | case 内可派发执行单元 | `src/core/case/templates/step.md` | 未确认的讨论点不要包装成 step |

## 工程规则入口

| 规则主题 | 适用范围 | 相关文档 | 代码入口 |
|---|---|---|---|
| AIPD 初始化入口 | 新项目安装 AIPD 认知壳 | `src/core/agent-entry/template.md`、`src/core/adoc/templates/index.md` | `src/skills/aipd2/SKILL.md` |
| AIPD 更新入口 | 已初始化项目同步最新 AIPD 架构 | `src/core/agent-entry/template.md`、`src/core/adoc/templates/index.md`、`src/core/adoc/templates/context-map.md` | `src/skills/aipd2-update/SKILL.md` |
| 上下文检索工作流 | 普通开发、case-create、case-run 前置取上下文 | `_adoc/context-map.md`、`src/core/adoc/templates/context-map.md` | `src/skills/aipd2/SKILL.md`、`src/skills/aipd2-case-create/SKILL.md` |
| 自迭代审计 | 从 transcript / case / 用户反馈判断 AIPD SOP 是否生效 | `src/skills/aipd2-learn/SKILL.md` | `src/platforms/codex/` |
| Codex 分身调度 | case-run 和普通探索派发 | `_adoc/L5-dev/index.md` | `src/platforms/codex/core/agent-guide.md` |

## 自迭代观察锚点

后续用 `aipd2-learn` 审计会话或 transcript 时，观察本次任务是否遵守了这些锚点：

- Agent 是否先读取 `_adoc/index.md` 和本文件，再进入 L3 / L4 / L5 / 局部 README。
- Agent 是否明确输出或内部形成了上下文包：层级判断、必读文档、代码入口、兜底搜索词、风险边界。
- 如果任务涉及 AIPD 核心概念，Agent 是否读取相关核心入口，而不是直接猜含义。
- 如果任务涉及跨模块工程规则，Agent 是否读取 L5 工程实现规则，而不是只看局部源码。
- 如果任务涉及 skill、agent、脚本内部细节，Agent 是否读取就近源码和 README。
- 如果 map 缺失或未命中，Agent 是否用 `rg` 兜底，并提出应回写到 map / index 的稳定入口。

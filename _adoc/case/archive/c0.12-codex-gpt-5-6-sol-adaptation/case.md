# Case: c0.12-codex-gpt-5-6-sol-adaptation

> **目标**：判断 Codex 新模型 “GPT-5.6 / sol / 极高”（用户当前界面称呼）的适用边界，并从近期真实对话中找出 AIPD 可降低等待时间和无效 token 消耗的规则改进方向。
> **当前 Phase**：Close（completed）

## Case Contract

### 目标

- **目标**：基于 2026-07-10 最近几次 Codex 对话的真实执行轨迹、当前可查的官方模型 / reasoning 说明和 AIPD 现有 Agent 规则，形成一份“是否使用、何时使用、如何让 AIPD 调度更快”的决策方案。
- **方向 / OKR / 项目阶段关联**：AIPD 当前处于框架自举与 Codex 优先适配阶段；新模型质量可能更高，但数分钟级响应会直接损害高频协作效率，需要把模型选择、任务路由和停止条件显式化。
- **时间盒**：30 分钟（2026-07-10 16:06 CST 起）；到时以已有证据收口，不做无限调研。

### 要做

- 审计今天最近几次可访问的 Codex 聊天，抽样记录任务类型、Agent / 工具动作、上下文读取、方案比较、等待与重复工作。
- 区分官方可证实事实、当前客户端可观察事实和仅由对话表现推断的模型内部机制。
- 判断 GPT-5.6 / sol / “极高”相对“高”更适合哪些任务，不适合哪些高频任务。
- 审计现有 `AGENTS.md`、AIPD Case / Agent 调度规则，找出可通过路由、上下文包、子 Agent、停止条件和输出契约优化的点。
- 给出按优先级排序的方案方向，并把已确认的最小调度规则应用到 AIPD Agent Entry、Case 和 Codex 平台指引。

### 不做

- 不把“极高会固定生成多套方案”当作已证实的内部实现事实。
- 不进行覆盖全部历史会话的统计学基准测试；只审计今天最近且与判断相关的有限样本。
- Think 阶段不修改源码；进入 Execute 后只修改已确认的调度规则，不顺带重写整个 Case、checkpoint、Verify 或模型配置。
- 不执行 build / install，不提交、不推送。
- 不只用主观体感下最终结论；无法取得的 token / latency 指标明确标记为缺失。

### 完成标准

- [x] 已建立近期会话样本表，并对主要 Agent 工作类型和潜在耗时源完成归类。
- [x] 已明确模型 / reasoning 模式的“官方事实 / 本地可观察 / 推断”三层边界。
- [x] 已形成“默认模式、升级到极高的触发条件、降级条件”使用建议。
- [x] 已形成 3-6 条 AIPD 优化方向，包含收益、代价、适用层和验证方式。
- [x] 已将结论写回 Think 产物和 `case.md`，等待用户决定是否进入 Design。
- [x] 已确认 Work Package 与 Agent 派发解绑定，并完成最小规则改动的 quick Design。
- [x] 已将最小调度规则写入源码与当前项目 Agent Entry，并完成构建验证。
- [x] build 后已向用户询问并完成 WP-02 对应的 Codex 用户级 install。

### 上下文索引

#### 层级判断

- **L2 Research**：涉及新模型 / reasoning 模式的公开事实和真实使用场景观察。
- **L3 Core**：涉及上下文解耦、文件优先、模型底层倾向、任务与上下文边界。
- **L4 Product**：涉及 AIPD Case、Learn、自迭代和用户可见的协作节奏。
- **L5 Dev**：涉及 Codex Agent Entry、子 Agent 调度、模型 / reasoning 路由和平台适配规则。
- **局部 README**：以 `aipd-skill/src/platforms/codex/core/agent-guide.md` 为 Codex 平台局部入口。
- **Case / 历史 Work Package**：必要时参考 c0.1 / c0.2 / c0.3 的 Agent 调度结论，不全量读取历史 Case。

#### 项目认知

- `_adoc/index.md` - 项目状态与认知入口。
- `_adoc/map.md` - 路由到模型底层倾向、Case、Learn、Agent 调度和 Codex 平台入口。
- `_adoc/L1-intent/intent.md` - 校准“效率优化”是否服务 AIPD 长期方向。
- `_adoc/L3-core/index.md` - 校准文件优先和上下文模型。
- `_adoc/L3-core/horizontal-capabilities.md` - 校准 Case、Learn、检索和子 Agent 的关系。
- `_adoc/L4-product/map.md` - 校准可落地的产品功能线。
- `_adoc/L5-dev/index.md` - 校准 Codex 工程与 Agent 调度规则。

#### 代码 / 模板入口

- `AGENTS.md` - 当前项目级 Agent Entry（含工作区未提交改动，只读审计）。
- `aipd-skill/src/core/agent-entry/template.md` - 初始化项目的持久 Agent 规则模板。
- `aipd-skill/src/platforms/codex/core/agent-guide.md` - Codex 子 Agent 上下文和调度规则。
- `aipd-skill/src/skills/aipd-case/SKILL.md` - Case 统一入口和 checkpoint 约束。
- `aipd-skill/src/skills/aipd-learn/SKILL.md` - transcript 自迭代诊断规则。

#### Phase 材料入口

- `01-think/think.md` - 调研总入口与最终方案。
- `01-think/codex-today-chat-audit/summary.md` - 今日近期聊天审计。
- `01-think/model-mode-facts/summary.md` - 模型与 reasoning 模式事实边界。
- `01-think/aipd-efficiency-audit/summary.md` - AIPD 规则效率审计与优化候选。
- `02-design/design.md` - 用户确认后才进入的方案设计入口。

#### 兜底搜索

- `rg "model|reasoning|effort|极高|高|subagent|子 Agent|checkpoint|停止条件" AGENTS.md aipd-skill/src _adoc` - 地图命中不足时定位规则。
- Codex transcript / thread index - 仅按 2026-07-10、最近会话和相关任务做有限采样。

### 边界变更记录

- 2026-07-10：用户明确要求新开 Case，以 30 分钟为目标分析当天最近几次聊天并给出优化方向；本轮只做 Think，不直接改源码。
- 2026-07-14：用户确认停止继续泛化讨论，先应用已确定结论；Case 扩展到最小规则实现。浏览器场景只保留“新流程或异常先与用户沟通”的边界，详细 SOP 与超时阈值 deferred。
- 2026-07-14：用户在 Verify 要求移除“子 Agent 授权 / 前置询问”的显式叙事；四维收益判定、用户明确禁用和外部副作用确认边界不变。

## Case Runtime

## Current Phase

Close

## Phase State

- Think: completed（2026-07-14 短暂重开后重新收口） -> `01-think/think.md`
- Design: completed / readiness passed -> `02-design/design.md`
- Execute: completed / WP-01 + WP-02 -> `03-execute/execute.md`
- Verify: passed / user accepted / merged to `main` -> `04-verify/verify.md`
- Close: completed / archived -> `05-close/close.md`

## 当前焦点

- **当前要解决的问题**：已完成；c0.12 已通过用户验收、合入 `main` 并归档。
- **当前游标**：`05-close/close.md`
- **最近 checkpoint**：PR #3 已合入 `main`（`9558a7105db2d279dc79cbe962ac697ae77fad87`）；用户确认实际使用中没有明确问题并同意收口。
- **下一步建议**：后续仅在出现明确运行时问题时新开 case，不继续占用当前活动 case。
- **压缩后恢复入口**：先读 `05-close/close.md`；验收证据见 `04-verify/verify.md`。
- **待确认项**：
  - [x] 用户已完成最终 Git 审阅并批准合并；Codex 用户级 install 已完成。
- **阻塞项**：无；详细浏览器异常阈值和模型 A/B 均不阻塞当前实现。

## 状态卡记录

- **文件事实**：现有 Agent Entry、Case 与 Codex guide 把多入口检索、文件修改和 Work Package 与子 Agent 默认派发绑定；相关文件已有用户未提交改动，Execute 必须做局部合并，不能覆盖其他变化。
- **用户认知**：Case / Goal 已能承担长期状态恢复；子 Agent 的主要价值应收敛为高噪声上下文隔离和真实并发加速。
- **冲突点**：现有“默认积极派发”与新结论冲突；浏览器异常细则尚不确定，但已明确不应无边界深入。
- **当前 phase 条件**：requirements confirmed，brownfield delta 已定位，文件边界和验收方式明确，readiness passed。
- **建议下一步**：审查 Git diff 并完成用户验收；另行确认是否 install。

## Checkpoint 记录

| 时间 | 位置 | 触发 | 已确认 / 已变化 | open / assumed | 下一步 | 恢复入口 |
|---|---|---|---|---|---|---|
| 2026-07-10 16:06 CST | Think | 调研前 / 子 Agent 派发前 | Case 目标、30 分钟时间盒、三条证据分支和不改源码边界已确定 | 精确模型标签、内部推理机制、样本可见的耗时 / token 指标仍 open | 并行采样并收口 | `01-think/think.md#调研前-checkpoint` |
| 2026-07-10 16:23 CST | Think | 三分支收口 / 时间盒停止 | 已确认当前为 Sol Ultra；4 个会话审计完成；使用建议与 P0-P2 优化方向已形成 | Sol High / Medium / Ultra 的同 prompt 质量收益仍需 A/B | 等用户确认后进入 Design | `01-think/think.md#决策结论` |
| 2026-07-14 | Think -> Design | 用户要求停止无尽讨论并先应用确定结论 | Work Package / Agent 解绑定；Main 可执行内聚模块；Child 只在上下文隔离或真实并发有收益时优先；浏览器细节 deferred | 模型 A/B、浏览器超时阈值仍 open，但不阻塞 | 进入 Execute 实现一个最小规则包 | `02-design/design.md` |
| 2026-07-14 | Design -> Execute | 用户授权一次性完成全部改动、Git 变更审查与整体验证 | Quick Design readiness passed；WP-01 由 Main 连续执行 | install 仍需 build 后单独确认 | 修改规则、审查 diff、运行 build | `03-execute/work-packages/wp-01-main-child-runtime-routing.md` |
| 2026-07-14 | Execute -> Verify | WP-01 与自动验证完成 | 源码、直接相关认知 / docs、Codex / Claude 生成物语义一致；build 通过 | 用户验收与 install 确认 pending | 用户审查整体 Git 变更 | `04-verify/verify.md` |
| 2026-07-14 | Verify -> Execute | 用户反馈要求移除子 Agent 授权叙事 | 不再显式讨论授权 / 前置询问；四维收益模型与外部副作用边界不变 | 自然调度是否增加 Child 使用率待真实观察 | 执行 WP-02 | `03-execute/work-packages/wp-02-remove-child-authorization-framing.md` |
| 2026-07-15 | Verify -> Close | PR #3 已合入 `main`；用户确认实际使用无明确问题 | Verify 全部通过，运行时长期观察不再阻塞 Close | 同 prompt A/B 与浏览器阈值继续作为后续候选 | 完成 Close 并归档 | `05-close/close.md` |

## 回跳 / 重开记录

| 时间 | 从哪里回跳 | 回到哪里 | 触发原因 | 更新内容 | 受影响下游 | 是否需用户确认 |
|---|---|---|---|---|---|---|
| 2026-07-14 | Think completed | Think | 21 分钟执行复盘暴露出“默认积极派发”和全量 fork 的反效果 | 重划 Case / Work Package、Main / Child、上下文隔离与并发加速边界 | 原 P0 调度规则和后续 Design | 已由用户确认并返回 Design |

## Think 摘要

- **状态**：completed
- **关键问题**：应该把“极高”设为默认、按任务升级，还是仅作为复杂决策复核器；AIPD 规则怎样把便宜 / 快速路径与深度路径分开。
- **调研 / 比较分支**：
  - `01-think/codex-today-chat-audit/summary.md` - 审计今天最近几次真实聊天及 Agent 动作。
  - `01-think/model-mode-facts/summary.md` - 核验模型名称、reasoning 档位和内部机制的证据边界。
  - `01-think/aipd-efficiency-audit/summary.md` - 审计 AIPD Agent Entry / 调度规则并提出优化候选。
- **决策结论**：保留 Sol High 日常基线；Work Package 与 Agent 派发解绑定。Main 可连续完成高耦合内聚模块；Child 只在高噪声上下文隔离或真正独立并发有明确净收益时优先。浏览器新流程或异常先与用户沟通，详细阈值在执行反馈中补充。

## Design 摘要

- **状态**：quick Design readiness passed。
- **模式**：docs / process，`quick`。
- **设计边界**：最小修改 Agent Entry、Codex guide、aipd-case / Execute 调度规则和当前项目对应规则；不改模型配置，不先建评测 SOP，不扩展浏览器细则。
- **计划工作包**：一个高耦合规则包，由 Main 连续实现、局部 diff 审查并运行 build。
- **当前停止点**：等待进入 Execute。

## Execute 摘要

- **执行游标**：`03-execute/work-packages/wp-02-remove-child-authorization-framing.md`。
- **状态**：completed。
- **执行方式**：Main 连续执行；不派子 Agent。
- **结果**：WP-01、WP-02 均完成；调度规则不再显式传播授权 / 前置询问概念。

## 后续候选事项

- 候选：把模型 / reasoning effort 路由固化到 Agent Entry 或 Codex 项目配置；需先确认可配置面与用户偏好。
- 候选：为 AIPD 增加“先给单一路径、仅在高风险分歧时并行比较”的深度预算规则。
- 候选：将 generic 调研 child 固定到 Terra Medium / High，并把 `fork_turns` 设为一等调度字段。
- 候选：建立 Codex transcript 评测 SOP，自动采集 turn latency、child 数、调用数、cached input 和重复证据面。

## Verify 摘要

- [x] 方案能区分日常任务、开放探索和高风险架构决策。
- [x] 方案不会用未经证实的模型内部机制作为规则依据。
- [x] 方案包含可观测的延迟 / token / 返工验证办法。

### 验收结果

- **状态**：passed。WP-02 已构建、安装并合入 `main`，用户验收通过。
- **证据**：WP-01 全部验收项通过；`git diff --check`、旧语义扫描、Codex / Claude dist 核对和 AIPD build 均通过。
- **残留风险**：缺少同 prompt A/B；浏览器阈值 deferred；这些属于后续优化候选，不阻塞本 case Close。

## Close 归档候选 / 反向编织候选

| 候选内容 | 触发来源 | 当前状态 | 候选归属 | Close 判断 |
|---|---|---|---|---|
| 模型 / reasoning effort 应按任务不确定性与错误代价路由，而不是一档全局默认 | 用户反馈 / Think | 待验证 | L5 / Agent Entry / Codex 平台规则 | 待判断 |
| Agent 应先收敛单一路径，仅在存在真实决策分叉时比较多个方案 | 用户反馈 / Think | 待验证 | core / skill / Agent Entry | 待判断 |
| Ultra 是最大推理 + 自动委派的调度模式；AIPD 不应把它当普通 effort | 官方资料 / 本地 transcript | 已确认，待设计 | L5 / Codex 平台规则 | 待判断 |
| 子 Agent 应默认最小 fork，并按角色使用较低 model / effort | 本轮自我观察 / transcript | 待 A/B | Agent Entry / Codex guide / agent TOML | 待判断 |
| 常驻 Agent Entry 与入口 Skill 应瘦身，详细规则渐进加载 | 官方 GPT-5.6 prompt guidance / 规则审计 | 待验证 | core / skill | 待判断 |
| 浏览器新流程或异常状态应先与用户沟通，避免 Agent 无边界深入和盲目绕路 | 用户反馈 / Think 重开 | 已确认最小边界，细节 deferred | Agent Entry / 浏览器执行指引 | 待真实执行反馈 |

## 自迭代观察锚点

- [x] 是否先读 map 并形成上下文包，再展开 transcript 和规则审计。
- [x] 是否把近期对话的真实动作与模型内部机制推断分开。
- [x] 是否利用子 Agent 并行采样，而不是让主 Agent 串行吞下全部噪声。
- [x] 是否在 30 分钟停止条件内收口，并避免为分析而分析。
- [x] 是否把候选建议留在 Case，未确认前不改 AIPD 源码。
- [x] 是否记录了本轮 `fork_turns="all"` + child 继承 Ultra 的自我反例。

## Close 摘要

- **状态**：completed
- **创建时间**：2026-07-10
- **归档时间**：2026-07-15
- **归档位置**：`_adoc/case/archive/c0.12-codex-gpt-5-6-sol-adaptation/`

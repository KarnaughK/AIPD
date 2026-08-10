# Case: c21-interaction-response-protocol

> **本次事项目标**：把 Agent MD 等级 2 的讨论回复协议升级为固定的五段生成顺序，让 AI 先显式复述理解，再展开关键判断，最后给出结论、横向方向和自然下一步。
> **当前 Phase**：Close

## Case Contract

### 目标

- **目标**：将 Interaction Protocol 的讨论 / 分析回复结构固定为“我理解 → 展开说说 → 结论 → 横向拓展 → 下一步”，并同步源模板、当前项目实例和构建产物。
- **方向 / OKR / 项目阶段关联**：完善 AIPD 的 Agent 协作思考协议，降低 AI 未对齐用户意图就过早输出结论、讨论结束后无法自然接回下一步的概率。

### 要做

- 固定五个模块的名称、顺序、职责和生成依赖。
- 将“我理解”定义为回复握手：复述当前目标、问题和边界，不提前夹带判断或结论。
- 将“展开说说”定义为基于用户原话与显式复述继续展开关键依据、概念关系和取舍。
- 保持“结论”位于展开之后。
- 将原“可继续追”改为“横向拓展”，与纵向向下的“下一步”明确分工。
- 为“下一步”定义不越权的行为边界：指出接下来最自然的一步，但不把建议自动解释为执行授权。
- 同步 AIPD 源模板、当前仓库已启用的 `AGENTS.md` Interaction Protocol 区块和 Codex / Claude 构建产物。
- 完成构建、分发一致性检查和定向文本验收。

### 不做

- 不改变执行 / 修改场景的交付模板。
- 不改变 Agent MD 等级 0 / 1 / 2 的选择和安装逻辑。
- 不把“展开说说”定义为输出完整、逐 token 的内部推理；只要求呈现对用户有用的关键判断、关系与取舍。
- 不让“下一步”扩大用户原始任务范围、自动授权外部副作用或强行假设当前一定有执行任务。
- 不批量改写历史归档 Case。
- 不在用户确认前执行 Codex / Claude 用户级或项目级安装。

### 完成标准

- [x] 源模板使用五个精确标题：`我理解`、`展开说说`、`结论`、`横向拓展`、`下一步`。
- [x] 模板明确前三段的顺序依赖，并禁止在“我理解”中提前形成结论。
- [x] “横向拓展”只负责相邻方向，“下一步”只负责给出一个自然向下动作。
- [x] 当前仓库 `AGENTS.md` 的已启用协议与源模板一致。
- [x] Codex / Claude 中 `aipd` 与 `aipd-update` 的四份引用产物由 build 同步。
- [x] 旧标题在当前有效源模板、当前项目实例和四份分发引用中消失。
- [x] `./aipd-skill/scripts/build` 与 `./aipd-skill/scripts/check-dist` 通过。
- [x] Case 完成 Verify 与 Close，并记录是否存在长期认知回写候选。

### 上下文索引

#### 层级判断

- **L2 Research**：不涉及外部调研；用户对真实对话摩擦的反馈就是本次需求证据。
- **L3 Core**：涉及 Agent 协作思考和显式对齐的工作方式，但本次先作为实现候选留在 Case，Close 后再判断是否回写。
- **L4 Product**：涉及 AIPD 总入口中 Agent MD 等级 2 的用户可见回复行为。
- **L5 Dev**：涉及源模板、构建注入、Codex / Claude 分发和安装边界。
- **局部 README**：`aipd-skill/README.md` 只描述 Interaction Protocol 文件职责，不需要改动具体五段结构。
- **Case / 历史 Work Package**：不读取历史 Case；本次用户讨论已形成完整需求输入。

#### 项目认知

- `_adoc/index.md` - AIPD 项目认知入口。
- `_adoc/map.md` - 命中“初始化 / AGENTS.md / Agent Entry”入口。
- `_adoc/L4-product/index.md` - AIPD 总入口与初始化的产品边界。
- `_adoc/L5-dev/index.md` - 构建、分发和安装确认边界。

#### 代码 / 模板入口

- `aipd-skill/src/core/agent-entry/interaction-style.md` - Interaction Protocol 唯一源模板。
- `aipd-skill/src/skills/aipd/SKILL.md` - 等级 2 安装入口；仅引用模板，不修改流程。
- `aipd-skill/src/skills/aipd-update/SKILL.md` - 已安装协议的更新入口；仅引用模板，不修改流程。
- `aipd-skill/scripts/build` - 将源模板注入 Codex / Claude 分发产物。
- `aipd-skill/scripts/check-dist` - 分发一致性验收。
- `AGENTS.md` - 当前仓库已启用的等级 2 Interaction Protocol 实例。

#### Phase 材料入口

- `02-design/design.md` - 需求契约、Brownfield Delta、协议边界和建议文件计划。
- `02-design/decision-log.md` - 五段结构和模块职责决策。
- `03-execute/execute.md` - 后续执行总状态。
- `04-verify/verify.md` - 后续验收记录。
- `05-close/close.md` - 后续关闭记录。

#### 兜底搜索

- `rg "AIPD Interaction Protocol|我理解你的意思是|我的判断过程|可继续追|interaction-style.md" AGENTS.md aipd-skill/src aipd-skill/dist` - 扫描协议源、实例和分发影响面。
- `rg "interaction-style|inject-from-core" aipd-skill/scripts aipd-skill/src` - 检查构建注入入口。

### 边界变更记录

- 2026-07-29：用户确认五段名称与顺序，并授权修改相关内容；用户建议按完整 Case 流程推进。未授权跳过 Design / Execute / Verify / Close Gate，也未授权安装。
- 2026-08-09：Close 后用户基于真实 `aipd-update` 使用反馈，单独授权将更新确认改为 A / B / C 互斥方案。该改动已完成构建、安装并随本轮提交，但不计入 c21 原目标或验收标准。

## Case Runtime

## Current Phase

Close

## Phase State

- Think: skipped -> `01-think/think.md`
- Design: completed -> `02-design/design.md`
- Execute: completed -> `03-execute/execute.md`
- Verify: completed -> `04-verify/verify.md`
- Close: completed -> `05-close/close.md`

## 当前焦点

- **当前要解决的问题**：已完成；Case 已回写并归档。
- **当前游标**：`05-close/close.md`
- **最近 checkpoint**：2026-08-09 用户授权安装、归档、提交和推送；Weave 回写完成，Close completed。
- **下一步建议**：无；后续按需从 archive 查阅。
- **压缩后恢复入口**：`_adoc/case/archive/c21-interaction-response-protocol/case.md`
- **待确认项**：无。
- **阻塞项**：无。

## 状态卡记录

- **文件事实**：Contract / WP / Verify / Close 全部完成；稳定产品行为已回写 L4 与 map，Case 已归档。
- **用户认知**：用户已授权安装、归档、提交和推送。
- **冲突点**：无。
- **当前 phase 条件**：Close completed。
- **建议下一步**：无。

## Checkpoint 记录

| 时间 | 位置 | 触发 | 已确认 / 已变化 | open / assumed | 下一步 | 恢复入口 |
|---|---|---|---|---|---|---|
| 2026-07-29 | Case / Design requirements | 用户确认并授权修改 | 固定五段标题和顺序；选择完整 Case 流程；Think skipped | 无需求 open | 扫描 Brownfield | `case.md#Case Contract` |
| 2026-07-29 | Design brownfield / context-boundary | 事实扫描完成 | 定位唯一源、当前实例、四份构建产物和无需修改入口 | 文件边界待用户确认 | 确认后完成 work package draft / readiness gate | `02-design/design.md#建议协议与文件边界` |
| 2026-07-29 | Design context-boundary / work-package-draft | 用户“走起”确认 | 五段行为与文件边界 confirmed；形成单一内聚 work package 草案 | work package 草案待确认 | 确认后执行 readiness gate | `02-design/design.md#Work Package 草案` |
| 2026-07-29 | Design work-package-draft / readiness-gate | 用户“继续”确认 | work package 草案 confirmed；readiness gate passed；Design completed | 无 open / assumed 阻塞项 | 确认后进入 Execute 并创建正式 work package | `02-design/design.md#Design Readiness Gate` |
| 2026-07-29 | Design -> Execute / wp-01 | 用户“继续”确认 Execute Gate | Current Phase 切换为 Execute；创建正式 work package 和执行前 checkpoint | 无 | Main Agent 连续执行、构建、检查 | `03-execute/work-packages/wp-01-upgrade-interaction-response-protocol.md` |
| 2026-07-29 | Execute / wp-01 completed | 修改、build 与检查完成 | 源模板、当前实例和四份产物同步；build / `check-dist` / 定向检查通过 | install 未授权 | 确认后进入 Verify | `03-execute/work-packages/wp-01-upgrade-interaction-response-protocol.md#执行记录` |
| 2026-07-29 | Execute -> Verify | 用户确认并授权安装 | Current Phase 切换为 Verify；install 仅在 Verify passed 后执行 | 无 | 验收后安装并验证 | `04-verify/verify.md` |
| 2026-07-29 | Verify completed / install | 系统验收与安装完成 | Contract / WP / Guardrails 全部通过；Codex 9 Skill + 3 Agent 已安装并核验 | 无 | 确认后进入 Close | `04-verify/verify.md#验收结果` |
| 2026-07-29 | Verify -> Close | 用户确认 | Current Phase 切换为 Close；完成长期认知与 archive 引用审计 | Weave 方案待确认 | 确认后回写、复核并归档 | `05-close/close.md` |
| 2026-08-09 | Close -> Archive | 用户授权安装、归档、提交和推送 | Weave 回写 L4 / map；Close completed；后续 A / B / C 更新确认优化作为独立改动记录 | 无 | 归档后提交并推送 | `_adoc/case/archive/c21-interaction-response-protocol/case.md` |

## 回跳 / 重开记录

| 时间 | 从哪里回跳 | 回到哪里 | 触发原因 | 更新内容 | 受影响下游 | 是否需用户确认 |
|---|---|---|---|---|---|---|

## Think 摘要

- **状态**：skipped
- **关键问题**：无阻塞级外部事实或技术路线问题。
- **调研 / 比较分支**：无。
- **决策结论**：用户讨论和当前代码扫描足以直接进入 Design。

## Design 摘要

### Design 模式

- **模式**：quick
- **理由**：这是 docs / process 类型的低风险模板调整；需求明确、源入口唯一、无后端 / 前端 / 数据设计。

### 当前 Design 节点

- **当前节点**：readiness-gate
- **节点状态**：completed
- **本节点要回答的问题**：已确认的需求、文件边界、work package 和验收口径是否足以安全进入 Execute。
- **本节点停止点**：Readiness Gate 已通过；等待用户确认 Execute Phase Gate。
- **下一节点建议**：Execute / `wp-01-upgrade-interaction-response-protocol`。
- **节点 checkpoint**：2026-07-29 用户已确认 work package 草案；readiness gate passed。

### 需求契约

- **入口**：`02-design/design.md`
- **状态**：ready
- **confirmed**：五段标题依次为“我理解 / 展开说说 / 结论 / 横向拓展 / 下一步”；首段固定做复述握手；结论在展开之后；横向与向下分开。
- **assumed**：继续保留当前“简单事实问答可自然短答”的例外；本次不改变执行 / 修改回复模板。
- **open**：无阻塞级需求 open。
- **不允许固化的假设**：
  - 不把“下一步”解释成自动执行授权。
  - 不把“展开说说”写成要求披露完整内部推理。

### 领域规则 / 边缘场景

- “我理解”只能复述当前目标、问题和边界，不能偷带评价或结论。
- “展开说说”基于用户原话和显式复述，呈现必要的关键判断、概念关系与取舍。
- “横向拓展”最多列 3 个相邻方向，只列标题，不展开。
- “下一步”优先只给 1 个自然向下动作；可以是继续讨论、确认、实现或验证，不强行假设存在执行任务。
- 用户未授权执行时，“下一步”只能建议或请求确认，不能扩大任务范围。

### Brownfield Delta

- **入口**：`02-design/design.md`
- **ADDED**：讨论模板新增“下一步”模块及其行为规则。
- **MODIFIED**：源模板讨论段；当前仓库 `AGENTS.md` 的已启用协议；build 生成的四份引用产物。
- **REMOVED**：当前有效协议中的旧标题“我理解你的意思是 / 我的判断过程 / 可继续追”。
- **不能破坏的旧行为**：讨论不自动升级执行、执行 / 修改回复模板、简单事实短答例外、长答触发、Agent MD 等级与安装确认边界。

### 后端 / 数据 / API 设计

- **入口**：skipped
- **底层事实源**：docs / config
- **摘要**：无运行时数据、API 或状态机变化。

### 前端 / UX / 状态设计

- **入口**：skipped
- **摘要**：无 UI 变化；五段标题属于 Agent 输出协议。

### 复杂度爆点

- 只改标题会遗漏首段禁止结论、前三段生成依赖、横向与下一步职责以及不越权边界，导致新模板看似更新但行为仍不稳定。

### 最小必要解耦

- 源模板作为唯一协议事实源；当前 `AGENTS.md` 是已启用实例；所有 dist 引用只由 build 生成，不手工维护。

### 文件 / 文件夹计划

- `aipd-skill/src/core/agent-entry/interaction-style.md` - 修改五段模板与行为规则。
- `AGENTS.md` - 同步当前仓库已启用的 Interaction Protocol 区块。
- `aipd-skill/dist/{codex,claude}/skills/{aipd,aipd-update}/references/agent-entry/interaction-style.md` - 由 build 生成，不手改。
- `_adoc/case/c21-interaction-response-protocol/` - 承接设计、执行、验收和关闭状态。
- `_adoc/case/index.md` - 维护本 Case 状态。

### 架构边界 / 护栏

- 不修改 `aipd` / `aipd-update` 的安装、审计和同步流程；它们继续读取同一模板。
- 不修改 `aipd-skill/README.md`，因为它只声明文件职责，不复制具体结构。
- 不手改 dist；build 是唯一同步路径。
- 不在 Execute 前回写 L3 / L4 / L5 长期认知；Close 后再判断 Weave 候选。

### Readiness Gate

- **入口**：`02-design/design.md`
- **状态**：passed
- **阻塞项**：无。
- **可带入 Execute 的风险**：无。

## Execute 摘要

- **当前执行游标**：`03-execute/work-packages/wp-01-upgrade-interaction-response-protocol.md`
- **最近执行 checkpoint**：2026-07-29 `wp-01` completed；实现和构建检查通过，等待 Verify。

- [x] `03-execute/work-packages/wp-01-upgrade-interaction-response-protocol.md` - 同步五段协议源、当前实例、分发产物并完成构建验收（推荐 Agent：Main Agent）

- 是否把“显式复述 → 展开 → 结论”的回复握手模型沉淀为 L3 Agent 协作思考认知；Close 后再判断。
- 是否在未来单独评估简单短答是否也需要五段压缩版；本 Case 不改变当前例外。

## Verify 摘要

- [x] 五段标题、顺序和行为规则定向检查。
- [x] 当前 `AGENTS.md` 与源模板区块一致。
- [x] Codex / Claude 四份引用产物与源模板一致。
- [x] build 与 `check-dist` 通过。
- [x] Codex 9 个 Skill 与 3 个 Agent 安装成功，目标安装文件与源 / dist 一致。

### 验收结果

- **状态**：passed
- **残留风险**：无；其他进行中 Case 的工作区改动未纳入本 Case 归属。

## Close 归档候选 / 反向编织候选

| 候选内容 | 触发来源 | 当前状态 | 候选归属 | Close 判断 |
|---|---|---|---|---|
| 显式复述作为回复握手，先对齐再展开并形成结论 | 用户讨论 / Design / Execute / Verify | 已完成可评估 | L3 / L4 | 已回写 L4；暂不扩张为 L3 核心模型 |
| 横向拓展与自然下一步是两个独立收尾职责 | 用户讨论 / Design / Execute / Verify | 已完成可评估 | L4 / Agent Entry 局部规则 | 已回写 L4 与 map |

## Close 摘要

- **状态**：completed / archived
- **归档时间**：2026-08-09
- **Weave 结果**：已更新 `_adoc/L4-product/index.md`、`_adoc/L4-product/map.md` 与 `_adoc/map.md`。
- **归档位置**：`_adoc/case/archive/c21-interaction-response-protocol/`

## 自迭代观察锚点

> 后续用 `aipd-learn` 审计 transcript / session / 执行记录时，检查 Agent 是否按这些锚点执行。

- [ ] Agent 是否读取 `_adoc/map.md`，或说明其缺失并使用 `rg` / README 兜底。
- [ ] Agent 是否读取本 case 上下文索引中的 L3 / L4 / L5 / 局部 README。
- [ ] Case 是否使用 contract + phase-first 目录结构，而不是回到顶层 `doc/` / `steps/` / `01-goal/`。
- [ ] 恢复 case 后是否先输出状态卡，没有直接跨 phase 推进。
- [ ] Think 阶段是否以分支目标推进，并明确结论回流位置。
- [ ] Design 阶段是否找到了复杂度爆点，并产出文件 / 文件夹级架构边界。
- [ ] Design 阶段是否先处理需求契约、confirmed / assumed / open、后端 / 前端设计，再做上下文解耦。
- [ ] Design / Execute / Verify 发现上游缺口时，是否记录了回跳原因、更新 artifact 和受影响下游。
- [ ] Design 产物是否经用户确认后才创建正式 Execute work package。
- [ ] 大调研、长执行、子 Agent 派发、phase 跳转和用户确认后，是否写了 checkpoint，而不是只留在聊天里。
- [ ] 压缩后恢复入口是否足以让新 Agent 判断当前游标、已确认结论、open / assumed 和下一步。
- [ ] Work Package 是否只放在 `03-execute/work-packages/`，并按架构边界横向铺模块。
- [ ] Verify 是否检查了设计护栏，没有只看代码是否运行。
- [ ] 如果执行偏离 SOP，能否判断偏离原因：提示词未执行 / map 缺失 / map 命中不清 / skill 流程不够硬 / 文档结构问题。

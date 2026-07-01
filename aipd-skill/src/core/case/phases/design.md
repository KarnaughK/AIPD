# Case Phase: Design

Design phase 负责把 case 从模糊目标推进到 Agent 可执行、可验收、可恢复的方案。

核心认知：

> Design 不是直接写数据库、接口、组件或文件夹。Design 要先固定需求契约和领域规则，再设计底层事实源、后端 contract、前端状态，最后做 AIPD 特有的上下文解耦和文件 / 文件夹级边界。

原有“复杂度爆点、最小必要解耦、横向铺模块”仍然成立，但它不再是 Design 的唯一内容。它发生在需求、规则、后端和前端设计足够清楚之后，用来决定怎样让执行 Agent 低上下文推进，而不是纵向堆版本。

## Design 不是线性锁链

Case 有一条默认推进主线，但运行时不是单向瀑布：

```text
Case Contract
-> Think
-> Design
-> Execute
-> Verify
-> Close
```

Design 内部也有默认顺序：

```text
Design Intake
-> Product / Requirement Contract
-> Domain Rule & Edge Case Elicitation
-> Existing System / Brownfield Delta Scan
-> Backend / Data / API Design
-> Frontend / UX / State Design
-> Context Decoupling & File Boundary Design
-> Work Package / Task Slicing
-> Design Readiness Gate
```

这条顺序是导航，不是锁链，也不是一次性自动跑完的 checklist。Design 的价值不只是让 Agent 产出一套文档，而是让用户在每个关键工程固化点前快速做决策。

## Design 逐步协作 Gate

当用户说“一步一步走 / 继续吧 / 按你说的步骤来 / 逐段梳理”时，默认含义是进入逐节点协作模式，而不是授权 Agent 一次性完成 Design 全流程。

逐节点协作模式下：

- 每次只推进当前 Design 节点，例如 requirements、domain rules、brownfield、backend、frontend、context boundary、work package draft 或 readiness gate。
- 当前节点最多输出：事实依据、关键判断、可选方案、推荐方案、风险、需要用户确认的问题、建议写回位置。
- 如果当前节点会固化需求、领域规则、API contract、数据模型、状态机、UI 主路径、组件边界、文件边界或 work package，必须停下来等待用户确认。
- 用户确认当前节点后，才进入下一节点。不要把“继续吧”解释成一次性跑完后续所有节点；它只授权推进当前已经展示的下一节点。
- 如果只是低风险事实整理、格式修复或把已确认结论同步到 `case.md` / `02-design/design.md`，可以直接写回，但写回后仍应停在当前节点状态卡。
- 每个节点结束后，如果结论会影响后续恢复路径，先写 checkpoint：当前节点、节点状态、已确认结论、assumed / open、停止点、下一节点建议和相关 artifact。写完后再进入下一节点或等待确认。
- 如果用户明确说“直接把 6 步都整理完 / 一次性跑完整个 Design / 不用逐步确认”，才可以批量推进多个 Design 节点；即便如此，不能跨入 Execute 或创建正式 work package，除非 readiness gate 后另行确认。

Design 节点完成时，回复应包含：

- 当前节点结论。
- 已写回 artifact。
- 是否存在 `open` 或 `assumed`。
- 下一节点是什么。
- 需要用户确认什么。

对应 artifact 中也必须保留同样的恢复信息，不能只写在聊天回复里。压缩后新的 Agent 应能从 `case.md` 和 `02-design/{artifact}.md` 判断当前 Design 游标。

任何下游节点发现上游缺口时，都必须回跳到对应节点修正：

- 数据库设计暴露新需求：回到 Requirements Contract。
- API contract 暴露规则冲突：回到 Domain Rules。
- 前端状态暴露后端字段缺口：回到 Backend Design。
- 文件边界无法切出 work package：回到 Context Boundary。
- 设计需要外部事实、竞品资料、代码实验或数据采样：回到 Think，创建 `01-think/{branch}/` 调研分支，收口后再回 Design。

回跳时必须记录：

- 触发原因。
- 新发现的问题。
- 需要更新的上游 artifact。
- 哪些下游设计或 work package 因此失效。
- 是否需要用户确认目标、边界或验收标准变化。

不要把回跳发现的新需求偷偷混进后端、前端或 Execute。

## Design Intake

进入 Design 时先判断本 case 适合哪种模式。

### Case 类型

- new feature。
- bugfix。
- refactor。
- frontend-only。
- backend-only。
- docs / process。
- research-to-implementation。

### Design 模式

- `full`：全栈新功能或复杂重构。
- `backend-first`：数据、API、业务规则是最大风险。
- `frontend-first`：用户体验、状态、组件边界是最大风险。
- `bugfix`：高风险 bug 修复。
- `quick`：低风险小改。

### Intake 要回答

- 缺口是需求不清、现有系统不清、技术路线不清，还是执行边界不清？
- 是否有阻塞级 open question？
- 是否需要外部调研、代码实验或回到 Think？
- 需要哪些角色：Product Manager、Domain Analyst、Backend Architect、UX Designer、Frontend Architect、Context Architect、Implementation Planner？
- 需要哪些 artifact：requirements、edge cases、brownfield、backend、frontend、context、readiness？

## Product / Requirement Contract

Design 先检查需求和规则是否足够支撑工程设计。

需求项必须标注状态：

- `confirmed`：用户已明确，或项目事实已经证明。
- `assumed`：为了推进草案暂定，但尚未确认。
- `open`：不澄清会影响后端、前端、数据或执行边界。

如果存在会改变数据库字段、API contract、状态机或 UI 主路径的 `open` 问题，不应继续进入后端 / 前端设计。

### Product Manager / Requirements Steward

Product Manager / Requirements Steward 负责：

- 把用户自然语言转成需求契约。
- 主动追问目标用户、使用场景、业务规则、反例、边缘状态和验收标准。
- 维护 `confirmed / assumed / open`。
- 明确不允许下游固化的假设。
- 不做技术架构，不写代码。

### 输出

- problem / goal / non-goal。
- users / roles。
- functional requirements。
- non-functional requirements。
- scope in / out / deferred。
- acceptance criteria。
- confirmed / assumed / open。
- assumptions not to freeze。

复杂 case 可写入 `02-design/requirements-contract.md`；轻量 case 可内嵌在 `02-design/design.md`。

## Domain Rules & Edge Cases

需求契约之后，专门处理会被工程结构固化的业务规则。

必须检查：

- 状态和状态流转。
- 权限和角色差异。
- 成功、失败、部分成功。
- 创建、编辑、删除、取消、重试、超时、重复提交。
- 并发、幂等、审计、日志、通知。
- 历史数据、脏数据、迁移数据。
- 哪些规则必须由后端保证，哪些可以由前端体验承接。

复杂 case 可写入 `02-design/edge-cases.md`。

## Existing System / Brownfield Delta

AIPD 大多数 case 是修改现有系统。Design 必须先知道本 case 改变什么。

输出：

- 当前实现事实。
- 受影响 L3 / L4 / L5 / README / L6 入口。
- delta scope：ADDED / MODIFIED / REMOVED。
- 不能破坏的旧行为。
- root cause / behavior contract，适用于 bugfix。

如果这里需要继续查资料、跑实验或读大量代码，可回到 Think 创建调研分支。调研收口后再回 Design 更新 `02-design/brownfield-delta.md` 或 `design.md`。

回到 Think 前，先在当前 Design artifact 或 `02-design/design.md` 记录调研前 checkpoint：触发问题、调研边界、停止条件、返回位置和哪些下游设计暂时不得固化。

## Backend / Data / API Design

先识别底层事实源：

- database。
- file。
- external API。
- event。
- domain object。
- UI state。
- docs / config。
- mixed。

开发类 case 通常需要回答：

- 数据模型 / 数据对象 / 文件格式。
- 主键、唯一约束、索引和数据不变量。
- 读写路径。
- API request / response / error contract。
- 缓存 key、模型版本、幂等和一致性边界。
- 鉴权、安全、审计和日志边界。

Backend Design 不能把 `assumed` 或 `open` 的产品规则写成字段、接口或状态机事实。如果后端设计暴露新需求，回到 Requirements Contract 或 Domain Rules。

复杂 case 可写入 `02-design/backend-design.md`。

## Frontend / UX / State Design

AIPD 不默认承担完整视觉创意，但必须承担前端工程契约：

- 信息架构。
- 用户流程。
- 交互状态：empty、loading、success、error、disabled、dirty、submitted、retry、permission denied、partial success。
- 前端状态来源、生命周期和提交边界。
- 组件边界。
- 数据加载、提交、错误和回滚策略。
- 视觉参考、截图验证、Storybook stories、Playwright E2E / visual QA 等验证入口。

如果前端设计暴露后端 contract 缺口，应回到 Backend Design，而不是由前端猜字段兜底。

复杂 case 可写入 `02-design/frontend-design.md`。

## Context Decoupling & File Boundary Design

在需求、后端事实源和前端状态稳定后，再做 AIPD 特有设计：

- 哪些上下文应局部自包含。
- 哪些重复是为了降低上下文跳转而允许的。
- shared / domain / utils 的上移条件。
- 文件 / 文件夹计划。
- 每个执行 Agent 的最小必读上下文。
- 什么改法会把复杂度重新堆回主干。

这里保留原有复杂度爆点认知：

- 复杂度爆点是什么？
- 最小必要解耦是什么？
- 主干职责是什么？
- 横向模块如何接入？
- 特殊节点是什么？

复杂 case 可写入 `02-design/context-boundary.md`。

## 故事原型：垒高楼 vs 二层小洋楼

旧的 step 思路像垒高楼：

```text
第一版：先做 list
第二版：在 list 上加分页
第三版：在分页上加搜索
第四版：在搜索上加筛选
```

这种方式会诱导 Agent 在旧地基上继续叠逻辑。每新增一层都可能要回头改底层；改底层时又要保证旧功能不坏，最后容易变成纵向堆版本。

新的 Design 思路应像向外平摊的二层小洋楼：先找到复杂度爆点，给爆点一个可横向接入的结构，再让后续模块在同一架构边界内各自扩展。

## Work Package / Task Slicing

Work Package 是可验收目标包，不是微步骤。

每个 work package 应包含：

- 目标。
- Design 输入 artifact。
- 不允许固化的假设。
- 文件 / 文件夹边界。
- 验收标准。
- 不做范围。
- 推荐 Agent。
- 依赖关系和可并行 wave。

Design phase 只规划 work package，不直接执行。正式 work package 在 Execute phase 写入 `03-execute/work-packages/`。

## Design Readiness Gate

进入 Execute 前必须检查：

- 是否仍有阻塞级 `open` requirement？
- 是否有 `assumed` 被写进字段、接口、状态机或 UI 事实？
- 是否知道本 case 改变了哪些现有代码 / 规则 / 文档入口？
- 后端 contract 是否能支撑前端状态？
- 前端状态是否暴露新的后端缺口？
- 文件 / 文件夹边界是否足够让执行 Agent 低上下文推进？
- work package 是否按可验收目标包切，而不是微步骤？
- Verify 是否知道要检查哪些设计护栏？

Gate 状态：

- `passed`：可以创建正式 work package。
- `concerns`：可以进入有限 Execute，但风险必须写入 work package。
- `failed`：不能进入 Execute，应回到 Think 或 Design。
- `pending`：尚未检查。

复杂 case 可写入 `02-design/readiness-gate.md`。

## Artifact 模型

所有 case 都应有 `02-design/design.md`。复杂 case 可按需展开：

- `requirements-contract.md`
- `edge-cases.md`
- `brownfield-delta.md`
- `backend-design.md`
- `frontend-design.md`
- `context-boundary.md`
- `readiness-gate.md`
- `decision-log.md`

不要因为流程节点存在就默认创建所有文件。只有当该节点产生可恢复、可复查、会被后续阶段引用的材料时，才拆出独立文件。

## 输出

写入 `02-design/design.md`，并把摘要同步到 `case.md`：

- Design mode。
- Current Design node / node status / stop point / next suggested node。
- Latest checkpoint：最近一次确认、当前游标、下一步和压缩后恢复入口。
- Requirements status。
- Domain rules / edge cases。
- Brownfield delta。
- Backend / Data / API design。
- Frontend / UX / State design。
- Context boundary。
- Work package draft。
- Readiness gate。
- Backtrack / re-open records。

决策记录写入 `02-design/decision-log.md`。

## 下一 phase 判断

- Readiness Gate `passed`：向用户汇报设计状态卡，确认后进入 Execute 并创建正式 work package。
- Readiness Gate `concerns`：向用户说明风险，确认后可有限进入 Execute，并把不允许固化的假设写入 work package。
- Readiness Gate `failed`：停留 Design 或回到 Think / Case Contract 修正。
- 设计过程中缺少外部事实、代码实验或资料验证：回到 Think 创建分支，收口后再回 Design。

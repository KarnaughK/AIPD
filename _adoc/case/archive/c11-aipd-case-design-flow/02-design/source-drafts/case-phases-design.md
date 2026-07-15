# Draft: `aipd-skill/src/core/case/phases/design.md`

> 本文件是源码草稿，不是已应用源码。用于后续 Execute work package 审稿和裁剪。

# Case Phase: Design

Design phase 负责把 case 从模糊目标推进到 Agent 可执行、可验收、可恢复的 work package。

核心认知：

> Design 不是直接写数据库、接口、组件或文件夹。Design 要先固定需求契约和领域规则，再设计底层事实源、后端 contract、前端状态，最后做 AIPD 特有的上下文解耦和文件 / 文件夹级边界。

原有“复杂度爆点、最小必要解耦、横向铺模块”仍然成立，但它不是 Design 的第一步。它发生在需求和规则足够清楚之后，用来决定怎样让执行 Agent 低上下文推进，而不是纵向堆版本。

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
- 是否需要外部调研或回到 Think？
- 需要哪些角色：Product Manager、Domain Analyst、Backend Architect、UX Designer、Frontend Architect、Context Architect、Implementation Planner？
- 需要哪些 artifact：requirements、edge cases、brownfield、backend、frontend、context、readiness？

## Product / Requirement Contract

Design 先检查需求和规则是否足够支撑工程设计。

需求项必须标注状态：

- `confirmed`：用户已明确，或项目事实已经证明。
- `assumed`：为了推进草案暂定，但尚未确认。
- `open`：不澄清会影响后端、前端、数据或执行边界。

如果存在会改变数据库字段、API contract、状态机或 UI 主路径的 `open` 问题，不应继续进入后端 / 前端设计。

### 输出

- problem / goal / non-goal。
- users / roles。
- functional requirements。
- non-functional requirements。
- scope in / out / deferred。
- acceptance criteria。
- confirmed / assumed / open。
- assumptions not to freeze。

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

## Existing System / Brownfield Delta

AIPD 大多数 case 是修改现有系统。Design 必须先知道本 case 改变什么。

输出：

- 当前实现事实。
- 受影响 L3 / L4 / L5 / README / L6 入口。
- delta scope：ADDED / MODIFIED / REMOVED。
- 不能破坏的旧行为。
- root cause / behavior contract，适用于 bugfix。

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

Backend Design 不能把 `assumed` 或 `open` 的产品规则写成字段、接口或状态机事实。

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

## 输出

写入 `02-design/design.md`，并把摘要同步到 `case.md`。

小 case 可以只写 `design.md`；复杂 case 可按需展开：

- `requirements-contract.md`
- `edge-cases.md`
- `brownfield-delta.md`
- `backend-design.md`
- `frontend-design.md`
- `context-boundary.md`
- `readiness-gate.md`
- `decision-log.md`

Design phase 只规划 work package，不直接执行。正式 work package 在 Execute phase 写入 `03-execute/work-packages/`。

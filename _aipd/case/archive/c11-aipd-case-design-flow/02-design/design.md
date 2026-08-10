# Design: AIPD Case Design Flow

## 状态

draft

本文件记录 AIPD Case Design phase 的新流程草案。第一轮外部参考已经完成，方案吸收 Spec Kit、Kiro、OpenSpec、Superpowers、BMAD、Agent OS、PM-Skills 等项目，但不直接复制任何单一工具。

## 核心判断

Design phase 不应只是“复杂度爆点 + 文件 / 文件夹级架构”。对 AI 辅助开发来说，Design 是从需求契约到可执行 work package 的大流程。

新的 Design phase 应承担两类职责：

1. **通用开发设计**：把模糊需求变成产品规则、后端契约、前端体验和实现任务。
2. **AIPD 特有设计**：在通用设计之后，应用上下文解耦，形成适合 Agent 执行的文件 / 文件夹级边界。

完整推荐方案摘要见 `02-design/proposal.md`。

## 建议流程

```text
0. Design Intake
1. Product / Requirement Contract
2. Domain Rule & Edge Case Elicitation
3. Existing System / Brownfield Delta Scan
4. Backend / Data / API Design
5. Frontend / UX / State Design
6. Context Decoupling & File Boundary Design
7. Work Package / Task Slicing
8. Design Readiness Gate
```

## 0. Design Intake

Design 开始时先判断本 case 是否已经具备进入设计的条件。

### 要回答

- 这是新功能、bugfix、重构、实验，还是产品方向探索？
- 当前缺口是需求不清、技术路线不清、现有系统不清，还是执行边界不清？
- 是否需要外部调研或代码事实扫描？
- 本轮需要哪些角色：Product Manager、UX Designer、Backend Architect、Frontend Architect、Implementation Planner？

### 输出

- Design 运行模式：full / backend-first / frontend-first / quick。
- 本轮必读上下文。
- 需要激活的角色。
- 继续 Design / 回到 Think 的判断。

## 1. Product / Requirement Contract

Design 开始时，先检查需求和规则是否足够明确。

需要区分：

- confirmed：已经确认，可以固化进表结构、接口、状态机或 UI。
- assumed：暂定假设，允许用于草案，但不能伪装成已确认事实。
- open：待讨论问题，阻塞下游设计。

如果规则契约不清，Design 应停在需求澄清，不继续细化数据库、接口、状态机或 work package。

### Product Manager 角色

Product Manager / Requirements Steward 应在这一段主导：

- 把用户自然语言转成需求契约。
- 主动追问目标用户、使用场景、业务规则、反例、边缘状态和验收标准。
- 明确 confirmed / assumed / open。
- 明确 Always / Ask first / Never。
- 不做技术架构决策，不写代码。

## 2. Domain Rule & Edge Case Elicitation

需求契约之后，专门处理容易被工程结构固化的业务规则。

### 要回答

- 状态有哪些？状态如何流转？
- 哪些用户 / 角色 / 权限会影响行为？
- 什么是成功、失败、部分成功、取消、重试？
- 是否有历史记录、审计、数据保留或合规要求？
- 哪些规则必须由后端保证，哪些可以由前端体验承接？

### 停止点

如果这些规则仍是 open，不应继续设计表字段、API contract 或 UI 状态机。

## 3. Existing System / Brownfield Delta Scan

AIPD 大多数真实项目不是空白项目。Design 必须先知道本 case 改变什么。

### 输出

- 当前实现事实。
- 受影响的 L3 / L4 / L5 / README / L6 入口。
- delta scope：ADDED / MODIFIED / REMOVED。
- 兼容约束和不能破坏的旧行为。

## 4. Backend / Data / API Design

先问本 case 的底层事实源是什么：

- 数据库表 / 数据对象。
- 文件格式。
- 外部 API contract。
- 领域对象和不变量。
- 事件流。
- UI 状态机。

事实源不同，后续设计顺序不同。

开发类 case 中，后端设计通常包括：

- 数据库 / 数据对象。
- 主键、唯一约束、索引和数据不变量。
- 读写路径。
- API request / response contract。
- 缓存 key、模型版本、幂等和一致性边界。
- 鉴权、安全、错误处理和日志边界。

### Backend Architect 角色

Backend Architect 应检查：

- 字段、表、接口是否隐含未确认产品规则。
- API contract 是否足够支撑前端状态和用户反馈。
- 缓存 / 幂等 / 一致性是否会改变用户可见行为。

## 5. Frontend / UX / State Design

前端设计至少应覆盖：

- 信息架构和页面 / 区块结构。
- 用户流程和交互状态。
- 前端状态来源、生命周期和提交边界。
- 组件边界。
- 数据加载、空态、错误态和 loading。
- UI 视觉设计是否需要外部参考 / 视觉 Agent / 截图验证。

### UX Designer 角色

UX Designer 应在规则逻辑和接口边界稳定后参与：

- 梳理用户流程、页面结构和反馈机制。
- 输出体验行为，不负责最终代码实现。
- 对视觉风格、布局、截图验证提出要求。

### Frontend Architect 角色

Frontend Architect 应把 UX 和 API contract 转成：

- 前端状态来源和生命周期。
- 组件边界。
- 数据加载、提交、错误和回滚策略。
- 页面 / 模块上下文包。

## 6. Context Decoupling & File Boundary Design

在需求、后端事实源和前端状态稳定后，再决定：

- 哪些上下文应局部自包含。
- 哪些重复是为了降低上下文跳转而允许的。
- 哪些 shared / domain 抽象必须等真实复用出现后再上移。
- 文件 / 文件夹如何组织，执行 Agent 每次应加载哪些最小上下文。

这是 AIPD 相比通用 spec-driven 工具的关键增量。通用工具停在 requirements / design / tasks，AIPD 要进一步问：什么文件边界最适合 AI Agent 低上下文修改和并行执行。

## 7. Work Package / Task Slicing

Work package 不按“先做后端、再加前端、再补验证”的微步骤机械堆叠，而应围绕已经确认的架构边界形成可验收目标包。

### Implementation Planner 角色

Implementation Planner 只在设计已确认后介入：

- 把设计切成 work package。
- 标注依赖关系和并行性。
- 写清每个 work package 的上下文、验收标准和不做范围。
- 不补需求、不重做架构。

## 8. Design Readiness Gate

Verify 需要检查：

- 是否有未确认规则被写成了代码事实。
- 是否按事实源推导了后端和前端设计。
- 是否破坏上下文解耦。
- 是否把复杂度重新堆回主干。
- 是否仍有阻塞级 open requirements。
- 后端 contract 是否能支撑前端状态。
- 前端状态是否反向暴露后端缺口。
- work package 是否可派发、可验收、可恢复。

只有通过 gate，才能进入 Execute 并创建正式 work package。

## 角色方案

| 角色 | 进入时机 | 输入 | 输出 | 禁止事项 |
|---|---|---|---|---|
| Product Manager / Requirements Steward | Design 0-2 | 用户目标、Case Contract、L3/L4、竞品/场景资料 | 需求契约、规则表、open questions、验收标准 | 不做技术架构，不写代码 |
| Domain Analyst | Design 2 | 业务规则、历史 case、领域资料 | 状态、边界、反例、权限和异常路径 | 不把假设写成事实 |
| Backend Architect | Design 3-4 | 需求契约、现有代码、L5、技术约束 | 数据模型、API contract、缓存、安全、错误边界 | 不跳过产品规则确认 |
| UX Designer | Design 5 | 需求契约、用户流程、规则、API 草案 | 信息架构、交互状态、视觉参考和验证建议 | 不替代前端实现 |
| Frontend Architect | Design 5-6 | UX、API contract、现有页面 | 状态模型、组件边界、页面上下文包 | 不用猜测字段兜底 |
| Implementation Planner | Design 7-8 | 完整设计草案 | work package 切片和 readiness gate | 不补需求、不扩大范围 |

详见 `02-design/role-system.md`。

## Artifact 模型

Design phase 应采用“主文档 + 可选展开 artifact”的结构。`design.md` 保持入口和摘要，复杂内容拆入：

- `requirements-contract.md`
- `edge-cases.md`
- `brownfield-delta.md`
- `backend-design.md`
- `frontend-design.md`
- `context-boundary.md`
- `readiness-gate.md`

并按 case 复杂度选择 `full / backend-first / frontend-first / bugfix / quick` 模式。详见 `02-design/artifact-model.md`。

## 前端设计边界

AIPD 不默认承担完整视觉创意，但必须承担前端设计的工程契约部分：信息架构、用户流程、交互状态、前端状态模型、组件边界和验证入口。需要视觉创意、Figma、高保真稿、品牌表达或复杂动效时，Design 应明确标注外部 UI / 视觉能力需求。

详见 `02-design/frontend-design-boundary.md`。

## Product Manager Agent 草案

Product Manager / Requirements Steward 应作为第一批新增 Agent 指引。它的关键职责不是“写 PRD”，而是阻止下游设计把未确认的业务规则固化成数据库字段、API contract、状态机、UI 文案或 work package。

详见 `02-design/product-manager-agent-guide-draft.md`。

## Readiness Gate 草案

Design -> Execute 必须有明确 gate：

- `passed`：可以创建正式 work package。
- `concerns`：可以进入有限 Execute，但必须把风险写入 work package。
- `failed`：回到 Think 或 Design 对应步骤。
- `pending`：尚未检查。

详见 `02-design/readiness-gate.md`。

## 对源码修改的建议

- `aipd-skill/src/core/case/phases/design.md`：主改，替换/扩展 Design phase 结构。
- `aipd-skill/src/core/case/overview.md`：同步 Case 总览，避免仍把 Design 简化成复杂度爆点。
- `aipd-skill/src/core/case/templates/case.md`：Design 摘要增加需求契约、事实源、后端设计、前端设计、readiness gate。
- `aipd-skill/src/core/case/templates/work-package.md`：要求 work package 引用需求契约和设计护栏。
- `aipd-skill/src/core/agent-guides/aipd_product_manager.md`：新增 PM / Requirements Steward 指引。
- `aipd-skill/src/core/agent-guides/`：后续可补 Backend Architect / UX Designer / Frontend Architect 指引。

详见 `02-design/source-change-plan.md`。

## 待确认

- 前端视觉设计在 AIPD Case Design 中的职责边界。
- 是否需要为纯后端、纯前端、全栈功能分别提供 Design 样板。
- 是否把 requirements / design / tasks 的外部范式吸收为 AIPD Design 的标准参考。

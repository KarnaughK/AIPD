# Role System Draft

## 核心判断

AIPD Case Design phase 需要角色，但不应默认拉起完整团队。角色的作用是把 Design 里的不同认知任务分开，避免一个 Agent 同时扮演 PM、架构师、UX 和执行者，导致需求假设、技术设计和任务拆分互相污染。

角色不是组织职位，而是 Design 中可调用的认知模块。

## 角色总览

| 角色 | 触发条件 | 输入 | 输出 | 停止条件 |
|---|---|---|---|---|
| Product Manager / Requirements Steward | 需求、规则、目标用户、验收标准不清 | 用户原始目标、Case Contract、L3/L4、外部场景 | requirements contract、open questions、confirmed/assumed/open、acceptance criteria 草案 | 需求足够支撑后端 / 前端设计；仍不清则停留 Design 或回 Think |
| Domain Analyst | 业务规则复杂，存在状态、权限、生命周期、边界条件 | 需求契约、领域资料、历史 case | domain rules、edge-case catalog、failure/recovery paths | 阻塞级规则已确认或明确 open |
| Backend Architect | 涉及数据、API、缓存、安全、外部服务 | 需求契约、domain rules、现有 L5 / 代码入口 | backend-design、data model、API contract、cache/security/error boundaries | 不再出现未确认产品规则被固化进字段 / 接口 |
| UX Designer | 涉及用户路径、页面结构、交互反馈、视觉判断 | 需求契约、domain rules、API 草案、竞品 / 参考 | UX flow、information architecture、interaction states、visual validation needs | 用户行为和状态反馈足够支撑前端架构 |
| Frontend Architect | 涉及页面状态、组件、前端数据流 | UX flow、API contract、现有页面 / 组件 | frontend-state-design、component boundary、page context package | 前端状态不再依赖猜字段或隐藏业务规则 |
| Context Architect | 需要 AI 低上下文执行、横向并行、避免全局耦合 | 后端 / 前端设计、代码入口、L5 规则 | context boundary、file/folder plan、shared/domain extraction rules | 执行 Agent 的最小上下文包清楚 |
| Implementation Planner | 设计已基本确认，需要进入 Execute | 完整 Design artifacts、readiness gate | work package draft、dependency waves、verification plan | work package 可派发、可验收、可恢复 |

## Product Manager / Requirements Steward

### 职责

- 把用户自然语言转成工程前可用的需求契约。
- 主动追问需求中的边缘节点、反例、异常路径和验收口径。
- 维护 `confirmed / assumed / open`，防止 Agent 把 assumed 当事实。
- 给 Backend / Frontend / UX 提供稳定输入。

### 必问维度

- 用户 / 角色：谁在用？谁受影响？是否有权限差异？
- 目标 / 动机：为什么现在做？解决哪个问题？
- 主路径：成功路径是什么？
- 边界：什么不做？什么暂缓？什么永远不应该发生？
- 状态：对象有哪些状态？状态如何流转？
- 异常：失败、重试、取消、超时、并发、重复提交怎么处理？
- 数据：哪些数据必须保存？哪些只在前端临时存在？
- 验收：什么情况下算完成？如何测试？

### 输出结构

```md
## Requirements Contract

### Problem / Goal

### Users / Roles

### Functional Requirements

### Non-functional Requirements

### Domain Rules

### Edge Cases

### Acceptance Criteria

### Scope

#### In
#### Out
#### Deferred

### Confirmation Table

| Item | Status | Evidence / Owner | Blocks |
|---|---|---|---|
| ... | confirmed / assumed / open | ... | backend / frontend / execute |
```

## UX Designer

### 职责边界

UX Designer 在 AIPD 中不负责完整视觉创意，也不替代图形设计工具。它负责把需求规则转成用户可见流程和状态。

### 输出

- 用户路径。
- 页面 / 区块信息架构。
- 交互状态：empty、loading、success、error、disabled、submitted、retry。
- 反馈机制：toast、inline error、modal、redirect、progress。
- 视觉参考需求：需要截图、竞品参考、生成图、设计系统或 Playwright visual QA。

## Backend Architect

### 职责边界

Backend Architect 不能先写数据库字段再倒推需求。它必须从需求契约和 domain rules 推导底层事实源。

### 输出

- fact source：数据库、文件、外部 API、事件流或领域对象。
- data model。
- API contract。
- cache / idempotency / consistency。
- auth / security / audit。
- error taxonomy。

## Frontend Architect

### 职责边界

Frontend Architect 不能用兜底字段掩盖接口不确定性，也不能把后端未确认规则搬到前端自行判断。

### 输出

- 页面上下文包。
- state model。
- component boundary。
- data loading / mutation path。
- UI state to API contract mapping。

## Context Architect

### 职责边界

这是 AIPD 特有角色。通用设计完成后，它判断如何让 Agent 低上下文执行。

### 输出

- 一个接口 / 页面 / 功能是否应自包含。
- 哪些文件可以局部重复。
- shared / domain 上移条件。
- 执行 Agent 每个 work package 最小必读上下文。

## Implementation Planner

### 职责边界

只在 Design artifacts 通过 readiness gate 后出现。它不补需求，不重做架构，只把设计转成 work package。

### 输出

- work package list。
- dependency waves。
- each package: goal, input artifacts, file boundary, acceptance criteria, not-do scope, verification.

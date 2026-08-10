# Design Artifact Model

## 核心判断

Design phase 应该有一个主文档和若干可选展开 artifact。不是每个 case 都要生成所有文件，但复杂 case 必须能把信息分层，否则 `design.md` 会膨胀成不可恢复的大杂烩。

## 主文档

### `02-design/design.md`

所有 case 都应该有。

职责：

- 记录 Design 当前状态。
- 说明本 case 使用哪种 Design 模式。
- 汇总关键结论。
- 链接展开 artifact。
- 给出 readiness gate 状态。

不承载：

- 大段调研证据。
- 完整边缘场景表。
- 详细 API schema。
- 长 UI 文案或视觉参考。

## 可选展开 artifact

| Artifact | 何时生成 | 主导角色 | 作用 |
|---|---|---|---|
| `requirements-contract.md` | 需求、规则或验收标准不够稳定 | Product Manager | 固定需求契约、scope、confirmed/assumed/open、验收标准 |
| `edge-cases.md` | 存在复杂错误、边界、并发、恢复路径 | Domain Analyst / PM | 系统性列出 failure surface 和 recovery path |
| `brownfield-delta.md` | 修改现有系统 | ADOC Retriever / Architect | 记录现有事实、受影响入口、ADDED/MODIFIED/REMOVED |
| `backend-design.md` | 涉及后端、数据、API、缓存、安全 | Backend Architect | 数据事实源、data model、API contract、cache/security/error |
| `frontend-design.md` | 涉及页面、组件、前端状态 | UX + Frontend Architect | 信息架构、交互状态、状态模型、组件边界 |
| `context-boundary.md` | 需要 AI 并行执行或上下文解耦 | Context Architect | 文件 / 文件夹边界、上下文包、shared 上移条件 |
| `readiness-gate.md` | 进入 Execute 前 | Implementation Planner / Main Agent | 检查是否允许创建 work package |
| `decision-log.md` | 有重要取舍 | Main Agent / Architect | 记录决策、理由、状态和影响 |

## Design 模式

### Full

适合全栈新功能或复杂重构。

最小 artifact：

- `requirements-contract.md`
- `brownfield-delta.md`
- `backend-design.md`
- `frontend-design.md`
- `context-boundary.md`
- `readiness-gate.md`

### Backend-first

适合后端事实源和规则是最大风险的 case。

最小 artifact：

- `requirements-contract.md`
- `edge-cases.md`
- `backend-design.md`
- `context-boundary.md`
- `readiness-gate.md`

### Frontend-first

适合体验、状态、页面结构是最大风险的 case。

最小 artifact：

- `requirements-contract.md`
- `frontend-design.md`
- `context-boundary.md`
- `readiness-gate.md`

### Bugfix

适合修复高风险 bug。

最小 artifact：

- `brownfield-delta.md`
- root cause / behavior contract section in `design.md`
- `readiness-gate.md`

### Quick

适合低风险小改。

最小 artifact：

- `design.md` 内嵌需求、设计、验证和文件边界。
- readiness gate 也内嵌，不额外建文件。

## Artifact 之间的依赖

```text
requirements-contract
  -> edge-cases
  -> backend-design
  -> frontend-design
  -> context-boundary
  -> readiness-gate
  -> execute work packages
```

Brownfield case 需要在 backend / frontend 之前补：

```text
brownfield-delta
  -> backend-design / frontend-design
```

## Readiness Gate 必查项

- 是否仍有阻塞级 `open` 需求。
- 是否有 `assumed` 被写进字段、接口、状态机或 UI 事实。
- 是否知道本 case 改变了哪些现有代码 / 规则 / 文档入口。
- 后端 contract 是否能支撑前端状态。
- 前端状态是否暴露新的后端缺口。
- 文件 / 文件夹边界是否足够让执行 Agent 低上下文推进。
- work package 是否按可验收目标包切，而不是微步骤。
- Verify 是否知道要检查哪些设计护栏。

## 对 AIPD 源码的影响

后续如果写回，应考虑：

- `case/phases/design.md`：加入 Design 模式、artifact 模型和 readiness gate。
- `case/templates/case.md`：Design 摘要引用 artifact，而不是塞全部正文。
- `case/templates/work-package.md`：要求 work package 引用相关 Design artifact。
- `agent-guides/`：新增 PM / Requirements Steward，后续按需要新增其他角色。

## 与外部项目的对应关系

| AIPD Artifact | 外部参考 | 吸收点 |
|---|---|---|
| `requirements-contract.md` | Spec Kit spec / clarify、BMAD PRD、PM-Skills PRD / acceptance criteria | 把需求、scope、验收和 open question 放在技术设计之前 |
| `edge-cases.md` | PM-Skills edge cases、Spec Kit edge cases | 系统性处理失败、边界、恢复和并发，不把异常路径留到 Execute 猜 |
| `brownfield-delta.md` | OpenSpec change folder / delta specs、Kiro bugfix specs | 先描述现有行为和改动差异，再设计实现 |
| `backend-design.md` | Spec Kit plan 的 data-model / contracts、Kiro design | 让数据事实源、API contract 和错误处理成为 Design 的正式产物 |
| `frontend-design.md` | BMAD UX、Kiro design、Cline Plan mode | 把用户路径、交互状态和组件边界放到实现前 |
| `context-boundary.md` | Superpowers implementation plan、AIPD 原有上下文解耦 | 让低上下文执行者能按文件边界行动 |
| `readiness-gate.md` | BMAD implementation readiness、Spec Kit checklist | 进入 Execute 前检查需求、设计和 work package 是否可执行 |

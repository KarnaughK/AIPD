# AIPD Case Design Phase Proposal

## 一句话结论

把 AIPD Case Design phase 从“找复杂度爆点并设计文件边界”升级为“需求契约 -> 领域规则 -> Brownfield Delta -> 后端设计 -> 前端设计 -> 上下文解耦 -> Work Package -> Readiness Gate”的完整开发设计流程。

原有复杂度爆点和文件 / 文件夹级边界不删除，而是成为后半段的 AIPD 特有增量：当需求、后端和前端设计足够稳定后，再决定怎样让 Agent 低上下文、横向执行。

## 推荐流程

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

## 推荐模式

| 模式 | 使用场景 | 最小产物 |
|---|---|---|
| `full` | 全栈新功能、复杂重构 | requirements、brownfield、backend、frontend、context、readiness |
| `backend-first` | 数据、API、业务规则是最大风险 | requirements、edge-cases、backend、context、readiness |
| `frontend-first` | 用户体验、状态、组件边界是最大风险 | requirements、frontend、context、readiness |
| `bugfix` | 高风险 bug 修复 | brownfield、root cause / behavior contract、readiness |
| `quick` | 低风险小改 | `design.md` 内嵌需求、文件边界、验证 |

## 推荐角色

第一批只建议新增一个正式 Agent 指引：

- `aipd_product_manager.md`：Product Manager / Requirements Steward。

它负责：

- requirements contract。
- confirmed / assumed / open。
- edge cases。
- acceptance criteria。
- open questions。
- assumptions not to freeze。

暂不急着新增全部角色。Backend Architect、UX Designer、Frontend Architect、Context Architect、Implementation Planner 可以先写在 Design phase 规则里，等真实 case 使用后再逐步沉淀 agent-guide。

## 推荐 Artifact

`design.md` 是入口，不承载所有细节。复杂 case 按需展开：

- `requirements-contract.md`
- `edge-cases.md`
- `brownfield-delta.md`
- `backend-design.md`
- `frontend-design.md`
- `context-boundary.md`
- `readiness-gate.md`
- `decision-log.md`

## 前端设计边界

AIPD 不默认承担完整视觉创意，但必须承担前端工程契约：

- 信息架构。
- 用户流程。
- 交互状态。
- 前端状态模型。
- 组件边界。
- 视觉 / 截图 / E2E 验证入口。

需要 Figma、高保真视觉、品牌表达、复杂动效或生成图时，Design 应明确提出外部 UI / 视觉能力需求。

## 源码改造路径

按以下顺序执行：

1. 改 `aipd-skill/src/core/case/phases/design.md`。
2. 改 `aipd-skill/src/core/case/overview.md`。
3. 改 `aipd-skill/src/core/case/templates/case.md`。
4. 改 `aipd-skill/src/core/case/templates/work-package.md`。
5. 新增 `aipd-skill/src/core/agent-guides/aipd_product_manager.md`。
6. 检查是否需要同步 `aipd-skill/src/skills/aipd-case/SKILL.md`。
7. build。
8. build 后询问用户是否 install。

## 最重要的取舍

### 1. 不复制外部工具链

Spec Kit、Kiro、OpenSpec、BMAD、PM-Skills 都有价值，但 AIPD 已经有 case / ADOC / work package 结构。应吸收方法，不搬目录和命令。

### 2. PM 不是写长 PRD

PM 角色第一版的价值是 Requirements Steward：澄清需求、标记假设、阻止错误事实被固化。不是让每个 case 写组织级 PRD。

### 3. 轻量模式必须存在

如果所有 case 都强制生成完整 artifact，AIPD 会变慢。`quick` 和 `bugfix` 模式必须是一等公民。

### 4. AIPD 的独特增量在上下文解耦

通用工具通常止步于 requirements / design / tasks。AIPD 要继续问：什么文件边界最适合 Agent 低上下文修改、恢复和并行执行。

## 当前建议

可以把 Think 结论视为基本稳定。下一步建议进入 Design phase 精修，并在用户确认后创建正式 Execute work package 修改源码。

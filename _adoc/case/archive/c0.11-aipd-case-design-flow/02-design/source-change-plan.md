# Source Change Plan

## 目标

本文件把 c0.11 的 Design phase 方案落到 AIPD 源码修改清单。它不是执行记录；真正改源码前仍需用户确认，并在 Execute phase 创建正式 work package。

## 改造原则

1. **先扩展 Design 认知，再改模板**
   - `case/phases/design.md` 是规则本体，应先改这里。
   - `overview.md` 和 templates 只同步入口与结构，避免模板和 phase 规则互相打架。

2. **保留 AIPD 原有优势**
   - 复杂度爆点、最小解耦、文件 / 文件夹级边界仍然是 AIPD 的关键增量。
   - 新流程不是替换它们，而是把它们后移到需求契约、后端 / 前端设计之后，作为进入 Execute 前的 AI 上下文设计。

3. **artifact 渐进生成**
   - 小 case 只写 `design.md`。
   - 复杂 case 才展开 `requirements-contract.md`、`backend-design.md`、`frontend-design.md` 等文件。

4. **角色作为认知模块，不作为固定组织结构**
   - 先新增 Product Manager / Requirements Steward 指引。
   - Backend / UX / Frontend / Context / Planner 指引可后续按实际 case 继续补。

## 源码修改清单

| 文件 | 修改目标 | 风险 |
|---|---|---|
| `aipd-skill/src/core/case/phases/design.md` | 把 Design 从“复杂度爆点 -> 文件边界”扩展为“Design Intake -> Requirements Contract -> Domain Rules -> Brownfield Delta -> Backend -> Frontend -> Context Boundary -> Work Package -> Readiness Gate” | 主规则变长，需避免把所有 case 变重 |
| `aipd-skill/src/core/case/overview.md` | 同步生命周期说明：Design 是从需求到架构再到上下文解耦的流程，不只是架构设计 | 需要保留原有横向平摊故事，避免丢失 AIPD 特色 |
| `aipd-skill/src/core/case/templates/case.md` | Design 摘要增加模式、需求契约、事实源、后端 / 前端 / 上下文边界、readiness gate 链接 | 模板过长会降低可用性，需要只放摘要 |
| `aipd-skill/src/core/case/templates/work-package.md` | Work Package 增加输入 artifact：requirements contract、backend/frontend design、context boundary、readiness gate | 需要避免小 work package 填表负担过重 |
| `aipd-skill/src/core/agent-guides/aipd_product_manager.md` | 新增 PM / Requirements Steward 指引，负责需求契约、规则、边缘场景、验收标准 | 新 Agent 指引若太泛，会变成空洞产品文档 |
| `aipd-skill/src/skills/aipd-case/SKILL.md` | 如有必要，提示 Design phase 进入时读取新的 phase 规则和 artifact 模型 | 当前可能无需改，先审查后决定 |

## `design.md` 建议新结构

```md
# Case Phase: Design

## 核心认知

Design 的目标是把 case 从模糊需求推进到可执行、可验收、可恢复的 work package。
它先固定需求和规则，再设计底层事实源、后端 contract、前端状态，最后做 AIPD 特有的上下文解耦和文件 / 文件夹级边界。

## Design Intake

- 判断 case 类型：new feature / bugfix / refactor / research / docs / frontend-only / backend-only。
- 判断模式：full / backend-first / frontend-first / bugfix / quick。
- 判断需要激活的角色和 artifact。
- 判断是否需要回 Think 补调研。

## Requirements Contract

...

## Domain Rules & Edge Cases

...

## Brownfield Delta

...

## Backend / Data / API Design

...

## Frontend / UX / State Design

...

## Context Boundary

...

## Work Package Slicing

...

## Readiness Gate

...
```

## Case 模板建议新增字段

### Design 摘要

- **Design 模式**：full / backend-first / frontend-first / bugfix / quick
- **需求契约**：`02-design/requirements-contract.md` / 内嵌摘要 / skipped
- **底层事实源**：database / file / API / event / UI state / docs / mixed
- **后端设计**：`02-design/backend-design.md` / skipped
- **前端设计**：`02-design/frontend-design.md` / skipped
- **上下文边界**：`02-design/context-boundary.md` / 内嵌摘要
- **Readiness Gate**：passed / concerns / failed / pending

## Work Package 模板建议新增字段

```md
## Design 输入

- Requirements Contract：...
- Domain Rules / Edge Cases：...
- Backend Design：...
- Frontend Design：...
- Context Boundary：...
- Readiness Gate：passed / concerns

## 不允许固化的假设

- {仍是 assumed/open 的事项，执行时不能写成字段、接口或 UI 事实}
```

## 分阶段执行建议

### WP1: Phase 规则改造

- 修改 `case/phases/design.md`。
- 修改 `case/overview.md`。
- 验证：阅读一致性，无构建需求。

### WP2: 模板改造

- 修改 `case/templates/case.md`。
- 修改 `case/templates/work-package.md`。
- 验证：新建 case 模板仍能读懂，Design 摘要不膨胀。

### WP3: Product Manager Agent 指引

- 新增 `agent-guides/aipd_product_manager.md`。
- 如需路由，修改相关 map / L5 规则。
- 验证：PM 指引能输出 requirements contract、confirmed/assumed/open、open questions 和 acceptance criteria。

### WP4: 文档一致性和 build

- 检查 `aipd-case` skill 入口是否需要同步。
- 运行 build。
- build 后询问用户是否 install。

## 源码草稿

后续 Execute 可先审阅以下草稿，再应用到真实源码：

- `02-design/source-drafts/case-phases-design.md`
- `02-design/source-drafts/aipd_product_manager.md`
- `02-design/source-drafts/template-sections.md`

## 验收标准

- Design phase 明确要求先澄清需求和规则，再做后端 / 前端设计。
- Design phase 支持轻量模式，不把小 case 强行流程化。
- 新模板能引用可选 artifact，不要求每次生成所有文件。
- Product Manager 指引能阻止 Agent 把未确认需求写成工程事实。
- Work Package 能继承 Design artifact 和不允许固化的假设。
- AIPD 原有的上下文解耦、横向 work package、文件 / 文件夹级边界被保留并强化。

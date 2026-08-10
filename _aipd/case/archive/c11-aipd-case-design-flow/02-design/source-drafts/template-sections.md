# Draft: Template Sections

> 本文件是源码草稿，不是已应用源码。用于后续改 `case.md` 和 `work-package.md` 模板时裁剪。

## Case Template: Design 摘要

```md
## Design 摘要

> 详细内容写入 `02-design/design.md`。Design 是从需求契约到可执行 work package 的流程：先固定需求和规则，再设计后端 / 前端，最后做 AIPD 特有的上下文解耦和文件 / 文件夹级边界。

### Design 模式

- **模式**：full / backend-first / frontend-first / bugfix / quick
- **理由**：{为什么选择这个模式}

### 需求契约

- **入口**：`02-design/requirements-contract.md` / 内嵌摘要 / skipped
- **状态**：ready / concerns / blocked
- **不允许固化的假设**：
  - {仍是 assumed/open 的事项}

### 底层事实源

- database / file / external API / event / domain object / UI state / docs / mixed

### 后端设计

- **入口**：`02-design/backend-design.md` / skipped
- **摘要**：{data model / API contract / cache / auth / error boundary}

### 前端设计

- **入口**：`02-design/frontend-design.md` / skipped
- **摘要**：{information architecture / interaction states / state model / component boundary / visual QA}

### 上下文边界

- **入口**：`02-design/context-boundary.md` / 内嵌摘要
- **复杂度爆点**：{...}
- **最小必要解耦**：{...}
- **文件 / 文件夹计划**：{...}

### Readiness Gate

- **入口**：`02-design/readiness-gate.md` / 内嵌摘要
- **状态**：passed / concerns / failed / pending
- **结论**：{是否允许进入 Execute}
```

## Work Package Template: Design 输入

```md
## Design 输入

执行前必须读取：

- Requirements Contract：`{path}` / skipped
- Domain Rules / Edge Cases：`{path}` / skipped
- Brownfield Delta：`{path}` / skipped
- Backend Design：`{path}` / skipped
- Frontend Design：`{path}` / skipped
- Context Boundary：`{path}` / `02-design/design.md`
- Readiness Gate：passed / concerns

## 不允许固化的假设

> 这些事项仍是 `assumed` 或 `open`。执行 Agent 不得把它们写成字段、接口、状态机、UI 文案或长期规则。

- {假设 1}

## 设计依据

- 复杂度爆点：{...}
- 解耦方式：{...}
- 主干职责：{...}
- 特殊节点：{...}
- 文件 / 文件夹边界：{...}
```

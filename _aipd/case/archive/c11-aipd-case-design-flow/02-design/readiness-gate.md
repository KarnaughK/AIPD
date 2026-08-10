# Design Readiness Gate Draft

## 目标

Readiness Gate 用来判断一个 case 的 Design 是否可以进入 Execute。它不是“文档是否写满”的检查，而是检查下游执行 Agent 是否会把未确认需求、错误架构或不清楚的上下文边界固化进代码。

## Gate 状态

- `passed`：可以创建正式 work package。
- `concerns`：可以进入有限 Execute，但必须把风险写入 work package 的“不允许固化的假设”。
- `failed`：不能进入 Execute，应回到 Think 或 Design 的对应步骤。
- `pending`：尚未检查。

## 检查表

### 需求契约

- [ ] 目标、要做、不做、验收标准清楚。
- [ ] 需求项标注了 `confirmed / assumed / open`。
- [ ] 没有阻塞级 `open` 项进入后端字段、API、状态机或 UI 主路径。
- [ ] acceptance criteria 能被 Verify 使用。

### 规则和边缘场景

- [ ] 状态、权限、异常、取消、重试、并发、重复提交等关键路径已被判断。
- [ ] 必须由后端保证的规则和可由前端体验承接的规则已区分。
- [ ] 仍未确认的规则已列入 `Assumptions Not To Freeze`。

### Brownfield Delta

- [ ] 已知道当前系统中相关行为 / 代码 / 文档入口。
- [ ] 已标注 ADDED / MODIFIED / REMOVED。
- [ ] 已知道不能破坏的旧行为。

### Backend / Data / API

- [ ] 已识别底层事实源：database / file / external API / event / domain object / UI state / mixed。
- [ ] data model 或数据对象没有隐藏未确认产品规则。
- [ ] API request / response / error contract 能支撑前端状态。
- [ ] 权限、安全、缓存、幂等、一致性和日志边界按风险处理。

### Frontend / UX / State

- [ ] 用户主路径、空态、loading、错误、成功、禁用、重试等状态已覆盖。
- [ ] 前端状态来源、生命周期和提交边界清楚。
- [ ] UI 状态没有依赖后端未承诺字段。
- [ ] 如需要视觉设计或截图验证，已列入 Verify 或单独 work package。

### Context Boundary

- [ ] 文件 / 文件夹边界能让执行 Agent 低上下文推进。
- [ ] shared / domain / utils 上移条件清楚。
- [ ] 允许的局部重复和禁止的过早抽象清楚。
- [ ] 什么改法会把复杂度堆回主干已经写明。

### Work Package

- [ ] work package 是可验收目标包，不是微步骤。
- [ ] 每个 work package 有目标、输入 artifact、上下文、验收标准、不做范围。
- [ ] 依赖关系和可并行 wave 清楚。
- [ ] Verify 知道如何检查设计护栏。

## 输出格式

```md
## Readiness Gate

- 状态：passed / concerns / failed / pending
- 结论：...

### 阻塞项

- ...

### 可带入 Execute 的风险

- ...

### 不允许固化的假设

- ...

### 允许创建的 Work Package

- ...
```

# Work Package: cA.B.N - {工作包名称}

> **所属 Case**: cA.B-{name}
> **Phase**: Execute
> **类型**: dev / research / review / verify / docs
> **推荐 Agent**: worker / explorer / aipd_vue_architect / aipd_vue_provider / 留空
> **依赖**: 无 / {前置 work package 或 02-design/design.md}

## 目标

{一句话描述这个工作包要交付什么结果。}

## 设计依据

> 写清本工作包依赖的 Design 结论。不要只写“按设计执行”，要说明复杂度爆点、解耦点和不能破坏的架构边界。

- Requirements Contract：`{path}` / skipped
- Domain Rules / Edge Cases：`{path}` / skipped
- Brownfield Delta：`{path}` / skipped
- Backend Design：`{path}` / skipped
- Frontend Design：`{path}` / skipped
- Context Boundary：`{path}` / `02-design/design.md`
- Readiness Gate：passed / concerns
- 复杂度爆点：{例如 API 参数组装 / 跨组件状态同步 / 权限判断 / 外部服务调用}
- 解耦方式：{例如每个 Filter 自治产出 postValue}
- 主干职责：{例如 Controller 只管触发搜索，不管业务数据}
- 特殊节点：{例如 Pagination 是特殊 Filter}
- 文件 / 文件夹边界：{本工作包涉及哪些目录和文件，职责是什么}

## 不允许固化的假设

> 这些事项仍是 `assumed` 或 `open`。执行 Agent 不得把它们写成字段、接口、状态机、UI 文案或长期规则。

- {假设 1}

## 横向模块

> 这里可以列多个模块。它们不是顺序微步骤，而是同一架构边界下可以横向铺开的工作项。

- [ ] {模块 1}
- [ ] {模块 2}
- [ ] {模块 3}

## 上下文文档

执行前必须读取：

- `{case.md}`
- `{02-design/design.md 或 case.md Design 摘要}`
- `{02-design/requirements-contract.md / backend-design.md / frontend-design.md / context-boundary.md / readiness-gate.md，如存在}`
- `{相关 L3 / L4 / L5 / README / 代码入口}`

## 执行前 checkpoint

> 长执行、子 Agent 派发、批量验证或目标模式运行前先填写。checkpoint 只保留恢复所需的信息，不复制聊天全文。

- **当前目标**：{本轮执行具体要交付什么}
- **恢复入口**：{case.md / execute.md / 本 work package / 相关 design artifact}
- **执行边界**：{允许修改 / 不允许修改}
- **预期输出**：{改动文件 / 结论 / 验证结果 / 风险}
- **停止条件**：{完成 / 阻塞 / 发现设计缺口 / 需要用户确认}
- **返回位置**：{执行后写回哪里，是否进入 Verify / 回到 Design / 回到 Think}

## 验收标准

- [ ] {目标结果可见或可验证}
- [ ] {新增横向模块没有把复杂度堆回主干}
- [ ] {设计护栏没有被破坏}
- [ ] {必要测试 / 构建 / 人工检查通过}

## 不做

- {明确不做的事情}
- {防止 Agent 顺手重构或扩大范围}

## 执行记录

**状态**：pending / in_progress / completed / blocked / canceled

**完成时间**：{YYYY-MM-DD}

**主要改动**：
- {改动 1}

**验证结果**：
- {验证 1}

**执行后 checkpoint**：
- **当前结论**：{完成 / 部分完成 / 阻塞 / 需要回跳}
- **下一步**：{继续执行 / Verify / 回 Design / 回 Think / 等用户确认}
- **恢复入口**：{下一个 Agent 应读取的文件和小节}

**遇到的问题**：{无 / 描述}

**回跳 / 重开**：
- {如果执行发现需求、设计、上下文或验收标准不成立，写明应回到 Case Contract / Think / Design 的哪个 artifact}

**Weave 候选**：
- {是否产生新核心概念、产品边界、工程规则、局部 README 入口或 map 入口}

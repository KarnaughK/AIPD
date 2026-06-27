# Work Package: cA.B.N - {工作包名称}

> **所属 Case**: cA.B-{name}
> **Phase**: Execute
> **类型**: dev / research / review / verify / docs
> **推荐 Agent**: worker / explorer / aipd_vue_architect / aipd_vue_provider / 留空
> **依赖**: 无 / {前置 work package 或 03-design/design.md}

## 目标

{一句话描述这个工作包要交付什么结果。}

## 设计依据

> 写清本工作包依赖的 Design 结论。不要只写“按设计执行”，要说明复杂度爆点、解耦点和不能破坏的架构边界。

- 复杂度爆点：{例如 API 参数组装 / 跨组件状态同步 / 权限判断 / 外部服务调用}
- 解耦方式：{例如每个 Filter 自治产出 postValue}
- 主干职责：{例如 Controller 只管触发搜索，不管业务数据}
- 特殊节点：{例如 Pagination 是特殊 Filter}

## 横向模块

> 这里可以列多个模块。它们不是顺序微步骤，而是同一架构边界下可以横向铺开的工作项。

- [ ] {模块 1}
- [ ] {模块 2}
- [ ] {模块 3}

## 上下文文档

执行前必须读取：

- `{case.md}`
- `{03-design/design.md 或 case.md Design 摘要}`
- `{相关 L3 / L4 / L5 / README / 代码入口}`

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

**遇到的问题**：{无 / 描述}

**Weave 候选**：
- {是否产生新核心概念、产品边界、工程规则、局部 README 入口或 map 入口}

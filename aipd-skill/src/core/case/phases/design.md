# Case Phase: Design

Design phase 负责把目标设计成 Agent 可执行、可验收、可横向扩展的结构。

核心认知：

> Design 的目标不是完整抽象所有概念，而是找到复杂度爆点，并对爆点做最小必要解耦，让后续执行可以横向铺模块，而不是纵向堆版本。

## 复杂度爆点

先问：这个需求真正会变复杂的节点在哪里？

不要默认把页面、接口、组件、状态、渲染、控件、数据源全部抽象一遍。Design 只处理本 case 的主要复杂度爆点。

例如搜索架构中，复杂度爆点可能不是列表渲染，而是 API 调用前的参数组装：

```text
搜索 API 参数会随筛选项增加而膨胀
-> 每个 Filter 自治产出 postValue
-> Controller 只管何时触发搜索
-> Pagination 是带搜索语义的特殊 Filter
-> 页面 onSearch 只收集参数并调用 API
```

这类设计允许后续新增多个筛选项时横向增加 filter 模块，而不是反复修改一个巨大的搜索函数。

## 要回答的问题

- 本 case 的复杂度爆点是什么？
- 爆点发生在哪个节点：API 调用、状态同步、权限判断、数据转换、跨组件协作、缓存、外部服务、验证链路，还是别的地方？
- 哪些东西必须解耦？哪些东西不需要提前抽象？
- 解耦后的主干职责是什么？
- 横向模块如何接入主干？
- 哪些模块是特殊节点，需要单独定义？
- 后续执行工作包如何按架构切片，而不是按版本堆叠？
- 什么行为会破坏本设计？

## 输入

- case.md 的 Goal / Think 结论。
- 相关 L3 / L4 / L5 / 局部 README。
- 代码入口或已有架构。
- 用户确认的设计判断。

## 输出

写入 `03-design/design.md`，并把摘要同步到 case.md：

- Design Summary。
- Complexity Hotspot。
- Minimal Decoupling。
- Architecture Boundary。
- Work Packages。
- Design Guardrails。
- Verification Plan。

决策记录写入 `03-design/decision-log.md`。Design phase 只规划 work package，不直接执行；work package 文件在 Execute phase 写入 `04-execute/work-packages/`。

Work Package 不是“先做 list、再加分页、再加搜索”的微步骤。它是一个可验收目标包，可以包含多个横向模块。

## 下一 phase 判断

- 设计边界、复杂度爆点和工作包清楚：进入 Execute。
- 设计缺少关键事实：回到 Think。
- 用户否定设计：停留 Design，先重定爆点或架构边界。

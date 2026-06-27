# Case Phase: Design

Design phase 负责把 case 目标设计成 Agent 可执行、可验收、可横向扩展的架构。

核心认知：

> Design 的目标不是完整抽象所有概念，而是找到复杂度爆点，并对爆点做最小必要解耦，再把架构具象化到文件 / 文件夹级边界，让后续执行可以横向铺模块，而不是纵向堆版本。

Design 在 AIPD Case 里更接近“架构设计”。功能边界、v0 取舍、暂时做 / 暂时不做，优先回写 `case.md` 的 Case Contract；Design 只承接那些会影响系统架子、文件组织、模块职责和执行切片的判断。

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

## 故事原型：垒高楼 vs 二层小洋楼

旧的 step 思路像垒高楼：

```text
第一版：先做 list
第二版：在 list 上加分页
第三版：在分页上加搜索
第四版：在搜索上加筛选
```

这种方式会诱导 Agent 在旧地基上继续叠逻辑。每新增一层都可能要回头改底层；改底层时又要保证旧功能不坏，最后容易变成纵向堆版本。

新的 Design 思路应像向外平摊的二层小洋楼：先找到复杂度爆点，给爆点一个可横向接入的结构，再让后续模块在同一架构边界内各自扩展。对于搜索列表，重点不是预先抽象 query state、renderer、data source、controls 等所有概念，而是抓住 API 参数组装这个爆点，让每个 filter 自治产出参数，主干只负责触发搜索。

这条故事原型用于校准 Agent：Design 不是教执行 Agent 先迈哪条腿，也不是把所有概念完整抽象一遍；Design 是用具体例子和边界让 Agent 避免回到“先做 A、再叠 B、再叠 C”的默认工作流。

## 文件 / 文件夹级交付

Design 的交付要达到执行 Agent 能按文件边界工作的程度，但不需要写具体代码实现。

必须回答：

- 要创建或调整哪些文件夹？
- 每个文件夹负责什么？
- 每个文件夹里有哪些文件？
- 每个文件承担什么职责？
- 哪些文件之间允许引用，哪些不允许？
- 哪些局部重复是可以接受的，因为它换来了上下文解耦和单点可加载？
- 什么改法会把复杂度重新堆回主干？

例如传统后端常见结构是全局 `Controller / Service / Model` 分层；AIPD Design 可以根据上下文解耦需要改成“每个 API 一个文件夹，文件夹内自带 controller / service / model”。这种结构可能有重复，但每次改一个 API 时，Agent 只需要加载这一个文件夹，不必担心外部隐式引用。

## 要回答的问题

- 本 case 的复杂度爆点是什么？
- 爆点发生在哪个节点：API 调用、状态同步、权限判断、数据转换、跨组件协作、缓存、外部服务、验证链路，还是别的地方？
- 哪些东西必须解耦？哪些东西不需要提前抽象？
- 解耦后的主干职责是什么？
- 横向模块如何接入主干？
- 哪些模块是特殊节点，需要单独定义？
- 文件夹和文件如何组织？
- 每个文件的职责边界是什么？
- 后续执行工作包如何按架构切片，而不是按版本堆叠？
- 什么行为会破坏本设计？

## 输入

- case.md 的 Case Contract / Think 结论。
- 相关 L3 / L4 / L5 / 局部 README。
- 代码入口或已有架构。
- 用户确认的设计判断。

## 输出

写入 `02-design/design.md`，并把摘要同步到 case.md：

- Design Summary。
- Complexity Hotspot。
- Minimal Decoupling。
- Architecture Boundary。
- File / Folder Plan。
- Dependency Rules。
- Work Packages。
- Design Guardrails。
- Verification Plan。

决策记录写入 `02-design/decision-log.md`。Design phase 只规划 work package，不直接执行；work package 文件在 Execute phase 写入 `03-execute/work-packages/`。

Work Package 不是“先做 list、再加分页、再加搜索”的微步骤。它是一个可验收目标包，可以包含多个横向模块。

## 下一 phase 判断

- 设计边界、复杂度爆点、文件 / 文件夹计划和工作包清楚：向用户汇报设计状态卡，确认后进入 Execute。
- 设计缺少关键事实：回到 Think。
- 用户否定设计：停留 Design，先重定爆点或架构边界。

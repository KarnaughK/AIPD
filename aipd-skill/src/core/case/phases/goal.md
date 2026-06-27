# Case Phase: Goal

Goal phase 负责创建或校准一个短周期目标容器。

Case 不是长期 OKR，也不是普通 todo。它是一个马上要推进、最终要验收关闭的目标。Goal phase 的任务是把“要做什么、为什么现在做、完成算什么”说清楚。

## 要回答的问题

- 本 case 的目标是什么？
- 它服务哪个方向、OKR、用户需求或项目阶段？
- 本 case 结束时必须出现什么可验收结果？
- 哪些上下文是本 case 的大方向约束？
- 哪些事情明确不做？
- 是否信息不足，需要进入 Think？
- 是否目标已经清楚，可以进入 Design？

## 输入

- 用户当前描述。
- `_adoc/index.md`
- `_adoc/map.md`
- 必要的 L1 / L2 / L3 / L4 / L5 / 局部 README。
- 若用户提到 OKR，再读取对应 OKR 入口。

## 输出

写入 `01-goal/goal.md`，并把摘要同步到 case.md：

- Goal
- Context Index
- Boundary
- Acceptance
- Current Phase
- Phase State

Goal phase 不负责拆微步骤。若用户已经给出大致执行结构，也先记录为候选，不急着固化成 work package。

## 下一 phase 判断

- 目标模糊、存在关键未知、需要调研或抉择：进入 Think。
- 目标清楚但架构和复杂度爆点未定：进入 Design。
- 已有设计事实源且只差执行：进入 Execute。

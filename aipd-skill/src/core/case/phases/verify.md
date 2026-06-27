# Case Phase: Verify

Verify phase 负责验收目标是否完成，以及执行结果是否遵守 Design phase 的解耦约束。

它不只是跑测试。Verify 要同时检查三类东西：

- Case Contract 中的目标和验收标准是否完成。
- Work Package 是否完成。
- Design Guardrails 是否被破坏。

## 要回答的问题

- case 的完成标准是否全部满足？
- 每个 work package 的验收标准是否满足？
- 是否出现纵向堆版本、巨型函数、隐式耦合、参数组装回流主干等设计回退？
- 是否有未完成风险或用户必须验收的取舍？
- 是否需要补执行工作包、回到 Design，还是可以 Close？
- 是否产生稳定认知，需要 Weave？

## 输入

- case.md。
- Work Packages。
- 执行记录。
- 测试、构建、截图、报告或人工验收材料。

## 输出

写入 `04-verify/verify.md`，并把摘要同步到 case.md：

- Verify Result。
- 通过 / 未通过项。
- 残留风险。
- 用户验收状态。
- Close 归档候选。

## 下一 phase 判断

- 用户验收通过：进入 Close。
- 目标未达成但设计仍成立：回到 Execute，新增或调整 work package。
- 设计不成立：回到 Design。
- 方向不成立：进入 Close，并标记 stopped / failed。

# AIPD Think（施工中）

AIPD Think 是 AIPD 正在施工中的前置讨论能力。它位于 Case Create 之前，负责把模糊想法、陌生领域、深度调研和方案比较沉淀成一个可恢复的 Think 对象。

它要解决的问题不是“怎么拆任务”，而是：

- 这个想法要不要做？
- 现在适不适合做？
- 还缺哪些信息？
- 有没有更小的版本？
- 讨论中产生的稳定认知是否应该 weave？

## 和 Case 的关系

Think 与 Case 同层，不是 Case 的子步骤。

```text
AIPD Think -> Case Create -> Case Run
想清楚要不要做 -> 设计怎么做 -> 执行
```

AIPD Think 的出口包括：

- **Create**：进入 Case Create。
- **Kill**：不值得做，记录终止原因。
- **Defer**：值得但不是现在做。
- **Research**：信息不足，继续调研。
- **Weave**：产生稳定认知，但不形成执行事项。
- **Continue**：继续讨论。

## 当前状态

这个能力还没有实现为正式 `aipd-think` skill，也还没有固定 `_adoc/think/` 目录结构。

当前已经稳定的是概念边界：Think 是人和 AI 的高带宽思考缓冲层，负责从模糊到清晰；Case Create 只在决定要执行之后，负责架构、上下文索引和 step 拆分。

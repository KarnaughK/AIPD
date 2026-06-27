# Think

Think 是 AIPD 的高带宽思考缓冲层。它可以在 Case 前，也可以在 Case 内。

它要解决的问题不是“怎么拆任务”，而是：

- 这个想法要不要做？
- 现在适不适合做？
- 还缺哪些信息？
- 有哪些选项和取舍？
- 当前 case 推进不下去的卡点是什么？
- 讨论中产生的稳定认知是否应该 weave？

## Case 前的 Think

当用户只有模糊想法、陌生领域、深度调研或方案比较需求时，Think 可以先于 Case 存在。

它的出口包括：

- **Create**：目标清晰且值得执行，写入 case.md 的 Case Contract。
- **Kill**：不值得做，记录终止原因。
- **Defer**：值得但不是现在做。
- **Research**：信息不足，继续调研。
- **Weave**：产生稳定认知，但不形成执行事项。
- **Continue**：继续讨论。

## Case 内的 Think

当 case 目标已经确定，但推进中遇到选型、测试集可信度、实验分支、用户取舍或关键未知时，不必膨胀出平级 case，也不必只留在聊天里。

这类内容进入当前 case 的 Think phase，产出问题、选项、依据、结论和对 Design / Execute 的输入。

## 和 Design 的关系

Think 回答“当前卡点是什么、依据是什么、选哪个方向”。

Design 回答“复杂度爆点在哪里、如何做最小必要解耦、后续 work package 如何横向铺开”。

Think 不替代 Design；Design 也不做无限调研。

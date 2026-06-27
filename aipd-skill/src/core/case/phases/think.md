# Case Phase: Think

Think phase 是 case 内的信息同步、调研和抉择阶段。

它不再是 Case 之前的外围动作。一个 case 目标确定后，仍可能遇到信息不足、方向分歧、技术选型、测试集可信度、用户口径不清等问题，这些都进入 Think phase。

## 要回答的问题

- 当前目标为什么推进不下去？
- 卡点是信息不足、方案不清、外部事实不明，还是用户需要做取舍？
- 有哪些选项？
- 每个选项的依据、风险和代价是什么？
- 是否需要外部调研、代码实验、竞品比较或数据采样？
- Think 的结论如何回到本 case？

## 输入

- case.md 的 Goal、Context Index、Boundary。
- Goal phase 列出的上下文。
- 必要的外部资料、实验脚本、历史 case 或用户补充。

## 输出

写入 `02-think/think.md`，并把摘要同步到 case.md：

- 关键问题。
- 调研范围。
- 选项比较。
- 决策结论。
- 未解决风险。
- 对 Design 或 Execute 的输入。

调研、代码实验、竞品比较、数据采样或临时评测分支写入 `02-think/{branch}/`。例如：

```text
02-think/openrouter-evaluation/
02-think/contexto-live-sampling/
02-think/model-benchmark-comparison/
```

分支目录内可以有 `summary.md`、`evidence.md`、`code/`、`data/` 等材料。它们属于 Think phase，不应膨胀成平级 case，除非确实需要独立恢复状态和独立验收。

如果 Think 产生可复用外部世界资料，记录 Weave Candidate，后续由 `aipd-weave` 判断是否进入 L2 / L3 / L4 / L5。

## 下一 phase 判断

- 已经选定方向且需要架构设计：进入 Design。
- 结论是目标不成立：进入 Close，并标记为 stopped / killed。
- 还缺信息：继续 Think，但必须写清下一轮要查什么，不要无限泛调研。

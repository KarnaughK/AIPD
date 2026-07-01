# Case Phase: Think

Think phase 是 case 内的信息同步、调研、实验、证据收集和抉择阶段。

它不再是 Case 之前的外围动作。一个 case 目标确定后，仍可能遇到信息不足、方向分歧、技术选型、测试集可信度、用户口径不清等问题，这些都进入 Think phase。

Think 是 case 的探索工作台。主流程可以从 Design / Execute / Verify 回跳到 Think：只要后续阶段发现需要外部资料、代码实验、数据采样、竞品参考或方案比较，就回到 Think 创建分支，收口后再回到触发回跳的 phase。

## 调研前 checkpoint

Think 最容易把上下文冲散。进入大调研、代码实验、数据采样、竞品比较或长日志分析前，必须先写一个 checkpoint 到 `01-think/think.md` 或对应 `01-think/{branch}/summary.md`：

- 当前问题是什么。
- 为什么需要本轮 Think，来自哪个 phase 或 artifact。
- 调研 / 实验边界是什么，不查什么。
- 预期输出和停止条件是什么。
- 结论完成后返回 Case Contract、Design、Execute、Verify 还是 Close 候选。

如果没有这个 checkpoint，不要直接展开长调研。调研材料可以很多，但恢复入口必须很短、明确、可被压缩后的 Agent 读取。

## 要回答的问题

- 当前目标为什么推进不下去？
- 卡点是信息不足、方案不清、外部事实不明，还是用户需要做取舍？
- 有哪些选项？
- 每个选项的依据、风险和代价是什么？
- 是否需要外部调研、代码实验、竞品比较或数据采样？
- Think 的结论如何回到本 case？
- 本轮 Think 是从哪个 phase 回跳而来？解决后要回到哪里？

## 输入

- case.md 的 Case Contract：目标、边界、验收标准、上下文索引和不做范围。
- 必要的外部资料、实验脚本、历史 case 或用户补充。

## 输出

写入 `01-think/think.md`，并把摘要同步到 case.md：

- 关键问题。
- 调研范围。
- 选项比较。
- 决策结论。
- 未解决风险。
- 结论回流位置：Case Contract / Design / Execute / Verify / Close 归档候选。
- 回跳来源和返回位置：from Design / Execute / Verify；return to 哪个 artifact 或 phase。

调研、代码实验、竞品比较、数据采样或临时评测分支写入 `01-think/{branch}/`。每个分支必须先有一个具体目标，结束时给出结论，并说明结论应该补到哪里。它可以在分支目录里自由折腾，但不能把没有收口的材料直接推进成 Design 或 Execute。

例如：

```text
01-think/openrouter-evaluation/
01-think/contexto-live-sampling/
01-think/model-benchmark-comparison/
```

分支目录内可以有 `summary.md`、`evidence.md`、`code/`、`data/` 等材料。它们属于 Think phase，不应膨胀成平级 case，除非确实需要独立恢复状态和独立验收。

分支 `summary.md` 至少写清：

- branch goal。
- trigger：为什么需要这个分支，是否来自 Design / Execute / Verify 回跳。
- scope / stop condition：本分支查什么、不查什么、查到什么程度停止。
- evidence：关键证据或实验结果。
- conclusion：结论。
- return to：结论回到 Case Contract、Design artifact、work package、Verify 还是 Close 候选。
- invalidates：是否使已有设计、work package 或验收标准失效。

如果 Think 产生未来可能沉淀的外部世界资料，先记录到 Close 归档候选。只有 case 完成并进入 Close 后，才由 `aipd-weave` 判断是否进入 L2 / L3 / L4 / L5。

## 下一 phase 判断

- 已经选定方向且需要架构设计：向用户汇报 Think 结论和回流位置，确认后进入 Design。
- 结论是目标不成立：进入 Close，并标记为 stopped / killed。
- 还缺信息：继续 Think，但必须写清下一轮要查什么，不要无限泛调研。

# Think

Think 是 Case 内的信息同步、调研、实验、证据收集和抉择阶段。目标已经确定，但仍有关键未知时使用它。

## 什么时候进入 Think

- 外部事实、用户口径或竞品范式不清楚。
- 技术选型、测试集可信度或数据样本需要比较。
- Design、Execute、Verify 发现上游证据缺口。
- 有多个选项，需要明确依据、风险和代价。

用户只有模糊想法时，可以先在普通对话中讨论；一旦需要把调研状态持久化并继续推进，先建立 Case Contract，再进入 Think。Think 不再作为 Case 之前的独立持久化 phase。

## 调研前 checkpoint

Think 很容易把上下文冲散。开始长调研、实验、采样或比较前，先写：

- 当前问题与触发来源。
- 查什么、不查什么。
- 预期输出与停止条件。
- 结论完成后返回 Contract、Design、Execute、Verify 还是 Close 候选。

没有停止条件的“再多搜一点”不是有效 Think。

## 分支怎样组织

展开材料放在 `01-think/{branch}/`，而不是全部塞进 `case.md`：

```text
01-think/
├── think.md
└── docs-benchmark/
    ├── summary.md
    ├── evidence.md
    └── data/        # 可选
```

每个分支至少记录 branch goal、trigger、scope / stop condition、evidence、conclusion、return to，以及它是否让现有设计或 Work Package 失效。

## Think 的输出

Think 不以“收集了很多资料”结束，而以可回流的判断结束：

- 当前卡点是什么。
- 有哪些选项。
- 证据支持什么、不支持什么。
- 选择了哪个方向，风险是什么。
- 更新 Contract、Design、Execute、Verify 或 Close 候选中的哪个位置。

如果方向成立且需要固化执行方案，进入 Design；如果目标不成立，进入 Close 并记录停止原因；如果仍缺信息，明确下一轮要查什么。

## 与 Design 的边界

- Think 回答：“依据是什么，选哪个方向？”
- Design 回答：“需求和规则怎样固化，现有系统改变什么，执行边界怎样切？”

Design 缺证据就回 Think；Think 不替代 requirements、API、状态或文件边界设计。

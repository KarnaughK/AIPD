# 04 Case / Work Package 开发逻辑

知识库解决“Agent 怎么理解项目”。Case / Work Package 解决“Agent 怎么完成一个较大的短周期目标”。

真实任务不会一直停留在一句需求里。它会包含讨论、猜测、否定、临时方案、边界确认、执行结果和验收反馈。如果这些都只留在聊天中，Agent 很难稳定恢复。

Case 的目标是把一次事项变成可恢复、可设计、可派发、可验收、可关闭的文件事实源。

## OKR：长期目标

OKR 不直接替代 case。

它回答的是：当前阶段为什么要做这些事项，什么结果算推进了项目方向。

AIPD 里提到 OKR 时，默认就是飞书 OKR。

当项目有多个 case 时，OKR 可以帮助判断：

- 哪些 case 更重要。
- 当前 work package 是否还在服务阶段目标，而不是变成局部忙碌。
- 归档时哪些经验值得进入长期知识库。

## Case：短周期目标容器

Case 是一次马上要推进、最终要验收关闭的目标容器。

它类似 OKR，但不是 OKR。OKR 面向长期周期、持续对齐和复盘；Case 面向当前目标的 Think、Design、Execute、Verify 和 Close。

Case 通常记录：

- Goal。
- 上下文索引。
- 本次边界。
- Think 结论。
- Design 结论。
- Work Package。
- Verify 结果。
- Weave Candidate。
- Close 状态。

新建 Case 使用 phase-first 目录结构：

```text
_adoc/case/cX.Y-name/
├── case.md
├── 01-goal/
├── 02-think/
├── 03-design/
├── 04-execute/
├── 05-verify/
└── 06-close/
```

`case.md` 是入口和状态聚合；phase 目录承载阶段材料。不要再把新 case 的主结构做成顶层 `doc/`、`steps/`、`code/`。

上下文压缩或中断后，恢复链路应该是：

```text
AGENTS.md
-> _adoc/index.md
-> _adoc/map.md
-> _adoc/case/index.md
-> 当前 case.md
-> 当前 phase 目录 / work package
```

## Think：推进中的未知和抉择

Think 可以出现在 Case 前，也可以出现在 Case 内。

如果还只是一个想法、方向、陌生领域或“要不要做”的问题，Think 负责把模糊想法变成 Create / Kill / Defer / Research / Weave / Continue 等出口。

如果 case 目标已经确定，但推进中遇到调研、选型、测试集可信度、用户取舍等问题，Think 作为 Case 内 phase 记录问题、选项、依据和结论。

Think 阶段的调研、实验、数据采样或方案比较分支，默认放在 `02-think/{branch}/`。例如模型评测、真实样本采集、竞品调研，都不应先膨胀成平级 case。

## Design：找复杂度爆点

Design 的核心不是完整抽象所有概念，而是找到复杂度爆点，并对爆点做最小必要解耦，让后续执行可以横向铺模块，而不是纵向堆版本。

搜索列表例子：

```text
复杂度爆点：搜索 API 参数组装会随筛选项增加而膨胀
解耦点：每个 Filter 自治产出 postValue
特殊节点：Pagination 是带搜索语义的特殊 Filter
主干职责：Controller 只管触发搜索，不管业务数据
```

这比“第一版 list、第二版分页、第三版搜索、第四版筛选”的堆叠方式更适合 Agent。后续新增筛选项时，只横向新增 filter 模块，不把逻辑堆回搜索主函数。

## Work Package：可验收目标包

Step 的语义调整为 Work Package。

Work Package 不是微步骤，不负责指挥 Agent 先迈左腿还是右腿。它负责给 Agent 一个目标、上下文、设计边界和验收口径。

Work Package 只放在 `04-execute/work-packages/`。旧 `steps/` 不是新结构，也不再作为兼容运行入口；继续推进旧 case 前应先迁移为 phase-first case。

一个 Work Package 应该写清：

- 目标。
- 设计依据：复杂度爆点、解耦方式、主干职责、特殊节点和设计护栏。
- 必读上下文。
- 横向模块。
- 验收标准。
- 不做范围。
- 执行记录。

如果两个 work package 之间必须共享上一轮聊天里的临时判断，说明共享判断还没有沉淀。要么合并成一个 work package，要么先把共享判断写入 case.md、`03-design/design.md`、README 或图里。

## 分身 Agent：消化过程成本

Execute phase 中，执行 work package 的工作可以交给分身 Agent 或角色 Agent。

分身 Agent 不是低上下文工人。更准确地说，它是从主 Agent 当前认知 fork 出来的克隆体，进入局部探索或执行分支，完成后只回流：

- 结论。
- 依据。
- 风险。
- 建议。
- 改动文件。
- 验证结果。

主 Agent 保留用户沟通、目标边界、最终判断和状态写回。

## Weave Candidate：执行和知识库的接口

Work Package 执行结束后，不一定直接改长期 ADOC。

更稳妥的做法是先产出 Weave Candidate：说明这次任务产生了哪些可能值得回写的稳定信息，以及建议写到哪里。

之后由 Weave 判断知识归属、索引更新和旧知识冲突。

这就是第二层和第一层的连接：Case / Work Package 负责执行，Weave 负责让执行经验进入项目知识库。

# Case 与 Work Package

Case / Work Package 是 AIPD 的任务执行组织系统。

它解决的问题不是“列一个 todo”，而是让一次 AI 协作事项可恢复、可设计、可派发、可验收、可归档。

## Case

Case 是一个短周期目标容器。

它类似 OKR，都会先定目标并连接大方向上下文；但 OKR 面向长期周期、持续对齐和复盘，Case 面向当前目标的设计、执行、验收和关闭。

一个 case 推完，应该是一个完整事项闭环，而不是只推进了一部分。

## Phase

新的 case 生命周期按目标契约和 phase 渐进推进：

```text
Case Contract -> Think -> Design -> Execute -> Verify -> Close
```

| 区块 / Phase | 作用 |
|---|---|
| Case Contract | 写在 `case.md` 顶部，定目标、上下文、大方向边界和完成标准 |
| Think | 信息不足或需要抉择时，做同步、调研、比较和决策 |
| Design | 找复杂度爆点，形成文件 / 文件夹级架构边界和工作包 |
| Execute | 按工作包推进，可以使用目标模式和执行 Agent |
| Verify | 验收目标、工作包结果和设计护栏 |
| Close | 归档、更新索引、整理 Close 归档候选 |

`Goal` 不再是独立 phase。目标和边界是整个 case 的契约，直接放在 `case.md`。这些 phase 不需要拆成独立 skill。`aipd-case` 根据 case.md 的 `Current Phase` 加载对应 phase 文档。

## 目录结构

新建 case 使用 contract + phase-first 结构，不再用顶层 `doc/`、`steps/`、`code/` 按材料类型分层，也不再生成独立 `01-goal/`：

```text
_adoc/case/cX.Y-name/
├── case.md
├── 01-think/
├── 02-design/
├── 03-execute/
├── 04-verify/
└── 05-close/
```

`case.md` 是入口、目标契约和状态聚合。每个 phase 目录收纳自己的文档、调研、代码实验、执行记录或验收材料。旧 case 的 `doc/`、`steps/` 或 `01-goal/` 不再兼容运行；继续推进前应先迁移为当前结构。

## Think

Think 可以在 Case 内发生。

当目标已经确定，但推进中遇到关键未知、调研、选型、测试集可信度或用户取舍时，不必膨胀出一堆平级 case。优先在当前 case 的 Think phase 中记录问题、选项、依据和结论。

调研、实验、采样或模型评测这类分支，默认放在 `01-think/{branch}/`。每个分支要有自己的目标和结论回流位置。只有当分支需要独立恢复状态、跨多轮执行、有独立验收标准和独立产物时，才升级成子 case。

## Execute

Work Package 只属于 Execute phase，放在：

```text
03-execute/work-packages/
```

旧 `steps/` 不再是新结构，也不再作为运行兼容入口。

## Design

Design 的核心不是完整抽象所有概念，而是找到复杂度爆点，并对爆点做最小必要解耦，再把架构具象化到文件 / 文件夹级边界，让后续执行可以横向铺模块，而不是纵向堆版本。

搜索列表的例子：

```text
复杂度爆点：搜索 API 参数组装会随筛选项增加而膨胀
解耦点：每个 Filter 自治产出 postValue
特殊节点：Pagination 是带搜索语义的特殊 Filter
主干职责：Controller 只管触发搜索，不管业务数据
```

这种设计比“先做 list、再叠分页、再叠搜索、再叠筛选”更适合 Agent 执行。

## Work Package

Step 的语义调整为 Work Package。

Work Package 是可验收、可派发、可恢复的目标包，不是微步骤。它可以包含多个横向模块，只要这些模块共享同一个设计边界和验收口径。

一个 Work Package 应能让执行 Agent 独立恢复边界：

- 读 work package 文件。
- 读 case 文件。
- 读 `02-design/design.md` 和上下文文档。
- 按横向模块推进。
- 按验收标准自检。
- 写回执行记录。

调用方不应把正文复制到 prompt 里。任务正文以 work package 文件为准。

## 统一入口

`aipd-case` 是推荐入口，负责恢复 case 状态、判断当前 phase、加载对应 phase 文档并推进。

旧入口已合并：

- `aipd-case-create`：并入 `aipd-case` 的 Case Contract / Think / Design。
- `aipd-case-run`：并入 `aipd-case` 的 Execute / Verify。
- `aipd-case-archive`：并入 `aipd-case` 的 Close。

这些旧入口不再作为独立 skill 构建。用户提到旧命令时，引导到 `aipd-case`；遇到旧 case 结构时，只提示是否迁移，不执行兼容运行逻辑。

长期建议收敛到 `aipd-case`。

## 执行记录

每个改变项目状态的 work package 完成后，都应留下可恢复记录。

执行记录通常包括：

- 完成时间。
- 主要改动。
- 验证结果。
- 遇到的问题。
- Weave 候选。

这样下一个 Agent 不需要继承上一段聊天，也能知道任务推进到哪里。

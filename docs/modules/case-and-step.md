# Case 与 Work Package

当一个目标会跨多轮讨论、调研、设计、修改和验收时，使用 Case。它把“要完成什么、当前在哪里、怎样算完成”从聊天迁移到可恢复文件。

## Case 不是 todo

Case 是一个马上要完成并最终关闭的短周期目标容器。它类似 OKR，都会连接方向；区别是：OKR 面向阶段对齐，Case 面向一个具体目标的设计、执行、验收和关闭。

一个 Case 的目标契约直接写在 `case.md` 顶部：

- 目标与方向关联。
- 本次要做 / 不做。
- 完成标准。
- L1-L6、局部 README 和必要流程材料的上下文索引。
- 执行中的边界变更记录。

Goal 不再是独立 phase。Contract 是所有 phase 共同遵守的事实源。

## Phase-first 生命周期

```text
Case Contract -> Think -> Design -> Execute -> Verify -> Close
```

| 区块 / Phase | 主要问题 | 典型输出 |
|---|---|---|
| Case Contract | 为什么做、边界和完成标准是什么 | `case.md` 顶部契约 |
| Think | 哪些事实未知，选项与证据是什么 | 调研 / 实验分支、决策和回流位置 |
| Design | 规则、现状 delta 和可执行边界是什么 | requirements、brownfield、设计、readiness |
| Execute | 哪些目标包正在交付，当前状态是什么 | `execute.md`、Work Package 与执行记录 |
| Verify | 目标与设计护栏是否有证据通过 | 验收结果、缺口和回跳决定 |
| Close | 结果怎样收束，哪些知识可能回写 | 关闭记录、索引和 Weave 候选 |

这是默认导航，不是不可回头的瀑布。Design 发现缺少外部事实，可以回 Think；Execute 发现设计边界不成立，可以回 Design；Verify 发现需求口径缺失，可以回 Contract 或 Design。回跳必须记录原因、更新 artifact 和受影响下游。

## 标准目录

```text
_adoc/case/cN-name/
├── case.md
├── 01-think/
├── 02-design/
├── 03-execute/
│   ├── execute.md
│   └── work-packages/
├── 04-verify/
└── 05-close/
```

Case ID 使用项目内单调递增的 `cN-slug`；Work Package 使用 Case 内局部编号 `wp-NN-slug`，跨 Case 引用写成 `cN/wp-NN`。

旧 `doc/`、`steps/` 或独立 `01-goal/` 结构不再兼容运行。遇到旧 Case 时先迁移，不从旧 `steps/` 继续执行。

## 文件 checkpoint

`case.md` 同时记录 Case Contract 和 Case Runtime。Runtime 至少要能回答：

- Current Phase 和各 phase 状态。
- 当前焦点、当前游标、最近 checkpoint。
- 下一步与压缩后恢复入口。
- confirmed / assumed / open、待确认和阻塞。

checkpoint 的标准是恢复价值，不是内容大小。目标边界、调研停止条件、Design 节点、Work Package 状态和验收结论要落文件；闲聊、未采纳想法和可直接从现有事实推导的内容不需要。

## Think 与 Design 的分工

Think 负责证据和抉择：当前为什么推进不下去、有哪些选项、依据与代价是什么、结论返回哪里。

Design 负责把目标变成可执行方案：先固定 requirements 和领域规则，再扫描 brownfield delta，按需设计后端 / 前端，最后做上下文解耦、文件边界和 Work Package readiness。

Design 不是一上来画目录，也不是只找“复杂度爆点”。任何 `assumed` 或 `open` 都不能被偷偷固化成数据字段、API、状态机或 UI 事实。

## Work Package 是目标包

Work Package 只存在于 `03-execute/work-packages/`。它不是微步骤，也不等于子 Agent 派发节点。

一个合格 Work Package 应写清：

- 目标与 Design 依据。
- 不允许固化的假设。
- 文件 / 文件夹边界和横向模块。
- 必读上下文。
- 执行前 checkpoint、停止条件和返回位置。
- 验收标准与不做范围。
- 执行记录、验证结果和 Weave 候选。

运行时再根据上下文隔离、真实并发、主线耦合和调度成本，选择由 Main 连续完成还是交给 Child Agent。

## Goal Mode 是外部覆盖层

平台目标模式只有在活动目标明确绑定当前 Case 时启用。它允许 Agent 在 Contract 边界内自行检查内部 Gate，通过后写 checkpoint 并继续完整生命周期。

Goal Mode 不改变 Case Contract、phase、Work Package 或验收标准，也不扩大权限。目标、边界或风险结构需要实质变化，以及安装、发布、删除、付费、外部消息等副作用，仍需要用户决定或对应授权。

## 统一入口与旧命令

`/aipd-case` 负责创建、恢复、推进、验收和关闭 Case，并按 Current Phase 渐进加载说明。

旧 `aipd-case-create`、`aipd-case-run`、`aipd-case-archive` 已合并，不再作为独立 Skill 构建。

## 恢复链路

长任务续跑或聊天与文件状态不一致时：

```text
AGENTS.md
-> _adoc/index.md
-> _adoc/map.md
-> _adoc/case/index.md
-> 当前 case.md
-> 当前 phase
-> 当前 Work Package / artifact
```

冲突时先指出差异，再以 Case / Work Package 文件为事实来源。

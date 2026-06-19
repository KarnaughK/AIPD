# Case 与 Step

Case / Step 是 AIPD 的任务执行组织系统。

它解决的问题不是“列一个 todo”，而是让一次 AI 协作事项可恢复、可派发、可验收、可归档。

在三条主线里，Case / Step 属于第二层：大任务执行和上下文恢复。OKR、分身 Agent、执行记录、归档和 Weave Candidate 都围绕这条执行线工作。

正在施工中的 AIPD Think 位于 Case / Step 之前。它负责把模糊想法、调研和方案比较状态化，并判断出口是 Create、Kill、Defer、Research、Weave 还是 Continue。

## 和 OKR / Inbox 的关系

OKR 位于 Case 上游，帮助判断当前 case 是否推进阶段目标。它不替代 case，也不记录执行细节。

Inbox 位于 Case 之前，用来临时接住还没整理清楚的想法。只有当一个想法变成明确事项，才应该创建 case。

Think 也位于 Case 之前，但它和 Inbox 不同。Inbox 只负责暂存；Think 已经进入主动讨论、调研和决策。

## Case

Case 是一次具体事项的容器。

它通常包含：

- 目标。
- 场景和边界。
- 上下文索引。
- 任务拆分。
- Step 列表。
- 验收标准。
- Weave 候选。
- 归档状态。

Case 的价值是把一次任务从聊天里固定到文件里。

当聊天被压缩、中断或多人/多 Agent 接力时，case 文件能成为事实源。

## Step

Step 是 Case 内的最小执行单元。

一个 step 应该能让执行 Agent 独立恢复边界：

- 读 step 文件。
- 读 case 文件。
- 读 step 列出的上下文文档。
- 按任务清单执行。
- 按验收标准自检。
- 写回执行记录。

调用方不应把 step 正文复制到 prompt 里。任务正文以 step 文件为准。

## case-create 与 case-run

`aipd-case-create` 负责创建 case、沉淀目标、边界、上下文索引和 step。

`aipd-case-run` 负责按 case 恢复状态、判断下一个 step、派发执行 Agent、收集结果、验收并写回状态。

这两个能力的分工很重要：未确认的讨论点不要包装成 step；已经写清楚的 step 才适合进入执行。后续 AIPD Think 实现后，未确认的开放式讨论应优先留在 Think，而不是强行进入 case-create。

## 执行记录

每个改变项目状态的 step 完成后，都应留下可恢复记录。

执行记录通常包括：

- 完成时间。
- 主要改动。
- 遇到的问题。
- Weave 候选。

这样下一个 Agent 不需要继承上一段聊天，也能知道任务推进到哪里。

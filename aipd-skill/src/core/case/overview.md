# Case 机制总览

Case 是 AIPD 的短周期目标容器：一次马上要推进、需要 AI 参与、最终要验收关闭的具体事项。

Case 类似 OKR，都会定目标并连接大方向上下文；但 OKR 面向长期周期、持续对齐和复盘，Case 面向当前目标的 Think、Design、Execute、Verify 和 Close。一个 case 推完，应该是一个完整事情闭环，而不是“只推进了一部分，后面还要隐藏补一堆 case”。

## 生命周期

新的 case 生命周期按 phase 渐进推进：

```text
Goal -> Think -> Design -> Execute -> Verify -> Close
```

| Phase | 作用 |
|---|---|
| Goal | 定目标、上下文、大方向边界和完成标准 |
| Think | 信息不足或需要抉择时，做同步、调研、比较和决策 |
| Design | 找复杂度爆点，做最小必要解耦，形成架构边界和工作包 |
| Execute | 按工作包推进，可以使用目标模式和执行 Agent |
| Verify | 验收目标、工作包结果和设计护栏 |
| Close | 归档、更新索引、整理 Weave Candidate |

`aipd-case` 是统一入口。它先读取 case.md 的 `Current Phase` 和 `Phase State`，再按当前 phase 加载 `case/phases/{phase}.md`。不要把每个 phase 拆成独立 skill；phase 是 case 内部状态，不是用户需要记住的一组命令。

## Phase-first 目录结构

Case 内部也要遵守横向平摊原则。新建 case 不再按材料类型拆成顶层 `doc/`、`steps/`、`code/`，而是按 phase 直接平铺：

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

每个 phase 自己收纳本阶段的材料：

- Goal 的目标和边界写入 `01-goal/goal.md`。
- Think 的调研、实验、数据采样和方案比较分支写入 `02-think/{branch}/`。
- Design 的复杂度爆点、最小解耦和决策记录写入 `03-design/`。
- Execute 的总状态和 work package 写入 `04-execute/`。
- Verify 和 Close 分别写入 `05-verify/`、`06-close/`。

`case.md` 是入口和状态聚合，不承载所有过程细节。它保存 Current Phase、Phase State、关键摘要、上下文索引、Weave Candidate 和各 phase 文件链接。

## Case 文件的价值

Case 不只是任务清单。它的价值是把本次事项的目标、上下文索引、关键决策、设计边界、横向工作包、验收状态和 Weave Candidate 固定成文件事实源。

当聊天被压缩、中断或多个 Agent 接力时，case.md 是恢复入口。聊天上下文只是临时工作缓存；如果聊天记忆和 case 文件冲突，以 case 文件为准。

## Think 在 Case 内

旧模型里，Think 位于 Case 之前，用来判断模糊想法是否值得创建 case。新模型保留这个判断，但对于已经定下短周期目标的事项，Think 也可以作为 Case 内 phase 存在。

这解决了复杂事项中常见的问题：目标已经明确，但推进中会遇到关键未知、调研、选型、测试集可信度、用户取舍等卡点。它们不是新的顶层 case，也不该散落在聊天里；应记录在当前 case 的 Think phase，并把结论回流到 Design 或 Execute。

## Design 的核心认知

Design 的目标不是完整抽象所有概念，而是找到复杂度爆点，并对爆点做最小必要解耦，让后续执行可以横向铺模块，而不是纵向堆版本。

例如搜索列表的复杂度爆点可能不是表格渲染，而是 API 调用前的参数组装：

```text
搜索 API 参数会随筛选项增加而膨胀
-> 每个 Filter 自治产出 postValue
-> Controller 只管何时触发搜索
-> Pagination 是带搜索语义的特殊 Filter
-> 页面 onSearch 只收集参数并调用 API
```

这种设计让后续新增筛选项时横向增加 filter 模块，而不是在旧搜索函数上继续堆逻辑。AIPD 的 Design phase 应优先找到这种爆点，而不是把 query state、renderer、data source、controls 等所有概念预先抽象一遍。

## Work Package / Step

Step 的语义调整为 Work Package：一个可验收、可派发、可恢复的目标包。

Work Package 不再表示“先做 list，再加分页，再加搜索，再加筛选”的堆叠式微步骤。它应围绕 Design phase 的架构边界列出一个或多个横向模块，让执行 Agent 依据目标、上下文、设计护栏和验收口径推进。

一个 Work Package 应包含：

- 目标。
- 设计依据：复杂度爆点、解耦方式、主干职责、特殊节点和设计护栏。
- 横向模块。
- 必读上下文。
- 验收标准。
- 不做范围。
- 执行记录。

Work Package 只属于 Execute phase。新建 work package 写入 `04-execute/work-packages/`。旧 case 的 `steps/` 目录不再兼容运行；遇到旧结构时先提示用户是否迁移为 phase-first case。

## Agent 执行关系

Agent 不需要被指挥先迈左腿还是右腿。AIPD 应提供的是：

- 目标。
- 上下文索引。
- 复杂度爆点和最小解耦设计。
- 工作包边界。
- 验收标准。
- 禁止破坏的设计护栏。

进入 Execute phase 后，主 Agent 负责用户沟通、状态判断、派发、审查和写回。执行 Agent 或目标模式围绕 `04-execute/work-packages/` 下的 work package 运行。文件修改、构建、测试、批量验证、跨文件 diff、长调研和长日志分析优先交给执行 Agent；主 Agent 接收压缩结果并写回 case。

## 子 Case

复杂 case 可能产生调研、实验或数据采样分支。默认先作为当前 case 的 phase 内容记录：调研和数据采样放入 `02-think/{branch}/`，架构判断放入 `03-design/`，真正执行才进入 `04-execute/work-packages/`。

只有当一个分支满足以下条件时，才升级成子 case：

- 需要独立恢复状态。
- 会跨多轮执行。
- 有自己的验收标准。
- 有独立产物，例如实验代码、报告、数据集。
- 可能由不同 Agent 或不同会话长期执行。

升级成子 case 时，必须记录：

- `parentCase`
- `triggerDecision`
- `returnTo`
- `expectedOutput`
- `howResultFeedsParent`

这样 case index 可以保持树状语义，而不是把父目标、决策分支、实验分支都膨胀成平级 case。

## 完整生命周期

1. Goal：创建或恢复 case，定目标、上下文和完成标准。
2. Think：按需调研、比较和做决策。
3. Design：找到复杂度爆点，做最小必要解耦，形成工作包。
4. Execute：按 work package 推进，写回执行记录。
5. Verify：验收目标、工作包结果和设计护栏。
6. Close：归档、更新索引、整理 Weave Candidate。

## 关键原则

1. Case 是短周期目标容器，不是长期 OKR，也不是普通 todo。
2. Phase 是 case 内部状态，不是独立 skill。
3. Think 可以在 case 内发生，用来处理推进中的未知和抉择。
4. Design 先找复杂度爆点，不做过度完整抽象。
5. Case 内部使用 phase-first 目录结构，不用顶层 `doc/` / `steps/` 作为新结构。
6. Work Package 是 Execute phase 的目标包，不是微步骤。
7. Execute 按架构横向铺模块，不纵向堆版本。
8. Verify 要检查设计护栏，不只检查代码是否运行。
9. Close 前必须保证 case 是完整闭环；没完成就回到对应 phase。
10. 可复用知识进入 Weave Candidate；一次性过程留在对应 phase / work package。
11. 旧 `aipd-case-create`、`aipd-case-run`、`aipd-case-archive` 已合并进 `aipd-case`，不再作为独立 skill 暴露。

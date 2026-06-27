# Case 机制总览

Case 是 AIPD 的短周期目标容器：一次马上要推进、需要 AI 参与、最终要验收关闭的具体事项。

Case 类似 OKR，都会定目标并连接大方向上下文；但 OKR 面向长期周期、持续对齐和复盘，Case 面向当前目标的 Think、Design、Execute、Verify 和 Close。一个 case 推完，应该是一个完整事情闭环，而不是“只推进了一部分，后面还要隐藏补一堆 case”。

## 生命周期

新的 case 生命周期按契约和 phase 渐进推进：

```text
Case Contract -> Think -> Design -> Execute -> Verify -> Close
```

| 区块 / Phase | 作用 |
|---|---|
| Case Contract | 写在 `case.md` 顶部，定义目标、边界、验收标准和上下文索引 |
| Think | 信息不足或需要抉择时，做同步、调研、比较和决策 |
| Design | 找复杂度爆点，形成文件 / 文件夹级架构边界和工作包 |
| Execute | 按工作包推进，可以使用目标模式和执行 Agent |
| Verify | 验收目标、工作包结果和设计护栏 |
| Close | 归档、更新索引、整理 Weave Candidate |

`Goal` 不再是独立 phase。目标和边界不是一段过程材料，而是整个 case 的契约；后续所有 phase 都必须以 `case.md` 中的 Case Contract 为上下文。

`aipd-case` 是统一入口。它先读取 case.md 的 `Case Contract`、`Current Phase` 和 `Phase State`，再按当前 phase 加载 `case/phases/{phase}.md`。不要把每个 phase 拆成独立 skill；phase 是 case 内部状态，不是用户需要记住的一组命令。

## Phase-first 目录结构

Case 内部也要遵守横向平摊原则。新建 case 不再按材料类型拆成顶层 `doc/`、`steps/`、`code/`，也不再把目标拆成独立 `01-goal/` 目录，而是把目标契约放在 `case.md`，其余展开材料按 phase 平铺：

```text
_adoc/case/cX.Y-name/
├── case.md
├── 01-think/
├── 02-design/
├── 03-execute/
├── 04-verify/
└── 05-close/
```

每个 phase 自己收纳本阶段的材料：

- Think 的调研、实验、数据采样和方案比较分支写入 `01-think/{branch}/`。
- Design 的复杂度爆点、架构边界、文件 / 文件夹级设计和决策记录写入 `02-design/`。
- Execute 的总状态和 work package 写入 `03-execute/`。
- Verify 和 Close 分别写入 `04-verify/`、`05-close/`。

`case.md` 是入口和状态聚合，不承载所有过程细节。它保存 Case Contract、Current Phase、Phase State、关键摘要、上下文索引、Weave Candidate 和各 phase 文件链接。

## Case 文件的价值

Case 不只是任务清单。它的价值是把本次事项的目标、上下文索引、关键决策、设计边界、横向工作包、验收状态和 Weave Candidate 固定成文件事实源。

`case.md` 可以同时放“目标边界”和“任务推进”，但必须分区：

- **Case Contract**：目标、方向 / OKR / 项目阶段关联、要做、不做、验收标准、上下文索引。
- **Case Runtime**：Current Phase、Phase State、当前焦点、下一步、待确认项、阻塞项。
- **Phase Summaries**：Think / Design / Execute / Verify / Close 的压缩摘要和链接。

当聊天被压缩、中断或多个 Agent 接力时，case.md 是恢复入口。聊天上下文只是临时工作缓存；如果聊天记忆和 case 文件冲突，以 case 文件为准。

## Think 在 Case 内

旧模型里，Think 位于 Case 之前，用来判断模糊想法是否值得创建 case。新模型保留这个判断，但对于已经定下短周期目标的事项，Think 也可以作为 Case 内 phase 存在。

Think phase 是分支材料容器，不是无限展开的思考池。每个 `01-think/{branch}/` 都应该有自己的目标：要调研什么、比较什么、验证什么或同步什么。分支内可以随便折腾，但结束时必须给出结论，并说明结论回流到 Case Contract、Design、Execute、Verify 还是 Weave Candidate。

## Design 的核心认知

Design 的目标不是完整抽象所有概念，而是找到复杂度爆点，并对爆点做最小必要解耦，让后续执行可以横向铺模块，而不是纵向堆版本。

Design 在 AIPD Case 里更接近“架构设计”。它不只是写功能边界，也不只是展示方法论；它要把架子具象化到执行 Agent 能理解的程度：

- 要创建哪些文件夹？
- 每个文件夹负责什么？
- 文件夹里有哪些文件？
- 每个文件承担什么职责？
- 哪些文件之间允许引用，哪些不允许？
- 什么改法会把复杂度重新堆回主干？

例如搜索列表的复杂度爆点可能不是表格渲染，而是 API 调用前的参数组装：

```text
搜索 API 参数会随筛选项增加而膨胀
-> 每个 Filter 自治产出 postValue
-> Controller 只管何时触发搜索
-> Pagination 是带搜索语义的特殊 Filter
-> 页面 onSearch 只收集参数并调用 API
```

这种设计让后续新增筛选项时横向增加 filter 模块，而不是在旧搜索函数上继续堆逻辑。AIPD 的 Design phase 应优先找到这种爆点，并把它落到文件 / 文件夹级架构边界。

## Work Package / Step

Step 的语义调整为 Work Package：一个可验收、可派发、可恢复的目标包。

Work Package 不再表示“先做 list，再加分页，再加搜索，再加筛选”的堆叠式微步骤。它应围绕 Design phase 的架构边界列出一个或多个横向模块，让执行 Agent 依据目标、上下文、设计护栏和验收口径推进。

一个 Work Package 应包含：

- 目标。
- 设计依据：复杂度爆点、文件 / 文件夹级架构、主干职责、特殊节点和设计护栏。
- 横向模块。
- 必读上下文。
- 验收标准。
- 不做范围。
- 执行记录。

Work Package 只属于 Execute phase。新建 work package 写入 `03-execute/work-packages/`。旧 case 的 `steps/` 目录不再兼容运行；遇到旧结构时先提示用户是否迁移为当前结构。

## Agent 执行关系

Agent 不需要被指挥先迈左腿还是右腿。AIPD 应提供的是：

- 目标。
- 上下文索引。
- 复杂度爆点和文件 / 文件夹级架构边界。
- 工作包边界。
- 验收标准。
- 禁止破坏的设计护栏。

进入 Execute phase 后，主 Agent 负责用户沟通、状态判断、派发、审查和写回。执行 Agent 或目标模式围绕 `03-execute/work-packages/` 下的 work package 运行。文件修改、构建、测试、批量验证、跨文件 diff、长调研和长日志分析优先交给执行 Agent；主 Agent 接收压缩结果并写回 case。

## 运行节奏

Case 运行要有节奏感，不应一恢复就直接跨 phase 推进。

- 恢复 case 后先输出状态卡：文件事实、用户当前认知、冲突点、当前 phase 条件、建议下一步。
- Case Contract 发生变化时，先说明这是目标 / 边界变化，再写回。
- Think -> Design、Design -> Execute、Verify -> Close 这类关键跳转需要用户确认。
- Design 产物没有得到用户确认前，不创建正式 Execute work package。
- 执行中发现边界变化、架构变化或实现偏差时，先回到对应层处理，不把偏差直接混进执行记录。

## 子 Case

复杂 case 可能产生调研、实验或数据采样分支。默认先作为当前 case 的 phase 内容记录：调研和数据采样放入 `01-think/{branch}/`，架构判断放入 `02-design/`，真正执行才进入 `03-execute/work-packages/`。

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

1. Case Contract：创建或校准 case，定目标、上下文、边界和完成标准。
2. Think：按需调研、比较和做决策。
3. Design：找到复杂度爆点，形成文件 / 文件夹级架构边界和工作包。
4. Execute：按 work package 推进，写回执行记录。
5. Verify：验收目标、工作包结果和设计护栏。
6. Close：归档、更新索引、整理 Weave Candidate。

## 关键原则

1. Case 是短周期目标容器，不是长期 OKR，也不是普通 todo。
2. Goal 不再是独立 phase；目标、边界和验收标准属于 `case.md` 的 Case Contract。
3. Phase 是 case 内部状态，不是独立 skill。
4. Think 可以在 case 内发生，用来处理推进中的未知和抉择。
5. Design 是架构设计，先找复杂度爆点，并落到文件 / 文件夹级边界。
6. Case 内部使用 contract + phase-first 目录结构，不用顶层 `doc/` / `steps/` / `01-goal/` 作为新结构。
7. Work Package 是 Execute phase 的目标包，不是微步骤。
8. Execute 按架构横向铺模块，不纵向堆版本。
9. Verify 要检查设计护栏，不只检查代码是否运行。
10. Close 前必须保证 case 是完整闭环；没完成就回到对应 phase。
11. 可复用知识进入 Weave Candidate；一次性过程留在对应 phase / work package。
12. 旧 `aipd-case-create`、`aipd-case-run`、`aipd-case-archive` 已合并进 `aipd-case`，不再作为独立 skill 暴露。

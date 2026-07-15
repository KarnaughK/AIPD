# Case 机制总览

Case 是 AIPD 的短周期目标容器：一次马上要推进、需要 AI 参与、最终要验收关闭的具体事项。

Case 类似 OKR，都会定目标并连接大方向上下文；但 OKR 面向长期周期、持续对齐和复盘，Case 面向当前目标的 Think、Design、Execute、Verify 和 Close。一个 case 推完，应该是一个完整事情闭环，而不是“只推进了一部分，后面还要隐藏补一堆 case”。

## 标识不是版本号

Case 和 Work Package 的标识只用于定位，不表达产品版本、框架代际或大 / 小版本：

- Case 使用 `cN-slug`。`N` 是当前项目内单调递增的 Case 流水号，例如 `c14-case-identifier-simplification`。
- Work Package 使用 `wp-NN-slug`。`NN` 是所属 Case 内从 `01` 开始的局部排序号，例如 `wp-01-update-case-naming-contract`。
- Case 外引用 Work Package 时使用 `cN/wp-NN`，例如 `c14/wp-01`。
- 产品发布版本独立管理；不能用 Case ID 表达 `major.minor.patch`，也不能因产品升版重置或增加 Case 编号层级。

新 Case 不再使用 `cA.B` / `cX.Y`，新 Work Package 不再使用 `cA.B.N`。从旧结构迁移时，应按项目内真实 Case 顺序建立映射，不能把看起来像版本号的字符串无差别替换。

## 生命周期

新的 case 生命周期按契约和 phase 渐进推进：

```text
Case Contract -> Think -> Design -> Execute -> Verify -> Close
```

| 区块 / Phase | 作用 |
|---|---|
| Case Contract | 写在 `case.md` 顶部，定义目标、边界、验收标准和上下文索引 |
| Think | 信息不足或需要抉择时，做同步、调研、代码实验、数据采样、比较和决策 |
| Design | 从需求契约到后端 / 前端设计，再到上下文解耦、文件边界和 work package |
| Execute | 按工作包推进，可以使用目标模式和执行 Agent |
| Verify | 验收目标、工作包结果和设计护栏 |
| Close | 归档、更新索引、整理归档候选 / 反向编织候选 |

`Goal` 不再是独立 phase。目标和边界不是一段过程材料，而是整个 case 的契约；后续所有 phase 都必须以 `case.md` 中的 Case Contract 为上下文。

`aipd-case` 是统一入口。它先读取 case.md 的 `Case Contract`、`Current Phase` 和 `Phase State`，再按当前 phase 加载 `case/phases/{phase}.md`。不要把每个 phase 拆成独立 skill；phase 是 case 内部状态，不是用户需要记住的一组命令。

## 主流程和回跳

Case 有默认推进主线，但不是单向瀑布：

```text
Case Contract -> Think -> Design -> Execute -> Verify -> Close
```

这条主线是导航，不是锁链。后续节点随时可能发现上游缺口，并带原因回跳：

- Design 设计数据库、API 或前端状态时发现新需求：回到 Requirements Contract 或 Domain Rules。
- Design 需要外部资料、竞品参考、代码实验或数据采样：回到 Think 创建 `01-think/{branch}/`，收口后再回 Design。
- Execute 发现设计不成立：回到 Design，而不是把偏差混进执行记录。
- Verify 发现验收标准不完整：回到 Case Contract / Design / Verify 对应位置修正。

回跳必须记录触发原因、新发现的问题、需要更新的上游 artifact、受影响的下游设计或 work package，以及是否需要用户确认目标 / 边界 / 验收标准变化。

## Phase-first 目录结构

Case 内部也要遵守横向平摊原则。新建 case 不再按材料类型拆成顶层 `doc/`、`steps/`、`code/`，也不再把目标拆成独立 `01-goal/` 目录，而是把目标契约放在 `case.md`，其余展开材料按 phase 平铺：

```text
_adoc/case/cN-name/
├── case.md
├── 01-think/
├── 02-design/
├── 03-execute/
├── 04-verify/
└── 05-close/
```

每个 phase 自己收纳本阶段的材料：

- Think 的调研、实验、数据采样和方案比较分支写入 `01-think/{branch}/`。Think 是 case 的探索工作台，不只发生在 Design 前，也可以由 Design / Execute / Verify 回跳触发。
- Design 的需求契约、领域规则、brownfield delta、后端设计、前端设计、上下文边界、文件 / 文件夹级设计、readiness gate 和决策记录写入 `02-design/`。
- Execute 的总状态和 work package 写入 `03-execute/`。
- Verify 和 Close 分别写入 `04-verify/`、`05-close/`。

`case.md` 是入口和状态聚合，不承载所有过程细节。它保存 Case Contract、Current Phase、Phase State、关键摘要、上下文索引、Close 归档候选和各 phase 文件链接。

## Case 文件的价值

Case 不只是任务清单。它的价值是把本次事项的目标、上下文索引、关键决策、设计边界、横向工作包、验收状态和 Close 归档候选固定成文件事实源。

`case.md` 可以同时放“目标边界”和“任务推进”，但必须分区：

- **Case Contract**：目标、方向 / OKR / 项目阶段关联、要做、不做、验收标准、上下文索引。
- **Case Runtime**：Current Phase、Phase State、当前焦点、下一步、待确认项、阻塞项。
- **Phase Summaries**：Think / Design / Execute / Verify / Close 的压缩摘要和链接。

当聊天被压缩、中断或多个 Agent 接力时，case.md 是恢复入口。聊天上下文只是临时工作缓存；如果聊天记忆和 case 文件冲突，以 case 文件为准。

## 文件优先 checkpoint

Case 的长期连续性来自文件 checkpoint，不来自聊天记忆。Agent 每推进一个会影响恢复路径的小步，都应把状态写回 case / phase / work package 文件，再进入下一步。

需要 checkpoint 的典型时机：

- 大调研、长日志分析、批量验证、子 Agent 派发或目标模式运行前：写清当前问题、边界、预期输出、停止条件和返回位置。
- 用户确认需求、规则、设计边界、执行结果或验收口径后：写回 confirmed / assumed / open / deferred / out 或对应状态。
- phase 跳转、回跳、重开、work package 创建、执行完成或验证失败后：写回触发原因、当前游标、下一步和受影响下游。

checkpoint 不等于把聊天全文搬进文档。它只保留具备恢复价值的事实：现在在哪里、为什么到这里、哪些结论已确认、哪些仍未确认、下一步回哪里。临时讨论、未采纳想法和不改变状态的解释不应进入长期文件。

## Think 在 Case 内

旧模型里，Think 位于 Case 之前，用来判断模糊想法是否值得创建 case。新模型保留这个判断，但对于已经定下短周期目标的事项，Think 也可以作为 Case 内 phase 存在。

Think phase 是分支材料容器，不是无限展开的思考池。每个 `01-think/{branch}/` 都应该有自己的目标：要调研什么、比较什么、验证什么或同步什么。分支内可以随便折腾，但结束时必须给出结论，并说明结论回流到 Case Contract、Design、Execute、Verify 还是 Close 归档候选。

Think 分支可以放 `summary.md`、`evidence.md`、`code/`、`data/` 等材料。它的价值是给调研、spike code、临时实验和证据摘录一个可恢复位置，避免散落在聊天或项目根目录。只有当分支需要独立恢复状态、独立验收或跨多轮长期推进时，才升级成子 case。

## Design 的核心认知

Design 的目标是把 case 从需求和规则推进到可执行、可验收、可恢复的方案。它先固定需求契约和领域规则，再设计底层事实源、后端 contract、前端状态，最后做 AIPD 特有的上下文解耦和文件 / 文件夹级边界。

Design 在 AIPD Case 里不是单纯“架构设计”，也不是完整视觉设计。它要把目标具象化到执行 Agent 能理解的程度：

- 需求、规则、边界和验收标准是否清楚？
- 哪些需求是 confirmed / assumed / open？
- 现有系统中本 case 要改变什么？
- 底层事实源、数据对象、API contract、缓存、安全和错误边界是什么？
- 前端信息架构、交互状态、状态来源和组件边界是什么？
- 复杂度爆点和最小必要解耦是什么？
- 文件 / 文件夹如何组织，哪些局部重复可接受？
- work package 如何切成可派发、可验收、可恢复的目标包？

例如搜索列表的复杂度爆点可能不是表格渲染，而是 API 调用前的参数组装：

```text
搜索 API 参数会随筛选项增加而膨胀
-> 每个 Filter 自治产出 postValue
-> Controller 只管何时触发搜索
-> Pagination 是带搜索语义的特殊 Filter
-> 页面 onSearch 只收集参数并调用 API
```

这种设计让后续新增筛选项时横向增加 filter 模块，而不是在旧搜索函数上继续堆逻辑。AIPD 的 Design phase 仍要找到这种爆点，并把它落到文件 / 文件夹级架构边界；只是这个动作应建立在需求、规则、后端和前端设计足够清楚之后。

Design 复杂 case 可按需展开：

- `requirements-contract.md`
- `edge-cases.md`
- `brownfield-delta.md`
- `backend-design.md`
- `frontend-design.md`
- `context-boundary.md`
- `readiness-gate.md`
- `decision-log.md`

不要因为流程节点存在就默认创建所有文件。只有当该节点产生可恢复、可复查、会被后续阶段引用的材料时，才拆出独立文件。

## Work Package / Step

Step 的语义调整为 Work Package：一个可验收、可派发、可恢复的目标包。

Work Package 不再表示“先做 list，再加分页，再加搜索，再加筛选”的堆叠式微步骤。它应围绕 Design phase 的架构边界列出一个或多个横向模块，让执行 Agent 依据目标、上下文、设计护栏和验收口径推进。

一个 Work Package 应包含：

- 目标。
- 设计输入：requirements、domain rules、brownfield delta、backend / frontend design、context boundary、readiness gate。
- 不允许固化的假设。
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
- 执行中想到“以后可能要反向编织”的内容，先记入 Close phase 的归档候选；case 未完成前不写入 L1-L5、README 或 map。

## Close 归档候选

Close 归档候选是 case 内部的待复核清单，不是长期知识库内容。

当用户在进行中 case 里调用 `aipd-weave`，或说“记一下，看需不需要反编织回去”时，Agent 应提示当前 case 尚未完成，并把候选记录到 `05-close/close.md` 或 case.md 的 Close 摘要。候选应标注当前状态和候选归属。

只有 case 完成、实现落地并通过验收后，Close phase 才把其中已经成为现有项目事实的候选交给 `aipd-weave`。未实现设计、未来计划、临时讨论和未完成 work package 继续留在 case。

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
3. Design：固定需求契约和规则，设计后端 / 前端，再形成上下文边界、文件 / 文件夹级架构和工作包。
4. Execute：按 work package 推进，写回执行记录。
5. Verify：验收目标、工作包结果和设计护栏。
6. Close：归档、更新索引、整理归档候选 / 反向编织候选。

## 关键原则

1. Case 是短周期目标容器，不是长期 OKR，也不是普通 todo。
2. Goal 不再是独立 phase；目标、边界和验收标准属于 `case.md` 的 Case Contract。
3. Phase 是 case 内部状态，不是独立 skill。
4. Think 可以在 case 内发生，用来处理推进中的未知、调研、实验和抉择；Design / Execute / Verify 都可以带原因回跳到 Think。
5. Design 是从需求契约到可执行方案的设计流程，不只是架构设计；复杂度爆点和文件边界是后半段的 AIPD 特有增量。
6. Case 内部使用 contract + phase-first 目录结构，不用顶层 `doc/` / `steps/` / `01-goal/` 作为新结构。
7. Work Package 是 Execute phase 的目标包，不是微步骤。
8. Execute 按架构横向铺模块，不纵向堆版本；如果执行发现设计不成立，回到 Design。
9. Verify 要检查设计护栏，不只检查代码是否运行。
10. Close 前必须保证 case 是完整闭环；没完成就回到对应 phase。
11. 可复用知识先进入 Close 归档候选；只有 case 完成、实现落地并验收后，才由 `aipd-weave` 判断是否进入长期知识库。
12. 旧 `aipd-case-create`、`aipd-case-run`、`aipd-case-archive` 已合并进 `aipd-case`，不再作为独立 skill 暴露。

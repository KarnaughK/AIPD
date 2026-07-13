# Work Package 上下文隔离设计指引

Work Package 是 case 内可由 Main 或 Child 执行的目标包，不是微观操作步骤，也不等于子 Agent 派发节点。拆 work package 时优先判断上下文边界和设计护栏，而不是优先按组件、文件、页面区域或人力分工切块。

新建 case 中，Work Package 放在 `03-execute/work-packages/`。历史目录仍可能叫 `steps/`，旧 case 也可能仍有独立 `01-goal/`，但不再兼容运行；继续推进前应先迁移为当前 contract + phase-first case。

## 核心原则

- 一个 work package 应该能只凭自己的文件、case.md、`02-design/design.md` 和列出的上下文文档独立执行。
- 如果两个 work package 之间必须共享上一轮未沉淀的临时判断、半成品方案、隐形状态或口头约定，优先合并成一个 work package。
- 如果确实需要拆开，先把共享判断沉淀到 case.md、`02-design/design.md`、局部 README、架构图、接口说明或上下文索引，再让后续 work package 读取它。
- 聊天中已经被用户确认、且 work package 会依赖的方案预览、叙事路径、目录草案、接口设计、组件关系、执行策略或关键取舍，也属于必须沉淀的上下文。创建详细 work package 时，应写入“已确认设计输入”或等价区块，不能只留缩略关键词。
- work package 的依赖关系只表达执行顺序，不承载隐形上下文。`依赖: cX.Y.Z` 不等于“可以记住上一个工作包里的判断”。
- work package 之间可以共享稳定文档、代码入口和验收口径，但不共享未写入文件的临时过程。
- 派发给子 Agent 的 prompt 应尽量短，只包含身份 / 指引链接、work package 链接、case 链接和返回格式。任务正文、上下文清单和验收标准应写在 work package 文件里，不在 prompt 里展开。

## 拆分判断

适合拆成多个 work package：

- 每个 work package 都有独立目标、独立验收标准和明确上下文文档。
- 上一步的输出是文件级稳定结果，下一步只需要读取这些文件即可继续。
- 不同 work package 的失败、回滚或重做不会让其他 work package 的任务描述失效。

不适合拆成多个 work package：

- 后一个 work package 必须依赖前一个 work package 的口头方案、聊天判断或未写入文档的上下文。
- 多个 work package 共同修改同一个强耦合黑箱，且任何一个 work package 单独完成都无法验收。
- 拆分只是因为涉及多个组件，但这些组件共同表达同一条业务链路，必须同时理解和调整。
- work package 之间需要频繁互相解释“为什么上一步那样设计”。

## 推荐做法

- 先确定当前 work package 的最小可验收黑箱：一个页面入口、一个弹框根、一个 `useXxx` 数据中枢、一条完整提交链路，一组同构模块，或一份架构图。
- 对强耦合链路，宁可一个 work package 稍大，也不要拆成多个互相依赖的半工作包。
- 对可沉淀的共享判断，先写入 case.md、`02-design/design.md`、局部 README 或 Mermaid 图，再拆后续执行 work package。
- work package 文件里的上下文文档要列“执行前必须读什么”，不要列无关背景材料。
- 大型任务优先创建 case 和 work package，再按运行时收益选择 Main 或 Child。决定派发后只传 work package、case、角色指引和返回格式，不把长任务描述直接塞给子 Agent。

## 反例

- `wp1` 先讨论 provider 怎么设计，`wp2` 再按聊天里确认的 provider 设计写组件，但 provider 设计没有写入任何文件。
- `wp1` 改父组件，`wp2` 改子组件，但两者共同决定同一个表单提交协议，任一 work package 单独完成都无法验收。
- `wp1` 画组件图，`wp2` 实现组件，但组件图没有作为结果文件写入，也没有列入 `wp2` 上下文文档。
- 派发 prompt 先贴一大段任务说明，再在末尾说“请参考某某规范”。这会让子 Agent 更容易直接执行长任务，忽略先读规范和 work package 的顺序。

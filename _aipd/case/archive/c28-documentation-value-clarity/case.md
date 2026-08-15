# Case: c28-documentation-value-clarity

> **本次事项目标**：让用户在四个文档入口先看见“每次 AI 开发建立在上一次之上”的结果，再理解项目记忆与 AIPD 的机制。
> **当前 Phase**：Close

## Case Contract

### 目标

- **目标**：重排 README 与两篇入门 Guide 的理解顺序，让用户无需先理解 AIPD 内部对象，就能识别它解决的长期 AI 开发断层。
- **方向 / Mission 关联**：`m2-documentation-value-clarity`；核心价值是“让每一次 AI 开发都建立在上一次之上，而不是重新理解整个项目”。

### 要做

- 修改 `README.md` 标题后的首屏价值入口与进入首个正文前的必要衔接。
- 修改 `docs/README.md` 的开场分流说明。
- 修改 `docs/guide/01-from-vibe-coding-to-agent-coding.md` 的开场与必要价值衔接。
- 修改 `docs/guide/02-aipd-three-main-lines.md` 的开场与必要价值衔接。
- 在 Design 与 Verify 执行用户价值清晰度检查和 Reduction Scan。

### 不做

- 不修改上述开场范围之外的用户文档，不修改 Skill、脚本、dist、Knowledge 或运行行为。
- 不改写已有链接、快速开始和后续技术事实；不承诺 Agent 永不出错。
- 不 build、install、commit、push、发布、远端写入或修改 Leader checkout。
- 不创建同级 Codex task；本 Case 由当前 owner 直接推进。

### 完成标准

- [x] 根 README 前 3-5 行先出现用户处境和“每次 AI 开发建立在上一次之上”的结果。
- [x] 三类继承对象清楚出现：项目判断与边界、当前任务状态、已验证经验。
- [x] “项目记忆 / AIPD”在价值被理解后再作为概念总结出现。
- [x] 四个入口主线一致、职责不同，没有复制同一段。
- [x] Design / Verify 均记录第一眼、随后理解、自然下一步与 delete / merge / defer / reorder 判断。
- [x] 本地链接、锚点、术语、Markdown 格式和写入范围检查通过。

### 上下文索引

- `_aipd/map.md`：命中“docs / 学习文档 / README / 教学文档 / 三条主线”。
- `_aipd/knowledge/intent/intent.md`：核对 AIPD 已确认方向、继承对象与适用边界，只读。
- `README.md`、`docs/README.md`、`docs/guide/01-from-vibe-coding-to-agent-coding.md`、`docs/guide/02-aipd-three-main-lines.md`：唯一用户文档写入范围。
- `_aipd/case/archive/c18-readme-learning-docs-productization/05-close/close.md`：核对既有文档职责与验证基线，只读。
- `aipd-case` 实践经验：`teaching-docs-as-product.md`、`product-design-attention-reduction.md`。
- `01-think/think.md`、`02-design/design.md`、`03-execute/execute.md`、`04-verify/verify.md`、`05-close/close.md`：phase 事实源。
- 兜底搜索：`rg "项目记忆|每一次|从零|判断|边界|任务状态|已验证" README.md docs/README.md docs/guide`。

### 边界变更记录

- 2026-08-13：按用户授权固定四个文档入口和本 Case 状态文件为唯一写入范围；Leader checkout 的未提交文档改动作为集成条件，不扩大本工作树范围。

## Case Runtime

## Current Phase

Close

## Phase State

- Think: completed -> `01-think/think.md`
- Design: completed -> `02-design/design.md`
- Execute: completed -> `03-execute/execute.md`
- Verify: completed -> `04-verify/verify.md`
- Close: completed -> `05-close/close.md`

## 当前焦点

- **当前要解决的问题**：已完成；保留归档事实和 Leader 集成注意事项。
- **当前游标**：`05-close/close.md`
- **最近 checkpoint**：Close 完成；长期认知候选、archive 决策、未执行动作和 Leader 集成风险已收束。
- **下一步建议**：由 Leader 按精确语义小块集成，无本 Case 内后续动作。
- **压缩后恢复入口**：本文件、`04-verify/verify.md`、`05-close/close.md`。
- **待确认项**：无；用户已明确授权完整推进 Think / Design / Execute / Verify / Close。
- **阻塞项**：无。

## 状态卡记录

- **文件事实**：c28 为新建 contract + phase-first Case；现有四个入口事实准确，但开场以框架术语和机制为主。
- **用户认知**：清晰的目标是让用户先看见变化，不是增加术语精度。
- **冲突点**：无；隔离 worktree 不含 Leader checkout 未提交文档差异是已知集成条件。
- **当前 phase 条件**：已具备现状文本、价值合同、入口职责与验证经验。
- **建议下一步**：Think 收口后进入 Design。

## Checkpoint 记录

| 时间 | 位置 | 触发 | 已确认 / 已变化 | open / assumed | 下一步 | 恢复入口 |
|---|---|---|---|---|---|---|
| 2026-08-13 | Think | Case 创建 / 调研前 | gate 通过；目标、边界、四入口职责和成功判据已固定 | 无 | 收口 Think，进入 Design | `case.md#case-contract`、`01-think/think.md` |
| 2026-08-13 | Think -> Design | phase 跳转 | Think 选择共享因果主线、四入口职责分工；准确性护栏固定 | 无 | 形成可执行文案设计 | `01-think/think.md#think-结论`、`02-design/design.md` |
| 2026-08-13 | Design -> Execute | phase 跳转 | Attention Contract、Design Reduction Scan、文件边界完成；Readiness Gate passed | 无 | 创建并执行 wp-01 | `02-design/design.md#readiness-gate`、`03-execute/work-packages/wp-01-value-first-documentation-entry.md` |
| 2026-08-13 | Execute -> Verify | work package 完成 / phase 跳转 | wp-01 完成四入口文案重排；无偏差、无回跳 | Leader 集成风险仍保留 | 验收真实 diff | `03-execute/work-packages/wp-01-value-first-documentation-entry.md#执行记录`、`04-verify/verify.md` |
| 2026-08-13 | Verify -> Close | Verify Gate | 价值清晰度、Reduction Scan、链接 / 锚点 / 格式 / 范围全部 passed | Leader 集成风险仍保留 | Close 并归档 c28 | `04-verify/verify.md#verify-result`、`05-close/close.md` |
| 2026-08-13 | Close | archive | Contract、wp-01、Verify 和长期认知审计完成；无外部路径引用 | 仅 Leader 语义合并风险 | 移入 archive，结束 Case | `05-close/close.md#关闭结果` |

## 回跳 / 重开记录

当前无。

## Think 摘要

- **状态**：completed
- **关键问题**：如何把“项目长期记忆”从理解前提改为用户已经理解价值后的概念总结。
- **决策结论**：采用“共享因果主线、分别承担用户任务”；先呈现三类可继承成果，再命名项目记忆 / AIPD，并回流到 Design 的注意力契约与四入口职责。

## Design 摘要

- **模式**：quick
- **理由**：只重排四个 Markdown 入口的开场与必要衔接，不改变功能、架构或运行行为。
- **当前节点**：readiness-gate
- **节点状态**：completed
- **本节点要回答的问题**：四个入口各自应让用户先看见什么、随后理解什么、自然去哪里。
- **本节点停止点**：价值顺序、边界和 Reduction 方案可执行。
- **下一节点建议**：requirements -> attention / content design -> work-package-draft -> readiness-gate。
- **节点 checkpoint**：Attention Contract 和 Design Reduction Scan 已写回，Readiness Gate passed。

### 需求契约

- **状态**：ready；confirmed 为用户明确的核心价值、四入口职责、三类继承对象、准确性和写入边界；assumed / open 均无。

### Attention Contract / Reduction

- **入口**：`02-design/design.md#attention-contract`、`02-design/design.md#design-reduction-scan`。
- **结论**：先出现用户处境与结果，再命名项目记忆 / AIPD，内部对象后置；四入口分别承担价值识别、意图分流、失败机制和累积机制。

### Readiness Gate

- **状态**：passed。
- **阻塞项**：无。
- **可带入 Execute 的风险**：Leader 集成时必须按语义小块合并。

## Execute 摘要

- **当前执行游标**：无；wp-01 completed。
- **最近执行 checkpoint**：四文件精确修改完成，未触碰其他用户文档、Skill、脚本、dist、Knowledge 或运行行为。
- [x] `03-execute/work-packages/wp-01-value-first-documentation-entry.md` - 在四个入口实现价值优先且职责分明的开场。（Main 直接执行）

## Verify 摘要

- [x] 用户价值清晰度与 Reduction Scan 通过。
- [x] 四入口职责、三类继承对象和准确性通过。
- [x] 链接、锚点、术语、格式和写入范围通过。

### 验收结果

- **状态**：passed
- **残留风险**：Leader 最终需按精确小块 diff 与其未提交文档版本合并。

## Close 归档候选 / 反向编织候选

| 候选内容 | 触发来源 | 当前状态 | 候选归属 | Close 判断 |
|---|---|---|---|---|
| 四类文档入口的价值清晰度与职责分工 | Design / Verify | 已完成、已验收 | 仅留 Case | 不回写 Knowledge；由最终文档和本 Case 保留事实 |

## Close 摘要

- **状态**：已归档
- **创建时间**：2026-08-13
- **归档时间**：2026-08-13
- **归档位置**：`_aipd/case/archive/c28-documentation-value-clarity/`

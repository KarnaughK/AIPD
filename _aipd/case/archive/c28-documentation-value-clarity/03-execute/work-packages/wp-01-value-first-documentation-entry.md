# Work Package: wp-01 - 价值优先文档入口

> **所属 Case**: c28-documentation-value-clarity
> **Phase**: Execute
> **类型**: docs
> **推荐 Agent**: Main Agent
> **依赖**: `02-design/design.md`
> **拓扑敏感**: 否

## 目标

在四个授权入口实现“处境与结果在前、项目记忆 / AIPD 命名在后、机制随后展开”的价值主线，同时维持各入口不同的用户任务。

## 设计依据

- Requirements / Brownfield / Attention / Reduction / Readiness：`02-design/design.md`。
- Readiness Gate：passed。
- 复杂度爆点：四页若分别润色会复制价值宣言或产生定义漂移。
- 解耦方式：共享价值合同，但按价值识别、意图分流、失败机制、累积机制分别写作。
- 文件边界：`README.md`、`docs/README.md`、Guide 01、Guide 02 的开场和必要价值衔接。

## 不允许固化的假设

- 无 assumed / open；不得新增“Agent 永不出错、自动理解一切、无需人工判断”等承诺。

## 并列工作项

- [x] 根 README 在前 3-5 行完成价值识别，并保留链接和后续正文。
- [x] docs 索引按用户当前意图分流，不复制根 README。
- [x] Guide 01 从真实失败结果进入，并把失败机制收束到三类继承需求。
- [x] Guide 02 承接前章，把三类成果对应到任务前 / 中 / 后的累积循环。

## 上下文文档

- `case.md`
- `01-think/think.md`
- `02-design/design.md`
- `_aipd/knowledge/intent/intent.md`（只读）
- 四个目标文档现有内容

## 执行前 checkpoint

- **当前目标**：交付四个职责不同、主线一致的价值优先开场。
- **恢复入口**：Case Contract、Design Attention Contract、本 Work Package。
- **执行边界**：允许修改四个开场与必要价值衔接；其他项目文件不改。
- **预期输出**：四文件精确 diff、Reduction Delta、自动检查和残留风险。
- **停止条件**：完成；或发现必须改变事实、链接、技术机制、写入范围时停止并回 Design。
- **返回位置**：写回 Work Package 与 `execute.md`，然后进入 Verify。

## 验收标准

- [x] 根 README 前 3-5 行先出现“每次 AI 开发建立在上一次之上”的用户结果。
- [x] 三类继承成果明确，且项目记忆在价值后命名。
- [x] 四入口无同段复制，第一眼 / 随后理解 / 自然下一步符合 Attention Contract。
- [x] 只有授权区块变化；既有链接、锚点、快速开始和后续技术事实保留。

## 不做

- 不修改其他 docs、Skill、脚本、dist、Knowledge 或运行行为。
- 不 build、install、commit、push、发布或远端写入。

## 执行记录

**状态**：completed

**完成时间**：2026-08-13

**主要改动**：

- 根 README 删除过早的框架 slogan、三条能力清单和重复总结，改为结果句、三类继承成果和准确性护栏。
- docs 索引用“已经做过的 AI 开发继续产生作用”承接价值，并把三种入口改写成可选择的当前意图。
- Guide 01 先呈现“下一次又从零开始”的失败结果，再把代码 / 聊天 / 搜索缺口收束为三类可继承成果。
- Guide 02 先明确三类成果，再把它们对应到任务前 / 中 / 后的累积循环。

**验证结果**：执行阶段人工对照 Attention Contract 通过；自动链接、锚点、范围和格式检查进入 Verify。

**执行后 checkpoint**：

- **当前结论**：四个入口已完成，未发现需要改变事实、链接、技术机制或范围的 Design 缺口。
- **下一步**：进入 Verify，执行用户价值清晰度、Reduction Scan 和自动检查。
- **恢复入口**：`02-design/design.md#attention-contract`、本文件执行记录、`04-verify/verify.md`。

**遇到的问题**：无。

**回跳 / 重开**：无。

**Weave 候选**：无；文档入口职责的验证结果仅留 Case。

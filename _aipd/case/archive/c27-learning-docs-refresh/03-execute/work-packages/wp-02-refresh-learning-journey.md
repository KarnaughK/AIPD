# Work Package: wp-02 - 刷新学习导航与连续教程

> **所属 Case**: c27-learning-docs-refresh
> **Phase**: Execute
> **类型**: docs
> **推荐 Agent**: Main Agent
> **依赖**: wp-01-refresh-module-reference
> **拓扑敏感**: 否

## 目标

让 docs 三条入口和六章 guide 消费 wp-01 的稳定参考页，形成覆盖 V2 且不增加首次闭环负担的连续学习路径。

## 设计依据

- `02-design/design.md` 的 Attention Contract 与 Brownfield Delta。
- wp-01 产出的 3 个新 modules 入口。
- 文件边界：`docs/README.md` 与 `docs/guide/**`。

## 不允许固化的假设

- 不把可选 Leader、Interaction Protocol 或代码拓扑写成首次闭环必经步骤。
- 不把迁移历史写成新项目初始化路径。
- 不改变根 README、Skill 或脚本事实。

## 并列工作项

- [x] 更新三条导航路径与问题查阅覆盖。
- [x] 校准 guide 02 / 03 / 05 / 06 的 gate、初始化、Update、Interaction、Learn 和代码拓扑。
- [x] 保持六章因果顺序、首次成功时刻和每章自然下一步。

## 上下文文档

- `case.md`、`02-design/design.md`。
- `docs/modules/update-and-migration.md`、`interaction-protocol.md`、`ai-friendly-code-topology.md`。
- 当前 `docs/README.md`、`docs/guide/**`。

## 执行前 checkpoint

- **当前目标**：wp-01 完成后更新导航和 guide。
- **恢复入口**：本文件、`02-design/design.md#attention-contract`。
- **执行边界**：仅 `docs/README.md` 与 `docs/guide/**`。
- **预期输出**：三条路径完整，六章可连续学习，首次闭环可执行。
- **停止条件**：完成；或出现页面职责 / 事实源冲突时回 Design。
- **返回位置**：写回本文件和 `execute.md`，所有包完成后进入 Verify。

## 验收标准

- [ ] 三条路径覆盖全部 V2 学习面并链接真实页面。
- [ ] guide 命令、目录、生命周期、版本 gate 和示例准确。
- [ ] 首次闭环不要求先掌握可选能力。
- [ ] 新增 modules 全部从 docs 索引和相关教程可达。

## 不做

- 不改 modules（属于 wp-01）。
- 不改根 README 或 `_aipd` 长期知识。

## 执行记录

**状态**：completed

**完成时间**：2026-08-13

**主要改动**：

- `docs/README.md` 的三条路径接入 Update、Interaction Protocol 和 AI 友好代码拓扑。
- guide 02 增加项目状态 gate 和情境化能力；guide 03 补版本闭环、Agent MD 等级和可选 Leader 目录。
- guide 05 用当前三类代码模块、显式组合和 Case 三段合同替换旧的泛化“纵向黑箱”叙事。
- guide 06 校准初始化检查、Goal Mode 可选性和 V2 按问题入口。

**验证结果**：

- 23 个 docs Markdown 的相对链接与目标锚点检查通过，0 failure。
- docs 索引可到达 3 个新增 modules；guide 六章路径与文件名保持稳定。
- 定向事实搜索确认 gate、`unversioned-v2`、`update-log.md`、Agent MD、显式 Leader 和代码拓扑均在正确层级出现。

**执行后 checkpoint**：

- **当前结论**：wp-02 completed；两个 Work Package 均完成，无设计回跳。
- **下一步**：进入 Verify，执行完整链接 / 路径 / 命令 / 数量 / 旧语义 / Reduction Scan。
- **恢复入口**：`../../04-verify/verify.md`。

**遇到的问题**：无。

**Weave 候选**：无。

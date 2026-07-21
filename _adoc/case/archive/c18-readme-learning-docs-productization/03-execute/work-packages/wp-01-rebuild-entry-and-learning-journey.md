# Work Package: wp-01 - 重建首页与连续学习主线

> **所属 Case**: c18-readme-learning-docs-productization
> **Phase**: Execute
> **类型**: docs
> **推荐 Agent**: Main Agent
> **依赖**: `02-design/design.md`

## 目标

把根 README、学习入口和六篇 guide 重写成从首次共鸣到完成第一轮 AIPD 闭环的连续用户旅程。

## 设计依据

- Requirements Contract / Brownfield / Context Boundary / Readiness：`02-design/design.md`
- **复杂度爆点**：完整性会诱导 README 变成功能百科，概念解释会诱导 guide 变成 modules 朗读。
- **解耦方式**：README 负责决策，guide 负责学习旅程，modules 通过链接承接深入说明。
- **主干职责**：用“任务前读认知、任务中承接状态、任务后回写经验”贯穿所有页面。
- **文件边界**：`README.md`、`docs/README.md`、`docs/guide/*.md`。

## 不允许固化的假设

- 不承诺所有 Agent 平台等价支持。
- 不把初始化写成自动完成全部项目建模。
- 不把 Desktop、SOP 壳子或上下文解耦实验写成成熟必选能力。

## 横向模块

- [x] README 项目决策页。
- [x] docs 学习入口与读者分流。
- [x] 六篇连续 guide。

## 上下文文档

- `case.md`
- `02-design/design.md`
- `01-think/think.md`
- `01-think/docs-benchmark/summary.md`
- `README.md`、`docs/README.md`、`docs/guide/*.md`
- `_adoc/L1-intent/intent.md`、`_adoc/L3-core/index.md`、`_adoc/L4-product/index.md`、`_adoc/L5-dev/index.md`

## 执行前 checkpoint

- **当前目标**：完成 README、学习入口和六章课程的统一叙事改写。
- **恢复入口**：本文件 -> `02-design/design.md#用户旅程与信息架构`。
- **执行边界**：不修改 modules 和源码。
- **预期输出**：8 个用户文档文件更新。
- **停止条件**：新路径完整、事实与当前模型一致，或发现 modules 必须先改才能继续。
- **返回位置**：更新本 work package 和 `03-execute/execute.md`，进入 wp-02。

## 验收标准

- [x] README 在短阅读内回答是什么、为什么、如何运转、如何开始、适合谁和下一步。
- [x] 六篇 guide 可以顺序学习并完成一次最小闭环。
- [x] guide 不以逐对象字典作为主线，且每章有明确承接和下一步。
- [x] 现有稳定路径未被删除或改名。

## 不做

- 不修改 modules、Skill 源码或脚本。
- 不建立文档站、图片系统或交互示例。

## 执行记录

**状态**：completed

**完成时间**：2026-07-21

**主要改动**：

- 根 README 改为价值决策页，以“任务前读对、任务中接住、任务后留下”解释完整循环。
- docs 入口改为先体验、连续学习、按问题查阅三种路径。
- 六篇 guide 保留原路径但重写为从问题到第一次完整闭环的连续课程。

**验证结果**：

- 八个目标文件均已更新，原路径保留。
- 标题和章节承接已人工检查；旧 Case 前 Think 和 step 微步骤未进入新主线。
- `git diff --check` 暴露的尾随空格已修复，完整链接与一致性检查留到 Verify。

**执行后 checkpoint**：

- **当前结论**：wp-01 completed。
- **下一步**：执行 wp-02，校准 `docs/modules/`。
- **恢复入口**：`wp-02-align-modules-with-current-aipd.md`。

**遇到的问题**：无。

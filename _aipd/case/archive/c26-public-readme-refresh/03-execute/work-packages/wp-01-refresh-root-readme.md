# Work Package: wp-01 - 刷新根 README

> **所属 Case**：c26-public-readme-refresh
> **Phase**：Execute
> **类型**：docs
> **推荐 Agent**：Main Agent
> **依赖**：`02-design/design.md`
> **拓扑敏感**：否

## 目标

让第一次看到 AIPD 的读者从根 README 快速理解价值、可靠性、当前能力与边界，并能完成第一个 `/aipd` -> `/aipd-case` -> `/aipd-weave` 闭环。

## 设计依据

- Requirements / Brownfield / Attention / Readiness：`02-design/design.md`。
- **Readiness Gate**：passed。
- **复杂度爆点**：升级事实多，容易把首页写成内部对象和命令清单。
- **解耦方式**：按 now / next / on-demand 渐进披露，详细事实链接到 docs / 源码权威。
- **主干职责**：根 README 只承担理解、决策、首次成功和下一站分流。
- **文件边界**：仅根 `README.md`。

## 不允许固化的假设

- 不宣称 Codex 之外的平台已经过当前构建与安装验证。
- 不把 Leader、Goal Mode、Child Agent、Interaction Protocol、完整 Case 或代码拓扑写成所有项目的必选前置。

## 并列工作项

- [x] 补强首屏后“为什么可靠”的依据，并保持价值主线优先。
- [x] 把快速开始改成当前 Codex 安装与三 Skill 首次闭环。
- [x] 校准 Schema v2、版本化 Update、Interaction Protocol、Leader、Main / Child 与 AI 友好代码拓扑。
- [x] 明确九个公共 Skill 与仓库级 `aipd-learn` 的分发边界。
- [x] 保持教程分流与本地 Markdown 链接有效。

## 上下文文档

- `case.md`
- `02-design/design.md`
- 根 `README.md`
- `aipd-skill/README.md`、`docs/README.md`、`docs/modules/build-and-install.md`
- `aipd-skill/src/skills/{aipd,aipd-case,aipd-weave,aipd-update,aipd-leader}/SKILL.md`
- `aipd-skill/src/core/{overview,aipd-project-structure}.md` 与 `core/updates/current.md`
- `.agents/skills/aipd-learn/SKILL.md`

## 执行前 checkpoint

- **当前目标**：按 Design Delta 修改根 README。
- **恢复入口**：本文件 -> `../../02-design/design.md`。
- **执行边界**：只改根 README；Case 流程写回除外。
- **预期输出**：README 单文件 diff、链接 / 事实 / 减法验证结果。
- **停止条件**：完成；或发现权威事实冲突、文件所有权冲突、需改变 Case Contract。
- **返回位置**：写回本文件和 `../execute.md`，无回跳则进入 Verify。

## 验收标准

- [x] Case Contract 五项成功标准全部进入 README 可核对范围。
- [x] 根 README 没有把历史语义、仓库级 learn 或未验证平台写成当前公共能力。
- [x] 所有本地 Markdown 链接存在，格式检查通过。
- [x] Reduction Scan 不命中 Design 触发器（见 `../../04-verify/verify.md`）。

## 不做

- 不修改 README 之外的内容文件。
- 不运行 build / install；纯文档改动不需要打包验证。
- 不 commit、push 或发布。

## 执行记录

**状态**：completed

**完成时间**：2026-08-13

**主要改动**：

- 在工作原理之后增加基于 manifest / gate、Map-first、checkpoint 和事实 owner 的可靠性说明。
- 快速开始改成 Codex build / check-dist / install 与 `/aipd` -> `/aipd-case` -> `/aipd-weave` 的第一个完整闭环。
- 增加 Schema v2、Interaction Protocol 与版本化 Update 的新人级边界。
- 将九个公共 Skill 与仓库级 `aipd-learn` 拆为不同顶级层级，移除“第十个可安装 Skill”的视觉歧义。
- Leader 保留显式启动和权限边界，移除首页中过细的模型配置；进阶章节升级为完整 AI 友好代码拓扑。
- 仓库树补充 `AGENTS.md` 与 `.agents/skills/aipd-learn/`。

**验证结果**：

- 初检：14 个本地 Markdown 链接 / 锚点有效。
- `git diff --check` 通过。
- `aipd-skill/src/skills/` 目录数为 9；`.agents/skills/aipd-learn/SKILL.md` 独立存在。

**执行后 checkpoint**：

- **当前结论**：Work Package 完成，无 Design / Think 回跳。
- **下一步**：进入 Verify 做成功判据审计和 Reduction Scan。
- **恢复入口**：`../../04-verify/verify.md`。

**遇到的问题**：无。

**回跳 / 重开**：无。

**Weave 候选**：根 README 是本 Case 直接交付物；所有内容均为既有事实的公共投影，不产生额外长期知识候选。

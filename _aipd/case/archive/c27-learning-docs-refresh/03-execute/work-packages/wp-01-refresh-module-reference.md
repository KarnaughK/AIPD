# Work Package: wp-01 - 刷新 V2 模块参考

> **所属 Case**: c27-learning-docs-refresh
> **Phase**: Execute
> **类型**: docs
> **推荐 Agent**: Main Agent
> **依赖**: `02-design/design.md`
> **拓扑敏感**: 否

## 目标

让 `docs/modules/` 对 AIPD V2 的 Update / 迁移、Interaction Protocol、AI 友好代码拓扑和相关既有能力形成准确、可独立进入的参考层。

## 设计依据

- Requirements / Brownfield / Attention / Context：`02-design/design.md`。
- Readiness Gate：passed。
- 复杂度爆点：新增能力散落在 Skill 源码、Knowledge 和旧短段中，用户缺唯一参考入口。
- 解耦方式：每个能力一页，既有页面只保留边界和链接。
- 文件边界：仅 `docs/modules/**`。

## 不允许固化的假设

- 不把远端版本写成 Update 目标；不把 migrator 写成完整版本更新。
- 不把 guide-only `aipd_product_manager` 写成 Codex custom Agent。
- 不把 Interaction Protocol、Leader 或代码拓扑写成普通项目必选。

## 并列工作项

- [x] 新增 Update / 迁移参考页。
- [x] 新增 Interaction Protocol 参考页。
- [x] 新增 AI 友好代码拓扑参考页。
- [x] 校准 Agent Entry、构建安装、Main / Child、上下文解耦、Skill 概览的边界与交叉链接。

## 上下文文档

- `case.md`、`02-design/design.md`。
- `aipd-skill/src/core/workspace/project-state.md`、`updates/current.md`、`skills/aipd-update/SKILL.md`。
- `aipd-skill/src/core/agent-entry/interaction-style.md`、`skills/aipd/SKILL.md`。
- `_aipd/knowledge/core/ai-friendly-code-topology.md`、`aipd-skill/src/core/ai-friendly-code-topology.md`。
- `_aipd/knowledge/engineering/index.md`、`aipd-skill/README.md`。

## 执行前 checkpoint

- **当前目标**：交付 3 个新参考入口并校准相关 modules。
- **恢复入口**：本文件、`02-design/design.md#brownfield-delta`。
- **执行边界**：只改 `docs/modules/**`。
- **预期输出**：页面可独立理解，事实与当前源码一致，交叉链接真实。
- **停止条件**：完成；或发现需改 Skill / 根 README / 权威事实冲突时停止。
- **返回位置**：写回本文件和 `execute.md`，然后启动 wp-02。

## 验收标准

- [ ] 指定 V2 能力都有唯一、可独立进入的模块页或准确既有页。
- [ ] 9 个公共 Skill、3 个 custom Agent、仓库级 Learn 和 guide-only 角色边界准确。
- [ ] Update / migrator、Interaction / Entry、上下文解耦 / 代码拓扑分工清楚。
- [ ] 相对链接和源码路径真实。

## 不做

- 不修改导航与 guide（属于 wp-02）。
- 不复制内部模板或完整运行合同。

## 执行记录

**状态**：completed

**完成时间**：2026-08-13

**主要改动**：

- 新增 `update-and-migration.md`、`interaction-protocol.md`、`ai-friendly-code-topology.md`。
- 更新 Agent Entry、构建安装、Case / Work Package、Main / Child、上下文解耦与 Skill 概览的边界和链接。

**验证结果**：

- 源码目录实测 9 个公共 Skill、3 个 Codex custom Agent；文档表述一致。
- 定向搜索确认 `unversioned-v2` / P-I、Interaction 等级、代码拓扑三类模块与显式组合均有当前事实入口。
- 新旧术语只在迁移 / 兼容说明中出现；完整链接检查留到 Verify 统一执行。

**执行后 checkpoint**：

- **当前结论**：wp-01 completed；无需回跳。
- **下一步**：启动依赖 wp-01 的 wp-02，更新 docs 导航与 guide。
- **恢复入口**：`wp-02-refresh-learning-journey.md#执行前-checkpoint`。

**遇到的问题**：无。

**Weave 候选**：无；本 Case 只同步用户文档，不产生新的框架认知。

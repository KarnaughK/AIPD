# Work Package: wp-02 - Core 当前术语与平台数量

> **所属 Case**：c25-internal-documentation-refresh
> **Phase**：Execute
> **类型**：docs
> **推荐 Agent**：Main Agent
> **依赖**：wp-01、`02-design/design.md`
> **拓扑敏感**：否

## 目标

让活跃 Core / Intent / Engineering 使用当前 Leader、Main / Child、Work Package 与平台数量合同，同时保留历史语境。

## 设计依据

- Readiness Gate：passed。
- 复杂度爆点：旧“分身 Agent / step”措辞可能掩盖 Work Package 与派发解耦、4 份指引与 3 个 Codex Agent 的集合差异。
- 解耦方式：Core 定义模型，Engineering 定义平台装配数量；不复制 Skill 运行步骤。
- 文件边界：Intent、Core index / map / horizontal、Engineering index。

## 并列工作项

- [x] Core map 补 Leader 第九模型并校准 Workspace / Main / Child 术语。
- [x] Core / Intent 把活跃 `step` 与默认分身叙事改为 Work Package + 运行时选择。
- [x] Engineering 明确 4 份领域指引与 3 个 Codex custom Agent。

## 上下文文档

- `case.md`、`02-design/design.md`、`01-think/think.md`。
- `aipd-skill/src/core/overview.md`、Codex `agent-guide.md`、Leader guide / runtime。
- `aipd-skill/scripts/check-dist`。

## 执行前 checkpoint

- **恢复入口**：`03-execute/execute.md` -> 本文件。
- **执行边界**：只改声明的五个 Knowledge 文件。
- **预期输出**：模型数、术语和平台数量可机械核对。
- **停止条件**：完成 / 需要改变历史记录或源码行为。
- **返回位置**：本文件执行记录 -> `execute.md` -> `case.md`。

## 验收标准

- [x] 九模型表实际九项并含 Leader。
- [x] Work Package 明确不是 Child 派发节点。
- [x] 4 份领域指引 / 3 个 Codex custom Agent 不再含混。

## 不做

- 不改 Research 历史观察、归档 Case 或 Agent 源码。

## 执行记录

**状态**：completed

**完成时间**：2026-08-13

**主要改动**：
- Intent / Core 当前叙事改为 Work Package 与 Main / Child 运行时选择。
- Core map 补 Leader 项，核心模型数据行从 8 项补齐为 9 项。
- Engineering 明确 4 份平台无关角色指引与 3 个 Codex custom Agent 的装配差异。

**验证结果**：
- Core 模型表人工 / 行扫描确认 9 个数据项并含 Leader。
- 文件系统确认 `core/agent-guides/*.md = 4`、`platforms/codex/agents/*.toml = 3`。
- 五个文件 `git diff --check` 通过；活跃 `step` 只剩“垒高楼式 step”负例语境。

**执行后 checkpoint**：
- **当前结论**：wp-02 完成，无需回跳；Research 中“分身 Agent”保留为需求观察语境，不作为当前调度合同。
- **下一步**：执行 wp-03。
- **恢复入口**：`03-execute/execute.md` -> `work-packages/wp-03-maintainer-readme.md`。

**遇到的问题**：无

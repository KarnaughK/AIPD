# Work Package: wp-01 - Workspace 与 Map 入口

> **所属 Case**：c25-internal-documentation-refresh
> **Phase**：Execute
> **类型**：docs
> **推荐 Agent**：Main Agent
> **依赖**：`02-design/design.md`
> **拓扑敏感**：否

## 目标

让 Agent 从工作区总入口和项目 Map 一跳找到版本 gate、Interaction、Main / Child、Learn 与维护者源码导航，并补齐 Workspace 的版本状态和显式 Leader 模块关系。

## 设计依据

- Readiness Gate：passed。
- 复杂度爆点：入口页复制完整能力正文会产生漂移。
- 解耦方式：入口只说明职责与稳定路径，细节继续由 Product / Engineering / 源码 owner 承载。
- 文件边界：`_aipd/index.md`、`_aipd/map.md`、`_aipd/knowledge/core/workspace-modules.md`。

## 并列工作项

- [x] index 补项目状态 gate 与四项常用入口。
- [x] Map 补维护 AIPD Skill / build / validation / migration 的一跳路由，并校准 Workspace 概念。
- [x] Workspace 模块补 manifest / update-log、显式 Leader 和 Agent Entry 的内外边界。

## 上下文文档

- `case.md`、`02-design/design.md`、`01-think/think.md`。
- `aipd-skill/src/core/aipd-project-structure.md`、`workspace/project-state.md`、`updates/catalog.json`。
- `aipd-skill/README.md`（只读到 wp-03）。

## 执行前 checkpoint

- **恢复入口**：`03-execute/execute.md` -> 本文件。
- **执行边界**：只改三个声明文件。
- **预期输出**：稳定入口可达，正文不过度复制。
- **停止条件**：完成 / 发现事实冲突。
- **返回位置**：本文件执行记录 -> `execute.md` -> `case.md`。

## 验收标准

- [x] index 明确 gate、五类 Knowledge、Map-first、Leader、Interaction、Main / Child 与 Learn 稳定入口。
- [x] Map 一跳命中维护者 README 和 release / build / validate / migration 源码。
- [x] Workspace 模块不把 Leader 当基础必选或第六类 Knowledge。

## 不做

- 不展开 Skill 行为细节，不修改 Product / Engineering 正文。

## 执行记录

**状态**：completed

**完成时间**：2026-08-13

**主要改动**：
- `_aipd/index.md` 增加项目版本 gate、外部 Agent Entry / Learn 边界和稳定入口。
- `_aipd/map.md` 增加维护者路由，补全构建 / 校验 / 发布 / 迁移入口。
- `workspace-modules.md` 增加 manifest / update-log、显式 Leader 和 Update 关系。

**验证结果**：
- 目标关键词和路径 `rg` 检出；三个文件 `git diff --check` 通过。

**执行后 checkpoint**：
- **当前结论**：wp-01 完成，无事实或所有权冲突。
- **下一步**：执行 wp-02。
- **恢复入口**：`03-execute/execute.md` -> `work-packages/wp-02-current-core-runtime-terms.md`。

**遇到的问题**：无

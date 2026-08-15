# Work Package: wp-03 - 维护者 README

> **所属 Case**：c25-internal-documentation-refresh
> **Phase**：Execute
> **类型**：docs
> **推荐 Agent**：Main Agent
> **依赖**：wp-01、wp-02、`02-design/design.md`
> **拓扑敏感**：否

## 目标

让维护者从 `aipd-skill/README.md` 找到公共 / 仓库级 Skill、源码 / 平台 / 构建 / 校验 / 迁移入口和安全边界。

## 设计依据

- Readiness Gate：passed。
- 复杂度爆点：README 当前遗漏 updates / release 校验并把 Learn 与公共 Skill 修改入口合并。
- 解耦方式：README 作为导航页，详细行为链接到唯一源码 owner。
- 文件边界：`aipd-skill/README.md`。

## 并列工作项

- [x] 补 updates、project-state、update-log、Interaction、Leader runtime 与 Agent 装配数量。
- [x] 补 check-release-bundle / fixtures、migrator 校验与只读 / 副作用边界。
- [x] 拆开公共 Skill 与仓库级 Learn 的正确修改入口。

## 上下文文档

- `case.md`、`02-design/design.md`、`01-think/think.md`。
- `aipd-skill/src/**`、`.agents/skills/aipd-learn/**`、`aipd-skill/scripts/**` 的当前路径。

## 执行前 checkpoint

- **恢复入口**：`03-execute/execute.md` -> 本文件。
- **执行边界**：只改 `aipd-skill/README.md`。
- **预期输出**：维护者导航完整且不重复源码正文。
- **停止条件**：完成 / 路径或数量事实冲突。
- **返回位置**：本文件执行记录 -> `execute.md` -> `case.md` -> Verify。

## 验收标准

- [x] 九个公共 Skill、一个仓库级 Learn、4 份领域指引 / 3 个 Codex Agent 数量准确。
- [x] build、check-dist、release bundle、migrator 和 install 边界完整。
- [x] 明确 dist 不手改，install / dev 需用户明确确认。

## 不做

- 不改源码、脚本、dist 或安装环境。

## 执行记录

**状态**：completed

**完成时间**：2026-08-13

**主要改动**：
- Core 目录树补 `project-state.md`、`updates/`、`update-log.md` 模板。
- 补版本化 Update、Schema migrator 分工与 `schemaVersion` / `aipdVersion` 边界。
- 补 Codex 平台入口、4 指引 / 3 custom Agent、release bundle / migrator 校验脚本。
- 修正公共 Skill 与仓库级 Learn 的修改 owner，细分构建 / 校验 / 迁移 / 安装入口。

**验证结果**：
- 所列关键路径逐项存在；目录计数为公共 Skill 9、仓库级 Skill 1、角色指引 4、Codex Agent 3。
- `git diff --check -- aipd-skill/README.md` 通过。

**执行后 checkpoint**：
- **当前结论**：wp-03 完成，三个 Work Package 全部完成，无回跳或阻塞。
- **下一步**：进入 Verify，执行全范围验收。
- **恢复入口**：`04-verify/verify.md`。

**遇到的问题**：无

# Step 4: Update References And Verify

## 目标

更新仓库中所有受迁移影响的路径引用，并验证 AIPD Skill 构建 / 安装链路仍可用。

## 上下文

- `../case.md`
- `../doc/target-structure.md`
- `../doc/migration-plan.md`
- Step 2 / Step 3 执行结果

## 要做

- 更新 `README.md` 项目结构。
- 更新 `docs/modules/build-and-install.md`。
- 更新 `_adoc/map.md` 和必要 L5 文档。
- 更新 shell scripts 中的相对路径。
- 更新 `c0.8-aipd-desktop-zero` 中的路径假设。
- 运行构建 / 安装相关验证命令。

## 不做

- 不创建 Desktop。
- 不新增 AgentAdapter。
- 不改 Skill 功能。

## 验收

- `rg` 不再命中过期路径，或命中处有明确历史语义。
- 构建命令通过。
- 安装 / 开发安装路径可用。
- README 与实际目录一致。

## 执行记录

### 2026-06-16

已完成：
- 更新 `README.md` 的仓库结构和 Agent 执行入口。
- 更新 `docs/modules/build-and-install.md` 的源码、脚本、产物路径和命令。
- 更新 `_adoc/map.md`、`_adoc/L3-core/map.md`、`_adoc/L4-product/map.md`、`_adoc/L5-dev/index.md`、`_adoc/index.md`、`_adoc/okr/index.md` 中的 AIPD Skill 源码路径。
- 更新 `docs/modules/skills-overview.md`、`docs/modules/agent-entry.md`。
- 更新 `aipd-skill/src/skills/aipd-learn/SKILL.md`、`aipd-skill/src/core/agent-guide.md`、`aipd-skill/src/platforms/codex/core/agent-guide.md` 中的 AIPD 自身源码路径。
- 保留 `_adoc/case/archive/` 和 `docs/legacy/` 中的旧路径作为历史语义。

验证：
- `test ! -d src && test ! -d scripts && test ! -d modules && test ! -d dist && test ! -d v1 && test ! -d v2-todo` 通过。
- `./aipd-skill/scripts/build` 通过；Claude / Codex 均生成 10 个 skill，Codex agent 模板生成到 `aipd-skill/dist/codex/agents/`。
- 未执行 install / dev install；安装脚本会改写用户级或项目级 Agent 环境，仍需用户确认后再运行。

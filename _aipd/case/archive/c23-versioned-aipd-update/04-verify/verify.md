# c23 Verify

## Verify Result

- **结果**：passed
- **时间**：2026-08-12
- **目标版本**：本机 AIPD V1
- **项目版本跃迁**：`unversioned-v2 -> V1`
- **用户验收边界**：用户明确授权创建 Case 并自主完成，且不希望为已固定边界继续投入注意力；本次按 Case Contract 的客观完成标准验收，无遗留产品取舍需要再次确认。

## Case Contract 验收

| 完成标准 | 结果 | 证据 |
|---|---|---|
| 本机发布目录唯一声明当前版本并连续索引 records | passed | `src/core/updates/catalog.json`、`current.md`、`releases/v1.md`；release validator |
| 新项目、既有无版本 v2 和迁移后 v2 的版本边界清楚 | passed | versioned manifest 模板；初始化先写 unversioned、验证后最后盖 V1；migrator 继续产出两键 manifest |
| Update 按 records -> current authority -> 项目事实 -> 一次收敛执行 | passed | `aipd-update/SKILL.md`；V5 -> V9 forward fixture |
| 正常漂移可更新，只有不安全 / 破坏性 / 歧义冲突停止 | passed | `workspace/project-state.md` 与 Update 所有权合同 |
| `P=I` no-op / drift repair，`P>I` 停止，不访问远端 | passed | selection fixture、Skill 合同与无网络调用静态检查 |
| source / dist / manifest / release / migrator 漂移可被阻止 | passed | `check-release-bundle`、fixtures、`check-dist`、Schema migrator fixtures |
| 默认 Codex 产物完成构建，未越权 install | passed | build / check-dist 通过；未执行 install |

## Work Package 验收

- `wp-01-release-contract-and-runtime-gates`：completed；catalog、项目状态合同、模板和普通 Skill / Agent gate 已统一。
- `wp-02-update-orchestration-and-knowledge`：completed；Update 已改为版本驱动的一次语义收敛，Product / Map / README 已同步。
- `wp-03-release-validation-and-integration`：completed；release、P/I selection、Schema migrator、Codex dist 与通用多目标护栏均有自动验证。

## 关键前向场景

- `unversioned-v2 -> V1`：读取 bootstrap record，再按 V1 current authority 一次收敛。
- `P5 -> I9`：完整选择 V6–V9 作为变化上下文；同一主题即使反复修改或撤销，也只按 V9 authority 形成最终结果，不逐版 replay。
- `P = I`：入口无漂移时 no-op；缺 index / map 等安全 drift 时允许修复并记录 `I -> I`。
- `P > I`：本机包过旧，硬停止，不降级、不查远端。
- legacy：先做确定性 Schema 迁移，仍以 unversioned-v2 继续 Update，不冒充已应用当前发布。
- 自定义 Workspace：`_aipd/leader/` 等安全扩展保留；代码目录、`L*-*`、symlink 和类型冲突继续拒绝。
- Agent MD 等级 0：既有项目缺少 Entry 时保持缺失，不被 Update 擅自升级。
- 初始化中断：在全部入口与版本一致性验证完成前只保留 unversioned-v2，最后才写 `aipdVersion=I`。

## 验证命令

- `./aipd-skill/scripts/build`
- `./aipd-skill/scripts/check-dist`
- `./aipd-skill/scripts/check-release-bundle --project-root "$PWD/aipd-skill" --dist-skills "$PWD/aipd-skill/dist/codex/skills"`
- `./aipd-skill/scripts/check-release-bundle-fixtures`
- `./aipd-skill/scripts/check-schema-migrator`
- `./aipd-skill/scripts/migrate-project-schema --check "$PWD"`
- `node experience-assets/scripts/verify-assets.mjs`
- Node / Bash 语法检查、Agent Entry 源模板一致性检查、manifest 精确三键检查和 `git diff --check`

## Design Guardrails

- 没有引入远端版本探测；catalog 仍是本机唯一 `I`。
- 没有把 Release Record 变成逐版执行脚本。
- `schemaVersion` 与 `aipdVersion` 保持分工；migrator 不盖当前发布版本。
- 项目正文、Case 状态、Interaction Protocol 和 Leader 定制均被保留。
- 版本标记在验证后最后写入；项目 `_aipd/update-log.md` 已记录实际跃迁。
- 未执行 install、commit、push 或其他 Case 外副作用。

## 残留风险

- 用户级 Codex 仍是上一次安装版本；本 Case 已完成源码和 dist，但安装必须在 build 后由用户另行确认。
- 远端最新版本发现明确延期，不影响 V1 的本机闭环。

## Close 判断

Case Contract、三个 Work Package 和全部自动验收通过；稳定事实已同步 Core / Product / Engineering / Map / README，可以进入 Close 并归档。

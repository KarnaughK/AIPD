# Work Package: wp-01-release-contract-and-runtime-gates

## 目标

建立本机 AIPD V1 发布目录、项目状态合同和所有活动运行时的版本 gate，使无版本 / 过期项目被准确路由到 Update，而不是被误判为损坏。

## 上下文

- `../../case.md`
- `../../02-design/design.md`
- `aipd-skill/src/core/aipd-project-structure.md`
- `aipd-skill/src/core/workspace/templates/manifest.json`
- `aipd-skill/src/skills/aipd/SKILL.md`
- `aipd-skill/src/core/agent-entry/template.md`

## 文件 owner

- `aipd-skill/src/core/updates/**`
- `aipd-skill/src/core/workspace/project-state.md`
- `aipd-skill/src/core/workspace/templates/{manifest.json,update-log.md}`
- `aipd-skill/src/core/aipd-project-structure.md`
- 除 `aipd-update` 外所有带项目 Schema gate 的 source Skills。
- `aipd-skill/src/skills/aipd/references/scan-agent.md`
- `aipd-skill/src/core/agent-entry/template.md`
- `aipd-skill/src/core/agent-guides/aipd_context_retriever.md`
- `aipd-skill/src/platforms/codex/core/agent-guide.md` 与平台中立 `aipd-skill/src/core/agent-guide.md`

## 合同

- catalog 是唯一 `currentVersion` 事实源，当前为 V1；包含严格连续 records 和 currentAuthority。
- manifest 只接受精确两键 unversioned v2，或精确三键且 `aipdVersion` 为正整数的 versioned v2。
- 普通 Skill 对 unversioned / stale 返回 `needs-aipd-update`；P>I 停止；P=I 正常运行。
- path-entry、双根、根 / 工作区 symlink 和非法 JSON / 类型继续硬阻塞。
- 项目版本永不从 AGENTS.md 推断。
- 不修改 scripts、`aipd-update`、项目当前 `_aipd/manifest.json` 或 dist。

## 完成标准

- [x] V1 catalog、release record、current guide 与 project-state reference 完整。
- [x] 新项目 manifest 模板含 `aipdVersion: 1`，update-log 模板存在。
- [x] 7 个普通项目 Skill、scan、Agent Entry 和平台指引都使用一致状态语义，且不写死未来版本比较值。
- [x] 所有新 `@references` 均能被 build 注入。

## 执行记录

- 状态：completed
- 已建立 V1 `catalog.json` / `current.md` / `releases/v1.md`；catalog 连续索引 1 个 release 与 23 个 current authority，V1 record 包含 unversioned-v2 bootstrap、record 非脚本语义和 Codex-first 发布基线。
- 已新增 `workspace/project-state.md`，分离 path / symlink 安全门、manifest 双形态、`P/I` 版本状态和可修复 drift；安全额外 Workspace 模块作为项目定制保留。
- manifest 模板已进入 V1，update-log 模板与初始化入口已完整；项目结构文档已区分 `schemaVersion` / `aipdVersion`。
- 7 个普通项目 Skill、scan、Agent Entry、context retriever、平台中立 Agent guide 与 Codex guide 已改为读取 project-state + catalog；unversioned / stale 返回 `needs-aipd-update`，future / invalid 硬停止，current 才继续。
- 定向自检通过：catalog JSON / 连续版本 / record 标题 / 23 个 authority 路径 / manifest 版本一致；7 个 Skill 均注入新 references 且旧精确两键 runtime gate 无残留；`git diff --check` 通过。
- 本 Work Package 未修改 scripts、`aipd-update`、项目当前 manifest / AGENTS / dist，未执行 build 或 install。

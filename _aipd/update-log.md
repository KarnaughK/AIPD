# AIPD Update Log

本文件记录当前项目实际完成的 AIPD 版本更新。全局版本变化以本机 AIPD 发布目录为准；这里不复制 Release Record，只保留项目合并结果、验证和有意保留的差异。

## 更新记录

### 2026-08-12 · unversioned-v2 -> V1

- 本机发布：V1；只使用当前源码构建出的本机发布快照，未检查远端版本。
- 已读记录：V1 bootstrap record；它只用于理解演进、保护点和最终事实源，不作为逐步执行脚本。
- 实际合并：建立 release catalog / current guide / V1 record 与 `P/I` 项目状态合同；重写 `aipd-update` 为“读取 `(P,I]` -> 读取当前权威 -> 读取项目事实 -> 一次语义收敛”；同步普通 Skill、Agent Entry、初始化、Schema migrator、模板、项目 Map / Knowledge 和 Codex dist 验证。
- 保留的项目定制：保留 `_aipd/leader/` 实验模块、既有 Knowledge、Case、Interaction Protocol，以及同工作区已完成的 Codex-first 发布调整；没有把安全未知模块当成模板漂移删除。
- 验证：默认 Codex build、`check-dist`、release bundle source / dist 校验、V5 -> V9 最终权威 forward fixture、Schema migrator 全量 fixture、当前项目 Schema check、脚本语法、experience assets 与 `git diff --check` 均通过。
- 安装结果：用户后续已明确确认安装；Codex 的 9 个 Skill 与 3 个 Agent 已安装到用户级目录，并与本次 dist 逐项比对一致。
- 未处理 / 后续观察：远端版本发现不在 V1 范围内。

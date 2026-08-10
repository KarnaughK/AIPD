# Execute

## 当前状态

- **状态**：completed
- **当前 Work Package**：无；wp-01、wp-02 均已完成
- **执行顺序**：wp-01 -> wp-02 -> Verify。

## 执行 checkpoint

- **当前目标**：先构造只认新 Schema 的框架源码和一次性迁移器，再切换当前项目。
- **执行边界**：允许修改 AIPD-2 当前仓库；不安装、不迁移其他项目、不保留运行时兼容。
- **预期输出**：新目录源码、迁移器、当前项目新工作区、更新后的文档和通过的构建校验。
- **停止条件**：发现新旧映射冲突、无法保留现有文件、构建不能通过或需要 install 授权。
- **返回位置**：每个 Work Package 执行记录；全部完成后进入 `../04-verify/verify.md`。

## Work Packages

- [x] `work-packages/wp-01-framework-schema-and-migrator.md`
- [x] `work-packages/wp-02-current-project-cutover.md`

## 执行记录

| 时间 | Work Package | 状态 | 摘要 | 下一步 |
|---|---|---|---|---|
| 2026-08-10 | wp-01 | in_progress | 已完成 Case/Design checkpoint，开始框架源码审计与改造 | 完成框架 Schema 与迁移器 |
| 2026-08-10 | wp-01 | in_progress | 按文件 owner 拆为 core/workspace、skills/agents、scripts/migrator 三条并行线；Main 负责集成，不重复修改同一文件 | 汇总三条执行结果并统一校验 |
| 2026-08-10 | wp-01 | completed | 框架源目录、Workspace 模板、9 个 Skills、3 个 Codex Agent、上下文检索 Agent、严格 manifest 和一次性迁移器已完成；fixture、双平台 build、check-dist 均通过 | 执行 wp-02 |
| 2026-08-10 | wp-02 | in_progress | 当前仓库已切换为 `_aipd/knowledge/*`，AGENTS、项目 Knowledge、公开文档与 Map 三级分辨率已同步 | 完成残留与仓库级验证 |
| 2026-08-10 | wp-02 | completed | 189/189 旧文件有唯一新目标；Schema / symlink gate、fixture、双平台 build、check-dist、资源和活动文档链接验证全部通过，未 install | 进入 Verify |

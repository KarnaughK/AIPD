# Work Package: wp-02 - Current Project Cutover

> **所属 Case**: c22-aipd-knowledge-schema
> **Phase**: Execute
> **类型**: dev / docs
> **推荐 Agent**: Main Agent
> **依赖**: wp-01
> **拓扑敏感**: 是

## 目标

将 AIPD-2 当前项目实例、AGENTS、公开文档和验证入口整体切换到 Knowledge Schema v2，并证明新运行时能够独立工作。

## 设计依据

- Requirements Contract：`../../02-design/design.md`
- Brownfield Delta：`../../02-design/design.md`
- Context Boundary：`../../02-design/design.md`
- Readiness Gate：passed
- 复杂度爆点：大量活动索引和归档 Case 都引用旧路径，机械替换必须保留文件内容和相对链接。
- 解耦方式：先完成框架新世界，再一次性迁移当前项目，最后统一做残留与构建检查。
- 主干职责：`_aipd/index.md` 与 `_aipd/map.md` 只负责新入口；历史迁移说明留在本 Case。
- 特殊节点：迁移当前正在执行的 c22 时，执行状态必须随根目录移动并继续可恢复。
- 文件 / 文件夹边界：`_aipd/`、`AGENTS.md`、`README.md`、`docs/`、`experience-assets/scripts/`。

## 代码拓扑护栏

- **纵向业务上下文**：AIPD-2 自身的项目工作区。
- **允许的横向依赖**：wp-01 的迁移器、Map-first 路由和 build/check-dist。
- **显式组合边界**：`AGENTS.md -> _aipd/index.md -> _aipd/map.md -> knowledge/* / sop / case / okr -> code`。
- **禁止的边界穿透**：不得留下旧根目录、空壳兼容目录或旧 Agent 身份入口。
- **共享变化权限**：允许更新所有当前项目内的路径引用；不修改其他项目。
- **独立验收边界**：从新 AGENTS 入口恢复 c22、读取五类知识、运行 build/check-dist。
- **认知回写**：新 `_aipd/` 本身即为回写结果。

## 不允许固化的假设

- 不把其他业务项目视为已经迁移。
- 不在 build 通过前假设用户级安装环境已切换。

## 并列工作项

- [x] 迁移 `_adoc/` 为 `_aipd/` 并归组五类知识域。
- [x] 更新 AGENTS、README、docs、资源校验和所有活动索引。
- [x] 让归档 Case 与发展日志保留历史旧称，活动入口只使用新 Schema。
- [x] 执行残留检查、fixture 验证、build 和 check-dist。

## 上下文文档

- `../../case.md`
- `../../02-design/design.md`
- `../execute.md`
- `AGENTS.md`
- `_aipd/index.md`
- `_aipd/map.md`
- `README.md`

## 执行前 checkpoint

- **当前目标**：把当前仓库完整切换到新 Schema，并在目录移动后保持 c22 可恢复。
- **恢复入口**：迁移前为本文件；迁移后为 `_aipd/case/c22-aipd-knowledge-schema/03-execute/work-packages/wp-02-current-project-cutover.md`。
- **执行边界**：当前仓库内所有与 Schema 有关的路径和术语；不 install、不改外部项目。
- **预期输出**：新工作区、更新文档、无旧活动引用、通过的 build/check-dist。
- **停止条件**：迁移状态混合、内容丢失、构建失败且需要改变已确认 Schema。
- **返回位置**：写回迁移后的本文件和 `../execute.md`，然后进入 Verify。

## 验收标准

- [x] 旧根目录不存在，`_aipd/manifest.json` 与五类知识域存在。
- [x] 新 AGENTS 恢复链和 Map-first 路由有效。
- [x] SOP、Case、OKR、Inbox 路径有效，c22 状态未丢失。
- [x] 除一次性迁移器、拒绝性哨兵和明确迁移说明外，活动源码和公开文档不存在旧运行时引用。
- [x] build/check-dist 通过且未执行 install。

## 不做

- 不迁移其他业务项目。
- 不重写 Map 内容模型或引入检索测试体系。

## 执行记录

**状态**：completed

**完成时间**：2026-08-10

**主要改动**：
- 已创建 `_aipd/manifest.json`，将五类 Knowledge 归入 `_aipd/knowledge/*`，流程目录保持 Workspace 并列模块。
- 已更新 AGENTS、项目索引、Map、Knowledge 正文、README 与 docs；明确五类 Knowledge 并列、三条不同链路和 Map 三级分辨率。
- 已保留本 Case、归档 Case 与发展日志中的必要迁移历史，不把历史旧称当成运行时兼容。

**验证结果**：
- 旧 tracked 工作区文件 189/189 均有唯一新目标，当前 `_aipd/` 共 200 个文件，无映射碰撞。
- manifest 精确等于 `aipd-project` v2；运行时、迁移器和 Agent 入口均拒绝双根、非法路径类型与 symlink 穿透。
- `check-schema-migrator` 的迁移 / 拒绝攻击集通过；当前仓库和两个平台打包迁移器的 `--check` 均通过。
- Codex / Claude 各构建 9 个 Skill；3 个 Codex Agent、静态引用、平台差异和打包完整性通过 `check-dist`。
- 126 个活动 Markdown 文档的 52 条本地链接、experience assets 与 `git diff --check` 均通过。
- 未执行 install，未迁移其他项目，未写入真实 Git index。

**执行后 checkpoint**：
- **当前结论**：当前仓库和框架产物已完整切换到 Knowledge Schema v2，wp-02 验收通过。
- **下一步**：进入 Verify 并交接 install 决策。
- **恢复入口**：`../../04-verify/verify.md`。

**遇到的问题**：无。

**回跳 / 重开**：无。

**Weave 候选**：无；本 Work Package 直接迁移长期事实源。

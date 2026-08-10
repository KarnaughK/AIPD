# Work Package: wp-01 - Framework Schema and Migrator

> **所属 Case**: c22-aipd-knowledge-schema
> **Phase**: Execute
> **类型**: dev / docs
> **推荐 Agent**: Main Agent
> **依赖**: `02-design/design.md`
> **拓扑敏感**: 是

## 目标

让 AIPD 框架源码、模板、Skills、Agent Entry 和构建校验只生成并读取 Knowledge Schema v2，同时提供可靠的一次性旧项目迁移器。

## 设计依据

- Requirements Contract：`../../02-design/design.md`
- Brownfield Delta：`../../02-design/design.md`
- Context Boundary：`../../02-design/design.md`
- Readiness Gate：passed
- 复杂度爆点：同一路径约定散落在多个 Skill、模板、Agent 指引、构建注入和校验脚本中。
- 解耦方式：把唯一 Schema 写入源目录、模板和迁移合同；运行时不做双读。
- 主干职责：初始化和 Agent Entry 只暴露新工作区；具体能力读取各自新入口。
- 特殊节点：一次性迁移器可以识别旧路径，但不能被日常运行时引用。
- 文件 / 文件夹边界：`aipd-skill/src/`、`aipd-skill/scripts/`、必要的根级验证脚本。

## 代码拓扑护栏

- **纵向业务上下文**：AIPD Project Workspace Schema。
- **允许的横向依赖**：现有 build/check-dist 和各 Skill 的静态 references 注入。
- **显式组合边界**：新 Schema 通过模板、manifest 和固定入口组合；迁移器是独立命令。
- **禁止的边界穿透**：活动 Skill 不得调用迁移器兜底；不得同时识别 `_adoc` 与 `_aipd`。
- **共享变化权限**：允许统一重命名 core 方法目录、Agent 身份和路径模板。
- **独立验收边界**：fixture 初始化、fixture 迁移、源码残留检查和双平台 build。
- **认知回写**：wp-02 将当前项目切换为新事实源。

## 不允许固化的假设

- 不假设外部项目工作区干净；迁移器必须预检并由调用方决定是否执行。
- 不假设所有历史文字都应删除；残留检查区分迁移说明与活动运行时。

## 并列工作项

- [x] 重命名并校准框架知识方法目录和工作区模板。
- [x] 更新 Skills、Agent Entry、检索 Agent 和平台元数据。
- [x] 增加 Schema manifest、一次性迁移器和验证规则。
- [x] 更新 build/check-dist 所需的注入和旧语义校验。

## 上下文文档

- `../../case.md`
- `../../02-design/design.md`
- `aipd-skill/src/core/overview.md`
- `aipd-skill/src/core/aipd-project-structure.md`
- `aipd-skill/src/skills/aipd/SKILL.md`
- `aipd-skill/src/core/agent-entry/template.md`
- `aipd-skill/scripts/`

## 执行前 checkpoint

- **当前目标**：形成完整新运行时和一次性迁移能力。
- **恢复入口**：本文件、`../../02-design/design.md`、`../execute.md`。
- **执行边界**：只改当前仓库；不 install、不触碰其他项目。
- **预期输出**：框架源文件、新模板、新 Agent 名称、迁移器和测试。
- **停止条件**：映射不唯一、旧目录仍被活动运行时需要、迁移器无法保证混合状态停止。
- **返回位置**：写回本文件执行记录，然后进入 wp-02。

### 运行时派发

- `core/workspace owner`：只修改 `aipd-skill/src/core/knowledge/`、`aipd-skill/src/core/workspace/`、框架总览和项目结构文档。
- `skills/agents owner`：只修改 `aipd-skill/src/skills/`、Agent Entry、Agent guides 和平台 Agent 元数据。
- `scripts/migrator owner`：只修改 `aipd-skill/scripts/` 与 `experience-assets/scripts/verify-assets.mjs`。
- Main Agent 负责 Case、根级文档、当前项目迁移、冲突审查和统一验证；不重复执行上述文件面的修改。

## 验收标准

- [x] 新初始化只创建 `_aipd/knowledge/*`。
- [x] 所有活动 Skill、Agent Entry 和 retriever 只读取新 Schema。
- [x] 迁移器正确处理完整旧版、完整新版和混合状态。
- [x] 框架源目录与对外知识域命名一致。
- [x] 不存在运行时兼容分支。

## 不做

- 不迁移当前项目实例；由 wp-02 承担。
- 不执行 install。

## 执行记录

**状态**：completed

**完成时间**：2026-08-10

**主要改动**：
- 将框架 `core/L1-L5*` 改为 `core/knowledge/{intent,research,core,product,engineering}`，将工作区模板归入 `core/workspace/`。
- 新增严格 v2 manifest、`migrate-project-schema` 和 fixture 检查；日常运行时只保留拒绝性旧根哨兵。
- 将 `aipd_adoc_retriever` 改为读取 Knowledge、SOP、必要流程、README 与代码入口的 `aipd_context_retriever`。
- 同步 9 个 Skills、3 个 Codex Agent、Claude/Codex 平台投影及 Weave 五知识域门槛。

**验证结果**：
- `check-schema-migrator` 通过。
- 双平台 build 通过，`check-dist` 通过。
- 未执行 install。

**执行后 checkpoint**：
- **当前结论**：框架新运行时与一次性迁移能力已完成。
- **下一步**：进入 wp-02，验证当前项目切换。
- **恢复入口**：本文件。

**遇到的问题**：无。

**回跳 / 重开**：无。

**Weave 候选**：新 Knowledge Schema 和迁移规则，待 Verify 后成为框架事实。

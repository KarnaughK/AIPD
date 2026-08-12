# Case: c23-versioned-aipd-update

> **本次事项目标**：把 `aipd-update` 从当前结构合规审计器改造成面向多个项目版本、以本机已安装 AIPD 为目标的一次语义收敛更新器
> **当前 Phase**：Close / completed

## Case Contract

### 目标

- **目标**：为 AIPD 建立本机版本快照、顺序更新记录和项目已应用版本，使 `aipd-update` 能从项目版本 P 读取到本机版本 I 的变化背景，再以 I 的当前文档与模板为最终事实源，一次性把目标项目收敛到 I。
- **方向 / 项目阶段关联**：让 AI Agent 用“理解演进 + 读取最终态 + 保留项目定制”完成升级，而不是把每个历史版本的操作机械重放一遍。

### 要做

- 建立单一的本机 AIPD 当前版本事实源、顺序版本目录和每版更新记录。
- 在项目 manifest 中记录已应用 AIPD 版本，并为未版本化的现有 Schema v2 项目定义明确升级入口。
- 重写 `aipd-update`：选择 `(项目版本, 本机版本]` 的记录，先理解历史，再读取当前事实源和项目现状，直接形成一次最终态合并。
- 区分可自动执行的安全更新与真正需要停下确认的破坏性 / 歧义冲突；正常安全更新不再逐项请求确认。
- 更新初始化、运行时 gate、Agent Entry、迁移器、模板和公开项目认知，使版本合同一致。
- 增加本机版本快照的构建 / 打包一致性校验，以及项目版本边界、无版本基线、同版本 no-op、项目版本超前等测试。
- 按当前 Codex-first 发布合同构建并验证默认 Codex 产物，同时保留通用多目标打包结构；build 后不自动 install。

### 不做

- 不查询 GitHub、远端仓库或网络上的最新 AIPD 版本；本机安装包就是本次更新的最高版本边界。
- 不按版本逐次改写目标项目，也不先落到会被后续版本废弃的中间态。
- 不建立 Skill / Agent / 文档等组件各自独立的版本矩阵；本 Case 只管理一个完整 AIPD 发布快照版本。
- 不伪造 c22 以前的历史版本；当前完整框架作为第一版正式版本化基线。
- 不自动迁移其他外部项目，不执行 install、commit、push 或发布。

### 完成标准

- [x] 本机发布目录能唯一声明当前 AIPD 版本，并连续索引该版本之前的更新记录。
- [x] 新项目会记录当前 `aipdVersion`；既有无版本 v2 与一次性 Schema 迁移后的无版本 v2 都能被 `aipd-update` 识别为可升级输入。
- [x] `aipd-update` 明确执行“读取版本区间记录 -> 读取当前事实源 -> 读取项目现状 -> 一次语义收敛 -> 验证 -> 最后写版本与项目更新日志”。
- [x] 正常缺失 / 过期结构是更新输入而非阻塞；只有不安全、不可判定或破坏性冲突才停止。
- [x] 项目版本等于本机版本时 no-op；项目版本高于本机版本时硬停止；流程不访问远端。
- [x] build / check-dist 能阻止版本目录、manifest 模板、打包引用和迁移器发生版本漂移。
- [x] 默认 Codex build、版本 fixture、Schema migrator fixture、静态引用、通用多目标构建护栏和项目仓库校验通过；未经用户确认不 install。

### 上下文索引

#### 知识域判断

- **Intent**：沿用用户已确认的“本机版本即完整目标版本、远端未来再做”的长期边界。
- **Research**：来源是用户在真实更新体验中发现严格合规审计无法把项目拉到最新；本 Case 不新增外部调研。
- **Core**：新增“发布快照、项目已应用版本、演进记录、最终事实源、语义收敛”对象关系。
- **Product**：重做 AIPD Update 的用户可见行为、停止条件和结果日志。
- **Engineering**：涉及 manifest、版本目录、Skill 注入、运行时 gate、迁移器、默认 Codex 产物与通用多目标打包校验。
- **局部 README**：无单独 UI / 代码模块；框架源码文档就是局部实现入口。
- **Case / 历史 Work Package**：c22 提供当前 Schema v2 基线与迁移器事实，不沿用其执行状态。

#### 项目认知

- `_aipd/map.md` - AIPD Update、初始化、Schema 迁移和 Skills 构建入口。
- `_aipd/knowledge/core/index.md`、`horizontal-capabilities.md` - Update 所处的横向能力和文件优先认知。
- `_aipd/knowledge/product/index.md`、`map.md` - AIPD Update 产品功能线。
- `_aipd/knowledge/engineering/index.md` - 构建、安装、Agent 和 Schema 工程合同。

#### 代码入口

- `aipd-skill/src/skills/aipd-update/SKILL.md` - 更新运行时入口。
- `aipd-skill/src/core/aipd-project-structure.md`、`workspace/templates/manifest.json` - 项目版本事实源与模板。
- `aipd-skill/src/core/updates/` - 本 Case 新增的发布目录、当前快照说明和版本记录。
- `aipd-skill/src/skills/*/SKILL.md`、`src/core/agent-entry/`、`src/core/agent-guides/` - 项目版本 gate 与过期项目路由。
- `aipd-skill/scripts/build`、`check-dist`、`migrate-project-schema`、相关 fixture - 打包、版本一致性和“结构迁移不冒充语义更新”的验证。

#### Phase 材料入口

- `01-think/think.md` - 用户确认的更新模型与反例。
- `02-design/design.md` - 版本对象、读取顺序、状态机和文件边界。
- `02-design/decision-log.md` - 已确认 / 延后的关键决策。
- `03-execute/execute.md` - 执行总状态（进入 Execute 后创建）。
- `04-verify/verify.md` - 验收记录（进入 Verify 后创建）。
- `05-close/close.md` - 关闭记录（进入 Close 后创建）。

#### 兜底搜索

- `rg "schemaVersion|manifest.json|aipd-update|更新 AIPD|同步新模板" aipd-skill/src aipd-skill/scripts _aipd docs README.md` - 定位所有版本与旧更新语义。

### 边界变更记录

- 2026-08-12：用户确认直接创建并执行完整 Case；远端版本检查延期，不影响本机版本化更新闭环。

## Case Runtime

## Current Phase

Close

## Phase State

- Think: completed -> `01-think/think.md`
- Design: completed -> `02-design/design.md`
- Execute: completed -> `03-execute/execute.md`
- Verify: completed / passed -> `04-verify/verify.md`
- Close: completed -> `05-close/close.md`

## 当前焦点

- **当前要解决的问题**：无；Case 已完成并归档。
- **当前游标**：`05-close/close.md`
- **最近 checkpoint**：V1 源码、Codex dist、项目自身版本跃迁与全部验证通过。
- **下一步建议**：如需把新产物安装到用户级 Codex，另行取得用户确认后执行。
- **压缩后恢复入口**：本文件 -> `05-close/close.md`。
- **待确认项**：无；用户已授权在既定边界内自主完成。
- **阻塞项**：无。

## Checkpoint 记录

| 时间 | 位置 | 触发 | 已确认 / 已变化 | open / assumed | 下一步 | 恢复入口 |
|---|---|---|---|---|---|---|
| 2026-08-12 | Think -> Design | 用户授权完整 Case | 本机版本 I 是唯一目标；读取 `(P,I]` 历史但不逐版重放；远端检查延期 | 第一版正式编号在 Design 固定 | 完成设计与 brownfield 审计 | `02-design/design.md` |
| 2026-08-12 | Design -> Execute | Readiness Gate | V1 基线、manifest 双形态、版本状态机、Update 写入顺序、迁移器边界和文件 owner 已固定 | install 未授权 | 执行三个 Work Package | `03-execute/execute.md` |

## Think 摘要

- **状态**：completed
- **关键问题**：多版本更新怎样既理解中间演进，又避免执行已经被后续版本覆盖或撤销的无效路径。
- **决策结论**：版本记录提供变化背景，当前安装包的文档 / 模板提供最终态，项目实际内容提供定制边界；Agent 一次合并到本机最终态。

## Design 摘要

- **模式**：full；这是跨 manifest、9 个 Skills、Agent Entry、迁移器和 build 的框架级重构。
- **当前节点**：readiness-gate。
- **节点状态**：completed。
- **阻塞级 open**：无。
- **Readiness Gate**：passed，详见 `02-design/design.md`。

## Execute 摘要

- **状态**：completed。
- [x] `03-execute/work-packages/wp-01-release-contract-and-runtime-gates.md`
- [x] `03-execute/work-packages/wp-02-update-orchestration-and-knowledge.md`
- [x] `03-execute/work-packages/wp-03-release-validation-and-integration.md`

## Verify 摘要

- **结果**：passed；版本状态、一次收敛、forward guard、Schema migrator、Codex dist、项目自举和无越权边界均通过。

## Close 摘要

- **状态**：completed；稳定认知已回写，Case 已归档，安装留待用户单独确认。

## Close 归档候选 / 反向编织候选

| 候选内容 | 触发来源 | 当前状态 | 候选归属 | Close 判断 |
|---|---|---|---|---|
| 本机发布快照 + 项目已应用版本 + 一次语义收敛 | 用户确认 | 待实现 | Core / Product / Engineering / Map | Verify 后决定 |

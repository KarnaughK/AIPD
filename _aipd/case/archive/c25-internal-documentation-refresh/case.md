# Case: c25-internal-documentation-refresh

> **本次事项目标**：审计并更新项目内部认知入口与维护者文档，使它们完整反映 AIPD 当前架构、能力和工程边界
> **当前 Phase**：Close / completed

## Case Contract

### 目标

- **目标**：以 `main@e22f97e` 的已验证升级事实为基线，校准 `_aipd/index.md`、`_aipd/map.md`、`_aipd/knowledge/**` 与 `aipd-skill/README.md`。
- **方向 / Mission 关联**：服务 `m1-documentation-refresh-v2`，本 Case 只负责内部认知入口和维护者文档，不承担根 README、教程或源码运行行为更新。

### 要做

- 审计并按需更新范围内活跃事实源，覆盖五类 Knowledge、Map-first、Case / Work Package、版本化 Update、显式 Leader、AI 友好代码拓扑、交互协议、Main / Child 与仓库级 Learn。
- 让维护者可从 `aipd-skill/README.md` 找到当前公共 Skill、仓库级 Skill、源码 / 平台 / 构建 / 校验 / 迁移入口及禁止手改 dist、install 需确认的边界。
- 核对范围内无需修改的文件并在 Verify 记录依据。

### 不做

- 不修改 Skill / 脚本运行行为，不手改 `aipd-skill/dist/`。
- 不修改 `README.md`、`docs/**`、`AGENTS.md`、`aipd-skill/src/**` 或已归档 c19-c24；这些仅作为只读事实源。
- 不 install、push、发布、提交或执行其他远端写入。
- 不把旧 Case、迁移说明或历史记录中的旧术语改写成当前事实，也不为了制造 diff 改写已准确文件。

### 完成标准

- [x] 范围内活跃内部入口准确覆盖九项升级事实，路径、术语、能力数量和平台事实彼此一致。
- [x] `aipd-skill/README.md` 提供当前公共 / 仓库级 Skill、源码 / 平台 / 构建 / 校验 / 迁移导航，并明确 dist 与 install 边界。
- [x] 所有内容修改只落在约定内容所有权与本 Case 文件中。
- [x] Verify 记录改动项、无需改动项及其核对依据，文档与仓库事实校验通过。
- [x] Think / Design / Execute / Verify / Close 完整推进并归档 Case，不自行 commit。

### 上下文索引

#### 知识域判断

- **Intent**：只读核对项目长期方向，不从本次文档整理反推新方向。
- **Research**：核对是否存在需同步的外部事实；预计无新增外部调研。
- **Core**：核心审计对象，覆盖 Workspace、五类 Knowledge、横向能力、Case、拓扑与 Leader 模型。
- **Product**：核对当前公共能力、用户可见边界和 Learn / Update / Interaction Protocol。
- **Engineering**：核对源码 / 平台 / 构建 / 安装 / 校验 / 迁移入口与 Main / Child 规则。
- **局部 README**：`aipd-skill/README.md` 是本 Case 的维护者入口；源码 README 只读。
- **Case / 历史 Work Package**：只读 c19-c24 的最终证据，历史术语只在原语境保留。

#### 项目认知与事实源

- `_aipd/index.md`、`_aipd/map.md`、`_aipd/knowledge/**` - 本 Case 内容审计与更新范围。
- `aipd-skill/README.md` - 维护者文档更新范围。
- `AGENTS.md`、`aipd-skill/src/**`、`docs/**`、`README.md` - 当前行为与对外叙事的只读交叉核对。
- `_aipd/case/archive/c19-*` 至 `c24-*` - 最近升级的历史证据。

#### Phase 材料入口

- `01-think/think.md` - 事实盘点、审计矩阵与文档缺口。
- `02-design/design.md` - 文件级改动设计和 Work Package 边界。
- `03-execute/execute.md` - 执行状态与结果。
- `03-execute/work-packages/` - 可恢复、可验收的文档更新包。
- `04-verify/verify.md` - 逐项验收和无需修改依据。
- `05-close/close.md` - 关闭与归档判断。

#### 兜底搜索

- `rg "Knowledge|Map-first|aipd-update|aipd-leader|Code Topology|Interaction Protocol|Main / Child|aipd-learn" _aipd aipd-skill README.md docs AGENTS.md`

### 边界变更记录

- 2026-08-13：按 Leader 委派建立唯一 Case；内容所有权和禁止外部副作用边界不变。

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

- **当前要解决的问题**：无；Case 已完成，等待 Mission Leader 核对与集成。
- **当前游标**：`05-close/close.md`
- **最近 checkpoint**：Close completed；长期认知、归档引用和外部动作边界审计通过。
- **下一步建议**：Mission Leader 从归档 Case、Verify 和真实 diff 核对后集成；本 task 不自行 commit。
- **压缩后恢复入口**：本文件 -> `05-close/close.md` -> `04-verify/verify.md`。
- **待确认项**：无；Leader 委派已明确要求完整推进全部 phase。
- **阻塞项**：无。

## 状态卡记录

- **文件事实**：`_aipd/case/index.md` 原无进行中 Case，保留编号 c25 尚未使用；HEAD 为 `e22f97e`。
- **用户认知**：本 task 是 Mission 下的 Case owner，必须完整推进 c25，且只更新约定文档范围。
- **冲突点**：用户提供的项目路径为桌面主仓库，但当前共享工作区是同一仓库的 Codex worktree；以当前 task 工作区和 HEAD 为执行位置，不触碰桌面主仓库。
- **当前 phase 条件**：需要先完成升级事实与范围内文件差距审计。
- **建议下一步**：进入 Think 事实盘点；用户已预先授权后续 phase 跳转。

## Checkpoint 记录

| 时间 | 位置 | 触发 | 已确认 / 已变化 | open / assumed | 下一步 | 恢复入口 |
|---|---|---|---|---|---|---|
| 2026-08-13 | Case -> Think | Case 创建 / 长调查前 | 基线、gate、所有权、成功判据和禁止事项已确认 | 无 | 审计九项升级事实与范围内文档 | `01-think/think.md` |
| 2026-08-13 | Think -> Design | 事实包收口 / phase 跳转 | 九项升级事实、modify / keep 文件和 Main 直接执行判断已确认 | 无 | 固定文件级设计与 Work Package | `02-design/design.md` |
| 2026-08-13 | Design -> Execute | readiness passed / 用户预授权完整推进 | quick / docs-only 设计、三个 Work Package、Main 运行时选择已固定 | 无 | 执行 wp-01 | `03-execute/work-packages/wp-01-workspace-map-entries.md` |
| 2026-08-13 | Execute wp-01 | Work Package 完成 | 工作区 gate、Map 维护者路由与 Workspace 模块边界已补齐 | 无 | 执行 wp-02 | `03-execute/work-packages/wp-02-current-core-runtime-terms.md` |
| 2026-08-13 | Execute wp-02 | Work Package 完成 | Core 九模型补齐 Leader；Main / Child、Work Package 与平台数量边界已校准 | 无 | 执行 wp-03 | `03-execute/work-packages/wp-03-maintainer-readme.md` |
| 2026-08-13 | Execute -> Verify | 三个 Work Package 完成 / phase 跳转 | 9 个内容文件定向更新完成；未修改源码、dist 或外部状态 | 无 | 全范围验收 | `04-verify/verify.md` |
| 2026-08-13 | Verify -> Close | 全范围验收 passed | 九项事实、路径 / 数量、旧语义、keep 文件和所有权范围通过；临时 build + check-dist 通过 | 无 | Close 与归档 | `05-close/close.md` |
| 2026-08-13 | Close -> Archive | Contract / Work Package / Verify / Weave / 引用审计完成 | 稳定事实已直接写入授权 owner，无重复 weave、无外部动作；Case 可归档 | 无 | Leader 核对与集成 | `05-close/close.md` |

## Think 摘要

- **状态**：completed
- **关键问题**：当前活跃内部文档是否完整、准确且一致地反映九项升级事实。
- **决策结论**：源码与历史证据一致；采用 targeted refresh，修改入口导航、Core 当前术语与维护者 README，准确文件保留并在 Verify 说明。

## Design 摘要

- **模式**：quick / docs-only
- **当前节点**：readiness-gate / completed
- **Readiness Gate**：passed

## Execute 摘要

- **当前执行游标**：completed；三个 Work Package 均已验收。
- **最近执行 checkpoint**：wp-03 完成后进入 Verify，内容修改共 9 个文件且未修改源码、dist 或外部状态。

- [x] `03-execute/work-packages/wp-01-workspace-map-entries.md` - Workspace / Map 入口
- [x] `03-execute/work-packages/wp-02-current-core-runtime-terms.md` - Core 当前术语与平台数量
- [x] `03-execute/work-packages/wp-03-maintainer-readme.md` - 维护者 README

## Verify 摘要

- **状态**：passed
- **残留风险**：工作树无 dist 基线，已用临时副本完成 build + check-dist；不影响 docs-only 交付。

## Close 归档候选 / 反向编织候选

| 候选内容 | 触发来源 | 当前状态 | 候选归属 | Close 判断 |
|---|---|---|---|---|
| 范围内活跃内部认知与维护者入口的当前事实校准 | Mission 委派 | 已完成 | 五类 Knowledge / Map / README | 稳定事实已直接写入授权 owner；不另启 weave |

## Close 摘要

- **状态**：completed / archived
- **创建时间**：2026-08-13
- **归档时间**：2026-08-13
- **归档位置**：`_aipd/case/archive/c25-internal-documentation-refresh/`

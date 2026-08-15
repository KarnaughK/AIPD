# Case: c26-public-readme-refresh

> **本次事项目标**：把根 README 更新成面向第一次看到 AIPD 的人的高质量项目首页，准确呈现升级后的价值、能力、边界与第一步
> **当前 Phase**：Close / completed

## Case Contract

### 目标

- **目标**：重写根 `README.md` 的信息架构与正文，让新人先理解 AIPD 解决什么问题、如何工作及为什么可靠，再按需了解能力、边界和使用入口。
- **方向 / 项目阶段关联**：归属 Mission `m1-documentation-refresh-v2`；把 `main@e22f97e` 上已经实现的升级事实同步到公共项目首页。

### 要做

- 仅修改根 `README.md`，并在本 Case 目录与 `_aipd/case/index.md` 写回流程状态。
- 只读核对 `_aipd/**`、`aipd-skill/src/**`、`aipd-skill/README.md`、`docs/**` 与已归档 C18-C24。
- 校准快速开始、Schema v2、Map-first、Case 生命周期、文件 checkpoint、版本化 Update、显式 Leader、Main / Child、AI 友好代码拓扑、九个公共 Skill 与仓库级 `aipd-learn` 边界。
- 验证根 README 内所有本地 Markdown 链接。

### 不做

- 不修改任何 Skill、脚本、构建产物、内部教程或长期 Knowledge。
- 不手改 `aipd-skill/dist`，不 install、push、发布、commit 或执行其他远端写入。
- 不把历史 Case 的旧术语改写为当前事实，也不把仓库级 `aipd-learn` 描述为可安装公共 Skill。

### 完成标准

- [x] 首屏和前半部分以新人问题为主线，先说明价值、工作方式与可靠性，而非堆内部对象。
- [x] 快速开始命令和路径与当前 Codex 构建 / 安装、Schema v2、`/aipd`、`/aipd-case`、`/aipd-weave` 一致。
- [x] 合适层级覆盖版本化 Update、显式 Leader、五类 Knowledge、Map-first、文件 checkpoint、Case 生命周期、Main / Child 与 AI 友好代码拓扑。
- [x] 明确九个公共 Skill 与仓库级 `aipd-learn` 的分发边界。
- [x] 根 README 所有本地 Markdown 链接有效，篇幅对新人友好且不过度膨胀。

### 上下文索引

#### 知识域判断

- **Intent**：读取项目长期方向，确保首页价值主张与当前边界一致。
- **Research**：本 Case 不新增外部调研；只使用 C18 已沉淀的文档产品化结论。
- **Core**：读取 Workspace、五类 Knowledge、横向能力和 AI 友好代码拓扑事实。
- **Product**：读取公共 Skill、Update、Leader、Case、Weave 等用户可见能力。
- **Engineering**：读取 Codex 构建安装、Main / Child 调度与仓库级 learn 边界。
- **局部 README**：读取根 README、`aipd-skill/README.md` 与 `docs/README.md`。
- **Case / 历史 Work Package**：只读 C18-C24 中与文档升级事实相关的归档摘要和验证记录。

#### 项目认知与实现入口

- `_aipd/map.md`、`_aipd/knowledge/{intent,core,product,engineering}/` - 当前概念与能力边界。
- `aipd-skill/src/core/overview.md`、`aipd-skill/src/core/updates/`、`aipd-skill/src/core/leader/`、`aipd-skill/src/core/case/` - 当前权威实现文档。
- `aipd-skill/src/skills/*/SKILL.md` - 九个公共 Skill 的实际入口与边界。
- `.agents/skills/aipd-learn/SKILL.md` - 仅 AIPD 仓库使用的框架自迭代入口。
- `aipd-skill/README.md`、`docs/README.md`、`docs/guide/`、`docs/modules/` - 安装与教程链接事实。
- `_aipd/case/archive/c18-*` 至 `c24-*` - 最近升级的历史证据。

#### Phase 材料入口

- `01-think/think.md` - README 现状、升级事实与新人信息需求盘点。
- `02-design/design.md` - 信息架构、篇幅、链接和内容边界。
- `03-execute/execute.md`、`03-execute/work-packages/wp-01-refresh-root-readme.md` - README 执行与记录。
- `04-verify/verify.md` - 成功判据、链接与事实核对。
- `05-close/close.md` - 关闭与归档记录。

#### 兜底搜索

- `rg "aipd-update|aipd-leader|aipd-learn|Main|Child|Knowledge|checkpoint|install-codex" README.md docs aipd-skill/src _aipd`。

### 边界变更记录

- 2026-08-13：按 Leader 委派建立 Case；内容所有权固定为根 `README.md`，流程文件仅限本 Case 与 Case 索引。

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
- **最近 checkpoint**：Close 审计确认无额外 Weave / learn 候选、无外部路径依赖，Case 可安全归档。
- **下一步建议**：Leader 核对根 README diff 并按 Mission 需要集成；本 Case 不自行 commit。
- **压缩后恢复入口**：本文件 -> `04-verify/verify.md` -> `05-close/close.md`。
- **待确认项**：无；Leader 委派已明确授权完整推进各 phase。
- **阻塞项**：无。

## 状态卡记录

- **文件事实**：`c26` 原先不存在；Case 索引显示无进行中 Case；HEAD 为 `e22f97e`，项目版本 `P=I=2`。
- **用户认知**：本 task 是 Mission 下的 Case owner，不是 Leader；应完整推进并保留未提交改动给 Leader 集成。
- **冲突点**：无。
- **当前 phase 条件**：README 涉及多项最近升级事实，需要先 Think 盘点。
- **建议下一步**：完成事实矩阵后进入 quick Design。

## Checkpoint 记录

| 时间 | 位置 | 触发 | 已确认 / 已变化 | open / assumed | 下一步 | 恢复入口 |
|---|---|---|---|---|---|---|
| 2026-08-13 | Case / Think | 长调查前 | 基线、gate、编号、目标、边界与验收标准已确认 | 无 | 盘点 README 与权威事实 | `01-think/think.md` |
| 2026-08-13 | Think -> Design | phase 跳转 | 当前事实包、新人成功时刻和修改范围已收口 | 无；Leader 已授权完整推进 | 完成 quick Design | `02-design/design.md` |
| 2026-08-13 | Design -> Execute | readiness gate | 单文件信息架构、Attention Contract、Work Package 和 Verify 入口已确认，gate passed | 仅有篇幅控制风险 | 执行 wp-01 | `03-execute/work-packages/wp-01-refresh-root-readme.md` |
| 2026-08-13 | Execute -> Verify | wp-01 完成 | README 已更新，基础链接 / 格式 / Skill 数量检查通过 | 待 Reduction Scan | 完成 Verify | `04-verify/verify.md` |
| 2026-08-13 | Verify -> Close | 验收通过 | 五项成功判据和 Reduction Scan 全部 passed | Leader 最终集成核对不阻塞归档 | 关闭并归档 c26 | `05-close/close.md` |
| 2026-08-13 | Close | archive 审计 | 无外部路径依赖、无新长期事实或框架 learn 候选；Case 完成 | 未 commit，留给 Leader 集成 | 移至 archive 并更新索引 | `05-close/close.md` |

## Think 摘要

- **状态**：completed；详见 `01-think/think.md`。
- **关键问题**：如何用新人叙事准确压缩升级后的完整能力，同时避免内部对象清单和历史术语污染。
- **决策结论**：保留 C18 用户旅程骨架；用可执行三 Skill 闭环、V2 可靠性依据、分发边界和完整代码拓扑补齐当前事实。

## Design 摘要

- **模式**：quick（纯单文件文档改写，不涉及代码 / 模块边界）。
- **当前节点**：readiness-gate / completed。
- **复杂度爆点**：升级能力多，容易让首页退化成内部对象清单。
- **最小必要解耦**：按 now / next / on-demand 分层，详情继续链接到 docs / 源码权威。
- **Attention Contract**：新人先理解问题、价值和可靠性，再执行第一个完整闭环。
- **Readiness Gate**：passed；无阻塞项。

## Execute 摘要

- **当前执行游标**：已完成；详见 `03-execute/work-packages/wp-01-refresh-root-readme.md`。
- **最近执行 checkpoint**：README 单文件改动完成，无回跳或边界变化。
- [x] `03-execute/work-packages/wp-01-refresh-root-readme.md` - 重写并校准根 README。

## Verify 摘要

- [x] 新人问题 / 价值 / 可靠性主线清楚。
- [x] Codex 命令、Schema v2 与三 Skill 快速闭环准确。
- [x] V2 能力和公共 / 仓库级 Skill 边界完整。
- [x] 14 个本地链接 / 锚点、格式和变更范围检查通过。

### 验收结果

- **状态**：passed；详见 `04-verify/verify.md`。
- **残留风险**：docs 全体系升级由 Mission 其他 Case 负责；本 Case 不越权修改。

## Close 归档候选 / 反向编织候选

| 候选内容 | 触发来源 | 当前状态 | 候选归属 | Close 判断 |
|---|---|---|---|---|
| 根 README 的当前能力投影 | Mission / Execute / Verify | 已完成可评估 | 根 README | 已直接交付，无需 Weave |

## Close 摘要

- **状态**：已归档
- **创建时间**：2026-08-13
- **归档时间**：2026-08-13
- **归档位置**：`_aipd/case/archive/c26-public-readme-refresh/`

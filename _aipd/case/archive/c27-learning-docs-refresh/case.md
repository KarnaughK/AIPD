# Case: c27-learning-docs-refresh

> **本次事项目标**：系统更新 `docs/` 的学习路径、教程和模块参考，使 AIPD V2 的当前能力可以被连续学会并准确查阅。
> **当前 Phase**：Close

## Case Contract

### 目标

- **目标**：刷新 `docs/**`，让“先体验 / 连续学习 / 按问题查阅”覆盖 AIPD V2 的完整学习面，并与当前源码和项目权威事实一致。
- **方向 / Mission 关联**：`m1-documentation-refresh-v2`；把最近大升级后的真实能力、使用方式和边界同步到用户学习文档体系。

### 要做

- 更新 `docs/README.md` 的三条导航路径并保证链接真实。
- 校准 `docs/guide/` 的连续心智路径、首次闭环、命令、目录、生命周期和示例。
- 校准 `docs/modules/` 对 Knowledge Schema v2、Map-first、Agent Entry、Case / Work Package、Think、Main / Child、Weave、Update / 迁移、显式 Leader、构建安装和上下文解耦的说明。
- 必要时在 `docs/**` 内新增或重组页面，但保持根 README、docs 与 `_aipd` 的职责分工。
- 验证相对链接、活跃旧术语、公共 Skill 数量、命令和路径。

### 不做

- 不修改 Skill、脚本或任何运行行为；不手改 `aipd-skill/dist`。
- 不修改根 `README.md`、`aipd-skill/**`、其他 Knowledge / Map / README；这些仅作只读事实源。
- 除本 Case 目录和 `_aipd/case/index.md` 的本 Case 状态外，不修改 `_aipd/**`。
- 不 install、commit、push、发布或执行其他远端写入。
- 不把旧 Case、迁移说明和历史记录中的旧术语机械改写；只清理活跃用户事实源中的历史语义漂移。

### 完成标准

- [x] `docs/README.md` 的“先体验 / 连续学习 / 按问题查阅”覆盖升级后的完整学习面并链接到真实页面。
- [x] guide 形成连贯心智路径和可执行首次闭环，命令、目录、生命周期与示例和当前实现一致。
- [x] modules 对指定 V2 能力与边界保持一致，且参考页可独立理解。
- [x] README / docs / `_aipd` 三类文档职责清晰，不复制内部运行合同正文。
- [x] docs 内外相对链接、旧活跃术语、公共 Skill 数量、命令和路径通过自动检查与人工走查。
- [x] Case 完成 Think / Design / Execute / Verify / Close，并保留未提交工作树供 Leader 核对。

### 上下文索引

#### 知识域判断

- **Intent**：只读核对长期方向与公开边界，不回写。
- **Research**：不做新的外部调研；使用已验证的教学文档产品经验。
- **Core**：读取 Workspace、五类 Knowledge、横向能力、代码拓扑和上下文解耦当前定义。
- **Product**：读取 AIPD 用户可见功能线、显式 Leader、Update、Weave、Case 等边界。
- **Engineering**：读取 Agent Entry、Main / Child、构建安装、迁移与运行时入口。
- **局部 README**：读取 `README.md`、`aipd-skill/README.md` 与当前 `docs/README.md`，仅 `docs/**` 可写。
- **历史 Case**：只读核对 `c18` 至 `c24` 的已归档结论，历史术语不作为当前运行时事实。

#### 项目认知与源码入口

- `_aipd/index.md`、`_aipd/map.md` - Workspace 与本任务第一跳路由。
- `_aipd/knowledge/{intent,core,product,engineering}/` - 当前公开概念和产品 / 工程边界。
- `README.md`、`aipd-skill/README.md` - 根决策页和 Skill 包边界，只读。
- `aipd-skill/src/core/`、`aipd-skill/src/skills/`、`aipd-skill/scripts/` - 命令、模板、生命周期与公共能力事实源，只读。
- `_aipd/case/archive/c18-*` 至 `c24-*` - 最近文档与 V2 升级决策依据，只读。
- `docs/README.md`、`docs/guide/`、`docs/modules/` - 本 Case 内容所有权。

#### Phase 材料入口

- `01-think/think.md` - 事实包、漂移盘点和结论。
- `02-design/design.md` - 文档信息架构、页面职责和 work package 设计。
- `03-execute/execute.md` - 执行状态。
- `04-verify/verify.md` - 自动检查与人工旅程走查。
- `05-close/close.md` - 关闭与交接。

#### 兜底搜索

- `rg "L1|L2|L3|L4|L5|Step|case-create|case-run|case-archive|默认.*子 Agent|自动.*Leader|_adoc" docs` - 活跃旧语义审计。
- `rg --files docs aipd-skill/src/skills aipd-skill/scripts` - 页面、公共 Skill、脚本和路径事实盘点。

### 边界变更记录

- 2026-08-13：按 Leader 派发边界建立 Case；写入仅限 `docs/**`、本 Case 目录与 Case 索引中的本 Case 状态。

## Case Runtime

## Current Phase

Close

## Phase State

- Think: completed -> `01-think/think.md`
- Design: completed -> `02-design/design.md`
- Execute: completed -> `03-execute/execute.md`
- Verify: completed -> `04-verify/verify.md`
- Close: completed -> `05-close/close.md`

## 当前焦点

- **当前要解决的问题**：无；Case 已完成并归档。
- **当前游标**：`05-close/close.md`
- **最近 checkpoint**：Close completed；长期认知与归档引用审计通过，未执行任何 Git / install / 远端动作。
- **下一步建议**：Leader 核对 docs diff，并与根 README Case 做 Mission 级集成验收。
- **压缩后恢复入口**：归档目录本文件、`04-verify/verify.md`、`05-close/close.md`。
- **待确认项**：无；用户已明确要求完整推进全部 phase。
- **阻塞项**：无。

## 状态卡记录

- **文件事实**：`c27` 原不存在，Case 索引显示无进行中 Case；当前 HEAD 正是共享基线 `e22f97e`。
- **用户认知**：本任务是 Mission 下唯一 `c27` Case，目标与文件所有权、成功判据均已明确。
- **冲突点**：无。
- **当前 phase 条件**：Think / Design / Execute / Verify / Close 均 completed；可归档。
- **建议下一步**：Leader 做跨 Case 文档集成验收；本 Case 不自行提交。

## Checkpoint 记录

| 时间 | 位置 | 触发 | 已确认 / 已变化 | open / assumed | 下一步 | 恢复入口 |
|---|---|---|---|---|---|---|
| 2026-08-13 | Think | 调研前 | 基线、gate、所有权与成功判据已确认 | docs 漂移与页面改法待盘点 | 建立事实包和差异矩阵 | `01-think/think.md#调研前-checkpoint` |
| 2026-08-13 | Think -> Design | phase 跳转 | 当前事实包与页面差异矩阵完成；保留六章旅程并补 3 个 V2 参考入口 | 无阻塞 open | 完成文档设计与工作包 | `02-design/design.md#design-checkpoint` |
| 2026-08-13 | Design -> Execute | Readiness Gate | requirements、brownfield、Attention Contract、页面边界、两个 Work Package 和 Verify 入口已确定；Gate passed | 无阻塞 open | Main 顺序执行 wp-01 / wp-02 | `03-execute/work-packages/wp-01-refresh-module-reference.md` |
| 2026-08-13 | Execute -> Verify | Work Packages completed | modules、导航和 guide 均完成；相对链接预检查通过，无边界或设计冲突 | 完整 Verify 待执行 | 自动检查 + 三条旅程 + Reduction Scan | `04-verify/verify.md` |
| 2026-08-13 | Verify -> Close | Verify Gate | Contract、Work Package、自动检查、用户旅程和 Reduction Scan 全部 passed | 根 README 跨 Case 集成文案由 Leader 总验收 | Close 并归档 | `05-close/close.md` |
| 2026-08-13 | Close | Archive Gate | 长期认知无需重复回写；路径引用与目标碰撞检查通过；未执行 Git / install / 远端动作 | 根 README 跨 Case一致性由 Leader 验收 | 移入 archive 并更新索引 | `05-close/close.md` |

## 回跳 / 重开记录

当前无。

## Think 摘要

- **状态**：completed
- **关键问题**：升级后的用户学习面、教程因果路径和模块参考边界如何映射到现有页面。
- **调研 / 比较分支**：不另建外部调研分支；使用 `01-think/think.md` 收敛仓库内事实审计。
- **决策结论**：保留 c18 验证过的三层分工和六章旅程；新增 Update / 迁移、Interaction Protocol、AI 友好代码拓扑参考页，并增量校准教程和交叉入口。

## Design 摘要

- **模式**：full
- **理由**：跨入口、连续教程与模块参考，涉及信息架构、页面职责和多文件一致性。
- **当前节点**：readiness-gate
- **节点状态**：completed
- **需求契约**：ready；无阻塞 open。
- **Brownfield Delta**：保留六章与三层分工；新增 3 个模块页，增量校准教程和交叉入口。
- **Attention Contract**：入口做分流、guide 做因果课程、modules 做独立参考；可选能力不挤入首次闭环。
- **Code Topology Contract**：不命中；本 Case 不改变代码模块依赖。
- **Readiness Gate**：passed。

## Execute 摘要

- **当前执行游标**：无；全部 Work Package completed。
- **最近执行 checkpoint**：wp-02 completed；进入 Verify。

- [x] `03-execute/work-packages/wp-01-refresh-module-reference.md` - 新增并校准 V2 模块参考。
- [x] `03-execute/work-packages/wp-02-refresh-learning-journey.md` - 更新 docs 导航与连续 guide。

## 后续候选事项

- 根 `README.md` 的刷新属于 Mission 的其他 Case，不在本 Case 修改。

## Verify 摘要

- [x] 链接与路径真实。
- [x] 事实、命令、Skill 数量和生命周期一致。
- [x] 三条用户旅程完整且参考页可独立进入。

### 验收结果

- **状态**：passed
- **残留风险**：根 README 最终文案由 Mission 其他 Case 修改，Leader 集成时需复核导航一致性。

## Close 归档候选 / 反向编织候选

当前无；本 Case 只同步已有事实到用户 docs，不修改长期 Knowledge。

## Close 摘要

- **状态**：completed / archived。
- **归档时间**：2026-08-13。
- **归档位置**：`_aipd/case/archive/c27-learning-docs-refresh/`。
- **长期认知判断**：无需 Weave；执行过程只留 Case。
- **外部动作**：未 install、commit、push 或发布。

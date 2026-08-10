# Case: c22-aipd-knowledge-schema

> **本次事项目标**：把 AIPD 的项目工作区和长期知识库从旧层级目录一次性切换为语义化 Schema
> **当前 Phase**：Close

## Case Contract

### 目标

- **目标**：将项目级 AIPD 容器统一为 `_aipd/`，将五类长期知识统一放入 `_aipd/knowledge/{intent,research,core,product,engineering}/`，并同步框架源码、模板、Skills、Agent 指引、当前项目和公开文档。
- **方向 / 项目阶段关联**：消除 L1-L5 被误读为递进层级、`_adoc` 同时代表知识库和整个 AIPD 工作区的语义冲突，让存储分类、Map 检索和 SOP 执行各自拥有清楚边界。

### 要做

- 将项目工作区从 `_adoc/` 改为 `_aipd/`。
- 将长期知识域改为 `knowledge/intent`、`knowledge/research`、`knowledge/core`、`knowledge/product`、`knowledge/engineering`。
- 将物理目录、运行时规则和对外文档中的 L1-L5 层级叙事改为五类并列知识域；代码仍留在真实源码目录。
- 同步 AIPD 源码目录、模板、Skills、Agent Entry、检索 Agent、构建校验和当前项目入口。
- 提供一次性迁移器；迁移后运行时只识别新结构，不双读、不 fallback。
- 构建并验证 Codex / Claude 产物；安装前单独向用户确认。

### 不做

- 不在本次迁移其他业务项目；只提供迁移能力和迁移清单，当前仓库先作为试点。
- 不引入向量数据库或新的检索服务。
- 校准 Map 三级分辨率的定义、模板和入口；不在本次增加自动化检索测试体系。
- 不保留 `_adoc`、`L1-*` 至 `L5-*` 的运行时兼容逻辑。
- 不执行 Claude Code 或任何项目级 install；Codex 用户级 install 只在用户明确确认后作为 Close 交付动作执行。

### 完成标准

- [x] 当前仓库使用 `_aipd/`，五类长期知识只存在于 `_aipd/knowledge/`。
- [x] AIPD 初始化、读取、Case、OKR、Inbox、SOP、Weave、Update、Learn 和检索 Agent 全部只使用新 Schema。
- [x] 一次性迁移器能把完整旧结构转换为完整新结构，并拒绝新旧混杂状态。
- [x] 除一次性迁移器、拒绝性哨兵和明确迁移说明外，活动源码、模板、Agent Entry、项目入口和公开文档不存在旧运行时路径。
- [x] `./aipd-skill/scripts/build` 与 `./aipd-skill/scripts/check-dist` 通过。
- [x] Case 记录真实改动、验证结果和下游项目迁移入口；Codex 用户级 install 仅在用户明确授权后执行并验证。

### 上下文索引

#### 认知域判断

- **Intent**：涉及 AIPD 的长期定位、Non-Goals 和工作区边界。
- **Research**：用户已通过多个真实项目发现 L1-L5 递进叙事不适合 1→10 阶段；本 Case 不新增外部调研。
- **Core**：涉及长期知识域、横向 Map/SOP/Case 能力及知识与流程的分类模型。
- **Product**：涉及初始化、Map-first 加载、Update、Weave、Case 等用户可见能力。
- **Engineering**：涉及目录 Schema、构建注入、项目识别、迁移器和跨 Skill 路径约定。
- **代码**：`aipd-skill/src/`、`aipd-skill/scripts/`、`experience-assets/scripts/`。

#### 项目认知

- `_aipd/index.md`、`_aipd/map.md` - 当前项目入口、Map 三级分辨率与任务路由事实。
- `_aipd/knowledge/core/workspace-modules.md` - Workspace、五类并列 Knowledge 与发现 / 存储 / 读取三条链路。
- `_aipd/knowledge/core/horizontal-capabilities.md` - Map、SOP、Case、Weave 等横向能力。
- `_aipd/knowledge/product/index.md`、`_aipd/knowledge/product/map.md` - AIPD 产品能力入口。
- `_aipd/knowledge/engineering/index.md` - 构建、Agent 调度和工程规则。
- 旧路径与新路径的精确映射只保留在 `02-design/design.md`，不作为当前读取入口。

#### 代码入口

- `aipd-skill/src/core/overview.md`、`aipd-skill/src/core/aipd-project-structure.md` - 框架总览与项目目录结构。
- `aipd-skill/src/skills/` - 项目识别、初始化、读取和写回规则。
- `aipd-skill/src/core/agent-entry/`、`aipd-skill/src/core/agent-guides/` - 项目入口和检索 Agent。
- `aipd-skill/scripts/` - 构建、校验、安装和一次性迁移工具。
- `AGENTS.md`、`README.md`、`docs/` - 当前项目入口与公开文档。

#### Phase 材料入口

- `01-think/think.md` - 本轮讨论形成的存储、检索和迁移判断。
- `02-design/design.md` - Schema、迁移合同和代码拓扑边界。
- `02-design/decision-log.md` - 已确认命名决策。
- `03-execute/execute.md` - 执行总状态。
- `03-execute/work-packages/wp-01-framework-schema-and-migrator.md` - 框架源码与一次性迁移器。
- `03-execute/work-packages/wp-02-current-project-cutover.md` - 当前项目实例和文档切换。
- `04-verify/verify.md` - 残留、构建和行为验收。
- `05-close/close.md` - 关闭与下游迁移交接。

#### 兜底搜索

- `rg "_adoc|L1-intent|L2-research|L3-core|L4-product|L5-dev|aipd_adoc" .` - 检查旧 Schema 引用。
- `rg "inject-from-core|include|references" aipd-skill/scripts aipd-skill/src` - 检查构建注入和引用关系。

### 边界变更记录

- 2026-08-10：用户确认采用 `_aipd/knowledge/{intent,research,core,product,engineering}`，并明确不保留兼容逻辑；本 Case 获准直接进入实现。
- 2026-08-10：Verify 通过后，用户明确授权执行 Codex 用户级 install；授权范围不包含 Claude Code、项目级安装或其他项目迁移。

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

- **当前要解决的问题**：无；Knowledge Schema v2、Codex 用户级安装和 Case 归档均已完成。
- **当前游标**：`05-close/close.md`
- **最近 checkpoint**：用户明确授权后完成 Codex 用户级安装；9 个 Skill 与 3 个 Agent 和构建产物逐文件一致，旧检索 Agent 已移除。
- **下一步建议**：按需逐项目运行一次性迁移器；不在本 Case 自动迁移其他项目。
- **压缩后恢复入口**：`_aipd/case/archive/c22-aipd-knowledge-schema/case.md` -> `05-close/close.md`。
- **待确认项**：
  - [x] 用户已确认执行 Codex 用户级 install。
- **阻塞项**：无。

## 状态卡记录

- **文件事实**：当前工作树已使用 `_aipd/manifest.json` 与五类语义目录；双平台发布态验证通过；Codex 用户级 9 个 Skill 与 3 个 Agent 已安装并验证，旧检索 Agent 已删除。
- **用户认知**：旧命名会误导为递进层级；愿意一次更新其他项目，拒绝长期兼容。
- **冲突点**：无；本次新建独立 c22，不复用 c19。
- **当前 phase 条件**：Case Contract、两个 Work Package、Verify、install 交付和 archive 审计均已完成。
- **建议下一步**：Case 已关闭；其他项目迁移另行执行。

## Checkpoint 记录

| 时间 | 位置 | 触发 | 已确认 / 已变化 | open / assumed | 下一步 | 恢复入口 |
|---|---|---|---|---|---|---|
| 2026-08-10 | Design -> Execute | 用户确认 | `_aipd` 为工作区；`knowledge/*` 为五类长期知识；不做运行时兼容 | install 尚未授权 | 执行 wp-01 | `02-design/design.md` |
| 2026-08-10 | Execute / wp-01 -> wp-02 | 三条并行执行线完成 | 框架源码、Skills、Agent、manifest、迁移器和 fixture 已收口；当前项目开始原子切换 | install 尚未授权 | 完成当前项目验证 | `03-execute/work-packages/wp-02-current-project-cutover.md` |
| 2026-08-10 | Execute -> Verify | wp-02 与发布态复核完成 | 189/189 文件映射完整；双平台 build、check-dist、迁移 fixture、Schema、资源和活动链接验证通过 | install 尚未授权 | 交付结果并等待 install 决策 | `04-verify/verify.md` |
| 2026-08-10 | Verify -> Close | 用户明确授权 Codex 用户级 install | 安装 9 个 Skill 与 3 个 Agent，删除旧 `aipd_adoc_retriever`，安装结果与 dist 逐文件一致 | Claude / 项目级 install、其他项目迁移不在范围 | 完成 Close 与归档 | `05-close/close.md` |

## 回跳 / 重开记录

| 时间 | 从哪里回跳 | 回到哪里 | 触发原因 | 更新内容 | 受影响下游 | 是否需用户确认 |
|---|---|---|---|---|---|---|
| - | - | - | 暂无 | - | - | - |

## Think 摘要

- **状态**：completed
- **关键问题**：L1-L5 是递进流程还是并列知识分类；Map、SOP、Case 和知识库如何分工。
- **决策结论**：五类内容是并列知识域；Map 是场景化路由，SOP 是读取/执行程序，Case 是短周期状态容器；整个容器应命名为 `_aipd`。

## Design 摘要

### Design 模式

- **模式**：full
- **理由**：这是会同时改变项目识别、目录边界、构建注入、Agent Entry、多个 Skill 和已有项目数据的框架级 Schema 重构。

### 当前 Design 节点

- **当前节点**：readiness-gate
- **节点状态**：completed
- **本节点要回答的问题**：新旧边界是否唯一、是否具备无兼容执行和回滚条件。
- **本节点停止点**：用户已确认目录树和无兼容迁移，允许进入 Execute。
- **下一节点建议**：执行 wp-01。
- **节点 checkpoint**：详见 `02-design/design.md`。

### 需求契约

- **入口**：`02-design/design.md`
- **状态**：ready
- **confirmed**：新根目录、新知识域、点式逻辑标识、一次性迁移器、无运行时兼容。
- **assumed**：无阻塞假设。
- **open**：无；Codex 用户级 install 已由用户明确授权并完成。
- **不允许固化的假设**：不自动扫描或改写用户未列入后续迁移范围的外部项目。

### Brownfield Delta

- **入口**：`02-design/design.md`
- **ADDED**：`_aipd/knowledge/`、新 Schema 标识、一次性迁移器、新上下文检索 Agent 名称。
- **MODIFIED**：框架源码、模板、Skills、Agent Entry、构建校验、当前项目、公开文档。
- **REMOVED**：`_adoc/`、L1-L5 物理目录、旧检索 Agent 名称及运行时旧路径。
- **不能破坏的旧行为**：Map-first 路由、Case phase-first 状态、SOP/OKR/Inbox、Weave、构建双平台产物和 install 授权边界。

### Code Topology Contract

- **拓扑敏感**：是。
- **纵向业务上下文**：AIPD 项目工作区 Schema；由 `_aipd/`、`aipd-skill/src/core/knowledge/`、框架模板和 Skills 承载。
- **允许的横向依赖**：现有 build/check-dist、Agent Entry、Case、Weave、Update、Map-first 路由。
- **显式组合边界**：项目通过 `_aipd/index.md`、`_aipd/map.md` 和 `knowledge/*` 被框架读取；流程模块通过 `_aipd/{case,sop,okr}` 独立接入。
- **禁止事项**：运行时双读、旧路径 fallback、前缀别名、把 Case/SOP 混入 `knowledge/`、把代码重新建成知识域。
- **共享变化权限**：允许统一调整框架级路径常量、模板和校验；不新增通用检索服务。
- **独立验收边界**：新项目初始化、旧项目一次性迁移、当前项目 Map-first 恢复链、双平台 build/check-dist 均可单独验证。
- **认知回写**：本次稳定事实直接成为新的 `_aipd/` 项目认知和框架运行时文档。

### Readiness Gate

- **入口**：`02-design/design.md`
- **状态**：passed
- **阻塞项**：无。
- **可带入 Execute 的风险**：归档 Case 会保留迁移历史用语；残留检查必须区分历史说明与活动运行时引用。

## Execute 摘要

- **当前执行游标**：无；Execute completed。
- **最近执行 checkpoint**：wp-01、wp-02 均完成；当前仓库、迁移器和双平台产物已通过集成验证。

- [x] `03-execute/work-packages/wp-01-framework-schema-and-migrator.md` - 改造框架源码、模板、Agent 与迁移器（推荐 Agent：Main Agent）
- [x] `03-execute/work-packages/wp-02-current-project-cutover.md` - 迁移当前项目实例和全部活动文档入口（推荐 Agent：Main Agent）

## 后续候选事项

- 其他已初始化项目的迁移：当前仓库 build 与 Codex install 已完成，后续仍需逐项目单独执行和验收。
- Map 三级结构的内容优化：新 Schema 实际使用后另开 Case。

## Verify 摘要

- [x] 新目录结构和项目恢复链正确。
- [x] 活动运行时不存在旧路径或旧层级兼容。
- [x] 一次性迁移器通过旧版、已迁移版、混合状态和异常路径攻击测试。
- [x] build 与 check-dist 通过。

### 验收结果

- **状态**：passed
- **残留风险**：其他项目尚未迁移；裸编号歧义需人工处理；archive 保留不可执行历史。详见 `04-verify/verify.md`。

## Close 归档候选 / 反向编织候选

| 候选内容 | 触发来源 | 当前状态 | 候选归属 | Close 判断 |
|---|---|---|---|---|
| `_aipd` 工作区与 `knowledge.*` 五类知识域 | 用户讨论 / Design | 已实现并验收 | Core / Product / Engineering / map | 已成为当前事实源 |
| 一次性迁移而非运行时兼容 | 用户讨论 / Design | 已实现并验收 | Engineering / Update | 已成为当前升级合同 |

## Close 摘要

- **状态**：completed
- **创建时间**：2026-08-10
- **归档时间**：2026-08-10
- **归档位置**：`_aipd/case/archive/c22-aipd-knowledge-schema/`
- **安装结果**：Codex 用户级 9 个 Skill、3 个 Agent 已与 dist 对齐；旧 `aipd_adoc_retriever` 已移除。
- **认知审计**：Workspace、五类 Knowledge、Map 边界和一次性迁移合同已在长期事实源中落地，无待执行 Weave。

# Case: c0.8-aipd-desktop-zero

> **目标**：沉淀并重新判断 AIPD Desktop 第零版边界：以 AIPD 项目结构为外壳，先做文件树可视化和真实 Agent 聊天接入。
> **当前 Phase**：Think

## Case Contract

### 目标

- **目标**：确认 AIPD Desktop 是否继续推进，以及第零版是否仍应限定为 AIPD 文件树解析 + 真实 Agent 聊天接入。
- **方向 / OKR / 项目阶段关联**：AIPD 当前以 Skill / Agent / ADOC 为基础能力；Desktop 只是增强客户端候选，不能成为 AIPD 基础能力的前置依赖。

### 要做

- 保留旧讨论中已确认的产品定位、技术调研和候选开发包。
- 将旧 `doc/` / `steps/` case 迁移为 contract + phase-first 新结构。
- 后续重启时，先在 Think phase 重新判断是否继续做 AIPD Desktop。

### 不做

- 当前不实现 AIPD Desktop。
- 当前不执行候选 work package。
- 当前不创建或初始化 `aipd-desktop/` 项目。
- 当前不把旧 Codex 接入资料视为最新事实；真正执行前需要重新核对官方接口。

### 完成标准

- [x] case 使用 contract + phase-first 目录结构，不再保留顶层 `doc/` / `steps/`。
- [x] 旧调研资料迁移到 Think / Design phase 材料入口。
- [x] 旧 step 迁移为 `03-execute/work-packages/` 下的候选 work package。
- [x] case 状态明确为暂停后重开前的 Think 判断，不误导 Agent 直接 Execute。
- [ ] 如果用户决定继续 Desktop，先完成 Think 复核并更新 Design。

### 上下文索引

#### 层级判断

- **L1 Intent**：涉及 AIPD 是否从 Skill / Agent 约束扩展到桌面工作台，但当前不改方向文件。
- **L3 Core**：涉及 AIPD 的组织单位、Case / Work Package、上下文显性化、Agent 自由度与流程控制边界。
- **L4 Product**：涉及 AIPD Desktop 的产品形态、第零版 / 第一版边界、左侧导航、聊天区、预览区。
- **L5 Dev**：涉及 Codex App Server / SDK / `codex exec --json`、Claude Code / OpenCode adapter 可能性；执行前必须重新核对当前官方接口。
- **局部 README**：`aipd-desktop/README.md` 当前只是占位目录说明。
- **Case / 历史 Work Package**：本 case 的旧 step 已迁移为候选 work package，只作为后续 Design 参考，不自动执行。

#### 项目认知

- `_adoc/index.md` - AIPD 项目状态、L1-L5 入口、case / OKR / inbox 入口。
- `_adoc/map.md` - 路由到 AIPD Desktop、AIPD Case、Agent 调度、Weave、Codex 平台适配等入口。
- `_adoc/L3-core/index.md` - AIPD 核心认知：上下文解耦、黑箱上移、扁平化检索、Case / Work Package 和 Weave。
- `_adoc/L3-core/horizontal-capabilities.md` - 横向能力：map 检索、Case 系统、Weave、Agent Entry、未来上下文服务。
- `_adoc/L3-core/vertical-concept-modules.md` - 纵向模块：L1-L6、OKR、Case、Work Package、Agent Entry、Agent 使用方案。
- `_adoc/L4-product/map.md` - AIPD 产品功能线入口，含 AIPD Desktop。
- `_adoc/L5-dev/index.md` - Codex 优先适配、Agent 调度、构建安装等工程语境。

#### Phase 材料入口

- `01-think/think.md` - Desktop 是否重启、旧判断是否仍成立、需要重新核对的资料。
- `01-think/references/reference-notes.md` - 旧讨论引用的外部 / 项目参考资料和接口路线摘要。
- `01-think/references/deep-research-agent-client.md` - Codex / Claude Code / OpenCode 客户端套壳项目旧调研。
- `02-design/design.md` - AIPD Desktop 第零版设计状态和旧设计材料索引。
- `02-design/development-outline.md` - 第零版旧开发纲要、阶段拆分和验收口径。
- `02-design/project-placement.md` - 桌面端在本仓库中的旧落位判断。
- `02-design/tauri-architecture-overview.mmd` - Tauri 前后端分层关系图。
- `02-design/tauri-vue-bootstrap.md` - Tauri + Vue + TypeScript 旧创建指南。
- `03-execute/execute.md` - 候选 work package 状态。
- `04-verify/verify.md` - 验收口径。
- `05-close/close.md` - Close 与反向编织候选。

#### 兜底搜索

- `rg "AIPD Desktop|Case Workspace|context chip|AgentAdapter|Codex App Server|codex exec|SDK" _adoc aipd-skill docs README.md`
- `rg "Case / Work Package|上下文解耦|黑箱上移|Agent Entry|Weave" _adoc aipd-skill docs README.md`

### 边界变更记录

- 2026-06-27：AIPD Desktop 是否继续做尚不确定，本 case 暂停推进，不进入执行，不创建 `aipd-desktop/`。
- 2026-07-01：按新 AIPD Case 规则迁移旧结构；顶层 `doc/` 进入 phase 材料，顶层 `steps/` 进入 `03-execute/work-packages/` 候选包。
- 2026-07-10：用户确认桌面端继续暂停。未来可以考虑由 Codex 独立试做一个受约束 spike，但本次不构成恢复执行授权；必须先固定单一目标、目录边界、停止条件和验收闸门。

## Case Runtime

## Current Phase

Think

## Phase State

- Think: paused -> `01-think/think.md`
- Design: pending -> `02-design/design.md`
- Execute: pending -> `03-execute/execute.md`
- Verify: pending -> `04-verify/verify.md`
- Close: pending -> `05-close/close.md`

## 当前焦点

- **当前要解决的问题**：当前不推进；保留未来由 Codex 执行单个受约束 Desktop spike 的候选。
- **下一步建议**：保持暂停。用户未来明确恢复时，先在 Think 中只选择一个 spike，并确认硬边界后再进入 Design。
- **待确认项**：
  - [ ] 是否授权启动单个 Codex 自主 spike。
  - [ ] 首个 spike 是项目空壳、文件树，还是 Codex App Server 接入验证。
- **阻塞项**：用户当前无时间推进，且尚未授权恢复或选择具体 spike。

## 状态卡记录

- **文件事实**：本 case 原为旧结构，包含顶层 `doc/` 和 `steps/`；现已迁移到 contract + phase-first 结构。
- **用户认知**：用户确认桌面端暂时暂停；未来可让 Codex 自主试做，但担心目标和实现范围失控。
- **冲突点**：旧结构不能按新 `aipd-case` 继续运行；旧 step 不能作为新流程里的可执行步骤直接推进。
- **当前 phase 条件**：满足结构迁移；不满足直接进入 Execute。
- **建议下一步**：维持暂停；未来先确认一个可丢弃、可验收、到闸门即停的 spike，不直接恢复全部 work package。

## 回跳 / 重开记录

| 时间 | 从哪里回跳 | 回到哪里 | 触发原因 | 更新内容 | 受影响下游 | 是否需用户确认 |
|---|---|---|---|---|---|---|
| 2026-07-01 | 旧 case 结构 | Think | 新 AIPD Case 不兼容旧 `doc/` / `steps/` 运行逻辑 | 迁移为 contract + phase-first case；旧 step 转候选 work package | Design / Execute 需重新确认后再推进 | 是 |

## Think 摘要

- **状态**：paused
- **关键问题**：AIPD Desktop 是否继续推进，以及旧第零版边界是否仍成立。
- **调研 / 比较分支**：
  - `01-think/references/deep-research-agent-client.md` - 旧客户端接入调研，执行前需按当前官方接口复核。
  - `01-think/references/reference-notes.md` - 旧参考资料摘要。
- **决策结论**：2026-07-10 再次确认暂停；旧结论保留为参考。未来的 Codex 自主试验必须单独授权且限定为一个 spike。

## Design 摘要

> 详细内容写入 `02-design/design.md`。当前是旧设计资料迁移后的待复核状态。

### Design 模式

- **模式**：frontend-first / desktop-client
- **理由**：Desktop 首要价值在交互壳、文件树、聊天输入和轻量上下文 chip；但真实 Agent 接入路线会影响前端架构。

### 当前 Design 节点

- **当前节点**：intake
- **节点状态**：paused
- **本节点要回答的问题**：是否恢复推进 AIPD Desktop。
- **本节点停止点**：用户确认继续前，不创建新的正式 work package。
- **下一节点建议**：确认继续后进入 requirements。

### 复杂度爆点

- 容易从“增强聊天客户端”滑向重型 Agent 编排工厂。
- Codex / Claude Code / OpenCode 接入方式变化快，旧调研不能直接当成当前事实。
- Case Workspace、自动上下文规划、自动 weave 都容易把第零版范围撑爆。

### 最小必要解耦

- 第零版只保留文件树解析和真实聊天接入两条主线。
- 轻量 `@` / context chip 作为增量，不做自动 planner。
- 底层 AIPD Skill / ADOC 不依赖 Desktop。

### 文件 / 文件夹计划

- `aipd-desktop/` - 桌面端候选项目目录；当前仅有占位 README。
- `_adoc/case/c0.8-aipd-desktop-zero/01-think/` - 重启判断和外部资料复核。
- `_adoc/case/c0.8-aipd-desktop-zero/02-design/` - 旧设计材料和后续新 Design。
- `_adoc/case/c0.8-aipd-desktop-zero/03-execute/work-packages/` - 候选 work package。

### 架构边界 / 护栏

- 不把 Desktop 做成 AIPD 基础 skill 的前置依赖。
- 不在未确认 Codex 接入路线前固化 AgentAdapter。
- 不把候选 work package 当成已确认执行计划。
- Codex 自主试验一次只允许一个 spike，只改 `aipd-desktop/` 和本 case 的执行记录。
- 每个 spike 必须预先写明目标、非目标、文件边界、依赖上限、验收标准和停止条件；通过闸门前不自动进入下一个 work package。
- 不自动安装、不推送、不改 AIPD core，不同时展开多 Agent、多 adapter、Case Workspace 或自动 weave。

## Execute 摘要

> Execute 详细状态写入 `03-execute/execute.md`。Work Package 只放在 `03-execute/work-packages/`。

- [ ] `03-execute/work-packages/c0.8.1-project-bootstrap.md` - 创建 Tauri + Vue + TypeScript 项目骨架。（状态：candidate）
- [ ] `03-execute/work-packages/c0.8.2-aipd-file-tree-readonly.md` - 实现 AIPD 文件树只读解析和展示。（状态：candidate）
- [ ] `03-execute/work-packages/c0.8.3-codex-appserver-spike.md` - 验证 Codex 接入路线。（状态：candidate）
- [ ] `03-execute/work-packages/c0.8.4-chat-ui-mvp.md` - 实现基础聊天输入和流式输出。（状态：candidate）
- [ ] `03-execute/work-packages/c0.8.5-preview-and-context-chips.md` - 实现预览和轻量上下文 chip。（状态：candidate）

## 后续候选事项

- 复核 Codex App Server / SDK 当前能力和限制。
- 判断 Desktop 是否仍放在当前仓库 `aipd-desktop/` 内孵化。
- 重新设计 Case Workspace 与聊天组织关系。
- 重新命名 UI 中的 step 表述，适配当前 Case / Work Package 语言。

## Verify 摘要

- [x] 顶层 `doc/` / `steps/` 已消失。
- [x] phase-first 目录已存在。
- [x] 旧 step 已迁移为候选 work package。
- [ ] Desktop 方向重启后，重新验证 Design 和 Execute 计划。

### 验收结果

- **状态**：pending
- **残留风险**：旧调研资料含有可能过期的 Codex 接入判断；执行前必须重新查官方资料。

## Close 归档候选 / 反向编织候选

| 候选内容 | 触发来源 | 当前状态 | 候选归属 | Close 判断 |
|---|---|---|---|---|
| AIPD Desktop 作为增强客户端而非基础依赖 | 旧讨论 / Case Contract | 待重新确认 | L4 Product / map | 待判断 |
| Case Workspace 作为聊天与执行收纳空间 | 旧讨论 | 未实现 / 待验证 | L3 / L4 | 待判断 |
| Codex 接入优先 App Server / SDK，PTY 作为 fallback | 旧调研 | 待复核 | L5 Dev / Desktop README | 待判断 |

## 自我察觉迭代

- [ ] Close phase 是否检查旧 case 迁移对 `aipd-case` 规则的反馈。
- [ ] 是否整理“旧 Step -> Work Package”迁移中暴露的语言兼容问题。

## 自迭代观察锚点

- [ ] 后续继续讨论时，Agent 是否能先回到本 case，而不是重新散落在普通聊天里。
- [ ] Agent 是否区分“快捷上下文层”和“自动上下文规划器”，避免再次滑向重型 Agent 工厂。
- [ ] Agent 是否把第零版限定为 AIPD 文件树 + 真实聊天接入，而不是提前设计完整 Case Workspace。
- [ ] 涉及 Codex 接入时，Agent 是否重新核对当前官方接口。
- [ ] 涉及长期知识回写时，Agent 是否先提出 weave 候选，而不是直接改 L3 / L4 / L5。

## Close 摘要

- **状态**：待开始
- **创建时间**：2026-06-13
- **归档时间**：
- **归档位置**：

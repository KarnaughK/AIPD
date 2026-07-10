# Case: c0.11-aipd-case-design-flow

> **目标**：迭代 AIPD Case 模块的 Design phase，把 Design 从单点“架构设计”扩展成适合 AI 辅助开发的完整设计流程。
> **当前 Phase**：Close

## Case Contract

### 目标

- **目标**：重设计 `aipd-case` 的 Design phase，使它能指导 Agent 按“需求契约 -> 后端设计 -> 前端设计 -> 执行切片”的顺序推进开发类 case。
- **方向 / OKR / 项目阶段关联**：AIPD 当前锚定 AI 辅助开发。Case Design 是从模糊目标进入可执行架构的关键阶段，现有规则只强调复杂度爆点和文件 / 文件夹边界，不足以覆盖真实开发前的完整设计流程。

### 要做

- 调研和参考开源项目、AI 编程工具、spec / design / task 流程，提炼可复用的 Design phase 顺序。
- 明确开发类 case 在 Design 开头必须先摸清底层需求、业务规则、边缘节点和未确认假设。
- 明确后端设计顺序：底层事实源、数据库 / 数据对象、数据不变量、读写路径、API contract、缓存与安全边界。
- 明确前端设计顺序：在规则逻辑和接口边界稳定后，再设计 UI 信息架构、交互状态、组件边界和前端状态。
- 判断 Design phase 与 Think phase、Case Contract、Execute work package 的边界，避免 Design 变成无限讨论或直接写代码。
- 产出可写回 `aipd-case` 源文件和 case 模板的设计方案，经确认后再执行修改。

### 不做

- 不在未完成调研和流程定序前直接改 `aipd-skill/src/core/case/phases/design.md`。
- 不把某个外部项目的专有流程原样搬进 AIPD。
- 不把 UI 视觉设计细节当成 AIPD Design phase 的全部职责。
- 不在 Design 阶段创建正式 Execute work package；work package 只在设计方案确认后创建。
- 不自动安装新版 skill；如后续修改源码，build 后需用户确认是否 install。

### 完成标准

- [x] 已形成一份 Design phase 新流程草案，覆盖需求契约、后端设计、前端设计、执行切片和停止条件。
- [x] 已完成开源 / 同类工具参考摘要，说明哪些流程可借鉴、哪些不适合 AIPD。
- [x] 已明确 Design 与 Think / Case Contract / Execute 的边界。
- [x] 已给出需要修改的 AIPD 源文件清单和修改理由。
- [x] 用户确认方案后，已完成源码修改并通过 `./aipd-skill/scripts/build`。

### 上下文索引

#### 层级判断

- **L2 Research**：需要参考开源项目、AI 编程工具、spec-driven development、design doc / requirements / task flow 等外部资料。
- **L3 Core**：涉及 AIPD 的任务执行模型、上下文解耦、AI 原生代码架构模型、Think / Design / Execute 边界。
- **L4 Product**：涉及 `aipd-case` 作为用户可调用能力的 phase 行为和用户交互节奏。
- **L5 Dev**：涉及 skill 源码、case 模板、构建安装边界和 Codex Agent 执行约束。
- **局部 README**：无特定局部 README，优先读取 `aipd-skill/src/core/case/` 和 `aipd-skill/src/skills/aipd-case/`。
- **Case / 历史 Work Package**：参考 c0.9 Think 系统设计、当前 Guessword 外部反馈文件和本 case 过程材料。

#### 项目认知

- `_adoc/index.md` - AIPD 项目认知入口。
- `_adoc/map.md` - 路由到 AIPD Case、Learn、上下文解耦和相关源码入口。
- `_adoc/L3-core/horizontal-capabilities.md` - Case 系统、Think phase、Weave 等横向能力关系。
- `_adoc/L4-product/map.md` - AIPD Case 功能线入口。
- `_adoc/L5-dev/index.md` - skill、Agent 调度和构建安装相关工程规则。
- `_adoc/case/archive/c0.9-aipd-think-system-design/case.md` - 历史 Think / Case 边界参考。

#### 代码 / 模板入口

- `aipd-skill/src/skills/aipd-case/SKILL.md` - case 统一入口流程。
- `aipd-skill/src/core/case/overview.md` - Case 机制总览。
- `aipd-skill/src/core/case/phases/design.md` - 当前 Design phase 规则本体。
- `aipd-skill/src/core/case/templates/case.md` - case 模板和 Design 摘要结构。
- `aipd-skill/src/core/case/templates/work-package.md` - 后续 Execute work package 模板。

#### Phase 材料入口

- `01-think/think.md` - 本 case 的调研、比较和流程定序入口。
- `01-think/open-source-design-flow-research/summary.md` - 开源项目 / 同类工具参考摘要。
- `01-think/open-source-design-flow-research/source-matrix.md` - 参考源矩阵和可吸收能力。
- `02-design/design.md` - AIPD Design phase 新流程设计草案。
- `02-design/proposal.md` - 当前推荐方案摘要。
- `02-design/role-system.md` - Design phase 角色系统草案。
- `02-design/artifact-model.md` - Design artifact 模型和模式划分。
- `02-design/frontend-design-boundary.md` - 前端设计在 AIPD 中的职责边界和验证入口。
- `02-design/product-manager-agent-guide-draft.md` - Product Manager / Requirements Steward Agent 指引草案。
- `02-design/readiness-gate.md` - Design -> Execute gate 草案。
- `02-design/source-change-plan.md` - 后续源码改造清单和 work package 建议。
- `02-design/source-drafts/` - 后续源码修改可参考的草稿，不是已应用源码。
- `02-design/decision-log.md` - 关键决策记录。
- `03-execute/execute.md` - 后续源码修改 work package 状态。
- `04-verify/verify.md` - 验收记录。
- `05-close/close.md` - 关闭和反向编织候选。

#### 兜底搜索

- `rg "Design|复杂度爆点|需求契约|事实源|Work Package|架构设计" aipd-skill/src _adoc docs`
- `rg "requirements|design|tasks|spec|architecture|implementation plan" docs _adoc aipd-skill/src`

### 边界变更记录

- 2026-06-28：创建 case。初始判断是 Design phase 需要从单点架构设计升级为完整开发设计流程，先进入 Think 做外部参考和流程定序。
- 2026-07-10：用户确认已完成则直接归档；Close 审计确认源码、构建、Codex 安装和 Verify 证据齐全，不再扩展视觉设计流程。

## Case Runtime

## Current Phase

Close

## Phase State

- Think: completed -> `01-think/think.md`
- Design: completed -> `02-design/design.md`
- Execute: completed -> `03-execute/execute.md`
- Verify: passed -> `04-verify/verify.md`
- Close: completed -> `05-close/close.md`

## 当前焦点

- **当前要解决的问题**：Close 审计、索引更新和 archive 移动已完成。
- **下一步建议**：无；后续如扩展完整视觉与交互评审流程，应另建 case。
- **待确认项**：无。
- **阻塞项**：无。

## 状态卡记录

- **文件事实**：Think、Design、Execute 已完成，Verify 已通过；源码、dist 与本机 Codex 安装内容已核对。
- **用户认知**：用户确认 case 已结束即可归档。
- **冲突点**：归档前 `case.md` 和 case 索引仍残留旧 Phase 状态；已在 Close 中统一修正。
- **当前 phase 条件**：Close 条件满足。
- **建议下一步**：归档后不再推进本 case。

## Think 摘要

> 详细内容写入 `01-think/think.md`。

- **状态**：completed
- **关键问题**：Design phase 如何从需求澄清、规则契约、后端事实源、前端体验和执行切片之间建立稳定顺序。
- **调研 / 比较分支**：
  - `01-think/open-source-design-flow-research/summary.md` - 已完成两轮调研和方案沉淀，覆盖 Spec Kit、Kiro、OpenSpec、Superpowers、BMAD、Agent OS、PM-Skills、Cline、Task Master、Roo Code、Aider、Storybook、Playwright 和 AI agent spec 写作经验。
- **决策结论**：建议采用 8 步 Design 流程：Design Intake -> Product / Requirement Contract -> Domain Rule & Edge Case Elicitation -> Existing System / Brownfield Delta Scan -> Backend / Data / API Design -> Frontend / UX / State Design -> Context Decoupling & File Boundary Design -> Work Package / Task Slicing -> Design Readiness Gate。

## Design 摘要

> 详细内容写入 `02-design/design.md`。Design 已完成并写入 `aipd-case` 源码。

### 候选流程骨架

```text
Design Intake
-> Product / Requirement Contract
-> Domain Rule & Edge Case Elicitation
-> Existing System / Brownfield Delta Scan
-> Backend / Data / API Design
-> Frontend / UX / State Design
-> Context Decoupling & File Boundary Design
-> Work Package / Task Slicing
-> Design Readiness Gate
```

### 复杂度爆点

- Design phase 容易被 Agent 误解为直接拆接口、目录或模块，跳过需求规则和底层事实源。
- 前端体验设计和后端结构设计的先后关系不清，容易让 Execute 阶段返工。
- 如果 Design 过大，可能退化为无限讨论；如果过小，又无法支撑 AI 横向执行。

### 设计文档

- `02-design/design.md`
- `02-design/proposal.md`
- `02-design/role-system.md`
- `02-design/artifact-model.md`
- `02-design/frontend-design-boundary.md`
- `02-design/product-manager-agent-guide-draft.md`
- `02-design/readiness-gate.md`
- `02-design/source-change-plan.md`
- `02-design/decision-log.md`

### 角色候选

- Product Manager / Requirements Steward：需求契约、规则、边缘场景、验收标准。
- Domain Analyst：领域规则、状态、反例、权限和异常路径。
- Backend Architect：数据事实源、API contract、缓存、安全和错误边界。
- UX Designer：信息架构、用户流程、交互状态和视觉验证建议。
- Frontend Architect：前端状态、组件边界、页面上下文包。
- Implementation Planner：work package 切片和 readiness gate。

## Execute 摘要

> Execute 详细状态写入 `03-execute/execute.md`。

- 用户确认方案后已直接完成源码修改、构建与 Codex 安装；执行证据集中记录在 `03-execute/execute.md`。

## 后续候选事项

- 候选：为 `aipd-case` Design phase 新增“需求契约表 / assumptions-open-confirmed”模板。
- 候选：为开发类 case 增加后端设计样板，包括数据库 / 数据对象、API contract、缓存、鉴权和错误边界。
- 候选：为前端 case 增加信息架构、UI 状态、组件边界和视觉验证入口。
- 候选：为 Design -> Execute 增加 gating checklist，避免未确认需求直接拆 work package。

## Verify 摘要

- [x] 新 Design phase 规则能阻止 Agent 直接把未确认需求写成字段、接口或状态机。
- [x] 新流程能支持后端优先、前端补齐、全栈协同三类开发 case。
- [x] 新流程能明确何时停留 Think、何时进入 Design、何时进入 Execute。
- [x] 修改后的 skill 能通过 build。

### 验收结果

- **状态**：passed
- **残留风险**：已安装到 Codex 用户级环境；未安装到 Claude 环境。

## Close 归档候选 / 反向编织候选

| 候选内容 | 触发来源 | 当前状态 | 候选归属 | Close 判断 |
|---|---|---|---|---|
| Design phase 需要先固定需求 / 规则契约，再进入底层事实源和工程结构 | 用户讨论 / Guessword 反馈 | 已实现并验收 | `aipd-case` / case core | 已写入源码与稳定入口，无需额外 weave |
| 前端设计应至少覆盖信息架构、状态、组件边界和视觉验证入口，不默认承担完整视觉创意 | 用户讨论 / Think | 已实现并验收 | `aipd-case` Design phase | 已写入源码；完整视觉评审流程留待未来独立 case |

## 自我察觉迭代

- [x] Close phase 已检查本 case 中暴露出来的 Design phase 规则缺口。
- [x] 已整理“旧 Design 规则 -> 用户纠偏 -> 新流程 -> 可回写位置”。

## 自迭代观察锚点

- [x] Agent 先停在 Think 调研和定序，再修改 Design phase 源码。
- [x] Agent 已区分需求契约、底层事实源、后端设计、前端设计和 Execute 切片。
- [x] Agent 已把外部项目参考抽象成 AIPD 通用流程，没有原样搬入外部项目专有名词。
- [x] Design 方案经用户确认后才进入源码修改。

## Close 摘要

- **状态**：已归档
- **创建时间**：2026-06-28
- **归档时间**：2026-07-10
- **归档位置**：`_adoc/case/archive/c0.11-aipd-case-design-flow/`
- **长期认知审计**：Design 流程已写入 `aipd-case` core / templates，稳定检索入口已写入 `_adoc/map.md` 和 `_adoc/L5-dev/index.md`；无需额外 weave。
- **Git 说明**：归档不包含提交或推送，相关工作区改动仍由后续 Git 操作统一处理。

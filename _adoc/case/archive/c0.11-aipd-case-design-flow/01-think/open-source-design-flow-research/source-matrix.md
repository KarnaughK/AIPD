# Source Matrix

本文件记录 c0.11 调研过的外部项目、资料入口和可吸收能力。它不是全文摘录，只保存可复查来源和 AIPD 可借鉴点。

## Spec-driven / AI coding frameworks

| 来源 | 类型 | 关键产物 / 流程 | AIPD 可吸收能力 |
|---|---|---|---|
| GitHub Spec Kit | 开源 SDD 工具 | constitution、spec、clarify、plan、tasks、implement；spec-template、plan-template、tasks-template、checklist-template | 把 `clarify` 作为 plan 前强步骤；PM 需求契约应包含 user stories、edge cases、functional requirements、success criteria、assumptions；plan 应产出 research、data-model、contracts、quickstart；tasks 应按 user story 独立可测组织 |
| Kiro Specs | IDE spec workflow | Feature Specs / Bugfix Specs；Requirements-First、Design-First、Quick Plan；requirements、design、tasks；requirements analysis；task dependency waves | AIPD Design 应支持多模式：requirements-first、design-first、quick；进入实现前可做 requirements analyze；任务应支持依赖图和并行 waves |
| OpenSpec | 开源 change/spec 工具 | explore、propose、apply、verify、sync、archive；proposal/specs/design/tasks；change folder；project config rules | AIPD case 天然类似 change folder；可吸收 proposal = why/scope、specs = what、design = how、tasks = work；Design 不必僵硬 waterfall，可允许 artifacts 更新和回流 |
| Superpowers | 开源 agent methodology | brainstorming、writing-plans、subagent-driven-development、TDD、code review、finish branch | 强制“先提炼 spec、分块确认、再写 implementation plan、再执行”；plan 要清楚到低上下文执行者能照做；review 和 TDD 不塞进 Design，而进入 Execute / Verify |
| BMAD Method | 开源 AI agile framework | Analysis、Planning、Solutioning、Implementation；PRD、UX、Architecture、Epics/Stories、Implementation Readiness | 角色体系和 workflow map 值得吸收；PM / UX / Architect / Dev / QA 不应变成一个 Agent；AIPD 可压缩成按需角色，而不是完整敏捷系统 |
| Agent OS | Agent standards / spec 工具 | Discover Standards、Deploy Standards、Shape Spec、Index Standards；product mission / roadmap / tech stack | Design 前需要项目标准 / 现有约束注入；shape spec 的 targeted questions 适合 AIPD PM 角色 |
| PM-Skills | PM skill library | 68 个 PM skills；PRD、edge cases、acceptance criteria、ADR、design rationale、prioritized action plan、PM sub-agents | PM 不是一个 prompt，而是一组可组合技能；AIPD 可先做 Product Manager / Requirements Steward，再逐步拆 acceptance criteria、edge cases、risk review 等子能力 |
| Cline | 开源 coding agent | Plan / Act 模式、Rules and Skills、Multi-Agent Teams、Kanban | Plan/Act 模式说明 AIPD phase gate 有现实产品对应；Multi-Agent / Kanban 说明 work package 需要依赖和状态，不只是任务列表 |
| Task Master | 开源 AI task manager | parse PRD、next task、expand task、research、依赖和 tag / workstream | AIPD Execute 可以吸收依赖、下一任务和并行 workstream 思路，但 Design 必须先提供 PRD / requirements contract 级输入 |
| Roo Code | 开源 agent IDE / fork 生态 | Code / Architect / Ask / Debug / Custom modes | Architect / Ask 分离说明“澄清问题”和“架构设计”不应混在执行模式里 |
| Aider | 开源 AI coding assistant | repo map、git、lint/test、图片 / web 输入 | 对 Design 的启发是 brownfield 需要代码地图和事实扫描；但 Aider 更偏实现工具，不提供完整产品设计流程 |

## 传统但仍有价值的范式

| 范式 | 可借鉴点 | AIPD 不直接照搬点 |
|---|---|---|
| PRD | 解决 why / what / success / scope / risks | 不应变成冗长组织文档；AIPD 需要 case 级轻量契约 |
| ADR | 技术决策要记录 context / decision / consequences / alternatives | 不要求每个小技术选择都写 ADR；只记录影响架构或长期约束的选择 |
| RFC / design doc | 适合跨团队、较大方案讨论 | AIPD case 更偏短周期目标，不需要所有 case 走重 RFC |
| Acceptance Criteria | Given/When/Then 可验收行为 | 不能替代系统性 edge-case catalog |
| Edge Case Catalog | 系统性列出边界、错误、恢复路径 | 必须建立在 feature scope 清晰后，否则会无边界发散 |
| Storybook / Component-driven Development | 前端复杂度可通过组件状态、variants、交互用例和视觉回归验证来管理 | AIPD 不必内置 Storybook，但 frontend-design 应能提出状态矩阵和视觉验证入口 |
| Playwright Visual / E2E QA | 前端设计需要在 Verify 中落到可检查路径，而不只停留在 UI 口头描述 | 不应在 Design 阶段跑测试；只定义后续如何验证 |

## 对 AIPD 的吸收原则

1. **不用全盘接入工具链**
   Spec Kit、OpenSpec、BMAD、PM-Skills 都是完整系统。AIPD 应吸收方法和 artifact 边界，不复制目录和命令体系。

2. **角色按需加载**
   Product Manager、UX、Backend Architect、Frontend Architect、Implementation Planner 应由 Design Intake 决定是否进入。小 case 不需要全角色。

3. **artifact 渐进生成**
   所有 case 都应有 Design Summary，但只有复杂 case 才生成独立 `requirements-contract.md`、`edge-cases.md`、`backend-design.md`、`frontend-design.md` 等展开文件。

4. **AIPD 的独特增量在最后一段**
   通用工具通常停在 requirements / design / tasks。AIPD 必须额外完成 context decoupling 和文件 / 文件夹级上下文包设计。

## 需要继续追的资料

- Kiro Feature Specs / Bugfix Specs 细节页。
- BMAD PRD / UX / Architecture / readiness check 的原始 skill 或模板。
- Agent OS `shape-spec` 细节。
- PM-Skills 的 PRD / edge case / acceptance criteria 模板样例。
- 前端 UI / UX 设计工作流是否需要单独参考 v0 / Figma / Storybook / Playwright visual QA。

## 第二轮阶段结论

- AIPD 不应只引入一个“产品经理 prompt”，而应先做一个 PM / Requirements Steward Agent 指引，再在 artifact 层支持 PRD、edge cases、acceptance criteria 等能力渐进展开。
- 前端 UI 不一定能在 AIPD 内完成视觉创意，但 AIPD Design 至少要产出信息架构、交互状态、状态矩阵、组件边界和视觉验证要求。
- Design phase 的关键 gate 不是“写没写完设计文档”，而是“是否还有未确认需求会被 Execute 固化成代码事实”。

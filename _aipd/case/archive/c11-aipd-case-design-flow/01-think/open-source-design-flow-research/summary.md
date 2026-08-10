# Open Source Design Flow Research

## 目标

参考开源项目和同类 AI 编程 / spec-driven 工具，提炼适合 AIPD Case Design phase 的流程顺序。

本分支只做调研和抽象，不直接修改 AIPD 源码。

## 候选参考类型

- AI coding / spec-driven tools 的 requirements -> design -> tasks 流程。
- 开源项目中的 RFC / design doc / ADR / implementation plan。
- 产品需求到后端数据模型、API contract、前端状态和 UI 的设计样板。
- 前端工程中的信息架构、组件边界、状态管理和视觉验证流程。

## 需要输出

- 参考对象清单。
- 每个参考对象的流程摘要。
- 可借鉴点。
- 不适合 AIPD 的点。
- 对 AIPD Design phase 的建议顺序。

## 当前状态

- in_progress：已完成两轮公开资料检索和方案沉淀，覆盖 Spec Kit、Kiro、OpenSpec、Superpowers、BMAD Method、Agent OS、PM-Skills、Cline、Task Master、Roo Code、Aider 和 AI agent spec 写作经验。
- 备注：本轮只吸收可复用流程和角色边界，不把外部项目文件结构原样搬进 AIPD。

## 第一轮参考对象

| 参考对象 | 核心流程 | 可借鉴点 | 不直接采用点 |
|---|---|---|---|
| GitHub Spec Kit | constitution -> specify -> clarify -> plan -> tasks -> implement | 先立项目原则；spec 阶段不谈技术栈；clarify 是 plan 前的强步骤；plan 产出 research、data-model、contracts、quickstart 等工程设计产物 | 对 AIPD 来说偏重独立 `.specify/` 工具链；AIPD 已有 case / ADOC 结构，不应复制目录体系 |
| Kiro Specs | requirements / bug analysis -> design -> tasks -> task execution | 三个关键文件清晰：requirements、design、tasks；requirements 包含 user stories 和 acceptance criteria；design 包含架构、时序、数据流、错误和测试策略 | Kiro 是 IDE 产品，任务执行 UI 和平台能力不能直接复制 |
| OpenSpec | explore -> proposal/specs/design/tasks -> apply -> verify/sync/archive | change folder 很适合 AIPD case；proposal = why/scope，specs = what changes，design = how，tasks = steps；适合 brownfield 和 delta spec | OpenSpec 追求轻量流动，不强调强 phase gate；AIPD case 需要更明确的状态恢复和确认点 |
| Superpowers | discovery / brainstorm -> spec -> plan -> TDD -> subagent dev -> review -> finalize | 强制 Agent 不直接写代码；先从对话提炼 spec；分块给用户确认；实现前计划要足够让低上下文执行者照做；测试和 review 是 workflow 强约束 | Superpowers 偏执行纪律和 TDD，对 Design 前的产品规则契约覆盖不够完整 |
| BMAD Method | Analysis -> Planning -> Solutioning -> Implementation | 角色分工非常有价值：Analyst / PM / UX / Architect / Dev / QA；PM 负责 PRD，UX 负责体验，Architect 负责技术决策，Implementation 前有 readiness gate | BMAD 偏完整敏捷流程，文档和角色较重；AIPD 需要按 case 复杂度渐进加载 |
| Agent OS | product mission / roadmap / tech-stack -> shape-spec -> plan mode spec | 产品级 mission / roadmap / tech stack 作为 spec 的上游约束；shape-spec 用针对性问题把模糊需求拉成计划 | Agent OS v3 倾向依赖工具自身 Plan Mode；AIPD 不能假设所有平台都有同等 Plan Mode |
| PM-Skills | 产品管理技能库 + workflows + PM 子 Agent | PM 能力可被技能化：Discovery、Define、Develop、Deliver、Measure、Iterate；可参考其“产品经理不是单个 prompt，而是一组可调用技能” | PM-Skills 是完整产品管理库，AIPD 不应把全部 PM 框架塞进 case Design |
| AI agent spec 写作经验 | 高层目标 -> 结构化 PRD/SRS -> 边界 -> 测试 / conformance -> 小任务 | 规格要控制上下文大小；要有 Always / Ask first / Never 边界；大任务拆成可验证小块；spec 应进 repo 并持续演化 | 这是通用写作原则，不替代 AIPD 的 phase 和角色调度 |

## 共识提炼

这些项目的共同点非常稳定：

1. **先对齐 Why / What，再进入 How**
   Spec Kit、OpenSpec、Kiro、BMAD 都把需求 / proposal / PRD 放在技术设计前。AIPD Design 不能直接从数据库、接口或目录开始。

2. **需求澄清是显式步骤，不是闲聊**
   Spec Kit 的 clarify、Agent OS 的 shape-spec、BMAD 的 facilitated discovery 都说明：问问题本身应该是可运行流程，且答案要落入文档。

3. **Design 不是单文件架构图，而是一组下游可执行产物**
   典型产物包括 data model、API contracts、technical decisions、sequence/data flow、UX behavior、tasks / stories、validation checklist。

4. **角色有必要，但要按阶段出现**
   PM / Product Owner 适合处理需求、规则、验收标准和边缘场景；UX 适合处理前端体验；Architect 适合处理后端、系统、依赖和代码结构。AIPD 不必默认同时拉起所有角色，但应该在 Design 内给出角色入口。

5. **Brownfield 需要 delta，而不是重写全局文档**
   OpenSpec 的 change folder / delta spec 对 AIPD 很关键。AIPD case 本身就是 change folder，因此 Design 应描述“本 case 要改变哪些现有规则 / 结构 / 代码入口”，而不是重写整个项目系统设计。

6. **进入实现前必须有 gate**
   BMAD 的 implementation readiness、Kiro 的 tasks、Spec Kit 的 checklist、Superpowers 的 sign-off 都指向同一件事：需求、设计和任务没过关时，不应进入 Execute。

## 对 AIPD 的初步结论

AIPD 不应该直接采用某个工具，而应该吸收它们的能力边界：

- 吸收 Spec Kit / Kiro 的 `requirements -> design -> tasks` 主链。
- 吸收 OpenSpec 的 `change folder + delta spec + archive` 思路，用 AIPD case 天然承接。
- 吸收 BMAD 的角色体系，但做成按需 Agent：`Product Manager`、`UX Designer`、`Backend Architect`、`Frontend Architect`、`Implementation Planner`。
- 吸收 Superpowers 的“不直接写代码 / 分块确认 / TDD + review”执行纪律，但保留在 Execute / Verify，而不是塞满 Design。
- 吸收 PM-Skills 的产品经理技能化思路，把 PM 角色写成可复用 agent-guide / skill，而不是一次性 prompt。

## 第二轮补充结论

### Design 需要模式，不是所有 case 都跑全流程

Kiro、OpenSpec、BMAD、Cline / Roo Code 都显示出类似判断：复杂功能需要清晰的 requirements / design / tasks 链路，但小改、bugfix、探索型问题不能被重流程拖死。

AIPD Design 因此应支持：

- `full`：全栈新功能或复杂重构。
- `backend-first`：数据事实源、API 或业务规则是最大风险。
- `frontend-first`：用户体验、状态和组件边界是最大风险。
- `bugfix`：先做现有行为 / root cause / behavior contract，再做修复设计。
- `quick`：低风险小改，只在 `design.md` 内嵌需求、文件边界和验证。

### PM 角色应先落成 Requirements Steward

用户提出“是不是应该有产品经理角色”是正确方向，但 AIPD 不宜先做一个泛泛的 PM 人格。第一版更应叫 Product Manager / Requirements Steward：

- 负责需求契约、scope、confirmed / assumed / open、edge cases、acceptance criteria。
- 不做数据库、API、组件、文件夹等技术设计。
- 最大价值是阻止下游设计把未确认规则固化成代码事实。

草案已写入 `02-design/product-manager-agent-guide-draft.md`。

### Readiness Gate 是 Design 的收口

外部项目里对应的概念包括 BMAD implementation readiness、Spec Kit checklist、Kiro tasks 审核、Superpowers 的用户确认。AIPD 需要把它压成 case 级 gate：

- `passed`：可创建正式 work package。
- `concerns`：可有限执行，但必须写入“不允许固化的假设”。
- `failed`：回到 Think 或 Design 对应步骤。
- `pending`：尚未检查。

草案已写入 `02-design/readiness-gate.md`。

### 前端设计边界

AIPD 不应承诺自己完成所有视觉创意，但至少要负责：

- 信息架构。
- 用户流程。
- 空态、loading、错误、成功、禁用、重试等交互状态。
- 前端状态来源和生命周期。
- 组件边界。
- 是否需要视觉参考、截图验证、Storybook / Playwright visual QA 或外部 UI 设计 Agent。

前端设计边界已单独沉淀到 `02-design/frontend-design-boundary.md`。

## 建议 AIPD Design 新流程

```text
0. Design Intake
1. Product / Requirement Contract
2. Domain Rule & Edge Case Elicitation
3. Existing System / Brownfield Delta Scan
4. Backend / Data / API Design
5. Frontend / UX / State Design
6. Context Decoupling & File Boundary Design
7. Work Package / Task Slicing
8. Design Readiness Gate
```

### 0. Design Intake

判断本 case 是否适合进入 Design：

- 目标是否足够清楚？
- 缺的是需求澄清、外部调研、还是工程设计？
- 需要哪些角色参与：PM / UX / Backend / Frontend / Architect？
- 是否是 brownfield，需要先读现有规则和代码入口？

### 1. Product / Requirement Contract

由 Product Manager 角色主导，产出：

- 用户目标和使用场景。
- Functional requirements。
- Non-functional requirements。
- Acceptance criteria。
- confirmed / assumed / open。
- Always / Ask first / Never 边界。

### 2. Domain Rule & Edge Case Elicitation

继续由 Product Manager / Domain Analyst 主导，专门问清：

- 业务规则。
- 边缘场景。
- 异常路径。
- 权限、状态、生命周期。
- 数据保留、历史记录、审计和安全边界。

这一步的目标是阻止 Agent 把未确认规则写进数据库字段、接口合同或 UI 状态。

### 3. Existing System / Brownfield Delta Scan

由 ADOC retriever / Architect 角色主导，产出：

- 本 case 改变哪些现有 L3 / L4 / L5 / README / 代码入口。
- 当前实现事实。
- 不能破坏的兼容约束。
- delta scope：ADDED / MODIFIED / REMOVED。

### 4. Backend / Data / API Design

由 Backend Architect 主导，产出：

- 底层事实源。
- 数据对象 / 数据表 / 文件格式 / 外部 API contract。
- 数据不变量、唯一约束、索引。
- 读写路径。
- API request / response contract。
- 缓存、幂等、一致性、错误、安全和日志边界。

### 5. Frontend / UX / State Design

由 UX Designer + Frontend Architect 主导，产出：

- 信息架构和页面区块。
- 用户流程。
- 交互状态和状态机。
- 数据加载、空态、错误态、loading、提交态。
- 组件边界。
- UI 视觉参考和截图验证需求。

注意：AIPD 内部不必承担完整视觉创意，但必须明确 UI 设计输入、体验规则和验证方式。

### 6. Context Decoupling & File Boundary Design

回到 AIPD 特有能力，产出：

- 单功能 / 单接口 / 单页面的上下文包边界。
- 哪些局部重复允许保留。
- shared / domain 上移条件。
- 文件 / 文件夹计划。
- 执行 Agent 最小必读上下文。

### 7. Work Package / Task Slicing

把设计切成可恢复、可验收的 work package：

- 每个 work package 有目标、上下文、设计依据、验收标准。
- 不按“先做一点再叠一点”的微步骤切。
- 可并行的 work package 明确依赖关系。

### 8. Design Readiness Gate

进入 Execute 前必须检查：

- 是否仍有阻塞级 open requirements？
- 是否有 assumed 被误写成 confirmed？
- 后端 contract 是否能支撑前端状态？
- 前端状态是否反向暴露后端缺口？
- context decoupling 是否明确到文件 / 文件夹级？
- work package 是否可派发、可验收、可恢复？

## 建议新增角色

### Product Manager / Requirements Steward

职责：

- 把用户的模糊想法转成需求契约。
- 主动追问边缘规则、反例、状态和验收标准。
- 维护 confirmed / assumed / open。
- 不做技术架构决策，不写代码。

输入：

- 用户原始目标。
- Case Contract。
- 相关 L3 / L4。
- 历史反馈和竞品 / 用户场景资料。

输出：

- `requirements-contract.md` 或 Design 文档中的需求契约区。
- `open-questions.md` / 待确认项。
- 验收标准草案。

### UX Designer / Interaction Designer

职责：

- 在规则和数据边界稳定后，设计用户流程、页面结构、交互状态和反馈机制。
- 明确视觉参考、截图验证和移动 / 桌面响应边界。
- 不替代前端代码实现。

### Backend Architect

职责：

- 从需求契约推导底层事实源、数据模型、API contract、缓存和安全边界。
- 检查字段 / 表 / 接口是否隐含未确认产品规则。

### Frontend Architect

职责：

- 从 UX 和 API contract 推导前端状态、组件边界和页面上下文包。
- 确保 UI 不绕过业务规则，也不把接口不确定性藏进前端兜底。

### Implementation Planner

职责：

- 把已确认设计转成 work package。
- 做 readiness gate，不补需求、不重做架构。

## 下一步建议

1. 用户确认是否采用这套 8 步 Design 流程作为 AIPD 新方向。
2. 若确认，进入本 case 的 Design phase，把流程写成正式 `02-design/design.md`。
3. 再创建 Execute work package 修改：
   - `aipd-skill/src/core/case/phases/design.md`
   - `aipd-skill/src/core/case/overview.md`
   - `aipd-skill/src/core/case/templates/case.md`
   - 可能新增 `aipd-skill/src/core/agent-guides/aipd_product_manager.md`
   - 可能新增 / 更新前端、后端架构角色指引

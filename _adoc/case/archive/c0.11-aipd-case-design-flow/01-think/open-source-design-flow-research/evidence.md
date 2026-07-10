# Evidence

> 本文件记录外部参考资料的事实摘录和链接。正式结论写入 `summary.md`，不要把大段资料复制进 case 主线。

## 待调研

- spec-driven development / requirements-design-tasks 流程。
- AI coding tools 的 design / planning 流程。
- 开源项目 RFC / ADR / implementation plan 样例。
- 前端 UI / 信息架构 / 组件设计流程样例。

## 第一轮来源

| 来源 | 链接 | 记录 |
|---|---|---|
| GitHub Spec Kit | https://github.com/github/spec-kit | 关键链路：constitution -> specify -> clarify -> plan -> tasks -> implement。强调 spec 阶段不要先关注技术栈，clarify 应在 plan 前发生。plan 产出 contracts、data-model、research、quickstart 等工程设计材料。 |
| Microsoft Spec Kit Blog | https://developer.microsoft.com/blog/spec-driven-development-spec-kit | Spec Kit 本质是 CLI + templates/helper scripts；模板定义 spec、technical plan、task breakdown。 |
| Kiro Specs | https://kiro.dev/docs/specs/ | 三文件模型：requirements.md / design.md / tasks.md。Design 包含系统架构、组件设计、时序、数据流、错误处理和测试策略。 |
| Kiro Specs - parallel tasks | https://kiro.dev/docs/specs/ | Kiro 会基于 `tasks.md` 分析任务依赖图，把独立任务分成 wave 并发执行；这支持 AIPD 在 work package 中显式写依赖和可并行 wave。 |
| Kiro Feature / Bugfix Specs | https://kiro.dev/docs/specs/ | Feature Specs 面向新功能，Bugfix Specs 面向根因诊断和防回归；Feature 可走 Requirements-First、Design-First 或 Quick Plan。这支持 AIPD Design 模式化。 |
| OpenSpec | https://github.com/Fission-AI/OpenSpec | 每个 change 一个文件夹，包含 proposal、specs、design、tasks；强调 agree before build、review-friendly、delta specs。 |
| OpenSpec Commands | https://github.com/Fission-AI/OpenSpec/blob/main/docs/commands.md | `/opsx:explore` 用于不确定时先探索；`/opsx:propose` 生成 proposal、specs、design、tasks 并停在 apply 前。 |
| Superpowers | https://github.com/obra/Superpowers | Agent 不应直接写代码；先通过 conversation 提炼 spec，用户确认 design 后再形成实现计划和 subagent 执行。 |
| BMAD Method | https://github.com/bmad-code-org/BMAD-METHOD | 强角色和全生命周期：Analysis、Planning、Solutioning、Implementation。角色包含 PM、Architect、Developer、UX 等。 |
| BMAD Workflow Map | https://docs.bmad-method.org/reference/workflow-map/ | Planning 阶段产出 PRD 和 UX；Solutioning 阶段产出 Architecture、Epics/Stories、Implementation Readiness gate。 |
| Agent OS v3 | https://github.com/buildermethods/agent-os/discussions/310 | Product planning 保留 mission、roadmap、tech-stack；`/shape-spec` 通过 targeted questions 结合 standards 和 product mission 生成更对齐的 spec。 |
| PM-Skills | https://github.com/product-on-purpose/pm-skills | 产品管理技能库，覆盖完整产品生命周期、工作流、子 Agent 和模板，证明 PM 能力适合封装成 skills / agent-guides。 |
| Addy Osmani: Good Spec | https://addyosmani.com/blog/good-spec/ | AI agent spec 应结构化、控制上下文大小、包含边界和测试 / conformance，并把大任务拆成可验证小块。 |
| Martin Fowler: SDD tools | https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html | 区分 spec-first、spec-anchored、spec-as-source；AIPD 更接近 spec-anchored，而不是一次性 spec-first。 |
| Storybook Docs | https://storybook.js.org/docs | Storybook 把 UI component/page 放在隔离环境中开发和文档化，story 描述组件某个渲染状态，并支持 interaction / accessibility / visual / snapshot tests。 |
| Playwright Docs | https://playwright.dev/docs/intro | Playwright 是现代 Web app 的端到端测试框架，支持并行、多浏览器、trace、screenshots、snapshot testing 和 visual comparisons。 |

## 证据摘要

- 多数 SDD 工具都把“需求 / spec”放在“技术设计 / plan”前。
- 澄清问题不是附属动作，而是 plan 前的正式 gate。
- Design 通常包含架构、数据流、组件、错误、测试、contracts 和 data model，而不是单纯目录结构。
- 角色系统在 BMAD / PM-Skills 里最强；AIPD 可吸收角色能力，但必须保持 case 级渐进加载。
- OpenSpec 的 change folder / delta spec 与 AIPD case 天然相似，适合 brownfield。
- Superpowers 提醒 AIPD：流程本身也应是强约束，不能只写原则。
- Kiro 的 Feature / Bugfix / Quick Plan 说明 Design phase 应支持模式化，不应所有 case 都走重流程。
- Storybook / Playwright 说明前端设计可以被拆成组件状态、用户路径和视觉验证入口；AIPD 不必承担完整视觉创意，但必须在 Design 中提出可验证的前端状态契约。

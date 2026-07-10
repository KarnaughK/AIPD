# Decision Log

| 日期 | 决策 | 理由 | 状态 |
|---|---|---|---|
| 2026-06-28 | 新 case 从 Think phase 开始，而不是直接修改 `design.md` | Design phase 本身要重构为大流程，需要先调研外部范式并与用户确认边界 | accepted |
| 2026-06-28 | 初始流程按“需求 / 规则契约 -> 后端设计 -> 前端设计”建模 | 用户指出现有 Design 过早进入接口、模块和数据库，容易把未确认规则固化成工程事实 | accepted |
| 2026-06-28 | 推荐采用 8 步 Design 流程 | 外部工具的稳定共识是 requirements / design / tasks，但 AIPD 需要额外加入 brownfield delta、上下文解耦和 readiness gate | proposed |
| 2026-06-28 | 第一批正式 Agent 指引只新增 Product Manager / Requirements Steward | PM 是最前置、最能降低错误固化风险的角色；其余角色可先以 Design 规则和 artifact 存在，等真实 case 验证后再沉淀 | proposed |
| 2026-06-28 | 前端设计边界定义为工程契约和验证入口，不默认承担完整视觉创意 | AIPD 应负责信息架构、状态、组件边界和验证要求；高保真视觉和品牌创意应交给设计工具或专门 UI Agent | proposed |

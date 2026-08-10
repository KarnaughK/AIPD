# Think: AIPD Case Design Flow

## 当前问题

现有 `aipd-case` Design phase 更像“架构设计入口”：先找复杂度爆点，再形成文件 / 文件夹级架构边界和 work package。这个方向解决了“不要纵向堆版本”的问题，但还不够覆盖真实 AI 辅助开发里的完整设计流程。

本 case 要先回答：

- Design phase 是否应被定义为一个大流程，而不是一个小检查点。
- 开发类 case 的 Design 是否应先固定需求 / 规则契约，再进入后端和前端设计。
- 后端设计与前端设计在 AIPD 中的顺序、边界和产物分别是什么。
- 如何参考开源项目和同类 AI 编程工具，而不是只凭 AIPD 内部经验改规则。

## 用户初始判断

用户提出的初始顺序：

1. **摸清底层需求**：先讨论需求，把边缘节点问清楚，然后才开始设计。
2. **后端设计**：先把数据库 / 数据对象等底层事实源搞清楚，再往代码和接口设计推进。
3. **前端设计**：规则逻辑清楚后，再考虑 UI 设计；但前端视觉设计可能超出 AIPD 内部结构，需要进一步界定。

## 调研方向

### 同类流程参考

- Spec-driven development：requirements / design / tasks 的阶段划分。
- AI coding tools：如何让 Agent 从需求澄清进入架构和实现。
- 开源项目中的 design doc / RFC / ADR / implementation plan。
- 前端设计流程：信息架构、交互状态、组件边界、视觉验证如何与工程设计衔接。

### 需要提炼的问题

- 哪些流程适合作为 AIPD Design phase 的通用顺序？
- 哪些流程应放在 Think phase，而不是 Design phase？
- 哪些前端 UI 设计内容属于 AIPD case，哪些应交给专门的设计工具 / 视觉 Agent / 外部参考？
- Design phase 的停止条件是什么，避免无限讨论？
- 什么条件下才能进入 Execute 并创建 work package？

## 初始假设

- Design phase 应从“文件 / 文件夹级架构边界”上移为“需求契约到执行切片的设计流程”。
- 对开发类 case，需求契约缺失时不应继续细化数据库、接口、状态机或 UI 组件。
- 后端设计不是只写目录结构，而应先确认数据事实源、约束、读写路径和 API contract。
- 前端设计至少应覆盖信息架构、交互状态、组件边界和数据流；视觉风格是否纳入，需要根据 AIPD 的职责边界继续讨论。

## 下一步

1. 继续补 Kiro / BMAD / Agent OS / PM-Skills 的细节资料。
2. 基于 `source-matrix.md` 修正 AIPD Design phase 草案。
3. 把 Product Manager / UX / Backend / Frontend / Context Architect 等角色压缩成按需加载方案。
4. 与用户确认后，再创建源码修改 work package。

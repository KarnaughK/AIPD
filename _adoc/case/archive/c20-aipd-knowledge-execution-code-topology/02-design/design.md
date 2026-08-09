# c20 Design：AI 友好代码拓扑

## Design Intake

- **Case 类型**：research-to-implementation / docs-process。
- **Design 模式**：quick。
- **当前节点**：节点 2 completed；Readiness Gate passed。
- **节点 1 状态**：completed；ADOC 主事实源、摘要和检索入口已落地并通过校验。
- **节点 2 状态**：completed / Gate passed；双入口条件加载和三段执行闭环均已确认，进入 Execute。
- **输入事实源**：`01-think/cross-case-code-topology-placement/summary.md` 与三个案例分支。

以下 Requirements Contract、Brownfield Delta、Context Boundary 与 Readiness Gate 保存节点 1 的已执行设计；节点 2 的新设计入口见文末。

## Requirements Contract

### confirmed

- AIPD 项目 ADOC 与 AIPD Skill 打包产物是两个不同问题。
- 两个问题都需要完成，但按顺序推进：先 ADOC，后 Skill。
- ADOC 中应建立“AI 友好代码拓扑”的长期事实源。
- 代码拓扑由横向基座、横向共享能力、纵向业务上下文和显式组合边界共同构成，不再描述为全面纵向。
- AIPD 知识系统的“纵向概念模块 / 横向功能能力”与代码拓扑的纵横术语必须显式区分。
- 新增多个独立业务模块称为“并列扩展”，不再称为“横向铺模块”。

### deferred

- Skill 源码中由哪个 core 文档承载完整认知。
- 哪个 Skill、phase 或 reference 在什么任务中加载这套认知。
- 打包产物的 token 预算、渐进加载、平台差异和构建验证。
- 公开 `docs/` 如何面向用户重写；它可以和 Skill 节点一起讨论，也可以成为后续独立节点。

### open

- 当前 ADOC 节点无阻塞级 open。

## Brownfield Delta

### 当前事实

- `_adoc/L1-intent/intent.md` 已把 AI 原生代码架构列为 AIPD 三个大方向之一，但仍用“传统横向分层 -> 更关注纵向黑箱”的二元表达。
- `_adoc/L3-core/index.md` 已有上下文解耦、纵向黑箱、黑箱上移和 Decouple first / DRY later，但没有明确横向基座、横向共享能力与纵向业务上下文共存。
- `_adoc/L3-core/vertical-concept-modules.md` 与 `horizontal-capabilities.md` 描述的是 AIPD 知识 / 流程系统，未显式声明它们不是代码拓扑。
- `_adoc/L3-core/map.md` 和项目 `_adoc/map.md` 没有“AI 友好代码拓扑”的独立入口。
- 多份 ADOC 使用“横向铺模块”表达空间上的并列扩展，容易与横向共享层混淆。

### ADDED

- `_adoc/L3-core/ai-friendly-code-topology.md`

### MODIFIED

- `_adoc/L1-intent/intent.md`：只同步顶层方向，不承载模型正文。
- `_adoc/index.md`：增加高频任务入口。
- `_adoc/map.md`：把代码拓扑相关用户说法直接路由到新 L3 主文档。
- `_adoc/L3-core/index.md`：把新文档挂入现有 AI 原生代码架构模型，并修正二元表达和术语。
- `_adoc/L3-core/map.md`：增加标准概念、别名、常见误解和直接入口。
- `_adoc/L3-core/vertical-concept-modules.md`：只增加命名空间说明；不承载代码拓扑正文。
- `_adoc/L3-core/horizontal-capabilities.md`：只增加命名空间说明，并把“横向铺开”改为“并列扩展”。
- `_adoc/L4-product/index.md`：机械同步“并列扩展”术语，避免长期认知自相矛盾。

### NOT MODIFIED IN NODE 1

- `docs/`、README。
- `aipd-skill/src/`、`aipd-skill/dist/`、构建和安装脚本。
- 任何外部业务项目。
- AIPD 实践经验库；案例 02、03 的完整目标拓扑尚未被实现验证。

## Context Boundary & File Ownership

### 主事实源

`_adoc/L3-core/ai-friendly-code-topology.md` 唯一负责：

- 代码拓扑的三类模块。
- 纵向业务上下文的识别方式和可变粒度。
- 横向共享能力的晋升条件。
- 纵向模块的嵌套与显式组合。
- 复制与共享的阶段关系。
- 代码纵横与 AIPD 知识系统纵横的术语隔离。
- 项目实例应回写 L5 / 局部 README 的边界。

### 摘要与检索入口

- L1 只回答 AIPD 为什么探索这套代码组织方式。
- L3 index 只把它挂到既有 AI 原生代码架构模型并保留必要摘要。
- L3 map 与项目 map 只路由，不复制完整规则。
- vertical / horizontal 两份 AIPD 系统文档只声明命名空间，避免承担第二份事实源。

### 术语边界

- `横向基座 / 横向共享能力 / 纵向业务上下文`：代码拓扑。
- `纵向概念模块 / 横向功能能力`：AIPD 知识与流程系统。
- `并列扩展`：空间上新增多个独立业务模块。
- `显式组合边界`：模块通过稳定输入输出发生关系，不穿透内部实现。

## Work Package Draft

### wp-01-adoc-code-topology

- **目标**：让 AIPD 项目 ADOC 对 AI 友好代码拓扑拥有单一、可检索、术语一致的长期事实源。
- **执行者**：Main Agent；文件少、判断高度内聚，派发成本高于收益。
- **输入**：本 Design、跨案例归属分析、当前 L1 / L3 / map。
- **验收**：新主文档存在；所有入口一跳命中；“全面纵向”和“横向铺模块”不再作为当前规则；知识系统纵横与代码纵横边界明确；无 Skill / docs 改动。

## Readiness Gate

- Requirements：passed；用户已确认两段式目标和当前 ADOC 范围。
- Domain / product rules：passed；没有数据库、API、UI 或业务状态需要设计。
- Brownfield delta：passed；受影响 ADOC 文件已列清。
- Context boundary：passed；主事实源、摘要和检索入口职责明确。
- Work package：passed；单一内聚文档更新包。
- Verify：passed；使用链接检查、术语检索、`git diff --check` 和范围审计。

**Gate：passed。** 用户当前消息已经明确要求“先把 L3 文档这些东西迭代一下”，视为进入 Execute 执行本节点的确认。

## Latest Checkpoint

- **当前节点**：节点 2 completed / Readiness Gate passed。
- **已确认**：ADOC 是长期主事实源；Skill 是外部运行时投影；采用公共投影、`aipd` / `aipd-case` 双入口条件加载，以及 Design 项目合同、Execute 短护栏、Verify 结果审计。
- **open / assumed**：无阻塞项；Skill 源码和 dist 尚未修改。
- **停止点**：Design 已完成。
- **下一步**：Execute `wp-02-skill-code-topology-runtime`。
- **恢复入口**：`02-design/skill-runtime-projection.md#latest-checkpoint`。

## 节点 2：Skill 打包产物认知承载

### 当前状态

- **状态**：completed / Readiness Gate passed；公共投影、双入口条件加载和 Design / Execute / Verify 执行闭环均已确认。
- **前置结果**：`wp-01-adoc-code-topology` completed；`_adoc/L3-core/ai-friendly-code-topology.md` 是稳定主事实源。
- **本节点目标**：设计外部 Agent 在使用 AIPD 开发其他项目时，如何按任务需要加载并执行这套代码拓扑认知。
- **当前边界**：先审计与设计，不直接把完整 L3 文档复制到所有 Skill、模板或项目上下文。
- **展开 artifact**：`02-design/skill-runtime-projection.md`。

### 待设计问题

- 打包源码中哪份 core / reference 负责这套认知的稳定投影。
- 哪些入口需要知道它：总入口、Case Design、专门架构任务，还是按 map 命中后渐进加载。
- 外部项目只需要决策检查表，还是还需要概念正文与案例形状。
- 如何保持 ADOC 主事实源与 Skill 投影同步，同时避免双份正文漂移。
- 如何验证 build 产物包含它、正确入口能加载它、无关任务不会无条件吞入整份上下文。

### 下一步恢复动作

Brownfield 扫描、Context Boundary、Work Package Draft 和 Readiness Gate 均已完成。公共运行时投影与 `aipd` / `aipd-case` 双入口条件加载已经用户确认；不进入 Agent Entry，不新增独立 Skill。Design 用完整 guide 形成项目合同，拓扑敏感 Work Package 在 Execute 携带短护栏，Verify 用真实结果反查合同；详见 `02-design/skill-runtime-projection.md#design---execute---verify-执行闭环`。

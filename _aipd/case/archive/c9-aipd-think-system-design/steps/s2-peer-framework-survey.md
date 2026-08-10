# Step: s2 - 同类框架前置讨论机制调研

> **所属 Case**: c9-aipd-think-system-design
> **类型**: research
> **推荐 Agent**: explorer
> **依赖**: 无

## 目标

调研 OpenSpec 之外的同类项目和公开资料，找出它们如何处理从想法、需求澄清、调研、spec、计划到执行的前置阶段；调研中发现新项目、博客或论文时，纳入候选并说明取舍。

## 已确认设计输入

- 本 step 与 s1 并行，不重复深入 OpenSpec。
- 本 step 关注“前置判断 / spec / research / PRD / task shaping”机制，不关注普通任务执行器。
- AIPD 需要吸收外部精华，但最终要服务 Think 一等对象，而不是变成通用敏捷流程合集。
- 已知起点是 Spec Kit、BMAD、Open SWE；它们是调研种子，不是最终候选全集。

## 上下文文档

分身 Agent 必须在执行前读取以下文档：

- `_adoc/case/archive/c9-aipd-think-system-design/case.md`
- `_adoc/index.md`
- `_adoc/map.md`
- `_adoc/L3-core/index.md`
- `_adoc/L3-core/horizontal-capabilities.md`
- `_adoc/L4-product/index.md`
- `_adoc/L4-product/map.md`

## 调研目标

找出公开项目、官方文档、实践博客和必要论文中值得 AIPD Think 借鉴的前置讨论、调研、spec、PRD、decision、task shaping 机制。

## 调研范围

- `https://github.com/github/spec-kit`
- `https://github.com/bmad-code-org/BMAD-METHOD`
- `https://github.com/langchain-ai/open-swe`
- GitHub / 官方文档：优先找 AI coding、spec-driven development、agent workflow、task planning、requirements clarification 相关项目。
- 博客 / 长文 / 访谈：优先找项目维护者、实践者、AI coding 深度使用者对真实工作流的复盘。
- 论文：只纳入直接涉及 AI agent planning、task decomposition、requirements clarification、specification 或 software engineering workflow 的材料。
- 可补充公开项目、博客或论文；必须说明为什么相关，以及是纳入深入调查、暂缓还是排除。

## 任务清单

- [x] 先用已知种子项目建立对比表：Spec Kit、BMAD、Open SWE。
- [x] 搜索并补充新的高相关项目、博客文章或论文候选。
- [x] 每个纳入对象先确认定位、核心 workflow 和适用场景。
- [x] 标记它是否有 clarify / brainstorm / research / PRD / spec / plan / tasks / implementation 之类的前置阶段。
- [x] 判断它是否有“不要做 / 暂缓 / 继续调研”一类非执行出口。
- [x] 对比它们对 artifact 的组织方式：单文件、目录、DAG、模板、命令。
- [x] 提炼 AIPD Think 可以吸收的机制。
- [x] 单独列出“发现但暂未深入”的候选资料及理由。

## 产出要求

- 结果文件路径：`_adoc/case/archive/c9-aipd-think-system-design/doc/peer-framework-survey.md`
- 格式：先给总表，再按项目 / 文章 / 论文展开；必须附证据链接，并标注资料层级。

## 验收标准

- [x] 至少覆盖 Spec Kit、BMAD、Open SWE 三个项目。
- [x] 每个项目都有“可借鉴点”和“与 AIPD 不同点”。
- [x] 报告包含候选资料发现清单，说明纳入 / 暂缓 / 排除理由。
- [x] 报告能支持后续设计 Think 状态流转和文件结构。

## 不做

- 不做完整竞品报告。
- 不评价商业价值。
- 不写 AIPD 最终设计。

---

## 执行记录

**完成时间**：2026-06-20

**主要改动**：
- 新增调研报告：`_adoc/case/archive/c9-aipd-think-system-design/doc/peer-framework-survey.md`
- 覆盖 Spec Kit、BMAD Method、Open SWE 三个种子目标，并补充 Kiro Specs、Cline Plan & Act / Deep Planning、Roo Code、OpenHands / Agent Canvas 等候选。
- 按一级 / 二级 / 三级资料分层整理 GitHub、官方文档、官方博客、公开报道和论文候选。
- 明确各对象的纳入 / 暂缓 / 排除理由，并提炼与 AIPD Think 相关的前置讨论、spec、research、decision、task shaping 机制。

**遇到的问题**：
- OpenSpec 不在本 step 深入，避免和 s1 重复；后续 s4/s5 需要合并 s1 报告。
- Roo Code 仓库已于 2026-05-15 archived，公开 artifact 状态机制不足，只作为多模式分工旁证。
- 论文候选只做摘要级筛选，未逐篇全文阅读；若后续需要引用严谨结论，应补单独论文深读 step。

**Weave 候选**：
- L3 Think 模型：可补充“工具路由”意识，Think 可按不确定性选择 Brainstorm / Research / PRFAQ / Quick Think / Direct Create。
- L4 AIPD Think：可补候选能力 Analyze Requirements / Decision Checklist / Think Readiness Gate。
- Case Create 边界：后续可明确只承接 Think 出口为 Create 后的决策摘要、关键约束、排除方案、上下文索引和验收口径。
- Agent 协作模型：Research 分身应默认只读、问题导向、回流报告，避免把完整网页和长日志带回主线。

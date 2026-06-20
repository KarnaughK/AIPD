# Step: s5 - Think 交接与 Skill 边界设计

> **所属 Case**: c0.9-aipd-think-system-design
> **类型**: research
> **推荐 Agent**: explorer
> **依赖**: s4

## 目标

设计 Think -> Case Create 的交接格式，以及未来 `aipd-think` skill 与 `aipd-case-create` / `aipd-weave` / `aipd-inbox` 的职责边界。

## 已确认设计输入

- AIPD Think 负责“值不值得做 / 做什么 / 做到什么程度 / 还缺什么信息”。
- Case Create 负责“已经决定要做以后，如何规划架构、上下文索引、steps 和验收”。
- Think 输出 Create 时，Case Create 应读取 handoff，而不是重新从聊天里理解所有讨论过程。
- 本 step 输出后续实现 case 的设计依据，不直接实现 skill。

## 上下文文档

分身 Agent 必须在执行前读取以下文档：

- `_adoc/case/c0.9-aipd-think-system-design/case.md`
- `_adoc/case/c0.9-aipd-think-system-design/doc/aipd-boundary-comparison.md`
- `_adoc/case/c0.9-aipd-think-system-design/doc/think-object-state-design.md`
- `_adoc/L3-core/index.md`
- `_adoc/L3-core/horizontal-capabilities.md`
- `_adoc/L4-product/index.md`
- `_adoc/L4-product/map.md`
- `aipd-skill/src/skills/aipd-case-create/SKILL.md`
- `aipd-skill/src/skills/aipd-weave/SKILL.md`
- `aipd-skill/src/skills/aipd-inbox/SKILL.md`
- `aipd-skill/src/skills/aipd/SKILL.md`

## 任务清单

- [x] 设计 Think -> Case Create handoff 需要包含哪些字段。
- [x] 设计 Create / Kill / Defer / Research / Weave / Continue 各出口的文件落点和后续动作。
- [x] 设计未来 `aipd-think` skill 的职责边界：只做什么，不做什么。
- [x] 设计 `aipd-case-create` 需要如何读取 Think handoff，哪些讨论职责应移出。
- [x] 设计 `aipd-weave` 如何处理 Think 中产生的稳定认知。
- [x] 输出后续实现 case 建议和风险清单。

## 产出要求

- 结果文件路径：`_adoc/case/c0.9-aipd-think-system-design/doc/handoff-and-skill-boundary.md`
- 格式：handoff schema 草案 + skill 边界 + 需要修改的文件清单 + 后续实现 case 建议。

## 验收标准

- [x] 能明确说明 Think 输出 Create 后，Case Create 应读什么、不要再问什么。
- [x] 能明确说明 `aipd-think` 与 inbox / case-create / weave 的职责边界。
- [x] 能作为后续实现 `aipd-think` 的 case 输入。

## 不做

- 不修改 skill。
- 不创建正式模板。
- 不运行构建 / 安装。

---

## 执行记录

**完成时间**：2026-06-20

**主要改动**：
- 新增 `_adoc/case/c0.9-aipd-think-system-design/doc/handoff-and-skill-boundary.md`。
- 设计 Think -> Case Create `handoff.md` schema 草案，明确来源、Create 结论、目标和成功标准、关键依据、推荐方向、风险未知、上下文入口建议和 Case Create 建议。
- 明确 Continue / Research / Create / Kill / Defer / Weave 的文件落点和后续动作。
- 明确未来 `aipd-think` 只维护 Think 对象和决策出口，不执行代码、不创建 case、不直接写长期 ADOC。
- 明确 `aipd-case-create` 应读取 handoff，但仍保留已决定推进后的架构、上下文索引、step 和验收规划讨论能力。
- 明确 `aipd-weave` 后续应把 Think 作为来源类型，只处理稳定认知和 Weave Candidate。
- 输出后续实现 case 建议、需要修改的文件清单和风险清单。

**遇到的问题**：
- 未遇到阻塞。已特别处理 s3 风险：Case Create 只退出“是否值得做”的开放式前置决策，不退出“怎么规划”的方案讨论。

**Weave 候选**：
- L3 Core：Think 的 Create handoff 是前置决策到执行规划的稳定交接对象，不替代 case。
- L4 Product：AIPD Think 的用户可见出口应包含 Continue / Research / Create / Kill / Defer / Weave。
- L4 Product / skill 边界：Case Create 应调整为“已决定推进后的规划讨论”，不是“要不要做”的开放式决策讨论。
- Skill 边界：`aipd-think` 不执行代码、不创建 case、不直接写长期 ADOC；`aipd-case-create` 读取 handoff 后继续做 map-first 上下文检索和 step 规划。

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

- [ ] 设计 Think -> Case Create handoff 需要包含哪些字段。
- [ ] 设计 Create / Kill / Defer / Research / Weave / Continue 各出口的文件落点和后续动作。
- [ ] 设计未来 `aipd-think` skill 的职责边界：只做什么，不做什么。
- [ ] 设计 `aipd-case-create` 需要如何读取 Think handoff，哪些讨论职责应移出。
- [ ] 设计 `aipd-weave` 如何处理 Think 中产生的稳定认知。
- [ ] 输出后续实现 case 建议和风险清单。

## 产出要求

- 结果文件路径：`_adoc/case/c0.9-aipd-think-system-design/doc/handoff-and-skill-boundary.md`
- 格式：handoff schema 草案 + skill 边界 + 需要修改的文件清单 + 后续实现 case 建议。

## 验收标准

- [ ] 能明确说明 Think 输出 Create 后，Case Create 应读什么、不要再问什么。
- [ ] 能明确说明 `aipd-think` 与 inbox / case-create / weave 的职责边界。
- [ ] 能作为后续实现 `aipd-think` 的 case 输入。

## 不做

- 不修改 skill。
- 不创建正式模板。
- 不运行构建 / 安装。

---

## 执行记录

**完成时间**：

**主要改动**：
- 

**遇到的问题**：

**Weave 候选**：
- 

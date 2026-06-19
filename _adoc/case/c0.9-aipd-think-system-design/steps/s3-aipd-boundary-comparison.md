# Step: s3 - AIPD Think 边界矩阵

> **所属 Case**: c0.9-aipd-think-system-design
> **类型**: research
> **推荐 Agent**: explorer
> **依赖**: s1, s2

## 目标

基于外部调研结果和当前 AIPD 文档，设计 Inbox / Think / Case / SOP / Weave 的边界矩阵。

## 已确认设计输入

- Think 是 Case 之前的一等对象，和 Case / SOP 同层。
- Inbox 只负责 capture，不承诺讨论或决策。
- Case Create 应收窄到“已决定要做后的执行规划”。
- Weave 负责把稳定认知回写长期 ADOC，不负责保存一次性讨论全过程。

## 上下文文档

分身 Agent 必须在执行前读取以下文档：

- `_adoc/case/c0.9-aipd-think-system-design/case.md`
- `_adoc/case/c0.9-aipd-think-system-design/doc/openspec-think-analysis.md`
- `_adoc/case/c0.9-aipd-think-system-design/doc/peer-framework-survey.md`
- `_adoc/L3-core/index.md`
- `_adoc/L3-core/horizontal-capabilities.md`
- `_adoc/L3-core/vertical-concept-modules.md`
- `_adoc/L4-product/index.md`
- `_adoc/L4-product/map.md`
- `_adoc/inbox.md`
- `_adoc/sop/index.md`
- `_adoc/sop/map.md`
- `aipd-skill/src/skills/aipd-case-create/SKILL.md`
- `aipd-skill/src/skills/aipd-weave/SKILL.md`
- `aipd-skill/src/skills/aipd-inbox/SKILL.md`

## 任务清单

- [ ] 梳理 Inbox / Think / Case / SOP / Weave 的输入、输出、承诺度、文件位置和常见误用。
- [ ] 设计“什么信息放哪里”的边界矩阵。
- [ ] 标出 Case Create 需要从哪些开放式讨论职责中退出。
- [ ] 标出 Think 何时需要触发 Weave、Research、Create、Kill、Defer、Continue。
- [ ] 提出需要更新的 ADOC / skill 边界候选。

## 产出要求

- 结果文件路径：`_adoc/case/c0.9-aipd-think-system-design/doc/aipd-boundary-comparison.md`
- 格式：边界矩阵 + 典型场景分流 + 误用反例。

## 验收标准

- [ ] 用户拿到矩阵后能判断“这个想法应该进 inbox、think、case、sop 还是 weave”。
- [ ] 明确 Case Create 与 AIPD Think 的边界。
- [ ] 明确 Think 与 Inbox 的承诺度差异。

## 不做

- 不改 skill 源码。
- 不创建 `_adoc/think/` 目录。
- 不把外部框架机制全部塞进 AIPD。

---

## 执行记录

**完成时间**：

**主要改动**：
- 

**遇到的问题**：

**Weave 候选**：
- 

# Step: s1 - Capability Object Model 第一版设计

> **所属 Case**: c0.10-aipd-capability-object-model
> **类型**: research
> **推荐 Agent**: explorer
> **依赖**: 无

## 目标

基于当前讨论和 `c0.9-aipd-think-system-design` 的结果，设计 AIPD Capability Object Model 与原子能力层的第一版草案。

## 已确认设计输入

- Think 更像阶段 / 工作空间 / 编排场景，不是一个巨型动作。
- AIPD 需要拆出可被 Think / Case Create / Case Run / Weave / SOP 复用的原子能力。
- 外部开源项目大多是自带闭环的小系统，不能直接拼接；AIPD 应抽取能力范式，并用统一中间对象承接。
- 原子能力层的前提是统一中间对象模型。

## 上下文文档

分身 Agent 必须在执行前读取以下文档：

- `_adoc/case/c0.10-aipd-capability-object-model/case.md`
- `_adoc/case/c0.10-aipd-capability-object-model/doc/discussion-seed.md`
- `_adoc/case/archive/c0.9-aipd-think-system-design/case.md`
- `_adoc/case/archive/c0.9-aipd-think-system-design/doc/peer-framework-survey.md`
- `_adoc/case/archive/c0.9-aipd-think-system-design/doc/aipd-boundary-comparison.md`
- `_adoc/case/archive/c0.9-aipd-think-system-design/doc/think-object-state-design.md`
- `_adoc/case/archive/c0.9-aipd-think-system-design/doc/handoff-and-skill-boundary.md`
- `_adoc/L3-core/index.md`
- `_adoc/L3-core/horizontal-capabilities.md`
- `_adoc/L4-product/index.md`
- `_adoc/L4-product/map.md`

## 任务清单

- [ ] 设计 AIPD 的核心中间对象清单和字段草案。
- [ ] 设计原子能力清单、输入输出、适用上层 workflow。
- [ ] 标注哪些能力可能需要分身 Agent / 外部 adapter / 便宜大上下文模型 / prompt pattern。
- [ ] 映射 OpenSpec、Spec Kit、BMAD、Kiro、Cline、Open SWE、OpenHands 等外部项目贡献的能力范式。
- [ ] 判断哪些能力应先内置，哪些只作为设计参考或后续 adapter。
- [ ] 输出后续实现或 weave 建议。

## 产出要求

- 结果文件路径：`_adoc/case/c0.10-aipd-capability-object-model/doc/capability-object-model-design.md`
- 格式：结论先行；包含对象模型、能力矩阵、外部项目映射、实现优先级、风险和未决问题。

## 验收标准

- [ ] 能解释为什么不能直接拼接多个外部项目。
- [ ] 能给出一组可复用中间对象，并说明哪些能力产出 / 消费它们。
- [ ] 能给出一组原子能力，并说明 Think / Case Create / Case Run / Weave / SOP 如何组合调用。
- [ ] 能作为后续实现 case 或 L3 weave 的输入。

## 不做

- 不实现能力层。
- 不修改 skill。
- 不创建正式 Capability Registry。
- 不接入外部项目。

---

## 执行记录

**完成时间**：

**主要改动**：
- 

**遇到的问题**：

**Weave 候选**：
- 

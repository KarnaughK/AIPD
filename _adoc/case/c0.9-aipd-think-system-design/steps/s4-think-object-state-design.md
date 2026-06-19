# Step: s4 - Think 对象与状态流转设计

> **所属 Case**: c0.9-aipd-think-system-design
> **类型**: research
> **推荐 Agent**: explorer
> **依赖**: s3

## 目标

设计 AIPD Think 对象的文件结构、状态流转、恢复规则和最小模板。

## 已确认设计输入

- Think 是人和 AI 的高带宽思考缓冲层，解决“模糊想法如何变清晰”。
- Think 可以包含 deep research，但调研资料先服务当前 Think，不直接进入长期 ADOC。
- Think 的默认出口不是 Create，而是 Create / Kill / Defer / Research / Weave / Continue。
- 本 step 只做设计，不创建正式模板到源码目录。

## 上下文文档

分身 Agent 必须在执行前读取以下文档：

- `_adoc/case/c0.9-aipd-think-system-design/case.md`
- `_adoc/case/c0.9-aipd-think-system-design/doc/aipd-boundary-comparison.md`
- `_adoc/L3-core/index.md`
- `_adoc/L3-core/horizontal-capabilities.md`
- `_adoc/L3-core/vertical-concept-modules.md`
- `_adoc/L4-product/index.md`
- `_adoc/L4-product/map.md`
- `aipd-skill/src/core/case/templates/case.md`
- `aipd-skill/src/core/adoc/templates/inbox.md`

## 任务清单

- [ ] 设计 `_adoc/think/` 是否需要 index、active / archive、doc / research 等目录。
- [ ] 设计单个 Think 对象的建议文件：think.md、research.md、options.md、decision.md、handoff.md 等是否必要。
- [ ] 设计 Think 状态字段和出口字段。
- [ ] 设计 Think 的恢复链路：AGENTS -> index -> map -> think index -> 当前 think。
- [ ] 设计最小模板草案，但只写入本 step 产出文档，不改源码模板。
- [ ] 标出仍需用户决策的问题。

## 产出要求

- 结果文件路径：`_adoc/case/c0.9-aipd-think-system-design/doc/think-object-state-design.md`
- 格式：建议结构 + 状态流转 + 模板草案 + 未决问题。

## 验收标准

- [ ] 设计能支持长讨论和深度调研恢复。
- [ ] 设计能表达非执行出口，不会强制进入 Case Create。
- [ ] 设计足够轻，不会把 Think 做成比 Case 更重的流程系统。

## 不做

- 不实际创建 `_adoc/think/`。
- 不实现模板文件。
- 不讨论 Desktop UI。

---

## 执行记录

**完成时间**：

**主要改动**：
- 

**遇到的问题**：

**Weave 候选**：
- 

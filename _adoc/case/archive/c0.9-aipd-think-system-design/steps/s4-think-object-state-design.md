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

- `_adoc/case/archive/c0.9-aipd-think-system-design/case.md`
- `_adoc/case/archive/c0.9-aipd-think-system-design/doc/aipd-boundary-comparison.md`
- `_adoc/L3-core/index.md`
- `_adoc/L3-core/horizontal-capabilities.md`
- `_adoc/L3-core/vertical-concept-modules.md`
- `_adoc/L4-product/index.md`
- `_adoc/L4-product/map.md`
- `aipd-skill/src/core/case/templates/case.md`
- `aipd-skill/src/core/adoc/templates/inbox.md`

## 任务清单

- [x] 设计 `_adoc/think/` 是否需要 index、active / archive、doc / research 等目录。
- [x] 设计单个 Think 对象的建议文件：think.md、research.md、options.md、decision.md、handoff.md 等是否必要。
- [x] 设计 Think 状态字段和出口字段。
- [x] 设计 Think 的恢复链路：AGENTS -> index -> map -> think index -> 当前 think。
- [x] 设计最小模板草案，但只写入本 step 产出文档，不改源码模板。
- [x] 标出仍需用户决策的问题。

## 产出要求

- 结果文件路径：`_adoc/case/archive/c0.9-aipd-think-system-design/doc/think-object-state-design.md`
- 格式：建议结构 + 状态流转 + 模板草案 + 未决问题。

## 验收标准

- [x] 设计能支持长讨论和深度调研恢复。
- [x] 设计能表达非执行出口，不会强制进入 Case Create。
- [x] 设计足够轻，不会把 Think 做成比 Case 更重的流程系统。

## 不做

- 不实际创建 `_adoc/think/`。
- 不实现模板文件。
- 不讨论 Desktop UI。

---

## 执行记录

**完成时间**：2026-06-20

**主要改动**：
- 新增 `_adoc/case/archive/c0.9-aipd-think-system-design/doc/think-object-state-design.md`。
- 设计 `_adoc/think/` 的建议基础结构：`index.md`、`active/`、`archive/`，不建议设置全局 `doc/` / `research/`。
- 设计单个 Think 对象的渐进式文件结构：Light Think 只需 `think.md`，Research-heavy Think 增加 `research.md` / `research/` / `options.md`，Create Handoff 增加 `decision.md` / `handoff.md`。
- 设计 `status`、`mode`、`phase`、`current_exit` 等状态字段，以及 Create / Kill / Defer / Research / Weave / Continue 出口字段。
- 设计恢复链路：`AGENTS.md -> _adoc/index.md -> _adoc/map.md -> _adoc/think/index.md -> 当前 Think think.md -> 按索引读取附属文件`。
- 产出 `index.md`、`think.md`、`research.md`、`options.md`、`decision.md`、`handoff.md` 的最小模板草案。

**遇到的问题**：
- 无阻塞。主要设计取舍是避免把 Think 做成默认重型目录，因此采用按需加文件的渐进结构。

**Weave 候选**：
- L3 Core：补充 Think 的文件化原则：Think 是可恢复决策对象，但默认轻量、按需加重。
- L4 Product：补充 AIPD Think 的三种模式：Light Think / Research-heavy Think / Create Handoff。
- `_adoc/map.md`：后续实现后补 Think 恢复链路和 `_adoc/think/index.md` 入口。
- `aipd-case-create`：后续实现 case 中收窄 Case Create，要求优先读取 Think handoff（如果存在）。

# Step: s2 - 同类框架前置讨论机制调研

> **所属 Case**: c0.9-aipd-think-system-design
> **类型**: research
> **推荐 Agent**: explorer
> **依赖**: 无

## 目标

调研 OpenSpec 之外的同类项目，找出它们如何处理从想法、需求澄清、调研、spec、计划到执行的前置阶段。

## 已确认设计输入

- 本 step 与 s1 并行，不重复深入 OpenSpec。
- 本 step 关注“前置判断 / spec / research / PRD / task shaping”机制，不关注普通任务执行器。
- AIPD 需要吸收外部精华，但最终要服务 Think 一等对象，而不是变成通用敏捷流程合集。

## 上下文文档

分身 Agent 必须在执行前读取以下文档：

- `_adoc/case/c0.9-aipd-think-system-design/case.md`
- `_adoc/index.md`
- `_adoc/map.md`
- `_adoc/L3-core/index.md`
- `_adoc/L3-core/horizontal-capabilities.md`
- `_adoc/L4-product/index.md`
- `_adoc/L4-product/map.md`

## 调研目标

找出同类项目中值得 AIPD Think 借鉴的前置讨论、调研、spec、PRD、decision、task shaping 机制。

## 调研范围

- `https://github.com/github/spec-kit`
- `https://github.com/bmad-code-org/BMAD-METHOD`
- `https://github.com/langchain-ai/open-swe`
- 可补充 2-3 个公开项目，但必须说明为什么相关。

## 任务清单

- [ ] 每个项目先确认定位、核心 workflow 和适用场景。
- [ ] 标记它是否有 clarify / brainstorm / research / PRD / spec / plan / tasks / implementation 之类的前置阶段。
- [ ] 判断它是否有“不要做 / 暂缓 / 继续调研”一类非执行出口。
- [ ] 对比它们对 artifact 的组织方式：单文件、目录、DAG、模板、命令。
- [ ] 提炼 AIPD Think 可以吸收的机制。

## 产出要求

- 结果文件路径：`_adoc/case/c0.9-aipd-think-system-design/doc/peer-framework-survey.md`
- 格式：先给总表，再按项目展开；必须附证据链接。

## 验收标准

- [ ] 至少覆盖 Spec Kit、BMAD、Open SWE 三个项目。
- [ ] 每个项目都有“可借鉴点”和“与 AIPD 不同点”。
- [ ] 报告能支持后续设计 Think 状态流转和文件结构。

## 不做

- 不做完整竞品报告。
- 不评价商业价值。
- 不写 AIPD 最终设计。

---

## 执行记录

**完成时间**：

**主要改动**：
- 

**遇到的问题**：

**Weave 候选**：
- 

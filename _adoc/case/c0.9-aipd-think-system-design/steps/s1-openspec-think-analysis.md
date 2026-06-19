# Step: s1 - OpenSpec Think 机制分析

> **所属 Case**: c0.9-aipd-think-system-design
> **类型**: research
> **推荐 Agent**: explorer
> **依赖**: 无

## 目标

分析 OpenSpec 中类似 AIPD Think 的机制，重点判断 `/opsx:explore` 是否只是前置聊天，还是已经形成可恢复的决策对象。

## 已确认设计输入

- 用户最初提到的 “Open Space” 大概率是 OpenSpec。
- 当前主线判断：OpenSpec 已有“拆任务前先 explore”的机制，但缺少 AIPD 想要的一等决策出口。
- AIPD 不是照抄 OpenSpec；本 step 只提炼可借鉴机制和不适合照搬的边界。

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

搞清楚 OpenSpec 的前置探索、spec artifact、任务拆解和验收机制对 AIPD Think 的可借鉴点。

## 调研范围

- `https://github.com/Fission-AI/OpenSpec`
- `https://github.com/Fission-AI/OpenSpec/blob/main/docs/opsx.md`
- `https://github.com/Fission-AI/OpenSpec/blob/main/docs/commands.md`
- `https://github.com/Fission-AI/OpenSpec/blob/main/docs/concepts.md`
- 必要时查看 OpenSpec 仓库中的 templates、examples、README。

## 任务清单

- [ ] 核对 OpenSpec 的项目定位、核心流程和 artifact 类型。
- [ ] 分析 `/opsx:explore` 的职责、输入输出、是否创建 artifact、如何进入 propose / new。
- [ ] 分析 proposal / specs / design / tasks / verify / archive 的依赖关系。
- [ ] 判断 OpenSpec 是否有 Create / Kill / Defer / Research / Weave / Continue 类出口；如果没有，说明缺口。
- [ ] 提炼 AIPD 可借鉴点和不适合照搬点。

## 产出要求

- 结果文件路径：`_adoc/case/c0.9-aipd-think-system-design/doc/openspec-think-analysis.md`
- 格式：结论先行，包含证据链接、机制拆解、对 AIPD 的启发、风险与缺口。

## 验收标准

- [ ] 报告能清楚回答：OpenSpec 有没有“前置判断要不要拆”的机制。
- [ ] 报告能区分 OpenSpec explore 与 AIPD Think 的差异。
- [ ] 报告列出至少 5 个可借鉴点或明确不可借鉴点。

## 不做

- 不评价 OpenSpec 代码质量。
- 不实现 AIPD Think。
- 不把 OpenSpec 的目录结构直接改写成 AIPD 方案。

---

## 执行记录

**完成时间**：

**主要改动**：
- 

**遇到的问题**：

**Weave 候选**：
- 

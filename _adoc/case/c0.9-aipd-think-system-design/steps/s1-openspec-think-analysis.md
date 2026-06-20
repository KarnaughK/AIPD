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

- [x] 核对 OpenSpec 的项目定位、核心流程和 artifact 类型。
- [x] 分析 `/opsx:explore` 的职责、输入输出、是否创建 artifact、如何进入 propose / new。
- [x] 分析 proposal / specs / design / tasks / verify / archive 的依赖关系。
- [x] 判断 OpenSpec 是否有 Create / Kill / Defer / Research / Weave / Continue 类出口；如果没有，说明缺口。
- [x] 提炼 AIPD 可借鉴点和不适合照搬点。

## 产出要求

- 结果文件路径：`_adoc/case/c0.9-aipd-think-system-design/doc/openspec-think-analysis.md`
- 格式：结论先行，包含证据链接、机制拆解、对 AIPD 的启发、风险与缺口。

## 验收标准

- [x] 报告能清楚回答：OpenSpec 有没有“前置判断要不要拆”的机制。
- [x] 报告能区分 OpenSpec explore 与 AIPD Think 的差异。
- [x] 报告列出至少 5 个可借鉴点或明确不可借鉴点。

## 不做

- 不评价 OpenSpec 代码质量。
- 不实现 AIPD Think。
- 不把 OpenSpec 的目录结构直接改写成 AIPD 方案。

---

## 执行记录

**完成时间**：2026-06-20 00:28 CST

**主要改动**：
- 新增调研报告：`_adoc/case/c0.9-aipd-think-system-design/doc/openspec-think-analysis.md`。
- 核对 OpenSpec README、`docs/opsx.md`、`docs/commands.md`、`docs/concepts.md`、`schemas/spec-driven/schema.yaml` 和 `openspec/explorations/explore-workflow-ux.md`。
- 明确结论：OpenSpec 的 `/opsx:explore` 是 AIPD Think 的前置雏形，但默认不创建 artifact，也没有 Create / Kill / Defer / Research / Weave / Continue 的完整决策状态系统。
- 提炼 OpenSpec 的 artifact DAG、verify、archive、custom schema / research-first 对 AIPD Think / Case Create 的可借鉴点。

**遇到的问题**：
- 官方命令文档明确说 exploration 不创建 artifacts；但 OpenSpec 仓库自身存在 `openspec/explorations/*.md`，其中 `explore-workflow-ux.md` 正在讨论 exploration 是否应保存为 markdown、如何转 proposal。这里应视为设计信号或项目自用探索材料，不能误判为已发布的稳定 explore artifact 机制。

**Weave 候选**：
- L3 Core：补充 Think 与 OpenSpec explore 的区别。OpenSpec explore 偏无 artifact 的前置探索命令；AIPD Think 应是可恢复、可调研、可决策的一等对象。
- L4 Product：AIPD Think 的出口应明确包含 Create / Kill / Defer / Research / Weave / Continue，避免所有讨论默认滑向 Case Create。
- Case Create 边界：吸收 OpenSpec artifact DAG，将 Case Create 收窄到已决定执行后的 proposal / context / design / steps / validation 规划。
- Case Archive / Weave：后续设计中应保留 Think decision / handoff 与 Case archive 的关联，保证执行结果可追溯前置判断。

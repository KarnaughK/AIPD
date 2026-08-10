# Step: wp-03 - 同步核心 overview / agent-guide / L5 认知并检查冲突

> **所属 Case**: c2-subagent-origin-model
> **类型**: dev
> **推荐 Agent**: worker
> **依赖**: wp-02

## 目标

同步 AIPD2 核心说明和项目 L5 认知，清理仍然指向 `fork_context: false` 的当前策略描述。

## 上下文文档

分身 Agent 必须在执行前读取以下文档：

- Case：`_adoc/case/c2-subagent-origin-model/case.md`
- 核心总览：`src/core/overview.md`
- 核心 Agent 指南：`src/core/agent-guide.md`
- L5 认知：`_adoc/L5-dev/index.md`
- OKR：`_adoc/okr/index.md`

## 任务清单

- [x] 更新 `src/core/overview.md` 中多 Agent 哲学。
- [x] 更新 `src/core/agent-guide.md` 的平台无关协作说明。
- [x] 更新 `_adoc/L5-dev/index.md` 中 Codex 分身 Agent 当前策略。
- [x] 检查 `fork_context: false` 残留，区分历史 case 记录和当前有效策略。

## 验收标准

- [x] 当前有效源码/认知文档中的默认策略一致。
- [x] 历史 case 记录不被篡改，但新 case 明确说明冲突与修正。
- [x] 可以通过 `rg "fork_context"` 快速确认剩余表述语义合理。

## 不做

- 不归档 c1。
- 不修改历史 step 执行记录。

---

## 执行记录

**完成时间**：2026-05-11

**主要改动**：
- 更新 `src/core/overview.md`，把旧“子 Agent 执行者”语义改为分身 Agent / 克隆体。
- 更新 `src/core/agent-guide.md`，把平台无关原则改为分身 Agent、AIPD 通用能力、step 校准和结果回流。
- 更新 `_adoc/L5-dev/index.md` 与 `_adoc/okr/index.md`，同步当前有效策略。
- 检查 `fork_context` 残留：历史 c1 记录保留为历史事实，当前有效源码和认知已改为 `fork_context: true`。

**遇到的问题**：无。

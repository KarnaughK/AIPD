# Step: wp-02 - 更新 Codex 平台指南和 case-run 派发逻辑

> **所属 Case**: c2-subagent-origin-model
> **类型**: dev
> **推荐 Agent**: worker
> **依赖**: wp-01

## 目标

让 Codex 平台指南和 case-run skill 使用分身 Agent / 克隆体模型解释派发，不再把显式上下文传递写成唯一来源。

## 上下文文档

分身 Agent 必须在执行前读取以下文档：

- Case：`_adoc/case/c2-subagent-origin-model/case.md`
- Codex 指南：`src/platforms/codex/core/agent-guide.md`
- Case Run：`src/skills/aipd2-case-run/SKILL.md`
- Case Create：`src/skills/aipd2-case-create/SKILL.md`

## 任务清单

- [x] 更新 Codex 上下文机制，明确 `fork_context: true` 的默认价值。
- [x] 更新 case-run 派发 prompt 说明，区分“同源继承”和“显式校准”。
- [x] 更新 case-create 中对分身 Agent 调研/草案的描述。
- [x] 保留返回简洁、结果回流、不要污染主 Agent 上下文的要求。

## 验收标准

- [x] `src/platforms/codex/core/agent-guide.md` 不再推荐默认 `fork_context: false`。
- [x] `src/skills/aipd2-case-run/SKILL.md` 不再要求主 Agent 重新解释完整上下文。
- [x] case / step 仍被描述为压缩恢复和任务校准的事实来源。

## 不做

- 不改变 Claude 平台指南。
- 不改 custom agent toml。

---

## 执行记录

**完成时间**：2026-05-11

**主要改动**：
- 更新 `src/platforms/codex/core/agent-guide.md`，将默认上下文机制改为 `fork_context: true`。
- 更新 `src/skills/aipd2-case-run/SKILL.md`，把派发 prompt 的职责改为身份、局部目标、锚点、边界和返回格式校准。
- 更新 `src/skills/aipd2-case-create/SKILL.md`，把 case 草案调研描述为分身 Agent 的结果回流。

**遇到的问题**：无。

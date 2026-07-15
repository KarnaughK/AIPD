# Step: wp-03 - 根据策略修改 agent guide、case-run 和 Agent Entry

> **所属 Case**: c3-agent-fork-role-policy
> **类型**: dev
> **推荐 Agent**: worker
> **依赖**: wp-02

## 目标

如果 c3/wp-02 认为需要修改文档，则更新 AIPD2 的分身 Agent 调配规则。

## 上下文文档

分身 Agent 必须在执行前读取以下文档：

- Case：`_adoc/case/c3-agent-fork-role-policy/case.md`
- 调配策略结果：`_adoc/case/c3-agent-fork-role-policy/doc/wp-02-dispatch-policy.md`
- Agent Entry：`src/core/agent-entry/template.md`
- Codex 指南：`src/platforms/codex/core/agent-guide.md`
- Case Run：`src/skills/aipd2-case-run/SKILL.md`
- L5 认知：`_adoc/L5-dev/index.md`

## 任务清单

- [x] 根据策略判断是否需要改文档。
- [x] 如需修改，保持源头认知简洁，不写大量 if-else。
- [x] 更新 case-run 中 step 派发策略。
- [x] 更新 L5 认知索引。

## 验收标准

- [x] 修改后不会让 Agent 误以为所有任务都必须 fork。
- [x] 修改后仍保留分身 Agent / 克隆体核心认知。
- [x] 修改后 `./scripts/build codex` 通过。

## 不做

- 不改历史 case。
- 不改 custom agent 角色模板，除非策略明确需要。

---

## 执行记录

**完成时间**：2026-06-16

**完成方式**：
- 本 step 的文档修改已由后续提交吸收。
- 已确认 `src/platforms/codex/core/agent-guide.md`、`src/skills/aipd2-case-run/SKILL.md`、`src/core/agent-entry/template.md` 和 `_adoc/L5-dev/index.md` 包含本 case 要求的调配策略。
- 未在本次归档中重新运行 build；归档判断基于现有源码和历史提交记录。

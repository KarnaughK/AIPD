# Step: wp-02 - 设计分身 Agent / 角色 Agent / Main Agent 直接执行的调配策略

> **所属 Case**: c3-agent-fork-role-policy
> **类型**: dev
> **推荐 Agent**: worker
> **依赖**: wp-01

## 目标

基于 c3/wp-01 调研，设计 AIPD2 的 Agent 调配策略，避免所有任务都默认 fork 分身导致变慢。

## 上下文文档

分身 Agent 必须在执行前读取以下文档：

- Case：`_adoc/case/c3-agent-fork-role-policy/case.md`
- 调研结果：`_adoc/case/c3-agent-fork-role-policy/doc/wp-01-agent-layering.md`
- Codex 指南：`src/platforms/codex/core/agent-guide.md`
- Case Run：`src/skills/aipd2-case-run/SKILL.md`

## 任务清单

- [x] 区分 Main Agent 直接执行、fork 分身 Agent、带角色 Agent 基于 step 执行。
- [x] 给出弱智任务、流程性任务、复杂探索任务、上下文充分 step 的默认选择。
- [x] 评估速度、上下文、可靠性、恢复性四类成本。
- [x] 输出建议是否需要修改文档。

## 验收标准

- [x] 策略不退回旧“老板派工人”模型。
- [x] 策略不把 fork 分身写成无脑默认。
- [x] 说明 case-run 中 step 已足够明确时的默认选择。

## 不做

- 不直接改实现文档。

---

## 执行记录

**完成时间**：2026-06-16

**完成方式**：
- 本 step 的策略结论已由后续提交吸收，并回填结果文件：`_adoc/case/c3-agent-fork-role-policy/doc/wp-02-dispatch-policy.md`。
- 当前源码已经区分上下文分身、角色执行 Agent 和 Main Agent 直接收口。
- case-run 阶段已改为默认使用角色执行 Agent 基于 step / case / 上下文文档独立执行；只有 step 强依赖 Main Agent 当前未沉淀判断时，才使用 `fork_context: true`。

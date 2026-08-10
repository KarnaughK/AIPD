# Step: wp-03 - 让 step/case-run 支持推荐 Agent

> **所属 Case**: c1-role-codex-custom-agents
> **类型**: dev
> **推荐 Agent**: worker
> **依赖**: wp-02

## 目标

让 case-create 写入推荐 Agent，让 case-run 优先按推荐 Agent 派发。

## 上下文文档

- `src/core/case/templates/step.md`
- `src/core/case/templates/case.md`
- `src/skills/aipd2-case-create/SKILL.md`
- `src/skills/aipd2-case-run/SKILL.md`
- `src/platforms/codex/core/agent-guide.md`

## 任务清单

- [x] step 模板增加 `推荐 Agent` 字段。
- [x] case 模板 step 列表展示推荐 Agent。
- [x] case-create 说明如何为 step 选择推荐 Agent。
- [x] case-run 说明优先读取推荐 Agent，再兜底判断。
- [x] Codex 平台指南同步推荐 Agent 规则。

## 验收标准

- [x] Vue step 可声明 `推荐 Agent: aipd_vue_architect`。
- [x] case-run prompt 必须带 step 路径、case 路径和推荐 Agent。

## 不做

- 不直接实现平台无关 Role 格式。

---

## 执行记录

**完成时间**：2026-05-09

**主要改动**：
- 更新 step/case 模板。
- 更新 case-create、case-run 和 Codex agent-guide。

**遇到的问题**：无

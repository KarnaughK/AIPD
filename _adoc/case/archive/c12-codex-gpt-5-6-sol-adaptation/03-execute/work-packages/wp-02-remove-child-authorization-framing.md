# Work Package: wp-02 - 移除子 Agent 授权叙事

> **所属 Case**: c12-codex-gpt-5-6-sol-adaptation
> **Phase**: Execute
> **类型**: docs / process
> **推荐 Agent**: Main Agent
> **依赖**: WP-01 completed；用户 Verify 反馈

## 目标

从 Agent Entry 及其直接规则副本中移除“子 Agent 是否获得授权 / 是否需要前置询问”的显式叙事，让 Main 只按运行时收益自然选择 Main 或 Child。

## 设计依据

- Requirements Contract：用户 2026-07-14 Verify 反馈。
- Context Boundary：`../../02-design/design.md`。
- Readiness Gate：passed；不改变 WP-01 的四维收益模型。
- 复杂度爆点：即使规则写的是“无需授权”，持续出现“授权 / 询问”仍会把该概念放进模型注意力。
- 解耦方式：只保留运行时收益判定、平台不可用回退、用户明确禁用和真实外部副作用边界。
- 文件边界：Agent Entry、Codex guide、aipd-case / Execute 与直接解释同一规则的 L5 / docs。

## 不允许固化的假设

- 不假设自然调度一定会增加子 Agent 使用率；后续按真实使用反馈判断。

## 横向模块

- [x] 移除 Agent Entry 与当前 `AGENTS.md` 中的授权 / 前置询问叙事。
- [x] 同步 Codex guide、aipd-case、Execute phase、L5、OKR 与分身文档。
- [x] 扫描生成物并运行 build。

## 上下文文档

- `../../case.md`
- `../../02-design/design.md`
- `aipd-skill/src/core/agent-entry/template.md`
- `aipd-skill/src/platforms/codex/core/agent-guide.md`
- `aipd-skill/src/skills/aipd-case/SKILL.md`
- `aipd-skill/src/core/case/phases/execute.md`

## 执行前 checkpoint

- **当前目标**：移除子 Agent 授权叙事，不改变调度收益模型。
- **恢复入口**：本文件、`../execute.md`、`../../case.md`。
- **执行边界**：只修改直接承载该叙事的规则文本和 Case 状态。
- **预期输出**：一致的自然调度文本、残留扫描和 build 结果。
- **停止条件**：目标文本无授权 / 前置询问叙事且 build 通过；若需改变外部副作用边界则停止。
- **返回位置**：完成后回到 Verify。

## 验收标准

- [x] 子 Agent 调度规则不再讨论是否获得授权或是否需要前置询问。
- [x] Main / Child 四维收益判定和用户明确禁用边界保留。
- [x] install、远端写入、删除等外部副作用仍按各自确认边界执行。
- [x] Codex / Claude 生成物扫描和 AIPD build 通过。

## 不做

- 不改变模型模式、浏览器规则或 Work Package 语义。
- 不执行 install、commit 或 push。

## 执行记录

**状态**：completed

**完成时间**：2026-07-14

**主要改动**：
- 把“无需授权 / 无需前置询问”改为“Main 按运行时收益自然选择 Main 或 Child”。
- 平台不可用时回退 Main；用户明确要求不派 Child 时遵循当前指令。
- 外部副作用确认边界保持独立，不与 Child 调度绑定。

**验证结果**：
- 源码与 Codex / Claude dist 的子 Agent 授权、申请授权、前置询问措辞扫描无命中。
- `git diff --check` 通过。
- AIPD build 通过：9 个 Claude skills、9 个 Codex skills 和 Codex agent templates。

**执行后 checkpoint**：
- **当前结论**：WP-02 完成，授权叙事已从运行时规则中移除。
- **下一步**：已完成 Codex 用户级 install；在后续使用中观察自然调度表现。
- **恢复入口**：本文件与 `../../04-verify/verify.md`。

**遇到的问题**：无。

**回跳 / 重开**：Verify 收到用户反馈，设计方向仍成立，直接补 Execute 工作包。

**Weave 候选**：无新增稳定概念；这是现有调度规则的注意力降噪。

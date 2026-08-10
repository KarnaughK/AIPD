# Work Package: wp-01 - Upgrade Interaction Response Protocol

> **所属 Case**: c21-interaction-response-protocol
> **Phase**: Execute
> **类型**: docs
> **推荐 Agent**: Main Agent
> **依赖**: `02-design/design.md` Readiness Gate passed

## 目标

把已确认的五段讨论回复协议落实到唯一源模板和当前项目实例，通过 build 同步所有分发引用，并完成定向与全量一致性验证。

## 设计依据

- Requirements Contract：`02-design/design.md#需求契约`
- Domain Rules / Edge Cases：`02-design/design.md#建议协议与文件边界`
- Brownfield Delta：`02-design/design.md#Brownfield Delta`
- Backend Design：skipped
- Frontend Design：skipped
- Context Boundary：`02-design/design.md#建议协议与文件边界`
- Readiness Gate：passed
- 复杂度爆点：只改标题会遗漏生成依赖、横向 / 向下职责和不越权边界。
- 解耦方式：源模板承载语义，当前 `AGENTS.md` 承载启用实例，dist 只由 build 生成。
- 主干职责：Interaction Protocol 约束讨论回复结构、执行切换和长短答边界。
- 特殊节点：“下一步”可以指向讨论、确认、实现或验证，但不自动授权执行。
- 文件 / 文件夹边界：
  - `aipd-skill/src/core/agent-entry/interaction-style.md` - 唯一源模板。
  - `AGENTS.md` - 当前项目启用实例。
  - `aipd-skill/dist/{codex,claude}/skills/{aipd,aipd-update}/references/agent-entry/interaction-style.md` - build 产物。

## 不允许固化的假设

- 不把“下一步”解释为自动执行授权。
- 不删除简单短答例外。
- 不改变执行 / 修改回复模板、长答触发或 Agent MD 等级逻辑。

## 横向模块

- [x] 五段源模板与行为护栏。
- [x] 当前项目 `AGENTS.md` 实例同步。
- [x] Codex / Claude 四份分发引用同步。
- [x] 标题、内容、构建和分发一致性验证。

## 上下文文档

执行前必须读取：

- `case.md`
- `02-design/design.md`
- `02-design/decision-log.md`
- `aipd-skill/src/core/agent-entry/interaction-style.md`
- `AGENTS.md`
- `aipd-skill/scripts/build`
- `aipd-skill/scripts/check-dist`

## 执行前 checkpoint

- **当前目标**：一次完成协议源、当前实例、build 产物与验收。
- **恢复入口**：`case.md`、`03-execute/execute.md`、本文件。
- **执行边界**：允许修改源模板、当前实例和 Case 文件；dist 只允许 build 改写。
- **预期输出**：五段协议、四份同步产物、通过的 build / 定向检查 / `check-dist`。
- **停止条件**：完成；发现设计缺口；build 或检查失败；出现需要 install 的下一步。
- **返回位置**：执行后写回本文件、`execute.md` 和 `case.md`；成功则等待进入 Verify。

## 验收标准

- [x] 源模板使用五个精确标题，并包含已确认行为规则。
- [x] 当前 `AGENTS.md` 的 Interaction Protocol 与源模板一致。
- [x] 四份 dist 引用与源模板字节一致。
- [x] 当前有效范围不再出现旧标题。
- [x] `./aipd-skill/scripts/build` 通过。
- [x] `./aipd-skill/scripts/check-dist` 通过。
- [x] 设计护栏和不做范围未被破坏。

## 不做

- 不手改 dist。
- 不改 `aipd` / `aipd-update` 安装与同步流程。
- 不改 `aipd-skill/README.md`。
- 不执行 install。

## 执行记录

**状态**：completed

**完成时间**：2026-07-29

**主要改动**：
- 将源模板和当前 `AGENTS.md` 改为五段固定顺序。
- 明确“我理解”只做复述握手，“展开说说”基于原话与复述继续展开，“结论”后置。
- 明确“横向拓展”只做相邻发散，“下一步”只给一个自然向下动作且不自动授权执行。
- 通过 build 同步 Codex / Claude 下 `aipd` 与 `aipd-update` 的四份引用。

**验证结果**：
- `./aipd-skill/scripts/build`：通过。
- 源模板与 `AGENTS.md` 协议区块 `cmp`：通过。
- 四份 dist 引用与源模板 `cmp`：通过。
- 旧标题定向 `rg`：无命中。
- 五个新标题顺序 `rg`：通过。
- `./aipd-skill/scripts/check-dist`：通过。
- `git diff --check`：通过。

**执行后 checkpoint**：
- **当前结论**：completed，无设计缺口或信息缺口。
- **下一步**：等待用户确认进入 Verify。
- **恢复入口**：本文件、`03-execute/execute.md`、`case.md#Verify 摘要`。

**遇到的问题**：首次前置比较命令因包含临时文件清理被安全策略拒绝，未执行、未改动文件；随后改用 process substitution 完成等价只读比较。

**回跳 / 重开**：
- 无。

**Weave 候选**：
- 显式复述握手与五段回复生成顺序是否进入 L3 / L4，留待 Close 判断。

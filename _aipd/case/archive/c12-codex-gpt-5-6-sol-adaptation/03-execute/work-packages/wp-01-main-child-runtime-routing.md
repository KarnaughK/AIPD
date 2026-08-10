# Work Package: wp-01 - Main / Child 运行时调度统一

> **所属 Case**: c12-codex-gpt-5-6-sol-adaptation
> **Phase**: Execute
> **类型**: docs / process
> **推荐 Agent**: Main Agent
> **依赖**: `02-design/design.md` readiness passed

## 目标

将已确认的 Main / Child 收益判定模型同步到 AIPD 持久规则，并完成全局残留扫描、Git diff 审查和 build 验证。

## 设计依据

- Requirements Contract：`../../02-design/design.md#requirements-contract`
- Brownfield Delta：`../../02-design/design.md#brownfield-delta`
- Context Boundary：`../../02-design/design.md#context-boundary`
- Readiness Gate：passed
- 复杂度爆点：同一调度概念散落在 Agent Entry、Codex guide、Case skill、Execute phase 和当前项目规则中，容易产生默认派发语义漂移。
- 解耦方式：统一“状态 / 验收分解”与“运行时执行选择”，用上下文隔离、真实并发、主线耦合和调度成本判定 Child。
- 主干职责：Main 保持用户沟通、主线判断和高耦合连续实现；Child 承担有明确净收益的隔离或并发分支。
- 文件边界：调度相关段落局部修改，不覆盖其他未提交变化。

## 不允许固化的假设

- 不固化精确 token 门槛、模型档位自动路由或浏览器秒级超时。
- 不假定所有平台都支持相同的 fork、interrupt 或 heartbeat 能力。

## 横向模块

- [x] 统一 Agent Entry 与当前 `AGENTS.md`。
- [x] 统一 Codex agent guide 的上下文、goal、主流程和执行边界。
- [x] 统一 `aipd-case` 与 Execute phase 的 Work Package / Agent 选择。
- [x] 更新直接承载旧调度语义的 L3 / L5、map、OKR 和 clone-agent 文档。
- [x] 扫描残留旧语义，审查定向 diff 并运行 build。

## 上下文文档

执行前必须读取：

- `../../case.md`
- `../../02-design/design.md`
- `aipd-skill/src/core/agent-entry/template.md`
- `aipd-skill/src/platforms/codex/core/agent-guide.md`
- `aipd-skill/src/skills/aipd-case/SKILL.md`
- `aipd-skill/src/core/case/phases/execute.md`
- `AGENTS.md`

## 执行前 checkpoint

- **当前目标**：完成全部相关持久规则的语义统一，不把工作留在半更新状态。
- **恢复入口**：本文件、`../execute.md`、`../../case.md`、`../../02-design/design.md`。
- **执行边界**：允许修改调度相关源码、模板、当前 Agent Entry 和直接受影响文档；禁止覆盖无关 dirty diff。
- **预期输出**：一致的规则文本、残留扫描结果、定向 diff、build 结果和 Verify 交接。
- **停止条件**：所有验收项满足；或发现无法在不覆盖用户改动的前提下安全合并。
- **返回位置**：成功后更新本文件、`../execute.md` 和 case，进入 Verify。

## 验收标准

- [x] Work Package 不再被定义为默认子 Agent 派发节点。
- [x] 文件修改、构建、测试、跨文件 diff 和事实检索不再按任务类型机械派发。
- [x] 子 Agent 正向触发覆盖高噪声上下文隔离与两条以上独立并发工作线。
- [x] 主线耦合与调度成本成为明确反向判断。
- [x] 最小 fork、single-owner evidence、压缩回流和 Main 不重复执行得到保留。
- [x] 浏览器新流程或异常只增加“先沟通”的窄边界。
- [x] 定向 diff 无无关覆盖，AIPD build 通过。

## 不做

- 不修改 Codex 模型配置或用户 effort。
- 不实现 benchmark SOP 或浏览器详细状态机。
- 不执行 install、commit 或 push。

## 执行记录

**状态**：completed

**完成时间**：2026-07-14

**主要改动**：
- Work Package 改为状态、上下文、恢复和验收边界，运行时再选择 Main 或 Child。
- 以高噪声上下文隔离、两条以上独立并发工作线和必要独立复核为 Child 正向触发；以主线耦合和调度成本为反向判断。
- 保留最小上下文、single-owner evidence、压缩回流和 Main 不重复证据面。
- Codex 增加 Sol High / Ultra 使用边界；Claude 同步运行时选择，避免平台生成物冲突。
- 浏览器只固化“新流程、异常或路径不确定先沟通”的窄边界。

**验证结果**：
- `git diff --check` 通过。
- 源码与直接相关文档的旧机械派发语义扫描无命中。
- Codex / Claude dist 生成物均命中新规则，未命中旧 Work Package 默认派发语义。
- `./aipd-skill/scripts/build` 成功：9 个 Claude skills、9 个 Codex skills 和 Codex agent templates。

**执行后 checkpoint**：
- **当前结论**：WP-01 全部验收项通过，未执行 install / commit / push。
- **下一步**：进入 Verify，等待用户最终验收；另行确认是否 install。
- **恢复入口**：本文件与 `../../04-verify/verify.md`。

**遇到的问题**：无。

**回跳 / 重开**：无。

**Weave 候选**：已同步到 L3 / L5 / map、Agent Entry 和平台 guide；Close 时只需确认是否还有遗漏入口。

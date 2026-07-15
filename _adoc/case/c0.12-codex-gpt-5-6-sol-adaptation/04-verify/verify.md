# Verify：Codex Main / Child 调度适配

## Verify Result

- **结果**：WP-02 修正、自动验证和 Codex 用户级 install 均通过，进入真实使用观察。
- **验收对象**：WP-01 的调度语义、源码 / 文档一致性、Codex / Claude 构建生成物和 Git 变更边界。
- **用户验收状态**：accepted_for_merge / runtime_observation_continues。

## Case Contract 验收

- [x] Work Package 与子 Agent 派发解绑定。
- [x] Main / Child 使用上下文隔离、真实并发、主线耦合和调度成本四维判定。
- [x] Sol High 作为日常交互基线，Ultra 不再与 AIPD 默认 fan-out 叠加。
- [x] 浏览器仅固化“新流程、异常或路径不确定先沟通”的窄边界。
- [x] 源码、当前项目 Agent Entry 和直接相关认知 / docs 已统一。
- [x] AIPD build 通过。
- [x] 子 Agent 调度规则不再讨论授权或前置询问，只保留自然运行时选择。
- [x] 用户已审阅当前 Git 状态并批准把 5.6 分支合入 `main`。
- [x] 用户已确认并完成 WP-02 后的 Codex 用户级 install。

## Work Package 验收

- WP-01：completed；全部横向模块和验收标准已勾选。
- WP-02：completed；授权叙事移除、双平台生成物扫描和 build 通过。
- 执行方式：Main 连续完成。该工作包语义高度耦合、上下文可控，不存在值得拆分的独立并发线，符合新规则本身。
- 范围变化：在残留扫描与 build 审查中补充 L3 / L5 / map、直接相关 docs 和 Claude 平台 guide；这些文件承载同一旧语义，属于一致性修复，不改变 Non-goals。

## 验证证据

| 验证项 | 结果 | 说明 |
|---|---|---|
| Git whitespace / patch integrity | passed | `git diff --check` 无输出 |
| 旧语义残留扫描 | passed | 核心源码、Agent Entry、L3 / L5 / map 和直接相关 docs 无旧机械派发模式命中 |
| Codex 生成物 | passed | 包含 Work Package 解绑定、最小上下文、上下文隔离、真实并发、single-owner 和 Sol Ultra 边界 |
| Claude 生成物 | passed | 包含运行时 Main / Agent Team 选择，不再默认每个 Work Package 派发 |
| AIPD build | passed | 成功生成 9 个 Claude skills、9 个 Codex skills 和 Codex agent templates |
| 授权叙事扫描 | passed | 源码及 Codex / Claude dist 无子 Agent 授权、申请授权或前置询问措辞 |
| Codex 用户级 install | passed | 9 个 skills、3 个 Agent 模板与本次构建产物逐项一致；安装目录授权叙事扫描无命中 |
| 自动化测试 | not_applicable | 仓库未发现本次 docs / process 改动可运行的测试套件 |

## Design Guardrails

- 未修改 Codex 模型配置或用户 effort。
- 未建立 benchmark SOP。
- 未固化浏览器秒级超时、heartbeat 或重试状态机。
- install 只在用户明确确认后执行，已经完成；commit / push / merge 于 2026-07-15 获得用户明确授权。
- 未覆盖与本 Case 无关的工作区变化；改动均围绕同一调度语义及 Case 记录。

## 残留风险

- Sol High / Ultra 的同 prompt A/B 仍未执行；当前规则是交互与调度策略，不是模型质量基准结论。
- 浏览器阈值仍按真实执行反馈补充，本 Case 不提前固化。
- 安装已验证；自然调度是否会按预期使用 Child 仍需后续真实任务观察。

## 下一步判断

- 2026-07-14：用户要求移除“子 Agent 授权 / 前置询问”的显式叙事；WP-02 已完成并返回 Verify。
- 2026-07-15：用户批准把 5.6 分支合入 `main`；运行时自然观察作为合并后的持续反馈，不再阻塞发布。
- 用户发现规则或 diff 不符合预期：回到 Execute，新增或调整 Work Package。
- 当前无需要回到 Design 的阻塞问题；合并完成后可进入 Close。

## Close / Weave 候选

- Main / Child 四维收益判定、Work Package 解绑定和 single-owner evidence 已写入稳定入口，可在 Close 确认归档。
- Sol High / Ultra 路由目前保留在 Codex 平台 guide；待真实使用验证后再决定是否提升为跨平台稳定认知。

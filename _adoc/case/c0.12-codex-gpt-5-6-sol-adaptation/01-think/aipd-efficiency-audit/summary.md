# 分支：AIPD Agent 效率审计

## Branch goal

把近期对话暴露的等待与 token 问题映射到 AIPD 的 Agent Entry、Case、Learn、子 Agent 调度和 Codex 平台规则，提出有落点的优化候选。

## Trigger

来自 Case Contract；用户希望利用 `AGENTS.md` 指导 Agent 更快速高效。

## Scope / stop condition

- 审计当前工作区版本（包含用户未提交改动），不修改这些文件。
- 区分项目级 `AGENTS.md`、通用模板、Codex 平台 guide、skill 和配置层的职责。
- 提出 3-6 条候选，每条包含证据、收益、代价、落点和最小验证方式后停止。

## Evidence

### 核心诊断

AIPD 当前优先优化“保护 Main 上下文”，没有把“端到端延迟 / 总 token / child 尾延迟”设为同等约束。与 Sol Ultra 叠加后形成放大链：

```text
常驻长规则
-> 事实检索几乎默认派 child
-> generic child 继承 Sol Ultra
-> 全量 fork / 重复读 map 与 Skill
-> 多轮 follow-up 与 wait
-> Main 再做汇总和验收
```

关键证据：

- `AGENTS.md:62-109,141-144`：涉及检索 / 多入口时积极触发 child，例外很窄。
- `aipd-skill/src/platforms/codex/core/agent-guide.md:52-56`：明确说判断重点不是总 token；这在 Ultra 下已不再合适。
- 同文件 `:43-60,167-169` 虽然说不默认 fork 全量上下文，但没有把运行时参数写成硬默认；本轮实际仍用了 `fork_turns="all"`。
- `AGENTS.md` 与 `agent-entry/template.md` 重复大量调度 / Case 细节；`aipd-learn/SKILL.md` 414 行，但一次实际只走一种模式。
- Main 先读 index / map，retriever 又按指南重读；没有可复用的 Context Receipt。
- Think / Design 会比较选项，但缺少 `max branches / max sources / timebox` 等量化停止条件。
- 执行 Agent 自检、Main 验收、Verify 可能重复相同证据；checkpoint 也分散在多处同步。

现有正向规则应保留：map-first、只加载当前 phase、file-first checkpoint 和“讨论不自动升级执行”。问题是粒度与触发门槛，不是这些原则本身。

### 优化候选

| 优先级 | 候选 | 预期收益 | 主要代价 | 建议落点 |
|---|---|---|---|---|
| P0 | 三档运行预算 `fast / balanced / deep`，Ultra 不再全局默认 | 直接降低等待、fan-out 和额度消耗 | 低档可能漏隐含冲突 | Agent Entry 只声明原则；Codex guide 写矩阵；config / agent TOML 承载 model / effort |
| P0 | single-owner evidence + child 数量上限 | 消除 Main / child 与 child / child 重复扫描 | Main 需要更准确地切证据面 | Codex agent guide / retriever return contract |
| P0 | child 默认最小 fork；检索 worker 用 Terra medium / high | 降低启动上下文和每轮推理成本 | 可能需要升级重试 | Codex guide + custom agent TOML |
| P1 | 瘦身常驻 Agent Entry 与入口 Skill | 每一轮恒定减少输入；降低规则打结 | 增加一次按需读取 | `AGENTS.md` 模板、`aipd-learn` / `aipd` 路由结构 |
| P1 | 方案比较 Gate + 量化停止条件 | 抑制开放题无边界发散 | 可能漏第三方案 | Think / Design phase 规则 |
| P2 | Context Receipt、checkpoint 事务化、验收证据复用 | 降低长 Case 重复读写与重复验证 | 需要可靠失效规则 | retriever / case / WP / Verify 模板 |

### P0 具体规则草案

1. **运行预算**
   - Fast：单一事实、已知文件、状态 / Git 核对、短讨论；0 child，先在约 60 秒内给当前结论。
   - Balanced：单领域、多入口但可由一个 owner 完成；最多 1 个 retriever，Main 不重复扫描。
   - Deep：至少 2 个互不依赖证据面或工作包，且质量收益高于等待成本；首轮最多 2-3 child，必须有 timebox 与 stop condition。
2. **fork**
   - 自足检索 / 文件型 work package：`fork_turns="none"`。
   - 确需用户原话：仅带最近 1-3 turns。
   - 全量 fork：只有任务强依赖尚未落盘的长对话判断时使用。
3. **child 模型**
   - 读多写少、资料扫描、日志 / 大文件摘要：`gpt-5.6-terra / medium`，证据冲突再升 high。
   - 关键实现 / 审查：Sol high；不可拆的高风险判断再用 xhigh / max。
   - 禁止 generic child 无意继承 parent Ultra；若运行时不能指定，应减少 generic fan-out。
4. **协调**
   - child 默认单轮返回固定结构：结论、证据、不确定项、建议。
   - 最多一次针对明确 evidence gap 的 follow-up。
   - 避免 `list + 短 wait` 轮询；一次较长 wait，Main 等待时做不重叠的本地收口。
5. **方案比较**
   - 默认给一个推荐路径；只有真实 open choice 会改变目标、接口、主路径、成本或风险时才比较。
   - 默认最多 2 个候选、3 个维度、1 轮；满足全部硬约束且无实质竞争者即停止。

## Conclusion

- 最先应该改的不是某一句“请更快”，而是 model / effort / fan-out / fork 四个运行参数和证据所有权。
- 第二步才是瘦身 Agent Entry 与 skill，让 AIPD 原本的渐进加载真正生效。官方 GPT-5.6 指南也支持这一方向：重 prompt 会降低质量并增加额外探索。
- checkpoint 与 Verify 去重有价值，但优先级低于 P0 调度；不要一次性重写全部 Case 机制。

### 最小 A/B 验证

用 8-12 个历史真实 prompt，按任务形状分四组：单事实、状态 / 已知路径、开放讨论、跨域深度任务。固定工具权限和成功标准，对比：

1. `GPT-5.6 Sol High`（主基线）。
2. `GPT-5.6 Sol Medium` 或 `Terra Medium`（速度基线）。
3. `GPT-5.6 Sol Ultra`（只跑跨域可并行组）。

记录：首次有效反馈、最终耗时、成功 / 完整度、证据满足度、总 token accounting、cached input、child 数、最慢 child、工具 / 协调调用、重复证据面、返工次数。

## Return to

`../think.md` 的优化方向；用户确认后进入 Design 决定具体改动文件。

## Invalidates

当前无既有 Design / Work Package，不使下游失效；但说明现有“只要事实检索就积极派 child，且总 token 不是判断重点”的规则需要重新设计。

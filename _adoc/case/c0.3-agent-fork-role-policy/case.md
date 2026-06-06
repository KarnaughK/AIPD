# Case: c0.3-agent-fork-role-policy

> **本次事项目标**：分析 AIPD2 中 fork 分身 Agent、带角色 Agent、基于 step 的直接执行之间的调配策略，避免把所有任务都机械地交给分身导致执行变慢。

## 1. 目标

- **调配策略**：明确什么时候需要 `fork_context: true` 的分身 Agent，什么时候只需要带角色的 Agent，什么时候 Main Agent 直接推进更合适。
- **身份叠加**：分析“主 Agent 克隆体 + custom agent 角色”与“空白/低上下文 Agent + 角色 + step”的差别。
- **性能取舍**：评估频繁创建分身 Agent 对速度、等待时间和主线连续性的影响。
- **case-run 规则修正**：重新审视具体 step 执行时，默认用分身还是默认用角色 Agent，避免过度使用 fork。

## 2. 上下文索引

> 执行时优先读这些，不全量扫描项目。

### 项目认知

- `_adoc/index.md` - AIPD2 项目认知入口。
- `_adoc/map.md` - AIPD2 项目记忆地图，用于路由分身 Agent、角色 Agent、case-run 和 L5 工程规则。
- `_adoc/L1-intent/intent.md` - AIPD2 当前方向和 Codex 优先取舍。
- `_adoc/L5-dev/index.md` - 当前分身 Agent 与 case-run 研发约束。
- `_adoc/case/c0.2-subagent-origin-model/case.md` - 分身 Agent / 克隆体模型的上一轮结论。

### 框架源码入口

- `src/core/agent-entry/template.md` - Agent Entry 中分身 Agent 的源头认知。
- `src/core/agent-guide.md` - 平台无关多 Agent 协作说明。
- `src/platforms/codex/core/agent-guide.md` - Codex 分身 Agent、角色 Agent、fork 策略的主要说明。
- `src/platforms/codex/agents/aipd_vue_architect.toml` - custom agent 角色模板示例。
- `src/skills/aipd2-case-run/SKILL.md` - case-run 当前派发 step 的规则。

## 3. 本次边界

### 要做

- 梳理 `fork_context: true` 分身 Agent、custom agent 角色、step 显式上下文之间的关系。
- 讨论“分身 Agent 是否总是必要”，尤其是弱智任务、流程性任务、上下文已经被 case / step 写清楚的任务。
- 给出后续可落地的规则修改建议。

### 不做

- 现在不急着修改分身 Agent 模型。
- 不马上改 case-run 默认策略。
- 不做性能测试实现。
- 不展开长讨论；本 case 先作为后续迭代入口。

## 4. 关键问题

- `fork_context: true` + custom agent 角色时，角色指令与 fork 上下文如何叠加？
- 当 case 和 step 已经足够清楚时，是否应该优先用带角色 Agent 基于 step 执行，而不是完整 fork 分身？
- 对弱智任务、流程性任务、纯机械任务，Main Agent 直接做、普通角色 Agent 做、分身 Agent 做，分别有什么成本？
- 分身 Agent 变慢的主要来源是什么：创建开销、上下文变大、等待模型响应，还是过度方案确认？
- AIPD2 是否需要把“分身 Agent”拆成两类：上下文克隆型分身、角色执行型分身？

## 5. Step 列表

- [x] `steps/c0.3.1-research-codex-agent-layering.md` - 调研 Codex fork_context 与 custom agent 角色叠加机制（推荐 Agent：explorer）
- [ ] `steps/c0.3.2-design-dispatch-policy.md` - 设计分身 Agent / 角色 Agent / Main Agent 直接执行的调配策略（推荐 Agent：worker）
- [ ] `steps/c0.3.3-update-docs-if-needed.md` - 根据策略修改 agent guide、case-run 和 Agent Entry（推荐 Agent：worker）

## 6. 验收标准

- [ ] 明确区分至少三种执行方式：Main Agent 直接执行、fork 分身 Agent、带角色 Agent 基于 step 执行。
- [ ] 明确 case-run 中 step 已足够清楚时的默认选择。
- [ ] 明确性能和上下文成本取舍，不把“开分身”写成无脑默认。
- [ ] 如需改文档，更新位置和规则清楚，不推翻 c0.2 的核心认知。

## 7. Weave 反向编织候选

> 本区只记录候选归属。真正回写长期 ADOC、局部 README 或 map 时，使用 `aipd2-weave` 先给回写方案，用户确认后再写入。

- `_adoc/L5-dev/index.md` - Codex 分身 Agent 当前策略。
- `src/platforms/codex/core/agent-guide.md` - 具体调度策略。
- `src/skills/aipd2-case-run/SKILL.md` - case-run step 派发规则。
- `src/core/agent-entry/template.md` - 只沉淀源头认知，不写过多场景状态机。
- `_adoc/map.md` - 如果形成高频检索入口，应补充分身 Agent / 角色 Agent / Main Agent 直接执行的路由。

## 8. 自迭代观察锚点

> 后续用 `aipd2-learn` 审计 transcript / session / step 记录时，检查 Agent 是否按这些锚点执行。锚点用于判断 AIPD SOP 是否生效，不只依赖用户反复纠正。

- [ ] Agent 是否读取 `_adoc/map.md`，或说明其缺失并使用 `rg` / README 兜底。
- [ ] Agent 是否读取本 case 上下文索引中的 L3 / L5 / 历史 case。
- [ ] 讨论分身 Agent 时，是否区分 Main Agent 直接执行、fork 分身 Agent、带角色 Agent 基于 step 执行。
- [ ] 讨论性能时，是否明确上下文成本、创建等待、显式上下文完备度和主线保护之间的取舍。
- [ ] 如果修改 case-run 或 Agent Entry，是否避免推翻 c0.2 的克隆体核心认知。

## 9. 归档状态

- **状态**：执行中
- **创建时间**：2026-05-12
- **归档时间**：

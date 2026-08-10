# Design：Main / Child 最小调度规则

## Design Intake

- **Case 类型**：docs / process；research-to-implementation。
- **Design 模式**：`quick`。
- **当前缺口**：现有规则把项目事实检索、文件修改、构建测试和 Work Package 与子 Agent 默认派发绑定；这与 2026-07-14 收口的运行时选择模型冲突。
- **外部调研 / 实验**：不需要。已有 transcript 审计、现行规则定位和用户确认足以进入实现。
- **实践经验命中**：无。现有经验索引没有 Agent 调度或浏览器执行经验，不临时发明经验条目。

## Requirements Contract

### Confirmed

1. Case / Work Package 负责状态持久化、恢复和验收，不直接决定执行 Agent。
2. Main / Child 是运行时选择；一个高耦合、内聚的模块允许由 Main 连续完成。
3. 子 Agent 的两个主要正向触发是：
   - 隔离大量最终不需要进入主线的中间上下文；
   - 并发推进两条以上真正独立的工作线，以缩短墙钟时间。
4. 子 Agent 的收益必须覆盖启动、上下文继承、协调、等待、合并和重复工作的成本。
5. Main 不重复执行已经交给 Child 的证据面；Child 返回压缩结论、依据、风险和必要路径。
6. 浏览器场景当前只固化最小边界：新流程、异常状态或路径不确定时先与用户沟通，不无边界深入或盲目绕路。
7. 已确定规则先落地；模型 A/B、精确 token 阈值和浏览器秒级超时在后续真实执行中验证，不作为前置门槛。

### Non-goals / Deferred

- 不修改 Codex 模型配置或用户默认 effort。
- 不建立完整 transcript benchmark SOP。
- 不设计浏览器 heartbeat、秒级超时和重试状态机。
- 不重写整个 Case / Goal / checkpoint 系统。
- 不清理当前工作区里与本 Case 无关的未提交改动。

### Acceptance Criteria

- 持久规则不再表述“项目事实检索、文件修改、构建测试或每个 Work Package 默认必须交给子 Agent”。
- 规则能明确区分状态 / 验收分解与运行时 Agent 选择。
- 规则包含上下文隔离、真实并发、主线耦合和调度成本四个判断维度。
- 规则保留最小 fork、single-owner evidence、压缩返回和禁止 Main 重复调查。
- 浏览器仅增加“异常或新流程先沟通”的窄边界，不引入未经验证的固定秒数。
- AIPD build 通过；build 后由 Main 主动询问用户是否 install。

## Brownfield Delta

### 当前冲突

- `aipd-skill/src/core/agent-entry/template.md`：把“默认积极使用子 Agent”、多入口事实检索、文件修改和构建测试设为强派发信号，并将 Work Package 设为默认派发节点。
- `aipd-skill/src/platforms/codex/core/agent-guide.md`：允许 Main 直接执行的例外过窄；Case Execute 默认把角色 Agent 设为执行者。
- `aipd-skill/src/skills/aipd-case/SKILL.md` 与 `aipd-skill/src/core/case/phases/execute.md`：Execute 仍把 work package 与子 Agent 调度紧密绑定。
- `AGENTS.md` 与 `_adoc/case/index.md`：当前项目规则复制了同样的默认派发结论。

### 最小修改范围

1. `aipd-skill/src/core/agent-entry/template.md`
   - 把默认积极派发改为收益判定。
   - 重新定义 Main 直接执行边界和 Child 强触发信号。
   - 明确 Work Package 不等于派发节点。
   - 加入浏览器窄边界。
2. `aipd-skill/src/platforms/codex/core/agent-guide.md`
   - 改写上下文继承、Main / Child 选择、goal 与 case 恢复关系。
   - 保留最小上下文、压缩回流、single-owner evidence。
3. `aipd-skill/src/skills/aipd-case/SKILL.md`
   - Execute 根据工作形状选择 Main 或 Child，不再按任务类型机械派发。
4. `aipd-skill/src/core/case/phases/execute.md`
   - Work Package 保持验收与恢复职责；推荐 Agent 变成建议，不是强制派发。
5. `AGENTS.md`
   - 与模板同步当前项目调度语义，只做局部合并，保留用户现有未提交变化。

暂不修改 docs、L3/L4/L5 正文和模型配置；稳定知识在 Verify / Close 后再判断 weave。

### Execute 边界更正（2026-07-14）

- 实现后的残留语义扫描发现，L3 / L5 / map、面向人的 docs 以及 Claude 平台 guide 直接复制或解释了同一套旧调度规则；如果只改上述五个入口，build 生成物仍会出现平台间冲突。
- 因此把这些“同一调度概念的持久副本”纳入 WP-01，作为语义一致性修复，不另行扩展产品能力。
- 原 Non-goals 保持不变：不改模型配置、不做 benchmark SOP、不固化浏览器阈值、不 install / commit / push。

## Context Boundary

- 这是一组语义高度耦合的规则：模板、Codex guide、case skill、Execute phase 和当前 Agent Entry 必须使用同一套定义。
- 为避免多个 Agent 分别改写后产生措辞漂移，本工作包由 Main 连续执行。
- 每个文件只读取和修改调度相关段落；不全量重写，不处理无关 dirty diff。
- 验证时先做定向 `rg` 和 `git diff -- <files>`，再运行 AIPD build。

## Work Package Draft

### WP-01：应用 Main / Child 收益判定规则

- **目标**：将已确认的调度模型同步到五个持久规则入口。
- **执行者**：Main Agent。
- **理由**：规则高度耦合、上下文规模可控、需要统一措辞；拆 Child 不会产生上下文隔离或并发净收益。
- **不做**：模型配置、benchmark SOP、浏览器详细状态机、install。
- **验收**：Acceptance Criteria 全部满足，定向 diff 无无关覆盖，build 通过。

## Readiness Gate

- 阻塞级 open requirement：无。
- 未确认假设是否被固化：否；浏览器阈值和模型 A/B 已明确 deferred。
- brownfield delta：已定位。
- 文件边界：已明确。
- Work Package：一个高耦合、可验收目标包，不按文件拆微步骤。
- Verify 入口：定向语义检查、局部 diff、AIPD build。

**Gate：passed**

## Checkpoint

- **当前节点**：Design Readiness Gate。
- **节点状态**：passed。
- **已确认**：需求、非目标、brownfield delta、文件边界和单一 Work Package 草案。
- **open / assumed**：浏览器异常阈值、模型 A/B 和 token 门槛 deferred，不阻塞。
- **Design 当时停止点**：尚未创建正式 Work Package，尚未修改源码；后续 Execute 已完成。
- **下一步**：用户确认进入 Execute 后，创建 WP-01，由 Main 连续实现并 build；build 后询问 install。
- **恢复入口**：本文件与 `case.md#Design-摘要`。

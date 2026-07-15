# Case: c2-subagent-origin-model

> **本次事项目标**：重写 AIPD2 分身 Agent 使用心智模型，让协作逻辑从规则派工转向克隆体、局部探索分支和结果回流。

## 1. 目标

- **心智模型重写**：把分身 Agent 定义为 Main Agent fork 出来的克隆体，不再沿用旧“子 Agent 派工”语义。
- **默认策略修正**：重新评估 Codex 默认 `fork_context` 取舍，避免 `fork_context: false` 把协作退化成显式状态机。
- **协议落地**：同步更新 Agent Entry、Codex agent guide、case-run 和相关核心说明，让未来 Agent 从源头理解为什么要用分身 Agent。
- **经验回流**：把用户在财务项目会话中提出的穿越/平行世界类比抽象为 AIPD2 框架经验，不写入业务细节。

## 2. 上下文索引

> 执行时优先读这些，不全量扫描项目。

### 项目认知

- `_adoc/index.md` - AIPD2 仓库自身的项目认知入口。
- `_adoc/L1-intent/intent.md` - AIPD2 方向和当前短期取舍。
- `_adoc/L5-dev/index.md` - Codex 分身 Agent 与 case-run 当前研发约束。
- `_adoc/case/c1-role-codex-custom-agents/case.md` - 上一轮刚固化 `fork_context: false` 的背景和冲突来源。

### 框架源码入口

- `src/core/agent-entry/template.md` - 未来项目生成 `AGENTS.md` 的核心入口。
- `src/core/agent-guide.md` - 平台无关的多 Agent 抽象说明。
- `src/core/overview.md` - AIPD 总体介绍中的多 Agent 哲学。
- `src/platforms/codex/core/agent-guide.md` - Codex 平台分身 Agent 调度策略。
- `src/skills/aipd2-case-run/SKILL.md` - case-run 派发分身 Agent 的流程说明。
- `src/skills/aipd2-case-create/SKILL.md` - 创建 case 时对分身 Agent 调研和草案生成的使用说明。

### 原始经验来源

- `/Users/yangzongru/.codex/sessions/2026/05/11/rollout-2026-05-11T12-20-10-019e1543-923e-73c1-ab90-9925067072da.jsonl` - 只读取关于分身 Agent、token、克隆体、穿越/平行世界类比的用户消息。

## 3. 本次边界

### 要做

- 把“穿越到未来再回流结果”的类比压缩成可复用的 AIPD2 分身 Agent 协作模型。
- 修正 Codex 默认分身 Agent 策略，使克隆体成为默认认知，显式上下文成为校准和恢复机制。
- 明确结果回流格式：只回流结论、依据、风险、建议、改动文件和验证结果，不回流过程噪声。
- 更新当前 case 状态，让本事项可以从文件恢复。

### 不做

- 不写入财务项目业务细节。
- 不重新设计 Claude / Codex 的完整平台抽象。
- 不改历史 archive。
- 不把分身 Agent 使用写成大量 if-else 场景规则。

## 4. 约束

- **Philosophy**：优先修改源头心智模型，让 Agent 自发向正确行为发散，而不是靠状态机式边界枚举控制行为。
- **Codex**：`fork_context: true` 的价值是同源继承当前认知；case / step 文件用于校准、恢复和压缩后续跑。
- **Context**：主 Agent 保护的是主线连续性，分身 Agent 消耗的是分支过程成本。
- **Context**：只读取本 case 上下文索引及 step 明确要求的文件，除非执行中发现必要缺口。

## 5. Step 列表

- [x] `steps/wp-01-rewrite-agent-entry.md` - 重写 Agent Entry 的分身 Agent 模型（推荐 Agent：worker）
- [x] `steps/wp-02-update-codex-case-run.md` - 更新 Codex 平台指南和 case-run 派发逻辑（推荐 Agent：worker）
- [x] `steps/wp-03-sync-core-overview.md` - 同步核心 overview / agent-guide / L5 认知并检查冲突（推荐 Agent：worker）

## 6. 验收标准

- [x] `src/core/agent-entry/template.md` 不再把 `fork_context: false` 作为 Codex 默认策略。
- [x] Codex agent guide 明确分身 Agent、克隆体和结果回流模型。
- [x] case-run 不再要求主 Agent 把所有上下文重新写进 prompt，而是区分同源继承、显式校准和压缩恢复。
- [x] 相关文档保留 case / step 作为长期事实来源的价值，但不把它误写成分身 Agent 的唯一任务源。
- [x] 分身 Agent 被描述为 AIPD 项目通用能力，不是 case-run 专属能力；case 模式只强调以 step 为节点。
- [x] 文档没有回写财务项目业务细节。

## 7. 经验沉淀位置

- `_adoc/L5-dev/index.md` - AIPD2 当前 Codex 分身 Agent 策略。
- `src/core/agent-entry/template.md` - 未来项目安装后的默认 Agent Entry。
- `src/platforms/codex/core/agent-guide.md` - Codex 平台派发规则。
- `src/skills/aipd2-case-run/SKILL.md` - case-run 执行协议。
- 相关 step 执行记录 - 本次模型修正过程。

## 8. 归档状态

- **状态**：已归档
- **创建时间**：2026-05-11
- **归档时间**：2026-06-16

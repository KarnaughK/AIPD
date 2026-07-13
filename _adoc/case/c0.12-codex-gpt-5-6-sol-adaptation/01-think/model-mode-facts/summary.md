# 分支：模型与 reasoning 模式事实边界

## Branch goal

核验“GPT-5.6 / sol / 高 / 极高”的当前官方表述和本地可观察事实，避免把聊天推断当作内部机制。

## Trigger

来自 Case Contract；模型选择结论必须有事实边界。

## Scope / stop condition

- 先查新鲜 Codex manual 与本地配置 / 会话元数据，再按需查官方 OpenAI 文档。
- 只使用官方 OpenAI 来源支撑公开产品事实；精确 UI / 灰度标签找不到时以 bounded uncertainty 收口。
- 能回答“哪些能确定、哪些不能确定、用户应如何基于可观测结果决策”后停止。

## Evidence

### 官方公开事实

| 档位 | 内部值 | 官方含义 |
|---|---|---|
| High | `high` | 为复杂问题增加推理深度 |
| Extra High | `xhigh` | 为复杂问题提供更高推理深度 |
| Max | `max` | 为最难问题提供最大单任务推理深度 |
| Ultra | Codex 产品预设；本地存为 `ultra` | 最大推理 + automatic task delegation / subagents |

- [Codex Models](https://learn.chatgpt.com/docs/models) 明确说明：更高推理更慢、使用更多 token；应从默认 effort 开始，只在复杂任务需要时升级。Ultra 适合可以拆成独立子任务的大型任务。
- [Codex Subagents](https://learn.chatgpt.com/docs/agent-configuration/subagents) 明确说明：每个 child 独立做模型和工具工作，因此多 Agent 比同类单 Agent 运行消耗更多 token；Ultra 可以主动委派；主线程通常等待所有请求结果后再整合。
- [GPT-5.6 model guidance](https://developers.openai.com/api/docs/guides/latest-model) 对 API raw reasoning effort 只列 `none / low / medium / high / xhigh / max`。从 GPT-5.5 迁移时，先保留原 effort 做基线，再比较低一档；High / xhigh 只有测得质量增益才使用，Max 留给最难质量优先任务。
- 同一 guidance 的内部评测称：用最小 prompt 替代冗长 system prompt，得分约提高 10-15%，总 token 降低 41-66%，成本降低 33-67%；重 prompt 会诱发额外探索、重复验证和更大累计上下文。
- [GPT-5.6 Sol 发布说明](https://openai.com/index/previewing-gpt-5-6-sol/) 把 `max` 与 `ultra` 分开：Max 是更深推理，Ultra 是跨单 Agent 的子 Agent 编排。

### 当前客户端 / 会话可观察事实

- `~/.codex/config.toml:1-2`：当前全局为 `model = "gpt-5.6-sol"`、`model_reasoning_effort = "ultra"`，且 `service_tier = "default"`。
- `~/.codex/models_cache.json:7-35`：Sol 本地支持 low / medium / high / xhigh / max / ultra；Ultra 的本地描述是 `Maximum reasoning with automatic task delegation`。
- 当前 root transcript 的 turn context 记录 `gpt-5.6-sol / ultra / multi_agent_mode: proactive`。
- 本轮 3 个普通 child 也继承 `gpt-5.6-sol / ultra`，并且都使用 `fork_turns="all"`。
- 当前简中客户端把 `xhigh` 和 `ultra` 都显示为“极高”；Ultra 另有“更快消耗使用额度”的提示。这解释了用户看到两个“极高”的困惑，但后续 AIPD 文档应始终写内部值，避免依赖本地化标签。
- AIPD 已有 3 个 custom Agent 仅固定 `model_reasoning_effort = "high"`，未固定 model；普通 generic child 会继承 parent 的 Sol Ultra。

### 不能确认

- 官方没有说 Ultra 固定生成多套方案做横向比较。它会做自动委派，但拆分方式可能是按证据面、模块、验证角色或候选方案，受任务、prompt、AGENTS / skill 和运行时共同影响。
- 今天的样本不能证明“Sol 模型本身一定比 GPT-5.5 High 慢”，因为同时混入 Ultra、AIPD 强调子 Agent、全量 fork、工具调用和任务复杂度差异。
- 本地 token accounting 包含大量 cached input，不能直接等同于新鲜 token 或精确额度扣减；但官方确认多 Agent 总 token 通常更高。

## Conclusion

- `Ultra` 应被 AIPD 建模为“最大推理 + 调度模式”，不是普通的下一档纯 reasoning effort。
- 用户关于“它会多开工作线，所以慢且更耗 token”的方向判断基本正确；但“固定多套方案横向对比”需要改写为“自动委派多个子 Agent，具体拆分不固定”。
- 不建议全局默认 Ultra。用户此前的 GPT-5.5 High 迁移基线应先是 GPT-5.6 Sol High，并与 Medium 做同任务对照；若日常更看重速度，可增加 Terra Medium / High 作为工作模型。
- xhigh / max 适合复杂但不易并行的单一问题；Ultra 只用于至少有两个真正独立工作流、且允许后台运行几分钟的任务。

## Return to

`../think.md` 的模型使用选项比较与决策结论。

## Invalidates

已确认不能把“极高固定横向生成多套方案”作为后续规则前提；应以“Ultra 自动委派”替代。

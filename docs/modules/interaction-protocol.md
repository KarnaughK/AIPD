# Interaction Protocol

当你希望项目里的 Agent 明确区分“先讨论”与“现在执行”，并对讨论回复的结构和长短有稳定约定时查这篇。

Interaction Protocol 是可选的项目级对话协议，不是项目认知入口。它只在初始化时明确选择 Agent MD 等级 2 后写入 `AGENTS.md`。

## Agent MD 的三个等级

`aipd` 初始化会先询问项目希望怎样处理根 Agent Entry：

| 等级 | 安装内容 | 适合情况 |
|---|---|---|
| 0 | 不修改 `AGENTS.md` | 项目已有完整入口，或暂时不希望 AIPD 接管第一跳 |
| 1 | AIPD Project Entry | 默认推荐；规定 gate、Map-first、Case 恢复和权限边界 |
| 2 | Entry + Interaction Protocol | 除等级 1 外，再安装讨论 / 执行回复协议 |

等级 1 和 2 都通过独立标记区块追加或更新，不覆盖 `AGENTS.md` 中的项目自有内容。Update 会保留当前等级证据，不会自动把项目升级到等级 2。

## 它约束什么

协议先区分用户当前是在讨论还是已经给出执行指令：

- 讨论方案、提出疑问、比较取舍或明确说“先聊聊”时，只讨论，不改文件。
- 给出明确的小范围修改、运行或验证指令时，进入执行模式。
- 执行边界不清时先短问，不猜着扩大修改。

讨论 / 分析类回复使用一条稳定生成顺序：

```text
我理解 -> 展开说说 -> 结论 -> 横向拓展 -> 下一步
```

“我理解”只复述当前目标和边界，不提前给结论；“展开说说”提供会影响结论的依据和取舍；“横向拓展”最多给少量相邻方向；“下一步”只给一个最自然的向下动作。

执行类回复不套这五段。它按工作流自然更新：开始时说正在读什么，修改前说准备改哪里，完成后简短交付改动、验证和风险。

## 它不约束什么

- 不替代 `_aipd/index.md`、`_aipd/map.md` 或五类 Knowledge。
- 不改变 Case Contract、phase Gate、Work Package 或外部副作用权限。
- 不要求简单事实回答也机械写成五段。
- 不要求默认长答；只有用户明确要求详细展开、方案或报告时才扩写。
- 用户当前指令或更高优先级平台规则可以覆盖它。

## 和 Agent Entry 的关系

[Agent Entry](agent-entry.md)回答“Agent 进入项目后先读什么、怎样恢复、权限边界在哪里”。Interaction Protocol 回答“Agent 怎样与你对话、何时从讨论切换到执行”。

两者可以同时装进 `AGENTS.md`，但分别使用独立标记区块，也可以只安装 Entry。

当前协议事实源：

- `aipd-skill/src/core/agent-entry/interaction-style.md`
- `aipd-skill/src/skills/aipd/SKILL.md`

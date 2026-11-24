# Interaction Protocol

当你希望项目里的 Agent 明确区分“先讨论”与“现在执行”，并对讨论回复的结构和长短有稳定约定时查这篇。

Interaction Protocol 是可选的项目级对话协议，不是项目认知入口。它只在初始化或 Update 时明确选择「AIPD + 五段式回复」或「AIPD + 四段式回复」模板后写入 `AGENTS.md`。

## Agent MD 的四种模板

`aipd-init` 初始化会处理根 Agent Entry：空项目先询问模板，有代码路径默认「纯 AIPD」。已接入项目也可随时通过 `aipd-update` 在模板间互切。

| 模板 | 安装内容 | 适合情况 |
|---|---|---|
| 不修改 `AGENTS.md` | 不写入 | 项目已有完整入口，或暂时不希望 AIPD 接管第一跳 |
| 纯 AIPD | AIPD Project Entry | 有代码项目默认推荐；规定 gate、Map-first、Case 恢复和权限边界 |
| AIPD + 五段式回复 | Entry + 五段式 Interaction Protocol | 希望结论简短、依据放「展开说说」、相邻方向放「横向拓展」 |
| AIPD + 四段式回复 | Entry + 四段式 Interaction Protocol | 希望「我理解」常驻做语音纠偏、「结论」高密度直出决策依据、其余收拢到「可继续聊」按需追问 |

后三种模板都通过独立标记区块追加或更新，不覆盖 `AGENTS.md` 中的项目自有内容。常规 Update 会保留当前模板，不会擅自切换；用户明确要求换模板时（即便项目已是最新版本），`aipd-update` 支持在「纯 AIPD / AIPD + 五段式回复 / AIPD + 四段式回复」之间原子互切。

## 它约束什么

两套回复协议都先区分用户当前是在讨论还是已经给出执行指令：

- 讨论方案、提出疑问、比较取舍或明确说“先聊聊”时，只讨论，不改文件。
- 给出明确的小范围修改、运行或验证指令时，进入执行模式。
- 执行边界不清时先短问，不猜着扩大修改。

### 五段式回复

讨论 / 分析类回复按以下固定顺序生成：

```text
我理解 -> 结论 -> 下一步 -> 展开说说 -> 横向拓展
```

“我理解”只复述当前目标和边界；“结论”直接给最终答案；“下一步”只给一个最自然的向下动作。前三段足以决定是否继续推进。后两段可以不读：“展开说说”交代结论依据，发现结论或下一步站不住时明确改口；“横向拓展”最多给少量相邻方向。明显简单问答可自然短答。

### 四段式回复

非执行类的问答、讨论、分析、判断与方案比较统一按以下四段生成（简单问答也保留「我理解」做语音输入纠偏，仅纯寒暄/单句确认或点名追问术语时例外）：

```text
我理解 -> 结论 -> 下一步 -> 可继续聊
```

“我理解”用 1–2 句复述问题与边界；“结论”扩大为高密度决策区，直接给出最终判断、最少必要事实/取舍依据和关键风险前提；“下一步”只给一个最自然的向下动作；“可继续聊”合并收拢深挖细节、相邻延伸与生词词条（`[深挖]` / `[延伸]` / `[术语]`），默认只列标题或词条、不展开，按需点名追问。

### 执行类回复

两套协议在执行类回复上一致：不套讨论格式，按工作流自然更新——开始时说正在读什么，修改前说准备改哪里，完成后简短交付改动、验证和风险。

## 它不约束什么

- 不替代 `_aipd/index.md`、`_aipd/map.md` 或五类 Knowledge。
- 不改变 Case Contract、phase Gate、Work Package 或外部副作用权限。
- 不要求默认长答；只有用户明确要求详细展开、方案、报告，或点名展开「可继续聊」某一项时才扩写。
- 用户当前指令或更高优先级平台规则可以覆盖它。

## 和 Agent Entry 的关系

[Agent Entry](agent-entry.md)回答“Agent 进入项目后先读什么、怎样恢复、权限边界在哪里”。Interaction Protocol 回答“Agent 怎样与你对话、何时从讨论切换到执行”。

两者可以同时装进 `AGENTS.md`，但分别使用独立标记区块，也可以只安装「纯 AIPD」。

当前协议事实源：

- 五段式：`aipd-skill/skills/aipd-init/references/agent-entry/interaction-style.md`、`aipd-skill/skills/aipd-update/references/agent-entry/interaction-style.md`
- 四段式：`aipd-skill/skills/aipd-init/references/agent-entry/interaction-style-4part.md`、`aipd-skill/skills/aipd-update/references/agent-entry/interaction-style-4part.md`

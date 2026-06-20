# Think -> Case Create Handoff 与 Skill 边界设计

> Step: `s5-handoff-and-skill-boundary`  
> 时间：2026-06-20  
> 范围：基于 s3 边界矩阵和 s4 Think 对象设计，定义 Think 转 Case Create 的交接 schema、各出口文件落点，以及未来 `aipd-think`、`aipd-case-create`、`aipd-weave`、`aipd-inbox` 的职责边界。本文只做设计，不修改 skill，不创建正式模板。

## 结论先行

Think -> Case Create 的核心不是“把聊天复制进 case”，而是把前置讨论压缩成一份稳定 handoff，让 Case Create 可以从明确的 why / what / not doing / evidence / risks 出发，继续做执行规划。

推荐链路：

```text
Think active
-> outcome: Create
-> decision.md 记录 Create 决策
-> handoff.md 交接稳定输入
-> 用户显式确认进入 Case Create
-> aipd-case-create 读取 handoff.md
-> case.md / steps / validation plan
```

关键边界：

- `aipd-think` 负责“是否值得做、做什么、做到什么程度、还缺什么信息”。
- `aipd-case-create` 负责“已决定推进后，如何规划架构、上下文索引、steps 和验收”。
- Case Create 不再承担开放式立项前决策，但仍保留执行规划讨论能力。
- `aipd-weave` 只处理 Think 中已经稳定的认知，不把 Think research 原始资料直接写入长期 ADOC。
- `aipd-inbox` 仍是低承诺 capture；用户要 AI 主动澄清时才升级 Think。

## Think -> Case Create Handoff Schema 草案

`handoff.md` 是 Case Create 的输入，不是 `case.md` 的替代品。它只保存已经足够稳定、可以交给规划阶段使用的前置判断。

### 必填字段

```md
# Think -> Case Create Handoff: {标题}

## 1. 来源

- Think ID：
- Think 入口：
- Decision 入口：
- Handoff 生成时间：
- 当前出口：Create

## 2. Create 结论

- 一句话目标：
- 为什么要做：
- 为什么现在做：
- 不做什么：
- 用户确认状态：已确认 / 待确认

## 3. 目标和成功标准

- 目标用户 / 使用场景：
- 成功标准：
- 最小可行范围：
- 明确非目标：

## 4. 关键依据

- 讨论依据：
- Research 依据：
- Options 依据：
- 已排除方案：

## 5. 推荐方向

- 推荐方案：
- 备选方案：
- 取舍理由：
- 需要保留的设计原则：

## 6. 风险和未知

- 可在 Case 中管理的风险：
- Case Create 前必须确认的问题：
- 可以作为 case 风险继续推进的问题：
- 不应在本 case 解决的问题：

## 7. 上下文入口建议

- ADOC 入口：
- L3 / L4 / L5：
- 局部 README / 代码入口：
- 外部资料入口：
- 兜底搜索关键词：

## 8. Case Create 建议

- 建议 case 名：
- 建议 case 类型：
- 建议边界：
- 建议 step 方向：
- 建议验收口径：
- Weave Candidate：
```

### 字段含义

| 字段组 | Case Create 如何使用 | 不应该如何使用 |
|---|---|---|
| 来源 | 恢复 Think 事实源，必要时回看 decision / research | 不把完整 Think 过程复制进 case |
| Create 结论 | 判断是否已经具备执行倾向 | 不重新讨论“要不要做” |
| 目标和成功标准 | 写入 case 目标、边界和验收草案 | 不直接当作最终 steps |
| 关键依据 | 保留前置取舍，避免反复争论已排除方案 | 不把未验证假设写成事实 |
| 推荐方向 | 作为 Case Create 的规划起点 | 不替代架构设计和上下文检索 |
| 风险和未知 | 区分必须先问清的问题与可进入 case 管理的风险 | 不把所有未知都包装成执行 step |
| 上下文入口建议 | 帮 Case Create 更快命中 L3 / L4 / L5 / 代码入口 | 不替代 map-first 检索 |
| Case Create 建议 | 作为 case 草案输入 | 不要求 Case Create 机械照抄 |

### 进入 Case Create 的最低条件

`handoff.md` 可以生成，但进入 Case Create 必须显式确认。最低条件：

- `decision.md` 或 `think.md` 明确当前出口为 `Create`。
- 一句话目标和非目标已经能写清。
- 至少有一个推荐方向或最小可行范围。
- 已排除方案、关键风险和待确认问题有记录。
- 仍缺的信息不会阻止 Case Create 开始规划，或已经列为必须确认项。
- 用户或上层流程确认“进入 Case Create”。

如果这些条件不满足，仍应停留在 Think 的 Continue / Research / Defer，而不是让 Case Create 补完立项前决策。

## 出口文件落点和后续动作

### 总表

| 出口 | 必要文件落点 | 后续动作 | 是否进入 Case |
|---|---|---|---|
| Continue | 更新 `think.md` | 记录当前问题、下一轮澄清点和待用户确认项 | 否 |
| Research | 更新 `think.md`；创建或更新 `research.md` / `research/` | 定义 research questions、资料层级、成功标准；按需派发只读调研分身 | 否 |
| Create | 更新 `think.md`；创建 `decision.md` 和 `handoff.md` | 等用户确认后启动 Case Create；Case Create 读取 `handoff.md` | 是，需确认 |
| Kill | 创建或更新 `decision.md`；归档到 `archive/` | 记录 kill reason、排除依据、避免重复触发关键词 | 否 |
| Defer | 创建或更新 `decision.md`；短期留 `active` 且 `status: paused`，长期归档 | 记录 defer reason、触发条件、重新评估信号 | 否 |
| Weave | 更新 `decision.md` 或 `think.md` 的 Weave Candidate | 调用 `aipd-weave` 判断归属；完成后可继续 Think 或归档 | 否 |

### Continue

落点：

- `think.md` 的“当前判断 / 下一步 / 过程摘要”。
- `_adoc/think/index.md` 中保持 `status: active`，`current_exit: Continue`。

后续动作：

- 继续与用户澄清目标、场景、用户、非目标和当前疑问。
- 不生成 `decision.md` 和 `handoff.md`，除非出现明确出口。

### Research

落点：

- `think.md` 记录当前出口为 `Research`。
- `research.md` 记录研究目标、问题、资料层级、资料清单、综合结论。
- `research/` 存并行分身调研报告。

后续动作：

- Research 必须服务当前 Think 的关键未知点。
- 研究完成后回到 Continue / Create / Kill / Defer / Weave。
- 不创建 Case step；Think 阶段的研究不是执行 step。

### Create

落点：

- `decision.md` 记录 outcome、理由、信心、风险和后续动作。
- `handoff.md` 记录 Case Create 的稳定输入。
- `_adoc/think/index.md` 进入 Decided / Pending Handoff 区。

后续动作：

- 等用户明确确认后启动 `aipd-case-create`。
- Case Create 读取 `handoff.md`，再按 map-first 加载项目上下文并创建 case。
- 创建 case 后，在 Think 的 `think.md` / `decision.md` 中补 `related_case`。

### Kill

落点：

- `decision.md` 记录 `outcome: Kill`、kill reason、排除依据、重复触发关键词。
- 移动到 `_adoc/think/archive/{YYYY}/`。
- `_adoc/think/index.md` 的 Archive 区登记。

后续动作：

- 不创建 case。
- 如果 kill 理由形成稳定原则，输出 Weave Candidate。
- 后续同类想法触发时，优先检索 kill reason，避免重复消耗。

### Defer

落点：

- `decision.md` 记录 `outcome: Defer`、延后原因、触发条件、重新评估信号。
- 短期可恢复的 Defer 保持在 `active/`，`status: paused`。
- 长期延后或阶段外事项归档到 `archive/{YYYY}/`，index 保留触发条件。

后续动作：

- 不进入 Case Create。
- 可以关联 OKR / backlog / inbox，但不自动迁移。
- 当触发条件出现时，恢复该 Think 或创建新的 Think，并引用旧决策。

### Weave

落点：

- `think.md` 或 `decision.md` 的 `Weave Candidate`。
- 不直接写 L1-L5，不直接写 map。

后续动作：

- 进入 `aipd-weave`。
- Weave 判断稳定性、层级归属、索引需求和旧知识冲突。
- Weave 完成后，Think 可以继续讨论，也可以归档。

### Continue 与 Research 不是失败状态

Think 的价值不是快速进入 Case，而是提高决策质量。`Continue` 和 `Research` 都是合法中间状态；`Kill` 和 `Defer` 是有效产出；只有 `Create` 才进入执行系统。

## 未来 `aipd-think` Skill 边界

### 只做什么

`aipd-think` 应只做前置讨论和决策对象维护：

- 判断用户是否在提出模糊想法、要不要做、陌生领域、方案不清或任务定题需求。
- 创建或恢复 Think 对象。
- 维护 `think.md`、`research.md`、`research/`、`options.md`、`decision.md`、`handoff.md`。
- 围绕关键未知点做讨论、调研问题设计、方案比较和决策出口判断。
- 必要时派发只读 research 分身，回流结论、证据、风险、建议和资料路径。
- 在出口为 Create 时生成 handoff。
- 在出口为 Kill / Defer / Weave 时记录理由和后续动作。
- 产出 Weave Candidate，但不自行写长期 ADOC。

### 不做什么

`aipd-think` 不应做：

- 不执行代码修改、构建、测试、安装。
- 不创建正式 case，除非用户确认进入 Case Create，并由 `aipd-case-create` 执行。
- 不拆正式执行 step。
- 不把 research 原始资料直接写入 L2 / L3 / L4 / L5。
- 不把所有普通聊天强制落成 Think 对象。
- 不把 Inbox 条目自动升级为 Think。
- 不替代 SOP；可重复研究流程可以沉淀为 SOP，但具体想法的决策状态仍是 Think。
- 不替代 Weave；只输出候选，不判断最终长期知识归属。

### 创建 Think 的触发阈值

建议 `aipd-think` 支持“先聊，达到阈值再落文件”：

- 用户明确说 Think / 讨论任务 / 要不要做 / 前置判断 / 定任务。
- 讨论超过一轮且需要恢复。
- 需要外部调研或并行研究。
- 出现多个方案并需要取舍。
- 出现 Create / Kill / Defer / Research / Weave 等出口判断。
- 用户要求把讨论状态保存下来。

轻量闲聊不应自动创建 Think；否则 `_adoc/think/` 会变成聊天垃圾箱。

## `aipd-case-create` 读取 Think Handoff 的方式

### 启动时增加 handoff 检查

当用户从 Think 进入 Case Create，或用户指定 `handoff.md` 时，Case Create 应先读取：

```text
Think handoff.md
-> decision.md
-> think.md
-> handoff 中列出的 research / options 入口（按需）
-> _adoc/index.md
-> _adoc/map.md
-> L3 / L4 / L5 / README / L6
```

读取顺序的原因：

- handoff 是进入规划阶段的直接输入。
- decision / think 只用于核对前置结论和风险，不用于重放完整讨论。
- map-first 仍然必须执行，因为 handoff 只是建议入口，不替代项目上下文检索。

### Case Create 不要再问什么

如果 handoff 已写清，Case Create 不应重复追问：

- 这个想法是否值得做。
- 为什么不是 Kill / Defer。
- 已排除方案为什么排除。
- Research 已经回答过的关键事实。
- 非目标和最小范围是否存在。
- 是否要进入执行规划，除非 handoff 的用户确认状态仍是“待确认”。

### Case Create 仍然要讨论什么

为避免 s3 风险，Case Create 不能被削成机械生成器。它仍要保留规划讨论：

- case 类型和场景分流是否正确。
- 架构边界、模块边界和上下文索引怎么设计。
- 哪些 L3 / L4 / L5 / README / L6 必须读。
- step 粒度是否合适。
- 验收标准和验证方式是否足够。
- handoff 中哪些风险要变成 case 风险，哪些必须先问用户。
- handoff 中的建议方案是否需要根据真实项目上下文调整。

一句话边界：

```text
Case Create 退出“是否值得做”的开放式前置决策，但保留“已经决定做以后怎么规划”的方案讨论。
```

### Case 文件如何引用 handoff

建议 Case Create 在 `case.md` 中新增或复用以下位置：

- 目标：引用 handoff 的一句话目标。
- 场景分流：说明本 case 来自 Think Create 出口。
- 上下文索引：保留 handoff 路径和 Think 相关文档作为来源。
- 本次边界：吸收 handoff 的非目标和已排除方案。
- 风险边界：吸收 handoff 的风险与未知。
- Weave 候选：吸收 handoff 中的稳定认知候选。

示例：

```md
## 来源 Think

- Think：`_adoc/think/active/t0.1-example/think.md`
- Decision：`_adoc/think/active/t0.1-example/decision.md`
- Handoff：`_adoc/think/active/t0.1-example/handoff.md`
- Think 出口：Create
```

## `aipd-weave` 处理 Think 稳定认知的方式

### Think 作为来源类型

`aipd-weave` 后续应把 Think 加入来源类型：

```text
当前讨论 / Think / step 结果 / case 归档 / 代码 diff / 错误日志 / 外部资料
```

Think 来源读取顺序：

```text
think.md
-> decision.md
-> handoff.md（如有）
-> research.md / options.md（只读相关摘要）
```

### 可 weave 的内容

Think 中可进入 Weave Candidate 的内容：

- 新核心概念、标准名、误解、对象关系。
- 新产品能力边界、用户可见行为、业务规则。
- 新工程规则、跨模块协作规则、工具链约束。
- 高频用户说法和 map 检索入口。
- 外部框架中已经被 AIPD 吸收为长期原则的机制。
- 被 Kill / Defer 后形成的稳定排除原则或触发条件。

### 不应 weave 的内容

不应直接 weave：

- 完整聊天过程。
- research 原始摘录和资料堆。
- 暂未验证的外部项目描述。
- 只服务当前 Think 的临时假设。
- 用户一时偏好但未形成长期规则的判断。
- options 中被排除但没有复用价值的细节。

### Weave 后如何回写 Think

如果 Weave 完成，Think 应记录：

- 哪些 Weave Candidate 已处理。
- 写入了哪些 ADOC / map / README。
- 哪些候选被判定为只留 Think。
- 是否影响当前 Think 的出口。

这可以写在 `decision.md` 或 `think.md` 的过程摘要里，不需要 Think 自己改长期 ADOC。

## 与 `aipd-inbox` 的边界

Inbox 只 capture，不主动澄清。后续可补整理规则：

- 用户只是“先记一下 / 先存一下” -> Inbox。
- 用户说“我们来想清楚 / 讨论值不值得做 / 定一下任务” -> Think。
- Inbox 整理时发现条目需要主动澄清 -> 建议升级 Think，但不自动迁移。
- Think 如果只是发现一个未判断资料源，也可以把它作为 research candidate 留在 Think，不必回写 Inbox。

Inbox 到 Think 的迁移应保留来源：

```text
related_inbox: "_adoc/inbox.md#2026-xx-xx-xxx"
```

## 需要修改的文件清单

后续实现 case 可按以下文件分组推进。

### 新增能力

- `aipd-skill/src/skills/aipd-think/SKILL.md`：新增 Think 主 skill。
- `aipd-skill/src/core/think/templates/index.md`：Think index 模板。
- `aipd-skill/src/core/think/templates/think.md`：Think 主文件模板。
- `aipd-skill/src/core/think/templates/research.md`：可选研究模板。
- `aipd-skill/src/core/think/templates/options.md`：可选方案比较模板。
- `aipd-skill/src/core/think/templates/decision.md`：可选决策模板。
- `aipd-skill/src/core/think/templates/handoff.md`：Create handoff 模板。

### 路由和索引

- `aipd-skill/src/skills/aipd/SKILL.md`：把 Think / 前置判断 / 要不要做 / 定任务路由到 `aipd-think`。
- `_adoc/map.md`、`_adoc/L3-core/map.md`、`_adoc/L4-product/map.md`：实现后补正式入口和恢复链路。
- `_adoc/index.md`：实现后补 `_adoc/think/` 读取入口。

### 边界更新

- `aipd-skill/src/skills/aipd-case-create/SKILL.md`：增加读取 handoff 的流程；收窄“与用户讨论事项”为“已决定推进后的规划讨论”。
- `aipd-skill/src/skills/aipd-weave/SKILL.md`：增加 Think 来源类型和 Think Weave Candidate 处理规则。
- `aipd-skill/src/skills/aipd-inbox/SKILL.md`：增加“主动澄清则升级 Think”的整理建议。
- `aipd-skill/src/core/agent-entry/template.md`：实现稳定后补 Think 恢复链路。

### ADOC 稳定认知

- `_adoc/L3-core/index.md`：补充 Think 文件化原则、handoff 边界。
- `_adoc/L3-core/horizontal-capabilities.md`：补充出口文件落点和 skill 关系。
- `_adoc/L4-product/index.md`：补充 AIPD Think 模式和用户可见行为。
- `_adoc/L4-product/map.md`：补充 Think / Case Create 的用户说法分流。

## 后续实现 Case 建议

建议单独创建实现 case，不把实现塞回当前调研设计 case。

### 建议 case 名

```text
c1.x-aipd-think-skill-implementation
```

### 建议目标

实现 AIPD Think 最小闭环：新增 Think skill、Think 模板、入口路由、handoff -> case-create 读取规则、weave 来源规则，并更新 ADOC / map。

### 建议 step

1. **创建 Think 模板和目录初始化规则**
   - 新增 core think templates。
   - 支持 `_adoc/think/index.md`、`active/`、`archive/`。
   - 不一次性创建全量重型文件。

2. **实现 `aipd-think` skill**
   - 支持创建 / 恢复 Think。
   - 支持 Continue / Research / Create / Kill / Defer / Weave 出口。
   - 支持生成 decision / handoff。
   - 禁止执行代码和创建 case。

3. **更新 `aipd` 总入口路由**
   - 用户说 Think / 讨论任务 / 要不要做 / 前置判断 / 定任务时路由。
   - 普通聊天不强制 Think。

4. **更新 `aipd-case-create`**
   - 支持读取 handoff。
   - 保留规划讨论能力。
   - 在 case.md 中记录来源 Think。

5. **更新 `aipd-weave` 和 `aipd-inbox`**
   - Weave 支持 Think 来源。
   - Inbox 整理时建议升级 Think。

6. **更新 ADOC / map / Agent Entry**
   - 补正式恢复链路。
   - 补用户说法路由。
   - 补 Think 与 Case / Weave / Inbox 边界。

7. **验证最小流程**
   - Light Think -> Kill。
   - Research-heavy Think -> Research -> Defer。
   - Think -> Create -> Case Create 读取 handoff。
   - Think -> Weave Candidate -> Weave 方案。

## 风险清单

| 风险 | 表现 | 缓解 |
|---|---|---|
| Think 过重 | 每个想法都生成一堆文件 | 默认只创建 `think.md`，按出口渐进生成 |
| Think 变聊天存档 | 保存完整对话，无法检索 | 只写状态、摘要、依据、问题和出口 |
| Case Create 被削弱过头 | 无法做架构和 step 规划讨论 | 明确只移出“是否值得做”，保留“怎么规划” |
| 自动滑向执行 | Think 一出 Create 就创建 case | Create handoff 可生成，但进入 Case Create 必须显式确认 |
| Research 泛化 | 变成无边界行业报告 | Research questions 必须绑定当前决策缺口 |
| Weave 过早 | research 摘录直接进长期 ADOC | Think 只输出候选，Weave 再判稳定性 |
| Inbox 混同 Think | 所有暂存都进入主动澄清 | Inbox 只 capture；用户要求主动思考才升级 |
| handoff 变 case 替代品 | 在 Think 阶段提前拆 step | handoff 只交接 why / what / evidence / risks / context suggestions |
| 旧 case-create 文案冲突 | “与用户讨论事项”继续触发立项前开放讨论 | 后续实现中改为“已决定推进后的规划讨论” |
| 用户只想聊不想落文件 | 过早文件化增加负担 | 支持先聊，超过阈值再创建 Think 对象 |

## Weave 候选

- L3 Core：Think 的 Create handoff 是前置决策到执行规划的稳定交接对象；它不替代 case。
- L4 Product：AIPD Think 的用户可见出口应包含 Continue / Research / Create / Kill / Defer / Weave。
- L4 Product：Case Create 的边界应调整为“已决定推进后的规划讨论”，不是“要不要做”的开放式决策讨论。
- Skill 边界：`aipd-think` 不执行代码、不创建 case、不直接写长期 ADOC；`aipd-case-create` 读取 handoff 后继续做 map-first 上下文检索和 step 规划。

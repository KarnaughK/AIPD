# AIPD Think 边界矩阵

> Step: `s3-aipd-boundary-comparison`  
> 时间：2026-06-20  
> 范围：基于 s1 OpenSpec、s2 同类框架调研和当前 AIPD 文档，明确 Inbox / Think / Case / SOP / Weave 的边界。本文只做边界比较，不设计最终 Think 对象结构。

## 结论先行

AIPD 需要把“信息放哪里”从模糊经验变成可判断的边界规则。

最核心的区分是承诺度和对象类型：

```text
Inbox = 我先收下，但不承诺推进
Think = 我开始主动澄清这个想法，并形成决策出口
Case = 已决定要做，开始规划和执行
SOP = 这不是一次事项，而是一套可重复运行的 Agent 程序
Weave = 这不是流程状态，而是稳定认知回写
```

OpenSpec 的 `/opsx:explore` 证明“创建 change 前先探索”是必要环节，但它默认不创建 artifacts，也没有 Kill / Defer / Weave 这类一等出口。Spec Kit、Kiro、Cline 和 BMAD 则分别证明 clarify、requirements analysis、Plan/Act 边界和 analysis phase 都有价值。AIPD 的差异点应是：Think 不是临时聊天，也不是 Case 子目录，而是 Case 之前的一等决策对象。

## 一句话边界

| 对象 | 一句话定义 | 核心问题 |
|---|---|---|
| Inbox | 低承诺度收件箱 | 这条信息先别丢，回头再判断 |
| Think | 模糊想法的澄清和决策对象 | 这件事要不要做、做什么、还缺什么 |
| Case | 已决定事项的规划和执行容器 | 这件事怎么做、怎么拆、怎么验收 |
| SOP | 可重复执行的 Agent 原生程序 | 这个动作以后如何重复跑 |
| Weave | 稳定认知回写机制 | 哪些新知识应进入长期 ADOC 或 map |

## 边界矩阵

| 维度 | Inbox | Think | Case | SOP | Weave |
|---|---|---|---|---|---|
| 承诺度 | 最低，只 capture | 中等，承诺主动澄清和决策 | 高，承诺进入规划 / 执行状态 | 高，承诺可复用执行流程 | 高，承诺维护长期知识库 |
| 典型输入 | 灵感、链接、待整理材料、临时提醒 | 模糊想法、陌生领域、要不要做、方案不清 | 已决定要推进的事项、明确目标、Think handoff | 重复动作、固定流程、工具调用链 | 稳定结论、规则、路径、踩坑、外部资料吸收 |
| 默认输出 | 一条 inbox 条目和待判断问题 | 决策出口：Create / Kill / Defer / Research / Weave / Continue | `case.md`、steps、上下文索引、验收标准、执行记录 | SOP README / map、输入输出、步骤、工具和收尾 | L3 / L4 / L5 / README / map 的更新方案和修改 |
| 文件位置 | `_adoc/inbox.md` | 规划中的 Think 对象；当前 case 只产出设计 | `_adoc/case/{case}/` | `_adoc/sop/{sop}/` 和 `_adoc/sop/map.md` | 写回 `_adoc/L*`、局部 README、map 或 case / step |
| 生命周期 | 待整理，可删除、迁移或保留 | 从模糊到决策，可能不进入执行 | 从创建、执行、验收到归档 | 长期复用，按实践迭代 | 按稳定知识需要触发，非长期流程对象 |
| 是否可执行 | 不可执行 | 不执行代码；可派发只读调研 | 可执行；Case Run 推进 step | 可执行；作为复用程序运行 | 不执行开发 step，只回写知识 |
| 是否调研 | 不主动调研 | 可以调研，尤其 Research / Deep Research | 只做和执行规划相关的上下文检索 | 可以把调研作为 SOP 步骤 | 可以吸收外部资料形成稳定知识 |
| 是否创建 step | 不创建 | 不创建执行 step；Create 出口后交给 Case Create | 创建 step | 不以 step 为主体；某次 SOP 执行可进入 case / step | 不创建执行 step |
| 是否进入长期知识 | 不直接进入 | 只有稳定结论通过 Weave 进入 | 执行过程留 case；稳定知识作为 Weave Candidate | SOP 本身可长期存在；执行经验可 Weave | 直接维护长期知识 |
| 常见误用 | 把 inbox 当待办列表或长期知识库 | 把 Think 当普通聊天，或自动滑向 Case | 把开放式讨论包装成 step | 把单次判断或独立脚本当 SOP | 把聊天全文、临时过程或未验证判断写进长期 ADOC |

## 信息归属速查

| 信息 / 场景 | 默认归属 | 判断理由 |
|---|---|---|
| “这个链接先存一下，回头再看” | Inbox | 用户只要求暂存，没有承诺推进 |
| “我有个想法，想聊聊值不值得做” | Think | 需要澄清、比较和决策，不应直接创建 case |
| “我决定做桌面端，请帮我拆 case” | Case Create | 已经有执行倾向，进入规划 |
| “这个流程以后每周都要跑一次” | SOP | 重点是重复执行程序，而不是单次事项 |
| “这次调研形成了 AIPD 的长期原则” | Weave | 稳定认知需要进入 L3 / L4 / map |
| “客户提了一个 bug，要修” | Case 或普通开发 | 如果范围小可普通开发；若需恢复状态和拆 step，建 Case |
| “这里有个产品方向，但我不确定用户要不要” | Think | 需要 Research / PRFAQ / options，不应先拆 step |
| “调研发现一个同类框架，暂时不知道有无价值” | Inbox 或 Think Research | 只暂存进 Inbox；如果已经围绕议题调查，进入 Think research |
| “执行完 step 后发现新的跨模块工程规则” | Weave Candidate | 过程留 step，稳定规则走 Weave |
| “把查关键词这套动作固化下来” | SOP | 可复用动作，包含输入、步骤、工具和输出 |

## 典型场景分流

### 1. 低承诺捕获

```text
用户：这个想法先记一下，回头再整理。
归属：Inbox
```

处理原则：

- 只保留来源、原始记录和待判断问题。
- 不自动分析是否值得做。
- 不创建 case、不拆 step、不 weave。

### 2. 模糊想法澄清

```text
用户：我想做桌面端，但我不熟悉桌面端，也怕 AI 直接做烂。
归属：Think
```

处理原则：

- 先讨论目标、用户、场景、替代方案和不确定点。
- 对陌生技术可进入 Research 出口，派发只读调研。
- 结束时应有明确状态：Create / Kill / Defer / Research / Weave / Continue。

### 3. 已决定执行

```text
用户：这个方向确定要做，帮我建 case 并拆 step。
归属：Case Create
```

处理原则：

- Case Create 不再负责“值不值得做”的开放讨论。
- 它承接 Think 的决策摘要或用户明确决定，开始写目标、边界、上下文索引、steps 和验收。
- 如果执行过程中发现目标不成立，应回到 Think 或新建 Think，而不是在 Case Create 中无限讨论。

### 4. 可重复动作沉淀

```text
用户：以后每次做 SEO 站点前，都按这套方法查关键词。
归属：SOP
```

处理原则：

- SOP 记录目标、输入、步骤、工具、输出和收尾。
- 它不是单次 case，也不是稳定知识正文。
- 某次 SOP 运行可以创建 case；运行后产生的稳定知识再交给 Weave。

### 5. 稳定知识回写

```text
用户：这次 Think 里形成了一个稳定原则，写回 AIPD。
归属：Weave
```

处理原则：

- Weave 判断写到 L3 / L4 / L5 / README / map / SOP / case 哪个位置。
- 只写稳定结论、边界、依据和入口。
- 不把完整讨论记录和临时推理链写入长期 ADOC。

### 6. Think 内部发现稳定认知

```text
Think 讨论中发现：Case Create 必须收窄为执行规划。
归属：Think 先记录，稳定后触发 Weave
```

处理原则：

- 讨论过程仍属于 Think。
- 一旦形成跨多个未来任务都适用的规则，输出 Weave Candidate。
- 由 Weave 决定回写位置，避免 Think 直接污染长期知识库。

## 误用反例

| 误用 | 为什么错 | 正确做法 |
|---|---|---|
| 把“先记一下”的灵感直接写入 L3 | 稳定性未判断，会污染核心模型 | 先放 Inbox，整理时再判断 |
| 一听到“我想做某功能”就创建 case | 可能还没判断值不值得做，过早承诺执行 | 先进入 Think，必要时 Research / Defer / Kill |
| 在 Case Create 里持续开放式讨论产品方向 | Case Create 会膨胀成聊天容器，边界失效 | 开 Think；Case Create 只承接清晰执行倾向 |
| 把 Think 的调研材料直接 weave 到 L2 | 调研资料未必稳定，可能只是当前决策素材 | 先留 Think；稳定结论再 Weave |
| 把某次 step 的执行日志做成 SOP | 一次过程不等于可复用程序 | 只有重复动作才进入 SOP |
| 把一段脚本单独放 SOP | SOP 主体是 Agent 程序，不是脚本仓库 | 若脚本需要固定 Agent 分析、输入输出和收尾，才建 SOP |
| 把 Weave 当聊天存档 | 长期知识库会被过程噪声淹没 | Weave 只沉淀稳定结论；过程留 Think / Case |
| Think 自动创建 case | 讨论阶段会天然滑向执行，低价值任务无法被 kill | Create 出口必须显式确认 |
| 用 Inbox 管理所有候选任务 | Inbox 只 capture，不做推进状态 | 需要主动澄清就升级 Think；决定执行才建 Case |

## Case Create 与 AIPD Think 的边界

### Think 负责什么

Think 负责进入执行前的开放区：

- 需求是否真实存在。
- 用户是谁，场景是什么。
- 为什么现在做。
- 替代方案是什么。
- 是否需要外部调研、竞品调研或技术路线调研。
- 有哪些方案、风险、约束和非目标。
- 当前最合理出口是 Create、Kill、Defer、Research、Weave 还是 Continue。

Think 的目标是减少低质量 case，提升 Case Create 的输入质量。

### Case Create 负责什么

Case Create 只负责已决定要推进后的规划区：

- 把目标、背景、边界和上下文索引写进 case。
- 根据 map 和相关文档定位 L3 / L4 / L5 / README / L6。
- 设计架构、执行路径、step、验收标准和 Weave Candidate。
- 把“怎么做”变成可恢复、可派发、可验收的 case。

Case Create 不应继续承担：

- “这个需求是否值得做”的长期讨论。
- 陌生领域的泛调研。
- 多轮产品方向探索。
- Kill / Defer 这类非执行决策。
- 深度竞品 / 论文 / 博客调研。
- 没有执行倾向的 PRD 式探索。

### 交接判断

从 Think 进入 Case Create，至少应满足：

- 目标已经能用一句话描述。
- 为什么做和不做什么已经初步清楚。
- 已排除的方案或关键风险有记录。
- 仍缺的信息不影响开始规划，或已明确作为 case 风险。
- 用户或 Think 决策出口明确为 Create。

如果这些条件不满足，应继续 Think 或 Research，而不是让 Case Create 承担补洞。

## Think 与 Inbox 的承诺度差异

Inbox 和 Think 的区别不是内容复杂度，而是承诺度。

| 维度 | Inbox | Think |
|---|---|---|
| 用户意图 | “先存一下” | “我们来想清楚” |
| 系统承诺 | 不丢失 | 主动推进澄清与决策 |
| 是否提问 | 默认不追问 | 可以追问、拆问题、提方案 |
| 是否调研 | 不主动调研 | 可触发 Research / Deep Research |
| 是否有状态 | 条目级待整理 | 决策状态和出口 |
| 是否可派发分身 | 通常不需要 | 可派发只读调研分身 |
| 是否需要结论 | 不需要 | 需要当前判断或下一步状态 |
| 失败成本 | 条目堆积 | 讨论失焦、状态膨胀、错误进入执行 |

一个判断规则：

```text
用户只是怕忘记 -> Inbox
用户想让 AI 帮他想清楚 -> Think
```

另一个判断规则：

```text
没有主动推进承诺 -> Inbox
有主动澄清和决策承诺 -> Think
```

## Think 的出口触发规则

| 出口 | 何时触发 | 产物含义 |
|---|---|---|
| Continue | 问题还不清楚，但值得继续聊 | 保留当前讨论状态和下一批问题 |
| Research | 关键未知点阻碍判断 | 派发或记录调研问题，调研服务当前 Think |
| Create | 目标清晰且值得执行 | 交给 Case Create 规划 |
| Kill | 方向不成立或收益不值得成本 | 记录 kill reason，避免重复消耗 |
| Defer | 值得做但不是现在 | 记录延后条件、触发信号和可能归属 |
| Weave | 产生稳定认知但不形成事项 | 输出 Weave Candidate，长期归属交给 Weave |

Research 和 Weave 的区别：

- Research 是为了当前 Think 的决策继续收集证据。
- Weave 是把已经稳定的新认知回写长期知识库。

Create 和 Defer 的区别：

- Create 表示现在进入执行规划。
- Defer 表示暂不占用执行系统，但保留未来触发条件。

Kill 和 Inbox 的区别：

- Inbox 是还没判断。
- Kill 是已经判断不做，并记录原因。

## 需要更新的 ADOC / Skill 边界候选

这些只是 s3 候选，是否修改留给后续 s4 / s5 / Weave：

- `_adoc/L3-core/horizontal-capabilities.md`：可补一张 Inbox / Think / Case / SOP / Weave 边界矩阵的稳定版。
- `_adoc/L4-product/map.md`：可把 “讨论任务 / 值不值得做 / 从模糊到清晰” 明确路由到 AIPD Think，而不是 Case Create。
- `aipd-skill/src/skills/aipd-case-create/SKILL.md`：后续应收窄描述，把“与用户讨论事项”限定为已决定推进后的规划讨论，不承担 Think 的开放式决策。
- `aipd-skill/src/skills/aipd-inbox/SKILL.md`：可补“想让 AI 主动澄清时升级 Think”的整理规则。
- `aipd-skill/src/skills/aipd-weave/SKILL.md`：可补 Think 结果作为来源类型，但仍坚持只回写稳定认知。
- 未来 `aipd-think`：应硬性声明不执行代码、不默认创建 case、不直接写 L1-L5，除非通过 Weave。

## 对 s4 的输入

s4 设计 Think 对象与状态流转时，应继承以下边界：

- Think 与 Case 同层，不放在 Case 目录下。
- Think 的状态重点不是任务进度，而是决策出口。
- Think 内可以有 Research，但 Research 必须服务关键未知点。
- Think 可以产生 Weave Candidate，但不直接写长期 ADOC。
- Think -> Case Create 必须有显式 Create 出口。
- 轻量 Think 和 Deep Research Think 的文件结构可以不同，避免每次讨论都生成重型目录。

## 风险与缺口

- 本报告只做边界比较，不设计最终文件结构；`_adoc/think/` 是否存在、目录结构如何命名留给 s4。
- Case Create 现有 skill 文案仍包含“与用户讨论事项”，后续修改时要小心：不能让 Case Create 完全失去规划讨论能力，只是要退出“要不要做”的开放区。
- SOP 与 Think 都可能调用调研，但二者对象不同：SOP 是重复流程，Think 是一次想法的决策状态。后续文案需要防止用户把 Deep Research SOP 和 Think Research 混同。
- Weave 可能被过早触发。Think 中的调研素材不应因为“看起来有价值”就直接进入 L2/L3，必须先判断稳定性和复用性。

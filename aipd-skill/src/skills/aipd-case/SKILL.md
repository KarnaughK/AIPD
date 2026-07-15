---
name: aipd-case
description: >
  推进 AIPD case 的统一入口。按 case 当前 phase 渐进加载 Think / Design / Execute / Verify / Close 文档，完成短周期目标闭环。
  关键词：case、目标、边界、think、design、execute、verify、close、工作包、需求契约、回跳、复杂度爆点、上下文解耦
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
  - Agent
  - AskUserQuestion
inject-from-core:
  - overview.md
  - case/overview.md
  - case/phases/*
  - case/templates/case.md
  - case/templates/work-package.md
  - case/workers/*
  - experience/*
  - agent-guide.md
  - agent-guides/*
---

# AIPD Case

`aipd-case` 是 AIPD case 的统一入口。它把目标契约、思考、设计、执行、验收和关闭收敛为一个渐进式 case 生命周期：

```text
Case Contract -> Think -> Design -> Execute -> Verify -> Close
```

Case 是一个马上要完成并最终关闭的短周期目标容器。它类似 OKR，都先定目标并连接大方向上下文；但 OKR 面向长期周期和复盘，Case 面向当前目标的设计、执行、验收和归档。

Case 有默认主线，但不是单向瀑布。后续节点发现上游缺口时，可以带原因回跳：Design 可以回 Think 补调研 / 实验，Execute 可以回 Design 修正方案，Verify 可以回需求契约或 Design 补验收口径。每次回跳都必须写清触发原因、更新了哪个 artifact、哪些下游设计或 work package 受影响。

`Goal` 不再是独立 phase。目标、边界、验收标准和上下文索引是整个 case 的契约，直接写在 `case.md` 顶部的 `Case Contract`。后续所有 phase 都必须以这个契约为上下文；执行中迭代出的“暂时做什么 / 暂时不做什么 / 完成标准变化 / 边界变化”也回写到 `case.md` 的契约区或边界变更记录。

## 总原则

- 一个 skill 负责整个 case 生命周期，不为每个 phase 新增独立 skill。
- 每个 phase 有独立说明文档，进入对应 phase 时才加载。
- `case.md` 是事实源，包含 `Case Contract` 和 `Case Runtime`：前者记录目标、边界、验收标准和上下文索引；后者记录 `Current Phase`、phase 状态、当前焦点、待确认项、设计摘要、工作包摘要、执行记录和关闭状态。
- `case.md` 每次进入 case 都必须读取；phase 目录只承载展开材料，不重复承载目标契约。
- Case ID 使用项目内单调递增的 `cN-slug`，不是版本号；Work Package 使用 Case 内局部的 `wp-NN-slug`，跨 Case 引用写作 `cN/wp-NN`。不要新建 `cA.B` 或 `cA.B.N` 形态。
- 新建 case 必须使用 contract + phase-first 目录结构，不再生成顶层 `doc/` / `steps/`，也不再生成 `01-goal/`：`01-think/`、`02-design/`、`03-execute/`、`04-verify/`、`05-close/`。
- Work Package 只放在 `03-execute/work-packages/`。遇到旧 `steps/` 或旧 Goal phase 结构时，不做兼容运行，只提示用户是否迁移为当前结构。
- Step 不再表示“先做 A 再叠 B”的微步骤，而是可验收 work package。一个 work package 可以包含多个横向模块。
- Agent 需要目标、架构边界、上下文和验收口径，不需要被指挥先迈哪条腿。
- Think 是调研、实验、数据采样、方案比较和证据沉淀的探索工作台，可以被 Design / Execute / Verify 回跳触发。
- Design 是从需求契约到可执行方案的流程：需求和规则 -> brownfield delta -> 后端 / 前端设计 -> 上下文解耦 -> work package -> readiness gate。
- Design 内部默认按逐节点协作推进。用户说“一步一步走 / 继续吧 / 按你说的步骤来”时，只表示确认当前建议的下一节点，不表示授权一次性跑完整个 Design 清单。
- Design 节点如果会固化需求、业务规则、API、数据模型、状态机、UI 主路径、组件边界、文件边界或 work package，必须输出判断和待确认项后停下，等用户确认再进入下一节点。
- 复杂度爆点、最小必要解耦和文件 / 文件夹级边界仍是 AIPD 的关键增量，但不应跳过需求、规则和事实源直接进入目录设计。
- Case 推进遵循文件优先 checkpoint：聊天只是运行缓存，case / phase / work package 文件才是事实源。每个会影响恢复路径的小步确认、状态变化、调研边界、设计决策、phase 跳转、work package 派发或执行结果，都应先写回文件，再进入下一步。
- checkpoint 的判断标准是恢复价值，不是内容大小。压缩后丢失会影响后续方向的信息要落文件；不改变状态的解释、闲聊和未采纳想法不要膨胀文档。

## 入口流程

### 1. 恢复项目和 case 状态

每次进入 `aipd-case`，先读取：

1. `_adoc/index.md`
2. `_adoc/map.md`
3. `_adoc/case/index.md`

如果用户指定 case，读取指定 case。若未指定且只有一个进行中 case，默认使用该 case。若有多个候选 case，先询问用户选择。

读取目标 case：

```text
_adoc/case/{case-dir}/case.md
```

如果目标 case 仍是旧结构（例如存在顶层 `doc/`、`steps/`，或仍使用 `01-goal/` 到 `06-close/` 的旧 Goal phase 结构），停止当前推进，不读取旧 `steps/` 继续执行，只提示：

```text
检测到这是旧结构 case。新 AIPD Case 不再兼容旧 steps/doc 或独立 Goal phase 运行逻辑。是否需要先把它迁移为当前 contract + phase-first case？
```

如果还没有 case，先创建 `case.md` 的 `Case Contract`，写清目标、边界、验收标准和上下文索引；然后根据是否存在未知或架构缺口，把 `Current Phase` 设为 `Think` 或 `Design`。

恢复已有 case 后，不要首轮直接跨 phase 写回。先输出状态卡：文件事实、用户当前认知、冲突点、当前 phase 条件、建议下一步。关键 phase 跳转必须先确认，再写回 case。

### 2. 判断当前 phase

读取 case.md 中的：

```md
## Case Contract
...

## Current Phase
{Think / Design / Execute / Verify / Close}

## Phase State
- Think: ...
- Design: ...
- Execute: ...
- Verify: ...
- Close: ...
```

只加载当前 phase 对应文档：

| Phase | 说明文档 | 作用 |
|---|---|---|
| Think | `@references/case/phases/think.md` | 信息不足时进行同步、调研、代码实验、数据采样、比较和抉择 |
| Design | `@references/case/phases/design.md` | 从需求契约到后端 / 前端设计，再到上下文边界、文件边界、work package 和 readiness gate |
| Execute | `@references/case/phases/execute.md` | 按工作包推进，可用目标模式和执行 Agent |
| Verify | `@references/case/phases/verify.md` | 验收目标、设计约束和执行结果 |
| Close | `@references/case/phases/close.md` | 归档、整理 Close 归档候选、更新索引 |

不要一次加载所有 phase 细则。只有当当前 phase 完成并切换到下一 phase 时，再加载下一份文档。

### 2.5 读取实践经验索引

读取当前 phase 文档后，检查 `@references/experience/index.md`。实践经验是与 case phase 并列的上下文维度，不为 Think / Design / Execute 各维护一份独立索引。

如果索引里有和当前 phase、技术栈、领域或任务类型匹配的经验，读取对应经验正文；如果没有命中，只说明未命中，不要为了补齐索引临时发明经验。

常见命中：

- Think phase：领域调研、SEO 数据、深度搜索、信息获取策略。
- Design phase：Vue / Nuxt / Next 等代码实践经验、上下文边界、文件结构、框架扫描机制。
- Execute phase：工具链、迁移、批量验证或调试经验。

### 3. 推进当前 phase

按当前 phase 文档推进。每个 phase 都必须明确：

- 当前要回答的问题。
- 本 phase 的输入。
- 本 phase 的输出。
- 是否需要写入 case.md 或对应 phase 目录。
- 下一 phase 的进入条件。
- 本轮是否需要 checkpoint：若接下来要进入大调研、长执行、子 Agent 派发、phase 跳转或用户确认后的下一节点，先把当前问题、确认结论、open / assumed、停止条件、返回位置和下一步游标写入 case.md 或对应 phase artifact。

如果当前 phase 是 Design，还必须明确当前 Design 节点和停止点。除非用户明确要求一次性完成多个 Design 节点，否则每次只推进一个节点，并在节点结束后等待用户确认下一步。

若当前 phase 内容太长，不要把全过程塞进 case.md。把展开材料写到对应 phase 目录：

```text
_adoc/case/{case-dir}/case.md
_adoc/case/{case-dir}/01-think/think.md
_adoc/case/{case-dir}/01-think/{research-or-decision-branch}/summary.md
_adoc/case/{case-dir}/02-design/design.md
_adoc/case/{case-dir}/02-design/decision-log.md
_adoc/case/{case-dir}/03-execute/execute.md
_adoc/case/{case-dir}/03-execute/work-packages/{work-package}.md
_adoc/case/{case-dir}/04-verify/verify.md
_adoc/case/{case-dir}/05-close/close.md
```

case.md 保留 Case Contract、Case Runtime、压缩后的 phase 摘要和链接，不承载 phase 展开过程。

### 4. 更新 case 状态

每个 phase 完成后，必须更新 case.md：

- `Case Contract` 中发生变化的目标、边界、验收标准或不做范围。
- `Current Phase`
- `Phase State`
- 当前 phase 的结论摘要
- 新增或更新的 work packages
- Close 归档候选
- 阻塞和待确认项

Case 状态以文件为准，不依赖聊天记忆。

进入下一步前，如果本轮已经改变目标边界、当前焦点、设计节点、调研分支、work package 状态、验收口径或 Close 候选，必须至少写回一个可恢复 checkpoint。checkpoint 可以很短，但必须让压缩后的 Agent 能判断“现在在哪里、为什么在这里、下一步回哪里”。

### 5. 执行和 Agent 调度

进入 Execute phase 后，先把 Work Package 视为状态与验收边界，再按项目 Agent Entry 的运行时判定选择 Main 或 Child。任务类型、文件数量和推荐 Agent 字段本身都不强制派发。

- 内聚、高耦合、上下文规模可控的 Work Package 可以由 Main 连续完成。
- 高噪声上下文隔离、两条以上独立并发工作线或必要独立复核有明确净收益时，优先 Child。
- 决定派发且平台支持时，创建 Child；平台不可用时由 Main 回退执行。用户明确要求不派 Child 时，遵循用户当前指令。
- 派发时默认最小上下文、single-owner evidence 和压缩回流；Main 不重复执行相同证据面。
- 浏览器新流程、异常状态或路径不确定时，先与用户沟通再继续，不无边界深入或盲目绕路。

Agent 调度不扩大 case / work package 边界，也不替代 install、远端写入、删除等真实外部副作用的确认。

Main 或 Child 的执行入口都是 `03-execute/work-packages/` 下的 work package 文件和 case.md。决定派发后，prompt 只传文件路径、已选择角色、边界和返回格式，不复制长正文。

### 6. 旧入口处理

`aipd-case-create`、`aipd-case-run`、`aipd-case-archive` 已废弃，不再作为可构建 skill。用户提到这些旧命令时，说明它们已经合并进 `aipd-case`：

- 创建或讨论 case：先写 `case.md` 的 Case Contract，再进入 Think / Design。
- 执行 case：进入 Execute。
- 归档 case：进入 Close。

不要为了旧命令保留兼容运行逻辑。旧 case 需要先迁移为当前 contract + phase-first case，再继续推进。

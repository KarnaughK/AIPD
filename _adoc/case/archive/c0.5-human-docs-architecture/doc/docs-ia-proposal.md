# AIPD2 Human Docs IA Proposal

> 所属 Case：`c0.5-human-docs-architecture`
> 所属 Step：`c0.5.1-design-human-docs-ia`
> 产出性质：目录和迁移策略草案，不是正式 `docs/` 内容。

## 1. 设计边界

### 已确认

- `README` 是 GitHub 首页 / 宣传页 / 落地页，负责让读者快速理解 AIPD2 为什么存在、解决什么问题、是否值得继续看。
- `docs/` 是面向人的学习文档，负责把 AIPD2 从 AI Coding 演进、项目知识库、执行组织到模块能力逐步讲清楚。
- `_adoc/` 是面向 Agent 的项目认知事实源，负责让 Agent 读取、检索、恢复和回写项目上下文。
- `src/` 是真实代码源码，包括 skill、模板、脚本和平台适配。
- `docs/` 不替代 `_adoc/`；`docs/` 帮人理解，`_adoc/` 帮 Agent 执行。
- 正式目录命名优先使用 `docs/guide/` 和 `docs/modules/`。

### 本提案建议

- 仓库目录仍命名为 `docs/`。这个名字对 GitHub、开源项目和人类学习文档都足够清晰，不需要另起 `handbook/`、`learn/` 或 `manual/`。
- `docs/` 首批只做两层：`guide/` 新手入门流程和 `modules/` 进阶模块说明。
- 不新增纯源码级 reference 层。源码细节交给 Agent 读取 `src/`、`_adoc/` 和就近 README。
- `guide/` 必须覆盖 case / step 的执行闭环，否则读者只会理解 AIPD2 的知识库部分。

### 待确认

- 是否在第一批 `docs/` 中加入图示，例如 AI Coding 演进图、L1-L6 存储结构图、map/case/weave 横向执行图。
- 是否先完整迁移旧 README，还是先写 `guide/` 的最小闭环，再补 `modules/`。
- `modules/` 章节粒度是否按本提案一次性铺开，还是先保留少量核心模块。

## 2. README / docs / _adoc 职责分工

| 位置 | 面向对象 | 核心作用 | 应保留内容 | 不应承担 |
|---|---|---|---|---|
| `README.md` | 第一次打开仓库的人 | 首页、定位、吸引继续阅读 | 问题背景、AIPD2 是什么、快速开始、核心能力概览、docs 入口、Agent 安装入口 | 完整教程、长表格、细节命令手册、完整模块说明 |
| `docs/guide/` | 新读者 / 准备使用的人 | 带读者走完最小心智闭环 | AI Coding 演进、项目知识库、L1-L5、map、weave、case/step 首次流程 | skill 源码细节、完整工程实现规则 |
| `docs/modules/` | 已理解入门闭环、想深入模块的人 | 按能力系统解释 AIPD2 | L1-L6、map 检索、上下文解耦、case/step、weave、agent entry、分身 Agent、skills | 作为 Agent 执行事实源 |
| `_adoc/` | Agent / AIPD2 自身项目认知 | 项目事实源、恢复锚点、长期上下文 | L1-L5、map、case、step、weave candidate、工程规则 | 面向新手的叙事教程 |
| `src/` | 开发者 / Agent | 真实实现源码 | skills、模板、脚本、平台适配、核心说明源 | 替代人类学习路径 |

首页和学习文档的分工建议是：README 讲“为什么你应该关心 AIPD2”，docs 讲“你如何逐步理解和使用 AIPD2”。旧 README 中的架构、skill、安装、开发和 Agent 模型细节应进入 docs 后按学习路径重组，而不是机械拆成同名章节。

## 3. 新手入门叙事路径

`guide/` 不应从术语定义开始。推荐按以下路径推进：

```text
Vibe Coding
-> Agent Coding
-> Agent 自己找上下文后的新问题
-> 项目需要长期知识库
-> L1-L5：知识怎么存
-> map：知识怎么读
-> weave：知识怎么更新
-> case / step：一次开发任务怎么组织、恢复、派发和验收
```

各段的认知作用：

| 阶段 | 要讲清的问题 | 进入下一段的理由 |
|---|---|---|
| Vibe Coding | 人负责找文件和喂上下文，AI 主要改局部代码 | 当 Agent 能自己搜索和执行后，人不再能只靠手工 @ 文件控制上下文 |
| Agent Coding | Claude Code、Codex、Cursor Agent 等开始自己搜索、读文件、跑命令 | Agent 能找上下文，但不代表它能稳定找到正确上下文 |
| 新问题 | 源码、零散 README、历史聊天和 PR 无法稳定承载原因、边界和取舍 | 需要专门给 Agent 读的长期项目知识库 |
| 项目知识库 | AIPD2 把方向、场景、核心模型、产品边界、工程规则和经验沉淀下来 | 读者需要知道这些知识按什么结构存 |
| L1-L5 | L1-L5 是项目认知存储结构，L6 是真实代码 | 存得好还不够，Agent 要能从自然语言读到正确入口 |
| map | map 是读取结构，把用户意图路由到 L3/L4/L5/局部 README/代码入口 | 读到了上下文，还需要知道新经验如何沉淀 |
| weave | weave 把稳定判断回写到 `_adoc/`、局部 README、map 或 case | 知识库解决项目记忆，但一次开发事项还需要执行容器 |
| case / step | case 固定目标、边界、上下文索引和验收；step 是可派发、可恢复、可验收的执行单元 | 完成 AIPD2 的最小心智闭环：项目记忆 + 任务执行组织 |

“两套源码 / AI 认知源码”建议放在读者理解 `_adoc/` 之后，作为升维总结：传统源码在 `src/` 和业务代码里，AI 认知源码在 `_adoc/` 里。它不适合作为新手第一章标题。

## 4. `docs/` 目录草案

### 推荐结构

```text
docs/
├── README.md
├── guide/
│   ├── 01-from-vibe-coding-to-agent-coding.md
│   ├── 02-why-project-memory.md
│   ├── 03-adoc-layers-l1-l5.md
│   ├── 04-map-retrieval.md
│   ├── 05-weave-project-memory.md
│   └── 06-first-case-flow.md
└── modules/
    ├── context-decoupling.md
    ├── adoc-layers.md
    ├── maps-and-retrieval.md
    ├── case-and-step.md
    ├── weave.md
    ├── agent-entry.md
    ├── clone-agents.md
    ├── skills-overview.md
    └── build-and-install.md
```

### `docs/README.md`

作用：给人类读者提供 docs 总入口和阅读路径，不重复 README 首页的宣传叙事。

建议内容：

- “第一次了解 AIPD2”读 `guide/`。
- “已经理解闭环，想查某个能力”读 `modules/`。
- “Agent 执行项目任务”读 `_adoc/index.md`、`_adoc/map.md` 和当前 case。

### `guide/` 新手入门流程

| 文件 | 目的 | 内容边界 |
|---|---|---|
| `01-from-vibe-coding-to-agent-coding.md` | 从 AI Coding 使用方式演进引出问题 | 讲 Vibe Coding 到 Agent Coding，不急着定义 AIPD2 |
| `02-why-project-memory.md` | 说明为什么需要项目知识库 | 讲源码和聊天记录无法稳定表达原因、边界、历史取舍 |
| `03-adoc-layers-l1-l5.md` | 说明知识怎么存 | 只讲 L1-L5 的入门版，不展开所有边界争议 |
| `04-map-retrieval.md` | 说明知识怎么读 | 讲 map 是读取结构，不是正文；自然语言如何命中上下文 |
| `05-weave-project-memory.md` | 说明知识怎么更新 | 讲哪些稳定信息值得回写，回写到哪里 |
| `06-first-case-flow.md` | 说明第一次开发任务怎么组织 | 讲 case、step、上下文索引、验收、恢复和分身回流 |

`first-case-flow` 放在 `guide/` 里是必要的，因为 AIPD2 不是单纯知识库；它还要让实际 AI 开发任务可恢复、可派发、可验收。

### `modules/` 进阶模块说明

| 文件 | 目的 | 必须覆盖 |
|---|---|---|
| `context-decoupling.md` | 单独解释上下文解耦 | 项目知识、任务边界、输入输出、验收口径和回写位置如何拆成相对独立黑箱；它和 map、case、step、weave 的关系 |
| `adoc-layers.md` | 展开 L1-L6 / OKR / Case / Step / Agent Entry 的纵向模块 | L1-L5 是存储结构；L6 是真实代码；不要把 L4/L5 写成纯代码索引 |
| `maps-and-retrieval.md` | 展开 Map / 检索系统 | 区分 L1-L6 通用认知 Map 与具体项目 / 技术栈 Map |
| `case-and-step.md` | 展开任务组织系统 | case-create、case-run、step 派发、恢复、验收和执行记录 |
| `weave.md` | 展开反向编织 | weave 与 learn 的分工；回写到 L3/L4/L5/局部 README/map/case 的判断 |
| `agent-entry.md` | 展开 Agent 进入项目后的读取规则 | AGENTS.md、_adoc/index.md、map、case 锚定恢复 |
| `clone-agents.md` | 展开分身 Agent 模型 | fork_context、主线保护、回流字段、不是低上下文工人 |
| `skills-overview.md` | 介绍 skill 能力系统 | aipd2、case-create、case-run、weave、learn、update、archive、git-push、mermaid 的职责 |
| `build-and-install.md` | 面向开发者和 Agent 的安装 / 构建说明 | Codex 优先、脚本入口、用户不必手工背命令、README-new 中 `_adoc/context-map.md` 与实际 `_adoc/map.md` 的入口不一致可在后续修正 |

## 5. Map / 检索系统的两类划分

进阶模块 `maps-and-retrieval.md` 应明确 Map 不是单个 `_adoc/map.md` 文件的同义词，而是一组读取结构。

| 类型 | 服务对象 | 作用 | 例子 |
|---|---|---|---|
| L1-L6 通用认知 Map | AIPD 通用认知结构 | 帮 Agent 判断任务应该读取 L1/L2/L3/L4/L5/L6、case、局部 README 中哪些上下文 | `_adoc/map.md`、L3 map、L4 map、L5 map |
| 具体项目 / 技术栈 Map | 具体项目类型和实现结构 | 帮 Agent 在某类项目里命中页面、组件、provider、数据流、接口和实现入口 | Vue 项目的 MMD 架构图、前端组件图、React / Node 项目的后续技术栈 map |

第一类更偏 AIPD 通用认知检索，第二类更偏具体项目实现检索。两者共同目标都是让 Agent 少猜、少乱翻、从用户自然语言更稳定地命中上下文。

## 6. 上下文解耦在 docs 中的位置

“上下文解耦”建议作为 `modules/context-decoupling.md` 的第一篇或前几篇进阶模块，而不是塞在 map 或 case 章节的小节里。

该章节至少应讲清：

- Agent 能自己找上下文以后，仍然需要显式项目知识库，因为源码和零散文档不能稳定表达历史原因、边界和取舍。
- case / step 是可恢复的任务上下文容器，不是普通 todo。
- map、case、step、weave 都在服务同一件事：让上下文关系显式、稳定、可读取、可回写。
- AIPD2 不追求把所有信息塞进一个超长提示词，而是通过分层存储、扁平检索和逐步回写降低上下文耦合。
- 上下文解耦不是文档整理技巧，而是 AI 执行速度变快以后，人把决策位置上移、让局部任务成为可验收黑箱的底层判断。

## 7. 推荐阅读路径

### 第一次了解 AIPD2

```text
README.md
-> docs/README.md
-> docs/guide/01-from-vibe-coding-to-agent-coding.md
-> docs/guide/02-why-project-memory.md
-> docs/guide/03-adoc-layers-l1-l5.md
-> docs/guide/04-map-retrieval.md
-> docs/guide/05-weave-project-memory.md
-> docs/guide/06-first-case-flow.md
```

### 已经理解入门闭环，想查模块

```text
docs/modules/context-decoupling.md
docs/modules/maps-and-retrieval.md
docs/modules/case-and-step.md
docs/modules/weave.md
docs/modules/clone-agents.md
```

### 要安装或修改 AIPD2 源码

```text
README.md
-> docs/modules/build-and-install.md
-> AGENTS.md
-> _adoc/index.md
-> _adoc/map.md
-> scripts/ 或 src/
```

人类读者可以读 docs；Agent 执行任务时仍应以 `AGENTS.md -> _adoc/index.md -> _adoc/map.md -> case/step` 为恢复链路。

## 8. 旧 README 迁移映射

| 旧 README 内容 | 建议去向 | 处理方式 | 理由 |
|---|---|---|---|
| 标题和一句话定位 | README 首页 | 改写保留 | 首页需要保留项目名和短定位，但应更像 README-new 的入口叙事 |
| “这是一个可构建的 skill 工程...” | README 首页 + `modules/build-and-install.md` | 首页保留轻量说明，细节迁移 | 首页只需说明仓库性质；构建细节进入 docs |
| “项目定位”长段 | `guide/02-why-project-memory.md`、`modules/context-decoupling.md` | 拆解改写 | 其中的问题背景适合 guide，和其他工具关系适合进阶或 FAQ |
| Superpowers / OpenSpec / Agent / AIPD2 对比表 | `modules/context-decoupling.md` 或后续 FAQ | 改写保留 | 对新手首页略重，但有助于进阶读者理解边界 |
| “分身 Agent 模型” | `guide/06-first-case-flow.md` + `modules/clone-agents.md` | 入门简化，进阶展开 | first case 需要理解分身回流；完整模型放进模块 |
| “项目结构” | README 首页 + `modules/build-and-install.md` | 首页保留短版，docs 展开 | 首页可保留仓库结构概览；脚本细节放进 docs |
| “包含的 Skill”表 | README 首页 + `modules/skills-overview.md` | 首页保留概览，docs 展开职责边界 | 首页让人知道有哪些能力，进阶解释每个 skill 怎么协作 |
| “安装”命令块 | `modules/build-and-install.md` | 迁移并改写 | README-new 已确认用户不应背命令；命令细节给开发者和 Agent |
| “开发”命令块 | `modules/build-and-install.md` | 迁移并改写 | 属于工程维护说明，不应挤在首页 |
| “_adoc 核心架构 / L1-L6 分层” | `guide/03-adoc-layers-l1-l5.md` + `modules/adoc-layers.md` | 入门版重写，完整表迁移 | 新手先理解存储结构，进阶再看完整边界 |
| “多 Agent 执行体系” | `modules/clone-agents.md` | 迁移展开 | 这是进阶能力，不应在首页占太多篇幅 |
| “Case 执行体系” | `guide/06-first-case-flow.md` + `modules/case-and-step.md` | 入门讲闭环，进阶讲完整机制 | guide 必须包含执行闭环 |

### 应留在首页的内容

- AIPD2 的一句话定位。
- 为什么 AI Agent 需要项目长期上下文。
- AIPD2 不是 Coding Agent，也不是重型通用开发纪律框架。
- 快速开始：让 Agent 打包安装，以及在目标项目使用 `/aipd2`。
- docs 入口和核心能力概览。
- 仓库结构短版。

### 应删减或改写的内容

- 手工安装命令不应作为首页主流程，可在首页降级为“开发者细节见 docs/modules/build-and-install.md”。
- 重复解释 L1-L6、case、step、分身 Agent 的段落应迁移到 docs，首页只保留一句到一段。
- 旧 README 中“项目结构”路径名 `AIPD/` 应在后续迁移时统一为当前仓库语境。
- `README-new.md` 当前提到 `_adoc/context-map.md`，但项目实际入口是 `_adoc/map.md`；后续 promote README 时应修正。

## 9. 后续可拆 step 建议

1. 创建正式 `docs/` 骨架与 `docs/README.md`，只写入口说明和阅读路径。
2. 写 `guide/` 首批 6 篇入门文档，先完成最小心智闭环。
3. 将旧 README 的 L1-L6、case、分身、skill、安装内容迁移 / 改写到 `modules/`。
4. 升级根 README：以 `README-new.md` 为基础，修正 `_adoc/map.md` 入口，补 docs 导航，删去过重细节。
5. 按用户确认决定是否补 Mermaid / MMD 图示，例如 AI Coding 演进、AIPD2 存储与读取结构、case/step 执行闭环。
6. 若 docs 成为稳定入口，评估是否回写 `_adoc/map.md`，增加“面向人类文档 / docs / README 分工”的检索入口。

## 10. 风险与待确认问题

### 风险

- 如果 `guide/` 第一章就解释 L1-L5、Case、Step，读者会像读术语字典，无法理解 AIPD2 为什么自然出现。
- 如果 README 继续承载完整安装、开发、模块、架构说明，它会重新膨胀成手册，削弱首页作用。
- 如果 `docs/` 只是旧 README 拆段，会丢失“Vibe Coding -> Agent Coding -> 项目知识库 -> 执行闭环”的学习路径。
- 如果 `docs/` 和 `_adoc/` 边界不清，后续 Agent 可能误把人类教程当成项目事实源。
- 如果第一批 `modules/` 铺得过大，后续迁移 step 可能变成大而散的写作任务。

### 待确认问题

- 第一批正式 docs 是否按本提案创建完整目录，还是先只创建 `docs/README.md` 和 `guide/` 6 篇。
- `modules/` 是否需要把 `build-and-install.md` 放入第一批，还是等 README promote 时再迁移。
- 是否需要新增 FAQ 或 comparison 章节，用来承接 Superpowers / OpenSpec / Agent / AIPD2 的关系。
- 是否需要图示；如果需要，优先画哪几张。
- 旧 README 是否在下一步直接被 `README-new.md` 替换并迁移，还是先保留双 README 到 docs 完成后再处理。

## 11. 自检

| 验收标准 | 结果 |
|---|---|
| 目录方案能让新读者先从架构层面理解 AIPD2，而不是一开始陷入细节 | 通过：`guide/` 从 AI Coding 演进进入项目知识库和执行闭环 |
| 方案明确说明 `docs/` 面向人，`_adoc/` 面向 Agent 项目认知，两者不互相替代 | 通过：第 2 节明确分工 |
| 方案没有把旧 README 机械拆段，而是按学习路径重组 | 通过：第 8 节按 guide/modules 和首页职责重新映射 |
| 产出能支持后续单独创建写作 / 迁移 step | 通过：第 9 节列出可拆 step |
| 未直接修改 README 或创建正式 `docs/` 内容 | 通过：仅创建本 proposal 文件 |

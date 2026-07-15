# Step: wp-01 - 设计面向人的 docs 信息架构

> **所属 Case**: c5-human-docs-architecture
> **类型**: research / design
> **推荐 Agent**: worker
> **依赖**: 无

## 目标

设计 AIPD2 面向人的 `docs/` 学习文档体系：给出渐进式目录、阅读路径、README / docs / _adoc 分工，以及旧 README 内容迁移策略。

## 已确认设计输入 / 执行依据

本区是用户已认可、且本 step 执行必须继承的设计判断。执行 Agent 不应依赖聊天记忆复原这些内容，也不应把它们压缩成无法恢复的关键词。

### 1. README / docs / _adoc / src 的角色分工

- **README**：GitHub 首页 / 宣传页 / 落地页。它首先要吸引人继续看，让人简单易懂地理解 AIPD2 的由来、为什么要做、解决什么时代问题，而不是上来写成说明书。
- **docs/**：面向人的学习文档。它应该像项目开发文档一样，帮助人逐步理解 AIPD2，由入门流程进入进阶模块说明。
- **_adoc/**：面向 Agent 的项目认知文档。它不是普通给人看的文档，而是 AIPD 产生的项目认知事实源，是 AI 开发时代“第二套源码”的候选心智模型。
- **src/**：真实代码源码，包括 skill、模板、脚本和平台适配。它是传统意义上的代码源码。

关键取舍：

- “两套源码 / AI 认知源码”是重要心智模型：一套是传统代码源码，一套是给 AI 看的项目认知源码。
- 但这个说法不适合放在新手入门第一步。读者应先理解为什么需要项目知识库，再在中后段用“两套源码”做升维总结。
- `docs/` 不替代 `_adoc/`；`docs/` 帮人理解，`_adoc` 帮 Agent 执行、恢复和回写。

### 2. docs 的两层结构

用户已确认：AIPD2 的人类学习文档不需要 Vue 那样完整的 tutorial / guide / API / source reference 多层体系，也不需要纯源码级对象说明。

本 case 的 `docs/` 先按两层设计：

- **新手入门流程**：像 Vue 的 tutorial / guide 一样带读者走完最小心智闭环。重点是“问题如何出现，AIPD2 如何自然长出来”，不是术语字典。
- **进阶模块说明**：入门之后，按模块 / 功能逐块说明每一块是什么、解决什么问题、和其他模块怎么协作。

不做第三层“纯源码级说明”。如果需要深挖对象、函数、脚本细节，交给 Agent 读取 `src/` 和 `_adoc/`。

### 3. 新手入门叙事路径

`docs/` 的新手入门不应从“什么是 AIPD2 / L1-L5 / Case / Step”这种说明书式定义开始，而应从 AI Coding 的使用方式演进讲起，让读者先理解问题是怎么出现的。

建议叙事路径：

```text
Vibe Coding：人 @ 文件，AI 改局部代码
-> Agent Coding：AI 开始自己搜索、读文件、找上下文
-> 新问题：源码和零散文档太乱，Agent 找上下文不稳定
-> 需要项目知识库
-> L1-L5：知识怎么存
-> map：知识怎么读
-> weave：知识怎么更新
-> case / step：实际开发任务怎么组织、恢复、派发和验收
```

每一步要承担的认知作用：

- **Vibe Coding**：说明早期 AI Coding 里，人还在负责找文件、喂上下文，AI 主要负责局部执行。
- **Agent Coding**：说明 Claude Code、Codex、Cursor Agent 等 Agent 出现后，AI 可以自己搜索、读文件、跑命令、定位问题。
- **新问题**：Agent 虽然能自己找，但它是在混乱源码、零散 README、历史聊天缺失的环境里找；它可能漏读、误读或只相信局部代码。
- **项目知识库**：引出 AIPD2 的核心需求：项目需要一套专门给 Agent 读的长期上下文，让 Agent 不只看到“现在怎么做”，还能看到“为什么这么做、边界在哪里、历史取舍是什么”。
- **L1-L5**：回答知识怎么存。L1 是方向，L2 是外部世界，L3 是核心模型，L4 是产品功能，L5 是工程规则，L6 是真实代码但不放进 `_adoc`。
- **map**：回答知识怎么读。用户给一句自然语言，Agent 先读 map，把意图路由到相关 L3 / L4 / L5 / 局部 README / 代码入口。
- **weave**：回答知识怎么更新。讨论、修 bug、step 结果、踩坑经验如果变成稳定判断，就回写到 L3 / L4 / L5 / map / 局部 README / case。
- **case / step**：回答实际开发任务怎么组织。知识库解决“项目记忆”，case / step 解决“这一次事项”的目标、边界、恢复、派发和验收。

关键取舍：

- 新手入门应该像 Vue 的 tutorial / guide 一样带读者走完最小心智闭环，不要一开始就做术语字典。
- 进阶模块说明再逐块解释 L1-L5、map、weave、case、step、Agent Entry、分身 Agent 等模块。

### 4. 逐层推进约束

设计 `docs/` 时必须一层一层向下推进，不要一次性把所有层级都展开成完整方案。

当前已确认的层级：

- 第一层：文档角色分工，已确认为 README / docs / _adoc / src 四类。
- 第二层：docs 的宏观结构，已确认先按“新手入门流程 + 进阶模块说明”两层设计。
- 第三层：新手入门流程的叙事方向，已确认从 AI Coding 演进讲起。
- 第四层：进阶模块说明优先按能力系统组织，而不是按 skill 命令或源码目录组织。

本 step 的产出可以继续往下推到 `docs/` 信息架构草案，但必须保留“哪些是已确认、哪些是建议、哪些待确认”的标记。不要把未讨论的后续章节细节写成用户已经确认的事实。

### 5. 已确认的进阶模块补充

进阶模块说明应覆盖 AIPD2 的能力系统。当前已确认两个重点补充：

#### Map / 检索系统

Map 系统就是 AIPD2 的检索系统，不能只讲“有一个 `_adoc/map.md`”。它至少要区分两类 Map：

- **L1-L6 认知层级 Map**：围绕 AIPD 的通用认知结构服务，帮助 Agent 判断一个任务应该读取 L1 / L2 / L3 / L4 / L5 / L6 中哪些上下文，以及应该从哪个项目记忆入口下钻。
- **具体项目 / 技术栈 Map**：围绕某个具体项目类型或技术栈服务。例如前端项目、Vue 项目、React 项目、Node 项目等。Vue 项目里已有的 MMD 架构图可以视为这类具体项目 Map 的一种形态，用来表达页面、组件、provider、数据流和实现入口。后续 React / Node 等项目也可能形成自己的 Map 结构。

进阶文档里要说明：第一类 Map 更偏 AIPD 通用认知检索，第二类 Map 更偏具体项目实现检索。两者都服务于“让 Agent 少猜、少乱翻、从用户自然语言更稳定地命中上下文”。

#### 上下文解耦

“上下文解耦”应作为进阶文档里的核心概念单独讲。

它不是单纯的文档整理技巧，而是 AIPD2 的底层判断之一：在 AI 执行速度变快以后，人不可能靠持续手工 @ 文件、补聊天背景、解释所有隐含关系来控制任务。更稳定的做法是把项目知识、任务边界、输入输出、验收口径和回写位置拆成相对独立的上下文黑箱。

进阶文档里至少要讲清：

- 为什么 Agent 自己找上下文后，仍然需要显式项目知识库。
- 为什么任务需要 case / step 这种可恢复的上下文容器。
- 为什么 map、case、step、weave 都是在服务“让上下文关系显式、稳定、可读取、可回写”。
- 为什么 AIPD2 不追求把所有信息塞进一个超长提示词，而是通过分层存储、扁平检索和逐步回写降低上下文耦合。

### 6. 已确认的目录命名与入门范围

正式 `docs/` 目录草案应优先采用：

- `guide/`：新手入门流程。相比 `getting-started`，`guide` 更适合作为一条带读者走完核心闭环的引导路径。
- `modules/`：进阶模块说明。相比 `advanced`，`modules` 更准确表达“按能力模块逐块说明”，不暗示只有高级用户才需要读。

`guide/` 必须包含执行闭环，不能只讲知识库。

原因：AIPD2 不是单纯知识库，而是“项目知识库 + 任务执行组织”的综合体。未来它会继续朝专门辅助 AI 开发项目 / 网站的体系发展。如果入门只讲 L1-L5、map、weave，而不讲 case / step，读者只会理解一半。

因此，`first-case-flow` 或同等章节应放在 `guide/` 里，作为新手入门最后一段或后半段内容，用来说明：

- 为什么实际开发不能只靠聊天上下文。
- Case 如何承载一次事项的目标、边界、上下文索引和验收。
- Step 如何成为可派发、可恢复、可验收的执行单元。
- AIPD2 如何从“让 Agent 找对上下文”进一步走向“让 Agent 稳定执行开发任务”。

## 上下文文档

分身 Agent 必须在执行前读取以下文档：

- Case 总览：`_adoc/case/c5-human-docs-architecture/case.md`
- 项目入口：`_adoc/index.md`
- 项目地图：`_adoc/map.md`
- 项目方向：`_adoc/L1-intent/intent.md`
- 核心认知：`_adoc/L3-core/index.md`
- 纵向概念模块：`_adoc/L3-core/vertical-concept-modules.md`
- 横向功能能力：`_adoc/L3-core/horizontal-capabilities.md`
- 工程实现索引：`_adoc/L5-dev/index.md`
- 新 README 草稿：`README-new.md`
- 旧 README：`README.md`

## 任务清单

- [x] 对比 `README-new.md` 和 `README.md` 的信息类型，明确首页内容与学习文档内容的分工。
- [x] 设计 `docs/` 的渐进式目录草案，要求新手入门先按“Vibe Coding -> Agent Coding -> 项目知识库 -> L1-L5 -> map -> weave -> case/step”的叙事推进。
- [x] 区分 `docs/` 的两层文档：新手入门流程，以及进阶模块说明。
- [x] 目录草案优先使用 `guide/` 和 `modules/`，并把 first case / case flow 放入 `guide/`。
- [x] 在进阶模块说明中体现 Map / 检索系统的两类划分：L1-L6 通用认知 Map，以及具体项目 / 技术栈 Map。
- [x] 在进阶模块说明中单独安排“上下文解耦”核心概念，说明它和 map、case、step、weave 的关系。
- [x] 标出旧 README 各段落适合迁移到哪个 docs 章节，哪些应留在首页，哪些应删减或改写。
- [x] 判断 docs 入口命名：优先评估 `docs/` 是否足够清晰，如有更合适命名给出理由。
- [x] 输出首批建议只到目录和迁移策略，不写完整章节正文。
- [x] 记录需要后续确认的问题，例如章节粒度、是否需要图示、是否先迁移旧 README。

## 产出要求

- 结果文件路径：`_adoc/case/c5-human-docs-architecture/doc/docs-ia-proposal.md`
- 内容至少包含：
  - README / docs / _adoc 职责分工
  - 新手入门叙事路径
  - `docs/` 目录草案
  - 推荐阅读路径
  - 旧 README 迁移映射
  - 后续可拆 step 建议
  - 风险与待确认问题

## 验收标准

- [x] 目录方案能让新读者先从架构层面理解 AIPD2，而不是一开始陷入细节。
- [x] 方案明确说明 `docs/` 面向人，`_adoc/` 面向 Agent 项目认知，两者不互相替代。
- [x] 方案没有把旧 README 机械拆段，而是按学习路径重组。
- [x] 产出能支持后续单独创建写作 / 迁移 step。
- [x] 未直接修改 README 或创建正式 `docs/` 内容。

## 不做

- 不创建正式 `docs/` 目录。
- 不写完整文档正文。
- 不覆盖或改写 `README.md`、`README-new.md`。
- 不执行构建、安装、测试。

---

## 执行记录

> 分身 Agent 执行完成后填写此区域

**完成时间**：2026-06-07

**主要改动**：
- 创建 `_adoc/case/c5-human-docs-architecture/doc/docs-ia-proposal.md`。
- proposal 覆盖 README / docs / _adoc / src 职责分工、`docs/guide` 与 `docs/modules` 目录草案、入门叙事路径、旧 README 迁移映射、后续 step 建议和风险待确认问题。

**遇到的问题**：
- `README-new.md` 仍引用 `_adoc/context-map.md`，但当前项目实际入口是 `_adoc/map.md`；本 step 只记录为后续 README promote 修正项，未直接修改 README。

**Weave 候选**：
- 若 `docs/` 成为稳定入口，可在 `_adoc/map.md` 增加“面向人类文档 / docs / README 分工”检索入口。
- 若 README / docs / _adoc 的分工成为稳定规则，可回写到 `_adoc/L5-dev/index.md` 或 `_adoc/L3-core/horizontal-capabilities.md`。

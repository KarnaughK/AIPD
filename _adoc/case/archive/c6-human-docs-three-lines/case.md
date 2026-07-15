# Case: c6-human-docs-three-lines

> **本次事项目标**：把 AIPD2 面向人的教学文档从“按功能顺序介绍”升级为“三条主线 + 辅助能力”的新版学习结构。

## 目录结构

```text
_adoc/case/c6-human-docs-three-lines/
├── case.md          # 本文件，事项总览和上下文索引
├── steps/           # 可派发给分身 Agent 的执行步骤；只放已确认步骤
└── doc/             # 执行时收集的参考资料、调研摘要、设计说明
```

## 1. 目标

- **教学主线重构**：把现有 `docs/guide/` 的顺序型入门路径，调整为更清晰的三条主线：知识库最小闭环、Case / Step 开发逻辑、AI 原生代码架构实验。
- **辅助能力归位**：明确 OKR、Inbox、MMD、分身 Agent、Weave、Agent Entry 等能力不一定单独成为一层，而是按解决的问题归入主线或模块说明。
- **新旧版本对照**：保留旧版从 Vibe Coding 到 Agent Coding 的问题引入和 modules 能力字典，同时让新版更像 AIPD2 架构级教学。
- **执行边界**：本 case-create 阶段只创建 case 和上下文索引，不直接修改 `docs/`、README 或 `_adoc/` 长期认知。

## 2. 场景分流

- **项目类型**：AIPD2 框架 / Skill 源码项目。
- **Case 类型**：目标型 / 认知型 / 文档架构型 case。
- **适用流程**：通用 case-create 流程；先沉淀新版教学结构、上下文索引和边界，等用户确认后再补具体写作或改文档 step。
- **不适用经验**：不套用 Vue 前端实现型 case 的组件图、provider、SFC 或按文件实现 step 规则。

## 3. 上下文索引

> 执行时优先读这些，不全量扫描项目。

### 层级判断

- **L1 Intent**：涉及 AIPD2 对外定位，即“项目认知框架”而不是完整通用开发纪律框架。
- **L3 Core**：涉及 AIPD2 的纵向概念模块、横向功能能力、上下文解耦、扁平化检索、纵向黑箱等核心认知。
- **L4 Product**：涉及 docs 学习路径、Case Create、Case Run、Weave、Inbox、Learn 等用户可理解的功能线。
- **L5 Dev**：涉及 README / docs / `_adoc` 分工、Skill 源码项目维护、docs 与 Agent 执行事实源的边界。
- **局部 README**：根目录 `README.md`、`docs/README.md` 和 `docs/guide/`、`docs/modules/` 是后续执行主要入口。
- **Case / 历史 Step**：重点参考 `c5-human-docs-architecture`，避免重复发明 docs 体系，只在其基础上升级教学主线。

### 必读文档

- `_adoc/index.md` - 项目认知入口，确认 AIPD2 自身 `_adoc` 结构和读取原则。
- `_adoc/map.md` - 项目记忆地图，定位 AIPD 方向、分层、map、case、weave、inbox、docs 等入口。
- `_adoc/L1-intent/intent.md` - 确认 AIPD2 的项目方向和核心取舍。
- `_adoc/L3-core/index.md` - AIPD2 核心认知入口，确认 L3 不是狭义数据模型。
- `_adoc/L3-core/vertical-concept-modules.md` - 纵向模块来源：L1-L6、OKR、Case、Step、Agent Entry、Agent 使用方案。
- `_adoc/L3-core/horizontal-capabilities.md` - 横向能力来源：map、Case、Weave、OKR、Agent Entry 等如何串起纵向模块。
- `_adoc/L4-product/map.md` - 当前功能线总表，确认 Case Create、Case Run、Weave、Learn 等产品功能入口。
- `docs/README.md` - 现有人类学习文档总入口和旧 README 迁移记录。
- `docs/guide/*.md` - 现有顺序型新手入门路径。
- `docs/modules/*.md` - 现有能力模块字典，可保留为新版主线后的查阅层。
- `_adoc/case/c5-human-docs-architecture/case.md` - 旧版 docs 架构 case，确认已完成内容和后续可复用判断。

### 代码 / 局部入口

- `README.md` - 当前对外首页，包含 AIPD2 总体叙事和 AI 原生代码组织判断。
- `docs/README.md` - 学习文档入口，后续可能改成三主线导航。
- `docs/guide/01-from-vibe-coding-to-agent-coding.md` - 旧版问题引入，建议保留。
- `docs/guide/02-aipd2-three-main-lines.md` - 新版三条主线入口。
- `docs/guide/03-knowledge-base-minimum-loop.md` - 知识库本体、存和取的第一层主线。
- `docs/guide/04-case-step-development.md` - Case / Step、OKR、Inbox、分身 Agent 和 Weave Candidate 的第二层主线。
- `docs/guide/05-ai-native-code-architecture-experiment.md` - AI 原生代码架构实验的第三层主线。
- `docs/guide/06-first-complete-flow.md` - 第一次完整使用路径。
- `docs/modules/context-decoupling.md` - AI 原生代码架构实验的重要内容来源。
- `docs/modules/adoc-layers.md`、`docs/modules/maps-and-retrieval.md`、`docs/modules/weave.md`、`docs/modules/case-and-step.md` - 可继续作为模块查阅层。

### 兜底搜索

- `rg "三条主线|知识库最小闭环|Case / Step|AI 原生|纵向黑箱|上下文解耦|Decouple" docs _adoc README.md src`
- `rg "OKR|Inbox|MMD|Mermaid|辅助能力|横向功能|纵向概念" docs _adoc src`
- `rg "Vibe Coding|Agent Coding|项目知识库|map|weave|case / step" docs README.md`

### 风险边界

- 不把新版三主线讲成彼此隔离的硬层级；它们是教学主线和架构视角，不是所有功能的唯一归属。
- 不丢掉旧版“为什么需要项目记忆”的问题引入；新版应保留旧版可读性。
- 不把 OKR、Inbox、MMD 等辅助能力强行升成主线；按用途归属到知识库、执行逻辑、架构实验或 modules 字典。
- 不把第三层 AI 原生代码架构实验包装成已经完全定型的行业共识；应标注其探索性。
- 不在本 case-create 阶段直接执行 docs 改写；后续需要用户确认 step 后再执行。

## 4. 已确认的新版教学判断

### 三条主线

```text
第一层：知识库最小闭环（基础知识库）
第二层：Case / Step 开发逻辑（大任务执行与上下文恢复）
第三层：AI 原生代码架构实验（代码组织范式探索）
```

第一层不是只有“存”和“取”，而是包含：

- 知识库本体：L1-L5，必要时延伸到被索引的 L6。
- 存：正向编织与反向编织，把稳定项目认知写入 `_adoc`、局部 README、map 或 case。
- 取：通过 `_adoc/map.md` 从自然语言路由到 L3 / L4 / L5 / 局部 README / L6 代码入口。

第二层解决的是 Agent 在大任务中上下文不够、状态容易散的问题：

- OKR 可作为长期目标管理和 case 价值判断的上游。
- Case 是一次事项的上下文容器。
- Step 是可执行、可恢复、可验收的局部任务黑箱。
- 分身 Agent、执行记录、归档和 Weave Candidate 属于这一条执行线的重要支撑。

第三层解决的是代码本身如何更适合 AI 理解、修改和维护：

- 从横向分层转向纵向黑箱。
- 降低牵连面优先于减少代码量。
- Decouple first, DRY later。
- 具体“怎么写某种代码”的方法主要属于这一层；若它稳定为跨模块工程规则，可回写到第一层的 L5；若只是一次任务决策，先留在第二层 case / step。

### 辅助能力归属

- **OKR**：跟第二层执行逻辑走，用于长期目标管理和 case / step 对齐。
- **Inbox**：作为临时思路收集能力，不单独升层；后续可能 weave 进知识库，也可能转成 case。
- **MMD / Mermaid**：按用途归属。画稳定业务或架构认知时归第一层；画执行拆解时归第二层；画 AI 原生代码组织实验时归第三层。
- **Weave**：第一层知识库闭环的维护能力，同时也承接第二层 case / step 产生的 Weave Candidate。
- **分身 Agent**：第二层执行逻辑的关键机制，也可在普通探索中保护主线。
- **Agent Entry**：贯穿所有主线，是 Agent 进入项目后的读取和行动入口。

### 新旧版本关系

旧版文档的可取之处：

- 从 Vibe Coding 到 Agent Coding 的问题引入应保留。
- `docs/modules/` 作为能力模块字典应保留。
- 旧版已把 README、docs、`_adoc` 的职责分开，这个判断继续有效。

新版相对旧版的变化：

- `guide/` 不再只是按功能出现顺序讲：项目知识库、L1-L5、map、weave、case / step。
- 新版 `guide/` 应先给出三条主线，让读者知道 AIPD2 不是一堆功能，而是项目认知、任务执行、代码架构实验三类问题。
- `modules/` 继续按能力查阅，不强行塞进三条主线。

## 5. 本次边界

### 要做

- 创建本 case，沉淀目标、上下文索引、已确认教学判断、边界和候选事项。
- 把三条主线、辅助能力归属、新旧版本对照写清楚，作为后续改 docs 的事实源。
- 暂时不创建详细 step；等待用户确认是否开始改文档，以及先改哪一层。

### 不做

- 不直接修改 `docs/README.md`、`docs/guide/`、`docs/modules/` 或 `README.md`。
- 不调整 AIPD2 skill 源码。
- 不把第三层实验思想写成强制工程规则。
- 不把辅助能力机械归入唯一层级；保留按用途归属的弹性。

## 6. Step 列表

- [x] `steps/wp-01-update-human-docs-three-lines.md` - 更新面向人的 docs 学习路径为“三条主线 + 辅助能力”（推荐 Agent：worker）

## 7. 后续候选事项

- 重写 `docs/README.md` 的推荐阅读路径：从顺序型 01-06 改成“三条主线 + modules 能力字典”。
- 调整 `docs/guide/`：新增或重排为“01 问题引入、02 三条主线、03 知识库最小闭环、04 Case / Step、05 AI 原生代码架构实验、06 第一次完整路径”。
- 为 OKR、Inbox 增加 `docs/modules/okr.md`、`docs/modules/inbox.md`，或在 `skills-overview.md` / `case-and-step.md` 中补充短说明。
- 检查 `docs/modules/context-decoupling.md` 是否应从“模块说明”提升为第三层主线的重要 guide。
- 判断 `_adoc/map.md` 是否需要新增“教学文档三主线 / docs v2 / 人类学习路径”检索入口。
- 若后续形成稳定框架判断，使用 `aipd2-weave` 判断是否回写到 `_adoc/L3-core/` 或 `_adoc/L5-dev/`。

## 8. 验收标准

- [x] case 文件能解释新版三条主线分别解决什么问题。
- [x] case 文件能说明 OKR、Inbox、MMD 等辅助能力的归属原则。
- [x] case 文件能对比旧版和新版教学思路，并保留旧版可取之处。
- [x] 后续执行 Agent 能从本 case 恢复用户已确认的教学判断，不需要重新读完整聊天。
- [x] 未确认的 docs 改写事项只留在候选区，没有提前创建噪声 step。

## 9. Weave 反向编织候选

> 本区只记录候选归属。真正回写长期 ADOC、局部 README 或 map 时，使用 `aipd2-weave` 先给回写方案，用户确认后再写入。

- `_adoc/L3-core/index.md` - 若“三条主线”成为 AIPD2 稳定核心认知，可沉淀为框架对外解释模型。
- `_adoc/L3-core/horizontal-capabilities.md` - 若辅助能力归属形成稳定规则，可补充 OKR、Inbox、MMD 与横向能力的关系。
- `_adoc/L3-core/vertical-concept-modules.md` - 若 OKR / Inbox / L6 讲法需要更清晰的纵向模块定位，可补充说明。
- `_adoc/map.md` - 若 docs v2 成为高频任务入口，应新增“教学文档三主线 / docs v2”检索入口。
- `docs/README.md`、`docs/guide/`、`docs/modules/` - 后续正式改写的人类学习文档入口。
- 相关 step 执行记录 - 只保留一次性改写过程和验收结果，不直接写入长期认知。

## 10. 自迭代观察锚点

- [ ] Agent 是否识别本 case 是认知型 / 文档架构型，而不是代码实现型。
- [ ] Agent 是否先读取 `_adoc/map.md` 和 `c5-human-docs-architecture`，避免重复设计已有 docs 架构。
- [ ] Agent 是否保留旧版问题引入和 modules 能力字典，而不是只追求新结构。
- [ ] Agent 是否把 OKR、Inbox、MMD 作为辅助能力按用途归属，而不是强行升成主线。
- [ ] Agent 是否把第三层标注为 AI 原生代码架构实验，避免写成已经稳定的硬规范。
- [ ] 如果后续执行偏离，能否判断偏离原因：docs 入口不清 / 三主线边界不清 / case step 粒度不当 / AIPD 流程提示不足。

## 11. 归档状态

- **状态**：已归档
- **创建时间**：2026-06-13
- **归档时间**：2026-06-14

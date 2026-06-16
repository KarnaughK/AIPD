# Case: c0.5-human-docs-architecture

> **本次事项目标**：为 AIPD2 设计面向人的 `docs/` 学习文档体系，明确它和 `_adoc/`、README 的分工，并先产出渐进式目录方案。

## 目录结构

```text
_adoc/case/c0.5-human-docs-architecture/
├── case.md
├── steps/
│   └── c0.5.1-design-human-docs-ia.md
└── doc/
```

## 1. 目标

- **文档分层**：区分 README、`docs/`、`_adoc/` 的职责，避免把给人看的学习文档和给 Agent 读的项目认知混在一起。
- **目录设计**：设计一个渐进式 `docs/` 目录，让读者能先从架构层面理解 AIPD2，再按需深入设计思路、模块说明和执行流程。
- **入门叙事**：`docs/` 入门部分应从 AI Coding 的使用方式演进讲起，而不是一上来介绍 AIPD2 模块。
- **迁移策略**：判断新旧 README 的分工：新 README 作为项目首页，旧 README 中更适合展开讲解的内容迁移或改写到 `docs/`。
- **执行边界**：本 case-create 阶段只创建 case 和首步，不直接写完整 `docs/` 内容。

## 2. 场景分流

- **项目类型**：AIPD2 框架 / Skill 源码项目。
- **Case 类型**：目标型 / 认知型 / 文档架构型 case。
- **适用流程**：通用 case-create 流程；先做文档信息架构和迁移方案，再按用户确认逐步拆写作 step。
- **不适用经验**：不套用 Vue 前端实现型 case 的组件图、provider、SFC 或按文件实现 step 规则。

## 3. 上下文索引

> 执行时优先读这些，不全量扫描项目。

### 层级判断

- **L1 Intent**：涉及 AIPD2 对外定位、项目方向和“不要变成通用开发纪律框架”的边界。
- **L3 Core**：涉及 AIPD2 核心概念、纵向概念模块、横向功能能力、上下文解耦、扁平化检索等学习主线。
- **L4 Product**：涉及 skill、case、weave、map、agent entry 等用户可理解的功能线，但当前 L4 文档暂缺，需要从 map、README 和源码入口提炼。
- **L5 Dev**：涉及 Skill 源码项目、构建安装、Agent 执行入口、README / docs / _adoc 的工程分工。
- **局部 README**：根目录 `README.md`、`README-new.md` 是本次主要材料。
- **Case / 历史 Step**：参考已有 case 索引，确保新 case 编号和状态连续。

### 必读文档

- `_adoc/index.md` - 项目认知入口，确认当前 `_adoc` 结构和读取原则。
- `_adoc/map.md` - 项目记忆地图，定位 AIPD 方向、分层、map、case、weave、构建安装等相关入口。
- `_adoc/L1-intent/intent.md` - 对外文档必须遵守的项目方向与核心取舍。
- `_adoc/L3-core/index.md` - AIPD2 核心认知，提供 docs 学习主线的核心概念来源。
- `_adoc/L3-core/vertical-concept-modules.md` - 解释 L1-L6、OKR、Case、Step、Agent Entry 等纵向模块。
- `_adoc/L3-core/horizontal-capabilities.md` - 解释 map、case、weave、agent entry 等横向能力。
- `_adoc/L5-dev/index.md` - 构建安装、Codex 优先、Agent 调度等工程实现语境。
- `README-new.md` - 更适合作为项目首页，承载“为什么需要 AIPD2”和快速理解。
- `README.md` - 更适合拆成学习文档内容来源，承载架构展开、模块说明、安装开发等细节。

### 代码 / 局部入口

- `src/core/overview.md` - AIPD 核心说明来源。
- `src/core/adoc-structure.md` - `_adoc` 结构和初始化模板来源。
- `src/core/case/overview.md` - Case / Step 体系说明来源。
- `src/skills/{skill}/SKILL.md` - 各 skill 职责边界来源。
- `scripts/` - 构建、开发安装、用户安装和项目安装脚本入口；供 Agent 执行，不作为 README 手工操作主线。

### 兜底搜索

- `rg "README|docs|文档|学习|首页|Quickstart|安装|构建|Skill" README.md README-new.md _adoc src`
- `rg "L1|L2|L3|L4|L5|L6|Case|Step|Weave|map|Agent Entry" README.md README-new.md _adoc src/core`
- `rg "context-map|map.md" README.md README-new.md _adoc src`

### 风险边界

- `docs/` 是面向人的解释文档，不替代 `_adoc/`；`_adoc/` 仍是 Agent 项目认知和长期上下文。
- README 首页应保持轻量，不重新膨胀成完整手册。
- `docs/` 新手入门应先讲“为什么需要项目知识库”，再讲 AIPD2 模块；不要一开头就进入 L1-L5、Case、Step 的术语说明。
- 旧 README 内容不能机械搬运，应按学习路径重组，避免把目录做成概念堆叠。
- `README-new.md` 当前仍引用 `_adoc/context-map.md`，但项目实际入口已是 `_adoc/map.md`；这是后续整理候选，不在 case-create 阶段直接修。
- 不提前创建大量写作 step；先确认目录和迁移策略，再逐步执行。

## 4. 已确认的入门叙事方向

`docs/` 的新手入门流程暂定按 AI Coding 演进讲故事，而不是按 AIPD2 术语列表讲解：

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

关键判断：

- “两套源码 / AI 认知源码”是重要心智模型，但不适合放在入门第一步；应在读者理解 `_adoc` 是项目知识库之后再升维总结。
- 知识库本体先讲清三件事：存储结构是 L1-L5，读取结构是 map，更新机制是 weave。
- Case / Step 不属于知识库本体第一层，而是实际开发任务的组织和恢复机制，应放在知识库逻辑之后讲。
- 新手入门应该像 Vue 的 tutorial / guide 一样带读者走完最小心智闭环；进阶模块说明再逐块解释每个模块。

## 5. 本次边界

### 要做

- 创建本 case，沉淀目标、上下文索引、边界和首个 step。
- 首个 step 只负责设计 `docs/` 的渐进式信息架构和 README / docs / _adoc 分工。
- 把后续可能写作、迁移和引用修正放入候选事项。

### 不做

- 不在 case-create 阶段直接创建 `docs/` 目录或写正式学习文档。
- 不覆盖现有 `README.md` 或 `README-new.md`。
- 不执行构建、安装、测试或发布。
- 不把 `_adoc/` 改造成面向人的 docs。

## 6. Step 列表

- [x] `steps/c0.5.1-design-human-docs-ia.md` - 设计面向人的 `docs/` 渐进式目录、阅读路径和迁移策略（推荐 Agent：worker）
- [x] `steps/c0.5.2-create-docs-and-promote-readme.md` - 创建正式 docs，升级新版 README，并将旧 README 内容迁移 / 改写到 docs（推荐 Agent：worker）

## 7. 后续候选事项

- 基于 `docs/` 成果，决定是否继续拆更多模块文档精写 step。
- 根据 `docs/` 成果，判断是否需要在 `_adoc/map.md` 增加“面向人类文档 / docs”检索入口。
- 判断是否需要为 `docs/guide/` 或 `docs/modules/` 增加 MMD / Mermaid 图示。

## 8. 验收标准

- [x] case 文件清楚说明 README、`docs/`、`_adoc/` 的不同职责。
- [x] 首个 step 能独立执行，不依赖未沉淀的聊天记忆。
- [x] 首个 step 的产出是目录方案和迁移策略，不直接扩写完整文档。
- [x] 后续写作事项只进入候选区，未提前制造多个未确认 step。
- [x] 执行时能从本 case 上下文索引恢复任务，不需要重新读完整聊天。

## 9. Weave 反向编织候选

- `_adoc/map.md` - 若 `docs/` 成为稳定入口，应新增“人类学习文档 / docs / README 分工”检索入口。
- `_adoc/L3-core/horizontal-capabilities.md` - 若形成稳定的“人类 docs 与 Agent `_adoc` 分工”判断，可考虑沉淀到横向能力或文档体系说明。
- `_adoc/L5-dev/index.md` - 若形成 README / docs / _adoc 的工程维护规则，可考虑沉淀到 L5。
- `README.md` / `README-new.md` - 根据用户确认，后续可能调整为首页与学习文档入口。
- `docs/` - 若用户确认目录方案，后续创建为面向人的学习文档事实源。

## 10. 自迭代观察锚点

- [ ] Agent 是否先读取 `_adoc/index.md` 和 `_adoc/map.md`，而不是只凭 README 猜文档结构。
- [ ] Agent 是否识别本 case 是认知型 / 文档架构型，而不是代码实现型。
- [ ] Agent 是否把 `docs/` 与 `_adoc/` 的读者和职责区分清楚。
- [ ] Agent 是否避免在 case-create 阶段直接写正式 docs 内容。
- [ ] Agent 是否发现并记录 `context-map.md` / `map.md` 的入口不一致问题。
- [ ] 如果后续执行偏离，能否判断是 README 分工不清、map 缺入口，还是 case step 粒度过大。

## 11. 归档状态

- **状态**：已归档
- **创建时间**：2026-06-07
- **归档时间**：2026-06-16

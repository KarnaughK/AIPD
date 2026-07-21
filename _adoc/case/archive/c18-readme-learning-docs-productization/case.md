# Case: c18-readme-learning-docs-productization

> **本次事项目标**：把 AIPD 开源项目的根 README 与学习文档作为一个完整的小产品重做，让新用户既愿意继续了解，也能沿清晰主线快速完成第一次实践。
> **当前 Phase**：Close
> **目标模式绑定**：完成并关闭 `c18-readme-learning-docs-productization`；completed；Case 已归档。

## Case Contract

### 目标

- **目标**：盘点 AIPD 当前真实能力、核心理念和实现原理，参考优秀开源项目的文档产品方法，重构并更新根 `README.md` 与 `docs/` 学习文档。
- **方向 / OKR / 项目阶段关联**：AIPD 正处于框架自举和开源传播阶段；对外文档需要从历史功能说明升级为兼顾价值吸引、认知建立、快速上手和深入学习的用户路径。

### 要做

- 盘点当前 Skill、核心能力、核心理念、运行模型、平台边界和已有学习材料，识别过期、缺失、重复和叙事断点。
- 调研 Vue、React 及其他文档口碑较好的开源项目，提炼适合 AIPD 的首页、入门、概念、指南和参考内容组织方法。
- 设计一条能够解释“为什么需要 AIPD -> 它如何工作 -> 如何第一次用起来 -> 如何深入使用”的主线，而不是按对象平铺说明。
- 更新根 `README.md`、`docs/README.md` 和必要的 `docs/guide/`、`docs/modules/` 文档。
- 校验文档中的事实、术语、相互链接、安装命令和阅读路径与当前源码一致。

### 不做

- 不把本轮扩成 API / CLI 参数逐项参考手册。
- 不新建独立文档站、搜索系统、国际化版本或视觉品牌系统。
- 不修改 AIPD Skill 的产品行为与运行逻辑；如果发现能力缺口，只记录为后续候选。
- 不执行用户级或项目级安装，不进行 Git 提交、推送或发布。

### 完成标准

- [x] 有一份可追溯的现状盘点和外部文档调研结论，说明采用与不采用哪些组织方法。
- [x] 根 README 能在短阅读内回答 AIPD 是什么、解决什么问题、如何不同、如何开始、下一步读什么。
- [x] 学习文档形成连续的用户旅程，不依赖逐对象字典式阅读即可完成第一次完整实践。
- [x] 当前重要 Skill、核心理念和实现原理在合适层级得到解释，且不与源码事实冲突。
- [x] README 与 docs 的内部链接、关键命令、术语和结构通过自动或人工校验。
- [x] Case 的 Think、Design、Execute、Verify、Close 状态与执行证据完整写回。

### 上下文索引

#### 层级判断

- **L2 Research**：涉及开源项目文档范式、用户首次接触与学习路径。
- **L3 Core**：涉及 AIPD 的项目认知、Map-first、文件优先、Case、上下文解耦、Weave、SOP 等成立模型。
- **L4 Product**：涉及 Skill 与用户可见能力的准确介绍和边界。
- **L5 Dev**：涉及 README / docs / `_adoc` 分工、构建安装和平台适配边界。
- **局部 README**：根 `README.md`、`docs/README.md`、`aipd-skill/README.md`、`experience-assets/README.md`。
- **Case / 历史 Work Package**：读取 `c5-human-docs-architecture`、`c6-human-docs-three-lines` 的已归档结论，避免重复发明并审计其是否已过时。

#### 项目认知

- `_adoc/map.md` - 路由 README / 学习文档、Skill、核心理念、Case 与平台实现入口。
- `_adoc/L1-intent/intent.md` - 校准对外定位和长期取舍。
- `_adoc/L3-core/index.md`、`vertical-concept-modules.md`、`horizontal-capabilities.md` - 盘点核心模型与概念关系。
- `_adoc/L4-product/index.md`、`map.md` - 盘点当前用户可见能力和真实入口。
- `_adoc/L5-dev/index.md` - 校准文档分工、平台与安装边界。
- `_adoc/case/archive/c5-human-docs-architecture/`、`_adoc/case/archive/c6-human-docs-three-lines/` - 历史学习文档架构依据。

#### 页面 / 模块 README

- `README.md` - 开源项目首页与第一决策页。
- `docs/README.md` - 学习文档入口与阅读路线。
- `aipd-skill/README.md` - Skill 源码与构建入口。
- `experience-assets/README.md` - 实践经验源码资产边界。

#### 代码入口

- `aipd-skill/src/skills/*/SKILL.md` - 当前最终 Skill 的事实源。
- `aipd-skill/src/core/overview.md` - 框架核心说明。
- `aipd-skill/scripts/build`、`check-dist`、`install*` - 构建与安装命令事实源。

#### Phase 材料入口

- `01-think/think.md` - 现状盘点、外部调研、选项比较和结论。
- `01-think/docs-benchmark/summary.md` - 优秀开源文档调研分支。
- `02-design/design.md` - 文档产品主线、信息架构、内容分工与工作包设计。
- `03-execute/execute.md` - 执行总状态。
- `04-verify/verify.md` - 链接、事实、命令、阅读路径和文案验收。
- `05-close/close.md` - 归档与稳定知识回写候选。

#### 兜底搜索

- `rg "README|学习文档|Skill|Case|Work Package|Map-first|上下文解耦|Weave" README.md docs _adoc aipd-skill/src` - 盘点事实、术语和历史叙事。

### 边界变更记录

- 2026-07-21：按用户指令创建 Case；明确文档是需要同时承担吸引、解释和上手的小产品，不采用逐对象 API 字典作为主线。

## Case Runtime

## Current Phase

Close

## Phase State

- Think: completed -> `01-think/think.md`
- Design: completed -> `02-design/design.md`
- Execute: completed -> `03-execute/execute.md`
- Verify: completed -> `04-verify/verify.md`
- Close: completed -> `05-close/close.md`

## 当前焦点

- **当前要解决的问题**：已完成。
- **当前游标**：`05-close/close.md`
- **最近 checkpoint**：Close completed；交付、验证、延后 Weave 候选和 archive 引用风险已记录。
- **下一步建议**：无；平台目标标记 complete。
- **压缩后恢复入口**：`case.md#当前焦点` -> `04-verify/verify.md#verify-result` -> `05-close/close.md`
- **待确认项**：无；用户已明确授权从梳理、调研推进到 README 与学习文档更新。
- **阻塞项**：无

## 状态卡记录

- **文件事实**：c18 已完成 Think、Design 和两个 Execute Work Package；README 与 docs 已改为记忆循环主线。
- **用户认知**：文档本身应当作为小产品设计，既要吸引人，也要快速让用户上手，不能写成难读的对象字典。
- **冲突点**：无。
- **当前 phase 条件**：Close completed。
- **建议下一步**：无。

## Checkpoint 记录

| 时间 | 位置 | 触发 | 已确认 / 已变化 | open / assumed | 下一步 | 恢复入口 |
|---|---|---|---|---|---|---|
| 2026-07-21 | Case / Think | 用户要求创建 Case、绑定目标并完成文档更新 | 目标、范围、完成标准、调研边界已建立 | 文档主线与具体信息架构待调研后决定 | 仓库审计与外部调研 | `01-think/think.md#调研前-checkpoint` |
| 2026-07-21 | Think -> Design | Think Gate | 已完成现状审计和 Vue / React / Django / Rust / Next.js / Diátaxis 调研；采用“项目记住自己”主线和 README / guide / modules 三层职责 | 具体文件改写清单待 Design 固化 | quick Design | `02-design/design.md` |
| 2026-07-21 | Design -> Execute | Readiness Gate | requirements、brownfield、信息架构、文件边界和两个 work package 已确定；Gate passed | 无阻塞 open | 执行 wp-01 | `03-execute/work-packages/wp-01-rebuild-entry-and-learning-journey.md` |
| 2026-07-21 | Execute -> Verify | 两个 Work Package 完成 | README、docs 入口、六篇 guide 和 11 篇 modules 已更新；无设计缺口 | 待自动与人工验收 | Verify | `04-verify/verify.md` |
| 2026-07-21 | Verify -> Close | Verify Gate | 链接、Skill、脚本、格式、旧语义、dist 与三条阅读路径验收 passed | 源码局部 README 历史内容作为后续候选 | Close | `05-close/close.md` |
| 2026-07-21 | Close | Archive Gate | 交付、验证、长期认知审计和延后 Weave 候选已完整写回；无外部路径引用风险 | L5 / map / 源码局部 README 候选等待单独确认 | 归档并完成平台目标 | `05-close/close.md` |

## 回跳 / 重开记录

| 时间 | 从哪里回跳 | 回到哪里 | 触发原因 | 更新内容 | 受影响下游 | 是否需用户确认 |
|---|---|---|---|---|---|---|

## Think 摘要

- **状态**：completed
- **关键问题**：如何把 AIPD 的真实价值、核心模型、当前 Skill 和第一次完整实践组织成一条易理解、愿意继续读的主线。
- **调研 / 比较分支**：
  - `01-think/docs-benchmark/summary.md` - 调研 Vue、React 和其他优秀开源文档的信息架构与用户路径。
- **决策结论**：以“任务前找到认知、任务中承接状态、任务后回写经验”为用户主线；根 README 是决策页，guide 是连续教程，modules 是解释 / 参考层。

## Design 摘要

- **模式**：quick
- **理由**：本 Case 修改的是文档信息架构与内容，不涉及后端、数据、API 或运行时代码；但仍需显式完成用户路径、内容边界和工作包 readiness。
- **当前节点**：readiness-gate
- **节点状态**：completed
- **本节点要回答的问题**：已完成。
- **本节点停止点**：Readiness Gate passed。
- **下一节点建议**：Execute wp-01。
- **节点 checkpoint**：requirements、brownfield、用户路径、文件边界与 work package 已写回 `02-design/design.md`。
- **复杂度爆点**：既要完整介绍不断演进的能力，又不能让首页和学习路径变成平铺百科或 API 字典。
- **最小必要解耦**：根 README 负责“理解与决策”，guide 负责“连续学习与第一次实践”，modules 负责“按需深入与回查”。
- **Readiness Gate**：passed

## Execute 摘要

- **当前执行游标**：无；wp-01 / wp-02 completed。
- **最近执行 checkpoint**：全部目标文档已更新；残留风险只在链接、格式、事实一致性和阅读路径验收。

## Verify 摘要

- **状态**：completed
- **验收入口**：`04-verify/verify.md`

## Close 摘要

- **状态**：completed
- **归档候选**：已整理到 `05-close/close.md`；L5 / map 延后 Weave，源码局部 README 作为后续专项候选。

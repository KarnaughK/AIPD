# Case: c20-aipd-knowledge-execution-code-topology

> **本次事项目标**：从真实项目案例中形成 AI 友好代码拓扑认知，先更新 AIPD 项目 ADOC，再设计 Skill 打包产物如何把这套认知提供给外部 Agent。
> **当前 Phase**：Design

## Case Contract

### 目标

- **目标**：基于三个真实项目案例形成“横向基座、横向共享能力、纵向业务上下文和显式组合边界”的 AI 友好代码拓扑，先沉淀到 AIPD 项目 ADOC，再单独设计它在 Skill 打包产物中的运行时承载方式。
- **方向 / 项目阶段关联**：继续探索 AIPD 的 AI 原生代码架构，但改用案例驱动、小范围逐个讨论的方式推进。

### 要做

- 每个真实项目建立一个独立 Think 分支，记录项目性质、模块结构、具体做法、当时理由、结果和未决问题。
- 优先保留用户对当时实践的原始描述，不在采集阶段提前统一术语。
- 区分案例事实、用户当时的判断和后续分析候选。
- 案例全部讲完并由用户明确切换后，再比较共同点、差异、演进路径和适用边界。
- 分析完成后，再判断是否需要进入 Design、修改 AIPD 长期认知或形成技术栈经验。
- 第一段先更新 AIPD 项目 `_adoc`：建立 L3 主事实源，并同步 L1 / L3 / map 的必要入口和术语。
- 第二段在 ADOC 稳定后，单独讨论和设计 Skill 打包产物如何让外部 Agent 加载并使用这套认知。

### 不做

- 案例采集期间不继续推进原“三系统 + Agent Entry”分类方案。
- 不预设项目应该全面纵向化，也不预设必须形成某种横向 / 纵向统一模型。
- 不把单个案例直接推广成 AIPD 通用规则。
- 不修改 README、公开 docs 或真实业务项目代码；Skill 节点只修改已确认的源码、模板、构建检查和生成产物边界。
- 不在没有单独设计的情况下，把完整 L3 长文直接塞进 Skill 或所有外部项目的上下文。
- 不把运行时投影写入 Agent Entry 或其他 7 个 Skill；build 后未经用户单独确认不执行 install。
- 不改写其他 Case 或历史归档材料。

### 完成标准

- [x] 用户计划提供的真实项目案例均已独立保存，并经过必要的事实校准。
- [x] 每个案例都能独立回答“项目是什么、横向部分是什么、纵向部分是什么、为何这样取舍”。
- [x] 案例采集与跨案例分析明确分阶段，没有边收集边固化总模型。
- [x] 用户明确案例收集完成后，形成一份基于证据的比较分析。
- [x] 分析结论和 L3 主事实源方案得到用户确认，进入 Design。
- [x] AIPD 项目 ADOC 已更新并完成入口、术语与链接校验。
- [x] Skill 打包产物的认知承载方式已单独设计、执行并验证。

### 上下文索引

#### 项目认知

- `_adoc/index.md` - AIPD 项目认知入口。
- `_adoc/map.md` - AI 原生代码架构、上下文解耦及实践经验入口。
- `_adoc/L1-intent/intent.md` - AI 原生代码架构方向；分析阶段再读取。
- `_adoc/L3-core/index.md` - AIPD 八个核心成立模型和 AI 原生代码架构摘要。
- `_adoc/L3-core/ai-friendly-code-topology.md` - 已落地的 AI 友好代码拓扑主事实源。
- `docs/modules/context-decoupling.md` - 当前公开解释；节点 1 未修改。

#### Phase 材料入口

- `01-think/think.md` - 案例采集总表、采集规则和当前游标。
- `01-think/case-study-01-qianlima-finance-frontend/summary.md` - 案例 01：千里马纯前端财务系统。
- `01-think/case-study-02-page-one-seo-site-portfolio/summary.md` - 案例 02：Page One 多 SEO 站点工作空间。
- `01-think/case-study-03-guessword-themed-game-site/summary.md` - 案例 03：Guessword.io 主题游戏站与可嵌入游戏模块。
- `01-think/cross-case-code-topology-placement/summary.md` - 三案例代码拓扑归纳与 AIPD 归属分析。
- `02-design/design.md` - 节点 1 已执行设计与节点 2 Skill 承载设计入口。
- `03-execute/work-packages/wp-01-adoc-code-topology.md` - 已完成的 ADOC 工作包与验证记录。

#### 兜底搜索

- `rg "纵向黑箱|横向分层|上下文解耦|shared|业务 context" _adoc docs aipd-skill/src` - 仅在跨案例分析阶段对照现有认知。

### 边界变更记录

- 2026-07-23：最初把任务扩展为知识库 / 执行 / 代码三类系统术语重构，并进入 Design。
- 2026-08-09：用户指出讨论已远离原始动机，要求撤回过早结论，改为先逐个保存真实项目案例、再统一分析；本 Case 回跳 Think。
- 2026-08-09：用户确认跨案例结论与 L3 归属方案，并把后续明确拆为两个连续议题：先更新 AIPD 项目 ADOC，再研究 Skill 打包产物；Case 进入 Design。
- 2026-08-09：用户确认公共运行时投影、`aipd` / `aipd-case` 双入口条件加载及 Design / Execute / Verify 三段闭环，并授权无其他 open 时直接执行 Skill 节点。

## Case Runtime

## Current Phase

Close

## Phase State

- Think: completed -> `01-think/think.md`
- Design: completed / node 2 Gate passed -> `02-design/design.md`
- Execute: completed / nodes 1-2 -> `03-execute/execute.md`
- Verify: completed / user accepted / Codex installed -> `04-verify/verify.md`
- Close: completed / archived -> `05-close/close.md`

## 当前焦点

- **当前要解决的问题**：无；Case 已完成并归档。
- **当前游标**：`05-close/close.md`
- **最近 checkpoint**：Close 审计完成；长期稳定认知已回写，未实证案例保留在 Case，外部路径引用只有 case index 且已更新。
- **下一步建议**：无；Case 已归档。
- **压缩后恢复入口**：归档目录本文件 -> `05-close/close.md` -> `04-verify/verify.md`。
- **待确认项**：无；用户已确认安装。
- **阻塞项**：无。

## 状态卡记录

- **文件事实**：ADOC、Skill 源码、两平台 dist、Codex 用户级 install、安装后 smoke、Verify 与 Close 全部完成。
- **用户认知**：Design 决策不能只留在 prose；开发阶段要执行短合同，Verify 要反查真实结果。
- **冲突点**：旧 Case Contract 预先固定了“三系统 + Agent Entry”等结论，与新的案例优先边界冲突；旧结论已失效。
- **当前 phase 条件**：Close completed / archived。
- **建议下一步**：无。

## Checkpoint 记录

| 时间 | 位置 | 触发 | 已确认 / 已变化 | open / assumed | 下一步 | 恢复入口 |
|---|---|---|---|---|---|---|
| 2026-07-23 | Design / requirements | 用户确认推进 | 曾创建系统术语重构草案 | 多项术语未确认 | 等用户确认 | 旧 Design，现已失效 |
| 2026-08-09 | Design -> Think | 用户纠正范围 | 撤回旧 Design；改为案例优先；保存案例 01 | 案例数量和收集终点由用户后续说明 | 采集案例 02 | `01-think/think.md`、`01-think/case-study-01-qianlima-finance-frontend/summary.md` |
| 2026-08-09 | Think / 案例 02 | 用户提供 Page One 案例 | 保存网站纵向盒子、公共 platform 和跨站增长候选；核对 Page One 当前仅落盘规划与首站 Think | 具体公共技术栈、共享交付方式和主站引流规则仍未确定 | 采集案例 03 | `01-think/case-study-02-page-one-seo-site-portfolio/summary.md` |
| 2026-08-09 | Think / 案例 03 | 用户提供 Guessword.io 案例 | 保存页面盒子、游戏盒子及其组合关系；核对当前只落地单个相似度游戏，未来多游戏拓扑尚未执行 | 模板 / 模板页术语、嵌入接口和游戏全栈边界仍未确定 | 采集案例 04 | `01-think/case-study-03-guessword-themed-game-site/summary.md` |
| 2026-08-09 | Think / 跨案例归属分析 | 用户确认案例收集结束 | 本轮案例集合固定为 01–03；“等待案例 04”失效；创建归属分析分支 | 主事实源、辅助落点和同步范围待分析 | 对照现有认知并形成建议 | `01-think/cross-case-code-topology-placement/summary.md` |
| 2026-08-09 | Think / 归属结论 | 三案例与现有认知完成对照 | 建议“AI 友好代码拓扑”进入新 L3 主文档；Design / docs 分别做执行与公开投影；具体项目写 L5 / 局部 README | 等待用户确认是否进入 Design | 确认归属方案 | `01-think/cross-case-code-topology-placement/summary.md` |
| 2026-08-09 | Think -> Design | 用户确认推进并拆分两个议题 | Think 完成；先更新项目 ADOC，Skill 打包产物后续单独设计 | Skill 承载位置与加载时机 deferred | 推进 Design 节点 1 | `02-design/design.md` |
| 2026-08-09 | Design -> Execute | ADOC quick Design Gate passed；用户已授权执行 | 固定 L3 主事实源、L1 / L3 / map 同步范围和术语边界 | Skill 节点继续 deferred | 执行 `wp-01-adoc-code-topology` | `03-execute/work-packages/wp-01-adoc-code-topology.md` |
| 2026-08-09 | Execute -> Design | `wp-01-adoc-code-topology` 验收通过 | 新增 L3 主事实源；同步八份 ADOC 摘要 / 入口；节点 1 完成 | Skill 承载位置、加载时机、内容深度与同步机制待设计 | 审计现有 Skill 打包与加载链路 | `02-design/design.md#节点-2skill-打包产物认知承载` |
| 2026-08-09 | Design / 节点 2 Brownfield | 用户确认继续推进 | 确认 inject + references 已支持渐进加载；识别 `aipd` 与 `aipd-case` 两个消费入口；形成双入口条件加载推荐方案 | 推荐架构待用户确认 | Context Boundary + Work Package Draft | `02-design/skill-runtime-projection.md` |
| 2026-08-09 | Design / 节点 2 Context Boundary | 用户确认双入口方案，并追问 Design 是否会在开发阶段被严格执行 | 双入口条件加载转为 confirmed；确认现有 Execute / Verify 有泛化 Guardrails，但缺少显式代码拓扑合同；提出 Design 决策、Execute 短护栏、Verify 结果审计 | 三段执行闭环待用户确认 | 固定 Context Boundary + Work Package Draft | `02-design/skill-runtime-projection.md#design---execute---verify-执行闭环` |
| 2026-08-09 | Design -> Execute / 节点 2 | 用户确认三段闭环并授权无其他 open 时直接执行 | Context Boundary、Work Package Draft、Readiness Gate passed；创建 `wp-02-skill-code-topology-runtime` | 无阻塞 open / assumed；install 仍需 build 后单独确认 | 修改 Skill 源码并 build / check-dist | `03-execute/work-packages/wp-02-skill-code-topology-runtime.md` |
| 2026-08-09 | Execute -> Verify / 节点 2 | `wp-02` 全部验收项通过；用户已授权本地验证连续推进 | 公共投影、双入口、三段合同、专项检查和两平台 dist 完成；未执行 install | 安装需要用户单独确认，不属于源码 Verify 阻塞 | 正式 Verify Case Contract 与设计护栏 | `04-verify/verify.md` |
| 2026-08-09 | Verify / internal passed | Case Contract、Work Package、Design Guardrails 与代码拓扑合同审计完成 | 所有验收项 passed；无需回跳；install 与公开 docs 分别属于用户选择和 deferred | 用户 install / 验收选择 | install + smoke 或跳过后 Close | `04-verify/verify.md` |
| 2026-08-10 | Verify / install preflight | 用户确认“可以安装一波” | 安装目标固定为 Codex 用户级 9 Skill + AIPD agents；新旧核心 Skill 校验值不同；旧 AIPD 入口按脚本清单清理 | 无 | 执行 install-codex + smoke | `04-verify/verify.md#用户验收状态` |
| 2026-08-10 | Verify -> Close | install-codex 与安装后 smoke 通过 | 9 Skill、3 Agent 与 dist 一致；公共投影、双入口、三段合同和旧入口清理均通过 | 公开 docs deferred；案例 02 / 03 目标拓扑仍待真实项目验证 | Close 判断与归档 | `05-close/close.md` |
| 2026-08-10 | Close / archive | Case Contract、长期认知与路径引用审计完成 | 已回写 L3 / L5 / map；公开 docs deferred；未实证案例只留 Case；无外部路径风险 | 无本 Case 阻塞项 | 移动 archive，结束 | `05-close/close.md` |

## 回跳 / 重开记录

| 时间 | 从哪里回跳 | 回到哪里 | 触发原因 | 更新内容 | 受影响下游 | 是否需用户确认 |
|---|---|---|---|---|---|---|
| 2026-08-09 | Design / requirements | Think / 案例采集 | 原任务从代码案例过早扩大为 AIPD 顶层分类；间隔后已失去清晰动机 | 重写 Case Contract；撤回 Design；创建案例 01 | 原需求契约、术语建议和后续文档改造计划全部失效 | 用户已明确 |
| 2026-08-09 | Execute / 节点 1 | Design / 节点 2 | ADOC 工作包完成，但 Case 的 Skill 承载目标尚未设计 | 保留节点 1 执行结果；新增节点 2 Design 恢复入口 | 后续 Skill work package | 不需要；这是用户已确认的两段式顺序 |

## Think 摘要

- **状态**：completed
- **关键问题**：AIPD 历次真实项目中，横向能力与纵向模块实际如何共存、为何如此取舍、随项目类型如何变化。
- **调研 / 比较分支**：
  - `01-think/case-study-01-qianlima-finance-frontend/summary.md` - 千里马纯前端财务系统：横向通用框架 + 纵向独立页面 / 组件。
  - `01-think/case-study-02-page-one-seo-site-portfolio/summary.md` - Page One：横向公共底层 + 纵向独立域名网站；当前属于已设计、未实证架构。
  - `01-think/case-study-03-guessword-themed-game-site/summary.md` - Guessword.io：页面与游戏分别纵向内聚，由页面组合游戏，并保留横向底层；当前只部分落地。
- **当前分析分支**：`01-think/cross-case-code-topology-placement/summary.md`。
- **当前结论**：项目不是“全面纵向”，而是横向基座、后置形成的横向共享能力与纵向业务上下文共存；纵向上下文可嵌套或显式组合。主事实源建议新建 `_adoc/L3-core/ai-friendly-code-topology.md`，不写入 AIPD 知识系统的 `vertical-concept-modules.md` / `horizontal-capabilities.md`。
- **术语校正**：新增多个纵向业务模块称为“并列扩展”，不再称“横向铺模块”。
- **回流位置**：案例收集完成后，先回到 Think 做跨案例分析；分析经用户确认后再决定是否进入 Design。

## Design 摘要

- **状态**：completed / node 2 Gate passed
- **节点 1 设计**：completed / Gate passed；新建 L3 代码拓扑主事实源，L1 / index / map 做摘要与路由，知识系统纵横文档只做命名空间说明。
- **节点 2 设计**：公共运行时投影注入 `aipd` 与 `aipd-case`；Design 形成项目合同、Execute 执行短护栏、Verify 审计真实结果；Readiness Gate passed。
- **说明**：2026-07-23 的“三系统 + Agent Entry”草案仍然失效；节点 2 不恢复这套旧分类。

## Execute 摘要

- **状态**：completed / nodes 1-2
- **完成工作包**：
  - `03-execute/work-packages/wp-01-adoc-code-topology.md`
  - `03-execute/work-packages/wp-02-skill-code-topology-runtime.md`
- **执行结果**：ADOC 主事实源与运行时投影、双入口、三段合同闭环、专项检查和两平台 dist 均完成。
- **残留风险**：尚未安装到用户环境；源码和打包产物无未通过项。
- **节点 2 结果**：公共运行时投影、双入口条件加载、三段合同闭环与专项 build / check-dist 均完成。

## 后续候选事项

- 公开 `docs/modules/context-decoupling.md` 是否同步改写，留待后续独立事项判断，不阻塞当前主线。

## Verify 摘要

- [x] 每个案例忠实反映用户提供的事实和当时取舍。
- [x] 跨案例结论能够指出证据来源、反例和适用边界。
- [x] 未经确认的案例观察没有被写成固定目录模板或已验证实践。
- [x] ADOC 节点的主事实源、摘要、路由、术语和文件范围通过工作包自检。
- [x] 整个 Case 的正式 Verify 已完成。

### 验收结果

- **状态**：completed / user accepted / Codex installed。
- **残留风险**：公开 docs 未同步；Page One / Guessword 的未来目标拓扑仍需真实项目验证，不阻塞本 Case。

## Close 归档候选 / 反向编织候选

| 候选内容 | 触发来源 | 当前状态 | 候选归属 | Close 判断 |
|---|---|---|---|---|
| 横向基座 + 横向共享能力 + 纵向业务上下文 + 显式组合边界 | 三案例跨案例分析 | 已抽象并完成 ADOC 回写 | `_adoc/L3-core/ai-friendly-code-topology.md`、map | 已回写；Close 不重复 |
| 复制完整纵向模块以降低共享状态复杂度 | 案例 01 | 已作为共享晋升前的阶段性手段写入 L3；技术栈细节仍待经验验证 | L3 / 技术栈经验 | L3 已回写 |
| 多站点工作空间中的公共 platform + 独立域名网站 | 案例 02 | 已设计、未实证，待后续站点验证 | L3 / docs / experience | 待判断 |
| SEO 站点作为细分需求入口并向 AI 主站引流 | 案例 02 | 增长架构候选，尚未实现 | L3 / L4 / L2 | 待判断 |
| 一个主题站内页面盒子与游戏盒子的组合关系 | 案例 03 | 当前单游戏已部分体现，多游戏形态尚未验证 | L3 / docs / experience | 待判断 |
| 共享页面模板与具体 SEO 页面应拆成不同对象 | 案例 03 | 术语缺口，等待跨案例分析和后续设计 | L3 / L5 | 待判断 |
| 公共运行时投影 + 双入口条件加载 + 三段代码拓扑合同 | 节点 2 Design / Execute / Verify | 已实现并通过 build / check-dist | L3 / L5 / map | 已回写；Close 不重复 |

## Close 摘要

- **状态**：completed / archived。
- **长期认知**：三类模块、显式组合、术语命名空间、运行时 owner 和三段合同均已回写 L3 / L5 / map。
- **仅留 Case**：三个案例原始事实、Page One / Guessword 尚未完整实证的目标拓扑和一次性设计过程。
- **deferred**：公开 `docs/modules/context-decoupling.md` 的用户教学叙事。
- **安装**：Codex 用户级 9 Skill、3 Agent 已安装并通过 smoke。
- **归档位置**：`_adoc/case/archive/c20-aipd-knowledge-execution-code-topology/`。

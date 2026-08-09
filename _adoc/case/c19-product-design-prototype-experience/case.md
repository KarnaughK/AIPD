# Case: c19-product-design-prototype-experience

> **本次事项目标**：从高关注度开源 Agent Skill 中提炼可指导产品文档与产品原型设计的方法论和强制迭代流程，并判断如何吸收进 AIPD。
> **当前 Phase**：Verify

## Case Contract

### 目标

- **目标**：形成并落盘一套有外部证据、可追溯来源、可在 AIPD Case 运行中自动触发的产品设计注意力与减法迭代机制。
- **方向 / OKR / 项目阶段关联**：AIPD 当前经验库已能指导特定代码项目开发，下一步需要补齐产品文档与产品原型设计能力，并防止 Agent 一次生成后直接交付。

### 要做

- 检索 GitHub 等公开来源中高关注度、与产品设计、UX、原型、需求文档相关的 Agent Skill / 方法仓库。
- 以 stars / 采用度为发现信号，同时审计内容质量、许可证、更新状态和与 AIPD 的适配度。
- 深读最相关候选，提炼方法论、阶段产物、检查表、回看机制、迭代 gate 和失败边界。
- 判断哪些应进入抽象规则、实践经验、Skill / Case phase 或 SOP，避免把方法论只写成一篇静态文章。
- 把确认后的最小机制写入实践经验、Case Design / Verify 规则和 Goal Mode 覆盖层，让运行中的 Case 自主回跳，而不是依赖每次任务 Prompt 重述方法。

### 不做

- 不把 stars 当作质量结论，也不照搬候选仓库全文。
- Think 阶段不直接修改 AIPD Skill、Case phase、SOP 或长期经验正文。
- 不复制许可证不允许再分发的源码或大段受版权保护内容。
- 不把纯视觉前端代码生成等同于产品需求、信息架构和交互原型设计。

### 完成标准

- [x] 有一份带当前 stars、来源、许可证和更新时间证据的候选清单。
- [x] 至少深读 3 个最相关候选，并区分“可吸收机制 / 不应照搬部分 / 缺失环节”。
- [x] 提炼一条要求 Agent 至少经历自检、反例扫描和再迭代的产品设计闭环。
- [x] 给出经验库、抽象规则、Skill / Case phase、SOP 的归属建议。
- [x] 用户确认后进入 Design，并将固定轮数修正为触发式回跳与自适应停止。
- [x] 具象经验、Design 条件入口、Verify Reduction Scan 和 Goal Mode 自主回跳语义已经写入源码。
- [x] AIPD build、dist 检查和安装后产物验证通过。

### 上下文索引

#### 层级判断

- **L2 Research**：外部 Agent Skill、产品设计方法、原型工作流、开源生态采用度。
- **L3 Core**：AIPD 的任务执行模型、SOP / AI 程序模型、文件优先 checkpoint。
- **L4 Product**：产品文档与产品原型设计将成为何种用户可调用能力。
- **L5 Dev**：后续若实现，需要决定 Skill 注入、phase gate、构建与平台适配。
- **局部 README**：当前不涉及页面代码；候选源码只作为 Think 证据。
- **Case / 历史 Work Package**：参考现有经验库边界与 `c18` 的文档产品经验，不读取无关历史 case。

#### 项目认知

- `_adoc/index.md` - 项目状态与认知入口。
- `_adoc/map.md` - 命中实践经验库、SOP、Case Think、Learn / Weave 入口。
- `_adoc/L3-core/horizontal-capabilities.md` - Case、SOP、文件 checkpoint 和经验回写关系。
- `_adoc/L4-product/index.md` - AIPD 现有产品能力与 Skill / SOP 边界。
- `aipd-skill/src/core/experience/index.md` - 当前实践经验分类、收录原则和源码资产边界。
- `aipd-skill/src/core/case/phases/think.md` - 本轮调研 checkpoint、停止条件和回流要求。

#### 页面 / 模块 README

- 无。

#### 代码入口

- `aipd-skill/src/core/experience/product-design-attention-reduction.md` - 具象案例、Attention Contract、Reduction Scan、Reduction Delta 与收敛边界。
- `aipd-skill/src/core/case/phases/design.md` - 产品类 Case 的条件式注意力契约入口。
- `aipd-skill/src/core/case/phases/verify.md` - 对真实产物执行 Reduction Scan 并决定是否回到 Design。
- `aipd-skill/src/core/case/goal-mode.md` - 绑定 Case 的目标模式下自主回跳、修正与重新验收。

#### Phase 材料入口

- `01-think/think.md` - 总问题、范围、候选比较和决策。
- `01-think/open-source-skill-scan/summary.md` - 外部 Skill 检索、证据、结论和回流位置。
- `02-design/design.md` - 最小吸收结构、触发循环、权限边界和文件计划。
- `03-execute/execute.md` - 源码落盘与执行状态。
- `03-execute/work-packages/wp-01-embed-triggered-reduction-loop.md` - 本次实现边界和验收记录。
- `04-verify/verify.md` - build、dist、语义和安装后产物验证。

#### 兜底搜索

- `rg "prototype|原型|产品设计|UX|PRD|experience|SOP" aipd-skill/src _adoc docs` - 地图未覆盖时定位现有规则和潜在冲突。

### 边界变更记录

- 2026-07-21：按用户当前指令创建；先做外部调研与吸收判断，不在 Think 阶段直接改长期经验库。
- 2026-07-22：用户否定固定“两轮 review / 三轮封顶”，要求避免僵硬流程和无差别变慢；改为产品类 Case 交付前一次低成本扫描，只有命中触发器才回到 Design，并按收敛证据停止。
- 2026-07-22：用户明确授权正式落盘，并要求机制主要在 AIPD Case 运行时生效，而不是依赖任务 Prompt；进入 Design / Execute 实现最小机制。

## Case Runtime

## Current Phase

Verify

## Phase State

- Think: completed -> `01-think/think.md`
- Design: completed -> `02-design/design.md`
- Execute: completed -> `03-execute/execute.md`
- Verify: completed -> `04-verify/verify.md`
- Close: pending -> `05-close/close.md`

## 当前焦点

- **当前要解决的问题**：Verify 已全部通过；是否进入 Close 完成 Case 归档？
- **当前游标**：`04-verify/verify.md`
- **最近 checkpoint**：用户已确认安装；用户级 9 个 AIPD Skill 与 3 个 Agent 模板安装成功，新规则和旧入口清理均验证通过。
- **下一步建议**：确认后进入 Close，整理最终归档记录并移动到 archive。
- **压缩后恢复入口**：`case.md#当前焦点` -> `04-verify/verify.md` -> `03-execute/work-packages/wp-01-embed-triggered-reduction-loop.md`
- **待确认项**：
  - [ ] 是否进入 Close 归档 c19。
- **阻塞项**：无。

## 状态卡记录

- **文件事实**：AIPD 已有 Case 回跳和 Goal Mode 自主 Gate，但此前没有产品注意力触发器、Reduction Delta 或自适应停止规则。
- **用户认知**：不希望依赖长 Prompt 或固定轮数；希望目标绑定 Case 后，Agent 在 Verify 自己发现不成立并滚回 Design。
- **冲突点**：早期 Think 的“两轮 review / 三轮封顶”与用户最新判断冲突，已按用户指令废弃。
- **当前 phase 条件**：源码实现完成，进入 Verify 做构建、dist 与安装后产物验证。
- **建议下一步**：完成本地构建验证，再按 Build / Install 边界询问安装。

## Checkpoint 记录

| 时间 | 位置 | 触发 | 已确认 / 已变化 | open / assumed | 下一步 | 恢复入口 |
|---|---|---|---|---|---|---|
| 2026-07-21 | Think | 调研前 | 已固定目标、范围、质量维度、停止条件和回流位置 | 最终吸收形态待调研后确认 | 扫描并深读高关注度候选 | `01-think/open-source-skill-scan/summary.md` |
| 2026-07-21 | Think | 调研完成 | 已完成 stars / 采用度核验、许可证过滤、5 组重点内容深读；形成初版分层吸收方向 | 固定轮数仍待真实案例校准 | 审计真实产品任务并讨论迭代机制 | `01-think/think.md#think-决策` |
| 2026-07-22 | Think -> Design | 用户确认并修正 | 废弃固定轮数；确认采用“Attention Contract -> 真实产物 Reduction Scan -> 触发回跳 -> Reduction Delta -> 自适应收敛” | 不新增大型 Skill / SOP | 完成最小设计并进入 Execute | `02-design/design.md` |
| 2026-07-22 | Execute -> Verify | 源码落盘 | experience、Design、Verify、Goal Mode 四个落点已实现 | Codex install 尚需用户确认 | build / dist / 安装后产物验证 | `04-verify/verify.md` |
| 2026-07-22 | Verify | 构建完成 | Claude / Codex 各 9 个 Skill 构建成功；check-dist、diff、目标注入检查通过 | 用户级 Codex 尚未安装 | 询问并执行 install，核验安装产物 | `04-verify/verify.md` |
| 2026-07-22 | Verify | 用户确认安装 | 用户级 9 个 AIPD Skill、3 个 Agent 模板安装成功；新经验与运行规则检出，旧 Case Skill 已清理 | 无 | 等待进入 Close 确认 | `04-verify/verify.md` |

## 回跳 / 重开记录

| 时间 | 从哪里回跳 | 回到哪里 | 触发原因 | 更新内容 | 受影响下游 | 是否需用户确认 |
|---|---|---|---|---|---|---|
| 2026-07-22 | Think 初版结论 | Think 决策 | 固定两轮 / 三轮会让普通任务变慢，也可能放大错误设计指标 | 改为触发式回跳、Reduction Delta 和自适应停止 | 原初版吸收方案失效 | 已由用户确认 |

## Think 摘要

- **状态**：completed。
- **关键问题**：如何把外部产品设计 / 原型方法吸收为 Agent 必须执行、必须自检、必须迭代的流程，而不是静态提示词。
- **调研 / 比较分支**：
  - `01-think/open-source-skill-scan/summary.md` - 高关注度候选、许可证、机制拆解和 AIPD 适配判断。
- **决策结论**：不照搬单一 Skill，也不新增大型僵硬流程；把真实案例方法写入 experience，用 Design Attention Contract 与 Verify Reduction Scan 形成条件式循环，Goal Mode 在 Case Contract 边界内自主回跳，按证据收敛而非固定轮数停止。

## Design 摘要

- **模式**：quick / docs-process。
- **当前节点**：readiness-gate completed。
- **结论**：经验正文保存具象方法；Design / Verify 提供条件 Gate；Goal Mode 接管内部回跳；不新建 phase、专用 Skill 或 SOP。

## Execute 摘要

- **状态**：completed。
- **Work Package**：`wp-01-embed-triggered-reduction-loop` completed，四个源码落点已写入。

## Verify 摘要

- **状态**：completed。
- **已完成**：源码结构和语义审查；build、check-dist、diff、两端最终产物注入检查、Codex install 与用户级安装产物核验。
- **待完成**：无；等待进入 Close 归档确认。

## Close 归档候选

- 外部产品设计与原型工作流中的稳定方法论。
- 可复用的产品设计自检、反例扫描、迭代和收敛机制。
- AIPD 经验库 / 抽象规则 / Skill / SOP 的新归属规则。

## 自迭代观察锚点

> 后续用 `aipd-learn` 审计 transcript / session / 执行记录时，检查 Agent 是否按这些锚点执行。

- [ ] Agent 是否读取 `_adoc/map.md`，或说明其缺失并使用 `rg` / README 兜底。
- [ ] Agent 是否读取本 case 上下文索引中的 L3 / L4 / L5 / 局部 README。
- [ ] Case 是否使用 contract + phase-first 目录结构，而不是回到顶层 `doc/` / `steps/` / `01-goal/`。
- [ ] 恢复 case 后是否先输出状态卡，没有直接跨 phase 推进。
- [ ] Think 阶段是否以分支目标推进，并明确结论回流位置。
- [ ] Design 阶段是否找到了复杂度爆点，并产出文件 / 文件夹级架构边界。
- [ ] Design 阶段是否先处理需求契约、confirmed / assumed / open、后端 / 前端设计，再做上下文解耦。
- [ ] Design / Execute / Verify 发现上游缺口时，是否记录了回跳原因、更新 artifact 和受影响下游。
- [ ] Design 产物是否经用户确认后才创建正式 Execute work package。
- [ ] 大调研、长执行、子 Agent 派发、phase 跳转和用户确认后，是否写了 checkpoint，而不是只留在聊天里。
- [ ] 压缩后恢复入口是否足以让新 Agent 判断当前游标、已确认结论、open / assumed 和下一步。
- [ ] Work Package 是否只放在 `03-execute/work-packages/`，并按架构边界横向铺模块。
- [ ] Verify 是否检查了设计护栏，没有只看代码是否运行。
- [ ] 如果执行偏离 SOP，能否判断偏离原因：提示词未执行 / map 缺失 / map 命中不清 / skill 流程不够硬 / 文档结构问题。

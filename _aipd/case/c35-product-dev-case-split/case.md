# Case: c35-product-dev-case-split

> **本次事项目标**：把 Case 分成产品 Case `cN-slug` 与开发 Case `cN_dev-slug`，并把可执行验收按两类 Case 分层写进 AIPD Case 规则
> **当前 Phase**：Verify

## Case Contract

> 本区是整个 case 的目标契约，每次恢复 case 都必须读取。

### 目标

- **目标**：降低 Case 的理解与执行复杂度。用户主要和 AI 在产品 Case 里对话，把想法准备成详尽需求；需求交给同号开发 Case 落进真实项目；开发完成后由产品 Case 做产品验收和收尾。
- **方向 / 项目阶段关联**：来自 grok 会话 `01a1c305-5cf4-7340-8613-e6a32f007794`（对照 Lauren / Dune 分享看 AIPD 的围栏与验证缺口）及本仓库 `premium-design-cheap-execution-workflow.md` 经验的后续讨论。用户判断：产品认知与代码落地排在同一条序列里，使流程细节超出用户可把控范围；AI 能用 demo 验证需求，产品与开发应分职责。

### 要做

- 编号：产品 Case `cN-slug`；开发 Case `cN_dev-slug`，与产品 Case 共用 N。
- 一对一：同一个 N 最多一个 `cN_dev`。一个开发 Case 装不下，说明产品 Case 该拆。
- 独立开发 Case：量大、不放心、需要独立验收的技术任务可以单独开 `cN_dev-slug`；小改动不开 Case。
- 骨架共用 Contract -> Think -> Design -> Execute -> Verify -> Close，类型只决定各 phase 重心：产品 Case 以 Think 为主体、Design 收成需求文档、Execute = 派出并等待开发 Case、Verify 按需求实际走用户动作；开发 Case 默认不走 Think、Design 先审核需求再过重 / 轻设计门槛、Verify 做命令层可执行检查。
- 交接物：产品 Case 建议覆盖五项（做什么 / 不做什么；用户路径和关键规则；验收动作与期望结果；已确认常量和暂定值；已用 demo 验证、开发不再推翻的结论）。这是准备清单，不是格式门禁；开发 Case 对收到的需求做审核分析，有疑问再问用户。
- 回路：开发发现需求冲突或不成立时交回产品 Case，开发 Case 不自行改产品目标。
- 生效边界：本规则生效前创建的 Case（含 c35）不改名，按传统 Case 运行。

### 不做

- 不发布新 AIPD 版本，不改 catalog / release 记录 / update-log；用户确认发布走 magpie，届时另行处理。
- 不加入“被外部 CLI 拉起的执行 Agent 跳过 AGENTS 流程”规则。
- 不把 raprap 经验升级为通用规则；不改用户未提交的 experience 文件。
- 不改历史 Case 和归档。
- 不 install、不 commit、不 push。

### 完成标准

- [x] `aipd-case` SKILL、Case overview（三份副本一致）、design / execute / verify phase、case / work-package / index 模板（各副本一致）写入新规则。
- [x] `docs/modules/case-and-step.md` 投影当前命名与两类 Case。
- [x] `./aipd-skill/scripts/check-skills` 通过；`rg` 不再出现“只允许 `cN-slug`”的旧表述。
- [ ] 在一个真实项目里跑通一对 `cN` + `cN_dev`（或一个独立 `cN_dev`），确认规则可用。
- [ ] 用户验收后 Close，并用 Weave 判断 `_aipd/knowledge` / `_aipd/map.md` 回写。

### 上下文索引

#### 知识域判断

- **Intent**：不改。
- **Research**：grok 会话中整理的 Lauren 分享，仅作讨论依据，不回写。
- **Core**：Case 生命周期对象（Close 后判断是否回写 `core/horizontal-capabilities.md`）。
- **Product**：Case 能力的用户可见行为（Close 后判断）。
- **Engineering**：Skill 副本一致性、`check-skills`。

#### 项目认知 / 代码入口

- `aipd-skill/skills/aipd-case/SKILL.md`
- `aipd-skill/skills/aipd-case/references/case/overview.md`（副本：`aipd-weave`、`aipd-update`）
- `aipd-skill/skills/aipd-case/references/case/phases/{design,execute,verify}.md`
- `aipd-skill/skills/aipd-case/references/case/templates/{case,work-package}.md`（副本：`aipd-update`）
- `aipd-skill/skills/aipd-init/references/case/templates/index.md`（副本：`aipd-update`）
- `docs/modules/case-and-step.md`
- `aipd-skill/skills/aipd-case/references/experience/premium-design-cheap-execution-workflow.md`（只读参考）

#### Phase 材料入口

- `02-design/design.md`
- `03-execute/execute.md`
- `03-execute/work-packages/wp-01-case-type-rules.md`
- `04-verify/verify.md`

#### 兜底搜索

- `rg "cN-slug|cN_dev|产品 Case|开发 Case" aipd-skill docs`

### 边界变更记录

- 2026-11-16：用户确认拆两类 Case、`cN` / `cN_dev` 命名、一对一、交接物五项（作为准备清单，开发 Case 做审核分析而非格式校验）；不升版，直接改源码；本 Case 自身按传统 Case 运行。

## Case Runtime

## Current Phase

Verify

## Phase State

- Think: skipped（结论在本对话与 grok 会话中已形成，直接写入 Contract）
- Design: completed -> `02-design/design.md`
- Execute: completed -> `03-execute/execute.md`
- Verify: in_progress -> `04-verify/verify.md`
- Close: pending

## 当前焦点

- **当前要解决的问题**：源码规则已写入，等待真实项目试跑
- **当前游标**：`04-verify/verify.md`
- **最近 checkpoint**：wp-01 完成，`check-skills` 通过
- **下一步建议**：用户挑一个真实项目开第一对 `cN` + `cN_dev`；跑通后回本 Case 验收、Close、Weave
- **压缩后恢复入口**：本文件 Case Contract → `04-verify/verify.md`
- **待确认项**：
  - [ ] 新增的“通用 Case”类型（不涉及代码落地的文档 / 流程 / 调研事项，以及规则生效前的旧 Case）是否保留
  - [ ] 发布方式（magpie）何时处理
- **阻塞项**：无

## Checkpoint 记录

| 时间 | 位置 | 触发 | 已确认 / 已变化 | open / assumed | 下一步 | 恢复入口 |
|---|---|---|---|---|---|---|
| 2026-11-16 | Case | 用户确认方案 | Contract 写入；Design quick | 通用 Case 类型为 assumed | Execute wp-01 | `case.md#Case Contract` |
| 2026-11-16 | Execute | wp-01 完成 | 规则写入 8 类文件，副本同步，check-skills 通过 | 同上 | 真实项目试跑 | `04-verify/verify.md` |

## Design 摘要

- **模式**：quick / docs-process
- **理由**：只改 Skill 规则、模板和文档，无代码拓扑变化

## Execute 摘要

- [x] `03-execute/work-packages/wp-01-case-type-rules.md` - 写入两类 Case 规则并同步副本

## Close 归档候选 / 反向编织候选

| 候选内容 | 触发来源 | 当前状态 | 候选归属 | Close 判断 |
|---|---|---|---|---|
| Case 分产品 / 开发两类、`cN_dev` 命名、一对一、交接物审核 | 本 Case | 已实现待验收 | Core `horizontal-capabilities.md`、Product、`_aipd/map.md` | 待判断 |
| 可执行验收分层：开发 Case 命令层、产品 Case 用户动作层 | 本 Case | 已实现待验收 | Core / Product | 待判断 |
| README、docs/guide 中的生命周期叙事是否需要补两类 Case | 本 Case | 未处理 | 用户文档 | 待判断 |

## Close 摘要

- **状态**：待验收
- **创建时间**：2026-11-16

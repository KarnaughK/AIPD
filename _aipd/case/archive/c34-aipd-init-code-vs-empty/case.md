# Case: c34-aipd-init-code-vs-empty

> **goal 模式绑定**：用户在本对话明确要求绑目标模式并推进完成本 Case。本执行层按 Case Goal Mode Overlay 自主通过内部 Gate。宿主 `/goal` 的目标文案：完成并关闭 `_aipd/case/c34-aipd-init-code-vs-empty`。
> **本次事项目标**：把公共 Skill `aipd` 收成只负责初始化的 `aipd-init`，并按仓库有没有代码分流
> **当前 Phase**：Close / completed

## Case Contract

> 本区是整个 case 的目标契约，每次恢复 case 都必须读取。后续所有 Think / Design / Execute / Verify / Close 都以这里为边界。

### 目标

- **目标**：让第一次把 AIPD 装进项目的入口只做初始化；空项目沿用方向 / 痛点路径，已有代码的项目先建壳、扫仓库、补 map 和 Core / Product / Engineering 索引。Intent 不再是初始化完成门槛。
- **方向 / 项目阶段关联**：兑现 c22 已确认的「五类 Knowledge 是并列存储，发现顺序由问题决定」；修正初始化仍按旧 L1→L5 发现仪式推进的错位。

### 要做

- 将公共 Skill `aipd` 重命名为 `aipd-init`；`/aipd`、`$aipd` 仅作为触发别名，不再当日常总入口。
- 初始化只看「有没有 AIPD」和「有没有代码」两刀。
- 空项目：建壳后走现有方向 / 痛点（Intent / Research）对话。
- 有代码：建壳后先扫仓库，再补 `map.md` 和 Core / Product / Engineering 索引；不先问方向和痛点；不写 Intent。
- 已接入且版本当前：说明已接入后停止，不改成任务路由器，不因缺 Intent 继续引导方向。
- 更新构建、校验、旧 Skill 清理、迁移器打包路径、其他 Skill 指向、知识域指南、工作区模板、项目 map / Product 和公开学习文档。

### 不做

- 不把框架品牌 AIPD 改名。
- 不新增 AIPD 发布版本（不写 V3）；这是 Skill 行为与文档合同，不改 Workspace Schema。
- 不恢复 L1-L5 物理目录或层级叙事。
- 不让 `aipd-init` 承担 Inbox / OKR / Case / Weave / 日常 map 加载；这些保持各自 Skill 与 `AGENTS.md`。
- 不在有代码路径上生成百科全书或伪造 Intent / Research。
- 不自动 install、commit、push、发布或迁移外部业务项目。
- 不改动进行中的 `c33-agents-on-demand-install`。

### 完成标准

- [x] 源码与 dist 的公共 Skill 集合含 `aipd-init`、不再含 `aipd`；install 会清掉旧 `aipd` 目录。
- [x] `aipd-init` 对 absent 项目按有代码 / 空项目分流；空项目仍引导 Intent，有代码项目先扫再写 map 与 3/4/5 索引。
- [x] Intent 不是初始化成功或已接入项目的完成门槛；manifest 版本仍是初始化成功标记。
- [x] 已接入且 `P = I` 时，`aipd-init` 报告已接入并停止，不进入 Mode A / 状态面板 / Case 推荐。
- [x] 日常 map-first 读取仍由 `AGENTS.md` 承担；代码拓扑条件读取只留在 `aipd-case`。
- [x] `check-dist` 与默认 Codex build 通过；公开文档与项目 map / Product 使用 `aipd-init` 和新分流。
- [x] 未经用户确认不 install / commit / push。

### 上下文索引

#### 知识域判断

- **Intent**：沿用已确认边界：五类 Knowledge 并列；初始化按问题生长，不按 L1-L5。本 Case 不改 `intent.md` 正文方向。
- **Research**：无新的外部调研；依据本对话审查结论。
- **Core**：Workspace 模块、发现链 / 存储链 / 读取链分离。
- **Product**：初始化能力从「总入口」收成「只初始化」；Map-first 改由 Agent Entry 承担。
- **Engineering**：Skill 目录、build / check-dist、legacy cleanup、migrator 打包路径。
- **局部 README**：`aipd-skill/README.md`。
- **Case / 历史 Work Package**：c22 提供并列 Knowledge 结论；不沿用其执行状态。

#### 项目认知

- `_aipd/map.md` - 初始化、Skill 维护、Update、Agent Entry
- `_aipd/knowledge/core/workspace-modules.md` - 三条链路
- `_aipd/knowledge/product/index.md`、`map.md` - 总入口与初始化产品线
- `_aipd/knowledge/engineering/index.md` - 构建安装
- `_aipd/knowledge/intent/intent.md` - 知识库并列分类

#### 代码入口

- `aipd-skill/src/skills/aipd/` - 现入口，将被 `aipd-init/` 替换
- `aipd-skill/src/core/knowledge/intent/guide.md` - 空项目方向仪式
- `aipd-skill/scripts/{build,check-dist,legacy-skills,migrate-project-schema}`
- `aipd-skill/src/core/workspace/project-state.md`、`templates/`
- `docs/guide/03-knowledge-base-minimum-loop.md`、`06-first-complete-flow.md`
- `docs/modules/skills-overview.md`、`README.md`

#### Phase 材料入口

- `01-think/think.md`
- `02-design/design.md`
- `02-design/decision-log.md`
- `02-design/brownfield-delta.md`
- `02-design/context-boundary.md`
- `02-design/readiness-gate.md`
- `03-execute/execute.md`
- `04-verify/verify.md`
- `05-close/close.md`

#### 兜底搜索

- `rg "src/skills/aipd[^-]|EXPECTED_SKILLS|/aipd|\\$aipd" aipd-skill docs _aipd README.md AGENTS.md`

### 边界变更记录

- 2026-09-11：用户确认两刀合同：Skill 改名 `aipd-init`；有代码 / 空项目分流。自己的老产品和别人的项目在初始化上同属有代码。授权 goal 模式推进到关闭。
- 2026-09-11：用户确认本 Case 到此结束。安装由 `c33-agents-on-demand-install` 负责，本 Case 不 install、不 commit。

## Case Runtime

## Current Phase

Close

## Phase State

- Think: completed -> `01-think/think.md`
- Design: completed -> `02-design/design.md`
- Execute: completed -> `03-execute/execute.md`
- Verify: completed / passed -> `04-verify/verify.md`
- Close: completed -> `05-close/close.md`

## 当前焦点

- **当前要解决的问题**：把已确认合同写成可执行设计并开始改 Skill
- **当前游标**：`02-design/readiness-gate.md`
- **最近 checkpoint**：Case Contract 已按用户确认写入
- **下一步建议**：Readiness Gate 通过后进入 Execute / wp-01
- **压缩后恢复入口**：`case.md` Case Contract → `02-design/design.md` → work packages
- **待确认项**：无（goal 模式内部 Gate；install / commit / push 仍需用户授权）
- **阻塞项**：无

## 状态卡记录

- **文件事实**：c34 新建；c33 仍在 Design，本 Case 不碰
- **用户认知**：`/aipd` 实际只用来初始化；有代码应先扫再补 3/4/5 和 map
- **冲突点**：现行 Skill 仍是总入口 + Intent 门槛
- **当前 phase 条件**：需求已确认，可一次写完 Design
- **建议下一步**：过 Readiness Gate，执行 wp-01

## Checkpoint 记录

| 时间 | 位置 | 触发 | 已确认 / 已变化 | open / assumed | 下一步 | 恢复入口 |
|---|---|---|---|---|---|---|
| 2026-09-11 | Case | 用户确认合同并要求 goal 模式推进 | 改名 aipd-init；有代码/空项目分流；Intent 非门槛 | 宿主 `/goal` 由用户在 TUI 创建；本对话按 overlay 推进 | Design → Execute | `case.md#Case Contract` |

## 回跳 / 重开记录

| 时间 | 从哪里回跳 | 回到哪里 | 触发原因 | 更新内容 | 受影响下游 | 是否需用户确认 |
|---|---|---|---|---|---|---|
| — | — | — | — | — | — | — |

## Think 摘要

- **状态**：completed
- **关键问题**：初始化把并列知识域又排成了 Intent-first
- **决策结论**：Skill 只做初始化；分流看有没有代码；日常读取留给 AGENTS.md / Leader / Case

## Design 摘要

### Design 模式

- **模式**：quick / docs-process
- **理由**：改的是 Skill 合同、校验路径和文档投影，无后端 / 前端 / 数据模型

### 当前 Design 节点

- **当前节点**：readiness-gate
- **节点状态**：in_progress
- **本节点要回答的问题**：能否进入 Execute
- **本节点停止点**：goal 模式内部 Gate，通过后直接执行
- **下一节点建议**：Execute / wp-01
- **节点 checkpoint**：见 `02-design/readiness-gate.md`

# Case: c{X.Y}-{case-name}

> **本次事项目标**：{一句话描述这次要处理什么}
> **当前 Phase**：Think / Design / Execute / Verify / Close

## 目录结构

新建 case 使用 contract + phase-first 结构。目标、边界、验收标准和上下文索引直接写在 `case.md` 的 Case Contract；case 内部不再生成 `01-goal/goal.md`，也不再按 `doc/`、`steps/`、`code/` 这类材料类型分层。

```text
_adoc/case/c{X.Y}-{case-name}/
├── case.md
├── 01-think/
│   ├── think.md
│   └── {research-or-decision-branch}/
│       ├── summary.md
│       ├── evidence.md
│       └── code/              # 可选：只放本 Think 分支需要的实验代码
├── 02-design/
│   ├── design.md
│   └── decision-log.md
├── 03-execute/
│   ├── execute.md
│   └── work-packages/
│       └── c{X.Y.1}-{工作包名}.md
├── 04-verify/
│   └── verify.md
└── 05-close/
    └── close.md
```

旧结构说明：旧 case 可能仍有 `doc/`、`steps/` 或 `01-goal/`。新 AIPD Case 不再兼容这些旧结构运行；继续推进前应先迁移为当前 contract + phase-first case。新建 case 不生成这些顶层目录。

## Case Contract

> 本区是整个 case 的目标契约，每次恢复 case 都必须读取。后续所有 Think / Design / Execute / Verify / Close 都以这里为边界。

### 目标

- **目标**：{本 case 要完成什么}
- **方向 / OKR / 项目阶段关联**：{为什么现在做}

### 要做

- {明确本次要完成的事项}

### 不做

- {明确不在本次范围内的事项}

### 完成标准

- [ ] {这个 case 结束时必须完成什么}
- [ ] {用户或系统如何判断完成}

### 上下文索引

> 这里列出本次 case 最强相关的上下文。执行时优先读这些，不全量扫描项目。

#### 层级判断

- **L2 Research**：{是否涉及用户 / 场景 / 需求 / 痛点 / 竞品 / 行业或玩法范式 / 调研资料}
- **L3 Core**：{是否涉及核心概念 / 领域语言 / 核心对象关系 / 项目成立模型}
- **L4 Product**：{是否涉及产品功能 / 业务边界 / 交互规则}
- **L5 Dev**：{是否涉及跨模块工程实现规则 / 前后端约定 / 调试 SOP}
- **局部 README**：{是否涉及页面 / 弹窗 / 组件内部实现地图}
- **Case / 历史 Work Package**：{是否需要读取历史 case 或 work package 执行记录}

#### 项目认知

- `_adoc/map.md` - {本次任务如何命中项目记忆地图；若缺失，说明兜底方式}
- `_adoc/L1-intent/intent.md` - {为什么需要读取}
- `_adoc/L2-research/index.md` - {为什么需要读取}
- `_adoc/L3-core/index.md` - {为什么需要读取}
- `_adoc/L4-product/{module}/index.md` - {为什么需要读取}
- `_adoc/L5-dev/{module}/README.md` - {为什么需要读取}

#### 页面 / 模块 README

- `src/{feature-or-page}/README.md` - {页面或模块局部认知}

#### 代码入口

- `src/{feature-or-page}/index.{ext}` - {入口职责}
- `src/{feature-or-page}/components/{component}.{ext}` - {相关组件}

#### Phase 材料入口

- `01-think/think.md` - {调研 / 比较 / 抉择}
- `02-design/design.md` - {复杂度爆点、文件 / 文件夹级架构和设计护栏}
- `03-execute/execute.md` - {执行总状态}
- `04-verify/verify.md` - {验收记录}
- `05-close/close.md` - {关闭记录}

#### 兜底搜索

- `rg "{关键词 1}|{关键词 2}" {搜索范围}` - {什么时候使用}

### 边界变更记录

> 执行中迭代出的“暂时做 / 暂时不做 / 完成标准变化 / 目标边界变化”写在这里。不要把边界变化混进 Design 或 Execute 过程。

- {YYYY-MM-DD：变更内容 / 触发原因 / 是否已获用户确认}

## Case Runtime

## Current Phase

Think / Design / Execute / Verify / Close

## Phase State

- Think: pending / in_progress / completed / skipped -> `01-think/think.md`
- Design: pending / in_progress / completed / skipped -> `02-design/design.md`
- Execute: pending / in_progress / completed / skipped -> `03-execute/execute.md`
- Verify: pending / in_progress / completed / skipped -> `04-verify/verify.md`
- Close: pending / in_progress / completed / skipped -> `05-close/close.md`

## 当前焦点

- **当前要解决的问题**：{一句话}
- **下一步建议**：{继续 Think / 进入 Design / 等用户确认 / 执行某 work package / 验收 / Close}
- **待确认项**：
  - [ ] {需要用户确认的问题}
- **阻塞项**：{无 / 描述}

## 状态卡记录

> 恢复 case 或关键 phase 跳转前，先记录状态卡，不要直接跨 phase 写回。

- **文件事实**：{case.md / phase 文件显示的状态}
- **用户认知**：{用户刚刚表达的状态或意图}
- **冲突点**：{无 / 描述}
- **当前 phase 条件**：{是否满足进入下一 phase}
- **建议下一步**：{需要用户确认的动作}

## Think 摘要

> 详细内容写入 `01-think/think.md`。调研、实验、数据采样或方案比较分支，放在 `01-think/{branch}/` 下。

- **状态**：pending / in_progress / completed / skipped
- **关键问题**：{当前卡点}
- **调研 / 比较分支**：
  - `01-think/{branch}/summary.md` - {分支目标、结论和回流位置}
- **决策结论**：{结论如何影响 Case Contract / Design / Execute / Verify / Close 归档候选}

## Design 摘要

> 详细内容写入 `02-design/design.md`。Design 是架构设计：找复杂度爆点，并把架构具象化到文件 / 文件夹级边界，让后续执行可以横向铺模块，而不是纵向堆版本。

### 复杂度爆点

- {这个 case 最容易膨胀、耦合或返工的节点是什么}

### 最小必要解耦

- {从爆点切开复杂度的设计}

### 文件 / 文件夹计划

- `{folder}/` - {职责}
  - `{file}` - {职责}

### 架构边界 / 护栏

- {主干职责}
- {横向模块接入方式}
- {特殊节点}
- {允许的局部重复}
- {禁止把复杂度堆回哪里}

### 设计文档

- `02-design/design.md`
- `02-design/decision-log.md`

## Execute 摘要

> Execute 详细状态写入 `03-execute/execute.md`。Work Package 只放在 `03-execute/work-packages/`，不是 case 顶层结构。

Work Package 不是“先做 A 再叠 B”的微步骤，而是可验收目标包。一个 work package 可以包含多个横向模块。

- [ ] `03-execute/work-packages/c{X.Y.1}-{工作包名}.md` - {一句话描述}（推荐 Agent：{agent 或留空}）

## 后续候选事项

> 未经用户确认的后续调整点只放这里，不创建 work package 文件，避免增加审核成本。
> 候选事项不是承诺要做的 work package，只是后续对话中值得继续判断的线索。

- {候选事项 1：触发条件 / 待确认问题}
- {候选事项 2：触发条件 / 待确认问题}

## Verify 摘要

> 详细验收记录写入 `04-verify/verify.md`。

- [ ] {验收标准 1}
- [ ] {验收标准 2}
- [ ] {验收标准 3}

### 验收结果

- **状态**：pending / passed / failed
- **残留风险**：{无 / 描述}

## Close 归档候选 / 反向编织候选

> 本区只记录 Close 阶段要复核的候选，不是长期知识库内容。进行中 case 里出现“以后可能要回写”的内容，先记在这里；case 未完成前不写入 L1-L5、局部 README 或 map。真正回写长期 ADOC、局部 README 或 map 时，必须等 case Close 后使用 `aipd-weave` 判断。

| 候选内容 | 触发来源 | 当前状态 | 候选归属 | Close 判断 |
|---|---|---|---|---|
| {判断、规则、入口或经验} | 用户讨论 / Think / Design / Execute / Verify / work package | 未完成 / 待验证 / 已实现待验收 / 已完成可评估 | L3 / L4 / L5 / README / map / SOP / 仅留 case | 待判断 |

默认规则：

- 未完成 case 中的候选不反编织到长期知识库。
- 未实现设计、未来计划、临时讨论和未完成 work package 继续留在 case。
- 已完成、已实现、已验收并能描述现有项目事实的候选，Close 时再交给 `aipd-weave` 判断是否回写。

## 自我察觉迭代

> 可选文件：`自我察觉迭代.md`。用于记录本 case 执行中暴露出来的 AIPD Case 机制问题、协作摩擦和可回流到 skill / 模板 / Agent Entry / SOP 的改进线索。该文件不参与普通项目认知 map，只在 case Close 或 AIPD 框架迭代时读取。

- [ ] Close phase 是否检查了 `自我察觉迭代.md`。
- [ ] 是否整理了“原判断 -> 用户纠偏 -> 修正产物 -> 可回流规则”。

## 自迭代观察锚点

> 后续用 `aipd-learn` 审计 transcript / session / 执行记录时，检查 Agent 是否按这些锚点执行。

- [ ] Agent 是否读取 `_adoc/map.md`，或说明其缺失并使用 `rg` / README 兜底。
- [ ] Agent 是否读取本 case 上下文索引中的 L3 / L4 / L5 / 局部 README。
- [ ] Case 是否使用 contract + phase-first 目录结构，而不是回到顶层 `doc/` / `steps/` / `01-goal/`。
- [ ] 恢复 case 后是否先输出状态卡，没有直接跨 phase 推进。
- [ ] Think 阶段是否以分支目标推进，并明确结论回流位置。
- [ ] Design 阶段是否找到了复杂度爆点，并产出文件 / 文件夹级架构边界。
- [ ] Design 产物是否经用户确认后才创建正式 Execute work package。
- [ ] Work Package 是否只放在 `03-execute/work-packages/`，并按架构边界横向铺模块。
- [ ] Verify 是否检查了设计护栏，没有只看代码是否运行。
- [ ] 如果执行偏离 SOP，能否判断偏离原因：提示词未执行 / map 缺失 / map 命中不清 / skill 流程不够硬 / 文档结构问题。

## Close 摘要

> 详细关闭记录写入 `05-close/close.md`。

- **状态**：待开始 / 执行中 / 待验收 / 完成待归档 / 已归档 / 已停止
- **创建时间**：{YYYY-MM-DD}
- **归档时间**：{YYYY-MM-DD 或留空}
- **归档位置**：{archive path 或留空}

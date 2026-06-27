# Case: c{X.Y}-{case-name}

> **本次事项目标**：{一句话描述这次要处理什么}
> **当前 Phase**：Goal / Think / Design / Execute / Verify / Close

## 目录结构

新建 case 使用 phase-first 结构。case 内部不再按 `doc/`、`steps/`、`code/` 这类材料类型分层；每个 phase 自己收纳本阶段的文档、实验、分支材料和执行记录。

```text
_adoc/case/c{X.Y}-{case-name}/
├── case.md
├── 01-goal/
│   └── goal.md
├── 02-think/
│   ├── think.md
│   └── {research-or-decision-branch}/
│       ├── summary.md
│       ├── evidence.md
│       └── code/              # 可选：只放本 Think 分支需要的实验代码
├── 03-design/
│   ├── design.md
│   └── decision-log.md
├── 04-execute/
│   ├── execute.md
│   └── work-packages/
│       └── c{X.Y.1}-{工作包名}.md
├── 05-verify/
│   └── verify.md
└── 06-close/
    └── close.md
```

旧结构说明：旧 case 可能仍有 `doc/` 和 `steps/`。新 AIPD Case 不再兼容旧结构运行；继续推进前应先迁移为 phase-first case。新建 case 不生成这两个顶层目录。

## Current Phase

Goal

## Phase State

- Goal: pending / in_progress / completed / skipped -> `01-goal/goal.md`
- Think: pending / in_progress / completed / skipped -> `02-think/think.md`
- Design: pending / in_progress / completed / skipped -> `03-design/design.md`
- Execute: pending / in_progress / completed / skipped -> `04-execute/execute.md`
- Verify: pending / in_progress / completed / skipped -> `05-verify/verify.md`
- Close: pending / in_progress / completed / skipped -> `06-close/close.md`

## 1. Goal 摘要

> 详细内容写入 `01-goal/goal.md`。case.md 只保留恢复任务所需的压缩事实和链接。

- **目标**：{本 case 要完成什么}
- **方向 / OKR / 项目阶段关联**：{为什么现在做}
- **完成标准**：
  - [ ] {这个 case 结束时必须完成什么}
  - [ ] {用户或系统如何判断完成}

## 2. 上下文索引

> 这里列出本次 case 最强相关的上下文。执行时优先读这些，不全量扫描项目。

### 层级判断

- **L2 Research**：{是否涉及用户 / 场景 / 需求 / 痛点 / 竞品 / 行业或玩法范式 / 调研资料}
- **L3 Core**：{是否涉及核心概念 / 领域语言 / 核心对象关系 / 项目成立模型}
- **L4 Product**：{是否涉及产品功能 / 业务边界 / 交互规则}
- **L5 Dev**：{是否涉及跨模块工程实现规则 / 前后端约定 / 调试 SOP}
- **局部 README**：{是否涉及页面 / 弹窗 / 组件内部实现地图}
- **Case / 历史 Work Package**：{是否需要读取历史 case 或 work package 执行记录}

### 项目认知

- `_adoc/map.md` - {本次任务如何命中项目记忆地图；若缺失，说明兜底方式}
- `_adoc/L1-intent/intent.md` - {为什么需要读取}
- `_adoc/L2-research/index.md` - {为什么需要读取}
- `_adoc/L3-core/index.md` - {为什么需要读取}
- `_adoc/L4-product/{module}/index.md` - {为什么需要读取}
- `_adoc/L5-dev/{module}/README.md` - {为什么需要读取}

### 页面 / 模块 README

- `src/{feature-or-page}/README.md` - {页面或模块局部认知}

### 代码入口

- `src/{feature-or-page}/index.{ext}` - {入口职责}
- `src/{feature-or-page}/components/{component}.{ext}` - {相关组件}

### Phase 材料入口

- `01-goal/goal.md` - {目标和边界}
- `02-think/think.md` - {调研 / 比较 / 抉择}
- `03-design/design.md` - {复杂度爆点、最小解耦和设计护栏}
- `04-execute/execute.md` - {执行总状态}
- `05-verify/verify.md` - {验收记录}

### 兜底搜索

- `rg "{关键词 1}|{关键词 2}" {搜索范围}` - {什么时候使用}

## 3. 本次边界

### 要做

- {明确本次要完成的事项}

### 不做

- {明确不在本次范围内的事项}

## 4. 约束

- **Dev**：{需要遵守的研发约束}
- **Product**：{需要遵守的产品边界}
- **Context**：只读取本 case 上下文索引及当前 phase / work package 明确要求的文件，除非执行中发现必要缺口。

## 5. Think 摘要

> 详细内容写入 `02-think/think.md`。调研、实验、数据采样或方案比较分支，放在 `02-think/{branch}/` 下。

- **状态**：pending / in_progress / completed / skipped
- **关键问题**：{当前卡点}
- **调研 / 比较分支**：
  - `02-think/{branch}/summary.md` - {分支目标和结论}
- **决策结论**：{结论如何影响 Design 或 Execute}

## 6. Design 摘要

> 详细内容写入 `03-design/design.md`。Design 的目标不是完整抽象所有概念，而是找到复杂度爆点，并对爆点做最小必要解耦，让后续执行可以横向铺模块，而不是纵向堆版本。

### 复杂度爆点

- {这个 case 最容易膨胀、耦合或返工的节点是什么}

### 最小必要解耦

- {从爆点切开复杂度的设计}

### 架构边界 / 护栏

- {主干职责}
- {横向模块接入方式}
- {特殊节点}
- {禁止把复杂度堆回哪里}

### 设计文档

- `03-design/design.md`
- `03-design/decision-log.md`

## 7. Execute 摘要

> Execute 详细状态写入 `04-execute/execute.md`。Work Package 只放在 `04-execute/work-packages/`，不是 case 顶层结构。

Work Package 不是“先做 A 再叠 B”的微步骤，而是可验收目标包。一个 work package 可以包含多个横向模块。

- [ ] `04-execute/work-packages/c{X.Y.1}-{工作包名}.md` - {一句话描述}（推荐 Agent：{agent 或留空}）

## 8. 后续候选事项

> 未经用户确认的后续调整点只放这里，不创建 work package 文件，避免增加审核成本。
> 候选事项不是承诺要做的 work package，只是后续对话中值得继续判断的线索。

- {候选事项 1：触发条件 / 待确认问题}
- {候选事项 2：触发条件 / 待确认问题}

## 9. Verify 摘要

> 详细验收记录写入 `05-verify/verify.md`。

- [ ] {验收标准 1}
- [ ] {验收标准 2}
- [ ] {验收标准 3}

### 验收结果

- **状态**：pending / passed / failed
- **残留风险**：{无 / 描述}

## 10. Weave 反向编织候选

> 本区只记录候选归属。真正回写长期 ADOC、局部 README 或 map 时，使用 `aipd-weave` 先给回写方案，用户确认后再写入。

- `_adoc/L2-research/{topic}.md` - {可能需要沉淀的外部世界资料、竞品、场景、痛点或调研结论}
- `_adoc/L3-core/{topic}.md` - {可能需要沉淀的核心概念、标准名、对象关系、项目成立模型或常见误解}
- `_adoc/L4-product/{module}/` - {可能需要沉淀的产品功能边界、业务规则或用户可见行为}
- `_adoc/L5-dev/{module}/` - {可能需要沉淀的工程规则、跨模块实现逻辑或调试经验}
- `src/{feature-or-page}/README.md` - {可能需要沉淀的局部代码入口或修改注意事项}
- `_adoc/map.md` - {可能需要新增的高频检索入口}
- 当前 phase / work package 执行记录 - {只对本 case 有意义的一次性过程}

## 11. 自迭代观察锚点

> 后续用 `aipd-learn` 审计 transcript / session / 执行记录时，检查 Agent 是否按这些锚点执行。

- [ ] Agent 是否读取 `_adoc/map.md`，或说明其缺失并使用 `rg` / README 兜底。
- [ ] Agent 是否读取本 case 上下文索引中的 L3 / L4 / L5 / 局部 README。
- [ ] Case 是否使用 phase-first 目录结构，而不是回到顶层 `doc/` / `steps/`。
- [ ] Think 阶段是否只在信息不足或需要抉择时展开，没有把普通执行问题过度调研化。
- [ ] Design 阶段是否找到了复杂度爆点，而不是完整抽象所有概念。
- [ ] Work Package 是否只放在 `04-execute/work-packages/`，并按架构边界横向铺模块。
- [ ] Verify 是否检查了设计护栏，没有只看代码是否运行。
- [ ] 如果执行偏离 SOP，能否判断偏离原因：提示词未执行 / map 缺失 / map 命中不清 / skill 流程不够硬 / 文档结构问题。

## 12. Close 摘要

> 详细关闭记录写入 `06-close/close.md`。

- **状态**：待开始 / 执行中 / 待验收 / 完成待归档 / 已归档 / 已停止
- **创建时间**：{YYYY-MM-DD}
- **归档时间**：{YYYY-MM-DD 或留空}
- **归档位置**：{archive path 或留空}

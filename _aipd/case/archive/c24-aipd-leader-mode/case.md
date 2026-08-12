# Case: c24-aipd-leader-mode

> **本次事项目标**：在普通 AIPD Case 执行层之上建立只由用户显式启动的项目 Leader，使 AI 能围绕一个 Mission 探索方向、拆分并调度多个 Case task、总体验收和恢复项目推进状态
> **当前 Phase**：Close / completed

> **恢复型归档说明**：本功能先通过用户讨论、源码实现、构建安装和项目 Update 完成，随后在收尾时发现所沿用的 C23 已经归档。本 Case 根据真实对话、提交和验证证据补建，只做事实压缩与归档，不声称当时曾按这些文件顺序推进。

## Case Contract

### 目标

- **目标**：把“人逐 Case 驾驶”与“AI 作为项目负责人推进”区分为两种可切换模式，并为后者提供明确角色、运行边界、工作记忆和 Codex task 编排入口。
- **方向 / 项目阶段关联**：提高人的决策层级，让 Leader 承担探索、方向澄清、Case 分发和总验收，同时继续复用已经验证的 Case 执行系统。

### 要做

- 定义 User -> Leader task -> Case task -> Child Agent / tools 四层关系。
- 新增显式 `$aipd-leader` Skill；自然语言、任务复杂度和多 Case 不自动启动。
- 明确一个项目一个 Leader、同一时刻一个 active Mission、一个 Case 一个 Codex task。
- 建立 `_aipd/leader/` 工作记忆边界和反向归属规则，不复制 Knowledge / Case / OKR / SOP / Map / README / 代码事实源。
- 固定用户确认的运行策略：Leader task 使用 `gpt-5.6-sol / max / Fast`，Case task 使用 `gpt-5.6-sol / high`，Fast 继承当前 Codex 配置。
- 把 Leader 作为 AIPD V2 发布，完成 build、`check-dist`、用户级安装、本项目 V1 -> V2 Update、提交与 `main` 整合。

### 不做

- 不让普通 AIPD 自动升级为 Leader。
- 不并发多个 Leader 或多个 active Mission。
- 不让 Case task 创建新的同级 Codex task或承担跨 Case 方向判断。
- 不把 Leader 工作空间变成第六类 Knowledge、代码目录或永久杂物箱。
- 不由 Skill 猜测未被用户明确指定的模型；当前 Leader 模型仍由用户在启动 task 时设置。

### 完成标准

- [x] `$aipd-leader` 只能显式调用，Skill 元数据禁止隐式启动。
- [x] Leader、Case task、Child Agent 和工具边界在源码、Agent Entry 和项目文档中一致。
- [x] Leader 工作记忆具备反向归属、恢复和清理合同。
- [x] V2 release catalog、record、current authority、manifest 模板和 Update 路径一致。
- [x] 默认 Codex build / `check-dist`、release bundle、Schema migrator 和 Leader 合同验证通过。
- [x] 10 个 Skill 与 3 个 Codex Agent 安装到用户级目录并与 dist 一致。
- [x] 本项目已由 V1 更新到 V2，Interaction Protocol 与项目定制保持不变。
- [x] 功能提交已推送，代码已整合到本地 `main`；本归档记录随 `main` 收尾提交推送。

### 上下文索引

#### 知识域判断

- **Intent**：用户确认 AI 可以从执行辅助者上升为项目负责人，但必须围绕澄清后的项目方向推进。
- **Research**：来源为真实 Codex 多 task / Case 编排实践，不新增外部事实。
- **Core**：Leader 项目主导编排模型、文件优先恢复和四层关系。
- **Product**：显式启动、Mission、Case task 调度、总验收和工作空间用户行为。
- **Engineering**：Codex task 创建、模型层级、Skill 隐式调用策略、build / install / release 校验。
- **局部 README**：框架源码文档、Leader 模块文档和 Skill 本体即实现入口。
- **Case / 历史 Work Package**：C23 只提供 V1 发布与 Update 基线；本 Case 不修改 C23 历史归档。

#### 项目认知

- `_aipd/knowledge/core/index.md`、`horizontal-capabilities.md` - Leader 核心成立模型与横向能力。
- `_aipd/knowledge/product/index.md`、`map.md` - Leader 用户可见功能和入口。
- `_aipd/knowledge/engineering/index.md` - Codex 模型与 task 运行合同。
- `_aipd/map.md`、`_aipd/leader/index.md` - 显式路由和项目工作记忆边界。

#### 代码入口

- `aipd-skill/src/skills/aipd-leader/SKILL.md` - 显式 Leader 入口。
- `aipd-skill/src/skills/aipd-leader/agents/openai.yaml` - 禁止隐式调用。
- `aipd-skill/src/core/leader/` - 平台无关 Leader 合同与工作空间模板。
- `aipd-skill/src/platforms/codex/core/leader/runtime.md` - Codex task 运行规则。
- `aipd-skill/src/core/updates/` - V2 发布记录与当前权威。
- `aipd-skill/scripts/check-dist` - Leader 发布与隐式调用回归验证。

#### Phase 材料入口

- `01-think/think.md` - 用户讨论中形成的问题与结论。
- `02-design/design.md` - 角色层级、启动边界、工作记忆和模型合同。
- `03-execute/execute.md` - 真实实现、安装、Update 与 Git 证据。
- `03-execute/work-packages/wp-01-aipd-leader-v2.md` - 恢复后的单一执行结果包。
- `04-verify/verify.md` - 验收记录。
- `05-close/close.md` - Weave、归档和分支整合记录。
- `自我察觉迭代.md` - Case 建立时机与分支复用暴露的流程缺口。

#### 兜底搜索

- `rg "aipd-leader|Project Leader|Mission|Codex task|allow_implicit_invocation" _aipd aipd-skill/src docs README.md AGENTS.md`

### 边界变更记录

- 2026-08-12：从“任何 Agent 进入 AIPD 都获得更好辅助”扩展为可选的“AI Leader 负责项目推进”；不是替换普通 Case 模式。
- 2026-08-12：用户确认 Leader 必须通过 Skill 主动调用，不能自动启动。
- 2026-08-12：用户确认 Leader / Case task 的模型层级与 Fast 配置边界。
- 2026-08-12：收尾时确认 C23 已经归档，因此新建 C24 做恢复型归档，不重写 C23 历史。

## Case Runtime

## Current Phase

Close

## Phase State

- Think: completed / reconstructed from conversation -> `01-think/think.md`
- Design: completed / reconstructed from confirmed decisions -> `02-design/design.md`
- Execute: completed / reconstructed from commit and external actions -> `03-execute/execute.md`
- Verify: completed / passed -> `04-verify/verify.md`
- Close: completed -> `05-close/close.md`

## 当前焦点

- **当前要解决的问题**：无；功能、安装、项目 Update、Weave 审计和本地 `main` 整合均已完成。
- **当前游标**：`05-close/close.md`
- **最近 checkpoint**：`main` 已快进到 `898b6bc`，长期知识无需重复追加，C24 以恢复型 Case 归档。
- **下一步建议**：把本归档提交推送到 `origin/main`，保持工作树停在干净的 `main`。
- **压缩后恢复入口**：本文件 -> `05-close/close.md`。
- **待确认项**：无。
- **阻塞项**：无。

## 状态卡记录

- **文件事实**：C23 已归档；本次 Leader V2 已在 `898b6bc` 实现并推送功能分支。
- **用户认知**：用户确认功能已完成，要求 Case 归档、Weave、提交、分支合并和最终清理。
- **冲突点**：新功能没有在执行前建立独立 Case，且复用了已归档 C23 的分支名。
- **当前 phase 条件**：实现与验收证据完整，可以恢复为独立 C24 并直接 Close。
- **建议下一步**：不重开 C23；C24 归档后把 `main` 推送到远端。

## Checkpoint 记录

| 时间 | 位置 | 触发 | 已确认 / 已变化 | open / assumed | 下一步 | 恢复入口 |
|---|---|---|---|---|---|---|
| 2026-08-12 | Close recovery | 用户要求完整收尾 | C23 已归档；Leader V2 具备完整实现、验证、安装和 Update 证据 | 无 | 建立 C24 恢复型归档 | `05-close/close.md` |
| 2026-08-12 | Git integration | 用户授权分支合并 | 本地 `main` 从 `e9b0866` 快进到 `898b6bc` | 远端 main 待推送 | 提交归档并推送 main | `05-close/close.md#Git--外部动作` |

## Think 摘要

- **状态**：completed；详见 `01-think/think.md`。
- **关键问题**：为什么线程级 Agent 能完成普通子 Agent 没完成的复杂推进，以及 Case 之外是否需要一个负责探索和跨 Case 判断的角色。
- **决策结论**：保留 Case 作为执行闭环，在其上增加显式 Leader；Leader 对 Mission 负责，Case task 对单个短周期目标负责，Child Agent 只在 Case 内承担局部执行或调研。

## Design 摘要

- **模式**：full / recovered。
- **复杂度爆点**：如果 Leader、Main Agent、Case task 和 Child Agent 不分层，会出现自动升级、递归建 task、工作记忆重复和方向责任不清。
- **最小必要解耦**：用显式 Skill 切换模式；用独立 Leader 合同管理 Mission / task；继续复用 Case；工作记忆按反向归属保持最小。
- **Readiness Gate**：依据用户逐项确认的角色、启动、空间和模型策略判定 passed。

## Execute 摘要

- **状态**：completed。
- [x] `03-execute/work-packages/wp-01-aipd-leader-v2.md` - Leader V2 源码、发布、安装、项目 Update 与 Git 集成。

## Verify 摘要

- **状态**：passed；详见 `04-verify/verify.md`。
- **残留风险**：Leader 尚需在更多真实项目中观察其自主工作记忆如何自然生长；这是产品观察，不影响当前能力关闭。

## Close 归档候选 / 反向编织候选

| 候选内容 | 触发来源 | 当前状态 | 候选归属 | Close 判断 |
|---|---|---|---|---|
| 显式 Leader、四层关系、一个 Mission / 多 Case task | 用户讨论 / 实现 / Verify | 已完成可评估 | Core / Product / Map | 已回写，避免重复 |
| Leader 工作记忆反向归属和清理 | 用户确认 / 实现 | 已完成可评估 | Core / Product / Leader / Map | 已回写，避免重复 |
| Codex Leader / Case task 模型策略 | 用户确认 / 实现 | 已完成可评估 | Engineering / runtime | 已回写 |
| C23 归档后复用分支而未及时建立新 Case | Close 审计 | 已验证流程缺口 | `aipd-learn` 候选 / 仅留 Case | 写入 `自我察觉迭代.md`，不在本次扩写框架规则 |
| 对话全过程、临时命名和多轮措辞 | 当前讨论 | 一次性过程 | 仅留 transcript / Case 摘要 | 不回写 |

## Close 摘要

- **状态**：已归档
- **创建时间**：2026-08-12（恢复型归档建立时间）
- **归档时间**：2026-08-12
- **归档位置**：`_aipd/case/archive/c24-aipd-leader-mode/`

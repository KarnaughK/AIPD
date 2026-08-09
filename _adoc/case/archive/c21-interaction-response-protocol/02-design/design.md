# c21 Design

## 当前 Design 节点

- **Case 类型**：docs / process
- **Design 模式**：quick
- **当前节点**：readiness-gate
- **节点状态**：completed
- **停止点**：Readiness Gate 已通过；等待用户确认进入 Execute。
- **下一节点**：Execute / `wp-01-upgrade-interaction-response-protocol`
- **恢复入口**：本页“Design Readiness Gate”和“Work Package 草案”。

## Design Intake

### 当前缺口

- 需求和模块命名已经由用户确认。
- 不需要外部调研、代码实验、后端设计或前端设计。
- 主要风险不是技术复杂度，而是只改标题、遗漏生成依赖和行为边界，或者手工修改构建产物造成源 / 产物漂移。

### Design 模式判断

- 选择 `quick`。
- 节点为：requirements（已由用户确认）-> brownfield（已完成）-> context-boundary（已确认）-> work-package-draft（当前）-> readiness-gate。
- 实践经验索引没有与 Agent 回复生成协议直接匹配的条目，本 Case 不额外加载经验正文。

## 需求契约

### Problem

当前等级 2 Interaction Protocol 已经要求 AI 先复述、再展开、最后给结论，但仍有两个缺口：

1. 标题“我理解你的意思是 / 我的判断过程 / 可继续追”不够自然或不够通用。
2. 结尾只有横向可追问方向，没有一个与其职责分离、自然向下的“下一步”。

### Confirmed Structure

```md
### 我理解
### 展开说说
### 结论
### 横向拓展
### 下一步
```

### Confirmed Intent

- “我理解”是固定回复握手，不是可按场景替换的标题。
- AI 先显式复述用户目标、问题和边界，再基于用户原话与这次复述继续展开。
- “结论”必须在展开之后，避免输出先行结论后再由后文反向辩护。
- “横向拓展”负责相邻方向。
- “下一步”负责自然向下，但不要求当前一定有任务执行，也不自动授予执行权限。

## Brownfield Delta

### 当前实现事实

- `aipd-skill/src/core/agent-entry/interaction-style.md` 是唯一源模板。
- `aipd-skill/src/skills/aipd/SKILL.md` 和 `aipd-skill/src/skills/aipd-update/SKILL.md` 只负责读取、安装和同步模板，不复制五段正文。
- `aipd-skill/scripts/build` 根据 `inject-from-core` 把源模板复制到 Codex / Claude 产物。
- 当前生成影响面共四份：
  - `aipd-skill/dist/codex/skills/aipd/references/agent-entry/interaction-style.md`
  - `aipd-skill/dist/codex/skills/aipd-update/references/agent-entry/interaction-style.md`
  - `aipd-skill/dist/claude/skills/aipd/references/agent-entry/interaction-style.md`
  - `aipd-skill/dist/claude/skills/aipd-update/references/agent-entry/interaction-style.md`
- 当前仓库 `AGENTS.md` 已启用等级 2，需要同步实例区块。
- `aipd-skill/README.md` 只描述文件用途，不包含旧标题，无需修改。

### Delta

- **ADDED**：`下一步` 模块；五段生成依赖和边界规则。
- **MODIFIED**：源模板讨论 / 分析段；当前 `AGENTS.md` 已启用实例；四份 build 产物。
- **REMOVED**：当前有效协议的旧标题“我理解你的意思是 / 我的判断过程 / 可继续追”。

### 不能破坏的旧行为

- 讨论、分析、判断、反驳和方案比较仍使用结构化回复。
- 明显简单的事实问答、状态确认、命令输出转述或一句话答复仍可自然短答。
- 用户明确只讨论时不自动修改文件。
- 执行 / 修改场景继续使用原有工作流和“已完成”交付模板。
- 长答仍只在用户明确触发时展开。
- install 仍需用户明确确认。

## 建议协议与文件边界

### 模块规则

#### 我理解

- 固定为第一块。
- 用一句话复述用户当前真正想推进、确认、讨论或询问的内容。
- 只做对齐，不评价方案，不提前给结论。

#### 展开说说

- 固定为第二块。
- 基于用户原话和“我理解”中的显式复述，展开影响结论的关键依据、概念关系和取舍。
- 只呈现对用户有用的判断摘要，不要求输出完整内部推理，也不写成无边界教程。
- 如果展开时发现首段理解有误，应先明确修正，再继续形成结论。

#### 结论

- 固定为第三块。
- 只能在前两块之后收束，通常 1-3 句。

#### 横向拓展

- 固定为第四块。
- 最多 3 个相邻方向，只列标题，不展开。
- 不把“还能问什么”冒充为任务下一步。

#### 下一步

- 固定为第五块。
- 优先只给 1 个最自然的向下动作。
- 可以是继续讨论、补充信息、确认方案、执行修改、运行验证或结束当前事项，不强行假设正在推进工程任务。
- 如果下一步需要新的授权、外部副作用或扩大范围，应明确请求确认，不能直接执行。

### 文件边界

- **手工维护**
  - `aipd-skill/src/core/agent-entry/interaction-style.md`
  - `AGENTS.md` 的 `AIPD-INTERACTION-STYLE` 区块
  - 本 Case 的 phase / work package 状态文件
- **构建生成**
  - Codex / Claude 的 `aipd` 与 `aipd-update` 四份 `interaction-style.md`
- **保持不变**
  - `aipd-skill/src/skills/aipd/SKILL.md`
  - `aipd-skill/src/skills/aipd-update/SKILL.md`
  - `aipd-skill/README.md`
  - 执行 / 修改回复模板与长答规则

## Confirmed / Assumed / Open

### Confirmed

- 五段标题和顺序。
- 首段固定复述握手。
- 先展开、后结论。
- 横向拓展与下一步分离。
- 可以按完整 Case 流程修改相关内容。

### Assumed

- 保留当前“明显简单回答可自然短答”的例外。
- “横向拓展”和“下一步”在进入结构化讨论模板时默认都出现；内容保持短。
- 源模板和当前项目实例手工同步，dist 只由 build 生成。

### Open

- 无阻塞级需求 open。
- 当前只等待用户确认进入 Execute。

### 不允许下游固化的假设

- 不把“下一步”解释为执行授权。
- 不改变执行 / 修改回复协议。
- 不改变 Agent MD 安装等级。

## Work Package 草案

### `wp-01-upgrade-interaction-response-protocol`

- **目标**：把已确认的五段讨论回复协议落实到唯一源模板和当前项目实例，通过 build 同步所有分发引用，并完成定向与全量一致性验证。
- **Design 输入**：
  - 本页“需求契约”。
  - 本页“Brownfield Delta”。
  - 本页“建议协议与文件边界”。
  - `02-design/decision-log.md`。
- **执行文件边界**：
  - 手工修改 `aipd-skill/src/core/agent-entry/interaction-style.md`。
  - 手工同步 `AGENTS.md` 的 `AIPD-INTERACTION-STYLE` 区块。
  - 由 `./aipd-skill/scripts/build` 生成 Codex / Claude 中 `aipd` 与 `aipd-update` 的四份引用。
  - 写回本 Case 的 Execute / Verify / Close 状态。
- **不允许固化的假设**：
  - “下一步”不等于自动执行授权。
  - 不删除简单短答例外。
  - 不改变执行 / 修改回复模板、长答触发或 Agent MD 等级逻辑。
- **不做**：
  - 不手改 dist。
  - 不改 `aipd` / `aipd-update` 安装同步流程。
  - 不改 `aipd-skill/README.md`。
  - 不执行 install。
- **验收标准**：
  - 源模板和当前 `AGENTS.md` 使用五个精确标题及已确认行为规则。
  - 当前有效范围不再出现旧标题。
  - 四份 dist 引用与源模板字节一致。
  - build、`check-dist` 和定向搜索通过。
  - Case Verify 能逐项对应 Contract 完成标准。
- **依赖**：无外部依赖；build 必须在源模板修改后执行。
- **并行 wave**：单一 wave；源模板、当前实例和验证强耦合，不拆并行工作线。
- **推荐执行者**：Main Agent；上下文小且修改、构建、验收连续耦合，派发收益低。
- **执行后 Gate**：build 完成后不执行 install，主动询问用户是否安装。

## Design Readiness Gate

- [x] 无阻塞级 `open` requirement。
- [x] “下一步不等于执行授权”等护栏已明确，没有 assumed 被固化成扩大权限的行为。
- [x] 已定位源模板、当前实例、四份构建产物及保持不变的入口。
- [x] 本 Case 不涉及 backend / frontend contract，跳过项已有明确理由。
- [x] 文件边界足以让 Main Agent 低上下文连续执行。
- [x] Work Package 按完整可验收目标包组织，没有拆成字符串替换、build、验证等微步骤。
- [x] Verify 已覆盖标题、顺序、行为规则、实例同步、产物一致性、build 和 `check-dist`。
- [x] 不命中产品注意力契约。

### Gate 结果

- **状态**：passed
- **阻塞项**：无。
- **可带入 Execute 的风险**：无。
- **Phase Gate**：等待用户确认后进入 Execute，并在 `03-execute/work-packages/` 创建正式 work package。

## 复杂度爆点与最小解耦

- **复杂度爆点**：标题、生成顺序和行为语义耦合；只做字符串替换无法实现用户想要的“二次 think”约束。
- **最小必要解耦**：源模板承载行为语义，当前 `AGENTS.md` 承载启用实例，dist 只由 build 同步；横向与向下分别拥有独立模块。

## 节点 Checkpoint

- **时间**：2026-07-29
- **已完成**：Design Intake、需求契约、Brownfield Delta、建议协议与文件边界、work package 草案、readiness gate。
- **当前停止点**：等待用户确认进入 Execute。
- **下一步**：创建正式 work package 并执行。
- **恢复入口**：本页“Design Readiness Gate”和“Work Package 草案”。

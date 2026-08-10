# Design：Skill 产物一致性修复

## Design Intake

- **Case 类型**：docs / process + packaging refactor。
- **Design 模式**：full（不涉及数据库、API、前端状态；重点是行为契约、平台覆盖和可重复验收）。
- **当前缺口**：现有系统清楚、目标清楚，执行边界需要按源码 owner 解耦。
- **外部调研**：不需要；当前仓库的核心认知与最终产物足以形成事实链。
- **角色**：Main 负责统一修改和构建；首轮大体量产物审计已由独立只读审计线完成并回流矩阵。

## Requirement Contract

### confirmed

- 最终 `dist/codex` 与 `dist/claude` 中的 9 个 Skill 都必须逐项检查。
- 问题从最终产物回溯源码 owner，禁止直接编辑 `dist`。
- 修复后统一 build，再用相同口径二次审计。
- 本 Case 只处理 Skill、注入 core、平台覆盖和构建 / 安装工具链。
- 教学文档、README 教学表达与 install 执行不在范围内。

### assumed

- 无。最小壳子继续保持“先建立导航与流程入口，不臆造领域正文”；结构更完整的问题由文字澄清和检查覆盖，不擅自生成项目领域内容。

### open

- 无阻塞级问题。

## 行为契约与边缘规则

1. 旧词出现不等于失败：迁移检测、拒绝旧入口和历史经验读取可以保留；仍用于当前运行状态或推荐动作才算失败。
2. Codex / Claude 允许存在平台文件差异，但 Case Contract、phase-first、checkpoint、Goal Mode 和 Main / Child 净收益语义必须等价。
3. Learn 的公共能力必须平台中立；平台只能承诺自己可完成的会话定位方式。
4. Inbox 不拥有目标知识文件；Weave 只有在信息已落地并有相称验证证据时才拥有长期回写。
5. install / dev 脚本本 Case 只修改和静态检查，不执行，以免改写用户级环境。
6. `check-dist` 是只读验证器：发现差异应退出非零，不自动修复、不构建、不安装。

## Brownfield Delta

### MODIFIED

- `src/skills/aipd*`：入口、状态、Case 审计、知识边界和平台中立描述。
- `src/core/*`：L1 引导、公共 overview、OKR、provider、Case Execute 路由、Agent Entry。
- `src/platforms/{codex,claude}`：Case Agent guide 与 Learn 定位 reference。
- `scripts/install*`、`scripts/dev*`：共享 legacy cleanup。
- `scripts/build`：如 Learn 平台 reference 需要装配，则只增加明确注入，不改变既有平台优先规则。
- `scripts/check-dist`：新增可重复产物健康检查。

### GENERATED

- `dist/codex`、`dist/claude` 仅由 build 重建。

### UNCHANGED

- `aipd-git-push` 行为保持不变。
- 教学文档、根 README、Desktop、experience-assets 内容不改。
- 旧 Case 迁移识别继续保留，不把它误删成“零旧词”。

## Context / File Boundary

### WP-01：核心入口与 Case 等价语义

- owner：`aipd`、`aipd-case`、`aipd-update` 及其 core / platform references。
- 复杂度爆点：同一 Case 语义分散在总入口、Agent Entry、平台 guide 和 Execute phase。
- 解耦：公共流程写 core / Skill，平台 guide 只表达真实平台差异；所有恢复链统一包含 map。
- 验收：旧阶段和当前 Step 状态消失；Agent MD 顺序一致；两平台 Case guide 策略等价；update 真正审计新 Case 结构。

### WP-02：知识型 Skill owner 与平台承诺

- owner：Inbox、Weave、Learn、OKR、Mermaid 注入、公共 overview。
- 复杂度爆点：公共 Skill 与平台特有会话定位混写，且 capture / stable knowledge 的 owner 边界松动。
- 解耦：公共行为契约平台中立；Learn 的定位细节放平台 reference；其他修复落在各自唯一 owner。
- 验收：Inbox 不直接改目标文件；Weave 使用组合稳定门槛；Claude 不承诺 Codex-only 自动定位；旧 Goal / step 叙事清除。

### WP-03：工具链一致性与回归检查

- owner：`scripts/`。
- 复杂度爆点：6 个入口复制 cleanup 名单，人工审计无法稳定复现。
- 解耦：共享只读 legacy 名单；`check-dist` 只验证产物，不承担 build / install。
- 验收：6 个入口复用同一 cleanup 定义；check-dist 检查 9 Skill 集合、主文件同步、引用解析、允许的平台差异和关键语义禁区。

## Verify 设计

- `scripts/build` 成功。
- `scripts/check-dist` 成功。
- 递归检查 Codex / Claude 文件集合；差异只在声明的平台覆盖。
- 遍历所有 `@references` 并验证文件存在。
- 逐 Skill 复审矩阵更新为 pass；允许的迁移旧词必须能从上下文证明是检测 / 拒绝 / 历史读取。
- shell 语法检查覆盖 build、check-dist、install*、dev*。
- 不运行任何 install。

## Design Guardrails

- 不直接编辑生成产物。
- 不为了“零关键词命中”删除必要迁移规则。
- 不让检查脚本依赖某台机器的用户目录、已安装 Skill 或网络。
- 不把平台 guide 写成某个瞬时工具 API 的硬编码说明；优先描述能力和最小上下文契约。
- 不借机更新教学材料。

## Work Package 草案

| Work Package | 目标 | 依赖 | 可并行性 |
|---|---|---|---|
| `wp-01-core-entry-case.md` | 修复核心入口、Case 平台语义和 update 审计 | 本设计 | 与 WP-02 可独立修改，最终统一构建 |
| `wp-02-knowledge-skills.md` | 修复知识型 Skill 边界及 Learn 平台承诺 | 本设计 | 与 WP-01 可独立修改，最终统一构建 |
| `wp-03-packaging-checks.md` | 统一 cleanup 并建立 check-dist | WP-01、WP-02 的目标语义 | 在源码修复后收口 |

## Design Readiness Gate

- 阻塞级 open requirement：无。
- assumed 是否被固化：无 assumed。
- Brownfield delta：已明确。
- 文件边界：按唯一 owner 划分，无生成产物直改。
- Work Package：是可验收目标包，不是微步骤。
- Verify：结构、语义、平台、引用、shell 和 build 入口均已定义。
- **Gate 结果**：passed。

## Checkpoint

- **当前节点**：Design Readiness Gate。
- **节点状态**：completed / passed。
- **停止点**：正式 Work Package 已可创建。
- **下一节点**：Execute / WP-01。
- **open / assumed**：无。
- **恢复入口**：`case.md` -> 本文件 -> `03-execute/execute.md`。

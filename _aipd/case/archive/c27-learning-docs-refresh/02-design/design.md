# Design：AIPD V2 学习文档刷新

## Design checkpoint

- **Case 类型**：docs / process。
- **Design 模式**：full；跨学习入口、连续课程与模块参考，但不涉及代码 / API / 数据结构。
- **当前问题**：怎样保留已验证的用户旅程，同时补齐 V2 的 Update、Interaction Protocol 与代码拓扑，并校准首次闭环。
- **批量推进依据**：Leader 派发明确要求完整推进 Think / Design / Execute / Verify / Close，成功判据和文件所有权已固定。
- **停止点**：形成页面职责、文件计划、Work Package 草案和 Verify 入口；若出现根 README / Skill 行为改动需求或权威事实冲突，停止并回报 Leader。

## Requirements Contract

### confirmed

- `docs/README.md` 必须继续提供“先体验 / 连续学习 / 按问题查阅”三种入口，并覆盖升级后的完整学习面。
- guide 必须保留连续因果旅程，首次闭环可执行、可验证；命令、目录和生命周期与当前实现一致。
- modules 按系统对象和用户问题提供可独立进入的参考，不把内部运行合同整段复制给用户。
- 必须覆盖 Knowledge v2、Map-first、Agent Entry、Case / Work Package、Think、Main / Child、Weave、Update / 迁移、显式 Leader、构建安装、上下文解耦；Mission 基线中的项目级交互协议与 AI 友好代码拓扑也应有明确入口。
- 只修改 `docs/**` 与本 Case 流程文件；不修改根 README、Skill、脚本、dist 或长期 Knowledge。

### assumed

- 保留现有六章文件名和编号可降低深链接破坏，并且 c18 验证过的用户因果旅程仍成立。
- 用户会从根 README 或 docs 深链接进入；每个新增 modules 页面必须开头说明“何时查这篇”。

### open

- 无阻塞 open。

### 不允许固化的假设

- 不把 AIPD V2 写成远端最新版；Update 只面向当前安装包版本。
- 不把 4 份领域指引都写成 Codex custom Agent；当前构建产物只有 3 个 custom Agent。
- 不把 Leader、Interaction Protocol、Goal Mode、代码拓扑写成普通使用的必经步骤。
- 不把 `_aipd/leader/` 写成初始化必选目录。

## Domain Rules / Edge Cases

- 旧 `_adoc`、L1-L5、旧 Case 命令可以出现在迁移和历史边界中，但不得作为活跃运行方式。
- `schemaVersion` 与 `aipdVersion` 必须分开解释；两键 manifest 是 `unversioned-v2`，不是 V0。
- migrator 与 Update 必须分开：前者做确定性结构迁移，后者做版本语义收敛与最终版本提交。
- build 可以作为源码修改后的低风险验证；install 会修改 Agent 环境，必须另行确认。
- Weave 更新业务项目稳定认知；仓库级 Learn 只在 AIPD 源码仓库迭代框架自身。
- Work Package 与 Child Agent 是两条正交轴；Leader 创建同级 Case task，Case 内才选择 Child。

## Brownfield Delta

### 保留

- 根 README 决策页 / docs 学习层 / `_aipd` Agent 事实源三层分工。
- 六章“问题 -> 记忆循环 -> 最小认知 -> Case -> 学习 / 拓扑 -> 完整操作卡”结构。
- 现有 Knowledge、Map、Case、Think、Weave、Leader、构建安装等准确段落和文件路径。

### ADDED

- `docs/modules/update-and-migration.md`：项目 gate、P/I 状态、migrator 与 Update 分工、所有权和安全边界。
- `docs/modules/interaction-protocol.md`：Agent MD 0/1/2、等级 2 协议、讨论 / 执行分流和边界。
- `docs/modules/ai-friendly-code-topology.md`：三类模块、显式组合、shared 晋升、Case Design / Execute / Verify 合同。

### MODIFIED

- `docs/README.md`：三条导航覆盖新增能力，纠正“十个入口”的公共 / 仓库级含义。
- guide 02 / 03 / 05 / 06：补 gate、初始化版本提交、Agent MD 选择、Update、Interaction Protocol、正式代码拓扑和按问题入口。
- `agent-entry.md`、`build-and-install.md`、`clone-agents.md`、`context-decoupling.md`、`skills-overview.md`：补边界与交叉链接。

### REMOVED

- 不删除页面；只删除或改写把上下文解耦等同于“纵向黑箱”、把角色指引等同于 custom Agent 等易误解表达。

## Backend / Data / API Design

skipped。底层事实源为 docs + 当前 Skill / Knowledge 源码；不设计代码接口。

## Frontend / UX / State Design

### 文档用户流

```text
根 README 决定是否采用
-> docs/README 选择先体验 / 连续学习 / 按问题查阅
-> guide 完成第一个 AIPD 闭环
-> modules 在实际工作中确认对象、边界和恢复方式
-> 源码 / _aipd 只在需要权威运行细节时进入
```

### Attention Contract

- **用户时刻**：读者已经决定了解或使用 AIPD，需要选择下一条最短路径。
- **主问题 / 主动作**：`docs/README.md` 只帮助选择“现在该从哪条路径进入”；guide 每章只推进因果链的一个节点；modules 每页只解释一个能力边界。
- **注意力路径**：先看三条入口 -> 选择一条 -> 在页面尾部只接受一个自然下一步或少量按问题入口。
- **now**：首次闭环必需的安装、初始化、Map-first、Case、Verify、Close、Weave。
- **next**：Update / 迁移、Agent Entry / Interaction、Leader、Main / Child 等遇到对应情境才需要的能力。
- **on-demand**：完整项目状态机、角色 Agent、构建脚本、代码拓扑合同字段和历史旧入口。
- **remove**：内部模板全文、Release Record 细节、Leader runtime 全合同、重复 Skill 对象字典。
- **传播范围**：`docs/README.md`、guide 02-06、所有新增 modules 及被修改的交叉入口。
- **自我推翻权限**：可删除重复段落、把细节降级为链接、重排查阅分组；不可改变 Case Contract、公开产品能力或权限边界。
- **Verify 触发器**：同一段有多个同权主动作；新页面只是复制源码合同；首次闭环要求读者先学会可选能力；新增主题无法从 docs 索引到达。
- **停止条件**：三条旅程可顺读；每个新增页面可独立深链进入；Reduction Scan 无触发器。

## Context Boundary / 文件计划

- `docs/README.md` 只做学习分流和问题索引，不展开运行合同。
- `docs/guide/` 只按第一次成功的因果顺序教学；可选能力在首次出现时说明并链接 modules。
- `docs/modules/` 按系统对象提供定义、触发条件、当前边界、常见误解和源码入口。
- 根 `README.md` 继续由 Mission 其他 Case 负责；`_aipd/**` 和 `aipd-skill/**` 仅作事实源。

### Code Topology Contract

- **拓扑敏感**：否。本 Case 新增的是文档参考页面，不改变真实代码模块、依赖方向、shared 或组合协议。

## Work Package Draft

### wp-01-refresh-module-reference

- 新增 3 个 V2 模块参考页。
- 校准 Agent Entry、构建安装、Main / Child、上下文解耦和 Skill 概览的边界与交叉链接。
- 验收：指定能力均有唯一可达参考入口；公共 Skill / custom Agent / Learn 数量与源码一致。

### wp-02-refresh-learning-journey

- 依赖 wp-01；更新 docs 索引与 guide 02 / 03 / 05 / 06。
- 保留六章连续课程和第一次成功时刻；把 V2 gate、初始化、Update、Interaction、Leader / Learn / topology 按 now / next / on-demand 接入。
- 验收：三条入口完整；首次闭环可执行；新增页面全部可达且教程不复制内部合同。

### 运行时判定

- 两个 Work Package 叙事与链接高度耦合，且上下文规模可控；由 Main 顺序连续完成。
- 不派 Child，避免重复事实调查和跨包链接冲突。

## Verify 设计

- 自动检查：Markdown 相对链接、命令 / 脚本路径、Skill 与 custom Agent 数量、活跃旧术语、修改范围。
- 人工走查：先体验、连续学习、按问题查阅三条路径；新增 modules 独立入口；首次闭环操作卡。
- Reduction Scan：检查主问题、渐进披露、重复合同和可选能力是否挤入首次闭环。

## Design Readiness Gate

- 阻塞级 open：无。
- assumed 固化风险：已列入护栏。
- Brownfield delta：明确。
- 页面职责和注意力契约：明确。
- 文件边界与两个目标包：明确、无所有权重叠。
- 代码拓扑：不命中。
- Verify 入口：明确。
- **状态**：passed。
- **进入 Execute**：用户已在派发中授权完整推进生命周期，创建正式 Work Package 并由 Main 顺序执行。

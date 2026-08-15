# Think：当前事实包与文档差距审计

## 调研前 checkpoint

- **当前问题**：`e22f97e` 已实现的九项升级事实，是否在本 Case 所有权范围内形成完整、一致、可维护的活跃入口。
- **触发来源**：Case Contract；不是后续 phase 回跳。
- **调研边界**：写入只限 `_aipd/index.md`、`_aipd/map.md`、`_aipd/knowledge/**`、`aipd-skill/README.md` 和 c25 流程文件；`AGENTS.md`、`aipd-skill/src/**`、`docs/**`、根 `README.md`、c19-c24 只读。
- **不查什么**：不做外部调研，不重审功能设计是否合理，不修改 Skill / 脚本行为，不进入 dist / install / 发布。
- **预期输出**：升级事实 -> 权威证据 -> 范围内入口 -> 差距 / 无需修改依据的矩阵，以及可进入 Design 的明确改动集合。
- **停止条件**：九项事实和维护者导航均有权威证据；所有范围内文档已判定为 modify 或 keep；没有内容所有权冲突。
- **返回位置**：结论进入 `02-design/design.md`；完成后由 Design 固定文件级变更和 Work Package。

## 经验命中

- 已读取“教学文档产品化与用户旅程组织”。本 Case 采用其中的“先建立当前事实包”“按用户任务组织入口”“完整对象列表由稳定事实源维护”“Verify 同时检查准确性、可到达性、独立入口和可维护性”。
- 本 Case 不是重写面向用户教程，因此不复制完整课程方法；维护者 README 的成功时刻定义为：维护者能从单页找到正确源码 owner、平台覆盖、构建 / 校验 / 迁移入口，并知道何时必须停止等待 install 确认。

## 审计计划

1. 用 `AGENTS.md`、`aipd-skill/src/core/**`、九个公共 Skill、仓库级 Learn 和 c19-c24 收口当前事实包。
2. 对 `_aipd/index.md`、`_aipd/map.md`、五类 Knowledge 和 `aipd-skill/README.md` 逐项比对。
3. 只修改缺入口、路径不准、数量不一致或边界不完整的文件；准确文件在 Verify 记录 keep 依据。

## 初步发现

- `_aipd/index.md` 已有五类 Knowledge、Map-first、显式 Leader 和拓扑入口，但版本状态 gate、Agent Entry / Interaction Protocol、Main / Child 与 Learn 的一跳导航还不完整。
- `_aipd/knowledge/core/map.md` 标题声明“九个核心成立模型”，实际模型表缺少 Leader 项；Workspace 概念行也未显式纳入 Leader 和版本状态。
- `_aipd/knowledge/core/workspace-modules.md` 未在 Workspace 总览列出显式可选 Leader、manifest / update-log 版本状态入口。
- `aipd-skill/README.md` 已准确说明九个公共 Skill、一个仓库级 Learn、dist 不手改与 install 需确认，但缺 `src/core/updates/`、`workspace/project-state.md` / `update-log.md`、release bundle 校验脚本和仓库级 Learn 的正确修改入口。
- `_aipd/map.md`、Product、Engineering 与拓扑正文已经覆盖多数升级事实；仍需完成逐项核对后决定是否修改。

## 当前事实包与差距矩阵

| 升级事实 | 当前权威证据 | 范围内现状 | Think 结论 |
|---|---|---|---|
| Knowledge Schema v2 | `aipd-project-structure.md`、五类 guide、c22 | index / Map / 五域正文完整 | 保留主体；补 Workspace 一跳入口中的版本与可选模块 |
| Map-first | `overview.md`、`aipd` Skill、Agent Entry | index / Map / Core / Product 已完整 | keep，不重写 |
| Case / Work Package | `aipd-case`、case overview / templates | Core / Product / Map 已覆盖 | 把活跃 Core 中遗留的 `step` 与“Work Package 可直接等同派发”措辞校准为当前合同 |
| 版本化 Update | project-state、updates catalog / current、`aipd-update`、c23 | Product / Engineering / Map 完整；index / Workspace / 维护者 README 导航偏弱 | 补 gate、catalog、update-log、release 校验和迁移 / Update 分工入口 |
| 显式 Leader | Leader Skill / core / Codex runtime、c24 | index / Map / Core / Product 已覆盖；Core map 九模型表漏项 | 补 Leader 核心模型行与 Workspace 可选模块关系 |
| AI 友好代码拓扑 | Core 主事实源、运行时投影、c20 | 主文、Core、Engineering、Map 已完整 | keep，不复制展开内容 |
| Interaction Protocol | interaction-style、Agent Entry、AGENTS、c21 | Product / Map 已完整；index 与维护者导航缺一跳入口 | 补 index 与 README 入口，不改协议内容 |
| Main / Child 运行时判定 | Codex agent guide、`aipd-case`、c12 / c24 | Engineering 已完整；部分 Core / Intent 仍只写旧“分身 Agent / step” | 统一为 Main / Child，并保留“分身 / 角色 Agent”作为 Child 类型说明 |
| 仓库级 Learn | `.agents/skills/aipd-learn`、Product / Engineering | Product / Engineering / Map 已完整；维护者 README 最后一跳路径错误 | 明确独立仓库级链路和正确 owner |

## 文件判定

### 需要修改

- `_aipd/index.md`：补项目状态 gate、Agent Entry / Interaction、Main / Child、仓库级 Learn 的常用入口。
- `_aipd/map.md`：校准 Workspace 概念行，并补维护 AIPD Skill / 发布校验的一跳路由。
- `_aipd/knowledge/intent/intent.md`：把当前任务执行叙事从泛化“分身 Agent”校准为 Main / Child 运行时选择。
- `_aipd/knowledge/core/index.md`：校准 Agent 协作模型和活跃 `step` 旧称。
- `_aipd/knowledge/core/map.md`：补第九个 Leader 模型，校准 Workspace 与 Main / Child 术语。
- `_aipd/knowledge/core/workspace-modules.md`：补 manifest / update-log 和显式可选 Leader 模块。
- `_aipd/knowledge/core/horizontal-capabilities.md`：校准 Think / Execute / Agent Entry 中 Main / Child 与 Work Package 关系。
- `_aipd/knowledge/engineering/index.md`：明确 4 份平台无关角色指引与 3 个 Codex custom Agent 的区别。
- `aipd-skill/README.md`：补 updates、project-state / update-log、Agent 数量边界、release / migrator 校验脚本、版本化 Update 与 Learn 正确 owner。

### 核对后无需修改

- `_aipd/knowledge/research/index.md`：外部观察有时间边界，Learn / Update / Desktop 均在正确 Research 语境；单处“分身 Agent”描述的是需求来源，不冒充当前调度合同。
- `_aipd/knowledge/core/ai-friendly-code-topology.md`：与运行时投影及三段合同一致。
- `_aipd/knowledge/product/index.md`、`product/map.md`：Interaction、Leader、Case、版本化 Update 与仓库级 Learn 的能力、入口和非目标完整。
- `_aipd/knowledge/core/ai-friendly-code-topology.md` 以外无新增代码拓扑设计，本 Case 不改变模块 / 文件夹边界。

## 决策结论

- 进入 quick / docs-only Design；不新增模块，不需要 Code Topology Contract。
- 按“入口导航”“Core 当前术语”“维护者 README”三个可验收目标包组织 Execute；Main 连续执行，原因是各文件共享同一事实矩阵、耦合高且无独立写入线，派发会增加重复核对成本。
- 不改 `aipd-skill/src/**` 或 dist，因此无需 build；Verify 运行只读链接 / 路径 / 数量 / 旧语义扫描及现有 `check-dist`。

## 当前状态

- **已确认**：HEAD 基线、AIPD gate、九项源码权威、c19-c24 历史证据、文件 modify / keep 判定均已收口；没有共享前提或所有权冲突。
- **open**：无阻塞项；具体措辞由 Design 固定，但不得改变上述事实和所有权。
- **下一步**：进入 `02-design/design.md`，建立三个 Work Package 与 readiness gate。
- **恢复入口**：本文件 `## 当前事实包与差距矩阵` -> `02-design/design.md`。

# Design：内部认知与维护者文档定向刷新

## 设计目标

把 Think 已确认的差距转成最小、可验收、不会制造重复事实源的文档改动；保持历史记录和已准确文件不变。

## Design Intake

- **Case 类型**：docs / process。
- **模式**：quick / docs-only。
- **缺口类型**：现有系统事实清楚，缺口在入口可达性、当前术语和维护者导航。
- **阻塞级 open question**：无。
- **外部调研 / 代码实验**：不需要。
- **角色**：Main Agent 作为文档 owner；不派 Child。三个目标包共享同一事实矩阵且写入高度耦合，连续执行比隔离派发更可控。
- **经验命中**：“教学文档产品化与用户旅程组织”；用于事实包、入口职责和 Verify 五面检查。

## Requirements Contract

- **confirmed**：内容所有权、九项升级事实、只做文档、不改行为、不改 dist、不 install / push / 发布 / commit、完整 phase 生命周期。
- **assumed**：无。
- **open**：无。
- **不允许固化的假设**：不得把 Codex 当前平台事实写成所有平台通用承诺；不得把历史 c19-c24 的数量或旧术语改写为当前状态；不得把仓库级 Learn 写进公共 Skill 链路。

## Domain Rules / Edge Cases

- “九个公共 Skill + 一个仓库级 Learn”与历史 c24 的“10 个 Skill”可同时成立；当前活跃事实必须显式区分两个集合。
- `src/core/agent-guides/` 有 4 份平台无关指引，但 Codex 只打包 3 个 custom Agent；`aipd_product_manager` 当前只有领域指引。
- Schema migrator 只产出 `unversioned-v2`；只有 Update 验证后写 `aipdVersion=I`。
- `dist/` 是生成物；本 Case 不修改源码，因此不 build；install 始终需要用户明确确认。
- “分身 Agent”可作为 Child 类型的解释词保留，但活跃运行合同使用 Main / Child，Work Package 不等于派发节点。

## Brownfield Delta

### MODIFIED

- `_aipd/index.md`：增加 gate 与四项稳定导航。
- `_aipd/map.md`：增加维护者路由，校准 Workspace 概念行。
- `_aipd/knowledge/core/workspace-modules.md`：补版本状态和 Leader 可选模块。
- `_aipd/knowledge/intent/intent.md`、`core/index.md`、`core/map.md`、`core/horizontal-capabilities.md`：校准 Main / Child 与 Work Package 当前术语，补第九个 Leader 模型。
- `_aipd/knowledge/engineering/index.md`：明确 4 份领域指引 / 3 个 Codex custom Agent。
- `aipd-skill/README.md`：补源码、平台、版本化 Update、校验、迁移和 Learn owner 导航。

### KEEP

- `_aipd/knowledge/research/index.md`、`core/ai-friendly-code-topology.md`、`product/index.md`、`product/map.md`：内容已准确，Verify 记录依据。
- `AGENTS.md`、`aipd-skill/src/**`、`docs/**`、`README.md`、c19-c24：只读证据，不改变。

### REMOVED

- 无删除文件；只从活跃 Core 正文中替换会被误读为当前运行合同的旧 `step` / 默认分身表达。

## Backend / Frontend / Code Topology

- **底层事实源**：docs / repository structure。
- **Backend / API**：skipped。
- **Frontend / UX**：skipped；维护者 README 只做信息架构和导航，不涉及产品视觉。
- **拓扑敏感**：否；不新增或调整模块、文件夹、shared、跨上下文依赖或组合协议，因此不加载 / 生成 Code Topology Contract。

## 复杂度爆点与最小必要解耦

- **复杂度爆点**：同一升级事实散布在入口、Core、Product、Engineering 和维护者 README；逐页补关键词容易产生数量或平台边界漂移。
- **最小必要解耦**：以 Think 事实矩阵为唯一执行依据，入口只导航、Core 只定义模型、Engineering 只定义平台 / 构建规则、README 只服务维护者操作；不在每层复制完整正文。

## Work Package 计划

| Work Package | 目标 | 文件边界 | 依赖 |
|---|---|---|---|
| `wp-01-workspace-map-entries.md` | 补 gate、Workspace 模块和维护者 Map 一跳入口 | `_aipd/index.md`、`_aipd/map.md`、`core/workspace-modules.md` | 本设计 |
| `wp-02-current-core-runtime-terms.md` | 补 Leader 九模型并统一 Main / Child、Work Package 和 Agent 数量平台事实 | Intent、Core index / map / horizontal、Engineering index | wp-01 的入口名称 |
| `wp-03-maintainer-readme.md` | 完成维护者源码 / 平台 / 构建 / 校验 / 迁移导航 | `aipd-skill/README.md` | wp-01 / wp-02 术语 |

## Readiness Gate

- [x] 无阻塞级 open / assumed。
- [x] 已知所有 modify / keep 文件与不能破坏的历史语境。
- [x] 三个 Work Package 是可验收目标包，不是微步骤，也不对应 Child 派发。
- [x] Verify 已定义路径、数量、旧语义、Markdown 链接、diff 范围和 `check-dist` 检查面。
- [x] 不触发代码拓扑、build、install 或外部副作用。

**状态**：passed。

## Design checkpoint

- **当前节点**：readiness-gate / completed。
- **已确认**：quick / docs-only；三个正式 Work Package；Main 连续执行；无拓扑合同。
- **open / assumed**：无。
- **停止点**：若执行发现源码权威与现有文档事实冲突、需要修改所有权外文件或需要改 Skill 行为，立即停止并回报 Leader。
- **下一步**：进入 Execute，依次完成三个 Work Package，并在每包后写回状态。
- **恢复入口**：本文件 -> `03-execute/execute.md` -> 当前 Work Package。

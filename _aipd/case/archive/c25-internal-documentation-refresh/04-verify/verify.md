# Verify：内部认知与维护者文档刷新

## 验证前 checkpoint

- **当前问题**：三个 Work Package 是否满足 Case Contract，且没有把历史语义写成当前能力、复制事实源或越过内容所有权。
- **输入**：Case Contract、Think 事实矩阵、Design guardrails、三个 Work Package 执行记录、真实 diff 与当前仓库路径。
- **验证边界**：只读检查；允许测试脚本在隔离临时目录运行，不 build 当前 dist、不 install、不提交、不访问远端。
- **预期输出**：九项升级事实矩阵、路径 / 数量 / 旧语义 / diff 结果、keep 文件依据、残留风险和 Close 判定。
- **停止条件**：全部 passed 进入 Close；事实 / 所有权缺口回 Execute 或 Design。
- **恢复入口**：本文件。

## 验收清单

- [x] Case Contract 五项完成标准。
- [x] wp-01 / wp-02 / wp-03 各自验收标准。
- [x] 九项升级事实在范围内活跃入口可达且彼此一致。
- [x] 九个公共 Skill、一个仓库级 Learn、4 份领域指引、3 个 Codex custom Agent 数量准确。
- [x] 版本化 Update、Schema migrator、release bundle、build / dist / install 边界准确。
- [x] 活跃旧术语只存在于负例、迁移或历史语境。
- [x] modify 与 keep 文件判定有依据；没有为制造 diff 改写准确文件。
- [x] git diff / status 只包含所有权范围和 c25 流程文件。

## 九项升级事实验收

| 事实 | 结果 | 范围内入口 / 依据 |
|---|---|---|
| Knowledge Schema v2 | passed | index、Workspace、Core、Product；五域物理路径与 manifest v2 一致 |
| Map-first | passed | index Context Retrieval、项目 Map、Core / Product map；搜索仅作兜底 |
| Case / Work Package | passed | Core / Product / Map；Work Package 明确为恢复 / 验收边界而非派发节点 |
| 版本化 Update | passed | index gate、Workspace、Product / Engineering、README；`P/I`、catalog、current authority、update-log、migrator 分工一致 |
| 显式 Leader | passed | index / Map / Core 九模型 / Product；仅 `$aipd-leader` 启动，一个 Mission、一个 Case 一个 task，工作记忆非第六类 Knowledge |
| AI 友好代码拓扑 | passed | Core 主事实源、Engineering 运行时投影入口、Map；临时 build 的 `check-dist` 验证三段合同与投影 |
| Interaction Protocol | passed | index / Map / Product / README 路由到 interaction-style；本 Case 未改协议正文 |
| Main / Child | passed | Intent / Core / Engineering / Map；按隔离、并发、耦合和成本判断，派发不扩大副作用 |
| 仓库级 Learn | passed | Map / Product / Engineering / README；`.agents/skills/aipd-learn` 与公共 build / dist / install 隔离 |

## Work Package 与 Design guardrail

- `wp-01`：passed；入口只导航稳定 owner，没有复制完整功能正文。
- `wp-02`：passed；Core 模型表实测 9 个数据行并含 Leader；活跃 Core 使用 Main / Child 与 Work Package 当前合同。
- `wp-03`：passed；维护者 README 可到达公共 / 仓库级 Skill、源码 / 平台 / build / validate / migration / install 入口。
- Design 非拓扑敏感；真实 diff 未新增模块、目录、shared 或依赖，不需要 Code Topology Contract 审计。

## 数量、路径与安全边界

- 文件系统实测：公共 Skill 9、仓库级 Skill 1、平台无关角色指引 4、Codex custom Agent 3。
- README 新增的 project-state、updates、Leader runtime、release bundle 和 migrator 路径逐项存在。
- `git diff --check` passed；修改后的 Markdown 没有新增 Markdown 链接语法，代码路径通过逐项存在性检查。
- 活跃 `_adoc` / L1-L5 / `step` 命中仅位于迁移入口、旧命令迁移或“垒高楼式 step”负例；Research 的“分身 Agent”保留为需求来源，不承担当前调度合同。
- 工作树 `aipd-skill/dist` 原本不存在。直接 `check-dist` 因缺默认 dist 基线在 preflight 失败；未在工作树 build。随后在系统临时副本运行 `build` + `check-dist` 全部通过，并已删除临时副本。
- 未执行 install、dev、commit、push、发布或远端写入。

## Keep 文件核对依据

- `_aipd/knowledge/research/index.md`：外部观察明确截至 2026-08-10，Learn / Update / Desktop 处于 Research 需求与历史语境；无需改写当前能力细节。
- `_aipd/knowledge/core/ai-friendly-code-topology.md`：横向基座 / 共享能力 / 纵向业务上下文、显式组合、上移条件、Design -> Execute -> Verify 三段落点完整。
- `_aipd/knowledge/product/index.md`：Interaction、Leader、Case、Learn、版本化 Update 的用户价值、入口与非目标完整。
- `_aipd/knowledge/product/map.md`：上述功能线的源码、支撑文件和产品边界可一跳命中。
- 这些文件 `git diff --quiet`，未为制造 diff 改写。

## 所有权与范围

- 内容修改 9 个文件：`_aipd/index.md`、`_aipd/map.md`、Intent、Core 4 个文件、Engineering index、`aipd-skill/README.md`。
- 其余改动仅为 `_aipd/case/index.md` 与 c25 流程文件。
- `AGENTS.md`、根 `README.md`、`docs/**`、`aipd-skill/src/**`、`aipd-skill/dist/**`、c19-c24 均无 diff。

## 结果

- **状态**：passed
- **残留风险**：无内容或行为风险。当前 worktree 未保存 dist 基线，因此本地直接 `check-dist` 不能运行；临时副本的完整 build + check 已通过，且本 Case 没有源码改动。
- **Close 判定**：可以进入 Close；本 Case 的文档更新本身已落到授权 owner，不再启动 `aipd-weave` 重复回写。

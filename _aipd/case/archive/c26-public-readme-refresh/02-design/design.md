# Design: 根 README 新人首页校准

## Design Intake

- **Case 类型**：docs / process。
- **模式**：quick；单文件、低风险、现有叙事骨架成熟。
- **当前节点**：readiness-gate / completed。
- **角色判断**：由 Main 负责 Requirements / 文档信息架构 / 执行 / 验收；单一高度内聚文件不派 Child。
- **拓扑敏感**：否；不新增或调整代码模块、文件夹边界、shared 依赖或组合协议，不加载 AI 友好代码拓扑指南。
- **独立 artifact**：本文件已足够，不拆 requirements / frontend / context 子文件。

## Requirements Contract

### confirmed

- 根 README 是第一次看到 AIPD 的读者的决策页，不是内部对象参考手册。
- 内容所有权只有根 `README.md`；除 Case 流程文件外不改其他文件。
- 首屏和前半部分优先回答问题、工作方式与可靠性。
- 快速开始必须准确呈现当前 Codex 构建 / 安装、Schema v2、`/aipd`、`/aipd-case`、`/aipd-weave`。
- 当前核心能力必须被合适层级投影，并清楚区分九个公共 Skill 与仓库级 `aipd-learn`。

### assumed / open

- **assumed**：读者具备 Codex 和 shell 基础，但不了解 AIPD 内部对象；命令给最短可复制路径，复杂边界链接到 modules。
- **open**：无阻塞项。
- **不允许固化的假设**：不宣称其他 Agent 平台已验证；不把仓库级 learn、Goal Mode、Leader 或代码拓扑描述成所有项目必需。

## Domain / Content Rules

- `schemaVersion` 是 Workspace 数据形状；`aipdVersion` 是项目已成功应用的发布快照。
- Update 的目标来自本机已安装包，不追远端；读取版本演进后一次收敛到最终态。
- Leader 仅显式调用；一个 active Mission，每个 Case 一个同级 Codex task；不扩大外部副作用权限。
- Work Package 是状态 / 验收边界，不是 Child Agent 派发节点。
- Weave 只把已完成、已实现、已验收的稳定信息写入长期事实源；进行中 Case 只留 Close 候选。
- 九个公共 Skill 进入 build / dist / install；`.agents/skills/aipd-learn` 仅随 AIPD 仓库维护。

## Brownfield Delta

- **保留**：标题价值主张、三段记忆循环、无 AIPD 的失忆场景、完整 Case / Weave 解释、适用边界、学习分流。
- **修改**：
  - 在工作原理后增加“为什么升级后的体系更可靠”，把 Schema gate、Map-first、checkpoint、所有权边界前置。
  - 快速开始改为可复制 Codex build / check / install，并形成 `/aipd` -> `/aipd-case` -> `/aipd-weave` 的首个成功闭环。
  - 初始化说明补 Schema v2 manifest、Agent Entry Level 2 与 Interaction Protocol 边界。
  - 版本化 Update 从迁移附注提升为清楚但短的能力说明。
  - Skill 区明确“公共安装包正好九个”，把仓库级 learn 放到独立非安装区。
  - Leader 保留显式启动与 Mission / Case task 关系，移除首页中过细的模型配置。
  - “上下文解耦”改为“AI 友好代码拓扑”，说明横向基座、横向共享能力、纵向业务上下文和显式组合。
  - 仓库树补 `AGENTS.md` 与 `.agents/skills/aipd-learn` 边界。
- **删除 / 压缩**：重复的版本化 Update 段落与内部运行配置细节；不删除必要迁移警告。
- **不能破坏**：现有 docs 深链、旧项目迁移安全提示、C18 形成的用户旅程。

## Attention Contract

- **用户时刻**：第一次打开仓库，判断 AIPD 是否解决自己的 Agent 协作问题，并希望马上尝试。
- **主问题 / 主动作**：理解价值后，按最短闭环在一个项目中获得可恢复、可回写的首次结果。
- **注意力路径**：先看“项目为什么失忆” -> 理解“读对 / 接住 / 留下” -> 信任文件合同与边界 -> 执行快速开始。
- **now**：问题、价值、三段工作方式、可靠性、快速开始。
- **next**：Knowledge / Map、Case、Weave、九个公共 Skill。
- **on-demand**：Update 细节、Leader、Main / Child、代码拓扑、完整教程与仓库结构。
- **remove / defer**：具体模型运行配置、脚本实现细节、完整内部对象和历史演进过程。
- **传播范围**：只修改根 README；教程与 modules 不在本 Case 重排。
- **自我推翻权限**：可在不改变事实与链接边界下删除、合并、重排现有首页段落。
- **Verify 触发器**：首屏出现多个主动作；快速开始停在安装；公共 / 仓库级 Skill 仍像同一安装集合；内部分类压过读者问题。
- **停止条件**：一次 Reduction Scan 不命中触发器，链接与事实检查通过，继续编辑只会重复同一判断。

## 文件计划与 Work Package Draft

- `README.md`：唯一内容文件，完成上述 Brownfield Delta。
- `03-execute/work-packages/wp-01-refresh-root-readme.md`：承载一个可验收目标包；Main 执行。

## Verify 入口

- 对照 Case 成功标准逐项人工审阅。
- 脚本验证所有本地 Markdown 文件链接存在；对带锚点链接核对目标标题。
- `rg` 检查九个公共 Skill 名、`aipd-learn` 隔离、旧 Case 命令、V2 / Update / Leader / Main / Child / Interaction / topology 关键语义。
- `git diff --check` 与 `git diff -- README.md` 检查格式、范围和内容。
- 执行一次最终 README Reduction Scan。

## Readiness Gate

- **状态**：passed。
- **阻塞级 open**：无。
- **assumed 固化风险**：无；平台边界明确写 Codex 当前默认构建。
- **文件边界**：单一 README，足够独立理解和验收。
- **Work Package**：一个目标包，非微步骤。
- **可带入 Execute 的风险**：控制长度；通过减法扫描和 diff 审阅收敛。

## Design checkpoint

- **已确认**：全部需求直接来自 Leader 委派和当前源码事实，无新产品 / 权限取舍。
- **停止点**：readiness passed；Leader 已明确要求完整推进，不需额外逐节点确认。
- **下一步**：进入 Execute，创建并完成 `wp-01-refresh-root-readme`。
- **恢复入口**：本文件 -> `case.md#Execute-摘要` -> Work Package。

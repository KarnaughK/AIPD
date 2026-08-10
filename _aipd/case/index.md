# AIPD Case 索引

## 进行中 Case

| Case | 状态 | 说明 |
|---|---|---|
| `c19-product-design-prototype-experience` | Verify / 已通过，等待进入 Close | 调研高关注度产品文档与产品原型 Skill，并将注意力契约、触发式减法回跳和自适应停止嵌入 AIPD Case |

## 暂停 Case

| Case | 状态 | 说明 |
|---|---|---|
| `c10-aipd-capability-object-model` | 已暂停 | 原子能力和中间对象模型方向暂不推进；保留 Context Pack、Research Pack、Decision Record、Handoff 等参考材料 |

## 编号占位

本节不是新的 Case 流程状态，只用于解释已经使用但不再保留目录的流水号；编号继续保持单调递增，不复用。

| Case | 处理时间 | 说明 |
|---|---|---|
| `c15-superpowers-experience-ingestion` | 2026-07-21 | 原计划调研 Superpowers 是否可由 AIPD 经验系统吸收；止于 Think，未进入 Design / Execute，也未产生代码改动。事项已撤销，case 目录和外部仓库克隆均已删除，编号保留不复用。 |
| `c16-desktop-activity-navigation` | 2026-08-07 | 仅存在于 C8 专用工作树的未提交 Desktop 实验子 Case；随桌面端方向取消一并删除，编号保留不复用。 |

## 已归档 Case

| Case | 归档时间 | 说明 |
|---|---|---|
| `archive/c1-role-codex-custom-agents` | 2026-06-16 | AIPD 自举接入 Codex custom agents 与推荐 Agent 派发 |
| `archive/c2-subagent-origin-model` | 2026-06-16 | 重写分身 Agent、克隆体和结果回流模型 |
| `archive/c3-agent-fork-role-policy` | 2026-06-16 | 分析 fork 分身、角色 Agent 和直接执行的调配策略 |
| `archive/c5-human-docs-architecture` | 2026-06-16 | 设计面向人的 docs 学习文档体系，区分 README、docs 与 _aipd |
| `archive/c6-human-docs-three-lines` | 2026-06-14 | 将面向用户的教学文档升级为三条主线：知识库、Case / Step、AI 原生代码架构实验 |
| `archive/c7-repo-structure-reclassification` | 2026-06-27 | 重划仓库根目录，收拢 AIPD Skill 本体、docs、项目认知和历史材料边界 |
| `archive/c8-aipd-desktop-zero` | 2026-08-07 | 实际试用后确认 Desktop 不是 AIPD 所需产品；删除未提交实验代码、专用工作树和本地分支，以 `stopped / killed` 归档 |
| `archive/c9-aipd-think-system-design` | 2026-06-27 | 旧 Think 一等对象设计 case；Think 问题已被新的 phase-first case 生命周期吸收，作为历史调研和边界参考归档 |
| `archive/c11-aipd-case-design-flow` | 2026-07-10 | 将 Case Design 扩展为需求契约、后端 / 前端设计、上下文解耦、执行切片和 readiness gate，并完成构建与 Codex 安装验证 |
| `archive/c12-codex-gpt-5-6-sol-adaptation` | 2026-07-15 | 完成 GPT-5.6 Sol / Ultra 使用边界与 Main / Child 调度适配，移除授权叙事，完成构建、安装、实际使用验收和 `main` 合并 |
| `archive/c13-vue3-context-decoupling-experience` | 2026-07-15 | 从真实 Vue3 后台项目沉淀上下文解耦经验与可验证源码资产，完成 AIPD 品牌迁移、GitHub latest / pinned 发布和远端验收 |
| `archive/c14-case-identifier-simplification` | 2026-07-15 | 取消 Case 的版本号语义，统一 `cN-slug`、`wp-NN-slug` 和 `cN/wp-NN`，完成 AIPD-2 迁移、构建与 Codex 安装 |
| `archive/c17-skill-package-audit` | 2026-07-21 | 逐个审计并修复 Codex / Claude 的 9 个最终 Skill 产物，补平台等价语义、知识 owner 边界、共享 cleanup 与 `check-dist`，完成构建、二次验收及用户确认后的 Codex 安装 |
| `archive/c18-readme-learning-docs-productization` | 2026-07-21 | 将根 README 与完整学习文档作为小产品重做：完成能力盘点、优秀开源文档调研、记忆循环主线、快速体验、六章课程、modules 校准与链接 / Skill / 脚本 / dist 验收 |
| `archive/c20-aipd-knowledge-execution-code-topology` | 2026-08-10 | 从千里马、Page One、Guessword 三个案例形成 AI 友好代码拓扑；完成 Core 主事实源、Skill 公共投影、双入口条件加载、三段代码拓扑合同、两平台构建与 Codex 安装 |
| `archive/c21-interaction-response-protocol` | 2026-08-09 | 将 Agent MD 等级 2 的讨论回复协议固定为“我理解 → 展开说说 → 结论 → 横向拓展 → 下一步”，完成构建、安装、验收与 Product / Map 回写 |
| `archive/c22-aipd-knowledge-schema` | 2026-08-10 | 将项目工作区切换为 `_aipd/knowledge/*` 五类并列知识域，完成一次性迁移器、双平台构建、Codex 用户级安装和新上下文检索 Agent 验收 |

## 使用原则

- 新事项先创建 contract + phase-first case：目标、边界和验收标准写入 `case.md`，再按 Design 结果拆 work package。
- 新 Case 创建在 `_aipd/case/cN-{name}/`，入口文件固定为 `case.md`。
- 展开材料按 `01-think/`、`02-design/`、`03-execute/`、`04-verify/`、`05-close/` 组织；Think 分支放在 `01-think/{branch}/`，Design 决策放在 `02-design/`。
- work package 必须列出显式上下文文档、横向模块和验收标准。
- Work Package 只放在 `03-execute/work-packages/`，文件语义是可恢复、可验收的目标包，不是微步骤。
- Work Package 是可恢复、可验收的目标包，不等于子 Agent 派发节点；运行时根据上下文隔离收益、真实并发收益和主线耦合度选择 Main 或子 Agent。
- 旧 Case 中的 `doc/`、`steps/` 或 `01-goal/` 不再兼容运行；继续推进前必须先迁移为 contract + phase-first 结构。
- `archive/` 内的 Case 是不可执行历史快照，允许保留当时旧 Schema 的路径、编号和 Agent 名称；当前运行时不沿这些旧指针读取。若需恢复，先迁出归档、升级结构并重建新 Schema 上下文索引。
- Case 完成并验收后移动到 `_aipd/case/archive/`，索引同步到“已归档 Case”。

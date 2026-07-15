# AIPD Case 索引

## 进行中 Case

| Case | 状态 | 说明 |
|---|---|---|
| `c0.12-codex-gpt-5-6-sol-adaptation` | Verify / 待用户验收 | Main / Child 调度规则、Codex / Claude 生成物与 build 已验证；等待用户审查整体 Git 变更，并确认是否 install |

## 暂停 Case

| Case | 状态 | 说明 |
|---|---|---|
| `c0.8-aipd-desktop-zero` | 已暂停 / Think | AIPD Desktop 暂不推进；未来如恢复，只允许先启动一个有硬边界的 Codex 自主 spike，不自动展开完整桌面端 |
| `c0.10-aipd-capability-object-model` | 已暂停 | 原子能力和中间对象模型方向暂不推进；保留 Context Pack、Research Pack、Decision Record、Handoff 等参考材料 |

## 已归档 Case

| Case | 归档时间 | 说明 |
|---|---|---|
| `archive/c0.1-role-codex-custom-agents` | 2026-06-16 | AIPD 自举接入 Codex custom agents 与推荐 Agent 派发 |
| `archive/c0.2-subagent-origin-model` | 2026-06-16 | 重写分身 Agent、克隆体和结果回流模型 |
| `archive/c0.3-agent-fork-role-policy` | 2026-06-16 | 分析 fork 分身、角色 Agent 和直接执行的调配策略 |
| `archive/c0.5-human-docs-architecture` | 2026-06-16 | 设计面向人的 docs 学习文档体系，区分 README、docs 与 _adoc |
| `archive/c0.6-human-docs-three-lines` | 2026-06-14 | 将面向用户的教学文档升级为三条主线：知识库、Case / Step、AI 原生代码架构实验 |
| `archive/c0.7-repo-structure-reclassification` | 2026-06-27 | 重划仓库根目录，收拢 AIPD Skill 本体、docs、项目认知和历史材料边界 |
| `archive/c0.9-aipd-think-system-design` | 2026-06-27 | 旧 Think 一等对象设计 case；Think 问题已被新的 phase-first case 生命周期吸收，作为历史调研和边界参考归档 |
| `archive/c0.11-aipd-case-design-flow` | 2026-07-10 | 将 Case Design 扩展为需求契约、后端 / 前端设计、上下文解耦、执行切片和 readiness gate，并完成构建与 Codex 安装验证 |
| `archive/c0.13-vue3-context-decoupling-experience` | 2026-07-15 | 从真实 Vue3 后台项目沉淀上下文解耦经验与可验证源码资产，完成 AIPD 品牌迁移、GitHub latest / pinned 发布和远端验收 |

## 使用原则

- 新事项先创建 contract + phase-first case：目标、边界和验收标准写入 `case.md`，再按 Design 结果拆 work package。
- work package 必须列出显式上下文文档、横向模块和验收标准。
- Work Package 是可恢复、可验收的目标包，不等于子 Agent 派发节点；运行时根据上下文隔离收益、真实并发收益和主线耦合度选择 Main 或子 Agent。

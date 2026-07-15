# AIPD Case 索引

## 进行中 Case

| Case | 状态 | 说明 |
|---|---|---|
| `c0.13-vue3-context-decoupling-experience` | Execute / WP-05 发布中 | 用户已授权发布；保持 owner / authorized-only，正在隔离提交、推送并验证 GitHub latest / pinned 地址 |

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

## 使用原则

- 新事项先创建 contract + phase-first case：目标、边界和验收标准写入 `case.md`，再按 Design 结果拆 work package。
- work package 必须列出显式上下文文档、横向模块和验收标准。
- 代码实现、调研和审查默认交给分身 Agent，主 Agent 负责调度和验收。

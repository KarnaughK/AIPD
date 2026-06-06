# AIPD2 Case 索引

## 当前 Case

| Case | 状态 | 说明 |
|---|---|---|
| `c0.1-role-codex-custom-agents` | 待验收 | AIPD2 自举接入 Codex custom agents 与推荐 Agent 派发 |
| `c0.2-subagent-origin-model` | 待验收 | 重写分身 Agent、克隆体和结果回流模型 |
| `c0.3-agent-fork-role-policy` | 执行中 | 分析 fork 分身、角色 Agent 和直接执行的调配策略 |
| `c0.4-module-interface-registry` | 待开始 | 统计 AIPD2 模块并设计模块级初始化 / update 标准接口 |

## 使用原则

- 新事项先创建 case，再拆 step。
- step 必须列出显式上下文文档。
- 代码实现、调研和审查默认交给分身 Agent，主 Agent 负责调度和验收。

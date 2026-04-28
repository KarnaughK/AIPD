# Step-13：Workspace 概念探索

## 背景

当前 Plan 体系运行良好，但"Plan"这个词与 Claude Code 的 Plan Mode 存在命名冲突，每次沟通都需要说"AIPD Plan"来区分。

同时，在实际使用中发现 Plan 的本质更接近"上下文空间"——一个固定边界的工作区，而非传统意义上的"计划文档"。

## 核心洞察

**Claude Code 的根本问题**：上下文只会累积，不会遗忘。

**现有解法**（已验证有效）：
- create 会话：只讨论、写 steps，不执行 → 上下文积累慢
- run 会话：只调度子 Agent，不执行 → 上下文积累慢
- 子 Agent：承担所有脏活，结果以摘要形式返回主 Agent

这套机制让一个会话能支撑 6-7 个任务才需要清空，相比之前的 2-3 个有显著提升。

## Workspace 概念

Plan 的本质是**上下文空间（Workspace）**：

- 定义固定的上下文边界（读哪些文件）
- create skill = 加载上下文空间 → 构建 steps
- run skill = 加载上下文空间 → 执行 steps

两个 skill 共享同一个 Workspace（plan.md），只是角色不同。

## 候选命名

| 名称 | 优点 | 缺点 |
|------|------|------|
| Workspace | 直觉清晰，有边界感 | 略通用 |
| Scope | 有技术感 | 不够直觉 |
| Frame | 轻量 | 含义模糊 |
| Context | 直接 | 太泛 |

倾向：**Workspace**

## 待决策

1. 是否用 Workspace 替换 Plan 命名？
2. 还是保留 Plan，将 Workspace 作为补充概念单独落地？
3. 如果替换，skill 命名变为：`aipd2-workspace-create` / `aipd2-workspace-run`？

## 现状

暂不动现有 Plan 体系，先自用验证，有问题再迭代。

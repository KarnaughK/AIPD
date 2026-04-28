# 多 Agent 协作机制

AIPD2 的多 Agent 设计目标是：让主 Agent 保持上下文干净，把具体执行交给一次性子 Agent。

## 角色分工

- **主 Agent**：与用户沟通、读取 plan、选择下一个 step、派发任务、收集结果、更新状态。
- **子 Agent**：读取 step 文件和指定上下文，完成开发、调研或归档任务，返回简洁结果。

## 核心原则

1. **step 文件是任务边界**：子 Agent 只做 step 文件写明的事情。
2. **上下文显式传递**：step 文件必须列出需要读取的上下文文档，优先使用绝对路径。
3. **主 Agent 少读细节**：主 Agent 不直接吞大量代码和日志，只读计划、摘要和结果。
4. **子 Agent 返回简洁**：成功、失败、改动文件、验证结果即可，不返回大段代码。
5. **平台实现不混用**：Claude Code 和 Codex 的子 Agent 能力不同，构建时会选择对应平台的完整实现文档。

## 平台差异

本文件只描述 AIPD2 的抽象协作思路。

具体调度方式由平台覆盖文件提供：

- Claude Code：使用 Agent Team 机制。
- Codex：使用 Codex 子 agent（worker / explorer）机制。

构建时如果存在 `src/platforms/{platform}/core/agent-guide.md`，会使用平台文件覆盖本文件；否则才使用本文件。

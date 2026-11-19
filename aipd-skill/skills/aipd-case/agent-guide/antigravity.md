# 多 Agent 协作机制：Antigravity

本对话若是 Antigravity：派发 Child 时使用本宿主子 Agent（如 `invoke_subagent`）。规则以包内 `agent-guide.md` 为准。

- 不要把 Leader 的 `agy -p` 无头 Case 执行层当成 Case 内部 Child。
- 没有 Codex custom agent toml。不要去读 `~/.codex/agents` 或跨宿主调用 PATH 上的别家 CLI。
- 角色指引仍读包内 `@references/agent-guides/{agent}.md`。
- 平台不可用时由 Main 回退执行。

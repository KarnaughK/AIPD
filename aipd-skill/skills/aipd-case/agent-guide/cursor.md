# 多 Agent 协作机制：Cursor

本对话若是 Cursor：派发 Child 时使用本宿主子 Agent。规则以包内 `agent-guide.md` 为准。

- 不要把 Leader 的 `cursor-agent` 无头执行层当成 Case 内部 Child。
- 没有 Codex custom agent toml。不要去读 `~/.codex/agents` 或 PATH 上的裸 `agent`。
- 平台不可用时由 Main 回退执行。

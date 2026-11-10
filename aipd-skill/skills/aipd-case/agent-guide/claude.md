# 多 Agent 协作机制：Claude

本对话若是 Claude：派发 Child 时使用本宿主子 Agent。规则以包内 `agent-guide.md` 为准。

- 没有 Codex custom agent toml。不要去读 PATH 上的 `cursor-agent`。
- 角色指引仍读包内 `@references/agent-guides/{agent}.md`。
- 平台不可用时由 Main 回退执行。

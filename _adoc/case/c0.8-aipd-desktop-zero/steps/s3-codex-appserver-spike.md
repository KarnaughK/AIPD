# Step 3: Codex App Server Spike

## 目标

验证 AIPD Desktop 能通过 Codex App Server / SDK 接入 Codex，而不是通过 PTY 包终端。

## 上下文

- `../case.md`
- `../doc/deep-research-agent-client.md`
- `../doc/development-outline.md`
- Codex App Server 官方文档

## 边界

要做：

- 跑通 `codex app-server`。
- 完成 `initialize`。
- 完成 `thread/start`。
- 完成 `turn/start`。
- 接收流式事件。
- 记录 approval / interrupt / resume 是否可行。

不做：

- 不做完整聊天 UI。
- 不接 Claude Code。
- 不接 OpenCode。
- 不做自动上下文规划。

## 待判断

- 直接接 raw app-server JSON-RPC。
- 还是先使用 `@openai/codex-sdk`。
- Tauri Rust 直接实现 adapter。
- 还是引入 Node sidecar 复用 TS SDK。

## 验收

- 形成 spike 结论。
- 明确第零版 CodexAdapter 路线。
- 记录失败点和版本依赖。

# 过夜运行配置

- **宿主**：Cursor 桌面端本对话 = 唯一 Leader
- **执行层**：`cursor-agent`，已登录 `lvrvfv@gmail.com`
- **Codex 模型表**：不适用；Fast 未核验（Cursor 不假装 Fast）
- **Case chatId**：`c632d911-5ae3-4c8c-9bf7-da9bcbc4d1e0`
- **监督器**：已于 08:00 自行退出（最后 pid `19657`）。不要重启，除非用户明确要求。
- **Leader loop**：180s tick 已 STOP 退出。不要再 arm。
- **硬截止**：2026-08-18 08:00 Asia/Shanghai · 已到
- **收口**：[`overnight-close.md`](overnight-close.md)
- **已知风险**：Cursor 会掐跟踪中的长 shell；过夜用双 fork、PPID=1 才稳住。真聊天门铃未接。

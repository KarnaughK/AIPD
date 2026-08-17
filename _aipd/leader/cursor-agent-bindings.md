# Cursor Agent 执行层绑定

Leader 在 Cursor 上派无头 `cursor-agent` 时，把 `chatId` 记在这里。进程对象不持久，`chatId` 才持久。

同一 Case 只绑一条 `chatId`。下一轮 `--resume`，不要新建。

| Case | path | chatId | 方式 | 状态 | 时间 |
|---|---|---|---|---|---|
| — | — | — | cursor-agent-print | empty | — |

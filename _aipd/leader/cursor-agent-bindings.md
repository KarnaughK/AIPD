# Cursor Agent 执行层绑定

Leader 在 Cursor 上派无头 `cursor-agent` 时，把 `chatId` 记在这里。进程对象不持久，`chatId` 才持久。

同一 Case 只绑一条 `chatId`。下一轮 `--resume`，不要新建。

| Case | path | chatId | 方式 | 状态 | 时间 |
|---|---|---|---|---|---|
| c32-unfixed-goal-runtime | /Users/yangzongru/Desktop/CodeKKK/AIPD/_aipd/case/archive/c32-unfixed-goal-runtime/case.md | c632d911-5ae3-4c8c-9bf7-da9bcbc4d1e0 | cursor-agent-print | archived-stopped | 2026-08-21 |

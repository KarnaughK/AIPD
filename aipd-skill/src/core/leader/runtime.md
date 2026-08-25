# Leader Case Runtime

派发 Case 前读取当前平台注入的 `leader/runtime.md`。不要用子 Agent 冒充 Case task。

构建时，Codex 包注入 Codex 平台覆盖，Cursor 包注入 Cursor 平台覆盖。公共层只保留平台分发，不把某一宿主的组合形态写进另一宿主的默认路径。

## Codex

Codex 上 Leader 直接开独立 Codex 任务。一个 Case 对应一个主 task；phase 回跳继续用它。完整合同以 Codex 平台覆盖为准。

最短路径：

1. 用 `codex_app__list_projects` 解析当前 saved project，不得凭目录名猜 id。
2. 调用 `codex_app__create_thread`，标题 `AIPD Case <case-id-or-slug> — <short goal>`，传入 `gpt-5.6-sol` 与 `high`。
3. 只有返回可用 `threadId` / `hostId` 才算 ready。
4. 用 `codex_app__send_message_to_thread`、`codex_app__wait_threads`、`codex_app__read_thread` 跟进。
5. 不要调用 `cursor-agent`，也不要先判断是不是 Cursor 再改走桌面端组合。

没有这些能力时不要假装已经启动编排。

## Cursor

Cursor 因为对话内 Agent 不足以独立承接 Case，才使用桌面端 Leader + 已登录 `cursor-agent` 无头执行层。这是 Cursor 平台包的合同，不是 Codex 的默认路径。完整步骤以 Cursor 平台覆盖为准。

公共层只记住：

- 不用对话内 Task / 子 Agent / Cloud Agent 顶第三层。
- 不用 DSH。
- 一个 Case 一条 `chatId`，回跳 `--resume` 同一条。

## 其他宿主

停止，说明当前没有可用的 Case runtime。

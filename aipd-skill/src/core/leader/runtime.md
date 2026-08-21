# Leader Case Runtime

派发 Case 前先判断当前宿主。不要猜，也不要用子 Agent 冒充 Case task。

## 宿主判断

- 当前对话在 Codex，或能调用 `codex_app__create_thread`：走 **Codex**。
- 当前对话在 Cursor，或能看到 Cursor Agent / `cursor-app-control`：走 **Cursor**。
- 看不清：停下来问一句。

## Codex

Codex 平台覆盖文件有完整合同。若当前构建注入的就是本文件，按同级 task 创建：

1. 用 `codex_app__list_projects` 解析当前 saved project，不得凭目录名猜 id。
2. 调用 `codex_app__create_thread`，标题 `AIPD Case <case-id-or-slug> — <short goal>`，传入 `gpt-5.6-sol` 与 `high`。
3. 只有返回可用 `threadId` / `hostId` 才算 ready。
4. 用 `codex_app__send_message_to_thread`、`codex_app__wait_threads`、`codex_app__read_thread` 跟进。
5. 一个 Case 只绑定一个主 task；phase 回跳继续用它。

没有这些能力时不要假装已经启动编排。

## Cursor

Cursor 的 Case 执行层是本机已登录的 `cursor-agent`。不要用对话内 Task / 子 Agent / Cloud Agent / `move_agent_to_root` 顶第三层。不要找 DSH。

1. 只用 `cursor-agent`，不用裸 `agent`。
2. `command -v cursor-agent`；没有就停。
3. `cursor-agent status`；未登录就停，请用户执行 `cursor-agent login`。不用 API key。
4. 该 Case 还没有 `chatId`：`cursor-agent create-chat`，把 ID 写进 `_aipd/leader/` 并回链 `index.md`。
5. 已有 `chatId`：`--resume` 同一条，不要新建。
6. 在项目根无头派发：

```bash
cursor-agent -p --force --trust --workspace /项目路径 --resume <chatId> "你是 AIPD Case 执行 Agent，不是 Project Leader。先执行项目 AIPD gate，再显式使用 aipd-case 读取 Case：{绝对路径}。按该 Case 当前 phase 推进；有 work package 时读取其绝对路径和上下文文档。允许在同一 Case 内回跳，不得另建同级 Case 或再开一个 Leader。完成后返回压缩结果：Case id / path、chatId、当前 phase、完成项、改动文件、验证结果、风险、阻塞、建议和恢复位置。"
```

7. `exit 0` 只表示这一轮跑完。Leader 读 Case 文件和真实改动验收；未关闭就 resume 同一 `chatId`。
8. 平台目标怎么配合见 `core/leader/guide.md` 与 Cursor 平台包的 `leader/runtime.md`。创建 Goal 不是另开 Case 的理由。

## 其他宿主

停止，说明当前没有可用的 Case runtime。

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

Cursor 默认走 DSH。不要用 Cursor 子 Agent / Cloud Agent / `move_agent_to_root` 顶第三层。

1. 找 `dsh`：先 `command -v dsh`；没有再用 `npx --no-install @deepseek-ai/dsh`（只走本机缓存，不新装）。
2. 还是没有：停止，直接说没有 DSH，搞不了。不要补鲁棒性，也不要改走子 Agent。
3. 有 DSH：默认用方式 A。需要人在 GUI 里续跑时用方式 B。

### 方式 A：headless 单轮（默认）

在**项目根目录**执行。每次调用是独立执行轮，无会话记忆。中间状态只靠 `_aipd/` 里的 `case.md` / work package / checkpoint。

```bash
cd /项目路径
dsh --profile headless "你是 AIPD Case 执行 Agent，不是 Project Leader。先执行项目 AIPD gate，再读取 Case：{绝对路径}，读取 work package：{绝对路径}，按 work package 的上下文文档执行。允许在同一 Case 内回跳，不得另建同级 Case 或同级 DSH 会话。完成后返回压缩结果：Case id / path、当前 phase、完成项、改动文件、验证结果、风险、阻塞、建议和恢复位置。"
```

- 打印最终回复后退出。`exit 0` 即这次调用成功。
- 派发 prompt 带 Case 与 work package 的绝对路径和边界；执行端自己读文件，不复制长正文。
- Leader 读回 Case 文件、真实改动和验证结果做验收。任务自报完成不等于 Leader accepted。

### 方式 B：文件交接 + DSH GUI

1. Leader 把 Case brief、work package、checkpoint 写进 `_aipd/case/` 和 `_aipd/leader/`。
2. 用户在 DSH GUI 里继续执行该 work package。
3. Leader 读回文件验收，不信任自报。

### 绑定

在 `_aipd/leader/` 记录：Case id / path、宿主 `cursor`、调用方式 `dsh-headless` 或 `dsh-gui`、项目根、时间、状态。headless 无 `session_id` 可续；同一 Case 的下一轮再调一次方式 A，靠文件恢复。

## 其他宿主

停止，说明当前没有可用的 Case runtime。

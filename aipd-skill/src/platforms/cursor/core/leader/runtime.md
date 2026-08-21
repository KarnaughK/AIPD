# Leader Case Runtime

当前包是 Cursor 平台包。桌面端对话是 Leader；Case 执行层是本机已登录的 `cursor-agent` 无头进程。不要判断 Codex 宿主。不要用对话内 Task / 子 Agent / Cloud Agent / `move_agent_to_root` 顶第三层。不要找 DSH，不要装 DSH，不要写 `~/.dsh/skills/`。

没有 `cursor-agent` 或未登录就停。不要补退路，也不要改走子 Agent。

## 平台目标（Cursor `/goal`）

Cursor `/goal` 是宿主完成合同：让同一条对话朝可核验结束态续跑。它不是定时器；定期叫醒用 `/loop`。平台目标怎么和 Mission / Case 配合，以 `core/leader/guide.md` 为准。

本包仍不加载 `goal-mode.md`，不写「目标模式绑定」。执行层继续按普通 `aipd-case` 的确认与回跳推进。

- 不因有 Mission、有 Case 或任务长而自动创建 Goal。
- 用户明确要求时：Leader 对话上的 Goal 写当前 Mission 的完成判据，不绑某一个 Case。
- 用户要求执行对话也挂 Goal 时：objective 最多写「推进并关闭这一个 Case（路径）」；这仍不是 AIPD 覆盖层绑定。
- `/goal` 不是另开 Case 的理由。碰壁回跳留在同一 `chatId`。

## 安装绑定

`install-cursor` 只写入 `~/.cursor/skills/`。禁止写入 `~/.dsh/skills/`、`~/.cursor/skills-cursor/`、`~/.codex/skills/`。泛名 `install` 仍只装 Codex。

桌面端 Leader 和无头执行 Agent 都读 `~/.cursor/skills/`，因此执行层会加载 `aipd-case`。

## 找 cursor-agent

1. 只用 `cursor-agent`，不用 PATH 上的裸 `agent`（本机 `agent` 可能是别的 CLI）。
2. `command -v cursor-agent`。没有：停止，说明没装 Cursor CLI。
3. `cursor-agent status`。未登录：停止，请用户在本机执行 `cursor-agent login`。不要用 `CURSOR_API_KEY` / `--api-key`。
4. 有且已登录：按下面派发。

## 职责

- **Leader**（当前桌面对话）：规划 Mission 的 Case 路线，按序派一个执行 Agent 做一个 Case，最后收口。不代做 Case 内 Think / Design / Execute / Verify。
- **执行 Agent**（无头 `cursor-agent`）：把一个 Case 从当前 phase 做到 Close，含验证。可按项目规则使用 Child Agent；不得另建同级 Case 执行层，不得再开一个 Leader。
- 同一时刻一个 Case 只有一个执行 Agent。基础版不扇出多个无头进程。

## 对象绑定（chatId）

每次启动都是新进程。身份不绑对象，绑 `_aipd/leader/` 里的记录：

1. 派发前读 `_aipd/leader/index.md` 和它链接的绑定文件。
2. 该 Case 还没有 `chatId`：运行 `cursor-agent create-chat`，把返回的 ID 记下来。
3. 已有 `chatId`：同一 Case 的下一轮必须 `--resume <chatId>`，不要新建对话。
4. 绑定写在 `_aipd/leader/` 的文字文件里，并回链 `index.md`。建议字段：

```md
| Case | path | chatId | 方式 | 状态 | 时间 |
| cN-slug | /abs/path/to/case.md | <chatId> | cursor-agent-print | running / returned / accepted | ISO time |
```

5. Case 进度以 Case 文件为准。`chatId` 只用来恢复同一条执行对话。任务自报完成不等于 Leader accepted。

## 派发（无头单轮）

在**项目根目录**执行。`--print` 这一轮阻塞到执行 Agent 退出。中间状态只靠 `_aipd/case/`。

```bash
cursor-agent -p --force --trust --workspace /项目路径 --resume <chatId> "你是 AIPD Case 执行 Agent，不是 Project Leader。先执行项目 AIPD gate，再显式使用 aipd-case 读取 Case：{绝对路径}。按该 Case 当前 phase 推进；有 work package 时读取其绝对路径和上下文文档。允许在同一 Case 内回跳，不得另建同级 Case 或再开一个 Leader。完成后返回压缩结果：Case id / path、chatId、当前 phase、完成项、改动文件、验证结果、风险、阻塞、建议和恢复位置。"
```

- 必须带 Case 绝对路径；有当前 work package 时也带。不要把长正文复制进 prompt。
- `--force` 只让这一轮能改工作区文件。发布、删除、付费、远端推送仍按原权限边界。
- 不用 `--api-key`。模型不写死，跟已登录账号的可用模型走。
- `exit 0` 只表示这一轮 CLI 跑完。Leader 读回 Case 文件、真实改动和验证结果再验收。

## 收口

执行 Agent 返回后，Leader 至少核对：

1. Case / Work Package 状态与返回一致。
2. 改动落在该 Case 边界内。
3. 验证证据覆盖 Case 成功判据；不重跑一遍 Verify，缺证据就打回同一 `chatId`。
4. 没有另建同级 Case，也没有抢其他 Case 的代码面。

通过后记 Leader accepted，再派下一个已确认 Case。未关闭就 `--resume` 同一 `chatId` 再开一轮。

# Leader Case Runtime

当前包是 Cursor 平台包。Leader 在 Cursor，Case 执行层是 DSH。不要判断 Codex 宿主，也不要用 Cursor 子 Agent / Cloud Agent / `move_agent_to_root` 顶第三层。

没有 DSH 就停。不要补鲁棒性，也不要改走子 Agent。

## 安装绑定

`install-cursor` 必须同时写入这两个目录，不要只装一边：

| 软件 | 落点 | 谁读 |
|---|---|---|
| Cursor | `~/.cursor/skills/` | Cursor 上的 `$aipd-leader` |
| DSH | `~/.dsh/skills/` | DSH Case 执行层的 `$aipd-case` 等 Skill |

泛名 `install` 仍只装 Codex，不写这里。禁止写入 `~/.cursor/skills-cursor/` 和 `~/.codex/skills/`。

## 找 DSH

1. 先 `command -v dsh`。
2. 没有再用 `npx --no-install @deepseek-ai/dsh`（只走本机缓存，不新装）。
3. 还是没有：停止，直接说没有 DSH，搞不了。
4. 有 DSH：默认用方式 A。需要人在 GUI 里续跑时用方式 B。

## 方式 A：headless 单轮（默认）

在**项目根目录**执行。每次调用是独立执行轮，无会话记忆。中间状态只靠 `_aipd/` 里的 `case.md` / work package / checkpoint。

```bash
cd /项目路径
dsh --profile headless "你是 AIPD Case 执行 Agent，不是 Project Leader。先执行项目 AIPD gate，再读取 Case：{绝对路径}，读取 work package：{绝对路径}，按 work package 的上下文文档执行。允许在同一 Case 内回跳，不得另建同级 Case 或同级 DSH 会话。完成后返回压缩结果：Case id / path、当前 phase、完成项、改动文件、验证结果、风险、阻塞、建议和恢复位置。"
```

- 打印最终回复后退出。`exit 0` 即这次调用成功。
- 派发 prompt 带 Case 与 work package 的绝对路径和边界；执行端自己读文件，不复制长正文。
- Leader 读回 Case 文件、真实改动和验证结果做验收。任务自报完成不等于 Leader accepted。
- headless 默认扫描 `~/.dsh/skills/`。本包安装后，DSH 应从这里加载 `aipd-case`，不要再依赖 `~/.codex/skills`。

## 方式 B：文件交接 + DSH GUI

1. Leader 把 Case brief、work package、checkpoint 写进 `_aipd/case/` 和 `_aipd/leader/`。
2. 用户在 DSH GUI 里继续执行该 work package。
3. Leader 读回文件验收，不信任自报。

## 绑定

在 `_aipd/leader/` 记录：Case id / path、宿主 `cursor`、调用方式 `dsh-headless` 或 `dsh-gui`、项目根、时间、状态。headless 无 `session_id` 可续；同一 Case 的下一轮再调一次方式 A，靠文件恢复。

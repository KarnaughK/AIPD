# 过夜保活（实验，非正式 Skill）

实验目录，不是产品。目标：验证「代码固定循环 + Agent 判断」能否过夜跑通。

## 文件

| 文件 | 谁写 | 谁读 | 含义 |
|---|---|---|---|
| `chat-id.txt` | 人 / 启动方 | 监督器 | 固定 resume 的同一条对话 |
| `interval-seconds.txt` | **Agent** | 监督器 | 下一档叫醒间隔（秒）。非法 / `<20` 时监督器用 `60` |
| `worker.prompt.md` | Case 推进时更新 | 监督器 | 每轮 `--resume` 注入的短任务 |
| `doorbell.flag` | 人 / 外部（可选） | 监督器 | 存在则下一轮互斥空闲后立刻拉起，然后删除 |
| `supervisor.pid` / `worker.pid` | 监督器 | 监督器 | 互斥与单实例 |
| `status.txt` | 监督器 | 人 / Agent | 最近决策：`SKIP_BUSY` / `WAKE` / `SLEEP_AFTER_WORKER` / `STOPPED_AT_08:00` |
| `supervisor.log` / `worker.log` | 监督器 / worker | 调试 | 运行日志 |

## 监督器怎么转（可执行，不是状态树）

死循环到 `2026-08-18 08:00`（Asia/Shanghai），每步只做一件事：

1. **到点？** `now >= 08:00` → 写 `STOPPED_AT_08:00`，退出。AI 关不掉循环；只有这个硬停。
2. **忙？** `worker.pid` 对应进程仍活着 → `SKIP_BUSY`，睡 `20s`（互斥轮询），回到 1。
3. **缺配置？** 没有 `chat-id.txt` 或 `worker.prompt.md` → 睡 `20s`，回到 1。不替 Agent 发明任务。
4. **门铃？** 若存在 `doorbell.flag` → 删掉，本轮立刻进入 5（不先睡 interval）。
5. **拉起** → `cursor-agent -p --force --trust --workspace ROOT --resume $(chat-id) "$(worker.prompt.md)"`，写 `worker.pid`，`wait` 到结束。
6. **睡档** → 读 `interval-seconds.txt`（默认 `60`），睡这么久（但不会睡过 08:00），回到 1。

判断「这一轮接着干还是等人」只在 Agent 醒后读 Case 文件里做。监督器**从不**根据内容决定要不要叫醒。

## 过夜默认

- 互斥轮询：20 秒
- 退出后再拉起：60 秒（监督档；未拍板前过夜用这个）
- 硬停：2026-08-18 08:00

## 启动 / 停

```bash
# 单实例启动（脚本内会拒第二个活监督器）
nohup ./supervisor.sh >> supervisor.nohup.out 2>&1 &
echo $! > supervisor.pid   # 也可由脚本自己写；以 status.txt / 脚本内 pid 为准

# 看最近决策
cat status.txt

# 门铃（人介入实验）：立刻在互斥空闲后拉起一轮
touch doorbell.flag

# 08:00 前手动停（仅调试）
kill "$(cat supervisor.pid)"
```

## 边界

- 不写正式 Skill，不 install，不 commit / push。
- 不碰 oknp / DSH 作业。
- 「人在同一条对话说话 = 门铃」过夜实验用 `doorbell.flag` 近似；真聊天门铃未接传感器。

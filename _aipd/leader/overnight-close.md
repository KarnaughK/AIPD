# 过夜收口 · 2026-08-18 08:00

- **Mission**：过夜推进无固定目标运行时
- **硬截止**：2026-08-18 08:00 Asia/Shanghai（已到）
- **状态**：overnight closed；停止新调度；等人
- **未做**：不 commit / push / install / 进 Design / 另开 Leader

## 一句话

本机循环实验跑通了：同一条 Case 对话被代码固定叫醒，判断权在 Agent；监督器同 pid 从 01:38 连到 08:00。Case 仍在 Think。进 Design 还差你拍板。

## 跑起来了什么

| 项 | 事实 |
|---|---|
| Leader 对话 | 本对话保活到 08:00；180s tick 共 130 拍后 STOP 退出，未再 arm |
| 执行层 | 只 `--resume` `c632d911-5ae3-4c8c-9bf7-da9bcbc4d1e0`，未另建 chat |
| 监督器 | `19657`（PPID=1）自 01:38:28 连续到 08:00:00 自行 `STOPPED_AT_08:00`，约 6h21m |
| 叫醒 | `supervisor.log` 共 79 次 `wake cursor-agent`，均为 `reason=interval` |
| 频率 | Agent 约 02:05 把 `interval-seconds.txt` 从 60 写成 **300**（assumed，非你拍板） |
| 门铃 | `doorbell.flag` 整夜 ABSENT；真聊天门铃未接 |
| Phase | Think / in_progress；**未进 Design** |

早期：Cursor 会掐跟踪中的长 shell。第一只监督器被掐后改为双 fork、PPID=1。之后 19657 未再死。

## 观察到的异常（未当故障改回 60）

- 约 05:42–05:47、05:52–06:00 两轮 worker 比往常长（约 5min / 8min），随后自行结束。互斥等它，未另起对话、未杀进程。
- 其余多数轮约 40–90s。

## 进 Design 仍缺（3 缺口）

1. **等人确认**：推进档 / 等人档数字（过夜 assumed 60 / 600；实验观察窗用了 300）和门铃是否「仅人说话」。
2. **等人确认**：第三运行时这版压缩表述（平行 Case / Leader；判断权在 Agent；循环不可被 AI 关掉）。
3. **实验**：同 pid 长窗口 **已满足**（19657 跨到 08:00）。仍缺一次失败恢复或真门铃演练。

## 你回来先看

1. 本文件
2. [`overnight-mission.md`](overnight-mission.md)
3. [`../case/archive/c32-unfixed-goal-runtime/case.md`](../case/archive/c32-unfixed-goal-runtime/case.md)（2026-08-21 已 `stopped / deferred` 归档）
4. [`../case/archive/c32-unfixed-goal-runtime/01-think/think.md`](../case/archive/c32-unfixed-goal-runtime/01-think/think.md)
5. `01-think/overnight-keepalive/status.txt`（`STOPPED_AT_08:00`）

## 下一动作（等人）

2026-08-21 用户收口：`c32` 已归档，不再等人拍板进 Design。再做无固定目标运行时另开 Case。

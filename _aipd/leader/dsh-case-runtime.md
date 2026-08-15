# Mission：DSH 作为 AIPD Leader 的可选 Case runtime

## 状态

- Mission：`m3-dsh-case-runtime`
- 状态：closed / superseded（2026-08-16）
- 启动日期：2026-08-14
- 关闭日期：2026-08-16
- 工作区：`/Users/yangzongru/Desktop/CodeKKK/AIPD`

## 想达成的结果

Cursor 上的 `$aipd-leader` 默认走 DSH Case 执行层：有 DSH 就 headless 调用，没有就停。Codex runtime 保留。

## 方向变化

- 从：先设计、再挑赚钱项目做活体，并假设 DSH Session 可续聊。
- 到：先在 AIPD 把 Cursor + DSH 开发并调通。headless 无状态，文件即状态。Cursor 默认走这套；没有 DSH 就说没有并停止。
- 依据：2026-08-14 用户指令，以及本机实测的 `dsh --profile headless`。

## 运行配置

| 层级 | 实际状态 |
|---|---|
| 当前 Leader | Cursor / Grok 4.6 |
| Case runtime | DSH `0.1.0-rc.6`，`dsh --profile headless`。本 Agent PATH 无 `dsh`，`npx --no-install @deepseek-ai/dsh` 可用 |
| Codex runtime | 保留，未拆 |

## 已完成

- `$aipd-leader` 增加宿主判断：Codex / Cursor / 其他。
- Cursor：先找 `dsh`，再 `npx --no-install`，还没有就停。
- 冒烟：headless 读 `AGENTS.md` + manifest，三句话身份正确，`exit 0`。
- 小真实：`c29-dsh-headless-dispatch` 文件写回 + 压缩返回闭环。Leader accepted。
- `./aipd-skill/scripts/build` 与 `check-dist` 通过。

## Case 队列

| Case | 状态 | 绑定 |
|---|---|---|
| `archive/c30-cursor-leader-platform` | stopped / archived | Cursor 平台包与双目录安装保留；wp-02 取消 |
| `archive/c29-dsh-headless-dispatch` | completed / archived | 宿主 cursor；方式 `dsh-headless`；实验完成，非正式晋升 |

## 坑

- Cursor Agent PATH 默认没有 `dsh`。必须走 npx 缓存，或用户把 `dsh` 放进该 Agent 能看到的 PATH。
- headless 不会勾 work package 复选框除非 prompt / 文件明确要求且它写了。下一轮只信文件。
- 已安装的 `~/.codex/skills/aipd-leader` 还是旧合同，要等用户确认 install。

## 待用户决定

已于 2026-08-16 拍板：关闭本 Mission 与 `c29` / `c30`，保留代码；后续 Case 把执行层改成已登录的 `cursor-agent`，不再晋升 DSH。

## 下一恢复位置

不要续跑 `c30`。等收口提交推送后，用新 Case 做 Cursor Leader 特制化与 `cursor-agent` 执行层。

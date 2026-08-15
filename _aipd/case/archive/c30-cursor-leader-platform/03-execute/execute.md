# Execute: c30-cursor-leader-platform

## 状态

- 当前 work package：`wp-01-cursor-platform-and-install`
- 状态：in_progress

## 执行前 checkpoint

- 当前问题：按用户 2026-08-14 指令，Cursor 与 DSH 绑定安装，不再只写 `~/.cursor/skills/`。
- 设计输入：`02-design/design.md`；冲突点是原合同把 DSH 只当调用层。
- 执行边界：新增 Cursor 平台 runtime + `install-cursor`；一次安装同时复制到 `~/.cursor/skills/` 与 `~/.dsh/skills/`。
- 禁止：`~/.cursor/skills-cursor/`、改泛名 `install`、写入 `~/.codex/skills/`。
- 验收：`build cursor` 通过；runtime 以 Cursor + DSH 为主；安装脚本声明双落点。本轮先不跑 install，等用户明确确认。
- 恢复入口：本文件 + `case.md` + `wp-01`。

## 执行后 checkpoint

- 已完成：Cursor 平台 runtime、`install-cursor` 双落点、`build cursor`（9 个 skill）。
- 验证：`dist/cursor/skills/aipd-leader/references/leader/runtime.md` 以 Cursor + DSH 为主，并写明 `~/.cursor/skills/` 与 `~/.dsh/skills/`。泛名 `install` 未改。
- 未做：未跑 `install-cursor`，家目录尚未写入。
- 残留风险：本机 DSH web profile 仍桥 `~/.codex/skills/`；headless 会读 `~/.dsh/skills/`。
- 下一步：用户确认后跑 `install-cursor`，再进 wp-02。

## 安装前 checkpoint

- 用户反馈 Cursor 看不到 Skill。原因是上一轮只 `build cursor`，未跑 `install-cursor`。
- 现在执行 `./aipd-skill/scripts/install-cursor`，同时写入 `~/.cursor/skills/` 与 `~/.dsh/skills/`。
- 禁止写入 `~/.cursor/skills-cursor/` 与 `~/.codex/skills/`。

## 安装后 checkpoint

- 已完成：`./aipd-skill/scripts/install-cursor`。`~/.cursor/skills/` 与 `~/.dsh/skills/` 各有 9 个 AIPD skill，含 `aipd-leader`。
- 验证：未写入 `skills-cursor`；Cursor 产物 runtime 仍以 Cursor + DSH 为主。
- 说明：当前对话不会自动刷新 Skill 列表，需要新开 Cursor 对话或看 Customize → Skills。
- 下一步：wp-01 可视为执行完成；用户看见 Skill 后进 wp-02。

## 记录

用户因看不见 Skill 要求安装；双目录安装已完成。

## 关闭 checkpoint

- 2026-08-16：用户要求关闭 `c30`，保留已改代码。wp-01 保持 completed；wp-02 取消，不把 Codex 包拆回只认 Codex。
- 原因：Case 执行层将从 DSH 改成已登录的 `cursor-agent`，继续 wp-02 会锁死旧合同。
- 恢复入口：`05-close/close.md`

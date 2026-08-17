# Execute: c31-cursor-leader-agent-runtime

## 当前目标

把 Cursor Leader 基础版落到源码：桌面端调控，无头 `cursor-agent` 执行，`chatId` 记在 `_aipd/leader/`，DSH 退出合同。

## 工作包

| WP | 状态 | 说明 |
|---|---|---|
| wp-01 | done | runtime / Skill / Codex Cursor 段 |
| wp-02 | done | `install-cursor` 单目录 |
| wp-03 | done | `build cursor` 与默认 `check-dist` 通过；未 install |

## 执行边界

- 不自动 install。
- 不扇出多个执行 Agent。
- 不提目标模式。

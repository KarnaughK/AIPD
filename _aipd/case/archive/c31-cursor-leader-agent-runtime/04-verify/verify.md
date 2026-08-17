# Verify: c31-cursor-leader-agent-runtime

- 验收人：用户（2026-08-17 明确要求 install 后归档）
- 结论：通过

| 标准 | 结果 |
|---|---|
| Cursor runtime 写规划 / 按序调度 / 收口 | 通过；`platforms/cursor/core/leader/runtime.md` |
| Cursor 包不提目标模式绑定 | 通过 |
| 执行层是已登录 `cursor-agent` | 通过；本机 `cursor-agent status` 已登录 |
| 不找 DSH，不写 `~/.dsh/skills/` | 通过；`install-cursor` 只写 `~/.cursor/skills/` |
| `build cursor` + 默认 `check-dist` | 通过 |
| 用户确认后 install | 通过；`~/.cursor/skills/aipd-leader` 已是 cursor-agent 合同 |

用户主观判断项：无。Install 由用户本轮授权。

# Design: c31-cursor-leader-agent-runtime

## Design 模式

- **类型**：docs / process（Skill 与 runtime 合同）
- **模式**：quick
- **当前节点**：file boundary / work packages（completed）
- **下一节点**：Execute
- **停止点**：文件边界已写清，用户要求落地基础版。

## 重捋后的运行时

```text
用户
  -> Cursor 桌面端对话 / $aipd-leader
       规划 Mission 路线、按序派 Case、最后收口
  -> cursor-agent（本机已登录 CLI，无头，--resume chatId）
       把一个 Case 从 Think 做到 Close，含验证
  -> chatId 记在 _aipd/leader/cursor-agent-bindings.md
  -> 状态只写在 _aipd/case/
```

- 桌面端是 Leader，不是执行者。
- `cursor-agent` 是 Case 执行层。DSH 不出现。
- 没有目标模式。
- 新进程用 `chatId` 绑回同一条执行对话。

## 需求契约

### confirmed

- Leader：调控、规划路线、按序派执行 Agent、最后收口。
- 执行 Agent：一个 Case 从头到尾开发并验证。
- 执行层：已登录 `cursor-agent`。`chatId` 落 `_aipd/leader/`。
- DSH 从 Cursor 合同删除。`install-cursor` 只写 `~/.cursor/skills/`。
- Cursor Leader / runtime / install 不提目标模式。

### assumed

- 执行层模型跟已登录账号走，不写死 `gpt-5.6-sol`。
- 共享 `aipd-case` 里「有平台 goal 才加载」的句子先不动。

### open

- 无。

## 文件边界

| 文件 | 动作 |
|---|---|
| `aipd-skill/src/platforms/cursor/core/leader/runtime.md` | 重写成 cursor-agent + chatId |
| `aipd-skill/src/core/leader/runtime.md` | Cursor 段去掉 DSH |
| `aipd-skill/src/skills/aipd-leader/SKILL.md` | Cursor 句子改为 cursor-agent |
| `aipd-skill/src/platforms/codex/core/leader/runtime.md` | Cursor 段去掉 DSH，不重做 Codex 主链路 |
| `aipd-skill/src/core/leader/workspace-template.md` | 恢复项加上 Cursor chatId |
| `aipd-skill/scripts/install-cursor` | 只写 `~/.cursor/skills/` |
| `aipd-skill/README.md` | 维护者入口同步 |
| `_aipd/leader/cursor-agent-bindings.md` | 本项目绑定表 |

## Work Package

- `wp-01-cursor-runtime-and-skill`
- `wp-02-install-cursor-single-target`
- `wp-03-build-verify`

## Readiness

通过。进入 Execute。

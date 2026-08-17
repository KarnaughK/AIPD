# WP-02: install-cursor 只写 Cursor

> **所属 Case**: c31-cursor-leader-agent-runtime

## 目标

`install-cursor` 只复制到 `~/.cursor/skills/`。

## 验收标准

- [x] 脚本不再写 `~/.dsh/skills/`
- [x] 文案不再要求 Cursor+DSH 双装
- [x] README 维护者入口同步

## 执行记录

2026-08-17：重写 `aipd-skill/scripts/install-cursor`，更新 `aipd-skill/README.md`。未执行 install。

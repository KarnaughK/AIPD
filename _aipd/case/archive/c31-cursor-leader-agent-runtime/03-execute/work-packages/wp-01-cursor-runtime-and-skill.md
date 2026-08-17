# WP-01: Cursor runtime 与 Leader Skill

> **所属 Case**: c31-cursor-leader-agent-runtime

## 目标

把 Cursor 执行层合同从 DSH 改成已登录 `cursor-agent`，并用 `_aipd/leader/` 记录 `chatId`。

## 验收标准

- [x] Cursor 平台 `leader/runtime.md` 只写 cursor-agent，不写 DSH 派发
- [x] 公共 Skill / core runtime 的 Cursor 句子同步
- [x] Codex 主链路未改；只删 Codex runtime 里的 DSH Cursor 段
- [x] 不出现目标模式绑定叙述

## 执行记录

2026-08-17：已改 `platforms/cursor/core/leader/runtime.md`、`core/leader/runtime.md`、`skills/aipd-leader/SKILL.md`、`platforms/codex/core/leader/runtime.md`、`workspace-template.md`。本项目增加 `cursor-agent-bindings.md`。

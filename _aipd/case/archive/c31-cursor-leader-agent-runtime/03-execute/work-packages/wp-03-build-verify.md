# WP-03: 构建校验

> **所属 Case**: c31-cursor-leader-agent-runtime

## 目标

`./aipd-skill/scripts/build cursor` 通过；默认 Codex `build` / `check-dist` 不被这次改坏。

## 验收标准

- [x] `build cursor` 成功
- [x] 默认 `build` + `check-dist` 成功
- [x] 不执行 install

## 执行记录

2026-08-17：`build cursor`、默认 `build`、`check-dist` 均通过。未 install。

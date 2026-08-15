# Work Package: wp-02 - split Codex runtime

> **所属 Case**: c30-cursor-leader-platform
> **Phase**: Execute
> **类型**: dev
> **依赖**: wp-01
> **拓扑敏感**: 否

## 目标

Codex 包回到只认 Codex Case task，不再默认走 DSH。

## 并列工作项

- [ ] 从 `src/platforms/codex/core/leader/runtime.md` 去掉 Cursor / DSH 默认分支 — 2026-08-16 随 Case 关闭取消
- [ ] 核 `src/core/leader/runtime.md` 与 `aipd-leader/SKILL.md` 不再强迫 Codex 包以 DSH 为默认 — 取消
- [ ] `./aipd-skill/scripts/build` 与 `./aipd-skill/scripts/check-dist` 通过 — 取消

## 上下文文档

- `02-design/design.md`
- `aipd-skill/src/platforms/codex/core/leader/runtime.md`
- `aipd-skill/scripts/check-dist` 里的 Leader 合同字符串（`gpt-5.6-sol`、`一个独立 Codex 任务` 等须保留在 Codex Skill 源码）

## 验收标准

- [ ] Codex dist 的 runtime 只讲 Codex task
- [ ] 默认 check-dist 通过
- [ ] Cursor 包不受这次删除影响

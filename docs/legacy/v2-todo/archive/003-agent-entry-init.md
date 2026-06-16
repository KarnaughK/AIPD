# Agent Entry 初始化落地

## 状态

已完成。

## 决策

`/aipd2` 初始化不只是创建 `_adoc/`，还要把 Agent Entry 写入项目根目录默认记忆文件。

## 已落地

- `aipd2` 注入 `agent-entry/template.md`。
- Codex 优先，默认写入 `AGENTS.md`。
- Claude Code 可复用同一模板写入 `CLAUDE.md`。
- 使用 `<!-- AIPD:START -->` / `<!-- AIPD:END -->` 标记维护 AIPD 区块。
- 已有文件时只替换 AIPD 区块或追加区块，不覆盖用户原有内容。
- 状态扫描增加 Agent Entry 检查。

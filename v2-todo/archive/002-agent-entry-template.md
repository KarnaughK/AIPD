# Agent Entry 认知壳模板

## 状态

已完成。

## 决策

`AGENTS.md` / `CLAUDE.md` 不应该只放动作指令，也不应该塞入完整 AIPD 方法论。

它们应该是一层轻量认知壳，告诉新进入项目的 Agent：

- 本项目使用 AIPD 维护项目认知。
- AIPD 是什么。
- L1 到 L5 分别代表什么。
- Case、Step、OKR 是什么。
- `_adoc/` 与就近 README 分别承载哪些认知。
- 用户当前指令与 AIPD 认知冲突时，先指出冲突和风险。

## 已落地

- 模板文件：`src/core/agent-entry/template.md`

该模板是平台无关核心内容，可被目标项目初始化流程插入：

- Codex / OpenAI Agent：`AGENTS.md`
- Claude Code：`CLAUDE.md`

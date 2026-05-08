# Fork-First 子 Agent 运行模式

## 状态

已完成第一版。

## 决策

AIPD 以保护 Main Agent 上下文为优先目标。项目接入 AIPD 后，主/子 Agent 模式写入 Agent Entry，由目标项目根目录的 `AGENTS.md` / `CLAUDE.md` 常驻加载。

不在 core/platform guide 中重复大段协议，避免多处维护。

## 已落地

- `src/core/agent-entry/template.md` 增加 Main / Sub Agent Mode。
- 明确 Codex 创建子 Agent 时默认使用 `fork_context: true`。
- 明确每个 Step 默认创建一个新的子 Agent。
- 明确 Sub Agent 默认先给方案，等待 Main Agent 确认后再执行。
- `aipd2-case-create` 增加：探索、验证、批量读取、case 草案整理优先交 fork 子 Agent。
- `aipd2-case-run` 增加：每个 step 使用新的 fork 子 Agent，两阶段执行。

## 后续

Role 系统还未落地。后续可以在派发语句中叠加：

```text
你是 AIPD 子 Agent，采用 {role} 判断方式。
```

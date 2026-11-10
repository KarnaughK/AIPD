# Think branch: prior-conversation

- **branch goal**：把原对话里已经对齐、但不能再依赖聊天记忆的安装方向收成证据。
- **trigger**：本分叉要求调用 `aipd-case`，把「刚才要做的事」立成 Case。
- **scope / stop condition**：只摘原对话用户原话与已对齐结论。不重做平台矩阵调研，不评价沙箱题。
- **return to**：Case Contract + `01-think/think.md`
- **invalidates**：现有「按平台各打一份 Skill 包、`install` 写 `~/.codex/skills`」作为默认交付合同。尚未使代码失效，只使后续 Design 不得沿这条合同走。

## 来源

- 原对话 session：`01a0870d-b3eb-7021-ad2d-265b3f03bb44`
- 时间：2026-09-09 ~ 2026-09-10
- 标题：AIPD 全局 .agents 安装与 Grok 沙箱
- 本对话：该 session 的分叉，用于正式 Case 推进

## 用户原话（压缩）

1. Grok APP 已不再加载其他 Agent 的全局配置，只加载全局 `.agents` 和 `.grok`。问：除 Claude Code 外，是不是都该支持全局 `.agents`。
2. 本机已有全局 Cursor 一份、全局 Codex 一份，不必再给 Grok 装第三份；日常三套是不是都该只认全局 `~/.agents`。custom agent 已老旧，不用管。主要是 AIPD 那一摞 Skill。
3. 可以加 `install-agents`。Leader 不要每家一份：Skill 本体只留索引，各宿主内容按需加载。Claude 安装时把同一套复制到 `~/.claude`；磁盘上带着 Codex / Cursor / Grok 描述没关系，因为按需加载。
4. 推进不够严谨时，先做前半段：除 Leader 外先装到全局 `.agents`，让 Grok 能读到 `aipd-case`，再立这次任务。

## 关键证据

原对话已核对：

- 项目 `.agents/skills/` 正在变成可移植约定；全局 `~/.agents` 不是「除 Claude 外所有人的唯一家」。Codex 官方用户路径是 `~/.agents/skills`；Grok 在关掉 Claude/Cursor 兼容后仍扫 `~/.agents/skills`，不扫 `~/.codex/skills`。
- 本机当时：`~/.codex/skills` 与 `~/.cursor/skills` 各有一套九个公共 Skill；`~/.agents` 几乎空。
- Leader 是两份拷贝存在的真正原因：构建按平台注入不同的 `leader/runtime.md`。一份共享 Skill 若只带 Codex 合同，Grok 跑 Leader 会去调没有的接口。
- 公共 `src/core/leader/runtime.md` 已是索引雏形；问题是构建覆盖成单文件，且 `SKILL.md` 把两家细节写进常驻正文。

原对话已完成的 bootstrap：

- 沙箱拦住 `~/.agents` 后，曾临时装到 `~/.grok/skills`。
- 关掉沙箱后，8 个非 Leader Skill 装进 `~/.agents/skills`，并删除 `~/.grok/skills` 里的 AIPD 拷贝。
- 明确下一步：用 `$aipd-case` 立「一套装进 `.agents`、Leader 按宿主按需加载」的任务。

## 结论

方向已经是 Create，不是继续 Research。本分支只负责把原对话变成 Case 可恢复证据。剩下 3 个开口见 `01-think/think.md`，不在本分支展开。

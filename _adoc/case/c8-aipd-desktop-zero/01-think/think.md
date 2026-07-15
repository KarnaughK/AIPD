# Think: AIPD Desktop Zero

## 当前问题

AIPD Desktop 曾经被定义为 AIPD 的增强客户端：以 AIPD 项目结构为外壳，提供文件树、聊天输入、预览和轻量上下文 chip。2026-06-27 后方向暂停，当前重开前需要先判断：

- AIPD Desktop 是否仍值得继续推进。
- 第零版是否仍限定为 AIPD 文件树解析 + 真实 Agent 聊天接入。
- Codex 接入路线是否仍以 App Server / SDK 为主，PTY 只做 fallback。

## 旧结论

- AIPD Desktop 不应做成重型 Agent 编排工厂。
- Desktop 是 AIPD Skill / ADOC 的增强壳，不是基础能力的前置依赖。
- 第零版先做两条地基：AIPD 文件树解析、真实 Agent 聊天接入。
- Case Workspace、自动上下文规划、自动 weave 和多 Agent 工厂不进入第零版。

## 已迁移资料

- `references/reference-notes.md` - 旧讨论引用的外部 / 项目参考资料和接口路线摘要。
- `references/deep-research-agent-client.md` - Codex / Claude Code / OpenCode 客户端套壳项目旧调研。

## 需要复核

- Codex App Server / SDK 当前是否仍是推荐接入路线。
- Tauri + Vue + TypeScript 是否仍是合适的第零版技术栈。
- `aipd-desktop/` 是否继续放在当前仓库内孵化。
- UI 是否应统一使用 Case / Work Package 语言，而不是旧 Case / Step 表述。

## 当前结论

当前只完成旧 case 结构迁移。2026-07-10 用户再次确认 Desktop 暂停，不进入 Design 或 Execute。

## 暂停 checkpoint：未来 Codex 自主试验

- **当前授权**：未授权启动实现；本轮只保留候选。
- **候选方式**：未来可以让 Codex 独立完成一个可丢弃、可验收的 spike，用真实结果判断 Desktop 是否值得继续。
- **单次边界**：一次只选项目空壳、文件树或 Codex 接入验证中的一个，不串行自动执行全部候选 work package。
- **目录边界**：只允许修改 `aipd-desktop/` 和本 case 的 phase / work package 记录；不修改 AIPD core。
- **停止条件**：达到验收标准、出现关键接口不确定性、需要新增大型依赖、需要越过目录边界，或一个 work package 完成时立即停止并回报。
- **外部状态边界**：不自动安装、不推送、不发布、不创建云端资源。
- **恢复入口**：用户明确授权恢复后，先在 Think 选择一个 spike，再刷新对应 Design 和 work package；未授权前保持 paused。

## 下一步

如果用户确认继续 Desktop，则先选择并确认一个受约束 spike，完成对应 Think 复核后再更新 `02-design/design.md`；不得把“可以试试”解释为自动执行整个桌面端。

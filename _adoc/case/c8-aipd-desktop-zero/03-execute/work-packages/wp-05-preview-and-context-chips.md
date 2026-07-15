# Work Package c8/wp-05: Preview And Context Chips

## 目标

增加轻量预览和快捷上下文能力，让 AIPD Desktop 开始体现区别于普通 Codex 客户端的价值。

## 上下文

- `../../case.md`
- `../../02-design/development-outline.md`
- `../../02-design/tauri-architecture-overview.mmd`

## 边界

要做：

- Markdown 基础预览。
- Mermaid / `.mmd` 预览。
- 左侧选中 doc / case / phase / work package 后，在输入区显示上下文 chip。
- 发送消息时把 chip 对应文件路径或摘要作为显式上下文。

不做：

- 不做自动上下文 planner。
- 不做自动 case run 状态机。
- 不做自动 weave。
- 不做完整文件编辑器。

## 验收

- `.mmd` 文件能被识别并预览。
- 选中文档后，输入区能看到上下文 chip。
- 用户能移除 chip。
- 发送时能明确看到本轮附带了哪些上下文。

## 状态

- **当前状态**：candidate
- **说明**：这是旧 step 迁移来的候选 work package。它应在文件树与聊天 MVP 验证后再进入执行。

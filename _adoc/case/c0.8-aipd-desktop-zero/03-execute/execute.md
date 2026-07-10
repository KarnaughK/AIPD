# Execute: AIPD Desktop Zero

## 状态

- **当前状态**：pending
- **说明**：本 case 目前只完成旧结构迁移。Desktop 方向未重新确认前，不执行任何 work package。

## 候选 Work Package

- `work-packages/c0.8.1-project-bootstrap.md` - 创建 `aipd-desktop/`，使用 Tauri + Vue + TypeScript 模板验证空壳启动。
- `work-packages/c0.8.2-aipd-file-tree-readonly.md` - 实现 AIPD 项目的只读文件树解析和展示。
- `work-packages/c0.8.3-codex-appserver-spike.md` - 验证 Codex App Server / SDK 接入路线。
- `work-packages/c0.8.4-chat-ui-mvp.md` - 实现基础聊天输入、流式输出、中断和错误态。
- `work-packages/c0.8.5-preview-and-context-chips.md` - 实现 Markdown / MMD 预览和轻量上下文 chip。

## 执行前置条件

- 用户确认恢复 AIPD Desktop。
- `01-think/think.md` 完成 Codex 接入和技术栈复核。
- `02-design/design.md` 完成需求契约、前端 / adapter 设计和 readiness gate。
- 候选 work package 按新 Design 结果刷新后，再作为正式 Execute 输入。

## 执行记录

- 2026-07-01：旧 `steps/` 文件迁移为候选 work package，未执行。

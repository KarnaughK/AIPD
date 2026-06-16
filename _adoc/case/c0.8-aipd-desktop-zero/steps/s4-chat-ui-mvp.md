# Step 4: Chat UI MVP

## 目标

实现可替代终端输入的基础 Codex 聊天区。

## 上下文

- `../case.md`
- `../doc/development-outline.md`
- `s3-codex-appserver-spike.md`

## 边界

要做：

- 正常 textarea 输入框。
- 鼠标点选修改文本。
- 发送消息。
- 流式显示回复。
- 显示基础工具 / 状态事件。
- 支持中断。
- 基础错误态。

不做：

- 不做多 Agent 编排。
- 不做复杂富文本编辑器。
- 不自动选择上下文。
- 不做完整历史管理，除非 CodexAdapter 已自然支持。

## 验收

- 用户可以在 UI 输入框里正常编辑文本。
- Codex 能流式回复。
- 失败时 UI 有明确错误信息。
- 不需要打开终端即可完成一次基本对话。

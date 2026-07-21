# 会话定位：Claude Code

Claude Code 产物不承诺 Codex 的环境变量、SQLite 或 session 目录存在。

- 优先使用当前运行时明确暴露的会话 ID 或 transcript / export 路径。
- 当前运行时未暴露自动定位入口时，输出最小转交卡：平台名、项目路径、分支、一句话备注；会话 ID 和 transcript 位置写“未识别”。
- 请求用户粘贴需要回流的经验，或提供当前平台导出的 transcript 位置。
- 不读取 `~/.codex/`，不伪造 Claude 会话路径，不承诺跨项目自动恢复聊天。

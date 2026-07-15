# Reference Notes: AIPD Desktop Zero

## 1. FanBox 参照

调研仓库：`alchaincyf/fanbox`

当前观察：

- FanBox 是 Electron 桌面壳 + Node `server.js` + 原生 Web UI。
- UI 使用 `public/index.html`、`public/app.js`、`public/style.css`，不是 React / Vue。
- 内嵌终端使用 `node-pty + xterm.js`。
- 它与 Codex / Claude Code 的关系主要是：在内嵌终端里启动 CLI，并解析 `~/.codex/sessions` / `~/.claude/projects` 等本地日志。
- 它更像 terminal cockpit / 文件浏览器 / agent 工作台，不是 AIPD Desktop，也不是深度 Codex 客户端。

对本 case 的意义：

- FanBox 证明“包终端 + 文件浏览 + 日志解析”能快速做出本地 agent 工作台。
- 但本 case 的第零版核心不是包终端，而是比终端更好的 AI 聊天输入 / 展示，以及 AIPD 项目结构显性化。

## 2. Codex programmatic interfaces

来源：OpenAI Codex manual，Noninteractive and Programmatic Interfaces。

### Codex App Server

定位：

- 给 rich client / 深度产品集成使用。
- Codex VS Code extension 这类客户端使用该方向。
- 能处理 authentication、conversation history、approvals、streamed agent events。

协议：

- JSON-RPC 2.0 风格消息。
- 支持 `stdio`、Unix socket、WebSocket 等 transport。
- WebSocket 被标注为 experimental / unsupported。
- 核心对象包括 Thread、Turn、Item。

对本 case 的意义：

- 如果第零版要做接近 Codex 桌面端的聊天体验，应优先评估 App Server。
- App Server 深度较高，但也会带来更多 Codex 专属状态机和版本适配成本。

### Codex SDK

定位：

- TypeScript / Python SDK 可从应用中程序化控制 Codex。
- Python SDK 控制本地 Codex app-server over JSON-RPC。
- 适合内部工具、CI/CD、工作流集成。

对本 case 的意义：

- 如果第零版希望降低直接操作 JSON-RPC 协议的复杂度，可评估 SDK。
- SDK 可能比直接 app-server 更适合先做 MVP，但需要确认它是否满足桌面聊天 UI 的流式事件、历史恢复和审批体验。

### `codex exec --json`

定位：

- 非交互脚本模式。
- `--json` 时 stdout 输出 JSONL event stream。
- 事件包括 `thread.started`、`turn.started`、`turn.completed`、`item.*`、`error`。
- 可配合 `--output-schema` 生成结构化输出。

对本 case 的意义：

- 适合自动化、单轮任务、流水线或临时 runner。
- 不一定适合作为第零版“流畅聊天客户端”的主通道，但可作为 fallback 或后续执行型任务通道。

### Codex MCP server

命令：

```bash
codex mcp-server
```

能力：

- 暴露 `codex` 和 `codex-reply` 两个工具。
- 适合被其他 MCP client 或 Agents SDK 工作流调用。

对本 case 的意义：

- 更偏“让其他 Agent 调 Codex”，不是第一优先的聊天 UI 通道。
- 后续如果 AIPD 进入多 Agent 工作流，可作为 adapter 候选。

## 3. 本轮产品结论摘要

- 产品名暂定为 AIPD Desktop，目录落位为 `aipd-desktop/`。
- AIPD Desktop 是 AIPD Skill / ADOC 体系的增强壳，不是基础 skill 的运行前提。
- 第零版先做 AIPD 文件树解析和真实 Agent 聊天接入。
- 前端技术栈倾向 Tauri + Vue 3 + Vite + TypeScript，后端为 Rust。
- 第一版再讨论 Case Workspace、快捷 `@`、MMD / Mermaid 预览。
- 不做重型自动上下文规划器。
- 不做 Agent 编排工厂。
- 不把 Agent 限制成固定按钮流程。
- Case 的核心痛点是“聊天组织单位”和“AIPD 工作组织单位”不一致。

## 4. 后续待调研问题

深度调研记录已沉淀到 `deep-research-agent-client.md`。

当前剩余问题收束为：

- Codex 第零版应直接接 App Server，还是先用 `@openai/codex-sdk` 降低协议成本。
- 桌面端第零版已倾向 Tauri-first + Vue 3，但仍需在项目创建前确认 Node sidecar / Rust adapter 边界。
- Claude Code / OpenCode adapter 是否等 Codex 主链路跑通后再单独 spike。

# Deep Research: Agent Client Wrappers

> 本文记录 c8 讨论中的第零版技术调研：市面上“套壳 Codex / Claude Code / OpenCode”的项目怎么接入底层 Agent，以及 AIPD Desktop 应该怎么选路线。

## 1. 短结论

### 1.1 接入路线判断

- **Codex 第零版首选 Codex App Server / Codex SDK**，不要把“包终端”作为主路线。
- `codex exec --json` 适合单轮自动化、runner、case step 执行 fallback，不适合做完整聊天 UI 的主通道。
- `codex mcp-server` 更像“让其他 MCP client 调 Codex”，不是人类聊天客户端的第一入口。
- PTY / xterm.js 只能作为最后 fallback：实现快，但会把客户端降级成 terminal cockpit。

### 1.2 开源参考判断

最值得参考的项目不是 FanBox，而是：

- **OpenCovibe**：Tauri + Svelte + Rust，Codex 默认走 `codex app-server`，有 `codex exec` fallback。
- **OpenGUI**：Electron / Web + TypeScript，使用 `@openai/codex-sdk`，同时也有手写 app-server bridge。
- **codex-app-server-web**：Next.js / Fastify / WebSocket，直接围绕 Codex App Server 做 web UI 和 runtime。

FanBox、Claude Code Web、CloudCLI 这类项目更偏终端舱或 session viewer，可参考文件树、终端桥、日志读取，但不应作为 AIPD Desktop 的核心架构样板。

本 case 当前参考对象分级：

- **OpenCovibe = 主力工程研究对象**：重点拆它在 Tauri / Rust 中如何 spawn `codex app-server`、收发 JSON-RPC、处理审批事件、维护会话和 fallback。
- **codex-app-server-web = 重点协议参考对象**：重点拆它如何把 Codex App Server 的 `thread/start`、`turn/start`、event stream、approval request 映射到 Web runtime 和 UI 状态。
- **OpenGUI = 多 Agent adapter 参考对象**：重点看 Codex / Claude Code / OpenCode 的 adapter 边界，不照搬 command center 产品形态。
- **FanBox / Claude Code Web / CloudCLI = 反例与 fallback 参考对象**：只参考 PTY、session 扫描、文件树，不把 terminal cockpit 当成主接入路线。

### 1.3 桌面技术栈判断

用户提到的 “T 打头” 桌面框架是 **Tauri**。

- 如果目标是 **最快验证 Codex / Claude / OpenCode 多适配**：更务实的是 **Electron + Node 主进程 + Web UI**。
- 如果目标是 **长期轻量、本地感、包体小**：可以选择 **Tauri**，但第零版应收窄为 Codex-first，避免同时把 Claude / OpenCode 的 Node/SDK/PTY 复杂度搬进 Rust。
- 折中路线：先用 Node 写 AgentAdapter，把 UI 层和 AgentAdapter 边界切干净；后续 Electron 和 Tauri 都能复用较多前端与协议层认知。

本 case 后续讨论已把桌面端暂定为：

- **产品名**：AIPD Desktop。
- **目录名**：`aipd-desktop/`。
- **前端**：Vue 3 + Vite + TypeScript。
- **桌面壳**：Tauri。
- **后端**：Rust。
- **Agent 接入**：Codex-first，优先 App Server / SDK。

该选择的理由是：第零版最大不确定性在 Codex 接入和 AIPD 文件树，不应再引入 React 学习成本；Vue 是用户最熟悉的前端栈，能降低实现节奏风险。

## 2. Codex 官方接口结论

### 2.1 Codex App Server

来源：

- [Codex App Server](https://developers.openai.com/codex/app-server)
- [openai/codex app-server README](https://github.com/openai/codex/blob/main/codex-rs/app-server/README.md)

定位：

- Codex 面向 rich client 的底层接口。
- 官方说明中明确用于更深的产品集成，包括认证、历史、审批和 streamed agent events。
- Codex IDE extension 等 rich client 方向基于这类接口。

协议形态：

- JSON-RPC 2.0 风格。
- 默认 stdio JSONL transport。
- 支持 Unix socket。
- WebSocket transport 存在，但官方标注 experimental / unsupported。

核心生命周期：

```text
initialize
initialized
thread/start 或 thread/resume
turn/start
event stream
turn/completed 或 turn/failed
```

关键能力：

- 多轮 Thread / Turn。
- 流式事件。
- 中断 turn。
- steer turn。
- fork / resume thread。
- 命令执行审批。
- 文件修改审批。
- 工具调用 / 用户输入请求。
- MCP elicitation。

对 AIPD 的意义：

- 它是最接近 Codex Desktop / IDE 体验的公开接口。
- 如果 AIPD Desktop 要做“真正聊天客户端”，这条路线优先级最高。
- 风险是协议仍可能随 Codex 版本变化，需要版本检测、schema 生成或适配层隔离。

### 2.2 Codex SDK

来源：

- [OpenAI Codex repository](https://github.com/openai/codex)

观察：

- TypeScript SDK：`@openai/codex-sdk`。
- Python SDK：`openai-codex`。
- Python SDK 控制本地 app-server over JSON-RPC。

对 AIPD 的意义：

- 如果 SDK 暴露的事件、审批、中断、历史能力足够，零版可以先用 SDK 降低协议成本。
- 如果 SDK 抽象过高，影响 UI 对审批 / 工具事件 / thread 管理的控制，则需要直接接 app-server。

建议 spike：

1. 用 TS SDK 跑通 start thread、streamed turn、多轮、resume。
2. 核对审批、中断、错误、history 是否可控。
3. 若 SDK 不够，降到 app-server JSON-RPC。

### 2.3 `codex exec --json`

定位：

- 非交互自动化模式。
- stdout 输出 JSONL event stream。
- 适合 CI、脚本、一次性任务、结构化输出。

对 AIPD 的意义：

- 适合作为 case step runner 或 fallback。
- 不适合作为第零版聊天区主通道，因为多轮、审批、恢复和人类交互体验会变得别扭。

### 2.4 `codex mcp-server`

定位：

- 让其他 MCP client 或 Agent 调 Codex。
- 暴露 `codex` 和 `codex-reply` 工具。

对 AIPD 的意义：

- 后续如果 AIPD 做多 Agent workflow，可以作为 adapter 候选。
- 但它不是第零版“人类聊天客户端”的主入口。

## 3. 开源项目分型

### 3.1 App Server / SDK Rich Client 路线

#### OpenCovibe

来源：[OpenCovibe](https://github.com/AnyiWang/OpenCovibe)

技术栈：

- Tauri v2
- Svelte 5
- Rust

接入方式：

- Claude Code：bidirectional stream-JSON protocol。
- Codex：默认使用 `codex app-server` JSON-RPC。
- Codex fallback：`codex exec`。

值得参考：

- Rust 侧直接实现 Codex app-server bridge。
- 明确区分 app-server 与 exec fallback。
- 处理 command/file approvals、request user input、MCP elicitation。
- 证明 Tauri 路线能做，但需要承担 Rust adapter 复杂度。

对 AIPD 的启发：

- 如果坚持 Tauri，可以参考它的 Rust app-server 实现。
- 但 OpenCovibe 自身是完整 Agent workspace，不应照搬产品范围。

#### OpenGUI

来源：[OpenGUI](https://github.com/akemmanuel/OpenGUI)

技术栈：

- Electron / Web
- TypeScript
- React

接入方式：

- 引入 `@openai/codex-sdk`。
- 同时存在手写 `codex app-server` bridge。
- 通过 bridge manager 管理 Codex / Claude Code / OpenCode 等 harness。

值得参考：

- AgentAdapter / HarnessAdapter 分层思路。
- 前端不直接绑定某个 Agent CLI。
- 同时验证 SDK 和 app-server 两条 Codex 接入路线。

对 AIPD 的启发：

- 如果第零版优先验证多 Agent 适配，Electron + Node 的工程阻力最低。
- AIPD 可以借鉴它的 adapter 边界，但不要借鉴太多“command center”功能。

#### codex-app-server-web

来源：[codex-app-server-web](https://github.com/Yehhub/codex-app-server-web)

技术栈：

- Next.js
- React
- Fastify
- WebSocket
- TypeScript

接入方式：

- 围绕 Codex App Server 建立 runtime service。
- 使用 `thread/start`、`turn/start`、`turn/interrupt`、`turn/steer`。
- 处理 command/file/tool/permission approvals。
- 有 schema-driven 行为和 mock app-server。

值得参考：

- Codex App Server 的 UI runtime 组织方式。
- 事件流、审批请求、turn 控制如何映射成 Web UI。
- schema / mock 对协议变更有帮助。

对 AIPD 的启发：

- 如果做 Codex-first 零版，它可能是最直接的协议参考之一。
- 但它是 web UI，不是 AIPD 项目客户端，需要自己补 AIPD 文件树和本地项目语义。

### 3.2 Patch / Proxy Codex Desktop 路线

#### codex-web

来源：[codex-web](https://github.com/0xcaff/codex-web)

接入方式：

- 目标是把 Codex Desktop 变成 browser frontend。
- 下载 / unpack 上游 Codex Desktop app，patch main / renderer / preload，并 shim Electron。
- 也可以 proxy 到 long-running app-server。

值得参考：

- 证明“浏览器壳 + upstream Codex 桌面逻辑”能跑。
- 但 patch Desktop 的方式脆弱，版本跟随成本高。

对 AIPD 的启发：

- 不建议作为核心路线。
- 可以只参考其 remote proxy / app-server 转接思路。

### 3.3 PTY Terminal Cockpit 路线

#### FanBox

来源：[FanBox](https://github.com/alchaincyf/fanbox)

技术栈：

- Electron
- Node server
- 原生 HTML / JS / CSS
- `node-pty`
- `xterm.js`

接入方式：

- 在内嵌终端中启动 Codex / Claude Code CLI。
- 读取 `~/.codex/sessions` / `~/.claude/projects` 等本地日志做 session 展示。

判断：

- 它是 terminal cockpit，不是真正的 Codex rich client。
- 对输入框、聊天 UI、审批、turn 管理没有足够抽象。

对 AIPD 的启发：

- 可参考“本地项目 / session / 文件浏览”的壳。
- 不应参考其 Codex 接入方式作为主路线。

#### Claude Code Web

来源：[Claude Code Web](https://github.com/vultuk/claude-code-web)

接入方式：

- `node-pty` 启动 Claude CLI。
- Codex support 也是 PTY 启动 `codex`。
- WebSocket + xterm.js 传输终端数据。

判断：

- 快速可用，但本质仍是 Web terminal。
- 适合作为 fallback 或远程终端工具，不适合作为 AIPD Desktop 主架构。

#### CloudCLI / claudecodeui

来源：[CloudCLI / claudecodeui](https://github.com/siteboon/claudecodeui)

接入方式：

- 管理 Claude Code / Cursor CLI / Codex / Gemini。
- 自动发现本地 sessions。
- Codex sessions 来自 `~/.codex`，Claude sessions 来自 `~/.claude`。
- shell terminal 使用 `node-pty`。

判断：

- 比 FanBox 更完整，但仍大量依赖 CLI/session 文件。
- 可参考 session viewer、文件树、Git 视图、移动端访问。
- 不建议作为 Codex 主协议参考。

### 3.4 OpenCode 原生接口路线

来源：

- [OpenCode docs](https://opencode.ai/docs/)
- [OpenCode CLI docs](https://opencode.ai/docs/cli/)
- [OpenChamber](https://github.com/openchamber/openchamber)

OpenCode 可用接口：

- `opencode run`：非交互运行。
- `opencode serve`：启动 headless HTTP server，用于 API access。
- `opencode web`：启动 headless OpenCode server 和 web interface。
- `opencode acp`：通过 stdin/stdout nd-json 启动 ACP server。

对 AIPD 的意义：

- OpenCode 不必走 PTY。
- 后续 OpenCodeAdapter 可以优先评估 `opencode serve` / API / SDK，再考虑 ACP。
- OpenChamber 可以作为 OpenCode UI 参考，但它的目标比 AIPD 第零版更重。

### 3.5 Claude 路线

来源：

- [Claude Agent SDK overview](https://code.claude.com/docs/en/agent-sdk/overview)
- [Claude Agent SDK TypeScript](https://github.com/anthropics/claude-agent-sdk-typescript)

当前判断：

- Claude Code 不能简单按 Codex App Server 类比。
- Claude Agent SDK 是更值得优先验证的路线。
- 如果 SDK 不满足桌面聊天控制需求，再考虑 `claude -p --output-format stream-json` 或 PTY fallback。

对 AIPD 的意义：

- ClaudeAdapter 应单独 spike，不要假设它能复用 Codex 的 Thread / Turn / Approval 模型。
- 第零版建议先 Codex-first，Claude 放到 adapter 第二阶段。

## 4. Electron vs Tauri

### 4.1 Electron

来源：

- [Electron process model](https://electronjs.org/docs/latest/tutorial/process-model)
- [Electron IPC](https://electronjs.org/docs/latest/tutorial/ipc)

优点：

- Node 主进程天然适合 spawn CLI、处理 stdio、WebSocket、Unix socket、HTTP。
- TS/JS SDK 直接可用。
- `node-pty`、xterm.js、文件系统、session 读取生态成熟。
- 对 Codex / Claude / OpenCode 多 adapter spike 速度最快。

缺点：

- 包体大。
- 内存占用高。
- 安全边界要认真做：renderer 禁 Node integration，preload 暴露最小 IPC。
- 原生模块可能需要 rebuild。

适合场景：

- 先验证 Agent 接入。
- 先做 Codex + Claude + OpenCode 多路线 adapter。
- 接受第零版包体和性能不是最优。

### 4.2 Tauri

来源：

- [Tauri v2](https://v2.tauri.app/)
- [Tauri architecture](https://v2.tauri.app/concept/architecture/)
- [Tauri shell plugin](https://v2.tauri.app/plugin/shell/)
- [Tauri sidecar](https://v2.tauri.app/develop/sidecar/)
- [Tauri Node.js sidecar](https://v2.tauri.app/learn/sidecar-nodejs/)

优点：

- Rust 后端 + 系统 WebView，包体更小。
- 本地应用感更强。
- 权限模型更清晰。
- 适合本地文件树、Markdown/Mermaid 预览、项目 workspace。

缺点：

- 不是 Node 环境。
- TS/JS SDK、`node-pty`、Node stream 生态不能直接搬到 Rust 后端。
- 如果要复用 Node adapter，需要引入 sidecar。
- WebView 跨平台一致性比 Chromium 弱。

适合场景：

- 长期要做本地轻量桌面端。
- 愿意先只支持 Codex App Server，并用 Rust 直接实现 adapter。
- 或者接受 Tauri shell + Node sidecar 的混合复杂度。

### 4.3 本 case 的实际建议

这里有两个可选策略：

#### 策略 A：Electron-first

适合目标：

- 快速跑通 Codex / Claude / OpenCode 多 adapter。
- 把最大不确定性放在 Agent 接入，而不是桌面框架。

建议结构：

```text
Electron main
  AgentAdapter
    CodexAdapter(app-server / SDK)
    ClaudeAdapter(SDK / stream-json / fallback)
    OpenCodeAdapter(serve / API)
  ProjectIndexService(AIPD file tree)
  SessionStore

Renderer
  AIPD sidebar
  Chat UI
  Preview panel
```

#### 策略 B：Tauri-first

适合目标：

- 强烈重视包体、性能、本地感。
- 接受第零版先 Codex-only。

建议结构：

```text
Tauri Rust backend
  CodexAppServerClient
  AIPDFileTreeParser
  LocalSessionStore

Web frontend
  Vue 3 AIPD sidebar
  Chat UI
  Preview panel
```

Claude / OpenCode 延后，等 Codex app-server 主链路稳定后再决定：

- 继续 Rust adapter。
- 或引入 Node sidecar。
- 或只提供 exec / run fallback。

## 5. AIPD 第零版推荐路线

### 5.1 最小技术目标

第零版只验证两件事：

1. AIPD 文件树能被解析并稳定展示。
2. Codex 能以真正聊天客户端方式接入，而不是只嵌终端。

### 5.2 CodexAdapter 最小能力

CodexAdapter 不要一开始抽得太大，只需要覆盖 UI 必需能力：

```ts
interface AgentAdapter {
  startThread(input: StartThreadInput): Promise<ThreadRef>
  resumeThread(threadId: string): Promise<ThreadRef>
  sendTurn(threadId: string, message: string, context?: ContextAttachment[]): AsyncIterable<AgentEvent>
  interruptTurn(threadId: string, turnId: string): Promise<void>
  answerRequest(requestId: string, response: unknown): Promise<void>
  listThreads(projectPath: string): Promise<ThreadSummary[]>
}
```

事件最小集合：

```text
thread.started
turn.started
message.delta
message.completed
tool.started
tool.delta
tool.completed
approval.requested
approval.completed
error
turn.completed
```

### 5.3 Spike 顺序

1. **Codex App Server raw spike**
   - spawn `codex app-server`
   - `initialize`
   - `thread/start`
   - `turn/start`
   - render event stream
   - handle interrupt
   - handle approval request

2. **Codex SDK spike**
   - 用 `@openai/codex-sdk` 重跑同样场景。
   - 判断 SDK 是否足够支撑 UI。
   - 若足够，零版用 SDK；若不足，用 raw app-server。

3. **AIPD file tree spike**
   - 解析 `_adoc/index.md`、`_adoc/map.md`、L1-L5、case、okr、inbox。
   - 先做只读展示，不做写入和 workflow。

4. **Chat UI spike**
   - 正常 textarea。
   - 流式消息。
   - 基本错误态。
   - 中断。
   - 历史恢复。

5. **Context chip spike**
   - 只做手动 / 半自动快捷 `@`。
   - 左侧选中 case / step / doc 后，发送前显示 chip。
   - 不做自动 planner。

## 6. 风险

- Codex App Server 版本变化：需要把协议封装在 CodexAdapter 内，避免 UI 直接依赖协议字段。
- Approval UI 复杂度：命令执行、文件修改、工具调用、用户输入请求需要分别映射。
- Claude / OpenCode 模型不同：不要强迫它们长得像 Codex。
- PTY fallback 诱惑很强：实现快，但会损失聊天 UI、审批和结构化事件。
- Tauri 技术债可能前置：如果第零版就同时做 Tauri + 多 Agent adapter，风险会叠加。

## 7. 当前建议写法

如果现在要把 c8 继续拆 step，建议拆成：

1. **Step 1：Codex App Server 可行性 spike**
   - 输出最小 demo 或协议记录。
   - 判断 raw app-server 与 SDK 哪个进入零版。

2. **Step 2：AIPD 文件树解析设计**
   - 输出左侧树的数据模型和只读 parser 边界。

3. **Step 3：桌面框架决策**
   - 基于 Step 1 结果决定 Electron-first 还是 Tauri-first。

暂时不要拆 Claude / OpenCode adapter，也不要拆 Case Workspace。它们都应在 Codex 主链路跑通之后再进入。

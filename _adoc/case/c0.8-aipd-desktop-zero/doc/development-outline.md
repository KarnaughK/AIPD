# Development Outline: AIPD Desktop Zero

> 本文作为 c0.8 的总开发纲要。它不是最终 PRD，也不是立即执行计划；它给后续目标模式 / case-run 提供任务拆分和边界。

## 1. 总目标

创建 AIPD Desktop：一个以 AIPD 项目结构为外壳的桌面客户端。

第零版只验证两条主链路：

1. **AIPD 文件树可视化**：能读取并展示 L1-L5、case、step、okr、inbox、MMD 文件。
2. **真实 Codex 聊天接入**：能通过 Codex App Server / SDK 实现接近 Codex 桌面端的聊天体验。

## 2. 非目标

第零版不做：

- 多 Agent 编排工厂。
- 自动上下文规划器。
- 自动验收 / 自动 weave 状态机。
- 完整 IDE。
- 复杂文件编辑器。
- Claude Code / OpenCode 正式接入。
- 复杂 UI 组件库和主题系统。

## 3. 技术基线

```text
Product: AIPD Desktop
Path: aipd-desktop/
Desktop: Tauri
Frontend: Vue 3 + Vite + TypeScript
Backend: Rust
Primary Agent: Codex
Primary Codex route: App Server / SDK
Fallback route: codex exec --json
```

## 4. 开发阶段

### Phase 0: Project Bootstrap

目标：

- 创建 `aipd-desktop/`。
- 使用官方 Tauri + Vue + TypeScript 模板。
- 验证桌面窗口、Vue 页面、Rust command 调用。

产出：

- 可运行空壳。
- README 记录启动方式。
- 不接 Codex，不解析 AIPD。

### Phase 1: AIPD File Tree Readonly

目标：

- 选择本地 AIPD 项目路径。
- 读取 `_adoc/index.md`、`_adoc/map.md`。
- 展示 L1-L5、case、steps、okr、inbox。

产出：

- 左侧 AIPD 树。
- 点击节点显示 markdown 原文或基础预览。
- 只读，不写文件。

### Phase 2: Mermaid / MMD Preview

目标：

- 识别 `.mmd` / Mermaid 文档。
- 在右侧预览区展示 Mermaid 图。

产出：

- MMD 预览能力。
- 与聊天无耦合。

### Phase 3: Codex App Server Spike

目标：

- Rust 或 sidecar 启动 `codex app-server`。
- 跑通 initialize、thread/start、turn/start。
- 接收流式事件。
- 处理最小错误态。

产出：

- 协议 spike 记录。
- 判断 raw app-server 与 SDK 哪个进入正式零版。

### Phase 4: Chat UI MVP

目标：

- 正常文本输入框。
- 流式输出。
- 多轮对话。
- 中断。
- 基础历史恢复。

产出：

- 可替代终端输入的 Codex 聊天体验。
- 暂不做自动上下文规划。

### Phase 5: Lightweight Context Chips

目标：

- 左侧选中 doc / case / step 后，聊天输入区显示上下文 chip。
- 用户发送时把选中对象作为显式上下文附加。

产出：

- 轻量快捷 `@`。
- 不做大模型上下文 planner。

## 5. 推荐执行顺序

```text
s1-project-bootstrap
s2-aipd-file-tree-readonly
s3-codex-appserver-spike
s4-chat-ui-mvp
s5-mermaid-preview-and-context-chips
```

说明：

- MMD 预览可以在 Phase 2 或 Phase 5 做，取决于当时 UI 是否已经有右侧预览区。
- Codex App Server spike 不应被 UI 美化阻塞。
- Claude / OpenCode adapter 等 Codex 主链路跑通后再拆。

## 6. 风险

- Tauri + Rust adapter 学习成本高于 Electron + Node。
- Codex App Server 协议可能随版本变化，需要隔离在 adapter 内。
- 如果一开始引入完整 Case Workspace，会把第零版复杂度拉爆。
- 如果一开始做自动上下文规划，会重新滑向 Agent 工厂。

## 7. 验收口径

第零版不是“功能完整”，而是回答：

- AIPD 文件树作为桌面端主导航是否成立。
- Codex 是否能通过公开接口被做成真正聊天 UI。
- Vue + Tauri 是否足够支撑后续产品形态。

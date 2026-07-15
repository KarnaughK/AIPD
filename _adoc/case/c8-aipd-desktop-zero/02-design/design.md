# Design: AIPD Desktop Zero

## 状态

- **当前状态**：pending
- **来源**：旧 `doc/` 资料已迁移到本 phase。
- **结论**：这些材料只作为旧设计参考；Desktop 方向重新确认前，不创建正式执行计划。

## 旧设计材料

- `development-outline.md` - 第零版旧开发纲要、阶段拆分和验收口径。
- `project-placement.md` - 桌面端在本仓库中的旧落位判断。
- `tauri-architecture-overview.mmd` - Tauri 前后端分层、IPC、Rust backend、sidecar 与 Agent adapter 关系图。
- `tauri-vue-bootstrap.md` - Tauri + Vue + TypeScript 旧创建指南。

## 设计边界

### 要保持

- Desktop 是增强客户端，不是 AIPD 基础能力的前置依赖。
- 第零版以文件树和聊天为主，不做重型 Agent 编排。
- `@` / context chip 是轻量上下文显式化，不是自动上下文 planner。

### 需要重做

- 重新确认 Codex 接入事实源。
- 重新确认前端信息架构和状态模型。
- 重新把旧 step 语言改成 Case / Work Package 语言。
- 如果继续推进，需要按新 Design flow 补齐 requirements、frontend、backend / adapter 和 readiness gate。

## 当前 Design 节点

- **当前节点**：intake
- **节点状态**：waiting_user
- **本节点要回答的问题**：是否恢复推进 AIPD Desktop。
- **停止点**：未获得继续确认前，不固化技术栈、接口或 UI 状态机。

## 下一步

用户确认继续后，进入 requirements 节点，先重写第零版需求契约。

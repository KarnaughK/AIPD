# AIPD2 Dev 认知索引

## 当前研发策略

- Codex 优先适配，先跑通 `skills + agents + case-run` 的最短闭环。
- Codex 子 Agent 默认使用 `fork_context: false`，让 step 文件和显式上下文成为任务源。
- `src/platforms/codex/core/agent-guide.md` 是 Codex 子 Agent 调度策略的主要来源。
- `src/platforms/codex/agents/` 存 Codex custom agent 源模板。
- 构建脚本负责把 Codex agent 模板输出到 `dist/codex/agents/`。
- 安装脚本负责把 Codex agent 安装到 `~/.codex/agents/` 或目标项目 `.codex/agents/`。

## 当前已知 Agent

| Agent | 用途 | 源码 |
|---|---|---|
| `aipd_vue_architect` | Vue 页面、组件、样式、交互、状态组织和 AI 友好型 Vue 架构任务 | `src/platforms/codex/agents/aipd-vue-architect.toml` |

## Case Run 约束

- step 如果声明 `推荐 Agent`，case-run 优先按该身份派发。
- Vue 相关 step 推荐使用 `aipd_vue_architect`。
- 没有推荐 Agent 时，再根据 step 类型和上下文路径兜底选择。
- 子 Agent 必须自己读取 step 文件和 step 明确列出的上下文文档。

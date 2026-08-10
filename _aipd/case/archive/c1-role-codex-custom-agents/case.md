# Case: c1-role-codex-custom-agents

> **本次事项目标**：让 AIPD2 仓库自身接入 AIPD 流程，并跑通 Codex custom agents 与 case-run 推荐 Agent 派发。

## 1. 目标

- **自举接入**：AIPD2 仓库自身具备 `AGENTS.md`、`_adoc/`、case 和 step 入口。
- **策略统一**：Codex 子 Agent 默认上下文策略统一为 `fork_context: false`。
- **Agent 派发**：step 可声明 `推荐 Agent`，case-run 优先按推荐 Agent 派发。
- **Codex 安装**：Codex build/install 链路同时处理 skills 和 agents。

## 2. 上下文索引

> 执行时优先读这些，不全量扫描项目。

### 项目认知

- `_adoc/index.md` - AIPD2 仓库自身的项目认知入口
- `_adoc/L1-intent/intent.md` - 当前框架方向和短期取舍
- `_adoc/L5-dev/index.md` - Codex 优先、Agent 和 case-run 研发约束

### 框架源码入口

- `src/core/agent-entry/template.md` - 根目录 Agent Entry 模板
- `src/core/case/templates/step.md` - step 模板和推荐 Agent 字段
- `src/core/case/templates/case.md` - case 模板和 step 列表展示
- `src/skills/aipd2-case-create/SKILL.md` - 创建 case 时推荐 Agent 的写入规则
- `src/skills/aipd2-case-run/SKILL.md` - 执行 case 时推荐 Agent 的选择规则
- `src/platforms/codex/core/agent-guide.md` - Codex 子 Agent 调度策略
- `src/platforms/codex/agents/aipd_vue_architect.toml` - Vue custom agent 源模板
- `scripts/build` - Codex agent 构建输出
- `scripts/install-codex` - 用户级 Codex 安装
- `scripts/dev-codex` - Codex 开发模式安装
- `scripts/install-project-codex` - 项目级 Codex 安装

## 3. 本次边界

### 要做

- 补齐 AIPD2 仓库自身的 AIPD 入口。
- 统一 Codex 子 Agent 默认上下文策略。
- 让 step 模板、case-create、case-run 支持推荐 Agent。
- 保留 Codex 优先，不做 Claude / 多平台 Role 抽象。
- 验证 build/install 后 agent 存在。

### 不做

- 不实现完整 `aipd2-agent-init`。
- 不把 QlmForm / QlmSearch 迁入 AIPD2 源码。
- 不设计平台无关 Role 格式。
- 不改历史 archive 记录。

## 4. 约束

- **Dev**：Codex 默认 `fork_context: false`，子 Agent 通过 step 和显式上下文获得任务信息。
- **Agent**：Vue 相关 step 推荐 `aipd_vue_architect`。
- **Context**：只读取本 case 上下文索引及 step 明确要求的文件，除非执行中发现必要缺口。

## 5. Step 列表

- [x] `steps/wp-01-unify-codex-context.md` - 统一 Codex 子 Agent 上下文策略（推荐 Agent：worker）
- [x] `steps/wp-02-agent-build-install.md` - 让 Codex build/install 处理 custom agents（推荐 Agent：worker）
- [x] `steps/wp-03-case-run-agent-selection.md` - 让 step/case-run 支持推荐 Agent（推荐 Agent：worker）
- [x] `steps/wp-04-self-adoc-entry.md` - 补齐 AIPD2 自身 `_adoc` 和 `AGENTS.md`（推荐 Agent：worker）
- [x] `steps/wp-05-test-vue-agent-dispatch.md` - 创建带 `aipd_vue_architect` 的测试 step（推荐 Agent：aipd_vue_architect）

## 6. 验收标准

- [x] `AGENTS.md` 和 `_adoc/` 入口存在。
- [x] 当前有效模板 / 指南中的 Codex 默认策略已统一为不继承 Main Agent 上下文。
- [x] step 模板包含 `推荐 Agent` 字段。
- [x] case-run 说明优先读取 `推荐 Agent`，再兜底判断。
- [x] `./scripts/build codex` 生成 `dist/codex/agents/aipd_vue_architect.toml`。
- [x] `./scripts/install-codex` 安装 `~/.codex/agents/aipd_vue_architect.toml`。

## 7. 经验沉淀位置

- `_adoc/L5-dev/index.md` - Codex custom agents 和 case-run 约束
- `src/platforms/codex/core/agent-guide.md` - Codex 平台派发规则
- `src/core/case/templates/step.md` - 推荐 Agent 字段
- 相关 step 执行记录 - 本次自举执行经验

## 8. 归档状态

- **状态**：已归档
- **创建时间**：2026-05-09
- **归档时间**：2026-06-16

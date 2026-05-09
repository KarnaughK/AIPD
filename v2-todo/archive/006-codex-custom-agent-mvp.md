# Codex Custom Agent MVP

## 完成时间

2026-05-09

## 背景

AIPD2 原有多 Agent 机制已经强调“主 Agent 保护上下文，子 Agent 执行 step”，但子 Agent 只有通用 worker / explorer 身份，缺少面向具体任务类型的判断方式。

Codex 已支持用户级 / 项目级 custom agents，因此先以 Codex 为主，跑通 AIPD2 内置 custom agent 的最小闭环。

## 已完成

- 新增 Codex custom agent 源目录：`src/platforms/codex/agents/`
- 新增 Vue 专用 Agent：`aipd_vue_architect`
- `scripts/build codex` 输出 `dist/codex/agents/`
- `scripts/install-codex` 安装 agents 到 `~/.codex/agents/`
- `scripts/dev-codex` 用软链安装 agents
- `scripts/install-project-codex` 安装 agents 到目标项目 `.codex/agents/`
- step 模板增加 `推荐 Agent`
- case-create 增加推荐 Agent 写入规则
- case-run 增加推荐 Agent 优先派发规则
- Codex 子 Agent 默认策略统一为 `fork_context: false`
- AIPD2 仓库自身补齐 `AGENTS.md` 和 `_adoc/` 自举入口

## 当前结论

短期不做平台无关 Role 抽象。AIPD2 先把 Codex custom agents 用顺，等真实 case 跑出稳定模式后，再判断是否抽象到 Claude / 其他平台。

## 后续遗留

- 是否新增 `aipd2-agent-init`
- 是否让初始化 / 刷新流程自动安装 Codex agents
- 是否继续补充 researcher / reviewer / backend 等 Agent
- Vue Agent 需要通过真实项目重构验证效果

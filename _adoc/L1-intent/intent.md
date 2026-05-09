# AIPD2 Intent

## 当前方向

AIPD2 是面向 AI 协作的软件项目认知框架。它不替代具体 Coding Agent，而是为 Agent 提供项目长期上下文、历史取舍和执行经验。

## 核心取舍

- AIPD2 优先做项目认知层，不继续扩张成完整通用开发纪律框架。
- Skill 负责流程，例如创建 Case、执行 Step、沉淀经验。
- Custom Agent / Role 负责判断方式，例如 Vue 架构、调研、审查等执行身份。
- `_adoc/` 负责项目认知和协议，例如研发约束、历史决策、case 上下文索引。
- 当前短期策略是 Codex 优先；不先做 Claude / 多平台 Role 抽象。

## 当前重点

- 让 AIPD2 仓库自身按 AIPD 流程自举开发。
- 统一 Codex 子 Agent 上下文策略。
- 让 Codex custom agents 能进入 case-run 派发链路。

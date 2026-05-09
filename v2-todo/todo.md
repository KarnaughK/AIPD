# V2 Todo

这里记录 AIPD 下一阶段要讨论和细化的事项。

本文件只放未完成 todo。完成后，为本次事项在 `archive/` 下创建独立归档文件，并从本文件删除对应条目。

## 当前判断

AIPD 不应该继续向“更完整的 AI 做事流程”扩张。

通用 Agent 和专用开发 Agent 会逐渐吸收更好的工作方法，例如澄清需求、拆分任务、写测试、审查代码、管理分支和总结结果。Superpowers 这类工具主要补的是 Agent 的通用开发纪律，这一层长期会被平台能力吃掉一部分。

AIPD 更应该聚焦在项目认知层：让任何 Agent 在进入项目时，都能读取项目方向、用户场景、产品边界、架构原因、技术取舍和历史经验。

## 当前优先级

下一步优先处理：**已有项目刷新机制**。

原因：Agent Entry、fork-first 子 Agent 模式、初始化默认文档壳子已经落地。接下来需要让已有 AIPD 项目也能补齐新版 `AGENTS.md`、`_adoc/index.md`、`_adoc/case/index.md` 等入口文件。

## 待讨论事项

### 1. 已有项目刷新机制

初始化之外，还需要一个“刷新”能力，用于已有 AIPD 项目补齐新版入口文件和默认索引壳子。

需要继续讨论：

- `/aipd2` 状态扫描发现缺失时，是否自动提示补齐。
- 补齐 Agent Entry、`_adoc/index.md`、`_adoc/case/index.md`、`_adoc/okr/index.md` 时，如何避免覆盖用户已有内容。
- 是否提供单独命令或仍通过 `/aipd2` 状态入口完成。

### 2. Agent 身份后续迭代

Codex custom agent MVP 已落地，见 `archive/006-codex-custom-agent-mvp.md`。

当前先通过真实项目验证 `aipd_vue_architect` 是否好用，再决定是否继续扩展 Agent 身份体系。

需要继续讨论：

- 是否新增 `aipd2-agent-init`，用于单独安装 / 更新内置 Codex agents。
- 初始化 / 刷新已有项目时，是否自动安装 Codex agents 到 `.codex/agents/`。
- 除 `aipd_vue_architect` 外，是否继续补充 researcher / reviewer / backend 等 Agent。
- 如果后续适配 Claude 或其他平台，是否再抽象平台无关 Role。

### 3. 降低 AIPD 的侵入感

AIPD 是完整框架，但不能让用户每次任务都感觉负担很重。

需要继续讨论：

- 什么任务必须进入完整 Case 生命周期。
- 什么任务只需要轻量读取 `_adoc/index.md`。
- 经验回写的最低标准是什么。
- 如何避免 `_adoc` 变成文档垃圾场。

### 4. 对外定位表述

README 已经开始描述 AIPD 和 Superpowers、OpenSpec、通用 Agent 的区别，但后续还需要继续打磨。

需要继续讨论：

- AIPD 是否应该明确自称“项目认知层”或“项目记忆层”。
- 是否使用“Project Context Protocol”这类说法。
- 如何解释 AIPD 和 OpenSpec 的关系：一个偏长期认知，一个偏单次变更规格。
- 如何解释 AIPD 和 Superpowers 的关系：一个偏项目上下文，一个偏 Agent 执行纪律。

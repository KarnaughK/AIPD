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

### 5. AIPD 框架上移与 Case-as-Goal

当前 AIPD2 仍主要是 skill 工程：通过 skill、Agent Entry、`_adoc/`、case 和 step 让 Codex / Claude Code 等 Agent 获取项目认知并执行流程。

后续可以讨论是否把 AIPD 再往上提一层：不只把 AIPD 视为一组 skill，而是视为跨 Agent 平台的协作框架。候选心智模型：

```text
AIPD 框架
  ├── Agent 平台适配（Codex / Claude Code / OpenCode / OpenLo 等）
  ├── Agent 身份 / 领域指引
  ├── Skills / Commands
  ├── Case / Step
  └── ADOC 项目认知
```

在这个模型里，Agent 不再是 AIPD 外部的纯执行器，而是 AIPD 框架可以编排和约束的成员；skill 是 Agent 可使用的流程能力；Case 是跨平台、跨会话、跨上下文压缩后仍可恢复的目标状态。

需要继续讨论：

- **Case-as-Goal**：是否把 Case 定义为 AIPD 的持久化 Goal。平台自带 Goal mode 只是调度增强，真实目标状态以 case / step 文件为准。
- **跨平台执行**：是否允许把一个完整 case 交给 Codex、Claude Code、OpenCode 或 OpenLo，让它按 AIPD 规则从 case-create / case-run / step 执行到验收。
- **框架层级**：是否从“skill 被 Agent 调用”调整为“Agent 被 AIPD 框架纳入，skill 是 Agent 的能力模块”。
- **目标循环**：当上下文压缩或 session 中断时，只要恢复 Case ID，就能读取 case.md 和 steps 继续推进，直到 Case 目标完成、blocked 或进入验收。
- **平台差异**：Codex 的 Goal mode、Claude Code 的 subagents / plan mode、其他 Agent 平台能力都只作为执行方式差异，不改变 AIPD 的 Case 事实源。
- **实现边界**：短期先记录方向，不马上实现完整框架层；等真实大目标 case 出现后，再反推最小可用模块。

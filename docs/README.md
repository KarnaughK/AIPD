# AIPD 学习文档

这里不是九个 Skill 的对象手册，而是三种不同的入口：

- **先体验**：你已经理解大意，只想在项目里完成第一轮。
- **连续学习**：你想从问题出发，理解 AIPD 为什么这样设计。
- **工作时查阅**：你正在使用某个能力，需要确认它的边界和用法。

如果你第一次来，先读根目录 [README](../README.md)。如果已经决定试用，直接进入[第一次完整使用 AIPD](guide/06-first-complete-flow.md)。

## 先体验：完成第一轮

这条路径只要求你有一个会持续迭代的代码项目，以及能读写仓库的 Coding Agent。

1. 让 Agent 按[构建与安装](modules/build-and-install.md)安装 AIPD。
2. 在目标项目调用 `/aipd`，创建或读取最小认知入口。
3. 用自然语言描述一个真实目标，让 `/aipd-case` 建立 Case Contract。
4. 完成 Think / Design / Execute / Verify / Close。
5. 用 `/aipd-weave` 把已验证的新事实留给下一次。

[打开完整操作卡 →](guide/06-first-complete-flow.md)

## 连续学习：六章理解 AIPD

这六篇按依赖顺序组织，像一门短课程；概念与实际动作交替出现，不要求先背模块表。

1. [为什么 Agent Coding 需要项目记忆](guide/01-from-vibe-coding-to-agent-coding.md)
   从“Agent 能搜索却仍会猜错”开始，明确 AIPD 解决的问题。

2. [AIPD 如何让项目记住自己](guide/02-aipd-three-main-lines.md)
   建立任务前读认知、任务中承接状态、任务后回写经验的完整心智模型。

3. [先建立最小认知闭环](guide/03-knowledge-base-minimum-loop.md)
   理解 `_adoc`、L1-L6、map 和初始化后第一次有效读取。

4. [用第一个 Case 完成真实目标](guide/04-case-step-development.md)
   走过 Case Contract、Think、Design、Work Package、Verify 与 Close。

5. [让项目从完成的工作里学习](guide/05-ai-native-code-architecture-experiment.md)
   用 Weave 维护项目记忆，再理解上下文解耦为什么是进阶方向。

6. [第一次完整使用 AIPD](guide/06-first-complete-flow.md)
   把前五章压缩成可直接交给 Agent 执行的一轮操作卡。

## 按问题查阅

### Agent 怎么读懂项目

- [ADOC 分层](modules/adoc-layers.md)：L1-L5 长期认知、L6 代码和流程状态如何分工。
- [Map 与检索](modules/maps-and-retrieval.md)：为什么先走 map，再用搜索兜底。
- [Agent Entry](modules/agent-entry.md)：Agent 进入项目和恢复 Case 时的第一跳规则。

### 一个目标怎么完成并恢复

- [Case 与 Work Package](modules/case-and-step.md)：phase-first 生命周期、文件状态与目标包。
- [Think](modules/think.md)：调研、实验、比较和回跳怎样留在当前 Case。
- [Main / Child Agent](modules/clone-agents.md)：什么时候直接做，什么时候隔离或并发。
- [OKR](modules/okr.md)：飞书阶段目标怎样与 Case 对齐。

### 信息怎么捕获和写回

- [Inbox](modules/inbox.md)：先记一下，但不提前当成项目事实。
- [Weave](modules/weave.md)：把已完成、已验证的信息写回正确层级。
- [Skill 概览](modules/skills-overview.md)：九个入口各自负责什么，常见组合是什么。

### 代码和工程怎么继续深入

- [上下文解耦](modules/context-decoupling.md)：局部自足、黑箱上移与 Decouple first, DRY later。
- [构建与安装](modules/build-and-install.md)：源码、构建产物、平台安装和验证脚本。

## 三类文档不要混用

| 位置 | 读者 | 主要任务 |
|---|---|---|
| 根 `README.md` | 第一次看到项目的人 | 判断 AIPD 是什么、是否适合、怎样开始 |
| `docs/` | 学习和使用 AIPD 的人 | 完成教程、理解原理、工作时查能力 |
| `_adoc/` | 进入当前项目工作的 Agent | 读取项目长期事实、任务上下文和恢复状态 |

`docs/` 不能替代 `_adoc`，`_adoc` 也不是写给人从头通读的用户手册。

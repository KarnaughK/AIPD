# AIPD2 学习文档

这里是面向人的 AIPD2 学习文档。

根目录 `README.md` 负责让第一次打开仓库的人快速理解 AIPD2 为什么存在、解决什么问题、是否值得继续看。`docs/` 负责把 AIPD2 的心智模型、项目知识库、任务执行组织和模块能力逐步讲清楚。

`_adoc/` 不属于普通学习文档。它是面向 Agent 的项目认知事实源，用来让 Agent 检索、恢复、执行和回写上下文。人可以阅读 `_adoc/`，但学习 AIPD2 时应先读 `docs/`。

## 推荐阅读路径

第一次了解 AIPD2：

```text
README.md
-> docs/README.md
-> docs/guide/01-from-vibe-coding-to-agent-coding.md
-> docs/guide/02-why-project-memory.md
-> docs/guide/03-adoc-layers-l1-l5.md
-> docs/guide/04-map-retrieval.md
-> docs/guide/05-weave-project-memory.md
-> docs/guide/06-first-case-flow.md
```

已经理解入门闭环，想查某个能力：

```text
docs/modules/context-decoupling.md
docs/modules/maps-and-retrieval.md
docs/modules/case-and-step.md
docs/modules/weave.md
docs/modules/clone-agents.md
```

要安装、调试或修改 AIPD2 源码：

```text
README.md
-> docs/modules/build-and-install.md
-> AGENTS.md
-> _adoc/index.md
-> _adoc/map.md
-> scripts/ 或 src/
```

## 目录

### guide

`guide/` 是新手入门流程，不按术语字典组织，而是从 AI Coding 的使用方式演进讲起：

- [01 从 Vibe Coding 到 Agent Coding](guide/01-from-vibe-coding-to-agent-coding.md)
- [02 为什么需要项目知识库](guide/02-why-project-memory.md)
- [03 ADOC L1-L5 分层](guide/03-adoc-layers-l1-l5.md)
- [04 map 检索](guide/04-map-retrieval.md)
- [05 weave 项目记忆回写](guide/05-weave-project-memory.md)
- [06 第一次 case 执行闭环](guide/06-first-case-flow.md)

### modules

`modules/` 是进阶模块说明，适合在理解入门闭环后按能力系统查阅：

- [上下文解耦](modules/context-decoupling.md)：理解黑箱上移、纵向黑箱、牵连面和“先解耦，后抽取”。
- [ADOC 分层](modules/adoc-layers.md)
- [Map 与检索系统](modules/maps-and-retrieval.md)
- [Case 与 Step](modules/case-and-step.md)
- [Weave](modules/weave.md)
- [Agent Entry](modules/agent-entry.md)
- [分身 Agent](modules/clone-agents.md)
- [Skill 概览](modules/skills-overview.md)
- [构建与安装](modules/build-and-install.md)

## 旧 README 迁移记录

旧 `README.md` 中适合展开讲解的内容没有直接丢弃，已按学习路径迁移或改写：

- 项目定位、工具对比和上下文问题：迁移到 `guide/02-why-project-memory.md` 和 `modules/context-decoupling.md`。
- `_adoc` 核心架构、L1-L6 分层：迁移到 `guide/03-adoc-layers-l1-l5.md` 和 `modules/adoc-layers.md`。
- map / context-map 说明：统一改写为 `_adoc/map.md`，迁移到 `guide/04-map-retrieval.md` 和 `modules/maps-and-retrieval.md`。
- 分身 Agent 模型：迁移到 `guide/06-first-case-flow.md` 和 `modules/clone-agents.md`。
- Case / Step 执行体系：迁移到 `guide/06-first-case-flow.md` 和 `modules/case-and-step.md`。
- Skill 表：README 保留概览，完整职责迁移到 `modules/skills-overview.md`。
- 安装和开发命令：从首页降级到 `modules/build-and-install.md`。
- 项目结构：README 保留短版，构建、安装和源码入口细节迁移到 `modules/build-and-install.md`。

删减原则：README 首页不再承载完整手册；重复解释、命令细节和源码级说明进入 docs 或交给 Agent 按 `_adoc/map.md` 定位。

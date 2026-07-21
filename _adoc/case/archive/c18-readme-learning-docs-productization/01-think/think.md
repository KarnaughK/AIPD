# Think：README 与学习文档产品化

## 调研前 checkpoint

- **当前问题**：现有 README 与学习文档仍基于早期“三条主线”，无法完整表达当前 Skill、phase-first Case、Map-first、文件 checkpoint、Weave、SOP、实践经验和平台适配等真实能力；同时缺少一条兼顾吸引、解释与上手的连续用户旅程。
- **触发来源**：Case Contract，由用户明确要求先梳理内容、再调研优秀开源文档、最后更新根 README 与学习文档。
- **调研边界**：审计本仓库当前用户文档与能力事实；研究 Vue、React 及少量公认优秀的开源文档在首页、入门、教程、概念、指南和参考之间的组织方式。重点提炼可迁移方法，不做全行业排名或视觉设计复刻。
- **预期输出**：现状差距清单、必须讲清的内容清单、外部证据、候选叙事主线、采用 / 不采用原则与进入 Design 的决策。
- **停止条件**：能够回答根 README、guide、modules 各自承担什么，以及新用户从第一次接触到完成首个闭环的推荐路径。
- **返回位置**：更新 `case.md` 的 Think 摘要并进入 `02-design/design.md`。

## 当前关键问题

1. AIPD 现在有哪些对新用户重要、但现有文档缺失或讲得过时的能力与理念？
2. 首页怎样在不夸大承诺的前提下，让目标用户迅速感到“这是我目前 Agent 协作缺的东西”？
3. 学习路径应以概念、功能对象还是一次完整任务旅程为主轴？
4. 如何让 Skill / 模块字典成为按需深入层，而不是阻断首次学习的主线？

## 调研分支

- `docs-benchmark/summary.md`：外部优秀开源项目文档的结构、流程与可迁移原则。

## 结论

### 现状审计

现有文档的基础并不差：已经完成 README / `docs/` / `_adoc` 分工，保留了从 Vibe Coding 到 Agent Coding 的问题引入，也有相对完整的 modules 能力说明。但它仍有五个关键断点：

1. **把框架结构当成用户旅程**：根 README 和 guide 都以“三条主线”展开，读者先接触的是分类，而不是一次真实 Agent 协作怎样变稳。
2. **快速开始没有快速获得价值**：当前 Quick Start 主要解释源码仓库和安装，尚未让用户看到“初始化后第一件事怎么做、做完得到什么”。
3. **当前运行模型没有成为主角**：Map-first、文件优先 checkpoint、phase-first Case、Goal Mode、Main / Child 净收益调度、实践经验库等已是重要能力，但外部文档提及不足或彼此割裂。
4. **部分内容已经过时**：`Think` 仍被描述为可持久化存在于 Case 之前；若干页面仍使用 step 表达当前 Work Package，或把分身 Agent 写成默认消化过程成本，和当前规则不完全一致。
5. **教程与能力字典混线**：六篇 guide 大多是在依次解释概念，最后一篇才给完整路径；用户必须先学很多对象，才能看到这些对象如何共同工作。

### 必须讲清的新内容

- AIPD 不是让模型更聪明，而是把项目变成 Agent 可读取、可恢复、可更新的协作环境。
- `_adoc` 是长期项目认知；L1-L5 存长期事实，L6 是代码，Case / OKR 是流程状态，不混入长期知识正文。
- Map-first 是第一次读取路径；搜索是兜底，稳定新入口应被回写。
- Case 是文件化短周期闭环：Case Contract -> Think -> Design -> Execute -> Verify -> Close。
- 文件 checkpoint 让压缩、中断、换 Agent 后仍能恢复；聊天是运行缓存，不是事实源。
- Work Package 是可执行、可恢复、可验收的目标包，不是微步骤，也不等于子 Agent 派发节点。
- Main / Child 按上下文隔离、真实并发、主线耦合和调度成本选择；角色 Agent 与实践经验提供领域化执行支持。
- Weave 维护当前项目记忆；Learn 让 AIPD 框架自身从真实协作中学习；Inbox、Update、OKR、Mermaid、Git Push 是围绕主循环的专用入口。
- 上下文解耦与 Decouple first, DRY later 是进阶设计思想，不是使用 AIPD 的前置条件。

### 采用的叙事主线

用“项目如何在每一次 Agent 工作中记住自己”取代“三条主线”作为首要教学结构：

```text
任务前：找到正确认知
  Agent Entry -> index / map -> L3 / L4 / L5 / 局部 README / L6

任务中：让目标和状态留在文件里
  Case Contract -> Think -> Design -> Execute -> Verify -> Close
                          -> Work Package / Main / Child

任务后：把稳定经验留给下一次
  Close 候选 -> Weave -> _adoc / map / 局部 README
```

这条主线天然容纳用户最关心的三个结果：Agent 少猜、长任务能恢复、项目越做越好懂。原“三条主线”保留为架构理解，不再作为 README 和教程的第一导航。

### 内容职责

- **根 README**：决策页。回答为什么、是什么、怎么运转、五分钟如何开始、适合谁、去哪里继续。
- **`docs/guide/`**：连续教程。用一个已有代码项目贯穿“安装 / 初始化 -> 第一次读项目 -> 第一个 Case -> Verify / Close -> Weave”的完整闭环。
- **`docs/modules/`**：解释与参考。按需深入 ADOC、map、Case、Skill、Agent、上下文解耦、构建安装等能力。

### Think Gate

- 方向已选定，无影响产品方向的 open question。
- 外部证据足以支撑信息架构决策。
- 下一步进入 Design，把主线转为具体文件计划、内容边界和 Work Package。

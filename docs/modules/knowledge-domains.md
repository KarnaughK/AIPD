# Knowledge 知识域

`_aipd/` 是完整的 AIPD 项目工作区，里面同时包含长期 Knowledge、Map、SOP、Case、OKR 和 Inbox。长期项目认知只放在 `_aipd/knowledge/`。

当你不知道一条稳定信息应写到哪个知识域，还是应放进 Case、SOP 或代码就近 README 时查这篇。

## 五类并列知识域

| 知识域 | 逻辑标识 | 回答的问题 | 物理位置 |
|---|---|---|---|
| Intent | `knowledge.intent` | 项目为什么存在，长期方向、边界和取舍是什么 | `_aipd/knowledge/intent/` |
| Research | `knowledge.research` | 方向所处的外部世界是什么，包括用户、场景、痛点、竞品和行业范式 | `_aipd/knowledge/research/` |
| Core | `knowledge.core` | 项目内部靠哪些核心对象、关系、流程或成立模型成立 | `_aipd/knowledge/core/` |
| Product | `knowledge.product` | Core 如何落成产品功能、边界、规则和用户可见行为 | `_aipd/knowledge/product/` |
| Engineering | `knowledge.engineering` | 产品能力落到代码时有哪些跨模块工程逻辑与长期约定 | `_aipd/knowledge/engineering/` |

这五类是存储分类，不是固定的生成顺序、成熟度等级或读取流水线。一个新项目可能从痛点反推 Intent，再提炼 Core；一个成熟项目也可能从某条业务线的 Product 或 Engineering 入口开始。Agent 的实际读取顺序由当前任务和 Map 决定。

真实代码不属于第六个知识域。它继续留在前端、后端、爬虫、脚本等真实源码目录，由 Map 和局部 README 建立入口。

## 不属于 Knowledge 正文的内容

- 当前目标、phase 状态和执行记录：进入 Case / Work Package。
- 飞书阶段目标和进展：进入 OKR 流程。
- 未整理的临时信息：进入 Inbox。
- 可重复的 Agent 执行动作：进入 SOP。
- 具体页面、弹窗、组件的数据流和修改入口：进入代码就近 README。
- 一次性调研、日志和未实现设计：留在当前 Case。

普通开发从 `_aipd/map.md` 路由到必要 Knowledge、局部 README 和真实代码，不通过历史 Case 或 OKR 绕路。

## Research 不只是痛点

Research 记录方向所处的外部世界。痛点只是其中一类。

适合放入 Research 的内容包括用户、场景、需求、竞品、同类玩法、市场观察、流量来源、变现方式和调研结论。这些外部观察会影响 Core 和 Product，但不要直接混同为项目内部模型。

## Core 是项目成立模型

Core 不等于狭义数据模型。不同项目可以拥有不同重点：

- 业务系统：核心对象、领域语言、状态流转、数据关系。
- 内容、社区或 SEO 项目：内容、增长、流量、留存和商业模型。
- 框架项目：上下文、检索、执行和回写模型。

判断一条信息是否属于 Core，重点看它是否已经成为本项目长期遵守的内部模型，是否会约束多个 Product 功能。

## Product 解释产品，也串联实现入口

Product 不能只写成代码地图。一条 Product 功能线至少要说清：功能是什么、解决什么场景、边界和不做范围、依赖哪些 Core，以及相关页面、接口、权限、数据对象和代码入口在哪里。

## Engineering 是产品到代码的桥梁

Engineering 适合承载跨模块、跨平台、长期稳定的规则，例如权限、路由、插件、前后端约定、平台适配和调试经验。它不是具体代码全集；页面、弹窗和组件内部的最后一层实现地图优先放在代码目录就近 README。

## 存储、检索与执行是三件事

- Knowledge 回答稳定信息归哪一类。
- Map 按项目、业务线或功能线投影当前任务需要的上下文。
- SOP 描述可重复动作如何执行。
- Case 保存一次短周期目标的运行状态。

业务线和功能线可以横跨多个知识域；它们通过 Map 形成场景视图，不需要再发明一套知识分类。

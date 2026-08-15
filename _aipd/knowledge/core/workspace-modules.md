# AIPD Workspace 模块

本文记录 AIPD 项目工作区中长期 Knowledge、检索视图、执行程序、流程状态和真实代码的关系。

## 核心判断

`_aipd/` 是整个 AIPD 项目工作区，不等于知识库正文。它把几类性质不同的模块放在同一个可发现入口下：

- `manifest.json` 记录 Workspace Schema 身份和最后成功应用的 AIPD 发布版本；`update-log.md` 记录版本跃迁、验证与有意保留的项目差异。
- `knowledge/` 保存长期稳定的项目认知。
- `map.md` 和各类细节 Map 提供按任务、业务线或功能线组织的检索视图。
- `leader/` 只在用户显式调用 `$aipd-leader` 后创建，保存一个 active Mission 的可恢复工作记忆；它不是第六类 Knowledge。
- `sop/` 保存以 Agent 为运行时的可复用程序。
- `case/` 保存短周期目标的 Contract、phase 和 Work Package 状态。
- `okr/` 保存飞书阶段目标入口与对齐信息。
- `inbox.md` 接住尚未整理归属的临时信息。
- 真实代码继续留在项目源码目录，由 Map 和局部 README 建立入口。
- `AGENTS.md` 是 Agent 进入项目和恢复任务时的第一跳规则。它位于 `_aipd/` 外；Agent MD 等级 2 还会在其中安装 Interaction Protocol。

任何 AIPD 读写前，Agent 先用本机 release catalog 与 project-state 合同检查路径安全、manifest 形态和项目版本 `P` / 本机版本 `I`。只有 `P = I` 且必要入口类型安全时进入普通检索；stale、unversioned、drift、future-project 或 invalid 状态按 Update / 停止规则处理。

这些模块不是一条从上到下的成熟度流水线，也不是要求 Agent 每次全部读取。

## 三条不同链路

过去把 L1-L5 同时当成推导过程、存储结构和读取顺序，容易产生混淆。现在明确区分：

1. **发现 / 推导链**：一个新项目可能从痛点反推方向，再提炼 Core 和 Product；成熟项目也可能从某条 Product 或 Engineering 问题开始。顺序由问题决定。
2. **长期存储链**：稳定信息按 Intent、Research、Core、Product、Engineering 五类并列知识域归档。
3. **任务读取链**：Agent 先走 Map，再按当前场景选取必要 Knowledge、SOP、局部 README、流程状态和代码入口。

发现顺序不会决定物理目录，物理目录也不会强制读取顺序。

## 五类 Knowledge

| 知识域 | 逻辑标识 | 核心问题 | 典型载体 |
|---|---|---|---|
| Intent | `knowledge.intent` | 项目为什么存在，长期方向、边界和取舍是什么 | `_aipd/knowledge/intent/` |
| Research | `knowledge.research` | 方向所处的外部世界是什么，包括用户、场景、痛点、竞品和行业范式 | `_aipd/knowledge/research/` |
| Core | `knowledge.core` | 项目内部靠哪些核心对象、关系、流程或成立模型成立 | `_aipd/knowledge/core/` |
| Product | `knowledge.product` | Core 如何落成产品功能、边界、规则和用户可见行为 | `_aipd/knowledge/product/` |
| Engineering | `knowledge.engineering` | 产品能力落到代码时有哪些跨模块工程逻辑与长期约定 | `_aipd/knowledge/engineering/` |

真实代码不是第六类 Knowledge。Knowledge 会帮助 Agent 理解、定位和修改代码，但不复制代码实现。

## Research 不只是痛点

Research 负责记录外部世界。痛点是其中一种输入，竞品、同类玩法、市场观察、流量来源、变现方式和带来源的调研结论也属于 Research。

外部观察可以影响 Core 和 Product，但只有当它被项目吸收成自己的稳定成立方式时，才进入 Core。

## Core 是项目成立模型

Core 不等于狭义数据对象。不同项目可能以不同模型成立：

- 业务系统：核心对象、领域语言、状态流转和数据关系。
- 游戏、内容、社区或 SEO 项目：内容、增长、流量、留存和商业模型。
- 框架项目：上下文、检索、执行、状态承接和知识回写模型。

判断一条信息是否属于 Core，可以检查：去掉它项目是否仍成立，它是否长期约束多个 Product 功能，而不是只服务一个局部实现。

## Product 与 Engineering

Product 既解释功能本身，也可以串联实现入口。一条 Product 功能线至少要说清用户场景、功能边界、不做范围、依赖的 Core，以及页面、接口、权限、数据对象和代码入口。

Engineering 是 Product 到真实代码之间的桥梁，适合权限、路由、插件、前后端约定、平台适配和跨模块调试规则。页面、弹窗和组件内部的最后一层实现地图，优先放代码就近 README。

## 业务线和功能线是场景投影

业务线、产品线、功能线和 shared capability 可以横跨五类 Knowledge。例如一条关键词发现业务线可能同时引用：

- Intent 中的方向与不做范围。
- Research 中的数据源和外部观察。
- Core 中的漏斗或筛选模型。
- Product 中的功能和用户行为。
- Engineering 中的调度、接口与跨模块规则。
- 代码目录中的页面、任务和数据处理入口。

它们通过上下文 Map 形成一个任务可读的场景视图，不需要复制成第六种知识域。

## Map 的三种分辨率

- **项目总图**：暴露项目全局高频入口，让 Agent 知道有哪些知识域、业务线、共享能力与代码区域。
- **上下文 Map**：围绕业务线、功能线或 shared capability，串起所需 Knowledge、页面、接口、README 与代码入口。
- **局部实现图**：放在代码就近 README 或局部 map，说明页面、组件、脚本或模块内部怎么理解、修改和验证。

它们是同一种检索视图的不同分辨率，不是三类新存储，也不是每次都要完整经过的三级流程。

## Map、Leader、SOP、Case、Update 和 Weave

- **Map** 是声明式路由，回答“哪里有什么、这次应该读什么”。
- **Leader** 是显式可选的项目主导层，回答“当前 Mission 由谁负责方向探索、跨 Case 协调和总验收”；普通 AIPD 不加载它。
- **SOP** 是可复用 Agent 程序，回答“一个动作怎样重复执行”。
- **Case** 是一次短周期目标的状态容器，回答“现在做到哪里、下一步从哪里恢复”。
- **Update** 读取发布演进与当前权威，把项目一次收敛到本机最终态；Schema migrator 只做结构切换，不写当前 AIPD 版本。
- **Weave** 在完成和验收后判断稳定信息回到哪里。

Weave 可以候选五类 Knowledge，但有不同门槛：

- Intent 只接收用户明确确认的长期方向、边界和取舍。
- Research 接收带来源和时间边界的稳定外部事实或调研结论。
- Core、Product、Engineering 接收已经实现或验证的项目内部事实。
- 页面和组件内部入口进入代码就近 README。
- 高频自然语言路由进入 Map。
- 未完成设计、一次性过程和验收记录继续留在 Case / Work Package。

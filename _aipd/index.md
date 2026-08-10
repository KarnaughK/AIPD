# AIPD 项目工作区索引

本文件是本项目 `_aipd/` 工作区的总入口。`_aipd/` 不等于 Knowledge：它同时容纳长期知识、检索地图和过程工具；具体代码仍留在真实代码目录中。

## 项目状态

- 当前项目：AIPD 2
- 当前结构：AIPD Project Schema v2
- Knowledge Schema：Intent / Research / Core / Product / Engineering 五类并列知识域
- 项目级检索入口：`_aipd/map.md`

## Workspace 区域

| 区域 | 路径 | 职责 |
|---|---|---|
| Schema 标识 | `_aipd/manifest.json` | 标识当前项目使用的 AIPD Project Schema |
| Workspace 入口 | `_aipd/index.md` | 说明各区域的职责与使用边界 |
| 项目 Map | `_aipd/map.md` | 把自然语言、业务词和工程词路由到所需 Knowledge、局部 README 与代码入口 |
| Knowledge | `_aipd/knowledge/` | 存放五类长期、稳定、可复用的项目认知 |
| SOP | `_aipd/sop/` | 存放以 Agent 为运行时的可复用程序 |
| Case | `_aipd/case/` | 存放短周期目标、阶段状态、工作包和验证记录 |
| OKR | `_aipd/okr/` | 存放阶段目标及其对齐关系 |
| Inbox | `_aipd/inbox.md` | 暂存尚未归类的材料、想法和候选认知 |
| 真实代码 | 项目代码目录 | 承载实际实现；由 Map、Engineering 和局部 README 提供入口 |

## 五类 Knowledge

| Knowledge 域 | 逻辑标识 | 路径 | 负责存放 |
|---|---|---|---|
| Intent | `knowledge.intent` | `_aipd/knowledge/intent/` | 用户明确确认的长期方向、目标、边界与取舍 |
| Research | `knowledge.research` | `_aipd/knowledge/research/` | 带来源和时间边界的用户、场景、痛点、竞品与外部事实 |
| Core | `knowledge.core` | `_aipd/knowledge/core/` | 项目成立所依赖的核心对象、领域语言、流程和模型 |
| Product | `knowledge.product` | `_aipd/knowledge/product/` | 功能边界、业务规则、用户可见行为和产品结构 |
| Engineering | `knowledge.engineering` | `_aipd/knowledge/engineering/` | 产品落到代码时的跨模块实现逻辑、工程规则与协作约定 |

这五个名称是统一标识，不是层级、成熟度或固定阅读顺序。一次任务只读取与当前问题有关的知识域；不同知识域可以互相引用，但不要求按 Intent 到 Engineering 依次经过。

## Context Retrieval

1. 先读 `_aipd/map.md`，把用户说法映射到必要的 Knowledge、局部 README 和代码入口。
2. 根据任务范围选择最少但足够的上下文，不默认把五类 Knowledge 全部加载。
3. 项目 Map 负责全局第一跳；业务线、功能线或共享能力 Map 负责上下文范围；代码就近 README 负责最后一跳。
4. 普通开发不读取 Case 或 OKR。只有任务明确涉及对应流程或状态时，才进入这些区域。
5. Map 未命中时，再用 `rg` 搜索业务词、页面名、接口名、权限码、README 和代码符号。

## 常用入口

- 项目方向：`_aipd/knowledge/intent/intent.md`
- Workspace 与 Knowledge 定义：`_aipd/knowledge/core/workspace-modules.md`
- 核心认知：`_aipd/knowledge/core/index.md`
- Agent 横向能力：`_aipd/knowledge/core/horizontal-capabilities.md`
- AI 友好代码拓扑：`_aipd/knowledge/core/ai-friendly-code-topology.md`
- 产品功能：`_aipd/knowledge/product/index.md`
- 工程规则：`_aipd/knowledge/engineering/index.md`
- SOP：`_aipd/sop/index.md`
- Case：`_aipd/case/index.md`
- OKR：`_aipd/okr/index.md`

## 写回边界

- Intent 只接收用户明确确认的长期方向和边界，不从一次实现结果自动反推。
- Research 只接收带来源、观察时间或适用时间边界的稳定外部事实与调研结论。
- Core、Product、Engineering 只接收已确认或已验证、对后续任务仍有复用价值的项目事实。
- 未完成事项和待验证候选留在 Case；阶段目标留在 OKR；可复用步骤留在 SOP；临时材料留在 Inbox。
- 页面、组件和代码模块的局部实现说明优先放在代码就近 `README.md`，不要把细节重新堆回 Engineering。

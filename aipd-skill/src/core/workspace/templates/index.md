# AIPD 项目认知索引

本文件是 `_aipd/` 的入口。Agent 进入项目后，先读这里，再读取 `_aipd/map.md` 检索当前任务需要的知识、局部 README 和真实代码入口。

## Schema

- **Manifest**：`_aipd/manifest.json`
- **Schema**：`aipd-project`
- **Schema Version**：`2`

## 工作区入口

- **项目记忆地图**：`_aipd/map.md`
- **Inbox**：`_aipd/inbox.md`
- **SOP**：`_aipd/sop/index.md`、`_aipd/sop/map.md`
- **OKR**：`_aipd/okr/index.md`
- **Case**：`_aipd/case/index.md`
- **Leader（显式可选）**：首次调用 `$aipd-leader` 后创建 `_aipd/leader/index.md`；普通任务不读取

## 并列知识域

| 逻辑类型 | 位置 | 作用 | 当前状态 |
|----------|------|------|----------|
| `knowledge.intent` | `_aipd/knowledge/intent/` | 项目方向、目标和长期取舍 | 待补充 |
| `knowledge.research` | `_aipd/knowledge/research/` | 用户、场景、需求、痛点、竞品、行业/玩法范式和外部观察 | 待补充 |
| `knowledge.core` | `_aipd/knowledge/core/` | 核心对象、领域语言、核心流程、数据模型和项目成立模型 | 待补充 |
| `knowledge.product` | `_aipd/knowledge/product/` | 产品功能、功能边界、业务规则、用户可见行为和相关实现入口 | 待补充 |
| `knowledge.engineering` | `_aipd/knowledge/engineering/` | 跨模块业务实现逻辑、工程规则和协作约定 | 待补充 |

这些知识域按内容职责并列存在，不代表阶段或固定读取顺序。真实代码不写入 `_aipd/knowledge/`，仍位于前端、后端、爬虫、脚本等实际源码目录。

## 检索约定

- 先读 `_aipd/map.md`，按任务命中必要知识域、局部 README 和真实代码入口。
- 普通开发、找代码、查业务规则、查页面或组件实现时，不读取 `_aipd/case/` 或 `_aipd/okr/`；只有明确进入相应流程时才读取状态文件。
- `_aipd/knowledge/research/` 维护方向所处的外部世界；痛点只是其中一种资料。
- `_aipd/knowledge/core/` 维护核心概念和项目成立模型，包含标准名、别名/黑话、关系和常见误解。
- `_aipd/knowledge/engineering/` 维护跨模块实现逻辑、工程规则和协作约定；页面、弹窗、组件内部的实现地图放代码目录就近 `README.md`。
- `_aipd/sop/` 存放可复用 Agent 程序，不属于长期知识正文。
- `_aipd/leader/` 只在用户显式调用 `$aipd-leader` 后创建，保存当前 Mission、跨 Case 调度和恢复信息；普通 AIPD / Case 不自动进入。

## 维护约定

- 已完成事项、已验证实现、case 归档、代码 diff、错误日志或外部资料产生稳定新知识时，用 `aipd-weave` 判断写入 Intent / Research / Core / Product / Engineering 知识域、局部 README 或 map。
- Intent 只接收用户明确确认的长期方向、目标和边界；Research 只接收带来源、采集时间和有效性边界的稳定外部事实或调研结论。
- 未完成 case 中的候选先留在 Close 归档候选；一次性过程和验收状态留在 case / work package。
- 高频入口必须能从 `_aipd/map.md` 一跳找到。

## 快速入口

- 当前方向：`_aipd/knowledge/intent/intent.md`
- 项目记忆地图：`_aipd/map.md`
- 临时收件箱：`_aipd/inbox.md`
- Case / OKR：`_aipd/case/index.md`、`_aipd/okr/index.md`
- Leader：显式调用 `$aipd-leader` 后读取 `_aipd/leader/index.md`

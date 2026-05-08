# V2 Todo

这里记录 AIPD 下一阶段要讨论和细化的事项。

本文件只放未完成 todo。完成后，为本次事项在 `archive/` 下创建独立归档文件，并从本文件删除对应条目。

## 当前判断

AIPD 不应该继续向“更完整的 AI 做事流程”扩张。

通用 Agent 和专用开发 Agent 会逐渐吸收更好的工作方法，例如澄清需求、拆分任务、写测试、审查代码、管理分支和总结结果。Superpowers 这类工具主要补的是 Agent 的通用开发纪律，这一层长期会被平台能力吃掉一部分。

AIPD 更应该聚焦在项目认知层：让任何 Agent 在进入项目时，都能读取项目方向、用户场景、产品边界、架构原因、技术取舍和历史经验。

## 待讨论事项

### 1. 初始化默认文档壳子

当前 `/aipd2` 初始化主要创建目录和基础入口。后续可以进一步把 `_adoc/` 下的默认索引壳子也标准化。

需要继续讨论并落地：

- `_adoc/index.md` 的默认模板：作为项目认知地图，说明 L1-L5、case、OKR 的入口。
- `_adoc/case/index.md` 的默认模板：作为 case 索引，记录进行中和已归档 case。
- `_adoc/okr/index.md` 是否也需要默认壳子。
- 这些模板放在 `src/core/`，由 `/aipd2` 初始化时写入目标项目。

### 2. 已有项目刷新机制

初始化之外，还需要一个“刷新”能力，用于已有 AIPD 项目补齐新版入口文件和默认索引壳子。

需要继续讨论：

- `/aipd2` 状态扫描发现缺失时，是否自动提示补齐。
- 补齐 Agent Entry、`_adoc/index.md`、`_adoc/case/index.md` 时，如何避免覆盖用户已有内容。
- 是否提供单独命令或仍通过 `/aipd2` 状态入口完成。

### 3. Role 与子 Agent 身份

Fork-first 子 Agent 运行模式已先落地到 Agent Entry 和 case create/run。Role 系统暂未落地。

当前倾向不是把 skill 直接当成一个完整 agent。更合理的分层可能是：

- Skill 负责流程，例如创建 Case、执行 Step、沉淀经验。
- Role 负责判断方式，例如架构医生、产品负责人、开发执行者、审查者。
- Sub Agent 是一次性执行者，由 skill 在执行时选择合适 role 并注入上下文。

需要继续讨论：

- Role 是否应该成为 AIPD 的一等概念。
- Role 放在项目 `_adoc/roles/`，还是放在 AIPD 框架源码中。
- Step 是否需要声明推荐 role。
- Role 如何叠加到已落地的 fork-first 子 Agent 派发语句中。

### 4. 降低 AIPD 的侵入感

AIPD 是完整框架，但不能让用户每次任务都感觉负担很重。

需要继续讨论：

- 什么任务必须进入完整 Case 生命周期。
- 什么任务只需要轻量读取 `_adoc/index.md`。
- 经验回写的最低标准是什么。
- 如何避免 `_adoc` 变成文档垃圾场。

### 5. 对外定位表述

README 已经开始描述 AIPD 和 Superpowers、OpenSpec、通用 Agent 的区别，但后续还需要继续打磨。

需要继续讨论：

- AIPD 是否应该明确自称“项目认知层”或“项目记忆层”。
- 是否使用“Project Context Protocol”这类说法。
- 如何解释 AIPD 和 OpenSpec 的关系：一个偏长期认知，一个偏单次变更规格。
- 如何解释 AIPD 和 Superpowers 的关系：一个偏项目上下文，一个偏 Agent 执行纪律。

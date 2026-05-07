# V2 Todo

这里记录 AIPD 下一阶段要讨论和细化的事项。

本目录不是执行 case，不按 step 派发，也不代表马上要改代码。它只用于沉淀当前对 AIPD 定位、概念边界和后续演进方向的讨论。

## 当前判断

AIPD 不应该继续向“更完整的 AI 做事流程”扩张。

通用 Agent 和专用开发 Agent 会逐渐吸收更好的工作方法，例如澄清需求、拆分任务、写测试、审查代码、管理分支和总结结果。Superpowers 这类工具主要补的是 Agent 的通用开发纪律，这一层长期会被平台能力吃掉一部分。

AIPD 更应该聚焦在项目认知层：让任何 Agent 在进入项目时，都能读取项目方向、用户场景、产品边界、架构原因、技术取舍和历史经验。

## 已归档决策

### 1. Case 与上下文索引（已完成）

已决定不采用 Workspace 作为一等概念。Workspace 听起来像长期存在、互斥且需要选择的工作空间，但 AIPD 实际需要的是：一次具体事项，以及这次事项最相关的上下文索引。

Case 是更合适的命名：它表示一次需要 AI 参与处理、带上下文、可拆 step、可归档的具体事项。

已落地：

- 旧的计划概念改为 `Case`，避免和 Claude Code / Codex 的内置规划模式混淆。
- 事项执行目录统一使用 `_adoc/case/`。
- 对外命令统一使用 `/aipd2-case-*`。
- Case 编号使用 `cX.Y`，Step 编号使用 `cX.Y.Z`。
- 上下文空间不单独建模，而是作为 `case.md` 的“上下文索引”存在。
- `aipd2-case-run` 先加载 `case.md` 的上下文索引，再检查并派发 `steps/`。

当前概念：

| 概念 | 含义 |
|------|------|
| `_adoc` | 项目的长期认知库 |
| Case | 一次具体事项，以及本次事项的上下文索引 |
| Step | 可派发给 sub agent 的最小任务 |
| Role | sub agent 的判断身份 |
| Skill | 流程入口和调度器 |

### 2. Agent Entry 认知壳模板（已完成）

已确定 `AGENTS.md` / `CLAUDE.md` 不应该只放动作指令，也不应该塞入完整 AIPD 方法论。

它们应该是一层轻量认知壳，告诉新进入项目的 Agent：

- 本项目使用 AIPD 维护项目认知。
- AIPD 是什么。
- L1 到 L5 分别代表什么。
- Case、Step、OKR 是什么。
- `_adoc/` 与就近 README 分别承载哪些认知。
- 用户当前指令与 AIPD 认知冲突时，先指出冲突和风险。

已落地模板：

- `src/core/agent-entry/template.md`

该模板是平台无关核心内容，后续可以被目标项目初始化流程拿去插入：

- Codex / OpenAI Agent：`AGENTS.md`
- Claude Code：`CLAUDE.md`

### 3. Agent Entry 初始化落地（已完成）

已决定 `/aipd2` 初始化不只是创建 `_adoc/`，还要把 Agent Entry 写入项目根目录默认记忆文件。

已落地：

- `aipd2` 注入 `agent-entry/template.md`。
- Codex 优先，默认写入 `AGENTS.md`。
- Claude Code 可复用同一模板写入 `CLAUDE.md`。
- 使用 `<!-- AIPD:START -->` / `<!-- AIPD:END -->` 标记维护 AIPD 区块。
- 已有文件时只替换 AIPD 区块或追加区块，不覆盖用户原有内容。
- 状态扫描增加 Agent Entry 检查。

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

### 3. Skill、Role、Sub Agent 的边界

当前倾向不是把 skill 直接当成一个完整 agent。

更合理的分层可能是：

- Skill 负责流程，例如创建 Case、执行 Step、沉淀经验。
- Role 负责判断方式，例如架构医生、产品负责人、开发执行者、审查者。
- Sub Agent 是一次性执行者，由 skill 在执行时选择合适 role 并注入上下文。

需要继续讨论：

- Role 是否应该成为 AIPD 的一等概念。
- Role 放在项目 `_adoc/roles/`，还是放在 AIPD 框架源码中。
- Step 是否需要声明推荐 role。
- 不同平台如何适配：Claude Code 可用自定义 subagent，Codex 当前更适合通过 prompt 注入 role profile。

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

## 暂不执行

本轮只记录讨论方向，不进入实现。

后续如果要执行，需要先把本目录中的 todo 拆成明确的 Case / Step，再决定是否修改源码、skill、模板或安装脚本。

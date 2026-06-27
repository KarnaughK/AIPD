# AIPD 产品功能线

L4 Product 负责把 L3 的核心成立模型落成用户可见、Agent 可调用、任务可引用的产品能力。

这里的“产品”不只表示 GUI。对 AIPD 当前阶段来说，产品能力主要表现为 skill、项目文件能力、SOP 库、Desktop 方向和围绕它们的用户可见行为。具体工程实现、平台适配、脚本细节和角色 Agent 调度规则进入 L5 或就近源码。

## L4 和 L3 / L5 的边界

- L3 回答 AIPD 靠哪些核心模型成立。
- L4 回答这些模型落成哪些可用能力，以及每个能力对用户承诺什么、不承诺什么。
- L5 回答能力如何落到 Codex / Claude / OpenCode、构建脚本、Agent 配置、路径和工程约定。

判断一条信息是否属于 L4，可以问：

- 它是不是用户会主动调用、进入或感知的能力。
- 它是不是一个稳定功能线，而不是某个 skill 内部步骤。
- 它是否需要说明功能边界、输入输出、用户可见行为和相关入口。

## 产品能力总览

| 产品能力 | 用户价值 | 主要入口 | 关联 L3 模型 | 状态 |
|---|---|---|---|---|
| AIPD 总入口与初始化 | 让 Agent 进入项目后知道如何读取 AIPD，并在新项目中创建基础结构 | `aipd`、`AGENTS.md`、`_adoc/` templates | 项目知识库维护模型、Map-first 上下文检索模型 | 已存在 |
| Map-first 认知加载 | 让普通任务先经 `_adoc/map.md` 路由到正确上下文，而不是让 Agent 盲搜 | `aipd`、`_adoc/map.md` | Map-first 上下文检索模型 | 已存在 |
| Inbox 临时收件箱 | 低承诺度接住未整理信息，避免临时想法散落在聊天里 | `aipd-inbox`、`_adoc/inbox.md` | 项目知识库维护模型 | 已存在 |
| AIPD Case | 以统一入口推进短周期目标：Goal / Think / Design / Execute / Verify / Close | `aipd-case`、case phase 文档、case 模板 | 任务执行模型、Think / 任务澄清决策模型、AI 原生代码架构模型 | 已存在 |
| Weave 反向编织 | 把稳定知识回写到 `_adoc`、局部 README 或 map | `aipd-weave` | 项目知识库维护模型 | 已存在 |
| Learn 框架自迭代 | 把真实协作经验回流到 AIPD 框架自身的 skill、模板和规则 | `aipd-learn` | 项目知识库维护模型、Agent 协作思考模型 | 已存在 |
| AIPD Update | 帮已接入项目升级 AIPD 架构，同时保护项目已有认知 | `aipd-update` | 项目知识库维护模型、Map-first 上下文检索模型 | 已存在 |
| Mermaid / MMD | 用图提高人和 AI 对复杂结构的对齐速度 | `aipd-mermaid`、`.mmd` 文件 | AI 原生代码架构模型、任务执行模型 | 已存在 |
| Git Push 辅助 | 用低风险固定流程完成当前分支推送 | `aipd-git-push` | 任务执行模型 | 已存在 |
| SOP 库 | 把可重复项目动作沉淀为以 Agent 为运行时的 AI 原生程序 | `_adoc/sop/`、SOP map | SOP / AI 程序模型 | 壳子 |
| AIPD Desktop | 用桌面界面组织 AIPD 文件、Case / Work Package、聊天和预览 | `aipd-desktop/` | Map-first 上下文检索模型、任务执行模型、SOP / AI 程序模型 | 规划中 |

## 能力边界

### AIPD 总入口与初始化

总入口负责判断当前任务应进入普通认知加载、项目状态扫描、初始化、case 流程或其他专门 skill。

初始化只创建基础 AIPD 结构、Agent Entry、map、case / OKR / inbox 壳子。它不替用户完成完整 L1-L5 建模，也不替代后续 weave 和 case 流程。

### Map-first 认知加载

Map-first 认知加载是 AIPD 当前最重要的读取能力。它要求 Agent 先读取 `_adoc/index.md` 和 `_adoc/map.md`，用显性 map 命中相关 L3 / L4 / L5 / 局部 README / L6 入口。

搜索和 RAG 是兜底，不是默认主路径。若搜索发现稳定入口，应回写到 map，提升下一次第一跳命中率。

### Inbox 临时收件箱

Inbox 只负责 capture。它接住还没有定型的信息，不自动归类、不创建 case、不直接 weave。

后续信息可能被丢弃、转成 case、进入 SOP，或通过 weave 写回长期知识库。

### AIPD Case

AIPD Case 是新的统一 case 入口。它不再把 create / run / archive 作为用户必须记住的主流程，而是读取 case.md 的 `Current Phase` 和 `Phase State`，按 Goal / Think / Design / Execute / Verify / Close 渐进加载对应 phase 文档。

Case 的用户价值是把一个马上要完成的目标做成完整闭环：先定目标和上下文，必要时在 Think 中调研和抉择，在 Design 中找到复杂度爆点并做最小必要解耦，再按 Work Package 执行，最后 Verify 和 Close。

Design phase 的核心边界是：不完整抽象所有概念，而是找到复杂度爆点，对爆点做最小必要解耦，让后续执行横向铺模块，而不是纵向堆版本。

### Weave 反向编织

Weave 是项目知识库维护模型的更新能力。它判断讨论、开发、work package 结果、错误日志和外部资料中哪些信息值得沉淀，并决定写入 L3 / L4 / L5 / 局部 README / map 的哪个位置。

其中 L3 / L4 / L5 / 局部 README / map 只接收稳定知识；case / work package 只保留一次性过程、验收记录和临时决策。普通找代码或查功能时，不应因为 L4 提到某个能力曾由 case 推进，就去读取历史 case。

Weave 面向当前项目知识库；Learn 面向 AIPD 框架自身迭代。

### Learn 框架自迭代

Learn 用来采集 transcript、case 经验或用户反馈，并判断是否需要修改 AIPD 框架自己的 skill、模板、Agent 行为规则或项目认知。

它不替代当前项目的 weave，不负责归档 case，也不默认直接改源码。

### AIPD Update

Update 用来更新已经初始化过 AIPD 的项目。它需要审计旧结构和新规则差异，给出更新方案，并在用户确认后合并新模板、新 map 和新 Agent Entry。

它的核心边界是“升级框架结构但不破坏项目已有认知”。

### Mermaid / MMD

Mermaid / MMD 是高带宽交流能力，用于表达架构关系、Case / Work Package 拆解、状态流、模块边界和桌面端结构。

它不是默认渲染工具。用户只要求改图时，应优先修改 `.mmd` 源码；用户明确要求预览、渲染或看图时，才生成图片。

### Git Push 辅助

Git Push 是低风险辅助能力，只检查当前分支和提交状态并推送远端。

它不自动 add、commit、merge、rebase、stash，也不修改代码。

### SOP 库

SOP 库不是普通知识库目录，也不是单纯脚本集合。它收纳可重复执行的项目动作：目标、输入、步骤、工具调用、Agent 判断、输出和收尾。

某次 SOP 执行可以进入 case；执行后产生的稳定知识再由 weave 判断是否写回 L1-L5、map 或局部 README。

### AIPD Desktop

AIPD Desktop 是规划中的增强客户端。第零版边界是 AIPD 文件树解析和真实 Agent 聊天接入，后续再讨论 Case Workspace、快捷上下文 chip、MMD 预览和多 Agent adapter。

Desktop 不是基础 skill 的运行前提，也不是重型 Agent 编排工厂。

## 不放入 L4 的内容

- Codex / Claude / OpenCode 的具体适配方式，进入 L5。
- 构建、安装、dist、agent 模板生成等工程规则，进入 L5。
- 单个 skill 内部的执行步骤，留在对应 `SKILL.md`。
- 页面、组件、脚本内部的数据流和修改注意事项，写到就近 README。
- 一次性 case 过程和执行日志，留在 case / work package。
- 当前 case 状态、历史 case 依据和 OKR 执行状态，不写入 L4；需要流程恢复或 OKR 对齐时再读对应目录。

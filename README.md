# AIPD

> 让项目成为 AI Agent 可读取、可恢复、会持续生长的长期记忆。

Coding Agent 已经很会写代码。真正拖慢长期开发的，越来越不是“这段代码怎么写”，而是：

- 它不知道项目为什么长成现在这样，只能从当前代码猜。
- 一次任务聊久以后，目标、假设、否决方案和真实进度混在聊天里。
- 上一次 Agent 发现的规则没有留下来，下一次又从头踩坑。

AIPD 是一套面向 AI 协作的软件开发框架。它不替代 Codex、Claude Code，也不是新的 Web 框架；它给项目增加一层可维护的认知与执行系统，让 Agent 能够：

- **任务前读对**：从一句自然语言命中相关产品规则、工程约定和代码入口。
- **任务中接得住**：把目标、边界、决策、进度和验收写进文件，压缩或换 Agent 后仍能恢复。
- **任务后留得下**：把已经验证的稳定经验写回项目，而不是永远困在聊天和 diff 里。

一句话：**Agent 负责执行，AIPD 让项目记住自己。**

[五分钟开始](#五分钟开始) · [完整学习路径](docs/README.md) · [九个 Skill](#九个-skill一套循环) · [构建与安装](docs/modules/build-and-install.md)

## 没有 AIPD 时，项目会怎样失忆

假设你对 Agent 说：“把会员权限也接到导出功能里。”

Agent 可以搜索 `export`、`permission`、`member`，也能读出很多代码。但代码未必会告诉它：

- 导出权限由套餐、组织角色还是功能开关共同决定。
- 为什么某个旧入口故意没有复用共享方法。
- 哪些失败状态必须给用户解释，哪些应该静默降级。
- 之前已经讨论过哪些方案，为什么没有采用。

搜索能找到“相关文件”，不等于找到“正确上下文”。聊天可以临时补充，但会压缩、会中断，也不会自动成为下一次任务的项目事实。

AIPD 把这类信息放进项目本身，并给 Agent 一条稳定的读写路径。

## AIPD 如何工作

```text
任务前：找到正确认知
  AGENTS.md -> _adoc/index.md -> _adoc/map.md
                              -> L3 / L4 / L5 / 局部 README / L6 代码

任务中：让目标和状态留在文件里
  Case Contract -> Think -> Design -> Execute -> Verify -> Close
                                  -> Work Package -> Main / Child Agent

任务后：把稳定经验留给下一次
  Close 候选 -> Weave -> _adoc / map / 局部 README
```

这不是要求把项目写成文档海洋。AIPD 只保留两类真正有用的信息：

- 代码难以表达、但会长期影响判断的项目认知。
- 压缩或中断后，继续完成当前目标所必需的运行状态。

聊天仍然用来协作，搜索仍然用来探索，代码仍然是最终实现；AIPD 负责让它们不再彼此失联。

## 五分钟开始

AIPD 当前是一个可构建的 Skill 源码项目，不是双击即用的应用。最省心的方式，是让 Coding Agent 打开本仓库并完成构建安装。

### 1. 安装 AIPD Skill

用 Codex 或 Claude Code 打开本仓库，然后说：

```text
请阅读本仓库的 AGENTS.md、_adoc/index.md 和 _adoc/map.md，
把 AIPD 构建并安装到我当前使用的 Agent 平台。
```

安装会改写用户级或项目级 Agent 运行环境，应由你明确确认。开发者也可以直接查看[构建与安装](docs/modules/build-and-install.md)中的脚本入口。

### 2. 让 AIPD 进入你的项目

在目标项目里调用：

```text
/aipd
```

如果项目还没有 AIPD，Agent 会先创建最小结构：`AGENTS.md`、`_adoc/index.md`、`_adoc/map.md`，以及 Case、Inbox、OKR、SOP 等流程入口。初始化不是让你一次填完所有知识；它只是先建立一条能用、以后可以持续维护的路径。

### 3. 用一个真实目标开始

不用先背 L1-L6，也不用手写模板。直接描述你当前要完成的事：

```text
创建一个 case：把现有登录流程增加邮箱验证码，
先确认边界和风险，再完成实现、验证和归档。
```

Agent 会把目标、要做、不做、验收标准和上下文索引写进 Case Contract；需要调研时进入 Think，需要固化方案时进入 Design，执行完成后再 Verify 和 Close。

第一次实践可直接跟随[第一次完整使用 AIPD](docs/guide/06-first-complete-flow.md)。

## 一次完整闭环里发生了什么

### 1. 项目认知有自己的位置

`_adoc/` 保存代码里不容易表达的长期认知：方向、外部世界、核心模型、产品规则和跨模块工程约定。L6 就是项目真实代码，不在 `_adoc/` 里复制一份“伪代码层”。

`_adoc/map.md` 是 Agent 的第一跳。它把“会员导出”“权限”“某个弹窗”等用户语言，路由到该读的 L3 / L4 / L5、局部 README 和代码入口。全文搜索是兜底；搜索发现了稳定入口，再把入口写回 map。

### 2. 长任务有文件化生命周期

Case 不是聊天摘要，而是一个马上要完成并最终关闭的短周期目标容器：

```text
Case Contract -> Think -> Design -> Execute -> Verify -> Close
```

- **Case Contract** 固定目标、边界、验收标准和上下文。
- **Think** 处理信息不足、外部调研、实验和方案比较。
- **Design** 从需求与现有事实出发，找到复杂度爆点，形成可执行边界。
- **Execute** 按 Work Package 推进，并持续写回可恢复状态。
- **Verify** 用证据检查目标和设计护栏，而不是只看“代码已经改了”。
- **Close** 收束结果、风险和知识回写候选。

平台 Goal Mode 可以让 Agent 在已绑定 Case 的范围内自主通过内部 Gate，但不会改变 Case 本体，也不会绕过安装、发布、删除等外部副作用边界。

### 3. 项目会从完成的工作里学习

任务完成后，Weave 判断哪些信息已经稳定：

- 新核心概念进入 L3。
- 新产品边界进入 L4。
- 新跨模块实现规则进入 L5。
- 页面或组件入口进入就近 README。
- 高频检索路径进入 map。
- 一次性过程继续留在 Case / Work Package。

这让下一次 Agent 继承的是经过验证的项目事实，而不是整段聊天历史。

## 九个 Skill，一套循环

### 主循环

| Skill | 什么时候用 | 结果 |
|---|---|---|
| `/aipd` | 第一次进入项目、查看状态或不知道该从哪里开始 | 初始化或加载最小认知，并路由到下一能力 |
| `/aipd-case` | 要完成一个有边界、需要验证和关闭的目标 | 推进 Case Contract / Think / Design / Execute / Verify / Close |
| `/aipd-weave` | 已完成的工作产生了稳定新知识 | 回写 `_adoc`、map 或局部 README |

### 认知维护

| Skill | 什么时候用 | 结果 |
|---|---|---|
| `/aipd-inbox` | 只想先记下一条未整理的信息 | 放进临时收件箱，不提前污染长期知识 |
| `/aipd-update` | 已接入项目需要升级 AIPD 结构 | 审计差异，确认后安全合并新模板和入口 |
| `/aipd-learn` | 要让 AIPD 框架自身吸收真实协作经验 | 定位会话或生成框架回流包；不替代项目 Weave |

### 专用协作

| Skill | 什么时候用 | 结果 |
|---|---|---|
| `/aipd-okr` | 查看或维护飞书 OKR，并与 Case 对齐 | 获得压缩后的 OKR 经验包，或执行已确认的远端操作 |
| `/aipd-mermaid` | 需要创建、修改、评审或明确渲染 Mermaid 图 | 得到可维护的架构图源码或按需预览 |
| `/aipd-git-push` | 只需要检查并推送当前分支 | 推送当前分支；不自动 add、commit、merge 或 rebase |

旧的 `aipd-case-create`、`aipd-case-run`、`aipd-case-archive` 已合并进 `/aipd-case`。

完整职责和组合方式见 [Skill 概览](docs/modules/skills-overview.md)。

## 四个核心判断

### 认知不是代码注释的加长版

代码回答“现在怎么实现”；AIPD 还要保存“为什么这样做、边界在哪里、哪些东西不能顺手改掉”。长期认知、流程状态和真实代码分别保存，避免相互污染。

### Map-first，不是把整个仓库塞进上下文

AIPD 不追求一个无限长的提示词。它先让 map 暴露高频入口，再按当前任务加载最小必要上下文。路径不清时才搜索，发现稳定路径后再修地图。

### 文件优先，不是每句话都要落盘

聊天是高带宽协作区，文件是可恢复事实源。只有会影响后续方向的目标、确认、open / assumed、停止条件、当前游标和验收结果需要 checkpoint；闲聊与未采纳想法不进入知识库。

### Work Package 不等于子 Agent

Work Package 定义可执行、可恢复、可验收的目标边界。是否派 Child Agent 是另一项运行时判断：只有上下文隔离、真实并发或独立复核的收益高于启动、协调和合并成本时才派发。

## 进阶方向：上下文解耦

当 Agent 深度参与开发后，代码组织本身也可能需要变化。

AIPD 倾向让页面、接口、组件或目标包形成局部自足的纵向黑箱，减少为了理解一次改动而跨越大量共享层。它把优先级从“先消灭重复”调整为“先降低牵连面，再判断是否抽象”：

> Decouple first, DRY later.

这是一套可渐进采用的设计思想，不是使用 AIPD 的前置条件。详见[上下文解耦](docs/modules/context-decoupling.md)和仓库中的[实践经验源码资产](experience-assets/README.md)。

## 适合谁

AIPD 更适合：

- 已经让 Agent 参与多文件、跨模块或长周期开发的项目。
- 有业务语言、历史取舍、权限规则、第三方约定等“代码之外事实”的项目。
- 需要任务中断恢复、多 Agent 协作、验收闭环和经验沉淀的团队或个人。

AIPD 可能太重：

- 只有几个文件、做完即弃的一次性原型。
- 任务可以在一次短对话中完成，也没有长期认知需要继承。
- 团队不愿维护任何稳定事实源，只希望 Agent 每次从仓库重新猜。

AIPD 可以从最小的 index + map 开始，不要求第一天就采用完整体系。

## 继续学习

- **想先完成一次**：读[第一次完整使用 AIPD](docs/guide/06-first-complete-flow.md)。
- **想系统理解**：从[为什么 Agent Coding 需要项目记忆](docs/guide/01-from-vibe-coding-to-agent-coding.md)开始六章学习路径。
- **正在工作中查能力**：进入[学习文档索引](docs/README.md)的“按问题查阅”。
- **要维护 AIPD 源码**：先读[构建与安装](docs/modules/build-and-install.md)，再从项目 `_adoc/map.md` 路由到当前 Skill、平台与脚本入口。

## 仓库结构

```text
AIPD/
├── README.md          # 项目首页：第一次理解和决策
├── docs/              # 面向用户的学习、解释和参考
├── _adoc/             # AIPD 仓库自身给 Agent 读取的项目认知
├── aipd-skill/        # Skill 源码、平台适配、脚本与构建产物
├── experience-assets/ # 可验证的实践经验源码；不随 Skill 安装
└── aipd-desktop/      # 规划中的增强客户端，不是基础运行前提
```

Codex 与 Claude Code 的构建适配位于 `aipd-skill/src/platforms/`。`aipd-skill/dist/` 是生成产物，不是源码事实源。

# AIPD

**让每一次 AI 开发都建立在上一次之上，而不是重新理解整个项目。**

新的 Agent 进入项目时，不该还要你重新解释项目为什么这样设计、任务做到哪里、哪些办法已经试过。它应该能继承三类已经留下的成果，接着推进：

- **项目判断与边界**：为什么这样做，哪些规则不能只靠代码形状猜。
- **当前任务状态**：目标、已确认结论、真实进度和下一步。
- **已验证经验**：哪些方案有效，哪些坑不必再踩一次。

这些能被维护、读取和继续更新的内容，就是项目记忆。AIPD 是一套面向 AI 协作的软件开发框架：它不替代 Codex，也不保证 Agent 永不出错；它让 Agent 少一些重新解释和猜测，让每轮完成的工作成为下一轮的起点。

[五分钟开始](#五分钟开始) · [完整学习路径](docs/README.md) · [Skill 循环](#九个公共-skill一套循环) · [构建与安装](docs/modules/build-and-install.md)

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
  AGENTS.md -> _aipd/index.md -> _aipd/map.md
                              -> Knowledge / 局部 README / 真实代码

任务中：让目标和状态留在文件里
  Case Contract -> Think -> Design -> Execute -> Verify -> Close
                                  -> Work Package -> Main / Child Agent

任务后：把稳定经验留给下一次
  Close 候选 -> Weave -> Knowledge / map / 局部 README
```

这不是要求把项目写成文档海洋。AIPD 只保留两类真正有用的信息：

- 代码难以表达、但会长期影响判断的项目认知。
- 压缩或中断后，继续完成当前目标所必需的运行状态。

聊天仍然用来协作，搜索仍然用来探索，代码仍然是最终实现；AIPD 负责让它们不再彼此失联。

## 为什么升级后的体系更可靠

AIPD 不靠一段越来越长的提示词维持连续性，而是用几组可检查的文件合同减少“看错、忘记、写错位置”：

- **先验身份与版本**：`_aipd/manifest.json` 区分 Workspace Schema 和项目已应用的 AIPD 版本；AIPD Workspace 读写入口先做安全 gate，旧版、漂移、双根或 symlink 冲突不会被静默猜测。
- **先路由再读取**：Agent 从 `_aipd/map.md` 找到本任务最小但足够的 Knowledge、SOP、局部 README 和代码入口，不默认吞下整个知识库。
- **先写恢复点再长执行**：会改变方向的确认、假设、当前游标、停止条件和验收结果写成 checkpoint；聊天压缩、任务中断或 Agent 交接后仍能继续。
- **不同事实各有 owner**：长期知识、Case 状态、可复用 SOP、真实代码和局部 README 分开维护；Update、Weave、Leader 和 Child Agent 也都有明确的写入与权限边界。

可靠不等于自动做更多事。安装、发布、删除、付费和远端写入仍然遵循用户授权；AIPD 只是让 Agent 更清楚现在该读什么、能改什么、完成后怎样证明。

## 五分钟开始

AIPD 当前是一个可构建的 Skill 源码项目，不是双击即用的应用。当前默认构建并验证 Codex 产物。

### 1. 构建并安装九个公共 Skill

在本仓库运行：

```bash
./aipd-skill/scripts/build
./aipd-skill/scripts/check-dist
./aipd-skill/scripts/install
```

`build` 生成 Codex 产物，`check-dist` 只读校验，`install` 会重新构建并把公共 Skill 与 Agent 复制到用户级 Codex 目录。安装会改写 Agent 运行环境，只应在你明确确认后执行；项目级安装、开发 symlink 和显式 `*-codex` 别名见[构建与安装](docs/modules/build-and-install.md)。

如果你更希望交给 Agent 完成，也可以用 Codex 打开本仓库，要求它先读 `AGENTS.md`、`_aipd/index.md` 和 `_aipd/map.md`，build 验证后再询问你是否 install。

### 2. 在目标项目初始化 Schema v2

在目标项目里调用：

```text
/aipd
```

如果项目还没有 AIPD，Agent 会创建 `_aipd/manifest.json`、index、map、五类 Knowledge，以及 Case、Inbox、OKR、SOP 等入口；验证完成后，manifest 同时记录 Schema v2 和当前已应用的 AIPD 版本。初始化不是让你一次填完所有知识，而是先建立一条能使用、能升级、以后可持续维护的路径。

`/aipd` 还会让你选择是否安装项目 `AGENTS.md`：Level 1 添加 AIPD 项目入口；可选的 Level 2 再添加项目级 Interaction Protocol，明确讨论与执行的回复节奏。它只约束当前项目，不是全局人格设置。

### 3. 用 `/aipd-case` 完成一个真实目标

不用先背目录结构，也不用手写模板。直接描述你当前要完成的事：

```text
/aipd-case 创建一个 Case：把现有登录流程增加邮箱验证码，
先确认边界和风险，再完成实现、验证和归档。
```

Agent 会把目标、要做、不做、验收标准和上下文索引写进 Case Contract；需要调研时进入 Think，需要固化方案时进入 Design，执行完成后再 Verify 和 Close。

### 4. 用 `/aipd-weave` 留下已验证经验

Case 关闭并验收后调用：

```text
/aipd-weave 检查这个已关闭 Case，把值得复用的稳定结论写回项目。
```

Weave 会先区分长期事实和一次性过程，给出回写方案，等你确认后才修改 Knowledge、map、SOP 或局部 README。到这里，你已经完成第一个“读对上下文 -> 文件化执行 -> 验证后回写”的闭环。完整实践见[第一次完整使用 AIPD](docs/guide/06-first-complete-flow.md)。

已有 AIPD 项目可用 `/aipd-update` 更新到**本机已安装**的发布快照：它读取项目版本、完整版本记录和当前权威文档后一次收敛，也能修复同版本 drift，不联网追逐远端最新版。仍使用 `_adoc/` 与 L1-L5 的旧项目必须先走一次性迁移；AIPD 不会双读或覆盖初始化，详见[旧项目一次性迁移](docs/modules/build-and-install.md#旧项目一次性迁移)。

## 一次完整闭环里发生了什么

### 1. 项目认知有自己的位置

`_aipd/knowledge/` 保存代码里不容易表达的长期认知：方向、外部世界、核心模型、产品规则和跨模块工程约定。真实代码继续留在项目源码目录，不在 Knowledge 中复制一份“伪代码层”。

`_aipd/map.md` 是 Agent 的第一跳。它把“会员导出”“权限”“某个弹窗”等用户语言，路由到该读的 Knowledge、SOP、局部 README 和代码入口。全文搜索是兜底；搜索发现了稳定入口，再把入口写回 Map。

Map 有三种分辨率：项目总图、业务线 / 功能线 / shared capability 的上下文 Map、代码就近局部实现图。三级表示范围精度，不是必须逐层点击的固定流程；高频任务可以从项目总图直接命中局部入口。

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

- 用户确认的长期方向与边界进入 `knowledge/intent`。
- 带来源和时间边界的稳定外部结论进入 `knowledge/research`。
- 新核心概念进入 `knowledge/core`。
- 新产品边界进入 `knowledge/product`。
- 新跨模块实现规则进入 `knowledge/engineering`。
- 页面或组件入口进入就近 README。
- 高频检索路径进入 map。
- 一次性过程继续留在 Case / Work Package。

这让下一次 Agent 继承的是经过验证的项目事实，而不是整段聊天历史。

## 九个公共 Skill，一套循环

公共 build、dist 和 install 集合里**正好只有下面九个 Skill**。它们按使用时机分组，不是九步固定流水线。

### 显式主导层

| Skill | 什么时候用 | 结果 |
|---|---|---|
| `$aipd-leader` | 希望把当前对话提升为项目 Leader，由它探索方向并调度多个 Case | 一个 active Mission；每个 Case 对应一个独立 Codex 任务；Leader 负责总验收 |

Leader 绝不自动启动。普通 AIPD 仍从 Case 执行层开始；只有用户主动调用 `$aipd-leader`，当前对话才承担项目主导职责。Leader 可以在已确认的 Mission 内协调 Case 任务，但不会扩大安装、发布、删除、付费或远端写入权限。当前 Agent 平台的目标模式 / goal 模式跟这条对话的身份走：Leader 对话绑 Mission，普通执行对话绑当前 Case。

### 主循环

| Skill | 什么时候用 | 结果 |
|---|---|---|
| `/aipd` | 第一次进入项目、查看状态或不知道该从哪里开始 | 初始化或加载最小认知，并路由到下一能力 |
| `/aipd-case` | 要完成一个有边界、需要验证和关闭的目标 | 推进 Case Contract / Think / Design / Execute / Verify / Close |
| `/aipd-weave` | 已完成的工作产生了稳定新知识 | 回写 Knowledge、map 或局部 README |

### 认知维护

| Skill | 什么时候用 | 结果 |
|---|---|---|
| `/aipd-inbox` | 只想先记下一条未整理的信息 | 放进临时收件箱，不提前污染长期知识 |
| `/aipd-update` | 已接入项目需要升级到本机 AIPD 版本，或修复同版本结构漂移 | 读取版本演进和当前权威文档，一次语义收敛并记录结果；仅破坏性或歧义冲突暂停 |

### 专用协作

| Skill | 什么时候用 | 结果 |
|---|---|---|
| `/aipd-okr` | 查看或维护飞书 OKR，并与 Case 对齐 | 获得压缩后的 OKR 经验包，或执行已确认的远端操作 |
| `/aipd-mermaid` | 需要创建、修改、评审或明确渲染 Mermaid 图 | 得到可维护的架构图源码或按需预览 |
| `/aipd-git-push` | 只需要检查并推送当前分支 | 推送当前分支；不自动 add、commit、merge 或 rebase |

旧的 `aipd-case-create`、`aipd-case-run`、`aipd-case-archive` 已合并进 `/aipd-case`。

完整职责和组合方式见 [Skill 概览](docs/modules/skills-overview.md)。

## 仓库级自迭代（不在公共安装包内）

| Skill | 什么时候用 | 结果 |
|---|---|---|
| `$aipd-learn` | 仅在 AIPD 源码仓库内，让框架吸收真实协作经验 | 诊断 transcript、Case 或用户反馈；确认后回写 AIPD 自身 |

`aipd-learn` 位于 `.agents/skills/aipd-learn/`，由 Codex 在这个仓库内直接发现。它是 AIPD 自身的框架迭代入口，**不是第十个公共 Skill**：不进入 `aipd-skill/src/skills/`、build、dist、用户级安装或业务项目。外部项目的框架反馈应带回 AIPD 源码仓库处理；业务项目自己的知识回写使用 `/aipd-weave`。

## 四个核心判断

### 认知不是代码注释的加长版

代码回答“现在怎么实现”；AIPD 还要保存“为什么这样做、边界在哪里、哪些东西不能顺手改掉”。长期认知、流程状态和真实代码分别保存，避免相互污染。

### Map-first，不是把整个仓库塞进上下文

AIPD 不追求一个无限长的提示词。它先让 map 暴露高频入口，再按当前任务加载最小必要上下文。路径不清时才搜索，发现稳定路径后再修地图。

### 文件优先，不是每句话都要落盘

聊天是高带宽协作区，文件是可恢复事实源。只有会影响后续方向的目标、确认、open / assumed、停止条件、当前游标和验收结果需要 checkpoint；闲聊与未采纳想法不进入知识库。

### Work Package 不等于子 Agent

Work Package 定义可执行、可恢复、可验收的目标边界。是否派 Child Agent 是另一项运行时判断：只有上下文隔离、真实并发或独立复核的收益高于启动、协调和合并成本时才派发。

## 进阶方向：AI 友好代码拓扑

当 Agent 深度参与开发后，代码组织本身也可能需要变化。

AIPD 不主张把代码全面纵向化。真实项目通常同时包含：

- **横向基座**：框架、基础设施和全局工程能力。
- **横向共享能力**：已经有多个真实使用者、稳定语义和清楚契约的共用模块。
- **纵向业务上下文**：页面、接口、组件或目标包形成的局部自足单元。

它们通过显式输入输出、事件或协议组合。AIPD 优先降低一次修改需要跨越的上下文和牵连面，再判断是否把重复上移为 shared：

> Decouple first, DRY later.

这是一套可渐进采用的设计思想，不是使用 AIPD 的前置条件。Case Design 只在模块边界、shared 上移、跨上下文依赖或组合协议发生变化时形成具体的 Code Topology Contract。详见[上下文解耦](docs/modules/context-decoupling.md)和仓库中的[实践经验源码资产](experience-assets/README.md)。

## 适合谁

AIPD 更适合：

- 已经让 Agent 参与多文件、跨模块或长周期开发的项目。
- 有业务语言、历史取舍、权限规则、第三方约定等“代码之外事实”的项目。
- 需要任务中断恢复、多 Agent 协作、验收闭环和经验沉淀的团队或个人。

AIPD 可能太重：

- 只有几个文件、做完即弃的一次性原型。
- 任务可以在一次短对话中完成，也没有长期认知需要继承。
- 团队不愿维护任何稳定事实源，只希望 Agent 每次从仓库重新猜。

日常使用可以只从 index + map 进入，不要求第一天就把所有 Knowledge、Case、SOP 或进阶拓扑方法填满。

## 继续学习

- **想先完成一次**：读[第一次完整使用 AIPD](docs/guide/06-first-complete-flow.md)。
- **想系统理解**：从[为什么 Agent Coding 需要项目记忆](docs/guide/01-from-vibe-coding-to-agent-coding.md)开始六章学习路径。
- **正在工作中查能力**：进入[学习文档索引](docs/README.md)的“按问题查阅”。
- **要维护 AIPD 源码**：先读[构建与安装](docs/modules/build-and-install.md)，再从项目 `_aipd/map.md` 路由到当前 Skill、平台与脚本入口。

## 仓库结构

```text
AIPD/
├── AGENTS.md          # 本仓库的 AIPD Agent Entry 与交互协议
├── README.md          # 项目首页：第一次理解和决策
├── docs/              # 面向用户的学习、解释和参考
├── _aipd/             # 本项目工作区：Knowledge、Map、Case、SOP、OKR、Inbox 等
├── .agents/skills/
│   └── aipd-learn/    # 仓库级框架自迭代；不进入公共安装
├── aipd-skill/        # 九个公共 Skill 的源码、平台适配、脚本与构建产物
└── experience-assets/ # 可验证的实践经验源码；不随 Skill 安装
```

当前 Codex 适配与通用平台扩展结构位于 `aipd-skill/src/platforms/`。`aipd-skill/dist/` 是生成产物，不是源码事实源。

# AIPD - AI 原生软件开发框架

学习 AIPD：从 [学习文档入口](docs/README.md) 开始。

AIPD 不是 Vue、Next 或 Spring 这样的代码框架。它面向的是 AI Agent 深度参与的软件开发过程：把项目知识、上下文检索、任务执行、Agent 协作和经验回写组织成一套可持续运转的开发框架。

一句话：**AI Agent 负责执行，AIPD 负责让项目记住自己。**

## AIPD 解决什么问题

AI Agent 已经能写很多代码，但真实项目的难点经常不是“生成代码”，而是上下文管理：

- Agent 进入项目后，不知道这个项目为什么长成现在这样。
- 代码能说明现在怎么做，但很难说明历史原因、产品边界和长期取舍。
- 聊天记录会断，Issue 和 PR 太碎，README 通常只写安装和入口。
- 一次任务聊久了以后，需求、猜测、否定、临时方案和稳定判断混在一起。
- Agent 改一个共享方法时，可能不知道外部有多少地方依赖它的隐含语义。
- 做完一次任务后，如果经验不回写，下一次 Agent 还是会重新踩坑。

AIPD 的核心目标，是让项目不只拥有代码源码，还拥有一套 AI 可用的认知源码。

## 三条主线

AIPD 可以按三条主线理解。Case 现在采用统一生命周期：先定短周期目标，再按需 Think、Design、Execute、Verify 和 Close。

### 1. 知识库最小闭环

项目需要一套长期知识库，记录方向、外部世界、核心模型、产品边界、工程规则和代码入口。

这一层包含：

- 知识库本体：L1-L5，必要时索引到 L6 真实代码。
- 存：通过初始化编织和 Weave / 反向编织维护项目认知。
- 取：通过 `_adoc/map.md` 从自然语言路由到相关文档和代码入口。

### 2. Case / Work Package 开发逻辑

大任务不能只靠聊天上下文推进。

Case 把一次马上要完成的事项固定成短周期目标容器：目标、边界和验收标准写入 `case.md` 的 Case Contract，再按 Think / Design / Execute / Verify / Close 推进。Step 的语义调整为 Work Package：它不是微步骤，而是围绕设计边界的可执行、可恢复、可验收目标包。飞书 OKR、分身 Agent、执行记录、归档和 Weave Candidate 都围绕这条执行线工作。

### 3. AI 原生代码架构实验

当 Agent 深度参与开发后，代码组织本身也可能需要变化。

传统代码常常按横向职责分层；AI 做局部任务时，更需要输入、处理、业务判断、输出和验收口径尽量贴近的纵向黑箱。这条主线关注上下文解耦、降低牵连面和 Decouple first, DRY later。

这是 AIPD 的探索方向，不是必须一次性采用的硬规范。

## 核心能力

| 能力 | 作用 |
|---|---|
| `_adoc/` | 项目认知事实源，记录代码里不容易表达的方向、模型、边界、规则和经验 |
| `map` | 第一跳检索，把用户自然语言路由到 L3 / L4 / L5 / 局部 README / 代码入口 |
| `Case / Work Package` | 把短周期目标变成可恢复、可派发、可验收的文件事实源 |
| `Case Think / Design` | 在 case 内完成必要调研、抉择和复杂度爆点解耦设计 |
| 分身 Agent | 进入局部探索或执行分支，消化搜索、验证、日志和 diff 等过程成本 |
| Weave | 把稳定经验回写到 `_adoc`、局部 README、map 或 case 记录 |
| Inbox | 临时接住未整理思路，后续再判断 weave、转 case 或丢弃 |
| OKR | 管理飞书阶段目标，帮助判断 case / work package 是否推进项目方向 |

详细学习路径见 [docs/README.md](docs/README.md)。

## 快速开始

AIPD 这个仓库本身不是一个“打开即用”的应用。

它是 **AIPD Skill 的打包源码项目**：源码在本仓库里，最终使用时需要由本地 Agent 把它打包成 Skill，并放到本机对应 Agent 的 Skill 目录下。

这件事不应该要求用户手工记命令。用户只需要用 Codex、Claude Code 或其他支持 Skill 的 Agent 打开本项目，然后把目标说清楚：

```text
请阅读本仓库的项目说明和 AIPD 认知，把 AIPD 打包并安装到我本机可用的 Skill 目录。
```

相关入口：

- `AGENTS.md`：Agent 进入项目后的默认协作规则。
- `_adoc/index.md`：AIPD 仓库自身的项目认知入口。
- `_adoc/map.md`：把“构建 / 安装 / Codex 适配 / Skill”这类任务路由到具体上下文。
- `aipd-skill/scripts/`：实际构建、开发安装、用户级安装和项目级安装脚本。

安装完成后，在目标项目里让 Agent 使用：

```text
/aipd
```

如果目标项目还没有 AIPD 结构，`/aipd` 会引导初始化 `_adoc/`、`AGENTS.md` 和基础索引。

如果目标项目已经初始化，`/aipd` 会读取项目认知入口，判断当前状态，并把你导向合适的下一步：创建 case、执行 case、更新 AIPD 架构、编织经验，或继续普通开发任务。

## 包含的 Skill

| skill | 命令 | 作用 |
|---|---|---|
| `aipd` | `/aipd` | 总入口：识别项目状态，加载轻量认知，引导下一步 |
| `aipd-case` | `/aipd-case` | 统一推进 case：Case Contract / Think / Design / Execute / Verify / Close |
| `aipd-weave` | `/aipd-weave` | 把稳定经验回写到 ADOC、局部 README、map 或 case |
| `aipd-inbox` | `/aipd-inbox` | 临时接住未整理思路，后续再判断归属 |
| `aipd-learn` | `/aipd-learn` | 采集会话定位信息，辅助 AIPD 框架自迭代 |
| `aipd-okr` | `/aipd-okr` | 查看、同步或操作飞书 OKR，并生成压缩 OKR 经验包 |
| `aipd-update` | `/aipd-update` | 更新已初始化项目中的 AIPD 架构、AGENTS 和 map |
| `aipd-git-push` | `/aipd-git-push` | 检查当前分支和提交状态，并推送远端 |
| `aipd-mermaid` | `/aipd-mermaid` | 创建、修改、评审或按需渲染 Mermaid 架构图 |

旧 `aipd-case-create`、`aipd-case-run`、`aipd-case-archive` 已合并进 `aipd-case`，不再作为独立 skill 构建。旧 case 结构需要先迁移为 phase-first case，再继续推进。

旧 `/aipd2*` 命令不再作为主入口；重新运行安装脚本会移除本机残留的旧 `aipd2*` skill，后续统一使用 `/aipd*`。

更完整的 skill 职责说明见 [Skill 概览](docs/modules/skills-overview.md)。

## 给 Agent 的执行入口

本仓库保留了构建和安装脚本，但 README 不把它们当成给用户背诵的操作手册。

如果要安装、调试或更新 AIPD，建议直接让 Agent 打开本项目，并说明目标：

```text
请把这个 AIPD Skill 源码项目构建并安装到本机 Codex。
```

或：

```text
请修改 AIPD 源码后，按本项目规则重新构建，并告诉我是否需要重新安装。
```

Agent 应先读取 `AGENTS.md`、`_adoc/index.md` 和 `_adoc/map.md`，再根据任务进入 `aipd-skill/scripts/`、`aipd-skill/src/skills/`、`aipd-skill/src/platforms/` 等代码入口。用户只需要关注目标、验收结果和风险，不需要记住具体打包命令。

开发者需要查看脚本和安装细节时，读 [构建与安装](docs/modules/build-and-install.md)。

## 项目结构

```text
AIPD-2/
├── _adoc/             # AIPD 仓库自身的项目认知
├── aipd-skill/        # AIPD Skill 本体源码、脚本和构建产物
│   ├── src/
│   │   ├── core/       # AIPD 核心认知、模板和通用规则
│   │   ├── platforms/  # Codex / Claude Code 等平台适配
│   │   └── skills/     # 各个 skill 的源码
│   ├── scripts/        # 构建、开发安装、用户安装和项目安装脚本
│   ├── modules/        # Skill 相关模块材料，当前为空
│   └── dist/           # Skill 构建产物
├── docs/              # 面向用户的学习文档
└── aipd-desktop/      # 未来 AIPD Desktop，c0.8 创建
```

## 适合什么时候用

AIPD 适合那些已经开始让 AI 深度参与开发，但发现“上下文管理”比“生成代码”更难的项目。

如果项目只有几个文件，或者只是一次性原型，AIPD 可能太重。

如果项目会持续迭代，有业务语言、历史取舍、跨模块规则、多 Agent 执行、长期任务恢复和经验沉淀需求，AIPD 会更有价值。

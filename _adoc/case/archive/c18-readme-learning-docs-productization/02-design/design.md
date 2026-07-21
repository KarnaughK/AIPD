# Design：README 与学习文档产品化

## Design Intake

- **Case 类型**：docs / process，research-to-implementation。
- **Design 模式**：quick。
- **缺口类型**：外部调研已完成；当前缺口是把新叙事主线转为 brownfield 文件边界、页面职责和可验收工作包。
- **所需角色**：Main Agent 连续完成。内容判断与源码事实校准高度耦合，当前没有值得隔离的高噪声证据面，也没有需要独立角色固化的产品规则。
- **独立 artifact**：本文件承载 requirements、brownfield、用户路径、文件边界和 readiness；不创建 backend / frontend / edge-case 文档。

## Requirements Contract

### confirmed

- 文档本身是一个小产品，同时承担吸引目标用户、解释 AIPD 和帮助第一次上手三项任务。
- 先盘点当前 Skill、核心理念和实现原理，再参考优秀开源项目文档方法。
- 根 `README.md` 与整套 `docs/` 学习文档都要更新。
- 不以逐对象“是什么 / 干什么”的 API 字典作为首次学习主线。
- 当前仓库事实、脚本、平台边界和九个 Skill 是文案约束，不允许为吸引力夸大。

### assumed

- 主要读者已经在使用 Codex、Claude Code 或其他能读写仓库并支持 Skill / 指令文件的 Coding Agent。
- 第一次实践基于一个已有或即将持续迭代的代码项目；一次性小原型不是主要用户。
- 当前仍以 Markdown / GitHub 阅读体验为交付载体，不引入文档站交互能力。

### open

- 无阻塞级 open question。

### 不允许固化的假设

- 不声称 AIPD 已支持所有 Agent 平台；当前明确说明源码包含 Codex / Claude 构建适配，其他平台取决于 Skill 能力。
- 不声称安装 AIPD 后项目认知会自动完整生成；初始化只建立结构，认知需要在真实任务中维护。
- 不把规划中的 Desktop、壳子状态的 SOP 或实验性 AI 原生代码架构写成成熟必选能力。

## Brownfield Delta

### 当前事实

- 根 README 已包含正确的核心问题、九个 Skill、基本安装方式和项目结构，但主叙事仍以“三条主线”组织，Quick Start 没有带到第一次可见价值。
- `docs/README.md` 是六篇 guide + modules 导航；guide 更像按顺序解释六组概念，完整实践直到最后一篇才出现。
- modules 有较完整材料，但存在 Case 前 Think、step、分身默认化、“三条主线关系”等过时表述。

### MODIFIED

- `README.md`：重写为项目决策页，用“项目记住自己”与三段循环表达价值；补最短体验、真实能力、原理、适用边界和学习分流。
- `docs/README.md`：重写为学习入口，明确先体验、连续学习、按需查阅三种路径。
- `docs/guide/*.md`：保留六个稳定路径，改成一门连续课程；每篇有本章目标、承接关系、真实操作 / 例子和下一步。
- `docs/modules/*.md`：校准过时术语和能力边界；每篇承担 explanation / reference，而不是首次教程。

### ADDED

- 不新增新的正式文档文件；通过现有结构完成最小必要改造。

### REMOVED

- 从主导航和主叙事中移除“三条主线是首次理解唯一入口”的表达。
- 从持久化流程中移除 Case 前独立 Think、step 微步骤和子 Agent 默认派发语义。

### 不能破坏的旧行为

- 保留现有 README / guide / modules 路径，避免已有 GitHub 深链接失效。
- 保留 `_adoc` 面向 Agent、`docs` 面向用户、根 README 面向首次决策的长期分工。
- 保留源码仓库不是开箱即用应用、安装会改变 Agent 环境且需明确执行的边界。

## 用户旅程与信息架构

### 根 README：第一次决策

1. Hero：一句话价值与三个可见结果。
2. 痛点：为什么 Agent 能写代码，项目仍会失忆。
3. 心智模型：任务前读对、任务中承接、任务后回写。
4. 五分钟开始：让 Agent 构建安装 -> `/aipd` 初始化 / 读状态 -> 用自然语言创建第一个 Case。
5. 一次真实闭环会发生什么：Map-first、Case phases、Weave。
6. 九个 Skill 按“主循环 / 维护 / 专用辅助”分组，而不是平铺命令表。
7. 核心原理：认知与代码分层、文件优先、上下文解耦、运行时调度。
8. 适合 / 不适合与下一步阅读分流。

### Guide：一条可以顺读的课程

| 文件 | 新职责 | 学完后的结果 |
|---|---|---|
| `01-from-vibe-coding-to-agent-coding.md` | 用一个“Agent 重复猜项目”的故事建立问题 | 理解为什么代码、聊天和搜索不能单独承接项目记忆 |
| `02-aipd-three-main-lines.md` | 从旧“三条主线”升级为 AIPD 完整记忆循环 | 能画出任务前 / 中 / 后以及各事实源的位置 |
| `03-knowledge-base-minimum-loop.md` | 第一次初始化和 Map-first 读取 | 建立最小 `_adoc` 并知道它不是一次性填满的表格 |
| `04-case-step-development.md` | 第一个 Case 从 Contract 到 Close | 能用文件状态推进一次真实目标并理解 Work Package / Goal Mode / Main-Child |
| `05-ai-native-code-architecture-experiment.md` | 任务结束后的 Weave 与进阶上下文解耦 | 能区分当前项目学习、框架 Learn 与代码架构实验 |
| `06-first-complete-flow.md` | 把完整路径压成可直接照做的操作卡 | 能在新项目里开始第一轮，并知道去哪里深入 |

### Modules：工作时按需进入

- `adoc-layers`、`maps-and-retrieval`、`agent-entry`：项目如何被读懂。
- `case-and-step`、`think`、`clone-agents`、`okr`：目标如何被推进和恢复。
- `weave`、`inbox`、`skills-overview`：信息如何捕获、回写和路由。
- `context-decoupling`：为什么 AIPD 倾向低牵连、局部自足的任务与代码边界。
- `build-and-install`：维护者和源码使用者的命令参考。

## 复杂度爆点与最小必要解耦

- **复杂度爆点**：同一组 Skill / 概念既需要在首页被看见，又要在教程中被理解，还要在工作时可查；复制三份完整说明会快速漂移。
- **最小必要解耦**：README 只承诺价值和入口；guide 用完整任务说明关系；modules 保持单一能力事实与边界。三层通过链接复用，不通过复制长定义复用。
- **主干职责**：`docs/README.md` 只维护用户分流和课程顺序，不承载各能力正文。
- **允许的局部重复**：核心循环和一句话能力定义可在 README / guide / module 重复，以换取独立进入页面时的可理解性。
- **禁止**：把九个 Skill 的全部规则、Case 模板字段或构建脚本细节堆回根 README；把学习路径重新写成模块目录的线性朗读。

## 文件计划

- `README.md` - 项目首页 / 决策页。
- `docs/README.md` - 学习产品入口与路径分流。
- `docs/guide/*.md` - 六章连续课程。
- `docs/modules/*.md` - 当前能力 explanation / reference，重点修正 `think`、`case-and-step`、`clone-agents`、`okr`、`inbox`、`skills-overview`，其余做一致性校准。

## Work Package Draft

### wp-01：重建首页与连续学习主线

- 修改 `README.md`、`docs/README.md`、`docs/guide/*.md`。
- 验收：从 README 可在两次点击内进入快速体验或完整课程；六篇 guide 顺读不要求先查 modules；当前 Case 与 Map-first 模型准确。

### wp-02：校准能力模块与源码事实

- 修改 `docs/modules/*.md` 中过时、缺失或角色不清的内容。
- 验收：九个 Skill、Case phases、Goal Mode、Main / Child、Weave / Learn、构建安装和实践经验边界与源码一致；没有旧 step / Case 前 Think 作为现行规则。

## Readiness Gate

- **需求 open**：无。
- **assumed 固化风险**：已列入护栏；不夸大平台、初始化和实验能力。
- **Brownfield delta**：文件与不能破坏的路径已明确。
- **后端 / 前端缺口**：不适用。
- **文件边界**：README / guide / modules 职责清楚，两个工作包无写入冲突但按依赖顺序执行。
- **Verify 入口**：Markdown 内部链接、相对路径、旧术语、Skill 清单、脚本命令、目录结构、顺读体验、`git diff --check`。
- **状态**：passed。

## Design Checkpoint

- **当前节点**：readiness-gate。
- **节点状态**：completed。
- **confirmed**：用户旅程、页面职责、brownfield delta、两个工作包、验收入口。
- **assumed**：目标读者与 Markdown 载体假设保留为文案边界，不影响执行。
- **open**：无。
- **下一步**：进入 Execute，创建并依次完成两个正式 Work Package。
- **恢复入口**：`case.md#当前焦点` -> 本文件 `#work-package-draft` -> `03-execute/execute.md`。

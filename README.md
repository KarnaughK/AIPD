# AIPD2 - 面向 AI 协作的软件项目认知框架

把软件项目的经验和决策结构化沉淀，让 AI 基于项目认知持续、准确地参与开发。

这是一个可构建的 skill 工程，通过 `scripts/build` 将源码打包为可安装的 Claude Code / Codex skill。当前优先适配 Codex。

---

## 项目定位

AIPD2 不是为了替代某个 AI Coding Agent，也不是另一套“让 AI 更有章法地做事”的通用工作流。

从长远看，通用 Agent 会持续吸收更好的开发方法：先澄清需求、拆分任务、写测试、审查代码、管理分支、总结结果。这类能力会逐渐内建到 Claude Code、Codex、GA、爱马仕等通用或专用开发 Agent 里。Superpowers 这类工具的价值也主要在这一层：给 Agent 补充一套可执行的开发纪律。

AIPD2 关注的是另一层：**项目认知**。

代码只能告诉 AI “现在是怎么做的”，但很难告诉 AI “为什么当初要这么做”。聊天记录会丢失，Issue 和 PR 太碎片，README 通常只写入口信息。AIPD2 通过 `_adoc/` 把项目方向、用户场景、产品边界、架构原因、技术取舍和执行经验沉淀成 AI 可以稳定读取的上下文。

因此，AIPD2 更像是项目的长期记忆层：

- Agent 执行任务前，读取项目认知，避免从零猜测业务背景。
- Agent 执行任务时，按 Case 的上下文索引校准读取边界。
- Agent 执行任务后，把新的判断、踩坑和决策回写到项目认知。
- 下一个 Agent 不需要继承上一段聊天，但可以继承项目记忆。

和常见工具的关系可以粗略理解为：

| 工具 / 层次 | 主要解决的问题 |
|-------------|----------------|
| Superpowers | AI 做事流程不稳定，需要开发纪律 |
| OpenSpec | 单次变更缺少可审查的规格和任务边界 |
| Claude Code / Codex / GA / 爱马仕等 Agent | 具体执行、工具调用和平台能力 |
| AIPD2 | 项目长期上下文、历史原因和经验沉淀 |

这些东西并不冲突。AIPD2 可以给任何 Agent 提供项目上下文，也可以和 Superpowers / OpenSpec 这类流程或规格工具一起使用。

---

## 分身 Agent 模型

AIPD2 的多 Agent 协作不是“主 Agent 派工给低上下文子 Agent”。

更准确的模型是：**分身 Agent 是从主 Agent 当前认知 fork 出来的克隆体**。它继承同一份项目认知、对话背景、任务方向和判断逻辑。主 Agent 只需要告诉它“你是分身 Agent / 克隆体”，并给出当前局部目标；分身看到这个身份后，不再继续分身，而是接着完成当前分支。

主 Agent 留在主线，负责用户沟通、目标边界和最终判断。分身 Agent 去消化扫描代码、核对接口、运行验证、读长日志、整理 diff 等过程成本。完成后，它只把结果回流给主线：

- 结论
- 依据
- 风险
- 建议
- 改动文件
- 验证结果

case-run 不是另一套机制，只是把分身探索的节点固化为 `step`。普通 AIPD 对话、轻量修改、调研、验证和正式 case 都使用同一套分身逻辑。

---

## 项目结构

```
AIPD/
├── src/
│   ├── core/          # 共享知识层（五层认知结构、Case 机制、Agent 协作）
│   ├── platforms/     # 平台覆盖文件（Claude Code / Codex）
│   └── skills/        # 6 个 skill 源码，每个含 SKILL.md
├── scripts/
│   ├── build          # 构建：src/ → dist/
│   ├── dev            # Claude Code 开发模式安装（symlink）
│   ├── install        # Claude Code 用户级安装（~/.claude/skills/）
│   ├── install-project # Claude Code 项目级安装（.claude/skills/）
│   ├── dev-codex      # Codex 开发模式安装（symlink）
│   ├── install-codex  # Codex 用户级安装（~/.codex/skills/）
│   └── install-project-codex # Codex 项目级安装（.codex/skills/）
├── dist/              # 分平台构建产物（gitignore）
└── v1/                # v1 历史归档
```

---

## 包含的 Skill

| skill | 命令 | 职责 |
|-------|------|------|
| aipd2 | `/aipd2` | 总入口：扫描状态，引导下一步 |
| aipd2-case-create | `/aipd2-case-create` | 创建 case，整理上下文索引和步骤 |
| aipd2-case-run | `/aipd2-case-run` | 执行 case，加载上下文并派发分身 Agent |
| aipd2-learn | `/aipd2-learn` | 生成经验回流包，回写项目认知或 AIPD2 框架 |
| aipd2-case-archive | `/aipd2-case-archive` | 归档 case，合并分支 |
| aipd2-git-push | `/aipd2-git-push` | 检查当前分支和提交状态，并推送到远端 |

---

## 安装

```bash
# 开发模式（symlink，build 后自动生效）
git clone <repo> && cd AIPD
./scripts/dev

# 用户级安装（复制到 ~/.claude/skills/）
./scripts/install

# 项目级安装（复制到项目 .claude/skills/）
./scripts/install-project /path/to/your-project

# Codex 开发模式（symlink，build 后自动生效）
./scripts/dev-codex

# Codex 用户级安装（复制到 ~/.codex/skills/）
./scripts/install-codex

# Codex 项目级安装（复制到项目 .codex/skills/）
./scripts/install-project-codex /path/to/your-project
```

---

## 开发

```bash
# 修改源码后重新构建
./scripts/build

# 只构建某个平台
./scripts/build claude
./scripts/build codex

# dev 模式下 build 后自动生效；install 模式需重新 install
```

---

## 核心架构

### 五层认知结构

| 层级 | 名称 | 作用 |
|------|------|------|
| L1 | Intent | AI 理解项目目标，不做偏离方向的事 |
| L2 | Scenario | AI 知道用户痛点，设计有的放矢 |
| L3 | Engine | AI 理解核心数据模型，不破坏架构 |
| L4 | Product | AI 知道功能边界，不越界实现 |
| L5 | Dev | AI 遵守研发规范，代码风格一致 |

### 多 Agent 执行体系

- **主 Agent = 主线负责人**：维护用户沟通、目标边界、最终判断和状态写回
- **分身 Agent = 主 Agent 克隆体**：继承当前认知，进入局部探索分支完成开发 / 调研 / 归档，并回流压缩结果

### Case 执行体系

- **Case**：一次具体事项，记录目标、上下文索引、边界、steps 和归档信息。
- **Step**：Case 内的分身派发节点。它不是替代当前上下文的任务单，而是用于校准边界、恢复状态和沉淀经验。
- **OKR**：阶段目标，用来判断工作是否推进了项目方向。

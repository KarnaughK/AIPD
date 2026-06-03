# AIPD2 - 面向 AI 协作的软件项目认知框架

AIPD2 是一套面向 AI Agent 的项目级上下文框架，把项目认知组织成 Agent 可读取、可检索、可继承、可回写的长期上下文。

这是一个可构建的 skill 工程，通过 `scripts/build` 将源码打包为可安装的 Claude Code / Codex skill。当前优先适配 Codex。

---

## 项目定位

AIPD2 以项目为单位组织上下文。Codex、Claude Code、GA、爱马仕等 Agent 负责推理、执行、工具调用和任务调度；AIPD2 负责沉淀方向、场景、核心模型、产品边界、业务实现逻辑和代码入口，让不同 Agent 进入项目后能快速理解上下文并持续回写经验。

当前上下文主要以 `_adoc/` 文档形式提供，后续也可以通过 MCP、检索工具或上下文服务提供。

代码只能告诉 Agent “现在是怎么做的”，但很难告诉 Agent “为什么当初要这么做”。聊天记录会丢失，Issue 和 PR 太碎片，README 通常只写入口信息。AIPD2 把项目方向、用户场景、产品边界、架构原因、技术取舍和执行经验沉淀成 Agent 可以稳定读取的项目认知：

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
│   ├── core/          # 共享知识层（L1-L6 分层、Case 机制、Agent 协作）
│   ├── platforms/     # 平台覆盖文件（Claude Code / Codex）
│   └── skills/        # 9 个 skill 源码，每个含 SKILL.md
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
| aipd2-weave | `/aipd2-weave` | 把讨论、step 结果、case 归档、diff 或外部资料编织回项目 ADOC、局部 README 和 map |
| aipd2-learn | `/aipd2-learn` | 采集会话定位信息，诊断 AIPD2 框架自身的 skill 和规则迭代点 |
| aipd2-update | `/aipd2-update` | 更新已初始化项目中的 AIPD 架构、AGENTS 和 map |
| aipd2-case-archive | `/aipd2-case-archive` | 归档 case，合并分支 |
| aipd2-git-push | `/aipd2-git-push` | 检查当前分支和提交状态，并推送到远端 |
| aipd-mermaid | `/aipd-mermaid` | 创建、修改、评审或按需渲染 Mermaid 架构图 |

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

## _adoc 核心架构

### L1-L6 分层

AIPD 的目标不是为了维护文档而维护文档。`_adoc/` 里的 L1-L5 一方面是项目讨论、判断和经验沉淀的文档层，另一方面也是 Agent 理解、管理和修改 L6 的上下文。L6 是项目里的真实代码实现，不在 `_adoc/` 里单独写文档，而是随项目类型分布在前端、后端、爬虫、脚本等具体代码目录中。

| 层级 | 路径 | 作用 |
|------|------|------|
| L1 | `_adoc/L1-intent/` | 项目方向、目标和长期取舍，让 AI 不偏离目标 |
| L2 | `_adoc/L2-research/` | 用户、场景、需求、竞品和调研结论，让 AI 理解为什么要做 |
| L3 | `_adoc/L3-core/` | 核心对象、领域语言、核心流程、数据模型和系统成立方式 |
| L4 | `_adoc/L4-product/` | 解释产品功能、功能边界和业务规则，并以功能为维度串联相关 L6 代码入口 |
| L5 | `_adoc/L5-dev/` | 沉淀产品功能到代码实现之间的业务实现逻辑和跨模块工程规则，如权限、路由、第三方插件、前后端约定 |
| L6 | 具体代码实现，不在 `_adoc/` 内 | 最终产出的真实实现；前端、后端、爬虫、脚本等项目类型各自拥有不同代码入口 |

### 多 Agent 执行体系

- **主 Agent = 主线负责人**：维护用户沟通、目标边界、最终判断和状态写回
- **分身 Agent = 主 Agent 克隆体**：继承当前认知，进入局部探索分支完成开发 / 调研 / 归档，并回流压缩结果

### Case 执行体系

- **Case**：一次具体事项，记录目标、上下文索引、边界、steps 和归档信息。
- **Step**：Case 内的分身派发节点。它不是替代当前上下文的任务单，而是用于校准边界、恢复状态和沉淀经验。
- **OKR**：阶段目标，用来判断工作是否推进了项目方向。

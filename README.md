# AIPD - 面向软件开发的 AI Harness 框架

**[English](./README_EN.md)** | 中文

**把软件项目的经验和决策结构化沉淀，让 AI 基于项目认知持续、准确地参与开发。**

人类在记忆管理上是大师——分层、分领域、按需调取。但 AI 的上下文是平的、易碎的。AIPD 把人类在软件开发中积累的认知结构移植到 AI 的工作流中：该记什么、怎么组织、什么时候用。

你负责思考和决策，AI 基于沉淀的项目认知自主执行。

---

## 它改变了什么

**以前**：项目经验存在人脑里。老手离职，知识断层；新人入场，从头摸索。

**现在**：项目经验沉淀在结构化文档中。AI 读取这些认知，像一个了解项目全貌的老手一样持续参与。

## 它怎么做到的

把软件开发中的认知按领域规则组织——该存什么、怎么存、什么时候调出来用：

- **你关注的**：方向对不对、计划对不对、结果对不对
- **AI 负责的**：代码编写、文档流转

计划写在文件里，AI 每次干活前都会先读一遍。所以它不会忘、不会乱、不会跑偏。

## 工作流程

```
1. 初始化 → 定义项目方向（intent.md）
2. 设计   → 拆分业务模块与技术模块（business/ + tech/）
3. 计划   → 创建迭代任务（plan/）
4. 执行   → AI 逐个完成任务
5. 归档   → 迭代完成，开始下一轮
```

## 文档体系

```
_adoc/
├── intent.md          # 项目方向（唯一）
├── index.md           # 大索引（入口文件）
├── business/          # 业务模块（Spec + SOP 聚合在模块内）
│   ├── 模块A/
│   │   ├── README.md
│   │   └── ...
│   └── 模块B/
│       └── README.md
├── tech/              # 技术模块/项目
│   ├── index.md       # 技术索引 + 环境说明
│   ├── 项目A/
│   │   └── README.md
│   └── 项目B/
│       └── README.md
└── plan/              # 迭代计划
    ├── index.md       # 分类索引（按模块组织）
    ├── v0.3-xxx.md    # 进行中
    └── archive/       # 已归档
        └── v0.2-xxx.md
```

**Plan 是唯一需要你关注的**：想同时干三件事？创建三个 Plan。每个 Plan 是一条独立的任务线。

## 目录说明

```
AIPD/
├── skill.md           # Skill 主文件（AI 读取的指令）
├── templates/         # 文档模板
│   ├── intent.md
│   ├── spec.md
│   ├── plan.md
│   └── system.md
├── examples/          # 示例文档（来自真实项目）
│   ├── sample-intent.md
│   ├── sample-spec.md
│   ├── sample-plan.md
│   └── sample-system.md
└── references/        # 写作指南
    ├── intent-guide.md
    ├── spec-guide.md
    └── plan-guide.md
```

## 安装使用

将本项目所有内容放到你的 skills 目录下的 `AIPD/` 文件夹即可（目录名需保持为 `AIPD`）。

**常见 skills 路径：**

```bash
# Claude Code 全局 skills
~/.claude/skills/AIPD/

# 项目级 Claude skills
your-project/.claude/skills/AIPD/

# 项目级 Agent skills（部分工具使用）
your-project/.agent/skills/AIPD/
```

**安装方式：**

```bash
# 方式一：Git Clone（推荐，方便更新）
git clone https://github.com/你的用户名/AIPD.git ~/.claude/skills/AIPD

# 方式二：直接下载
# 下载后解压到上述任一路径
```

**使用：** 在任意项目中输入 `/adoc`，AI 会自动检测项目状态并引导你。

## 适用场景

- 启动新项目，需要梳理方向
- 功能越来越多，需要结构化管理
- 团队协作，需要统一的文档规范
- 中断后继续开发，需要快速恢复上下文

## License

MIT

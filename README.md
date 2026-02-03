# AIPD - AI 文档驱动开发

**[English](./README_EN.md)** | 中文

**你只管说，AI 管干。**

不用记命令，不用记流程，不用操心执行细节。

你说"加个按钮"，它就帮你加。你说"这里改一下"，它就帮你改。它会按照约定好的流程一步步做，做完一件做下一件，不会跑偏，不会乱来。

就像有了一个项目管家——你只负责提需求，它负责把活干完。

---

## 它改变了什么

**以前**：你是执行流程的人。需求来了，你得记住怎么做，一步步自己干。

**现在**：你是发任务的人。需求来了，你说一声，AI 按流程干，你验收结果。

这不是"AI 辅助开发"，而是"AI 替你开发"。你的角色从执行者变成了决策者。

## 它怎么做到的

**AI 不是直接动手，而是先制定计划。**

你说"我要加个搜索功能"，它会先列出要做哪几件事、先做什么后做什么。你看一眼，觉得没问题，它就按计划一步步执行。

- **你关注的**：计划对不对、方向对不对
- **AI 负责的**：代码怎么写、文件怎么改

计划写在文件里，AI 每次干活前都会先读一遍。所以它不会忘、不会乱、不会跑偏。

## 工作流程

```
1. 初始化 → 定义项目方向（intent.md）
2. 设计   → 拆分功能模块（spec/）
3. 约束   → 明确技术规范（system/）
4. 计划   → 创建迭代任务（plan/）
5. 执行   → AI 逐个完成任务
6. 归档   → 迭代完成，开始下一轮
```

## 文档体系

```
_adoc/
├── intent.md          # 项目方向（唯一）
├── spec/              # 功能模块设计
│   ├── 01_feature_a.md
│   └── 02_feature_b.md
├── system/            # 技术架构约束
│   └── ...
├── plan/              # 迭代计划
│   ├── index.md       # 分类索引（按模块组织）
│   ├── v0.3-xxx.md    # 进行中
│   └── archive/       # 已归档
│       └── v0.2-xxx.md
└── runbook/           # 操作手册
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

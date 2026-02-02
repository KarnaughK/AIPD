# AIPD - AI 文档驱动开发

**[English](./README_EN.md)** | 中文

**你只管聊，AI 管代码。**

你和 AI 聊需求、聊方案，AI 把结论写进文档，再从文档生成代码。人和代码之间，隔着一层文档——这层由 AI 全权负责。

只需记住一个命令：`/adoc`。AI 会自动判断项目状态，推荐下一步行动。

---

## 它解决什么问题

传统开发：需求 → 人写代码 → 文档补一补

AIPD：需求 → **文档** → AI 写代码

文档不再是事后产物，而是驱动一切的源头。你专注于「想清楚要做什么」，剩下的交给 AI。

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
│   ├── index.md
│   └── ...
├── plan/              # 迭代计划
│   ├── v0.3-xxx.md           # 进行中
│   └── archived-v0.2-xxx.md  # 已归档
└── runbook/           # 操作手册
```

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

1. 将此目录放到 `~/.claude/skills/AIPD/`
2. 在任意项目中输入 `/adoc`
3. AI 会自动检测项目状态并引导你

## 适用场景

- 启动新项目，需要梳理方向
- 功能越来越多，需要结构化管理
- 团队协作，需要统一的文档规范
- 中断后继续开发，需要快速恢复上下文

## License

MIT

# AIPD - AI-Powered Document-Driven Development

**[English](./README_EN.md)** | 中文

> 让 AI 帮你管理项目文档，从需求到交付全流程驱动。

## 核心理念

传统开发流程中，文档往往是事后补充的产物。AIPD 反其道而行：**先写文档，再写代码**。

通过一套结构化的文档体系，让 AI 能够：
- 理解项目的方向和边界
- 追踪功能模块的设计意图
- 管理迭代计划的执行状态
- 保持技术约束的一致性

你只需要记住一个命令：`/adoc`，AI 会自动判断项目状态并推荐下一步行动。

## 工作流程

```
1. 初始化 → 定义项目方向（intent.md）
2. 设计   → 拆分功能模块（spec/）
3. 约束   → 明确技术规范（system/）
4. 计划   → 创建迭代任务（plan/）
5. 执行   → 逐个完成任务
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

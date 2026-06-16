# AIPD Skill 目录结构

框架自身的指引、模板、示例，AI 按需加载。

```
AIPD/                              # Skill 根目录
├── skill.md                       # 主指令文件
└── references/                    # 所有指引文档
    ├── init/                      # 初始化
    │   ├── main-agent.md
    │   └── sub-agent.md
    ├── L1-intent/                 # 第一层：方向
    │   ├── main-agent.md          # 主 Agent 指引
    │   ├── intent-guide.md        # 写作指南
    │   ├── template.md            # 模板
    │   └── example.md             # 示例
    ├── L2-scenario/               # 第二层：场景需求
    │   └── index.md               # 场景需求入口
    ├── L3-engine/                 # 第三层：核心引擎
    │   └── index.md               # 核心引擎入口
    ├── L4-product-arch/           # 第四层：产品架构
    │   └── index.md               # 产品架构入口
    ├── L5-tech-arch/              # 第五层：技术架构
    │   ├── index.md               # 技术架构入口
    │   ├── template.md            # 模板
    │   └── example.md             # 示例
    ├── planning/                  # Plan 执行体系
    │   ├── index.md               # 主 Agent 完整指引（创建、执行、验收、归档全流程）
    │   ├── worker-dev.md          # 开发执行者指南
    │   ├── worker-research.md     # 调研执行者指南
    │   ├── worker-archive.md      # 归档执行者指南
    │   └── templates/
    │       ├── plan.md            # Plan 模板
    │       └── step.md            # Step 模板
    ├── okr/                       # OKR 目标管理
    │   └── index.md               # OKR 入口
    ├── agent-team-guide.md        # 多 Agent 架构指南
    ├── map-skill-structure.md     # 本文件：Skill 目录地图
    └── map-adoc-structure.md      # 项目文档目录地图
```

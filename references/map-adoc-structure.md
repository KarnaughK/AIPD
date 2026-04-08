# 项目 _adoc/ 文档目录结构

项目的认知沉淀，由用户和 AI 共同维护。


```
_adoc/
├── intent.md              # 方向（唯一）
├── index.md               # 大索引（入口文件）
├── business/              # 功能模块（描述"做什么"，不绑定技术实现）
│   └── keyword-discovery/ # 用功能名，不用技术项目名
│       ├── index.md       # 模块索引
│       └── sop-xxx.md     # 标准流程
├── dev/                   # 技术项目（命名带技术标识，如 express-xxx、next-xxx）
│   ├── index.md           # 技术模块总索引
│   └── express-keyword-research/
│       ├── index.md       # 项目索引
│       └── sop-deploy.md  # 部署 SOP
├── okr/                   # 目标管理
│   ├── index.md           # 目标索引
│   └── O1-目标名/
│       ├── index.md       # O + KR 定义
│       └── YYYY-MM-DD.md  # 每日进展
└── plan/                  # 迭代计划
    ├── v0.1-功能名/
    │   ├── plan.md
    │   └── steps/
    │       ├── v0.1.1-步骤名.md
    │       └── v0.1.2-步骤名.md
    └── archive/
        └── v0.1-功能名/   # 已归档计划
```

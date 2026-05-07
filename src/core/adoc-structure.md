# 项目 _adoc/ 文档目录结构

项目的认知沉淀，由用户和 AI 共同维护。

```
_adoc/
├── index.md                    # 大索引（入口文件）
├── L1-intent/                  # 方向层
│   ├── intent.md               # 当前方向
│   ├── evolution.md            # 演进日志
│   └── history/                # 历史版本
│       └── v1-2026-01.md
├── L2-research/                # 需求调研层
│   └── index.md
├── L3-core/                    # 核心层
│   └── index.md
├── L4-product/                 # 产品功能模块层（描述"做什么"，不绑定技术实现）
│   └── keyword-discovery/      # 用功能名，不用技术项目名
│       ├── index.md            # 模块索引
│       └── sop-xxx.md          # 标准流程
├── L5-dev/                     # 研发实现层（命名带技术标识，如 express-xxx、next-xxx）
│   ├── index.md                # 研发模块总索引
│   └── express-keyword-research/
│       ├── README.md           # 研发实现说明
│       └── debug-map.md        # 调试地图
├── okr/                        # 目标管理
│   ├── index.md                # 目标索引
│   └── O1-目标名/
│       ├── index.md            # O + KR 定义
│       └── YYYY-MM-DD.md       # 每日进展
└── case/                       # 事项执行记录
    ├── c0.1-功能名/
    │   ├── case.md
    │   ├── steps/
    │   │   └── c0.1.1-步骤名.md
    │   └── doc/
    └── archive/
        └── c0.1-功能名/        # 已归档 case
```

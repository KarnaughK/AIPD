# 项目 _adoc/ 文档目录结构

项目的认知沉淀，由用户和 AI 共同维护。

```
_adoc/
├── index.md                    # 大索引（入口文件）
├── context-map.md              # 上下文检索地图：用户意图 / 业务词 / 工程词 -> 必读认知和代码入口
├── L1-intent/                  # 方向层
│   ├── intent.md               # 当前方向
│   ├── evolution.md            # 演进日志
│   └── history/                # 历史版本
│       └── v1-2026-01.md
├── L2-research/                # 需求调研层
│   └── index.md                # 调研索引
├── L3-core/                    # 核心层
│   └── index.md                # 核心概念 / 领域语言 / 流程索引
├── L4-product/                 # 产品功能模块层（描述"做什么"，不绑定技术实现）
│   ├── index.md                # 产品模块总索引
│   └── keyword-discovery/      # 用功能名，不用技术项目名
│       ├── index.md            # 模块索引
│       └── sop-xxx.md          # 标准流程
├── L5-dev/                     # 工程实现层：产品功能到代码实现之间的跨模块规则
│   ├── index.md                # 工程实现总索引
│   └── express-keyword-research/
│       ├── README.md           # 研发实现说明
│       └── debug-map.md        # 调试地图
├── okr/                        # 目标管理
│   ├── index.md                # 目标索引
│   └── O1-目标名/
│       ├── index.md            # O + KR 定义
│       └── YYYY-MM-DD.md       # 每日进展
└── case/                       # 事项执行记录
    ├── index.md                # Case 索引
    ├── c0.1-功能名/
    │   ├── case.md
    │   ├── steps/
    │   │   └── c0.1.1-步骤名.md
    │   └── doc/
    └── archive/
        └── c0.1-功能名/        # 已归档 case
```

## 检索结构

`_adoc/context-map.md` 是项目级检索入口，不写完整正文，只把用户自然语言、业务词和工程词路由到具体文档与代码入口。

推荐检索链路：

```text
AGENTS.md -> _adoc/index.md -> _adoc/context-map.md -> L3/L4/L5 索引 -> 局部 README / 代码入口
```

每层索引的职责：

- `_adoc/context-map.md`：面向“我要做什么”，列任务意图、业务词、工程词、必读文档、代码入口和兜底搜索词。
- `_adoc/L3-core/index.md`：面向“这个词是什么意思”，列核心概念、标准叫法、别名/黑话、关系、常见误解和细节文档。
- `_adoc/L4-product/index.md`：面向“这个功能做什么”，列产品模块、功能边界、业务规则和交互行为。
- `_adoc/L5-dev/index.md`：面向“这个功能怎么工程化实现”，列跨模块、跨端、跨页面、长期稳定的实现规则和工程约定。
- 代码目录就近 `README.md`：面向“这个页面/弹窗/组件内部怎么改”，记录局部地图、组件关系、数据流和入口文件。

`context-map.md` 和各层 `index.md` 要尽量扁平暴露高频入口，不依赖 Agent 多层跳转后自行发现关键文档。

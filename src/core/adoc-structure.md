# 项目 _adoc/ 文档目录结构

项目的认知沉淀，由用户和 AI 共同维护。

```
_adoc/
├── index.md                    # 大索引（入口文件）
├── map.md                      # 项目记忆总图：AI 第一跳读取的厚检索地图
├── context-map.md              # 旧项目兼容入口；新项目优先使用 map.md
├── L1-intent/                  # 方向层
│   ├── intent.md               # 当前方向
│   ├── evolution.md            # 演进日志
│   └── history/                # 历史版本
│       └── v1-2026-01.md
├── L2-research/                # 需求调研层
│   └── index.md                # 调研索引
├── L3-core/                    # 核心层
│   ├── map.md                  # 核心概念总图
│   └── index.md                # 核心概念 / 领域语言 / 流程索引
├── L4-product/                 # 产品功能模块层（描述"做什么"，不绑定技术实现）
│   ├── map.md                  # 产品功能线总图
│   ├── index.md                # 产品模块总索引
│   └── keyword-discovery/      # 用功能名，不用技术项目名
│       ├── map.md              # 功能线细节图：页面 / 接口 / 数据对象 / 权限 / L3 / L5 / L6入口
│       ├── index.md            # 模块索引
│       └── sop-xxx.md          # 标准流程
├── L5-dev/                     # 工程实现层：产品功能到代码实现之间的业务实现逻辑和跨模块规则
│   ├── map.md                  # 工程规则总图
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

L6 是具体代码实现，不在 `_adoc/` 目录内单独建层。它随项目类型分布在前端、后端、爬虫、脚本等真实代码目录中；L1-L5 的职责是帮助 AI 理解、定位、管理和修改 L6。

## 检索结构

`_adoc/map.md` 是项目级检索入口，是 AI 读取项目记忆的第一跳。它允许比普通索引更厚，但必须结构化，直接暴露高频功能线、核心概念、工程规则和稳定代码入口。

`_adoc/context-map.md` 是旧项目兼容入口。新项目和新模板优先使用 `_adoc/map.md`。

推荐检索链路：

```text
AGENTS.md -> _adoc/index.md -> _adoc/map.md -> L3/L4/L5 map -> 局部 README / L6 代码入口
```

每层索引的职责：

- `_adoc/map.md`：面向“我要做什么”，厚总图，一跳暴露高频任务、功能线、概念、工程规则和稳定入口。
- `_adoc/L3-core/map.md`：面向“这个词是什么意思”，列核心概念、标准叫法、别名/黑话、关系、常见误解和细节文档。
- `_adoc/L4-product/map.md`：面向“这个需求属于哪条功能线”，列产品功能线总表。
- `_adoc/L4-product/{feature}/map.md`：面向“这条功能线落在哪些实现入口”，列页面、接口、数据对象、权限码、相关 L3/L5 和 L6 入口。
- `_adoc/L5-dev/map.md`：面向“这个功能怎么工程化实现”，列业务实现逻辑、跨模块规则、跨端约定和长期稳定的工程约定。
- 代码目录就近 `README.md`：面向“这个页面/弹窗/组件内部怎么改”，记录局部地图、组件关系、数据流和入口文件。

`map.md` 要尽量扁平暴露高频入口，不依赖 Agent 多层跳转后自行发现关键文档。分层 map 用于维护细节，但总图必须能让 AI 第一跳命中方向。

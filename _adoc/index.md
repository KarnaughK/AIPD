# AIPD2 项目认知索引

本文件是 AIPD2 仓库自身的 `_adoc/` 入口。Agent 进入本项目后，先读这里，再按任务层级读取对应文档。

## 项目当前状态

- **项目名称**：AIPD2
- **当前阶段**：框架自举与 Codex 优先适配
- **当前 OKR**：`_adoc/okr/index.md`
- **当前 Case**：`_adoc/case/index.md`

## 认知层级

| 层级 | 位置 | 作用 | 当前状态 |
|------|------|------|----------|
| L1 Intent | `_adoc/L1-intent/` | AIPD2 的方向、边界和长期取舍 | 初始 |
| L2 Research | `_adoc/L2-research/` | 用户、场景、需求、竞品和调研结论 | 暂缺 |
| L3 Core | `_adoc/L3-core/` | 核心对象、核心流程、数据模型和系统成立方式 | 暂缺 |
| L4 Product | `_adoc/L4-product/` | skill、case、agent init 等产品化边界 | 暂缺 |
| L5 Dev | `_adoc/L5-dev/` | 框架实现、平台适配、Agent 调度和研发约束 | 初始 |

## 任务类型读取入口

- AIPD2 方向、边界、定位：`_adoc/L1-intent/intent.md`
- Codex / Agent / case-run / 构建安装：`_adoc/L5-dev/index.md`
- 当前开发事项：`_adoc/case/index.md`
- 具体 case 执行：先读对应 case 的 `case.md`，再读 step 明确列出的上下文文档。

## 读取原则

- 任务处在哪个层级，就读取对应层级及必要上下游认知。
- 代码模块、skill、平台适配的局部认知，优先读取就近源码和 README。
- `_adoc/L5-dev/` 存跨模块研发规则、工程约束、索引和通用 SOP。
- 如果用户当前指令与 AIPD 认知冲突，先指出冲突和风险，再继续。

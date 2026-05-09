# AIPD 项目认知索引

本文件是 `_adoc/` 的入口。Agent 进入项目后，先读这里，再按任务层级读取对应文档。

## 项目当前状态

- **项目名称**：{project_name}
- **当前阶段**：方向定义 / 调研中 / 产品设计 / 开发中 / 维护中
- **当前 OKR**：`_adoc/okr/index.md`
- **当前 Case**：`_adoc/case/index.md`

## 认知层级

| 层级 | 位置 | 作用 | 当前状态 |
|------|------|------|----------|
| L1 Intent | `_adoc/L1-intent/` | 项目方向、目标和长期取舍 | 待补充 |
| L2 Research | `_adoc/L2-research/` | 用户、场景、需求、竞品和调研结论 | 待补充 |
| L3 Core | `_adoc/L3-core/` | 核心对象、核心流程、数据模型和系统成立方式 | 待补充 |
| L4 Product | `_adoc/L4-product/` | 产品模块、功能边界、业务规则和交互行为 | 待补充 |
| L5 Dev | `_adoc/L5-dev/` | 研发实现、工程约束、调试经验和维护规则 | 待补充 |

## 读取原则

- 任务处在哪个层级，就读取对应层级及必要上下游认知。
- 代码模块、页面、组件的局部认知，优先读取就近 `README.md`。
- `_adoc/L5-dev/` 更适合存跨模块研发规则、工程约束、索引和通用 SOP。
- 如果用户当前指令与 AIPD 认知冲突，先指出冲突和风险，再继续。

## 常用入口

- Case 索引：`_adoc/case/index.md`
- OKR 索引：`_adoc/okr/index.md`
- 当前方向：`_adoc/L1-intent/intent.md`

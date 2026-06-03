# AIPD2 项目认知索引

本文件是 AIPD2 仓库自身的 `_adoc/` 入口。Agent 进入本项目后，先读这里；如果存在 `_adoc/context-map.md`，再用它做上下文检索，最后按任务层级读取对应文档。

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
| L3 Core | `_adoc/L3-core/` | 核心认知、核心对象、核心关系、核心流程和系统成立方式 | 初始 |
| L4 Product | `_adoc/L4-product/` | skill、case、agent init 等产品功能边界和实现入口地图 | 暂缺 |
| L5 Dev | `_adoc/L5-dev/` | 产品功能到代码实现之间的业务实现逻辑、平台适配、Agent 调度和跨模块工程规则 | 初始 |
| L6 Code | 具体代码实现，不在 `_adoc/` 内 | AIPD2 的真实源码、skill、模板、平台适配和脚本 | 已存在 |

## 上下文检索

- 项目级检索地图：`_adoc/context-map.md`
- 进入具体任务前，先判断任务涉及 L3 核心概念、L4 产品功能、L5 工程实现规则、局部 README、L6 代码入口、case 中的哪些上下文。
- 如果 `context-map.md` 缺失或未覆盖本次任务，按相关核心词、skill 名、agent 名、平台名、case 名使用 `rg` 兜底搜索，并把新发现的稳定入口回写到合适的 map 或 index。

## 任务类型读取入口

- AIPD2 方向、边界、定位：`_adoc/L1-intent/intent.md`
- AIPD2 纵向概念模块与横向功能能力：`_adoc/L3-core/index.md`、`_adoc/L3-core/vertical-concept-modules.md`、`_adoc/L3-core/horizontal-capabilities.md`
- 上下文检索：`_adoc/context-map.md`
- Weave 反向编织 / 项目 ADOC 回写：`src/skills/aipd2-weave/SKILL.md`、`_adoc/L3-core/horizontal-capabilities.md`
- Codex / Agent / case-run / 构建安装：`_adoc/L5-dev/index.md`
- 当前开发事项：`_adoc/case/index.md`
- 具体 case 执行：先读对应 case 的 `case.md`，再读 step 明确列出的上下文文档。

## 读取原则

- 任务处在哪个层级，就读取对应层级及必要上下游认知。
- 代码模块、skill、平台适配的局部认知，优先读取就近源码和 README。
- `_adoc/L3-core/` 应维护核心认知和核心模型。业务项目可偏核心对象；AIPD2 这类框架项目可偏上下文解耦、记忆存取、扁平化检索等底层认知。
- `_adoc/L5-dev/` 存产品功能到代码实现之间的业务实现逻辑、跨模块工程规则、工程约束、索引和通用 SOP。
- L6 是具体代码实现，不写入 `_adoc/`，按项目类型分布在真实源码目录中。
- 具体 skill、agent、脚本内部的局部实现细节，优先放就近源码和 README，不塞回 L5。
- 如果用户当前指令与 AIPD 认知冲突，先指出冲突和风险，再继续。

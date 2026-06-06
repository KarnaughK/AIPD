# Case: c0.4-module-interface-registry

> **本次事项目标**：统计 AIPD2 当前模块，设计模块级标准接口，让初始化、update、weave 等横向流程能复用各模块自己的初始化 / 审计 / 写入描述。

## 目录结构

```
_adoc/case/c0.4-module-interface-registry/
├── case.md
├── steps/
└── doc/
```

## 1. 目标

- **模块盘点**：统计 AIPD2 当前有哪些纵向模块、横向能力模块、平台适配模块和可选交互模块。
- **接口设计**：讨论是否需要类似“模块注册表 / 标准接口”的结构，让模块声明自己的初始化、update 审计、写入规则、标记区块、必选/可选属性和用户确认问题。
- **流程统一**：让 `aipd2` 初始化和 `aipd2-update` 不再各自手写完整规则，而是从模块声明中拼装流程。

## 2. 上下文索引

> 本 case 是目标型 / 认知型 case，重点不在执行代码，而在梳理 AIPD2 模块体系和未来接口边界。

### 层级判断

- **L3 Core**：涉及纵向概念模块、横向功能能力、模块边界、模块接口和 AIPD2 的项目成立模型。
- **L4 Product**：涉及初始化、update、case-create、weave 等功能线如何复用模块声明。
- **L5 Dev**：涉及 skill、模板、Agent Entry、Interaction Style、构建/安装等跨模块工程规则。
- **Case / 历史 Step**：需要参考本 case 之前关于 Agent Entry、update、Interaction Style 的讨论和改动。

### 项目认知

- `_adoc/map.md` - 项目记忆第一跳，包含 AIPD2 高频任务、L3/L4/L5 总表和 Weave / Learn 观察锚点。
- `_adoc/L3-core/vertical-concept-modules.md` - 纵向模块清单，包括 L1-L6、OKR、Case、Step、Agent Entry、Agent 使用方案。
- `_adoc/L3-core/horizontal-capabilities.md` - 横向功能能力清单，包括 map、Case、Weave、OKR 对齐、构建/安装、上下文服务。
- `_adoc/L3-core/index.md` - AIPD2 核心认知，包括上下文解耦、黑箱上移、扁平化检索和提示词边界。
- `_adoc/L5-dev/index.md` - Codex 优先适配、分身 Agent、角色 Agent 和工程实现规则。
- `src/core/adoc-structure.md` - 当前 `_adoc` 结构和 map 检索结构。

### 代码 / 模板入口

- `src/skills/aipd2/SKILL.md` - 初始化入口，当前包含 Agent MD 模板等级和可选 Interaction Style 写入逻辑。
- `src/skills/aipd2-update/SKILL.md` - update 入口，当前包含 Agent MD 分层审计和模板等级选择。
- `src/core/agent-entry/template.md` - AIPD Project Entry 模板。
- `src/core/agent-entry/interaction-style.md` - 可选交互风格模板。
- `src/core/adoc/templates/index.md` - `_adoc/index.md` 模板。
- `src/core/adoc/templates/map.md` - `_adoc/map.md` 模板。
- `src/core/case/templates/case.md` - case 模板。
- `src/core/case/templates/step.md` - step 模板。

### 兜底搜索

- `rg "Agent Entry|Interaction Style|初始化|update|template|模块|横向功能|纵向模块" src _adoc`
- `rg "AIPD-INTERACTION-STYLE|AIPD:START|inject-from-core|adoc/templates|case/templates" src _adoc AGENTS.md`

## 3. 本次边界

### 要做

- 先记录这个事项，作为后续独立 case。
- 后续执行时，先统计模块清单，再讨论模块接口是否成立。
- 如果接口成立，再设计最小模块注册表或模块说明格式。

### 不做

- 本次不立即实现模块注册表。
- 本次不重构 `aipd2` / `aipd2-update`。
- 本次不修改当前项目根目录 `AGENTS.md`。
- 本次不创建 step 文件，等后续正式执行时再拆。

## 4. 约束

- **渐进式**：先盘点模块，再设计接口，不直接上复杂框架。
- **不重复造层**：如果现有 L3 / L4 / L5 / map 已能承载，不为了“模块化”新增多余目录。
- **接口优先**：模块声明应服务初始化、update、weave、learn 等流程复用，而不是变成新的文档负担。
- **可选项明确**：Interaction Style 这类会影响用户交互风格的模块，必须是可选模块，不能混入 AIPD Project Entry 必须项。

## 5. Step 列表

> 暂无已确认 step。后续正式执行时再拆分。

## 6. 后续候选事项

- 统计当前模块候选：L1-L5、OKR、Case、Step、Agent Entry、Agent 使用方案、Map、Weave、Learn、Update、初始化、构建/安装、Interaction Style、平台适配、角色 Agent。
- 判断模块分类：哪些是纵向概念模块，哪些是横向功能能力，哪些是平台 / 模板 / 可选交互扩展。
- 设计模块接口草案：模块名、是否必选、目标文件、初始化行为、update 审计、写入规则、标记区块、用户确认问题、Weave 回写位置。
- 判断是否需要 `src/core/modules/` 或类似注册表；如果需要，先设计最小形态，不直接全量迁移。
- 讨论 `aipd2` 初始化和 `aipd2-update` 是否可以从模块声明拼装流程。

## 7. 验收标准

- [ ] 得到一份 AIPD2 当前模块清单。
- [ ] 明确哪些模块需要标准接口，哪些只是普通文档或模板。
- [ ] 形成模块接口最小字段草案。
- [ ] 判断是否创建模块注册表，以及放在哪个路径。
- [ ] 给出 `aipd2` / `aipd2-update` 后续如何复用模块声明的方案。

## 8. Weave 反向编织候选

> 本区只记录候选归属。真正回写长期 ADOC、局部 README 或 map 时，使用 `aipd2-weave` 先给回写方案，用户确认后再写入。

- `_adoc/L3-core/vertical-concept-modules.md` - 如果模块分类边界变稳定，应补充模块清单或模块接口概念。
- `_adoc/L3-core/horizontal-capabilities.md` - 如果“模块注册表 / 初始化接口”成为横向能力，应补充其如何串联纵向模块。
- `_adoc/L5-dev/index.md` - 如果形成 skill / 模板 / 平台的工程实现规则，应补充 L5 约定。
- `_adoc/map.md` - 如果“模块接口 / 模块注册表”成为高频任务入口，应补充路由。
- `src/core/` - 如果落成模块注册表或模板说明，可能新增或更新对应核心文档。

## 9. 自迭代观察锚点

- [ ] Agent 是否先把本事项识别为目标型 / 认知型 case，而不是执行型代码改造。
- [ ] Agent 是否先统计模块，再设计接口，而不是直接创建复杂框架。
- [ ] Agent 是否区分纵向模块、横向能力、平台适配、模板和可选交互扩展。
- [ ] Agent 是否避免把 Interaction Style 混入 AIPD Project Entry 必须项。
- [ ] Agent 是否把初始化和 update 的复用问题抽象为模块接口问题，而不是继续在两个 skill 中复制规则。

## 10. 归档状态

- **状态**：待开始
- **创建时间**：2026-06-06
- **归档时间**：

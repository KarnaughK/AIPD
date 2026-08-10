# Design：AIPD Knowledge Schema v2

## Design Intake

- **Case 类型**：framework refactor / docs-process / migration。
- **模式**：full。
- **主要缺口**：现有系统路径分散且带有两套旧命名；执行边界需要原子化。
- **阻塞级 open**：无。
- **实践经验命中**：现有经验索引没有直接覆盖框架 Schema 迁移；使用通用代码拓扑合同。

## Requirement Contract

### Confirmed

- 整个 AIPD 项目工作区命名为 `_aipd/`。
- 五类长期知识归入 `_aipd/knowledge/`，目录名为 `intent`、`research`、`core`、`product`、`engineering`。
- SOP、Case、OKR、Inbox 不属于长期知识正文，继续作为 `_aipd/` 的独立成员。
- Map 是检索视图，SOP 是可复用 Agent 程序，Case 是短周期状态容器。
- 物理目录不使用 L1-L5；点式命名只作为逻辑类型标识。
- 不做运行时兼容；允许一次性迁移器。

### Assumed

- 新 Schema 使用一个轻量机器可读版本标识，供初始化、迁移和校验识别；具体载体在实现时选择最小方案。
- `_aipd/case/archive/` 是不可执行的历史快照，正文中的旧路径和旧术语原样保留；所有位于归档外的活动索引、恢复入口和当前上下文指针必须改为新路径。若要恢复旧 Case，先按当前 Case 合同迁出归档并重建上下文索引，不能直接执行快照中的旧指针。

### Open

- 无阻塞项。
- 用户级 install 必须在 build 通过后另行确认。

## Schema Contract

```text
_aipd/
├── manifest.json
├── index.md
├── map.md
├── inbox.md
├── development-log.md          # 框架项目可选
├── knowledge/
│   ├── intent/
│   ├── research/
│   ├── core/
│   ├── product/
│   └── engineering/
├── sop/
├── case/
└── okr/
```

代码实现仍分布在真实项目源码目录，不创建 `_aipd/knowledge/code` 或 `_aipd/code`。

逻辑类型采用：

```text
knowledge.intent
knowledge.research
knowledge.core
knowledge.product
knowledge.engineering
```

## 旧→新映射

| 旧路径 / 名称 | 新路径 / 名称 |
|---|---|
| `_adoc/` | `_aipd/` |
| `_adoc/L1-intent/` | `_aipd/knowledge/intent/` |
| `_adoc/L2-research/` | `_aipd/knowledge/research/` |
| `_adoc/L3-core/` | `_aipd/knowledge/core/` |
| `_adoc/L4-product/` | `_aipd/knowledge/product/` |
| `_adoc/L5-dev/` | `_aipd/knowledge/engineering/` |
| L1 Intent | Intent knowledge domain / `knowledge.intent` |
| L2 Research | Research knowledge domain / `knowledge.research` |
| L3 Core | Core knowledge domain / `knowledge.core` |
| L4 Product | Product knowledge domain / `knowledge.product` |
| L5 Dev | Engineering knowledge domain / `knowledge.engineering` |
| `aipd_adoc_retriever` | `aipd_context_retriever` |

## Brownfield Delta

### ADDED

- `_aipd/manifest.json` Schema 标识。
- 框架源码中的 `core/knowledge/{intent,research,core,product,engineering}` 语义目录。
- 一次性旧 Schema 迁移器及混合状态检查。
- 新的 `aipd_context_retriever` 名称与指引；它按任务取 Knowledge、SOP、必要流程状态、README 和代码入口。

### MODIFIED

- 初始化、项目识别、Map-first 读取、Case 恢复、OKR、Inbox、SOP、Weave、Learn、Update。
- Agent Entry、平台 Agent guide、构建注入、check-dist 和资源校验。
- 当前项目 AIPD 工作区、根 AGENTS、README、docs 和活动索引。

### REMOVED

- 活动运行时中的 `_adoc` 和 L1-L5 物理目录。
- `aipd_adoc_retriever` 活动身份和旧文件名。
- “L1→L5 是固定读取顺序”叙事。

### 不能破坏的行为

- `index -> map -> 必要知识域 -> README / code` 的检索链。
- 普通任务不读取 Case / OKR；流程任务按需进入。
- Case Contract 与 phase-first 目录结构。
- SOP、Inbox、OKR、Weave 的现有职责。
- 双平台 build/check-dist 和 install 授权边界。

## 一次性迁移合同

迁移器只接受三种可判定状态：

1. **完整旧版**：存在 `_adoc/`，不存在 `_aipd/`；允许迁移。
2. **完整新版**：存在 `_aipd/manifest.json` 且 Schema 正确，不存在 `_adoc/`；报告已迁移，不重复执行。
3. **混合或未知状态**：新旧目录同时存在，或 `_aipd/` 缺失/版本不符；立即停止，不猜测补全。

新运行时若只发现遗留 `_adoc/`，允许使用一个拒绝性哨兵阻止重复初始化，并明确指向一次性迁移器；哨兵不得读取、路由或写入旧内容，不属于兼容读取。

迁移器负责：

- 移动工作区和五类知识目录。
- 写入 Schema 标识。
- 在目标项目的活动文本文件中改写路径和并列知识域术语。
- 常见旧分类组合自动改写；无法可靠判定的裸编号语义在 dry-run 阶段硬拒绝并返回文件，不做可能误伤业务术语的全局替换。
- 整块升级带 AIPD 标记的根 Agent Entry，并原子重命名项目级上下文检索 Agent 配置。
- 拒绝 Git ignored 的 Workspace、AIPD Agent Entry 或项目级 Agent 配置；用 `HEAD` 与 index 的并集验证迁移文件未丢失。
- 排除 `.git`、依赖目录、构建产物和迁移器自身。
- 迁移后运行结构与残留校验。

迁移器不进入日常读取链，不提供运行时双读。

## Context Boundary / Code Topology Contract

- **拓扑敏感**：是。
- **纵向业务上下文**：AIPD Project Workspace Schema。
- **Owner**：项目实例 `_aipd/`；框架方法与模板 `aipd-skill/src/core/knowledge/` 和 workspace 模板；运行入口 `aipd-skill/src/skills/`。
- **允许的横向依赖**：build/check-dist、Agent Entry、Map、Case、Weave、Update 和平台 Agent 打包。
- **显式组合边界**：所有能力只通过 `_aipd/index.md`、`_aipd/map.md`、`_aipd/manifest.json` 及明确的子目录入口组合。
- **禁止事项**：任何活动 Skill 或 Agent Entry fallback 到 `_adoc`；任何知识域再次承担流程状态；任何目录编号隐含读取顺序。
- **共享变化权限**：允许重命名框架级公共目录、路径约定与检索 Agent；不新增上下文服务或向量层。
- **独立验收边界**：初始化 fixture、迁移 fixture、当前仓库、Codex build、Claude build 分别可验证。
- **认知回写**：实现完成后，新 `_aipd/knowledge/core`、`product`、`engineering` 与 `_aipd/map.md` 成为当前事实源。

## Work Package Draft

### wp-01 Framework Schema and Migrator

在框架源码内完成方法目录、模板、Skills、Agent Entry、检索 Agent、构建校验和一次性迁移器，使新运行时只理解 Knowledge Schema v2。

### wp-02 Current Project Cutover

使用已验证映射迁移 AIPD-2 自身，更新 AGENTS、README、docs、case/index/map 和资源校验，然后执行残留检查与 build。

## Readiness Gate

- **状态**：passed。
- 阻塞级 open requirement：无。
- Brownfield 改动面：已定位。
- 文件边界：已明确。
- Code Topology Contract：已完成。
- Work Package：按框架能力与当前项目实例两个独立验收边界拆分。
- Verify 入口：结构检查、旧引用白名单、迁移 fixture、build、check-dist。
- 用户确认：2026-08-10 已确认直接实施且不做兼容。

## Latest Checkpoint

- **当前节点**：readiness-gate completed。
- **已确认**：Schema、命名、无兼容迁移、当前项目作为试点。
- **open / assumed**：install 未授权；Schema 标识采用最小实现；检索 Agent 采用 context 而非 knowledge 命名。
- **下一步**：进入 Execute，先执行 wp-01。
- **恢复入口**：本文件 -> `../case.md` -> `../03-execute/work-packages/wp-01-framework-schema-and-migrator.md`。

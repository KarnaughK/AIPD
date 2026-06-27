# Case: c0.7-repo-structure-reclassification

> **本次事项目标**：在正式创建 AIPD Desktop 之前，先重划 AIPD-2 仓库根目录结构，把 AIPD 研发认知、Skill 本体、面向人文档、构建产物、历史材料和未来桌面端产品分清。
>
> **归档结论（2026-06-27）**：本 case 的仓库重分类目标已完成。剩余 `s10` 的“L2 痛点 / 需求线 -> AIPD 解决能力”映射视角已被后续 L2/L3/L4/map 更新部分吸收，不再作为本 case 的阻塞项继续执行。

## 目录结构

```text
_adoc/case/archive/c0.7-repo-structure-reclassification/
├── case.md
├── steps/
│   ├── s1-audit-current-structure.md
│   ├── s2-move-skill-source.md
│   ├── s3-handle-legacy-and-todo.md
│   ├── s4-update-references-and-verify.md
│   ├── s5-clean-legacy-after-tag.md
│   ├── s6-rename-aipd2-to-aipd.md
│   ├── s7-audit-l1-intent-consistency.md
│   ├── s8-audit-l2-research-scope.md
│   ├── s9-create-l2-research-index.md
│   ├── s10-map-l2-needs-to-aipd-solutions.md
│   ├── s11-refresh-l3-core-models.md
│   └── s12-refresh-l4-product-lines.md
└── doc/
    ├── target-structure.md
    └── migration-plan.md
```

## 1. 目标

- **先于 Desktop 创建完成仓库重分类**：不要把 Tauri 项目建在当前根目录职责不清的结构上。
- **明确根目录一级边界**：根目录只保留少数稳定入口：`_adoc/`、`aipd-skill/`、`aipd-desktop/`、`docs/`、根 README 和 Agent 入口。
- **收拢 Skill 本体**：把当前 `src/`、`scripts/`、`modules/`、`dist/` 这类 AIPD Skill 相关内容归入 `aipd-skill/`。
- **处理历史材料**：评估 `v1/`、`v2-todo/` 是否迁移到 `docs/legacy/`、`_adoc/inbox.md`、新 case 或 archive，避免长期占据根目录。
- **为 c0.8 Desktop 铺路**：后续 AIPD Desktop case 应基于重构后的 `aipd-desktop/` 位置继续迭代。

## 2. 场景分流

- **项目类型**：AIPD 框架源码项目。
- **Case 类型**：仓库结构重构 / 工程组织调整，属于 L5 工程规则与 L4 产品演进交叉事项。
- **适用流程**：通用 case-create + 后续 case-run 执行。执行时必须先审计路径引用，再移动文件，最后验证构建 / 安装脚本。
- **不适用经验**：不是前端页面实现 case，不创建 Tauri 项目，不做 UI，不接 Codex App Server。

## 3. 上下文索引

### 层级判断

- **L1 Intent**：涉及 AIPD 从 Skill 框架演进出桌面端增强壳，但本 case 不改长期方向。
- **L3 Core**：涉及 AIPD Skill / ADOC / Desktop 的依赖方向：Desktop 增强 AIPD，基础 Skill 不依赖 Desktop。
- **L4 Product**：涉及 AIPD Desktop 作为独立产品目录的前置落位。
- **L5 Dev**：涉及构建脚本、安装脚本、dist 产物、README 路径、docs 路径和平台适配入口。
- **Case 依赖**：后续 `c0.8-aipd-desktop-zero` 应在本 case 完成后更新路径假设。

### 必读文档

- `_adoc/index.md` - AIPD 仓库自身认知入口。
- `_adoc/map.md` - 构建 / 安装 / Skill / Codex 平台适配的路由入口。
- `README.md` - 当前用户侧项目说明和项目结构。
- `docs/modules/build-and-install.md` - 构建与安装说明。
- `_adoc/case/c0.8-aipd-desktop-zero/case.md` - Desktop case，需在本 case 后基于新结构继续迭代。

### 代码 / 文件入口

- `src/` - 当前 AIPD Skill 本体源码。
- `scripts/` - 当前构建、安装、开发脚本。
- `modules/` - 当前模块材料，需判断是否属于 Skill 本体。
- `dist/` - 当前构建产物，需归属到 Skill 本体。
- `docs/` - 面向人学习文档，保留根目录。
- `v1/` - v1 历史材料，需判断归档位置。
- `v2-todo/` - 待整理材料，需判断进入 inbox / case / archive。

### 兜底搜索

- `rg -n "src/|scripts/|dist/|modules/|v1/|v2-todo|aipd-skill|aipd-desktop" README.md docs _adoc AGENTS.md`
- `rg -n "build|install|dist|scripts|src/platforms|src/skills|src/core" .`
- `rg -n "AIPD Desktop|apps/aipd-desktop|aipd-desktop" _adoc/case`

### 风险边界

- 移动 `src/` 和 `scripts/` 后，构建 / 安装脚本路径可能失效。
- 根 README 和 docs 里大量路径需要同步。
- `dist/` 是生成产物还是当前必须保留的发布物，需要执行前确认。
- `v1/`、`v2-todo/` 不能直接删除；需要先判断是否有仍应沉淀的信息。
- 本 case 不应顺手创建 Desktop，否则会把“重构前置事项”和“新产品初始化”混在一起。

## 4. 已确认讨论结论

### 4.1 根目录重新分层

当前倾向的新根目录：

```text
AIPD-2/
├── _adoc/          # AIPD-2 仓库自身项目认知，AI 研发用
├── aipd-skill/     # 现有 AIPD Skill 本体：src / scripts / dist / modules
├── aipd-desktop/   # 新桌面端：Tauri + Vue + Rust，后续 c0.8 创建
├── docs/           # 面向人的文档
├── AGENTS.md
├── README.md
└── .gitignore
```

### 4.2 `apps/` 不再作为推荐路径

本项目不是多 app 平台，不需要为了一个桌面端额外引入 `apps/` 层。

Desktop 推荐直接放在根目录：

```text
AIPD-2/
└── aipd-desktop/
```

### 4.3 Skill 本体目录名

当前推荐使用：

```text
aipd-skill/
```

理由：

- 它承载的是完整 AIPD Skill 本体，而不是抽象 core library。
- 目录内仍可保留 `src/core/` 表示 Skill 内部核心模板和规则。
- 比 `skill-core` 更符合当前项目真实职责。

### 4.4 `dist/` 归属

根目录 `dist/` 归属不清，应收敛到：

```text
aipd-skill/dist/
```

未来 Desktop 自己的产物由 Tauri / Vite 放在 `aipd-desktop/` 内部，不与 Skill 构建产物混放。

## 5. 本次边界

### 要做

- 创建本 case，记录仓库重分类目标、结构方案、迁移边界和执行 steps。
- 后续执行时，移动 Skill 本体相关目录到 `aipd-skill/`。
- 后续执行时，处理 `v1/` 和 `v2-todo/` 的归档 / inbox / case 候选。
- 后续执行时，更新 README、docs、_adoc map、构建安装说明和脚本路径。
- 后续执行时，验证原有 Skill 构建 / 安装链路仍能跑通。

### 不做

- 不创建 `aipd-desktop/` Tauri 项目。
- 不实现 Desktop UI。
- 不接 Codex App Server。
- 不重写 AIPD Skill 逻辑。
- 不直接删除 `v1/`、`v2-todo/`。
- 不把 Desktop 变成 AIPD Skill 的运行前提。

## 6. Step 列表

当前已完成首轮仓库重构；后续继续清理 legacy 和命名。

- [x] `steps/s1-audit-current-structure.md` - 审计现有目录、路径引用、构建脚本和历史材料价值。
- [x] `steps/s2-move-skill-source.md` - 创建 `aipd-skill/` 并迁移 `src/`、`scripts/`、`modules/`、`dist/`。
- [x] `steps/s3-handle-legacy-and-todo.md` - 处理 `v1/` 和 `v2-todo/`：归档、转 inbox 或转 case 候选。
- [x] `steps/s4-update-references-and-verify.md` - 更新路径引用并验证构建 / 安装 / 文档入口。
- [x] `steps/s5-clean-legacy-after-tag.md` - 在当前稳定点打 tag 后，清理 `docs/legacy/v1` 与 `docs/legacy/v2-todo`。
- [x] `steps/s6-rename-aipd2-to-aipd.md` - 将旧 `aipd2` 对外命名收敛回 `aipd`。
- [x] `steps/s7-audit-l1-intent-consistency.md` - 审计 L1 Intent 与当前 README / docs 教学文档之间的方向一致性差异。
- [x] `steps/s8-audit-l2-research-scope.md` - 审计 L2 Research 缺口，明确用户画像、外部趋势、痛点、工具生态和 Desktop 需求来源。
- [x] `steps/s9-create-l2-research-index.md` - 创建 `_adoc/L2-research/index.md`，正式沉淀 L2 外部世界、用户画像、痛点和需求线。
- [x] `steps/s10-map-l2-needs-to-aipd-solutions.md` - 已由后续 L2/L3/L4/map 更新部分吸收，不再作为本 case 阻塞项继续执行。
- [x] `steps/s11-refresh-l3-core-models.md` - 将 AIPD 自身 L3 收敛为六个核心成立模型，并同步 L3 map。
- [x] `steps/s12-refresh-l4-product-lines.md` - 将 AIPD 自身 L4 刷新为产品能力层，并同步 L4 map 与总 map。

## 6.1 执行结果

- 根目录已收敛为 `_adoc/`、`aipd-skill/`、`docs/` 等稳定入口；未创建 `aipd-desktop/`。
- AIPD Skill 本体已迁移到 `aipd-skill/`：`src/`、`scripts/`、`modules/`、`dist/` 均在其内部。
- `v1/`、`v2-todo/` 已迁移到 `docs/legacy/`，并在 `_adoc/inbox.md` 记录 `v2-todo` 后续待判断索引。
- README、docs、_adoc map、L5 工程规则、skill 自迭代文档和脚本提示已同步新路径。
- 已运行 `./aipd-skill/scripts/build`，Claude / Codex 均生成 10 个 skill，Codex agent 模板已生成。
- 已创建 Git tag `c0.7-before-legacy-cleanup` 指向清理 legacy 前的稳定提交，便于回看 v1 / v2-todo 旧材料。
- `docs/legacy/` 已从工作树删除；旧 v1 / v2-todo 材料通过 Git tag `c0.7-before-legacy-cleanup` 追溯，`_adoc/inbox.md` 保留待判断索引。
- Skill 源码目录、frontmatter、README、docs、_adoc、脚本和构建产物已统一到 `aipd*` 命名；安装脚本会清理旧 `aipd2*` skill。
- 已运行 `./aipd-skill/scripts/build`，Claude / Codex 均生成 10 个 `aipd*` skill，Codex agent 模板已生成。
- 已完成 L1 Intent 一致性审计：当前 L1 基础方向正确，但缺少 README / docs 中已经成型的新版一句话定位、从 Vibe Coding 到 Agent Coding 的问题来源、三条主线、适用边界、渐进采用原则和更完整的“不是什么”边界。
- `_adoc/L1-intent/intent.md` 已刷新为新的 L1 表达：AIPD 是面向 AI 时代的软件开发框架，用来组织人和 AI 从项目方向到代码实现再到经验回写的完整协作过程；并展开为项目知识库、任务执行系统、AI 原生代码架构三个大方向。
- 已完成 L2 Research 缺口审计：当前 L2 基本缺席，应补一人公司 / 单人开发者画像、Agent 上下文问题、项目文档完整性问题、AI 长时间工作问题、AI 原生代码架构扩展问题（含按 Vue / Nuxt 等技术栈沉淀经验库的需求）、SOP / AI 程序需求机会、未整理信息暂存与分流、AI 工作控制与验收信任、AIPD 框架自迭代、已接入项目的 AIPD 架构升级迁移、Desktop 文件查询与观看、CLI Agent 桌面化使用、MMD 高带宽交流、从 Vibe Coding 到 Agent Coding 的外部趋势、工具生态观察和 Desktop 需求来源。
- `_adoc/L2-research/index.md` 已创建，正式沉淀 AIPD 的 L2 用户画像、外部趋势、12 条核心痛点 / 需求线、工具生态观察和 Desktop 场景来源。
- 已创建 `s10-map-l2-needs-to-aipd-solutions.md`，用于下一步补齐“从 L2 痛点进入 AIPD 解决方案”的映射视角。
- `_adoc/L3-core/index.md` 已刷新为六个核心成立模型：项目知识库维护模型、Map-first 上下文检索模型、任务执行模型、Agent 协作思考模型、SOP / AI 程序模型、AI 原生代码架构模型。
- `_adoc/L3-core/map.md` 已同步六个核心模型入口，并明确 Weave 属于项目知识库维护模型，Map-first 不等同于默认 RAG / 全文搜索 / 多层目录跳转。
- `_adoc/L4-product/index.md` 已创建，明确 L4 是 AIPD 的产品能力层，负责描述用户可见、Agent 可调用、case 可引用的功能边界。
- `_adoc/L4-product/map.md` 已刷新，覆盖 AIPD 总入口与初始化、Map-first 认知加载、Inbox、Case Create / Run / Archive、Weave、Learn、Update、Mermaid / MMD、Git Push、SOP 库和 AIPD Desktop。
- `_adoc/map.md` 的 L4 产品功能线总表已同步，不再漏掉 Inbox、Mermaid、SOP 和 Desktop。

## 7. 后续候选事项

- 本 case 完成后，更新 `c0.8-aipd-desktop-zero` 中所有 Desktop 路径和前置依赖。
- 判断是否需要在根 README 增加“仓库分层”章节。
- 判断 `_adoc/map.md` 是否需要新增 `aipd-skill/`、`aipd-desktop/` 的路由入口。
- 判断 `docs/modules/build-and-install.md` 是否需要按新路径重写。
- C0.8 Desktop case 继续基于当前 `aipd-skill/` 与 `aipd*` 命名推进。

## 8. 验收标准

- [x] 根目录职责清晰，Skill 本体、Desktop、项目认知、面向人文档不混在一起。
- [x] AIPD Skill 源码和脚本迁移到 `aipd-skill/` 后，构建 / 安装链路仍可用。
- [x] 根目录不再保留归属不清的 `src/`、`scripts/`、`modules/`、`dist/`。
- [x] `v1/`、`v2-todo/` 已处理为明确归档 / inbox / case 候选，不再作为根目录长期入口。
- [x] legacy 旧材料已通过 `c0.7-before-legacy-cleanup` 保留快照，当前工作树不再保留 `docs/legacy/`。
- [x] README、docs、_adoc map 和相关 case 路径已同步。
- [x] 未创建 Desktop 项目；Desktop 创建留给后续 `c0.8`。
- [x] 当前对外主命名为 `AIPD` / `aipd`，构建产物使用 `aipd*` skill 名。

## 9. Weave 反向编织候选

- `_adoc/map.md` - 若本结构稳定，应补充新目录路由。
- `_adoc/L5-dev/index.md` - 若构建 / 安装路径变化成为长期工程规则，应更新。
- `README.md` - 面向用户的仓库结构说明需要同步。
- `docs/modules/build-and-install.md` - 构建安装路径必须同步。
- `c0.8-aipd-desktop-zero` - Desktop case 必须在本 case 完成后基于新路径迭代。
- `_adoc/L1-intent/intent.md` - L1 应在 L1-L5 审计完成后统一刷新，避免 Agent 继续把 AIPD 误读成 Codex Skill + case-run 工具集。
- `_adoc/L2-research/index.md` - 需要补充“痛点 / 需求线 -> AIPD 解决能力”的索引。
- `_adoc/L5-dev/index.md` - L4 产品能力稳定后，下一步可审计 L5 工程规则是否需要按这些产品线重新映射。

## 10. 自迭代观察锚点

- [x] Agent 执行迁移前是否先用 `rg` 审计路径引用，而不是直接移动目录。
- [x] Agent 是否先验证 `v1/`、`v2-todo/` 内容价值，而不是直接删除。
- [x] Agent 是否把 Skill 本体和 Desktop 解耦，避免让基础 Skill 依赖 Desktop。
- [x] Agent 是否执行构建 / 安装验证，避免只改文档不验证脚本。
- [x] Agent 是否在迁移完成后更新 `c0.8` 的路径假设。

## 11. 归档状态

- **状态**：已归档
- **创建时间**：2026-06-15
- **归档时间**：2026-06-27

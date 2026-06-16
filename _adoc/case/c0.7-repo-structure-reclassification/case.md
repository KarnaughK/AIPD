# Case: c0.7-repo-structure-reclassification

> **本次事项目标**：在正式创建 AIPD Desktop 之前，先重划 AIPD-2 仓库根目录结构，把 AIPD 研发认知、Skill 本体、面向人文档、构建产物、历史材料和未来桌面端产品分清。

## 目录结构

```text
_adoc/case/c0.7-repo-structure-reclassification/
├── case.md
├── steps/
│   ├── s1-audit-current-structure.md
│   ├── s2-move-skill-source.md
│   ├── s3-handle-legacy-and-todo.md
│   └── s4-update-references-and-verify.md
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

- **项目类型**：AIPD2 框架源码项目。
- **Case 类型**：仓库结构重构 / 工程组织调整，属于 L5 工程规则与 L4 产品演进交叉事项。
- **适用流程**：通用 case-create + 后续 case-run 执行。执行时必须先审计路径引用，再移动文件，最后验证构建 / 安装脚本。
- **不适用经验**：不是前端页面实现 case，不创建 Tauri 项目，不做 UI，不接 Codex App Server。

## 3. 上下文索引

### 层级判断

- **L1 Intent**：涉及 AIPD2 从 Skill 框架演进出桌面端增强壳，但本 case 不改长期方向。
- **L3 Core**：涉及 AIPD Skill / ADOC / Desktop 的依赖方向：Desktop 增强 AIPD，基础 Skill 不依赖 Desktop。
- **L4 Product**：涉及 AIPD Desktop 作为独立产品目录的前置落位。
- **L5 Dev**：涉及构建脚本、安装脚本、dist 产物、README 路径、docs 路径和平台适配入口。
- **Case 依赖**：后续 `c0.8-aipd-desktop-zero` 应在本 case 完成后更新路径假设。

### 必读文档

- `_adoc/index.md` - AIPD2 仓库自身认知入口。
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
├── aipd-skill/     # 现有 AIPD2 Skill 本体：src / scripts / dist / modules
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

- 它承载的是完整 AIPD2 Skill 本体，而不是抽象 core library。
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
- [ ] `steps/s6-rename-aipd2-to-aipd.md` - 将当前对外命名从 `aipd2` 收敛回 `aipd`。

## 6.1 执行结果

- 根目录已收敛为 `_adoc/`、`aipd-skill/`、`docs/` 等稳定入口；未创建 `aipd-desktop/`。
- AIPD2 Skill 本体已迁移到 `aipd-skill/`：`src/`、`scripts/`、`modules/`、`dist/` 均在其内部。
- `v1/`、`v2-todo/` 已迁移到 `docs/legacy/`，并在 `_adoc/inbox.md` 记录 `v2-todo` 后续待判断索引。
- README、docs、_adoc map、L5 工程规则、skill 自迭代文档和脚本提示已同步新路径。
- 已运行 `./aipd-skill/scripts/build`，Claude / Codex 均生成 10 个 skill，Codex agent 模板已生成。
- 已创建 Git tag `c0.7-before-legacy-cleanup` 指向清理 legacy 前的稳定提交，便于回看 v1 / v2-todo 旧材料。
- `docs/legacy/v1/` 和 `docs/legacy/v2-todo/` 已从工作树删除；`docs/legacy/README.md` 和 `_adoc/inbox.md` 已改为通过 tag 追溯旧材料。

## 7. 后续候选事项

- 本 case 完成后，更新 `c0.8-aipd-desktop-zero` 中所有 Desktop 路径和前置依赖。
- 判断是否需要在根 README 增加“仓库分层”章节。
- 判断 `_adoc/map.md` 是否需要新增 `aipd-skill/`、`aipd-desktop/` 的路由入口。
- 判断 `docs/modules/build-and-install.md` 是否需要按新路径重写。
- 将 `aipd2` 命名统一改回 `aipd`，包括 skill 名、文档、命令和目录引用。

## 8. 验收标准

- [x] 根目录职责清晰，Skill 本体、Desktop、项目认知、面向人文档不混在一起。
- [x] AIPD Skill 源码和脚本迁移到 `aipd-skill/` 后，构建 / 安装链路仍可用。
- [x] 根目录不再保留归属不清的 `src/`、`scripts/`、`modules/`、`dist/`。
- [x] `v1/`、`v2-todo/` 已处理为明确归档 / inbox / case 候选，不再作为根目录长期入口。
- [x] legacy 旧材料已通过 `c0.7-before-legacy-cleanup` 保留快照，当前工作树不再保留 `docs/legacy/v1/` 和 `docs/legacy/v2-todo/`。
- [x] README、docs、_adoc map 和相关 case 路径已同步。
- [x] 未创建 Desktop 项目；Desktop 创建留给后续 `c0.8`。

## 9. Weave 反向编织候选

- `_adoc/map.md` - 若本结构稳定，应补充新目录路由。
- `_adoc/L5-dev/index.md` - 若构建 / 安装路径变化成为长期工程规则，应更新。
- `README.md` - 面向用户的仓库结构说明需要同步。
- `docs/modules/build-and-install.md` - 构建安装路径必须同步。
- `c0.8-aipd-desktop-zero` - Desktop case 必须在本 case 完成后基于新路径迭代。

## 10. 自迭代观察锚点

- [x] Agent 执行迁移前是否先用 `rg` 审计路径引用，而不是直接移动目录。
- [x] Agent 是否先验证 `v1/`、`v2-todo/` 内容价值，而不是直接删除。
- [x] Agent 是否把 Skill 本体和 Desktop 解耦，避免让基础 Skill 依赖 Desktop。
- [x] Agent 是否执行构建 / 安装验证，避免只改文档不验证脚本。
- [x] Agent 是否在迁移完成后更新 `c0.8` 的路径假设。

## 11. 归档状态

- **状态**：进行中
- **创建时间**：2026-06-15
- **归档时间**：

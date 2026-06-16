# Target Structure: AIPD-2 Repository

> 本文记录仓库重分类后的目标结构。它是 c0.7 执行时的结构依据。

## 1. 目标结构

```text
AIPD-2/
├── _adoc/
├── aipd-skill/
│   ├── src/
│   │   ├── core/
│   │   ├── platforms/
│   │   └── skills/
│   ├── scripts/
│   ├── modules/
│   └── dist/
├── aipd-desktop/
├── docs/
├── AGENTS.md
├── README.md
└── .gitignore
```

## 2. 目录职责

### `_adoc/`

AIPD-2 仓库自身的项目认知事实源。

它不是发布包的一部分，也不是用户使用 AIPD Skill 时必须复制的目录。它服务于本仓库的 AI 协作研发。

### `aipd-skill/`

AIPD2 Skill 本体源码和构建相关内容。

包含：

- `src/`：Skill 源码、模板、平台适配。
- `scripts/`：构建、开发安装、用户安装、项目安装脚本。
- `modules/`：若确认属于 Skill 运行 / 打包 / 模块材料，则收进这里。
- `dist/`：Skill 构建产物。

### `aipd-desktop/`

AIPD Desktop 桌面端产品。

后续由 c0.8 创建，技术基线暂定：

```text
Tauri + Vue 3 + Vite + TypeScript + Rust backend
```

它可以读取 AIPD 项目结构并增强使用体验，但不能成为 AIPD Skill 的运行前提。

### `docs/`

面向人的学习、解释、使用和设计文档。

`docs/` 可以引用 `_adoc/` 的概念，但不替代 `_adoc/` 的项目事实源职责。

## 3. 根目录不应长期保留

目标状态下，根目录不应长期保留：

- `src/`
- `scripts/`
- `modules/`
- `dist/`
- `v1/`
- `v2-todo/`
- `apps/`

例外：

- 如果执行中发现某个目录并不属于 Skill 本体，需要在 case 执行记录中说明并重新归类。

## 4. 路径迁移表

| 当前路径 | 目标路径 | 说明 |
|---|---|---|
| `src/` | `aipd-skill/src/` | Skill 源码 |
| `scripts/` | `aipd-skill/scripts/` | Skill 构建 / 安装脚本 |
| `modules/` | `aipd-skill/modules/` | 待审计，若属于 Skill 则迁入 |
| `dist/` | `aipd-skill/dist/` | Skill 构建产物 |
| `v1/` | `docs/legacy/v1/` 或 `_adoc` 候选 | 不直接删除 |
| `v2-todo/` | `_adoc/inbox.md` / case / archive 候选 | 不直接删除 |
| `apps/aipd-desktop/` | `aipd-desktop/` | 不使用 `apps/` 层 |

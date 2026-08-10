# Project Placement: AIPD Desktop

> 本文记录 AIPD Desktop 在 `AIPD-2` 仓库中的落位判断。该判断依赖前置 case `c7-repo-structure-reclassification`。

## 1. 当前结论

- **产品名**：AIPD Desktop。
- **推荐目录**：`aipd-desktop/`。
- **定位**：AIPD Skill / ADOC 体系的增强桌面客户端，不是基础 skill 的运行前提。
- **依赖方向**：AIPD Desktop 读取和增强 AIPD 文件结构；AIPD 基础 skill 不依赖 AIPD Desktop。

## 2. 为什么不用 `apps/`

本仓库不是多 app 产品线，不需要为了一个桌面端额外引入 `apps/` 层。

预期根目录在 c7 重构后会变成：

```text
AIPD-2/
├── _adoc/
├── aipd-skill/
├── aipd-desktop/
├── docs/
├── AGENTS.md
└── README.md
```

在这个结构下，`aipd-desktop/` 作为根目录一级产品已经足够清晰。

## 3. 为什么不直接把 Tauri 文件放仓库根目录

Tauri + Vue 项目会自然生成：

```text
src/
src-tauri/
package.json
vite.config.ts
index.html
node_modules/
target/
```

这些文件必须放在 `aipd-desktop/` 内部，不能散落在仓库根目录。否则会再次混淆 AIPD Skill 本体、仓库文档和 Desktop 产品。

## 4. 对后续实现的约束

- Desktop 项目目录是 `aipd-desktop/`，不是 `apps/aipd-desktop/`。
- 不在仓库根目录直接初始化 Tauri。
- 桌面端可以有自己的 `package.json`、`Cargo.toml`、`src/`、`src-tauri/`。
- AIPD Skill 本体应位于 `aipd-skill/`，不与 Desktop 的 `src/` 混用。
- 根目录是否升级为 workspace，等 Desktop 跑通后再决定；第零版不强制引入 pnpm workspace。

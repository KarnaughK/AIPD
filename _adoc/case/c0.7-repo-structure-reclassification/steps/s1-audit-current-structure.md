# Step 1: Audit Current Structure

## 目标

审计当前仓库结构、路径引用、构建安装脚本和历史材料价值，为后续迁移提供事实依据。

## 上下文

- `../case.md`
- `../doc/target-structure.md`
- `../doc/migration-plan.md`
- `README.md`
- `_adoc/index.md`
- `_adoc/map.md`

## 要做

- 列出当前根目录一级目录职责。
- 判断 `src/`、`scripts/`、`modules/`、`dist/` 是否都属于 AIPD Skill 本体。
- 检查 README、docs、_adoc、AGENTS 中的旧路径引用。
- 检查 `v1/`、`v2-todo/` 内容价值和建议归属。

## 不做

- 不移动目录。
- 不修改构建脚本。
- 不创建 `aipd-desktop/`。

## 建议命令

```bash
find . -maxdepth 2 -type d | sort
rg -n "src/|scripts/|dist/|modules/|v1/|v2-todo|aipd-skill|aipd-desktop" README.md docs _adoc AGENTS.md
rg -n "build|install|src/platforms|src/skills|src/core" .
```

## 验收

- 输出当前结构审计摘要。
- 输出路径引用清单。
- 输出历史材料处理建议。
- 明确 Step 2 是否可以迁移。

## 执行记录

### 2026-06-16

结论：
- 当前根目录存在旧结构：`src/`、`scripts/`、`modules/`、`dist/`、`v1/`、`v2-todo/`。
- `src/`、`scripts/`、`dist/` 明确属于 AIPD2 Skill 本体；`modules/` 当前为空，但作为 Skill 本体候选目录迁入 `aipd-skill/`。
- `v1/` 是 AIPD v1 历史框架材料；`v2-todo/` 是早期待讨论和已完成事项材料。
- README、docs、_adoc、skill 自引用里存在旧路径引用，需要 Step 4 同步更新。

建议：
- Step 2 可以迁移。
- `v1/`、`v2-todo/` 不删除，整体迁入 `docs/legacy/`，并对 `v2-todo` 在 inbox 留后续判断索引。

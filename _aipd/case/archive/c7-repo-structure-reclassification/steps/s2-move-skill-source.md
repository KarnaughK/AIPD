# Step 2: Move Skill Source

## 目标

创建 `aipd-skill/`，并将 AIPD Skill 本体相关目录迁移进去。

## 上下文

- `../case.md`
- `../doc/target-structure.md`
- `../doc/migration-plan.md`
- `s1-audit-current-structure.md` 的审计结果

## 要做

- 创建 `aipd-skill/`。
- 迁移：
  - `src/` -> `aipd-skill/src/`
  - `scripts/` -> `aipd-skill/scripts/`
  - `modules/` -> `aipd-skill/modules/`（若 Step 1 确认属于 Skill）
  - `dist/` -> `aipd-skill/dist/`
- 初步修正脚本中的相对路径。

## 不做

- 不处理 `v1/`、`v2-todo/`。
- 不创建 Desktop。
- 不改 Skill 业务逻辑。

## 验收

- 根目录不再有归属不清的 `src/`、`scripts/`、`modules/`、`dist/`。
- `aipd-skill/` 内结构清晰。
- 构建 / 安装脚本路径已初步修正。

## 执行记录

### 2026-06-16

已完成：
- 创建 `aipd-skill/`。
- 迁移 `src/` -> `aipd-skill/src/`。
- 迁移 `scripts/` -> `aipd-skill/scripts/`。
- 迁移空目录 `modules/` -> `aipd-skill/modules/`。
- 迁移 `dist/` -> `aipd-skill/dist/`。
- 修正脚本提示中的旧命令路径，并让 `build` 统计逻辑更稳健。

验证：
- `find aipd-skill -maxdepth 2 -type d` 显示 `src`、`scripts`、`modules`、`dist` 均已在 `aipd-skill/` 下。

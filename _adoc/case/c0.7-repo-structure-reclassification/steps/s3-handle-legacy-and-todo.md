# Step 3: Handle Legacy And Todo

## 目标

处理 `v1/` 和 `v2-todo/`，让历史材料和待整理事项不再占据根目录。

## 上下文

- `../case.md`
- `../doc/target-structure.md`
- `../doc/migration-plan.md`
- `s1-audit-current-structure.md` 的审计结果

## 要做

- 判断 `v1/` 是否移动到 `docs/legacy/v1/`。
- 判断 `v2-todo/` 内容是否进入 `_adoc/inbox.md`、新 case 或 archive。
- 保留处理记录，避免信息直接丢失。

## 不做

- 不直接删除历史材料。
- 不把未确认事项直接写入长期 L3 / L4 / L5。
- 不创建 Desktop。

## 验收

- 根目录不再有 `v1/`、`v2-todo/`。
- 历史材料有明确新归属。
- 待整理事项有 inbox / case / archive 记录。

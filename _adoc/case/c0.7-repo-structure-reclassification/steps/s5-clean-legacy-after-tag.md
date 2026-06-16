# Step 5: Clean Legacy After Tag

## 目标

在当前重构稳定点创建 Git tag 后，删除不再需要长期保留在工作树里的 `docs/legacy/v1/` 和 `docs/legacy/v2-todo/`。

## 上下文

- `../case.md`
- `../doc/target-structure.md`
- `../doc/migration-plan.md`
- `docs/legacy/README.md`
- `_adoc/inbox.md`

## 要做

- 确认当前重构提交已经存在。
- 在删除 legacy 前创建明确 Git tag，保留可回溯快照。
- 删除 `docs/legacy/v1/` 和 `docs/legacy/v2-todo/`。
- 更新 `docs/legacy/README.md` 和 `_adoc/inbox.md` 中对已删除目录的表述。
- 提交清理结果。

## 不做

- 不删除 `_adoc/case/archive/`。
- 不删除当前有效 docs / _adoc / aipd-skill。
- 不把 legacy 内容直接 weave 到 L1-L5；如有需要，先转 inbox 或新 case。

## 验收

- 删除前有 Git tag 可回看旧材料。
- 工作树不再包含 `docs/legacy/v1/` 和 `docs/legacy/v2-todo/`。
- README / inbox 不再把已删除目录描述为当前可读路径。

## 执行记录

- 已确认 tag `c0.7-before-legacy-cleanup` 存在，并指向 C0.7 首轮重构提交 `2f7baa86700c82ee3e3f0293f13cec7e90310c70`。
- 已删除 `docs/legacy/v1/` 和 `docs/legacy/v2-todo/`。
- 已更新 `docs/legacy/README.md`、`_adoc/inbox.md`、根 `README.md` 和本 case 状态，说明旧材料通过 tag 追溯。

# Legacy Materials

本目录用于说明 AIPD 演进过程中的历史材料处理方式。旧版材料不再保留在当前工作树中，也不作为当前实现和 Agent 路由入口。

## 可追溯快照

- 删除前快照：`c0.7-before-legacy-cleanup`
- 原 `docs/legacy/v1/`：AIPD v1 旧版框架资料、旧 skill 和旧 references。
- 原 `docs/legacy/v2-todo/`：AIPD 早期待讨论事项与已完成事项归档。

需要回看旧材料时，优先通过 Git tag 查看，例如：

```bash
git show c0.7-before-legacy-cleanup:docs/legacy/v2-todo/todo.md
```

## 使用规则

- 当前开发和 Agent 路由不要直接依赖本目录。
- 当前有效事项以 `_adoc/inbox.md`、`_adoc/case/` 和 `_adoc/map.md` 为准。
- 如果旧材料中的信息重新变得有价值，先转入 `_adoc/inbox.md` 或创建新 case，再判断是否 weave 到 L1-L5。

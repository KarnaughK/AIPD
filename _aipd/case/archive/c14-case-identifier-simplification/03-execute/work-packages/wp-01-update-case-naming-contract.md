# Work Package: wp-01 - 更新 Case 命名契约

> **所属 Case**: c14-case-identifier-simplification
> **Phase**: Execute
> **状态**: completed

## 目标

把 `cN-slug`、`wp-NN-slug`、`cN/wp-NN` 写入 AIPD 规则源和模板，并迁移 AIPD-2 自有 Case 标识。

## 完成项

- [x] Case / Work Package 核心语义说明。
- [x] `aipd-case` skill 创建规则。
- [x] Case / Work Package 模板与 ADOC 结构示例。
- [x] worker / 总入口示例。
- [x] AIPD-2 自有 Case 目录、标题和索引。
- [x] build、Codex install 与残留验证。

## 验证结果

- `./aipd-skill/scripts/build` 通过。
- `./aipd-skill/scripts/install-codex` 成功。
- `git diff --check` 通过。
- 新模板不再生成 `cA.B` 或 `cA.B.N` 形态。

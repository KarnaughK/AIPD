# Design：Case / Work Package 标识简化

## 状态

- **模式**：quick
- **Readiness Gate**：passed

## Requirements Contract

- Case ID 只表达项目内流水顺序，不表达产品版本。
- Case 名称格式：`cN-slug`。
- Work Package 名称格式：`wp-NN-slug`。
- Case 外完整引用：`cN/wp-NN`。
- 两位 `NN` 只用于文件排序，不代表版本位。

## Brownfield Delta

- 更新 Case overview、`aipd-case`、Case / Work Package 模板、worker 和 ADOC 结构示例。
- 将 AIPD-2 自有 `c0.1` … `c0.14` 映射为 `c1` … `c14`。
- 旧 `cA.B.N` Work Package 在所属 Case 内改为 `wp-NN`。
- 不改变 Case 生命周期和 phase-first 目录结构。

## 验证入口

- `./aipd-skill/scripts/build`
- Case 目录名与 `case.md` 标题一致性检查。
- `_adoc/case/index.md` 路径存在性检查。
- 旧命名残留扫描。
- `git diff --check`

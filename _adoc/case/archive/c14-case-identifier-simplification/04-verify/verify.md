# Verify

## Verify Result

- **状态**：passed
- **结论**：命名契约、源码、模板、AIPD-2 自有 Case 迁移、构建和安装均通过验收。

## 验收项

- [x] `cN-slug`、`wp-NN-slug`、`cN/wp-NN` 已写入规则源。
- [x] AIPD-2 的 13 个 Case 目录符合 `cN-slug`。
- [x] `case.md` 标题与目录名一致。
- [x] `_adoc/case/index.md` 引用均指向存在路径。
- [x] Work Package 文件符合 `wp-NN-slug.md`。
- [x] build 通过，Codex skill 和 Agent 模板安装成功。
- [x] `git diff --check` 通过。

## 残留风险

- 无阻塞风险。
- 产品发布版本仍由各产品自己的版本策略管理，与 Case ID 无关。

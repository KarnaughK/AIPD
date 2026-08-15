# Execute：价值优先文档入口

## 执行前 checkpoint

- **当前 Work Package**：`work-packages/wp-01-value-first-documentation-entry.md`。
- **设计输入**：`02-design/design.md` 的 Requirements Contract、Attention Contract、Design Reduction Scan 和 Readiness Gate。
- **执行方式**：Main 直接执行；四入口文案共享同一价值合同且改动高度耦合，派发与合并成本更高。
- **执行边界**：只修改四个授权文档的开场与必要价值衔接，以及本 Case 状态文件。
- **验收标准**：用户结果前置、三类继承明确、项目记忆后置命名、四入口职责不同、链接和技术事实保留。
- **禁止事项**：其他文档、Skill、脚本、dist、Knowledge、build、install、commit、push、发布和远端写入。
- **恢复入口**：`case.md`、`02-design/design.md`、当前 Work Package。
- **停止条件**：四文件完成并自检；若必须改变范围或事实则回 Design。

## Work Package 状态

- `wp-01-value-first-documentation-entry.md`：completed。

## 执行后 checkpoint

- **完成内容**：四个授权入口按 Attention Contract 完成价值顺序重排；没有修改其他用户文档或运行事实。
- **Reduction Delta**：delete 根 README 过早 slogan / 三条能力清单 / 重复总结；merge 三类继承成果；defer 内部对象与机制；reorder 四页为处境与结果优先。
- **执行偏差**：无；不需要回 Think 或 Design。
- **残留风险**：Leader 集成时需与其 checkout 的未提交文档改动按语义小块合并。
- **下一步**：Verify。
- **恢复入口**：Work Package 执行记录、`04-verify/verify.md`。

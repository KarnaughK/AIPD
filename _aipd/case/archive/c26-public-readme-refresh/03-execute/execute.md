# Execute: 根 README 刷新

## 当前状态

- **Work Package**：`work-packages/wp-01-refresh-root-readme.md`
- **状态**：completed
- **执行者**：Main；单文件高度内聚，派发 Child 的启动与合并成本高于收益。
- **设计输入**：`../02-design/design.md`（Requirements、Brownfield Delta、Attention Contract、readiness passed）。

## 执行前 checkpoint

- **当前目标**：在根 `README.md` 内完成 V2 新人首页校准，并保持链接与篇幅可控。
- **执行边界**：内容文件只改根 README；不改 Skill、脚本、dist、docs 或长期 Knowledge。
- **验收标准**：Case Contract 五项完成标准 + Design Verify 入口。
- **禁止事项**：不 install、build、push、发布、commit；不使用历史术语覆盖当前事实。
- **恢复入口**：`case.md` -> `02-design/design.md` -> `work-packages/wp-01-refresh-root-readme.md`。
- **预期返回**：README diff、验证结果、残留风险；完成后进入 Verify。

## 执行记录

- `wp-01` 已由 Main 完成，唯一内容改动为根 `README.md`。
- 已补可靠性、首次三 Skill 闭环、Schema / Update / Interaction / Leader / Main-Child / topology 边界和 Skill 分发层级。
- 初检通过：14 个本地链接 / 锚点、`git diff --check`、九个公共 Skill + 独立仓库级 learn。

## 执行后 checkpoint

- **结论**：所有 Work Package 已完成；没有范围扩大或上游缺口。
- **残留风险**：需要 Verify 对最终文档做注意力减法扫描，并核对当前 / 历史术语。
- **下一步**：进入 `../04-verify/verify.md`。
- **恢复入口**：`work-packages/wp-01-refresh-root-readme.md#执行记录` -> `../04-verify/verify.md`。

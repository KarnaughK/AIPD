# Execute：AIPD V2 学习文档刷新

## 执行状态

- **当前 Work Package**：无；全部完成。
- **执行者**：Main Agent；两个包叙事与链接高度耦合，顺序执行的净收益高于派发。
- **设计输入**：`02-design/design.md`；Readiness Gate passed。
- **允许写入**：`docs/**`、本 Case 流程文件和 `_aipd/case/index.md` 的本 Case 状态。
- **禁止事项**：根 README、Skill / 脚本 / dist、其他 Knowledge / Case；不 install、commit、push。
- **恢复入口**：`case.md` -> `02-design/design.md` -> 当前 Work Package。

## Work Packages

| Work Package | 状态 | 依赖 | Owner |
|---|---|---|---|
| `wp-01-refresh-module-reference` | completed | Design | Main |
| `wp-02-refresh-learning-journey` | completed | wp-01 | Main |

## 执行 checkpoint

| 时间 | Work Package | 状态变化 | 结果 / 风险 | 下一步 | 恢复入口 |
|---|---|---|---|---|---|
| 2026-08-13 | wp-01 | pending -> in_progress | 模块事实包和文件边界已确认；无拓扑敏感代码变化 | 新增 3 页并校准 5 个现有 modules | `work-packages/wp-01-refresh-module-reference.md#执行前-checkpoint` |
| 2026-08-13 | wp-01 -> wp-02 | wp-01 completed / wp-02 in_progress | 3 个新模块页与相关交叉入口完成；数量和核心事实抽查一致 | 更新 docs 索引与 guide 02 / 03 / 05 / 06 | `work-packages/wp-02-refresh-learning-journey.md#执行前-checkpoint` |
| 2026-08-13 | wp-02 -> Verify | wp-02 completed | 导航与 guide 刷新完成；23 个 Markdown 相对链接 / 锚点检查 0 failure | 执行完整 Verify 与 Reduction Scan | `../04-verify/verify.md` |

## Verification Notes

- 两个 Work Package 均按 Design 文件所有权完成，没有改动根 README、Skill、脚本或 dist。
- 自动链接检查已预跑通过；完整命令 / 路径 / 旧语义 / 修改范围检查留在 Verify。

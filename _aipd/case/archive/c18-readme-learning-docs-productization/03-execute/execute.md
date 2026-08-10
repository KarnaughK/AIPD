# Execute：README 与学习文档产品化

## 执行前 checkpoint

- **当前目标**：按已通过的 Design 依次完成首页 / 连续课程重写和 modules 事实校准。
- **恢复入口**：`case.md`、`02-design/design.md`、当前 work package。
- **执行边界**：只修改根 README、`docs/` 和本 Case 状态文件；不修改 Skill 行为，不安装、不提交、不推送。
- **预期输出**：完整文档改动、work package 执行记录、可进入 Verify 的状态。
- **停止条件**：两个工作包完成，或发现需要改变 Case Contract 的产品方向冲突。
- **返回位置**：完成后更新本文件与 `case.md`，进入 `04-verify/verify.md`。

## Work Packages

| Work Package | 状态 | 依赖 | 执行者 |
|---|---|---|---|
| `work-packages/wp-01-rebuild-entry-and-learning-journey.md` | completed | Design passed | Main Agent |
| `work-packages/wp-02-align-modules-with-current-aipd.md` | completed | wp-01 | Main Agent |

## 当前执行游标

无；所有必要 Work Package 已完成。

## 最近 checkpoint

wp-01 与 wp-02 均 completed：根 README、docs 入口、六篇 guide 和 11 篇 modules 已完成产品化改写与事实校准；没有范围变化或设计缺口，进入 Verify。

## 执行后 checkpoint

- **当前结论**：所有必要 Work Package completed。
- **主要交付**：根 README 决策页；体验 / 学习 / 查阅分流；六章连续课程；11 篇 explanation / reference modules。
- **残留风险**：尚需自动检查相对链接、Markdown 格式、Skill / 命令 / 目录事实，并做一次从 README 到首轮闭环的人工阅读路径检查。
- **下一步**：Verify。
- **恢复入口**：`04-verify/verify.md`。

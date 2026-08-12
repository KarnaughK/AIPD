# Execute：嵌入触发式减法循环

## 执行前 checkpoint

- **当前目标**：按 Design 将产品注意力与减法机制写入 AIPD 经验、Design、Verify 和 Goal Mode。
- **恢复入口**：`case.md`、`02-design/design.md`、当前 Work Package。
- **执行边界**：只修改 AIPD 规则源码和本 Case；不安装、不提交、不推送，不创建新 Skill / phase / SOP。
- **停止条件**：四个运行落点完成，或发现必须改变 Case 生命周期才能实现。
- **返回位置**：完成后进入 `04-verify/verify.md`。

## Work Packages

| Work Package | 状态 | 依赖 | 执行者 |
|---|---|---|---|
| `work-packages/wp-01-embed-triggered-reduction-loop.md` | completed | Design passed | Main Agent |

## 执行后 checkpoint

- **当前结论**：四个运行落点已经完成，不需要改变 Case 生命周期。
- **主要交付**：具象经验、经验索引、Design Attention Contract、Verify Reduction Scan、Goal Mode 自主回跳。
- **残留风险**：源码尚需 build / check-dist；用户级 Codex 环境尚未安装。
- **下一步**：Verify。
- **恢复入口**：`04-verify/verify.md`。

# Execute：内部认知与维护者文档刷新

## 执行策略

- **运行时选择**：Main Agent 连续执行。
- **原因**：三个 Work Package 共享同一事实矩阵、术语和数量边界，内容写入高度耦合；没有两条无冲突的独立证据面，派发 Child 的上下文和合并成本更高。
- **全局边界**：只改 Case Contract 允许的内容文件与 c25 流程文件；不改源码 / dist，不 build / install / commit / push / 发布。

## Work Package 状态

| Work Package | 状态 | 结果 |
|---|---|---|
| `work-packages/wp-01-workspace-map-entries.md` | completed | gate、Workspace 模块和维护者 Map 入口已补齐；diff check 通过 |
| `work-packages/wp-02-current-core-runtime-terms.md` | completed | 九模型补齐 Leader；Main / Child、Work Package 与 4 指引 / 3 Codex Agent 已校准 |
| `work-packages/wp-03-maintainer-readme.md` | completed | 版本化 Update、平台装配、校验 / 迁移与 Learn owner 导航已补齐 |

## 当前游标

- 所有 Work Package completed；下一游标 `04-verify/verify.md`

## 执行 checkpoint

- **当前目标**：Execute 已完成，交由 Verify 验收九项事实、路径、数量、旧语义和所有权范围。
- **停止条件**：Verify passed；或发现上游缺口后按记录回跳。
- **返回位置**：`04-verify/verify.md`。
- **恢复入口**：本文件 -> 三个 Work Package 执行记录 -> `04-verify/verify.md`。

## 执行结果

- wp-01、wp-02、wp-03 全部 completed。
- 内容修改只落在 Design 声明的 9 个文件；未修改源码、dist、安装环境或远端状态。
- 无事实冲突、设计回跳或残留执行阻塞。

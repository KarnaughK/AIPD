# Case: c29-dsh-headless-dispatch

> **本次事项目标**：用 Cursor Leader 调一次 DSH headless，验证文件写回和压缩返回能否闭环。
> **当前 Phase**：Close

## Case Contract

### 目标

- **目标**：证明 Cursor Leader 能按方式 A 调用 DSH，且 DSH 作为 Case 执行层会读 Case / work package 并写回文件。
- **方向 / OKR / 项目阶段关联**：当前 Mission 是把 DSH 做成 Cursor 上的 Case runtime；先调通调用链，不升 Skill 发布。

### 要做

- DSH 读取本 Case 和 `wp-01-write-dispatch-checkpoint.md`。
- 在本 Case 目录写回一份短结果文件，并更新 `03-execute/execute.md` 与本文件状态。
- 返回压缩结果：Case id、改动文件、验证、风险、恢复位置。

### 不做

- 不改 `aipd-skill/`、`AGENTS.md`、Knowledge、Map、README、docs。
- 不 install、不发布、不接付费、不改远端。
- 不创建第二个 Case，不另开同级 DSH 会话。
- 不把这次成功写成「DSH runtime 已正式晋升」。

### 完成标准

- [x] DSH headless `exit 0`
- [x] `03-execute/dsh-dispatch-result.md` 存在且写明自己读到的 Case id
- [x] `03-execute/execute.md` 已更新
- [x] 本文件 `当前 Phase` 可被 Leader 据文件验收

### 上下文索引

- `_aipd/manifest.json`
- `_aipd/case/c29-dsh-headless-dispatch/case.md`
- `_aipd/case/c29-dsh-headless-dispatch/03-execute/work-packages/wp-01-write-dispatch-checkpoint.md`

### 边界

- 只写本 Case 目录内文件。
- 宿主是 Cursor；执行层是 DSH headless，不是 Cursor 子 Agent。

## Runtime

- **Current Phase**：Close
- **Phase State**：completed / archived（实验完成；非正式 runtime）
- **关闭时间**：2026-08-16
- **归档位置**：`_aipd/case/archive/c29-dsh-headless-dispatch/`
- **恢复位置**：`05-close/close.md`

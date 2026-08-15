# Verify: c29-dsh-headless-dispatch

## Leader 验收

- 验收人：Cursor Leader（本对话）
- 时间：2026-08-14
- 结论：调用链通过，**不**等于 DSH runtime 已正式晋升

## 核对

| 项 | 结果 |
|---|---|
| DSH headless `exit 0` | 通过；约 40s |
| 压缩返回格式 | 通过；有 Case id、phase、改动文件、验证、风险、恢复位置 |
| `dsh-dispatch-result.md` | 通过；写明 Case id、执行角色、`dsh --profile headless` |
| `execute.md` / `case.md` 写回 | 通过 |
| 未改 Case 外文件 | 通过；Skill / runtime 改动是 Leader 事先做的，不是本轮 DSH 写的 |
| 任务自报完成 | 不单独采信；以上以文件为准 |

## 坑

- 本机 Cursor Agent 的 PATH 里没有 `dsh`。`command -v dsh` 会失败。`npx --no-install @deepseek-ai/dsh` 能打到缓存的 `0.1.0-rc.6`。
- DSH 勾了 `case.md` 完成标准，但没勾 `wp-01` 里的复选框。headless 无状态，下一轮必须再读文件，不能靠它记得勾过。

## 不做

- 不把本次成功写成 `$aipd-leader` 已对所有用户生效。源码已改，需 build；install 仍要用户确认。

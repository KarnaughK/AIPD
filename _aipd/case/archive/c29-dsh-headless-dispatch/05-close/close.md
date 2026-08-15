# Close：c29-dsh-headless-dispatch

## 关闭前状态

- Think：skipped
- Design：skipped
- Execute：wp-01 completed；DSH headless 写回 `dsh-dispatch-result.md`
- Verify：Leader accepted（2026-08-14）；调用链通过，未晋升正式 runtime
- 阻塞：无

## 关闭原因

用户于 2026-08-16 要求关掉 `c29` / `c30`，保留已经改动的代码，把 DSH 实验收口后另开新 Case。本 Case 的实验目标已经验收，不再继续。

## 交付摘要

- 证明 Cursor Leader 能按方式 A 调用 DSH headless，执行层会读 Case / work package 并写回本 Case 目录。
- 压缩返回含 Case id、phase、改动文件、验证、风险、恢复位置。
- 明确这不是 `$aipd-leader` 对所有用户生效，也不是 DSH runtime 正式晋升。

## 验收摘要

- DSH headless `exit 0`，约 40s。
- `03-execute/dsh-dispatch-result.md` 写明 Case id 与 `dsh --profile headless`。
- 未改 Case 外业务文件；Skill / runtime 改动属于后续 `c30` 源码工作，不由本轮 DSH 写入。

## 长期认知与归档候选

| 内容 | 当前状态 | 候选归属 | Close 判断 |
|---|---|---|---|
| Cursor 上可用 `npx --no-install @deepseek-ai/dsh --profile headless` 做文件写回 | 已验证 | Engineering / 仅留 Case | 延后；方向已改为 Cursor Agent，不把 DSH 写成长期默认 runtime |
| PATH 无 `dsh`、headless 无会话记忆、下一轮只信报文 | 已验证坑 | 仅留 Case | 不回写；新执行层不再以 DSH 为准 |
| DSH 作为正式 Case runtime | 明确未晋升 | 无需回写 | 不回写 |

- **已回写**：无。用户要求先收口，不在本轮 Weave。
- **延后回写**：无自动 Weave。
- **仅留 Case**：调用链证据、坑、Leader 验收口径。
- **无需回写**：未晋升的 runtime 叙事。

## Archive 决策

- 外部引用主要在 `_aipd/case/index.md`、`_aipd/leader/` 与 `c30`。关闭时一并改到 archive 路径。
- 决策：移动到 `_aipd/case/archive/c29-dsh-headless-dispatch/`。

## 未执行动作

- 不回滚已有代码。
- 不 uninstall DSH / Cursor Skill。
- 不把 DSH 写成正式默认执行层。

## 关闭结果

- **状态**：completed / archived（实验完成；非正式 runtime）
- **关闭时间**：2026-08-16
- **归档位置**：`_aipd/case/archive/c29-dsh-headless-dispatch/`
- **残留风险**：本机 `~/.dsh/skills/` 仍可能留有上一轮 `install-cursor` 产物；由后续 Case 处理

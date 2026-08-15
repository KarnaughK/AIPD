# Close：c30-cursor-leader-platform

## 关闭前状态

- Think：skipped
- Design：completed
- Execute：wp-01 completed（Cursor 平台包 + `install-cursor` 双目录安装）；wp-02 未做
- Verify：未进入
- 阻塞：无；方向被用户改写

## 关闭原因

用户于 2026-08-16 要求关掉 `c29` / `c30`，**保留已经改动的代码**，在项目干净后另开新 Case：Cursor Leader 特制化，并把 Case 执行层从 DSH 改成已登录的 `cursor-agent`。

本 Case 合同仍是「Cursor Leader + DSH 执行层」。继续做 wp-02 会把旧方向做完，因此停止而不是做完再关。

## 交付摘要（保留）

- 新增 `aipd-skill/src/platforms/cursor/`，至少有 Leader runtime。
- 新增 `aipd-skill/scripts/install-cursor`，一次写入 `~/.cursor/skills/` 与 `~/.dsh/skills/`。
- `./aipd-skill/scripts/build cursor` 已通过；用户确认后已跑过 `install-cursor`。
- 公共 / Codex Leader 源码里已出现宿主判断和 DSH 分支；wp-02（Codex 包拆回只认 Codex）未做。

## 未完成 / 取消

- [ ] Codex dist 的 Leader runtime 不再把 DSH 当默认 — **取消**，交给后续 Case
- [ ] 默认 `build` + `check-dist` 仍通过 — **未在本 Case 收口**
- [ ] 新开 Cursor 对话能看到 `$aipd-leader` — **未作为关闭条件**
- wp-02 整包取消

## 长期认知与归档候选

| 内容 | 当前状态 | 候选归属 | Close 判断 |
|---|---|---|---|
| Cursor 平台目录与 `install-cursor` 双落点 | 已实现，未按新方向验收 | Engineering / 仅留 Case | 延后；代码保留，合同将被后续 Case 改写 |
| Cursor + DSH 绑定安装 | 用户 2026-08-14 确认，2026-08-16 被替代 | 仅留 Case | 不回写为长期默认 |
| Codex 包去掉 Cursor / DSH 分支 | 未完成 | 后续 Case | 延后 |

- **已回写**：无。本轮不 Weave。
- **延后回写**：平台包目录、安装脚本、宿主判断，等新 Case 把执行层改成 `cursor-agent` 后再判断。
- **仅留 Case**：DSH 绑定合同、wp-02 取消原因。
- **无需回写**：未完成的 Codex 拆包验收。

## Archive 决策

- 外部引用主要在 `_aipd/case/index.md` 与 `_aipd/leader/`。关闭时改到 archive 路径。
- 决策：移动到 `_aipd/case/archive/c30-cursor-leader-platform/`。

## 未执行动作

- 不删除或回滚 `platforms/cursor/`、`install-cursor`、已安装的本机 Skill。
- 不跑 uninstall，不改远端，不 Weave。

## 关闭结果

- **状态**：stopped / archived（方向被替代；代码保留）
- **关闭时间**：2026-08-16
- **归档位置**：`_aipd/case/archive/c30-cursor-leader-platform/`
- **残留风险**：已安装 Skill 仍写 DSH 执行层；源码里 Codex 拆包未完成

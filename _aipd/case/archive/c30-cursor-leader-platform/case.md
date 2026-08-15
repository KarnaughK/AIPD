# Case: c30-cursor-leader-platform

> **本次事项目标**：做出可安装到 `~/.cursor/skills/` 的 Cursor 版 AIPD Skill，Leader 以 Cursor 为主、DSH 为 Case 执行层；Codex 包回到只认 Codex。
> **当前 Phase**：Close

## Case Contract

### 目标

- **目标**：把 Cursor + DSH 从焊在 Codex 包里的宿主判断，拆成独立的 Cursor 平台包，并装进 Cursor 自己的全局 Skill 目录。
- **方向 / OKR / 项目阶段关联**：当前 Mission 是 Cursor 上的 Leader 能调度 DSH。本机已关掉第三方 Skill 兼容，新对话不再读 `~/.codex/skills`。

### 要做

- 新增 `aipd-skill/src/platforms/cursor/`，至少覆盖 Leader runtime。
- Cursor 版 `$aipd-leader` 文案：Cursor 是 Leader 宿主，DSH headless 是 Case 执行层；没有 DSH 就停。
- 新增 `install-cursor`：一次同时把同一套 Cursor 产物复制到 `~/.cursor/skills/` 和 `~/.dsh/skills/`。这两个软件绑定使用，不要只装一边。
- Codex 包去掉 Cursor / DSH 分支，恢复只认 Codex task。
- 默认 `build` / `install` / `check-dist` 仍只验收 Codex。

### 不做

- 不装进 `~/.cursor/skills-cursor/`。
- 不把泛名 `install` 改去写 Cursor / DSH 目录。
- 不把 Cursor 包装进 `~/.codex/skills/`。
- 不重写 `$aipd-case` 生命周期，不拆 Codex runtime。
- 不发布、不改远端、不改飞书 OKR。
- 不在本 Case 里做猜单词或爬数业务。

### 完成标准

- [x] `./aipd-skill/scripts/build cursor` 能出 Cursor 产物
- [x] `install-cursor` 后 `~/.cursor/skills/aipd-leader` 与 `~/.dsh/skills/aipd-leader` 同时存在，且正文以 Cursor + DSH 为主
- [ ] Codex dist 的 Leader runtime 不再把 DSH 当默认 — 关闭时取消，交给后续 Case
- [ ] 默认 `build` + `check-dist` 仍通过 — 关闭时未收口
- [ ] 新开 Cursor 对话能看到 `$aipd-leader`，且不再依赖 `~/.codex/skills` — 关闭时未作为条件

### 上下文索引

- `_aipd/leader/dsh-case-runtime.md`：已调通的 headless 调用链和坑
- `_aipd/case/archive/c29-dsh-headless-dispatch/`：headless 文件写回证据
- `aipd-skill/src/skills/aipd-leader/SKILL.md`
- `aipd-skill/src/core/leader/runtime.md`
- `aipd-skill/src/platforms/codex/core/leader/runtime.md`
- `aipd-skill/scripts/build`、`install-codex`、`check-dist`
- Cursor 全局目录：`~/.cursor/skills/`；DSH 用户 Skill 目录：`~/.dsh/skills/`；内置目录禁止写入：`~/.cursor/skills-cursor/`
- 本机事实：`cursor/thirdPartyExtensibilityEnabled = false`；`~/.cursor/skills/` 与 `~/.dsh/skills/` 安装前都不存在。DSH headless 默认扫 `~/.dsh/skills/`；本机 DSH web profile 仍可能只桥 `~/.codex/skills/`，不在本 Case 自动改用户 patch。

### 新对话怎么进

在 AIPD 仓库新开对话，先读本文件和 `02-design/design.md`，再按 work package 执行。第三方兼容已关，不要去读或安装 `~/.codex/skills`。需要 Skill 规则时读仓库源码 `aipd-skill/src/skills/aipd-case/SKILL.md` 与 `aipd-skill/src/skills/aipd-leader/SKILL.md`。

## Case Runtime

## Current Phase

Close

## Phase State

- Think: skipped
- Design: completed -> `02-design/design.md`
- Execute: stopped -> `03-execute/execute.md`（wp-01 completed；wp-02 cancelled）
- Verify: skipped
- Close: completed -> `05-close/close.md`

## 当前焦点

- **当前要解决的问题**：按用户 2026-08-16 指令停止本 Case，保留代码
- **当前游标**：`05-close/close.md`
- **下一步建议**：不要续跑 wp-02；后续 Case 把执行层改成 `cursor-agent`
- **压缩后恢复入口**：`05-close/close.md`
- **待确认项**：无
- **阻塞项**：无；已关闭

## 边界变更记录

- 2026-08-14：用户确认 Cursor 与 DSH 绑定使用，安装时两者一起装。原合同「DSH 只当调用层、只写 `~/.cursor/skills/`」作废；双落点为 `~/.cursor/skills/` + `~/.dsh/skills/`。
- 2026-08-16：用户要求关闭本 Case 并保留代码；DSH 执行层合同停止，不再做 wp-02。

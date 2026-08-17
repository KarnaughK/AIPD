# Case: c31-cursor-leader-agent-runtime

> **本次事项目标**：Cursor 桌面端当 Leader，本机 `cursor-agent` 当 Case 执行层。Leader 只规划、调度和最后收口；DSH 从 Cursor 合同里拿掉；不提目标模式。
> **当前 Phase**：Close

## Case Contract

### 目标

- **目标**：Cursor 只保留一条链：桌面端 `$aipd-leader` 调控，已登录的 `cursor-agent` 把每个 Case 做完。DSH 不再出现在这条链里。
- **方向 / OKR / 项目阶段关联**：接替已关闭的 `c29` / `c30`。那两案是「没发现 Cursor Agent 之前」的 DSH 方案；代码文件保留，合同作废。

### 要做

1. **特制 Cursor 侧 Leader Skill**
   - Leader 主要做调控和监督：先规划这条 Mission 的 Case 路线，再按顺序把执行 Agent 一个一个派过去。路线有几条 Case 由任务决定，不写死数量。
   - 一个 Case 是完整执行单元。Think / Design / Execute / Verify / Close 都由执行 Agent 做完，不是 Leader 代做验证。
   - Leader 只在最后收口：看 Case 是否关闭、有没有越界、能不能进下一个 Case。这是小范围核对，不是重跑 Case Verify。
   - 推进身份是 Leader 推进，不是放手随意推进。
   - Cursor 平台包里的 Skill / runtime **不提目标模式**，不加载 `goal-mode.md`，不写「目标模式绑定」。Codex 包保持现有 goal 合同。
2. **执行层只用 Cursor Agent**
   - 命令用 `cursor-agent`，不用 PATH 上的裸 `agent`。
   - 鉴权用已经 `cursor-agent login` 的 Cursor 账号状态，不走 `CURSOR_API_KEY` / `--api-key`。
   - 不要用对话内 Task / 子 Agent / Cloud Agent / `move_agent_to_root` 顶 Case 执行层。
   - 不找 DSH，不装 DSH，不写 `~/.dsh/skills/`，runtime 里不留 DSH 退路。

### 不做

- 不回滚 `c30` 已落地的 `platforms/cursor/` 和 `install-cursor` 文件；在它们上面改成「只服务 Cursor」。
- 不把 DSH 留作备用执行层，也不做 Cursor + DSH 双安装。
- 不借这个 Case 重做 Codex 包，也不为「同一份 Skill 打进两个平台」单开覆盖工程。Codex 主链路保持原样；只改 Cursor 会读到的 DSH 旧句子。
- 不在本 Case 做 seo-keyword-radar 的 Product Hunt / AITDK 找词工作流。
- 不发布、不改远端、不改飞书 OKR。
- 不把 install 自动跑掉；build 可以做，install 等用户明确确认。

### 完成标准

- [x] Cursor 平台 Leader Skill / runtime 写明：规划 Case 路线、按序调度执行 Agent、最后收口；不代做 Case 内验证
- [x] Cursor 平台产物不出现目标模式 / `goal-mode` / `create_goal` 叙述或注入
- [x] Cursor Case 执行层默认是已登录的 `cursor-agent` 无头调用，不再找 DSH
- [x] 派发方式禁止 Task / 子 Agent / Cloud Agent 顶第三层；状态仍只写在 Case 文件
- [x] `install-cursor` 只写 `~/.cursor/skills/`，文案和脚本都不再提 DSH
- [x] `./aipd-skill/scripts/build cursor` 通过；默认 Codex `build` / `check-dist` 不被这次改坏
- [x] 用户确认后的 install 只在明确授权时执行

### 上下文索引

#### 知识域判断

- **Intent**：只涉及宿主运行时，不改项目长期方向正文
- **Research**：否
- **Core**：Leader 与 Case 执行层的职责切分
- **Product**：`$aipd-leader` 在 Cursor 上的可见行为
- **Engineering**：平台覆盖、install 落点、执行层命令
- **局部 README**：`aipd-skill/README.md`
- **Case / 历史 Work Package**：已归档 `c29`、`c30`

#### 项目认知

- `_aipd/map.md` — Leader / Case / Skill 维护入口
- `_aipd/knowledge/core/horizontal-capabilities.md` — Case / Leader 横向能力
- `_aipd/knowledge/engineering/index.md` — 构建安装合同
- `aipd-skill/src/core/case/goal-mode.md` — 仅作「Cursor 包不要带这个」的对照，不在 Cursor 产物里使用
- `aipd-skill/src/platforms/codex/core/agent-guide.md` — Codex 仍保留 goal；本 Case 不改这条主链路，只避免 Cursor 包沾上
- `aipd-skill/src/platforms/cursor/core/leader/runtime.md` — 当前仍写 DSH，本 Case 要改
- `aipd-skill/src/skills/aipd-leader/SKILL.md`
- `aipd-skill/src/core/leader/runtime.md`
- `_aipd/case/archive/c29-dsh-headless-dispatch/`
- `_aipd/case/archive/c30-cursor-leader-platform/`
- `_aipd/leader/dsh-case-runtime.md` — 已关闭 Mission，只作背景

#### 兜底搜索

- `rg "dsh|cursor-agent|目标模式|goal-mode" aipd-skill/src _aipd docs`

### 边界变更记录

- 2026-08-16：用户确认关闭 `c29` / `c30` 并保留代码；新 Case 做 Leader 特制化与 `cursor-agent` 替换 DSH。鉴权用已登录 Cursor，不用 API key。
- 2026-08-16：用户确认 Cursor 没有目标模式就扔掉；Cursor 包不提目标模式。Leader 只调控、规划路线、按序调度；Case 由执行 Agent 从头到尾开发验证；Leader 只最后收口，不代做 Case 验证。用户说的「3～5 个 Case」只是举例，不是定额。
- 2026-08-16：用户确认 DSH 整条用不上。运行时就是 Cursor 桌面端 + `cursor-agent`。不为 Cursor+DSH 或「Skill 打进两个平台」做覆盖设计。

### 暂定假设

- 执行层模型跟 Leader 同级最高可用模型，不套 Codex 的 `gpt-5.6-sol` 表。
- 共享 `aipd-case` 里「有平台 goal 才加载」的旧句子，本 Case 不单独为 Cursor 开覆盖包。Leader / Cursor runtime / `install-cursor` 保证不提目标模式、不提 DSH 即可。

## Case Runtime

## Current Phase

Close

## Phase State

- Think: completed -> `01-think/think.md`
- Design: completed -> `02-design/design.md`
- Execute: completed -> `03-execute/execute.md`
- Verify: completed -> `04-verify/verify.md`
- Close: completed -> `05-close/close.md`

## 当前焦点

- **当前要解决的问题**：无；本 Case 已关闭并归档
- **当前游标**：`05-close/close.md`
- **最近 checkpoint**：install 完成，现行文档已回写
- **下一步建议**：无
- **压缩后恢复入口**：`_aipd/case/archive/c31-cursor-leader-agent-runtime/case.md`
- **待确认项**：无
- **阻塞项**：无

## 状态卡记录

- **文件事实**：需求已改成 Cursor 桌面端 + `cursor-agent` 单链
- **用户认知**：DSH 是旧方案；只要 Cursor；不要把「打进两个平台」做成设计
- **冲突点**：源码和 `install-cursor` 仍写 DSH 双装，这是本 Case 要删的旧合同
- **当前 phase 条件**：运行时图已对齐，可写文件边界
- **建议下一步**：文件边界节点

## Design 摘要

- **模式**：quick / process
- **当前节点**：file boundary / work packages（completed）
- **confirmed**：见 `02-design/design.md`

## Checkpoint 记录

| 时间 | 位置 | 触发 | 已确认 / 已变化 | open / assumed | 下一步 | 恢复入口 |
|---|---|---|---|---|---|---|
| 2026-08-16 | Case | 用户确认关 c29/c30 并开新 Case | 代码保留；DSH 不再晋升；鉴权用已登录 CLI | Cursor 是否有原生 goal API；install 是否还写 DSH 目录 | Think 核实后 Design | `case.md` / `01-think/think.md` |
| 2026-08-16 | Think | 本机 CLI / MCP 核实 | `cursor-agent` 无头参数可用；无 `create_goal`；`--mode` 不是目标模式 | Codex 源码里 DSH 句子怎么拆才不脏 Codex 包 | 用户确认后进 Design | `01-think/think.md` |
| 2026-08-16 | Contract / Design | 用户确认目标模式与 Leader 职责 | Cursor 包扔掉目标模式；Leader 规划调度收口；执行 Agent 做完整 Case | `aipd-case` 共享源码如何对 Cursor 去目标模式 | brownfield / 文件边界 | `02-design/design.md` |
| 2026-08-16 | Design | 用户纠正运行时图 | 只要 Cursor 桌面端 + cursor-agent；DSH 整条删除；不做双平台覆盖 | 无 | 文件边界 | `02-design/design.md` |

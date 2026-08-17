# Think: c31-cursor-leader-agent-runtime

## 调研前 checkpoint

- **当前问题**：Cursor 上 Leader 要特制化，执行层要从 DSH 换成 `cursor-agent`。还不能直接改 runtime。
- **为什么需要 Think**：目标模式怎么绑、`放手随意推进` 对应什么、`cursor-agent` 的稳定调用面，都还没写成设计合同。
- **边界**：只查 AIPD 源码、已归档 `c29`/`c30`、本机 CLI 和公开 Cursor CLI 能力。不查 seo-keyword-radar 业务，不改 Skill 正文（本 phase 只取证）。
- **预期输出**：可进入 Design 的运行时判断；哪些假设能固化，哪些仍 open。
- **停止条件**：绑定方式、执行器命令、鉴权、install 落点四件事都有明确选项和推荐。
- **返回位置**：Case Contract 的暂定假设 → Design。

## 实践经验

未命中。经验库没有 Cursor CLI / Leader runtime / 目标模式绑定这类条目。

## 已有事实

1. AIPD 已有 `aipd-skill/src/core/case/goal-mode.md`。启用条件是：平台有活动目标，且目标明确绑定一个 Case。
2. Codex 用 `create_goal`，推荐 objective 是「推进并关闭 AIPD Case …」，不是「放手随意推进」。
3. 本仓库全文搜不到「放手随意推进」。按用户原话，这是要改掉的推进姿态，正式文案用「Leader 推进」。
4. 当前 Cursor runtime 仍是：找 DSH → `dsh --profile headless` → 没有就停。`install-cursor` 双写 `~/.cursor/skills/` 与 `~/.dsh/skills/`。
5. 交接对话核实过本机：`cursor-agent` 在 `~/.local/bin/cursor-agent`；无头是 `-p` / `--print`；改文件要 `--force` / `--yolo`；还有 `--trust`、`--workspace`、`--resume`、`--continue`、`--model`。
6. PATH 上的 `agent` 先命中 Grok，AIPD 必须写死 `cursor-agent`。
7. 用户确认鉴权：已登录的 Cursor 状态，不用 API key。
8. 用户曾说不要把省上下文当成第一原则。2026-08-16 再次确认：Leader 理论上用不了太多上下文，因为它不做 Case 内验证，只规划、调度和最后收口。

## 选项

### A. 目标模式绑定

| 选项 | 含义 | 风险 |
|---|---|---|
| A1 | Cursor 若有原生 goal API，创建并绑到 Case，再加载 `goal-mode.md` | 需要先核实 API 是否存在 |
| A2 | 没有原生 goal 时，Cursor Leader Skill 在用户显式 `$aipd-leader` 且正在推进已确认 Case 时，加载 `goal-mode.md`，目标文案固定为 Leader 推进并关闭该 Case | 绑定权威变成 Skill + `case.md` 顶栏提示，不是平台对象 |
| A3 | 两套都做：有 API 用 API，没有就 A2 | 实现面大一点，但和「特制化 Leader」对齐 |

推荐先核 A1，核不到就落 A2；Design 按 A3 写降级，避免假称已经创建了平台 goal。

### B. 执行层

| 选项 | 含义 | 风险 |
|---|---|---|
| B1 | `cursor-agent -p --force --trust --workspace <项目根>`，已登录 CLI | 符合用户授权 |
| B2 | 同一命令再加 `CURSOR_API_KEY` | 用户明确不要 |
| B3 | 对话内 Task / 子 Agent | 上下文倒灌，用户这次要的不是这个 |

推荐 B1。同一 Case 多轮可记 `chatId` 再 `--resume`，但这是加分，不是第一期必须。

### C. install 落点

| 选项 | 含义 |
|---|---|
| C1 | `install-cursor` 只写 `~/.cursor/skills/` |
| C2 | 继续双写 `~/.dsh/skills/`，即使执行层不再是 DSH |

推荐 C1。DSH 不再是执行层，双写会把旧合同冻住。

## 本轮核实

- 本机 `cursor-agent`：`/Users/yangzongru/.local/bin/cursor-agent`，版本 `2026.08.11-e8db854`。
- 无头参数仍在：`-p/--print`、`--force`/`--yolo`、`--trust`、`--workspace`、`--resume`、`--continue`、`--model`。有 `login` 子命令。`--api-key` 存在，本 Case 不用。
- `--mode` 只有 `plan` / ask 这类执行模式，**没有** Codex 那种 goal 对象。
- 当前 Cursor MCP 工具里搜不到 `create_goal` / goal API。

## 仍要在 Design 看的源码面

- Codex 包里哪些 DSH 句子必须删，哪些只改 Cursor 覆盖，避免脏掉 Codex `check-dist`。

## 决策结论

用户 2026-08-16 确认后，Think 关闭：

- 目标模式：**扔掉**。Cursor Leader / runtime / install 不提。
- Leader 职责：调控 + 规划路线 + 按序调度执行 Agent + 最后收口。不代做 Case 验证。Case 数量不写进合同。
- 执行层：B1。DSH 整条删除，不是替换后留退路。
- install：只写 `~/.cursor/skills/`。
- 「打进两个平台」不作设计项。那是旧的 Cursor+DSH 绑定，不是本 Case 要做的覆盖工程。

## 未解决风险

- Cursor 没有 Codex 目标模式那种「把主 Agent 上下文拉到执行层」的能力。本 Case 不承诺补上。
- 已安装的 `~/.dsh/skills/` 不会自动消失；本 Case 只改源码和（确认后的）`install-cursor`。

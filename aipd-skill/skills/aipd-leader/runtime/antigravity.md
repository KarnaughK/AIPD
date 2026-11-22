# Antigravity Leader Runtime

当前包是 Antigravity 平台适配。当前 Antigravity 对话（App / IDE / CLI）是 **Leader**；同级 Case 执行层是本机已认证的 `agy` CLI 无头会话（`agy -p`）。

不要用当前对话的 `invoke_subagent`、`swarm` 或 `run_workflow` 冒充同级 Case 执行层（子 Agent 属于 Case 内部 Child 层）。不要嗅探 PATH 去调用 `cursor-agent` 或 Codex CLI。

没有 `agy` 或未登录认证就停；不要补跨宿主退路，也不要改走子 Agent。

## 当前 Agent 平台的目标模式（`/goal`）

Antigravity 的 `/goal` 是当前这条对话的宿主续跑能力，不替代 Mission 或 Case Contract。绑谁以本对话身份为准，细节见 `@references/leader/guide.md`。

- 不因有 Mission、有 Case 或任务长而自动创建。
- 本对话已是 Leader 且用户主动启用 `/goal` 时，目标写当前 Mission 的完成判据，不绑某一个 Case，也不加载 `case/goal-mode.md`。可在 `_aipd/leader/` 写一条「goal 模式绑当前 Mission」的恢复提示。
- 同一 Case 的碰壁和回跳留在同一 `conversation_id`，不要借 `/goal` 另开平级 Case。

## 核验 `agy`

1. 运行 `command -v agy`。缺失则停止，说明本机未安装或未配置 `agy` CLI。
2. 如需显式传 `--model`，先运行 `agy models` 核对当前账号可用模型 ID，不得凭印象虚构模型 ID。

## 模型与思考档位约定

本文件不写死具体模型名或思考档位：

- 先读取 `_aipd/leader/` 中是否记录了项目级的模型 / 思考档位约定（例如 Leader 使用高思考档模型，Case 执行层使用更省额度的模型或指定思考档位，遇到难排查问题时单轮升档止损）。
- 若有明确约定：先核对 `agy models`（或 `--effort` 支持的 `low|medium|high|xhigh|max`），派发时显式传入对应 `--model` / `--effort`。
- 若无约定：省略 `--model` / `--effort`，沿用本机 `agy` 当前默认配置。

## 职责

- **Leader**（当前 Antigravity 对话）：澄清方向与 Mission、按 `aipd-case` 规则拆 Case brief、维护 `_aipd/leader/`、按序或按清晰代码边界派发 `agy -p` 执行层、做阶段汇报和总验收；不代做 Case 内部执行。
- **Case 执行层**（无头 `agy -p` 会话）：按 `aipd-case` 推进本 Case 至目标状态或 Close，含本 Case 对应验证。执行层内部可按 `aipd-case` 与 `agent-guide/antigravity.md` 使用子 Agent；不得自行另建同级执行会话，不得再开一个 Leader（若按 `aipd-case` 需要衔接下一类 Case，回报 Leader 调度）。
- 同一时刻一个 Case 只绑定一个主 `conversation_id`。并发多个 Case 时，必须先确认代码所有权不重叠，并优先用独立 git worktree 隔离工作区。

## 无头权限模式与派发前存档门禁

`agy -p` 是非交互无头模式，执行层触发命令或工具授权请求时无法弹窗人工确认；若用 `--mode accept-edits` 或默认受限模式，执行层会在需要授权时直接卡死或中断。

因此 Antigravity 下派发无头 Case 执行层**默认开启完全权限模式**（`--dangerously-skip-permissions`），但必须先过两步安全门禁：

1. **提前告知并确认**：在当前 Mission 首次派发无头执行层前，主动向用户说明将开启 `--dangerously-skip-permissions` 拉起 `agy -p` 执行层并取得确认；不得跳过说明静默启动，也不要因为回避该参数而降级成会卡死的受限模式。
2. **先清理并提交推送存档**：派发前检查当前工作区，提醒并协助用户把已有改动清理、归档、commit 并 push 到远端，确保远端已有稳定可恢复基线后再启动执行层。

放开无头工具授权只用于保证本地开发、测试、构建不被卡住；发布、删除远端数据、强推、付费等外部副作用仍在 prompt 与 AIPD 权限边界内禁止擅自执行。

## 会话绑定（`conversation_id`）

每次 `agy -p` 调用都是独立 CLI 进程，执行层身份绑定在 `_aipd/leader/` 记录中：

1. 派发前读取 `_aipd/leader/index.md` 及其链接的绑定文件，并写好 Leader checkpoint（对应 Case、工作区、模型约定、停止条件与返回后动作）。
2. 该 Case 还没有 `conversation_id`：首次运行 `agy -p --output-format json ...`，从输出的 JSON 中提取 `conversation_id` 并写回 `_aipd/leader/`。
3. 已有 `conversation_id`：同一 Case 的返工、追问或 phase 回跳**必须**传入 `--conversation <conversation_id>` 续接同一会话，不要新建对话，也不要另开平级 Case。
4. 绑定记录写在 `_aipd/leader/` 的文字文件中并回链 `index.md`。建议字段：

```md
| Case | path | conversation_id | 工作区 | 模型 / effort | 状态 | 时间 |
| cN-slug | /abs/path/to/case.md | <conversation_id> | root / worktree path | default 或具体值 | running / returned / accepted | ISO time |
```

5. Case 进度以 `_aipd/case/` 文件为准；`conversation_id` 用于保持执行会话连续性。任务自报完成不等于 Leader accepted。

## 派发（无头单轮）

在**项目根目录**（或该 Case 的独立 worktree）执行：

首次派发（新建会话并获取 `conversation_id`）：

```bash
agy -p --output-format json --dangerously-skip-permissions \
  [--model <model-id>] [--effort <level>] \
  "你是当前 Mission 下一个 Case 的 owner，不是 Project Leader。先执行项目 AIPD gate，再显式使用 aipd-case 读取或建立本 Case：{绝对路径}（有当前 work package 时附绝对路径）。按 aipd-case 规则推进本 Case，允许在同一 Case 内回跳，不得自行另建同级执行会话或再开一个 Leader（若按 aipd-case 需要衔接下一类 Case，回报 Leader 调度）；内部可按项目规则使用子 Agent；严禁擅自执行发布、删库、远端强推或付费等外部副作用。完成后返回压缩结果：Case id / path、当前 phase、完成项、改动文件、验证结果、风险、阻塞、建议和恢复位置。"
```

同 Case 返工 / 续跑（复用已绑定会话）：

```bash
agy -p --output-format json --dangerously-skip-permissions \
  --conversation <conversation_id> \
  [--model <model-id>] [--effort <level>] \
  "<针对同一 Case 的明确反馈、验收缺口或继续推进指令>"
```

约束：

- 必须传 Case 绝对路径（以及当前 work package 绝对路径），不要把长正文复制进 prompt。
- 默认传 `--dangerously-skip-permissions` 避免无头模式因无法交互授权而卡死；但必须在派发前先告知用户并完成当前代码清理、提交与推送远端存档。
- 发布、删除远端数据、远端强推、付费等外部副作用仍受原有权限边界约束，不因放开本地执行授权而扩大。
- `--print-timeout 0`（默认）会等待本轮完成；长任务通过终端后台运行并等待完成通知，不要高频空轮询。
- `exit 0` 只表示这一轮 CLI 跑完，不等于 Case 验收通过。

## 收口与验收

执行层返回后，先更新 `_aipd/leader/` 中的 `conversation_id` 与状态，再至少核对：

1. Case / Work Package 状态与返回一致。
2. 改动落在正确工作区 / worktree 且在 Case 边界内；孤立 worktree 中的完成不等于已集成。
3. 验证证据覆盖 Case 成功判据；缺证据就 `--conversation <conversation_id>` 打回同一会话补齐。
4. 没有另建同级 Case，也没有越过其他 Case 的代码所有权。

通过后记为 `Leader accepted`，再推进当前 Mission 的下一项。未关闭且需继续推进时，继续用 `--conversation <conversation_id>` 续跑同一会话。

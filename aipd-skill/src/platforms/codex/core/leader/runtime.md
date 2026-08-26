# Codex Leader Runtime

本文件是 Codex 平台包。Codex 上 Leader 直接开独立 Codex 任务当 Case 执行层，不经过桌面端组合，也不调用 `cursor-agent`。用户界面称 task，协调 API 可能沿用 thread 命名。不要用子 Agent 冒充 Case task。

## 固定运行配置

| 任务 | model | reasoning | Fast |
|---|---|---|---|
| 当前 Leader | `gpt-5.6-sol` | `max` | 用户预先开启 |
| 每个 Case task | `gpt-5.6-sol` | `high` | 继承已开启的 Codex Fast |

- Skill 无法改写当前 Leader task 的模型或推理等级。启动卡应记录实际可见状态；不可见时写“由用户配置，未核验”。
- 创建 Case task 时显式传 `model: gpt-5.6-sol` 和 `thinking: high`。
- 当前 create-task API 如果没有 Fast / service tier 参数，不要虚构字段。Fast 由账号、会话或 Codex 配置启用；可通过当前平台能力核验就记录，无法核验就写“Fast 未核验”。
- 如果未来工具 schema 提供 Fast 参数，以当时 schema 为准并显式启用。

## 创建一个 Case task

1. 确认 Case brief 已经澄清，且属于当前 active Mission。`$aipd-leader` 的显式调用已经授权为这些已确认 Case 创建 task；超出 Mission 或带新外部副作用时重新确认。
2. 写 Leader checkpoint：Case brief、边界、预期输出、停止条件、代码 / 证据 owner、依赖和返回位置。
3. 先调用项目列表能力（当前为 `codex_app__list_projects`），解析当前 saved project。不得凭目录名猜 project id。
4. Git 项目默认创建隔离 worktree；非 Git 项目默认 local。Case 依赖当前 checkout 未提交状态时，先形成可复现 checkpoint / 稳定基线；若确实必须共享 local checkout，说明冲突风险并按当前 create-task 合同取得所需用户指示。
5. 调用任务创建能力（当前为 `codex_app__create_thread`），标题使用 `AIPD Case <case-id-or-slug> — <short goal>`，明确传入 `gpt-5.6-sol` 与 `high`。创建是非阻塞的；只有返回可用 `threadId` / `hostId` 才算 ready，排队中的 `clientThreadId` 不能冒充可协调 task id。
6. 将 Case 与 `threadId`、`hostId`、worktree / local 环境、创建时间、状态和最后 cursor 绑定到 `_aipd/leader/`。一个 Case 只绑定一个主 task；同一 Case 的 phase 回跳继续使用该 task。该 task 上的 goal 模式若存在，只绑这一个 Case；不要为了维持 goal 再开第二个 task。
7. 只要本 Leader 对话还在等这个 Codex task 干活，立刻按下一节完成「更新进度 + 确保本对话有绑 Mission 的 goal 模式」，然后再 `wait_threads`。派发出去不等于本轮 Leader 收工。

## 派发 prompt

每个 Case task 的 prompt 至少包含：

- “你是当前 Mission 下一个 Case 的 owner，不是 Project Leader。”
- 当前项目、Mission 摘要、Case brief、边界、成功判据、停止条件和代码 / 证据所有权。
- 先执行项目 AIPD gate，再显式使用 `$aipd-case` 创建或恢复这一个 Case。
- 允许在同一 Case 内 Think / Design / Execute / Verify / Close 回跳；不得另建同级 Codex task。
- 可按项目 AGENTS 规则使用 Child Agent，但不得扩大写入、发布、删除、付费或其他外部副作用权限。
- 不回退其他 task / 用户的改动；发现共享前提或所有权冲突时停止并回报 Leader。
- 每次改变项目状态的 Work Package 后写回 Case 文件；长调查、长执行和等待前写 checkpoint。
- 返回压缩结果：Case id / path、当前 phase、完成项、改动文件、验证结果、风险、阻塞、建议和恢复位置。

如果 Case 尚未在当前 worktree 中存在，Case task 自己通过 `$aipd-case` 建立正式 Case；Leader 先记录 provisional brief，待 task 返回后补实际 Case id / path。这样不要依赖另一个 worktree 中尚未提交的 Case 文件。

## 等待 Codex Case task 时必须续跑

`codex_app__create_thread` 一旦返回可用 `threadId` / `hostId`，Leader 不得把“已经派出去”当成自己这轮的结束。创建是非阻塞的；Case 还在干活时，本 Leader 对话必须保持可被拉起，直到该 task 完成、需要 Leader 答复，或用户插话改了焦点。

在开始 `wait_threads` 之前，必须连续做完两件事：

1. **更新进度**：在 `_aipd/leader/` 写清正在等哪个 Codex task（`threadId` / `hostId`、对应 Case、当前在做什么、停止条件、返回后要验收还是答复）。`index.md` 必须能一跳回到这条等待记录。同时在本对话给出用户可见的压缩进度，让人一眼知道 Leader 没有停，只是在等执行层。不要只把状态留在聊天里。
2. **启动或确认 goal 模式**：对本 Leader 对话调用 `get_goal`。若没有活动 goal，立即 `create_goal`，objective 写当前 Mission 的完成判据，不绑某一个 Case，不加载 `case/goal-mode.md`。若已有绑 Mission 的活动 goal，不要另建，也不要把 objective 改成某一个 Case。这是 Codex Leader 在等待 Case task 时的强制续跑，不需要用户再说一次「开目标模式」。goal 开在本 Leader 对话上，用来把自己拉起来；不要去 Case task 上替执行层开 goal。

然后才进入等待：

- 使用 task 列表、读取、等待和发送消息能力跟进（当前分别为 `codex_app__list_threads`、`codex_app__read_thread`、`codex_app__wait_threads`、`codex_app__send_message_to_thread`）。
- 多个独立 Case 用一次有界 `wait_threads` 批量等待，并保存每个 task cursor。不要高频空轮询，也不要反复读取已经由 cursor 交付的文本。
- `wait_threads` 超时、只拿到进度快照、或只有 commentary 更新，都不等于 Case 完成，也不等于 Leader 可以收工。先更新 `_aipd/leader/` 进度，再继续等。
- 被 goal 拉起后，先读 `_aipd/leader/` 里的等待记录，再 `wait_threads`；不要因为本轮没有新的用户指令，就以为无事可做。
- 只有以下情况才停止等待：目标 task 完成或需要 Leader 处理；用户新输入改了焦点；出现必须上交用户的方向 / 权限 / 破坏性问题。
- 不要因为等了大约一分钟、本轮 wait 返回了、或暂时读不到最终文本，就结束本轮 Leader 任务。

## 跟进与反馈

- Case task 询问局部、可逆且不改变 Mission 的问题时，Leader 基于既定契约直接答复；涉及方向、权限、破坏性动作或项目认知冲突时再向用户澄清。
- 任务失败先判断是同一 Case 内迭代、回跳上游 phase、调整依赖，还是 Case Contract 已失效。除非目标边界真正改变，不创建第二个 task 来掩盖失败。
- 每次任务状态、方向或绑定变化后更新 Leader checkpoint；只保留压缩状态和链接，不复制完整任务 transcript。
- Leader 吸收各 Case 的压缩返回并维持项目级综合判断，不把 Case transcript 或零散细节直接转发给用户。
- 到达约定汇报节点时，聚合说明阶段结果与证据、Mission / Case 状态、计划偏差、风险、待用户决定事项和下一阶段。汇报后可在既有授权内继续推进，不默认等待逐 Case 批准。
- 方向变化、新权限、破坏性动作、不可逆分歧或跨 Case 冲突立即上交用户，不因尚未到固定汇报节点而延后。

## Leader 总验收

Case task 自报完成后，Leader 至少核对：

1. Case / Work Package 状态与任务结果一致。
2. 改动位于正确 worktree / 分支并已进入预期集成位置；孤立 worktree 中的完成不等于项目已完成。
3. 真实测试、静态检查或人工验收覆盖 Case 成功判据。
4. 没有越过代码所有权、覆盖其他 task 改动或制造跨 Case 矛盾。
5. 新稳定事实只作为 Close / Weave 候选处理，没有污染 Leader 工作记忆或长期 Knowledge。

通过后才把 Case 标记为 Leader accepted，并继续当前 Mission 的下一项。所有 Case 完成后做 Mission 级验证和用户反馈。

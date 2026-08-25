# AIPD Leader 工作空间

> 状态：显式可选能力。只有用户主动调用 `$aipd-leader` 才进入；除本入口外，不预设固定目录和文件结构。

## 定位

`_aipd/leader/` 是 AIPD Leader 的可恢复工作记忆，用来承接跨聊天、跨 Case 仍会影响当前 Mission、方向、优先级、协调和下一步恢复的信息。

它不是长期 Knowledge，也不替代 Case / Work Package、OKR、SOP、Inbox、Map、局部 README 或真实代码。只有当前会话明确承担 Project Leader 角色，或需要恢复 Project Leader 状态时，才读取本目录；普通开发任务不默认加载。

## 反向归属规则

写入 `leader/` 前，先判断信息是否已经有更权威的事实源：

- 用户确认的长期方向、目标、边界和取舍 → Intent。
- 带来源和时间边界的稳定外部事实 → Research。
- 已确认或已验证的核心模型、产品规则和跨模块工程规则 → Core / Product / Engineering。
- 高频检索入口 → Map；页面、组件或代码模块的局部入口 → 就近 README。
- 某个短周期事项的目标、状态、决策、执行和验收记录 → Case / Work Package。
- 飞书阶段目标及其对齐关系 → OKR。
- 可重复的 Agent 项目动作 → SOP。
- 尚未开始主动处理、只需先接住的材料 → Inbox。

如果已有更权威的归属，应写入对应位置。Leader 当前仍需要这条信息时，只在这里保留链接和一句“它如何影响当前判断”，不要复制正文。

只有同时满足下面两个条件，信息才应留在 `leader/`：

1. 它会影响 Project Leader 当前的方向判断、Mission、优先级、跨 Case 协调、待确认事项或下一步恢复。
2. 它目前没有更合适、更权威的事实源。

## 可自主维护的内容

Project Leader 可以按实际需要自行创建、合并、重命名和删除文字文件。例如，实践中可能自然出现当前关注、Mission 候选、跨 Case 依赖、待确认问题、临时假设、思路变化或等待验收等记录；这些只是内容示例，不是预设文件模板。

自主维护仍需遵守以下边界：

- 只保存文字类工作记忆，不放代码、构建产物、原始数据、大段日志或完整 transcript。
- 不复制 Knowledge、Case 或其他事实源的长正文；需要时使用链接和影响摘要。
- 新建、删除或重命名本目录内文件后，应在本文件的“当前工作区索引”中更新入口。
- 不再影响当前判断的信息可以删除，不要求永久归档所有思考过程。

无论文件怎样拆分，都必须能够恢复：active Mission 与成功判据、最近方向变化及依据、Case 队列 / 依赖 / owner、Case runtime 绑定（Codex 上是独立 task；Cursor 上才是 `chatId`）、待确认事项和下一恢复位置。

## 运行合同

- 当前无 active Mission，也没有活动 Leader 对话。
- Codex 上 Leader 直接为每个 Case 开独立 Agent 线程，不套桌面端 + CLI 组合。
- Cursor 因为对话内 Agent 不够强，才用桌面端 Leader + 已登录 `cursor-agent`；那是 Cursor 平台包的事，不是 Codex 默认路径。
- DSH 已退出现行合同。相关实验见已归档 `c29` / `c30` / `c31`；无固定目标过夜实验见已归档 `c32`。
- 详细规则：`aipd-skill/src/skills/aipd-leader/SKILL.md`、`aipd-skill/src/platforms/codex/core/leader/runtime.md`、`aipd-skill/src/platforms/cursor/core/leader/runtime.md`。

## 迁出与清理

- 临时判断成熟为长期稳定认知后，迁入对应 Knowledge、Map 或 README；本目录只在仍有当前影响时保留引用。
- 探索内容形成明确的短周期执行承诺后，进入 Case；形成飞书阶段目标或可复用程序时，分别进入 OKR 或 SOP。
- 仅仅“以后可能有用”但尚未主动处理的材料移入 Inbox。
- 已被替代、已经失效或不再影响项目推进的工作记忆可以直接删除。

## 恢复约定

Project Leader 接管或恢复项目时：

1. 先按 AIPD Schema gate 读取 `_aipd/index.md` 和 `_aipd/map.md`。
2. 再读取本文件，确认当前工作区入口。
3. 只按“当前工作区索引”读取本次需要的自建文件，以及其中明确链接的 Knowledge、Case 或其他事实源。
4. 恢复后若判断入口已经过时，先更新索引，再继续推进。

## 当前工作区索引

- 当前状态：无 active Mission。
- 活动 Case：无。
- 已关闭 Case：[`archive/c29-dsh-headless-dispatch`](../case/archive/c29-dsh-headless-dispatch/case.md)、[`archive/c30-cursor-leader-platform`](../case/archive/c30-cursor-leader-platform/case.md)、[`archive/c31-cursor-leader-agent-runtime`](../case/archive/c31-cursor-leader-agent-runtime/case.md)、[`archive/c32-unfixed-goal-runtime`](../case/archive/c32-unfixed-goal-runtime/case.md)。
- 当前文件：`index.md`。

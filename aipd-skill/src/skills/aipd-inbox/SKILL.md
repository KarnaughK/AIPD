---
name: aipd-inbox
description: >
  AIPD Inbox 收件箱。用于明确要求“先记一下 / 先存一下 / 放 inbox / 收件箱 / 回头再整理”的临时信息捕获。
  关键词：inbox、收件箱、先记一下、先存一下、临时记录、回头整理、待整理材料、灵感、外部框架
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
inject-from-core:
  - updates/catalog.json
  - workspace/project-state.md
  - workspace/templates/inbox.md
---

# AIPD Inbox

`aipd-inbox` 是 AIPD 的低承诺度收件箱入口。它只负责 capture：把用户明确要求暂存的信息追加到 `_aipd/inbox.md`，不自动归类、不创建 case、不执行 weave。

## 触发边界

只在用户明确提到这些意图时使用：

- “放 inbox”
- “放收件箱”
- “先记一下”
- “先存一下”
- “回头再整理”
- “这个外部框架先收一下”
- “这个想法先扔进来”

不要因为用户普通讨论、提出需求、反馈 bug 或描述稳定认知，就自动进入 inbox。那些场景分别由普通对话、aipd-case 或 weave 处理。

## 职责

**只做**：

- 先读取 `@references/workspace/project-state.md` 和 `@references/updates/catalog.json`，按路径项存在性、symlink、manifest 双形态和 `P/I` 执行项目 gate。双根、symlink、非法类型 / manifest 或 `P > I` 立即停止；`unversioned-v2` 或 `P < I` 返回 `needs-aipd-update`。只有 `P = I` 时才创建或写入收件箱，项目版本不从 Agent Entry 推断。
- 确认 `_aipd/inbox.md` 是否存在；不存在时用 `@references/workspace/templates/inbox.md` 创建。
- 把本次临时信息追加为一条 inbox 条目。
- 保留来源、原始记录和最少待判断问题。
- 用户要求查看时，读取并简要列出 inbox 条目。

**不做**：

- 不创建 case。
- 不拆 work package。
- 不执行 weave 回写。
- 不把条目自动写入五类长期知识域。
- 不把 inbox 条目自动变成 OKR、候选 case 或稳定认知。

## 写入格式

追加到 `_aipd/inbox.md` 的 `## 条目` 下方：

```md
### {YYYY-MM-DD} - {一句话标题}

来源：
- {用户描述 / 链接 / 文件 / 截图 / transcript；没有就写“当前对话”}

原始记录：
- {用户要暂存的信息，尽量保留原意，必要时做轻量压缩}

待判断：
- 是否值得研究？
- 是否影响项目方向、核心认知、产品能力或工程规则？
- 是否形成候选 case？
- 是否可以删除？
```

标题优先从用户内容中提炼，不要为了标题追问。日期使用当前日期。

## 整理规则

用户明确要求“整理 inbox / 看看第 X 条该放哪 / 清理收件箱”时，只输出建议，不默认迁移：

- 可能进 Intent：用户明确确认的长期方向、目标、边界或取舍；未确认设想不得进入。
- 可能进 Research：已有可追溯来源、采集时间和有效性边界的外部世界事实或调研结论；未核实材料继续留在 Inbox 或 Case。
- 可能进 Core：已经形成项目内部长期模型或核心认知。
- 可能进 Product：已经确认要成为用户可见产品能力。
- 可能进 Engineering：已经形成跨模块工程规则或调试经验。
- 可能进 SOP：已经形成可重复、可执行、可检查的 Agent 项目动作。
- 可能进 OKR：可能成为阶段目标。
- 可能进 Case：已经有明确要推进的问题或事项。
- 可删除：只是过期或无价值材料。

需要迁移时，先给方案，等用户确认后把写入交给对应 owner：稳定项目认知与可复用 SOP 候选走 `aipd-weave`，明确事项走 `aipd-case`，OKR 走 `aipd-okr`。Inbox 自身不直接修改目标文件；目标流程完成后，Inbox 只负责按用户确认删除或标记原条目。

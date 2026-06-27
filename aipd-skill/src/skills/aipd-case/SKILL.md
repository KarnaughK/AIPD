---
name: aipd-case
description: >
  推进 AIPD case 的统一入口。按 case 当前 phase 渐进加载 Goal / Think / Design / Execute / Verify / Close 文档，完成短周期目标闭环。
  关键词：case、目标、think、design、execute、verify、close、工作包、复杂度爆点、上下文解耦
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
  - Agent
  - AskUserQuestion
inject-from-core:
  - overview.md
  - case/overview.md
  - case/phases/*
  - case/templates/case.md
  - case/templates/work-package.md
  - case/workers/*
  - agent-guide.md
  - agent-guides/*
---

# AIPD Case

`aipd-case` 是 AIPD case 的统一入口。它把创建、思考、设计、执行、验收和关闭收敛为一个渐进式 case 生命周期：

```text
Goal -> Think -> Design -> Execute -> Verify -> Close
```

Case 是一个马上要完成并最终关闭的短周期目标容器。它类似 OKR，都先定目标并连接大方向上下文；但 OKR 面向长期周期和复盘，Case 面向当前目标的设计、执行、验收和归档。

## 总原则

- 一个 skill 负责整个 case 生命周期，不为每个 phase 新增独立 skill。
- 每个 phase 有独立说明文档，进入对应 phase 时才加载。
- case.md 是事实源，记录 `Current Phase`、phase 状态、上下文索引、设计结论、工作包、执行记录和关闭状态。
- 新建 case 必须使用 phase-first 目录结构，不再生成顶层 `doc/` / `steps/`：`01-goal/`、`02-think/`、`03-design/`、`04-execute/`、`05-verify/`、`06-close/`。
- Work Package 只放在 `04-execute/work-packages/`。遇到旧 `steps/` 结构时，不做兼容运行，只提示用户是否迁移为 phase-first case。
- Step 不再表示“先做 A 再叠 B”的微步骤，而是可验收 work package。一个 work package 可以包含多个横向模块。
- Agent 需要目标、架构边界、上下文和验收口径，不需要被指挥先迈哪条腿。
- Design 的核心是找到复杂度爆点并做最小必要解耦，而不是完整抽象所有概念。

## 入口流程

### 1. 恢复项目和 case 状态

每次进入 `aipd-case`，先读取：

1. `_adoc/index.md`
2. `_adoc/map.md`
3. `_adoc/case/index.md`

如果用户指定 case，读取指定 case。若未指定且只有一个进行中 case，默认使用该 case。若有多个候选 case，先询问用户选择。

读取目标 case：

```text
_adoc/case/{case-dir}/case.md
```

如果目标 case 仍是旧结构（例如存在顶层 `doc/`、`steps/`，但缺少 `01-goal/` 到 `06-close/` phase 目录），停止当前推进，不读取旧 `steps/` 继续执行，只提示：

```text
检测到这是旧结构 case。新 AIPD Case 不再兼容旧 steps/doc 运行逻辑。是否需要先把它迁移为 phase-first case？
```

如果还没有 case，进入 `Goal` phase，按 `@references/case/phases/goal.md` 创建短周期目标容器。

### 2. 判断当前 phase

读取 case.md 中的：

```md
## Current Phase
{Goal / Think / Design / Execute / Verify / Close}

## Phase State
- Goal: ...
- Think: ...
- Design: ...
- Execute: ...
- Verify: ...
- Close: ...
```

只加载当前 phase 对应文档：

| Phase | 说明文档 | 作用 |
|---|---|---|
| Goal | `@references/case/phases/goal.md` | 定目标、边界、上下文索引和验收口径 |
| Think | `@references/case/phases/think.md` | 信息不足时进行同步、调研、比较和抉择 |
| Design | `@references/case/phases/design.md` | 找复杂度爆点，做最小必要解耦，形成架构边界和工作包 |
| Execute | `@references/case/phases/execute.md` | 按工作包推进，可用目标模式和执行 Agent |
| Verify | `@references/case/phases/verify.md` | 验收目标、设计约束和执行结果 |
| Close | `@references/case/phases/close.md` | 归档、整理 Weave Candidate、更新索引 |

不要一次加载所有 phase 细则。只有当当前 phase 完成并切换到下一 phase 时，再加载下一份文档。

### 3. 推进当前 phase

按当前 phase 文档推进。每个 phase 都必须明确：

- 当前要回答的问题。
- 本 phase 的输入。
- 本 phase 的输出。
- 是否需要写入 case.md 或对应 phase 目录。
- 下一 phase 的进入条件。

若当前 phase 内容太长，不要把全过程塞进 case.md。把展开材料写到对应 phase 目录：

```text
_adoc/case/{case-dir}/01-goal/goal.md
_adoc/case/{case-dir}/02-think/think.md
_adoc/case/{case-dir}/02-think/{research-or-decision-branch}/summary.md
_adoc/case/{case-dir}/03-design/design.md
_adoc/case/{case-dir}/03-design/decision-log.md
_adoc/case/{case-dir}/04-execute/execute.md
_adoc/case/{case-dir}/04-execute/work-packages/{work-package}.md
_adoc/case/{case-dir}/05-verify/verify.md
_adoc/case/{case-dir}/06-close/close.md
```

case.md 只保留压缩后的事实源和链接。

### 4. 更新 case 状态

每个 phase 完成后，必须更新 case.md：

- `Current Phase`
- `Phase State`
- 当前 phase 的结论摘要
- 新增或更新的 work packages
- Weave Candidate
- 阻塞和待确认项

Case 状态以文件为准，不依赖聊天记忆。

### 5. 执行授权和 Agent 调度

进入 Execute phase 后，如果需要子 Agent、角色 Agent、批量验证、构建、测试、跨文件 diff 或长调研，必须遵守项目 Agent Entry 的授权规则。未获授权时，先单独询问用户。

执行 Agent 的任务入口是 `04-execute/work-packages/` 下的 work package 文件和 case.md，不是主 Agent 复制出来的一大段 prompt。派发时只传文件路径、角色建议、边界和返回格式。

### 6. 旧入口处理

`aipd-case-create`、`aipd-case-run`、`aipd-case-archive` 已废弃，不再作为可构建 skill。用户提到这些旧命令时，说明它们已经合并进 `aipd-case`：

- 创建或讨论 case：进入 Goal / Think / Design。
- 执行 case：进入 Execute。
- 归档 case：进入 Close。

不要为了旧命令保留兼容运行逻辑。旧 case 需要先迁移为 phase-first case，再继续推进。

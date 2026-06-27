---
name: aipd-case
description: >
  推进 AIPD case 的统一入口。按 case 当前 phase 渐进加载 Think / Design / Execute / Verify / Close 文档，完成短周期目标闭环。
  关键词：case、目标、边界、think、design、execute、verify、close、工作包、复杂度爆点、上下文解耦
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

`aipd-case` 是 AIPD case 的统一入口。它把目标契约、思考、设计、执行、验收和关闭收敛为一个渐进式 case 生命周期：

```text
Case Contract -> Think -> Design -> Execute -> Verify -> Close
```

Case 是一个马上要完成并最终关闭的短周期目标容器。它类似 OKR，都先定目标并连接大方向上下文；但 OKR 面向长期周期和复盘，Case 面向当前目标的设计、执行、验收和归档。

`Goal` 不再是独立 phase。目标、边界、验收标准和上下文索引是整个 case 的契约，直接写在 `case.md` 顶部的 `Case Contract`。后续所有 phase 都必须以这个契约为上下文；执行中迭代出的“暂时做什么 / 暂时不做什么 / 完成标准变化 / 边界变化”也回写到 `case.md` 的契约区或边界变更记录。

## 总原则

- 一个 skill 负责整个 case 生命周期，不为每个 phase 新增独立 skill。
- 每个 phase 有独立说明文档，进入对应 phase 时才加载。
- `case.md` 是事实源，包含 `Case Contract` 和 `Case Runtime`：前者记录目标、边界、验收标准和上下文索引；后者记录 `Current Phase`、phase 状态、当前焦点、待确认项、设计摘要、工作包摘要、执行记录和关闭状态。
- `case.md` 每次进入 case 都必须读取；phase 目录只承载展开材料，不重复承载目标契约。
- 新建 case 必须使用 contract + phase-first 目录结构，不再生成顶层 `doc/` / `steps/`，也不再生成 `01-goal/`：`01-think/`、`02-design/`、`03-execute/`、`04-verify/`、`05-close/`。
- Work Package 只放在 `03-execute/work-packages/`。遇到旧 `steps/` 或旧 Goal phase 结构时，不做兼容运行，只提示用户是否迁移为当前结构。
- Step 不再表示“先做 A 再叠 B”的微步骤，而是可验收 work package。一个 work package 可以包含多个横向模块。
- Agent 需要目标、架构边界、上下文和验收口径，不需要被指挥先迈哪条腿。
- Design 的核心是找到复杂度爆点并形成文件 / 文件夹级架构边界，而不是完整抽象所有概念。

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

如果目标 case 仍是旧结构（例如存在顶层 `doc/`、`steps/`，或仍使用 `01-goal/` 到 `06-close/` 的旧 Goal phase 结构），停止当前推进，不读取旧 `steps/` 继续执行，只提示：

```text
检测到这是旧结构 case。新 AIPD Case 不再兼容旧 steps/doc 或独立 Goal phase 运行逻辑。是否需要先把它迁移为当前 contract + phase-first case？
```

如果还没有 case，先创建 `case.md` 的 `Case Contract`，写清目标、边界、验收标准和上下文索引；然后根据是否存在未知或架构缺口，把 `Current Phase` 设为 `Think` 或 `Design`。

恢复已有 case 后，不要首轮直接跨 phase 写回。先输出状态卡：文件事实、用户当前认知、冲突点、当前 phase 条件、建议下一步。关键 phase 跳转必须先确认，再写回 case。

### 2. 判断当前 phase

读取 case.md 中的：

```md
## Case Contract
...

## Current Phase
{Think / Design / Execute / Verify / Close}

## Phase State
- Think: ...
- Design: ...
- Execute: ...
- Verify: ...
- Close: ...
```

只加载当前 phase 对应文档：

| Phase | 说明文档 | 作用 |
|---|---|---|
| Think | `@references/case/phases/think.md` | 信息不足时进行同步、调研、比较和抉择 |
| Design | `@references/case/phases/design.md` | 找复杂度爆点，形成文件 / 文件夹级架构边界和工作包 |
| Execute | `@references/case/phases/execute.md` | 按工作包推进，可用目标模式和执行 Agent |
| Verify | `@references/case/phases/verify.md` | 验收目标、设计约束和执行结果 |
| Close | `@references/case/phases/close.md` | 归档、整理 Close 归档候选、更新索引 |

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
_adoc/case/{case-dir}/case.md
_adoc/case/{case-dir}/01-think/think.md
_adoc/case/{case-dir}/01-think/{research-or-decision-branch}/summary.md
_adoc/case/{case-dir}/02-design/design.md
_adoc/case/{case-dir}/02-design/decision-log.md
_adoc/case/{case-dir}/03-execute/execute.md
_adoc/case/{case-dir}/03-execute/work-packages/{work-package}.md
_adoc/case/{case-dir}/04-verify/verify.md
_adoc/case/{case-dir}/05-close/close.md
```

case.md 保留 Case Contract、Case Runtime、压缩后的 phase 摘要和链接，不承载 phase 展开过程。

### 4. 更新 case 状态

每个 phase 完成后，必须更新 case.md：

- `Case Contract` 中发生变化的目标、边界、验收标准或不做范围。
- `Current Phase`
- `Phase State`
- 当前 phase 的结论摘要
- 新增或更新的 work packages
- Close 归档候选
- 阻塞和待确认项

Case 状态以文件为准，不依赖聊天记忆。

### 5. 执行授权和 Agent 调度

进入 Execute phase 后，如果需要子 Agent、角色 Agent、批量验证、构建、测试、跨文件 diff 或长调研，必须遵守项目 Agent Entry 的授权规则。未获授权时，先单独询问用户。

执行 Agent 的任务入口是 `03-execute/work-packages/` 下的 work package 文件和 case.md，不是主 Agent 复制出来的一大段 prompt。派发时只传文件路径、角色建议、边界和返回格式。

### 6. 旧入口处理

`aipd-case-create`、`aipd-case-run`、`aipd-case-archive` 已废弃，不再作为可构建 skill。用户提到这些旧命令时，说明它们已经合并进 `aipd-case`：

- 创建或讨论 case：先写 `case.md` 的 Case Contract，再进入 Think / Design。
- 执行 case：进入 Execute。
- 归档 case：进入 Close。

不要为了旧命令保留兼容运行逻辑。旧 case 需要先迁移为当前 contract + phase-first case，再继续推进。

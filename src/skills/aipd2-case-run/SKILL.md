---
name: aipd2-case-run
description: >
  执行 AIPD2 case。先读 case.md 的上下文索引，按需加载上下文，再检查并派发 Step 给子 Agent，收集结果，用户验收。
  关键词：case、执行、step、验收、子 Agent
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
  - agent-guide.md
---

# AIPD2 Case Run

## 执行流程

### 第一步：恢复 case 状态

当用户请求执行、继续、验收、归档前检查，或当前对话已处于 case-run 链路时，先读取：

```bash
cat _adoc/case/index.md
```

根据 case 索引定位当前或目标 case。若索引中只有一个进行中的 case，默认使用该 case；若存在多个候选 case，再询问用户选择。

然后读取目标 case：

```bash
cat _adoc/case/{case目录}/case.md
```

case-run 的任务状态以 `_adoc/case/index.md`、目标 `case.md` 和 `steps/` 文件为准。聊天上下文只是临时工作缓存；如果聊天记忆与 case / step 文件冲突，先指出冲突，再以 case / step 文件为准继续。

**先按 case.md 里的“上下文索引”加载文件**，不自己全量扫描 `_adoc/` 或代码。case 说哪些是最强相关上下文，就优先读哪些。

如果上下文索引缺失或明显不足，先和用户确认是否补充 case，不要擅自扩大扫描范围。

### 第二步：检查 step 状态

读取 `steps/` 目录：

- 有未完成 step：展示进度并派发下一个 step。
- 没有 step：基于 case 上下文继续和用户讨论，必要时补充新 step。
- 全部完成：进入用户验收。

```
【当前 Case 状态】
Case: c{X.Y}-{名称}
✅ c{X.Y.1} 步骤名
⏳ c{X.Y.2} 步骤名  ← 下一个
⬚  c{X.Y.3} 步骤名
```

### 第三步：派发 step 给子 Agent

每个 step 默认创建一个新的子 Agent，遵守项目根目录 Agent Entry 中的 Main / Sub Agent Mode。

Main Agent 不直接执行 step 内容。case-run 链路内，文件修改、git、构建、测试、批量验证、跨文件 diff、调研和长日志分析都属于高污染任务，默认交给子 Agent。Main Agent 只负责入口读取、状态判断、派发、审查摘要、验收和状态写回。

先读取 step 头部的 `推荐 Agent` 字段：

- 如果声明了 `aipd_vue_architect`，并且当前 Codex 环境可用该 custom agent，优先派发给 `aipd_vue_architect`。
- 如果声明了 `explorer`，用于调研、只读定位和资料整理。
- 如果声明了 `worker`，用于普通开发、修复、脚本和文档修改。
- 如果没有声明，则按 step 类型和上下文路径兜底判断：`research` 优先 `explorer`；Vue 页面、Vue 组件、HTML/CSS、组件通信、前端状态组织优先 `aipd_vue_architect`；其他开发任务使用 `worker`。

Codex 默认使用 `fork_context: true`。子 Agent 是从 Main Agent 当前认知状态 fork 出来的同源分身，继承当前对话、项目认知、任务方向和判断逻辑。派发 prompt 的作用不是重新灌入完整上下文，而是声明身份、局部目标、case / step 锚点、边界和返回格式。

```
你是 AIPD 子 Agent。

你继承了 Main Agent 当前上下文。现在进入局部未来分支，基于当前 case 和当前 step 先设计执行方案，不要修改文件。

Step 文件：{步骤文件绝对路径}
Case 文件：{case.md 绝对路径}
推荐 Agent：{推荐 Agent 或兜底选择}

输出：目标、边界、执行步骤、风险、需要确认的问题。
等待主 Agent 确认后再执行。
```

主 Agent 审核方案。确认通过后，向同一个子 Agent 发送：

```text
方案通过，开始执行。
完成后只返回结论、依据、风险、建议、改动文件和验证结果；不要返回完整搜索输出、长日志、长文件正文或完整 diff。
```

执行阶段仍需遵守：

1. 先读取 `@references/worker-dev.md` 了解完整职责
2. 读取步骤文件：`{步骤文件绝对路径}`
3. 读取 step 中列出的上下文文档，用它们校准任务边界和压缩后续跑状态
4. 遵守 `case.md` 中的上下文索引和本次边界

### 第四步：收到结果

**成功**：
1. 更新 step 文件末尾，追加执行记录（完成时间 + 主要改动摘要）
2. 更新 case.md 步骤状态为 ✅
3. 确认 step / case 已写回可恢复状态
4. 再判断是否自动派发下一步。

**失败**：告知用户，询问：重试 / 跳过 / 手动处理。

---

## 用户验收

所有步骤 ✅ 后，展示完成情况，请用户验收。

**通过** → 告知用户执行 `/aipd2-case-archive` 归档。

**发现问题** → 在 `steps/` 创建新 step（`c{X.Y.N+1}-fix-xxx.md`），更新 case.md，派发执行，完成后重新验收。

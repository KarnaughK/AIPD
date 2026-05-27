---
name: aipd2-case-run
description: >
  执行 AIPD2 case。先读 case.md 的上下文索引，按需加载上下文，再检查并把 Step 派给角色执行 Agent 或必要时的上下文分身，收集结果，用户验收。
  关键词：case、执行、step、验收、角色 Agent、上下文分身
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

`case-run` 是 AIPD2 的执行入口。它承接 `case-create` 已经沉淀好的 case / step，以文件为事实源推进执行，不依赖主 Agent 临时聊天记忆直接开干。

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
- 没有可执行 step：停止在执行前，不要在 `case-run` 中自行创建 step 后继续执行。提示用户当前 case 还没有可执行 step，需要切回 `aipd2-case-create` 回到设计阶段，先设计 case / step；如果用户只是输错了指令，也说明应改用 `aipd2-case-create`。
- 全部完成：进入用户验收。

无可执行 step 时的回复模板：

```md
【没有可执行 Step】
当前 case 还没有可执行 step，`case-run` 不能直接开工。

请切到 `aipd2-case-create` 回到设计阶段，先确认 step 拆分方案，再写详细 step 文件。
```

```
【当前 Case 状态】
Case: c{X.Y}-{名称}
✅ c{X.Y.1} 步骤名
⏳ c{X.Y.2} 步骤名  ← 下一个
⬚  c{X.Y.3} 步骤名
```

### 第三步：派发 step 给执行 Agent

`case-run` 阶段优先把已写清楚的 step 交给带角色 Agent 执行。step 文件、case.md 和 step 中列出的上下文文档是执行事实源；主 Agent 当前聊天上下文只是辅助判断，不应成为执行所必需的隐形条件。

Main Agent 不直接执行 step 内容。case-run 链路内，文件修改、git、构建、测试、批量验证、跨文件 diff、调研和长日志分析都交给执行 Agent。Main Agent 只负责入口读取、状态判断、派发、审查摘要、验收和状态写回。

先读取 step 头部的 `推荐 Agent` 字段，它表示执行角色建议：

- 如果声明了 `aipd_vue_architect`，并且当前 Codex 环境可用该 custom agent，优先派发给 `aipd_vue_architect`。
- 如果声明了 `aipd_vue_provider`，并且当前 Codex 环境可用该 custom agent，优先派发给 `aipd_vue_provider`。
- 如果声明了 `explorer`，用于调研、只读定位和资料整理。
- 如果声明了 `worker`，用于普通开发、修复、脚本和文档修改。
- 如果没有声明，则按 step 类型和上下文路径兜底判断：`research` 优先 `explorer`；Vue `useXxx.ts/js`、provide / inject、页面级 API 数据源优先 `aipd_vue_provider`；Vue 页面、Vue 组件、HTML/CSS、组件通信、前端状态组织优先 `aipd_vue_architect`；其他开发任务使用 `worker`。

默认使用带角色 Agent 基于 step 独立读取上下文执行，不默认 fork 主 Agent 全量上下文。只有当 step 强依赖主 Agent 当前尚未沉淀到 case / step / doc 的聊天判断时，才使用 `fork_context: true` 创建上下文分身。

#### 角色 Agent Prompt 模板

用于 step 已经写清楚、上下文文档齐全的常规执行：

```
你是 AIPD2 {推荐 Agent} 执行 Agent。

你不是唯一在代码库中工作的执行者。不要回滚别人已经做出的改动；如果遇到已有改动，基于现状继续完成本 step。

Step 文件：{步骤文件绝对路径}
Case 文件：{case.md 绝对路径}
推荐 Agent：{推荐 Agent 或兜底选择}

你的任务：
1. 读取步骤文件
2. 读取 Case 文件
3. 按 step 中列出的上下文文档逐一读取
4. 遵守 case 边界和 step 任务清单执行
5. 按 step 验收标准自检

约束：
- 只做步骤文件中列出的任务
- 不做额外优化、重构或顺手修复
- 不创建步骤文件未要求的文件
- 完成后只返回结论、依据、风险、建议、改动文件和验证结果
```

#### 上下文分身 Prompt 模板

仅用于 step 强依赖主 Agent 当前尚未沉淀的聊天判断，或临时探索过程不适合进入主线时：

```text
你是 AIPD2 上下文分身 Agent。

你继承了 Main Agent 当前上下文。看到这句话后，不要再继续分身；你就是被 fork 出来的克隆体，负责完成当前局部探索 / 执行分支并回流结果。

Step 文件：{步骤文件绝对路径}
Case 文件：{case.md 绝对路径}
推荐 Agent：{推荐 Agent 或兜底选择}

你的任务：
1. 读取步骤文件和 Case 文件
2. 读取 step 中列出的上下文文档
3. 结合 Main Agent 当前未沉淀的聊天判断完成当前 step

完成后只返回结论、依据、风险、建议、改动文件和验证结果；不要返回完整搜索输出、长日志、长文件正文或完整 diff。
```

无论使用角色 Agent 还是上下文分身，执行阶段仍需遵守：

1. 先读取 `@references/worker-dev.md` 了解完整职责
2. 读取步骤文件：`{步骤文件绝对路径}`
3. 读取 step 中列出的上下文文档，用它们校准任务边界和压缩后续跑状态
4. 遵守 `case.md` 中的上下文索引和本次边界

### 第四步：收到结果

**成功**：
1. 更新 step 文件末尾，追加执行记录（完成时间 + 主要改动摘要）
2. 更新 case.md 步骤状态为 ✅
3. 确认 step / case 已写回可恢复状态
4. 如果还有下一个已存在、已写清楚的 step，再判断是否自动派发下一步；不要在 case-run 中新增未来 step。

**失败**：告知用户，询问：重试 / 跳过 / 手动处理。

---

## 用户验收

所有步骤 ✅ 后，展示完成情况，请用户验收。

**通过** → 告知用户执行 `/aipd2-case-archive` 归档。

**发现问题** → 在 `steps/` 创建新 step（`c{X.Y.N+1}-fix-xxx.md`），更新 case.md，派发执行，完成后重新验收。

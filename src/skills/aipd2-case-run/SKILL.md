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

### 第一步：加载 case

问用户要跑哪个 case，然后读取：
```bash
cat _adoc/case/{case目录}/case.md
```

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

每个 step 默认创建一个新的 fork 子 Agent，遵守项目根目录 Agent Entry 中的 Main / Sub Agent Mode。

```
你是 AIPD 子 Agent。

本次任务：基于当前 case 和当前 step，先设计执行方案，不要修改文件。

Step 文件：{步骤文件绝对路径}

输出：目标、边界、执行步骤、风险、需要确认的问题。
等待主 Agent 确认后再执行。
```

主 Agent 审核方案。确认通过后，向同一个子 Agent 发送：

```text
方案通过，开始执行。
完成后只返回改动摘要、验证结果、风险和需要主 Agent 处理的问题。
```

执行阶段仍需遵守：

1. 先读取 `@references/worker-dev.md` 了解完整职责
2. 读取步骤文件：`{步骤文件绝对路径}`
3. 遵守 `case.md` 中的上下文索引和本次边界

### 第四步：收到结果

**成功**：
1. 更新 step 文件末尾，追加执行记录（完成时间 + 主要改动摘要）
2. 更新 case.md 步骤状态为 ✅
3. 自动派发下一步。

**失败**：告知用户，询问：重试 / 跳过 / 手动处理。

---

## 用户验收

所有步骤 ✅ 后，展示完成情况，请用户验收。

**通过** → 告知用户执行 `/aipd2-case-archive` 归档。

**发现问题** → 在 `steps/` 创建新 step（`c{X.Y.N+1}-fix-xxx.md`），更新 case.md，派发执行，完成后重新验收。

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

```
你是 AIPD2 开发执行者。
1. 先读取 @references/worker-dev.md 了解你的完整职责
2. 然后执行步骤文件：{步骤文件绝对路径}
3. 必须遵守 case.md 中的上下文索引和本次边界
```

派发后告知用户，主 Agent 回到空闲状态，等系统通知结果。

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

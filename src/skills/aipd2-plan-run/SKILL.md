---
name: aipd2-plan-run
description: >
  执行 AIPD2 迭代计划。先读 plan，按 plan 指定的上下文加载文件，按顺序派发 Step 给子 Agent，收集结果，用户验收。
  关键词：plan、执行、step、验收、子 Agent
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

# AIPD2 Plan Run

## 执行流程

### 第一步：加载 plan

问用户要跑哪个 plan，然后读取：
```bash
cat _adoc/plan/{plan目录}/plan.md
```

**按 plan.md 里的"上下文文件列表"加载文件**，不自己去扫 L4/L5。plan 说读什么就读什么。

### 第二步：展示进度

```
【当前计划状态】
计划: v{X.Y}-{名称}
✅ v{X.Y.1} 步骤名
⏳ v{X.Y.2} 步骤名  ← 下一个
⬚  v{X.Y.3} 步骤名
```

### 第三步：派发 step 给子 Agent

```
你是 AIPD2 开发执行者。
1. 先读取 @references/worker-dev.md 了解你的完整职责
2. 然后执行步骤文件：{步骤文件绝对路径}
```

派发后告知用户，主 Agent 回到空闲状态，等系统通知结果。

### 第四步：收到结果

**成功**：
1. 更新 step 文件末尾，追加执行记录（完成时间 + 主要改动摘要）
2. 更新 plan.md 步骤状态为 ✅
3. 自动派发下一步。

**失败**：告知用户，询问：重试 / 跳过 / 手动处理。

---

## 用户验收

所有步骤 ✅ 后，展示完成情况，请用户验收。

**通过** → 告知用户执行 `/aipd2-plan-archive` 归档。

**发现问题** → 在 `steps/` 创建新 step（v{X.Y.N+1}-fix-xxx.md），更新 plan.md，派发执行，完成后重新验收。

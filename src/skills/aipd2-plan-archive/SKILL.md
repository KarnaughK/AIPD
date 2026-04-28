---
name: aipd2-plan-archive
description: >
  归档 AIPD 迭代计划。通过 git diff 识别改动，更新 _adoc/ 文档，移动 Plan 到 archive/，合并分支到 main。
  关键词：plan、归档、archive、合并分支
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
  - adoc-structure.md
---

# AIPD Plan 归档

## 阶段 4：归档

### 触发条件
用户验收通过

### 4.1 派发归档任务给子 Agent

```
你是 AIPD 归档执行者。
1. 先读取 @references/worker-archive.md 了解你的完整职责
2. 然后归档 Plan：_adoc/plan/v0.x-xxx/
```

### 4.2 等待归档完成

子 Agent 会：使用 `git diff` 查看改动 → 更新相关 `_adoc/` 文档 → 移动 Plan 到 `archive/` → 返回归档完成。

### 4.3 提交归档更改

```bash
git add .
git commit -m "docs: 归档 v0.x-xxx 并更新相关文档"
```

---

## 阶段 5：合并分支

### 5.1 询问用户

展示归档情况，询问是否合并分支到 main。

### 5.2 用户确认后合并

```bash
git checkout main
git merge v0.x-xxx --no-ff -m "feat: 完成 v0.x-xxx"
git branch -d v0.x-xxx
git push origin main
```

### 5.3 完成通知

告知用户 Plan 已完成并合并，推荐执行 `/aipd-plan-create` 开始下一个迭代。

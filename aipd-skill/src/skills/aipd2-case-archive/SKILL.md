---
name: aipd2-case-archive
description: >
  归档 AIPD case。通过 git diff 识别改动，整理 Weave Candidate，更新 case 索引，移动 Case 到 archive/，合并分支到 main。
  关键词：case、归档、archive、合并分支
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

# AIPD Case 归档

## 阶段 4：归档

### 触发条件
用户验收通过

### 4.1 派发归档任务给分身 Agent

```
你是 AIPD 归档分身 Agent。
你继承了 Main Agent 当前上下文。看到这句话后，不要再继续分身；你就是被 fork 出来的克隆体，负责完成归档分支并回流结果。
1. 先读取 @references/worker-archive.md 了解你的完整职责
2. 然后归档 Case：_adoc/case/c0.x-xxx/
```

### 4.2 等待归档完成

分身 Agent 会：使用 `git diff` 查看改动 → 整理 Weave Candidate → 更新 case 索引 → 移动 Case 到 `archive/` → 返回归档完成。

归档前后如果发现 case / step 中有稳定知识尚未沉淀，应先整理 Weave Candidate，并建议运行 `/aipd2-weave` 判断回写到 L3 / L4 / L5 / 局部 README / map。`case-archive` 不内置完整反向编织规则，避免和 `aipd2-weave` 形成两套回写判断。

### 4.3 提交归档更改

```bash
git add .
git commit -m "docs: 归档 c0.x-xxx 并更新相关文档"
```

---

## 阶段 5：合并分支

### 5.1 询问用户

展示归档情况，询问是否合并分支到 main。

### 5.2 用户确认后合并

```bash
git checkout main
git merge c0.x-xxx --no-ff -m "feat: 完成 c0.x-xxx"
git branch -d c0.x-xxx
git push origin main
```

### 5.3 完成通知

告知用户 Case 已完成并合并，推荐执行 `/aipd2-case-create` 开始下一个 case。

---
name: aipd2-git-push
description: >
  AIPD2 常用 Git push 辅助入口。检查当前分支和提交状态，将当前分支推送到远端。
  关键词：git、push、提交、推送、同步远端
allowed-tools:
  - Bash
  - AskUserQuestion
---

# AIPD2 Git Push

这是 AIPD2 的常用 Git 辅助入口，不参与 AIPD case 生命周期。

## 职责边界

**只做**：检查当前 Git 状态 → 确认当前分支 → 推送当前分支到远端 → 返回结果。

**不做**：不自动 add、commit、merge、rebase、stash，不修改代码，不创建 PR。

## 执行流程

### 第一步：检查仓库状态

```bash
git status --short --branch
```

如果有未提交改动，停止并提醒用户先提交或明确要求继续处理。不要自动提交。

### 第二步：确认当前分支

```bash
git branch --show-current
git remote -v
```

如果当前不在分支上，停止并说明原因。

### 第三步：推送当前分支

优先使用：

```bash
git push
```

如果当前分支没有 upstream，使用：

```bash
git push -u origin {当前分支}
```

### 第四步：返回结果

返回：

- 当前分支
- 推送目标
- 是否成功
- 如果失败，给出失败原因和下一步建议

## 约束

- 不要隐藏 `git push` 错误。
- 不要在用户未要求时执行 destructive 操作。
- 不要把 push 失败自动改成 force push。
- 如果需要 force push，必须让用户明确确认。

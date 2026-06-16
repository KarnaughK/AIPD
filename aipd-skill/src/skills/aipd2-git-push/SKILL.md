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

**只做**：检查当前 Git 状态 → 用中文说明待推送提交 → 确认当前分支 → 推送当前分支到远端 → 返回结果。

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

### 第三步：用中文说明待推送提交

先查看当前分支相对 upstream 有哪些未推送提交：

```bash
git log --oneline --decorate @{u}..HEAD
```

如果当前分支没有 upstream，查看最近提交：

```bash
git log --oneline --decorate -5
```

推送前用中文简要说明：

- 本次准备推送几个提交
- 每个提交大致做了什么
- 是否包含大改名、目录迁移、安装脚本变化等需要注意的内容

说明要面向人读，不要只复读 commit hash。示例：

```text
准备推送 2 个提交：
- fd93e70：把 AIPD2 的计划流程迁移为 Case，并加入 Agent Entry 初始化逻辑。
- 333342a：新增 /aipd2-git-push，用来检查状态后推送当前分支。
```

### 第四步：推送当前分支

优先使用：

```bash
git push
```

如果当前分支没有 upstream，使用：

```bash
git push -u origin {当前分支}
```

### 第五步：返回结果

返回：

- 当前分支
- 推送目标
- 是否成功
- 已推送提交的中文摘要
- 如果失败，给出失败原因和下一步建议

## 约束

- 不要隐藏 `git push` 错误。
- 不要在用户未要求时执行 destructive 操作。
- 不要把 push 失败自动改成 force push。
- 如果需要 force push，必须让用户明确确认。

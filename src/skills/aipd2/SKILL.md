---
name: aipd2
description: >
  AIPD 总入口。扫描项目状态，展示面板，按状态引导或直接执行初始化。
  关键词：AI Harness、项目认知、状态扫描、初始化
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
  - L1-intent/*
---

# AIPD 总入口

扫描项目状态，按状态引导用户或直接执行初始化。

## 触发后的行为

### 第一步：扫描项目状态

使用子 Agent 扫描，保持主 Agent 上下文干净。详见 `@references/scan-agent.md`。

### 第二步：展示状态面板

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  AIPD 项目状态
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  _adoc/     : ✅ 已初始化
  Intent     : ✅ 已定义
  当前 OKR   : O1 - 目标名
  当前 Plan  : v0.2-功能名（8/10 步完成）
  已归档     : 3 个 Plan
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  推荐下一步：/aipd2-plan-run
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 第三步：根据状态执行

**没有 `_adoc/`** → 直接执行初始化：

```bash
mkdir -p _adoc/L1-intent _adoc/L2-scenario _adoc/L3-engine
mkdir -p _adoc/L4-product-arch _adoc/L5-tech-arch
mkdir -p _adoc/plan/archive _adoc/okr
```

创建 `_adoc/index.md`，然后引导用户定义 intent.md（参考 `@references/L1-intent/guide.md`、`@references/L1-intent/intent-writing.md`、`@references/L1-intent/template.md`）。

**有 `_adoc/` 但没有 intent.md** → 引导用户定义方向（同上）。

**有 `_adoc/` 但没有 plan** → 推荐 `/aipd2-plan-create`。

**有进行中的 plan** → 推荐 `/aipd2-plan-run`。

**plan 全部完成待归档** → 推荐 `/aipd2-plan-archive`。

**用户想总结经验但不归档** → 推荐 `/aipd2-plan-learn`。

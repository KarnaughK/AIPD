# Skill 概览

AIPD 当前构建九个 Skill。它们不是九个彼此孤立的对象，而是围绕“进入项目、完成目标、维护记忆和处理专用协作”分工。

源码位于 `aipd-skill/src/skills/`；构建后生成 Codex / Claude Code 可安装产物。具体平台能力仍以 `aipd-skill/src/platforms/` 和构建脚本为准。

## 主循环

| Skill | 触发场景 | 主要结果 |
|---|---|---|
| `aipd` | 进入项目、初始化、查看状态、不知道从哪里开始 | 加载最小认知并路由下一能力 |
| `aipd-case` | 创建、恢复、推进、验收或关闭短周期目标 | Case Contract / Think / Design / Execute / Verify / Close 闭环 |
| `aipd-weave` | 完成事项产生了稳定新知识 | 回写 L3 / L4 / L5、map 或局部 README |

## 认知维护

| Skill | 触发场景 | 主要结果 |
|---|---|---|
| `aipd-inbox` | 先记一下、稍后再判断 | 低承诺度临时记录 |
| `aipd-update` | 已初始化项目需要升级 AIPD 结构 | 先审计差异和方案，确认后安全合并 |
| `aipd-learn` | 要从会话、Case 或用户反馈迭代 AIPD 框架 | 最小定位卡或框架回流包 |

Weave 面向当前项目；Learn 面向 AIPD 框架自身。Update 只升级结构和入口，不覆盖项目已有认知。

## 专用协作

| Skill | 触发场景 | 主要结果 |
|---|---|---|
| `aipd-okr` | 查看、创建、同步、删除或讨论飞书 OKR | OKR 操作或压缩经验包 |
| `aipd-mermaid` | 创建、修改、评审 Mermaid，或明确要求渲染 | `.mmd` 源码与按需预览 |
| `aipd-git-push` | 只需检查并推送当前分支 | 推送；不自动 add / commit / merge / rebase / stash |

## 常见组合

### 第一次进入项目

```text
/aipd
-> 初始化或读取 AGENTS.md / _adoc/index.md / _adoc/map.md
-> 继续普通任务，或进入 /aipd-case
```

### 完成一个目标

```text
/aipd-case
-> Case Contract
-> 按需 Think / Design
-> Work Package Execute
-> Verify / Close
-> /aipd-weave
```

### 暂时还不形成任务

```text
/aipd-inbox
-> 后续丢弃 / 转 Case / 转 SOP / Weave
```

### AIPD 自身需要从真实使用中学习

```text
/aipd-learn
-> 获取 transcript 定位或生成回流包
-> 用户确认后再修改框架源码
```

## Case phase 不是独立 Skill

`aipd-case` 按 Current Phase 渐进加载内部说明：

```text
Case Contract -> Think -> Design -> Execute -> Verify -> Close
```

旧 `aipd-case-create`、`aipd-case-run`、`aipd-case-archive` 已合并，不再构建。

## Skill 之外的支撑能力

- **Agent Entry**：`AGENTS.md` 规定进入项目和恢复任务的第一跳。
- **角色 Agent / 领域指引**：为 ADOC 检索、requirements、Vue 架构和 provider 等稳定边界提供执行支持；不自动派发。
- **实践经验库**：`aipd-skill/src/core/experience/` 保存真实项目跑过的具象经验。
- **经验源码资产**：根级 `experience-assets/` 保存只靠文字不足以可靠复用的可验证实现，不随 Skill 打包。
- **SOP**：`_adoc/sop/` 收纳以 Agent 为运行时的可重复项目动作；SOP 不是单纯脚本或知识条目。

## 源码与产物

要修改 Skill 行为，先从项目认知路由到：

```text
aipd-skill/src/skills/{skill}/SKILL.md
aipd-skill/src/core/
aipd-skill/src/platforms/
aipd-skill/scripts/
```

`aipd-skill/dist/` 是构建产物，不是源码事实源。修改源码后运行 build 和只读的 `check-dist`；是否 install 由用户另行确认。

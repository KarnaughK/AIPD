# Skill 概览

AIPD 当前构建九个面向普通项目的公共 Skill。它们不是彼此孤立的对象，而是围绕“主导项目、进入项目、完成目标、维护记忆和处理专用协作”分工。另有一个只在 AIPD 源码仓库内可见的仓库级 `aipd-learn`，负责框架自迭代。

九个公共 Skill 的源码位于 `aipd-skill/src/skills/`；构建后默认生成 Codex 可安装产物。仓库级 Learn 的源码位于 `.agents/skills/aipd-learn/`。平台无关能力与扩展边界仍以 `aipd-skill/src/platforms/` 和构建脚本为准。

## 显式主导层

| Skill | 触发场景 | 主要结果 |
|---|---|---|
| `aipd-leader` | 用户主动调用 `$aipd-leader`，希望由 AI 承担项目推进、探索与跨 Case 协调 | 一个 active Mission；每个 Case 一个独立 Codex 任务；Leader 总验收 |

Leader 是可选的上一层，不是普通 AIPD 的默认入口。自然语言提到 Leader、任务很复杂或存在多个 Case 都不会自动启动它。用户说「目标模式 / goal 模式」时也不自动启动 Leader：已经显式调用过的 Leader 对话把它绑到当前 Mission，默认执行对话把它交给 `aipd-case`。

## 主循环

| Skill | 触发场景 | 主要结果 |
|---|---|---|
| `aipd` | 进入项目、初始化、查看状态、不知道从哪里开始 | 加载最小认知并路由下一能力 |
| `aipd-case` | 创建、恢复、推进、验收或关闭短周期目标 | Case Contract / Think / Design / Execute / Verify / Close 闭环 |
| `aipd-weave` | 完成事项产生了稳定新知识 | 判断并回写五类 Knowledge、map 或局部 README |

## 认知维护

| Skill | 触发场景 | 主要结果 |
|---|---|---|
| `aipd-inbox` | 先记一下、稍后再判断 | 低承诺度临时记录 |
| `aipd-update` | 已接入项目需要升级到本机 AIPD 版本，或检查同版本 drift | 读取版本演进和当前权威文档，一次语义收敛并记录结果；见 [Update 与 Schema 迁移](update-and-migration.md) |

Weave 面向当前项目的稳定认知；Update 面向项目里的 AIPD 结构与规则版本：项目 manifest 保存已应用版本，本机安装包给出目标版本。它会完整理解两者之间的更新记录，再以本机当前文档为最终态保护性合并；普通安全更新直接执行，只有破坏性或歧义冲突才暂停。

## 专用协作

| Skill | 触发场景 | 主要结果 |
|---|---|---|
| `aipd-okr` | 查看、创建、同步、删除或讨论飞书 OKR | OKR 操作或压缩经验包 |
| `aipd-mermaid` | 创建、修改、评审 Mermaid，或明确要求渲染 | `.mmd` 源码与按需预览 |
| `aipd-git-push` | 只需检查并推送当前分支 | 推送；不自动 add / commit / merge / rebase / stash |

## AIPD 仓库开发专用

| Skill | 触发场景 | 主要结果 |
|---|---|---|
| `aipd-learn` | 已回到 AIPD 源码仓库，要从当前对话、外部 transcript、Case 或用户反馈迭代框架 | 诊断框架行为；用户确认后修改 AIPD Skill、模板、Agent 规则、项目认知或实践经验库 |

`aipd-learn` 的事实源是 `.agents/skills/aipd-learn/`。它不进入 `aipd-skill/src/skills/`、公共 dist、用户级安装或业务项目级安装。外部项目中的 AIPD 框架反馈需要先带回源码仓库；项目自身知识仍使用该项目的 `aipd-weave`。

因此这里共有十个用户可见入口，但公共构建集合仍是九个 Skill；Learn 是第十个、且只属于 AIPD 源码仓库。

## 常见组合

### 让 AI 主导一个项目 Mission

```text
用户把当前任务设置为 gpt-5.6-sol / max / Fast
-> 显式调用 $aipd-leader
-> Leader 澄清并记录一个 active Mission
-> 每个 Case 创建 gpt-5.6-sol / high / Fast 的独立 Codex 任务
-> Case task 使用 $aipd-case 完成闭环
-> Leader 跨 Case 协调并做 Mission 总验收
```

详细边界见 [Leader](leader.md)。

### 第一次进入项目

```text
/aipd
-> 初始化或读取 AGENTS.md / _aipd/index.md / _aipd/map.md
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

### 已接入项目升级 AIPD

```text
/aipd-update
-> 读取项目版本 P 与本机版本 I
-> 完整理解 (P,I] 更新记录，不逐版落盘
-> 读取 I 的当前权威文档和项目定制
-> 一次语义收敛、验证并记录 P -> I
```

Update 不查询远端最新版。旧 `_adoc` 项目可以先在同一目标下运行确定性 Schema 迁移，再以无版本 v2 项目继续更新；迁移器本身不写当前 AIPD 版本。

项目版本 gate、migrator 与 Update 的完整分工见 [Update 与 Schema 迁移](update-and-migration.md)。

### AIPD 自身需要从真实使用中学习

```text
$aipd-learn
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
- **Interaction Protocol**：Agent MD 等级 2 可选安装的项目级讨论 / 执行回复协议；见 [Interaction Protocol](interaction-protocol.md)。
- **AI 友好代码拓扑**：结构性开发和 Case Design 条件加载的模块边界判断；见 [AI 友好代码拓扑](ai-friendly-code-topology.md)。
- **角色 Agent / 领域指引**：为上下文检索、requirements、Vue 架构和 provider 等稳定边界提供执行支持；不自动派发。
- **实践经验库**：`aipd-skill/src/core/experience/` 保存真实项目跑过的具象经验。
- **经验源码资产**：根级 `experience-assets/` 保存只靠文字不足以可靠复用的可验证实现，不随 Skill 打包。
- **SOP**：`_aipd/sop/` 收纳以 Agent 为运行时的可重复项目动作；SOP 不是单纯脚本或知识条目。

## 源码与产物

要修改 Skill 行为，先从项目认知路由到：

```text
aipd-skill/src/skills/{skill}/SKILL.md
.agents/skills/aipd-learn/SKILL.md       # 仅 AIPD 源码仓库
aipd-skill/src/core/
aipd-skill/src/platforms/
aipd-skill/scripts/
```

`aipd-skill/dist/` 是构建产物，不是源码事实源。修改源码后运行 build 和只读的 `check-dist`；是否 install 由用户另行确认。

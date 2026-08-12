---
name: aipd
description: >
  AIPD 渐进式总入口。根据用户输入在任务上下文轻量加载、项目状态扫描、初始化和 case 流程之间路由。
  关键词：AIPD、_aipd、knowledge、项目认知、任务上下文、轻量认知加载、项目状态、初始化、case、开发前读文档、代码拓扑、横向基座、纵向业务上下文、shared
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
  - ai-friendly-code-topology.md
  - aipd-project-structure.md
  - updates/catalog.json
  - workspace/project-state.md
  - agent-entry/template.md
  - agent-entry/interaction-style.md
  - agent-guides/aipd_context_retriever.md
  - workspace/templates/manifest.json
  - workspace/templates/index.md
  - workspace/templates/inbox.md
  - workspace/templates/map.md
  - workspace/templates/update-log.md
  - workspace/templates/sop-index.md
  - workspace/templates/sop-map.md
  - case/templates/index.md
  - okr/templates/index.md
  - knowledge/intent/*
---

# AIPD 渐进式总入口

`aipd` 只做路由、Schema 识别和少量上下文选择；具体项目知识继续由 `_aipd/` 工作区维护。五类长期知识域为 `knowledge/{intent,research,core,product,engineering}`，它们是并列分类，不是固定读取顺序。

## Schema 识别

进入任何读取或写入前，先判断项目状态：

1. 先读取 `@references/workspace/project-state.md` 和 `@references/updates/catalog.json`，用 catalog 的 `currentVersion` 作为本机版本 `I`；不从 `AGENTS.md`、Git tag 或远程推断版本。
2. 按路径项存在性分别检查新旧根：`test -e _aipd || test -L _aipd`，以及 `test -e _adoc || test -L _adoc`。损坏 symlink 和同名普通文件也算“存在”；双根、symlink 工作区、工作区内 symlink、manifest 身份或类型非法时按合同立即停止。
3. 只有 `_aipd` 时，按合同判定项目版本 `P`。`unversioned-v2` 或 `P < I` 返回 `needs-aipd-update` 并路由 `aipd-update`；`P > I` 硬停止，不降级也不查远程；只有 `P = I` 才继续普通读写。`index.md` / `map.md` 等必要入口缺失是 Update drift，存在但是 symlink 或类型冲突则硬停止。
4. 只有 `_adoc` 时，不读取、路由或写入其中内容；定位当前 `aipd` Skill 随包提供的 `scripts/migrate-project-schema`，先以 `--dry-run /absolute/project/path` 预检，用户确认后执行。若当前在 AIPD 源码仓库，可使用 `aipd-skill/scripts/migrate-project-schema`。迁移后仍是无版本 v2，继续交给 `aipd-update` 应用当前发布。
5. 新旧根路径项均不存在时，才视为未初始化的新项目。

日常运行时不双读、不 fallback。安全的额外 Workspace 模块是项目定制，不因名称未知就删除或判 invalid；保留名、代码目录、symlink 和文件类型冲突仍按合同停止。

## 入口判断

触发后先判断用户是否带着明确任务。

- 用户明确说“inbox / 收件箱 / 先记一下 / 先存一下 / 回头再整理”，进入 `aipd-inbox`。
- 用户明确说“OKR / 飞书 OKR / lark-cli / 周期 / O / KR / OKR 经验包”，进入 `aipd-okr`。
- 用户带着具体开发、分析、讨论或修改任务，进入“任务上下文轻量加载”。
- 用户没有明确任务，或明确要看状态、初始化、Case、归档、复盘或总结经验，进入“项目状态与流程”。

用户有明确对象但没有动作时，先轻量读取入口文档，给出简短理解，再询问要分析、修改还是创建 Case；不直接全量扫描工作区。

## 模式 A：任务上下文轻量加载

### 读取策略

1. 读取 `_aipd/index.md`。
2. 读取 `_aipd/map.md`，把用户自然语言路由到相关知识域、SOP、局部 README 和代码入口。
3. 按任务下钻，只读命中文档；不全量读取 `_aipd/`。
4. 普通开发、找代码、查业务规则、页面或组件实现时，不读取 Case / OKR；只有用户明确要求相应流程或任务本身处于该流程时才进入。
5. 如果 map 命中不清楚，用 `rg` 搜索 README、核心词、功能线名、页面名、接口名、权限码和 Agent 名。

下钻参考：

| 任务类型 | 优先读取 |
|---|---|
| 任务入口不清楚 | `_aipd/map.md`；未命中后用 `rg` 兜底 |
| 项目方向、目标、长期取舍 | `_aipd/knowledge/intent/` |
| 用户、场景、竞品、行业或玩法范式 | `_aipd/knowledge/research/` |
| 核心概念、领域语言、对象关系、项目成立模型 | `_aipd/knowledge/core/` |
| 产品功能、业务规则、页面职责、用户可见行为 | `_aipd/knowledge/product/` |
| 权限、路由、插件、前后端约定、跨模块工程规则 | `_aipd/knowledge/engineering/` |
| 页面、弹窗、组件或模块内部实现 | 代码就近 `README.md` 和真实代码入口 |

如果目标项目没有对应文档，不臆造规则；说明缺失，并基于现有代码和用户目标继续。

### AI 友好代码拓扑（条件命中）

以下任务在读取 map、相关 Engineering 知识、局部 README 和必要代码事实后，再读取 `@references/ai-friendly-code-topology.md`：

- 新增或重划页面、API、网站、游戏或业务模块边界。
- 决定 service / helper / component / shared 是抽取、上移还是保留局部复制。
- 调整跨模块依赖方向、组合协议、目录 owner 或上下文边界。
- 用户明确讨论横向基座、横向共享能力、纵向业务上下文或 AI 友好代码架构。

局部字段修改、样式修复、明确上下文内的 bugfix 和纯文档整理不读取该指南。

### 上下文检索包

任务涉及代码修改、Case 创建、跨模块规则或用户表达较模糊时，先形成极简检索包：

```md
【本次采用的项目上下文】
- 知识域：Intent / Research / Core / Product / Engineering；只有明确流程任务才包含 SOP / Case / OKR
- 必读文档：...
- README / 代码入口：...
- 兜底搜索：...
- 边界风险：...
```

检索包只回答“本次任务应该先看什么”，不是执行计划。读完后直接继续用户任务，不输出大段 AIPD 解释。

## 模式 B：项目状态与初始化

### 扫描状态

读取 `@references/scan-agent.md`。扫描范围小、入口明确时由 Main 直接执行；预计会产生大量文档噪声或多条真实独立工作线时，才派发子 Agent。

状态面板可简短展示：

```text
AIPD 项目状态
_aipd/      : ✅ Knowledge Schema v2
AIPD 版本  : V{P} / needs-aipd-update
Agent Entry : ✅ AGENTS.md 已安装
Intent      : ✅ 已定义
当前 OKR   : ...
当前 Case  : ...
推荐下一步：...
```

### 初始化新项目

只有 Schema 识别确认当前是全新项目时才初始化：

```bash
mkdir -p _aipd/knowledge/intent _aipd/knowledge/research
mkdir -p _aipd/knowledge/core _aipd/knowledge/product _aipd/knowledge/engineering
mkdir -p _aipd/sop _aipd/case/archive _aipd/okr
```

先写入精确两键的 `unversioned-v2` bootstrap manifest，再创建默认文档壳。初始化尚未验证完成前，不得提前写入 `aipdVersion`：

- 将 `{"schema":"aipd-project","schemaVersion":2}` 写入 `_aipd/manifest.json`；当前版本模板只在最后成功提交时使用。
- 将 `@references/workspace/templates/index.md` 写入 `_aipd/index.md`。
- 将 `@references/workspace/templates/inbox.md` 写入 `_aipd/inbox.md`。
- 将 `@references/workspace/templates/map.md` 写入 `_aipd/map.md`。
- 将 `@references/workspace/templates/update-log.md` 写入 `_aipd/update-log.md`。
- 将 `@references/workspace/templates/sop-index.md` 写入 `_aipd/sop/index.md`。
- 将 `@references/workspace/templates/sop-map.md` 写入 `_aipd/sop/map.md`。
- 将 `@references/case/templates/index.md` 写入 `_aipd/case/index.md`。
- 将 `@references/okr/templates/index.md` 写入 `_aipd/okr/index.md`。

目标文件已存在时不覆盖，先提示用户并基于现有内容继续。默认壳只是入口索引，不代表对应知识已完成。

然后先询问 Agent MD 模板等级，再决定是否写入项目根 Agent Entry。完成结构、必要入口、标记区块验证，并确认 manifest 模板的 `aipdVersion` 等于 catalog 的 `currentVersion=I` 后，最后将 `@references/workspace/templates/manifest.json` 写入 `_aipd/manifest.json`，以其中的 `aipdVersion=I` 作为初始化成功标记；任一步失败时保留 `unversioned-v2`，不得声称已完成当前版本。初始化完成后再引导用户定义 `_aipd/knowledge/intent/intent.md`（参考 `@references/knowledge/intent/guide.md`、`intent-writing.md` 和 `template.md`）。

| 等级 | 名称 | 内容 |
|---|---|---|
| 0 | 不修改 Agent MD | 不写入 `AGENTS.md` |
| 1 | AIPD Project Entry | 写入 AIPD 项目入口区块；默认推荐 |
| 2 | Entry + Interaction Protocol | 额外写入 AIPD 项目级对话协议 |

等级 1 或 2 时，用 `@references/agent-entry/template.md` 更新 `<!-- AIPD:START -->` / `<!-- AIPD:END -->` 区块；没有标记时追加，不覆盖用户原有内容。等级 2 再读取 `@references/agent-entry/interaction-style.md`，用独立标记区块安装。

### 已初始化项目的路由

- 缺少 Intent 主文档：引导用户定义方向。
- 用户要升级、同步或检查 AIPD 架构：推荐 `aipd-update`。
- 没有 Case 或有进行中 Case：推荐 `aipd-case`创建或按 `Current Phase` 续跑。
- Case 已完成待归档：推荐 `aipd-case` 进入 Close。
- 用户要把稳定实现、Case 结论、diff、错误日志或外部资料沉淀回知识域、README 或 map：推荐 `aipd-weave`。
- 用户要查看、创建、同步、删除或讨论飞书 OKR：推荐 `aipd-okr`。
- 用户要反馈或诊断 AIPD 框架本身的 Skill、模板或 Agent 规则：提示切回 AIPD 源码仓库，再使用仓库级 `aipd-learn`；业务项目不安装或执行该 Skill。

## 设计原则

1. 一个总入口：不新增按知识域切碎的入口。
2. Skill 是路由器：只判断模式和读取策略，不复制项目正文。
3. 渐进式披露：有任务时按 map 轻量加载；无任务时才进入状态与流程模式。
4. 任务优先：用户带着明确任务时，不先输出完整状态面板。
5. 项目规则在项目里：具体规范由 `_aipd/` 维护，Skill 只说明什么时候读哪里。

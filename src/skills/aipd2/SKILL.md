---
name: aipd2
description: >
  AIPD 渐进式总入口。根据用户输入在 ADOC 轻量认知加载、项目状态扫描、初始化和 case 流程之间路由。
  关键词：AIPD、ADOC、_adoc、项目认知、轻量认知加载、项目状态、初始化、case、前端规范、L5、开发前读文档
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
  - agent-entry/template.md
  - adoc/templates/index.md
  - case/templates/index.md
  - okr/templates/index.md
  - L1-intent/*
---

# AIPD 渐进式总入口

根据用户输入判断入口模式。`aipd2` 自身只做路由和少量上下文选择，不承载完整项目规则；具体项目认知继续放在 `_adoc/`，状态扫描细节交给分身 Agent。

## 入口判断

触发后先判断用户是否带着明确任务。

### 进入 ADOC 轻量认知模式

当用户带着具体开发、分析、讨论或修改任务时，进入此模式，例如：

```text
$aipd2 我要改合同创建 Step1 的 README
$aipd2 修一下合同列表搜索条件
$aipd2 看看这个弹框为什么保存后没刷新
$aipd2 讨论一下这个页面 README 怎么拆
$aipd2 按项目规范实现一个新表单
```

执行原则：

1. 确认 `_adoc/` 是否存在。
2. 读取 `_adoc/index.md`，判断当前项目的认知结构和裁剪模式。
3. 根据项目索引选择默认入口。日常前端开发通常先读 `_adoc/L5-dev/index.md`。
4. 按任务继续下钻，只读相关文档，不全量读取 `_adoc/`。
5. 用 3-6 条说明本次任务相关约束，然后继续执行用户任务。

下钻参考：

| 任务类型 | 优先读取 |
|---|---|
| README / map / 逻辑地图 | `_adoc/L5-dev/dev-conventions/readme-guide.md` |
| 表单 / 字段 / 校验 / 提交映射 | `_adoc/L5-dev/dev-conventions/form-guide.md` |
| 列表 / 搜索 / 表格 | `_adoc/L5-dev/dev-conventions/list-guide.md` |
| provide / inject / 显隐 / 禁用 / 回填 / 组件协作 | `_adoc/L5-dev/dev-conventions/component-autonomy-guide.md` 或项目索引指定文档 |
| 页面职责 / PRD / 原型承接 / 产品边界 | `_adoc/L4-product/index.md` |
| 业务对象 / 角色 / 主流程 | `_adoc/L3-core/index.md` |

如果目标项目没有对应文档，不要臆造规则；说明缺失，并基于现有代码和用户目标继续处理。

### 进入状态与流程模式

当用户没有明确任务，或明确要看状态、初始化、case、归档、复盘、总结经验时，进入此模式，例如：

```text
$aipd2
$aipd2 看一下项目
$aipd2 当前状态
$aipd2 初始化
$aipd2 case
$aipd2 归档
$aipd2 总结经验
```

此模式保留项目状态入口能力，但状态扫描细节由分身 Agent 读取 `@references/scan-agent.md` 执行，主 Agent 不直接加载完整扫描细节。

### 模糊输入

当用户有明确对象但没有明确动作时，例如：

```text
$aipd2 看一下合同创建页面
```

优先按 ADOC 轻量认知模式读取入口文档，给出简短理解，然后询问用户要分析、修改还是创建 case。不要直接进入完整状态面板，也不要全量扫描 `_adoc/`。

## 模式 A：ADOC 轻量认知加载

这是有任务时的默认模式。它的目标是让 AI 带着项目认知继续工作，而不是展示 AIPD 状态。

### 读取策略

- 先读 `_adoc/index.md`。
- 按 `_adoc/index.md` 指定的项目入口继续读；没有特别说明时，前端开发默认读 `_adoc/L5-dev/index.md`。
- 只在任务需要时读取 L3 / L4 / L5 的具体文档。
- skill 不复制 `_adoc` 正文，不把项目规范写死在 skill 里。
- 读完后直接进入用户任务，不输出大段 AIPD 解释。

### 输出要求

进入任务前只输出极短上下文判断：

```md
【本次采用的项目认知】
- ...
- ...
- ...
```

然后继续分析、讨论或修改。

## 模式 B：项目状态与初始化

这是无明确任务或流程类请求时的模式。

### 第一步：扫描项目状态

使用分身 Agent 扫描，保持主 Agent 主线干净。分身 Agent 读取 `@references/scan-agent.md`。

### 第二步：展示状态面板

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  AIPD 项目状态
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  _adoc/     : ✅ 已初始化
  AgentEntry : ✅ AGENTS.md 已安装
  Intent     : ✅ 已定义
  当前 OKR   : O1 - 目标名
  当前 Case  : c0.2-功能名（8/10 步完成）
  已归档     : 3 个 Case
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  推荐下一步：/aipd2-case-run
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 第三步：根据状态执行

**没有 `_adoc/`** → 直接执行初始化：

```bash
mkdir -p _adoc/L1-intent _adoc/L2-research _adoc/L3-core
mkdir -p _adoc/L4-product _adoc/L5-dev
mkdir -p _adoc/case/archive _adoc/okr
```

创建默认文档壳子：

- 将 `@references/adoc/templates/index.md` 写入 `_adoc/index.md`
- 将 `@references/case/templates/index.md` 写入 `_adoc/case/index.md`
- 将 `@references/okr/templates/index.md` 写入 `_adoc/okr/index.md`

然后安装项目根目录 Agent Entry，并引导用户定义 intent.md（参考 `@references/L1-intent/guide.md`、`@references/L1-intent/intent-writing.md`、`@references/L1-intent/template.md`）。

默认壳子写入规则：

1. 如果目标文件不存在，直接写入模板。
2. 如果目标文件已存在，不覆盖；先提示用户该文件已存在，并基于现有内容继续。
3. 默认壳子只是入口索引，不代表对应认知已经完成。

#### 安装 Agent Entry

初始化时必须把 `@references/agent-entry/template.md` 写入目标项目根目录的默认记忆文件，让后续 Agent 进入项目时自然知道这是 AIPD 项目。

**Codex 优先**：默认写入 `AGENTS.md`。

**Claude Code**：如果用户明确在 Claude Code 项目中初始化，或项目已有 `CLAUDE.md`，同一内容也可写入 `CLAUDE.md`。

写入规则：

1. 读取 `@references/agent-entry/template.md`。
2. 用标记包裹模板内容：
   ```md
   <!-- AIPD:START -->
   {template}
   <!-- AIPD:END -->
   ```
3. 如果目标文件不存在，创建文件并写入该区块。
4. 如果目标文件已有 `<!-- AIPD:START -->` 和 `<!-- AIPD:END -->`，只替换这两个标记之间的 AIPD 区块。
5. 如果目标文件存在但没有 AIPD 标记，把 AIPD 区块追加到文件末尾，不覆盖用户原有内容。

Agent Entry 只是 AIPD 的轻量认知壳，不替代 `/aipd2-case-create`、`/aipd2-case-run`、`/aipd2-learn` 等具体流程 skill。

**有 `_adoc/` 但没有 intent.md** → 引导用户定义方向（同上）。

**有 `_adoc/` 但没有 case** → 推荐 `/aipd2-case-create`。

**有进行中的 case** → 推荐 `/aipd2-case-run`。

**case 全部完成待归档** → 推荐 `/aipd2-case-archive`。

**用户想总结经验、生成经验回流包或回写 AIPD2 框架** → 推荐 `/aipd2-learn`。

## 设计原则

1. **一个总入口**：不新增 `aipd2-adoc`、`aipd2-l5` 等碎片化入口。
2. **skill 是路由器**：`aipd2/SKILL.md` 负责判断模式和选择读取策略，不承载完整项目规则。
3. **渐进式披露**：有任务时轻量加载 `_adoc` 并按需下钻；无任务时才进入状态与流程模式。
4. **任务优先**：用户带着明确任务触发 AIPD 时，不先输出完整状态面板。
5. **项目规则在项目里**：具体规范由 `_adoc/` 维护，skill 只说明什么时候读哪里。

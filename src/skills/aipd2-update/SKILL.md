---
name: aipd2-update
description: >
  更新已初始化项目中的 AIPD 架构。审计 AGENTS.md、_adoc/index.md、_adoc/context-map.md、case 模板和 L1-L5 索引是否符合当前 AIPD2 规则，先输出差异清单和更新方案，用户确认后再安全合并更新。
  关键词：AIPD update、aipd update、升级 AIPD、更新 AGENTS、补 context-map、同步新模板、检查 AIPD 架构、项目 AIPD 迁移
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
  - adoc/templates/context-map.md
  - case/overview.md
  - case/templates/case.md
---

# AIPD2 Update

`aipd2-update` 用于把一个已经初始化过 AIPD 的项目，升级到当前 AIPD2 的最新项目入口、上下文检索和 case 观察锚点规则。

它不是初始化入口，也不是经验回流入口：

- 初始化新项目用 `aipd2`。
- 从会话和 transcript 提炼框架经验用 `aipd2-learn`。
- 已有项目同步 AIPD2 新结构、新模板、新检索规则，用 `aipd2-update`。

## 职责边界

**只做**：审计当前项目 AIPD 架构 → 对比当前 AIPD2 模板和规则 → 输出更新清单 → 用户确认后安全合并更新。

**不做**：不改业务代码，不执行 case step，不归档 case，不自动提交，不覆盖用户项目文档正文。

## 更新对象

优先检查：

- `AGENTS.md`：AIPD 项目入口区块是否包含最新上下文检索、L3/L5 边界和恢复链路。
- `_adoc/index.md`：是否声明 `context-map`、L3 核心概念、L5 工程实现层和读取原则。
- `_adoc/context-map.md`：是否存在，是否包含任务路由、核心概念入口、工程规则入口、自迭代观察锚点。
- `_adoc/L3-core/index.md`：是否具备核心概念索引入口；不存在时只列建议，不默认凭空生成业务概念。
- `_adoc/L4-product/index.md`：是否具备产品功能索引入口；不存在时只列建议。
- `_adoc/L5-dev/index.md`：是否表达“工程实现层”边界，而不是把 L5 当代码细节全集。
- `_adoc/case/**/case.md`：进行中 case 是否有上下文索引和自迭代观察锚点。

按需检查：

- `CLAUDE.md`：如果项目使用 Claude Code 或已有该文件，检查其中 AIPD 区块。
- 局部 `README.md`：只检查是否存在与本次更新相关的入口，不批量改页面/组件 README。

## 第一步：判断项目状态

先读取：

```bash
pwd
git status --short
test -f AGENTS.md && sed -n '1,260p' AGENTS.md
test -f _adoc/index.md && sed -n '1,220p' _adoc/index.md
find _adoc -maxdepth 3 -type f | sort
```

如果没有 `_adoc/`，停止并建议使用 `aipd2` 初始化，不要把 update 当初始化用。

如果工作区有未提交改动，继续审计可以进行，但在输出中标记风险；执行写入前提醒用户当前工作区已有改动。

## 第二步：审计差异

对照当前 AIPD2 注入模板和规则审计，不要求逐字一致，重点看能力是否存在。

### 必须项

- `AGENTS.md` 有 AIPD 标记区块，或有明确 AIPD 项目入口。
- 入口链路包含 `_adoc/index.md`。
- 入口链路包含 `_adoc/context-map.md` 或说明缺失时的兜底检索策略。
- L3 被定义为核心对象、领域语言、核心流程、数据模型和系统成立方式。
- L5 被定义为产品功能到代码实现之间的工程实现层，负责跨模块、跨端、跨页面的稳定实现规则。
- 明确页面、弹窗、组件内部细节放就近 `README.md`，不塞回 L5。
- case 恢复链路包含 case / step 文件作为事实源。

### 建议项

- `_adoc/context-map.md` 包含任务路由、核心概念入口、工程规则入口、自迭代观察锚点。
- `_adoc/L3-core/index.md` 有核心概念表的骨架。
- `_adoc/L5-dev/index.md` 有跨模块工程规则索引。
- 进行中 case 有“层级判断、必读文档、代码入口、兜底搜索、风险边界、自迭代观察锚点”。

### 不自动改项

- 不凭空生成业务核心概念、产品功能清单或页面 README。
- 不重写用户已有 `_adoc` 正文。
- 不迁移历史 case，不批量补所有旧 case，除非用户明确要求。

## 第三步：输出更新清单

默认只输出清单，不写文件。

```md
【AIPD2 Update 审计结果】

项目：
- 路径：{project_root}
- 分支：{branch}
- 工作区：{clean / dirty}

总体判断：
- 当前 AIPD 状态：已初始化 / 部分初始化 / 不是 AIPD 项目
- 建议动作：无需更新 / 建议补齐 / 需要迁移

需要更新：
- `AGENTS.md`：{缺什么；为什么要改；计划怎么合并}
- `_adoc/index.md`：{缺什么；为什么要改；计划怎么合并}
- `_adoc/context-map.md`：{不存在 / 缺章节 / 需要补路由}

建议更新：
- `_adoc/L3-core/index.md`：{建议补核心概念索引骨架，但不生成业务词}
- `_adoc/L5-dev/index.md`：{建议补工程实现层边界}
- `{case}`：{建议补观察锚点}

不处理：
- {明确不碰哪些业务文档、代码、历史 case}

待用户确认：
- 是否执行上述更新？
```

## 第四步：用户确认后写入

只有用户明确确认后才修改文件。

写入规则：

1. `AGENTS.md`
   - 如果有 `<!-- AIPD:START -->` 和 `<!-- AIPD:END -->`，只替换标记区块。
   - 如果没有标记但有 AIPD 内容，先说明风险，优先追加新标记区块，不删除原文。
   - 如果不存在，写入当前 `@references/agent-entry/template.md` 并包裹 AIPD 标记。

2. `_adoc/index.md`
   - 已存在时只补缺失章节或关键规则，不覆盖项目状态、OKR、case 等项目事实。
   - 不存在时使用 `@references/adoc/templates/index.md` 创建。

3. `_adoc/context-map.md`
   - 不存在时使用 `@references/adoc/templates/context-map.md` 创建。
   - 已存在时只补缺失的标准章节，不删除用户已有路由。

4. `_adoc/L3-core/index.md` / `_adoc/L4-product/index.md` / `_adoc/L5-dev/index.md`
   - 不凭空生成业务内容。
   - 可以补一个空骨架或边界说明，但必须先在更新清单中列明，等用户确认。

5. 进行中 case
   - 默认不批量修改历史 case。
   - 只在用户确认时，为当前进行中 case 补上下文索引缺口或自迭代观察锚点。

## 第五步：完成后说明

返回：

- 修改了哪些文件。
- 哪些建议没有执行，为什么。
- 是否需要重新运行 `aipd2-case-create` 或 `aipd2-learn`。
- 是否建议提交当前改动。

不要自动提交。

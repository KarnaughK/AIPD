---
name: aipd2-update
description: >
  更新已初始化项目中的 AIPD 架构。审计 AGENTS.md、_adoc/index.md、_adoc/map.md、L3/L4/L5 map、case 模板和索引是否符合当前 AIPD2 规则，先输出差异清单和更新方案，用户确认后再安全合并更新。
  关键词：AIPD update、aipd update、升级 AIPD、更新 AGENTS、补 map、同步新模板、检查 AIPD 架构、项目 AIPD 迁移、L3 map、L4 feature map
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
  - agent-entry/interaction-style.md
  - adoc/templates/index.md
  - adoc/templates/map.md
  - case/overview.md
  - case/templates/case.md
---

# AIPD2 Update

`aipd2-update` 用于把一个已经初始化过 AIPD 的项目，升级到当前 AIPD2 的最新项目入口、项目记忆地图和 case 观察锚点规则。

它不是初始化入口，也不是经验回流入口：

- 初始化新项目用 `aipd2`。
- 当前项目 ADOC 经验回写用 `aipd2-weave`。
- 从会话和 transcript 提炼 AIPD2 框架经验用 `aipd2-learn`。
- 已有项目同步 AIPD2 新结构、新模板、新 map 规则，用 `aipd2-update`。

## 职责边界

**只做**：审计当前项目 AIPD 架构 → 对比当前 AIPD2 模板和规则 → 输出更新清单 → 用户确认后安全合并更新。

**不做**：不改业务代码，不执行 case step，不归档 case，不自动提交，不覆盖用户项目文档正文，不主动把旧结构作为兼容目标长期保留。

## 升级原则

`aipd2-update` 的目标是把项目升级到当前 AIPD2 标准结构，不是做兼容性维护。

- **最新结构优先**：发现旧结构时，默认把它识别为“过期结构”，给出迁移、删除或替换方案；不把旧结构继续作为读取兜底。
- **不主动兼容**：除非用户明确要求保留旧入口或旧格式，否则 update 不主动提出“兼容旧结构”的目标。
- **先沟通再写入**：只要升级涉及多个入口文件、目录结构变化、模板替换或 case 规则变化，必须先列出将修改哪些文件、为什么改、怎么合并。
- **破坏性更新可跳过**：删除文件、重命名入口、大块替换模板、移除旧读取链路等属于破坏性更新。用户可以选择跳过；如果跳过，最终结果必须说明项目哪些部分没有升级到最新 AIPD2。
- **跳过不伪装完成**：用户跳过某项破坏性更新时，不写“已完全升级”，只写“已完成非破坏性更新，以下旧结构仍保留”。

## 更新对象

优先检查：

- `AGENTS.md`：分开检查 AIPD Project Entry 和可选 Interaction Style，不能只因 AIPD 区块符合就判定 Agent MD 整体已是最新。
- `AGENTS.md` 的 AIPD Project Entry：AIPD 项目入口区块是否包含最新记忆读取、L3/L5 边界和恢复链路。
- `_adoc/index.md`：是否声明 `_adoc/map.md`、L3 核心概念、L4 功能线、L5 工程实现层和读取原则。
- `_adoc/map.md`：是否存在，是否包含高频任务入口、L3 核心概念总表、L4 产品功能线总表、L5 工程规则总表、自迭代观察锚点和 Weave 反向编织锚点。
- `_adoc/context-map.md`：过期入口；存在时检查稳定入口是否已经进入 `_adoc/map.md`，并把删除列为破坏性更新候选，不继续兼容读取。
- `_adoc/L3-core/map.md`：是否具备核心概念图骨架；不存在时只列建议，不默认凭空生成业务概念。
- `_adoc/L4-product/map.md`：是否具备产品功能线总图；不存在时只列建议。
- `_adoc/L4-product/{feature}/map.md`：如果用户明确指定功能线，检查是否需要创建该功能线 map。
- `_adoc/L5-dev/index.md`：是否表达“工程实现层”边界，而不是把 L5 当代码细节全集。
- `_adoc/case/**/case.md`：进行中 case 是否有上下文索引和自迭代观察锚点。

按需检查：

- `CLAUDE.md`：如果项目使用 Claude Code 或已有该文件，检查其中 AIPD 区块。
- `AGENTS.md` / `CLAUDE.md` 中的 `<!-- AIPD-INTERACTION-STYLE:START -->` 区块：这是可选交互风格，只提示，不作为 AIPD 架构必须项。
- 局部 `README.md`：只检查是否存在与本次更新相关的入口，不批量改页面/组件 README。

## Agent MD 模板等级

`AGENTS.md` / `CLAUDE.md` 不是单一“符合 / 不符合”状态。审计时必须单独报告当前 Agent MD 模板等级：

| 等级 | 名称 | 内容 | 适用情况 |
|---|---|---|---|
| 0 | 不修改 Agent MD | 不写入或同步任何 Agent MD 区块 | 用户不想让项目记忆文件变化，或只想更新 `_adoc` |
| 1 | AIPD Project Entry | 只写入 / 同步 `<!-- AIPD:START -->` AIPD 项目入口区块 | 强推荐；让 Agent 知道项目使用 AIPD、如何读取 `_adoc` |
| 2 | AIPD Project Entry + Interaction Style | 同步 AIPD 区块，并额外写入 / 同步 `<!-- AIPD-INTERACTION-STYLE:START -->` 可选交互风格区块 | 用户希望 Agent 调整回复结构、讨论 / 执行切换和长短答偏好 |

审计规则：

- 即使 AIPD Project Entry 已经符合，也要继续检查 Interaction Style 是否存在。
- 如果 Interaction Style 不存在，不能写“AGENTS.md 已完全符合”；应写“AGENTS.md 的 AIPD Project Entry 符合；Interaction Style 未安装，可选是否升级到等级 2”。
- 如果用户没有明确选择等级，默认只输出审计和建议，不修改 Agent MD。
- 如果用户说“按你建议来 / 开搞 / 执行上述更新”，但没有提 Agent MD 等级，只能执行清单里已明确列出的 AIPD 必须更新；Interaction Style 仍需单独确认。

## 第一步：判断项目状态

先读取：

```bash
pwd
git status --short
test -f AGENTS.md && sed -n '1,260p' AGENTS.md
test -f _adoc/index.md && sed -n '1,220p' _adoc/index.md
test -f _adoc/map.md && sed -n '1,260p' _adoc/map.md
find _adoc -maxdepth 3 -type f | sort
```

如果没有 `_adoc/`，停止并建议使用 `aipd2` 初始化，不要把 update 当初始化用。

如果工作区有未提交改动，继续审计可以进行，但在输出中标记风险；执行写入前提醒用户当前工作区已有改动。

## 第二步：审计差异

对照当前 AIPD2 注入模板和规则审计，不要求逐字一致，重点看能力是否存在。

### 必须项

- `AGENTS.md` 有 AIPD 标记区块，或有明确 AIPD 项目入口。
- 入口链路包含 `_adoc/index.md`。
- 入口链路包含 `_adoc/map.md`，并说明缺失时的兜底检索策略。
- L3 被定义为核心对象、领域语言、核心流程、数据模型和系统成立方式。
- L4 被定义为产品功能线、业务边界、交互规则和实现入口地图的承载层。
- L5 被定义为产品功能到代码实现之间的工程实现层，负责跨模块、跨端、跨页面的稳定实现规则。
- 明确页面、弹窗、组件内部细节放就近 `README.md`，不塞回 L5。
- case 恢复链路包含 case / step 文件作为事实源。
- 执行概念或项目入口中包含 Weave：讨论、step 结果、case 归档、diff、错误日志和外部资料中的稳定信息，应通过 `aipd2-weave` 回写项目 ADOC、局部 README、map 或 case。

### 建议项

- `_adoc/map.md` 包含高频任务入口、L3 核心概念总表、L4 产品功能线总表、L5 工程规则总表、自迭代观察锚点和 Weave 反向编织锚点。
- `_adoc/L3-core/map.md` 有核心概念图骨架。
- `_adoc/L4-product/map.md` 有产品功能线总图骨架。
- 用户明确指定的 L4 功能线有 `_adoc/L4-product/{feature}/map.md`，并能记录页面、接口、数据对象、权限码、相关 L3/L5。
- `_adoc/L5-dev/index.md` 有跨模块工程规则索引。
- 进行中 case 有“层级判断、必读文档、代码入口、兜底搜索、风险边界、自迭代观察锚点、Weave 候选位置”。

### 可选项

- `AGENTS.md` / `CLAUDE.md` 可以包含独立的 Interaction Style 区块，用于调整 Agent 的回复结构和讨论 / 执行切换方式。
- 该区块不属于 AIPD Project Entry 必须能力；只有用户明确同意时，才使用 `@references/agent-entry/interaction-style.md` 写入。
- 如果已有 Interaction Style 区块，检查是否需要同步到当前模板；如果没有，只在更新清单里询问用户是否需要补充。
- 审计输出必须显示当前 Agent MD 模板等级和可选升级目标，不要把 Interaction Style 混入 AIPD 必须项。

### 不自动改项

- 不凭空生成业务核心概念、产品功能清单或页面 README。
- 不重写用户已有 `_adoc` 正文。
- 不迁移历史 case，不批量补所有旧 case，除非用户明确要求。
- 不主动保留旧入口作为兼容方案；旧入口只作为过期结构处理。

## Map 骨架

当用户明确要求补 L3 / L4 map，或审计清单确认后需要创建空骨架，使用下面的最小结构。骨架只提供 AI 检索入口，不替用户编造业务事实。

### L3 核心概念 map

文件建议：`_adoc/L3-core/map.md`

````md
# L3 核心概念地图

## 核心概念总表

| 用户说法 / 黑话 | 标准概念 | 含义 | 细节文档 | 相关 L4 功能线 | 常见误解 |
|---|---|---|---|---|---|
| {待补} | {待补} | {待补} | {待补} | {待补} | {待补} |

## 对象关系

```mermaid
flowchart TD
    A["核心对象 A"] --> B["核心对象 B"]
```

## 兜底搜索

- `rg "{核心词|别名}" .`
````

### L4 产品功能线总 map

文件建议：`_adoc/L4-product/map.md`

````md
# L4 产品功能线地图

## 功能线总表

| 用户说法 / 场景 | 标准功能线 | 功能线 map | 前端入口 | 后端入口 | 数据对象 | 相关 L3 | 相关 L5 |
|---|---|---|---|---|---|---|---|
| {待补} | {待补} | `_adoc/L4-product/{feature}/map.md` | {待补} | {待补} | {待补} | {待补} | {待补} |

## 兜底搜索

- `rg "{功能线关键词|页面名|接口名}" .`
````

### L4 单功能线 map

文件建议：`_adoc/L4-product/{feature}/map.md`

````md
# {功能线名} Map

## 功能线边界

- 要解决的问题：{待补}
- 包含场景：{待补}
- 不包含场景：{待补}

## 实现入口

| 场景 | 前端入口 | 后端入口 | 数据对象 | 权限码 | 说明 |
|---|---|---|---|---|---|
| {待补} | {待补} | {待补} | {待补} | {待补} | {待补} |

## 相关认知

- L3：{核心概念 map}
- L5：{工程规则 map}
- 局部 README：{页面 / 弹窗 / 组件 README}

## 流程图

```mermaid
flowchart TD
    A["开始"] --> B["待补"]
```

## 兜底搜索

- `rg "{功能线关键词|接口名|权限码}" .`
````

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
- 建议动作：无需更新 / 建议补齐 / 需要升级 / 存在可跳过的破坏性更新

升级原则：
- 是否发现过期结构：{否 / 是，列出路径}
- 是否存在破坏性更新：{否 / 是，必须列入下一节}
- 是否存在用户可跳过项：{否 / 是，跳过后的影响是什么}

破坏性更新：
- `{path}`：{删除 / 重命名 / 大块替换 / 移除旧读取链路；为什么属于破坏性更新；建议动作；跳过影响}

需要更新：
- `AGENTS.md`：
  - AIPD Project Entry：{符合 / 缺什么 / 为什么要改 / 计划怎么合并}
  - Interaction Style：{未安装 / 已安装但需同步 / 已是当前模板 / 可选跳过}
- `_adoc/index.md`：{缺什么；为什么要改；计划怎么合并}
- `_adoc/map.md`：{不存在 / 缺章节 / 需要补路由 / 是否需要吸收过期 context-map 的稳定入口}
- `_adoc/context-map.md`：{不存在 / 作为过期结构存在；是否列入破坏性更新删除项}
- `AGENTS.md / _adoc/index.md / _adoc/map.md`：{是否缺 Weave 概念、反向编织锚点或 `/aipd2-weave` 路由}

建议更新：
- `_adoc/L3-core/map.md`：{建议补核心概念图骨架；如果用户指定概念，可先列候选，不擅自定稿}
- `_adoc/L4-product/map.md`：{建议补功能线总图骨架}
- `_adoc/L4-product/{feature}/map.md`：{用户指定功能线时，建议创建功能线图，记录页面 / 接口 / 数据对象 / 权限 / L3 / L5}
- `_adoc/L5-dev/index.md`：{建议补工程实现层边界}
- `{case}`：{建议补观察锚点}

可选更新：
- Agent MD 模板等级：
  - 当前等级：{0 / 1 / 2}
  - 推荐等级：{通常为 1；如果用户希望调整回复风格，推荐 2}
  - 可选动作：{不改 Agent MD / 只同步 AIPD Project Entry / 同步 AIPD Project Entry + Interaction Style}
  - 风险提示：Interaction Style 会影响回复风格，需用户明确同意

不处理：
- {明确不碰哪些业务文档、代码、历史 case}

待用户确认：
- 是否执行上述更新？
- 是否执行破坏性更新？如跳过，哪些旧结构保留？
- Agent MD 使用哪个等级：0 不修改 / 1 只同步 AIPD Project Entry / 2 同步 AIPD Project Entry + Interaction Style？
```

## 第四步：用户确认后写入

只有用户明确确认后才修改文件。

写入规则：

1. `AGENTS.md`
   - 先按用户确认的 Agent MD 模板等级决定是否修改。
   - 等级 0：不修改 `AGENTS.md` / `CLAUDE.md`，即使审计发现可选 Interaction Style 缺失也不写入。
   - 等级 1：只处理 AIPD Project Entry，不处理 Interaction Style。
   - 等级 2：先处理 AIPD Project Entry，再处理 Interaction Style。
   - 如果有 `<!-- AIPD:START -->` 和 `<!-- AIPD:END -->`，只替换标记区块。
   - 如果没有标记但有 AIPD 内容，先说明风险，优先追加新标记区块，不删除原文。
   - 如果不存在，写入当前 `@references/agent-entry/template.md` 并包裹 AIPD 标记。

2. `_adoc/index.md`
   - 已存在时只补缺失章节或关键规则，不覆盖项目状态、OKR、case 等项目事实。
   - 不存在时使用 `@references/adoc/templates/index.md` 创建。

3. `_adoc/map.md`
   - 不存在时使用 `@references/adoc/templates/map.md` 创建。
   - 已存在时只补缺失的标准章节，不删除用户已有路由。
   - 如果缺少 Weave 反向编织锚点，只补锚点和 `/aipd2-weave` 路由，不写具体业务经验。
   - 如果发现 `_adoc/context-map.md`，先确认其中稳定入口已进入 `_adoc/map.md`，把删除旧文件列为破坏性更新；只有用户确认执行该破坏性更新时才删除。新架构不再兼容读取它。

4. `_adoc/L3-core/map.md` / `_adoc/L4-product/map.md` / `_adoc/L5-dev/map.md`
   - 不凭空生成业务内容。
   - 可以补一个空骨架或边界说明，但必须先在更新清单中列明，等用户确认。

5. `_adoc/L4-product/{feature}/map.md`
   - 只有用户明确指定功能线或审计发现已有功能线目录时才建议创建。
   - 功能线 map 可以记录稳定入口：前端页面、后端接口、数据对象、权限码、相关 L3 概念、相关 L5 工程规则、局部 README。
   - 不写页面内部实现细节；细节继续放代码目录 README。

6. 进行中 case
   - 默认不批量修改历史 case。
   - 只在用户确认时，为当前进行中 case 补上下文索引缺口、自迭代观察锚点或 Weave 候选位置。

7. 可选 Interaction Style
   - 不作为 AIPD update 必须项。
   - 只有用户明确同意“写入 / 同步 Interaction Style”或选择 Agent MD 等级 2 时才处理。
   - 读取 `@references/agent-entry/interaction-style.md`。
   - 用独立标记包裹：
     ```md
     <!-- AIPD-INTERACTION-STYLE:START -->
     {interaction-style}
     <!-- AIPD-INTERACTION-STYLE:END -->
     ```
   - 如果目标文件已有该标记区块，只替换标记之间内容。
   - 如果目标文件没有该标记区块，追加到文件末尾，不改动 AIPD 区块和用户原有内容。

## 第五步：完成后说明

返回：

- 修改了哪些文件。
- Agent MD 最终采用哪个等级。
- 是否写入或跳过 Interaction Style。
- 执行了哪些破坏性更新；哪些破坏性更新被用户跳过。
- 如果用户跳过破坏性更新，说明项目还保留哪些过期结构，以及它为什么不算完全升级。
- 哪些建议没有执行，为什么。
- 是否需要重新运行 `aipd2-case-create`、`aipd2-weave` 或 `aipd2-learn`。
- 是否建议提交当前改动。

不要自动提交。

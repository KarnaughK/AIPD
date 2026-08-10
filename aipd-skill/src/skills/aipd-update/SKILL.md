---
name: aipd-update
description: >
  更新已初始化项目中的 AIPD 架构。审计 manifest、AGENTS.md、_aipd/index.md、_aipd/map.md、五类 Knowledge 目录、Case 模板和索引是否符合当前规则，先输出差异清单和更新方案，用户确认后再安全合并更新。
  关键词：AIPD update、aipd update、升级 AIPD、更新 AGENTS、补 map、同步新模板、检查 AIPD 架构、项目 AIPD 更新、Knowledge Schema
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
  - AskUserQuestion
inject-from-core:
  - overview.md
  - aipd-project-structure.md
  - agent-entry/template.md
  - agent-entry/interaction-style.md
  - agent-guides/aipd_context_retriever.md
  - workspace/templates/manifest.json
  - workspace/templates/index.md
  - workspace/templates/map.md
  - case/overview.md
  - case/templates/index.md
  - case/templates/case.md
  - case/templates/work-package.md
---

# AIPD Update

`aipd-update` 只更新已经使用 Knowledge Schema v2 的项目。它先做只读审计，输出差异和安全合并方案，用户确认后才写入。

## 职责边界

**只做**：

- 验证 `_aipd/manifest.json` 为 `aipd-project` v2。
- 审计 `_aipd/index.md`、`_aipd/map.md` 和 `knowledge/{intent,research,core,product,engineering}/` 的边界与索引结构。
- 审计 `_aipd/{sop,case,okr}/`、`_aipd/inbox.md` 是否保持独立流程职责。
- 审计 `AGENTS.md` / `CLAUDE.md` 的 AIPD Project Entry，并在用户明确选择等级 2 时同步 Interaction Protocol。
- 审计进行中 Case 是否使用 Case Contract + phase-first + `03-execute/work-packages/` 结构。
- 优先合并缺失区块，不覆盖用户正文。

**不做**：

- 不初始化全新项目。
- 不识别、读取或写入任何非 Knowledge Schema v2 工作区；这类项目交给一次性 Schema 迁移器。
- 不重写项目方向、调研结论、核心模型、产品规则或工程正文。
- 不从进行中 Case 把未验收结论直接写入 Knowledge。
- 不执行 install、远程写入、git commit 或 push。

## 与其他 Skill 的分工

- 新项目初始化：`aipd`。
- 一次性 Schema 切换：当前 `aipd` Skill 随包携带的 `scripts/migrate-project-schema`；AIPD 源码仓库中的等价入口是 `aipd-skill/scripts/migrate-project-schema`。
- 当前项目稳定知识回写：`aipd-weave`。
- AIPD 框架自迭代和 transcript 诊断：`aipd-learn`。
- Case 创建、执行、验收和归档：`aipd-case`。

## 总流程

```text
验证 manifest
-> 读取 index / map / Agent Entry / Knowledge 入口 / 流程索引
-> 输出差异清单与风险分级
-> 输出更新方案和 Agent MD 等级
-> 等待用户确认
-> 按已确认范围安全合并
-> 执行结构与链接验证
```

## 阶段 1：只读审计

### 1. Schema Gate

先读取 `_aipd/manifest.json`：

- 按路径项存在性识别新旧根；损坏 symlink 和同名普通文件也算存在。拒绝双根、symlink 工作区和工作区内 symlink。
- `_aipd/manifest.json`、`index.md`、`map.md` 必须是非 symlink 的普通文件；manifest 仅含并精确等于 `{"schema":"aipd-project","schemaVersion":2}`。
- 工作区缺失、任一路径类型不符，或 manifest 缺失、多字段、值不匹配时，立即停止，不继续扫描、不创建目录、不猜测修复。

### 2. 工作区结构

审计必要入口：

```text
_aipd/
├── manifest.json
├── index.md
├── map.md
├── inbox.md
├── knowledge/
│   ├── intent/
│   ├── research/
│   ├── core/
│   ├── product/
│   └── engineering/
├── sop/
├── case/
└── okr/
```

工作区只承载知识与流程，不在 `knowledge/` 中创建代码目录。

### 3. 项目入口与 map

审计 `_aipd/index.md`：

- 是否声明 `_aipd/map.md` 为第一跳检索入口。
- 是否将 Intent / Research / Core / Product / Engineering 表达为五类并列知识域。
- 是否说明 SOP / Case / OKR / Inbox 不属于 Knowledge 正文。
- 是否说明代码位于真实源码目录，局部实现地图贴近 README。

审计 `_aipd/map.md`：

- 是否具备高频任务入口、五类知识域路由、流程入口、局部 README / 代码入口和兜底搜索。
- 是否明确普通任务不路由到 Case / OKR，只有显式流程任务才进入。
- 是否包含自迭代观察锚点和 Weave 反向编织锚点。

### 4. 五类 Knowledge 入口

- Intent：检查 `intent.md` 或对应索引是否保留长期方向、目标与取舍；不自动补写项目方向。
- Research：检查调研入口是否能保留来源、观察日期和时间边界；不伪造外部事实。
- Core：检查 index / map 骨架是否可承载核心概念、对象关系、领域语言和项目成立模型。
- Product：检查功能线 map 是否能记录产品能力、业务规则、用户可见行为和相关实现入口。
- Engineering：检查 index / map 是否承载跨模块实现逻辑、协作约定和长期工程规则，而不是空泛的代码细节全集。

对于缺失的业务正文，只列建议和骨架，不凭空定稿。

### 5. Case / SOP / OKR / Inbox

- `_aipd/case/index.md` 是否能区分进行中与 archive。
- 进行中 `case.md` 是否以 Case Contract + Case Runtime 为入口，使用 Think / Design / Execute / Verify / Close 和 `03-execute/work-packages/`。
- `_aipd/sop/index.md` / `map.md` 是否存在，SOP 是否承载可重复的 Agent 程序而非知识正文。
- `_aipd/okr/index.md` 和 `_aipd/inbox.md` 是否保持各自入口语义。

### 6. Agent MD 等级

| 等级 | 内容 | 更新边界 |
|---|---|---|
| 0 | 不修改 Agent MD | 用户明确不想更改项目记忆文件 |
| 1 | AIPD Project Entry | 同步 `<!-- AIPD:START -->` 区块；默认推荐 |
| 2 | Entry + Interaction Protocol | 额外同步项目级对话协议；必须用户明确选择 |

检查现有 `AGENTS.md` / `CLAUDE.md` 标记区块是否完整，区块外内容永不覆盖。

## 阶段 2：差异报告与方案

只读审计后输出：

```md
【AIPD Update 审计结果】

Schema：passed / blocked

已符合：
- ...

缺失 / 过期：
- `path`：缺什么，影响是什么

建议更新：
- `path`：准备合并什么

风险：
- additive：...
- semantic：...
- destructive：...

Agent MD 建议等级：0 / 1 / 2

待确认：
- 是否按上述范围执行？
```

风险分级：

- **additive**：新增缺失目录、索引区块或模板壳，不覆盖用户正文。
- **semantic**：修改一段现有规则或路由语义，必须说清影响。
- **destructive**：删除、移动或覆盖文件；必须精确列出目标并单独确认。

## 阶段 3：用户确认后执行

1. 再次校验 manifest，防止执行期状态变化。
2. 按确认的 Agent MD 等级编辑标记区块，不改区块外内容。
3. 只新建方案明确列出的目录和模板壳。
4. 更新 `_aipd/index.md` 和 `_aipd/map.md` 时，优先追加缺失区块或表格行，不重写用户已有正文。
5. 知识域中只写经确认的结构骨架；项目事实和稳定知识交给 Weave。
6. 破坏性操作只执行用户单独确认的精确目标。

## 验证

- manifest 仍为 `aipd-project` v2。
- `_aipd/index.md` / `map.md` 和五类 Knowledge 目录链接可定位。
- SOP / Case / OKR / Inbox 没有被混入 Knowledge。
- Case 索引能定位进行中 Case，恢复链可用。
- Agent MD 标记成对，区块外内容保持不变。
- 新增 Markdown 链接和模板引用均存在。

完成后返回改动文件、验证结果和未处理风险。不自动提交、push 或 install。

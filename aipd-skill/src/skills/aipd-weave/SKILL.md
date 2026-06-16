---
name: aipd-weave
description: >
  AIPD 反向编织入口。把讨论、开发、step 结果、case 归档、外部资料或错误日志中产生的新信息，判断并回写到当前项目的 _adoc、局部 README、map 或 case 记录。
  关键词：weave、反向编织、知识回写、项目经验沉淀、更新 ADOC、更新 map、更新 README、step 完成后回写、case 归档后回写
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
  - adoc/templates/map.md
  - case/overview.md
---

# AIPD Weave

`aipd-weave` 是 AIPD 的反向编织入口。对用户来说，它就是“更新 ADOC 文档”：先看当前上下文，总结可沉淀重点，判断准备写到哪些文档，确认后修改项目级 ADOC 和索引系统。

其他 skill 负责执行、验证和产出结果；`weave` 负责判断这些结果是否值得沉淀、沉淀到哪里、是否更新索引、是否提示旧知识冲突。

## 职责边界

**只做**：

- 先读取项目入口和 map，再从当前上下文、用户描述、step 结果、case 归档、代码 diff、错误日志或外部资料中提炼可沉淀重点。
- 判断候选信息属于 L3、L4、L5、局部 README、map、case / step、AIPD 框架经验中的哪一类。
- 如果候选信息是可重复执行的项目动作，判断是否应进入 `_adoc/sop/` 作为以 Agent 为运行时的可复用 AI 原生程序。
- 优先更新当前项目已有 `_adoc/`、局部 README、map 或 case / step 记录。
- 在写入前输出回写方案，等用户确认后再改文件。
- 写入后说明改了哪些文件，以及是否需要继续运行构建、测试或安装。

**不做**：

- 不执行开发 step。
- 不归档 case，不移动 case 目录，不合并分支。
- 不替代 `aipd-learn` 做 AIPD 框架自迭代诊断。
- 不把一次性聊天过程写进长期 ADOC。
- 不为了沉淀创建大量零散文档；优先更新已有文件和索引。

## 和其他 skill 的关系

| skill | 负责什么 | 和 weave 的关系 |
|---|---|---|
| `aipd` | 入口路由和轻量上下文加载 | 用户说“回写 / 记一下 / weave / 更新 ADOC”时推荐进入 `aipd-weave` |
| `aipd-case-run` | 执行 case / step，收集结果 | step 完成后可把结果包交给 `aipd-weave` 判断是否沉淀 |
| `aipd-case-archive` | 归档 case、收束状态 | 归档前后可调用 `aipd-weave` 做稳定知识回写 |
| `aipd-learn` | AIPD 框架自迭代、transcript 诊断、定位卡 | 框架经验走 `learn`；业务项目 ADOC 回写走 `weave` |
| `aipd-update` | 升级已初始化项目的 AIPD 架构 | 架构模板同步走 `update`；当前项目经验沉淀走 `weave` |

## 触发场景

进入 `weave` 的典型说法：

```text
/aipd-weave 把刚才这段记到 ADOC
/aipd-weave step 做完了，看看要不要回写
/aipd-weave 这次踩坑沉淀一下
/aipd-weave 根据这个 diff 更新项目文档
/aipd-weave 把这个外部资料编织进项目认知
```

流程型触发点：

1. **用户主动触发**：用户明确说“记一下 / 回写 / weave / 更新 ADOC / 更新 map”。
2. **Step 完成触发**：step 执行结束后，判断是否出现新规则、新路径、新边界、新坑点。
3. **Case 归档触发**：case 完成后，把临时过程和稳定知识分离。
4. **普通开发结束触发**：轻量代码修改后，只有出现可复用知识时才建议 weave。

## 执行流程

`weave` 对用户的入口语义是“更新 ADOC 文档”。不要一上来要求用户选择来源类型。来源分类、稳定性判断和归属判断都是 Agent 内部工作。

默认流程是：

```text
读取项目入口和 map
-> 回看当前对话 / 用户输入 / 已知执行结果
-> 自动提炼可沉淀重点
-> 判断准备更新哪些 ADOC / README / map / case 文件
-> 向用户确认回写方案
-> 用户确认后修改文件
```

只有当前上下文完全看不出要沉淀什么时，才问一句：“你想把哪段内容更新进 ADOC？”

### 第一步：读取项目入口

先确认当前项目是否使用 AIPD：

```bash
test -d _adoc && test -f _adoc/index.md
```

如果没有 `_adoc/`，说明当前项目还未初始化 AIPD。此时不要创建 ADOC 文档；提示用户先运行 `aipd` 初始化，或只输出一份普通经验摘要。

如果有 `_adoc/`，读取：

```bash
cat _adoc/index.md
```

再读取项目地图：

```bash
cat _adoc/map.md 2>/dev/null
```

地图只负责引路。后续按候选信息读取相关 L3 / L4 / L5 / 局部 README，不全量扫描 `_adoc/`。

### 第二步：先看上下文并自动提炼重点

优先使用当前对话、用户刚刚给出的内容、已知执行结果和项目 map，自动总结这次可能要沉淀的重点。不要把“当前讨论 / step / case / 外部资料 / diff / 错误日志”这种来源分类当成问题抛给用户。

Agent 内部可以用来源分类辅助判断：

| 来源 | 读取方式 |
|---|---|
| 当前讨论 | 直接基于当前对话提炼候选 |
| step 结果 | 读取对应 step 文件、case.md 和执行摘要 |
| case 归档 | 读取 case.md、已完成 steps、归档前 diff 摘要 |
| 代码 diff | 用 `git diff --stat` 和相关文件 diff 判断是否有文档价值 |
| 外部资料 | 读取用户粘贴内容或指定文件 / URL 摘要 |
| 错误日志 | 只提取可复用原因、定位路径、规避规则 |

如果用户明确给出 step、case、文件、URL 或 diff，就读取对应内容。如果用户没有给出具体来源，就默认从当前对话提炼。

如果读完项目入口和当前上下文后仍无法判断要更新什么，才向用户追问：

```text
我现在看不出要沉淀进 ADOC 的具体内容。你想把哪段内容更新进 ADOC？
```

### 第三步：形成内部回写候选

候选包是 Agent 内部整理材料，不需要默认展示给用户。其他 skill 调用 `weave` 时，可以交付下面的候选包；用户直接触发时，`weave` 自己补齐。

```md
# Weave Candidate

## 来源
- 类型：用户讨论 / step 结果 / case 归档 / 代码 diff / 错误日志 / 外部资料
- 位置：case、step、文件路径、transcript 或用户粘贴内容

## 新信息
- ...

## 相关上下文
- 已读 ADOC：
- 相关代码：
- 相关 case / step：

## 候选归属
- 可能影响 L3：
- 可能影响 L4：
- 可能影响 L5：
- 可能影响局部 README：
- 可能影响 map：
- 可能影响 SOP：
- 可能只留 case / step：

## 明确不回写
- ...
```

候选包是判断材料，不是最终结论。最终回写位置由 `weave` 再判断。

### 第四步：反向编织判定

按下面顺序判断：

1. **是否稳定**：未来任务是否可能复用；如果只是一次性过程，留在 case / step。
2. **影响层级**：它影响概念、功能、实现规则、局部代码入口、检索路径，还是 AIPD 框架本身。
3. **归属位置**：选择 L3 / L4 / L5 / 局部 README / map / case / step。
4. **索引需求**：是否需要更新 `_adoc/map.md` 或细节 map。
5. **冲突关系**：是否推翻、替换或限制了已有知识。
6. **写入粒度**：优先追加小节或补充条目，避免新建零散文件。

归属规则：

| 信息类型 | 默认归属 |
|---|---|
| 核心概念、标准名、黑话、对象关系、常见误解 | `_adoc/L3-core/` |
| 产品功能、功能边界、业务规则、用户可见行为 | `_adoc/L4-product/` |
| 权限、路由、插件、接口约定、跨模块实现逻辑、调试经验 | `_adoc/L5-dev/` |
| 页面、弹窗、组件、模块内部的实现入口和修改注意事项 | 代码目录就近 `README.md` |
| 可重复执行的项目动作、Agent 执行流程、跨前端/后端/脚本/外部工具的操作程序 | `_adoc/sop/`；同步更新 `_adoc/sop/map.md`，高频入口再同步 `_adoc/map.md` |
| 用户高频说法、业务词、工程词、容易迷路的入口 | `_adoc/map.md` |
| 一次性执行过程、验收记录、临时决策 | 当前 case / step |
| AIPD skill、模板、分层、Agent 行为规则 | `aipd-learn` 生成框架回流方案，回 AIPD 源项目处理 |

### 第五步：输出回写方案

写文件前必须先给方案：

```md
【AIPD Weave 回写方案】
来源：当前对话 / step / case / diff / 外部资料
判定：稳定知识 / 一次性过程 / 两者都有

准备回写：
- `path/to/file.md`：写入什么，为什么放这里
- `path/to/map.md`：新增哪个检索入口

不回写：
- {内容}：{原因}

冲突 / 失效：
- {旧知识路径或表述}：{新信息如何限制或替换它}

待确认：
- 是否按以上方案写入？
```

用户确认后再执行写入。如果用户明确要求“直接写”，仍然先用最短形式说明准备修改的文件，再写入。

### 第六步：执行写入

写入原则：

1. 优先编辑已有文件。
2. 新增文档只在现有结构没有合适承载点时使用。
3. 长期知识写结论、边界、依据和入口，不写完整聊天过程。
4. map 只写索引和路由，不承载完整正文。
5. SOP 存储可以按实际项目动作选择目录；索引必须能从 `_adoc/sop/map.md` 找到，高频入口再回写 `_adoc/map.md`。
6. 局部 README 只写当前模块的最后一层实现地图，不把跨模块规则塞进去。
7. 如果新信息推翻旧知识，保留旧知识的上下文，并写清新规则的适用范围。
8. 如果无法确认稳定性，先留在 case / step，并建议后续归档时再判断。

### 第七步：返回结果

完成后输出：

```md
【AIPD Weave 完成】
已修改：
- `path/to/file.md`：{摘要}

未写入：
- {内容}：{原因}

后续建议：
- {是否需要运行测试、构建、aipd-update 或 case 归档}
```

不要自动提交。除非用户明确要求，不运行 git commit / push。

## 和 Karpathy LLM Wiki 的对应关系

`weave` 吸收的是 LLM Wiki 的操作循环，而不是照搬目录结构。

```text
Raw source -> Ingest -> 更新 wiki pages -> 更新 index -> 追加 log -> Lint
```

AIPD 中对应为：

```text
讨论 / step / case / diff / 外部资料
-> aipd-weave
-> 回写 L3 / L4 / L5 / README / map / case
-> 必要时提示旧知识冲突
-> 下次 Agent 通过正向索引读取到新上下文
```

AIPD 已经有 L1-L6、OKR、Case、Step、Agent Entry 等项目级纵向模块。`weave` 的核心价值是把新信息编织进这些稳定位置，让项目知识库持续积累。

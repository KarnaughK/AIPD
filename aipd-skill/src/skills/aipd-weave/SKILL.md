---
name: aipd-weave
description: >
  AIPD 反向编织入口。把已完成事项、已验证实现、Case 归档、外部资料或错误日志中产生的新稳定信息，判断并回写到当前项目的五类知识域、局部 README 或 map；未完成 Case 中的候选先记入 Close phase。
  关键词：weave、反向编织、知识回写、项目经验沉淀、更新 knowledge、更新 map、更新 README、work package 完成后回写、case 归档后回写
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
  - aipd-project-structure.md
  - updates/catalog.json
  - workspace/project-state.md
  - workspace/templates/map.md
  - case/overview.md
---

# AIPD Weave

`aipd-weave` 负责判断已完成事项中哪些信息值得成为项目长期知识、应写到哪里、是否要更新索引，以及是否与已有知识冲突。

五类长期知识域都是 Weave 候选入口：

- Intent：只回写经用户明确确认的长期方向、目标、边界或取舍。
- Research：只回写带可追溯来源、观察日期或适用时间边界的稳定外部事实与调研结论。
- Core：回写核心概念、对象关系、领域语言和项目成立模型。
- Product：回写已验证的产品功能、业务规则和用户可见行为。
- Engineering：回写已验证的跨模块实现逻辑、协作约定和长期工程规则。

进行中的讨论、未实现设计和尚未验收结论不直接写入 Knowledge。它们只能先进入当前 Case 的 Close 归档候选，等 Close / Weave 再判断。

## 职责边界

**只做**：

- 读取 `_aipd/index.md` 和 `_aipd/map.md`，再从当前上下文、用户描述、Work Package 结果、Case 归档、代码 diff、错误日志或外部资料中提炼候选。
- 判断候选属于 Intent / Research / Core / Product / Engineering、局部 README、map、SOP、Case / Work Package 还是 AIPD 框架经验。
- 进行中 Case 只把候选写入 `05-close/close.md` 或 `case.md` 的 Close 摘要。
- 可重复执行的项目动作优先进入 `_aipd/sop/`，不误写为长期知识正文。
- 写入前输出回写方案，等用户确认后再修改文件。
- 写入后说明改了哪些文件，以及是否需要继续测试、构建或更新。

**不做**：

- 不执行开发 Work Package，不归档 Case，不移动 Case 目录，不合并分支。
- 不替代 `aipd-learn` 做 AIPD 框架自迭代诊断。
- 不把一次性聊天过程写入长期知识。
- 不把未完成 Case、未实现设计、未验收结论或未确认的方向写入 Knowledge、README 或 map。
- 不为了沉淀创建大量零散文档；优先更新已有文件和索引。

## 和其他 Skill 的关系

| Skill | 负责什么 | 和 Weave 的关系 |
|---|---|---|
| `aipd` | 入口路由和轻量上下文加载 | 用户说“回写 / 记一下 / weave / 更新 Knowledge”时进入本 Skill |
| `aipd-case` | 推进 Case / Work Package 并收集结果 | Case 未完成时只记 Close 候选；Close 后再判断是否沉淀 |
| `aipd-learn` | AIPD 框架自迭代、transcript 诊断和定位卡 | 框架经验走 Learn；当前业务项目知识走 Weave |
| `aipd-update` | 同步已初始化项目的 AIPD 架构 | 模板同步走 Update；项目经验沉淀走 Weave |

## 默认流程

```text
读取项目入口和 map
-> 如果是未完成 Case，记录 Close 候选并停止长期回写
-> 回看当前对话 / 用户输入 / 已知执行结果
-> 提炼候选并判断稳定性与归属
-> 输出回写方案
-> 用户确认后修改文件和索引
```

只有当前上下文完全看不出要沉淀什么时，才问：“你想把哪段内容更新进 AIPD 项目知识？”

### 1. 项目入口

先读取 `@references/workspace/project-state.md` 和 `@references/updates/catalog.json`，按路径项存在性、symlink、manifest 双形态和 `P/I` 执行项目 gate。双根、symlink、非法类型 / manifest 或 `P > I` 立即停止；`unversioned-v2` 或 `P < I` 返回 `needs-aipd-update`。只有 `P = I` 且 `index.md` / `map.md` 类型安全时才读取它们；项目版本不从 Agent Entry 推断。

地图只负责引路。后续按候选信息读取相关知识域、局部 README 或流程文件，不全量扫描 `_aipd/`。

### 2. 候选来源

| 来源 | 读取方式 |
|---|---|
| 当前讨论 | 直接基于当前对话提炼候选 |
| Work Package 结果 | 读取对应 Work Package、`case.md` 和执行摘要 |
| Case 归档 | 读取 `case.md`、已完成 Work Packages 和归档前 diff 摘要 |
| 代码 diff | 用 `git diff --stat` 和相关文件 diff 判断是否产生稳定知识 |
| 外部资料 | 读取用户粘贴内容或指定文件 / URL，记录来源、观察日期和时间边界 |
| 错误日志 | 只提取可复用原因、定位路径和规避规则 |

### 3. 进行中 Case

1. 读取相关 `case.md`，查看 Case Contract、`Current Phase`、`Phase State` 和 Verify 状态。
2. Case 尚未 Close 或目标尚未验收时，提示：“当前 Case 还没有完成，暂时不回写长期知识；先把这条记到 Close 阶段统一判断。”
3. 候选写入 `05-close/close.md` 的“归档候选 / 反向编织候选”；文件不存在时可暂记入 `case.md` 的 Close 摘要。
4. 候选标注状态：`unfinished / pending_verify / implemented_pending_acceptance / ready_to_evaluate`，以及候选归属。
5. 停止长期回写，不读取或修改 Knowledge、README 或 map。

### 4. 候选包

```md
# Close 归档候选

## 来源
- 类型：用户讨论 / Work Package 结果 / Case 归档 / diff / 错误日志 / 外部资料
- 位置或来源：...
- 观察日期 / 适用时间边界：...

## 新信息
- ...

## 候选归属
- Intent：...
- Research：...
- Core：...
- Product：...
- Engineering：...
- README / map / SOP / 仅留 Case：...

## 明确不回写
- ...
```

### 5. 稳定性与归属判定

1. **Case 门禁**：未完成 Case、未实现设计、未验收讨论默认不稳定，只留 Close 候选。
2. **稳定性**：信息已成为当前项目的真实行为或规则，相关实现已落地，并且有与风险相称的验证 / 验收证据。
3. **Intent 门禁**：即使来自已完成 Case，没有用户对长期方向或边界的明确确认，也不写入 Intent。
4. **Research 门禁**：缺少来源、观察日期或适用时间边界的外部事实不写入 Research。
5. **索引与冲突**：判断是否更新 `_aipd/map.md` 或细节 map，以及新信息是否推翻、替换或限制已有知识。
6. **写入粒度**：优先追加小节或补充条目，避免新建零散文件。

| 信息类型 | 默认归属 |
|---|---|
| 经用户明确确认的长期方向、目标、边界、取舍 | `_aipd/knowledge/intent/` |
| 带来源、观察日期和时间边界的外部事实或调研结论 | `_aipd/knowledge/research/` |
| 核心概念、标准名、黑话、对象关系、常见误解 | `_aipd/knowledge/core/` |
| 产品功能、功能边界、业务规则、用户可见行为 | `_aipd/knowledge/product/` |
| 权限、路由、插件、接口约定、跨模块实现逻辑、调试经验 | `_aipd/knowledge/engineering/` |
| 页面、弹窗、组件或模块内部的实现入口 | 代码就近 `README.md` |
| 可重复执行的项目动作或 Agent 程序 | `_aipd/sop/`；同步 `_aipd/sop/map.md`，高频入口再更新 `_aipd/map.md` |
| 用户高频说法、业务词、工程词和容易迷路的入口 | `_aipd/map.md` |
| 一次性执行过程、验收记录、临时决策 | 当前 Case / Work Package |

### 6. 回写方案与执行

写文件前必须给出：

```md
【AIPD Weave 回写方案】
来源：...
判定：稳定知识 / 一次性过程 / 两者都有

准备回写：
- `path/to/file.md`：写入什么，为什么放这里
- `path/to/map.md`：新增哪个检索入口

不回写：
- ...

冲突 / 失效：
- ...

待确认：是否按以上方案写入？
```

用户确认后再编辑文件。长期知识只写结论、边界、依据和入口，map 只写路由，局部 README 只写最后一层实现地图。稳定性不确定时留在 Case / Work Package / Close 候选。

### 7. 返回结果

```md
【AIPD Weave 完成】
已修改：
- `path/to/file.md`：...

未写入：
- ...

后续建议：
- 是否需要测试、构建、aipd-update 或 Case 归档
```

不自动提交；除非用户明确要求，不运行 git commit / push。

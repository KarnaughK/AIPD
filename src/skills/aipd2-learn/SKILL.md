---
name: aipd2-learn
description: >
  AIPD2 经验回流入口。默认只采集并输出 Codex 会话 ID / transcript path 等最小定位信息；用户明确要求时，再基于当前对话、粘贴经验、case 或补充文件生成经验回流包，并在确认后回写到项目 _adoc/ 或 AIPD2 源码。
  关键词：经验迭代、经验沉淀、即时反馈、经验回流、回流包、聊天 ID、会话 ID、Codex transcript、同步经验、规则更新、SOP、最小定位卡
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
  - case/overview.md
---

# AIPD2 Learn

基于当前上下文做经验回流，但不归档 case，不合并分支，不自动提交。

`aipd2-learn` 有两重身份：

1. **外部项目采集器**：在业务项目中使用时，默认只输出最小定位卡，帮助用户把原始会话带回 AIPD2 源项目。
2. **AIPD2 内部自迭代分析器**：在 AIPD2 源项目中使用时，优先读取用户带回的定位卡 / transcript，从原始对话里审计 AIPD skill 或规则哪里反应不好。

`aipd2-learn` 支持五种经验回流方式：

1. **会话定位卡**：在外部项目中自动采集 thread ID、transcript path、可见时的 turn ID，只输出最小定位信息。这是外部项目默认路径。
2. **自迭代诊断**：在 AIPD2 源项目中，用户贴入定位卡、会话 ID 或 transcript path 后，读取原始 transcript，优先审计用户纠正了 Agent 什么、哪些 skill 行为反复出错、哪些规则需要回写。
3. **会话回流包**：用户明确要求“生成回流包 / 总结经验 / 整理给 AIPD2 吸收”时，才输出结构化回流包。
4. **即时写回**：如果当前就在 AIPD2 源项目，且用户确认要吸收经验，先给写回方案，确认后修改 `src/core/`、`src/skills/` 或 `src/platforms/`。
5. **异步回流**：用户在项目中先写反馈文件，之后切回 AIPD2 源项目再处理。文件只是缓存方式，不是必要中转。

## 职责边界

**只做**：外部项目中采集当前会话定位信息；AIPD2 源项目中基于定位卡 / transcript 审计 AIPD 自身行为；在用户确认后，从当前对话、用户粘贴经验、Codex transcript 引用、用户补充文件、进行中的 case 或已完成 step 中提炼经验，生成诊断或回流包，判断经验归属，并在用户确认后写回。

**不做**：不执行 step，不归档 case，不移动 case 目录，不合并分支，不主动提交代码。

---

## 执行流程

### 第一步：判断运行身份

先判断当前工作目录是不是 AIPD2 源项目。

可用信号：

- 当前目录存在 `src/skills/aipd2-learn/SKILL.md`
- 当前目录存在 `src/core/overview.md`
- `_adoc/index.md` 中项目名称是 `AIPD2`

如果不在 AIPD2 源项目，进入**外部项目采集器模式**：

1. 只采集当前会话定位信息。
2. 输出 `【AIPD2 Learn 定位卡】`。
3. 不读取完整 transcript。
4. 不生成总结、诊断或回流包。
5. 不写当前项目 `_adoc/`。

如果在 AIPD2 源项目，进入**内部自迭代分析器模式**：

1. 优先识别用户是否贴入外部定位卡、会话 ID 或 transcript path。
2. 如果识别到 transcript，读取原始会话并做自迭代诊断。
3. 如果没有外部定位卡，则采集当前会话定位卡；只有用户明确要求时，才分析当前会话。
4. 内部模式也不默认写文件，先输出诊断和回写方案，等用户确认后再改源码。

### 第二步：确认经验来源

优先使用当前聊天上下文和用户刚粘贴的经验记录。如果这些内容已经足够，不要求用户先创建反馈文件。

如果运行在 Codex，先尝试采集会话定位信息：

```bash
thread_id="${CODEX_THREAD_ID:-}"

if [ -n "$thread_id" ]; then
  sqlite3 "$HOME/.codex/state_5.sqlite" \
    "select rollout_path from threads where id='$thread_id';" 2>/dev/null
fi
```

如果 SQLite 不可用或没有结果，用文件名兜底：

```bash
find "$HOME/.codex/sessions" "$HOME/.codex/archived_sessions" \
  -type f -name "*${CODEX_THREAD_ID}*.jsonl" 2>/dev/null | head -1
```

可选读取索引：

```bash
rg -n "\"id\":\"${CODEX_THREAD_ID}\"" "$HOME/.codex/session_index.jsonl" 2>/dev/null
```

采集到 transcript path 后，只把它作为“原始上下文引用”。不要默认把完整 transcript 展开到回复里。

只有在上下文仍不够时，才向用户追问最少信息：

1. 这次想沉淀的具体经验是什么？
2. 是否关联某个 `_adoc/case/{case目录}`？
3. 这条经验是项目自己的经验，还是 AIPD2 框架/skill 的经验？

如果用户提供的是一大段经验记录，先判断它是：

- **即时框架回流**：直接修改 AIPD2 源项目的 `src/core/`、`src/skills/` 或 `src/platforms/`。
- **项目经验沉淀**：写回当前项目 `_adoc/`。
- **待转交反馈**：当前不在 AIPD2 源项目，先整理为“框架回流建议”，让用户带到 AIPD2 源项目执行。

如果用户给出 case 目录，读取：

```bash
cat _adoc/case/{case目录}/case.md
find _adoc/case/{case目录}/steps -type f
```

只读取和本次经验相关的 step 或 doc，不全量扫描项目。

如果用户给出反馈文件路径，读取该文件；但不要要求用户为了反馈专门创建文件。

### 第三步：外部项目默认输出会话定位卡

默认不要总结完整聊天，也不要生成经验回流包。用户说“把这段经验给 AIPD2 learn 一下 / 记一下 / 回流一下”，但没有明确要求长摘要时，优先输出最小定位卡，让后续处理方直接按 ID 或 transcript path 读取原文。

```md
【AIPD2 Learn 定位卡】
- 会话 ID：{CODEX_THREAD_ID 或未识别}
- transcript path：{本地 JSONL 路径；没有则留空}
- 当前 turn ID：{如平台可用则填写；没有则留空}
- 项目路径：{project_root}
- 当前分支：{branch 或未识别}
- 一句话备注：{用户刚刚指出的经验点；没有就写“见 transcript 原文”}
```

默认输出限制：

- 不输出 3-8 条场景摘要。
- 不输出“观察到的问题 / 可复用判断 / 建议改动”等完整包字段。
- 不复述长聊天内容，不把 200K 上下文压缩成 1K 摘要。
- 如果已经拿到 transcript path，优先让后续 Agent 读原文，而不是相信当前 Agent 的二手总结。
- 如果用户只要 ID，只输出会话 ID 和 transcript path。

定位卡适合跨项目转交：用户把定位卡带到 AIPD2 源项目后，新的 Agent 根据 transcript path 精读相关消息，再决定是否生成回流包或写回源码。

### 第四步：AIPD2 内部自迭代诊断

内部模式读取 transcript 时，不要把它当成普通项目复盘；要把它当成 AIPD 自身的行为日志。

优先关注用户发言，也要审计 AIPD 设计的观察锚点是否被执行。不要只依赖“用户多次纠正”这种强信号；如果 case、context-map 或 AGENTS.md 已经声明了检索 SOP，就检查 Agent 的实际路径是否符合。

先读取可用的观察锚点：

- 当前 case 的 `case.md` 中是否有“自迭代观察锚点”。
- `_adoc/context-map.md` 中是否有“自迭代观察锚点”。
- `AGENTS.md` / `_adoc/index.md` 是否声明上下文检索链路。

重点找这些信号：

1. **用户反复纠正 Agent 行为**
   - 用户多次说“不是这个意思”“不要急着写代码”“先讨论”“别拆 step”“这个规则不对”。
   - 这通常说明对应 skill 的流程顺序、默认动作或停止条件有问题。

2. **用户在使用某个 skill 时仍然频繁补规则**
   - 例如使用 `aipd2-case-create` 时，用户仍然不断纠正 case 创建流程、step 创建时机、前端架构讨论顺序。
   - 这说明 `aipd2-case-create` 没有把真实协作规则固化住。

3. **用户纠正 Agent 的任务分层**
   - 例如工具文档和流程规则混淆、设计阶段和执行阶段混淆、case-create 和 case-run 边界混淆。
   - 这类问题优先回写 skill 的职责边界或场景分流规则。

4. **用户纠正 Agent 的探索 / 执行节奏**
   - 例如应该先读图、先聊业务流程、先建最小 case 壳，而 Agent 直接查接口、拆 step 或写代码。
   - 这类问题优先回写执行流程和默认停止点。

5. **用户纠正 Agent 的表达和产物形态**
   - 例如图里模块名、组件概览、QlmForm-update 的表达方式。
   - 这类问题优先回写 `src/core/` 下的方法论文档或模板。

6. **上下文检索 SOP 没有被执行**
   - 任务开始后没有读取 `_adoc/context-map.md`，也没有说明缺失和兜底策略。
   - 没有形成上下文包：层级判断、必读文档、代码入口、兜底搜索、风险边界。
   - 涉及核心概念却没有读取 L3，涉及产品功能边界却没有读取 L4，涉及跨模块工程规则却没有读取 L5。
   - 涉及页面、弹窗、组件内部细节却没有读取就近 README。
   - 这类问题优先判断是 Agent 忽略提示词、地图入口不够显眼、map 未覆盖任务，还是 skill 流程没有强制检索。

7. **检索链路过深或地图不可用**
   - Agent 读取了入口 map，但后续仍靠多层跳转猜测，没有找到关键模型或规则。
   - 入口只索引第一层，缺少高频任务的扁平路径。
   - 这类问题优先回写 `_adoc/context-map.md` 模板、L3/L4/L5 index 约定或 `aipd2` 的读取策略。

诊断输出格式：

```md
【AIPD2 自迭代诊断】

来源：
- transcript: {path}
- 外部项目：{project_root}
- 关联 skill：{推断出的 skill，如 aipd2-case-create / aipd2-case-run / aipd2-learn}

用户纠正点：
- {用户原话或短摘，说明纠正了什么}

Agent 反应问题：
- {过早执行 / 场景分流失败 / step 拆早 / 上下文加载不对 / 工具文档和流程规则混淆}

观察锚点审计：
- {应观察的锚点}
- {实际是否发生；证据来自 transcript / case / context-map}
- {偏离原因：提示词未执行 / map 缺失 / map 命中不清 / skill 流程不够硬 / 文档结构问题}

可回写判断：
- {应该改哪类规则，以及为什么}

建议修改位置：
- `src/skills/...`：{原因}
- `src/core/...`：{原因}
- `src/platforms/...`：{原因}

下一步：
- 等用户确认后再写文件。
```

输出时要克制：

- 不复述完整聊天。
- 不按时间线做流水账。
- 不把业务项目细节原样搬进 AIPD2。
- 优先抽象“用户为什么纠正 Agent”和“哪条 AIPD 规则应该变”。

### 第五步：按需生成经验回流包

只有用户明确要求“生成回流包 / 输出摘要 / 整理建议 / 直接给出可回写方案”时，才生成结构化“经验回流包”。回流包允许说明稍长，但必须便于 AIPD2 源项目里的 Agent 直接消费。

```md
# AIPD2 经验回流包

## 来源定位
- 平台：Codex / Claude Code / 未识别
- 项目路径：{project_root}
- Git remote：{origin 或未识别}
- 当前分支：{branch 或未识别}
- 会话 ID：{CODEX_THREAD_ID 或未识别}
- 当前 turn ID：{如平台可用则填写}
- transcript path：{本地 JSONL 路径；没有则留空}
- 生成时间：{本地时间}

## 场景摘要
{这次经验来自什么真实工作场景，3-8 条即可}

## 观察到的问题
- {实际发生了什么}

## 可复用判断
- {下次遇到类似情况，应该怎么判断}

## 建议回写位置
- `{path}`：{为什么改这里}

## 建议改动
- {建议新增/修改哪条规则、SOP、模板或 skill 行为}

## 原始上下文引用
- transcript：{path}
- 读取建议：只读取和本次经验相关的 user/assistant 消息，不全量搬运。

## 隐私与抽象边界
- {哪些业务细节需要抽象，哪些不能原样写回 AIPD2}
```

回流包必须具体，避免写成空泛原则。`transcript path` 是主要事实来源；摘要只是导航，不替代原文。生成回流包时也要控制长度，除非用户明确要求详细版。

### 第六步：判断回写位置

按下面规则分类：

| 经验类型 | 回写位置 |
|---|---|
| 项目方向、用户价值、业务判断 | `_adoc/L1-intent/` 或 `_adoc/L2-scenario/` |
| 产品结构、模块边界、功能规则 | `_adoc/L4-product/` |
| 研发约束、工程规范、踩坑 SOP | `_adoc/L5-dev/` |
| 当前 case 的执行经验 | 当前 case 的 `doc/` 或相关 step 的执行记录 |
| AIPD2 通用知识、结构规则 | AIPD2 仓库的 `src/core/` |
| aipd2 总入口、ADOC 入口、经验回流方式 | AIPD2 仓库的 `src/skills/aipd2*/` |
| 已初始化项目的 AIPD 架构升级、AGENTS.md / context-map 同步 | AIPD2 仓库的 `src/skills/aipd2-update/` |
| case-create/run/archive 的流程经验 | AIPD2 仓库的 `src/skills/aipd2-case-*/` |
| Codex 会话 ID、transcript、回流包生成 | AIPD2 仓库的 `src/skills/aipd2-learn/` 或 `src/platforms/codex/` |
| Claude/Codex 平台差异 | AIPD2 仓库的 `src/platforms/` |

如果当前工作目录不是 AIPD2 源码仓库，但经验属于 AIPD2 框架本身，不要硬写目标项目；先整理为“框架回流建议”，让用户切换到 AIPD2 仓库后再执行。

### 第七步：给用户确认

写入前必须展示：

```md
【经验迭代方案】
来源：当前对话 / 用户粘贴经验 / Codex transcript / 反馈文件 / case / step
类型：项目经验 / AIPD2 框架经验 / 两者都有
准备修改：
- 文件 A：修改原因
- 文件 B：修改原因

待确认的问题：
- ...
```

用户确认后才写文件。

### 第八步：执行写回

写回原则：

1. 优先更新已有文件，不为了沉淀创建零散新文件
2. 新经验追加到最接近的现有章节；没有合适章节时再新增小节
3. 只写本次确认过的经验，不顺手重构文档结构
4. 如果修改 AIPD2 源码，提醒用户运行 `./scripts/build`
5. 如果当前是 install 模式，提醒用户重新 install；如果是 dev 模式，build 后会自动生效

### 第九步：返回结果

完成后说明：

- 默认路径：输出会话 ID、transcript path 和最多一句备注
- 自迭代路径：输出诊断、建议修改位置和待确认回写方案
- 回流包路径：输出生成的回流包或提炼的经验
- 修改了哪些文件
- 是否需要后续运行 `./scripts/build` / `./scripts/install-codex`

不要自动提交，除非用户明确要求。

## Codex 当前实现边界

短期优先支持 Codex：

- `CODEX_THREAD_ID` 通常可从环境变量读取。
- transcript 通常位于 `~/.codex/sessions/**/rollout-*{thread_id}.jsonl`。
- `~/.codex/state_5.sqlite` 的 `threads.rollout_path` 可作为 thread ID 到 transcript path 的稳定映射。
- 同一台机器、同一用户下，另一个项目里的 Agent 也可以读取该 transcript；但必须显式读取本地文件，不是假设平台会自动恢复上下文。

Claude Code 暂不作为第一版强依赖；如果识别不到平台信息，就输出“平台未识别”，让用户粘贴经验或提供 transcript 位置。

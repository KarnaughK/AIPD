---
name: aipd2-learn
description: >
  AIPD2 经验回流入口。基于当前对话、用户粘贴经验、Codex 会话 ID / transcript、case 或补充文件，生成经验回流包，并在用户确认后回写到项目 _adoc/ 或 AIPD2 源码。
  关键词：经验迭代、经验沉淀、即时反馈、经验回流、回流包、聊天 ID、会话 ID、Codex transcript、同步经验、规则更新、SOP
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

`aipd2-learn` 支持三种经验回流方式：

1. **会话回流包**：在 Codex 会话中自动采集 thread ID、transcript path、可见时的 turn ID 和摘要，输出结构化回流包。这是默认路径。
2. **即时写回**：如果当前就在 AIPD2 源项目，且用户明确要吸收经验，先给写回方案，确认后修改 `src/core/`、`src/skills/` 或 `src/platforms/`。
3. **异步回流**：用户在项目中先写反馈文件，之后切回 AIPD2 源项目再处理。文件只是缓存方式，不是必要中转。

## 职责边界

**只做**：从当前对话、用户粘贴经验、Codex transcript 引用、用户补充文件、进行中的 case 或已完成 step 中提炼经验，生成回流包，判断经验归属，并在用户确认后写回。

**不做**：不执行 step，不归档 case，不移动 case 目录，不合并分支，不主动提交代码。

---

## 执行流程

### 第一步：确认经验来源

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

### 第二步：生成经验回流包

默认不要输出松散的大段总结，而是输出结构化“经验回流包”。回流包允许说明稍长，但必须便于 AIPD2 源项目里的 Agent 直接消费。

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

回流包必须具体，避免写成空泛原则。`transcript path` 是为了让后续 Agent 必要时补读上下文，不是为了替代摘要。

### 第三步：判断回写位置

按下面规则分类：

| 经验类型 | 回写位置 |
|---|---|
| 项目方向、用户价值、业务判断 | `_adoc/L1-intent/` 或 `_adoc/L2-scenario/` |
| 产品结构、模块边界、功能规则 | `_adoc/L4-product/` |
| 研发约束、工程规范、踩坑 SOP | `_adoc/L5-dev/` |
| 当前 case 的执行经验 | 当前 case 的 `doc/` 或相关 step 的执行记录 |
| AIPD2 通用知识、结构规则 | AIPD2 仓库的 `src/core/` |
| aipd2 总入口、ADOC 入口、经验回流方式 | AIPD2 仓库的 `src/skills/aipd2*/` |
| case-create/run/archive 的流程经验 | AIPD2 仓库的 `src/skills/aipd2-case-*/` |
| Codex 会话 ID、transcript、回流包生成 | AIPD2 仓库的 `src/skills/aipd2-learn/` 或 `src/platforms/codex/` |
| Claude/Codex 平台差异 | AIPD2 仓库的 `src/platforms/` |

如果当前工作目录不是 AIPD2 源码仓库，但经验属于 AIPD2 框架本身，不要硬写目标项目；先整理为“框架回流建议”，让用户切换到 AIPD2 仓库后再执行。

### 第四步：给用户确认

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

### 第五步：执行写回

写回原则：

1. 优先更新已有文件，不为了沉淀创建零散新文件
2. 新经验追加到最接近的现有章节；没有合适章节时再新增小节
3. 只写本次确认过的经验，不顺手重构文档结构
4. 如果修改 AIPD2 源码，提醒用户运行 `./scripts/build`
5. 如果当前是 install 模式，提醒用户重新 install；如果是 dev 模式，build 后会自动生效

### 第六步：返回结果

完成后说明：

- 生成的回流包或提炼的经验
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

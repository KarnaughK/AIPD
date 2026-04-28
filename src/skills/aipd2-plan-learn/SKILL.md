---
name: aipd2-plan-learn
description: >
  AIPD2 经验迭代。基于当前对话、正在执行的 plan 或用户补充，总结可复用经验，并在用户确认后回写到项目 _adoc/ 或 AIPD2 源码。
  关键词：经验迭代、经验沉淀、同步经验、plan 复盘、规则更新、SOP
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
  - plan/overview.md
---

# AIPD2 Plan Learn

基于当前上下文做经验迭代，但不归档 plan，不合并分支，不自动提交。

## 职责边界

**只做**：从当前对话、用户补充、进行中的 plan 或已完成 step 中提炼经验，判断经验归属，并在用户确认后写回。

**不做**：不执行 step，不归档 plan，不移动 plan 目录，不合并分支，不主动提交代码。

---

## 执行流程

### 第一步：确认经验来源

优先使用当前聊天上下文。如果上下文不够，向用户追问最少信息：

1. 这次想沉淀的具体经验是什么？
2. 是否关联某个 `_adoc/plan/{plan目录}`？
3. 这条经验是项目自己的经验，还是 AIPD2 框架/skill 的经验？

如果用户给出 plan 目录，读取：

```bash
cat _adoc/plan/{plan目录}/plan.md
find _adoc/plan/{plan目录}/steps -type f
```

只读取和本次经验相关的 step 或 doc，不全量扫描项目。

### 第二步：提炼候选经验

把上下文整理为三类候选，不直接写文件：

```md
## 候选经验

### 观察到的问题
- 实际发生了什么

### 可复用判断
- 下次遇到什么情况，可以怎么判断

### 建议更新
- 应该新增/修改哪条规则、SOP、模板或 skill 行为
```

候选经验必须具体，避免写成空泛原则。

### 第三步：判断回写位置

按下面规则分类：

| 经验类型 | 回写位置 |
|---|---|
| 项目方向、用户价值、业务判断 | `_adoc/L1-intent/` 或 `_adoc/L2-scenario/` |
| 产品结构、模块边界、功能规则 | `_adoc/L4-product-arch/` |
| 技术约束、工程规范、踩坑 SOP | `_adoc/L5-tech-arch/` |
| 当前 plan 的执行经验 | 当前 plan 的 `doc/` 或相关 step 的执行记录 |
| AIPD2 通用知识、结构规则 | AIPD2 仓库的 `src/core/` |
| plan-create/run/archive 的流程经验 | AIPD2 仓库的 `src/skills/aipd2-plan-*/` |
| Claude/Codex 平台差异 | AIPD2 仓库的 `src/platforms/` |

如果当前工作目录不是 AIPD2 源码仓库，但经验属于 AIPD2 框架本身，不要硬写目标项目；先整理为“框架回流建议”，让用户切换到 AIPD2 仓库后再执行。

### 第四步：给用户确认

写入前必须展示：

```md
【经验迭代方案】
来源：当前对话 / plan / step
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

- 提炼了哪些经验
- 修改了哪些文件
- 是否需要后续运行 `./scripts/build` / `./scripts/install-codex`

不要自动提交，除非用户明确要求。

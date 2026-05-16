---
name: aipd2-case-create
description: >
  创建 AIPD2 case。与用户讨论事项，按需扫描相关上下文，将上下文索引、边界和必要步骤写入 case。
  关键词：case、创建事项、上下文索引、拆解任务、step、框架搭建、不要多做
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
  - case/overview.md
  - case/templates/case.md
  - case/templates/step.md
  - L5-dev/vue-architecture-diagram-guide.md
---

# AIPD2 Case Create

## 职责边界

**只做**：与用户讨论事项 → 按需扫描上下文 → 将上下文索引、边界和必要步骤写入 case.md → 按用户意图创建最少 steps

**不做**：不执行任何 step（执行用 `/aipd2-case-run`），不写业务代码

---

## 执行流程

### 第一步：问用户要做什么

触发后不要先扫描，直接问用户要完成什么。

先判断用户这次是要：

- **完整 case 拆解**：用户明确要制定执行计划、拆步骤、准备连续开发。
- **框架 / 上下文搭建**：用户说“先看一眼”“先把上下文给我”“外围框架处理好”“先建 case”“不要多做”“后面逐个调整”等。

如果是框架 / 上下文搭建，默认只创建 case 框架和一个上下文整理 step。不要预先创建未来业务调整 step，除非用户明确要求拆出后续步骤。

底层逻辑：渐进式推进，不要企图一步到位。用户说清一个点，就推进一个点；有需要执行、恢复或验收时再固化成 step；没需要时继续聊，把可能有价值的后续事项放入候选区。

### 第二步：按需扫描相关上下文

根据用户描述，精准读取相关文件：
1. 主 Agent 读 `_adoc/index.md` 了解项目模块分布（一次，轻量）
2. 优先寻找本次事项相关的模块文档、页面 README、设计/原型资料和代码入口
3. 需要探索、验证、批量读取或整理 case 草案时，按 Agent Entry 中的分身 Agent 逻辑 fork 主 Agent 克隆体，主 Agent 只审阅结果回流

**原则**：主 Agent 不直接消费高噪声上下文。分身 Agent 是主 Agent 的克隆体，不是低上下文工人；它带着同样的上下文进入局部探索分支，看到自己是分身后就继续完成调查、比对和草案整理，然后只回流结论、依据、风险、建议和 case 草案摘要。

### 第三步：与用户确认方案

把分身 Agent 返回的关键认知和 case 草案汇总给用户，讨论执行方案，确认上下文索引、边界和步骤拆分。

如果用户已经明确说“不要多做”或只要求搭框架，不要把可能的后续工作自动拆成 step 文件；最多在 `case.md` 的“后续候选事项 / 待拆分”中用文字列出，等待用户确认后再创建 step。

### 第四步：生成 case 文件

```bash
mkdir -p _adoc/case/c{X.Y}-{名称}/steps
mkdir -p _adoc/case/c{X.Y}-{名称}/doc
```

**case.md 必须包含**：
- 目标：这个 case 要完成什么
- 上下文索引：执行时优先读哪些 `_adoc` 文档、页面 README、代码入口、设计/原型/调研资料
- 本次边界：明确做什么和不做什么
- steps 列表：只列已确认要执行的 step；框架搭建型 case 可以只有一个上下文整理 step，甚至暂时没有可执行 step
- 后续候选事项：未确认的调整点只记录为候选，不创建 step 文件
- 验收标准和经验沉淀位置

已确认的步骤文件写入 `steps/`，格式参考 `@references/case/templates/step.md`。

### Step 创建边界

创建 step 前先做意图校准：

| 用户表达 | 默认处理 |
|---|---|
| “先把上下文 / 框架处理好” | 创建 case 框架，最多创建 `cX.Y.1-context-*` |
| “千万不要多做 / 先别改业务” | 不创建未来业务调整 step |
| “后面逐个调整 / 后续再说” | 在“后续候选事项”记录，不创建 step |
| “帮我拆一下步骤 / 制定执行计划” | 可以拆多个 step，但先展示方案让用户确认 |
| 用户明确列出多个独立任务并要求建 case | 按任务拆 step |

不要因为模板里有多个 step 示例，就机械创建 `cX.Y.2`、`cX.Y.3`。每个 step 都会增加用户审核成本，未确认的 step 是噪声。

不要为了显得完整而一次性规划所有步骤。case-create 的交付重点是“当前最小可用上下文 + 已确认的下一步”，不是完整路线图。

### Step 推荐 Agent 规则

创建 step 时尽量声明 `推荐 Agent`：

- 调研、只读定位、资料整理：`explorer`
- 普通开发、修复、脚本和文档修改：`worker`
- Vue 页面、Vue 组件、HTML/CSS、组件通信、前端状态组织：`aipd_vue_architect`
- 不确定时留空，并在 step 目标和上下文文档里写清楚判断依据

推荐 Agent 是派发建议，不替代 step 的上下文文档。分身 Agent 默认继承 Main Agent 当前上下文，但仍必须读取 step 文件和 step 明确列出的上下文，用它们校准边界并保证压缩后可恢复。

### 第五步：告知下一步

如果已经有明确可执行 step，告知用户执行 `/aipd2-case-run` 开始执行。

如果只是搭好 case 框架和上下文索引，告知用户：当前 case 已可作为后续讨论入口，等用户确认具体调整点后再补 step。

# 第 7 步：编写 5 个 skill 的 SKILL.md

这是最重的一步，需要为每个 skill 编写完整的 SKILL.md。
分为 5 个子任务，建议逐个完成。

---

## 7.1 编写 `src/skills/aipd/SKILL.md`（总入口）

### frontmatter

```yaml
---
name: aipd
description: >
  AIPD 总入口。扫描项目状态，展示面板，引导用户调用具体 skill。
  关键词：AI Harness、项目认知、状态扫描
allowed-tools:
  - Read
  - Glob
  - Grep
  - Agent
  - AskUserQuestion
inject-from-core:
  - overview.md
  - adoc-structure.md
---
```

### 内容要求

1. 一句话说明：你是 AIPD 总入口，职责是扫描和分流
2. 触发后的行为：
   - 使用子 Agent 扫描项目 `_adoc/` 目录（参考 `references/scan-agent.md`）
   - 展示状态面板（格式参考现有 `references/init/main-agent.md` 第 43 行起的面板格式）
   - 根据状态推荐下一步，引导用户调用具体 skill：
     - 没有 `_adoc/` → 推荐 `/aipd-init`
     - 有 `_adoc/` 但没有 plan → 推荐 `/aipd-plan-create`
     - 有进行中的 plan → 推荐 `/aipd-plan-run`
     - plan 全部完成待归档 → 推荐 `/aipd-plan-archive`
3. 不执行任何重活，只做扫描和引导

### 内容来源

- 现有 `SKILL.md` 的"初始化"部分（第 66-75 行）
- `references/init/main-agent.md` 的面板展示逻辑

---

## 7.2 编写 `src/skills/aipd-init/SKILL.md`（初始化）

### frontmatter

```yaml
---
name: aipd-init
description: >
  AIPD 项目初始化。创建 _adoc/ 目录结构，引导用户定义项目方向（intent.md）。
  关键词：初始化、intent、_adoc
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
  - adoc-structure.md
  - L1-intent/*
---
```

### 内容要求

1. 触发后的行为：
   - 扫描项目状态（参考 `references/scan-agent.md`）
   - 如果 `_adoc/` 不存在 → 创建完整目录结构（参考 `@references/adoc-structure.md`）
   - 如果 `intent.md` 不存在 → 引导用户定义方向（参考 `@references/L1-intent/guide.md`）
   - 如果都存在 → 告知用户已初始化，推荐 `/aipd-plan-create`
2. 创建 `_adoc/` 时的目录结构要完整列出
3. 引导写 intent.md 时参考 `@references/L1-intent/intent-writing.md`

### 内容来源

- `references/init/main-agent.md` 的初始化流程
- 现有 `SKILL.md` 的 L1 部分（第 86-89 行）

---

## 7.3 编写 `src/skills/aipd-plan-create/SKILL.md`（Plan 创建）

### frontmatter

```yaml
---
name: aipd-plan-create
description: >
  创建 AIPD 迭代计划。扫描项目状态，确定版本号，拆解任务为 Step，生成文件，提交到 main 并创建开发分支。
  关键词：plan、创建计划、拆解任务、step
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
  - AskUserQuestion
inject-from-core:
  - plan/overview.md
  - plan/templates/plan.md
  - plan/templates/step.md
  - adoc-structure.md
---
```

### 内容要求

将 `references/planning/index.md` 的"阶段 1：创建 Plan"（第 66-245 行）完整搬入，包括：

1. 扫描项目全貌（1.1）
2. 确定版本号（1.2）
3. 确定 Plan 类型（1.3）
4. 定义目标和范围（1.4）
5. 明确约束（1.5）
6. 拆解任务清单（1.6）
7. 拆分 C 级迭代步骤（1.7）— 含拆分规则、粒度判断
8. 识别风险（1.8）
9. 生成计划文档（1.9）— 引用 `@references/plan-overview.md` 和 `@references/templates/`
10. 提交 Plan 到 main（1.10）
11. 创建开发分支（1.11）
12. 确认并告知下一步（1.12）

**关键改动**：
- 在 plan.md 模板中增加 `Context Snapshot` 区域，用于记录创建时读取的 L1/L4/L5 摘要
- 在 step.md 模板中增加 `Applicable Docs` 区域，列出该 step 执行时需要读取的文档路径
- 这样 plan-run 就不需要重新读 L1-L5，只消费 plan 里已有的快照

### 内容来源

- `references/planning/index.md` 第 66-245 行

---

## 7.4 编写 `src/skills/aipd-plan-run/SKILL.md`（Plan 执行）

### frontmatter

```yaml
---
name: aipd-plan-run
description: >
  执行 AIPD 迭代计划。读取 plan，按顺序派发 Step 给子 Agent，收集结果，用户验收。
  关键词：plan、执行、step、验收、子 Agent
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
  - agent-team-guide.md
  - plan/overview.md
---
```

### 内容要求

将 `references/planning/index.md` 的"阶段 2：执行 Plan"和"阶段 3：用户验收"（第 249-465 行）搬入，包括：

**执行部分**：
1. 加载上下文（2.1）— 只读 plan.md 和大索引，不读 L1-L5 详细文档
2. 检查进度（2.2）
3. 展示进度状态（2.3）
4. 派发任务给子 Agent（2.4）— 含 dev/research 两种 prompt 模板
5. 主 Agent 回到空闲状态（2.5）
6. 收到子 Agent 结果（2.6）— 含成功/失败处理

**验收部分**：
1. 启动服务（3.1）
2. 展示完成情况（3.2）
3. 等待用户反馈（3.3）— 含通过/发现问题两种处理

**关键改动**：
- 派发子 Agent 时，prompt 模板引用 `@references/worker-dev.md` 或 `@references/worker-research.md`
- 不再引用 `@references/planning/worker-*.md`（因为 worker 文件已在本 skill 的 references/ 里）

### 内容来源

- `references/planning/index.md` 第 249-465 行

---

## 7.5 编写 `src/skills/aipd-plan-archive/SKILL.md`（Plan 归档）

### frontmatter

```yaml
---
name: aipd-plan-archive
description: >
  归档 AIPD 迭代计划。通过 git diff 识别改动，更新 _adoc/ 文档，移动 Plan 到 archive/，合并分支到 main。
  关键词：plan、归档、archive、合并分支
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
  - adoc-structure.md
---
```

### 内容要求

将 `references/planning/index.md` 的"阶段 4：归档"和"阶段 5：合并分支"（第 470-553 行）搬入，包括：

**归档部分**：
1. 派发归档任务给子 Agent（4.1）— prompt 引用 `@references/worker-archive.md`
2. 等待归档完成（4.2）
3. 提交归档更改（4.3）

**合并部分**：
1. 询问用户（5.1）
2. 用户确认后合并（5.2）— 含 git 命令
3. 完成通知（5.3）

### 内容来源

- `references/planning/index.md` 第 470-553 行

---

## 验收

- `src/skills/` 下 5 个目录各有一个 `SKILL.md`
- 每个 SKILL.md 有正确的 YAML frontmatter（name, description, allowed-tools, inject-from-core）
- 每个 SKILL.md 的流程指令完整，能独立指导 AI 执行对应阶段
- `@references/` 引用路径正确（指向本 skill 的 references/ 目录）

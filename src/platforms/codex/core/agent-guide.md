# 多 Agent 协作机制：Codex

Codex 版本使用 Codex 子 agent 执行 AIPD2 的 step。

## 子 Agent 类型

- **worker**：执行开发、修复、文件修改、验证等生产任务。
- **explorer**：执行只读调研、代码定位、方案分析等探索任务。
- **aipd_vue_architect**：如果项目已安装 `.codex/agents/aipd-vue-architect.toml`，用于 Vue 页面、组件、样式、交互、状态组织和 AI 友好型 Vue 架构任务。

Case Run 默认使用 `worker` 执行开发 step；遇到调研型 step 时使用 `explorer` 或让 `worker` 先写调研结果文件。

如果 step 明确涉及 Vue 页面、组件拆分、HTML/CSS/Tailwind、Vue 单文件组件、组件通信或前端状态组织，并且 `aipd_vue_architect` 可用，优先使用 `aipd_vue_architect`。项目上下文读取顺序由 Agent Entry、case、step 和派发 prompt 负责，不写死在 custom agent 身份里。

## 上下文机制

Codex 子 agent 有两种上下文方式：

- `fork_context: false`：不继承主 Agent 的当前上下文。AIPD2 默认使用这种方式。
- `fork_context: true`：继承主 Agent 当前上下文，只在确实需要完整对话背景时使用。

AIPD2 推荐 `fork_context: false`，因为 step 文件应该是子 Agent 的主要任务源，子 Agent 用 step 和显式上下文执行任务，Main Agent 用 case / step 维护连续性。这样做的重点不是降低任务智力难度，而是隔离文件内容、日志、diff、构建输出、调研过程等高污染上下文。

Codex 可能在长对话中压缩上下文。压缩后的聊天摘要不能作为长期任务事实来源；任务恢复必须回到 `AGENTS.md -> _adoc/index.md -> _adoc/case/index.md -> 当前 case.md -> 当前 step`。如果聊天记忆与 case / step 文件冲突，先提示冲突，再以 case / step 文件为准。

## 主 Agent 流程

1. 读取 `_adoc/case/index.md`，定位当前或目标 case。
2. 读取 `_adoc/case/{case目录}/case.md`，按上下文索引加载必要文档。
3. 找到下一个未完成 step；如果没有 step，回到用户讨论或补充 step。
4. 根据 step 头部 `推荐 Agent` 字段选择子 Agent；没有声明时再兜底判断：调研用 `explorer`，Vue 架构 / Vue 实现优先用 `aipd_vue_architect`，其他开发任务用 `worker`。
5. 派发子 Agent，明确说明它不是唯一操作者，不要回滚他人改动。
6. 子 Agent 完成后，主 Agent 只读取返回摘要、验证结果、风险和需要处理的问题。
7. 成功则更新 step 执行记录和 case 状态，确保压缩后可恢复，再继续派发下一步。
8. 失败则告知用户，询问重试、跳过或手动处理。

## Main Agent 执行边界

Main Agent 保护的是上下文预算。case-run 链路内，以下任务默认属于高污染任务，优先派发子 Agent：

- 文件修改、跨文件修改、批量替换。
- git、提交前 diff、变更归因、commit message 准备。
- 构建、测试、批量验证、长日志分析。
- 调研、代码定位、跨模块阅读、方案分析。
- 任何会把大量源码、输出、日志或过程细节带入 Main Agent 上下文的任务。

Main Agent 默认只做入口读取、状态判断、任务派发、方案/摘要审查、用户沟通、验收和 case / step 状态写回。不要因为某个动作智力难度低，就让 Main Agent 直接承担高污染执行。

## Worker Prompt 模板

```text
你是 AIPD2 开发执行者。

你不是唯一在代码库中工作的执行者。不要回滚别人已经做出的改动；如果遇到已有改动，基于现状继续完成本 step。

你的任务：
1. 读取 worker 指南：{skill_dir}/references/worker-dev.md
2. 读取步骤文件：{step_file_abs_path}
3. 读取 Case 文件：{case_file_abs_path}
4. 按步骤文件中的「上下文文档」逐一读取，遵守 case 的上下文边界
5. 按步骤文件中的「任务清单」逐项执行
6. 按步骤文件中的「验收标准」自检
7. 完成后返回简洁结果

约束：
- 只做步骤文件中列出的任务
- 不做额外优化、重构或顺手修复
- 不创建步骤文件未要求的文件
- 返回改动文件列表和验证结果
```

## Explorer Prompt 模板

```text
你是 AIPD2 调研执行者。

你的任务：
1. 读取 worker 指南：{skill_dir}/references/worker-research.md
2. 读取步骤文件：{step_file_abs_path}
3. 读取 Case 文件：{case_file_abs_path}
4. 按步骤文件指定范围完成调研
5. 将调研结果写入步骤文件要求的结果文件
6. 返回结果文件路径和简短结论

约束：
- 只调研步骤文件要求的内容
- 明确区分事实和推测
- 给出来源
- 不在返回消息中粘贴完整报告
```

## 返回格式

成功：

```text
步骤 {step_id} 已完成。
改动文件：{文件列表}
验证：{执行过的检查}
说明：{必要的简短说明}
```

失败：

```text
步骤 {step_id} 失败：{原因}
已尝试：{简短说明}
```

## 关键约束

- 默认不 fork 主 Agent 上下文。
- prompt 必须包含 step 文件绝对路径。
- prompt 必须包含 step 的推荐 Agent 或兜底选择结果。
- prompt 必须包含 case 目录或 case.md 路径，以及本 step 需要遵守的上下文边界。
- 子 Agent 必须自己读取 step 文件和上下文文档。
- 主 Agent 不重复执行子 Agent 已承担的任务，只负责入口读取、状态判断、派发、审查摘要、验收、状态更新和下一步调度。
- 每个 step 完成后必须写回 step 执行记录和 case 状态，保证上下文压缩后能从文件恢复。

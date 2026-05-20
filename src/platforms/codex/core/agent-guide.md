# 多 Agent 协作机制：Codex

Codex 版本使用 Codex 子 agent 技术承载 AIPD2 的上下文分身和角色执行 Agent。

## Agent 类型

- **worker**：执行开发、修复、文件修改、验证等生产任务。
- **explorer**：执行只读调研、代码定位、方案分析等探索任务。
- **aipd_vue_architect**：如果项目已安装 `.codex/agents/aipd-vue-architect.toml`，用于 Vue 页面、组件、样式、交互、状态组织和 AI 友好型 Vue 架构任务。

Codex 子 agent 在技术上仍叫子 agent，但 AIPD2 语义中要区分两类用法：

- **上下文分身**：使用 `fork_context: true` 继承 Main Agent 当前上下文，适合普通对话中保护主线、case-create 阶段探索计划、临时修改但不想污染主线的任务。
- **角色执行 Agent**：按 `worker` / `explorer` / `aipd_vue_architect` 等角色读取 step、case 和上下文文档执行，适合 case-run 阶段的独立 step。

Case Run 默认使用角色执行 Agent。开发 step 用 `worker`，调研型 step 用 `explorer`，Vue 前端结构 / 组件 / 样式 / 状态组织 step 用 `aipd_vue_architect`。

如果 step 明确涉及 Vue 页面、组件拆分、HTML/CSS/Tailwind、Vue 单文件组件、组件通信或前端状态组织，并且 `aipd_vue_architect` 可用，优先使用 `aipd_vue_architect`。项目上下文读取顺序由 Agent Entry、case、step 和派发 prompt 负责，不写死在 custom agent 身份里。

## 上下文机制

Codex Agent 有两种上下文方式：

- `fork_context: true`：继承主 Agent 当前上下文，用于上下文分身。
- `fork_context: false`：不继承主 Agent 当前上下文，只在需要隔离敏感上下文、测试独立可恢复性，或平台能力限制时使用。

AIPD2 不再把 `fork_context: true` 作为所有 step 的默认规则。它的核心价值是从 Main Agent 当前认知状态 fork 出一个上下文分身，让分身继承用户意图、当前判断和上下文方向，承担读取、扫描、验证、diff、长日志和调研等过程成本；Main Agent 只接收压缩后的结果回流。

判断是否创建上下文分身时，重点不是任务智力难度，也不是总 token 消耗，而是探索过程是否应该留在主线里。只要过程会吞噬 Main Agent 的上下文预算、任务连续性或判断稳定性，就可以 fork 上下文分身。

case / step 文件是执行阶段的事实源。进入 case-run 后，如果 step 已经写清楚，优先让角色执行 Agent 自行读取 step、case 和上下文文档执行；只有 step 强依赖 Main Agent 当前尚未沉淀的聊天判断时，才 fork 上下文分身。

非 case 模式下也可以直接 fork 分身 Agent，只要 prompt 明确“你是分身 Agent / 克隆体”、局部目标、边界和返回格式。任务一旦变成长任务、需要验收归档或需要跨会话恢复，再补 case / step。

Codex 可能在长对话中压缩上下文。压缩后的聊天摘要不能作为长期任务事实来源；任务恢复必须回到 `AGENTS.md -> _adoc/index.md -> _adoc/case/index.md -> 当前 case.md -> 当前 step`。如果聊天记忆与 case / step 文件冲突，先提示冲突，再以 case / step 文件为准。

## 主 Agent 流程

1. 读取 `_adoc/case/index.md`，定位当前或目标 case。
2. 读取 `_adoc/case/{case目录}/case.md`，按上下文索引加载必要文档。
3. 找到下一个未完成 step；如果没有 step，回到用户讨论或补充 step。
4. 根据 step 头部 `推荐 Agent` 字段选择执行角色；没有声明时再兜底判断：调研用 `explorer`，Vue 架构 / Vue 实现优先用 `aipd_vue_architect`，其他开发任务用 `worker`。
5. 如果 step 已经写清楚，派发角色执行 Agent 读取 step / case / 上下文文档执行。
6. 如果 step 强依赖 Main Agent 当前未沉淀的聊天判断，才 fork 上下文分身，并在 prompt 中说明它是局部探索 / 执行分支。
7. Agent 完成后，主 Agent 只读取结果回流：结论、依据、风险、建议、改动文件和验证结果。
8. 成功则更新 step 执行记录和 case 状态，确保压缩后可恢复，再继续派发下一步。
9. 失败则告知用户，询问重试、跳过或手动处理。

## Main Agent 执行边界

Main Agent 保护的是主线连续性。case-run 链路内，以下任务默认交给角色执行 Agent；只有强依赖主线临时上下文时，才升级为上下文分身：

- 文件修改、跨文件修改、批量替换。
- git、提交前 diff、变更归因、commit message 准备。
- 构建、测试、批量验证、长日志分析。
- 调研、代码定位、跨模块阅读、方案分析。
- 任何会把大量源码、输出、日志或过程细节带入 Main Agent 上下文的任务。

Main Agent 默认只做入口读取、状态判断、任务派发、方案/摘要审查、用户沟通、验收和 case / step 状态写回。不要因为某个动作智力难度低，就让 Main Agent 直接承担会吞噬主线的过程。

## Worker Prompt 模板

```text
你是 AIPD2 开发执行 Agent。

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
- 只回流结论、依据、风险、建议、改动文件和验证结果，不返回完整搜索输出、长日志、长文件正文或完整 diff
```

## Explorer Prompt 模板

```text
你是 AIPD2 调研执行 Agent。

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

- case-run 默认使用角色执行 Agent 基于 step / case / 上下文文档独立执行，不默认 fork 主 Agent 全量上下文。
- 只有 step 强依赖 Main Agent 当前尚未沉淀到 case / step / doc 的聊天判断，或临时探索过程确实不适合留在主线时，才使用 `fork_context: true` 创建上下文分身。
- prompt 必须包含 step 文件绝对路径。
- prompt 必须包含 step 的推荐 Agent 或兜底选择结果。
- prompt 必须包含 case 目录或 case.md 路径，以及本 step 需要遵守的上下文边界。
- 执行 Agent 必须自己读取 step 文件和上下文文档，用它们校准任务和恢复锚点。
- 主 Agent 不重复执行执行 Agent 已承担的任务，只负责入口读取、状态判断、派发、审查摘要、验收、状态更新和下一步调度。
- 每个 step 完成后必须写回 step 执行记录和 case 状态，保证上下文压缩后能从文件恢复。

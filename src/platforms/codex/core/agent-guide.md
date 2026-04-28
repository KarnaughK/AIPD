# 多 Agent 协作机制：Codex

Codex 版本使用 Codex 子 agent 执行 AIPD2 的 step。

## 子 Agent 类型

- **worker**：执行开发、修复、文件修改、验证等生产任务。
- **explorer**：执行只读调研、代码定位、方案分析等探索任务。

Plan Run 默认使用 `worker` 执行开发 step；遇到调研型 step 时使用 `explorer` 或让 `worker` 先写调研结果文件。

## 上下文机制

Codex 子 agent 有两种上下文方式：

- `fork_context: false`：不继承主 Agent 的当前上下文。AIPD2 默认使用这种方式。
- `fork_context: true`：继承主 Agent 当前上下文，只在确实需要完整对话背景时使用。

AIPD2 推荐 `fork_context: false`，因为 step 文件应该是子 Agent 的主要任务源。主 Agent 必须把 worker 指南路径、step 文件绝对路径、必要约束都写进派发 prompt。

## 主 Agent 流程

1. 读取 `_adoc/plan/{plan目录}/plan.md`。
2. 找到下一个未完成 step。
3. 根据 step 类型选择 `worker` 或 `explorer`。
4. 派发子 Agent，明确说明它不是唯一操作者，不要回滚他人改动。
5. 子 Agent 完成后，主 Agent 读取返回摘要。
6. 成功则更新 step 和 plan 状态，继续派发下一步。
7. 失败则告知用户，询问重试、跳过或手动处理。

## Worker Prompt 模板

```text
你是 AIPD2 开发执行者。

你不是唯一在代码库中工作的执行者。不要回滚别人已经做出的改动；如果遇到已有改动，基于现状继续完成本 step。

你的任务：
1. 读取 worker 指南：{skill_dir}/references/worker-dev.md
2. 读取步骤文件：{step_file_abs_path}
3. 按步骤文件中的「上下文文档」逐一读取
4. 按步骤文件中的「任务清单」逐项执行
5. 按步骤文件中的「验收标准」自检
6. 完成后返回简洁结果

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
3. 按步骤文件指定范围完成调研
4. 将调研结果写入步骤文件要求的结果文件
5. 返回结果文件路径和简短结论

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
- 子 Agent 必须自己读取 step 文件和上下文文档。
- 主 Agent 不重复执行子 Agent 已承担的任务，只负责验收、状态更新和下一步调度。

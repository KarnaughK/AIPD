# 多 Agent 协作机制：Claude Code

Claude Code 版本使用 Agent Team 执行 AIPD2 的子 Agent 任务。

## 上下文机制

Agent Team 创建的是独立 Claude Code 实例：

- 不继承主 Agent 的对话历史。
- 不知道主 Agent 读过什么文件。
- 工作目录继承主 Agent 的 `cwd`。
- 所有任务上下文必须通过 prompt 和文件路径显式传入。

## 主 Agent 流程

1. 读取 `_adoc/plan/{plan目录}/plan.md`。
2. 找到下一个未完成 step。
3. 生成完整 prompt，包含角色、step 文件绝对路径、约束和返回格式。
4. 创建 Agent Team 子 Agent。
5. 等待子 Agent 返回简洁结果。
6. 成功则更新 step 和 plan 状态，继续派发下一步。
7. 失败则告知用户，询问重试、跳过或手动处理。

## 子 Agent Prompt 模板

```text
你是 AIPD2 开发执行者。

你的任务：
1. 读取 worker 指南：@references/worker-dev.md
2. 读取步骤文件：{step_file_abs_path}
3. 按步骤文件中的「上下文文档」逐一读取
4. 按步骤文件中的「任务清单」逐项执行
5. 按步骤文件中的「验收标准」自检
6. 完成后返回简洁结果

约束：
- 只做步骤文件中列出的任务
- 严格遵循上下文文档中的技术约束
- 不返回完整代码内容
- 不做额外优化或重构
```

## Step 文件要求

step 文件必须包含：

- 目标
- 上下文文档
- 任务清单
- 验收标准
- 不做（可选）

上下文文档建议使用绝对路径，避免子 Agent 工作目录变化导致读取失败。

## 返回格式

成功：

```text
步骤 {step_id} 已完成。
改动文件：{简短列表}
验证：{执行过的检查}
```

失败：

```text
步骤 {step_id} 失败：{原因}
```

## 关键约束

- 使用 Agent Team，不使用 Claude Code 内置 Sub Agent。
- 主 Agent 不把自己读过的上下文当作子 Agent 已知信息。
- 子 Agent 的返回必须节制，避免污染主 Agent 上下文。

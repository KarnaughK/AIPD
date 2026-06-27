# 多 Agent 协作机制：Claude Code

Claude Code 版本使用 Agent Team 承载 AIPD 的分身 Agent 任务。

## 上下文机制

Agent Team 创建的是独立 Claude Code 实例。它在技术上不能像 Codex 一样继承完整当前对话，所以只能模拟分身 Agent：

- 不继承主 Agent 的对话历史。
- 不知道主 Agent 读过什么文件。
- 工作目录继承主 Agent 的 `cwd`。
- 所有任务上下文必须通过 prompt 和文件路径显式传入。

## 主 Agent 流程

1. 读取 `_adoc/case/{case目录}/case.md`，按上下文索引加载必要文档。
2. 找到下一个未完成 work package；如果没有 work package，回到用户讨论或补充 Design。
3. 生成完整 prompt，包含角色、work package 文件绝对路径、约束和返回格式。
4. 创建 Agent Team 分身 Agent。
5. 等待分身 Agent 返回简洁结果。
6. 成功则更新 work package、`04-execute/execute.md` 和 case 状态，继续派发下一步。
7. 失败则告知用户，询问重试、跳过或手动处理。

## 分身 Agent Prompt 模板

```text
你是 AIPD 开发分身 Agent。

你的任务：
1. 读取 worker 指南：@references/case/workers/worker-dev.md
2. 读取 work package 文件：{work_package_file_abs_path}
3. 按 work package 文件中的「上下文文档」逐一读取，遵守 case 的上下文边界
4. 按 work package 文件中的「横向模块」逐项执行
5. 按 work package 文件中的「验收标准」自检
6. 完成后返回简洁结果

约束：
- 只做 work package 文件中列出的任务
- 严格遵循上下文文档中的技术约束
- 不返回完整代码内容
- 不做额外优化或重构
```

## Work Package 文件要求

work package 文件必须包含：

- 目标
- 上下文文档
- 横向模块
- 验收标准
- 不做（可选）

上下文文档建议使用绝对路径，避免分身 Agent 工作目录变化导致读取失败。

## 返回格式

成功：

```text
Work Package {work_package_id} 已完成。
改动文件：{简短列表}
验证：{执行过的检查}
```

失败：

```text
Work Package {work_package_id} 失败：{原因}
```

## 关键约束

- 使用 Agent Team 承载分身 Agent，不使用 Claude Code 内置 Sub Agent 机制。
- prompt 必须包含 work package 文件绝对路径和 case 上下文边界。
- Claude 平台分身不能默认继承主 Agent 当前对话，prompt 必须显式补齐必要上下文。
- 分身 Agent 的返回必须节制，避免污染主 Agent 上下文。

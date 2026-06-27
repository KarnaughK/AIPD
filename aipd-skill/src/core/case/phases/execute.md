# Case Phase: Execute

Execute phase 按 Design phase 产出的 work package 推进。

执行不是按微步骤堆版本，而是让 Agent 围绕目标、架构边界和验收口径完成一个或多个横向模块。

## 要回答的问题

- 当前要执行哪个 work package？
- 它依赖哪个 Design 结论？
- 它包含哪些横向模块？
- 哪些上下文必须读取？
- 哪些行为禁止做？
- 如何自检？
- 完成后如何写回 case 状态？

## 输入

- case.md。
- 当前 `04-execute/work-packages/` 下的 work package 文件。
- Design Summary 和 Design Guardrails。
- work package 列出的上下文文档。

## 执行方式

- 对简单、低噪声、主 Agent 可直接完成的文档或状态更新，可以由主 Agent 执行。
- 对代码修改、构建、测试、批量验证、跨文件 diff、调研或长日志分析，优先使用执行 Agent。
- 未获用户授权使用子 Agent 时，必须先单独询问。
- 目标模式可以作为运行时锚点，但长期状态仍写回 case.md、`04-execute/execute.md` 和 work package 文件。

## 输出

写回：

- `04-execute/execute.md`。
- work package 执行记录。
- case.md 的 Work Packages 状态。
- Execution Record。
- Verification Notes。
- Weave Candidate。

## 下一 phase 判断

- 所有必要 work package 完成：进入 Verify。
- 执行暴露设计缺口：回到 Design。
- 执行暴露信息缺口：回到 Think。
- 执行失败：记录阻塞，询问用户重试、调整设计、缩小工作包或暂停。

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
- 当前 `03-execute/work-packages/` 下的 work package 文件。
- Design Summary 和 Design Guardrails。
- work package 列出的上下文文档。

## 执行方式

- Work Package 负责目标、上下文、恢复和验收边界，不等于子 Agent 派发节点。每个 Work Package 开始时单独选择由 Main 还是 Child 执行。
- 优先 Main：任务是单一路径或内聚模块，需要持续继承设计 / 代码 / 调试判断，上下文规模可控，或派发与合并成本预计更高。
- 优先 Child 做上下文隔离：需要吞入长文档、长日志、大量页面结构、批量扫描等高噪声材料，而 Main 最终只需要压缩结论。
- 优先 Child 做并发加速：存在两条以上真正独立、可同时推进、不会产生写入冲突的工作线，且墙钟时间收益明显。
- 只有决定派发后，才根据 Work Package 的推荐 Agent 或任务类型选择执行角色；Main 直接执行时不受推荐 Agent 字段约束。
- 判定派发有净收益且平台支持时，创建 Child；平台不可用时由 Main 回退执行。用户明确要求不派 Child 时，遵循用户当前指令。
- 派发时默认传最小必要上下文，为每条证据面设唯一 owner；Main 不重复执行 Child 已承担的任务，只接收压缩结果。
- 浏览器已有稳定 SOP 且路径明确时可以派发；新流程、异常状态或路径不确定时，先与用户沟通，不允许 Agent 无边界深入或盲目绕路。
- 长执行、子 Agent 派发或批量验证前，必须先在 `03-execute/execute.md` 或 work package 文件写执行前 checkpoint：当前 work package、设计输入、执行边界、验收标准、禁止事项、恢复入口和预期返回格式。
- 执行完成、失败、阻塞、回跳或范围变化后，必须写执行后 checkpoint：完成了什么、验证结果、残留风险、受影响设计或下一步。不要只在聊天里汇报结果。

## 输出

写回：

- `03-execute/execute.md`。
- work package 执行记录。
- case.md 的 Work Packages 状态。
- Execution Record。
- Verification Notes。
- Close 归档候选。
- 最近 checkpoint：当前执行游标、下一步、是否需要回到 Design / Think / Verify。

## 下一 phase 判断

- 所有必要 work package 完成：汇报执行结果和残留风险，确认后进入 Verify。
- 执行暴露设计缺口：回到 Design。
- 执行暴露信息缺口：回到 Think。
- 执行失败：记录阻塞，询问用户重试、调整设计、缩小工作包或暂停。

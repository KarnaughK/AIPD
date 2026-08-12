# Leader Runtime Fallback

本平台没有提供可由 Leader 创建、读取、等待和继续的同级任务运行时，或当前能力无法证明这一点时：

1. 仍可完成方向澄清、Mission 和 Case brief。
2. 在创建任务前停止，说明缺少的是“同级 Case task”能力。
3. 不把普通 Child Agent 冒充成同级 Case task，也不声称已经启动 Leader 编排。
4. 给用户两个可选落点：由用户手动创建任务并粘贴 Case brief，或明确授权在当前任务中串行运行该 Case。
5. 把未分发 Case、阻塞原因和下一恢复位置写进 `_aipd/leader/`。

平台后续提供同级任务 API 时，应在 `src/platforms/{platform}/core/leader/runtime.md` 用同路径覆盖本文件。

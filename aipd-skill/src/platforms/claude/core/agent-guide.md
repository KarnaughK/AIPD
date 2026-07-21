# 多 Agent 协作机制：Claude Code

Claude Code 版本在运行时判定分身有净收益后，使用当前平台可用的 Agent Team 能力承载隔离或并发工作线。平台能力不可用时由 Main 回退执行。

## 平台差异

Claude 分身不能默认获得 Main 的完整对话历史：

- 工作目录可以继承，但已读文件和聊天判断不能假设已继承。
- 默认通过短 prompt、Case Contract、当前 phase、work package 和显式上下文文件传递任务。
- 只有当前平台明确提供额外上下文能力时才按需使用；AIPD 不硬编码瞬时平台参数。
- 平台差异不改变 phase-first、checkpoint、Goal Mode 或外部副作用边界。

## Case 恢复链

Main 和分身都以文件为事实源：

```text
AGENTS.md / CLAUDE.md
-> _adoc/index.md
-> _adoc/map.md
-> _adoc/case/index.md
-> 当前 case.md（Case Contract + Case Runtime）
-> Current Phase 对应目录
-> 当前游标文件 / Work Package
```

先读 `Current Phase`，只有 Execute 才寻找 `03-execute/work-packages/`。如果聊天记忆与文件冲突，指出冲突并以文件为准。

## Goal Mode

平台目标模式与 Case 是单向依赖：启动目标模式必须绑定 Case，推进 Case 不要求目标模式。只有平台存在明确绑定当前 Case 的活动目标时，才加载 `@references/case/goal-mode.md`；没有明确绑定时不推断。Goal Mode 只覆盖内部 Gate 的运行方式，不替代 Case Contract、phase 状态或 checkpoint。

## Main / 分身运行时判定

- 优先 Main：单一路径或内聚模块、上下文规模可控、与设计 / 代码 / 调试主线高度耦合，或派发合并成本更高。
- 优先分身做隔离：长文档、长日志、大量页面结构、批量扫描等高噪声过程，Main 最终只需要压缩结论。
- 优先分身做并发：两条以上真正独立、不会写入冲突且墙钟收益明显的工作线。
- Work Package 是目标、状态、恢复和验收边界，不是默认派发节点；推荐 Agent 只在已经决定派发后生效。
- install、远端写入、删除等外部副作用仍按原权限边界确认，不因派发扩大授权。

决定派发后，读取本文件；选定领域角色后再读取 `@references/agent-guides/{agent}.md`。为每条证据面设一个 owner，Main 不重复执行分身已承担的调查或修改。

## 主 Agent 流程

1. 读取 `_adoc/case/index.md` 定位目标 Case。
2. 读取当前 `case.md` 的 Case Contract、Current Phase、Phase State、当前游标和上下文索引。
3. 如果平台目标明确绑定当前 Case，加载 Goal Mode；否则按普通 Case 运行。
4. 进入 Current Phase 对应文档；只有 Execute 才读取 `03-execute/execute.md` 和当前 Work Package。
5. 按上下文噪声、并发收益、主线耦合和调度成本选择 Main 或分身。
6. Main 直接执行时按里程碑写回；决定派发时传最小 prompt、case.md、work package、角色 guide 和返回格式。
7. 分身返回压缩结论后，Main 写回 work package、`03-execute/execute.md` 和 `case.md`；成功、失败、回跳都必须形成 checkpoint。

## 分身 Agent Prompt 模板

```text
你是 AIPD 分身 Agent。

你的任务：
1. 读取 Case 文件：{case_file_abs_path}
2. 确认 Case Contract 与 Current Phase
3. 读取 Work Package：{work_package_file_abs_path}
4. 读取角色指引：{role_guide_reference}
5. 按 Work Package 的上下文、横向模块和验收标准执行
6. 返回简洁结果

约束：
- 只做 Work Package 边界内的任务
- 不扩大外部副作用权限
- 不回传长日志、完整文件或完整 diff
- 返回结论、依据、风险、建议、改动文件和验证结果
```

## 关键约束

- prompt 必须包含 case.md 和 work package 的绝对路径；不能只给 Work Package 而漏掉 Case Contract。
- 分身必须自行读取文件，不能假设继承 Main 已读上下文。
- phase 变化、执行结果、阻塞和回跳必须写回文件 checkpoint。
- Claude 平台差异只影响上下文传递手段，不降低 AIPD Case 的语义完整性。

# AIPD Case Goal Mode Overlay

本文件是平台目标模式绑定 AIPD Case 时加载的运行覆盖层。它不改变 Case Contract、phase 结构、artifact、Work Package 或验收标准；普通 Case 不读取本文件，继续按原有协作流程运行。

## 启用条件

只有同时满足以下条件才启用本覆盖层：

1. 平台当前存在活动目标。
2. 目标明确绑定一个 Case ID 或 `case.md` 路径。
3. 目标内容是推进、完成或关闭该 Case，而不是另一份独立业务目标。

不要根据任务长度、work package 数量、上下文压缩风险、目标文案相似度或 Agent 自己的判断推断目标模式。没有明确外部绑定时，按普通 Case 运行。

平台目标状态是权威来源。绑定时可以在 `case.md` 顶部增加一条恢复提示：

```md
> **目标模式绑定**：{平台目标；active；绑定本 Case}
```

这条提示不是新的 Case Contract 字段，也不替代平台状态。平台目标删除、完成、暂停或改绑后，应同步更新或移除提示；两者冲突时以平台状态为准。

## 覆盖边界

本覆盖层只改变“谁负责通过内部 Gate、什么时候停下来问用户”，不改变 Case 本体：

- Case Contract 仍是唯一目标契约。
- Think / Design / Execute / Verify / Close 的职责、输入、输出和 artifact 保持不变。
- Readiness Gate、验收标准、checkpoint、回跳和状态写回仍必须执行。
- Main / Child 判定、权限边界和外部副作用确认仍遵守 Agent Entry 与平台规则。

当本文件与 phase 文档里的“等待用户确认后进入下一节点 / phase”发生冲突时，仅在已绑定目标的范围内，由本覆盖层接管确认方式。

## 自主推进规则

- 用户创建“完成并关闭指定 Case”的目标，视为已经授权 Agent 在 Case Contract 边界内推进完整生命周期。
- Phase Gate 是质量门：Agent 检查进入条件、证据、open question、边界和风险；通过后先写 checkpoint，再自动进入下一 phase。
- Design 节点仍逐项完成并写回，但不因固化既定范围内的需求、规则、API、数据模型、UI、文件边界或 work package 而逐节点等待用户点击确认。
- Gate 未通过时，留在当前 phase 或按规则回跳补齐，不把“尚需继续工作”转换成用户确认请求。
- Verify 中能够依据 Case Contract、测试、报告、截图或其他证据完成的验收由 Agent 自主完成；只有验收标准明确要求用户主观判断或用户独有事实时才询问。
- Case Contract 已明确包含归档时，Verify 通过后可以自主进入 Close 并归档；提交、推送、发布、付费、外部消息等动作仍按原权限边界处理。
- Case 完成 Close 后，才能把平台目标标记为完成。

## 必须暂停询问的情况

以下情况不属于内部 Gate，需要用户决定或授权：

- 目标、要做、不做或完成标准发生实质变化。
- 出现多个会明显改变产品方向、业务规则或风险结构的方案，Case Contract 无法决定取舍。
- 缺少只有用户掌握的事实，且无法通过现有上下文或安全检索获得。
- 需要新增权限，或执行发布、付费、购买、对外发送、删除、不可逆变更等外部副作用。
- 执行结果与用户原始目标冲突，继续推进会偏离 Case Contract。

普通实现困难、phase 尚未完成、等待可选复核、内部 Gate 或用户暂未回复，都不自动构成阻塞。

## Goal blocked 语义

- 不得因为 Think -> Design、Design -> Execute、Execute -> Verify 或 Verify -> Close 的内部 Gate 等待确认而把 Goal 标记为 blocked。
- 如果 Gate 未通过但仍可调研、修正设计、继续执行或补验证，继续推进并写回 Case。
- 只有确实无法在现有授权和上下文内继续、同一阻塞条件满足平台规定的连续审计门槛时，才使用平台 blocked 状态。

## 退出条件

平台不再存在绑定本 Case 的活动目标时，停止加载本覆盖层，Case 恢复普通协作流程。不要把目标模式规则永久写进各 phase 文档或 Case Contract。

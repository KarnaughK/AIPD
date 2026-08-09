# Case Phase: Verify

Verify phase 负责验收目标是否完成，以及执行结果是否遵守 Design phase 的解耦约束。

它不只是跑测试。Verify 要同时检查三类东西：

- Case Contract 中的目标和验收标准是否完成。
- Work Package 是否完成。
- Design Guardrails 是否被破坏。
- 拓扑敏感 Work Package 的 Code Topology Contract 是否被真实结果满足。

当交付物涉及产品文档、PRD、原型、用户流程、信息架构或用户可见页面时，Verify 还要检查用户注意力是否成立。这里使用触发式审视，不给所有 Case 固定增加多轮流程。

## 要回答的问题

- case 的完成标准是否全部满足？
- 每个 work package 的验收标准是否满足？
- 是否出现纵向堆版本、巨型函数、隐式耦合、参数组装回流主干等设计回退？
- 是否有未完成风险或用户必须验收的取舍？
- 是否需要补执行工作包、回到 Design，还是可以 Close？
- 是否产生稳定认知，需要 Weave？

## 代码拓扑合同审计（条件命中）

如果 Design 或 Work Package 标记 `拓扑敏感: 是`，Verify 必须依据真实 diff、目录结构、依赖关系、测试和文档回写审计项目具体合同；不需要重新加载通用代码拓扑指南。

至少检查：

- 是否出现 Design 未批准的 shared 抽取、跨上下文引用或依赖方向变化。
- 是否穿透显式组合边界，直接操作其他上下文的内部 service、store、私有组件或中间状态。
- 是否把参数组装、状态判断或业务分支重新堆回主干。
- 纵向业务上下文是否仍可独立理解、修改和验收。
- 合同约定的 L5、局部 README 或 map 是否按稳定程度完成回写。

设计仍成立但实现偏离时回 Execute 修正；真实事实证明合同本身不成立时回 Design，并记录受影响的 Work Package。

## 产品类交付的 Reduction Scan（条件命中）

如果 Design 写有 Attention Contract，或用户已经表达“太多、太复杂、重点不清、需要简化”，进入 Close 前必须针对真实截图、原型、可运行页面或最终文档做一次低成本 Reduction Scan，不能只复读 Design artifact。

先模拟用户进入后的前十秒，回答：

- 第一眼最可能看见什么？
- 用户能否理解当前页面 / 段落只在回答哪个主问题？
- 下一步动作是否自然可见？
- 非当前信息是否通过删除、降级或渐进披露退出竞争？

命中以下任一触发器，Verify 不能通过，应记录证据并回到 Design：

- 同一视口或阅读段存在两个以上同等醒目的主重点。
- 无法用一句话说清第一眼和下一步。
- 内容存在的主要理由是“显得完整”，而不是支持当前用户问题。
- 低相关或低决策价值信息压过关键内容。
- 产物主要在解释内部分类、证据系统或实现模型，而不是回答用户问题。
- 用户的简化偏好只修正了当前页面，没有传播到已声明的页面族 / 用户路径。
- 上一轮所谓迭代只有新增字段、卡片、解释或状态，没有任何删除、合并、延后、隐藏或重排。

回跳记录必须包含触发器、真实证据、回到的 Design artifact、传播范围和受影响下游。Design 修正必须产生 `Reduction Delta`，至少说明 `delete / merge / defer or disclose / reorder / outcome`；只有加法的轮次不算有效减法迭代。

不规定回跳轮数。一次完整扫描未再命中触发器、注意力路径清楚、简化偏好已经传播，而且下一轮没有新证据或新观察视角时，即视为自适应收敛。Token 消耗、运行时间和预设轮数都不是停止依据。

## 输入

- case.md。
- Work Packages。
- 执行记录。
- Design 中的 Code Topology Contract 与 Work Package 代码拓扑护栏（如命中）。
- 测试、构建、截图、报告或人工验收材料。

## 输出

写入 `04-verify/verify.md`，并把摘要同步到 case.md：

- Verify Result。
- 通过 / 未通过项。
- 残留风险。
- 用户验收状态。
- Close 归档候选。

## 下一 phase 判断

- 用户验收通过：进入 Close。
- 目标未达成但设计仍成立：回到 Execute，新增或调整 work package。
- 设计不成立：回到 Design。
- 方向不成立：进入 Close，并标记 stopped / failed。

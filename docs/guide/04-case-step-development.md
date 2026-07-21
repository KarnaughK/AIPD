# 04 用第一个 Case 完成真实目标

知识库解决“Agent 应该读什么”。Case 解决另一个问题：一个会持续多轮、经历调研和修改的目标，怎样不被聊天上下文冲散。

## 从一个目标开始，不从模板开始

你可以直接说：

```text
创建一个 case：把订单退款增加“已发货不可自助退款”的规则。
先确认产品边界和现有实现，再完成修改、验证和归档。
```

`/aipd-case` 会先建立 Case Contract：

- 目标是什么，为什么现在做。
- 本次要做和不做什么。
- 完成时用什么证据判断。
- 应读取哪些 L3 / L4 / L5、局部 README 和代码入口。

Case 是一个马上要完成并最终关闭的短周期目标容器，不是长期路线图，也不是把所有待办装进一个目录。

## 生命周期不是瀑布

```text
Case Contract -> Think -> Design -> Execute -> Verify -> Close
```

这是默认导航，不是只许向前的流水线。

### Think：先解决未知

如果“已发货”的事实源、历史兼容或竞品做法不清楚，Think 可以建立调研分支，写明：

- 当前问题和触发来源。
- 查什么、不查什么、何时停止。
- 证据与结论。
- 结论返回 Contract、Design、Execute 还是 Verify。

Think 是 Case 内的探索工作台。它不是一个漂浮在 Case 之前的长期对象；Design、Execute、Verify 发现未知时也可以回跳 Think。

### Design：先固定规则，再切执行边界

Design 不只画目录。它先区分：

- `confirmed`：用户已明确或项目事实已证明。
- `assumed`：为了推进暂定，但不能偷偷写成长期事实。
- `open`：不解决会改变产品规则、接口或执行边界。

然后扫描现有系统，确定改动 delta，必要时设计数据、API、用户状态和文件边界。最后才找复杂度爆点、做最小必要解耦，并规划 Work Package。

### Execute：Work Package 是目标包

Work Package 不是“第一步改接口、第二步改页面”的微步骤清单。它是一个可执行、可恢复、可验收的目标包，必须写清：

- Design 依据和不能破坏的边界。
- 文件 / 文件夹范围。
- 不允许固化的假设。
- 验收标准和不做范围。
- 执行前后 checkpoint。

一个 Work Package 可以包含多个横向模块；运行时再决定由 Main 连续完成，还是交给 Child Agent。

### Verify：检查目标，不只检查改动

“代码已经提交”不是验收证据。Verify 回到 Case Contract 和 Design 护栏检查：

- 目标用户行为是否成立。
- 异常、权限和历史路径是否覆盖。
- 自动测试、构建、截图或人工检查是否支持结论。
- 是否有 assumed 被误写成事实。

发现缺口可以回到 Contract、Think 或 Design，不需要为了保持 phase 顺序而假装通过。

### Close：让一次事项真正结束

Close 收束完成结果、未解决风险、执行证据和知识回写候选。Case 归档不等于把它删掉，而是从“当前运行状态”移到“可追溯历史”。

## 为什么文件 checkpoint 很重要

聊天中说过“现有接口不改”“先不处理管理员豁免”并不够。只要它会影响后续方向，就应该写入 Case Contract、Design 或当前 Work Package。

一个合格 checkpoint 很短：

```text
当前位置：Design / requirements
已确认：已发货订单不能自助退款
open：管理员是否允许人工退款
停止点：不把管理员规则写入接口
下一步：查现有后台权限后返回 requirements
恢复入口：02-design/requirements-contract.md
```

它不是逐句会议纪要，而是给压缩后的 Agent 一枚“你现在在哪里”的书签。

## Goal Mode 和 Case 的关系

平台目标模式可以绑定一个明确 Case。绑定后，Agent 在 Contract 边界内自行检查 Think、Design、Execute、Verify、Close 的内部 Gate，通过后写 checkpoint 并继续。

Goal Mode 只改变“内部 Gate 由谁确认”，不改变 Case 内容，也不扩大权限。安装、发布、付费、删除、对外发送等副作用仍需要各自的授权。

## Main / Child 是运行时选择

子 Agent 不是 Work Package 的默认执行者。AIPD 只在三种收益明确时倾向派发：

- 长文档、长日志、大量页面等高噪声上下文需要隔离。
- 两条以上真正独立、无写入冲突的工作线可以并发。
- 高风险结论需要独立复核，且复核者不必继承整条主线。

内聚、高耦合、需要连续设计与调试判断的任务，Main 直接完成往往更稳。派发后每条证据面只有一个 owner，Main 不重复调查。

更完整的字段与边界见 [Case 与 Work Package](../modules/case-and-step.md)、[Think](../modules/think.md)和 [Main / Child Agent](../modules/clone-agents.md)。

下一章处理最后一段：工作完成后，怎样让项目真正学会。

[下一章：让项目从完成的工作里学习 →](05-ai-native-code-architecture-experiment.md)

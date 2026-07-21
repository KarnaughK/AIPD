# 06 第一次完整使用 AIPD

这是一张可直接照做的操作卡。目标不是体验所有 Skill，而是在一个真实项目里完成第一轮：读到正确认知、完成一个 Case、把稳定经验留下来。

## 开始前

你需要：

- 一个会继续迭代的代码项目。
- Codex、Claude Code 或其他能读写仓库并支持 Skill 的 Coding Agent。
- 一个范围可控、完成后能验证的真实目标。

第一次不要选“重构整个系统”。更合适的是：增加一条业务规则、完成一个小功能、修复一个跨文件问题，或更新一组有明确读者的文档。

## 1. 安装 AIPD

用 Agent 打开 AIPD 仓库并说：

```text
请先读取 AGENTS.md、_adoc/index.md 和 _adoc/map.md，
确认当前平台和安装边界，然后构建 AIPD。
构建完成后先告诉我将安装到哪里，等我确认再安装。
```

为什么要停在安装确认：build 只产生仓库内构建产物；install 会改写用户级或项目级 Agent 环境。

## 2. 初始化目标项目

在目标项目调用：

```text
/aipd
```

让 Agent 扫描项目并建立最小入口。初始化后检查：

```text
AGENTS.md
_adoc/index.md
_adoc/map.md
```

它们不需要立刻完整，但必须能够回答：Agent 先读哪里、当前项目的核心认知在哪里、常见任务下一跳去哪里。

## 3. 用一个真实问题测试 Map-first

先做一次只读检查：

```text
请按项目的 AIPD 入口，告诉我“<你的业务词>”相关的
核心模型、产品规则、工程规则和代码入口分别在哪里。
缺失的入口请指出，但先不要改文件。
```

如果 Agent 只能全仓搜索，说明 map 还没有最小价值。补高频入口，不要为了完整性扩写所有层级。

## 4. 创建并绑定第一个 Case

用结果而不是步骤描述目标：

```text
创建一个新的 case：<要完成的结果>。
边界是 <明确不做什么>，完成标准是 <如何验证>。
先读取项目认知和现有实现，需要调研或设计时按 case phase 推进，
完成后 Verify、Close，并整理 Weave 候选。
```

如果平台支持目标模式，并且你希望 Agent 在既定边界内持续推进，可以明确要求把平台目标绑定到这个 Case。Case 应先创建，再绑定目标。

检查 `case.md` 顶部的 Case Contract：

- 目标是否是一个短周期结果。
- 要做 / 不做是否足以阻止顺手扩张。
- 完成标准是否能用证据判断。
- 上下文索引是否命中 L3 / L4 / L5 / README / 代码，而不是全量扫描。

## 5. 让 Case 自己承接长任务

推进过程中，观察文件而不只看聊天：

```text
case.md
01-think/       # 调研、实验、比较和决策
02-design/      # 需求、brownfield、架构边界和 readiness
03-execute/     # 总执行状态与 work-packages/
04-verify/      # 验收标准与证据
05-close/       # 结果、风险与归档候选
```

如果任务中断，新的 Agent 应能从 `case.md` 的当前 phase、当前游标和 checkpoint 恢复，而不是让你重新讲完整历史。

## 6. 用 Verify 证明完成

验收至少覆盖三层：

- **目标结果**：用户可见行为或产物真的存在。
- **设计护栏**：没有把 assumed 当事实，也没有破坏不做范围。
- **工程证据**：测试、构建、链接检查、截图、日志或人工检查支持结论。

有缺口就回到对应 phase。Verify 的价值不是盖章，而是在关闭前最后一次对齐目标。

## 7. Close，然后 Weave

Case Close 后，检查哪些信息值得被下一次继承：

```text
新核心关系         -> L3
新产品边界         -> L4
新跨模块工程规则   -> L5
新页面 / 组件入口  -> 就近 README
新高频路径         -> map
一次性过程         -> 留在 Case
```

然后调用：

```text
/aipd-weave
```

要求 Agent 先判断知识 owner 和旧认知冲突，再回写；不要把整份 Case 摘要复制进长期知识库。

## 第一轮完成的判断

如果下面五项成立，你已经完成一次有效的 AIPD 闭环：

- [ ] Agent 能从 map 命中一个真实业务问题的正确上下文。
- [ ] Case Contract 清楚记录目标、边界、验收和上下文。
- [ ] 中断后能从 phase / checkpoint / Work Package 恢复。
- [ ] Verify 有目标层与工程层证据。
- [ ] 至少一条稳定新事实被正确 Weave，或明确判断无需回写。

下一次不必重新初始化。继续从真实任务出发，让 map 和项目认知在使用中增长。

## 接下来按问题深入

- 读不懂 L1-L6 的边界：[ADOC 分层](../modules/adoc-layers.md)
- map 总是太长或命不中：[Map 与检索](../modules/maps-and-retrieval.md)
- Case 需要回跳或拆目标包：[Case 与 Work Package](../modules/case-and-step.md)
- 不知道是否该派子 Agent：[Main / Child Agent](../modules/clone-agents.md)
- 不知道新经验该写哪里：[Weave](../modules/weave.md)
- 开始出现跨文件牵连问题：[上下文解耦](../modules/context-decoupling.md)

[返回学习文档索引](../README.md)

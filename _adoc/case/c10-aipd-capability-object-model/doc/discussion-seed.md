# Discussion Seed: AIPD 原子能力层与统一对象模型

## 来源

- 当前对话，用户在完成 `c9-aipd-think-system-design` 后继续讨论 Think 的运行方式和底层复用问题。

## 核心原始认知

用户意识到：Think 可能不是一个动作，而是一个阶段。

Think 中包含多个原子能力，例如：

- 从 AIPD 的 L1-L5 中找出当前讨论相关上下文，并按关联强弱排序。
- 启动单独 Agent 做上下文扫描，返回相关文档、case、README、代码入口和依据。
- 深度检索公开资料、GitHub、博客、论文。
- 加载领域知识或领域框架。
- 做方案比较。
- 做决策检查。
- 生成 handoff。

如果这些能力都写进 `aipd-think`，它会变成一个大而全的 skill，并且 `case-create`、`case-run`、`weave` 等流程也会重复实现类似能力。

## 原子能力复用判断

很多能力不属于某一个上层 workflow：

- `context.scan`：Think / Case Create / Weave / 普通开发都需要。
- `research.deep`：Think / L2 research / 技术选型 / 外部框架吸收都需要。
- `options.compare`：Think / Case Create / 架构设计都需要。
- `decision.check`：Think / Case Create 前置检查都需要。
- `handoff.generate`：Think -> Case Create / case 间交接都需要。
- `weave.extract`：Think / Case Run / Case Archive / 普通开发结束都需要。

因此应考虑原子能力层，而不是让每个 skill 自己实现整段流程。

## 外部项目的正确抽象

用户进一步指出：很多开源项目看似是原子能力，但其实每个都是闭环系统。如果直接拼在一起，会出现大量接口断裂。

典型问题：

- 每个项目都有自己的状态。
- 每个项目都有自己的文档结构。
- 每个项目都有自己的命名和流程入口。
- 每个项目都倾向形成闭环，不一定兼容其他系统。

所以 AIPD 不应直接拼接外部项目，而应借助统一底层数据结构来统一思路。

## 需要统一的中间对象

讨论中初步提出的中间对象包括：

- Context Pack：上下文扫描结果。
- Research Pack：调研证据包。
- Decision Record：决策记录。
- Spec Pack：规格 / 需求 / 验收包。
- Task Plan：任务计划。
- Execution Result：执行结果。
- Verification Report：验证报告。
- Close 归档候选：反向编织候选。
- Handoff：阶段间交接。

这些对象让原子能力之间可以互相消费输出，而不是变成互相不兼容的小系统。

## 外部项目映射方式

外部项目应被拆成能力范式：

- OpenSpec / Spec Kit / Kiro：spec / requirements / plan / tasks / verify。
- BMAD：brainstorm / PRFAQ / product brief / analysis。
- Cline：Plan / Act、deep planning、subagent research。
- Open SWE / OpenHands：execution runtime / sandbox / middleware / validation。
- 搜索 / RAG / repo map 工具：context scan / retrieval / evidence pack。

AIPD 应学习和抽取这些范式，翻译成自己的中间对象和能力接口，而不是把多个项目整体拼在一起。

## 当前判断

这已经不是 `aipd-think` 的局部实现问题，而是 AIPD 的底层架构问题。

更准确的方向是：

```text
AIPD Capability Object Model
-> Atomic Capabilities Layer
-> Think / Case Create / Case Run / Weave / SOP 组合调用
```

## 待继续讨论

- 哪些能力应该定义为原子能力？
- 每个原子能力的输入输出是什么？
- 哪些输出对象应落文件，哪些只是运行时结果？
- 哪些能力需要分身 Agent？
- 哪些能力可以用便宜 / 大上下文 / 擅长搜索的模型？
- 哪些能力只是 prompt pattern，哪些需要模板，哪些需要外部 adapter？
- 是否需要能力注册表？
- 如何避免原子能力层变成新的过度抽象？

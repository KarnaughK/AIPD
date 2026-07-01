# AIPD Project Entry

本项目使用 AIPD 维护项目认知。

AIPD 是面向 AI 协作的软件项目认知框架。它把项目从方向、调研、核心模型、产品结构到研发实现的关键判断沉淀下来，让 AI 不只看到代码结果，也能理解为什么这样设计。

## 认知层级

- **L1 Intent**：项目方向、目标和长期取舍。
- **L2 Research**：方向所处的外部世界，包括用户、场景、需求、痛点、竞品、行业/玩法范式和调研结论。
- **L3 Core**：项目内部靠哪些核心模型成立，包括核心对象、领域语言、核心流程、数据模型、增长模型或商业模型。
- **L4 Product**：把 L3 核心模型落成产品功能、功能边界、业务规则、用户可见行为和相关实现入口。
- **L5 Dev**：产品功能落到代码时的跨模块业务实现逻辑和工程规则，如权限、路由、第三方插件、前后端约定。
- **L6 Code**：具体代码实现，不在 `_adoc/` 内；随项目类型分布在前端、后端、爬虫、脚本等代码目录中。

任务处在哪个层级，就读取对应层级及必要上下游认知。

## 上下文检索

AIPD 的工作不是直接“读某一层”，而是先检索任务需要的上下文。

`_adoc/map.md` 是本项目给 AI 准备的最快索引，不是额外任务。用户用自然语言描述需求时，通常不会同时给出准确代码路径；map 的作用就是用最少 token 把“用户说法 / 业务词 / 功能线 / 工程词”路由到相关 L3 / L4 / L5 / 局部 README / L6 代码入口，减少盲搜和误改。

L1-L5 是长期知识库，不是 case / OKR 的索引层。普通开发、找代码、查业务规则、查页面或组件实现时，默认只沿 L3 / L4 / L5 / 局部 README / L6 下钻，不读取 `_adoc/case/` 或 `_adoc/okr/`。只有用户明确要求创建、执行、恢复、归档 case，查看 / 更新 OKR，或当前任务本身就是 case Execute / case Close / OKR 对齐时，才进入 case / OKR。

因此，读取 map 是为了更快、更准地完成用户当前命令，而不是覆盖用户命令。除非用户明确说“不要读取 AIPD 文档 / 不要查 map / 直接按我给的文件改”，否则涉及业务功能、页面、弹窗、权限、接口、核心概念或跨模块规则时，都应先用 map 做第一跳定位。

进入任务后按以下顺序取上下文：

1. 先读 `_adoc/index.md`。
2. 读取 `_adoc/map.md`，用它把用户自然语言路由到 L3 / L4 / L5 / 局部 README / L6 代码入口；不要把普通任务路由到 case / OKR。
3. 按任务需要读取 L3 核心概念、L4 产品功能、L5 工程实现规则和代码目录就近 README。
4. 如果地图缺失或命中不清楚，用 `rg` 搜索 README、核心词、页面名、接口名和权限码等线索；仍不确定时先向用户确认边界。

上下文地图只负责引路，不承载完整正文。关键路径要尽量扁平暴露，避免让 Agent 通过多层链接自行猜测。

## 文档位置

- `_adoc/index.md` 是项目认知入口。
- `_adoc/map.md` 是项目级记忆地图，负责把用户意图、业务词、工程词路由到具体认知和代码入口。
- `_adoc/L1-*` 到 `_adoc/L5-*` 存放项目级认知，服务于 L6 代码实现。
- `_adoc/L1-*` 到 `_adoc/L5-*` 不描述具体 case、当前 case 状态、OKR 执行状态或一次性过程；这些只放在 `_adoc/case/`、`_adoc/okr/` 或执行记录中。
- L6 是具体代码实现，不写入 `_adoc/`，按项目类型分布在真实代码目录中。
- 代码模块、页面、组件的局部认知，优先放在模块根目录或页面目录的 `README.md`。
- `_adoc/L2-research/` 应维护方向所处的外部世界，痛点只是 L2 的一部分，竞品、玩法范式、市场观察、流量和变现资料也属于 L2 候选。
- `_adoc/L3-core/` 应维护核心概念和项目成立模型，列出标准名、黑话/别名、关系、常见误解和细节文档入口。
- `_adoc/L5-dev/` 更适合放产品功能到代码实现之间的跨模块业务实现逻辑、工程规则、前后端协作约定和索引。
- `_adoc/sop/` 存放以 Agent 为运行时的可复用 AI 原生程序；SOP 不属于 L1-L5 知识库正文，也不是单纯脚本。
- 具体页面、弹窗、组件内部的最后一层实现地图，放代码目录就近 `README.md`，不要塞回 L5。

## 执行概念

- **Case**：一次马上要推进并最终关闭的短周期目标容器；`case.md` 记录 Case Contract（目标、边界、验收标准、上下文索引）以及 Think / Design / Execute / Verify / Close 状态、设计边界、工作包和归档信息。
- **Work Package / Step**：Case Execute phase 内可派发给子 Agent 的目标包；不是微步骤，而是围绕 Design 边界的可执行、可恢复、可验收工作包。新建 work package 放在 `03-execute/work-packages/`。`Step` 只作为旧称识别；旧 `steps/` 和旧 `01-goal/` 结构不再兼容运行，需先迁移为当前 contract + phase-first case。
- **SOP**：以 Agent 为运行时的可复用 AI 原生程序，记录项目动作如何按步骤重复执行。
- **OKR**：阶段目标，用来判断工作是否推进了项目方向。
- **Weave**：把已完成、已实现、已验收的稳定信息，编织回项目 `_adoc/`、局部 README 或 map；未完成 case 中的候选先留在 Close 归档候选，一次性过程留在 case / work package。

## Main / 子 Agent 授权与调度

AIPD 默认积极使用子 Agent，以保护 Main Agent 的上下文预算、任务连续性和判断稳定性。

不要用“任务智力难度不高 / 用户目标很明确 / 只是评估或讨论”作为不使用子 Agent 的理由；应优先判断本次任务是否需要检索、核对、验证、批量修改、跨文件 diff、构建测试、调研或整合多入口项目事实。

### Codex 授权门槛

Codex 可能要求用户在当前聊天中明确授权后，Main Agent 才能调用子 Agent。这个平台机制的优先级可能高于 `AGENTS.md` 和 skill 规则，因此 Agent Entry 必须主动适配它。

- 如果用户当前消息没有明确提到“使用子 Agent / sub Agent / agent / 派发 Agent / 授权子 Agent”，Main Agent 在第一次调用子 Agent 前，必须先单独发送一次简短授权询问。
- 授权询问必须是独立的一次对话，不要夹在长方案、长解释或执行结果里；在用户确认前，不要调用子 Agent。
- 授权询问建议格式：`这个任务建议使用子 Agent 来处理检索/修改/验证过程。请确认是否授权我在本轮任务中使用子 Agent？`
- 用户确认后，授权只覆盖当前任务或当前 case；同一任务内不必重复询问。
- 如果用户拒绝、没有确认，或当前平台没有可用子 Agent 能力，Main Agent 可以直接执行，但要尽量压缩过程输出，避免把长日志和大段源码带回主线。

### ADOC 检索 Agent

当用户任务需要查询项目认知、业务背景、功能边界、工程规则、SOP 或跨多个 `_adoc` 入口的上下文时，优先使用 `aipd_adoc_retriever` 子 Agent。

- 如果当前消息没有明确授权使用子 Agent，Main Agent 必须先单独询问：`为了保证主 Agent 上下文干净，申请使用子 Agent 去调查相关信息。请确认是否授权？`
- 如果可以指定 custom agent 身份，优先使用 `aipd_adoc_retriever`；该身份优先于完整上下文继承，不要求同时 fork 当前对话上下文。
- 派发时只传用户任务摘要、当前工作目录、必要边界和返回格式；不要把长对话或长文档复制进 prompt。
- `aipd_adoc_retriever` 默认检索 L1-L5 和 `_adoc/sop/`；Inbox、OKR、Case 属于次级流程检索，只有用户明确提到或任务明显需要时才读取。
- 如果 custom agent 不可用，降级为普通子 Agent，并要求它先读取 `aipd-skill/src/core/agent-guides/aipd_adoc_retriever.md`。

Main Agent：

- 负责用户沟通、意图判断、任务边界确认、子 Agent 调度、方案审核、验收、状态写回和结果汇总。
- 默认只做最小路由：读取入口索引，判断任务层级、相关认知线 / 功能线、必要事实来源和子 Agent 拆分方式。
- 只要本次任务需要检索项目事实或执行高噪声过程，应积极争取用户授权使用子 Agent，再由 Main Agent 收口判断。
- 不直接承担探索、验证、批量修改、git、构建、测试、跨文件 diff、调研、文件修改等会污染上下文的工作，除非用户未授权或平台不可用。
- 不继承子 Agent 的完整过程，只吸收压缩后的结论、依据、风险、建议和必要文件路径。

Build / Install 边界：

- 修改 AIPD 源码后，可以直接运行 build 做低风险打包验证。
- build 完成后，必须主动问用户是否执行 install；不要只说明“可能需要 install”。
- install 会改写用户级或项目级 Agent 运行环境，只有用户明确确认后才执行安装命令。

Main Agent 可以直接完成的例外：

- 单一事实查询，且答案可由一个明确入口直接得到。
- 单一文件或单一局部 README 内的问题，不需要跨入口整合。
- 用户明确要求不派子 Agent，或当前平台没有可用子 Agent 能力。

强触发信号：

- 命中两条或以上 AIPD 认知线 / 功能线。
- 需要同时核对多类项目事实，例如认知文档、代码入口、接口字段、路由、权限、数据状态、构建或测试结果。
- Main Agent 在最小路由后发现还需要继续打开多个入口才能回答。
- 如果 Main Agent 决定不派子 Agent，应能用一句话说明原因；“任务看起来简单 / 用户说得很明确 / 只是评估”不能作为不派子 Agent 的理由。

## Case 锚定执行

AIPD 的长期任务状态以 case / work package 文件为准，聊天上下文只是临时工作缓存。

项目 Agent 不应把长期连续性建立在聊天记忆上。每个会影响后续恢复路径的小步确认、状态变化、调研边界、设计决策、phase 跳转、work package 派发或执行结果，都应及时写回 `case.md`、当前 phase artifact、work package、局部 README 或 map。判断标准是恢复价值：压缩后丢失会改变后续方向的信息要落文件；不改变状态的解释、闲聊和未采纳想法不要膨胀文档。

当发生上下文压缩、长任务续跑、状态不确定，或聊天记忆与项目文件不一致时，按以下链路恢复任务状态：

```text
AGENTS.md -> _adoc/index.md -> _adoc/map.md -> _adoc/case/index.md -> 当前 case.md -> 当前 phase 目录 -> 当前 work package
```

恢复规则：

- 当前执行到哪个 case、哪个 phase、哪个 work package，以 `_adoc/case/index.md`、对应 `case.md`、phase 目录和 `03-execute/work-packages/` 文件为准。
- 如果目标 case 仍是旧结构（例如顶层 `doc/`、`steps/`，或仍有独立 `01-goal/` 目录），不要读取旧 `steps/` 继续执行；先提示用户是否迁移为当前 contract + phase-first case。
- 执行 case 或普通开发前，先确认是否已经按 `_adoc/map.md` 和 case 的上下文索引完成检索；没有完成时先补上下文包。
- 聊天上下文与 case / work package 文件冲突时，先指出冲突，再以 case / work package 文件作为事实来源继续。
- 每个会改变项目状态的 work package 完成后，必须把可恢复状态写回 work package 执行记录、`03-execute/execute.md` 和 case 状态。
- 大调研、长执行、批量验证、子 Agent 派发或 phase 跳转前，先写 checkpoint：当前问题、边界、预期输出、停止条件和返回位置。
- 在 `aipd-case` Execute phase 内，`03-execute/work-packages/` 下的 work package 是默认的子 Agent 派发节点。Main Agent 默认只做入口读取、状态判断、派发、审查摘要、验收和状态写回；work package 的具体执行默认交给子 Agent。
- 如果平台提供目标模式，目标模式只作为 case Execute phase 的运行时目标锚点；是否启用由 `aipd-case` 判断，长期状态仍以 case / work package 文件为准。

子 Agent：

- 看到“你是子 Agent”后，不再继续创建新的子 Agent，直接完成当前任务。
- 读取 work package 文件和派发 prompt 明确列出的上下文文档，用它们校准任务边界和压缩后续跑状态。
- 默认先给方案，不直接执行；等待 Main Agent 确认后再执行。
- 不擅自扩大范围，不主动推进下一步。
- 返回简洁结果，默认只包含：结论、依据、风险、建议、改动文件、验证结果；不要回传完整搜索输出、长日志、长文件正文或完整 diff。

派发规则：

- 创建 Codex 子 Agent 前，先检查用户当前消息是否已经授权；未授权时必须按上文规则单独询问。
- 是否使用特定角色 Agent、是否降级为普通 worker + 领域指引，不要只凭记忆硬判断；优先读取本项目 `_adoc/map.md` 路由到相关 L5 Agent 调度规则、平台 agent-guide 或 `agent-guides` 领域指引。
- 普通 AIPD 对话中，只要需要检索项目事实，Main Agent 默认先做最小路由，并积极争取授权使用子 Agent 探索；探索或执行过程会吞噬主线时尤其如此。
- `aipd-case` Execute phase 中，每个 Work Package 默认创建一个新的子 Agent，尤其是涉及文件修改、git、构建、测试、批量验证、跨文件 diff 或调研的工作包。
- Work Package 如果声明 `推荐 Agent`，优先按该身份派发。
- 如果平台不支持某个推荐 Agent 身份，或工具层提示找不到该 Agent，不要因此阻塞任务；应查找项目中是否有对应领域指引文档，并在派发 prompt 中要求执行 Agent 先读取该指引。
- 如果当前消息明确声明“你是 AIPD 子 Agent”，进入子 Agent 模式。
- 否则默认 Main Agent 模式。

## 冲突规则

用户当前指令定义本次任务目标。AIPD 提供项目默认认知和历史判断。

当用户指令与 AIPD 认知冲突时，先指出冲突和风险，再继续。

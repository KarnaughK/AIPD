# 多 Agent 协作机制：Codex

Codex 版本使用 Codex 子 agent 技术承载 AIPD 的执行、调研和角色 Agent。

## 指引与平台格式

AIPD 的 Vue 领域规则优先存放在平台无关的核心指引中：

- `aipd-skill/src/core/agent-guides/aipd_vue_architect.md`
- `aipd-skill/src/core/agent-guides/aipd_vue_provider.md`

Codex 的 `.toml` agent 文件只是平台打包格式。`aipd-skill/src/platforms/codex/agents/*.toml` 负责声明 Codex 侧名称、描述和指引源文件；`aipd-skill/scripts/build codex` 再把核心指引注入为 Codex 需要的 `developer_instructions`。

如果 Codex 当前版本不支持 custom agent、custom agent 注册失败，或工具层提示 `unknown agent_type`，不要阻塞 AIPD 执行。把对应 Agent 降级为领域指引：使用 `worker` 执行，并在 prompt 中要求它先读取 `@references/agent-guides/{agent}.md`。

如果 custom agent 已成功创建，也不要完全信任平台身份一定加载正确。派发 prompt 仍应带上对应执行指引路径，并要求子 Agent 做角色自检：身份已生效时用指引校准执行方式；身份未生效或不确定时，把指引作为本次任务的角色来源。

## Agent 类型

- **worker**：执行开发、修复、文件修改、验证等生产任务。
- **explorer**：执行只读调研、代码定位、方案分析等探索任务。
- **aipd_adoc_retriever**：如果项目已安装 `.codex/agents/aipd_adoc_retriever.toml`，用于从 L1-L5、SOP 和必要的次级流程文档中检索并压缩项目认知。
- **aipd_vue_architect**：如果项目已安装 `.codex/agents/aipd_vue_architect.toml`，用于 Vue 页面、组件、样式、交互、状态组织和 AI 友好型 Vue 架构任务。
- **aipd_vue_provider**：如果项目已安装 `.codex/agents/aipd_vue_provider.toml`，用于 Vue `useXxx.ts/js`、provide/inject、页面数据源、API 字段对齐和局部 controller 边界任务。

Codex 子 agent 在技术上仍叫子 agent，AIPD 语义中要区分两类用法：

- **上下文继承型子 Agent**：在平台支持时继承 Main Agent 当前上下文，只适合强依赖尚未落盘主线判断的局部分支。
- **角色执行 Agent**：按 `worker` / `explorer` / `aipd_vue_architect` 等角色读取 work package、case 和上下文文档执行，适合 Case Execute phase 的独立工作包。

Case Execute 不默认创建子 Agent。运行时先判断 Work Package 由 Main 还是 Child 执行；只有决定派发后，才按任务选择 `worker`、`explorer`、`aipd_vue_architect` 或 `aipd_vue_provider`。

普通 AIPD 对话先由 Main 按 map 做最小路由。已知入口少、上下文可控时由 Main 直接读取；需要扫描大量项目认知或多条独立认知线时，优先使用 `aipd_adoc_retriever` 隔离过程。它是 custom agent 身份；身份优先，不要求同时 fork 当前对话上下文。

如果运行时已经决定派发，且 work package 明确涉及 Vue 页面、组件拆分、HTML/CSS/Tailwind、Vue 单文件组件、组件通信或前端状态组织，并且 `aipd_vue_architect` 可用，优先使用 `aipd_vue_architect`。项目上下文读取顺序由 Agent Entry、case、work package 和派发 prompt 负责，不写死在 custom agent 身份里。

如果运行时已经决定派发，且 work package 明确目标文件是 `useXxx.ts`、`useXxx.js`，或任务重点是 provide / inject、页面级 API 数据加载、详情数据下发、provider/controller 边界，并且 `aipd_vue_provider` 可用，优先使用 `aipd_vue_provider`。

## 上下文与调度机制

Codex Agent 有两种上下文方式：

- `fork_context: true`：继承主 Agent 当前上下文，用于上下文继承型子 Agent。
- `fork_context: false`：不继承主 Agent 当前上下文，依靠短 prompt、case、work package 和显式文件恢复任务；这是上下文隔离或角色执行的优先选择。

Main Agent 根据运行时判定自然选择是否创建子 Agent；平台能力不可用时，由 Main Agent 回退执行。

- 子 Agent 调度是当前任务内部的执行方式，不扩大用户原始任务范围，也不授予额外的外部副作用权限。
- install、远端写入、删除等有外部副作用的动作，仍遵守各自的确认边界。

AIPD 不把 `fork_context: true` 作为默认规则。Case / Work Package 已承载目标和边界时，优先传最小上下文；只有任务强依赖尚未落盘的主线判断时才继承完整上下文。

判断是否创建子 Agent 时，同时看四个维度：预计中间上下文噪声、工作线是否真正独立并可并发、与 Main 当前主线的耦合度、启动和合并成本。子 Agent 主要用于高噪声上下文隔离、两条以上独立工作线的并发加速，以及必要的独立复核；不能只因任务涉及多个文件、事实检索、构建或测试就机械派发。

Main Agent 可以连续完成内聚模块、上下文规模可控的跨文件修改，以及需要持续继承设计 / 代码 / 调试判断的高耦合任务。Case、Goal 和 Work Package 已提供恢复能力时，不应仅为防止压缩而派发子 Agent。

case / phase / work package 文件是执行阶段的事实源，但 Work Package 是状态与验收边界，不是派发节点。进入 Case Execute 后，先做运行时选择：Main 直接执行时按里程碑写回；决定派发时，再让角色 Agent 读取 work package、case 和上下文文档执行。

派发子 Agent 时，prompt 应尽量短，只传执行指引路径、work package 文件路径、case 文件路径和返回格式。不要把长任务正文、上下文清单或讨论结论复制到 prompt 里。规范和任务都应以文件链接形式进入子 Agent：先读领域指引，再读 work package，再按 work package 中的上下文文档执行。

非 case 模式下也使用同一套净收益判定。决定派发时，在 prompt 中明确“你是子 Agent”、唯一局部目标、边界和返回格式；Main 不再重复执行该证据面。任务一旦需要长期验收、归档或跨会话恢复，再补 case / work package。

浏览器操作会持续产生页面状态和结构上下文。已有稳定 SOP 且路径明确时可以派发；新流程、异常状态或路径不确定时，先与用户沟通再决定由 Main 探索还是派发，不允许无边界深入或盲目绕路。

## GPT-5.6 Sol / Ultra 适配

- 日常讨论、普通开发和单个内聚模块以 Sol High 作为交互基线；Ultra 不作为全局默认。
- Ultra 适合存在两条以上独立调研、审查或验证工作线，并且用户可以接受更长等待的任务。
- Ultra 可能自行增加委派工作线；AIPD 不应再用“每个 Work Package / 每次检索默认派发”叠加第二层 fan-out。只有额外 Child 的上下文隔离或并发净收益仍然明确时才主动创建。
- 模型模式不改变 Case / Work Package 的状态与验收边界，也不替代运行时 Main / Child 判定。

Codex 可能在长对话中压缩上下文。压缩后的聊天摘要不能作为长期任务事实来源；任务恢复必须回到 `AGENTS.md -> _adoc/index.md -> _adoc/case/index.md -> 当前 case.md -> 当前 phase 目录 -> 当前 work package`。如果聊天记忆与 case / phase / work package 文件冲突，先提示冲突，再以文件为准。

## Codex 目标模式

Codex goal 是平台运行时目标，不是 AIPD 的长期记忆、第二份业务目标或子 Agent。它与 Case 是单向依赖关系：启动 goal 必须绑定一个 Case；创建或推进 Case 不要求启动 goal。

- 只有用户或平台明确要求启动目标模式时才创建 goal；不要因为 Case 较长、work package 较多、可能跨轮次或可能压缩上下文就自动创建。
- 创建 goal 前，先读取 `_adoc/case/index.md` 定位 Case；没有合适 Case 时，先通过 `aipd-case` 创建 `case.md` 并写好 Case Contract，然后再调用 `create_goal`。
- 一个活动 goal 只绑定一个 Case。goal objective 使用稳定文案，不重复 Case Contract 中的业务目标，也不写会变化的当前 phase 或 work package。
- 推荐 objective：`推进并关闭 AIPD Case {case-id}（{case.md 路径}）。以该 Case 文件为唯一目标契约和状态事实源，严格按 Think → Design → Execute → Verify → Close 流程完成。`
- 活动 goal 明确绑定当前 Case 时，加载 `@references/case/goal-mode.md`。平台 goal 是否活动、绑定哪个 Case 是目标模式的权威状态；不要根据 Case 内容或任务特征自行识别。
- 绑定后可以在 `case.md` 顶部写一条 `目标模式绑定` 恢复提示，但它只是外部状态的镜像，不是新的 Case Contract 字段。
- Goal Mode 下的内部 Phase Gate 由 Agent 按覆盖层自检并自动推进；不得因为等待 Think -> Design、Design -> Execute、Execute -> Verify 或 Verify -> Close 的确认而把 goal 标记为 blocked。
- 当前 phase、work package、执行游标和验收结果始终写入 case / phase / work package 文件。goal 不替代状态写回，也不强制子 Agent 派发。
- 只有所绑定 Case 完成 Close 后，才能把 goal 标记为 complete。Case 进度以 Case 文件为准；目标模式是否活动、绑定关系是否存在，以平台 goal 状态为准。

## 主 Agent 流程

1. 读取 `_adoc/case/index.md`，定位当前或目标 case。
2. 读取 `_adoc/case/{case目录}/case.md`，按上下文索引加载必要文档。
3. 读取 `Current Phase`。若处于 Execute，读取 `03-execute/execute.md` 和 `03-execute/work-packages/`，找到下一个未完成 work package；如果没有 work package，回到用户讨论、Verify 或补充设计。
4. 如果用户或平台明确要求目标模式，检查 goal 是否绑定当前 Case；没有 Case 时先创建 Case，再创建 goal。绑定成立时加载 Goal Mode 覆盖层；没有活动绑定时按普通 Case 运行，不自动启用。
5. 根据上下文噪声、可并发性、主线耦合和调度成本，选择 Main 或 Child。
6. 选择 Main 时连续完成当前内聚目标，并在里程碑写回 work package、execute.md 和 case。
7. 选择 Child 时，再根据 work package 的 `推荐 Agent` 或任务类型选角色；为每条证据面设唯一 owner，默认传最小上下文。
8. 只有 work package 强依赖 Main 当前未沉淀的聊天判断时，才使用上下文继承型子 Agent。
9. Child 完成后，Main 只读取压缩结果，不重复执行同一任务；成功或失败都写回 work package、execute.md 和 case。

## Main Agent 执行边界

Main Agent 保护主线连续性，但不局限于调度。以下任务通常由 Main 直接完成：

- 单一路径或同一内聚模块的实现、调试和验证。
- 需要持续继承刚完成的设计、代码状态或用户判断的高耦合工作。
- 上下文规模可控，且派发、等待和合并成本预计更高的跨文件修改。

以下任务更适合 Child：

- 长文档、长日志、大量页面结构、批量扫描等高噪声过程，Main 最终只需要压缩结论。
- 两条以上真正独立、可同时推进且不会发生写入冲突的工作线。
- 不依赖整条主线的独立复核。

需要并发时首轮只创建少量正交分支；一个证据面只交给一个 owner。若 Main 已派发，不再重复调查。

## Worker Prompt 模板

```text
你是 AIPD 开发执行 Agent。

你不是唯一在代码库中工作的执行者。不要回滚别人已经做出的改动；如果遇到已有改动，基于现状继续完成本 work package。

你的任务：
1. 读取 worker 指南：@references/case/workers/worker-dev.md
2. 读取 work package 文件：{work_package_file_abs_path}
3. 读取 Case 文件：{case_file_abs_path}
4. 按 work package 中的「上下文文档」逐一读取，遵守 case 的上下文边界
5. 按 work package 中的「横向模块」推进
6. 按 work package 中的「验收标准」自检
7. 完成后返回简洁结果

约束：
- 只做 work package 文件中列出的任务
- 不做额外优化、重构或顺手修复
- 不创建 work package 文件未要求的文件
- 只回流结论、依据、风险、建议、改动文件和验证结果，不返回完整搜索输出、长日志、长文件正文或完整 diff
```

## Explorer Prompt 模板

```text
你是 AIPD 调研执行 Agent。

你的任务：
1. 读取 worker 指南：@references/case/workers/worker-research.md
2. 读取 work package 文件：{work_package_file_abs_path}
3. 读取 Case 文件：{case_file_abs_path}
4. 按 work package 指定范围完成调研
5. 将调研结果写入 work package 要求的结果文件
6. 返回结果文件路径和简短结论

约束：
- 只调研 work package 文件要求的内容
- 明确区分事实和推测
- 给出来源
- 不在返回消息中粘贴完整报告
```

## 返回格式

成功：

```text
Work Package {work_package_id} 已完成。
改动文件：{文件列表}
验证：{执行过的检查}
说明：{必要的简短说明}
```

失败：

```text
Work Package {work_package_id} 失败：{原因}
已尝试：{简短说明}
```

## 关键约束

- Work Package 是目标、上下文和验收边界，不是默认子 Agent 派发节点。
- 判定派发有净收益且平台提供可用能力时，创建子 Agent；平台不可用时由 Main Agent 回退执行。用户明确要求不派子 Agent 时，遵循用户当前指令。
- 只有 work package 强依赖 Main Agent 当前尚未沉淀到 case / phase / work package 文件的聊天判断，或临时探索过程确实不适合留在主线时，才使用 `fork_context: true` 创建上下文继承型子 Agent。
- prompt 必须包含 work package 文件绝对路径。
- prompt 必须包含已经选择的角色；Work Package 的推荐 Agent 只在决定派发后生效。
- prompt 必须包含 case 目录或 case.md 路径，以及本 work package 需要遵守的上下文边界。
- 执行 Agent 必须自己读取 work package 文件和上下文文档，用它们校准任务和恢复锚点。
- 主 Agent 不重复执行子 Agent 已承担的任务，但可以直接执行未派发的内聚 Work Package。
- 每个 work package 完成后必须写回 work package 执行记录、`03-execute/execute.md` 和 case 状态，保证上下文压缩后能从文件恢复。

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

- **上下文继承型子 Agent**：在平台支持时继承 Main Agent 当前上下文，适合普通对话中保护主线、Case Think / Design 阶段探索计划、临时修改但不想污染主线的任务。
- **角色执行 Agent**：按 `worker` / `explorer` / `aipd_vue_architect` 等角色读取 work package、case 和上下文文档执行，适合 Case Execute phase 的独立工作包。

Case Execute 默认使用角色执行 Agent。开发工作包用 `worker`，调研型工作包用 `explorer`，Vue 前端结构 / 组件 / 样式 / 状态组织工作包用 `aipd_vue_architect`，Vue provider / `useXxx` / API 数据源工作包用 `aipd_vue_provider`。

普通 AIPD 对话中，如果任务需要查询项目认知、业务背景、功能边界、工程规则、SOP 或跨多个 `_adoc` 入口的上下文，优先使用 `aipd_adoc_retriever`。它是 custom agent 身份；Codex 当前不能保证 custom agent 身份和完整上下文继承同时使用，因此身份优先，不要求同时 fork 当前对话上下文。派发 prompt 只传用户任务摘要、当前工作目录、必要边界和返回格式。

如果 work package 明确涉及 Vue 页面、组件拆分、HTML/CSS/Tailwind、Vue 单文件组件、组件通信或前端状态组织，并且 `aipd_vue_architect` 可用，优先使用 `aipd_vue_architect`。项目上下文读取顺序由 Agent Entry、case、work package 和派发 prompt 负责，不写死在 custom agent 身份里。

如果 work package 明确目标文件是 `useXxx.ts`、`useXxx.js`，或任务重点是 provide / inject、页面级 API 数据加载、详情数据下发、provider/controller 边界，并且 `aipd_vue_provider` 可用，优先使用 `aipd_vue_provider`。

## 授权与上下文机制

Codex Agent 有两种上下文方式：

- `fork_context: true`：继承主 Agent 当前上下文，用于上下文继承型子 Agent。
- `fork_context: false`：不继承主 Agent 当前上下文，只在需要隔离敏感上下文、测试独立可恢复性，或平台能力限制时使用。

Codex 可能要求用户在当前聊天中明确授权后，Main Agent 才能调用子 Agent。这个平台机制的优先级可能高于 `AGENTS.md` 和 skill 规则，因此 Main Agent 必须主动适配：

- 如果用户当前消息没有明确提到“使用子 Agent / sub Agent / agent / 派发 Agent / 授权子 Agent”，第一次调用子 Agent 前必须先单独发送一次简短授权询问。
- 授权询问必须是独立的一次对话，在用户确认前不要调用子 Agent。
- 用户确认后，授权只覆盖当前任务或当前 case；同一任务内不必重复询问。
- 如果用户拒绝、没有确认，或当前平台没有可用子 Agent 能力，Main Agent 可以直接执行，但应控制过程输出。

AIPD 不把 `fork_context: true` 作为所有 work package 的默认规则。是否继承上下文由任务需要和平台能力决定；子 Agent 的核心价值是承担读取、扫描、验证、diff、长日志和调研等过程成本，Main Agent 只接收压缩后的结果回流。

判断是否创建子 Agent 时，重点不是任务智力难度，也不是总 token 消耗，而是本次回答是否需要检索、核对或整合项目事实。Main Agent 默认先做最小路由：读取入口索引，判断任务层级、相关认知线 / 功能线和必要事实来源；只要还需要继续探索多个入口，就应争取授权并创建子 Agent 完成事实检索，Main Agent 只接收压缩后的结论、依据、风险和建议。

允许 Main Agent 直接完成的例外应很窄：单一事实、单一入口、单一局部文件、用户明确要求不派子 Agent，或用户没有授权。不要因为任务看起来简单、用户目标清楚、或只是评估 / 方案 / review，就让 Main Agent 继续承担事实检索过程。

case / phase / work package 文件是执行阶段的事实源。进入 Case Execute 后，如果 `04-execute/work-packages/` 下的 work package 已经写清楚，优先让角色执行 Agent 自行读取 work package、case 和上下文文档执行；只有 work package 强依赖 Main Agent 当前尚未沉淀的聊天判断时，才使用上下文继承型子 Agent。

派发子 Agent 时，prompt 应尽量短，只传执行指引路径、work package 文件路径、case 文件路径和返回格式。不要把长任务正文、上下文清单或讨论结论复制到 prompt 里。规范和任务都应以文件链接形式进入子 Agent：先读领域指引，再读 work package，再按 work package 中的上下文文档执行。

非 case 模式下也可以使用子 Agent，只要用户已授权，且 prompt 明确“你是子 Agent”、局部目标、边界和返回格式。普通 AIPD 对话中，只要需要事实检索，默认由 Main Agent 最小路由后争取授权并派子 Agent 探索；任务一旦变成长任务、需要验收归档或需要跨会话恢复，再补 case / work package。

Codex 可能在长对话中压缩上下文。压缩后的聊天摘要不能作为长期任务事实来源；任务恢复必须回到 `AGENTS.md -> _adoc/index.md -> _adoc/case/index.md -> 当前 case.md -> 当前 phase 目录 -> 当前 work package`。如果聊天记忆与 case / phase / work package 文件冲突，先提示冲突，再以文件为准。

## Codex 目标模式

Codex goal 是平台运行时目标，不是 AIPD 的长期记忆，也不是子 Agent。它的作用是让 Main Agent 在长任务、上下文压缩或续跑时锁定当前目标；单个 work package 的隔离执行、检索、验证和长日志处理仍由子 Agent 承担。

`aipd-case` 的 Execute phase 自行判断是否启用 goal：

- 多 work package、长任务、可能跨轮次、可能上下文压缩或需要连续续跑时，启用或更新 goal。
- 单个短 work package、一次性验收或只读状态检查，可以不启用 goal。
- goal 文案应包含或指向当前 case 路径、当前 phase 目录和当前 work package；长期状态仍写入 case / phase / work package 文件。
- work package 执行仍按 `aipd-case` 的子 Agent 授权、推荐 Agent 和降级规则推进；不要用 goal 代替子 Agent 派发。
- 每个状态改变完成后，先更新 work package 执行记录和 case 状态，再更新 goal 进度或完成状态。
- 目标续跑、上下文压缩或平台 goal 状态与 case 文件不一致时，以 case / phase / work package 文件为准。

## 主 Agent 流程

1. 读取 `_adoc/case/index.md`，定位当前或目标 case。
2. 读取 `_adoc/case/{case目录}/case.md`，按上下文索引加载必要文档。
3. 读取 `Current Phase`。若处于 Execute，读取 `04-execute/execute.md` 和 `04-execute/work-packages/`，找到下一个未完成 work package；如果没有 work package，回到用户讨论、Verify 或补充设计。
4. 如果存在可执行 work package，且本轮尚未获得子 Agent 授权，先询问用户是否授权当前 case 使用子 Agent；确认后授权覆盖当前 case。
5. 判断是否启用 goal：多 work package、长任务、可能跨轮次或上下文压缩时启用；单个短 work package 或只读状态检查可以不启用。
6. 根据 work package 头部 `推荐 Agent` 字段选择执行角色；没有声明时再兜底判断：调研用 `explorer`，Vue `useXxx` / provider / API 数据源优先用 `aipd_vue_provider`，Vue 架构 / Vue 组件实现优先用 `aipd_vue_architect`，其他开发任务用 `worker`。
7. 如果 work package 已经写清楚，派发角色执行 Agent 读取 work package / case / 上下文文档执行。
8. 如果 work package 强依赖 Main Agent 当前未沉淀的聊天判断，才使用上下文继承型子 Agent，并在 prompt 中说明它是局部探索 / 执行分支。
9. Agent 完成后，主 Agent 只读取结果回流：结论、依据、风险、建议、改动文件和验证结果。
10. 成功则先更新 work package 执行记录、`04-execute/execute.md` 和 case 状态；如果启用了 goal，再更新 goal 进度，确保压缩后可恢复。
11. 失败则告知用户，询问重试、跳过或手动处理。

## Main Agent 执行边界

Main Agent 保护的是主线连续性。Case Execute 链路内，以下任务默认交给角色执行 Agent；只有强依赖主线临时上下文时，才使用上下文继承型子 Agent：

- 文件修改、跨文件修改、批量替换。
- git、提交前 diff、变更归因、commit message 准备。
- 构建、测试、批量验证、长日志分析。
- 调研、代码定位、跨模块阅读、方案分析。
- 任何会把大量源码、输出、日志或过程细节带入 Main Agent 上下文的任务。

Main Agent 默认只做入口读取、状态判断、任务派发、方案/摘要审查、用户沟通、验收和 case / work package 状态写回。不要因为某个动作智力难度低、任务类型只是评估、或用户描述很明确，就让 Main Agent 直接承担事实检索过程。如果 Main Agent 决定不派子 Agent，应能用一句话说明原因。

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

- Case Execute 默认使用角色执行 Agent 基于 work package / case / 上下文文档独立执行，不默认 fork 主 Agent 全量上下文。
- 创建子 Agent 前必须确认用户已在当前任务授权；未授权时先单独询问。
- 只有 work package 强依赖 Main Agent 当前尚未沉淀到 case / phase / work package 文件的聊天判断，或临时探索过程确实不适合留在主线时，才使用 `fork_context: true` 创建上下文继承型子 Agent。
- prompt 必须包含 work package 文件绝对路径。
- prompt 必须包含 work package 的推荐 Agent 或兜底选择结果。
- prompt 必须包含 case 目录或 case.md 路径，以及本 work package 需要遵守的上下文边界。
- 执行 Agent 必须自己读取 work package 文件和上下文文档，用它们校准任务和恢复锚点。
- 主 Agent 不重复执行执行 Agent 已承担的任务，只负责入口读取、状态判断、派发、审查摘要、验收、状态更新和下一步调度。
- 每个 work package 完成后必须写回 work package 执行记录、`04-execute/execute.md` 和 case 状态，保证上下文压缩后能从文件恢复。

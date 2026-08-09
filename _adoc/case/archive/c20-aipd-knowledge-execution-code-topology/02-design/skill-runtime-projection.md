# 节点 2：Skill 运行时认知投影设计

## 当前状态

- **Design 节点**：completed / Readiness Gate passed。
- **方案状态**：双入口条件加载与 Design -> Execute -> Verify 执行闭环均已确认。
- **当前目标**：让外部 Agent 在普通 AIPD 开发任务和 Case Design 中按需加载 AI 友好代码拓扑，而不是依赖 AIPD 源码仓库的 `_adoc`。
- **当前边界**：本节点只记录事实、比较方案和提出推荐，不修改 `aipd-skill/src`、`dist`、docs 或安装环境。

## Brownfield 事实

### 1. 打包机制已经支持“随包存在、按需读取”

`aipd-skill/scripts/build` 会读取各 Skill `SKILL.md` 的 `inject-from-core`，把 `aipd-skill/src/core/` 中指定文件复制到最终 Skill 的 `references/`。平台有覆盖文件时使用平台版本，否则使用公共 core 版本。

因此，新的认知文件可以被打进 Skill，但不必写进 `SKILL.md` 主体。现有 `aipd-case` 已采用同一模式：phase 文档、experience 和 Agent guide 都随包存在，运行时再按当前 phase 或经验命中条件读取。

### 2. 当前存在两个真实消费入口

- `aipd` 是普通开发、分析和修改任务的轻量入口。它先读目标项目 `_adoc/index.md` / `_adoc/map.md`，然后继续用户任务。新增页面、API、站点、游戏、shared 抽取或跨模块重构不一定都会先创建 Case。
- `aipd-case` 是复杂目标和架构设计入口。它在 Design phase 明确处理 Context Decoupling & File Boundary，是把通用代码拓扑转成项目具体 Design / L5 / 局部 README 的主要位置。

只接入 `aipd-case` 会漏掉普通开发中的结构性决策；只接入 `aipd` 又无法稳定约束 Case Design。两个入口都需要能够找到同一份运行时投影。

### 3. 外部 Agent 不能依赖 AIPD 仓库自身的 `_adoc`

`_adoc/L3-core/ai-friendly-code-topology.md` 是 AIPD 项目的长期认知主事实源，但安装后的 Skill 运行在别的项目中。目标项目的 `_adoc/L3-core/` 属于目标项目，不会天然包含 AIPD 仓库的 L3 正文。

现有 `aipd-skill/src/core/overview.md` 中“更完整认知见 `_adoc/L3-core/index.md`”只能在 AIPD 自己的仓库里成立，不能作为外部运行时依赖。运行时投影必须随 Skill 自包含。

### 4. 当前 Skill 仍携带旧二元表达和旧空间术语

当前源码还在多处使用“横向分层 / 纵向黑箱”“横向铺模块”等旧表达，包括：

- `aipd-skill/src/core/overview.md`
- `aipd-skill/src/core/case/overview.md`
- `aipd-skill/src/core/case/phases/design.md`
- `aipd-skill/src/core/case/templates/case.md`
- `aipd-skill/src/core/case/templates/work-package.md`
- `aipd-skill/src/skills/aipd-case/SKILL.md`
- `aipd-skill/src/core/experience/vue3-aipd-search-page-controller.md`

如果只新增一份 guide 而不修正这些入口，外部 Agent 会同时收到新模型和旧术语，形成冲突。

### 5. 现有验证能检查打包链路，但还不能检查本认知的 owner 关系

`aipd-skill/scripts/check-dist` 已验证：

- 9 个 Skill 集合。
- Skill 源文件与产物同步。
- `@references/...` 静态引用存在。
- Codex / Claude 产物文件集合和声明内差异。
- 旧流程禁止语义与 cleanup 入口。

它还没有验证：代码拓扑投影是否同时进入两个目标 Skill、投影内容是否与源码同步、旧空间术语是否从最终产物退出。

## 方案比较

| 方案 | 优点 | 主要问题 | 判断 |
|---|---|---|---|
| 只放 `aipd-case` | 最省入口，Design 使用直接 | 普通开发中的新增模块、shared 抽取和局部重构可能不进入 Case | 不采用 |
| 写入 Agent Entry 或 `overview.md` 并默认加载 | 每个任务都能看到 | 无关任务承担 token；容易把探索性模型变成全局硬规范；会压过目标项目现有架构 | 不采用 |
| 新建独立 `aipd-code-topology` Skill | 触发词独立 | 增加用户入口和调度复杂度；代码拓扑本来就是普通开发与 Case Design 的内部判断 | 暂不采用 |
| 一份公共运行时投影，注入 `aipd` + `aipd-case`，两处条件加载 | 同一内容 owner；覆盖普通任务与 Case Design；无关任务不加载 | 需要维护触发条件和一条 ADOC -> runtime projection 同步边界 | **推荐** |

## 推荐方案：双入口、条件加载、结果下沉

### 公共运行时投影

新增：

```text
aipd-skill/src/core/ai-friendly-code-topology.md
```

它是 `_adoc/L3-core/ai-friendly-code-topology.md` 的 **运行时投影**，不是逐字副本。它只保留外部 Agent 做设计判断所需的内容：

1. 代码拓扑与 AIPD 知识 / 流程纵横术语的区分。
2. 横向基座、横向共享能力、纵向业务上下文、显式组合边界。
3. “纵向”和“黑箱”是两个属性。
4. 纵向上下文识别问题和共享能力晋升条件。
5. 嵌套、组合、复制与共享的执行判断。
6. 现有项目事实优先、最小 delta、不得顺手重构的护栏。
7. Design 结果应该写入项目 Design、L5、局部 README 和 map 的位置。

完整案例证据、AIPD 自身 L3 归属和研究过程不进入运行时投影。

### 普通开发入口：`aipd`

把该文件注入 `aipd`，但只在以下任务读取：

- 新增或重划页面、API、网站、游戏、业务模块边界。
- 决定 shared / service / helper / component 是否抽取或复制。
- 跨模块重构、依赖方向调整、组合协议设计。
- 用户明确讨论横向基座、共享能力、纵向业务上下文或 AI 友好代码架构。

局部字段修改、样式修复、明确边界内的 bugfix、纯文档整理不读取。目标项目已有 L5 / README 明确规则时，项目事实优先；除非用户要求，不因加载本指南而主动重构现有拓扑。

### Case Design 入口：`aipd-case`

把同一文件注入 `aipd-case`。Design phase 在以下条件命中时读取：

- Case 会新增或调整代码模块 / 文件夹边界。
- Context Decoupling 涉及 shared / domain / utils 上移。
- 需要判断纵向业务上下文、显式组合或 Work Package 的独立验收边界。

读取时点是 brownfield / backend / frontend 事实清楚之后、Context Boundary 固化之前。Think、Execute、Verify 默认不重复加载完整 guide；Design 必须把采用的判断编译成项目具体的代码拓扑合同，Execute 和 Verify 再消费这份合同。

## Design -> Execute -> Verify 执行闭环

只在 Design 读取通用 guide 仍然不够。现有 Execute 虽然要求读取 Design Summary / Design Guardrails，发现设计缺口时也会回跳 Design，但 Work Package 还没有一份显式的代码拓扑合同；实际约束容易退化成“执行 Agent 是否记得并正确解释了 Design prose”。

本节点建议采用三段闭环。这里的“开发阶段再次强调”不是重复整套认知，而是把 Design 结论压缩成短、具体、可核对的执行护栏。

### 1. Design：做出项目具体决策

命中代码拓扑任务时，Design 条件加载完整运行时投影，并在 Context Boundary 中形成 `Code Topology Contract`。至少回答：

- 本次新增或修改的纵向业务上下文是什么，归属哪些目录 / 文件。
- 允许依赖哪些横向基座与横向共享能力。
- 跨上下文关系通过什么显式输入输出或组合接口发生。
- 哪些跨边界引用、内部穿透或主干回流被禁止。
- 本 Case 是否允许新增 / 上移共享能力；默认只允许 Design 已明确批准的 shared 变化。
- 每个上下文如何独立验收，以及稳定事实应回写到哪个 L5 / 局部 README / map。

这一步负责“决定采用什么拓扑”，不能把选择留给 Execute 临场发挥。

### 2. Execute：执行短合同，不重新设计

拓扑敏感的 Work Package 增加 `代码拓扑护栏` 小节，并直接携带上述合同中与本包有关的具体规则。Execute 开始前做 preflight：

- 确认 Work Package 已标记是否拓扑敏感，并存在可执行的代码拓扑护栏。
- 确认允许修改的上下文、依赖方向、组合接口和禁止事项已经写清。
- 执行中不新增 Design 未批准的共享层、跨上下文依赖或内部穿透。
- 如果实际实现需要改变合同，停止当前拓扑变更并回到 Design；不能在 Execute 中自行重解释通用 guide 后继续。

因此 Execute phase 需要稳定知道“必须执行代码拓扑护栏并在变化时回跳”，但默认不需要再次加载完整 `ai-friendly-code-topology.md`。

### 3. Verify：拿真实结果反查合同

Verify 不只检查测试是否通过，还要对照代码 diff、目录结构、依赖关系和文档回写，回答：

- 是否出现 Design 未批准的 shared 抽取或跨上下文引用。
- 是否穿透了显式组合边界，或把参数组装、状态判断重新堆回主干。
- 纵向上下文是否仍可独立理解、修改和验收。
- 约定的 L5 / 局部 README / map 是否按稳定程度完成回写。

违反合同时，设计仍成立则回 Execute 修正；如果事实证明合同本身不成立，则回 Design。这样“严格执行”不依赖单次提示记忆，而由执行前合同与执行后审计共同约束。

### 结果下沉

通用 guide 只帮助做判断。每个项目最终采用什么拓扑，必须下沉为项目自己的事实：

- 当前 Case：`02-design/context-boundary.md` 或 `design.md`。
- 已实现的跨模块拓扑：项目 `_adoc/L5-dev/`。
- 页面、API、游戏、网站等模块内部入口：代码就近 `README.md`。
- 高频检索入口：项目 `_adoc/map.md`。

后续 Execute 和普通维护优先读取这些项目事实，不要求每次重新加载通用 guide。

## Owner 与同步边界

| 内容 | Owner | 同步方式 |
|---|---|---|
| AIPD 长期抽象认知、术语和非目标 | `_adoc/L3-core/ai-friendly-code-topology.md` | 人与 Agent 讨论后的主事实源 |
| 外部 Agent 的可执行判断合同 | `aipd-skill/src/core/ai-friendly-code-topology.md` | 从 L3 认知提炼，保留来源声明，不逐字复制 |
| 某个项目的真实代码拓扑 | 目标项目 Design / L5 / 局部 README / map | Design 与实现验收后下沉 |
| 可安装产物 | `aipd-skill/dist/{platform}/skills/{aipd,aipd-case}/references/` | build 生成，不手改 |

`check-dist` 应增加专项检查：

- 两个平台的 `aipd` 与 `aipd-case` 都包含同一投影文件。
- 产物投影与 `src/core` 源文件一致。
- 两个入口都存在静态 `@references/ai-friendly-code-topology.md` 读取规则。
- 最终 Skill 不再使用“横向铺模块 / 横向铺开”表达并列扩展。

## 预计 Brownfield Delta

### ADDED

- `aipd-skill/src/core/ai-friendly-code-topology.md`

### MODIFIED

- `aipd-skill/src/skills/aipd/SKILL.md`：注入文件并增加普通开发条件读取。
- `aipd-skill/src/skills/aipd-case/SKILL.md`：注入文件、补触发关键词并校正旧术语。
- `aipd-skill/src/core/case/phases/design.md`：增加条件加载和执行检查，校正旧二元 / 空间术语。
- `aipd-skill/src/core/case/phases/execute.md`：拓扑敏感 Work Package 执行前检查短合同；合同变化必须回跳 Design，不在 Execute 重新做拓扑设计。
- `aipd-skill/src/core/case/phases/verify.md`：增加代码拓扑合同的结果审计和 Design / Execute 回跳规则。
- `aipd-skill/src/core/overview.md`、`case/overview.md`：把总览摘要改成三类模块共存。
- `aipd-skill/src/core/case/templates/case.md`、`work-package.md`：同步“并列扩展”；让拓扑敏感 Work Package 携带项目具体的代码拓扑护栏。
- `aipd-skill/src/core/experience/vue3-aipd-search-page-controller.md`：只做旧空间术语的机械校正，不改经验事实。
- `aipd-skill/scripts/check-dist`：增加投影打包、源产物同步和旧术语检查。
- `_adoc/L5-dev/index.md`、`_adoc/map.md`：实现后登记稳定运行时入口。
- `_adoc/L3-core/ai-friendly-code-topology.md`：实现后补充运行时投影 owner 链接，不复制实现细节。
- `aipd-skill/dist/`：由 build 生成 Codex / Claude 产物。

### NOT MODIFIED

- Agent Entry：不让所有项目任务无条件加载探索性代码拓扑。
- 其他 7 个 Skill：它们不负责普通代码边界判断或 Case Design。
- 公开 `docs/` / 根 README：用户学习文档另行判断，不阻塞外部 Agent 运行。
- install / dev 脚本：打包和安装机制无需变化。
- 外部业务项目与实践源码资产。

## Work Package Draft

### wp-02-skill-code-topology-runtime

- **目标**：把 AI 友好代码拓扑提炼为随包存在、按需加载的公共运行时投影，并让 Case 在 Design、Execute、Verify 三个节点形成可执行闭环。
- **执行者**：Main Agent；运行时 guide、两个入口、phase / template、构建检查和 ADOC owner 链高度耦合，连续修改与验证的合并成本低于派发收益。
- **设计输入**：本 artifact、`_adoc/L3-core/ai-friendly-code-topology.md`、现有 build / check-dist、两个 Skill 入口和 Case phase / template。
- **代码拓扑护栏**：公共 guide 是唯一运行时 owner；只允许 `aipd` / `aipd-case` 通过 `@references/ai-friendly-code-topology.md` 条件消费；Execute 只执行 Work Package 短合同；不得把完整 guide 写进 Agent Entry、其他 Skill 或项目 ADOC。
- **验收**：源码、两平台产物和入口规则一致；旧空间术语退出最终 Skill；build 与专项 `check-dist` 全部通过；不执行 install。

## Readiness Gate

- Requirements：passed；运行时消费者、加载条件和非目标已确认。
- Brownfield delta：passed；新增、修改和不修改的文件边界已经列清。
- Context boundary：passed；长期 ADOC、公共运行时投影、项目具体合同和 dist 的 owner 链明确。
- Code Topology Contract：passed；允许的消费者、组合入口、禁止扩散范围和回跳条件明确。
- Work package：passed；单一内聚的 `wp-02-skill-code-topology-runtime`，无需再拆微步骤。
- Verify：passed；已有 build / check-dist，可增加投影、入口、产物同步和旧术语专项检查。
- Open / assumed：无阻塞项。

**Gate：passed。** 用户已明确确认三段闭环，并授权在没有其他待确认项时直接进入 Execute。

## 验收草案

- build 同时生成 Codex / Claude 两个平台产物。
- `check-dist` 通过新增专项检查和既有全部检查。
- `aipd` 与 `aipd-case` 最终产物都包含运行时投影；其他 Skill 不包含。
- 普通 Skill 主体和 Design phase 都只在命中条件时要求读取投影。
- Design 能把通用 guide 转成项目具体的 Code Topology Contract，而不是只留下概念性提醒。
- 拓扑敏感 Work Package 必须携带短护栏；Execute 不重新加载完整 guide，也不得自行改变合同。
- Verify 能依据真实 diff / 依赖 / 目录与文档回写审计合同，区分回 Execute 修正和回 Design 重设边界。
- 旧“横向铺模块 / 横向铺开”不再出现在最终 Skill Markdown。
- 无关任务仍只走项目 map / 局部上下文，不会无条件读取整份代码拓扑。
- 不运行 install；build 后按项目规则另行询问用户是否安装。

## Open / Assumed

- **confirmed**：采用“一份公共运行时投影 + `aipd` / `aipd-case` 双入口条件加载”。
- **confirmed**：ADOC 是长期认知主事实源，Skill 是外部运行时投影；不把完整 L3 逐字塞进所有 Skill。
- **confirmed**：不新增独立 Skill，不写入 Agent Entry，不修改其他 7 个 Skill。
- **confirmed**：采用“Design 形成完整项目合同、Execute 执行短护栏、Verify 对照真实结果审计”的三段闭环；Execute 默认不重复加载完整 guide。
- **open**：无。

## Latest Checkpoint

- **当前节点**：Node 2 / Design completed / Readiness Gate passed。
- **当前结论**：公共运行时投影、双入口条件加载和三段执行闭环全部确认；无阻塞级 open / assumed。
- **停止点**：Design 已结束，Skill 源码或 dist 尚未修改。
- **下一节点**：Execute `wp-02-skill-code-topology-runtime`。
- **恢复入口**：本文件 -> `_adoc/L3-core/ai-friendly-code-topology.md` -> `aipd-skill/src/skills/aipd/SKILL.md` / `aipd-case/SKILL.md` -> `aipd-skill/src/core/case/phases/design.md`。

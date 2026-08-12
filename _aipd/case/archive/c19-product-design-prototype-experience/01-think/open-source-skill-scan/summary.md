# Open-source Skill Scan

## Branch goal

找出高关注度产品设计 / 原型相关 Agent Skill，深读其方法与执行流程，判断可吸收机制和许可证边界。

## Trigger

来自 Case Think。AIPD 产品设计经验不足，且用户要求用流程强制 Agent 回看、反例扫描和多轮迭代。

## Scope / stop condition

- 扫描公开 GitHub / Skill 生态，记录当前 stars、更新时间、许可证和核心定位。
- 深读至少 3 个最相关候选的 Skill / README / 工作流文件。
- 当候选已覆盖产品定义、交互 / 视觉生成、评审迭代三类能力，并足以形成 AIPD 吸收判断时停止。

## Evidence

### 口径与边界

- 调研时间：2026-07-21。
- GitHub stars 是仓库级信号，不等于单个 Skill 的质量；包含大量 Skill 的聚合仓库尤其不能把总 stars 直接算给某一个产品设计 Skill。
- `skills.sh` 安装量可作为采用度补充信号，但不是独立用户数，也不能代替内容审计。
- 所有重点仓库均以 shallow clone 拉到系统临时目录中阅读，没有 vendoring 到 AIPD；结论基于固定 commit，方便后续复核。
- 只吸收可重新表述的方法和流程结构。无明确许可证的候选只作为观察证据，不复制正文、脚本或数据资产。

### 候选概览

| 候选 | 2026-07-21 关注度 | 许可证 / 更新 | 与本 Case 的关系 | 初步判断 |
|---|---:|---|---|---|
| `anthropics/skills`：`doc-coauthoring`、`frontend-design` | 163,122 stars；相关 Skill 在 skills.sh 分别约 69.7K、676K installs | `doc-coauthoring` 目录未附 LICENSE；`frontend-design` 为 Apache-2.0；2026-07 仍更新 | 产品文档共创、读者测试、视觉方向自检 | 核心观察源；前者只吸收重构后的思想，且不能把视觉前端 Skill 当完整产品设计流程 |
| `mattpocock/skills`：`prototype`、已弃用的 `design-an-interface` | 179,908 stars；`prototype` 约 391.7K installs | MIT；2026-07 仍更新 | 单问题原型实验、多方案结构发散 | 核心吸收源；原型边界清晰，但缺产品发现和真实用户验证 |
| `nextlevelbuilder/ui-ux-pro-max-skill` | 108,432 stars；约 276K installs | MIT；2026-07 仍更新 | 设计系统检索、UX 规则、交付前检查 | 适合作为参考库 / 检查层，不适合作为端到端产品设计主流程 |
| `github/awesome-copilot`：`prd` | 36,861 stars；`prd` 约 20.8K installs | MIT；2026-07 仍更新 | 先访谈、再定范围、再写可测 PRD | 可吸收 PRD 骨架；反馈回路偏短，需要接入读者测试和原型验证 |
| `plugin87/ux-ui-agent-skills`：`prototyping`、`design-review`、`design-qa` | 462 stars | 未发现许可证；2026-06 更新 | 保真度阶梯、状态矩阵、可用性测试、评审维度 | 方法完整度高但不算高赞；只重构思想，不复制内容 |
| `sickn33/agentic-awesome-skills`：`product-inventor`、`product-design` | 43,663 stars | MIT；2026-07 仍更新 | 聚合式产品设计 Prompt | 反例：仓库高赞不代表子 Skill 可靠；固定技术栈、品牌话术和主观断言过多，不作为主来源 |

补充架构证据：Vercel 公开的产品设计 Agent 实践并非“高赞 Skill”，但它把产品判断 Skill、确定性 linter、真实交付样例、行为 eval 和证据回流拆开，和 AIPD 的经验库 / Skill / Case / Verify 分层高度契合，应作为吸收架构的主要参考，而不是当作可直接复制的内容源。

### 来源入口

- Anthropic：<https://github.com/anthropics/skills/tree/main/skills/doc-coauthoring>、<https://github.com/anthropics/skills/tree/main/skills/frontend-design>、<https://www.skills.sh/anthropics/skills>
- Matt Pocock：<https://github.com/mattpocock/skills/tree/main/skills/engineering/prototype>、<https://www.skills.sh/mattpocock/skills>
- UI/UX Pro Max：<https://github.com/nextlevelbuilder/ui-ux-pro-max-skill>、<https://www.skills.sh/nextlevelbuilder/ui-ux-pro-max-skill/ui-ux-pro-max>
- GitHub PRD：<https://github.com/github/awesome-copilot/tree/main/skills/prd>、<https://www.skills.sh/github/awesome-copilot/prd>
- UX/UI Agent Skills：<https://github.com/plugin87/ux-ui-agent-skills>
- 高赞聚合仓库反例：<https://github.com/sickn33/agentic-awesome-skills>
- Vercel 架构实践：<https://vercel.com/blog/teaching-agents-product-design-at-vercel>

### 深读 1：Anthropic `doc-coauthoring`

固定 commit：`fa0fa64bdc967915dc8399e803be67759e1e62b8`。

许可证边界：该目录没有独立 LICENSE，仓库也声明授权按 Skill 区分，因此这里只提炼通用方法结构，不复制或改写其长段指令；同仓库的 `frontend-design` 明确为 Apache-2.0。

它把文档共创拆成三个阶段：

1. **Context Gathering**：先明确文档类型、受众、读后影响、模板和约束，再允许用户倾倒上下文；当 Agent 已经能追问边界和取舍而不是只问基础事实时才退出。
2. **Refinement & Structure**：逐段进行澄清、5-20 个候选点发散、用户筛选、缺口检查、起草和局部修订；约 80% 完成时重读全文，检查流向、重复、矛盾和空洞语言。
3. **Reader Testing**：预测真实读者会问的问题，用不继承作者上下文的 fresh reader 只看文档作答，暴露隐含假设、歧义和矛盾；发现问题后回到修订，再测一次。

可吸收机制：

- “作者视角自检”与“无上下文读者测试”分开，防止 Agent 因为知道背景而误判文档已清楚。
- 每段先发散、再筛选、再写，避免第一版直接固化最先想到的结构。
- 全文一致性 review 和 reader test 是交付 gate，不是可选建议。

不应照搬 / 缺口：

- 它高度依赖用户逐段参与；AIPD 还需要支持 Agent 在已有证据充足时自主跑完检查，再把关键决策交给用户。
- 它主要解决文档可读性，不覆盖产品方案发散、交互状态和原型验证。

### 深读 2：Matt Pocock `prototype`

固定 commit：`ed37663cc5fbef691ddfecd080dff42f7e7e350d`。

核心定义非常有价值：原型不是提前写产品代码，而是回答一个明确问题的可丢弃实验。

- 逻辑 / 状态不确定时，用最小 TUI 暴露完整状态变化。
- UI 方向不确定时，默认做 3 个、最多 5 个结构上真正不同的版本；差异必须落在信息层级、对象组织或交互方式，不能只是换颜色。
- 原型优先嵌入真实产品外壳、真实数据密度和真实上下文，允许通过 `?variant=` 切换，减少脱离场景的漂亮假稿。
- 选择后记录“赢的是哪一个、为什么”；原型本身不直接晋升为生产实现，避免把实验代码带进正式产品。

可吸收机制：

- 每个原型先写唯一验证问题，完成后必须写证据、判断和下一个未知项。
- 强制 3 个结构方案是很好的发散 gate；可以继承其精神，但不强制依赖子 Agent。
- 把原型作为决策实验而非交付物，可减少过早工程化和视觉抛光。

不应照搬 / 缺口：

- 没有系统的用户问题定义、任务流、内容设计、异常状态和可用性测试。
- “用户选一个版本”仍可能退化成喜好投票，需要由成功标准和验证任务约束。

### 深读 3：UI/UX Pro Max

固定 commit：`5c0946f66120079258e1efc8e436d78ec793877c`。

它的长处不在产品方法，而在把大量设计知识变成可检索、可持久化、可验收的执行系统：

- 先识别产品类型、用户场景、风格和技术栈；新页面必须先检索设计系统建议。
- 用 master design system 加页面级 override 保存判断，而不是每次重新即兴生成。
- 将 accessibility、触控、性能和栈特定规则放进检索与交付前检查；无结果时明确返回，不允许编造规则。
- 最终交付前必须重读 `pro-rules` 检查表。

可吸收机制：

- AIPD 的产品设计知识不应是一篇超长 Prompt，应拆为短路由、按任务加载的参考知识、稳定 design decisions 和交付检查。
- 确定性规则可以进入 checklist / lint；需要判断的内容保留在方法参考和案例中。

不应照搬 / 缺口：

- 工作流从视觉系统和实现约束开始，未验证产品问题、信息架构、任务流或方案取舍。
- 一次交付前检查不足以构成用户要求的多轮迭代闭环。

### 深读 4：GitHub `prd`

固定 commit：`ecf0f5a9f4b014d2e0f5e3c1cec55b4e7792ed8a`。

- 明确要求 PRD 前先做 discovery interview，再梳理用户流、范围和 non-goals。
- 要求语言具体、可测，禁止只写“快速、简单、直观”等不可验收的形容词。
- 用严格 PRD schema 输出，并在草稿后询问针对性反馈。

可吸收机制：把目标、用户流、成功指标、非目标和约束设为产品文档的最低合同。

缺口：只在草稿后进行一轮反馈，没有 fresh-reader test，也没有把 PRD 中的关键假设转换成原型验证任务。

### 深读 5：`ux-ui-agent-skills` 原型 / 评审 / QA

固定 commit：`93a7fbbdb3f19016fc2ea01eeec48a3895045be1`。该仓库未发现许可证，因此只做概念级观察。

- 五级保真度阶梯：内容优先 -> 线框 -> 低保真交互 -> 高保真 -> 生产代码；每一级回答不同问题，不允许无理由跳级。
- 用户旅程不仅有 happy path，还记录决策点、错误路径和边界场景。
- 可用性测试任务必须有成功标准；评审覆盖层级、一致性、无障碍、可用性、响应式和性能，并标注严重性。
- QA 使用真实状态矩阵：loading、empty、error、disabled、长内容、深色模式、RTL 等，而不是只看理想截图。

可吸收机制：把“当前最大未知项”映射到最低必要保真度，并用状态矩阵和显式成功标准决定是否继续升阶。

缺口：没有许可证，不能复制；对真实用户研究与产品商业 / 组织约束的处理仍然较薄。

### 反例与过滤结论

`agentic-awesome-skills` 的仓库关注度高，但其中产品设计类 Skill 混入固定框架、特定组件栈、品牌崇拜话术和未经证实的“原则”，流程虽长却缺少可靠证据和独立验证。它证明：

- stars 应用于发现仓库，不应用于免审单个 Skill。
- Skill 篇幅长、口号多、步骤多，不等于可恢复、可验证的工作流。
- 最值得吸收的是 gate、artifact、evidence、exit criteria，而不是人设、形容词或固定技术栈。

## Conclusion（经真实 Case 校准）

### 总判断

外部调研首先证明：单篇万能 Prompt 和高赞 Skill 不能替代 Case 中的状态、证据和 gate。随后对真实 AI 图鉴任务的审计又修正了初版结论：固定“两轮 review / 三轮封顶”同样不可靠，它可能让 Agent 在“页面更多、证据更全、内容更丰富”的错误指标上继续加法。

最终不新增大型产品设计流程。AIPD 只固定一个低成本审视入口，再用可观察触发器决定是否回到 Design；Case 负责保存 Attention Contract、真实证据、Reduction Delta 和收敛状态。

### 最终采用的最小闭环

1. **Design / Attention Contract（条件命中）**
   - 只对产品文档、原型、信息架构、用户可见页面或明确简化反馈启用。
   - 写清用户时刻、唯一主问题、看见 -> 理解 -> 行动、信息层级、传播范围、自我推翻权限、触发器和停止条件。
2. **Execute / 真实产物**
   - 形成可检查的文档、原型、截图或可运行页面；不能只验证设计描述。
3. **Verify / Reduction Scan**
   - 进入 Close 前做一次低成本首屏 / 前十秒扫描。
   - 只有出现多个主重点、下一步不清楚、内部方法压过用户问题、低价值信息抢占注意力、用户的简化偏好未传播等现象时，才回到 Design。
4. **Design / Reduction Delta**
   - 回跳必须产生删除、合并、延后 / 渐进披露或重排，并说明如何改善当前用户结果；只有加法不算有效迭代。
5. **Adaptive Convergence**
   - 一次完整扫描未再触发、注意力路径清楚、简化已经传播，且下一轮没有新证据或新观察视角时停止。
6. **Evidence Return**
   - 事实、决策、例外、成功 / 失败样例和覆盖缺口分开保存；重复出现且可验证的判断再升级为稳定规则。

外部候选提供的三方案发散、最低必要保真度、状态矩阵、fresh-reader test 和 lint / eval 仍是可选方法镜头，由当前未知项和风险触发，不成为所有产品 Case 必走的九步流水线。

### AIPD 归属建议

| 内容 | 建议归属 | 原因 |
|---|---|---|
| 运行触发和停止条件 | `aipd-case` 的 Design / Verify phase | 复用现有回跳，不增加新 phase 或大型 Skill |
| 已验证的案例、反例、判断方法 | `aipd-skill/src/core/experience/` | 经验负责举证、迁移和按任务命中 |
| 当前注意力契约、真实证据、Reduction Delta | Case phase / work package artifact | 支持 checkpoint、压缩恢复和自主回跳 |
| Goal Mode 自主滚动 | `case/goal-mode.md` 覆盖层 | 绑定目标后让内部质量 Gate 自动通过或回跳，不逐轮等待用户 |
| 项目内重复性的用户研究、评审或证据采集程序 | `_aipd/sop/` | SOP 面向 Agent 可重复运行，但不替代通用 Skill |
| 客观可机械判断的规则 | checklist / lint / Verify eval | 把“必须检查”从自然语言愿望变成可验收行为 |

推荐的最小架构不是复制某一来源，而是：

- Anthropic 提供 **文档共创 + fresh-reader test**；
- Matt Pocock 提供 **单问题原型 + 三方案结构发散 + 实验不直接上线**；
- `ux-ui-agent-skills` 提供 **保真度阶梯 + 状态矩阵 + 严重性评审**，只重构概念；
- UI/UX Pro Max 提供 **按需检索 + 设计系统持久化 + 交付清单**；
- Vercel 提供 **Skill / references / exemplars / lint / eval / evidence loop 分层治理**。

这套组合能回应用户的核心要求：AI 不能在第一次产出后直接交付，但也不为了表演思考而固定多轮；它必须检查真实产物，命中问题就推翻并留下 Reduction Delta，没有新问题就停止。

## Return to

已回到 `01-think/think.md` 和 `case.md` Think 摘要，并进入 Design / Execute 落盘。

## Invalidates

初版“两轮 review / 三轮封顶”和“大型产品设计闭环”建议已失效，由 `02-design/design.md` 的触发式最小机制替代。

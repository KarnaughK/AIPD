---
name: aipd-learn
description: >
  AIPD 框架自迭代入口。默认按当前平台能力采集并输出会话 ID / transcript 位置等最小定位信息；用户明确要求时，再基于当前对话、粘贴经验、case 或补充文件生成 AIPD 框架回流包，并在确认后回写到 AIPD 源码。
  关键词：经验迭代、经验沉淀、即时反馈、经验回流、回流包、聊天 ID、会话 ID、transcript、Codex transcript、同步经验、规则更新、SOP、最小定位卡
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
  - Agent
  - AskUserQuestion
inject-from-core:
  - overview.md
  - adoc-structure.md
  - case/overview.md
  - experience/*
  - learn-session-locator.md
---

# AIPD Learn

基于当前上下文做 AIPD 框架经验回流，但不归档 case，不合并分支，不自动提交。

当前项目的 ADOC 文档回写、局部 README 更新、map 更新和 case / work package 稳定知识沉淀，交给 `aipd-weave`。`aipd-learn` 只处理 AIPD 框架自身的 skill、模板、Agent 行为规则和 transcript 诊断。

`aipd-learn` 有两重身份：

1. **外部项目采集器**：在业务项目中使用时，默认只输出最小定位卡，帮助用户把原始会话带回 AIPD 源项目；如果用户只是想更新当前项目 ADOC，提示改用 `aipd-weave`。
2. **AIPD 内部自迭代分析器**：在 AIPD 源项目中使用时，优先读取用户带回的定位卡 / transcript，从原始对话里审计 AIPD skill 或规则哪里反应不好。

`aipd-learn` 支持六种经验回流方式：

1. **会话定位卡**：在外部项目中按当前平台能力采集会话 ID、transcript 位置和可见的 turn ID；不能自动定位时明确缺口并请求用户提供位置，只输出最小定位信息。这是外部项目默认路径。
2. **自迭代诊断**：在 AIPD 源项目中，用户贴入定位卡、会话 ID 或 transcript path 后，读取原始 transcript，优先审计用户纠正了 Agent 什么、哪些 skill 行为反复出错、哪些规则需要回写。
3. **会话回流包**：用户明确要求“生成回流包 / 总结经验 / 整理给 AIPD 吸收”时，才输出结构化回流包。
4. **即时写回**：如果当前就在 AIPD 源项目，且用户确认要吸收框架经验，先给写回方案，确认后修改 `aipd-skill/src/core/`、`aipd-skill/src/skills/` 或 `aipd-skill/src/platforms/`。
5. **实践经验库回流**：把真实项目中已经校准过的技术栈、领域、搜索、调研或工具经验写入 `aipd-skill/src/core/experience/`，保留具象事实，不二次抽象成通用原则。
6. **异步回流**：用户在项目中先写反馈文件，之后切回 AIPD 源项目再处理。文件只是缓存方式，不是必要中转。

## 职责边界

**只做**：外部项目中按平台能力采集当前会话定位信息；AIPD 源项目中基于定位卡 / transcript 审计 AIPD 自身行为；在用户确认后，从当前对话、用户粘贴经验、平台 transcript 引用、用户补充文件、进行中的 case 或已完成 work package 中提炼框架经验，生成诊断或回流包，判断经验归属，并在用户确认后写回 AIPD 源码或实践经验库。

**不做**：不执行 work package，不归档 case，不移动 case 目录，不合并分支，不主动提交代码，不把当前业务项目经验直接写入项目 `_adoc/`。项目 ADOC 回写用 `aipd-weave`。

## 经验分流

`aipd-learn` 先判断经验类型，再决定是否抽象。

### 抽象规则回流

抽象规则回流用于修改 AIPD 通用规则、skill 行为、模板、phase 检查点或平台适配规则。写入 `aipd-skill/src/core/`、`aipd-skill/src/skills/` 或 `aipd-skill/src/platforms/` 时，只保留可跨 AIPD 项目复用的判断标准、触发条件、职责边界和停止条件。

这类内容必须抽象成 AIPD 语言：

- 外部页面、模块、业务对象、接口、字段、权限名、角色名、流程名，抽象为“产品功能线 / 认知线 / 项目事实 / 代码入口 / 接口字段 / 权限规则 / 数据状态”等 AIPD 通用概念。
- 外部项目中的具体失败场景，只用于定位 transcript 原文，不作为框架规则正文的示例。
- 输出自迭代诊断时，可以短摘用户纠正点，但应优先改写为 AIPD 通用表达；不要让非 AIPD 的案例名词、项目黑话或业务词进入“建议改动”“可回写判断”和最终源码。

### 实践经验库回流

实践经验库用于保存抽象逻辑在真实项目里的具象落地样本。它不是把经验再次抽象成原则，而是保留足够真实的技术栈、领域、框架机制、目录结构、失败路径和最终取舍，帮助后续 Agent 在相似场景中快速借鉴。

实践经验写入：

```text
aipd-skill/src/core/experience/index.md
aipd-skill/src/core/experience/{experience-name}.md
experience-assets/{asset-name}/              # 仅在文字不足以可靠复用时
```

其中 `experience-assets/` 位于 AIPD 仓库根级，不在 `aipd-skill/src/` 内。它保存实现型经验附带的源码、示例和验证入口，接受 Git / GitHub 版本化，但不随 Skill build / install。经验正文保存语义和远端入口，不把整套源码复制进 Skill references。

实践经验按一个统一索引管理，不按 Think / Design / Execute 各维护一份索引。每条经验在索引里标注：

- 适用阶段：Think / Design / Execute / Verify / Close。
- 类型：代码实践 / 调研策略 / SEO 数据 / 搜索策略 / 工具经验等。
- 技术栈或领域：Vue / Nuxt / Next / SEO / 深度搜索等。
- 什么时候读。
- 正文路径。

实践经验的处理原则：

- 保留具象上下文，不把经验压缩回抽象原则。
- 只做隐私清理、来源标注和结构化整理。
- 不把外部项目的本机绝对路径、外部 case 文件路径或只在某台机器存在的 transcript 路径写入实践经验正文；这些只属于回流过程定位，不属于可迁移经验。
- 来源可以写成“已完成外部项目 case / 用户反馈 / transcript 诊断 / AIPD 内部文件”，但只有来源本身位于 AIPD 仓库内时，才在经验正文中保留具体文件路径。
- 如果一条经验同时产生抽象规则和实践样本，分成两份写：抽象规则进 core / skill，实践样本进 `experience/`。
- 如果经验仍属于某个业务项目自己的长期认知，不写进 AIPD 框架经验库，应交给该项目的 `aipd-weave`。
- 代码实践经验包含 controller、adapter、组件基座等不可安全重写的实现细节时，先判断是否需要附带源码资产。需要时建立 `experience-assets/{asset-name}/asset.json`、`README.md`、`SOURCE.md`、许可证边界、`src/`、示例和与风险相称的测试。
- 源码资产应是可迁移 reference implementation：移除业务数据、私有路径、项目品牌、全局工具类和不可见依赖；不能把外部业务仓库原样复制进 AIPD。
- 正式经验同时给出仓库路径、GitHub 默认分支 latest 入口和完整 commit SHA 的 pinned 规则。资产尚未提交时不得伪造 pinned SHA。
- GitHub 可见不等于已授权复用。外部来源没有明确许可证或权利边界时，记录来源性质并优先重新实现；不要擅自授予超出上游权利的许可证。
- 新增资产后必须验证它没有进入 `aipd-skill/dist` 或安装产物；只有引用文字可以随经验正文进入 Skill。
- 经验推荐的动作必须和资产许可证一致：未授予复制权时，只能指导普通读者审阅 / 引用；只有仓库所有者或已获授权的使用者才能按其权利范围复制。不能一边写“推荐复制”，一边在许可证中禁止所有读者复制。
- 区分“来源模式已生产验证”和“AIPD 重写实现已验证”。验证记录至少分为核心单测、Vue runtime、浏览器 / UI adapter、Nuxt / SSR 集成；没有覆盖的层级明确写未验证。
- 未提交 / 未推送的 GitHub 地址只能标成发布后模板，不能叫作当前 latest。只有远端实际可访问后才写可用 latest URL；pinned URL 必须包含真实完整 commit SHA，不能把 `{full-commit-sha}` 模板当成已发布入口。
- 新增或更新源码资产后先运行 `node experience-assets/scripts/verify-assets.mjs`；发布前运行 `node experience-assets/scripts/verify-assets.mjs --full`，统一验证 manifest、引用路径、品牌、资产测试、依赖审计、Skill build 和 dist 隔离。

---

## 执行流程

### 第一步：判断运行身份

先判断当前工作目录是不是 AIPD 源项目。

可用信号：

- 当前目录存在 `aipd-skill/src/skills/aipd-learn/SKILL.md`
- 当前目录存在 `aipd-skill/src/core/overview.md`
- `_adoc/index.md` 中项目名称是 `AIPD`

如果不在 AIPD 源项目，进入**外部项目采集器模式**：

1. 只采集当前会话定位信息。
2. 输出 `【AIPD Learn 定位卡】`。
3. 不读取完整 transcript。
4. 不生成总结、诊断或回流包。
5. 不写当前项目 `_adoc/`。
6. 如果用户目标是“更新当前项目 ADOC / 记到项目文档 / 更新 map / 更新 README”，提示改用 `aipd-weave`。

如果在 AIPD 源项目，进入**内部自迭代分析器模式**：

1. 优先识别用户是否贴入外部定位卡、会话 ID 或 transcript path。
2. 如果识别到 transcript，读取原始会话并做自迭代诊断。
3. 如果没有外部定位卡，则采集当前会话定位卡；只有用户明确要求时，才分析当前会话。
4. 内部模式也不默认写文件，先输出诊断和回写方案，等用户确认后再改源码。

### 第二步：确认经验来源

优先使用当前聊天上下文和用户刚粘贴的经验记录。如果这些内容已经足够，不要求用户先创建反馈文件。

读取 `@references/learn-session-locator.md`，只使用当前平台明确支持的定位方式。公共 Skill 不假设 Codex 环境变量、SQLite 或目录在其他平台存在；自动定位不可用时输出已知信息并请求用户提供 transcript 位置，不伪造会话 ID。

采集到 transcript path 后，只把它作为“原始上下文引用”。不要默认把完整 transcript 展开到回复里。

只有在上下文仍不够时，才向用户追问最少信息：

1. 这次想沉淀的具体经验是什么？
2. 是否关联某个 `_adoc/case/{case目录}`？
3. 这条经验是项目自己的经验，还是 AIPD 框架/skill 的经验？

如果用户提供的是一大段经验记录，先判断它是：

- **即时框架回流**：直接修改 AIPD 源项目的 `aipd-skill/src/core/`、`aipd-skill/src/skills/` 或 `aipd-skill/src/platforms/`。
- **实践经验库回流**：写入 `aipd-skill/src/core/experience/`，并同步更新 `experience/index.md`；保留具象技术栈、领域、目录、框架机制、失败路径和最终取舍，不二次抽象。
- **项目经验沉淀**：交给 `aipd-weave` 回写当前项目 `_adoc/`、局部 README、map 或 case。
- **待转交反馈**：当前不在 AIPD 源项目，先整理为“框架回流建议”，让用户带到 AIPD 源项目执行。

如果用户给出 case 目录，先识别 case 结构，再读取和本次经验相关的入口。

新结构 case 使用 contract + phase-first 目录，优先读取：

```bash
cat _adoc/case/{case目录}/case.md
test -f _adoc/case/{case目录}/自我察觉迭代.md && cat _adoc/case/{case目录}/自我察觉迭代.md
test -f _adoc/case/{case目录}/05-close/close.md && cat _adoc/case/{case目录}/05-close/close.md
find _adoc/case/{case目录}/0*-*/ -maxdepth 2 -type f \
  \( -name "summary.md" -o -name "think.md" -o -name "design.md" -o -name "execute.md" -o -name "verify.md" -o -name "close.md" \)
find _adoc/case/{case目录}/03-execute/work-packages -maxdepth 1 -type f 2>/dev/null
```

只读取和本次经验相关的 phase 摘要、Close 候选、自我察觉记录或 work package，不全量扫描项目。`自我察觉迭代.md` 是 AIPD 框架经验优先入口；`05-close/close.md` 用于判断候选已经回写、延后回写，还是仅留在 case。业务项目自身的 L3/L4/L5/README/map 回写仍交给 `aipd-weave`。

如果目标 case 仍是旧结构（例如存在顶层 `steps/`、`doc/` 或旧 `01-goal/`），不要按旧结构继续执行 case；只把旧文件作为经验来源读取，并在诊断中标注“旧结构来源”。旧 `steps/` 只作为兼容读取：

```bash
find _adoc/case/{case目录}/steps -type f 2>/dev/null
```

如果用户给出反馈文件路径，读取该文件；但不要要求用户为了反馈专门创建文件。

### 第三步：外部项目默认输出会话定位卡

默认不要总结完整聊天，也不要生成经验回流包。用户说“把这段经验给 AIPD learn 一下 / 记一下 / 回流一下”，但没有明确要求长摘要时，优先输出最小定位卡，让后续处理方直接按 ID 或 transcript path 读取原文。

```md
【AIPD Learn 定位卡】
- 平台：{Codex / Claude Code / 未识别}
- 会话 ID：{平台可见 ID 或未识别}
- transcript path：{本地 JSONL 路径；没有则留空}
- 当前 turn ID：{如平台可用则填写；没有则留空}
- 项目路径：{project_root}
- 当前分支：{branch 或未识别}
- 一句话备注：{用户刚刚指出的经验点；没有就写“见 transcript 原文”}
```

默认输出限制：

- 不输出 3-8 条场景摘要。
- 不输出“观察到的问题 / 可复用判断 / 建议改动”等完整包字段。
- 不复述长聊天内容，不把 200K 上下文压缩成 1K 摘要。
- 如果已经拿到 transcript path，优先让后续 Agent 读原文，而不是相信当前 Agent 的二手总结。
- 如果用户只要 ID，只输出会话 ID 和 transcript path。

定位卡适合跨项目转交：用户把定位卡带到 AIPD 源项目后，新的 Agent 根据 transcript path 精读相关消息，再决定是否生成回流包或写回源码。

### 第四步：AIPD 内部自迭代诊断

内部模式读取 transcript 时，不要把它当成普通项目复盘；要把它当成 AIPD 自身的行为日志。

优先关注用户发言，也要审计 AIPD 设计的观察锚点是否被执行。不要只依赖“用户多次纠正”这种强信号；如果 case、map 或 AGENTS.md 已经声明了检索 SOP，就检查 Agent 的实际路径是否符合。

先读取可用的观察锚点：

- 当前 case 的 `case.md` 中是否有“自迭代观察锚点”。
- `_adoc/map.md` 中是否有“自迭代观察锚点”。
- `AGENTS.md` / `_adoc/index.md` 是否声明上下文检索链路。

重点找这些信号：

1. **用户反复纠正 Agent 行为**
   - 用户多次说“不是这个意思”“不要急着写代码”“先讨论”“别拆 work package / step”“这个规则不对”。
   - 这通常说明对应 skill 的流程顺序、默认动作或停止条件有问题。

2. **用户在使用某个 skill 时仍然频繁补规则**
   - 例如使用 `aipd-case` 时，用户仍然不断纠正 case phase 推进、work package 创建时机、前端架构讨论顺序。
   - 这说明 `aipd-case` 没有把真实协作规则固化住。

3. **用户纠正 Agent 的任务分层**
   - 例如工具文档和流程规则混淆、Case Contract / Think / Design / Execute 边界混淆。
   - 这类问题优先回写 skill 的职责边界或场景分流规则。

4. **用户纠正 Agent 的探索 / 执行节奏**
   - 例如应该先读图、先聊业务流程、先建最小 case 壳，而 Agent 直接查接口、拆 work package 或写代码。
   - 这类问题优先回写执行流程和默认停止点。

5. **用户纠正 Agent 的逐层确认和落盘保真**
   - 例如用户要求“一层一层推进”，实际意思是一次只确认当前层，不要提前展开第三、第四层细节。
   - 例如用户已经认可了方案预览、叙事路径、目录草案或执行策略，但 Agent 写入 case / work package 时只留下缩略关键词。
   - 例如用户指出“每一步先落到文件，才能允许自然压缩和长会话续跑”，实际意思是项目 Agent 的长期上下文应 file-first，而不是 chat-first。
   - 这类问题优先回写 `aipd-case` 的逐层确认规则、work package 模板和上下文隔离规则。

6. **用户纠正 Agent 的表达和产物形态**
   - 例如图里模块名、组件概览、AipdForm-update 的表达方式。
   - 这类问题优先回写 `aipd-skill/src/core/` 下的方法论文档或模板。

7. **上下文检索 SOP 没有被执行**
   - 任务开始后没有读取 `_adoc/map.md`，也没有说明缺失和兜底策略。
   - 没有形成上下文包：层级判断、必读文档、代码入口、兜底搜索、风险边界。
   - 涉及核心概念却没有读取 L3，涉及产品功能边界却没有读取 L4，涉及跨模块工程规则却没有读取 L5。
   - 涉及页面、弹窗、组件内部细节却没有读取就近 README。
   - 这类问题优先判断是 Agent 忽略提示词、地图入口不够显眼、map 未覆盖任务，还是 skill 流程没有强制检索。

8. **检索链路过深或地图不可用**
   - Agent 读取了入口 map，但后续仍靠多层跳转猜测，没有找到关键模型或规则。
   - 入口只索引第一层，缺少高频任务的扁平路径。
   - 这类问题优先回写 `_adoc/map.md` 模板、L3/L4/L5 map 约定或 `aipd` 的读取策略。

诊断输出格式：

```md
【AIPD 自迭代诊断】

来源：
- transcript: {path}
- 外部项目：{project_root}
- 关联 skill：{推断出的 skill，如 aipd-case / aipd-learn}

用户纠正点：
- {用户原话或短摘，说明纠正了什么}

Agent 反应问题：
- {过早执行 / 场景分流失败 / work package 拆早 / 上下文加载不对 / 工具文档和流程规则混淆}

观察锚点审计：
- {应观察的锚点}
- {实际是否发生；证据来自 transcript / case / map}
- {偏离原因：提示词未执行 / map 缺失 / map 命中不清 / skill 流程不够硬 / 文档结构问题}

可回写判断：
- {应该改哪类规则，以及为什么}

建议修改位置：
- `aipd-skill/src/skills/...`：{原因}
- `aipd-skill/src/core/...`：{原因}
- `aipd-skill/src/platforms/...`：{原因}

下一步：
- 等用户确认后再写文件。
```

输出时要克制：

- 不复述完整聊天。
- 不按时间线做流水账。
- 不把业务项目细节原样搬进 AIPD。
- 优先抽象“用户为什么纠正 Agent”和“哪条 AIPD 规则应该变”。

### 第五步：按需生成经验回流包

只有用户明确要求“生成回流包 / 输出摘要 / 整理建议 / 直接给出可回写方案”时，才生成结构化“经验回流包”。回流包允许说明稍长，但必须便于 AIPD 源项目里的 Agent 直接消费。

```md
# AIPD 经验回流包

## 来源定位
- 平台：Codex / Claude Code / 未识别
- 项目路径：{project_root}
- Git remote：{origin 或未识别}
- 当前分支：{branch 或未识别}
- 会话 ID：{平台可见 ID 或未识别}
- 当前 turn ID：{如平台可用则填写}
- transcript path：{本地 JSONL 路径；没有则留空}
- 生成时间：{本地时间}

## 场景摘要
{这次经验来自什么真实工作场景，3-8 条即可}

## 观察到的问题
- {实际发生了什么}

## 可复用判断
- {下次遇到类似情况，应该怎么判断}

## 建议回写位置
- `{path}`：{为什么改这里}

## 建议改动
- {建议新增/修改哪条规则、SOP、模板或 skill 行为}

## 原始上下文引用
- transcript：{path}
- 读取建议：只读取和本次经验相关的 user/assistant 消息，不全量搬运。

## 隐私与抽象边界
- {哪些业务细节需要抽象，哪些不能原样写回 AIPD}
```

回流包必须具体，避免写成空泛原则。`transcript path` 是主要事实来源；摘要只是导航，不替代原文。生成回流包时也要控制长度，除非用户明确要求详细版。

### 第六步：判断回写位置

按下面规则分类：

| 经验类型 | 回写位置 |
|---|---|
| 当前项目方向、业务判断、功能规则、研发约束、局部入口 | 交给 `aipd-weave` 判断并回写当前项目 `_adoc/`、局部 README、map 或 case |
| 已校准的真实项目实践样本、技术栈经验、领域调研经验、搜索策略、工具使用经验 | AIPD 仓库的 `aipd-skill/src/core/experience/`，并更新 `experience/index.md` |
| AIPD 通用知识、结构规则 | AIPD 仓库的 `aipd-skill/src/core/` |
| aipd 总入口、ADOC 入口、经验回流方式 | AIPD 仓库的 `aipd-skill/src/skills/aipd*/` |
| 已初始化项目的 AIPD 架构升级、AGENTS.md / map 同步 | AIPD 仓库的 `aipd-skill/src/skills/aipd-update/` |
| case 生命周期流程经验 | AIPD 仓库的 `aipd-skill/src/skills/aipd-case/` 或 `aipd-skill/src/core/case/` |
| 平台会话 ID、transcript、回流包生成 | 公共行为进入 `aipd-skill/src/skills/aipd-learn/`；定位差异进入 `aipd-skill/src/platforms/{platform}/core/learn-session-locator.md` |
| Claude/Codex 平台差异 | AIPD 仓库的 `aipd-skill/src/platforms/` |

如果当前工作目录不是 AIPD 源码仓库，但经验属于 AIPD 框架本身，不要硬写目标项目；先整理为“框架回流建议”，让用户切换到 AIPD 仓库后再执行。

如果经验属于当前项目本身，不要在 `learn` 中写项目 ADOC；提示用户运行 `aipd-weave`。

### 第七步：给用户确认

写入前必须展示：

```md
【经验迭代方案】
来源：当前对话 / 用户粘贴经验 / 平台 transcript / 反馈文件 / case / work package
类型：项目经验 / AIPD 框架经验 / 两者都有
准备修改：
- 文件 A：修改原因
- 文件 B：修改原因

待确认的问题：
- ...
```

用户确认后才写文件。

### 第八步：执行写回

写回原则：

1. 优先更新已有文件，不为了沉淀创建零散新文件
2. 新经验追加到最接近的现有章节；没有合适章节时再新增小节
3. 只写本次确认过的经验，不顺手重构文档结构
4. 如果修改 AIPD 源码，应运行 `./aipd-skill/scripts/build` 验证源码能正常打包；build 属于低风险验证动作，可以在写回后直接执行
5. 不要在源码修改后自动执行 install；install 会改写用户级或项目级 Agent 运行环境，存在覆盖当前可用版本的风险
6. build 完成后，必须主动问用户是否执行对应安装命令；不要只说明“可能需要 install”；只有用户确认后才运行 `./aipd-skill/scripts/install`、`./aipd-skill/scripts/install-codex`、`./aipd-skill/scripts/install-project` 或 `./aipd-skill/scripts/install-project-codex`
7. 如果当前是 dev 模式，说明 build 后通常会自动生效；如果当前是 install 模式，说明需要用户确认后重新 install

### 第九步：返回结果

完成后说明：

- 默认路径：输出会话 ID、transcript path 和最多一句备注
- 自迭代路径：输出诊断、建议修改位置和待确认回写方案
- 回流包路径：输出生成的回流包或提炼的经验
- 修改了哪些文件
- `./aipd-skill/scripts/build` 是否已运行，以及是否需要用户确认后再执行 `./aipd-skill/scripts/install-codex` 等安装命令

不要自动提交，除非用户明确要求。

## 平台定位边界

会话定位的真实能力以构建时注入的 `@references/learn-session-locator.md` 为准。任何平台都不得把“当前 Agent 看得到聊天”误写成“另一个项目能自动恢复原对话”；跨项目转交必须依赖显式会话 ID、transcript 位置或用户粘贴内容。

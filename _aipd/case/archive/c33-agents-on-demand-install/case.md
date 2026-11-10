# Case: c33-agents-on-demand-install

> **本次事项目标**：每个公共 Skill 是独立安装包；通用默认加载，多平台按包内小目录按需加载；目录即产物，安装即复制。
> **当前 Phase**：Close

## Case Contract

> 本区是整个 case 的目标契约，每次恢复 case 都必须读取。来源是原对话 `01a0870d-b3eb-7021-ad2d-265b3f03bb44`（标题：AIPD 全局 .agents 安装与 Grok 沙箱），本对话是其分叉，用来按 `aipd-case` 正式推进。

### 目标

- **目标**：每个公共 Skill 是一个独立安装包。默认读通用上下文；凡是多平台不同的内容，都在该 Skill 的 `SKILL.md` 末尾放一个按需加载小列表，Agent 按当前对话所属平台只读**当前 Skill 包内**对应文件。目录即产物，安装即复制。同一套包可以装到 `~/.agents`、Grok、Cursor、Claude 或任何位置；运行时不读仓库源码。平台文件可以写「暂不支持」，不靠缺文件。废掉 `src/` → `dist/{platform}` 和平台覆盖打包。
- **方向 / OKR / 项目阶段关联**：用户确认日常 Codex / Cursor / Grok 共用一棵树。这会改当前「按平台覆盖打多份包、`install` 写 `~/.codex/skills`」的工程合同；Intent 是否改写等 Close 后由 weave 判断。

### 要做

- 多平台不同的内容统一用按需加载，不限于 Leader。当前已知至少包括 Leader runtime 和 Case 的 `agent-guide`；后续同类差异走同一模型。没有平台差异的 Skill 不加空列表。
- 加载模型固定为三步：默认只读通用上下文（`SKILL.md` + 通用 references）；有平台差异时，在 **`SKILL.md` 正文末尾**加一个小列表，一行一个宿主；Agent 按**当前对话所属平台**只读对应文件。这就是「表」：几行 Markdown，不是独立清单、数据库或第二份索引文件。
- 按需文件放在**当前 Skill 文件夹内**的小目录：`aipd-leader/runtime/{host}.md`、`aipd-case/agent-guide/{host}.md`；`host` 为小写 `codex` / `cursor` / `grok` / `claude`。`SKILL.md` 列表写包内相对路径。运行时不读仓库源码。
- 公共 Skill 目录即产物，安装即复制。废掉 `src/` → `dist/{platform}` 和平台覆盖。必须多包一致的文件（至少 `catalog.json`、`project-state.md`）一个 owner，校验防漂移，必要时 sync。
- 装到 `~/.agents`、Grok、Cursor、Claude 或任何位置，每个 Skill 包磁盘内容相同：通用文件 + 全部宿主按需文件。
- 运行时只加载通用部分和自己那一小份。平台文件可以写「由于一些问题暂时不支持」，用正文表达能力差异，不靠缺文件。
- 只留两个安装入口：`install-agents` → `~/.agents/skills`（Codex / Cursor / Grok 共用）；`install-claude` → `~/.claude/skills`。删除 `install`、`install-codex`、`install-cursor`、`install-project` 及其 Codex 别名。
- 不升 V3。项目 Workspace 仍是 Schema v2，本机发布仍是 `currentVersion: 2`。
- 仓库落点：完整包 `aipd-skill/skills/{name}/`；`shared/` 只放 `catalog.json` 与 `project-state.md`。
- 公共 Skill 以 c34 为准：九个，`aipd-init` 替换 `aipd`。八个包带 shared 副本，`aipd-git-push` 不带。不重做初始化分流。
- `install-agents`（以及把同一棵树装到其他位置的入口）跑完后扫描已知 Skill 目录；若发现多份 AIPD 公共 Skill，提示可能冲突，**不自动删除**。
- `SKILL.md` 常驻正文只留通用规则和末尾那份按需加载小列表，不把别家调度细节写进默认上下文。列表可以写「不在上列就不要做该能力」（Leader 调度）；未列出的宿主对纯通用 Skill 只读通用部分。
- 认宿主只认当前这条对话是谁，不认 PATH / 本机装了什么。
- 同步维护者 README / 构建安装文档 / Engineering 合同：目录即产物、安装即复制；校验改为完整包 + 共享文件一致性，不再验平台 dist。
- 本机 bootstrap 已完成的前半段纳入现状，不重做。注意 `~/.agents/skills` 里可能仍是旧名 `aipd`，源码已是 `aipd-init`。

### 不做

- 不管 Codex custom agents（`~/.codex/agents/*.toml`）。用户已声明后续不太用。
- 不把各家调度 API 揉成一份通用 runtime。
- 不凭 PATH、本机装了什么、或 `command -v cursor-agent` 认宿主。
- 不把 Codex 模型表、Cursor `cursor-agent` 步骤写进 Skill 常驻正文。
- 安装时不自动清理 `~/.codex/skills`、`~/.cursor/skills`、`~/.grok/skills` 或其他位置已有的 AIPD Skill。
- 不把仓库级 `aipd-learn` 装进用户级。
- 不重做 c34 已完成的 `aipd` → `aipd-init` 与有代码/空项目初始化分流。
- 不为了本 Case 重做 Claude 的 `CLAUDE.md` / `.claude/skills` 方言，只做同一棵树的复制安装。
- 不在用户确认前执行正式 `install*`。
- 不把 `catalog.json` 的 `currentVersion` 改成 3。
- 不为 Codex / Cursor 再留品牌安装；以后某宿主不读 `~/.agents` 再单写。

### 完成标准

- [x] 每个公共 Skill 是完整安装包：打开仓库里的 Skill 文件夹就能看出装出去的形态；Agent 只读当前 Skill 包内路径。
- [x] 不再生成内容不同的 `dist/{platform}` Skill 树；安装是复制完整包。
- [x] 共享文件（至少 `catalog.json`、`project-state.md`）有单一 owner，校验能发现副本漂移。
- [x] 多平台差异都通过该 Skill `SKILL.md` 末尾的按需加载列表加载；默认上下文只有通用部分加这份小列表。
- [x] Agent 按当前对话所属平台读对应文件；该文件可以是完整合同，也可以是「暂不支持」。
- [x] `SKILL.md` 常驻正文不再带会进上下文的别家调度细节。
- [x] 只存在 `install-agents` 和 `install-claude`；旧 `install` / `install-codex` / `install-cursor` / `install-project*` 已删除。
- [x] 安装完成后若检测到多份 AIPD Skill，会提示冲突风险，且不会自动删除。
- [x] `install-claude` 能把同一套复制到 `~/.claude/skills`。脚本在；本机这次没有执行它。
- [x] 仓库中公共 Skill 在 `aipd-skill/skills/`，共享原稿在 `aipd-skill/shared/`；`catalog.json` 仍是 version 2。
- [x] 校验脚本、维护者 README、`docs/modules/build-and-install.md`、Engineering 合同与「目录即产物、安装即复制」一致。
- [x] Grok 上非 Leader Skill 能从这棵树加载；Grok 上暂不支持的 Leader / 调度能力写在对应按需文件里，而不是缺文件。
- [x] 用户明确确认后才执行本机正式安装。

### 上下文索引

#### 知识域判断

- **Intent**：涉及默认交付目标从「Codex 主链路」转向「`~/.agents` 一套安装」。用户已在原对话确认本 Case 方向；未确认前不改 `intent.md`。
- **Research**：涉及各 Agent 对项目 `.agents/skills` 与全局 `~/.agents` / `~/.<vendor>` 的支持差异。来源是原对话调研，不是新外部调研任务。
- **Core**：涉及 Leader 项目主导编排模型（调度仍按宿主，包装改成一套树）和文件优先加载。
- **Product**：涉及安装入口、Leader 按需加载、Claude 另拷。
- **Engineering**：涉及 Skill 包形态、安装复制、共享文件一致性校验；旧 build 覆盖合同作废。
- **局部 README**：`aipd-skill/README.md`、`docs/modules/build-and-install.md`。
- **Case / 历史 Work Package**：`c17` Skill 包审计、`c24` Leader 模式、`c30`/`c31` Cursor 安装与执行层。只作对照，不沿旧「按平台打两份包」合同继续。

#### 项目认知

- `_aipd/map.md` - 安装 / Skill 维护 / Leader / Case 入口
- `_aipd/knowledge/intent/intent.md` - 当前仍写 Codex 为默认交付目标，本 Case 可能使其过期
- `_aipd/knowledge/core/index.md` - Leader 编排模型
- `_aipd/knowledge/product/index.md`、`map.md` - 安装与 Leader 用户可见行为
- `_aipd/knowledge/engineering/index.md` - build / install / 平台覆盖

#### 代码入口

- `aipd-skill/src/skills/aipd-leader/SKILL.md` - 当前会把平台 runtime 当常驻合同
- `aipd-skill/src/core/leader/runtime.md` - 公共层已是索引雏形，构建时仍被平台文件覆盖成单文件
- `aipd-skill/src/platforms/codex/core/leader/runtime.md`
- `aipd-skill/src/platforms/cursor/core/leader/runtime.md`
- `aipd-skill/scripts/build` - 按 `src/platforms/{platform}` 覆盖注入
- `aipd-skill/scripts/install` -> `install-codex`，写入 `~/.codex/skills`
- `aipd-skill/scripts/install-cursor` - 写入 `~/.cursor/skills`
- `aipd-skill/scripts/check-dist`

#### Phase 材料入口

- `01-think/think.md` - Think 已收口
- `01-think/prior-conversation/summary.md` - 原对话已对齐结论与证据
- `01-think/skill-package-and-build/summary.md` - Skill 包形态与 src/dist 扫描
- `02-design/design.md` - Design 主文件
- `02-design/requirements-contract.md` - 已确认的需求契约
- `02-design/brownfield-delta.md` - 现状与 ADDED/MODIFIED/REMOVED
- `02-design/context-boundary.md` - 完整包 / shared / 按需目录 / 脚本边界
- `02-design/work-package-draft.md` - 四包活草案
- `02-design/readiness-gate.md` - 能不能动手（passed）
- `02-design/decision-log.md` - 决策记录

#### 兜底搜索

- `rg "install-agents|install-cursor|~/.agents|leader/runtime|按需加载" aipd-skill _aipd docs`

### 边界变更记录

- 2026-09-10：原对话确认只做前半段 bootstrap（除 Leader 外装进 `~/.agents`），后半段（一套安装 + Leader 按需加载）放到本 Case。本对话是该分叉，不重做已完成的 8 个 Skill 安装。
- 2026-09-10：用户确认按需加载是通用模型，不限于 Leader。默认读通用；用表列出平台文件；按当前对话所属平台读对应文件。构建不再打多份不同内容的包。同一棵树可装到任意位置。安装后只提示多份冲突，不自动清理。平台文件可以写「暂不支持」，不靠缺文件区分能力。
- 2026-09-10：用户澄清「表」= `SKILL.md` 末尾的按需加载小列表，一行一个宿主，不是独立表文件。文件命名采用 `{stem}-{host}.md`。没有平台差异的 Skill 不加空列表。通用 Leader `runtime.md` 不再当第二份索引。
- 2026-09-10：用户纠正按需文件必须在当前 Skill 包内的小目录，运行时不读仓库源码。同时要求校验 `src/` → `dist/` 打包是否还需要。上一轮 `src/core/{stem}-{host}.md` 命名作废。
- 2026-09-10：用户确认「按你说的」：按需文件为 `runtime/{host}.md` / `agent-guide/{host}.md`；公共 Skill 目录即产物、安装即复制；废掉按平台 dist；共享文件一个 owner + 校验。
- 2026-09-10：用户要求说清 V2/V3、删旧安装、解释仓库路径。落盘：不升 V3；只留 `install-agents` + `install-claude`；完整包 `aipd-skill/skills/`，原稿 `aipd-skill/shared/`。
- 2026-09-11：用户确认 shared 只放 catalog 与 project-state。邻对话 c34 已把 `aipd` 收成 `aipd-init` 并归档；本 Case 消费该结果，不重做 init。

## Case Runtime

## Current Phase

Close

## Phase State

- Think: completed -> `01-think/think.md`
- Design: completed -> `02-design/design.md`
- Execute: completed -> `03-execute/execute.md`
- Verify: completed -> `04-verify/verify.md`
- Close: completed -> `05-close/close.md`

## 当前焦点

- **当前要解决的问题**：用户已在日常使用这套安装，确认关闭并归档。
- **当前游标**：`05-close/close.md`
- **最近 checkpoint**：2026-11-10 用户验收。`check-skills` 通过。`install-agents` 已写入 `~/.agents/skills` 和 `~/.grok/skills`。`grok inspect` 加载 Grok 那一份。
- **下一步建议**：归档后提交并推送。
- **压缩后恢复入口**：本文件 Case Contract + `04-verify/verify.md` + `05-close/close.md`
- **待确认项**：
  - [x] Design requirements / brownfield / 文件边界 / 四包活
  - [x] readiness passed
  - [x] 进入 Execute
  - [x] 正式 install（2026-09-14 `install-agents` → `~/.agents/skills`；未跑 `install-claude`）
- **阻塞项**：无。goal 模式未绑上，不挡 Execute。

## Checkpoint 记录

| 时间 | 位置 | 触发 | 已确认 / 已变化 | open / assumed | 下一步 | 恢复入口 |
|---|---|---|---|---|---|---|
| 2026-09-10 | Case / Think | 分叉对话要求立 Case 并推进 | Case Contract 已写；bootstrap 8 个非 Leader Skill 已在 `~/.agents/skills` | 当时未决：agent-guide / 是否清旧目录 / Grok Leader | 已由下一行确认 | `case.md` + `01-think/think.md` |
| 2026-09-10 | Case / Think | 用户确认加载模型与安装策略 | 按需加载是通用模型；一份完整树可装任意位置；安装后提示冲突不删除；暂不支持写在平台文件里 | 是否升 V3；品牌目录安装入口如何改名保留 | 已由下一行收口「表」的形态 | `case.md` Case Contract + `01-think/think.md` |
| 2026-09-10 | Case / Think | 用户澄清「表」= SKILL.md 末尾小列表 | 列表就在进门必读的 SKILL.md 末尾；当时命名 `{stem}-{host}.md` | 被下一行纠正：文件必须在 Skill 包内 | 见下一行 | `case.md` + `01-think/think.md` |
| 2026-09-10 | Case / Think | 用户纠正包内路径，并问打包是否还要 | 运行时只读当前 Skill 包；build 不编译 | 包内目录；是否废 dist | 已由下一行确认 | `case.md` + `01-think/think.md` + `01-think/skill-package-and-build/summary.md` |
| 2026-09-10 | Think → Design | 用户「按你说的」 | 包内 `runtime/{host}.md`；目录即产物；废按平台 dist | 当时未解释的 V3 / 旧 install / 路径 | 已由下一行收口 | `case.md` + `02-design/design.md` + `02-design/requirements-contract.md` |
| 2026-09-10 | Design / requirements | 用户追问 V2/V3、旧安装、仓库路径 | 不升 V3；删旧 install*；`aipd-skill/skills/` + `shared/` | 无阻塞 open | 确认本节点后 brownfield | `02-design/requirements-contract.md` |
| 2026-09-11 | Design / requirements | 用户确认 shared 范围，并发现 c34 已改完 | shared 两文件；九个 Skill 含 `aipd-init`；八个带副本 | 本机 `~/.agents/skills/aipd` 仍是旧名 | 已进入 brownfield | `02-design/requirements-contract.md` |
| 2026-09-11 | Design / brownfield | 用户「继续推进」 | 扫完 src/core/platforms/dist/install；写出 delta | 无阻塞 | 已进入 context-boundary | `02-design/brownfield-delta.md` |
| 2026-09-11 | Design / context-boundary | 用户「继续」 | 固化 `skills/` 完整包、`shared/` 两文件、按需目录贴 SKILL.md 旁 | 无阻塞 | 已进入草案 | `02-design/context-boundary.md` |
| 2026-09-11 | Design / work-package-draft | 用户确认继续，要求说清拆活 | 四包草案：搬家 / 按需 / 安装 / 校验拆旧 | 尚未 Execute | 已确认，进入 readiness | `02-design/work-package-draft.md` |
| 2026-09-11 | Design / readiness | 用户确认四包活「可以」 | gate = passed | 正式 install 另点头；不回退 c34 | 等确认进入 Execute | `02-design/readiness-gate.md` |
| 2026-09-14 | Design → Execute | 用户「绑一个…开工」 | 进入 Execute；四份正式施工单已写 | Grok `/goal` 宿主未绑定；正式 install 另点头 | 做 wp-01 搬家 | `03-execute/execute.md` |
| 2026-09-14 | Execute | 四包活做完 | skills/ + shared/ + 按需文件 + 新 install + check-skills；src/dist/build 已删 | 正式 install 另点头；goal 未绑 | Verify | `03-execute/execute.md` |
| 2026-09-14 | Execute | 用户要求更新本机 Skill | `install-agents` 已写入 `~/.agents/skills`，含 `aipd-leader` / `aipd-init` | 未装 Claude；旧名 `aipd` 未删；Grok Leader 不调度 Case 执行层 | Verify 仍待做 | `03-execute/execute.md` |
| 2026-11-10 | Verify → Close | 用户确认已经在用，可以关闭归档 | 验收通过。Grok 另装一份到 `~/.grok/skills`，inspect 命中该份 | `install-claude` 本机未跑；Intent 不在本 Close 改写 | 归档并提交推送 | `04-verify/verify.md` + `05-close/close.md` |

## 回跳 / 重开记录

| 时间 | 从哪里回跳 | 回到哪里 | 触发原因 | 更新内容 | 受影响下游 | 是否需用户确认 |
|---|---|---|---|---|---|---|
| - | - | - | - | - | - | - |

## Think 摘要

- **状态**：completed
- **关键问题**：已收口。
- **调研 / 比较分支**：
  - `01-think/prior-conversation/summary.md` - 原对话已对齐「一套安装包 + 按宿主文件」
  - `01-think/skill-package-and-build/summary.md` - 安装包形态与 build 用途扫描
- **决策结论**：按需加载是通用模型；「表」= `SKILL.md` 末尾小列表；按需文件在 Skill 包内 `runtime/{host}.md` / `agent-guide/{host}.md`；目录即产物，安装即复制；废按平台 dist。详见 `01-think/think.md`。

## Design 摘要

- **模式**：docs / process + refactor；跳过 backend / frontend
- **当前 Design 节点**：readiness-gate（completed，passed）
- **拓扑敏感**：是。九个 Skill 包为纵向上下文；shared 只两文件；运行时不读 shared。
- **需求入口**：`02-design/requirements-contract.md`（confirmed）
- **brownfield**：`02-design/brownfield-delta.md`（confirmed）
- **context-boundary**：`02-design/context-boundary.md`（confirmed）
- **work package 草案**：`02-design/work-package-draft.md`（confirmed，已收成正式施工单）
- **readiness**：passed
- **下一节点**：Execute 已进入

## Execute 摘要

- **当前执行游标**：四包 completed
- **正式施工单**：`03-execute/work-packages/`
- **验证**：`./aipd-skill/scripts/check-skills` 通过
- **goal 模式**：用户要求绑定；Grok 宿主 `/goal` 未创建；按普通 Case 执行，不加载覆盖层。

## 后续候选事项

- Codex custom agents 是否退役或继续只留在 `~/.codex/agents`
- 开发期是否另做 `dev-agents` symlink 到 `~/.agents/skills`

## Verify 摘要

- **状态**：completed。用户 2026-11-10 确认日常已在使用。
- **结果**：`04-verify/verify.md`

## Close 归档候选 / 反向编织候选

| 候选内容 | 触发来源 | 当前状态 | 候选归属 | Close 判断 |
|---|---|---|---|---|
| 默认用户级 Skill 安装到 `~/.agents/skills`，同一棵树也可装到其他位置 | 用户讨论 | 已完成 | Product / Engineering | 已回写。Grok 本机另有一份，不改「默认只到 ~/.agents」的合同 |
| 多平台差异：默认通用 + SKILL.md 末尾小列表 + 当前 Skill 包内按需文件 | 用户讨论 | 已完成 | Core / Product / Engineering | 已回写到 Skill 与 Engineering |
| 公共 Skill 目录即产物、安装即复制；废按平台 dist | 用户讨论 | 已完成 | Engineering | 已回写 |
| 默认安装只到 `~/.agents/skills`；Claude 另拷；不升 V3 | 用户讨论 | 已完成 | Product / Engineering | 已回写。Intent 仍写 Codex 默认交付，本 Close 不改 |
| 平台文件可以写「暂不支持」，不靠缺文件 | 用户讨论 | 已完成 | Core / Engineering | 已回写。Grok Leader 正文即此 |
| 安装后提示多份冲突，不自动删除 | 用户讨论 | 已完成 | Product / Engineering | 已回写。2026-11-10 两份安装时脚本只提示 |
| custom agent 暂不进入公共安装 | 用户讨论 | 已完成 | Engineering | 已回写。toml 留在 `aipd-skill/platforms/`，安装不复制 |

## Close 摘要

- **状态**：completed
- **创建时间**：2026-09-10
- **归档时间**：2026-11-10
- **归档位置**：`_aipd/case/archive/c33-agents-on-demand-install/`

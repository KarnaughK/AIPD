# AIPD Skill 源码目录说明

`aipd-skill/` 是 AIPD 的 Skill 本体工程。它负责维护 AIPD 在 Codex、Claude Code 等 Agent 平台上运行所需的 skill 源码、平台适配、构建脚本和构建产物。

这个目录不是 AIPD Desktop，也不是项目 `_adoc/` 认知库。它更接近一个“可打包的 Agent 能力源码项目”：修改这里会影响用户安装后可调用的 `/aipd`、`/aipd-case-create`、`/aipd-case-run` 等入口。

## 一级目录

```text
aipd-skill/
├── README.md
├── src/       # Skill 源码、公共核心材料、平台适配
├── scripts/   # 构建、开发安装、用户安装和项目安装脚本
├── modules/   # Skill 相关模块材料预留目录，当前为空
└── dist/      # 构建产物，由 scripts/build 生成
```

### `src/`

`src/` 是真实源码入口。日常修改 skill 行为、AIPD 模板、平台 Agent 指引时，优先从这里进入。

```text
src/
├── core/       # 平台无关的 AIPD 公共材料
├── platforms/  # Codex / Claude Code 等平台差异适配
└── skills/     # 每个可安装 skill 的源码目录
```

### `scripts/`

`scripts/` 存放本工程的构建和安装脚本。

| 脚本 | 作用 |
|---|---|
| `build` | 构建 Claude / Codex 两个平台的 skill 产物；默认构建全部平台，也可传 `claude` 或 `codex`。 |
| `dev` | Claude Code 开发模式安装；把构建产物以 symlink 方式放入用户级 Claude skills 目录。 |
| `install` | Claude Code 用户级安装；复制构建产物到用户级 Claude skills 目录。 |
| `install-project` | Claude Code 项目级安装；复制构建产物到指定项目的 `.claude/skills/`。 |
| `dev-codex` | Codex 开发模式安装；把 skill 和 agent 产物以 symlink 方式放入用户级 Codex 目录。 |
| `install-codex` | Codex 用户级安装；复制 skill 和 agent 产物到用户级 Codex 目录。 |
| `install-project-codex` | Codex 项目级安装；复制 skill 和 agent 产物到指定项目的 `.codex/` 目录。 |

安装脚本会清理旧 `aipd2*`、旧 `aipd-plan-*` 和 `mermaid-preview` 等历史 skill 残留，避免用户机器上同时出现旧入口和新入口。

### `modules/`

`modules/` 是 Skill 相关模块材料的预留目录，当前为空。

如果未来某些材料既不适合放进某个具体 skill，也不属于 `src/core/` 的公共注入材料，可以再评估是否放到这里。现在不要为了分类整洁强行使用它。

### `dist/`

`dist/` 是构建产物目录，由 `./aipd-skill/scripts/build` 生成，不是源码事实源。

```text
dist/
├── claude/
│   └── skills/  # Claude Code 可安装 skill 产物
└── codex/
    ├── skills/  # Codex 可安装 skill 产物
    └── agents/  # Codex custom agent 模板产物
```

修改源码后应重新运行：

```bash
./aipd-skill/scripts/build
```

不要直接手改 `dist/` 里的文件。`build` 会删除并重建对应平台的产物，直接改 `dist/` 很容易丢失。

## `src/core/`

`src/core/` 存放平台无关的 AIPD 公共材料。它们不是单独可调用的 skill，而是被多个 skill 通过 `inject-from-core` 注入到构建产物的 `references/` 中。

```text
src/core/
├── overview.md
├── adoc-structure.md
├── agent-guide.md
├── L1-intent/
├── L2-scenario/
├── L3-engine/
├── L4-product/
├── L5-dev/
├── adoc/
├── agent-entry/
├── agent-guides/
├── case/
└── okr/
```

### `overview.md`

AIPD 的总览说明。它解释 AIPD 是什么、基本工作方式是什么，常作为多个 skill 的公共背景材料注入。

### `adoc-structure.md`

项目 `_adoc/` 结构规则说明。涉及初始化、更新、map、case、L1-L5 边界时会被引用。

### `agent-guide.md`

平台无关的多 Agent / 分身 Agent 抽象规则。它描述 Main Agent、分身 Agent、角色 Agent 的职责边界。

### `L1-intent/`

L1 Intent 相关模板和写作规则。

| 文件 | 作用 |
|---|---|
| `guide.md` | 指导 Agent 如何创建和维护 L1 Intent。 |
| `template.md` | L1 Intent 文档模板。 |
| `example.md` | L1 示例。 |
| `intent-writing.md` | 方向、目标、边界类内容的写作规则。 |

### `L2-scenario/`

L2 Research / Scenario 相关规则。

| 文件 | 作用 |
|---|---|
| `guide.md` | 说明如何记录外部世界、用户、场景、痛点、竞品、玩法范式等内容。 |

### `L3-engine/`

L3 Core / Engine 相关规则。

| 文件 | 作用 |
|---|---|
| `guide.md` | 说明如何沉淀核心对象、核心关系、核心流程和项目成立模型。 |

### `L4-product/`

L4 Product 相关规则。

| 文件 | 作用 |
|---|---|
| `guide.md` | 说明如何把 L3 核心模型落成产品功能、功能边界、用户可见行为和实现入口。 |

### `L5-dev/`

L5 Dev 相关规则和前端专项指引。

| 文件 | 作用 |
|---|---|
| `guide.md` | L5 工程规则写作和维护指引。 |
| `template.md` | L5 文档模板。 |
| `example.md` | L5 示例。 |
| `vue-case-create-guide.md` | 创建 Vue / Nuxt 纯前端 case 时的专项拆解规则。 |
| `vue-architecture-diagram-guide.md` | Vue 组件架构图、Mermaid 图的设计边界和画法规则。 |
| `vue-provider-guide.md` | Vue `useXxx`、provide/inject、数据源和字段对齐相关规则。 |

### `adoc/`

AIPD 项目认知文件模板。

```text
adoc/
└── templates/
    ├── index.md
    ├── map.md
    ├── inbox.md
    ├── sop-index.md
    └── sop-map.md
```

| 文件 | 作用 |
|---|---|
| `templates/index.md` | 初始化项目 `_adoc/index.md` 的模板。 |
| `templates/map.md` | 初始化项目 `_adoc/map.md` 的模板。 |
| `templates/inbox.md` | 初始化项目 `_adoc/inbox.md` 的模板。 |
| `templates/sop-index.md` | 初始化项目 `_adoc/sop/index.md` 的模板。 |
| `templates/sop-map.md` | 初始化项目 `_adoc/sop/map.md` 的模板。 |

### `agent-entry/`

Agent 入口模板。

| 文件 | 作用 |
|---|---|
| `template.md` | 注入到目标项目 `AGENTS.md` / `CLAUDE.md` 的 AIPD 项目入口规则模板。 |
| `interaction-style.md` | 可选交互风格规则，用于控制讨论 / 执行切换和回复结构。 |

### `agent-guides/`

平台无关的角色 Agent 领域指引。

| 文件 | 作用 |
|---|---|
| `aipd_vue_architect.md` | Vue 架构执行 Agent 指引，偏页面 / 组件结构和实现边界。 |
| `aipd_vue_provider.md` | Vue Provider 执行 Agent 指引，偏数据源、字段、组合式逻辑和接口对齐。 |

这些文件可被 Codex custom agent 使用，也可在平台不支持 custom agent 时作为普通 worker 的降级指引。

### `case/`

Case / Step 体系的公共规则和模板。

```text
case/
├── overview.md
├── step-context-isolation.md
└── templates/
    ├── case.md
    ├── index.md
    └── step.md
```

| 文件 | 作用 |
|---|---|
| `overview.md` | Case / Step 的基本模型、职责边界和执行逻辑。 |
| `step-context-isolation.md` | Step 上下文隔离规则，避免每一步无限继承前文。 |
| `templates/case.md` | 新 case 文件模板。 |
| `templates/index.md` | case 索引模板。 |
| `templates/step.md` | step 文件模板。 |

### `okr/`

OKR 相关规则和模板。

| 文件 | 作用 |
|---|---|
| `guide.md` | OKR 的维护和使用说明。 |
| `templates/index.md` | `_adoc/okr/index.md` 模板。 |

## `src/platforms/`

`src/platforms/` 存放不同 Agent 平台的差异适配。构建时，如果某个注入文件在平台目录中存在，会优先使用平台版本；否则使用 `src/core/` 中的通用版本。

```text
src/platforms/
├── claude/
│   └── core/
└── codex/
    ├── agents/
    └── core/
```

### `platforms/claude/core/agent-guide.md`

Claude Code 平台的 Agent 协作说明。它会覆盖或补充通用 `src/core/agent-guide.md` 中的抽象规则，使构建出的 Claude skill 更贴合 Claude Code 的能力边界。

### `platforms/codex/core/agent-guide.md`

Codex 平台的 Agent 协作说明。它描述 Codex custom agents、分身 Agent、角色 Agent、fallback 到领域指引等规则。

### `platforms/codex/agents/`

Codex custom agent 模板源码。

| 文件 | 作用 |
|---|---|
| `aipd_vue_architect.toml` | Vue 架构 Agent 模板。构建时会把对应 `instructions_file` 展开成 `developer_instructions`。 |
| `aipd_vue_provider.toml` | Vue Provider Agent 模板。构建时会把对应领域指引写入 agent 产物。 |

构建后的 agent 文件输出到 `dist/codex/agents/`。

## `src/skills/`

`src/skills/` 存放每个可安装 skill 的源码。每个子目录至少包含一个 `SKILL.md`，目录名应和 `SKILL.md` frontmatter 中的 `name` 保持一致。

```text
src/skills/
├── aipd/
├── aipd-case-create/
├── aipd-case-run/
├── aipd-case-archive/
├── aipd-weave/
├── aipd-inbox/
├── aipd-learn/
├── aipd-update/
├── aipd-git-push/
└── aipd-mermaid/
```

### `aipd/`

AIPD 总入口。它负责判断当前项目是否已经初始化、是否需要加载 `_adoc/`、是否应该进入 case-create、case-run、update、weave、learn、inbox 等具体流程。

重点文件：

| 文件 | 作用 |
|---|---|
| `SKILL.md` | 总入口 skill 规则。 |
| `references/scan-agent.md` | 构建产物中的扫描分身 Agent 指引；源文件位于 `src/skills/aipd/references/`。 |

### `aipd-case-create/`

Case 创建入口。用于把用户讨论中的事项整理为 case，补上下文索引、边界、step 拆分和观察锚点。

重点文件：

| 文件 | 作用 |
|---|---|
| `SKILL.md` | case-create 的执行边界、讨论 / 执行切换规则、case 写入规则。 |

### `aipd-case-run/`

Case 执行入口。用于读取当前 case 和 step，把 step 派发给分身 Agent 或角色 Agent，收集执行结果并写回状态。

重点文件：

| 文件 | 作用 |
|---|---|
| `SKILL.md` | case-run 的状态恢复、step 派发、验收和停止规则。 |
| `references/worker-dev.md` | 开发执行 worker 指引。 |
| `references/worker-research.md` | 调研执行 worker 指引。 |

### `aipd-case-archive/`

Case 归档入口。用于整理完成状态、Weave Candidate、case 索引和归档移动。

重点文件：

| 文件 | 作用 |
|---|---|
| `SKILL.md` | case 归档主流程。 |
| `references/worker-archive.md` | 归档 worker 指引。 |

### `aipd-weave/`

反向编织入口。用于把讨论、开发、step 结果、case 归档、错误日志或外部资料中的稳定信息回写到 `_adoc/`、局部 README、map 或 case 记录。

重点文件：

| 文件 | 作用 |
|---|---|
| `SKILL.md` | weave 的候选识别、回写方案、用户确认和写入规则。 |

### `aipd-inbox/`

低承诺度收件箱入口。用于用户明确说“先记一下 / 放 inbox / 回头再整理”时，把材料追加到 `_adoc/inbox.md`。

重点文件：

| 文件 | 作用 |
|---|---|
| `SKILL.md` | inbox capture 的触发边界和写入规则。 |

### `aipd-learn/`

AIPD 框架自迭代入口。默认只采集 Codex 会话 ID / transcript path 等最小定位信息；用户明确要求时，再生成框架经验回流包。

重点文件：

| 文件 | 作用 |
|---|---|
| `SKILL.md` | learn 的最小定位、经验分类、回流包和写回规则。 |

### `aipd-update/`

已有项目 AIPD 架构升级入口。用于审计目标项目的 `AGENTS.md`、`_adoc/index.md`、`_adoc/map.md`、case 模板和相关规则是否符合当前 AIPD 标准。

重点文件：

| 文件 | 作用 |
|---|---|
| `SKILL.md` | update 的审计清单、破坏性更新边界和安全合并规则。 |

### `aipd-git-push/`

Git push 辅助入口。只做状态检查、提交摘要、分支确认和 push，不做 add / commit / merge / rebase / stash。

重点文件：

| 文件 | 作用 |
|---|---|
| `SKILL.md` | git push 的只读检查和推送规则。 |

### `aipd-mermaid/`

Mermaid / `.mmd` 架构图入口。用于创建、修改、评审 Mermaid 图，或在用户明确要求时渲染预览。

重点文件：

| 文件 | 作用 |
|---|---|
| `SKILL.md` | Mermaid 图的写作、评审、渲染边界。 |
| `scripts/render_mermaid.py` | Mermaid 渲染辅助脚本。 |

## 构建机制

`scripts/build` 的核心流程：

1. 清理目标平台的 `dist/{platform}/skills/`。
2. 遍历 `src/skills/*/`。
3. 复制每个 skill 源码目录到 `dist/{platform}/skills/{skill-name}/`。
4. 读取 `SKILL.md` 中的 `inject-from-core` 列表。
5. 将对应 `src/core/` 或 `src/platforms/{platform}/core/` 文件复制到产物的 `references/` 中。
6. 如果是 Codex 平台，额外构建 `src/platforms/codex/agents/*.toml` 到 `dist/codex/agents/`。

平台覆盖规则：

- 如果 `src/platforms/{platform}/core/{path}` 存在，优先注入平台版本。
- 否则注入 `src/core/{path}` 的通用版本。

这让同一个 skill 源码可以为 Claude 和 Codex 生成不同的运行参考材料。

## 修改入口建议

| 目标 | 优先修改位置 |
|---|---|
| 改 `/aipd` 总入口路由 | `src/skills/aipd/SKILL.md` |
| 改 case 创建规则 | `src/skills/aipd-case-create/SKILL.md`、`src/core/case/` |
| 改 case 执行 / 分身派发规则 | `src/skills/aipd-case-run/SKILL.md`、`src/core/agent-guide.md`、`src/platforms/*/core/agent-guide.md` |
| 改项目初始化模板 | `src/core/agent-entry/template.md`、`src/core/adoc/templates/` |
| 改 map / inbox / SOP 模板 | `src/core/adoc/templates/` |
| 改 Vue 角色 Agent 规则 | `src/core/agent-guides/`、`src/core/L5-dev/vue-*.md`、`src/platforms/codex/agents/` |
| 改 Codex agent 产物 | `src/platforms/codex/agents/` 和对应 `src/core/agent-guides/` |
| 改构建或安装行为 | `scripts/build`、`scripts/install*`、`scripts/dev*` |

## 验证建议

修改 `aipd-skill/` 后，至少运行：

```bash
./aipd-skill/scripts/build
```

如果改了安装脚本，再按目标平台单独验证：

```bash
./aipd-skill/scripts/build claude
./aipd-skill/scripts/build codex
```

不要默认运行 install 脚本。install 会改写用户级或项目级 Agent 运行环境，应在用户明确确认后再执行。

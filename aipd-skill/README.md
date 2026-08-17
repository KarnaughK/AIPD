# AIPD Skill 源码目录

`aipd-skill/` 是 AIPD 的可构建能力源码。它维护平台无关的框架规则、九个公共 Skill、Codex 适配、角色 Agent、构建脚本和安装产物。AIPD 自身使用的仓库级 `aipd-learn` 位于根目录 `.agents/skills/`，不属于这里的构建和安装集合。

它不是项目 `_aipd/` 工作区：前者定义 AIPD 怎样运行，后者保存某个具体项目的 Knowledge、Map、SOP、Case、OKR 和 Inbox。

本目录只承载需要对外构建和安装的全局 / 公共能力。仅服务 AIPD 源码仓库的项目级 Skill 直接放在仓库根 `.agents/skills/`，目录本身就是源码与运行体，不在本目录建立镜像，也不进入 build、dist 或 install。

## 目录总览

```text
aipd-skill/
├── src/       # 公共 Skill、共享规则与平台适配的源码事实源
├── scripts/   # 构建、校验、迁移和安装脚本
└── dist/      # 生成产物；由 build 重建，不手改
```

## `src/core/`

`src/core/` 保存平台无关的公共规则，通过各 Skill 的 `inject-from-core` 构建到 `references/`。

```text
src/core/
├── overview.md
├── aipd-project-structure.md
├── ai-friendly-code-topology.md
├── knowledge/
│   ├── intent/
│   ├── research/
│   ├── core/
│   ├── product/
│   └── engineering/
├── workspace/
│   ├── project-state.md
│   └── templates/
│       ├── manifest.json
│       ├── index.md
│       ├── map.md
│       ├── inbox.md
│       ├── sop-index.md
│       ├── sop-map.md
│       └── update-log.md
├── updates/
│   ├── catalog.json
│   ├── current.md
│   └── releases/
├── agent-entry/
├── agent-guides/
├── case/
├── experience/
├── leader/
└── okr/
```

### 五类 Knowledge 方法

五个目录是并列知识域，不是推进层级：

| 目录 | 负责的长期认知 |
|---|---|
| `knowledge/intent/` | 项目方向、目标、边界和长期取舍 |
| `knowledge/research/` | 用户、场景、痛点、竞品、行业范式和外部调研 |
| `knowledge/core/` | 核心对象、关系、流程、领域语言和项目成立模型 |
| `knowledge/product/` | 产品功能、边界、业务规则和用户可见行为 |
| `knowledge/engineering/` | 产品到代码之间的跨模块工程逻辑、平台规则和专项指引 |

真实代码不属于第六个知识域，继续留在具体项目源码目录。

### Workspace 模板

`workspace/templates/` 负责初始化项目 `_aipd/`：

| 文件 | 生成位置 |
|---|---|
| `manifest.json` | `_aipd/manifest.json`，同时声明 AIPD Project Schema 与最后成功应用的 AIPD 发布版本 |
| `index.md` | `_aipd/index.md` |
| `map.md` | `_aipd/map.md` |
| `inbox.md` | `_aipd/inbox.md` |
| `sop-index.md` | `_aipd/sop/index.md` |
| `sop-map.md` | `_aipd/sop/map.md` |
| `update-log.md` | `_aipd/update-log.md`，记录项目实际完成的版本跃迁、验证与保留差异 |

### 项目状态与版本化 Update

- `workspace/project-state.md`：普通 AIPD 读写前的安全与版本 gate；区分 absent、legacy、unversioned-v2、stale、current、future-project 和 invalid。
- `updates/catalog.json`：本机 AIPD 发布版本唯一机器事实源，索引连续 Release Records、`current.md` 和 current authority。
- `updates/current.md`：说明如何读取演进记录后，以当前权威与项目定制做一次最终态语义收敛。
- `updates/releases/`：记录版本演进、替代关系、保护点与风险，不是逐版执行脚本。

`schemaVersion` 只表示 Workspace 数据形状，`aipdVersion` 表示项目最后成功应用的完整 AIPD 发布。一次性 `migrate-project-schema` 只把旧 `_adoc` 切换为精确两键的 `unversioned-v2`；只有 `aipd-update` 完成语义合并与验证后，才写 `aipdVersion=I` 和 `_aipd/update-log.md`。

### Agent Entry 与角色指引

- `agent-entry/template.md`：注入目标项目 `AGENTS.md` 的 AIPD 入口规则。
- `agent-entry/interaction-style.md`：可选的项目级讨论 / 执行回复协议。
- `agent-guides/aipd_context_retriever.md`：从 Knowledge、SOP、必要流程状态、局部 README 和代码入口压缩任务上下文。
- `agent-guides/aipd_product_manager.md`：Case Design requirements 角色。
- `agent-guides/aipd_vue_architect.md`：Vue 页面、组件、交互和状态架构角色。
- `agent-guides/aipd_vue_provider.md`：Vue provider/controller、数据源和字段契约角色。

这里共有 4 份平台无关角色指引。Codex 当前只把 `aipd_context_retriever`、`aipd_vue_architect`、`aipd_vue_provider` 这 3 个角色装配为 custom Agent；`aipd_product_manager` 目前只作为 Case Design 按需读取的领域指引。

### Case、Leader、经验与 OKR

- `case/`：Case Contract、Think / Design / Execute / Verify / Close、Work Package 模板和 worker 指引。
- `leader/`：显式 Leader 模式的 Mission、方向澄清、工作记忆和平台运行时合同。
- `experience/`：真实项目已经跑过的具象经验；实现型源码资产另放根级 `experience-assets/`。
- `okr/`：飞书 OKR 规则、CLI 入口和模板。

## `src/platforms/`

```text
src/platforms/
├── codex/
│   ├── core/
│   │   ├── agent-guide.md       # Main / Child、角色选择与降级规则
│   │   └── leader/runtime.md    # Leader 创建同级 Case task 的 Codex 合同
│   └── agents/                  # 3 个 Codex custom agent 元数据
└── cursor/
    └── core/leader/runtime.md   # Cursor Leader + cursor-agent Case 执行层
```

当前默认构建 Codex。目录仍按平台隔离；其他平台可以在 `src/platforms/{platform}/` 提供同路径覆盖，未覆盖的内容继续使用公共核心材料。Codex Agent `.toml` 只保存平台元数据，领域规则来自 `src/core/agent-guides/`。

## `src/skills/`

AIPD 当前构建九个公共 Skill：

| Skill | 职责 |
|---|---|
| `aipd` | 项目状态扫描、初始化和 Map-first 最小认知加载 |
| `aipd-case` | Case Contract 与 Think / Design / Execute / Verify / Close 生命周期 |
| `aipd-weave` | 把已完成、已验收的稳定信息回写到正确 Knowledge、Map 或局部 README |
| `aipd-inbox` | 捕获尚未整理归属的临时信息 |
| `aipd-leader` | 仅在用户显式调用时，把当前对话提升为 Leader；Codex 上一个 Case 一个 task，Cursor 上派已登录的 `cursor-agent` |
| `aipd-update` | 读取项目版本与本机发布快照，把 unversioned / stale / current-drift 项目一次语义收敛到当前权威，并保护项目定制 |
| `aipd-okr` | 管理飞书 OKR 并压缩成主 Agent 可用上下文 |
| `aipd-mermaid` | 创建、修改、评审和按需渲染 Mermaid 图 |
| `aipd-git-push` | 检查并推送当前分支，不自动 add / commit / merge / rebase |

每个 Skill 的源码目录至少包含 `SKILL.md`。公共材料只通过 `inject-from-core` 声明注入，不在多个 Skill 中复制维护。

仓库级 `.agents/skills/aipd-learn/` 只服务于 AIPD 源码仓库的框架自迭代。它由 Codex 直接发现，不进入 `src/skills/`、`dist/`、用户级安装或外部项目级安装。

## `scripts/`

| 脚本 | 作用 |
|---|---|
| `build` | 默认构建 Codex 产物；保留多目标扩展能力 |
| `check-dist` | 总验收：校验九个公共 Codex Skill、三个 Codex Agent、仓库级 Learn 隔离、静态 references、源码 / 产物同步、Leader 显式合同、旧语义和通用构建护栏；也会运行 release bundle 与 migrator fixture |
| `check-release-bundle` | 只读校验 release catalog、连续 records、current authority、manifest 模板与 source / dist 打包引用；不访问网络 |
| `check-release-bundle-fixtures` | 用隔离 fixture 验证版本选择、最终态与异常 release bundle 拒绝路径 |
| `migrate-project-schema` | 一次性把旧项目目录转换为 `_aipd/knowledge/*`；不进入日常运行时 |
| `check-schema-migrator` | 用隔离 fixture 验证迁移成功、重复执行和拒绝状态 |
| `legacy-skills` | 安装 / dev 入口共享的已退役 Skill / Agent 清理清单；不是当前能力列表或运行时入口 |
| `dev` / `dev-codex` | Codex 用户级开发 symlink 安装；泛名入口为默认，后者为显式别名 |
| `install` / `install-codex` | Codex 用户级复制安装；泛名入口为默认，后者为显式别名 |
| `install-cursor` | Cursor 用户级复制安装；只写入 `~/.cursor/skills/`，不改泛名 `install`，不写 DSH |
| `install-project` / `install-project-codex` | Codex 指定项目本地安装；泛名入口为默认，后者为显式别名 |

新运行时只认 `_aipd/`。一次性迁移器可以识别旧项目并转换；Skills 不双读、不 fallback。`check-dist`、`check-release-bundle*` 和 `check-schema-migrator` 是本地校验，不执行 install 或远端写入；`dev*` / `install*` 会改变用户级或项目级 Agent 环境，必须获得用户明确确认。

## 构建机制

`scripts/build` 的核心流程：

1. 清理目标平台的 `dist/{platform}/`。
2. 复制 `src/skills/*/` 到对应 Skill 产物，并把一次性迁移器打包进 `aipd/scripts/`。
3. 解析 `inject-from-core`，从平台覆盖或 `src/core/` 注入 references。
4. 为 Codex 构建 `src/platforms/codex/agents/*.toml`。

修改源码后运行：

```bash
./aipd-skill/scripts/build
./aipd-skill/scripts/check-dist
```

`check-dist` 是默认总验收，会覆盖 release bundle 与 Schema migrator fixture。开发版本发布合同或迁移器时，也可以单独运行：

```bash
./aipd-skill/scripts/check-release-bundle-fixtures
./aipd-skill/scripts/check-schema-migrator
```

不要手改 `dist/`。不要默认运行 install；install 会改写用户级或项目级 Agent 环境，必须获得用户明确确认。

## 常用修改入口

| 目标 | 源码位置 |
|---|---|
| 项目识别、初始化和 Map-first 路由 | `src/skills/aipd/SKILL.md` |
| Case 生命周期 | `src/skills/aipd-case/SKILL.md`、`src/core/case/` |
| Leader / Mission / Codex Case 任务调度 | `src/skills/aipd-leader/SKILL.md`、`src/core/leader/`、`src/platforms/codex/core/leader/` |
| 项目目录 Schema 与初始化模板 | `src/core/aipd-project-structure.md`、`src/core/workspace/templates/` |
| 项目状态 gate 与版本化 Update 发布合同 | `src/core/workspace/project-state.md`、`src/core/updates/`、`src/skills/aipd-update/SKILL.md` |
| 五类 Knowledge 方法 | `src/core/knowledge/` |
| Weave / Inbox 等公共 Skill | 对应 `src/skills/{skill}/SKILL.md` |
| 仓库级 Learn | `../.agents/skills/aipd-learn/SKILL.md`；不在 `src/skills/` 建镜像，不 build / install |
| Agent Entry / Interaction Protocol | `src/core/agent-entry/template.md`、`src/core/agent-entry/interaction-style.md` |
| Main / Child 与角色 Agent | `src/core/agent-guides/`、`src/platforms/codex/core/agent-guide.md`、`src/platforms/codex/agents/` |
| Vue 工程专项指引 | `src/core/knowledge/engineering/vue-*.md` |
| 构建与综合校验 | `scripts/build`、`scripts/check-dist` |
| 发布包校验 | `scripts/check-release-bundle`、`scripts/check-release-bundle-fixtures` |
| Schema 迁移与校验 | `scripts/migrate-project-schema`、`scripts/check-schema-migrator` |
| 用户级 / 项目级安装 | `scripts/{dev,install,install-project}` 及 `-codex` 别名；执行前必须获得明确确认 |

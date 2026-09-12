# Design：c34 aipd-init

## Design Intake

- **Case 类型**：docs / process + skill refactor。
- **模式**：quick。
- **主要缺口**：执行边界（Skill 职责、分流启发式、校验路径），不是数据模型或 UI。
- **阻塞级 open**：无。
- **角色**：Main 连续完成；无独立后端 / 前端。
- **代码拓扑**：不新增业务模块边界；不读取拓扑指南作为 init 运行时依赖。`aipd-init` 不再注入 `ai-friendly-code-topology.md`。

## Requirement Contract

### Confirmed

- Skill 名：`aipd-init`。关键词保留 `aipd` / `/aipd` 作为触发别名。
- 只初始化。不是日常总入口。
- 两刀：有没有 `_aipd`/`_adoc`；没有则看有没有代码。
- 空项目：建壳 + 问 Agent MD 等级 + 现有 Intent 方向 / 痛点引导。
- 有代码：建壳 + Agent MD 默认等级 1 + 扫仓库 + 写 map 和 Core / Product / Engineering 短索引。不访谈方向。不写 `intent.md`。
- 已接入且 `P = I`：报告已接入并停止。
- `unversioned-v2` / stale / drift → `aipd-update`。legacy → 迁移器再 Update。invalid / future → 硬停止。
- 初始化成功标记仍是 manifest `aipdVersion = I`。Intent 存在与否不影响成功。
- 不 bump AIPD 发布版本。
- 不自动 install / commit / push。

### Assumed

- 「只有 README / LICENSE / .git 的仓库」按空项目，走方向路径。
- 有代码扫描写的索引是「从代码看见的索引」，允许标来源为仓库扫描，不冒充用户确认的方向。
- Grok / Cursor 的 `/aipd` 能靠 Skill description 关键词命中 `aipd-init`；不另做兼容 Skill 目录。

### Open

- 无阻塞项。宿主 `/goal` 由用户在 TUI 创建；不阻塞本对话推进。

### Non-goals

- 不改五类 Knowledge 目录名。
- 不让 init 生成完整产品规格或工程百科。
- 不把 Mode A 任务加载搬进新 Skill。

## Domain Rules

- 有代码 / 空项目只用于 **absent** 初始化。已接入项目不再用这把刀去补 Intent。
- 扫描不得把猜测写成长期方向。不确定的对象写「待确认」，或只进 map 关键词，不进 Intent。
- 空项目可以没有代码索引；有代码可以没有 Intent。两种都是合法工作区。
- Agent MD 等级 0/1/2 语义不变。有代码路径默认 1，并在结果里说明；空项目仍先问。
- 旧 Skill 目录名 `aipd` 在安装时按 legacy 删除。

## 有代码启发式

忽略：`.git`、`.github`、`.gitignore`、`.editorconfig`、`.vscode`、`.idea`、`LICENSE*`、`README*`、`CHANGELOG*`、`CONTRIBUTING*`、`node_modules`、`dist`、`build`、`vendor`、`target`、`.venv`、`__pycache__`、`coverage`。

**有代码**（任一成立）：

- 存在带文件的源码目录：`src` `app` `lib` `packages` `cmd` `internal` `server` `web` `frontend` `backend` `android` `ios` `services` `api` `pkg`
- 存在软件清单：`package.json` `pnpm-workspace.yaml` `go.mod` `pyproject.toml` `setup.py` `Cargo.toml` `pom.xml` `build.gradle` `composer.json` `Gemfile` `CMakeLists.txt` `*.sln`
- 存在至少一个源码文件：`py` `js` `ts` `tsx` `jsx` `vue` `go` `rs` `java` `kt` `swift` `cs` `php` `rb` `c` `cpp` `h` `m` `mm` `dart` `scala`

否则 **空项目**。

## 有代码扫描与写入

扫描有界：顶层列表、README 前部、软件清单、源码树 1–2 层、少量 `rg`（页面 / 路由 / 主入口），不进 `node_modules`。

写入且保持短：

- `_aipd/map.md`：用真实模块 / 关键词替换占位行；没有的区块留空表，不编例子
- `_aipd/knowledge/core/index.md`：看见的对象、领域词、关系
- `_aipd/knowledge/product/index.md`：看见的功能 / 页面 / 用户能力
- `_aipd/knowledge/engineering/index.md`：技术栈、目录、跨模块约定
- `_aipd/index.md` 对应知识域状态从「待补充」改为「已从代码扫描建立索引」

不写 `intent.md`。Research 默认不写。扫描结束后给用户一份短摘要：看见什么、写了什么、Intent 仍空。

## 空项目路径

保持现行：壳 → 问 Agent MD → 引导 `intent.md`。成功不依赖 Intent 已写入。

## 已接入路径

不再输出 Intent 红灯状态面板，不再推荐创建 Case。一句话说明职责后停止。

## Work Package

1. **wp-01**：目录改名、`aipd-init` Skill、扫描指引、build / check-dist / legacy / migrator 打包
2. **wp-02**：其他 Skill、project-state、知识域指南、工作区模板、Agent Entry 不承担总入口叙事
3. **wp-03**：项目 map / Product / Engineering、README、学习文档、skills-overview

## 不能破坏的行为

- Schema 安全门、manifest 双形态、`P/I`、migrator 一次性、Update 所有权合并
- Case / Leader / Weave / Inbox / OKR 各自入口
- `AGENTS.md` map-first 读取链
- 九个公共 Skill 数量不变（改名不是加 Skill）

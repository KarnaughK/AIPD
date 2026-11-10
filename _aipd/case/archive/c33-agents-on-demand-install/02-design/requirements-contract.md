# Requirements: c33-agents-on-demand-install

状态：confirmed（用户「继续推进」）。brownfield 已扫。

## problem / goal / non-goal

- **problem**：公共 Skill 靠 `src/core` 注入 + `src/platforms/{host}` 覆盖打出内容不同的包；装出去后运行时合同和源码树缠在一起。
- **goal**：每个公共 Skill 是完整安装包。通用正文默认加载；多平台差异在该包 `SKILL.md` 末尾列表里按当前对话宿主读包内文件。目录即产物，安装即复制。
- **non-goal**：不管 custom agent；不揉各家调度 API；不自动删除其它目录里的旧 AIPD Skill；不把 `aipd-learn` 装到用户级；未确认不跑正式 `install*`。

## users / roles

- 在 Codex / Cursor / Grok / Claude 上使用 AIPD 公共 Skill 的人和 Agent。
- 维护 AIPD 源码仓库的人和 Agent。

## functional requirements

| ID | 状态 | 需求 |
|---|---|---|
| R1 | confirmed | 每个公共 Skill 一个文件夹，内含 `SKILL.md`；可有子文件和目录。 |
| R2 | confirmed | YAML 头供宿主扫描；正文在调用时加载；旁路文件要点名才读。 |
| R3 | confirmed | 多平台差异：`SKILL.md` 末尾小列表，一行一个宿主，指向**当前 Skill 包内**相对路径。 |
| R4 | confirmed | Leader：`runtime/{codex,cursor,grok,claude}.md`。Case：通用 `agent-guide.md` + `agent-guide/{host}.md`。 |
| R5 | confirmed | 认宿主 = 当前这条对话，不看 PATH / 本机装了谁。 |
| R6 | confirmed | 列表中的宿主必须有文件；可写「暂不支持」。无差异的 Skill 不加空列表或空目录。 |
| R7 | confirmed | 公共 Skill 目录即产物。安装 = 复制该文件夹。废掉按平台 `dist/{platform}` 和平台覆盖打包。 |
| R8 | confirmed | 必须多包一致的文件只有 `catalog.json`、`project-state.md`。九个公共 Skill 里有八个带这两份（`aipd-git-push` 不带）。原稿在 `aipd-skill/shared/`，校验拿副本对原稿。`aipd-init` 与 `aipd-update` 的共用模板不进 shared，随各自完整包走，brownfield 再列哪些是两家重复。 |
| R9 | confirmed | 默认也是唯一的通用安装：`install-agents` 复制到 `~/.agents/skills`。Codex / Cursor / Grok 都读这里，不再各做品牌安装。 |
| R10 | confirmed | Claude 不读 `~/.agents`，所以另留 `install-claude`，复制同一套到 `~/.claude/skills`。以后若某宿主不兼容 `.agents`，再临时给它写安装，本 Case 不预做。 |
| R11 | confirmed | 装完扫描已知 Skill 目录，发现多份 AIPD 公共 Skill 则提示冲突，不删除。 |
| R12 | confirmed | `SKILL.md` 常驻正文不写别家调度细节。 |
| R13 | confirmed | 本 Case 只给 `aipd-leader` 和 `aipd-case` 加按需目录；其余公共 Skill 不预埋。 |
| R14 | confirmed | 运行时不读仓库源码树。仓库级 `aipd-learn` 仍可在 AIPD 仓库内读源码事实，但不进入用户级安装。 |
| R15 | confirmed | 删除旧安装入口：`install`、`install-codex`、`install-cursor`、`install-project`、`install-project-codex`，以及只为它们服务的 `dev` / `dev-codex`。开发期若还要 symlink，另做指向 `~/.agents/skills` 的入口，不在本节点展开。 |
| R16 | confirmed | 不升 V3。本 Case 改的是本机 Skill 怎么摆、怎么装，不改项目 `_aipd/` 的 Workspace 形状（仍是 `schemaVersion: 2`）。本机发布目录仍是 `currentVersion: 2`；V2 的当前权威文档和工程说明就地改。 |
| R17 | confirmed | 仓库落点：完整 Skill 包在 `aipd-skill/skills/{name}/`，和装出去的文件夹同形。必须多包一致的原稿在 `aipd-skill/shared/`。安装复制 `skills/`，不复制 `shared/`。八个带 gate 的包内仍带 `catalog.json` / `project-state.md` 副本。废 `src/` 拆壳 + `dist/{platform}`。 |
| R18 | confirmed | 公共 Skill 集合以 c34 为准：`aipd-init` 替换 `aipd`，仍是九个。本 Case 不重做初始化分流、有代码扫描或 Intent 门槛；搬家时搬 `aipd-init` 完整包。`/aipd` 仍是 `aipd-init` 的触发别名，不是第四个包。 |

## non-functional

- 列表本身可以进默认上下文，控制在十几行。
- 同一套包复制到任何位置，磁盘内容相同。
- 改共享文件后，校验能发现各 Skill 包副本不一致。

## scope

- **in**：九个公共 Skill（含已改名的 `aipd-init`）的包形态、Leader / Case 按需文件、`install-agents` / `install-claude`、冲突提示、维护者文档和校验脚本对齐。
- **out**：custom agent toml；Claude 方言重做；自动清理旧目录；未确认的正式安装；升 V3；Codex / Cursor / 项目级旧安装入口；重做 c34 的 init 行为。
- **deferred**：某宿主以后若不读 `~/.agents`，再单独写安装。

## acceptance criteria

- 打开仓库里某个公共 Skill 文件夹，应能直接看出装出去长什么样。
- `aipd-leader/SKILL.md` 列表指向 `runtime/codex.md` 等包内文件；正文不再带 Codex 模型表或 `cursor-agent` 步骤。
- `aipd-case` 默认读通用 `agent-guide.md`，派发时再读 `agent-guide/{host}.md`。
- `install-agents` 把 `aipd-skill/skills/` 复制到 `~/.agents/skills`；`install-claude` 复制到 `~/.claude/skills`。
- 仓库里不再有按平台内容不同的 `dist/codex` vs `dist/cursor` Skill 树；旧 `install-codex` / `install-cursor` 入口不存在。
- 校验能抓住共享文件副本漂移。
- 装完若 `~/.cursor/skills` 与 `~/.agents/skills` 各有一份 AIPD，会提示冲突且不删。
- 正式安装仍须用户确认。

## confirmed / assumed / open

### confirmed

上表 R1–R14。Think 用户原话与 2026-09-10「按你说的」为来源。

### assumed

- 现有 `build` / `check-dist` 的「源码注入 + 平台覆盖 + 禁止手改 dist」废止；替换为完整包校验 + 与 `aipd-skill/shared/` 的一致性。
- `install-claude` 不要求本机已登录 Claude。
- `aipd-learn` 仍在 `.agents/skills/aipd-learn/`，不进 `aipd-skill/skills/`。

### open

无阻塞项。brownfield 只扫旧 `src/` / `dist/` / 旧 install 脚本如何迁到 `aipd-skill/skills/` 与 `aipd-skill/shared/`。

## assumptions not to freeze

- 不要把 `aipd-skill/src/`、`aipd-skill/dist/`、`~/.codex/skills`、`~/.cursor/skills` 继续当成默认交付路径。
- 不要把 `catalog.json` 的 `currentVersion` 改成 3。

## 边缘场景

- 宿主在列表中但文件写「暂不支持」：按该文件停止对应能力，不要改读别家文件。
- 宿主不在列表中：通用 Skill 只走通用正文；Leader 不调度 Case 执行层。
- 认不出宿主：不探测 PATH；Leader 停止调度。
- 多份安装：提示可能双读，不自动删。
- 只安装了部分公共 Skill：每个包仍自包含；共享文件一致性只检查已安装/仓库中存在的副本。

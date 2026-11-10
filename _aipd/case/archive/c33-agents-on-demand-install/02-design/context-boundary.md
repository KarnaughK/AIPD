# Context boundary: c33-agents-on-demand-install

状态：confirmed。work package 草案见 `work-package-draft.md`。

## 复杂度爆点

现在真正会把复杂度堆回主干的，是 **build 按平台覆盖成单文件**：同一份 `SKILL.md` 在磁盘上只剩一种宿主合同，正文却还在讲两家。再叠 `src/core` 注入，维护者改一处、产物在另一处，Agent 运行时还可能去读仓库源码。

## 最小必要解耦

每个公共 Skill 做成可独立安装的纵向包。多宿主差异留在**该包内部**的按需目录。只有 `catalog.json` 和 `project-state.md` 升成横向共享原稿；运行时仍然读包内副本，不读 `shared/`。

## Code Topology Contract

- **拓扑敏感**：是
- **纵向业务上下文**：九个公共 Skill 包，每个一项目标（初始化 / Case / Leader / Update / …）。目录 owner 是 `aipd-skill/skills/{name}/`。仓库级 `aipd-learn` 仍在 `.agents/skills/aipd-learn/`，不是本 Case 的纵向上下文。
- **允许的横向依赖**：
  - `aipd-skill/shared/`：两份原稿，只给人和校验用
  - `aipd-skill/scripts/install-agents`、`install-claude`：复制完整包
  - `aipd-skill/scripts/check-skills`：验包集合和副本一致性（替换 `check-dist`）
- **显式组合边界**：
  - 运行时：Agent 只读当前 Skill 包。`SKILL.md` 正文点名通用 `references/`；有平台差异时末尾列表点名包内 `runtime/{host}.md` 或 `agent-guide/{host}.md`
  - 安装时：复制 `skills/*` 到目标目录，不复制 `shared/`
  - 校验时：八个包内 `references/updates/catalog.json` 与 `references/workspace/project-state.md` 必须与 `shared/` 字节一致
  - Skill 之间：只允许「去用另一个 Skill」（如已接入则交给 `aipd-update`），禁止读另一个包的内部文件
- **禁止事项**：
  - `inject-from-core`、平台同路径覆盖、`dist/{platform}`
  - 运行时读 `aipd-skill/src/`、`aipd-skill/shared/` 或 PATH 上别的宿主
  - 把别家调度写进 `SKILL.md` 常驻正文
  - 把 init/update 的模板抬进 `shared/`
  - 在无真实第二宿主实现时预建空的按需目录（无差异的 Skill 不加）
- **共享变化权限**：只允许本 Case 新增的 `shared/` 两文件。默认不准再上移 shared。
- **独立验收边界**：打开 `aipd-skill/skills/aipd-case/` 应能看出装到 `~/.agents/skills/aipd-case/` 的形态；改 Leader 的 Cursor runtime 不必打开 Codex 文件；改 catalog 原稿后校验能抓住未同步副本。
- **认知回写**：Close 后 weave 到 Engineering / Product / map / `aipd-skill/README.md`；Intent「默认 Codex」另判。不把包内文件清单写进 Core。

## 仓库树

```text
aipd-skill/
  skills/
    aipd-init/
    aipd-case/
    aipd-inbox/
    aipd-leader/
    aipd-update/
    aipd-okr/
    aipd-mermaid/
    aipd-weave/
    aipd-git-push/
  shared/
    updates/catalog.json
    workspace/project-state.md
  scripts/
    install-agents
    install-claude
    check-skills
    check-release-bundle
    check-release-bundle-fixtures
    check-schema-migrator
  platforms/codex/agents/          # custom agent toml，本 Case 不装不删
  README.md
```

没有 `src/`，没有 `dist/`。`.agents/skills/aipd-learn/` 不动。

## 单个完整包长什么样

通用文档继续放 `references/`，好让现有 `@references/...` 少改。按需宿主文件贴在 `SKILL.md` 旁边，不进 `references/`。

### `aipd-leader/`

```text
SKILL.md                         # 通用 Leader；末尾列表；无 Codex 模型表、无 cursor-agent 步骤
runtime/
  codex.md                       # 现 platforms/codex/core/leader/runtime.md
  cursor.md                      # 现 platforms/cursor/core/leader/runtime.md
  grok.md                        # 暂不支持
  claude.md                      # 暂不支持
references/
  leader/guide.md
  leader/workspace-template.md
  updates/catalog.json           # 副本
  workspace/project-state.md     # 副本
agents/openai.yaml               # 已有，随包复制
```

列表：

```md
## 按需加载
看本对话所属宿主，只读对应文件。不要看 PATH。
- Codex：`runtime/codex.md`
- Cursor：`runtime/cursor.md`
- Grok：`runtime/grok.md`
- Claude：`runtime/claude.md`
不在上列：不要调度 Case 执行层。
```

废掉公共 `leader/runtime.md` 索引。

### `aipd-case/`

```text
SKILL.md
agent-guide.md                   # 现 src/core/agent-guide.md，派发前默认读
agent-guide/
  codex.md                       # 现 platforms/codex/core/agent-guide.md
  cursor.md                      # 暂无专用覆盖：写清用本宿主子 Agent，规则以通用文件为准
  grok.md                        # 同上或暂不支持
  claude.md                      # 同上或暂不支持
references/
  case/ … experience/ … agent-guides/ …
  ai-friendly-code-topology.md
  overview.md
  updates/catalog.json
  workspace/project-state.md
```

无差异的六个 Skill **不加** `runtime/` 或 `agent-guide/`。

### 其余包（归属）

| 包 | 从哪搬进来（除 catalog / project-state 副本） |
|---|---|
| `aipd-init` | 现 `src/skills/aipd-init/`（含 `references/init-codebase-scan.md`）；`scripts/migrate-project-schema` 放进包内 `scripts/`；现 inject 的模板、intent/research/core/product/engineering guide、agent-entry |
| `aipd-update` | `updates/current.md`、`updates/releases/`；与 init 重叠的模板**各留一份**，不进 shared |
| `aipd-okr` | `okr/guide.md`、`okr/feishu-cli.md` |
| `aipd-mermaid` | 已有 `scripts/render_mermaid.py`；两份 Vue 图指南进 `references/` |
| `aipd-inbox` | inbox 模板 |
| `aipd-weave` | overview、structure、map 模板 |
| `aipd-git-push` | 只有 `SKILL.md`，不带 catalog 副本 |

`migrate-project-schema` 的 owner 是 `skills/aipd-init/scripts/`。`aipd-skill/scripts/` 不再另存一份正文；`check-schema-migrator` 改为调包内脚本。

## 脚本边界

| 文件 | 动作 |
|---|---|
| `install-agents` | 新增。复制 `skills/*` → `~/.agents/skills`。扫描已知目录，提示多份和旧名 `aipd`，不 rm |
| `install-claude` | 新增。同一套 → `~/.claude/skills`，同样只提示 |
| `check-skills` | 新增，取代 `check-dist`。验九个包、Learn 隔离、八个副本 == shared、Leader/Case 列表与正文约束 |
| `check-release-bundle*` | 保留；路径从 dist 改到 `skills/` + `shared/` |
| `check-schema-migrator` | 保留；目标改为包内 migrator |
| `install` `install-codex` `install-cursor` `install-project*` `dev` `dev-codex` `build` | 删除 |
| `legacy-skills` | 可留作「提示时认识旧名」的名单，**禁止 rm** |

已知扫描目录（提示用）：`~/.agents/skills`、`~/.claude/skills`、`~/.codex/skills`、`~/.cursor/skills`、`~/.grok/skills`。

## 允许的局部重复

- 八份 catalog / project-state 副本（运行时自包含）
- `aipd-init` 与 `aipd-update` 的模板双份（两家都会改，但语义可能分叉，不上移）

## 主干职责

`aipd-skill/README.md` 只说明：完整包在 `skills/`，原稿在 `shared/`，安装复制 `skills/`，校验对 `shared/`。不承载各 Skill 正文。

## 下一节点

work-package-draft：按完整包搬家、Leader/Case 按需文件、安装脚本、校验与文档切开，而不是按「先 build 再 install」旧流水线切。

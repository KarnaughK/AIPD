# Brownfield: c33-agents-on-demand-install

状态：confirmed。文件边界见 `context-boundary.md`。

## 当前实现事实

仓库仍是三层：`src/skills`（几乎只有 `SKILL.md`）+ `src/core`（65 个文件，build 注入）+ `src/platforms/{host}`（同路径覆盖）→ `dist/{platform}/skills`。默认只打 Codex。`dist/cursor` 不存在，现有 `install-cursor` 会先 `build cursor` 再装。

公共 Skill 集合已是 c34 结果，九个：

`aipd-init`、`aipd-case`、`aipd-inbox`、`aipd-leader`、`aipd-update`、`aipd-okr`、`aipd-mermaid`、`aipd-weave`、`aipd-git-push`

八个带 `catalog.json` 与 `project-state.md`。`aipd-git-push` 的 `references/` 基本是空的。

| 层 | 现在干什么 | 本 Case 之后 |
|---|---|---|
| `src/skills/{name}/SKILL.md` | 壳 + `inject-from-core` | 废注入键；完整包在 `aipd-skill/skills/{name}/` |
| `src/core/` | 单 Skill 文档和多包副本的真正正文 | 拆进各完整包；只留两份进 `shared/` |
| `src/platforms/codex/core/` | 覆盖 `agent-guide.md`、`leader/runtime.md`；另有 3 个 custom agent toml | 覆盖废掉。runtime / agent-guide 变包内按需文件。toml 本 Case 不管 |
| `src/platforms/cursor/core/` | 只覆盖 `leader/runtime.md` | 变成 `aipd-leader/runtime/cursor.md` |
| `dist/codex/` | 生成物，禁止手改 | 整层删除 |
| `scripts/build` | 复制壳、注入、平台覆盖、剥 YAML、打 toml | 不再为 Skill 打包。至多留「把 shared 副本同步进八个包」的校验辅助 |
| `scripts/check-dist` | 验九个 Codex Skill、源码/产物同步、inject 已剥、Learn 隔离 | 改成验完整包 + 八个副本与 `shared/` 一致 |
| `install` → `install-codex` | build 后写入 `~/.codex/skills` + `~/.codex/agents`，并 **rm** legacy 名单 | 删除 |
| `install-cursor` | build cursor 后写入 `~/.cursor/skills`，同样 rm legacy | 删除 |
| `install-project*` / `dev*` | Codex 项目级 / symlink | 删除 |
| `legacy-skills` | 含旧名 `aipd`、`aipd-learn` 等，install 时删除 | 本 Case 安装不自动删。旧名 `aipd` 只提示 |

Leader 现状：公共 `src/core/leader/runtime.md` 是会漏两家细节的索引；Codex / Cursor 各有一份完整 runtime；`SKILL.md` 正文仍写 Codex 模型表和 `cursor-agent` 步骤，并写「当前构建注入的就是本平台合同」。Case 现状：通用 `agent-guide.md` 46 行，Codex 覆盖 188 行；Cursor / Grok / Claude 没有 agent-guide 覆盖。

本机：`~/.agents/skills/` 仍有 bootstrap 的旧名 `aipd`，没有 `aipd-init`，没有 `aipd-leader`。这是安装残留，不是源码事实。

## 迁入完整包的归属（事实，不是最终目录名冻结）

只属于一个 Skill、应随该包走（现在却放在 `src/core`）：

| 完整包 | 现在的 core / skill 旁路 |
|---|---|
| `aipd-init` | `src/skills/aipd-init/`（含 `init-codebase-scan.md`）；build 再打进 `scripts/migrate-project-schema`；inject 的 workspace 模板、intent 方法、agent-entry |
| `aipd-case` | `src/core/case/`、`experience/`、`agent-guides/`、`agent-guide.md`、`ai-friendly-code-topology.md` |
| `aipd-leader` | `src/core/leader/guide.md`、`workspace-template.md`；平台 `runtime.md` |
| `aipd-okr` | `src/core/okr/guide.md`、`feishu-cli.md` |
| `aipd-mermaid` | 包内 `scripts/render_mermaid.py`；inject 的两份 Vue 图指南 |
| `aipd-inbox` | inbox 模板 |
| `aipd-weave` | 少量 overview / structure / map 模板 |
| `aipd-update` | `src/core/updates/` 除 catalog 外的 current + releases；大量模板（与 init 重叠，见下） |
| `aipd-git-push` | 只有 `SKILL.md` |

`shared/` 只收两份原稿：

- `src/core/updates/catalog.json`
- `src/core/workspace/project-state.md`

`aipd-init` 与 `aipd-update` 现在有约 20 个相同 references（模板、Knowledge 方法、agent-entry）。按契约**不进 shared**，两家完整包各留一份。这是允许的重复，brownfield 记下，context-boundary 不要把它们抬进 shared。

## ADDED

- `aipd-skill/skills/{九个 name}/`：完整安装包
- `aipd-skill/shared/updates/catalog.json`
- `aipd-skill/shared/workspace/project-state.md`
- `aipd-leader/runtime/{codex,cursor,grok,claude}.md`
- `aipd-case/agent-guide.md`（通用）+ `agent-guide/{codex,cursor,grok,claude}.md`
- `scripts/install-agents`、`scripts/install-claude`
- 校验：完整包集合、八个副本与 shared 一致、Leader/Case 列表指向包内路径、`SKILL.md` 无别家调度正文
- 安装后扫描已知 Skill 目录并**提示**多份 / 旧名 `aipd`，不删除

## MODIFIED

- 九个 `SKILL.md`：去掉 `inject-from-core`；有平台差异的在末尾加按需列表；Leader / Case 正文去掉别家调度细节
- `aipd-skill/README.md`、`docs/modules/build-and-install.md`、Engineering / Product / map：交付改为 `~/.agents` + 目录即产物
- `check-dist`（或改名）不再验 `dist/{platform}` 和平台覆盖
- `check-release-bundle` 对 dist 路径的引用
- Intent「默认 Codex 交付」不在本 Case 改，Close 交 weave

## REMOVED

- `aipd-skill/dist/`
- 作为 Skill 编译器的 `scripts/build` 平台覆盖 / inject 流程
- `scripts/install`、`install-codex`、`install-cursor`、`install-project`、`install-project-codex`、`dev`、`dev-codex`
- `src/skills` 壳 + `src/core` 作为注入库（内容迁走，不是丢文档）
- `src/platforms/*/core/` 对 Skill 的覆盖（toml 留下不管）
- 公共 `leader/runtime.md` 那份漏细节的索引

## 不能破坏的旧行为

- c34：`aipd-init` 的空项目 / 有代码分流、已接入则停止、`/aipd` 别名
- 仓库级 `.agents/skills/aipd-learn/` 不进用户级安装
- 项目 `_aipd/` Schema 与 `aipdVersion: 2` / `currentVersion: 2`
- custom agent toml 本 Case 不删不装
- 已装在 `~/.codex/skills`、`~/.cursor/skills` 的 AIPD **不自动删**
- 未确认不跑正式 install

## 风险

- `legacy-skills` 在旧 install 里会 rm 旧名 `aipd`。新 install 只提示的话，本机可能同时存在 `aipd` 和 `aipd-init`。按契约接受，提示文案要写清这是改名残留。
- `aipd-init` 与 `aipd-update` 模板双份，改模板要改两处。不升格为 shared。
- 现有 `check-dist` 大部分断言绑在 `dist/codex`。废 dist 后这些断言要重写，不是删掉校验。
- Leader / Case 的 Grok、Claude 按需文件本轮要有正文，至少写「暂不支持」。

## 下一节点要用的输入

context-boundary 按上表切文件夹：完整包长什么样、shared 只有两文件、按需目录贴在 Leader / Case 包内、旧 src/dist/install 怎么拆。

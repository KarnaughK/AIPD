# Work package 草案: c33-agents-on-demand-install

状态：confirmed。已收成 `03-execute/work-packages/` 正式施工单。

四包活，按顺序：先把完整包装出来，再并行做按需文件和安装脚本，最后收掉旧 build 并改校验/文档。

依据：`02-design/requirements-contract.md`、`02-design/brownfield-delta.md`、`02-design/context-boundary.md`。

---

## 包 1：九个完整包搬家

**要交付的结果**：仓库里出现 `aipd-skill/skills/{九个名字}/`，打开任意一个文件夹就能看出装出去长什么样。`shared/` 里放好 `catalog.json` 和 `project-state.md` 原稿；八个包的副本和原稿一致。

**怎么做**：按现有 `inject-from-core` 把 `src/core` 的通用文件搬进对应包的 `references/`（不要用平台覆盖）。`SKILL.md` 去掉 `inject-from-core`。`aipd-init` 带上 `init-codebase-scan.md` 和包内 `scripts/migrate-project-schema`。`aipd-git-push` 只有 `SKILL.md`。

**拓扑**：每个 Skill 包是一块独立上下文。只允许新建 `shared/` 那两份原稿。禁止运行时去读 `src/` 或 `shared/`。

**验收**：
- `aipd-skill/skills/` 下正好九个包，含 `aipd-init`，没有旧名 `aipd`
- 八个包内 catalog / project-state 与 `shared/` 字节相同
- `SKILL.md` 没有 `inject-from-core`
- 不改 Leader/Case 的宿主调度正文（那是包 2）
- 不删 `src/` `dist/`（那是包 4）

**不做**：不写按需目录；不写 install；不跑正式安装；不改 c34 的 init 分流。

**依赖**：无。

---

## 包 2：Leader / Case 按需文件

**要交付的结果**：只有这两个 Skill 在 `SKILL.md` 旁边有按需目录。Agent 按当前对话宿主只读自己那一份。

**怎么做**：
- `aipd-leader/runtime/{codex,cursor,grok,claude}.md`：前两份从现有平台 runtime 搬；Grok / Claude 写「暂不支持」
- `aipd-case/agent-guide.md` 用现在的通用文件；`agent-guide/codex.md` 用现在的 Codex 覆盖；Cursor / Grok / Claude 各写一份（无专用调度就写清走通用规则 + 本宿主子 Agent，或暂不支持）
- Leader / Case 的 `SKILL.md` 末尾加列表，正文删掉 Codex 模型表、`cursor-agent` 步骤、「当前构建注入的就是本平台合同」
- 废掉公共 `leader/runtime.md` 那份会漏细节的索引

**拓扑**：按需文件只属于该 Skill 包。禁止把宿主文件放到 `shared/` 或 `src/platforms` 再覆盖。

**验收**：
- Leader 正文不再带别家调度细节
- 列表路径是包内相对路径
- 无差异的六个 Skill 没有空的 `runtime/` / `agent-guide/` 目录

**不做**：不改 init 逻辑；不装到本机。

**依赖**：包 1。

---

## 包 3：安装入口

**要交付的结果**：只剩 `install-agents` 和 `install-claude`。复制的是 `aipd-skill/skills/`，不是 dist。

**怎么做**：
- `install-agents` → `~/.agents/skills`
- `install-claude` → `~/.claude/skills`
- 装完扫描 `~/.agents`、`~/.claude`、`~/.codex`、`~/.cursor`、`~/.grok` 的 skills 目录；发现多份或旧名 `aipd` 就打印提示，**不 rm**
- 删除 `install`、`install-codex`、`install-cursor`、`install-project*`、`dev`、`dev-codex`
- `legacy-skills` 若还留着，只给提示认旧名，禁止再当删除清单

**验收**：读脚本能看出只复制、只提示；仓库里找不到旧 install 入口。

**不做**：本包不执行正式 install（要你另外点头）。不装 custom agent。

**依赖**：包 1（复制完整包）。可与包 2 并行。

---

## 包 4：校验、拆旧层、文档

**要交付的结果**：没有 `src/` 注入、没有 `dist/`、没有按平台 `build`。校验对着完整包和 `shared/` 跑。维护者文档和真实脚本一致。

**怎么做**：
- 用 `check-skills` 替换 `check-dist`：九个包、Learn 隔离、八个副本 == shared、Leader/Case 列表和正文约束
- `check-release-bundle*`、`check-schema-migrator` 改指向 `skills/` 与包内 migrator
- 删除 `scripts/build`、`dist/`、已经搬空的 `src/skills`、`src/core`、`src/platforms/*/core/`（`platforms/codex/agents/*.toml` 留下）
- 改 `aipd-skill/README.md`、`docs/modules/build-and-install.md`、Engineering / Product / map 里还在写 Codex dist 的句子
- 不改 `intent.md`（Close 再 weave）

**验收**：在仓库里搜不到作为交付路径的 `dist/codex`、`inject-from-core`、`~/.codex/skills` 默认安装。`check-skills` 能过。

**不做**：不升 V3；不改项目 `_aipd/` Schema；不重做 c34。

**依赖**：包 1、2、3。

---

## 顺序

```text
包 1 搬家
   ├─ 包 2 按需文件
   └─ 包 3 安装脚本
         └─ 包 4 校验 / 拆旧 / 文档
```

## 还没做的

- 正式施工单已建。后续以 `03-execute/` 为准。

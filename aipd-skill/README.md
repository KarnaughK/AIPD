# AIPD Skill 源码目录

`aipd-skill/` 维护九个公共 Skill 的完整安装包。目录即产物，安装即复制。仓库级 `aipd-learn` 在根目录 `.agents/skills/`，不进这里，也不进用户级安装。

它不是项目 `_aipd/` 工作区：这里定义 AIPD 怎样运行，`_aipd/` 保存某个具体项目的 Knowledge、Map、SOP、Case、OKR 和 Inbox。

## 目录总览

```text
aipd-skill/
├── skills/      # 九个完整安装包；打开即装出去的形态
├── shared/      # 只放 catalog.json 与 project-state.md 原稿
├── scripts/     # install-agents、install-claude、check-skills
└── platforms/codex/agents/  # custom agent toml；本树不装不删
```

没有 `src/`，没有 `dist/`，没有按平台 `build`。

## 完整包

九个公共 Skill：

| Skill | 职责 |
|---|---|
| `aipd-init` | 把 AIPD 装进项目：空项目走方向 / 痛点，有代码则扫仓库并补 map 与 Core / Product / Engineering 索引 |
| `aipd-case` | Case Contract 与 Think / Design / Execute / Verify / Close 生命周期 |
| `aipd-weave` | 把已完成、已验收的稳定信息回写到正确 Knowledge、Map 或局部 README |
| `aipd-inbox` | 捕获尚未整理归属的临时信息 |
| `aipd-leader` | 仅在用户显式调用时，把当前对话提升为 Leader；调度读包内 `runtime/{host}.md` |
| `aipd-update` | 读取项目版本与本机发布快照，一次语义收敛到当前权威 |
| `aipd-okr` | 管理飞书 OKR 并压缩成主 Agent 可用上下文 |
| `aipd-mermaid` | 创建、修改、评审和按需渲染 Mermaid 图 |
| `aipd-git-push` | 检查并推送当前分支，不自动 add / commit / merge / rebase |

运行时只读当前 Skill 包。有平台差异的 Skill 在 `SKILL.md` 末尾列包内按需文件；Agent 按当前对话宿主只读那一份。

`shared/` 只给人和校验用，安装不复制，运行时不读。八个包各留 catalog / project-state 副本；`aipd-git-push` 不带。`aipd-init` 与 `aipd-update` 的模板各留一份，不上移 shared。

## `scripts/`

| 脚本 | 作用 |
|---|---|
| `install-agents` | 复制 `skills/*` → `~/.agents/skills`。扫描已知目录，提示多份和旧名 `aipd`，不 rm |
| `install-claude` | 同一套 → `~/.claude/skills`，同样只提示 |
| `check-skills` | 总验收：九个完整包、Learn 隔离、八个副本与 shared 一致、Leader/Case 按需文件、安装入口、release bundle、migrator fixture |
| `check-release-bundle` | 只读校验 release catalog、连续 records、current authority |
| `check-release-bundle-fixtures` | 隔离 fixture 验证版本选择与异常拒绝 |
| `check-schema-migrator` | 调包内 `skills/aipd-init/scripts/migrate-project-schema` |
| `legacy-skills` | 旧名识别名单，安装只用来提示，禁止 rm |

修改完整包后运行：

```bash
./aipd-skill/scripts/check-skills
```

不要默认运行 install。install 会改写用户级 Agent 环境，必须获得用户明确确认。

## 常用修改入口

| 目标 | 位置 |
|---|---|
| 项目初始化 | `skills/aipd-init/` |
| Case 生命周期 | `skills/aipd-case/` |
| Leader 调度 | `skills/aipd-leader/SKILL.md`、`runtime/{host}.md` |
| 项目状态 gate | `shared/workspace/project-state.md`、`shared/updates/catalog.json` |
| Update 发布合同 | `skills/aipd-update/references/updates/` |
| 仓库级 Learn | `../.agents/skills/aipd-learn/SKILL.md` |
| 安装 / 校验 | `scripts/install-agents`、`scripts/install-claude`、`scripts/check-skills` |

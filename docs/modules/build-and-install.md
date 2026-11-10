# 构建与安装

AIPD 仓库本身不是打开即用的应用，而是一套完整 Skill 安装包。

九个公共 Skill 位于 `aipd-skill/skills/`。打开仓库里的 Skill 文件夹就等于打开装出去的形态。安装是复制这一棵树。仅供 AIPD 自身迭代的 `aipd-learn` 位于 `.agents/skills/aipd-learn/`，不参与公共安装。

## 两类 Skill

| 类型 | 位置 | 安装 |
|---|---|---|
| 全局 / 公共 Skill | `aipd-skill/skills/{name}/` | 复制到 `~/.agents/skills` 或 `~/.claude/skills` |
| 项目 / 仓库级 Skill | `.agents/skills/{skill}/` | 目录本身就是源码和运行体；不进公共安装 |

`aipd-skill/shared/` 只放 `catalog.json` 与 `project-state.md` 原稿，给人和校验用。安装不复制它。

## 推荐使用方式

普通用户不需要手工背命令。用当前 Agent 打开本项目，说明要把 AIPD 装到本机 Skill 目录。Agent 应先读 `AGENTS.md` → `_aipd/index.md` → `_aipd/map.md`，再进入 `aipd-skill/scripts/`。

只有在 AIPD 源码仓库内进行框架自迭代时，才进入 `.agents/skills/aipd-learn/`。

## 脚本入口

```bash
# 修改完整包后只读校验
./aipd-skill/scripts/check-skills

# 用户级安装到 ~/.agents/skills（Codex / Cursor / Grok 共用）
./aipd-skill/scripts/install-agents

# 同一套复制到 ~/.claude/skills
./aipd-skill/scripts/install-claude
```

没有 `build`，没有 `dist/{platform}`，没有 `install-codex` / `install-cursor`。安装完成后若发现多份 AIPD Skill 或旧名 `aipd`，脚本只打印提示，不自动删除。

Agent 修改完整包后可以直接运行 `check-skills`。不要默认执行 install；只有用户明确确认后才运行 `install-agents` 或 `install-claude`。

## 旧项目一次性迁移

Knowledge Schema v2 不提供运行时双读。仍使用 `_adoc/` 与 L1-L5 目录的项目，需要先用一次性迁移器原子切换。

```bash
./aipd-skill/skills/aipd-init/scripts/migrate-project-schema --dry-run /absolute/project/path
./aipd-skill/skills/aipd-init/scripts/migrate-project-schema /absolute/project/path
./aipd-skill/skills/aipd-init/scripts/migrate-project-schema --check /absolute/project/path
```

用户级安装后，Agent 也可以相对当前 `aipd-init` Skill 目录定位同一脚本。迁移只产生 `unversioned-v2`，再由 `aipd-update` 完成版本语义收敛。完整分工见 [Update 与 Schema 迁移](update-and-migration.md)。

## 仓库结构

```text
AIPD-2/
├── .agents/skills/    # AIPD 仓库级 Skill；直接加载，不进入公共安装
├── _aipd/             # AIPD 仓库自身的项目认知
├── experience-assets/ # 实践经验附带源码；不进入 Skill 安装包
├── aipd-skill/        # 完整包、shared 原稿和安装 / 校验脚本
│   ├── skills/
│   ├── shared/
│   ├── scripts/
│   └── platforms/codex/agents/
└── docs/
```

## 项目 Map 入口

当前项目正式入口是 `_aipd/map.md`。安装、Skill 维护和平台差异都应先从这里路由。

---
name: aipd-init
description: >
  把 AIPD 装进还没有工作区的项目。空项目走方向 / 痛点；已有代码则先建壳、扫仓库、补 map 与 Core / Product / Engineering 索引。
  关键词：aipd-init、/aipd-init、aipd、/aipd、$aipd、初始化、init、接入 AIPD、_aipd、知识库、代码索引、空项目
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
  - Agent
  - AskUserQuestion
---

# AIPD Init

`aipd-init` 只负责把 AIPD 工作区装进项目。它不是日常总入口。

- 日常读上下文：`AGENTS.md` → `_aipd/index.md` → `_aipd/map.md`
- 看进度：用户显式调用 `$aipd-leader`
- 做短周期目标：`aipd-case`
- 已接入但版本落后：`aipd-update`

`/aipd`、`$aipd` 仍可触发本 Skill，语义等于 `/aipd-init`。

## Schema 识别

进入任何读取或写入前，先判断项目状态：

1. 先读取 `@references/workspace/project-state.md` 和 `@references/updates/catalog.json`，用 catalog 的 `currentVersion` 作为本机版本 `I`；不从 `AGENTS.md`、Git tag 或远程推断版本。
2. 按路径项存在性分别检查新旧根：`test -e _aipd || test -L _aipd`，以及 `test -e _adoc || test -L _adoc`。损坏 symlink 和同名普通文件也算“存在”；双根、symlink 工作区、工作区内 symlink、manifest 身份或类型非法时按合同立即停止。
3. 只有 `_aipd` 时，按合同判定项目版本 `P`。`unversioned-v2` 或 `P < I` 返回 `needs-aipd-update` 并路由 `aipd-update`；`P > I` 硬停止，不降级也不查远程；`P = I` 且必要入口类型安全时，报告 AIPD 已接入并停止。`index.md` / `map.md` 等必要入口缺失是 Update drift，存在但是 symlink 或类型冲突则硬停止。
4. 只有 `_adoc` 时，不读取、路由或写入其中内容；定位当前 `aipd-init` Skill 随包提供的 `scripts/migrate-project-schema`，先以 `--dry-run /absolute/project/path` 预检，用户确认后执行。若当前在 AIPD 源码仓库，可使用 `aipd-skill/skills/aipd-init/scripts/migrate-project-schema`。迁移后仍是无版本 v2，继续交给 `aipd-update` 应用当前发布。
5. 新旧根路径项均不存在时，才进入初始化。这只表示还没有 AIPD 工作区，不表示仓库是空的。

日常运行时不双读、不 fallback。安全的额外 Workspace 模块是项目定制，不因名称未知就删除或判 invalid；保留名、代码目录、symlink 和文件类型冲突仍按合同停止。

## 已接入则停止

`P = I` 时不要读任务、不要输出状态面板、不要因缺少 `intent.md` 引导方向、不要推荐 Case / OKR / Weave。回复：

```text
AIPD 已接入。aipd-init 只负责第一次初始化。
日常任务按 AGENTS.md 读 map；看项目进度用 $aipd-leader。
```

## 初始化：先看有没有代码

读取 `@references/init-codebase-scan.md`，判断 **有代码** 或 **空项目**。扫描范围小、入口明确时由 Main 直接执行。

然后建立同一套工作区壳。先写入精确两键的 `unversioned-v2` bootstrap manifest，再创建默认文档壳。初始化尚未验证完成前，不得提前写入 `aipdVersion`：

```bash
mkdir -p _aipd/knowledge/intent _aipd/knowledge/research
mkdir -p _aipd/knowledge/core _aipd/knowledge/product _aipd/knowledge/engineering
mkdir -p _aipd/sop _aipd/case/archive _aipd/okr
```

- 将 `{"schema":"aipd-project","schemaVersion":2}` 写入 `_aipd/manifest.json`；当前版本模板只在最后成功提交时使用。
- 将 `@references/workspace/templates/index.md` 写入 `_aipd/index.md`。
- 将 `@references/workspace/templates/inbox.md` 写入 `_aipd/inbox.md`。
- 将 `@references/workspace/templates/map.md` 写入 `_aipd/map.md`。
- 将 `@references/workspace/templates/update-log.md` 写入 `_aipd/update-log.md`。
- 将 `@references/workspace/templates/sop-index.md` 写入 `_aipd/sop/index.md`。
- 将 `@references/workspace/templates/sop-map.md` 写入 `_aipd/sop/map.md`。
- 将 `@references/case/templates/index.md` 写入 `_aipd/case/index.md`。
- 将 `@references/okr/templates/index.md` 写入 `_aipd/okr/index.md`。

目标文件已存在时不覆盖，先提示用户并基于现有内容继续。默认壳只是入口索引，不代表对应知识已完成。

### Agent MD

| 等级 | 名称 | 内容 |
|---|---|---|
| 0 | 不修改 Agent MD | 不写入 `AGENTS.md` |
| 1 | AIPD Project Entry | 写入 AIPD 项目入口区块；默认推荐 |
| 2 | Entry + Interaction Protocol | 额外写入 AIPD 项目级对话协议 |

等级 1 或 2 时，用 `@references/agent-entry/template.md` 更新 `<!-- AIPD:START -->` / `<!-- AIPD:END -->` 区块；没有标记时追加，不覆盖用户原有内容。等级 2 再读取 `@references/agent-entry/interaction-style.md`，用独立标记区块安装。

- **空项目**：先询问等级，再写入。
- **有代码**：默认等级 1，写入后在摘要里说明；用户当场要求 0 或 2 时按用户选择。

完成结构、必要入口、标记区块验证，并确认 manifest 模板的 `aipdVersion` 等于 catalog 的 `currentVersion=I` 后，最后将 `@references/workspace/templates/manifest.json` 写入 `_aipd/manifest.json`，以其中的 `aipdVersion=I` 作为初始化成功标记。任一步失败时保留 `unversioned-v2`，不得声称已完成当前版本。`intent.md` 存在与否不影响成功。

### 空项目

壳和 Agent MD 完成后，引导定义 `_aipd/knowledge/intent/intent.md`（`@references/knowledge/intent/guide.md`、`intent-writing.md`、`template.md`）。这是空项目的发现路径，不是五类知识的完成门槛。

### 有代码

不要问方向、痛点或「项目起因」。按 `@references/init-codebase-scan.md` 扫描后写入：

- `_aipd/map.md`：真实模块、关键词和代码入口
- `_aipd/knowledge/core/index.md`
- `_aipd/knowledge/product/index.md`
- `_aipd/knowledge/engineering/index.md`

不写 `intent.md`。Research 默认不写。索引必须短，只记录从仓库看见的事实；不确定就标明待确认，或只进 map。写完后给用户一份短摘要：看见什么、写了什么、Intent 仍空。

## 设计原则

1. 本 Skill 只初始化，不当路由器。
2. 没有 AIPD 工作区时，下一刀是有没有代码，不是有没有方向。
3. 五类 Knowledge 是并列存储；空项目可以从 Intent 生长，有代码项目从 Core / Product / Engineering / map 生长。
4. 项目规则在项目里；本 Skill 只说明第一次怎么把位置建好。

# Design: c33-agents-on-demand-install

## Design 模式

- **类型**：docs / process + refactor（公共 Skill 包形态、安装入口、仓库工程合同）
- **模式**：不走前后端全链。缺口是执行边界：包内文件、共享文件 owner、安装复制，不是 API / UI。
- **当前节点**：readiness-gate
- **节点状态**：completed
- **本节点要回答的问题**：能不能动手。
- **本节点停止点**：gate = passed。用户已确认进入 Execute。
- **下一节点建议**：Execute 已进入（`03-execute/execute.md`）
- **实践经验**：代码实践经验未命中。教学文档经验在改 README / `docs/modules/build-and-install.md` 时再读。

## Intake

### 缺口

执行边界不清，不是需求不清。Think 已选定方向；Design 要把仓库里 Skill 包怎么摆、共享文件谁拥有、install 复制什么定下来。

### 阻塞级 open

无。V3、旧安装入口、仓库路径已在本节点收口。

### 是否回 Think

否。

### 角色

- Requirements Steward：冻结 Think。
- Context Architect：Skill 包与共享文件边界。
- Implementation Planner：work package。

不需要 Backend / UX / Frontend Architect。

### 节点路径

```text
intake + requirements
-> brownfield
-> context-boundary（含代码拓扑合同）
-> work-package-draft
-> readiness-gate
```

跳过独立的 domain-rules、backend、frontend。安装冲突、认不出宿主、列表有宿主但文件写「暂不支持」等规则写在 requirements 的边缘场景里。

### 需要的 artifact

- `02-design/requirements-contract.md`
- `02-design/brownfield-delta.md`
- `02-design/context-boundary.md`
- `02-design/decision-log.md`
- `02-design/work-package-draft.md`
- `02-design/readiness-gate.md`
- 本文件

## 需求契约

入口：`02-design/requirements-contract.md`。状态：confirmed。

### confirmed（压缩）

- 每个公共 Skill 是独立安装包；运行时只读包内路径。
- `SKILL.md` 头给宿主做目录卡；正文默认加载；末尾小列表按当前对话宿主点名包内文件。
- 按需目录：`aipd-leader/runtime/{host}.md`、`aipd-case/agent-guide/{host}.md`；先读通用 `agent-guide.md`。host = `codex` / `cursor` / `grok` / `claude`。
- 目录即产物，安装即复制。废掉 `src/` → `dist/{platform}` 和平台覆盖。
- `shared/` 只放 `catalog.json` 与 `project-state.md`。`aipd-init` 与 `aipd-update` 共用模板不进 shared。
- 只留 `install-agents`（`~/.agents/skills`）和 `install-claude`（`~/.claude/skills`）。旧 Codex / Cursor / 泛名 / 项目级安装入口删除。
- 不升 V3。`schemaVersion` 和 `currentVersion` 都保持 2。
- 仓库：`aipd-skill/skills/{name}/` 是完整包；`aipd-skill/shared/` 只放 `catalog.json` 与 `project-state.md` 原稿。
- 公共集合以 c34 为准：九个 Skill，其中 `aipd-init` 替换 `aipd`。八个带 shared 副本，`aipd-git-push` 不带。不重做 init 分流。
- 认宿主只认当前对话。custom agent、仓库级 `aipd-learn`、未确认的正式 install 都不做。

### assumed

- 现有校验改成验完整包，以及包内副本与 `aipd-skill/shared/` 一致。
- `install-claude` 不要求本机已登录 Claude。

### open

无。

### 不允许固化

- 不要把 `aipd-skill/src/`、`dist/{platform}`、`~/.codex/skills`、`~/.cursor/skills` 写成新的默认交付。
- 不要把 `catalog.json` 改成 version 3。

## 领域规则 / 边缘场景

内嵌，不拆文件。

- 列表里的宿主必须有文件；做不到就写「暂不支持」，不要缺文件。
- 不在列表里：纯通用 Skill 只读通用部分；Leader 调度没有通用实现，不在列表就不要调度。
- 认不出当前对话宿主：不要看 PATH；Leader 停止调度，Case 仍可用通用 `agent-guide.md`。
- 多份安装：提示冲突，不删。
- 没有平台差异的 Skill：不加空列表、空目录。

## Brownfield / 后端 / 前端

- Brownfield：`02-design/brownfield-delta.md`，confirmed。
- Context boundary：`02-design/context-boundary.md`，confirmed。
- Work package 草案：`02-design/work-package-draft.md`，confirmed。
- Readiness：`02-design/readiness-gate.md`，passed。
- Backend：skipped（事实源是文件和安装目录）。
- Frontend：skipped。

## Code Topology Contract

详见 `02-design/context-boundary.md`。压缩：九个 Skill 包是纵向上下文；`shared/` 只有 catalog 与 project-state 两份原稿；运行时只读当前包；安装不复制 shared；不准再上移 shared。

## Checkpoint

- **已确认**：requirements；brownfield；文件边界；四包活。
- **当前游标**：`02-design/readiness-gate.md`（passed）。
- **下一步**：用户确认后进入 Execute，从包 1 搬家开始。
- **恢复入口**：`case.md` + `02-design/readiness-gate.md` + `02-design/work-package-draft.md`。

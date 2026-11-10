# Work Package: wp-03 - 安装入口

> **所属 Case**: c33-agents-on-demand-install
> **Phase**: Execute
> **类型**: dev
> **推荐 Agent**: Main Agent
> **依赖**: wp-01（可与 wp-02 并行）
> **拓扑敏感**: 是

## 目标

只剩 `install-agents` 和 `install-claude`。复制的是 `aipd-skill/skills/`，不是 dist。装完只提示冲突，不 rm。

## 设计依据

- Requirements Contract：`02-design/requirements-contract.md`
- Context Boundary：`02-design/context-boundary.md`
- Readiness Gate：passed
- 复杂度爆点：旧 install 会 rm 旧名（含 `aipd`），并写入 `~/.codex/skills`
- 解耦方式：复制完整包；扫描已知目录只打印提示
- 文件 / 文件夹边界：`aipd-skill/scripts/`

## 代码拓扑护栏

- **纵向业务上下文**：安装脚本，不是某个 Skill 正文
- **允许的横向依赖**：复制 `skills/*`；不复制 `shared/`
- **显式组合边界**：目标目录是 `~/.agents/skills` 或 `~/.claude/skills`
- **禁止的边界穿透**：自动 rm 用户目录；装 custom agent；把 `~/.codex/skills` 写成新默认
- **共享变化权限**：无
- **独立验收边界**：读脚本能看出只复制、只提示
- **认知回写**：无（wp-04 改文档）

## 不允许固化的假设

- 本包不执行正式 install

## 并列工作项

- [x] 新写 `install-agents` → `~/.agents/skills`
- [x] 新写 `install-claude` → `~/.claude/skills`
- [x] 装完扫描 `~/.agents`、`~/.claude`、`~/.codex`、`~/.cursor`、`~/.grok` 的 skills 目录；发现多份或旧名 `aipd` 就打印提示，不 rm
- [x] 删除 `install`、`install-codex`、`install-cursor`、`install-project*`、`dev`、`dev-codex`
- [x] `legacy-skills` 若还留着，只给提示认旧名，禁止再当删除清单

## 上下文文档

- `case.md`
- `02-design/context-boundary.md`
- `aipd-skill/scripts/install`
- `aipd-skill/scripts/legacy-skills`

## 执行前 checkpoint

- **当前目标**：两个新入口，删旧入口
- **恢复入口**：本文件
- **执行边界**：写脚本，不跑正式安装
- **预期输出**：新脚本 + 旧入口删除
- **停止条件**：验收通过
- **返回位置**：本文件 + `execute.md`

## 验收标准

- [x] 仓库里找不到旧 install 入口作为可执行交付
- [x] 新脚本只复制 `skills/`，不复制 `shared/`
- [x] 冲突与旧名 `aipd` 只提示不删除
- [x] 未对本机执行正式 install

## 不做

- 不执行正式 install
- 不装 custom agent
- 不清理 `~/.codex/skills` 等已有 AIPD

## 执行记录

**状态**：completed

**完成时间**：2026-09-14

**主要改动**：
- 新增 `install-agents`、`install-claude`、`install-lib`
- 删除旧 install / dev 入口
- `legacy-skills` 改为只提示

**验证结果**：
- 对临时目录 dry-run 复制九个包；对本机 `~/.agents` 等只扫描提示，未正式安装

**执行后 checkpoint**：
- **当前结论**：完成
- **下一步**：wp-04
- **恢复入口**：`wp-04-check-skills-and-remove-build.md`

**遇到的问题**：macOS bash 把 `$name：` 当成变量名，已改成 `${name}`

**回跳 / 重开**：无

**Weave 候选**：默认安装到 `~/.agents/skills`，Close 再判断

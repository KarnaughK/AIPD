# Work Package: wp-01 - 九个完整包搬家

> **所属 Case**: c33-agents-on-demand-install
> **Phase**: Execute
> **类型**: dev
> **推荐 Agent**: Main Agent
> **依赖**: `02-design/context-boundary.md`
> **拓扑敏感**: 是

## 目标

仓库里出现 `aipd-skill/skills/{九个名字}/`，打开任意一个文件夹就等于打开装出去的包。`shared/` 里放好 `catalog.json` 和 `project-state.md` 原稿；八个包的副本和原稿字节一致。

## 设计依据

- Requirements Contract：`02-design/requirements-contract.md`
- Brownfield Delta：`02-design/brownfield-delta.md`
- Context Boundary：`02-design/context-boundary.md`
- Readiness Gate：passed
- 复杂度爆点：build 按平台覆盖成单文件 + `src/core` 注入，维护者改一处、产物在另一处
- 解耦方式：每个 Skill 是独立安装包；只有 catalog / project-state 升成横向原稿
- 主干职责：`aipd-skill/README.md` 本包不改（wp-04）
- 文件 / 文件夹边界：新建 `aipd-skill/skills/` 与 `aipd-skill/shared/`；保留 `src/` `dist/` 到 wp-04

## 代码拓扑护栏

- **纵向业务上下文**：九个公共 Skill 包，目录 owner 是 `aipd-skill/skills/{name}/`
- **允许的横向依赖**：只新建 `shared/` 两份原稿
- **显式组合边界**：运行时只读当前 Skill 包内路径；校验时副本对原稿
- **禁止的边界穿透**：运行时读 `src/` 或 `shared/`；平台覆盖注入；把 init/update 模板抬进 shared
- **共享变化权限**：只允许本 Case 新增的两份 shared 原稿
- **独立验收边界**：打开 `aipd-skill/skills/aipd-case/` 应能看出装出去的形态
- **认知回写**：无（Close 再 weave）

## 不允许固化的假设

- 正式 install 另点头
- 本机 `~/.agents/skills/aipd` 旧名只提示不删

## 并列工作项

- [x] 九个 Skill 从 `src/skills` + `src/core` 通用层收成完整包，放到 `aipd-skill/skills/`
- [x] `shared/updates/catalog.json` 与 `shared/workspace/project-state.md` 原稿
- [x] 八个包内副本与 shared 字节相同；`aipd-git-push` 不带这两份
- [x] 去掉 `SKILL.md` 的 `inject-from-core`；`aipd-init` 带包内 `scripts/migrate-project-schema`

## 上下文文档

- `_aipd/case/c33-agents-on-demand-install/case.md`
- `02-design/context-boundary.md`
- `02-design/brownfield-delta.md`
- `02-design/work-package-draft.md`
- `aipd-skill/scripts/build`（注入逻辑对照，本包不用平台覆盖）

## 执行前 checkpoint

- **当前目标**：完整包 + shared 原稿
- **恢复入口**：本文件 + `03-execute/execute.md`
- **执行边界**：只用 `src/core`，不用 `src/platforms`。不写按需目录。不删 src/dist。不改 init 分流正文。
- **预期输出**：九个完整包、两份原稿、八份一致副本
- **停止条件**：验收通过 / 发现设计缺口
- **返回位置**：本文件执行记录 + `execute.md` + `case.md`

## 验收标准

- [x] `aipd-skill/skills/` 下正好九个包，含 `aipd-init`，没有旧名 `aipd`
- [x] 八个包内 catalog / project-state 与 `shared/` 字节相同
- [x] `SKILL.md` 没有 `inject-from-core`
- [x] 不改 Leader/Case 的宿主调度正文（当时留给 wp-02）
- [x] 当时不删 `src/` `dist/`（wp-04 才删）
- [x] `aipd-init` 有 `references/init-codebase-scan.md` 和 `scripts/migrate-project-schema`

## 不做

- 不写 `runtime/` 或 `agent-guide/{host}`
- 不写 install 脚本
- 不跑正式安装
- 不改 c34 的 init 分流
- 不把 `currentVersion` 改成 3

## 执行记录

**状态**：completed

**完成时间**：2026-09-14

**主要改动**：
- 新建 `aipd-skill/skills/{九个名字}/` 完整包
- 新建 `aipd-skill/shared/updates/catalog.json` 与 `shared/workspace/project-state.md`

**验证结果**：
- 九个包、无 inject、八个副本 cmp 一致、catalog version 2

**执行后 checkpoint**：
- **当前结论**：完成
- **下一步**：wp-02
- **恢复入口**：`wp-02-on-demand-host-files.md`

**遇到的问题**：无

**回跳 / 重开**：无

**Weave 候选**：目录即产物合同，Close 再判断

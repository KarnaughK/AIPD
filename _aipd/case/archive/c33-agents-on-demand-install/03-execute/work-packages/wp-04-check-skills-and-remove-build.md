# Work Package: wp-04 - 校验、拆旧层、文档

> **所属 Case**: c33-agents-on-demand-install
> **Phase**: Execute
> **类型**: dev / docs
> **推荐 Agent**: Main Agent
> **依赖**: wp-01, wp-02, wp-03
> **拓扑敏感**: 是

## 目标

没有 `src/` 注入、没有 `dist/`、没有按平台 `build`。校验对着完整包和 `shared/` 跑。维护者文档和真实脚本一致。

## 设计依据

- Requirements Contract：`02-design/requirements-contract.md`
- Context Boundary：`02-design/context-boundary.md`
- Readiness Gate：passed
- 复杂度爆点：`check-dist` 绑在 `dist/codex`；文档仍写 Codex dist
- 解耦方式：`check-skills` 验完整包 + 八个副本 == shared
- 文件 / 文件夹边界：删 `src/` `dist/` `scripts/build`；改 README / docs / Engineering / Product / map。不改 `intent.md`

## 代码拓扑护栏

- **纵向业务上下文**：完整包已在 `skills/`；本包拆掉旧编译层
- **允许的横向依赖**：`check-skills` 对 `shared/`
- **显式组合边界**：`platforms/codex/agents/*.toml` 留下，本 Case 不装不删
- **禁止的边界穿透**：升 V3；改项目 `_aipd/` Schema；重做 c34
- **共享变化权限**：不准再往 shared 塞文件
- **独立验收边界**：`check-skills` 能过；仓库里搜不到作为交付路径的 `dist/codex`、`inject-from-core`、默认 `~/.codex/skills`
- **认知回写**：本包可改 Engineering / Product / map / `aipd-skill/README.md` / `docs/modules/build-and-install.md`。Intent 留给 Close weave

## 不允许固化的假设

- 不把 `currentVersion` 改成 3

## 并列工作项

- [x] `check-skills` 替换 `check-dist`
- [x] `check-release-bundle*`、`check-schema-migrator` 改指向 `skills/` 与包内 migrator
- [x] 删除 `scripts/build`、`dist/`、已经搬空的 `src/skills`、`src/core`、`src/platforms/*/core/`（toml 留下）
- [x] 改维护者 README、`docs/modules/build-and-install.md`、Engineering / Product / map 里还在写 Codex dist 的句子
- [x] 不改 `intent.md`

## 上下文文档

- `case.md`
- `02-design/context-boundary.md`
- `aipd-skill/scripts/check-dist`
- `aipd-skill/README.md`
- `docs/modules/build-and-install.md`

## 执行前 checkpoint

- **当前目标**：校验换靶 + 拆旧层 + 文档对齐
- **恢复入口**：本文件
- **执行边界**：前三包完成后才能删 src/dist
- **预期输出**：`check-skills` 通过；旧编译层消失
- **停止条件**：验收通过
- **返回位置**：本文件 + `execute.md`；然后 Verify

## 验收标准

- [x] 仓库现行入口不再把 `dist/codex` / `inject-from-core` / 默认 `~/.codex/skills` 当交付路径（历史 archive / update-log 仍保留当时写法）
- [x] `check-skills` 能过
- [x] catalog 仍是 version 2
- [x] `aipd-learn` 仍只在仓库 `.agents/skills/`
- [x] c34 的 init 分流还在

## 不做

- 不升 V3
- 不改项目 `_aipd/` Schema
- 不重做 c34
- 不跑正式 install

## 执行记录

**状态**：completed

**完成时间**：2026-09-14

**主要改动**：
- 新增 `check-skills`；release bundle / migrator 改指向完整包
- 删除 `src/`、`dist/`、`scripts/build`、`check-dist`、仓库根 migrator 正文
- toml 留在 `platforms/codex/agents/`
- 更新 README、build-and-install、Engineering、map、Learn

**验证结果**：
- `./aipd-skill/scripts/check-skills` 通过

**执行后 checkpoint**：
- **当前结论**：四包活完成
- **下一步**：Verify
- **恢复入口**：`03-execute/execute.md`

**遇到的问题**：无

**回跳 / 重开**：无

**Weave 候选**：Engineering 安装合同、Product 安装入口

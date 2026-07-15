# Case: c14-case-identifier-simplification

> **本次事项目标**：取消 Case 的版本号语义，建立简单、稳定、可排序的 Case / Work Package 标识。
> **当前 Phase**：Close

## Case Contract

### 目标

- 明确 Case 编号只表示项目内流水顺序，不表示产品版本。
- 将新 Case 统一命名为 `cN-slug`。
- 将 Work Package 统一命名为 `wp-NN-slug`，跨 Case 引用写作 `cN/wp-NN`。
- 更新 AIPD skill、模板、示例和当前仓库已有 Case 标识。

### 要做

- 更新 Case / Work Package 核心规则和模板。
- 迁移 AIPD-2 自有 Case 目录、标题、索引和本地引用。
- build 并安装 Codex skill，验证生成产物与安装结果。

### 不做

- 不把 Case ID 设计成大版本 / 小版本 / 修订版本。
- 不修改产品发布版本规则。
- 不新增通用项目扫描、批量项目更新或远程编排能力。

### 完成标准

- [x] `cN-slug`、`wp-NN-slug`、`cN/wp-NN` 已确认。
- [x] AIPD skill 源码和模板已更新。
- [x] AIPD-2 自有 Case 已迁移为无小数点编号。
- [x] build 通过，Codex skill 安装成功。
- [x] Case 目录、标题、索引和 Work Package 文件名验证通过。

### 上下文索引

- `_adoc/map.md`
- `_adoc/L3-core/index.md`
- `_adoc/L4-product/index.md`
- `_adoc/L5-dev/index.md`
- `aipd-skill/src/core/case/overview.md`
- `aipd-skill/src/skills/aipd-case/SKILL.md`
- `aipd-skill/src/core/case/templates/`

## Case Runtime

## Current Phase

Close

## Phase State

- Think: completed -> `01-think/think.md`
- Design: completed -> `02-design/design.md`
- Execute: completed -> `03-execute/execute.md`
- Verify: completed -> `04-verify/verify.md`
- Close: in_progress -> `05-close/close.md`

## 当前焦点

- **当前游标**：`05-close/close.md`
- **最近 checkpoint**：规则、AIPD-2 迁移、build、Codex install 和验证均已完成。
- **下一步**：提交并推送 AIPD-2；成功后完成归档。
- **待确认项**：无。
- **阻塞项**：无。

## Checkpoint 记录

| 时间 | 位置 | 结论 | 下一步 |
|---|---|---|---|
| 2026-07-15 | Think | Case 编号不再表达产品版本 | 设计新标识 |
| 2026-07-15 | Design | 确认 `cN-slug`、`wp-NN-slug`、`cN/wp-NN` | 更新规则源 |
| 2026-07-15 | Execute | skill、模板和 AIPD-2 自有 Case 迁移完成 | build / install |
| 2026-07-15 | Verify | build、安装、目录、标题、索引和残留检查通过 | Close |

## Think 摘要

- Case 是短周期目标容器，不是产品发布版本。
- 小修小补通过 phase 回跳和 Work Package 承接，不需要第三段版本号。
- 大范围产品或技术重建是否新开项目，由项目边界决定，不由 Case 编号表达。

## Design 摘要

- Case：`cN-slug`，`N` 为项目内单调递增流水号。
- Work Package：`wp-NN-slug`，`NN` 为 Case 内两位排序号。
- 跨 Case 引用：`cN/wp-NN`。

## Execute 摘要

- AIPD skill、模板、worker 和结构示例已更新。
- AIPD-2 自有 Case 标识和引用已迁移。

## Verify 摘要

- build 通过，Codex 安装成功。
- AIPD-2 的 13 个 Case 目录、标题和索引一致。
- `git diff --check` 通过。

## Close 摘要

- **状态**：等待 Git 提交与推送完成。
- **长期规则**：新命名契约已经进入 skill 源码，无需额外 Weave。

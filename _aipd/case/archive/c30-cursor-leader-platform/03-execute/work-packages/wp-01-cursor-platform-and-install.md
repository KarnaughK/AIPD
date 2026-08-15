# Work Package: wp-01 - cursor platform and install

> **所属 Case**: c30-cursor-leader-platform
> **Phase**: Execute
> **类型**: dev
> **依赖**: `02-design/design.md`
> **拓扑敏感**: 否

## 目标

新增 Cursor 平台 Leader runtime，以及同时写 `~/.cursor/skills/` 与 `~/.dsh/skills/` 的 `install-cursor`。

## 并列工作项

- [x] 写 `aipd-skill/src/platforms/cursor/core/leader/runtime.md`：Cursor 为主，DSH headless 为 Case 执行层，没有 DSH 就停
- [x] 写 `aipd-skill/scripts/install-cursor`，一次安装同时写入 `~/.cursor/skills/` 与 `~/.dsh/skills/`
- [x] `./aipd-skill/scripts/build cursor` 通过
- [x] 用户确认后跑 `install-cursor`，确认两个目录都有 `aipd-leader`

## 上下文文档

- `/Users/yangzongru/Desktop/CodeKKK/AIPD/_aipd/case/c30-cursor-leader-platform/case.md`
- `/Users/yangzongru/Desktop/CodeKKK/AIPD/_aipd/case/c30-cursor-leader-platform/02-design/design.md`
- `aipd-skill/scripts/install-codex`
- `aipd-skill/scripts/build`

## 不允许

- 写入 `~/.cursor/skills-cursor/`
- 改泛名 `install` 的默认落点
- 安装到 `~/.codex/skills/`
- 只装 Cursor 或只装 DSH 其中一边

## 验收标准

- [x] Cursor 产物可构建
- [x] 注入的 runtime 以 Cursor + DSH 为主，并写明双落点
- [x] `install-cursor` 声明同时安装到 `~/.cursor/skills/` 与 `~/.dsh/skills/`
- [x] 本 work package 和 `execute.md` 已写回
- [x] 用户确认后完成双目录安装

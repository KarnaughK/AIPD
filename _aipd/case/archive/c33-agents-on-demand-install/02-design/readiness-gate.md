# Readiness gate: c33-agents-on-demand-install

状态：passed（有带进 Execute 的风险，不挡开工）

检查时间：2026-09-11。四包活已由用户确认。

## 检查

| 项 | 结果 |
|---|---|
| 阻塞级 open 需求 | 无 |
| assumed 被写成接口 / 字段 / UI 事实 | 无。本 Case 没有 API 或页面 |
| 知道改哪些现有入口 | 是。见 `brownfield-delta.md` |
| 后端 / 前端契约 | 跳过 |
| 文件边界够不够执行 | 是。见 `context-boundary.md` |
| 代码拓扑合同 | 有。九个 Skill 包是纵向上下文；shared 只两文件；不准再上移 |
| 活是按验收切的，不是微步骤 | 是。搬家 / 按需文件 / 安装 / 校验拆旧 |
| Verify 知道查什么 | 是，见下 |
| 产品注意力契约 | 未命中，跳过 |

## 带进 Execute 的风险（写入正式施工单）

- 工作区里同时有未提交的 c34（`aipd` → `aipd-init`）。本 Case 把它当现状，不回退、不重做 init。
- 正式 `install-agents` / `install-claude` 仍须你另外点头，施工时只写脚本。
- 本机 `~/.agents/skills/aipd` 是旧名残留，只提示不删。
- `intent.md` 仍写「默认 Codex 交付」，本 Case 不改，Close 再 weave。
- 包 4 才能删 `src/` `dist/` `build`。前面三包不得提前拆空，否则平台 runtime 原文会丢。

## 不允许固化

- 不把 `currentVersion` 改成 3
- 不把 `~/.codex/skills`、`~/.cursor/skills` 写成新的默认安装目标
- 不自动 rm 用户目录里的 AIPD Skill
- 不把 init/update 模板抬进 `shared/`

## Verify 要对照的护栏

- 打开 `aipd-skill/skills/aipd-case/` 应等于装出去的形态
- Leader / Case 的 `SKILL.md` 常驻正文没有别家调度细节；按需文件在包内
- 八个 catalog / project-state 副本与 `shared/` 一致
- 仓库默认安装入口只有 `install-agents` 和 `install-claude`
- 没有 `inject-from-core`、没有作为交付的 `dist/{platform}`、没有按平台 `build`
- c34 的 init 分流还在；`aipd-learn` 仍只在仓库 `.agents/skills/`
- 未确认则没有对本机执行正式 install

## 结论

可以进入 Execute，创建四份正式施工单，从包 1 开始改仓库。进入 Execute 仍须你点头。

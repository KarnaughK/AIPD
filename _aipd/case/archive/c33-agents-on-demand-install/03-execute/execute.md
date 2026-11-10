# Execute: c33-agents-on-demand-install

## 当前执行游标

- **当前 work package**：四包均 completed
- **状态**：completed
- **Main / Child**：Main
- **goal 模式**：用户要求绑定本 Case。本对话工具列表没有 `create_goal` / `update_goal`。Grok 的 `/goal` 是输入框 slash command，宿主未绑定。**不加载** `goal-mode.md`。

## 进入条件

- Design readiness = passed
- 用户确认进入 Execute（2026-09-14：「绑一个…开工」）
- 正式 `install-agents` / `install-claude` 仍须另外点头

## 正式施工单

| WP | 文件 | 依赖 | 状态 |
|---|---|---|---|
| wp-01 | `work-packages/wp-01-complete-skill-packages.md` | 无 | completed |
| wp-02 | `work-packages/wp-02-on-demand-host-files.md` | wp-01 | completed |
| wp-03 | `work-packages/wp-03-install-entrypoints.md` | wp-01 | completed |
| wp-04 | `work-packages/wp-04-check-skills-and-remove-build.md` | wp-01, wp-02, wp-03 | completed |

## 执行前 checkpoint（wp-01）

- **当前目标**：九个完整包落到 `aipd-skill/skills/`；`shared/` 只放 catalog 与 project-state 原稿
- **恢复入口**：本文件 + `wp-01-complete-skill-packages.md` + `02-design/context-boundary.md`
- **执行边界**：只从 `src/core` 通用层注入，不用平台覆盖。不写 `runtime/` / `agent-guide/{host}`。不删 `src/` `dist/`。不改 c34 init 逻辑。不跑正式 install。不把 `currentVersion` 改成 3。
- **预期输出**：`aipd-skill/skills/{九个名字}/`；八个副本与 `shared/` 字节相同；`SKILL.md` 无 `inject-from-core`
- **停止条件**：wp-01 验收通过则写回并做 wp-02；发现设计缺口回 Design
- **返回位置**：本文件 + work package 执行记录 + `case.md`

## 执行记录

| 时间 | WP | 结论 | 验证 | 下一步 |
|---|---|---|---|---|
| 2026-09-14 | — | 进入 Execute；施工单已落盘 | 文件存在 | 做 wp-01 |
| 2026-09-14 | wp-01 | 九个完整包 + shared 原稿 | cmp 八个副本 | wp-02 |
| 2026-09-14 | wp-02 | Leader/Case 按需文件与列表 | SKILL.md 无模型表 | wp-03 |
| 2026-09-14 | wp-03 | install-agents / install-claude；旧入口删除 | 临时目录 dry-run | wp-04 |
| 2026-09-14 | wp-04 | check-skills；拆 src/dist/build；改文档 | `check-skills` 通过 | Verify |
| 2026-09-14 | install | 用户确认后 `install-agents` | 九个包已在 `~/.agents/skills`；旧名 `aipd` 只提示 | Verify 仍待做 |
| 2026-09-14 | cleanup | 用户要求删旧名和 Codex/Cursor 副本 | 已删 `~/.agents/skills/aipd` 以及 `~/.codex/skills`、`~/.cursor/skills` 里的 AIPD 公共 Skill | `~/.codex/agents` 三个 toml 未动 |

## 禁止事项

- 不执行正式 install
- 不自动 rm 用户目录里的 AIPD Skill
- 不回退 c34
- 不升 V3
- 不把 init/update 模板抬进 `shared/`

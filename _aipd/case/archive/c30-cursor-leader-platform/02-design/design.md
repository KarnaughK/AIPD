# Design: c30-cursor-leader-platform

## 已确认方案

两套安装包，目录隔离：

| 包 | 源码 | 产物 | 安装落点 | Leader 合同 |
|---|---|---|---|---|
| Codex | `src/platforms/codex/` | `dist/codex/` | `~/.codex/skills/` | 一个 Case 一个 Codex task |
| Cursor | `src/platforms/cursor/` | `dist/cursor/` | `~/.cursor/skills/` **和** `~/.dsh/skills/`（一次安装同时写） | Cursor Leader + DSH headless |

## 复杂度爆点

同一份 `src/skills/aipd-leader/SKILL.md` 会打进两个平台。Cursor 为主的文案必须靠平台覆盖的 `runtime.md` 说清楚；若 Skill 正文仍大量写 Codex，Cursor 包会脏。

## 解耦

- 公共 Case / Knowledge / gate 继续走 `src/core/`。
- 只有 Leader 调度合同做平台覆盖：`src/platforms/{platform}/core/leader/runtime.md`。
- 若 Skill 入口也必须 Cursor 化，给 Cursor 平台加同路径 Skill 覆盖，或把宿主专有段落只放进 runtime。优先改 runtime，Skill 入口只留一句「读 runtime」。

## 文件边界

- 新增：`aipd-skill/src/platforms/cursor/core/leader/runtime.md`
- 新增：`aipd-skill/scripts/install-cursor`（同时写 `~/.cursor/skills/` 与 `~/.dsh/skills/`；安装时提醒两者绑定）
- 修改：`aipd-skill/src/platforms/codex/core/leader/runtime.md`（删 Cursor / DSH 默认分支）
- 按需修改：`aipd-skill/src/core/leader/runtime.md`、`aipd-skill/src/skills/aipd-leader/SKILL.md`（入口变短，细节进 runtime）
- 禁止：`~/.cursor/skills-cursor/`、改泛名 `install` 的默认落点、写入 `~/.codex/skills/`

## DSH 调用（已验证）

```bash
npx --no-install @deepseek-ai/dsh --profile headless "..."
```

先 `command -v dsh`，没有再用上面这句。还没有就停。headless 无状态，文件即状态。

## Readiness

通过。进入 Execute。

# Verify: c33-agents-on-demand-install

## Verify Result

passed。用户 2026-11-10 确认这套安装已经在日常使用，可以关闭。

## 通过项

- 九个公共 Skill 在 `aipd-skill/skills/`。`aipd-skill/src/`、按平台 `dist/`、`scripts/build` 和旧 `install*` 已从工作区去掉。
- `./aipd-skill/scripts/check-skills` 在 Execute 和 2026-11-05 这次安装前都通过：九个完整包、shared 两份原稿、八个副本一致、Learn 隔离。
- `catalog.json` 的 `currentVersion` 仍是 2。
- 2026-09-14 `install-agents` 写入 `~/.agents/skills`。2026-11-05 再次安装到 `~/.agents/skills` 和 `~/.grok/skills`。两处与仓库源码逐目录一致。
- `grok inspect` 把九个公共 Skill 解析到 `~/.grok/skills/.../SKILL.md`。
- 安装扫描发现两份时只提示，没有删除。
- Grok Leader 的按需文件在，正文写明当前不支持调度 Case 执行层。
- `aipd-learn` 没有进用户级安装。

## 未在本机执行

- `install-claude` 没有跑。脚本在 `aipd-skill/scripts/install-claude`，目标是 `~/.claude/skills`。不挡这次关闭。

## 残留

- 已归档 case、暂停的 c10、以及本 Case 自己的 Think / Design 记录里，仍有当时的 `aipd-skill/src/` 路径。那是历史，不改。
- 现行入口里还指着旧路径的，Close 时改到 `aipd-skill/skills/`：OKR、Leader、代码拓扑、经验资产说明、经验索引、Vue 架构图入口、Codex agent-guide 里已删除的 `scripts/build`。
- Intent 仍写 Codex 为默认交付。本 Case 约定 Close 后由 weave 判断，这次用户没有改 Intent。

## 用户验收

2026-11-10：用户说这套已经在用，可以关，归档。

## Close 归档候选

见 `case.md` 与 `05-close/close.md`。

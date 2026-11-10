# Close: c33-agents-on-demand-install

## 状态

- **状态**：completed
- **归档时间**：2026-11-10
- **归档位置**：`_aipd/case/archive/c33-agents-on-demand-install/`

## 关闭前检查

- [x] Verify 已通过。用户确认日常已在使用。
- [x] Case 与四份 Work Package 执行记录完整。
- [x] 长期入口里会把人带到已删除 `aipd-skill/src/` 的现行链接已改。历史 case 不改。
- [x] 不另开 Weave。Intent 保持原样。
- [x] 用户要求本次与工作区其余改动一起提交并推送。

## 归档候选

| 候选 | Close 判断 | 结果 |
|---|---|---|
| 目录即产物，安装即复制，废按平台 dist | 已回写 | Skill 树、`aipd-skill/README.md`、`docs/modules/build-and-install.md`、Engineering |
| 按需加载：SKILL.md 末尾小列表 + 包内宿主文件 | 已回写 | `aipd-leader/runtime/`、`aipd-case/agent-guide/` |
| 只留 `install-agents` 与 `install-claude`，安装后提示多份、不删除 | 已回写 | `aipd-skill/scripts/` |
| 不升 V3 | 无需再写 | `catalog.json` 仍是 2 |
| Grok 不调度 Case 执行层，用正文说明 | 已回写 | `aipd-leader/runtime/grok.md` |
| custom agent 不进公共安装 | 已回写 | `aipd-skill/platforms/codex/agents/` |
| 默认交付从 Codex 主链路改成 `~/.agents` 一套 | 延后 | 不改 `intent.md`。等用户明确要改长期方向时再 weave |
| 本机 Grok 因为不走通用 `.agents` 而另装 `~/.grok/skills` | 仅留 case | 合同仍是默认同装 `~/.agents`。这次是本机使用事实，不写成所有 Grok 的安装规则 |

## 引用

已归档的 c34 仍写着把安装交给当时进行中的 c33。那是 c34 关闭时的记录，不改。

暂停的 c10 仍提到旧源码路径。不在本 Case 里改。

## archive 决策

已移动到 `_aipd/case/archive/c33-agents-on-demand-install/`。现行 map 和知识域不依赖旧目录路径。

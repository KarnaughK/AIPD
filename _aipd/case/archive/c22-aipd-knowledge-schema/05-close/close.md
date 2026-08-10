# Close

## 状态

- **状态**：completed

## 关闭前检查

- [x] Verify 已通过。
- [x] Case 与 Work Package 执行记录完整。
- [x] 下游项目迁移入口和 install 决策已交接给用户。
- [x] 新 Schema 已成为项目长期事实源。
- [x] c22 已移动到 archive 并更新 Case 索引。

## 归档候选

| 候选 | Close 判断 | 结果 |
|---|---|---|
| Knowledge Schema v2 的目录与命名规则 | 已回写 | `_aipd/index.md`、Core / Product / Engineering Knowledge 与公开文档已成为事实源 |
| 一次性迁移、不做运行时兼容的升级规则 | 已回写 | Engineering、Product、Map、迁移器和安装包已同步 |
| Map、SOP、Case 与长期知识域的边界 | 已回写 | Workspace Core 文档、项目 Map、SOP / Case 入口已同步 |

## Codex 安装结果

- **用户授权**：2026-08-10，用户明确确认执行 Codex 用户级 install。
- **执行入口**：`./aipd-skill/scripts/install-codex`。
- **安装范围**：9 个 AIPD Skill、3 个 Codex Agent。
- **清理结果**：旧 `aipd_adoc_retriever.toml` 已删除，当前 `aipd_context_retriever.toml` 已安装。
- **一致性验证**：9 个已安装 Skill 目录与 `dist/codex/skills/` 逐文件一致；3 个 Agent 与 `dist/codex/agents/` byte-identical；打包迁移器存在且可执行。
- **发布校验**：`check-dist`、Schema migrator fixture 和运行时新 Schema 关键语义检查通过。

## 长期认知审计

- Knowledge Schema、Map 分辨率、Workspace 边界和迁移合同已在本 Case Execute 阶段直接写入长期事实源，无需另启 Weave。
- 未完成候选只有“其他项目逐个迁移”和“实际使用后继续优化 Map 内容”，继续作为未来事项，不写成已完成事实。
- 没有 Research 候选；没有从本次实现反推新的 Intent。

## Archive 审计

- 移动前检索确认，Case 目录外只有 `_aipd/case/index.md` 引用 c22；没有 Knowledge、Map、SOP、README 或其他 Case 依赖活动路径。
- 索引已从“进行中 Case”移除，并增加 `archive/c22-aipd-knowledge-schema` 归档记录。
- Case 归档到 `_aipd/case/archive/c22-aipd-knowledge-schema/`；归档内容是不可执行历史快照。
- 用户随后明确要求提交并推送；本归档与 Knowledge Schema v2 全部改动随同一提交进入当前分支，不执行 merge、rebase 或 force push。

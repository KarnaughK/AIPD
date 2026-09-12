# Close

## 状态

- **状态**：completed

## 关闭前检查

- [x] Verify 已通过。
- [x] Case 与 Work Package 执行记录完整。
- [x] 未执行 install / commit / push。
- [x] 稳定产品 / Core 事实已在 Execute 写回；本 Close 不另开 Weave。

## 归档候选

| 候选 | Close 判断 | 结果 |
|---|---|---|
| `aipd-init` 只初始化；有代码 / 空项目分流 | 已回写 | Product index/map、Skill、学习文档 |
| 发现链：空项目从方向，有代码从 3/4/5 和 map | 已回写 | `_aipd/knowledge/core/workspace-modules.md` |
| Intent 不是初始化完成门槛 | 已回写 | Intent 指南、init Skill、index 模板 |
| 旧 Skill 名 `aipd` 安装时清理 | 已回写 | `scripts/legacy-skills` |

## 未完成 / 交给下游

- 本机安装、把 `aipd-init` 装进用户级 Skill 目录：交给进行中的 `c33-agents-on-demand-install`。本 Case 不再执行 install。
- 未在外部业务仓库做一次真实有代码初始化试用：不在本 Case 范围，有需要时另开。

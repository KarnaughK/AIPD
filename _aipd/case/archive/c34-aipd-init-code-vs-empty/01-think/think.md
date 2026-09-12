# Think：c34 aipd-init 有代码 / 空项目分流

## 当前问题

现行 `/aipd` 同时做三件事：把 AIPD 装进项目、当日常总入口读 map、没任务时看状态并推荐下一步。没有 `_aipd` 时一律当「全新项目」，骨架完成后强制写 Intent。这和 c22「五类 Knowledge 并列、发现顺序由问题决定」冲突。

## 调研范围

- 不查外部竞品。
- 只核对现行 `aipd` Skill、Intent / Research / Product 指南、build / check-dist、Product 功能线。
- 停止条件：用户已确认两刀合同，足够写 Design。

## 选项比较

| 选项 | 结论 |
|---|---|
| 保留 `aipd` 当总入口，只改初始化提问 | 名字仍会让人拿它做 Agent 初始化；用户明确拒绝 |
| 三种起点（从零 / 自己的老产品 / 别人的项目） | 初始化第一刀过细；用户收成有代码 / 没代码 |
| `aipd-init` + 有代码 / 空项目 | 与实际用法一致；采用 |

## 决策结论

1. 公共 Skill 改名为 `aipd-init`。框架品牌仍是 AIPD。
2. 该 Skill 只负责第一次把 AIPD 装进项目。已接入则停止或交给 Update / 迁移器。
3. 空项目：现有方向 / 痛点路径。
4. 有代码：建壳 → 扫仓库 → 补 map 和 Core / Product / Engineering 索引。不问方向。不写 Intent。
5. Intent 不是完成门槛。
6. 日常 map-first 留在 `AGENTS.md`；进度判断留给 Leader。

## 未解决风险

- 有代码启发式可能把「只有 README 的空仓库」判成空项目，这是预期。
- 有代码扫描写的索引必须短，避免把猜测写成事实。
- 旧 `/aipd` 调用靠 description 关键词兼容，不保留第二份 Skill。

## 回流位置

回到 Design：需求契约、有代码启发式、文件边界、work package。

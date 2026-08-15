# Verify: 根 README 刷新验收

## Verify Result

- **状态**：passed
- **Work Package**：`wp-01-refresh-root-readme` completed。
- **用户验收口径**：Leader 委派的五项成功判据已全部满足；最终集成核对留给 Leader，但无阻塞级待确认取舍。
- **拓扑合同**：不适用；纯文档单文件 Case，Design / WP 均标记非拓扑敏感。

## 成功判据矩阵

| 判据 | 结果 | 证据 |
|---|---|---|
| 首屏与前半部分先回答问题、工作方式和可靠性 | 通过 | 标题价值主张 -> 失忆场景 -> 三段工作方式 -> “为什么升级后的体系更可靠” -> 五分钟开始；内部 Skill 列表后置 |
| 快速开始与当前 Codex / Schema v2 / 三 Skill 一致 | 通过 | `build`、`check-dist`、`install` 路径与脚本一致；`/aipd`、`/aipd-case`、`/aipd-weave` 构成首次闭环 |
| 完整能力按合适层级呈现 | 通过 | Schema / Update / Interaction / Leader / 五域 / Map-first / checkpoint / Case / Main-Child / topology 均命中，细节渐进披露 |
| 九个公共 Skill 与仓库级 learn 边界明确 | 通过 | 公共章节声明正好九个；learn 独立顶级章节并明确不进 src/skills、build、dist、install 或业务项目 |
| 本地链接有效且不过度膨胀 | 通过 | 14 个本地 Markdown 链接 / 锚点全部可达；README 282 行，保留决策页职责并将细节链接到 docs |

## 自动 / 只读检查

- `git diff --check`：通过。
- 本地 Markdown link / anchor 检查：14 / 14 通过。
- 公共 Skill 源目录集合：9 / 9，名称与 README 一致。
- 仓库级 learn 隔离：`.agents/skills/aipd-learn/SKILL.md` 存在，`aipd-skill/src/skills/aipd-learn` 不存在。
- 能力词检查：`/aipd`、`/aipd-case`、`/aipd-weave`、`/aipd-update`、`$aipd-leader`、Schema v2、Interaction Protocol、Main / Child、三类代码拓扑与 Code Topology Contract 均存在。
- 过细运行配置检查：README 不再包含 `gpt-5.6`、`Fast` 或“默认运行配置”。
- 变更范围检查：内容文件只有根 `README.md`；其余改动仅为本 Case 目录与 `_aipd/case/index.md`。

## 当前 / 历史语义审计

- `_adoc`、L1-L5 只出现在旧项目迁移说明中，不作为当前结构。
- 旧 `aipd-case-create` / `run` / `archive` 只出现在废弃合并说明中，不作为当前入口。
- Goal Mode 明确为 Case 外部平台覆盖层，不作为独立 phase。
- Learn 明确为仓库级自迭代，业务项目回写明确使用 Weave。
- 当前默认平台只承诺 Codex 构建验证，没有宣称其他平台可用。

## Reduction Scan

- **第一眼**：AIPD 让项目成为 Agent 可读取、可恢复、会持续生长的长期记忆。
- **随后理解**：问题不是写代码能力，而是 Agent 读不到历史判断、长任务状态和已验证经验；AIPD 用“读对 -> 接住 -> 留下”解决。
- **自然动作**：顶部链接直接进入“五分钟开始”，按安装 -> `/aipd` -> `/aipd-case` -> `/aipd-weave` 完成第一次成功。
- **同段竞争**：未发现两个同等主重点；Skill、Leader、Update、topology 均在首次闭环后渐进披露。
- **内部分类压力**：五域和九个 Skill 位于后半部分，用于解释 / 查阅，不压过新人问题。
- **Reduction Delta**：
  - **delete**：移除 Leader / Case 的具体模型与 Fast 配置。
  - **merge**：把重复的版本化 Update 说明合并到快速开始后的已有项目入口。
  - **defer / disclose**：迁移、平台安装、模块细节继续链接到 docs / 源码。
  - **reorder**：公共 Skill 与仓库级 learn 分成两个顶级层级；可靠性依据前置到快速开始之前。
  - **outcome**：新人先理解并完成第一个闭环，再按需学习内部能力。
- **触发器**：未命中；继续迭代缺少新证据，只会产生 churn。

## 残留风险

- `docs/` 全体系仍可能保留升级前措辞，但属于其他 Mission Case 的内容所有权，不影响根 README 本 Case 验收。
- 未运行 build / install：本 Case 只修改根 README 与流程文件，不改变 Skill / 脚本 / dist，打包验证无相关性；且全局边界禁止 install。

## Close 判断

- 目标、Work Package、Design Guardrail 与 Attention Contract 全部通过。
- 无需回 Think / Design / Execute；可以进入 Close 并归档 Case。

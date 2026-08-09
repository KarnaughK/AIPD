# c21 Close

## Close 状态

- **状态**：completed
- **用户验收**：已确认进入 Close。
- **Case Contract**：除 Close / archive 外全部完成。
- **Work Package**：`wp-01` completed。
- **Verify**：passed。
- **安装**：Codex 9 个 Skill 与 3 个 Agent 已安装并核验。
- **当前停止点**：无；Weave 与 archive 已完成。

## 完成性审计

- [x] 用户已确认进入 Close。
- [x] Case Contract 目标与实现验收标准完成。
- [x] Work Package 有完整执行前后 checkpoint。
- [x] Verify Result passed，无残留风险。
- [x] 源模板、当前实例、分发产物和 Codex 安装一致。
- [x] 没有未完成设计、未来计划或临时讨论混入长期知识库。
- [x] Weave 候选完成判断与必要回写。
- [x] Case index 移入已归档。
- [x] Case 目录移动到 `_adoc/case/archive/`。

## 归档候选 / 反向编织判断

| 候选内容 | 来源 | 稳定性 | 候选归属 | Close 判断 |
|---|---|---|---|---|
| Agent MD 等级 2 的结构化讨论回复固定为“我理解 → 展开说说 → 结论 → 横向拓展 → 下一步” | 用户讨论 / Execute / Verify | 已实现、已构建、已安装、已验收 | L4 Product / map | 回写；这是当前用户可见产品行为和高频检索入口 |
| “我理解”承担显式复述握手，前三段先对齐、再展开、后结论 | 用户讨论 / Execute / Verify | 已实现、已验收 | L4 Product | 合并进同一产品边界；暂不扩张为新的 L3 核心模型 |
| “横向拓展”只列相邻方向，“下一步”只给一个自然向下动作且不自动授权执行 | 用户讨论 / Execute / Verify | 已实现、已验收 | L4 Product | 合并进同一产品边界 |
| Design Gate、build 命令、安装输出和一次被拒绝的临时命令 | Case / WP / Verify | 一次性过程 | 仅留 Case | 不回写 |
| 简单短答例外、执行模板、长答规则 | Brownfield / Verify | 既有行为未改变 | 仅留源模板 | 无需重复回写 |

## Weave 回写结果

### 已回写

- `_adoc/L4-product/index.md`
  - 在“AIPD 总入口与初始化”下补充 Agent MD 等级 2 Interaction Protocol 的用户可见行为。
  - 记录固定五段顺序、首段复述边界、横向 / 下一步分工和不越权边界。
- `_adoc/L4-product/map.md`
  - 新增“Agent MD 等级 2 / Interaction Protocol / 回复模板 / 我理解 / 横向拓展 / 下一步”入口。
  - 直接指向 `aipd-skill/src/core/agent-entry/interaction-style.md`。
- `_adoc/map.md`
  - 在高频任务入口增加同一组用户说法，扁平路由到 L4 和源模板。

### 不回写

- 不新增 L3 文档：这次已证明的是具体产品协议，不足以建立新的通用核心模型。
- 不更新 L5：构建、分发和安装规则没有变化。
- 不更新 README / docs：这不是首次用户学习路径所需内容。
- 不把 Case Gate、命令输出、安装日志或被拒绝命令写入长期认知。

### 冲突 / 失效

- 现有长期认知没有复制旧五段标题，不存在需要删除的旧知识。
- `_adoc/map.md` 目前只有“初始化 / AGENTS.md / Agent Entry”宽入口，缺少 Interaction Protocol 的直接检索词；本次补充，不替换原入口。

## Archive 引用审计

- 归档前搜索 `c21-interaction-response-protocol`。
- 当前目录外只有 `_adoc/case/index.md` 的进行中条目引用本 Case。
- 没有其他 Case、L3 / L4 / L5、README、map 或 SOP 依赖当前未归档路径。
- **Archive 决策**：已完成 Weave 与引用复核，并移动到 `_adoc/case/archive/c21-interaction-response-protocol/`。

## Git / 远端动作

- 2026-08-09 用户已授权安装、归档、提交和推送。
- `aipd-update` 的 A / B / C 更新确认优化是用户在 c21 Close 后单独授权的改动，随本轮提交，但不纳入 c21 原目标和验收标准。

## 完成记录

- L4 Product 与项目 map 已完成最小稳定知识回写。
- Case 已标记 completed 并移入 archive。
- 引用与 Markdown 复核通过后提交并推送。

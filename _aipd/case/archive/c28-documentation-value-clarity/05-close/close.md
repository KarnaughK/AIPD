# Close：文档价值清晰度收束

## 关闭前状态

- Think：completed；选择“共享因果主线、分别承担用户任务”。
- Design：completed；Attention Contract、Design Reduction Scan 与 Readiness Gate passed。
- Execute：wp-01 completed；四个授权入口完成精确修改。
- Verify：passed；价值清晰度、Reduction Scan 和自动检查全部通过。
- 阻塞：无。

## 交付摘要

- 根 README 在第 3 行直接呈现“每一次 AI 开发都建立在上一次之上”，再明确项目判断与边界、当前任务状态、已验证经验，最后命名项目记忆 / AIPD。
- docs 索引不再以“不是对象手册”开场，而是让已进入文档的用户按先体验、连续学习、工作时查阅选择路径。
- Guide 01 用“下一次又从零开始”建立问题认知，并从搜索、聊天和代码的缺口收束到三类继承需求。
- Guide 02 承接前章，把三类可复用成果对应到任务前 / 中 / 后的累积循环。

## 验收摘要

- 四入口的第一眼、随后理解、自然下一步均符合 Attention Contract。
- Reduction Scan 无触发项；真实迭代包含 delete / merge / defer / reorder，而非只有加法。
- 四个目标文件总计新增 26 行、删除 25 行；根 README 新增 6 行、删除 12 行。
- 39 个本地链接 / 锚点通过，`git diff --check` 通过，开场内部术语竞争与原文复制检查通过。
- 写入范围仅四个授权文档、本 c28 Case 和 `_aipd/case/index.md`。

## 长期认知与归档候选

| 内容 | 当前状态 | 候选归属 | Close 判断 |
|---|---|---|---|
| 四入口的价值优先叙事和职责分工 | 已完成、已验收 | 用户文档 + 仅留 Case | 不回写 Knowledge；对外事实已由四个文档承载，设计与验收依据留在 Case |
| “每次 AI 开发建立在上一次之上”的核心价值逻辑 | 用户明确确认，本 Case 已实现 | Intent 候选 | 本次明确禁止修改 Knowledge；不创建额外回写动作，交由 Leader 判断是否在其 Mission 范围另行处理 |

- **已回写**：四个授权用户文档本身。
- **延后回写**：无自动 Weave；核心价值如需成为 Intent 正文，由 Leader 在 Mission 总验收中另行判断。
- **仅留 Case**：Think 选项、Attention Contract、Reduction Delta、自动检查和集成风险。
- **无需回写**：没有新增 Product / Engineering 运行规则、SOP、局部 README 或 map 入口。

## Archive 决策

- `rg "c28-documentation-value-clarity" _aipd README.md docs` 在移动前只命中本 Case 自身与 `_aipd/case/index.md`，没有外部路径依赖。
- Case Contract 已完成，wp-01 completed，Verify passed，无未处理阻塞。
- 决策：移动到 `_aipd/case/archive/c28-documentation-value-clarity/`，并把索引从进行中移入已归档。

## Leader 集成注意事项

- 当前隔离 worktree 基于 `e22f97e`；Leader checkout 有上一轮尚未提交的文档改动，这是已知条件。
- Leader 应只吸收四个文档中的精确语义小块：价值结果前置、三类继承成果、四入口职责与相应 Reduction；不要整段覆盖其当前版本。
- c28 Case 与索引状态可整体吸收；若 Leader 已存在 c25-c27 或其他 Case 索引变动，应合并行级状态，不能用本工作树索引覆盖。

## 未执行动作

- 未修改 Skill、脚本、dist、Knowledge 或运行行为。
- 未 build、install、git add、commit、push、发布或执行远端写入。

## 关闭结果

- **状态**：completed / archived。
- **关闭时间**：2026-08-13。
- **归档位置**：`_aipd/case/archive/c28-documentation-value-clarity/`。
- **残留风险**：仅 Leader 语义合并风险；不影响本 Case 验收通过。

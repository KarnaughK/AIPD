# Verify：AIPD V2 学习文档刷新

## 验证前 checkpoint

- **当前问题**：最终 docs 是否在事实、可到达性、用户旅程、独立入口和可维护性五个面都满足 Case Contract。
- **输入**：`case.md`、Design、两个 completed Work Package、最终 docs diff 与当前源码事实源。
- **验证边界**：只读检查；不 build、不 install、不改 Skill / dist，不把历史归档旧术语当活跃错误。
- **预期输出**：逐项证据、Reduction Scan、残留风险和 Close 判断。
- **停止条件**：所有 Contract 标准通过；发现事实 / 链接 / 注意力问题则回 Execute 或 Design 修正。
- **返回位置**：本文件与 `case.md` Verify 摘要。

## Contract 验收

| 完成标准 | 结果 | 证据 |
|---|---|---|
| docs 三条导航覆盖 V2 完整学习面 | passed | `docs/README.md` 保留先体验 / 连续学习 / 按问题查阅，并新增 Update、Interaction、代码拓扑入口 |
| guide 连贯且首次闭环可执行 | passed | 六章路径保持稳定；guide 02 / 03 / 05 / 06 校准 gate、初始化、拓扑和操作卡 |
| modules 边界一致 | passed | 新增 Update / 迁移、Interaction、代码拓扑；既有 Knowledge、Map、Agent Entry、Case、Think、Main / Child、Weave、Leader、构建安装、上下文解耦均有独立入口 |
| README / docs / `_aipd` 分工 | passed | docs 只做教程 / 解释 / 参考；内部合同链接权威源码，不复制模板全文 |
| 链接、旧术语、数量、命令和路径 | passed | 自动检查和定向搜索均通过，详见下节 |

两个 Work Package 均 completed，Design Guardrails 未破坏；本 Case 不命中代码拓扑合同审计。

## 自动检查

- `git diff --check`：passed。
- Markdown 相对链接与锚点：扫描 23 个 docs Markdown，0 failure。
- 公共产物数量：`aipd-skill/src/skills/` 实测 9 个；Codex agent 元数据实测 3 个；仓库级 `.agents/skills/aipd-learn/SKILL.md` 存在且未写成公共产物。
- 命令：docs 中 `/aipd`、`/aipd-case`、`/aipd-inbox`、`/aipd-okr`、`/aipd-update`、`/aipd-weave` 均映射到现有公共 Skill；`$aipd-leader` 为显式公共入口，`$aipd-learn` 为仓库级入口。
- 脚本路径：docs 引用的 `build`、`check-dist`、`dev`、`install`、`install-project`、`migrate-project-schema` 全部存在。
- 权威路径：Update、project-state、Interaction、代码拓扑与 experience assets 的定向路径全部存在。
- 旧活跃语义：`_adoc` / L1-L5 / 旧 Case 命令只出现在迁移或兼容说明；未发现 Case / Step、旧 retriever 名、十个公共 Skill、四个 custom Agent、默认派发 Child 或自动 Leader 等活跃错误。
- 写入范围：只有 `docs/**`、本 Case 目录与 `_aipd/case/index.md` 的本 Case 状态发生变化；根 README、Skill、脚本和 dist 均未修改。
- 未运行 build / `check-dist`：本 Case 没有修改公共源码或构建产物；验证范围是 docs 事实、链接、命令和路径。

## 用户旅程走查

### 先体验

`docs/README.md` -> 构建安装 -> `/aipd` 项目 gate / 初始化 -> `/aipd-case` -> Verify / Close -> `/aipd-weave`。旧项目在入口处被明确分流到 Update，不会在旧结构上继续。

### 连续学习

六章仍按“为什么需要记忆 -> 完整循环 -> 最小认知 -> Case -> Weave / 代码拓扑 -> 操作卡”推进。新增版本和交互信息放在初始化发生的位置，代码拓扑放在 Weave 之后，没有把可选能力提前变成前置课程。

### 按问题查阅

Knowledge / Map / Agent Entry / Interaction、Case / Leader / Think / Main-Child / OKR、Inbox / Weave / Update / Skill、上下文解耦 / 代码拓扑 / 构建安装均可从 docs 索引直接进入。3 个新 modules 开头都说明“什么时候查这篇”，可从深链接独立理解。

## Reduction Scan

- **第一眼**：docs 索引先展示三种入口，读者可以按当前任务选择，不先阅读对象全集。
- **主问题**：索引负责分流，guide 负责第一次成功的因果课程，modules 每页只解释一个能力边界。
- **下一步**：先体验有一个完整操作卡；每章保留单一下一章；modules 通过相关入口继续下钻。
- **渐进披露**：gate 的完整状态机、Interaction 五段协议、代码拓扑合同字段分别留在 modules；首次闭环只保留必要摘要。
- **Reduction Delta**：
  - delete：删除把代码拓扑简化为“纵向黑箱”的单一叙事，以及把 guide-only 角色混同 custom Agent 的歧义。
  - merge：把分散的版本 / migrator / Update 说明收敛为一个参考页，既有页面只保留触发点和链接。
  - defer / disclose：Leader、Interaction、Goal Mode、完整 gate 和代码拓扑均按情境展开，不进入第一次闭环必经步骤。
  - reorder：把项目状态 gate 放在任务循环和初始化动作之前。
  - outcome：读者能更快选择路径，同时保留工作时需要的完整 V2 边界。
- **触发器**：未命中；继续增加内容只会制造重复和 churn。

## 验收结果

- **状态**：passed
- **残留风险**：根 README 属于 Mission 其他 Case；Leader 集成时需确认其最终导航文案仍与本次 docs 三条入口一致，不阻塞本 Case。
- **下一步**：进入 Close，记录归档、交接和恢复位置。

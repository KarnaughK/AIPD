# Think: 根 README 升级事实与新人旅程校准

## 调研前 checkpoint

- **当前问题**：根 README 已具备 C18 的用户旅程，但需要判断哪些 V2 升级事实仍缺失、失焦或容易误解。
- **触发来源**：Case Contract；不是后续 phase 回跳。
- **范围**：对照根 README、当前公共 Skill / 核心权威、Codex 构建安装文档、教程入口与 C18-C24 归档事实；只判断根 README 应怎样投影。
- **不查 / 不做**：不做外部竞品调研，不改内部教程、Skill、脚本、dist 或长期 Knowledge，不追求复制所有内部对象。
- **预期输出**：当前事实包、新人首个成功时刻、保留 / 修改 / 删除判断、未解决风险。
- **停止条件**：能为单文件 quick Design 提供明确章节结构、命令口径、Skill 边界与验收清单。
- **返回位置**：完成后回流 `case.md` 的 Think 摘要并进入 `02-design/design.md`。

## 当前事实包（第一轮）

### 已成熟且应保留

- “任务前读对、任务中接得住、任务后留得下”的新人价值主线。
- `AGENTS.md -> _aipd/index.md -> _aipd/map.md` 的 Map-first 入口。
- 五类并列 Knowledge、Case 生命周期、文件 checkpoint、Weave、Main / Child 与上下文解耦的渐进说明。
- 适用 / 不适用边界和 README / guide / modules 的分流。

### 需要升级校准

- 快速开始应让新人实际调用 `/aipd`、`/aipd-case`、`/aipd-weave`，完成第一个可见闭环，而不是在自然语言创建 Case 后停下。
- Schema v2 与版本化 Update 应在新人遇到旧项目 / 已接入项目时有短而准确的说明，避免把一次性 `_adoc` 迁移与完整版本更新混为一谈。
- 九个公共 Skill 和仓库级 `.agents/skills/aipd-learn/` 应拆成明显不同的分发层级；不能让同一节表格结构造成“十个都可安装”的印象。
- Leader 应说明为显式可选项目主导层；首页避免把特定模型配置写成框架核心价值。
- AI 友好代码拓扑应从单一“上下文解耦”扩展到横向基座 / 横向共享能力 / 纵向业务上下文与显式组合，但保持为进阶、非前置能力。

### 已核对事实

- Codex 默认入口为 `./aipd-skill/scripts/build`、`check-dist`、`install`；`install` 会先 build，再复制九个公共 Skill 和 Codex Agent 到用户级目录。`install-project` 写入目标项目 `.codex/`。安装是外部环境写入，必须由用户明确确认。
- `/aipd` 对全新项目先建立精确两键的 unversioned Schema v2，结构与 Agent Entry 验证通过后才写当前 `aipdVersion`；Level 2 可选安装项目级 Interaction Protocol。
- `/aipd-case` 是 Case Contract -> Think -> Design -> Execute -> Verify -> Close 的唯一公共 Case 入口；Work Package 属于 Execute，但不等于 Child Agent。
- `/aipd-weave` 只处理已完成、已实现、已验收的稳定信息，写长期事实前先给回写方案并等待确认；进行中 Case 只记录 Close 候选。
- `/aipd-update` 只收敛到本机已安装版本，不查远端；读取 `(P,I]` 全部 Release Records 与当前权威后一次合并，支持同版本 drift repair。
- `$aipd-leader` 只能显式启动；一个 active Mission，每个 Case 一个同级 Codex task；不扩大发布、删除、付费或远端写入权限。
- 九个公共 Skill 正好是 `aipd`、`aipd-case`、`aipd-git-push`、`aipd-inbox`、`aipd-leader`、`aipd-mermaid`、`aipd-okr`、`aipd-update`、`aipd-weave`。`.agents/skills/aipd-learn` 是第十个仓库级能力，但不属于公共 build / dist / install 集合。

## 经验命中

- 已读取“教学文档产品化与用户旅程组织”。采用：根 README 作为决策页；按用户任务组织，按内部对象做参考；首个成功时刻必须超过“安装完成”；Verify 同时检查事实、链接、旅程、独立入口和可维护性。

## 回流状态

- **结论**：保留现有“读对 -> 接住 -> 留下”的叙事骨架；重点修改快速开始、可靠性解释、Skill 分发边界、版本化 Update、Interaction Protocol 与完整代码拓扑投影。
- **新人第一个成功时刻**：不止安装成功，而是在目标项目完成 `/aipd` 初始化、用 `/aipd-case` 跑完一个真实目标，并由 `/aipd-weave` 对已验收事实提出回写方案。
- **未解决风险**：README 必须控制篇幅；容易变化的脚本细节、完整规则和迁移边界继续链接到 modules / 源码，不在首页复制。
- **返回位置**：进入 `02-design/design.md`，形成单文件信息架构与 Work Package。

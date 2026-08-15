# Close：AIPD V2 学习文档刷新

## 关闭结论

- **状态**：completed / ready to archive。
- **目标结果**：`docs/**` 的学习导航、连续教程与模块参考已同步 AIPD V2 当前能力和边界。
- **Work Packages**：wp-01 / wp-02 均 completed。
- **Verify**：passed；自动检查、三条用户旅程和 Reduction Scan 均通过。
- **未完成事项**：无。

## 交付摘要

- 新增 Update / Schema 迁移、Interaction Protocol、AI 友好代码拓扑 3 个模块参考页。
- 更新 docs 三条导航，补齐版本 gate、Agent MD 等级、显式 Leader、仓库级 Learn 和代码拓扑入口。
- 校准 guide 02 / 03 / 05 / 06，以及 Agent Entry、构建安装、Case、Main / Child、上下文解耦和 Skill 概览。
- 保留根 README / docs / `_aipd` 三层职责和六章稳定深链接。

## 验证证据

- 23 个 docs Markdown 的相对链接与锚点：0 failure。
- 9 个公共 Skill、3 个 Codex custom Agent、仓库级 Learn：与源码目录一致。
- docs 引用的命令、脚本和权威路径：存在且映射正确。
- 旧活跃术语：无；旧 `_adoc`、L1-L5 和旧 Case 命令只保留在迁移 / 历史说明。
- 修改范围：仅 `docs/**`、本 Case 和 Case 索引；未修改根 README、Skill、脚本或 dist。
- 未执行：build、install、commit、push、发布或其他远端写入。

## 长期认知 / Weave 审计

- 本 Case 只把已有并已验证的 AIPD V2 事实同步到用户学习文档，没有产生新的项目方向、核心模型、产品规则或工程规则。
- `_aipd`、Map、Knowledge 和源码仍是权威事实源；无需用 `aipd-weave` 重复回写。
- 教学文档信息架构经验已经存在于实践经验库，本 Case 没有新增可复用框架规则。
- **判断**：无需回写；执行过程仅留 Case。

## 归档审计

- 归档前搜索 `c27-learning-docs-refresh`：Case 外只有 `_aipd/case/index.md` 活动状态引用。
- 归档目标 `_aipd/case/archive/c27-learning-docs-refresh/` 不存在，无碰撞。
- 移动后同步 Case 索引即可；没有 Knowledge、Map、SOP、README 或其他 Case 路径需要批量更新。

## 残留风险与交接

- 根 `README.md` 属于 Mission 其他 Case。Leader 集成时应确认其最终导航、Skill 数量与本次 docs 三条入口一致。
- 本 Case 不自行 commit；工作树保留给 Leader 核对和集成。
- 归档后恢复位置：`_aipd/case/archive/c27-learning-docs-refresh/case.md` -> `04-verify/verify.md` -> docs diff。

## 外部动作

- install：未执行。
- commit：未执行。
- push / 发布：未执行。

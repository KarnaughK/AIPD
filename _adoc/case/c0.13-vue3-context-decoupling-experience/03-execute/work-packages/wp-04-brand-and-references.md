# WP-04：经验引用与 AIPD 品牌迁移

## 状态

completed / local

## 目标

让 AIPD 正式经验、活跃指南、Agent 规则和索引只暴露 AIPD canonical 名称，并把实现型经验指向根级源码资产及其 GitHub 版本化入口。

## 上下文

- `case.md`
- `02-design/design.md` 的 Reopen 章节
- `03-execute/work-packages/wp-03-source-assets.md`
- `aipd-skill/src/core/experience/index.md`
- `aipd-skill/src/skills/aipd-learn/SKILL.md`
- `aipd-skill/src/core/L5-dev/vue-architecture-diagram-guide.md`

## 文件边界

- `aipd-skill/src/core/experience/**`
- 与 Vue3 controller 命名直接相关的活跃 AIPD 指南 / Agent / skill 行
- 根 README / 项目结构索引
- 本 case 状态记录

## 验收

- [x] 旧品牌命名的正式经验文件迁移为 `vue3-aipd-*`。
- [x] 正式消费入口统一使用 `AipdModalBox`、`AipdForm`、`AipdSearch`。
- [x] 经验正文提供本地源码入口、未发布状态、GitHub latest 模板和 commit-pinned 规则。
- [x] `aipd-learn` 明确实现型经验可带仓库级、非 Skill 打包源码资产。
- [x] 正式面旧品牌扫描无残留；旧名只存在 case / Inbox 等来源与历史记录。
- [x] AIPD build 通过，且 dist / 安装结构不含 `experience-assets/`。
- [x] `aipd-learn` 与资产总入口共同要求 `asset.json` 和仓库级统一验证，后续实现型经验可以重复执行同一门禁。

## 执行记录

- 2026-07-15：完成正式经验、Vue 架构图指南、Agent 指引、Learn 规则、L5、map 与根 README 的 AIPD canonical 迁移。
- 2026-07-15：远端地址在未提交 / 推送前统一标记为发布后模板；许可证推荐动作与 `LICENSE.md` 对齐，不把 GitHub 可见误写成公共授权。
- 2026-07-15：正式经验中的来源与许可证均改为完整仓库路径，统一验证器已证明所有 `experience-assets/` 本地引用存在。

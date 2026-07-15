# Execute

## 状态

- WP-01 AipdModalBox canonical 迁移：completed
- WP-02 Vue3 实践经验库回流：completed
- WP-03 非打包 Vue3 源码资产：completed / local
- WP-04 经验引用与 AIPD 品牌迁移：completed / local
- WP-05 GitHub 发布与 pinned revision：in progress / source revision pushed and pinned verified

## 执行顺序

WP-01 已完成 canonical 命名和目标项目说明；WP-02 以最终 public API 为事实写经验。

## 第一次 Execute 完成 checkpoint（已被 Reopen 扩展）

- 当时的 WP-01、WP-02 均已完成。
- 目标项目生产构建通过；AIPD Claude / Codex skill build 通过。
- 未发现需要回跳 Think / Design 的证据冲突。
- 下一步：`04-verify/verify.md`。

## Verify 回跳

- 触发：独立复核发现一个 Dialog 全局样式回归和两个 QlmForm 经验准确性问题。
- 受影响：WP-01 的样式迁移完整性、WP-02 的 QlmForm 示例与统计口径。
- 不影响：Case Contract、五条经验拆分、public API、其他 Design Guardrails。
- 当前动作：在原 work package 内做定点修正并重跑两仓 build；完成后返回 Verify。

## Reopen checkpoint

- 原因：实现型经验缺少可直接复用的源码资产，原 Close 已撤销。
- Design：根级 `experience-assets/`、三套 Aipd canonical 参考实现、GitHub 引用规则和非打包边界已通过 Readiness Gate。
- 当前动作：先执行 WP-03；资产 API 稳定后执行 WP-04，避免文档再次引用过时文件名或 API。
- 恢复入口：`case.md` -> `02-design/design.md` 的 Reopen 章节 -> 本文件 -> `work-packages/wp-03-source-assets.md`。

## Reopen 完成 checkpoint

- WP-03：三套 canonical 源码、示例、来源 / 权限、asset manifest、package lock 和可重复 full verify 已完成。
- WP-04：正式经验文件迁名、AIPD 指南 / Agent / Learn / map / README 同步、发布状态和许可证动作边界已完成。
- 回跳缺陷：独立代码 / 文档复核发现的问题均已定点修正并增加回归测试。
- 验证：16 项 core tests + 3 项 Vue runtime tests、Vite 6.4.3 smoke、npm audit 0、AIPD Claude / Codex 各 9 skills build、品牌扫描、路径扫描、dist 目录 / 内容哈希隔离和 `git diff --check` 均通过。
- 仓库级入口：`node experience-assets/scripts/verify-assets.mjs --full` 已统一重跑并通过上述资产 / build 门禁。
- WP-05 checkpoint：隔离分支 `codex/c0.13-vue3-experience-assets` 已从 `origin/main` 创建；源码资产提交 `f7c36f250d8c45eb9cb7600aa0186e800c33df1e` 已推送，pinned tree、源码与测试均返回 HTTP 200。
- 下一步：提交发布元数据、合并默认分支并返回 Verify 实测 latest URL。

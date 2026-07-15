# WP-05：发布并锁定源码资产

## 状态

completed / 2026-07-15

## 目标

把已通过本地验收的 Vue3 源码资产和语义经验隔离发布到 AIPD GitHub，记录真实 latest 与包含资产的完整 commit SHA pinned 地址，并让 c0.13 具备重新 Close 的远端证据。

## 进入条件

- 用户明确选择公开许可证，或确认继续维持 owner / authorized-only、仅公开审阅的状态。
- 用户明确授权隔离 commit / push；若要求 latest 指向默认分支，还需明确允许合并或直接更新 `main`。

截至 2026-07-15 01:32 CST，上述授权连续三轮未取得；远端没有 c0.13 分支，默认分支资产 URL 仍为 404。本 work package 停在进入条件前，不执行任何提交、推送、合并或安装。

2026-07-15 13:46 CST 用户明确要求发布，本 work package 恢复。许可证保持 owner / authorized-only；允许执行隔离 commit / push 与让默认分支地址生效所需的合并动作。

## 上下文

- `case.md`
- `03-execute/work-packages/wp-03-source-assets.md`
- `03-execute/work-packages/wp-04-brand-and-references.md`
- `04-verify/verify.md` 的 Reopen Verify
- `experience-assets/README.md`
- `experience-assets/vue3-context-decoupling/asset.json`

## 文件与 Git 边界

- 只纳入 c0.13、五条 Vue3 正式经验、`experience-assets/` 和本次必需的长期索引 / 规则。
- 不混入 c0.12、Agent 路由和用户其他未提交改动。
- 当前分支包含 c0.12 已有提交与脏改动；发布时从 `origin/main` 创建独立 `codex/c0.13-vue3-experience-assets` worktree / 分支，不直接在当前工作树整体提交。
- 不提交或推送来源业务项目；其 `AipdModalBox` 迁移继续保留在该项目工作树，由用户另行决定版本控制动作。

## 执行与验证

1. 在隔离 worktree 中重放并复核 c0.13 文件集合，运行 `node experience-assets/scripts/verify-assets.mjs --full` 和 `git diff --check`。
2. 创建包含源码资产的第一笔提交并推送；以该提交完整 SHA 作为 pinned source revision。
3. 把 `asset.json` 更新为 `github.published: true`，写入 40 位 `commit`、真实 `latest` / `pinned`；同步三条实现型经验和资产 README 的发布状态。
4. 创建发布元数据提交并推送。
5. 用 GitHub 实际响应验证 pinned URL；只有资产进入默认分支后才把 `main` latest 标记为已验证。
6. 回到 Verify，重跑仓库级验证并记录远端证据；通过后进入 Close。

## 验收

- [x] 许可证状态与公开复用文案一致：owner / authorized-only。
- [x] 隔离提交不包含 c0.12 或其他用户改动。
- [x] 远端 pinned URL 含真实完整 SHA `f7c36f250d8c45eb9cb7600aa0186e800c33df1e`，且 tree、源码和测试均返回 HTTP 200。
- [x] 默认分支 latest tree、manifest 和三套源码实际返回 HTTP 200。
- [x] 发布后的 `asset.json`、三条实现型经验和资产 README 状态一致。
- [x] 发布版本通过统一全量验证和 `git diff --check`。

## 完成记录

- 源码资产提交：`f7c36f250d8c45eb9cb7600aa0186e800c33df1e`。
- 发布元数据提交：`f98e73fc471d051c33c5e8b0277398eabb2c0b8f`。
- 发布 PR：`https://github.com/KarnaughK/AIPD/pull/1`。
- 默认分支 merge commit：`be0327968fdd0bcb62159439299426d6a5187989`。
- 权限边界：owner / authorized-only；公开可读不等于公开复用授权。

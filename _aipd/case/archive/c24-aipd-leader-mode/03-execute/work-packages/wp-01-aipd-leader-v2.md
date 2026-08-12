# Work Package: wp-01-aipd-leader-v2

## 目标

交付显式 AIPD Leader 模式的完整闭环：运行合同、Skill、Codex task 编排、工作记忆、V2 发布、安装、项目 Update 和文档同步。

## 边界

- 只新增显式可选层，不改变普通 AIPD 默认 Case 模式。
- 复用现有 Case / Child Agent 系统，不建立第二套执行生命周期。
- 不自动创建 Leader，不支持多个 active Mission，不查询远端 AIPD 版本。

## 主要产物

- `aipd-skill/src/skills/aipd-leader/`
- `aipd-skill/src/core/leader/`
- `aipd-skill/src/platforms/codex/core/leader/`
- `aipd-skill/src/core/updates/releases/v2.md`
- `docs/modules/leader.md`
- `AGENTS.md` 与相关 Knowledge / Map / README / manifest / update log

## 验收结果

- [x] 显式调用门禁与角色边界可由静态检查验证。
- [x] build / `check-dist` 和发布 fixture 通过。
- [x] 用户级安装与 dist 一致。
- [x] 本项目 V1 -> V2 Update 成功。
- [x] 功能提交已推送并进入本地 `main`。

## 执行记录

- **状态**：completed。
- **实现提交**：`898b6bc`。
- **验证入口**：`04-verify/verify.md`。
- **残留观察**：真实项目中 Leader 自主工作记忆的自然形态仍需后续样本，不影响本 Work Package 验收。

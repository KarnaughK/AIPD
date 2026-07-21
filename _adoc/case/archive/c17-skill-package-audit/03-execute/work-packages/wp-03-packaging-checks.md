# Work Package: wp-03 - 工具链一致性与回归检查

> **所属 Case**: c17-skill-package-audit
> **Phase**: Execute
> **类型**: dev / verify
> **推荐 Agent**: Main Agent
> **依赖**: wp-01、wp-02

## 目标

统一所有 install / dev 入口的 legacy cleanup，并把最终 Skill 审计固化为只读、可重复的 `check-dist`。

## 设计依据

- Requirements / Brownfield / Context Boundary：`02-design/design.md`
- Readiness Gate：passed
- 复杂度爆点：名单复制漂移、人工审计不可重复。
- 解耦方式：共享数据文件只维护名单；检查器只验证、不构建、不安装。
- 文件边界：`aipd-skill/scripts/`。

## 横向模块

- [x] 6 个 install / dev 入口统一复用 legacy Skill 名单。
- [x] 新增 `scripts/check-dist`，覆盖集合、同步、引用、平台差异、关键旧语义与 cleanup 接入。
- [x] build、shell 语法和二次产物审计通过。

## 验收标准

- [ ] cleanup 名单只有一个 owner，6 个入口全部接入。
- [ ] `scripts/check-dist` 成功且对失败条件退出非零。
- [ ] build 后 Codex / Claude 每个 Skill 都有二次 pass 记录。
- [ ] 未执行 install。

## 不做

- 不运行任何用户级或项目级 install / dev 安装入口。
- 不发布、不提交、不推送。

## 执行记录

**状态**：completed

**完成时间**：2026-07-21

**主要改动**：新增 `scripts/legacy-skills` 和 `scripts/check-dist`；6 个入口复用共享名单；最终产物允许的差异明确为 Case agent guide 与 Learn locator。

**验证结果**：`scripts/build` 成功，`scripts/check-dist` 成功，全部相关 shell `bash -n` 和 scoped `git diff --check` 成功。

**执行后 checkpoint**：completed；三个 Work Package 全部完成，进入 Verify；未执行 install。

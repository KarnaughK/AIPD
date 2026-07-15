# Verify

## 状态

passed

## 验收项

- [x] 新 Design phase 流程覆盖需求契约、底层事实源、后端设计、前端设计、上下文解耦、work package 切片和 Verify 护栏。
- [x] 新流程能说明何时停留 Think、何时进入 Design、何时进入 Execute。
- [x] 新流程能说明 Design / Execute / Verify 发现上游缺口时如何带原因回跳到 Think 或 Design。
- [x] 新流程能防止 Agent 把未确认产品规则写成数据库字段、接口合同或前端状态事实。
- [x] 新流程没有把外部项目专有流程原样搬进 AIPD。
- [x] 源码修改后已运行 `./aipd-skill/scripts/build`。
- [x] 用户确认后已运行 `./aipd-skill/scripts/install-codex`。

## 验收记录

- 2026-06-28：`./aipd-skill/scripts/build` 通过，Claude / Codex 两套 skill 均构建完成。
- 2026-06-28：在 dist 产物中确认 `aipd-case` 包含新增的回跳规则、Design 大流程、case 模板字段、work package 模板字段和 `aipd_product_manager.md` 指引。
- 2026-06-28：用户确认“打包安装”后运行 `./aipd-skill/scripts/install-codex`，安装到 `/Users/yangzongru/.codex/skills/` 和 `/Users/yangzongru/.codex/agents/`，并完成安装后内容检索校验。

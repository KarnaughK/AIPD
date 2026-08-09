# Verify：产品注意力与触发式减法机制

## Verify Result

**状态**：completed

## 验收项

- [x] 源码存在具象产品设计经验，不依赖任务 Prompt 保存方法。
- [x] experience index 能按产品文档、原型、UI 和简化反馈路由。
- [x] Design 采用条件 Attention Contract，未给普通 Case 增加固定流程。
- [x] Verify 对真实产物执行 Reduction Scan，并能带证据回到 Design。
- [x] Goal Mode 将回跳视为内部质量 Gate，在 Case Contract 边界内自主滚动。
- [x] Reduction Delta 要求实际减法 / 重排；停止依据是收敛而非轮数或 Token。
- [x] `aipd-skill/scripts/build all` 通过。
- [x] `aipd-skill/scripts/check-dist` 通过。
- [x] `git diff --check` 和目标关键词检查通过。
- [x] 用户确认后执行 Codex install，并核验安装产物包含新规则。

## 验证记录

- 2026-07-22：`aipd-skill/scripts/build all` 成功构建 Claude / Codex 各 9 个 Skill。
- 2026-07-22：`aipd-skill/scripts/check-dist` 通过源码同步、静态引用、平台差异、禁止语义和 cleanup 入口检查。
- 2026-07-22：`git diff --check` 通过。
- 2026-07-22：Codex / Claude 最终 `aipd-case` 产物均检出新 experience、Verify Reduction Scan 和 Goal Mode 自主回跳规则。
- 2026-07-22：用户明确确认安装；`aipd-skill/scripts/install-codex` 成功安装 9 个 AIPD Skill 和 3 个 Agent 模板。
- 2026-07-22：用户级 `aipd-case` 的 SKILL 与新 experience 均和 dist 一致；实际检出经验索引、Reduction Scan、Goal Mode 自主回跳规则，旧 Case Skill 入口不存在。

## 残留风险

- 首次真实产品 Case 运行仍应观察 Agent 是否正确识别触发器、是否出现“表面删一项又补三项”等规避行为；如出现，再以实际 transcript 进入下一次 Learn，而不是现在预建更重流程。

## 下一 phase 判断

- 所有 Verify 条件已通过；等待普通 Case 的 Close phase 确认。

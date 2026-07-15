# Case 索引

Case 是一次需要 AI 参与处理、带目标契约和上下文索引、按 Think / Design / Execute / Verify / Close 推进、可沉淀经验并归档的短周期目标事项。

## 当前进行中

| Case | 状态 | 目标 | 入口 |
|------|------|------|------|
| 暂无 | - | - | - |

## 已归档

| Case | 完成时间 | 目标 | 归档位置 |
|------|----------|------|----------|
| 暂无 | - | - | - |

## 记录规则

- 新 Case 创建在 `_adoc/case/cN-{name}/`。
- 每个 Case 的入口文件是 `case.md`。
- 新 Case 默认使用 contract + phase-first 目录：`case.md` 承载 Case Contract，展开材料放入 `01-think/`、`02-design/`、`03-execute/`、`04-verify/`、`05-close/`。
- Work Package 放在 `03-execute/work-packages/`，文件语义是可验收目标包，不是微步骤。
- Think 调研、实验代码、数据采样和方案比较分支放在 `01-think/{branch}/`。
- Design 说明和决策记录放在 `02-design/`。
- 旧 Case 中的 `doc/`、`steps/` 或 `01-goal/` 不再兼容运行；继续推进前应先迁移为当前 contract + phase-first case。
- 完成并验收后移动到 `_adoc/case/archive/`。

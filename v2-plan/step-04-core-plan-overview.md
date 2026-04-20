# 第 4 步：新建 src/core/plan/overview.md

## 任务

从现有 `references/planning/index.md` 提取 Plan 机制的知识说明部分，不含具体阶段的执行步骤。

## 要写入的文件

`src/core/plan/overview.md`

## 内容要求

从 `references/planning/index.md` 提取以下部分：

1. **Plan 是什么**：一句话定位
2. **三级版本号（A.B.C）**：表格，含含义、谁定、示例
3. **Plan 类型**：dev / research / review 表格
4. **目录结构**：`_adoc/plan/` 的目录规范
5. **生命周期概述**：7 步流程的简要列表（只列步骤名，不展开具体执行细节）
6. **关键原则**：现有文件末尾的 8 条原则

**不包含**：
- 阶段 1-5 的具体执行步骤（那些分别在 plan-create / plan-run / plan-archive 的 SKILL.md 里）
- 子 Agent 指引（那些在各 skill 的 references/ 里）
- 模板内容（那些在 core/plan/templates/ 里）

## 参考源文件

- `references/planning/index.md`（第 1-63 行的机制说明 + 第 556-564 行的关键原则）

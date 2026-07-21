# Work Package: wp-02 - 校准能力模块与当前 AIPD 事实

> **所属 Case**: c18-readme-learning-docs-productization
> **Phase**: Execute
> **类型**: docs
> **推荐 Agent**: Main Agent
> **依赖**: wp-01

## 目标

把 `docs/modules/` 校准为准确、可独立进入的 explanation / reference 层，消除过时流程和孤立对象说明。

## 设计依据

- Requirements Contract / Brownfield / Context Boundary / Readiness：`02-design/design.md`
- **复杂度爆点**：每篇 module 独立可读，又不能重复整套框架或与源码职责漂移。
- **解耦方式**：每篇先定位“何时需要 / 在完整循环里的位置”，只展开本模块独有事实，跨模块关系用链接。
- **主干职责**：`docs/README.md` 维护导航，module 维护单一能力解释与边界。
- **文件边界**：`docs/modules/*.md`。

## 不允许固化的假设

- 不把 Case 前 Think、step 微步骤或子 Agent 默认派发作为现行规则。
- 不把 Goal Mode 写成 Case 本体 phase。
- 不把 Learn 与 Weave、SOP 与脚本、OKR 与 todo 混为一谈。

## 横向模块

- [x] 认知读取：ADOC、map、Agent Entry。
- [x] 任务执行：Case、Think、Main / Child、OKR。
- [x] 维护与能力：Weave、Inbox、Skill、构建安装、上下文解耦。

## 上下文文档

- `case.md`
- `02-design/design.md`
- `docs/modules/*.md`
- `aipd-skill/src/skills/*/SKILL.md`
- `aipd-skill/src/core/case/`、`aipd-skill/src/core/agent-guide.md`、`aipd-skill/src/core/experience/index.md`
- `_adoc/L3-core/vertical-concept-modules.md`、`horizontal-capabilities.md`、`_adoc/L4-product/map.md`、`_adoc/L5-dev/index.md`

## 执行前 checkpoint

- **当前目标**：在 wp-01 主线确定后逐篇校准 module。
- **恢复入口**：本文件 -> `02-design/design.md#modules工作时按需进入`。
- **执行边界**：只修改 `docs/modules/` 与执行状态文件。
- **预期输出**：准确的 modules 层和校准记录。
- **停止条件**：所有 module 与当前源码事实一致，或发现源码与长期认知冲突需回跳 Design / Think。
- **返回位置**：更新本 work package 和 `03-execute/execute.md`，进入 Verify。

## 验收标准

- [x] 九个 Skill 和协作顺序与源码一致。
- [x] Case / Think / Work Package / Goal Mode / Main-Child 语义准确。
- [x] Weave / Learn / Inbox / Update / OKR / SOP / 实践经验边界清楚。
- [x] 构建与安装命令、平台和目录事实准确。
- [x] modules 能从搜索直接进入，不依赖先读整套 guide 才能理解。

## 不做

- 不修改源码、构建脚本、`_adoc` 稳定认知或实践资产。

## 执行记录

**状态**：completed

**完成时间**：2026-07-21

**主要改动**：

- 重写 Case、Think、Main / Child、OKR、Inbox、Skill、Agent Entry 七篇关键模块。
- 为 ADOC、Map、Weave、上下文解耦、构建安装补充当前使用位置、边界和验证入口。
- 清除 Case 前持久化 Think、step 微步骤、平台专属 `fork_context` 通用化和默认分身等旧语义。
- 补充 Goal Mode、文件 checkpoint、角色 Agent、SOP、实践经验库与经验源码资产边界。

**验证结果**：

- `docs/modules/` 全部 11 个文件已纳入本轮一致性校准。
- 九个 Skill 名称与 `aipd-skill/src/skills/`、`check-dist` 预期集合一致。
- 旧命令和旧目录只保留在迁移说明中；未作为现行入口。
- 完整链接、术语、命令和 Markdown 格式检查进入 Verify。

**执行后 checkpoint**：

- **当前结论**：wp-02 completed；没有暴露需回跳 Design / Think 的事实冲突。
- **下一步**：进入 Verify。
- **恢复入口**：`04-verify/verify.md`。

**遇到的问题**：无。

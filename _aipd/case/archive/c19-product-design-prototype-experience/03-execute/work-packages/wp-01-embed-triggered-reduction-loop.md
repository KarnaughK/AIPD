# Work Package: wp-01 - 嵌入触发式减法循环

> **所属 Case**: c19-product-design-prototype-experience
> **Phase**: Execute
> **类型**: docs / process
> **推荐 Agent**: Main Agent
> **依赖**: `02-design/design.md`

## 目标

让产品类 AIPD Case 在运行中自动获得注意力自审、条件回跳、自我推翻和自适应停止能力，而不是依赖任务 Prompt 或固定迭代轮数。

## 设计依据

- Requirements / Brownfield / Context Boundary：`02-design/design.md`
- Readiness Gate：passed
- **复杂度爆点**：Agent 倾向用加法证明完整度；固定轮数会扩大错误方向并拖慢普通任务。
- **解耦方式**：具象经验保存判断；Design 写暂定契约；Verify 读取真实产物触发回跳；Goal Mode 负责无人监督下继续滚动。
- **主干职责**：Case 生命周期保持不变，只在现有 Design / Verify Gate 内增加条件语义。

## 横向模块

- [x] 产品设计注意力与减法经验正文及索引。
- [x] Design Attention Contract 条件入口。
- [x] Verify Reduction Scan、触发器、Reduction Delta 和收敛规则。
- [x] Goal Mode 自主回跳语义。

## 上下文文档

- `case.md`
- `02-design/design.md`
- `aipd-skill/src/core/experience/index.md`
- `aipd-skill/src/core/case/phases/design.md`
- `aipd-skill/src/core/case/phases/verify.md`
- `aipd-skill/src/core/case/goal-mode.md`

## 验收标准

- [x] 经验索引能按产品文档、原型、UI、简化反馈命中新经验。
- [x] Design 只在产品注意力相关任务中要求短 Attention Contract。
- [x] Verify 对真实产物扫描，命中触发器时明确回到 Design。
- [x] 回跳必须形成包含减法或重排的 Reduction Delta。
- [x] Goal Mode 能自主循环，不把内部 Gate 转成用户审批。
- [x] 停止依赖收敛证据，不依赖固定轮数或 Token。
- [x] build 与 check-dist 通过。
- [x] 安装后产物验证通过。

## 不做

- 不新建专用产品设计 Skill、Case phase、SOP 或固定模板字段。
- 不修改外部产品项目。
- 不执行 install、提交、推送或发布。

## 执行记录

**状态**：completed（源码实现）；构建与安装验证由 Verify 承接。

**完成时间**：2026-07-22

**主要改动**：

- 新增具象经验并登记索引。
- 修改 Design / Verify / Goal Mode 三个运行规则。
- 把早期固定轮数结论改为触发式循环。

**执行后 checkpoint**：

- **当前结论**：源码实现完成，设计未暴露新的生命周期缺口。
- **下一步**：进入 Verify 运行构建与产物检查。
- **恢复入口**：`../../04-verify/verify.md`。

**遇到的问题**：无。

**Weave 候选**：本 Work Package 本身已经直接更新 AIPD 框架经验和运行规则，不再另行回写项目五类 Knowledge。

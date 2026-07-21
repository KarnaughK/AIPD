# Work Package: wp-01 - 核心入口与 Case 等价语义

> **所属 Case**: c17-skill-package-audit
> **Phase**: Execute
> **类型**: docs / process
> **推荐 Agent**: Main Agent
> **依赖**: `02-design/design.md`

## 目标

修复 `aipd`、`aipd-case`、`aipd-update` 最终行为，使初始化、状态扫描、Case 运行和平台覆盖统一遵守当前核心认知。

## 设计依据

- Requirements / Brownfield / Context Boundary：`02-design/design.md`
- Readiness Gate：passed
- 复杂度爆点：总入口、公共 core、Agent Entry 与平台 guide 共同描述 Case 和调度。
- 解耦方式：公共语义放公共 owner；平台文件只保留平台差异；恢复链统一。
- 文件边界：`src/skills/aipd*`、`src/core/L1-intent`、`src/core/case/phases/execute.md`、`src/core/agent-entry/template.md`、`src/platforms/*/core/agent-guide.md`。

## 横向模块

- [x] 状态扫描改为 Current Phase / Phase State / Work Package，并按净收益选择 Main / Child。
- [x] Agent MD 先选 0/1/2 再写，L1 引导移除固定阶段和错误目录职责。
- [x] Codex / Claude Case guide 恢复链和运行语义等价，派发后显式加载平台 / 角色 guide。
- [x] `aipd-update` 增加当前 Case 结构审计与破坏性迁移边界。
- [x] Agent Entry 的 retriever fallback 使用最终包内可解析入口，不指向源码 checkout。

## 验收标准

- [ ] 相关产物不再把阶段编号或 Step 计数作为当前流程。
- [ ] 等级 0 不可能在询问前已写 Agent MD。
- [ ] 两平台 guide 都包含 map、Case Contract、Current Phase、checkpoint 和 Goal Mode 条件。
- [ ] update 的声明与实际 Case 审计矩阵一致。

## 不做

- 不删除用于旧结构检测 / 拒绝 / 迁移的兼容描述。
- 不改教学文档或 dist。

## 执行记录

**状态**：completed

**完成时间**：2026-07-21

**主要改动**：总入口状态扫描和 Agent MD 顺序更新；L1 引导回到自然路由；Case 平台 guide 对齐；update 补 Case 结构审计；retriever fallback 改为包内 reference。

**验证结果**：目标旧语义扫描无命中；构建后两平台相关 reference 完整；二次矩阵通过。

**执行后 checkpoint**：completed；进入 WP-02；无 Design 回跳。

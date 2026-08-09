# Work Package: wp-01 - ADOC 代码拓扑认知落地

> **所属 Case**: c20-aipd-knowledge-execution-code-topology
> **Phase**: Execute
> **类型**: docs
> **推荐 Agent**: Main Agent
> **依赖**: `02-design/design.md`

## 目标

让 AIPD 项目 ADOC 对“AI 友好代码拓扑”拥有单一、可检索、术语一致的长期事实源。

## 设计依据

- Requirements Contract：`../../02-design/design.md#requirements-contract`
- Brownfield Delta：`../../02-design/design.md#brownfield-delta`
- Context Boundary：`../../02-design/design.md#context-boundary--file-ownership`
- Readiness Gate：passed
- 复杂度爆点：代码拓扑与 AIPD 知识 / 流程结构都使用“横向、纵向”，现有摘要又把代码组织写成二元对立，容易让 Agent 推导出“全面纵向”。
- 解耦方式：新 L3 文档负责代码拓扑正文；L1 / index / map 只保存方向摘要或检索入口；知识系统纵横文档只声明自身命名空间。
- 主干职责：`_adoc/L3-core/index.md` 继续维护八个核心成立模型，不复制新文档全文，也不新增第九个模型。
- 文件边界：只修改 Design 列出的八份长期 ADOC 文件并新增一份 L3 主文档。

## 不允许固化的假设

- Page One 多站点与 Guessword.io 多游戏目标拓扑尚未完整实现，不能写成已验证的通用目录方案。
- Skill 中的承载位置、加载时机和 token 预算仍为 deferred，不能在本工作包中提前决定。
- “重复三次”、文件夹类型或固定 token 数不能成为自动判定纵向上下文或共享抽取的规则。

## 并列工作项

- [x] 新增 `_adoc/L3-core/ai-friendly-code-topology.md` 主事实源。
- [x] 同步 L1、L3 index、vertical / horizontal 命名空间与“并列扩展”术语。
- [x] 同步项目 index / map 与 L3 map 的直接入口。
- [x] 完成链接、术语、格式和范围校验。

## 上下文文档

执行前必须读取：

- `../../case.md`
- `../../02-design/design.md`
- `../../01-think/cross-case-code-topology-placement/summary.md`
- `../../../../../L1-intent/intent.md`
- `../../../../../index.md`
- `../../../../../map.md`
- `../../../../../L3-core/index.md`
- `../../../../../L3-core/map.md`
- `../../../../../L3-core/vertical-concept-modules.md`
- `../../../../../L3-core/horizontal-capabilities.md`
- `../../../../../L4-product/index.md`

## 执行前 checkpoint

- **当前目标**：建立代码拓扑主事实源，并让所有高频入口一跳命中。
- **恢复入口**：`../../case.md` -> `../../02-design/design.md` -> 本文件。
- **执行边界**：允许修改本工作包与 Design 的 ADDED / MODIFIED 清单；禁止修改 Skill、docs、README、外部项目及其他 Case。
- **预期输出**：一份 L3 主文档、八份摘要 / 入口同步、Case 执行记录和验证结果。
- **停止条件**：全部验收通过；或发现会改变主模型 / Skill 方案的设计缺口时停止并回到 Design。
- **返回位置**：写回本文件、`../execute.md` 与 `../../case.md`；ADOC 完成后停在 Skill 节点前。

## 验收标准

- [x] 新 L3 主文档定义横向基座、横向共享能力、纵向业务上下文和显式组合边界。
- [x] 文档解释可变粒度、复制与共享的晋升顺序、共享条件和非目标。
- [x] 代码拓扑与 AIPD 的纵向概念模块 / 横向功能能力具有明确命名空间。
- [x] `_adoc/index.md`、`_adoc/map.md`、L3 index 和 L3 map 可直接命中新文档。
- [x] 当前长期 ADOC 不再用“横向铺模块 / 横向铺开”描述并列增加独立模块。
- [x] `git diff --check`、路径存在检查和改动范围审计通过。

## 不做

- 不修改 `docs/`、README、Skill 源码、模板、dist、构建或安装脚本。
- 不更新外部项目，也不新增未经完整验证的技术栈实践经验。
- 不执行 Skill build 或 install。

## 执行记录

**状态**：completed

**完成时间**：2026-08-09

**主要改动**：
- 新增 `_adoc/L3-core/ai-friendly-code-topology.md`，固定三类模块、显式组合、共享晋升顺序、可变粒度和非目标。
- 同步 L1、L3 index、两级 map、AIPD 知识系统纵横文档和 L4 Design 术语。
- 将空间上的模块增加统一改称“并列扩展”，并明确代码拓扑与 AIPD 知识 / 流程系统属于两个命名空间。

**验证结果**：
- `git diff --check` 通过；新增文件单独 whitespace 检查通过。
- 新主文档、八份同步文件、Case 执行文件及 work package 路径存在检查通过。
- 项目 index / map 与 L3 index / map 均可直接检索到 `ai-friendly-code-topology.md`。
- 术语检索确认“横向铺模块”只保留在新文档的否定说明中，不再作为当前长期规则。
- 改动范围只涉及 `_adoc/`；没有修改 `docs/`、README、Skill 源码 / dist 或外部项目。

**执行后 checkpoint**：
- **当前结论**：ADOC 节点完成；模型正文、摘要、路由和术语已经一致。
- **下一步**：回到 Design，单独设计 Skill 打包产物的承载位置和按需加载方式；本工作包不继续修改 Skill。
- **恢复入口**：`../../case.md`、`../../02-design/design.md#节点-2skill-打包产物认知承载` 与本文件。

**遇到的问题**：无。

**回跳 / 重开**：
- ADOC 执行没有暴露节点 1 的设计缺口；因 Case 仍包含独立的 Skill 节点，执行完成后按既定边界回到 Design。

**Weave 候选**：
- AI 友好代码拓扑已直接回写 `_adoc/L3-core/ai-friendly-code-topology.md` 及必要 map；无需在 Close 重复回写。

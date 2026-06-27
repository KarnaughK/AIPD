# Step s11: 收敛 L3 核心成立模型

## 状态

已完成

## 目标

在 L1 / L2 已刷新后，整理 AIPD 自身的 L3 Core，明确当前项目不是沿用旧测试用例项目的“业务对象模型”，而是以框架型项目的核心成立模型为主。

## 上下文

- `_adoc/L1-intent/intent.md`
- `_adoc/L2-research/index.md`
- `_adoc/L3-core/index.md`
- `_adoc/L3-core/map.md`
- `_adoc/map.md`

## 执行判断

本次讨论后，AIPD 的 L3 先收敛为六个核心成立模型：

1. 项目知识库维护模型。
2. Map-first 上下文检索模型。
3. 任务执行模型。
4. Agent 协作思考模型。
5. SOP / AI 程序模型。
6. AI 原生代码架构模型。

其中，项目知识库和 Weave 反向编织不再拆成两个 L3 模型。Weave 是项目知识库维护模型中的更新机制。

上下文检索必须明确为 Map-first，而不是泛泛的 RAG、全文搜索或目录跳转。map 是 AIPD 给 Agent 准备的显性读取结构，是当前框架的核心差异点之一。

Inbox、Update、Learn、Desktop、Mermaid 等不作为独立 L3 模型。它们是六个核心模型在 L4 / L5 / SOP / case 中的功能化结果或工具入口。

## 改动文件

- `_adoc/L3-core/index.md`
- `_adoc/L3-core/map.md`
- `_adoc/index.md`
- `_adoc/case/archive/c0.7-repo-structure-reclassification/case.md`

## 验收

- L3 总纲明确列出六个核心成立模型。
- L3 map 可从用户说法命中六个核心模型。
- 项目总索引 L3 状态已更新为已刷新。
- 本 step 记录已写入当前 case。

# Verify: AIPD Desktop Zero

## 最终验收范围

本阶段验收旧 case 迁移，以及 Desktop 方向取消后的代码、工作树、分支和现行产品入口清理；不验收 Desktop 功能实现。

## 迁移验收

- [x] 顶层 `doc/` 已迁移到 phase 材料目录。
- [x] 顶层 `steps/` 已迁移到 `03-execute/work-packages/`。
- [x] `case.md` 已包含 Case Contract 和 Case Runtime。
- [x] phase 入口文件已补齐。
- [x] 专用工作树 `/Users/yangzongru/Desktop/CodeKKK/AIPD-2-c8-aipd-desktop` 已删除。
- [x] 工作树中的未提交 Desktop 实验代码、依赖、构建产物、设计 QA 图片和未提交 C16 子 Case 已随之删除。
- [x] 本地分支 `codex/c8-aipd-desktop` 已删除；该分支没有独有提交。
- [x] 不存在 `origin/codex/c8-aipd-desktop` 远端分支。
- [x] 主线 `aipd-desktop/README.md` 占位文件已删除。
- [x] L1 / L2 / L4 / map / README / 构建文档中的现行 Desktop 产品入口已撤下。
- [x] 主工作区中与 C8 无关的未提交内容保持不变。

## 风险

- 归档调研资料可能过期，尤其是 Codex App Server / SDK 相关接口。
- 归档资料中的产品设想和工程选择只用于解释历史，不得视为当前方向。

## 验收结果

- **状态**：passed（取消与清理验收）
- **说明**：C8 / C16 的未提交 Desktop 实验已清除，专用分支和现行产品入口已撤下；Case 可以按 `stopped / killed` 归档。

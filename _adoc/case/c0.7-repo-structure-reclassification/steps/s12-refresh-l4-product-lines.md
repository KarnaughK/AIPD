# Step s12: 刷新 L4 产品功能线

## 状态

已完成

## 目标

在 L3 六个核心成立模型稳定后，刷新 AIPD 自身的 L4 Product，明确 AIPD 当前有哪些用户可见、Agent 可调用、case 可引用的产品能力，并区分 L4 产品边界与 L5 工程实现细节。

## 上下文

- `_adoc/L3-core/index.md`
- `_adoc/L3-core/map.md`
- `_adoc/L4-product/index.md`
- `_adoc/L4-product/map.md`
- `_adoc/map.md`
- `README.md`
- `aipd-skill/src/skills/*/SKILL.md`
- `_adoc/sop/index.md`
- `_adoc/case/c0.8-aipd-desktop-zero/case.md`

## 执行判断

L4 不应只列已有 skill，也不应展开 skill 内部执行细节。当前采用“产品能力层”作为 L4 组织方式：

- 用户能主动调用、进入或感知的能力进入 L4。
- 能力内部如何适配平台、如何构建安装、如何调度 Agent，进入 L5。
- 单个 skill 的执行步骤留在对应 `SKILL.md`。
- 一次性执行过程留在 case / step。

本次 L4 覆盖：

1. AIPD 总入口与初始化。
2. Map-first 认知加载。
3. Inbox 临时收件箱。
4. Case Create。
5. Case Run。
6. Case Archive。
7. Weave。
8. Learn。
9. AIPD Update。
10. Mermaid / MMD。
11. Git Push。
12. SOP 库。
13. AIPD Desktop。

其中 AIPD Desktop 仍是规划中能力，依据是 C0.8 case；SOP 库目前是壳子能力，依据是 `_adoc/sop/`。

## 改动文件

- `_adoc/L4-product/index.md`
- `_adoc/L4-product/map.md`
- `_adoc/index.md`
- `_adoc/map.md`
- `_adoc/case/c0.7-repo-structure-reclassification/case.md`

## 验收

- L4 有总纲正文，不再只有 map。
- L4 map 覆盖现有 10 个 skill、SOP 库和 AIPD Desktop。
- L4 明确产品边界，不把工程实现细节塞入 L4。
- 项目总索引和总 map 已同步 L4 状态与入口。

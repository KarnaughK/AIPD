# 初始化默认文档壳子

## 状态

已完成。

## 决策

`/aipd2` 初始化时不只创建目录，还要创建最基础的 `_adoc` 索引壳子，让新项目接入 AIPD 后立刻有可读入口。

## 已落地

- 新增 `_adoc/index.md` 模板：`src/core/adoc/templates/index.md`
- 新增 `_adoc/case/index.md` 模板：`src/core/case/templates/index.md`
- 新增 `_adoc/okr/index.md` 模板：`src/core/okr/templates/index.md`
- `/aipd2` 注入上述模板。
- `/aipd2` 初始化时写入：
  - `_adoc/index.md`
  - `_adoc/case/index.md`
  - `_adoc/okr/index.md`
- 如果目标文件已存在，不覆盖，基于现有内容继续。
- 修正 `/aipd2` 初始化目录为当前结构：`L2-research`、`L3-core`。

## 后续

已有 AIPD 项目的刷新/补齐机制还未落地，继续保留在 todo 中。

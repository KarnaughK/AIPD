# OKR

AIPD 中的 OKR 默认指飞书 OKR。它回答“当前阶段为什么做这些事、什么结果说明方向被推进”，不负责承接具体任务执行。

## OKR、Case 和 Work Package

```text
L1 Intent -> 飞书 OKR -> Case -> Work Package -> Verify / Close
```

- L1 定长期方向和取舍。
- OKR 定阶段目标、关键结果和对齐关系。
- Case 固定一个短周期目标的 Contract 与生命周期。
- Work Package 承接 Execute 内的可执行目标包。

OKR 不是 todo 列表，也不替代产品路线图。具体执行记录留在 Case / Work Package；长期稳定知识进入 L3 / L4 / L5、map 或局部 README。

## `/aipd-okr` 做什么

- 查看和编辑飞书 OKR 周期、Objective、Key Result、量化指标和进展。
- 查询对齐关系。
- 把飞书 ID、目标、风险和建议压缩成 OKR 经验包，避免把原始 CLI / JSON 带回主线。
- 在用户明确要求和权限允许时执行创建、同步或删除等远端操作。

飞书远端写入和删除不是普通本地文档编辑；必须遵守对应确认与权限边界。

## 什么时候需要对齐

- 创建 Case 时，判断它是否推进当前 KR。
- Case 边界开始扩张时，判断新增工作是否仍属于阶段目标。
- Close 时，判断结果怎样影响 KR 进展，以及是否产生下一项 Case。

单项目可以直接引用相关 O / KR。个人多项目场景也可以由一个全局 AIPD 项目承载更高视野的 Objective，再让子项目 Case 引用对应 KR；跨项目关系仍以飞书 OKR 为事实源。

## 高噪声查询

单次查询上下文可控时，Main 可以直接完成。涉及多个周期、大量原始 JSON 或跨项目对齐时，可以用 Child Agent 隔离查询过程，只回流压缩后的 OKR 经验包。

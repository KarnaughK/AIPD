# Agent Entry

Agent Entry 是 Agent 进入项目后的第一跳规则。

在 AIPD2 项目里，这个入口通常由 `AGENTS.md`、`_adoc/index.md` 和 `_adoc/map.md` 共同承担。

## 基本读取链路

普通任务涉及业务功能、页面、弹窗、权限、接口、核心概念或跨模块规则时，Agent 应先按以下顺序取上下文：

```text
AGENTS.md
-> _adoc/index.md
-> _adoc/map.md
-> 相关 L3 / L4 / L5 / 局部 README / case
-> L6 代码
```

`_adoc/map.md` 是第一跳检索地图，不是额外任务。它帮助 Agent 用更少 token 找到正确上下文。

## case 恢复链路

当任务处于 case-run、长任务续跑、上下文压缩或状态不确定时，应按文件事实源恢复：

```text
AGENTS.md
-> _adoc/index.md
-> _adoc/map.md
-> _adoc/case/index.md
-> 当前 case.md
-> 当前 step
```

聊天上下文只是临时缓存。聊天记忆和 case / step 文件冲突时，应先指出冲突，再以文件为准继续。

## README、docs、_adoc 的分工

- `README.md`：面向第一次打开仓库的人，解释项目为什么存在和如何继续阅读。
- `docs/`：面向人的学习文档。
- `_adoc/`：面向 Agent 的项目认知事实源。
- `src/`：真实源码。

Agent 执行项目任务时，不应把 `docs/` 当成 `_adoc/` 的替代品。`docs/` 可以帮助人理解 AIPD2，但执行事实源仍是 `_adoc/` 和 case / step。

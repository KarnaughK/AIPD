# Agent Entry

Agent Entry 是 Agent 进入项目后的第一跳规则，通常由根 `AGENTS.md` 承担。它不复制所有知识，而是规定怎样找到事实、什么时候进入流程状态、哪些副作用需要确认。

## 普通任务读取链路

业务功能、页面、权限、接口、核心概念或跨模块规则通常按以下路径读取：

```text
AGENTS.md
-> _adoc/index.md
-> _adoc/map.md
-> 相关 L3 / L4 / L5 / 局部 README
-> L6 代码
```

普通找代码和改功能不读取历史 Case / OKR。只有用户明确进入 Case / OKR 流程，或当前任务本身正在恢复这些状态时，才读取对应目录。

`_adoc/map.md` 不是额外任务，而是减少盲搜的第一跳。map 缺入口时才用搜索兜底；搜索找到稳定路径后，再候选回写 map。

## Case 恢复链路

长任务续跑、上下文压缩或状态不确定时：

```text
AGENTS.md
-> _adoc/index.md
-> _adoc/map.md
-> _adoc/case/index.md
-> 当前 case.md
-> 当前 phase
-> 当前 Work Package / artifact
```

Case / Work Package 文件是长期状态事实源，聊天是运行缓存。两者冲突时先指出差异，再以文件状态恢复。

## Entry 应告诉 Agent 什么

- 项目使用 AIPD，先读哪些入口。
- L1-L5、局部 README 和 L6 代码怎样分工。
- 普通任务与 Case / OKR / Inbox 等流程何时分流。
- Main / Child 调度和平台降级原则。
- build、install、发布、删除、远端写入等权限边界。
- 压缩后怎样从文件 checkpoint 恢复。

它不应该塞进完整业务知识、具体 Case 过程或每个 Skill 的全部规则；这些内容应由 map 路由到 owner。

## README、docs、_adoc 与源码

| 位置 | 服务谁 | 职责 |
|---|---|---|
| 根 `README.md` | 第一次看到项目的人 | 项目价值、开始方式和学习分流 |
| `docs/` | 学习和使用 AIPD 的人 | 教程、解释与参考 |
| `_adoc/` | 在当前项目工作的 Agent | 长期项目认知与流程入口 |
| `_adoc/case/` | 正在推进 Case 的 Main / Child | 一次性状态、证据、执行和验收 |
| 项目源码 | 人和 Agent | L6 真实实现 |

`docs/` 不能替代项目 `_adoc`，历史 Case 也不能替代已经 Weave 的长期认知。

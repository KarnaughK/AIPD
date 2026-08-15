# Agent Entry

Agent Entry 是 Agent 进入项目后的第一跳规则，通常由根 `AGENTS.md` 承担。它不复制所有知识，而是规定怎样找到事实、什么时候进入流程状态、哪些副作用需要确认。

## 先确认项目状态

在读取 `_aipd` 正文前，AIPD 先用当前安装包的版本目录和项目 manifest 执行状态 gate。只有项目版本与本机版本一致、必要入口类型安全时才进入普通任务；旧 `_adoc`、无版本 v2、版本落后或同版本 drift 会路由到 [Update 与 Schema 迁移](update-and-migration.md)。

这一步不由 `AGENTS.md` 声明版本，也不查询远端最新版。

## 普通任务读取链路

业务功能、页面、权限、接口、核心概念或跨模块规则通常按以下路径读取：

```text
AGENTS.md
-> _aipd/index.md
-> _aipd/map.md
-> Map 命中的必要 Knowledge / SOP / 局部 README
-> 真实代码
```

Intent / Research / Core / Product / Engineering 都可能进入任务上下文，但实际读取由 Map 命中结果决定，不要机械全读五域。

普通找代码和改功能不读取历史 Case / OKR。只有用户明确进入 Case / OKR 流程，或当前任务本身正在恢复这些状态时，才读取对应目录。

`_aipd/map.md` 不是额外任务，而是减少盲搜的第一跳。map 缺入口时才用搜索兜底；搜索找到稳定路径后，再候选回写 map。

## Case 恢复链路

长任务续跑、上下文压缩或状态不确定时：

```text
AGENTS.md
-> _aipd/index.md
-> _aipd/map.md
-> _aipd/case/index.md
-> 当前 case.md
-> 当前 phase
-> 当前 Work Package / artifact
```

Case / Work Package 文件是长期状态事实源，聊天是运行缓存。两者冲突时先指出差异，再以文件状态恢复。

## Entry 应告诉 Agent 什么

- 项目使用 AIPD，先读哪些入口。
- 五类 Knowledge、局部 README 和真实代码怎样分工。
- 普通任务与 Case / OKR / Inbox 等流程何时分流。
- Main / Child 调度和平台降级原则。
- build、install、发布、删除、远端写入等权限边界。
- 压缩后怎样从文件 checkpoint 恢复。

它不应该塞进完整业务知识、具体 Case 过程或每个 Skill 的全部规则；这些内容应由 map 路由到 owner。

## Agent MD 等级

初始化时可以选择三个等级：

- **0**：不修改 `AGENTS.md`。
- **1**：安装 AIPD Project Entry，默认推荐。
- **2**：在 Entry 之外，再安装独立的 [Interaction Protocol](interaction-protocol.md)。

Interaction Protocol 只约束讨论 / 执行切换和回复结构，不改变本页的项目读取链路。Update 会保留已有等级，不会自动升级。

## README、docs、_aipd 与源码

| 位置 | 服务谁 | 职责 |
|---|---|---|
| 根 `README.md` | 第一次看到项目的人 | 项目价值、开始方式和学习分流 |
| `docs/` | 学习和使用 AIPD 的人 | 教程、解释与参考 |
| `_aipd/` | 在当前项目工作的 Agent | 长期项目认知与流程入口 |
| `_aipd/case/` | 正在推进 Case 的 Main / Child | 一次性状态、证据、执行和验收 |
| 项目源码 | 人和 Agent | 真实实现 |

`docs/` 不能替代项目 `_aipd`，历史 Case 也不能替代已经 Weave 的长期认知。

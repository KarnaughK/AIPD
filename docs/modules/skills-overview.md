# Skill 概览

AIPD2 是一个可构建的 skill 工程。仓库中的 `src/skills/` 保存各 skill 源码，构建后会生成可安装到 Agent 平台的 skill。

## Skill 清单

| skill | 命令 | 作用 |
|---|---|---|
| `aipd2` | `/aipd2` | 总入口：识别项目状态，加载轻量认知，引导下一步 |
| `aipd2-case-create` | `/aipd2-case-create` | 创建 case，整理目标、边界、上下文索引和 steps |
| `aipd2-case-run` | `/aipd2-case-run` | 执行 case，读取上下文并派发执行 Agent |
| `aipd2-weave` | `/aipd2-weave` | 把稳定经验回写到 ADOC、局部 README、map 或 case |
| `aipd2-learn` | `/aipd2-learn` | 采集会话定位信息，辅助 AIPD2 框架自迭代 |
| `aipd2-update` | `/aipd2-update` | 更新已初始化项目中的 AIPD 架构、AGENTS 和 map |
| `aipd2-case-archive` | `/aipd2-case-archive` | 归档 case，整理 Weave Candidate，合并分支 |
| `aipd2-git-push` | `/aipd2-git-push` | 检查当前分支和提交状态，并推送远端 |
| `aipd-mermaid` | `/aipd-mermaid` | 创建、修改、评审或按需渲染 Mermaid 架构图 |

## 常见协作顺序

新项目：

```text
/aipd2
-> 初始化 _adoc 和 AGENTS.md
-> 后续按任务进入 case-create / case-run / weave
```

一次较明确的开发事项：

```text
/aipd2-case-create
-> 生成 case 和 step
-> /aipd2-case-run
-> 执行 step
-> 产出 Weave Candidate
-> /aipd2-case-archive
```

已有项目规则升级：

```text
/aipd2-update
```

经验沉淀：

```text
/aipd2-weave
```

框架自迭代定位：

```text
/aipd2-learn
```

## Skill 和源码

`docs/` 只解释 skill 的职责和协作方式，不作为源码级对象手册。

要修改 skill 运行逻辑，Agent 应读取 `AGENTS.md`、`_adoc/index.md`、`_adoc/map.md`，再进入 `src/skills/{skill}/SKILL.md`、`src/core/`、`src/platforms/` 和相关脚本。

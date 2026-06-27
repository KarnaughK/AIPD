# Skill 概览

AIPD 是一个可构建的 skill 工程。仓库中的 `aipd-skill/src/skills/` 保存各 skill 源码，构建后会生成可安装到 Agent 平台的 skill。

## Skill 清单

| skill | 命令 | 作用 |
|---|---|---|
| `aipd` | `/aipd` | 总入口：识别项目状态，加载轻量认知，引导下一步 |
| `aipd-case` | `/aipd-case` | 统一推进 case：Case Contract / Think / Design / Execute / Verify / Close |
| `aipd-weave` | `/aipd-weave` | 把稳定经验回写到 ADOC、局部 README、map 或 case |
| `aipd-inbox` | `/aipd-inbox` | 临时接住未整理思路，后续再判断 weave、转 case 或丢弃 |
| `aipd-learn` | `/aipd-learn` | 采集会话定位信息，辅助 AIPD 框架自迭代 |
| `aipd-okr` | `/aipd-okr` | 查看、同步或操作飞书 OKR，并把飞书结果压缩成 OKR 经验包 |
| `aipd-update` | `/aipd-update` | 更新已初始化项目中的 AIPD 架构、AGENTS 和 map |
| `aipd-git-push` | `/aipd-git-push` | 检查当前分支和提交状态，并推送远端 |
| `aipd-mermaid` | `/aipd-mermaid` | 创建、修改、评审或按需渲染 Mermaid 架构图 |

旧 `aipd-case-create`、`aipd-case-run`、`aipd-case-archive` 已合并进 `aipd-case`，不再作为独立 skill 构建。

## Case phase

`aipd-case` 内部按 phase 渐进加载说明文档，不为每个阶段拆独立 skill。

```text
Case Contract -> Think -> Design -> Execute -> Verify -> Close
```

## 常见协作顺序

新项目：

```text
/aipd
-> 初始化 _adoc 和 AGENTS.md
-> 后续按任务进入 aipd-case / weave
```

一次较明确的开发事项：

```text
/aipd-case
-> Case Contract：确认短周期目标、边界和验收标准
-> Think：按需调研和抉择
-> Design：找到复杂度爆点并做最小必要解耦
-> Execute：按 work package 执行
-> Verify / Close
-> 产出 Close 归档候选
```

已有项目规则升级：

```text
/aipd-update
```

经验沉淀：

```text
/aipd-weave
```

临时记录：

```text
/aipd-inbox
```

框架自迭代定位：

```text
/aipd-learn
```

## Skill 和源码

`docs/` 只解释 skill 的职责和协作方式，不作为源码级对象手册。

要修改 skill 运行逻辑，Agent 应读取 `AGENTS.md`、`_adoc/index.md`、`_adoc/map.md`，再进入 `aipd-skill/src/skills/{skill}/SKILL.md`、`aipd-skill/src/core/`、`aipd-skill/src/platforms/` 和相关脚本。

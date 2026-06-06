# L4 产品功能线地图

本文件是 AIPD2 产品功能线的检索入口。它记录已经稳定存在的功能线、源码入口和相关认知；功能内部细节继续放到对应 skill、agent、脚本或就近 README。

## 功能线总表

| 用户说法 / 场景 | 标准功能线 | 功能线 map | 前端入口 | 后端入口 | 数据对象 | 相关 L3 | 相关 L5 |
|---|---|---|---|---|---|---|---|
| 初始化新项目 / 安装 AIPD | AIPD 初始化 | 本文件 | 不适用 | 不适用 | `AGENTS.md`、`_adoc/` | `_adoc/L3-core/map.md` | `_adoc/L5-dev/index.md` |
| 更新已有项目 AIPD 架构 / aipd update | AIPD Update | 本文件 | 不适用 | 不适用 | `AGENTS.md`、`_adoc/index.md`、`_adoc/map.md`、case | `_adoc/L3-core/map.md` | `_adoc/L5-dev/index.md` |
| 创建 case / 拆 step / 上下文索引 | Case Create | 本文件 | 不适用 | 不适用 | `case.md`、`steps/*.md` | `_adoc/L3-core/horizontal-capabilities.md` | `_adoc/L5-dev/index.md` |
| 执行 case / 分身 Agent / 推荐 Agent | Case Run | 本文件 | 不适用 | 不适用 | `case.md`、`step.md`、Agent 指引 | `_adoc/L3-core/horizontal-capabilities.md` | `_adoc/L5-dev/index.md` |
| 归档 case / 合并分支 / Weave Candidate | Case Archive | 本文件 | 不适用 | 不适用 | case、archive、git diff | `_adoc/L3-core/horizontal-capabilities.md` | `_adoc/L5-dev/index.md` |
| 反向编织 / 更新 ADOC / 更新 map | Weave | 本文件 | 不适用 | 不适用 | L3 / L4 / L5 / README / map / case | `_adoc/L3-core/horizontal-capabilities.md` | `_adoc/L5-dev/index.md` |
| 框架自迭代 / transcript / 回流包 | Learn | 本文件 | 不适用 | 不适用 | transcript、回流包、AIPD2 源码 | `_adoc/L3-core/horizontal-capabilities.md` | `_adoc/L5-dev/index.md` |
| Git push 辅助 | Git Push | 本文件 | 不适用 | 不适用 | 当前分支、提交状态、远端 | `_adoc/L3-core/horizontal-capabilities.md` | `_adoc/L5-dev/index.md` |

## 源码入口

| 功能线 | 主要源码入口 | 模板 / 支撑文件 |
|---|---|---|
| AIPD 初始化 | `src/skills/aipd2/SKILL.md` | `src/core/agent-entry/template.md`、`src/core/adoc/templates/index.md`、`src/core/adoc/templates/map.md` |
| AIPD Update | `src/skills/aipd2-update/SKILL.md` | `src/core/agent-entry/template.md`、`src/core/adoc/templates/index.md`、`src/core/adoc/templates/map.md`、`src/core/case/templates/case.md` |
| Case Create | `src/skills/aipd2-case-create/SKILL.md` | `src/core/case/templates/case.md`、`src/core/case/templates/step.md` |
| Case Run | `src/skills/aipd2-case-run/SKILL.md` | `src/platforms/codex/core/agent-guide.md`、`src/core/agent-guides/` |
| Case Archive | `src/skills/aipd2-case-archive/SKILL.md` | `_adoc/case/index.md`、case 目录 |
| Weave | `src/skills/aipd2-weave/SKILL.md` | `_adoc/map.md`、L3 / L4 / L5 / 局部 README |
| Learn | `src/skills/aipd2-learn/SKILL.md` | Codex transcript、AIPD2 源码 |
| Git Push | `src/skills/aipd2-git-push/SKILL.md` | git 当前状态 |

## 兜底搜索

- `rg "aipd2-case-create|aipd2-case-run|aipd2-weave|aipd2-learn|aipd2-update" src _adoc`
- `rg "Case Create|Case Run|Weave|Learn|Update|初始化|归档" src _adoc README.md`

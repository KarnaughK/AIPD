# Product 产品功能线地图

本文件是 AIPD 产品功能线的检索入口。它记录已经稳定存在的功能线、源码入口和相关认知；功能内部细节继续放到对应 skill、agent、脚本或就近 README。

Product 只回答“用户可见 / 可调用的产品能力是什么、边界是什么、入口在哪里”。工程实现规则进入 Engineering；一次性执行过程进入 case / work package。

## 功能线总表

| 用户说法 / 场景 | 标准功能线 | 状态 | 主要入口 | 数据对象 | 相关 Core 模型 | 相关 Engineering / 流程入口 |
|---|---|---|---|---|---|---|
| AIPD / 进入项目 / 初始化 / 项目状态 | AIPD 总入口与初始化 | 已存在 | `aipd-skill/src/skills/aipd/SKILL.md` | `AGENTS.md`、`_aipd/`、index / map / inbox / case / okr 模板 | 项目知识库维护模型、Map-first 上下文检索模型 | `_aipd/knowledge/engineering/index.md` |
| Agent MD 等级 2 / Interaction Protocol / 回复模板 / 我理解 / 展开说说 / 横向拓展 / 下一步 | Interaction Protocol | 已存在 | `aipd-skill/src/core/agent-entry/interaction-style.md` | 五段讨论回复顺序、显式复述、横向方向、自然下一步 | Agent 协作思考模型 | Agent MD 等级 2、`AGENTS.md` |
| 读 map / 加载项目认知 / 找上下文 / 开发前读文档 | Map-first 认知加载 | 已存在 | `aipd-skill/src/skills/aipd/SKILL.md`、`_aipd/map.md` | `_aipd/index.md`、`_aipd/map.md`、必要 Knowledge、SOP、局部 README、真实代码 | Map-first 上下文检索模型 | `_aipd/knowledge/engineering/index.md` |
| inbox / 收件箱 / 先记一下 / 先存一下 | Inbox 临时收件箱 | 已存在 | `aipd-skill/src/skills/aipd-inbox/SKILL.md` | `_aipd/inbox.md` | 项目知识库维护模型 | `aipd-skill/src/core/workspace/templates/inbox.md` |
| `$aipd-leader` / Leader 模式 / 项目负责人 / 监督者 / 多开线 / 阶段汇报 / AI 主导项目 / Mission / 跨 Case 调度 / Codex task / cursor-agent | AIPD Leader | 已存在 | `aipd-skill/src/skills/aipd-leader/SKILL.md` | `_aipd/leader/`、Mission、用户关注 / 汇报约定、Case / Codex task 或 Cursor `chatId` 绑定 | Leader 项目主导编排模型、任务执行模型 | `aipd-skill/src/core/leader/`、`aipd-skill/src/platforms/codex/core/leader/runtime.md`、`aipd-skill/src/platforms/cursor/core/leader/runtime.md` |
| case / 创建 case / Case Contract / 目标边界 / 执行 case / case design / case think / work package / 验收 / 归档 | AIPD Case | 已存在 | `aipd-skill/src/skills/aipd-case/SKILL.md` | case.md、Case Contract、phase-first 目录、phase state、Think、Design、Work Package、执行记录、Close 归档候选 | 任务执行模型、Think / 任务澄清决策模型、AI 原生代码架构模型 | `_aipd/case/index.md`、`aipd-skill/src/core/case/phases/`、`aipd-skill/src/core/case/templates/` |
| 反向编织 / 更新 Knowledge / 更新 map / 更新局部 README | Weave | 已存在 | `aipd-skill/src/skills/aipd-weave/SKILL.md` | Intent / Research / Core / Product / Engineering / README / Map；未完成 case 候选先留在 Close 归档候选 | 项目知识库维护模型 | `_aipd/map.md`、局部 README |
| learn / transcript / 回流包 / 框架自迭代 | Learn（AIPD 仓库级） | 已存在，仅源码仓库 | `.agents/skills/aipd-learn/SKILL.md` | 当前对话、外部 transcript、回流包、AIPD skill / 模板 / 规则 | 项目知识库维护模型、Agent 协作思考模型 | `.agents/skills/aipd-learn/references/learn-session-locator.md` |
| OKR / 飞书 OKR / lark-cli / 目标 / 周期 / OKR 经验包 | AIPD OKR | 已存在 | `aipd-skill/src/skills/aipd-okr/SKILL.md` | 飞书 O/KR、周期 ID、飞书 ID、OKR 经验包 | 任务执行模型、Agent 协作思考模型 | `_aipd/okr/index.md`、`aipd-skill/src/core/okr/` |
| 旧 `_adoc` / L1-L5 / 升级 Schema v2 | Project Schema 一次性迁移 | 已存在 | `aipd-skill/scripts/migrate-project-schema`；安装后为 `aipd` Skill 内同名脚本 | 旧项目工作区、新 manifest、五类 Knowledge 目录 | 项目知识库维护模型 | `_aipd/knowledge/engineering/index.md`、`docs/modules/build-and-install.md` |
| AIPD update / 项目版本落后 / unversioned-v2 / 更新 AGENTS / 同步当前模板 / drift repair | AIPD Update | 已存在 | `aipd-skill/src/skills/aipd-update/SKILL.md` | 本机 release catalog、`_aipd/manifest.json#aipdVersion`、Release Records、current authority、`_aipd/update-log.md` | 项目知识库维护模型、Map-first 上下文检索模型 | `_aipd/knowledge/engineering/index.md`、`aipd-skill/src/core/updates/`、`aipd-skill/src/core/workspace/templates/` |
| Mermaid / MMD / 画图 / 预览图 / 架构图 | Mermaid / MMD | 已存在 | `aipd-skill/src/skills/aipd-mermaid/SKILL.md` | `.mmd`、Mermaid 源码、按需 PNG | AI 原生代码架构模型、任务执行模型 | `aipd-skill/src/core/knowledge/engineering/vue-architecture-diagram-guide.md` |
| git push / 推送当前分支 | Git Push | 已存在 | `aipd-skill/src/skills/aipd-git-push/SKILL.md` | 当前分支、提交状态、远端 | 任务执行模型 | git 状态 |
| SOP / AI 程序 / 可复用流程 / 查关键词 / 日报 | SOP 库 | 壳子 | `_aipd/sop/index.md`、`_aipd/sop/map.md` | SOP 目录、目标、输入、步骤、工具、输出、收尾 | SOP / AI 程序模型 | `_aipd/sop/` |

## 源码与文档入口

| 功能线 | 主要源码 / 文档入口 | 模板 / 支撑文件 |
|---|---|---|
| AIPD 总入口与初始化 | `aipd-skill/src/skills/aipd/SKILL.md` | `aipd-skill/src/core/agent-entry/template.md`、`aipd-skill/src/core/workspace/templates/index.md`、`aipd-skill/src/core/workspace/templates/map.md` |
| Map-first 认知加载 | `aipd-skill/src/skills/aipd/SKILL.md`、`_aipd/map.md` | `aipd-skill/src/core/workspace/templates/map.md` |
| Inbox 临时收件箱 | `aipd-skill/src/skills/aipd-inbox/SKILL.md` | `aipd-skill/src/core/workspace/templates/inbox.md` |
| AIPD Leader | `aipd-skill/src/skills/aipd-leader/SKILL.md` | `aipd-skill/src/core/leader/`、`aipd-skill/src/platforms/codex/core/leader/runtime.md`、`aipd-skill/src/platforms/cursor/core/leader/runtime.md`、`_aipd/leader/index.md` |
| AIPD Case | `aipd-skill/src/skills/aipd-case/SKILL.md` | `aipd-skill/src/core/case/phases/`、`aipd-skill/src/core/case/templates/case.md`、`aipd-skill/src/core/case/templates/work-package.md` |
| Weave | `aipd-skill/src/skills/aipd-weave/SKILL.md` | `_aipd/map.md`、五类 Knowledge、局部 README |
| Learn | `.agents/skills/aipd-learn/SKILL.md` | Codex transcript、AIPD 源码、观察锚点；不进入公共 dist / install |
| AIPD OKR | `aipd-skill/src/skills/aipd-okr/SKILL.md` | `aipd-skill/src/core/okr/guide.md`、`aipd-skill/src/core/okr/feishu-cli.md`、`_aipd/okr/index.md` |
| Project Schema 一次性迁移 | `aipd-skill/scripts/migrate-project-schema` | `aipd-skill/scripts/check-schema-migrator`、`docs/modules/build-and-install.md` |
| AIPD Update | `aipd-skill/src/skills/aipd-update/SKILL.md` | `aipd-skill/src/core/updates/`、`aipd-skill/src/core/workspace/project-state.md`、`aipd-skill/src/core/agent-entry/template.md`、`aipd-skill/src/core/workspace/templates/`、`aipd-skill/src/core/case/templates/` |
| Mermaid / MMD | `aipd-skill/src/skills/aipd-mermaid/SKILL.md` | `aipd-skill/src/core/knowledge/engineering/vue-architecture-diagram-guide.md`、`aipd-skill/src/core/knowledge/engineering/vue-provider-guide.md` |
| Git Push | `aipd-skill/src/skills/aipd-git-push/SKILL.md` | git 当前状态 |
| SOP 库 | `_aipd/sop/index.md`、`_aipd/sop/map.md` | `_aipd/sop/{sop-name}/README.md` |

## 产品边界索引

| 功能线 | 做什么 | 不做什么 |
|---|---|---|
| AIPD 总入口与初始化 | 识别项目状态、创建基础结构、路由到合适能力 | 不替用户完成完整的五类 Knowledge 建模 |
| Map-first 认知加载 | 先读 map 命中上下文，搜索兜底并回写稳定入口 | 不默认依赖 RAG、全文搜索或多层目录跳转 |
| Inbox 临时收件箱 | 暂存未定型信息 | 不自动归类、不创建 case、不直接 weave |
| AIPD Leader | 受托监督一个 active Mission，探索方向、按宿主调度 Case 执行层（Codex task 或 Cursor `cursor-agent`）、阶段汇报并做总验收 | 不自动启动，不替代 Case 的细节执行，不并发多个 Leader / Mission，不找 DSH，不扩大外部副作用权限 |
| AIPD Case | 按 Case Contract / Think / Design / Execute / Verify / Close 推进短周期目标闭环 | 不把目标边界拆成独立 Goal phase，不把每个 phase 拆成独立 skill，不把 work package 当微步骤 |
| Weave | 判断稳定信息写回哪里 | 不做聊天存档，不处理 AIPD 框架自身 transcript 回流 |
| Learn | 在 AIPD 源码仓库回流框架自身经验 | 不安装到业务项目，不替代当前项目 weave，不在方案确认前改源码 |
| AIPD OKR | 查看、创建、同步、删除或压缩飞书 OKR 经验包 | 不把完整 CLI 输出带回主 Agent，不在用户未确认时执行飞书写入或删除 |
| Project Schema 一次性迁移 | 把完整旧工作区原子切换为 v2，并提供 dry-run / check | 不进入日常运行时，不双读，不处理 dirty 或混合状态 |
| AIPD Update | 读取版本演进和本机最终态，一次收敛已接入项目；安全更新默认执行 | 不逐版落盘、不查询远端、不覆盖项目已有认知；破坏性或歧义冲突才暂停 |
| Mermaid / MMD | 写图、改图、评审图、按需预览 | 不因为只是提到 MMD 就默认渲染图片 |
| Git Push | 检查当前分支和提交状态，推送远端 | 不 add / commit / merge / rebase / stash |
| SOP 库 | 收纳可重复 Agent 执行程序 | 不收单次聊天、单纯知识判断或独立脚本 |

## 兜底搜索

- `rg "aipd-leader|aipd-case|case-create|case-run|case-archive|aipd-weave|aipd-learn|aipd-okr|aipd-update|aipd-inbox|aipd-mermaid|aipdVersion|currentAuthority" .agents aipd-skill/src _aipd`
- `rg "AIPD Leader|Mission|Codex task|AIPD Case|Case Design|Work Package|复杂度爆点|Case Create|Case Run|Weave|Learn|OKR|Update|Inbox|Mermaid|SOP|初始化|归档" README.md docs _aipd aipd-skill/src`

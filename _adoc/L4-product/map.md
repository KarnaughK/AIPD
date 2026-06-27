# L4 产品功能线地图

本文件是 AIPD 产品功能线的检索入口。它记录已经稳定存在的功能线、源码入口和相关认知；功能内部细节继续放到对应 skill、agent、脚本或就近 README。

L4 只回答“用户可见 / 可调用的产品能力是什么、边界是什么、入口在哪里”。工程实现规则进入 L5；一次性执行过程进入 case / work package。

## 功能线总表

| 用户说法 / 场景 | 标准功能线 | 状态 | 主要入口 | 数据对象 | 相关 L3 模型 | 相关 L5 / 流程入口 |
|---|---|---|---|---|---|---|
| AIPD / 进入项目 / 初始化 / 项目状态 | AIPD 总入口与初始化 | 已存在 | `aipd-skill/src/skills/aipd/SKILL.md` | `AGENTS.md`、`_adoc/`、index / map / inbox / case / okr 模板 | 项目知识库维护模型、Map-first 上下文检索模型 | `_adoc/L5-dev/index.md` |
| 读 map / 加载项目认知 / 找上下文 / 开发前读文档 | Map-first 认知加载 | 已存在 | `aipd-skill/src/skills/aipd/SKILL.md`、`_adoc/map.md` | `_adoc/index.md`、`_adoc/map.md`、L3/L4/L5、局部 README | Map-first 上下文检索模型 | `_adoc/L5-dev/index.md` |
| inbox / 收件箱 / 先记一下 / 先存一下 | Inbox 临时收件箱 | 已存在 | `aipd-skill/src/skills/aipd-inbox/SKILL.md` | `_adoc/inbox.md` | 项目知识库维护模型 | `aipd-skill/src/core/adoc/templates/inbox.md` |
| case / 创建 case / Case Contract / 目标边界 / 执行 case / case design / case think / work package / 验收 / 归档 | AIPD Case | 已存在 | `aipd-skill/src/skills/aipd-case/SKILL.md` | case.md、Case Contract、phase-first 目录、phase state、Think、Design、Work Package、执行记录、Weave Candidate | 任务执行模型、Think / 任务澄清决策模型、AI 原生代码架构模型 | `_adoc/case/index.md`、`aipd-skill/src/core/case/phases/`、`aipd-skill/src/core/case/templates/` |
| 反向编织 / 更新 ADOC / 更新 map / 更新局部 README | Weave | 已存在 | `aipd-skill/src/skills/aipd-weave/SKILL.md` | L3 / L4 / L5 / README / map；一次性过程留在 case / work package | 项目知识库维护模型 | `_adoc/map.md`、局部 README |
| learn / transcript / 回流包 / 框架自迭代 | Learn | 已存在 | `aipd-skill/src/skills/aipd-learn/SKILL.md` | transcript、回流包、AIPD skill / 模板 / 规则 | 项目知识库维护模型、Agent 协作思考模型 | `aipd-skill/src/platforms/codex/` |
| OKR / 飞书 OKR / lark-cli / 目标 / 周期 / OKR 经验包 | AIPD OKR | 已存在 | `aipd-skill/src/skills/aipd-okr/SKILL.md` | 飞书 O/KR、周期 ID、飞书 ID、OKR 经验包 | 任务执行模型、Agent 协作思考模型 | `_adoc/okr/index.md`、`aipd-skill/src/core/okr/` |
| AIPD update / 升级 AIPD / 更新 AGENTS / 同步新模板 | AIPD Update | 已存在 | `aipd-skill/src/skills/aipd-update/SKILL.md` | `AGENTS.md`、`_adoc/index.md`、`_adoc/map.md`、case 模板 | 项目知识库维护模型、Map-first 上下文检索模型 | `_adoc/L5-dev/index.md`、`aipd-skill/src/core/adoc/templates/` |
| Mermaid / MMD / 画图 / 预览图 / 架构图 | Mermaid / MMD | 已存在 | `aipd-skill/src/skills/aipd-mermaid/SKILL.md` | `.mmd`、Mermaid 源码、按需 PNG | AI 原生代码架构模型、任务执行模型 | `aipd-skill/src/core/L5-dev/vue-architecture-diagram-guide.md` |
| git push / 推送当前分支 | Git Push | 已存在 | `aipd-skill/src/skills/aipd-git-push/SKILL.md` | 当前分支、提交状态、远端 | 任务执行模型 | git 状态 |
| SOP / AI 程序 / 可复用流程 / 查关键词 / 日报 | SOP 库 | 壳子 | `_adoc/sop/index.md`、`_adoc/sop/map.md` | SOP 目录、目标、输入、步骤、工具、输出、收尾 | SOP / AI 程序模型 | `_adoc/sop/` |
| AIPD Desktop / 桌面端 / 聊天 UI / 文件树 / MMD 预览 | AIPD Desktop | 规划中 | `aipd-desktop/README.md` | AIPD 文件树、聊天、context chip、预览 | Map-first 上下文检索模型、任务执行模型、SOP / AI 程序模型 | 规划 case 仅在 Desktop case 流程中读取 |

## 源码与文档入口

| 功能线 | 主要源码 / 文档入口 | 模板 / 支撑文件 |
|---|---|---|
| AIPD 总入口与初始化 | `aipd-skill/src/skills/aipd/SKILL.md` | `aipd-skill/src/core/agent-entry/template.md`、`aipd-skill/src/core/adoc/templates/index.md`、`aipd-skill/src/core/adoc/templates/map.md` |
| Map-first 认知加载 | `aipd-skill/src/skills/aipd/SKILL.md`、`_adoc/map.md` | `aipd-skill/src/core/adoc/templates/map.md` |
| Inbox 临时收件箱 | `aipd-skill/src/skills/aipd-inbox/SKILL.md` | `aipd-skill/src/core/adoc/templates/inbox.md` |
| AIPD Case | `aipd-skill/src/skills/aipd-case/SKILL.md` | `aipd-skill/src/core/case/phases/`、`aipd-skill/src/core/case/templates/case.md`、`aipd-skill/src/core/case/templates/work-package.md` |
| Weave | `aipd-skill/src/skills/aipd-weave/SKILL.md` | `_adoc/map.md`、L3 / L4 / L5 / 局部 README |
| Learn | `aipd-skill/src/skills/aipd-learn/SKILL.md` | Codex transcript、AIPD 源码、观察锚点 |
| AIPD OKR | `aipd-skill/src/skills/aipd-okr/SKILL.md` | `aipd-skill/src/core/okr/guide.md`、`aipd-skill/src/core/okr/feishu-cli.md`、`_adoc/okr/index.md` |
| AIPD Update | `aipd-skill/src/skills/aipd-update/SKILL.md` | `aipd-skill/src/core/agent-entry/template.md`、`aipd-skill/src/core/adoc/templates/`、`aipd-skill/src/core/case/templates/` |
| Mermaid / MMD | `aipd-skill/src/skills/aipd-mermaid/SKILL.md` | `aipd-skill/src/core/L5-dev/vue-architecture-diagram-guide.md`、`aipd-skill/src/core/L5-dev/vue-provider-guide.md` |
| Git Push | `aipd-skill/src/skills/aipd-git-push/SKILL.md` | git 当前状态 |
| SOP 库 | `_adoc/sop/index.md`、`_adoc/sop/map.md` | `_adoc/sop/{sop-name}/README.md` |
| AIPD Desktop | `aipd-desktop/README.md` | Desktop docs、Tauri / Vue bootstrap 文档 |

## 产品边界索引

| 功能线 | 做什么 | 不做什么 |
|---|---|---|
| AIPD 总入口与初始化 | 识别项目状态、创建基础结构、路由到合适能力 | 不替用户完成完整 L1-L5 建模 |
| Map-first 认知加载 | 先读 map 命中上下文，搜索兜底并回写稳定入口 | 不默认依赖 RAG、全文搜索或多层目录跳转 |
| Inbox 临时收件箱 | 暂存未定型信息 | 不自动归类、不创建 case、不直接 weave |
| AIPD Case | 按 Case Contract / Think / Design / Execute / Verify / Close 推进短周期目标闭环 | 不把目标边界拆成独立 Goal phase，不把每个 phase 拆成独立 skill，不把 work package 当微步骤 |
| Weave | 判断稳定信息写回哪里 | 不做聊天存档，不处理 AIPD 框架自身 transcript 回流 |
| Learn | 回流 AIPD 框架自身经验 | 不替代当前项目 weave，不默认直接改源码 |
| AIPD OKR | 查看、创建、同步、删除或压缩飞书 OKR 经验包 | 不把完整 CLI 输出带回主 Agent，不在用户未确认时执行飞书写入或删除 |
| AIPD Update | 审计并合并新 AIPD 规则到已接入项目 | 不覆盖项目已有认知 |
| Mermaid / MMD | 写图、改图、评审图、按需预览 | 不因为只是提到 MMD 就默认渲染图片 |
| Git Push | 检查当前分支和提交状态，推送远端 | 不 add / commit / merge / rebase / stash |
| SOP 库 | 收纳可重复 Agent 执行程序 | 不收单次聊天、单纯知识判断或独立脚本 |
| AIPD Desktop | 组织 AIPD 文件、聊天、预览和轻量上下文引用 | 不做完整 IDE，不做重型 Agent 编排工厂 |

## 兜底搜索

- `rg "aipd-case|case-create|case-run|case-archive|aipd-weave|aipd-learn|aipd-okr|aipd-update|aipd-inbox|aipd-mermaid" aipd-skill/src _adoc`
- `rg "AIPD Case|Case Design|Work Package|复杂度爆点|Case Create|Case Run|Weave|Learn|OKR|Update|Inbox|Mermaid|Desktop|SOP|初始化|归档" README.md docs _adoc aipd-skill/src`

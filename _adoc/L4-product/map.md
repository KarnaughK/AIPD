# L4 产品功能线地图

本文件是 AIPD 产品功能线的检索入口。它记录已经稳定存在的功能线、源码入口和相关认知；功能内部细节继续放到对应 skill、agent、脚本或就近 README。

L4 只回答“用户可见 / 可调用的产品能力是什么、边界是什么、入口在哪里”。工程实现规则进入 L5；一次性执行过程进入 case / step。

## 功能线总表

| 用户说法 / 场景 | 标准功能线 | 状态 | 主要入口 | 数据对象 | 相关 L3 模型 | 相关 L5 / 流程入口 |
|---|---|---|---|---|---|---|
| AIPD / 进入项目 / 初始化 / 项目状态 | AIPD 总入口与初始化 | 已存在 | `aipd-skill/src/skills/aipd/SKILL.md` | `AGENTS.md`、`_adoc/`、index / map / inbox / case / okr 模板 | 项目知识库维护模型、Map-first 上下文检索模型 | `_adoc/L5-dev/index.md` |
| 读 map / 加载项目认知 / 找上下文 / 开发前读文档 | Map-first 认知加载 | 已存在 | `aipd-skill/src/skills/aipd/SKILL.md`、`_adoc/map.md` | `_adoc/index.md`、`_adoc/map.md`、L3/L4/L5、局部 README | Map-first 上下文检索模型 | `_adoc/L5-dev/index.md` |
| inbox / 收件箱 / 先记一下 / 先存一下 | Inbox 临时收件箱 | 已存在 | `aipd-skill/src/skills/aipd-inbox/SKILL.md` | `_adoc/inbox.md` | 项目知识库维护模型 | `aipd-skill/src/core/adoc/templates/inbox.md` |
| think / AIPD Think / 讨论任务 / 定任务 / 要不要做 / 前置判断 | AIPD Think | 规划中 | 规划中的 `aipd-think` / Think 对象 | discussion、research、options、decision、决策出口 | Think / 任务澄清决策模型、Map-first 上下文检索模型 | 后续设计 case 确认 |
| 创建 case / 拆 step / 上下文索引 | Case Create | 已存在 | `aipd-skill/src/skills/aipd-case-create/SKILL.md` | `case.md`、`steps/*.md`、上下文索引、验收标准 | 任务执行模型、Map-first 上下文检索模型 | `_adoc/case/index.md`、`aipd-skill/src/core/case/templates/` |
| 执行 case / 分身 Agent / 推荐 Agent / 验收 step | Case Run | 已存在 | `aipd-skill/src/skills/aipd-case-run/SKILL.md` | case、step、执行记录、分身 Agent 回流结果 | 任务执行模型、Agent 协作思考模型 | `_adoc/L5-dev/index.md`、`aipd-skill/src/platforms/codex/core/agent-guide.md` |
| 归档 case / 整理 Weave Candidate / 合并分支 | Case Archive | 已存在 | `aipd-skill/src/skills/aipd-case-archive/SKILL.md` | case archive、case index、git diff、Weave Candidate | 任务执行模型、项目知识库维护模型 | `_adoc/case/index.md` |
| 反向编织 / 更新 ADOC / 更新 map / 更新局部 README | Weave | 已存在 | `aipd-skill/src/skills/aipd-weave/SKILL.md` | L3 / L4 / L5 / README / map；一次性过程留在 case / step | 项目知识库维护模型 | `_adoc/map.md`、局部 README |
| learn / transcript / 回流包 / 框架自迭代 | Learn | 已存在 | `aipd-skill/src/skills/aipd-learn/SKILL.md` | transcript、回流包、AIPD skill / 模板 / 规则 | 项目知识库维护模型、Agent 协作思考模型 | `aipd-skill/src/platforms/codex/` |
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
| AIPD Think | 规划中的 `aipd-think` / Think 对象 | 后续设计 case 确认 |
| Case Create | `aipd-skill/src/skills/aipd-case-create/SKILL.md` | `aipd-skill/src/core/case/templates/case.md`、`aipd-skill/src/core/case/templates/step.md` |
| Case Run | `aipd-skill/src/skills/aipd-case-run/SKILL.md` | `aipd-skill/src/platforms/codex/core/agent-guide.md`、`aipd-skill/src/core/agent-guides/` |
| Case Archive | `aipd-skill/src/skills/aipd-case-archive/SKILL.md` | `_adoc/case/index.md`、case 目录 |
| Weave | `aipd-skill/src/skills/aipd-weave/SKILL.md` | `_adoc/map.md`、L3 / L4 / L5 / 局部 README |
| Learn | `aipd-skill/src/skills/aipd-learn/SKILL.md` | Codex transcript、AIPD 源码、观察锚点 |
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
| AIPD Think | 把模糊想法状态化，讨论、调研、比较方案并输出 Create / Kill / Defer / Research / Weave / Continue | 不默认创建 case，不承担执行规划和 step 拆分 |
| Case Create | 创建 case、上下文索引、steps 和验收标准 | 不把未确认讨论点包装成 step |
| Case Run | 恢复 case 状态、推进 step、派发分身 Agent、收集结果 | 不跳过 case / step 文件直接靠聊天记忆开干 |
| Case Archive | 归档 case、整理 Weave Candidate、更新索引和分支状态 | 不替代 weave 的长期知识归属判断 |
| Weave | 判断稳定信息写回哪里 | 不做聊天存档，不处理 AIPD 框架自身 transcript 回流 |
| Learn | 回流 AIPD 框架自身经验 | 不替代当前项目 weave，不默认直接改源码 |
| AIPD Update | 审计并合并新 AIPD 规则到已接入项目 | 不覆盖项目已有认知 |
| Mermaid / MMD | 写图、改图、评审图、按需预览 | 不因为只是提到 MMD 就默认渲染图片 |
| Git Push | 检查当前分支和提交状态，推送远端 | 不 add / commit / merge / rebase / stash |
| SOP 库 | 收纳可重复 Agent 执行程序 | 不收单次聊天、单纯知识判断或独立脚本 |
| AIPD Desktop | 组织 AIPD 文件、聊天、预览和轻量上下文引用 | 不做完整 IDE，不做重型 Agent 编排工厂 |

## 兜底搜索

- `rg "aipd-case-create|aipd-case-run|aipd-weave|aipd-learn|aipd-update|aipd-inbox|aipd-mermaid" aipd-skill/src _adoc`
- `rg "AIPD Think|Case Create|Case Run|Weave|Learn|Update|Inbox|Mermaid|Desktop|SOP|初始化|归档" README.md docs _adoc aipd-skill/src`

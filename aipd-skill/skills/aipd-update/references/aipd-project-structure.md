# AIPD 项目工作区结构

项目认知、检索入口和流程状态由用户与 AI 共同维护在 `_aipd/`。真实代码、原始数据和构建产物不复制进工作区。

```text
_aipd/
├── manifest.json                       # Schema 身份 + 已应用 AIPD 版本
├── index.md                            # 工作区入口
├── inbox.md                            # 尚未整理归属的临时信息
├── map.md                              # 项目记忆总图：Agent 第一跳读取
├── update-log.md                       # 本项目实际完成的 AIPD 版本更新日志
├── development-log.md                  # 框架项目可选
├── leader/                              # 显式调用 $aipd-leader 后才创建的可选工作记忆
│   └── index.md
├── knowledge/                          # 五类并列长期知识
│   ├── intent/                         # 项目方向、目标和长期取舍
│   │   ├── intent.md
│   │   ├── evolution.md
│   │   └── history/
│   ├── research/                       # 用户、场景、竞品、行业/玩法范式和外部观察
│   │   └── index.md
│   ├── core/                           # 核心对象、领域语言、流程和项目成立模型
│   │   ├── index.md
│   │   └── map.md
│   ├── product/                        # 产品功能、业务边界和用户可见行为
│   │   ├── index.md
│   │   ├── map.md
│   │   └── keyword-discovery/
│   │       ├── index.md
│   │       └── map.md
│   └── engineering/                    # 跨模块实现逻辑、工程规则和协作约定
│       ├── index.md
│       ├── map.md
│       └── express-keyword-research/
│           ├── README.md
│           └── debug-map.md
├── sop/                                # 可复用 Agent 原生程序
│   ├── index.md
│   ├── map.md
│   └── daily-site-report/
│       └── README.md
├── okr/                                # 飞书 OKR 入口
│   └── index.md
└── case/                               # 短周期事项执行记录
    ├── index.md
    ├── c1-功能名/
    │   ├── case.md
    │   ├── 01-think/
    │   │   └── think.md
    │   ├── 02-design/
    │   │   └── design.md
    │   ├── 03-execute/
    │   │   ├── execute.md
    │   │   └── work-packages/
    │   │       └── wp-01-工作包名.md
    │   ├── 04-verify/
    │   │   └── verify.md
    │   └── 05-close/
    │       └── close.md
    └── archive/
        └── c1-功能名/
```

## Schema 标识

`_aipd/manifest.json` 同时记录 Schema 身份和当前项目已成功应用的 AIPD 发布版本：

```json
{
  "schema": "aipd-project",
  "schemaVersion": 2,
  "aipdVersion": 2
}
```

- `schemaVersion` 只表达 Workspace 数据形状；`aipdVersion` 表达项目最后一次完整应用的 AIPD 发布快照。
- 本机当前版本以已安装 Skill 的 `@references/updates/catalog.json#currentVersion` 为唯一事实源，不从 Agent Entry 或远程推断。
- 精确两键的 Schema v2 manifest 是可更新的 `unversioned-v2`；精确三键且 `aipdVersion` 为正整数时是已版本化 v2。详细状态机见 `@references/workspace/project-state.md`。
- 一次性 Schema 迁移器仍产出无版本 v2；只有 Update 完成最终态合并和验证后才写入 `aipdVersion`。

`_aipd/update-log.md` 记录本项目每次实际完成的版本跃迁、合并摘要、验证和有意保留的项目差异。它不是全局 Release Record 的副本。

活动运行时不双读旧工作区或旧知识目录。除 AIPD 保留名、代码目录、symlink 或文件类型冲突外，安全的额外 Workspace 模块属于项目定制，Update 应默认保留。`_aipd/leader/` 是 V2 的显式可选模块，不纳入基础初始化必选模板；首次调用 `$aipd-leader` 时才创建。

## 知识、流程与真实代码

Intent、Research、Core、Product、Engineering 是五类并列知识域，逻辑类型分别为 `knowledge.intent`、`knowledge.research`、`knowledge.core`、`knowledge.product`、`knowledge.engineering`。它们不是阶段、成熟度等级或固定读取顺序。

真实代码仍位于项目实际源码目录。知识域负责解释方向、外部世界、核心模型、产品行为和跨模块工程规则；局部 README 与 map 负责把这些知识路由到具体代码入口。

`_aipd/inbox.md` 只接住尚未整理归属的信息。它不是待办列表、候选 Case、稳定知识或执行事实源；整理后再归入相应知识域、OKR、Case，或删除。

`_aipd/sop/` 存放以 Agent 为运行时的可复用程序。SOP 是项目动作如何重复执行，不属于 `knowledge/` 正文，也不是单纯脚本。

`_aipd/leader/` 只在用户显式调用 `$aipd-leader` 后创建，保存一个 active Mission 下跨聊天、跨 Case 的短中期恢复信息。已有更权威 Knowledge、Case、OKR、SOP、Map、README 或代码事实源的信息只在这里保留链接和当前影响。

## 检索结构

`_aipd/map.md` 是项目级检索入口。推荐链路按任务选择所需分辨率，不要求机械经过全部节点：

```text
AGENTS.md -> _aipd/index.md -> 项目总图
                              ├─> 业务线 / 功能线 / shared capability 上下文 Map
                              └─> 局部 README / 真实代码入口
```

各入口的职责：

- `_aipd/map.md`：项目总图，按用户说法和任务场景暴露高频业务线、功能线、共享能力、SOP 与稳定代码入口。
- 业务线 / 功能线 / shared capability Map：从一个明确场景串起相关 Intent、Research、Core、Product、Engineering、页面、接口、README 和代码入口。它是跨知识域的检索投影，不是第六类知识。
- `_aipd/knowledge/core/map.md`：解释核心概念、标准名、别名/黑话、关系、常见误解和项目成立模型。
- `_aipd/knowledge/product/map.md`：列产品功能线和用户可见业务行为。
- `_aipd/knowledge/product/{feature}/map.md`：列功能线关联的页面、接口、数据对象、权限、知识域和真实代码入口。
- `_aipd/knowledge/engineering/map.md`：列跨模块业务实现逻辑、跨端约定和长期工程规则。
- 代码目录就近 `README.md`：作为局部实现图，记录页面、弹窗、组件或模块内部的局部地图与修改入口。

三种 Map 分辨率都是读取视图，不是新的存储层级。Map 应尽量扁平暴露高频入口，不依赖 Agent 多层跳转后自行发现关键文档。普通任务按 Map 命中知识与代码；只有明确进入 Case、OKR 等流程时才读取相应状态目录。

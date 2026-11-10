# 项目记忆地图

本文件是 Agent 读取项目上下文的第一跳。目标是让 Agent 一次定位当前任务需要的知识域、局部 README、SOP 和真实代码入口。

## 使用规则

- 普通开发、分析或进入 `aipd-case` 前，优先读取 `_aipd/map.md`。
- 先按用户说法和业务词命中入口，再读取必要上下文；不要机械全量扫描所有知识域。
- 普通任务不读取 `_aipd/case/` 或 `_aipd/okr/`；只有明确进入相应流程时才读取状态文件。
- 只有用户显式调用 `$aipd-leader`，才创建或读取 `_aipd/leader/`；任务复杂或存在多个 Case 不会自动触发。
- 新发现的稳定入口应回写本文件或相应知识域的 map。

## Map 的三种分辨率

| 分辨率 | 负责划定的范围 | 典型载体 |
|---|---|---|
| 项目总图 | 暴露项目全局高频入口，让 Agent 知道有哪些知识域、业务线、共享能力和代码区域 | `_aipd/map.md` |
| 上下文 Map | 围绕业务线、功能线或 shared capability，串起相关知识、页面、接口、README 和代码入口 | Product / Core / Engineering map，或独立业务线 map |
| 局部实现图 | 说明页面、组件、脚本或代码模块内部怎么理解、修改和验证 | 代码就近 `README.md` 或局部 map |

三种 Map 都是检索视图，不是新的存储分类，也不是每次都要完整经过的固定三级流程。项目总图应直接暴露高频上下文 Map 和局部入口。

## 高频任务路由

| 用户说法 / 关键词 | 标准入口 | 上下文范围 | 必读上下文 | 真实代码 / 局部入口 | 兜底搜索 |
|---|---|---|---|---|---|
| {示例：合同 / 产品 / 任务 / 交付记录} | {核心概念或功能线} | `knowledge.core` + `knowledge.product` | `_aipd/knowledge/core/map.md`、`_aipd/knowledge/product/{feature}/map.md` | 相关页面或模块 README | `rg "合同|产品|任务|交付"` |
| {示例：权限 / 菜单 / 按钮显隐} | {工程规则} | `knowledge.engineering` + 局部 README | `_aipd/knowledge/engineering/{rule}/map.md` | 目标页面 README、权限工具函数 | `rg "permission|perms|auth|hasPermi"` |
| inbox / 收件箱 / 先记一下 / 先存一下 | Inbox 临时收件箱 | capture | `_aipd/inbox.md` | `aipd-inbox` | `rg "inbox|收件箱|先记一下|先存一下" _aipd` |
| `$aipd-leader` / AI 主导项目 / Mission / 跨 Case 调度 | AIPD Leader（显式可选） | Leader + 必要 Knowledge / Case | 首次调用后读取 `_aipd/leader/index.md` | 已安装的 `aipd-leader` Skill | `rg "Mission|跨 Case|Leader" _aipd` |
| 目标模式 / goal 模式 / 绑目标 / `/goal` | 当前 Agent 平台的目标模式 | 先看本对话身份，再进 Leader 或 Case。Codex Leader 等待独立 Case task 时给自己开绑 Mission 的 goal | `AGENTS.md`；未显式 Leader 时 `_aipd/case/index.md`，已是 Leader 时 `_aipd/leader/index.md` | `aipd-case` 或 `aipd-leader` | `rg "目标模式|goal 模式|/goal|wait_threads" _aipd AGENTS.md` |
| SOP / AI 原生程序 / 可复用流程 | SOP 项目级 Agent 程序库 | SOP | `_aipd/sop/index.md`、`_aipd/sop/map.md` | `_aipd/sop/` | `rg "SOP|AI 原生程序|可复用流程" _aipd` |

## Core 核心概念

| 用户说法 / 黑话 | 标准概念 | 概念 map | 相关 Product 功能线 | 常见误解 |
|---|---|---|---|---|
| {别名} | {概念名} | `_aipd/knowledge/core/{concept}/map.md` | `_aipd/knowledge/product/{feature}/map.md` | {不要混用的词} |

## Product 产品功能线

| 用户说法 / 场景 | 标准功能线 | 功能线 map | 前端入口 | 后端入口 | 数据对象 | 相关 Core | 相关 Engineering |
|---|---|---|---|---|---|---|---|
| {例如：审批失败后修改} | {功能线名} | `_aipd/knowledge/product/{feature}/map.md` | {页面 README / 路由} | {Controller / API} | {表 / 实体 / DTO} | `_aipd/knowledge/core/{concept}/map.md` | `_aipd/knowledge/engineering/{rule}/map.md` |

## Engineering 工程规则

| 用户说法 / 工程词 | 规则名 | 规则 map | 影响范围 | 稳定入口 | 常见错误 |
|---|---|---|---|---|---|
| {例如：若依权限 / 按钮显隐} | {规则名} | `_aipd/knowledge/engineering/{rule}/map.md` | {前端 / 后端 / 跨端} | {工具函数 / 配置 / 接口} | {常见错误} |

## 代码局部地图

| 页面 / 模块 | 局部 README | 说明 | 相关 Product 功能线 |
|---|---|---|---|
| {模块名} | `{path}/README.md` | {局部地图说明} | `_aipd/knowledge/product/{feature}/map.md` |

## 检索检查

- Agent 是否先读取 `_aipd/map.md`，再进入必要知识域、局部 README 和真实代码。
- 核心概念是否读取 Core map，而不是直接猜业务含义。
- 产品功能是否读取 Product feature map，并找到稳定代码入口。
- 跨模块工程规则是否读取 Engineering rule map。
- 可重复项目动作是否检查 `_aipd/sop/` 中已有 SOP。
- Leader 是否只在用户显式调用后读取，并能恢复一个 active Mission、Case / task 绑定和下一位置。

## 回写检查

- 用户明确确认的长期方向、目标或边界是否回写到 Intent。
- 带来源、采集时间和有效性边界的稳定外部事实或调研结论是否回写到 Research。
- 新核心概念、别名或误解写入 Core。
- 新产品功能边界和业务规则写入 Product。
- 新跨模块实现逻辑、工程规则和调试经验写入 Engineering。
- 新可复用 Agent 程序写入 `_aipd/sop/`，并更新 `_aipd/sop/map.md`。
- 新高频入口回写本文件。
- 未完成 case 候选、未核实材料和一次性过程是否仍留在 Case 或 Inbox。

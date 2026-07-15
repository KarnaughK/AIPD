---
name: aipd-okr
description: >
  AIPD OKR 目标管理入口。查看、创建、同步、删除或讨论 OKR 时使用；AIPD 中的 OKR 默认指飞书 OKR，覆盖 lark-cli、周期、O/KR、对齐关系、OKR 经验包和让子 Agent 获取 OKR 结果以节省主 Agent 上下文。
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
  - Agent
  - AskUserQuestion
inject-from-core:
  - okr/guide.md
  - okr/feishu-cli.md
---

# AIPD OKR

`aipd-okr` 是 AIPD 的飞书 OKR 入口。AIPD 里提到 OKR 时，默认就是飞书 OKR；本 skill 负责把飞书查询、写入和对齐判断压缩成主 Agent 可用的结果。

## 职责边界

**只做**：

- 读取当前项目的 `_adoc/index.md`、`_adoc/map.md` 和 `_adoc/okr/index.md`，确认本项目 OKR 入口和协作边界。
- 按需读取 `@references/okr/guide.md`，理解 AIPD 的飞书 OKR 规则。
- 涉及飞书 OKR 或 `lark-cli` 时，读取 `@references/okr/feishu-cli.md`。
- 查看、创建、同步、删除或解释飞书 OKR。
- 把高噪声远端查询、CLI 输出和跨项目核对压缩成 OKR 经验包，交给主 Agent 决策。
- 写回 `_adoc/okr/index.md` 中必要的飞书入口、周期 ID、目标 ID、协作边界或操作经验。

**不做**：

- 不把 OKR 当 todo 列表，也不替代 case / work package。
- 不默认读取 `_adoc/case/`；只有用户明确要求 OKR 与 case 对齐，或当前任务本身需要判断某个 case 是否推进目标时才读取。
- 不把完整飞书 JSON、CLI 长日志、调试输出贴回主 Agent。
- 不在用户未确认时执行远端写入或删除。

## 默认流程

1. 读取当前项目 `_adoc/index.md` 和 `_adoc/map.md`。
2. 如果存在 `_adoc/okr/index.md`，读取它；如果不存在，只说明当前项目还没有记录飞书 OKR 入口。
3. 判断用户任务类型：
   - **只读查看 / 解释 / 对齐讨论**：读取 `@references/okr/guide.md`，必要时查询远端。
   - **飞书操作 / lark-cli / 周期查询**：读取 `@references/okr/feishu-cli.md`。
   - **写入 / 删除**：先给操作方案、影响范围和待确认命令，用户确认后执行。
4. 输出压缩结果或 OKR 经验包。
5. 如果产生稳定飞书入口或 ID，询问是否写回 `_adoc/okr/index.md`；用户确认后再写。

## 子 Agent 与经验包

飞书远端查询、CLI 探测或单周期核对上下文可控时，Main Agent 可以直接完成。预计会产生长日志、大量原始 JSON，或存在多个可独立并发的周期 / 项目核对时，优先派 Child 隔离或并发；平台不可用时由 Main 回退执行，用户明确要求不派 Child 时遵循用户当前指令。Child 不因此获得额外的远端写入权限；写入和删除仍按下文规则确认。

派发给子 Agent 的任务应短，只传：

- 当前项目路径。
- 用户要解决的 OKR 问题。
- 是否允许远端写入；未说明时只能只读。
- 需要读取的参考：`@references/okr/guide.md`、必要时 `@references/okr/feishu-cli.md`。

子 Agent 只返回 OKR 经验包，不返回完整工具输出。

```md
【OKR 经验包】
- 来源：飞书 OKR / lark-cli / 用户讨论 / 子项目 ADOC / _adoc/okr 入口索引
- 任务：查看 / 创建 / 同步 / 删除 / 对齐 / 能力探测
- 已读上下文：...
- 远端状态：周期、O/KR 数量、关键 ID、必要链接；不贴完整 JSON
- AIPD 入口状态：_adoc/okr/index.md 是否记录飞书入口和关键 ID
- 判断：本次应该怎么处理，以及为什么
- 风险：权限、周期错配、重复 O/KR、远端写入风险、安装版 skill 版本差
- 建议动作：...
- 可写回字段：周期 ID、objective_id、KR id、协作边界、操作经验
- 原始输出位置：如必须保留长输出，写临时文件路径或说明未保留
```

## 飞书操作约束

- 执行写入前，必须让用户确认目标周期、O/KR 文本和是否创建 / 删除。
- 删除 Objective 必须使用 `--yes`，但只能在用户明确确认后执行。
- 查询远端时优先用 `--jq` 裁剪字段。
- 如果 CLI 能力与预期不一致，先返回能力探测结果，不继续猜测。
- 如果 AIPD 源码和已安装 skill 的 OKR 规则不一致，明确说明版本差，并以当前已加载的 `aipd-okr` skill 为准。

## AIPD 记录规则

`_adoc/okr/index.md` 只保存对后续 Agent 有用的飞书 OKR 索引信息：

- 飞书 OKR 入口。
- 周期 ID。
- Objective / KR ID。
- 全局 O 与子项目 KR 的协作边界。
- 对 Agent 后续操作有用的最小经验。

需要复盘时，读取飞书 OKR 或输出 OKR 经验包。

## 典型用户说法

```text
/aipd-okr 看一下当前 OKR
/aipd-okr 把这组 O/KR 创建到飞书
/aipd-okr 查一下飞书有哪些周期
/aipd-okr 给这个 KR 建一个子项目目标
/aipd-okr 删除这个测试 Objective
/aipd-okr 生成一个 OKR 经验包给主 Agent
```

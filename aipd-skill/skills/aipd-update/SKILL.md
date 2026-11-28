---
name: aipd-update
description: >
  把已接入项目更新到本机已安装的 AIPD 发布快照，或按用户要求切换 AGENTS.md 模板（纯 AIPD / 四段式回复）。读取项目版本、完整版本记录、当前权威文档和项目定制后，一次语义收敛并记录结果；也可承接 unversioned-v2 或先路由 legacy Schema 迁移。
  关键词：AIPD update、aipd update、升级 AIPD、更新 AGENTS、切换模板、四段式回复、补 map、同步新模板、项目版本、版本日志、unversioned-v2、Knowledge Schema
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
  - AskUserQuestion
---

# AIPD Update

`aipd-update` 把整个目标项目收敛到本机已安装的 AIPD 版本。正常调用已经授权更新项目内的 AIPD 工作区；不要再固定执行“先审计、逐项确认、再同步模板”。

## 不变量

- 本机 `@references/updates/catalog.json` 声明的 `currentVersion` 是唯一目标版本 `I`；不查询 GitHub、网络或远端版本。
- 项目 `_aipd/manifest.json#aipdVersion` 是已成功应用版本 `P`；`AGENTS.md` 不是版本事实源。
- Release Records 只解释演进、替代关系和保护点，不是逐版执行脚本。完整读完记录以前不得写项目，也不得把项目落到中间版本。
- catalog 的 current guide 与 `currentAuthority` 决定版本 `I` 的框架最终态；项目现状决定必须保护的业务事实和定制内容。
- 只有验证成功后才提交版本与项目更新日志。任何失败都不得把项目标成 `I`。

## 所有权与合并边界

- **AIPD-owned**：manifest、AIPD 标记区块、框架入口和模板合同，按版本 `I` 的 current authority 收敛。
- **project-owned**：五类 Knowledge 正文、代码就近 README、`AGENTS.md` 标记区块外内容和项目业务事实，默认保留。
- **mixed**：项目 index / map、流程索引和正在运行的 Case，按语义合并；模板只是当前合同，不是整文件覆盖指令。
- Intent 只接收用户明确确认的长期方向；Research 不伪造来源或时间边界；未验收 Case 结论不得趁更新写入长期 Knowledge。
- 保留当前 Agent MD 安装状态和已有模板选择（未安装 / 纯 AIPD / AIPD + 四段式回复）；不得在未要求时自动新增或移除对话协议。既有项目缺少 Entry 时默认保持缺失，只有项目中的明确证据或用户当前要求补装或切换模板时才改动。

## 1. 读取本机发布快照

先完整读取：

1. `@references/updates/catalog.json`，得到本机版本 `I`、有序 `releases`、`currentGuide` 和 `currentAuthority`。
2. `@references/workspace/project-state.md`，使用其中的路径安全、manifest 形态与版本状态合同。

校验 catalog 的 Schema、正整数版本、严格连续顺序和引用存在性。current guide、任一 Release Record 或 current authority 文件缺失时，说明本机安装包不完整并停止；不要从源码仓库或远端猜补。

## 2. 安全识别项目状态

按 project-state reference 执行结构安全 gate。双根、symlink、错误路径类型、工作区内 symlink、损坏或未知 manifest、unresolved Git conflict 都是硬停止条件。

以下情况不是 blocker：当前入口、目录、模板、标记区块或旧措辞缺失 / 过期。它们正是 Update 的输入。普通 dirty worktree 也不自动停止；只有目标文件存在无法安全保护的重叠修改时才暂停。

按状态继续：

- **absent**：这是未初始化项目，交给 `aipd-init`，不冒充 Update 初始化。
- **legacy-needs-migration**：定位已安装 `aipd-init` Skill 随包提供的 `scripts/migrate-project-schema`；在 AIPD 源码仓库可使用 `aipd-skill/skills/aipd-init/scripts/migrate-project-schema`。先 dry-run，只有结果确定且安全时才执行，再把产生的两键 manifest 当作 `unversioned-v2` 继续本流程。迁移器不写 `aipdVersion`，也不代表已应用版本 `I`。
- **unversioned-v2**：令 `P` 为空，从第一条 bootstrap Release Record 开始读取；不要伪造 `V0`。
- **stale**（`P < I`）：更新到 `I`。
- **current**（`P = I`）：仍读取 current authority 并检查 drift。若用户明确要求切换 Agent MD 模板，直接按目标模板执行切换；若无差异且用户未要求切换，返回 no-op，并顺带说明当前使用的 `AGENTS.md` 模板、问一句是否需要切换为另一可选模板（纯 AIPD / AIPD + 四段式回复），用户确认前不修改文件；有漂移时可做同版本修复。
- **future-project**（`P > I`）：本机包过旧，硬停止；不得降级项目。
- **invalid**：硬停止并报告精确原因。

## 3. 先理解演进，再读取最终态

严格按以下顺序加载上下文：

1. 从 catalog 选择 `(P,I]` 的全部 Release Records；`unversioned-v2` 从 bootstrap 记录开始。`currentGuide` 与 record 路径相对 `@references/updates/` 解析，按版本升序逐份完整读取。
2. 汇总发生过什么、哪些判断已被替代、哪些项目内容必须保护、哪些确定性结构迁移是前置条件。此时仍不得写项目。
3. 读取 catalog 的 `currentGuide`，再读取它和 catalog 声明的全部 `currentAuthority`。core-relative 路径在安装包中解析为 `@references/{path}`。
4. 最后读取目标项目的 manifest、现有入口、AIPD 标记区块、Knowledge / SOP / Case / OKR 结构、必要正文和 Git 状态，形成一次 `P -> I` 最终态差异。

后面的 Release Record 如果撤销前面的变化，只保留演进理解；最终结果始终以版本 `I` 的 current authority 为准。

## 4. 一次语义收敛

按所有权合并最终态，而不是逐条重放版本记录：

- **additive**：补充缺失目录、入口、索引区块或模板壳，默认执行。
- **unambiguous semantic**：更新 AIPD 标记区块、明确过期的框架措辞和路由，同时能证明项目正文被保留，默认执行。
- **destructive**：删除、移动、覆盖项目内容或无法逆向恢复的变化，暂停并列出精确目标。
- **ambiguous**：当前规则与项目定制都可能是有意设计，且不能按所有权并存，暂停并只询问决定该冲突所需的最小问题。

确定性的底层结构迁移可以按依赖排序，但不得把任一中间发布版本写成项目状态。用户未要求时，不执行 install、commit、push 或其他远端写入。

Agent MD 模板识别与切换（保留标记区块外所有项目自有内容）：

- **识别当前模板**：无 `<!-- AIPD:START -->` 为未安装；仅有 `AIPD` 区块为「纯 AIPD」；含 `<!-- AIPD-INTERACTION-STYLE:START -->` 为「AIPD + 四段式回复」（`@references/agent-entry/interaction-style.md`）。常规更新保持是否安装对话协议不变；若既有项目的 `AIPD-INTERACTION-STYLE` 区块仍为旧版协议（如已下线的五段式回复），则按当前权威模板收敛为最新的四段式回复。
- **显式切换模板**：用户明确提出切换 `AGENTS.md` 模板时（无论 `P < I` 还是 `P = I`），均支持在「纯 AIPD」与「AIPD + 四段式回复」之间原子互切：切到「纯 AIPD」时保留并同步 `AIPD` 区块、移除 `AIPD-INTERACTION-STYLE` 区块；切到「AIPD + 四段式回复」时确保 `AIPD` 区块最新，并将 `AIPD-INTERACTION-STYLE` 区块替换（或追加）为 `@references/agent-entry/interaction-style.md`。

## 5. 验证并最后提交版本

在 manifest 仍保持原 `P` 的情况下先验证：

- 结构安全 gate 仍通过，current authority 要求的入口和静态引用可定位。
- Agent MD 标记成对，标记区块外内容未变化，未在用户未要求时擅自变更模板。
- 五类 Knowledge 与 SOP / Case / OKR / Inbox 职责未混杂；项目正文和进行中状态可恢复。
- 没有中间版本残留、未解决冲突或本机包以外的规则来源。

验证通过后，准备一条项目更新记录，包含原版本、目标版本、读取的 Release Records、实际合并、验证结果、保留差异和用户决策。把 `_aipd/update-log.md` 与精确三键 manifest 作为同一提交边界，最后以 manifest 的 `aipdVersion=I` 作为成功标记。

- `P < I` 或 `unversioned-v2`：记录一次 `P -> I` 更新。
- `P = I` 且修复 drift 或按用户要求切换 Agent MD 模板：记录一次 `I -> I` 更新（标明 drift repair 或模板切换）。
- `P = I` 且没有任何差异、用户也未要求切换模板：返回 no-op，不为制造日志而修改项目（可顺带问一句是否需要切换 `AGENTS.md` 模板）。

若最终写入任一步失败，报告未完成状态，不声称项目已更新到 `I`。

## 返回结果

成功时返回原版本、目标本机版本、读取的记录、实际改动、验证结果和保留的项目差异。暂停时只报告 blocker、已完成的只读检查和继续所需的精确决定。

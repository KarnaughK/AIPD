# c21 Verify

## 验收状态

- **状态**：passed
- **验收对象**：五段 Interaction Protocol、当前项目实例、Codex / Claude 四份分发引用、Codex 安装结果。
- **用户验收状态**：用户已确认进入 Verify，并明确授权验收通过后执行 Codex install。
- **Reduction Scan**：不适用；本 Case 不涉及产品文档、PRD、原型、用户流程、信息架构或用户可见页面，也没有 Attention Contract。

## 验收输入

- `case.md` Case Contract。
- `02-design/design.md` Design Guardrails 与 Readiness Gate。
- `03-execute/work-packages/wp-01-upgrade-interaction-response-protocol.md`。
- `03-execute/execute.md` 执行记录。
- `aipd-skill/src/core/agent-entry/interaction-style.md`。
- `AGENTS.md` 已启用 Interaction Protocol 区块。
- Codex / Claude 四份 dist 引用。
- build、`check-dist` 和安装输出。

## 验收前 Checkpoint

- **当前问题**：目标、Work Package 和设计护栏是否全部满足，安装后文件是否与源模板一致。
- **停止条件**：全部通过则等待 Close；失败则回到 Execute 或 Design。
- **安装边界**：只执行用户明确授权的 `./aipd-skill/scripts/install-codex`，不执行 Claude 安装。
- **恢复入口**：本文件。

## Case Contract 验收

- [x] 五个精确标题和固定顺序。
- [x] 前三段生成依赖与首段禁止提前结论。
- [x] 横向拓展和下一步职责分离。
- [x] 当前 `AGENTS.md` 与源模板一致。
- [x] 四份分发引用与源模板一致。
- [x] 当前有效范围旧标题消失。
- [x] build 与 `check-dist` 通过。
- [x] Codex Skill 安装成功且安装文件与源模板一致。

## Work Package 验收

- [x] `wp-01` 状态 completed，全部横向模块和验收标准已完成。
- [x] dist 只由 build 生成，没有手工维护漂移。
- [x] 未修改安装 / 更新流程、执行回复模板、短答例外或长答规则。
- [x] 未执行 Claude install。

## Design Guardrails 验收

- [x] “下一步”没有被定义为自动执行授权。
- [x] “展开说说”只要求关键判断摘要，不要求完整内部推理。
- [x] 简单事实短答例外仍保留。
- [x] 执行 / 修改回复模板保持不变。

## 验收命令

- 源模板与当前 `AGENTS.md` 协议区块 `cmp`。
- 四份 dist 引用与源模板 `cmp`。
- 旧标题定向 `rg` 与五标题顺序检查。
- `./aipd-skill/scripts/build`。
- `./aipd-skill/scripts/check-dist`。
- `./aipd-skill/scripts/install-codex`。
- 安装后的 `~/.codex/skills/{aipd,aipd-update}` 引用与源模板 `cmp`。
- 相关文件 `git diff --check`。

## 验收结果

- **状态**：passed
- **通过项**：
  - 五标题固定顺序、首段与展开行为、横向 / 下一步边界定向检查通过。
  - 源模板、当前 `AGENTS.md` 和四份 dist 引用逐字一致。
  - 旧标题在当前有效协议与安装目标中无命中。
  - build、`check-dist`、`git diff --check` 通过。
  - `./aipd-skill/scripts/install-codex` 成功安装 9 个 Skill 和 3 个 Agent。
  - 安装后的 `aipd` / `aipd-update` 协议引用与源模板一致，3 个 Agent 与 dist 一致。
- **未通过项**：无。
- **残留风险**：无；完整 build 同步了工作区其他进行中 Case 的源改动，但本 Case 只归属并验收 Interaction Protocol 目标文件。
- **下一步**：等待用户确认进入 Close。

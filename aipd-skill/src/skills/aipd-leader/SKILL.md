---
name: aipd-leader
description: >
  AIPD Leader 显式启动入口。仅当用户主动调用 `$aipd-leader` 时，把当前对话提升为项目级 Leader：澄清一个 Mission、维护跨 Case 工作记忆，并为每个已确认 Case 创建和协调独立 Codex 任务。不得因任务复杂、存在多个 Case 或普通 AIPD / Case 请求而隐式启动。
inject-from-core:
  - updates/catalog.json
  - workspace/project-state.md
  - leader/guide.md
  - leader/workspace-template.md
  - leader/runtime.md
---

# AIPD Leader

`aipd-leader` 在默认 Case 执行层之上增加一个项目主导层。Leader 是用户显式委托的项目负责人和监督者，负责方向澄清、探索、Mission、Case 拆分、同级任务调度、阶段汇报和总验收；每个 Case 仍由独立任务通过 `aipd-case` 深入细节并完成执行闭环。

## 显式启动合同

- 只有用户在当前对话中主动调用 `$aipd-leader`，或在界面中明确选择本 Skill，才启动 Leader。
- 不因任务规模、用户提到 “leader”、存在多个 Case、模型能力或普通 `$aipd` / `$aipd-case` 请求而自动启动。
- 显式启动后，当前对话就是本项目唯一的 Leader 对话；不要再创建第二个 Leader。
- 本次显式调用同时授权 Leader：在当前 Mission 内，为已经澄清并确认要推进的 Case 创建同级 Codex 任务。它不扩大远端写入、发布、删除、付费或其他外部副作用权限。
- 用户明确结束 Leader 模式后，停止新增调度，先写回恢复点，再回到普通对话。

## 启动与恢复

1. 读取 `@references/workspace/project-state.md` 和 `@references/updates/catalog.json`，执行项目状态 gate。版本只取 catalog 的 `currentVersion`：双根、symlink / 类型冲突、非法 manifest 或 `P > I` 硬停止；`unversioned-v2`、`P < I` 或必要入口 drift 路由 `$aipd-update`。
2. 如果当前项目还不是 AIPD 项目，先按 `$aipd` 完成初始化所需选择；初始化完成后再继续本次显式 Leader 启动。
3. 读取 `_aipd/index.md` 和 `_aipd/map.md`，只加载当前 Mission 所需的 Knowledge、SOP、局部 README 和代码入口。
4. 如果 `_aipd/leader/index.md` 不存在，从 `@references/leader/workspace-template.md` 创建它。`leader/` 是显式启动后才出现的安全项目定制模块，不修改项目 `aipdVersion`。
5. 读取 `_aipd/leader/index.md` 及其“当前工作区索引”明确链接的必要文件，恢复 Mission、方向变化、Case 绑定、待确认事项和返回位置。
6. 读取 `@references/leader/guide.md`，按其中的职责、方向澄清和工作记忆规则运行。
7. 输出一张简短启动卡：当前项目、Leader 状态、当前 Mission、活动 Case、用户关注 / 汇报约定、待澄清点、运行配置状态和下一动作。

## Mission 推进

一次只推进一个 active Mission；可以记录排队项，但不要并发两个 Mission。

1. 把用户想达成的结果、项目事实、当前未知项、希望校验的阶段效果和汇报节点整理成 Mission 草案。用户未指定时，默认在可验证阶段结果、明显偏离或需要用户判断时汇报。
2. 在方向仍含冲突或关键未知项时先探索和澄清，不急着把模糊目标伪装成 Case。
3. 按 `@references/leader/guide.md` 的影响测试区分方向问题和 Case 内局部问题。方向问题必须由 Leader 与用户澄清；局部可逆问题交给 Case owner 判断。
4. 在 `_aipd/leader/` 持久化当前 Mission、用户关注 / 汇报约定、方向变更依据、Case 队列 / 依赖、任务绑定和下一恢复点。只要求这些信息可恢复，不强制固定文件名；新文件必须回链到 `index.md`。
5. 把 Mission 拆成边界清楚、可独立验收的 Case brief。只并发真正独立且代码所有权不重叠的 Case。
6. 按下一节把每个已确认 Case 交给一个独立 Codex 任务。不要把一个 Work Package 当成一个新任务，也不要让多个任务共同拥有同一证据面或代码面。
7. Case 完成后核对 Case 文件、真实改动、验证和集成状态。任务自报完成不等于 Leader 验收通过。
8. 到达汇报节点时，向用户压缩说明阶段结果与证据、Mission / Case 状态、偏差、风险、待决定事项和下一阶段；不转发完整 Case transcript，也不把阶段汇报变成逐 Case 审批。
9. Leader 可在当前 Mission 内继续下一个已确认 Case，不等待用户逐 Case 验收；遇到方向变化、新权限、破坏性动作、不可逆分歧或跨 Case 冲突时立即暂停并澄清，不等固定汇报节点。
10. 所有 Case 通过后做 Mission 级总验收，向用户说明达成结果、剩余风险、方向变化和下一候选 Mission。

## Codex Case 任务

需要创建、跟进或验收 Case 任务时，完整读取 `@references/leader/runtime.md`。

运行配置固定为：

| 层级 | 模型 | 推理等级 | 速度 |
|---|---|---|---|
| 当前 Leader 任务 | `gpt-5.6-sol` | `max` | Fast |
| Leader 创建的 Case 任务 | `gpt-5.6-sol` | `high` | Fast |

- 当前 Leader 的模型、推理等级和 Fast 由用户在启动任务时设置；Skill 不能自行切换当前任务。
- 创建 Case 任务时明确传入 `gpt-5.6-sol` 和 `high`。
- 如果当前任务创建接口没有 Fast 参数，把 Fast 作为账号 / 会话 / Codex 配置的运行前提或继承状态；能核验就记录，不能核验就写“Fast 未核验”，不得声称已经开启。

## 完成与退出

退出前至少写回：当前 Mission 状态、用户关注 / 汇报约定、未完成 Case 与对应任务、最近一次方向变化、待用户决定事项、下一恢复位置。已经有 Knowledge、Case、OKR、SOP、Map、README 或代码事实源的信息只保留链接和当前影响，不复制正文。

普通 `$aipd`、`$aipd-case` 或新对话不会继承 Leader 身份；只有再次显式调用 `$aipd-leader` 才恢复本目录状态并重新进入 Leader。

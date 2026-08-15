# Mission：AIPD 大升级文档刷新

## 状态

- Mission：`m1-documentation-refresh-v2`
- 状态：completed / Leader accepted
- 启动日期：2026-08-13
- 完成日期：2026-08-13
- 当前基线：`main@e22f97e`；启动时工作树干净，`main` 比 `origin/main` 领先 1 个提交
- Leader：当前显式 `$aipd-leader` 对话

## 想达成的结果

把 AIPD 最近一轮大升级后的真实能力、使用方式和边界同步到三类文档，让维护者、新用户和正在使用 AIPD 的人分别能从正确入口获得一致、可执行的信息。

当前升级共享事实以源码、当前 `_aipd/` 与已归档 Case 为准，重点包括：Knowledge Schema v2、版本化 AIPD Update、显式 Leader / Mission / Case task、AI 友好代码拓扑、项目级交互协议、Main / Child 运行时判定，以及仅服务本仓库的 `aipd-learn` 边界。

## 边界

- 更新项目内部文档、根 `README.md` 和 `docs/` 教程 / 参考文档。
- 允许修正文档导航、术语、示例命令、迁移说明和跨文档链接。
- 不改变 Skill 或脚本运行行为，不手改 `aipd-skill/dist/`，不执行 install、push、发布或远端写入。
- 旧 Case、迁移说明和历史记录中的旧术语可以保留；活跃事实源不能把历史语义写成当前能力。
- 三个并行 Case 的内容文件所有权不重叠；各 Case 只修改自己的范围，跨范围问题回报 Leader。

## Mission 成功判据

1. 项目内部入口与维护者文档能准确说明当前架构、公共 / 仓库级能力、源码入口和构建边界。
2. 根 README 能让第一次看到项目的人快速理解 AIPD 的价值、当前核心循环、升级后的关键能力、适用边界和第一步。
3. `docs/` 形成连贯的学习与查阅路径，教程示例可执行，覆盖初始化、Map-first、Case 生命周期、Weave、Update、Leader 与进阶代码拓扑。
4. README、教程、内部文档对核心术语、能力数量、路径、命令和当前平台边界保持一致。
5. Markdown 本地链接、文档术语扫描和与当前源码入口的核对通过；没有把历史 / 迁移语义误写成当前默认行为。

## 用户关注与汇报约定

- 用户要求快速推进并尽快完成一轮文档更新。
- 默认只在出现可验证阶段结果、明显偏离或需要用户判断时汇报；不逐 Case 请求审批。
- 当前没有需要用户先回答的方向问题；按“覆盖全面，但不改变运行行为”的解释推进。

## Case 队列与所有权

| Provisional Case | 目标 | 内容文件 owner | 依赖 | 状态 / task |
|---|---|---|---|---|
| `c25-internal-documentation-refresh` | 审计并更新项目内部认知入口和维护者文档 | `_aipd/index.md`、`_aipd/map.md`、`_aipd/knowledge/**`、`aipd-skill/README.md`；只读核对其他源码事实源 | 共享基线 | Leader accepted / integrated；Case 已 Close 并归档；task `019ff6ed-97bb-7a42-a934-7b7c2332147a`；host `local`；worktree `/Users/yangzongru/.codex/worktrees/1700/AIPD`；cursor `4cecdc5b-c738-4fea-8f25-5dc0737b6c2d:47` |
| `c26-public-readme-refresh` | 重做 / 校准项目首页，使升级后的价值与快速开始清晰可见 | 根 `README.md` | 共享基线 | Leader accepted / integrated；Case 已 Close 并归档；task `019ff6ed-97bb-7a42-a934-7bb8303e93a3`；host `local`；worktree `/Users/yangzongru/.codex/worktrees/3043/AIPD`；cursor `6e6494e5-858c-4998-bf19-b0b91bae7a22:34` |
| `c27-learning-docs-refresh` | 更新学习路径、教程和模块参考，保证操作可执行、概念一致 | `docs/**` | 共享基线 | Leader accepted / integrated；Case 已 Close 并归档；task `019ff6ed-97bb-7a42-a934-7b90f038479b`；host `local`；worktree `/Users/yangzongru/.codex/worktrees/7779/AIPD`；cursor `a91d6413-1a80-4988-a856-c6cfc635d6ca:45` |

三个 Case 都会建立正式 Case 文件；它们对 `_aipd/case/index.md` 的流程状态改动由 Leader 集成时统一收敛，不构成内容所有权共享。

## 运行配置

- 当前 Leader 任务应为 `gpt-5.6-sol / max / Fast`；模型、推理等级与 Fast 均由用户 / 会话配置，当前接口未核验。
- Case 任务固定创建为 `gpt-5.6-sol / high`；创建接口不提供 Fast 字段，因此 Fast 记为“未核验”。
- Git 项目默认使用隔离 worktree；各 Case 完成后由 Leader 核对并集成到当前 checkout。

## 当前 checkpoint

- 已完成：三个 Case 均完成 Think / Design / Execute / Verify / Close，Leader 已逐项核对真实 diff、Case 状态、验证证据与所有权，并把全部交付集成到当前 checkout。
- 下一动作：当前 Mission 已完成；等待用户决定是否另行提交 / 推送，或启动新的 Mission。未经明确要求不执行这些外部 Git 动作。
- 停止条件：发现方向冲突、新外部副作用、任务无法看到当前基线、内容所有权交叉或现有文档与源码事实无法判定时暂停并回到 Leader。
- 返回位置：本文件“Mission 级总验收”、三个归档 Case，以及当前工作树 diff。

## Mission 级总验收

- **内部文档**：更新 `_aipd` 总入口、项目 Map、Intent / Core / Engineering 当前事实与 `aipd-skill/README.md` 维护者导航；未从实现结果推导新的长期方向。
- **项目首页**：根 README 保留单一新人价值主线，形成 build / install 提示与 `/aipd -> /aipd-case -> /aipd-weave` 首次闭环，明确九个公共 Skill 和仓库级 Learn 的分发边界。
- **教程体系**：更新三条学习路径和六章教程，新增 Update / Schema 迁移、Interaction Protocol、AI 友好代码拓扑三个独立参考页；共校准 14 个 `docs/**` 文件。
- **流程状态**：`c25`、`c26`、`c27` 均已归档并写入 `_aipd/case/index.md`；当前无进行中 Case。

### 验证证据

- 三个隔离 worktree 均从 `e22f97e` 启动；集成后内容文件与各 Case 交付逐字一致，归档目录无差异。
- 27 个入口 / 用户文档 Markdown、80 个本地链接与锚点：0 failure。
- `git diff --check`、AIPD v2 项目 gate、路径与旧语义扫描通过。
- 实测 9 个公共 Skill、1 个仓库级 Skill、4 份平台无关角色指引、3 个 Codex custom Agent；仓库级 Learn 未进入公共 Skill 源码。
- 主 checkout 的 `./aipd-skill/scripts/check-dist` 通过，覆盖 Schema migrator fixtures、V2 release bundle / currentAuthority、源码 / dist 同步、Leader 显式合同和代码拓扑投影。

### 剩余风险与权限状态

- 本 Mission 只改变文档与 AIPD 流程状态，没有修改 Skill / 脚本运行行为。
- 未执行 install、commit、push、发布或其他远端写入；当前改动保留在工作树中。
- 当前没有待用户澄清的方向问题或阻塞项。

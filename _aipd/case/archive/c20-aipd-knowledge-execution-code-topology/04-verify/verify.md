# Verify：AI 友好代码拓扑 ADOC 与 Skill 运行时闭环

## Verify Result

- **状态**：passed / user accepted / Codex installed。
- **验收范围**：Case Contract、`wp-01-adoc-code-topology`、`wp-02-skill-code-topology-runtime`、Design Guardrails、Code Topology Contract、源码与 Codex / Claude 打包产物。
- **不属于本次通过条件**：公开 docs 重写、外部业务项目迁移、用户级 / 项目级 install。
- **产品注意力 Reduction Scan**：not applicable；本 Case 不交付 UI、原型或用户可见产品页面。

## Case Contract 验收

| 完成标准 | 结果 | 证据 |
|---|---|---|
| 三个真实案例独立保存并校准 | passed | `01-think/` 三个案例分支与跨案例归属分析 |
| 形成有证据的代码拓扑模型 | passed | `_adoc/L3-core/ai-friendly-code-topology.md` |
| ADOC 主事实源、摘要、术语和路由完成 | passed | `wp-01-adoc-code-topology.md` 验收记录 |
| Skill 运行时承载方式完成设计、执行和验证 | passed | `02-design/skill-runtime-projection.md`、`wp-02-skill-code-topology-runtime.md`、build / check-dist |

## Work Package 验收

### wp-01-adoc-code-topology

- 状态：completed。
- 主事实源、L1 / L3 / L4 摘要、两级 map 与命名空间校正均完成。
- 未把 Page One / Guessword 的未完整实证目标拓扑固化为目录模板。

### wp-02-skill-code-topology-runtime

- 状态：completed。
- 新增公共运行时投影，仅由 `aipd` 与 `aipd-case` 条件消费。
- Case Design / Execute / Verify 与 case / work-package template 已形成三段执行闭环。
- Worker、Codex 与 Claude Agent guide 已同步新的“并列工作项”字段，没有模板断链。
- 两平台 build、专项 check-dist、内容一致性、旧术语和范围审计全部通过。

## Code Topology Contract 审计

| 合同项 | 真实结果 | 判断 |
|---|---|---|
| 运行时单一 owner | 只有 `aipd-skill/src/core/ai-friendly-code-topology.md` 作为源文件 | passed |
| 允许的消费者 | Codex / Claude 各自只有 `aipd`、`aipd-case` 包含投影，共 4 份生成文件 | passed |
| 显式组合边界 | `inject-from-core` 负责复制；Skill / Design phase 负责触发；项目合同负责下沉 | passed |
| 禁止扩散 | README、公开 docs、Agent Entry、其他 7 个 Skill 和外部项目均未修改消费规则 | passed |
| shared 变化权限 | 只新增一份公共 core reference；没有新建独立 Skill 或重构其他公共 guide | passed |
| Execute 守约 | Work Package 模板有拓扑敏感字段和短护栏；Execute 有 preflight 与 Design 回跳 | passed |
| Verify 审计 | Verify phase 明确依据真实 diff / 依赖 / 目录 / 文档回写审计合同 | passed |
| 认知回写 | L3 登记运行时投影；L5 登记 owner / build / check；map 可一跳命中 | passed |

未发现未经批准的 shared 抽取、消费者扩张、边界穿透或 owner 漂移，不需要回到 Design / Execute。

## 验证命令与结果

- `./aipd-skill/scripts/build`：passed；Codex / Claude 各生成 9 个 Skill。
- `./aipd-skill/scripts/check-dist`：passed；9 Skill、源码同步、静态引用、平台差异、代码拓扑投影、关键语义和 cleanup 入口均正常。
- `bash -n aipd-skill/scripts/build aipd-skill/scripts/check-dist`：passed。
- 4 份 dist 投影逐份 `cmp` core 源文件：passed。
- 最终 Skill Markdown 旧空间术语检索：passed，无命中。
- `git diff --check` 与新增文件尾随空白检查：passed。
- 范围审计：passed；未命中 README、`docs/`、Agent Entry 或其他 7 个 Skill 入口。
- `./aipd-skill/scripts/install-codex`：passed；Codex 用户环境安装 9 个 AIPD Skill 和 3 个 AIPD Agent。
- 安装后目录逐项 `diff` / `cmp`：passed；9 个 Skill、3 个 Agent 与 dist 一致。
- 安装后代码拓扑 smoke：passed；两个目标 Skill 均包含与 core 一致的投影，两个入口和 Execute / Verify 合同规则可检索，旧 AIPD Skill 清理完成。

## 残留风险与 deferred

- **install 已完成**：2026-08-10 用户确认后安装并通过 smoke；当前 Codex 用户级 AIPD Skill 已更新。
- **公开 docs deferred**：`docs/modules/context-decoupling.md` 仍可在后续独立事项中面向用户重写；不影响外部 Agent 的 Skill 运行时能力。
- **真实业务项目继续验证**：Page One 多站点和 Guessword 多游戏拓扑仍要通过各自实现继续校准，不反向阻塞本次框架合同。

## 用户验收状态

- **内部 Verify**：passed。
- **用户验收**：passed；2026-08-10 确认执行 Codex 用户级 install，安装与 smoke 均通过。
- **安装前 checkpoint**：目标为 `/Users/yangzongru/.codex/skills/` 下 9 个 AIPD Skill 与 `/Users/yangzongru/.codex/agents/` 下 AIPD agents；现有 `aipd` / `aipd-case` 校验值与新 dist 不同，确有更新需要；安装脚本还会清理明确列出的旧 AIPD 入口。
- **执行边界**：只运行 `./aipd-skill/scripts/install-codex`，不安装 Claude、不修改项目级 Skill、不处理非 AIPD 目录。
- **安装结果**：9 个 Skill、3 个 Agent 与 dist 逐项一致；代码拓扑公共投影、双入口和三段合同可用；旧 AIPD Skill 已清理。
- **下一步**：进入 Close，复核已经回写的长期认知与仍应留在 Case 的未实证候选。
- **恢复入口**：`../case.md` -> 本文件 -> `../03-execute/work-packages/wp-02-skill-code-topology-runtime.md`。

# Case: c17-skill-package-audit

> **本次事项目标**：从最终打包产物出发，逐个审计并修复 AIPD Skill，使所有已发布 Skill 与当前核心认知、流程和平台约束一致。
> **当前 Phase**：Close
> **目标模式绑定**：完成并关闭 `c17-skill-package-audit`；complete；本 Case 已归档。

## Case Contract

### 目标

- **目标**：把 `aipd-skill/dist/codex/skills/` 与 `aipd-skill/dist/claude/skills/` 中每个 Skill 当作独立测试对象，检查最终可见行为，定位源码根因，完成统一修复、重新构建和逐项复验。
- **方向关联**：保证 AIPD 的最终可安装能力与项目当前的 Map-first、Case Contract、phase-first、Work Package、文件优先 checkpoint、Main / Child 净收益调度、Goal Mode、Weave、Inbox、SOP 和飞书 OKR 等核心认知一致。

### 要做

- 以最终 `dist` 为事实入口，建立完整 Skill 清单和逐 Skill 审计矩阵。
- 对每个 Skill 检查：描述、触发路由、流程、注入 references、平台产物差异、旧术语、旧目录、旧 skill 入口、外部副作用边界和恢复规则。
- 将产物与最新 L1 / L3 / L4 / L5、Agent Entry、Case、ADOC、平台 Agent 规则进行对照。
- 每个问题从产物回溯到唯一源码 owner，避免直接修改 `dist`。
- 统一修复源码及必要的构建 / 安装脚本，运行 build 后再次逐 Skill 审计。
- 记录验证证据、遗留风险和后续教学文档 Case 候选。

### 不做

- 不更新 `docs/` 教学文档、根 README 的教学表达或完整用户学习路径；这些另开 Case。
- 不修改 AIPD Desktop、业务示例项目或 `experience-assets/` 的实现内容，除非仅需修正 Skill 中对它们的错误入口。
- 不执行用户级或项目级 install，不发布、不推送、不创建 PR；build 完成后另行征求 install 确认。
- 不为了兼容旧 Case / Step / skill 入口长期保留过期运行逻辑。

### 完成标准

- [ ] Codex 与 Claude 的每个打包 Skill 都有一条审计记录和明确结论。
- [ ] 每个 Skill 都完成核心认知、流程、注入引用和平台差异检查。
- [ ] 所有确认问题都已回溯到源码并修复，或明确记录为不处理及理由。
- [ ] 构建成功，源码与两套 `dist` 产物一致，缺失引用和旧入口检查通过。
- [ ] 二次逐 Skill 审计没有遗留高 / 中严重度问题。
- [ ] 教学文档相关发现只形成下一 Case 候选，不混入本次修改。

### 上下文索引

#### 层级判断

- **L1 Intent**：确认 AIPD 的方向和长期边界，防止 Skill 只做局部语法更新。
- **L3 Core**：对照项目知识库、Map-first、任务执行、文件优先上下文承接和 Agent 协作模型。
- **L4 Product**：对照每条 Skill 功能线的用户可见边界。
- **L5 Dev**：对照构建安装、Codex / Claude 平台适配和 Main / Child 调度规则。
- **L6 Code**：`aipd-skill/src/`、`aipd-skill/scripts/`、`aipd-skill/dist/`。

#### 项目认知

- `_adoc/index.md`
- `_adoc/map.md`
- `_adoc/L1-intent/intent.md`
- `_adoc/L3-core/index.md`
- `_adoc/L3-core/horizontal-capabilities.md`
- `_adoc/L3-core/vertical-concept-modules.md`
- `_adoc/L4-product/index.md`
- `_adoc/L4-product/map.md`
- `_adoc/L5-dev/index.md`

#### 代码入口

- `aipd-skill/src/skills/*/SKILL.md`
- `aipd-skill/src/core/`
- `aipd-skill/src/platforms/`
- `aipd-skill/scripts/build`
- `aipd-skill/scripts/install*`
- `aipd-skill/scripts/dev*`
- `aipd-skill/dist/codex/`
- `aipd-skill/dist/claude/`

#### 兜底搜索

- `rg "AIPD2|AIPD 2|case-create|case-run|case-archive|steps/|01-goal|Goal phase|阶段 [0-9]|fork_context|授权子 Agent|context-map" aipd-skill/src aipd-skill/dist`
- `rg --files aipd-skill/dist/{codex,claude}/skills | sort`

### 边界变更记录

- 2026-07-21：用户明确要求本 Case 只先处理各个 Skill；教学文档留到下一个 Case。

## Case Runtime

## Current Phase

Close

## Phase State

- Think: completed -> `01-think/think.md`
- Design: completed -> `02-design/design.md`
- Execute: completed -> `03-execute/execute.md`
- Verify: completed -> `04-verify/verify.md`
- Close: completed -> `05-close/close.md`

## 当前焦点

- **当前要解决的问题**：无；Case 已完成并归档。
- **当前游标**：`05-close/close.md`
- **最近 checkpoint**：L5 回写、index 更新与 archive 审计完成；未执行 install。
- **下一步建议**：Codex 用户级安装已在 Case 关闭后经用户确认完成；教学文档另开 Case。
- **压缩后恢复入口**：本文件 -> `05-close/close.md`。
- **待确认项**：无；目标模式覆盖层允许在 Contract 内自主推进内部 Gate。
- **阻塞项**：无。

## Checkpoint 记录

| 时间 | 位置 | 触发 | 已确认 / 已变化 | open / assumed | 下一步 | 恢复入口 |
|---|---|---|---|---|---|---|
| 2026-07-21 | Case Contract | 用户创建并要求绑定执行 | 全量 Skill 产物审计、回溯修复、重建复验；教学文档排除 | install 需后续明确确认 | 进入 Think 建立审计基线 | `01-think/think.md` |
| 2026-07-21 | Think 完成 | 9 Skill 首轮产物审计 | 产物结构完整；8 项 needs-fix、1 项 pass；全部可回溯源码 | 无阻塞项 | 进入 Design 切修复包 | `01-think/skill-audit-matrix.md` |
| 2026-07-21 | Design 完成 | 目标模式内部 Gate | 三个 Work Package、平台等价规则、验证护栏确定；Readiness passed | 无 | 进入 Execute / WP-01 | `03-execute/work-packages/wp-01-core-entry-case.md` |
| 2026-07-21 | Execute / Verify 完成 | 三个 Work Package 与二次审计 | 9 + 9 Skill 构建、check-dist、静态引用、平台差异和 shell 检查通过 | install 排除；教学文档延后 | 进入 Close | `04-verify/verify.md` |
| 2026-07-21 | Close 审计 | Verify passed | c17 无外部路径引用风险；L5 需补 check-dist 稳定入口 | 教学文档留下一 Case | 回写 L5 后归档 | `05-close/close.md` |
| 2026-07-21 | Close 完成 | L5 回写与归档检查 | Case Contract 达成；已更新 case index 并归档 | install 等用户确认 | 关闭目标 | `05-close/close.md` |

## Think 摘要

- **状态**：completed
- **关键问题**：完整 Skill 集合是什么、每个 Skill 应对齐哪些核心认知、如何从产物稳定回溯源码 owner。
- **调研 / 比较分支**：`01-think/think.md`
- **决策结论**：不直接改 dist；按源码 owner 修复，并增加 `scripts/check-dist` 把逐项产物审计变成可重复测试。

## Design 摘要

- **状态**：completed
- **模式**：full
- **当前节点**：readiness-gate / passed

## Execute 摘要

- **当前执行游标**：全部完成。
- **Work Package**：WP-01 / WP-02 / WP-03 completed。

## Verify 摘要

- **状态**：passed

## Close 摘要

- **状态**：completed
- **归档结果**：`_adoc/case/archive/c17-skill-package-audit/`
- **归档后位置**：`_adoc/case/archive/c17-skill-package-audit/`
- **Post-Close**：2026-07-21，用户明确确认后执行 `./aipd-skill/scripts/install-codex`；9 个 Skill 与 3 个 Codex Agent 安装成功，安装内容与 dist 核对一致。

## Close 归档候选

- 教学文档与 README 的旧表达统一留到下一个独立 Case。

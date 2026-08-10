# Work Package: wp-02 - Skill 代码拓扑运行时投影

> **所属 Case**: c20-aipd-knowledge-execution-code-topology
> **Phase**: Execute
> **类型**: dev / docs / verify
> **推荐 Agent**: Main Agent
> **依赖**: `02-design/skill-runtime-projection.md`
> **拓扑敏感**: 是

## 目标

让外部 Agent 在普通结构性开发和 Case Design 中按需加载 AI 友好代码拓扑，并通过 Design 项目合同、Execute 短护栏、Verify 结果审计稳定执行。

## 设计依据

- Requirements Contract：`../../case.md#case-contract`
- Brownfield Delta：`../../02-design/skill-runtime-projection.md#预计-brownfield-delta`
- Context Boundary：`../../02-design/skill-runtime-projection.md#推荐方案双入口条件加载结果下沉`
- Readiness Gate：passed
- 复杂度爆点：长期 ADOC 不随 Skill 安装；只在 Design 讲通用理念又不能保证 Execute 严格执行；旧“横向铺模块”会和新代码拓扑命名空间冲突。
- 解耦方式：公共 core guide 作为唯一运行时投影，经 build 注入两个消费 Skill；Design 把 guide 编译为项目合同，Execute / Verify 只消费项目具体合同。
- 主干职责：Skill 入口只判断何时读取，phase / template 只定义合同和 Gate，guide 才承载通用判断正文。
- 文件 / 文件夹边界：以 Design 的 ADDED / MODIFIED / NOT MODIFIED 清单为准。

## 代码拓扑护栏

- **运行时 owner**：`aipd-skill/src/core/ai-friendly-code-topology.md`。
- **允许的消费者**：仅 `aipd` 与 `aipd-case`，通过 `@references/ai-friendly-code-topology.md` 条件加载。
- **显式组合边界**：`inject-from-core` 声明负责打包，Skill / Design phase 规则负责触发；目标项目 Design / L5 / 局部 README / map 承接项目具体事实。
- **禁止的边界穿透**：不把完整 L3 正文、三个案例过程或 AIPD 仓库绝对路径写入运行时 guide；不写入 Agent Entry 或其他 7 个 Skill。
- **共享能力变化**：本 Work Package 只批准新增这一份公共 core reference；不借机新建独立 topology Skill 或重构其他公共 guide。
- **独立验收边界**：源码 guide、两个入口、三个 phase / template、dist 投影和专项检查可分别检索，再由 build / check-dist 联合验证。
- **回写位置**：稳定 owner 链写回 AIPD L3 / L5 / map；一次性执行过程只留本 Case。

## 不允许固化的假设

- 具体项目的目录结构、纵向上下文清单和 shared 模块不能由 AIPD 通用 guide 预先决定。
- Page One 与 Guessword 的未完整实证拓扑不能被写成强制模板。
- Execute 默认不重新加载完整 guide；若项目合同需要改变，必须回 Design。

## 并列工作项

- [x] 新增公共运行时投影，并接入 `aipd` / `aipd-case` 两个条件入口。
- [x] 更新 Case overview、Design / Execute / Verify phase 和 case / work-package template，形成三段合同闭环。
- [x] 校正最终 Skill 中旧的空间术语。
- [x] 增加 check-dist 专项校验并同步 L3 / L5 / map owner 入口。
- [x] build 两个平台产物并完成静态引用、平台一致性、旧术语、范围和 whitespace 验证。

## 上下文文档

执行前必须读取：

- `../../case.md`
- `../../02-design/skill-runtime-projection.md`
- `../../../../../L3-core/ai-friendly-code-topology.md`
- `../../../../../L5-dev/index.md`
- `../../../../../map.md`
- `../../../../../../aipd-skill/src/skills/aipd/SKILL.md`
- `../../../../../../aipd-skill/src/skills/aipd-case/SKILL.md`
- `../../../../../../aipd-skill/src/core/case/phases/design.md`
- `../../../../../../aipd-skill/src/core/case/phases/execute.md`
- `../../../../../../aipd-skill/src/core/case/phases/verify.md`
- `../../../../../../aipd-skill/src/core/case/templates/work-package.md`
- `../../../../../../aipd-skill/scripts/check-dist`

## 执行前 checkpoint

- **当前目标**：完成公共投影、两个条件入口、三段合同闭环和专项打包验证。
- **恢复入口**：`../../case.md` -> `../../02-design/skill-runtime-projection.md` -> 本文件。
- **执行边界**：允许修改 Design 列出的源码 / ADOC owner 入口和 build 生成的 dist；禁止 docs、README、Agent Entry、其他业务 Skill 及 install。
- **预期输出**：源码 guide、入口 / phase / template 规则、两平台 dist、专项 check-dist、执行与验证记录。
- **停止条件**：全部验收通过；或发现需要新增消费者、改变 owner、扩大 Skill / docs / install 范围时停止并回 Design / 用户确认。
- **返回位置**：写回本文件、`../execute.md` 和 `../../case.md`；通过后进入 Verify。

## 验收标准

- [x] `aipd` 与 `aipd-case` 源码及 Codex / Claude 产物都包含同一运行时投影，其他 Skill 不包含。
- [x] 普通结构性任务和 Case Design 具有明确条件读取规则；无关任务不加载完整 guide。
- [x] Design 产出 Code Topology Contract，拓扑敏感 Work Package 携带短护栏，Execute 与 Verify 拥有 preflight / audit / 回跳规则。
- [x] 最终 Skill Markdown 不再使用旧空间术语表达并列扩展。
- [x] L3、L5 与项目 map 能一跳命中运行时 owner 和消费入口。
- [x] `./aipd-skill/scripts/build`、`./aipd-skill/scripts/check-dist`、`git diff --check` 和范围审计通过。
- [x] 未执行 install。

## 不做

- 不修改公开 docs、README、Agent Entry、外部项目或其他 7 个 Skill 的消费规则。
- 不新增独立 `aipd-code-topology` Skill，不把运行时 guide 无条件注入所有任务上下文。
- 不执行任何用户级或项目级 install。

## 执行记录

**状态**：completed

**完成时间**：2026-08-09

**主要改动**：
- 新增 `aipd-skill/src/core/ai-friendly-code-topology.md`，把 L3 抽象认知提炼成外部 Agent 可执行的运行时判断合同。
- `aipd` 与 `aipd-case` 通过同一 core reference 条件加载；普通局部任务与 Case Execute / Verify 默认不加载完整 guide。
- Case Design、Execute、Verify 与模板形成 Code Topology Contract -> 代码拓扑护栏 -> 真实结果审计闭环，并把 Work Package 空间术语统一为“并列工作项”。
- 同步 Worker / Codex / Claude Agent guide 的字段名称，避免模板与执行入口断链。
- `check-dist` 增加投影消费者、源码产物一致性、其他 Skill 排除、三段合同和旧术语专项检查；L3 / L5 / map 登记 owner 链。

**验证结果**：
- `./aipd-skill/scripts/build` 通过：Codex / Claude 各生成 9 个 Skill。
- `./aipd-skill/scripts/check-dist` 通过：新增代码拓扑投影专项检查与既有全部检查均正常。
- 产物检索只发现 4 份 guide：两个平台各自的 `aipd` / `aipd-case`；逐份 `cmp` 与 core 源文件一致。
- `rg` 确认最终 Skill Markdown 不再包含旧空间术语或已删除的 Work Package 字段。
- `bash -n`、`git diff --check`、新增文件尾随空白检查和范围审计通过；未修改 README、公开 docs、Agent Entry 或其他 7 个 Skill 的入口规则。
- 未执行 install。

**执行后 checkpoint**：
- **当前结论**：工作包全部验收项通过，没有暴露 Design 缺口。
- **下一步**：进入 Verify，复核 Case Contract、代码拓扑合同与真实产物。
- **恢复入口**：`../../case.md` -> `../../04-verify/verify.md` -> 本文件执行记录。

**遇到的问题**：无。

**回跳 / 重开**：无。

**Weave 候选**：
- Skill 运行时 owner 与三段合同闭环已经写回 L3 / L5 / map；Close 只复核，不重复回写。

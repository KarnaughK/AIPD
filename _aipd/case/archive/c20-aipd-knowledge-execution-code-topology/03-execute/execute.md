# Execute

## 状态

- **Phase**：completed / node 2
- **执行者**：Main Agent
- **最近 Work Package**：`work-packages/wp-02-skill-code-topology-runtime.md`

## Work Packages

| Work Package | 状态 | 目标 |
|---|---|---|
| `wp-01-adoc-code-topology.md` | completed | 建立 AI 友好代码拓扑的 L3 主事实源，并同步必要的 ADOC 摘要、术语与检索入口 |
| `wp-02-skill-code-topology-runtime.md` | completed | 建立公共运行时投影、双入口条件加载、三段代码拓扑合同闭环和专项构建验证 |

## 节点 2 执行前 checkpoint

- **当前问题**：外部 Agent 无法依赖 AIPD 仓库自己的 L3 文档；现有 Case phase 也缺少从 Design 代码拓扑决策到 Execute 短合同、Verify 结果审计的显式闭环。
- **设计输入**：`../02-design/skill-runtime-projection.md`、`../../../../L3-core/ai-friendly-code-topology.md` 和现有 Skill build / check-dist 链路。
- **执行边界**：只修改 `wp-02` 列出的运行时 guide、两个 Skill 入口、Case overview / phase / template、必要旧术语、check-dist、L3/L5/map owner 链以及 build 生成的 dist。
- **代码拓扑护栏**：公共 guide 是运行时单一 owner；只允许 `aipd` / `aipd-case` 条件消费；不进入 Agent Entry、其他 7 个 Skill、公开 docs 或外部项目；合同变化必须回到 Design。
- **验收标准**：两平台和两个目标 Skill 都包含同一投影；条件加载、Design / Execute / Verify 合同规则可检索；旧空间术语退出最终产物；build、check-dist、diff check 通过。
- **禁止事项**：不逐字复制完整 L3；不预建独立 Skill；不执行 install。
- **恢复入口**：`../case.md` -> `../02-design/skill-runtime-projection.md` -> `work-packages/wp-02-skill-code-topology-runtime.md`。
- **预期返回**：源码与 dist 改动、专项校验结果、残留风险；build 通过后询问是否 install。

## 节点 2 执行记录

- 新增公共运行时 guide，并只注入 `aipd` / `aipd-case`。
- 普通结构性开发与 Case Design 获得条件读取规则；Case phase / template 获得 Design 合同、Execute preflight、Verify audit。
- Work Package 字段从旧空间术语统一为“并列工作项”，同步 Worker 与 Codex / Claude Agent guide。
- `check-dist` 增加投影 owner、消费者范围、两平台同步、三段闭环和旧术语检查。
- L3 / L5 / map 已登记长期 owner 与运行时消费入口。
- build、check-dist、bash syntax、diff whitespace、产物数量 / 内容和范围审计通过；未执行 install。

## 节点 2 执行后 checkpoint

- **完成内容**：`wp-02-skill-code-topology-runtime` 全部目标与验收项完成。
- **验证结果**：Codex / Claude 各 9 个 Skill；运行时投影只存在于两个平台的 `aipd` / `aipd-case`，且与 core 源文件一致；专项与既有检查全部通过。
- **残留风险**：源码与 dist 已验证但尚未安装到用户环境；这是显式外部副作用边界，不影响进入 Case Verify。
- **受影响设计**：无回跳；实际实现符合 Code Topology Contract，没有新增消费者或 owner。
- **下一步**：进入 Verify，复核 Case Contract、两个 Work Package 和设计护栏。
- **恢复入口**：`../case.md` -> `../04-verify/verify.md` -> `work-packages/wp-02-skill-code-topology-runtime.md`。

## 执行前 checkpoint

- **当前问题**：AIPD 长期认知仍把 AI 原生代码架构主要写成“横向分层 vs 纵向黑箱”，没有表达横向基座、横向共享能力和纵向业务上下文的共存关系。
- **设计输入**：`../02-design/design.md` 与 `../01-think/cross-case-code-topology-placement/summary.md`。
- **执行边界**：只修改 Design 列出的 `_adoc` 长期认知文件与本 Case 执行记录；不修改 `docs/`、README、`aipd-skill/src/`、`aipd-skill/dist/` 或外部项目。
- **验收标准**：L3 主事实源唯一；项目 index / map 与 L3 index / map 可一跳命中；代码拓扑与 AIPD 知识系统术语分离；长期认知不再使用“横向铺模块”；链接、格式和改动范围通过检查。
- **禁止事项**：不把三个案例写成固定目录模板；不把未验证规划写成既成实践；不提前设计 Skill 承载方式。
- **恢复入口**：`../case.md` -> `../02-design/design.md` -> `work-packages/wp-01-adoc-code-topology.md`。
- **预期返回**：完成文件清单、验证结果、残留风险，并停在 Skill 节点之前。

## 执行记录

- 已创建 ADOC 工作包和执行前 checkpoint。
- 新增 `_adoc/L3-core/ai-friendly-code-topology.md`，同步 L1、L3、项目 index / map 和 L4 术语。
- 完成路径、检索入口、术语、whitespace 与改动范围校验。

## 执行后 checkpoint

- **完成内容**：节点 1 的 ADOC 主事实源与八份摘要 / 入口同步全部完成。
- **验证结果**：所有工作包验收项通过；没有 Skill / docs 越界改动。
- **残留风险**：Skill 运行时尚未承载这套认知，外部 Agent 仍不会仅凭当前打包产物自动加载它。
- **受影响设计**：节点 1 无需回跳；Case 按原计划回到 Design 处理节点 2。
- **下一步**：讨论并设计 Skill 中的事实投影、触发入口、渐进加载和 token 边界，不在本节点直接复制整份 L3。
- **恢复入口**：`../case.md` -> `../02-design/design.md#节点-2skill-打包产物认知承载`。

# c20 Decision Log

| 时间 | 决策 | 状态 | 依据 | 影响 |
|---|---|---|---|---|
| 2026-07-23 | 将任务扩展为知识库 / 执行 / 代码三类系统术语重构 | withdrawn | 当时的抽象讨论 | 2026-08-09 撤回，不再作为设计输入 |
| 2026-08-09 | 回跳 Think，改为先逐个保存真实项目案例、再跨案例分析 | active | 用户指出原讨论范围过大、间隔后难以恢复，应抽丝剥茧推进 | 重写 Case Contract；Design 重置；案例 01 入库 |
| 2026-08-09 | 代码拓扑采用“横向基座 + 横向共享能力 + 纵向业务上下文 + 显式组合边界” | active | 三个案例的跨案例归纳，并由用户确认推进 | 不再使用“全面纵向”作为总模型；保留 Decouple first, DRY later 作为共享晋升顺序 |
| 2026-08-09 | 代码纵横与 AIPD 知识系统纵横分属两个命名空间 | active | 用户指出两套“纵向”含义不同，现有文档也有不同 owner | 新 L3 主文档承载代码拓扑；vertical-concept-modules / horizontal-capabilities 只承载知识与流程系统 |
| 2026-08-09 | 先更新 AIPD 项目 ADOC，再单独设计 Skill 打包产物 | active | 用户明确把两者拆成连续议题并授权先推进 L3 文档 | 当前节点不修改 `aipd-skill/src`、dist、README 或 docs |
| 2026-08-09 | Skill 采用公共运行时投影，并由 `aipd` / `aipd-case` 双入口条件加载 | active | build 已支持 core -> references 注入；普通开发与 Case Design 是两个真实消费入口；用户确认推荐方案 | 固定两个条件消费入口；不进入 Agent Entry，不新增独立 Skill；当前未改源码 |
| 2026-08-09 | 代码拓扑采用 Design 决策、Execute 短合同、Verify 结果审计的三段执行闭环 | active | 当前 Execute / Verify 已有泛化 Design Guardrails，但 Work Package 没有显式代码拓扑合同；用户确认开发阶段应再次约束，并授权无其他 open 时直接执行 | 写入 Context Boundary、Work Package 模板和三个 phase 规则；Execute 默认不重复加载完整 guide |

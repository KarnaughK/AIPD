# Decision Log：c34

| 时间 | 决策 | 状态 | 依据 |
|---|---|---|---|
| 2026-09-11 | Skill 改名为 `aipd-init`，不保留 `aipd` 目录 | confirmed | 用户第一条 |
| 2026-09-11 | 初始化只分有代码 / 空项目 | confirmed | 用户第二条；自己的老产品和别人的项目同属有代码 |
| 2026-09-11 | 有代码：先扫再补 map 与 Core/Product/Engineering | confirmed | 用户 |
| 2026-09-11 | 空项目：沿用方向 / 痛点 | confirmed | 用户 |
| 2026-09-11 | 不 bump `aipdVersion` | confirmed | 无 Schema 变化 |
| 2026-09-11 | 有代码路径 Agent MD 默认 1 | confirmed | 现行默认推荐；避免先问方向 |
| 2026-09-11 | 代码拓扑从 init Skill 移除，只留 case | confirmed | init 不再做任务加载 |
| 2026-09-11 | 旧目录名 `aipd` 加入 legacy cleanup | confirmed | 安装后不得残留双入口 |
| 2026-09-11 | `/aipd` 只做 description 关键词别名 | confirmed | 不增加第十个 Skill |

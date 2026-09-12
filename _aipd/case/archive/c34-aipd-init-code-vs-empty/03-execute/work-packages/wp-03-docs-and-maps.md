# Work Package: wp-03 - 项目知识与公开文档

> **所属 Case**: c34-aipd-init-code-vs-empty
> **Phase**: Execute
> **类型**: docs
> **推荐 Agent**: Main Agent
> **依赖**: wp-01
> **拓扑敏感**: 否

## 目标

把本仓库 map / Product / Engineering 和用户学习文档改成：第一次调用 `aipd-init`，有代码先扫 3/4/5 和 map。

## 设计依据

- 教学文档按用户任务组织，不按旧总入口对象组织
- Map-first 的产品入口改为 `AGENTS.md`，不再挂在 init Skill

## 并列工作项

- [ ] `_aipd/map.md`、`knowledge/product/index.md`、`product/map.md`、`engineering/index.md`、`core/ai-friendly-code-topology.md` 消费入口
- [ ] `docs/modules/skills-overview.md`、`docs/guide/03`、`docs/guide/06`、`docs/README.md`、根 `README.md`
- [ ] `rg` 扫描现行 `src/skills/aipd/` 与「总入口与初始化」残留（归档 Case 不改）

## 验收标准

- [ ] 现行文档第一次进入项目的命令是 `aipd-init` / `/aipd-init`
- [ ] 归档 Case 正文保持历史原样

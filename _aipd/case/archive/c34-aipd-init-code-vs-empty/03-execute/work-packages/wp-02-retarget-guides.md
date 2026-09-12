# Work Package: wp-02 - 改指向与知识域指南

> **所属 Case**: c34-aipd-init-code-vs-empty
> **Phase**: Execute
> **类型**: docs
> **推荐 Agent**: Main Agent
> **依赖**: wp-01
> **拓扑敏感**: 否

## 目标

让其他 Skill、project-state、知识域指南和工作区模板使用 `aipd-init` 和新分流，不再把初始化写成 Intent-first 流水线。

## 设计依据

- 空项目才走 Intent 指南
- Research / Product 指南按任务命中，不从 Intent 出发
- 模板不把「当前方向」当必填入口

## 不允许固化的假设

- 不改用户已有项目的 Intent 正文
- 不写 V3

## 并列工作项

- [ ] `aipd-update` / `aipd-leader` / `aipd-weave` 指向 `aipd-init`
- [ ] `project-state.md` 初始化入口名
- [ ] Intent / Research / Product 指南
- [ ] workspace templates index / map 措辞
- [ ] aipd-skill README 的 Skill 表

## 验收标准

- [ ] 现行 Skill 源码不再把 `$aipd` 当总入口
- [ ] Intent 指南触发条件不再等于「凡初始化」

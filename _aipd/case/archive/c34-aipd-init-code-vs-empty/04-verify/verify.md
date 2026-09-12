# Verify：c34

## 目标结果

- 公共 Skill 名为 `aipd-init`，dist 含 9 个 Skill，不再含 `aipd` 目录。
- 空项目走 Intent 指南；有代码走 `init-codebase-scan.md`。
- Intent 不是成功门槛；已接入则停止。
- `./aipd-skill/scripts/build` 与 `./aipd-skill/scripts/check-dist` 通过。

## 设计护栏

- 未 bump `aipdVersion`。
- 未自动 install / commit / push。
- 未改 c33。
- 归档 Case 未改写。
- 代码拓扑运行时投影只留在 `aipd-case`。
- `aipd-init` 仍注入 `aipd_context_retriever.md`，只为 Agent Entry 模板静态引用可解析，不恢复 Mode A。

## 工程证据

- build：9 个 public Skill，含 `aipd-init`。
- check-dist：通过（migrator、release bundle、拓扑投影、legacy cleanup 合同）。
- `rg src/skills/aipd[^-]` 在 `aipd-skill/src` 现行源码中无命中。

## 未做（已移交）

- 用户级 / 项目级 install：交给 `c33-agents-on-demand-install`
- git commit / push：不在本 Case
- 在外部已有代码仓库上做一次真实初始化试用：不在本 Case

## 结论

Verify 通过。进入 Close。

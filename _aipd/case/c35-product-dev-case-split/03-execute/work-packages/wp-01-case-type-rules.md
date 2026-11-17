# Work Package: wp-01 - 写入两类 Case 规则

> 所属 Case：c35 / 类型：docs-process / 执行：Main / 拓扑敏感：否

## 目标

按 `02-design/design.md` 的规则落点表写入规则并同步副本。

## 验收标准

- [x] 设计中的验收命令全部符合预期。
- [x] 未触碰历史 Case、release、catalog、update-log、用户未提交的 experience 文件。

## 执行记录

**状态**：completed

- 改动文件：`aipd-case/SKILL.md`；`case/overview.md`（新增「产品 Case 与开发 Case」、标识规则、关键原则 13；同步 weave / update）；`phases/design.md`（Intake 按类型分流，原「Case 类型」改名「改动类型」）；`phases/execute.md`（产品 Case 的 Execute）；`phases/verify.md`（按类型分层验收）；`templates/case.md`、`templates/work-package.md`（同步 update）；`aipd-init/.../templates/index.md`（同步 update）；`docs/modules/case-and-step.md`；`_aipd/case/index.md`。
- 验证：`check-skills` 通过；副本 md5 一致；旧「仅 cN-slug」表述 rg 无结果。
- 偏离设计：无。
- 未解决问题：通用 Case 类型待用户确认。

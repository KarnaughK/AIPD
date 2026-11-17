# Design: c35-product-dev-case-split

## 模式

quick / docs-process。只改 Skill 规则、模板和文档。

## 规则落点

| 规则 | owner |
|---|---|
| 两类 Case 的完整定义（分工表、命名、一对一、独立开发 Case、交接物审核、回路、demo、生效边界、通用 Case） | `case/overview.md` 新增一节，唯一事实源 |
| Case ID 规则、创建 Case 时判类型 | `SKILL.md` 短规则 + 指向 overview |
| Design Intake 按类型分流、开发 Case 需求审核与重 / 轻设计门槛 | `phases/design.md` |
| 产品 Case 的 Execute = 派出并等待开发 Case | `phases/execute.md` |
| 验收分层 | `phases/verify.md` |
| Contract 头部类型 / 关联字段 | `templates/case.md` |
| 工作包至少一条可执行检查 | `templates/work-package.md` |
| 索引命名与一对并列 | `templates/index.md`、本仓 `_aipd/case/index.md` 使用原则 |
| 用户文档 | `docs/modules/case-and-step.md` |

## 副本

- `case/overview.md`：aipd-case / aipd-weave / aipd-update 三份，改 aipd-case 后复制。
- `templates/case.md`、`templates/work-package.md`：aipd-case / aipd-update。
- `templates/index.md`：aipd-init / aipd-update。

## 假设（待用户确认）

- 增加“通用 Case”：不涉及把需求落进项目代码的文档 / 流程 / 调研 / 运营事项，以及规则生效前的旧 Case，用 `cN-slug`、按原有完整流程。理由：旧 Case 不改名需要一个归属；AIPD 仓库自身大量 Case 是文档 / 流程类。

## 验收命令

```bash
./aipd-skill/scripts/check-skills
cd aipd-skill/skills && md5 -r */references/case/overview.md */references/case/templates/*.md
rg -n "Case ID 使用项目内单调递增的 \`cN-slug\`，不是版本号；" aipd-skill docs   # 应无结果
rg -n "cN_dev" aipd-skill/skills docs
```

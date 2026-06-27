# AIPD OKR 索引

## 当前结论

AIPD 里提到 OKR 时，默认就是飞书 OKR。

本文件记录当前 AIPD 项目需要给 Agent 使用的飞书 OKR 入口、周期 ID、目标 ID、协作边界和操作经验。

## 当前远端

| 平台 | 周期 | 状态 | 说明 |
|---|---|---|---|
| 飞书 OKR | 未绑定 | 待设置 | 当前 AIPD 项目尚未绑定飞书 OKR 周期。 |

## 使用规则

- 需要查看或更新 OKR 时，优先使用 `/aipd-okr`，由它读取本入口、按需查询飞书 OKR，并压缩成 OKR 经验包。
- `_adoc/okr/index.md` 保存飞书入口、周期 ID、目标 ID 或协作约定。
- Case / Work Package 只在需要判断方向对齐时引用 OKR；不要把 OKR 当作任务清单。
- 如果用户没有安装 `lark-cli`，提示用户先安装即可，不做复杂环境检测。

## Skill 与飞书 CLI 经验入口

- Skill 入口：`aipd-skill/src/skills/aipd-okr/SKILL.md`
- 飞书 CLI 指引：`aipd-skill/src/core/okr/feishu-cli.md`
- 项目 SOP 记录：`_adoc/sop/feishu-okr-cli/README.md`

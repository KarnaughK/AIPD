# Context Boundary：c34

## 复杂度爆点

把「总入口」拆成「只初始化」时，引用面散落在 Skill、校验脚本、产品线和教学文档。漏改一处会让 Agent 继续走旧 `/aipd` 总入口。

## 解耦

- **运行时合同**：只在 `aipd-init/SKILL.md` + `init-codebase-scan.md`
- **打包路径**：只在 `scripts/build`、`check-dist`、`legacy-skills`
- **知识分类怎么写**：各知识域 `guide.md`，不在 Skill 里复制长文
- **用户怎么调用**：README / docs / Product，不在校验脚本里教用法

## 文件 / 文件夹边界

| 目录 / 文件 | 职责 |
|---|---|
| `src/skills/aipd-init/` | 初始化运行时；含 migrator 打包点 |
| `src/skills/aipd-init/references/init-codebase-scan.md` | 有代码启发式与扫描写入口径 |
| `src/core/knowledge/intent/guide.md` | 仅空项目或用户明确要写方向时 |
| `src/core/knowledge/{research,product}/guide.md` | 去掉「必须从 Intent 出发」 |
| `src/core/workspace/templates/` | 壳子不把 Intent 当必填 |
| `scripts/build` `check-dist` `legacy-skills` | 改名与清理 |
| `_aipd/map.md` `knowledge/product/*` | 本仓库检索与产品线 |
| `docs/` `README.md` | 用户旅程：第一次调用 `aipd-init` |

## 禁止

- 在 `aipd-init` 里再写一份五类 Knowledge 教程
- 新建第十个兼容 Skill `aipd`
- 把扫描百科写进 Engineering 模板正文

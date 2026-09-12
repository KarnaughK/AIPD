# Work Package: wp-01 - 改名为 aipd-init 并重写初始化合同

> **所属 Case**: c34-aipd-init-code-vs-empty
> **Phase**: Execute
> **类型**: dev
> **推荐 Agent**: Main Agent
> **依赖**: `02-design/design.md`
> **拓扑敏感**: 否

## 目标

把 `src/skills/aipd` 换成 `aipd-init`，Skill 只做初始化分流；同步 build、check-dist、legacy cleanup 和 migrator 打包路径。

## 设计依据

- Requirements Contract：`02-design/design.md`
- Brownfield Delta：`02-design/brownfield-delta.md`
- Context Boundary：`02-design/context-boundary.md`
- Readiness Gate：passed
- 复杂度爆点：check-dist 硬编码 `aipd`
- 解耦方式：运行时合同只在新 Skill；打包路径只在 scripts
- 文件边界：`src/skills/aipd-init/`、`scripts/build`、`scripts/check-dist`、`scripts/legacy-skills`、`scripts/migrate-project-schema` 允许残留表

## 不允许固化的假设

- 不在本 WP 安装到用户机
- 不在本 WP 改学习文档全文（wp-03）

## 并列工作项

- [ ] `git mv` 或等价替换 `src/skills/aipd` → `src/skills/aipd-init`
- [ ] 重写 `SKILL.md`：只初始化；有代码 / 空项目分流；已接入则停
- [ ] 新增 `references/init-codebase-scan.md`，删除状态面板式 `scan-agent.md`
- [ ] build 把 migrator 打进 `aipd-init/scripts/`
- [ ] check-dist：EXPECTED_SKILLS、拓扑只要求 aipd-case、manifest/migrator/gate 路径
- [ ] legacy-skills 加入 `aipd`
- [ ] migrate-project-schema 允许残留路径改为 `aipd-init/SKILL.md`

## 上下文文档

- `_aipd/case/c34-aipd-init-code-vs-empty/case.md`
- `_aipd/case/c34-aipd-init-code-vs-empty/02-design/design.md`
- `aipd-skill/src/skills/aipd/SKILL.md`
- `aipd-skill/scripts/build`
- `aipd-skill/scripts/check-dist`
- `aipd-skill/scripts/legacy-skills`

## 执行前 checkpoint

- **当前目标**：源码目录与校验识别 `aipd-init`
- **恢复入口**：本文件
- **执行边界**：scripts + aipd-init Skill；不改 docs 全量
- **预期输出**：新 Skill 与校验通过所需脚本改动
- **停止条件**：完成或发现设计缺口
- **返回位置**：execute.md

## 验收标准

- [ ] 源码不再有 `src/skills/aipd/`
- [ ] `aipd-init/SKILL.md` 不含 Mode A / 缺 Intent 就引导方向
- [ ] check-dist 脚本不再把拓扑投影要求挂在 `aipd` 上

# Brownfield Delta：c34

## 当前实现事实

- `aipd-skill/src/skills/aipd/` 是公共总入口：Schema 识别、Mode A 任务加载、Mode B 状态扫描、初始化后引导 Intent。
- build 把 `migrate-project-schema` 打进 `dist/*/skills/aipd/scripts/`。
- check-dist 把 `aipd` 列入 EXPECTED_SKILLS、代码拓扑投影、schema manifest 合同、runtime gate。
- Intent 指南标题是「初始化时定义项目方向」；Research / Product 指南仍从 Intent 推导。
- Product 功能线把「总入口与初始化」和「Map-first」都挂在 `aipd`。
- 学习文档 `/aipd` 被写成第一次进入项目的命令。

## ADDED

- `aipd-skill/src/skills/aipd-init/`
- `aipd-init/references/init-codebase-scan.md`
- legacy 名单中的 `aipd`

## MODIFIED

- build / check-dist / migrator 允许残留路径 / Update / Leader / Weave / project-state
- Intent / Research / Product 指南的初始化触发与推导顺序
- 工作区 index / map 模板的「方向必填」措辞
- 项目 map、Product、Engineering、README、docs/guide 03 与 06、skills-overview、aipd-skill README

## REMOVED

- `src/skills/aipd/` 目录
- init Skill 内 Mode A、状态面板、Case/OKR/Inbox 路由
- init Skill 对代码拓扑运行时投影的依赖
- 「缺 Intent 就引导方向」作为已接入项目的第一推荐

## 不能破坏

- 路径安全门与 manifest 合同
- 迁移器语义
- 九个公共 Skill 计数
- Agent MD 0/1/2
- Case / Leader / Update 现有职责

# Decision log: c33-agents-on-demand-install

| 时间 | 节点 | 决策 | 来源 | 影响 |
|---|---|---|---|---|
| 2026-09-10 | Think | 按需加载是通用模型，不限于 Leader | 用户 | Leader runtime 与 Case agent-guide 都拆 |
| 2026-09-10 | Think | 「表」= `SKILL.md` 末尾小列表 | 用户 | 不建独立索引文件 |
| 2026-09-10 | Think | 安装后只提示多份冲突，不自动删除 | 用户 | install 无 cleanup |
| 2026-09-10 | Think | 按需文件在当前 Skill 包内小目录，运行时不读源码 | 用户纠正 | 废 `src/core/{stem}-{host}.md` |
| 2026-09-10 | Think | 目录即产物，安装即复制；废按平台 dist | 用户「按你说的」 | 废 overlay 打包；共享文件改 owner + 校验 |
| 2026-09-10 | Design intake | Case 类型 docs/process + refactor；跳过 backend/frontend | Agent 建议，待用户确认本节点 | 下一节点 brownfield |
| 2026-09-10 | Requirements | 不升 V3：改本机 Skill 安装，不改项目 Workspace 形状 | 用户追问后由 Agent 说清并落盘 | catalog 保持 `currentVersion: 2` |
| 2026-09-10 | Requirements | 删除旧 install / install-codex / install-cursor / install-project*；只留 install-agents + install-claude | 用户 | Codex/Cursor 走 `~/.agents` |
| 2026-09-10 | Requirements | 完整包 `aipd-skill/skills/{name}/`；共享原稿 `aipd-skill/shared/` | 用户看不懂「精确路径」后由 Agent 选定 | brownfield 按这两处扫迁 |
| 2026-09-11 | Requirements | `shared/` 只收 `catalog.json` 与 `project-state.md` | 用户确认「只有这两块才合理」 | 不把 src/core 整柜搬进 shared |
| 2026-09-11 | Requirements | 消费 c34：集合是九个公共 Skill，`aipd` 已改名 `aipd-init`；八个带 shared 副本 | 邻对话已归档 c34；源码已无 `src/skills/aipd` | 搬家搬 `aipd-init`，不重做初始化逻辑 |
| 2026-09-11 | Brownfield | 用户确认 requirements，扫完 src/dist/install | 见 `brownfield-delta.md` | 下一节点 context-boundary |
| 2026-09-11 | Context boundary | 用户确认 brownfield，固化目录树 | 九个完整包在 `skills/`；shared 两文件；按需目录贴 SKILL.md 旁；废 src/dist/build | 下一节点 work-package-draft |
| 2026-09-11 | Work package draft | 用户确认文件边界，要求继续 | 四包：搬家 / 按需文件 / 安装 / 校验拆旧 | 确认后 readiness-gate |
| 2026-09-11 | Readiness | 用户确认四包活 | gate = passed；正式 install 另点头；不回退 c34 | 等确认进入 Execute |
| 2026-09-14 | Execute | 用户确认开工 | 进入 Execute；Grok `/goal` 宿主未绑定，不加载覆盖层 | wp-01 |

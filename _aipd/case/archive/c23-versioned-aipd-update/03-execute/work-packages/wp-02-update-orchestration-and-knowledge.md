# Work Package: wp-02-update-orchestration-and-knowledge

## 目标

重写 `aipd-update` 为本机版本驱动的一次语义收敛编排器，并同步用户可见的 Product / Map / docs 描述。

## 上下文

- `../../case.md`
- `../../01-think/think.md`
- `../../02-design/design.md`
- `aipd-skill/src/skills/aipd-update/SKILL.md`
- `_aipd/knowledge/product/index.md`
- `_aipd/knowledge/product/map.md`

## 文件 owner

- `aipd-skill/src/skills/aipd-update/SKILL.md`
- `_aipd/knowledge/product/index.md`
- `_aipd/knowledge/product/map.md`
- `README.md`
- `docs/modules/skills-overview.md`

## 合同

- Skill 先读 P、I 和 `(P,I]` records，再读 currentAuthority 与项目事实；records 不是逐版脚本。
- unversioned-v2 作为 bootstrap 输入；同版本可做 drift repair / no-op；P>I 硬停止。
- legacy `_adoc` 可先调用确定性 Schema migrator，再在同一更新目标下继续语义收敛；迁移器不盖版本。
- additive 与无歧义 semantic 默认执行，不重复请求普通确认；destructive / ambiguous 才暂停。
- 成功验证前不写 `aipdVersion`；最后写 manifest 并追加 `_aipd/update-log.md`。
- 当前结构、模板和知识分类的具体规则从 references 读取，不再在 Skill 复制一整套。
- 不修改运行时公共 references、scripts、AGENTS、项目 manifest / update-log 或 dist。

## 完成标准

- [x] 新 SKILL 的上下文优先级、停止条件、所有权和写入顺序清楚。
- [x] Skill 注入完整 updates/currentAuthority references，静态路径可打包。
- [x] Product、Map、README、Skill overview 不再描述“先审计确认后同步模板”的旧模型。

## 执行记录

- 状态：completed
- 完成时间：2026-08-12
- 改动文件：
  - `aipd-skill/src/skills/aipd-update/SKILL.md`
  - `_aipd/knowledge/product/index.md`
  - `_aipd/knowledge/product/map.md`
  - `README.md`
  - `docs/modules/skills-overview.md`
- 执行结果：
  - Skill 已从“硬编码当前结构 + 统一审计确认”精简为版本驱动编排：读取本机 catalog 与项目 P，完整读取 `(P,I]` records 且不写，再读 current guide / currentAuthority 和项目事实，最后一次语义收敛。
  - 明确 `unversioned-v2` bootstrap、`P=I` no-op / drift repair、`P>I` 硬停止，以及 legacy 先走确定性迁移器但不盖版本的边界。
  - additive / 无歧义 semantic 默认执行；destructive / ambiguous 才暂停。验证在版本提交前完成，项目 update log 与 manifest 形成最后提交边界。
  - Product、Map、README 与 Skill 概览已同步本机版本目标、无远端检查和“不逐版落盘”的用户可见行为。
- 自检：
  - `git diff --check`（五个 owner 文件）：passed。
  - SKILL frontmatter YAML 解析与关键语义断言：passed。
  - catalog 的 `currentGuide`、Release Records、全部 `currentAuthority` 源路径及 `inject-from-core` 覆盖检查：passed。
  - README 内新增迁移文档链接目标：passed。
  - 通用 `skill-creator/quick_validate.py` 不识别 AIPD 构建扩展字段 `inject-from-core`，因此不作为本仓库有效校验；frontmatter 已由 YAML 解析和 AIPD 注入覆盖检查替代。
- 代码拓扑合同：只修改本 Work Package owner；未修改 core references、scripts、AGENTS、项目 manifest / update-log 或 dist。
- 集成待办：由 wp-03 / Main 运行完整 build、check-dist 与版本 fixture。

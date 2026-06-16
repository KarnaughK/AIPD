# Step 6: Rename Legacy AIPD2 To AIPD

## 目标

将当前项目、文档和 skill 命名从旧 `AIPD2` / `aipd2` 收敛回 `AIPD` / `aipd`。

## 上下文

- `../case.md`
- `README.md`
- `_adoc/index.md`
- `_adoc/map.md`
- `_adoc/L3-core/`
- `_adoc/L4-product/`
- `_adoc/L5-dev/`
- `aipd-skill/src/skills/`
- `aipd-skill/scripts/`
- `docs/`

## 要做

- 审计旧 `AIPD2`、`aipd2`、`/aipd2`、`aipd2-*` 的使用范围。
- 判断哪些是用户可见命名，哪些是历史语义或兼容别名。
- 重命名 skill 目录、命令、文档和索引中的主要命名。
- 更新构建 / 安装脚本对 skill 名的处理。
- 运行 `./aipd-skill/scripts/build` 验证。

## 不做

- 不创建 AIPD Desktop。
- 不改 AIPD 的核心机制。
- 不删除历史 archive 中的旧命名，除非它影响当前入口。

## 验收

- 当前对外主命名为 `AIPD` / `aipd`。
- 构建产物使用新命名。
- 必要的旧命令兼容策略有明确说明。
- `./aipd-skill/scripts/build` 通过。

## 执行记录

- 已将 `aipd-skill/src/skills/aipd2*` 目录重命名为 `aipd*`。
- 已将 skill frontmatter、README、docs、_adoc、核心模板和平台指引中的主命名统一为 `AIPD` / `aipd`。
- 安装脚本已加入旧 `aipd2*` skill 清理列表；重新安装会移除旧入口，后续主入口为 `/aipd*`。
- 已运行 `./aipd-skill/scripts/build`，Claude / Codex 均生成 10 个 `aipd*` skill，Codex agent 模板生成成功。

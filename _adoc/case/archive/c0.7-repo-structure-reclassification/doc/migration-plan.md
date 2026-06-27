# Migration Plan: Repository Reclassification

> 本文记录 c0.7 的执行顺序。正式执行时以 step 文件为入口。

## 1. 总原则

- 先审计，后移动。
- 先移动 Skill 本体，再处理历史材料。
- 先保证原有 Skill 构建 / 安装链路可用，再进入 Desktop 创建。
- 不在本 case 中创建 `aipd-desktop/` 项目。

## 2. 执行顺序

### Step 1: 审计当前结构

检查：

- 当前根目录所有一级目录职责。
- `src/`、`scripts/`、`modules/`、`dist/` 是否都属于 Skill 本体。
- `v1/` 是否仍有参考价值。
- `v2-todo/` 是否应进入 inbox、case 或 archive。
- README、docs、_adoc 中的路径引用。

建议命令：

```bash
find . -maxdepth 2 -type d | sort
rg -n "src/|scripts/|dist/|modules/|v1/|v2-todo" README.md docs _adoc AGENTS.md
```

### Step 2: 迁移 Skill 本体

目标：

```text
aipd-skill/src/
aipd-skill/scripts/
aipd-skill/modules/
aipd-skill/dist/
```

迁移后立即检查脚本里的相对路径。

### Step 3: 处理历史材料

`v1/` 候选：

- 如果仍有方法论或迁移参考价值，移动到 `docs/legacy/v1/`。
- 如果只是过期实现材料，可归档并在 case 执行记录说明。

`v2-todo/` 候选：

- 稳定事项进入 `_adoc/inbox.md` 或新 case。
- 历史完成事项进入 archive。
- 不直接删除。

### Step 4: 更新引用并验证

必须同步：

- `README.md`
- `docs/modules/build-and-install.md`
- `_adoc/map.md`
- `_adoc/L5-dev/index.md` 或相关构建安装文档
- `c0.8-aipd-desktop-zero`
- shell scripts 中的相对路径

验证：

- 构建命令仍可运行。
- 安装命令路径不失效。
- README 的项目结构准确。
- `rg "src/|scripts/|dist/"` 不再出现过期路径，或出现时有明确语义。

## 3. 关键风险

- shell script 可能依赖当前工作目录。
- docs 中的路径示例可能很多，必须用 `rg` 全量扫。
- `dist/` 可能被脚本假设在根目录，需要修正。
- `_adoc/map.md` 如果不更新，后续 Agent 会继续路由到旧路径。

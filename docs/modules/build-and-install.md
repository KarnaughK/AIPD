# 构建与安装

AIPD 仓库本身不是打开即用的应用，而是一个 skill 源码项目。

九个公共 Skill 位于 `aipd-skill/`：源码在 `aipd-skill/src/`，构建产物在 `aipd-skill/dist/`，安装脚本在 `aipd-skill/scripts/`。仅供 AIPD 自身迭代的 `aipd-learn` 位于 `.agents/skills/aipd-learn/`，不参与公共构建和安装。

## 两类 Skill 的构建合同

| 类型 | 源码与运行位置 | 构建 / 安装 |
|---|---|---|
| 全局 / 公共 Skill | `aipd-skill/src/skills/`，并组合 `src/core/` 与 `src/platforms/{platform}/` | 经过 build 生成 `dist/{platform}/`，再安装到用户级或目标项目；支持多 Skill 目录与多平台装配 |
| 项目 / 仓库级 Skill | `.agents/skills/{skill}/` | 目录本身就是源码和运行体；Codex 在仓库内直接加载，不 build、不生成 dist、不 install |

仓库级 Skill 通过 Git 随项目维护，有需要时直接修改，没有变化时无需同步。它执行后如果修改了公共 Skill 或 core/platform 源码，目标文件仍需走公共 build 和经用户确认的 install；如果只修改 `_aipd/`、README 或仓库级 Skill 本身，则不需要 Skill 打包。

## 推荐使用方式

普通用户不需要手工背命令。

建议用 Codex 打开本项目，然后说明目标：

```text
请阅读本仓库的项目说明和 AIPD 认知，把 AIPD 打包并安装到我本机可用的 Skill 目录。
```

Agent 应先读取：

```text
AGENTS.md
-> _aipd/index.md
-> _aipd/map.md
```

然后再根据任务进入 `aipd-skill/scripts/`、`aipd-skill/src/skills/`、`aipd-skill/src/platforms/` 等入口。

只有在 AIPD 源码仓库内进行框架自迭代时，才进入 `.agents/skills/aipd-learn/`。业务项目不会安装这个仓库级 Skill。

## 脚本入口

旧 README 中的命令迁移到这里，作为开发者和 Agent 的细节参考。

```bash
# 修改源码后重新构建
./aipd-skill/scripts/build

# 构建后只读校验 Codex 产物完整性
./aipd-skill/scripts/check-dist

# 显式构建 Codex 产物
./aipd-skill/scripts/build codex

# Codex 开发模式安装（symlink）
./aipd-skill/scripts/dev

# Codex 用户级安装
./aipd-skill/scripts/install

# Cursor 用户级安装（只写 ~/.cursor/skills/）
./aipd-skill/scripts/install-cursor

# Codex 项目级安装
./aipd-skill/scripts/install-project /path/to/your-project
```

当前默认只构建并验证 Codex 产物。项目目前没有 Claude Code 的实际使用与测试条件，无法确认对应产物是否可用，因此不再默认打包；`src/core/` 与 `src/platforms/{platform}/` 组成的通用多目标构建结构仍保留。

`dev-codex`、`install-codex` 和 `install-project-codex` 保留为对应泛名入口的显式 Codex 别名。

dev 模式下，重新 build 后通常会自动生效；install 模式下，修改源码并 build 后通常需要重新 install。

Agent 修改 AIPD 源码后，可以直接运行 `./aipd-skill/scripts/build` 做低风险打包验证，但不要默认继续执行 install。install 会改写用户级或项目级 Agent 运行环境，build 完成后必须主动问用户是否执行 install；只有用户明确确认后，才运行对应安装脚本。

`check-dist` 不修改安装环境，也不替代 build。它验证 Codex 产物中的九个公共 Skill、三个 custom Agent、仓库级 `aipd-learn` 与公共 dist 的隔离、源码 / 产物同步、静态 references、Leader 显式调用合同，以及安装脚本的历史残留清理接入。

## 旧项目一次性迁移

Knowledge Schema v2 不提供运行时双读。仍使用 `_adoc/` 与 L1-L5 目录的项目，需要先用一次性迁移器原子切换；迁移和 dry-run 要求目标 Git 工作树干净。AIPD Workspace、带 AIPD 标记的根 Agent Entry 和项目级 AIPD Agent 配置必须纳入 Git，不能被 ignore。

在 AIPD 源码仓库中执行：

```bash
./aipd-skill/scripts/migrate-project-schema --dry-run /absolute/project/path
./aipd-skill/scripts/migrate-project-schema /absolute/project/path
./aipd-skill/scripts/migrate-project-schema --check /absolute/project/path
```

构建时同一脚本也会打包进 `aipd` Skill 的 `scripts/migrate-project-schema`，因此用户级或项目级安装后，Agent 可以相对当前 Skill 目录定位它，不依赖 AIPD 源码 checkout。迁移器会整块升级带标记的 `AGENTS.md` AIPD 区块，并重命名项目级上下文检索 Agent 配置；常见旧分类组合会自动改写，无法可靠判定的裸编号语义会在 dry-run 阶段硬拒绝并给出文件位置，留给人工重新归类。它还会拒绝新旧双根、半迁移结构、非法额外目录、ignored AIPD 文件、Workspace symlink、目标碰撞和错误 manifest。`--check` 只读、允许检查尚未暂存的 v2 工作树，并以 Git `HEAD` 与 index 的并集发现迁移文件丢失。

迁移只产生 `unversioned-v2`，不代表已经应用本机发布。迁移完成后还要由 `aipd-update` 完成版本语义收敛、验证和最终版本提交。完整分工见 [Update 与 Schema 迁移](update-and-migration.md)。

## 仓库结构

```text
AIPD-2/
├── .agents/skills/    # AIPD 仓库级 Skill；直接加载，不进入公共构建
├── _aipd/             # AIPD 仓库自身的项目认知
├── experience-assets/ # 实践经验附带源码；不进入 Skill 构建产物
├── aipd-skill/        # AIPD Skill 本体源码、脚本和构建产物
│   ├── src/
│   ├── scripts/
│   └── dist/
└── docs/              # 面向人的学习文档
```

## 项目 Map 入口

当前项目正式入口是 `_aipd/map.md`。构建、安装、Codex 适配和 Skill 相关任务都应先从这里路由。

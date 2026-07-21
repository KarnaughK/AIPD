# 构建与安装

AIPD 仓库本身不是打开即用的应用，而是一个 skill 源码项目。

Skill 本体位于 `aipd-skill/`：源码在 `aipd-skill/src/`，构建产物在 `aipd-skill/dist/`，安装脚本在 `aipd-skill/scripts/`。

## 推荐使用方式

普通用户不需要手工背命令。

建议用 Codex、Claude Code 或其他支持 Skill 的 Agent 打开本项目，然后说明目标：

```text
请阅读本仓库的项目说明和 AIPD 认知，把 AIPD 打包并安装到我本机可用的 Skill 目录。
```

Agent 应先读取：

```text
AGENTS.md
-> _adoc/index.md
-> _adoc/map.md
```

然后再根据任务进入 `aipd-skill/scripts/`、`aipd-skill/src/skills/`、`aipd-skill/src/platforms/` 等入口。

## 脚本入口

旧 README 中的命令迁移到这里，作为开发者和 Agent 的细节参考。

```bash
# 修改源码后重新构建
./aipd-skill/scripts/build

# 构建后只读校验 Skill 集合、引用与平台产物一致性
./aipd-skill/scripts/check-dist

# 只构建某个平台
./aipd-skill/scripts/build claude
./aipd-skill/scripts/build codex

# Claude Code 开发模式安装（symlink）
./aipd-skill/scripts/dev

# Claude Code 用户级安装
./aipd-skill/scripts/install

# Claude Code 项目级安装
./aipd-skill/scripts/install-project /path/to/your-project

# Codex 开发模式安装（symlink）
./aipd-skill/scripts/dev-codex

# Codex 用户级安装
./aipd-skill/scripts/install-codex

# Codex 项目级安装
./aipd-skill/scripts/install-project-codex /path/to/your-project
```

dev 模式下，重新 build 后通常会自动生效；install 模式下，修改源码并 build 后通常需要重新 install。

Agent 修改 AIPD 源码后，可以直接运行 `./aipd-skill/scripts/build` 做低风险打包验证，但不要默认继续执行 install。install 会改写用户级或项目级 Agent 运行环境，build 完成后必须主动问用户是否执行 install；只有用户明确确认后，才运行对应安装脚本。

`check-dist` 不修改安装环境，也不替代 build。它验证九个 Skill、源码 / 产物同步、静态 references、Codex / Claude 的已声明差异，以及安装脚本的历史残留清理接入。

## 仓库结构

```text
AIPD-2/
├── _adoc/             # AIPD 仓库自身的项目认知
├── experience-assets/ # 实践经验附带源码；不进入 Skill 构建产物
├── aipd-skill/        # AIPD Skill 本体源码、脚本和构建产物
│   ├── src/
│   ├── scripts/
│   ├── modules/
│   └── dist/
├── docs/              # 面向人的学习文档
└── aipd-desktop/      # 规划中的 AIPD Desktop，不是基础运行前提
```

## README 入口修正

旧 README 和 README 草稿中曾出现 `_adoc/context-map.md`。

当前项目正式入口是 `_adoc/map.md`。构建、安装、Codex 适配和 Skill 相关任务都应先从 `_adoc/map.md` 路由。

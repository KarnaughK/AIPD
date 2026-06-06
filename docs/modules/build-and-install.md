# 构建与安装

AIPD2 仓库本身不是打开即用的应用，而是一个 skill 源码项目。

源码在 `src/`，构建产物在 `dist/`，安装脚本在 `scripts/`。

## 推荐使用方式

普通用户不需要手工背命令。

建议用 Codex、Claude Code 或其他支持 Skill 的 Agent 打开本项目，然后说明目标：

```text
请阅读本仓库的项目说明和 AIPD 认知，把 AIPD2 打包并安装到我本机可用的 Skill 目录。
```

Agent 应先读取：

```text
AGENTS.md
-> _adoc/index.md
-> _adoc/map.md
```

然后再根据任务进入 `scripts/`、`src/skills/`、`src/platforms/` 等入口。

## 脚本入口

旧 README 中的命令迁移到这里，作为开发者和 Agent 的细节参考。

```bash
# 修改源码后重新构建
./scripts/build

# 只构建某个平台
./scripts/build claude
./scripts/build codex

# Claude Code 开发模式安装（symlink）
./scripts/dev

# Claude Code 用户级安装
./scripts/install

# Claude Code 项目级安装
./scripts/install-project /path/to/your-project

# Codex 开发模式安装（symlink）
./scripts/dev-codex

# Codex 用户级安装
./scripts/install-codex

# Codex 项目级安装
./scripts/install-project-codex /path/to/your-project
```

dev 模式下，重新 build 后通常会自动生效；install 模式下，修改源码并 build 后通常需要重新 install。

## 仓库结构

```text
AIPD-2/
├── docs/             # 面向人的学习文档
├── src/
│   ├── core/          # AIPD 核心认知、模板和通用规则
│   ├── platforms/     # Codex / Claude Code 等平台适配
│   └── skills/        # 各个 skill 的源码
├── scripts/           # 构建、开发安装、用户安装和项目安装脚本
├── dist/              # 构建产物
├── _adoc/             # AIPD2 仓库自身的项目认知
└── v1/                # v1 历史归档
```

## README 入口修正

旧 README 和 README 草稿中曾出现 `_adoc/context-map.md`。

当前项目正式入口是 `_adoc/map.md`。构建、安装、Codex 适配和 Skill 相关任务都应先从 `_adoc/map.md` 路由。

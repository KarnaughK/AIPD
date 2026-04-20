# 第 12 步：更新 README.md

## 任务

更新项目 README，反映新的 src/core + src/skills 结构。

## 内容要求

README 应包含以下部分：

### 1. 项目简介
保留现有的一句话描述，补充"这是一个可构建的 skill 工程"。

### 2. 项目结构
展示 src/core + src/skills + scripts + dist 的目录树，每个目录一句话说明。

### 3. 包含的 skill

| skill | 命令 | 职责 |
|---|---|---|
| aipd | `/aipd` | 总入口：扫描状态，引导下一步 |
| aipd-init | `/aipd-init` | 初始化：创建 _adoc/，定义方向 |
| aipd-plan-create | `/aipd-plan-create` | 创建迭代计划 |
| aipd-plan-run | `/aipd-plan-run` | 执行计划，派发子 Agent |
| aipd-plan-archive | `/aipd-plan-archive` | 归档计划，合并分支 |

### 4. 安装方式

```bash
# 开发模式（symlink，改完 build 即生效）
git clone ... && cd AIPD
./scripts/dev

# 用户级安装（复制到 ~/.claude/skills/）
./scripts/install

# 项目级安装（复制到项目 .claude/skills/）
./scripts/install-project /path/to/your-project
```

### 5. 开发方式

```bash
# 修改源码后重新构建
./scripts/build

# 如果用 dev 模式安装，build 后自动生效
# 如果用 install 模式，需要重新 install
```

### 6. 核心架构简介
保留现有的五层认知结构和多 Agent 说明，但精简为概述级别。

## 验收

- README 结构清晰，新用户能看懂怎么安装和使用
- 不包含旧的 `references/` 目录结构
- 安装命令可直接复制执行

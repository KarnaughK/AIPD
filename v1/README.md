# AIPD - 面向软件开发的 AI Harness 框架

**把软件项目的经验和决策结构化沉淀，让 AI 基于项目认知持续、准确地参与开发。**

---

## 它解决什么问题

AIPD 解决两个核心问题：

### 1. AI 的知识库问题
**痛点**：AI 不知道项目背景、技术规范、业务逻辑，每次都要重新解释。

**方案**：五层认知结构（L1-L5），从抽象到具象组织项目知识，AI 按需加载。

### 2. 人与 AI 的协作问题
**痛点**：复杂任务 AI 容易跑偏，你要盯着它，随时纠正。

**方案**：Plan + 多 Agent 执行体系，任务精确拆分，AI 自主执行。

---

## 核心架构

### 一、五层认知结构（知识库）

从抽象到具象组织项目知识，AI 在不同阶段快速找到需要的内容。

```
L1 Intent（方向）
    ↓ 为什么做这个项目？做给谁？
L2 Scenario（场景）
    ↓ 用户有什么痛点？具体场景是什么？
L3 Engine（引擎）
    ↓ 核心数据模型是什么？对象关系如何？
L4 Product（产品）
    ↓ 功能模块如何划分？每个模块做什么？
L5 Tech（技术）
    ↓ 用什么技术栈？工程规范是什么？
```

**每一层解决的问题**：

- **L1 Intent**：AI 理解项目方向，不会做偏离目标的事
- **L2 Scenario**：AI 知道用户痛点，设计方案时有的放矢
- **L3 Engine**：AI 理解核心数据模型，不会破坏架构
- **L4 Product**：AI 知道功能边界，不会越界实现
- **L5 Tech**：AI 遵守技术规范，代码风格一致

**关键特性**：
- 每一层都可以独立工作，也可以向下细化
- AI 按需加载，不会一次性读取所有文档
- 文档即认知，更新文档 = 更新 AI 的认知

### 二、多 Agent 执行体系（协作机制）

Plan + 多 Agent，解决"人和 AI 交互做事"的问题。

#### Plan 执行流程

```
1. 创建 Plan（在 main 分支）
   - 定义目标、拆分任务、明确约束
   - 拆分为多个 Step（最小执行单元）

2. 提交 Plan 到 main（锁定版本号）
   - 保证版本号全局唯一
   - 多个 Plan 并行时不冲突

3. 创建开发分支
   - 隔离开发，不污染 main
   - 可随时回滚

4. 派发 Step 给子 Agent 执行
   - 主 Agent 调度，子 Agent 执行
   - 主 Agent 上下文保持干净

5. 所有 Step 完成 → 用户验收
   - 可随时增加修复 step
   - 验收通过才进入下一步

6. 归档（自动更新文档）
   - git diff 识别改动
   - 更新相关 _adoc/ 文档

7. 合并分支到 main
   - 完整的 Git 工作流
```

#### 多 Agent 协作

```
主 Agent（项目经理）
    ↓ 派发任务
    ├─→ 开发执行者（写代码、自测、修复）
    ├─→ 调研执行者（搜索、分析、输出报告）
    └─→ 归档执行者（更新文档、归档计划）
```

**核心价值**：
- 主 Agent 上下文保持干净，随时响应用户
- 子 Agent 独立执行，细节不污染主 Agent
- 任务精确拆分，AI 知道"做到什么程度算完成"

#### OKR（目标管理）

中短期目标与复盘。Plan 可以挂在 OKR 下，也可以独立存在。

---

## 文档体系

### 项目文档结构（_adoc/）

```
_adoc/
├── intent.md          # L1：项目方向（唯一）
├── index.md           # 大索引（入口文件）
├── business/          # L4：业务模块（Spec + SOP）
│   ├── 模块A/
│   │   ├── index.md
│   │   └── sop-xxx.md
│   └── 模块B/
│       └── index.md
├── dev/               # L5：技术项目
│   ├── index.md       # 技术索引 + 环境说明
│   ├── 项目A/
│   │   └── index.md
│   └── 项目B/
│       └── index.md
└── plan/              # 迭代计划
    ├── v0.1-xxx/      # 进行中
    │   ├── plan.md
    │   ├── v0.1.1-xxx.md
    │   └── v0.1.2-xxx.md
    └── archive/       # 已归档
        └── v0.1-xxx/
```

### AIPD Skill 结构

```
AIPD/
├── SKILL.md           # Skill 主文件（AI 读取的指令）
├── references/        # 指引文档
│   ├── init/          # 初始化指引
│   ├── L1-intent/     # 方向层指引
│   ├── L2-scenario/   # 场景层指引
│   ├── L3-engine/     # 引擎层指引
│   ├── L4-product-arch/  # 产品层指引
│   ├── L5-tech-arch/  # 技术层指引
│   ├── planning/      # Plan 执行体系
│   │   ├── index.md   # 主 Agent 完整指引
│   │   ├── worker-dev.md       # 开发执行者
│   │   ├── worker-research.md  # 调研执行者
│   │   ├── worker-archive.md   # 归档执行者
│   │   └── templates/ # 模板文件
│   └── okr/           # OKR 目标管理
└── templates/         # 文档模板（给用户参考）
```

---

## 安装使用

将本项目所有内容放到你的 skills 目录下的 `AIPD/` 文件夹即可（目录名需保持为 `AIPD`）。

**常见 skills 路径：**

```bash
# Claude Code 全局 skills
~/.claude/skills/AIPD/

# 项目级 Claude skills
your-project/.claude/skills/AIPD/

# 项目级 Agent skills（部分工具使用）
your-project/.agent/skills/AIPD/
```

**安装方式：**

```bash
# 方式一：Git Clone（推荐，方便更新）
git clone https://github.com/你的用户名/AIPD.git ~/.claude/skills/AIPD

# 方式二：直接下载
# 下载后解压到上述任一路径
```

**使用：** 在任意项目中输入 `/aipd`，AI 会自动检测项目状态并引导你。

---

## 工作流程示例

### 1. 初始化项目

```
用户：/aipd
AI：检测到项目未初始化，是否创建 intent.md？
用户：是
AI：引导用户定义项目方向...
```

### 2. 创建 Plan

```
用户：我想做一个搜索功能
AI：扫描项目状态 → 创建 v0.2-search Plan → 拆分 4 个 step
AI：Plan 已提交到 main，创建分支 v0.2-search
```

### 3. 执行 Plan

```
AI：派发 v0.2.1 给开发执行者...
子 Agent：开发 → 自测 → 完成
AI：v0.2.1 完成，派发 v0.2.2...
（所有 step 完成）
```

### 4. 用户验收

```
AI：所有步骤已完成，请验收 http://localhost:3000
用户：分页有问题，每页应该显示 10 条
AI：创建修复 step v0.2.5 → 派发执行 → 完成
AI：请重新验收
用户：通过
```

### 5. 归档和合并

```
AI：派发归档任务给归档执行者...
归档执行者：更新文档 → 移动 Plan 到 archive/ → 完成
AI：是否合并分支到 main？
用户：是
AI：已合并，可以开始下一个 Plan
```

---

## 适用场景

- 启动新项目，需要梳理方向
- 功能越来越多，需要结构化管理
- 团队协作，需要统一的文档规范
- 中断后继续开发，需要快速恢复上下文
- 多人协作，需要知识沉淀和传承

---

## 开发状态

### 已完善
- ✅ L1 Intent（方向层）
- ✅ L4 Product Arch（产品层）
- ✅ Planning 体系（完整生命周期）
- ✅ 多 Agent 架构

### 待完善
- 🚧 L2 Scenario（场景层）
- 🚧 L3 Engine（引擎层）
- 🚧 L5 Tech Arch（技术层）
- 🚧 OKR（目标管理）

---

## License

MIT

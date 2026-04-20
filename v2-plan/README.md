# AIPD v2.0 重构计划

## 背景

AIPD 已从"一个 skill"演变为"一套 AI harness 框架"，但代码结构仍是单体 skill 形态。
当前 `/aipd` 一次加载所有内容（五层认知 + Plan 全生命周期 + OKR + 多 Agent），导致：
- 入口过宽，模型容易跑偏
- 上下文预热成本高
- 用户说"归档 plan"时不确定模型是否命中正确段落

## 目标

将项目改造为 `src/core/`（知识）+ `src/skills/`（动作）的双层结构，
build 后产出 5 个自包含 skill，每个 skill 只加载自己需要的上下文。

## 核心设计

### 两层源码

- `src/core/` — 知识层，AIPD 框架的全部知识（L1-L5、Plan/OKR 说明、模板、案例、多 Agent 机制），不含任何动作流程
- `src/skills/` — 动作层，每个 skill 在源码里就能看到完整结构，worker 直接塞进对应 skill

### 构建机制

每个 skill 的 SKILL.md 头部用 `inject-from-core` 声明需要哪些 core 文件。
build 脚本读取声明，从 `src/core/` 拷贝到 skill 的 `references/` 目录，产出自包含的 dist。

### 5 个 skill

| skill 名 | 职责 | 从 core 注入 |
|---|---|---|
| `aipd` | 总入口：扫描项目状态 → 展示面板 → 引导调用具体 skill | overview.md, adoc-structure.md |
| `aipd-init` | 初始化：创建 _adoc/ 目录、引导写 intent.md | adoc-structure.md, L1-intent/* |
| `aipd-plan-create` | Plan 创建：扫描 → 定版本号 → 拆 Step → 生成文件 → 提交 → 建分支 | plan/overview.md, plan/templates/*, adoc-structure.md |
| `aipd-plan-run` | Plan 执行：读 plan → 派发 Step → 收结果 → 验收 | agent-team-guide.md, plan/overview.md |
| `aipd-plan-archive` | Plan 归档：git diff → 更新文档 → 移到 archive/ → 合并分支 | adoc-structure.md |

## 执行步骤概览

共 12 步，每步有独立的详细执行文档：

| 步骤 | 文件 | 内容 |
|---|---|---|
| 1 | `step-01-directories.md` | 创建目录结构 |
| 2 | `step-02-migrate-core.md` | 迁移文件到 src/core/ |
| 3 | `step-03-core-overview.md` | 新建 core/overview.md |
| 4 | `step-04-core-plan-overview.md` | 新建 core/plan/overview.md |
| 5 | `step-05-migrate-workers.md` | 迁移 Worker 到对应 skill |
| 6 | `step-06-migrate-init.md` | 迁移 init 扫描逻辑 |
| 7 | `step-07-write-skills.md` | 编写 5 个 skill 的 SKILL.md（最重的一步） |
| 8 | `step-08-build-script.md` | 创建 scripts/build |
| 9 | `step-09-install-scripts.md` | 创建 dev/install/install-project 脚本 |
| 10 | `step-10-gitignore.md` | 更新 .gitignore |
| 11 | `step-11-cleanup.md` | 清理旧文件 |
| 12 | `step-12-readme.md` | 更新 README.md |

## 重构后目录结构

```
AIPD/
├── src/
│   ├── core/                          # 知识层
│   │   ├── overview.md                # 框架总览
│   │   ├── adoc-structure.md          # _adoc/ 目录规范
│   │   ├── agent-team-guide.md        # 多 Agent 协作机制
│   │   ├── L1-intent/                 # 方向层（guide + 模板 + 案例）
│   │   ├── L2-scenario/              # 场景需求层
│   │   ├── L3-engine/                # 核心引擎层
│   │   ├── L4-product-arch/          # 产品架构层
│   │   ├── L5-tech-arch/             # 技术架构层（guide + 模板 + 案例）
│   │   ├── plan/                     # Plan 机制说明 + 模板
│   │   │   ├── overview.md
│   │   │   └── templates/
│   │   └── okr/                      # OKR 机制说明
│   │
│   └── skills/                        # 动作层
│       ├── aipd/                      # 总入口
│       ├── aipd-init/                 # 初始化
│       ├── aipd-plan-create/          # Plan 创建
│       ├── aipd-plan-run/             # Plan 执行（含 worker-dev, worker-research）
│       └── aipd-plan-archive/         # Plan 归档（含 worker-archive）
│
├── scripts/                           # 构建与发布
│   ├── build
│   ├── dev
│   ├── install
│   └── install-project
│
├── dist/                              # 构建产物（gitignore）
│   └── skills/
│       ├── aipd/
│       ├── aipd-init/
│       ├── aipd-plan-create/
│       ├── aipd-plan-run/
│       └── aipd-plan-archive/
│
└── v2-plan/                           # 本计划文档（重构完成后可删除）
```

## 文件映射表（旧 → 新）

| 现有文件 | 新位置 | 说明 |
|---|---|---|
| `SKILL.md` | 拆散到 `src/skills/*/SKILL.md` | 分流逻辑拆到各 skill |
| `skill-old.md` | 删除 | 历史文件 |
| `references/map-adoc-structure.md` | `src/core/adoc-structure.md` | 进 core |
| `references/map-skill-structure.md` | 删除 | 被 README 替代 |
| `references/agent-team-guide.md` | `src/core/agent-team-guide.md` | 进 core |
| `references/L1-intent/main-agent.md` | `src/core/L1-intent/guide.md` | 进 core，改名 |
| `references/L1-intent/intent-guide.md` | `src/core/L1-intent/intent-writing.md` | 进 core，改名 |
| `references/L1-intent/template.md` | `src/core/L1-intent/template.md` | 进 core |
| `references/L1-intent/example.md` | `src/core/L1-intent/example.md` | 进 core |
| `references/L2-scenario/index.md` | `src/core/L2-scenario/guide.md` | 进 core，改名 |
| `references/L3-engine/index.md` | `src/core/L3-engine/guide.md` | 进 core，改名 |
| `references/L4-product-arch/index.md` | `src/core/L4-product-arch/guide.md` | 进 core，改名 |
| `references/L5-tech-arch/index.md` | `src/core/L5-tech-arch/guide.md` | 进 core，改名 |
| `references/L5-tech-arch/template.md` | `src/core/L5-tech-arch/template.md` | 进 core |
| `references/L5-tech-arch/example.md` | `src/core/L5-tech-arch/example.md` | 进 core |
| `references/planning/index.md` | 拆为三份 | 创建→create skill，执行→run skill，归档→archive skill |
| `references/planning/templates/plan.md` | `src/core/plan/templates/plan.md` | 模板进 core |
| `references/planning/templates/step.md` | `src/core/plan/templates/step.md` | 模板进 core |
| `references/planning/worker-dev.md` | `src/skills/aipd-plan-run/references/worker-dev.md` | 塞进 run skill |
| `references/planning/worker-research.md` | `src/skills/aipd-plan-run/references/worker-research.md` | 塞进 run skill |
| `references/planning/worker-archive.md` | `src/skills/aipd-plan-archive/references/worker-archive.md` | 塞进 archive skill |
| `references/okr/index.md` | `src/core/okr/guide.md` | 进 core，改名 |
| `references/init/main-agent.md` | 融入 `src/skills/aipd/references/scan-agent.md` | 扫描逻辑跟着总入口 |
| `references/init/sub-agent.md` | `src/skills/aipd-init/references/scan-agent.md` | 跟着 init skill |

## 验证方式

1. 运行 `scripts/build`，确认 `dist/skills/` 下生成 5 个自包含 skill 目录
2. 运行 `scripts/dev`，确认 `~/.claude/skills/` 下出现 5 个 symlink
3. 在 Claude Code 中输入 `/aipd`、`/aipd-plan-create` 等，确认 skill 被识别
4. 检查每个 dist skill 的 `references/` 目录，确认 core 文件已正确注入

# Plan 执行体系

Plan 是 AIPD 的任务执行载体。可以是开发、调研、设计——不限于写代码。

## 三级版本号（A.B.C）

| 级别 | 含义 | 谁定 | 示例 |
|------|------|------|------|
| **A** | 大版本 / 里程碑 | 用户决定 | v1.0 |
| **B** | 功能版本（一次迭代） | 主 Agent + 用户 | v0.2-search |
| **C** | 迭代步骤（最小执行单元） | 主 Agent 拆分 | v0.2.1-basic-table |

- B 级 = 一个 Plan，对应一个目录
- C 级 = Plan 内的步骤，对应目录内的文件，由子 Agent 独立执行

## Plan 类型

| 类型 | 用途 | 子 Agent 角色 |
|------|------|--------------|
| **dev**（默认） | 开发功能 | 写代码、调试、自检 |
| **research** | 调研分析 | 搜索、读文档、输出结论 |
| **review** | 代码/方案审查 | 读代码、分析问题、输出报告 |

## 目录结构

```
_adoc/plan/
├── v0.1-功能名/              # B 级：进行中
│   ├── plan.md               # Plan 主文档
│   ├── v0.1.1-步骤名.md      # C 级步骤
│   ├── v0.1.2-步骤名.md
│   └── ...
├── v0.2-另一个功能/
│   └── ...
└── archive/                  # 已归档（完成的 Plan 整个目录移入）
    └── v0.1-功能名/
```

- `plan/` 根目录下的文件夹 = 进行中
- `plan/archive/` 下的文件夹 = 已完成
- 步骤文件与 plan.md 同目录（不再有 steps/ 子目录）

## 生命周期

```
创建 B 级 Plan → 拆分 C 级步骤 → 子 Agent 逐步执行 → 全部完成 → 归档到 archive/
```

## C 级步骤拆分规则

每个步骤必须满足：
- **独立可执行**：子 Agent 不需要跟用户确认就能完成
- **输入明确**：列出所有需要读的上下文文档（绝对路径）
- **输出明确**：有 2-5 条验收标准
- **边界清晰**：标注"不做"的部分，防止子 Agent 越界
- **有序依赖**：标注哪个步骤必须先完成

## 核心原则

- 一个 Plan 对应 1-2 周工作量，范围过大就拆成多个 Plan
- 同一时间只跑一个 Plan，完成后再开下一个
- Plan 引用 business/dev 模块的 Spec，不重复描述
- 主 Agent 调度，子 Agent 执行，主 Agent 上下文保持干净

## 操作指引

- 创建计划: `create-plan/main-agent.md`
- 执行计划: `execute-plan/main-agent.md`
- 归档计划: `execute-plan/archive-guide.md`
- Plan 文档结构: `create-plan/plan-guide.md`
- Plan 模板: `template-plan.md`
- Step 模板: `template-step.md`
- Plan 示例: `example-plan.md`

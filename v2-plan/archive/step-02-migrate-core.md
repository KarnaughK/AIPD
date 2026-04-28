# 第 2 步：迁移文件到 src/core/

## 任务

将现有 `v1/references/` 下的知识类文件迁移到 `src/core/`，部分文件需要改名。

## 执行命令

```bash
# adoc 目录规范
git mv references/map-adoc-structure.md src/core/adoc-structure.md

# 多 Agent 协作机制
git mv references/agent-team-guide.md src/core/agent-team-guide.md

# L1 方向层
git mv references/L1-intent/main-agent.md src/core/L1-intent/guide.md
git mv references/L1-intent/intent-guide.md src/core/L1-intent/intent-writing.md
git mv references/L1-intent/template.md src/core/L1-intent/template.md
git mv references/L1-intent/example.md src/core/L1-intent/example.md

# L2 场景需求层
git mv references/L2-scenario/index.md src/core/L2-scenario/guide.md

# L3 核心引擎层
git mv references/L3-engine/index.md src/core/L3-engine/guide.md

# L4 产品架构层
git mv references/L4-product-arch/index.md src/core/L4-product-arch/guide.md

# L5 技术架构层
git mv references/L5-tech-arch/index.md src/core/L5-tech-arch/guide.md
git mv references/L5-tech-arch/template.md src/core/L5-tech-arch/template.md
git mv references/L5-tech-arch/example.md src/core/L5-tech-arch/example.md

# Plan 模板
git mv references/planning/templates/plan.md src/core/plan/templates/plan.md
git mv references/planning/templates/step.md src/core/plan/templates/step.md

# OKR
git mv references/okr/index.md src/core/okr/guide.md
```

## 验收

- `src/core/` 下有 15 个文件
- 所有文件内容与原文件一致（git mv 保留历史）
- `v1/references/` 下对应的原文件已不存在

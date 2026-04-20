# 第 1 步：创建目录结构

## 任务

创建重构后的完整目录结构（空目录）。

## 执行命令

```bash
# src/core/ 知识层
mkdir -p src/core/L1-intent
mkdir -p src/core/L2-scenario
mkdir -p src/core/L3-engine
mkdir -p src/core/L4-product-arch
mkdir -p src/core/L5-tech-arch
mkdir -p src/core/plan/templates
mkdir -p src/core/okr

# src/skills/ 动作层
mkdir -p src/skills/aipd/references
mkdir -p src/skills/aipd-init/references
mkdir -p src/skills/aipd-plan-create/references
mkdir -p src/skills/aipd-plan-run/references
mkdir -p src/skills/aipd-plan-archive/references

# 构建与产物
mkdir -p scripts
mkdir -p dist
```

## 验收

- `src/core/` 下有 L1-L5、plan、okr 共 9 个子目录
- `src/skills/` 下有 5 个 skill 目录，每个含 `references/`
- `scripts/` 和 `dist/` 存在

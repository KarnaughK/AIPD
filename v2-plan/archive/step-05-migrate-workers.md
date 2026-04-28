# 第 5 步：迁移 Worker 到对应 skill

## 任务

将 Worker 角色定义文件直接塞进对应的 skill 目录。

## 执行命令

```bash
# 开发执行者 → plan-run skill
git mv references/planning/worker-dev.md src/skills/aipd-plan-run/references/worker-dev.md

# 调研执行者 → plan-run skill
git mv references/planning/worker-research.md src/skills/aipd-plan-run/references/worker-research.md

# 归档执行者 → plan-archive skill
git mv references/planning/worker-archive.md src/skills/aipd-plan-archive/references/worker-archive.md
```

## 验收

- `src/skills/aipd-plan-run/references/` 下有 `worker-dev.md` 和 `worker-research.md`
- `src/skills/aipd-plan-archive/references/` 下有 `worker-archive.md`
- 原 `v1/references/planning/` 下这三个文件已不存在

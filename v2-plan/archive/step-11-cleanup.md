# 第 11 步：清理旧文件

## 任务

删除已迁移完毕的旧文件和目录。

## 前置条件

确认以下步骤已全部完成：
- 第 2 步（core 文件迁移）
- 第 5 步（worker 迁移）
- 第 6 步（init 迁移）
- 第 7 步（5 个 skill 的 SKILL.md 已写好）

## 执行命令

```bash
# 删除旧的主 SKILL.md（已拆散到 5 个 skill）
git rm SKILL.md

# 删除历史文件
git rm v1/skill-old.md

# 删除已被 README 替代的目录地图
git rm references/map-skill-structure.md

# 删除 planning/index.md（已拆散到 3 个 plan skill）
git rm references/planning/index.md

# 清理空目录（git 不跟踪空目录，但本地可能残留）
# 检查 references/ 下是否还有文件
find v1/references/ -type f 2>/dev/null

# 如果 references/ 已完全清空，删除整个目录
rm -rf v1/references/
```

## 验收

- `v1/references/` 目录不存在
- 根目录下没有 `SKILL.md` 和 `skill-old.md`
- `git status` 显示这些文件为 deleted
- 所有内容都已在 `src/` 下有对应的新位置

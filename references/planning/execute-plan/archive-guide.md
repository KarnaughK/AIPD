# 归档计划指引

## 触发时机

所有步骤完成 + 用户验收通过后

## 执行步骤

### 1. 合并开发分支

```bash
git checkout main
git merge v0.x-功能名称 --no-ff -m "Merge: 完成 v0.x-功能名称"
git branch -d v0.x-功能名称
```

### 2. 移动文件到 archive/

```bash
mv _adoc/plan/v0.x-功能名/  _adoc/plan/archive/
```

### 3. 更新 plan/index.md

在对应模块下添加归档记录。

### 4. 告知用户

```
✅ 计划已归档
分支: 已合并到 main
文件: archive/v0.x-功能名/
```

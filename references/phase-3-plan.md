# 阶段 3: 创建迭代计划

**目标**: 确定本次迭代范围，产出可执行的 Plan 文档

**触发条件**: 有 `business/` 模块，但 `plan/` 下无进行中的计划

## 执行步骤

### 步骤 1: 扫描项目全貌

```bash
# 读取 intent 摘要
head -20 _adoc/intent.md

# 读取大索引
cat _adoc/index.md

# 列出业务模块
ls _adoc/business/

# 列出技术模块
ls _adoc/tech/

# 列出历史 plan（扫描 archive/ 目录）
ls _adoc/plan/archive/ 2>/dev/null

# 查看 plan 索引
cat _adoc/plan/index.md 2>/dev/null
```

展示格式：
```
【项目状态】

方向: xxx

业务模块:
- docs/ ✓
- landing/ ✓

技术模块:
- astro/ ✓
- web/ ✓

历史计划（见 plan/index.md）:
- v0.1-init.md（基础设施）
- v0.2-xxx.md（Homepage）

---
接下来创建新的迭代计划。
```

### 步骤 2: 确定版本号

- 扫描 `plan/` 下已有文件，推算下一个版本号
- 如无历史，建议 `v0.1`
- 允许用户自定义

### 步骤 3: 定义本次目标

引导用户：
- 本次要做什么？涉及哪些业务/技术模块？
- 范围边界，明确不做什么
- 给这次迭代起个名字（如 `v0.2-search`）

### 步骤 4: 明确约束

- 引用已有的 `tech/` 文档
- 本次特有的约束（如"UI 暂不追求美观"）

### 步骤 5: 拆解任务清单

```markdown
## 任务清单

### 基础设施
- [ ] 任务 A
- [ ] 任务 B

### 功能开发
- [ ] 任务 C
- [ ] 任务 D
```

### 步骤 6: 识别风险

- 技术不确定性
- 外部依赖
- 可能的阻塞点

### 步骤 7: 生成计划文档

使用 `@templates/plan.md` 生成：`_adoc/plan/v0.x-xxx.md`

### 步骤 8: 确认并告知下一步

```
【计划创建完成】

文件: _adoc/plan/v0.2-search.md
目标: 实现搜索功能
任务数: 8 项

---
下次调用 /adoc 将进入「执行计划」阶段。
要现在开始执行吗？
```

---

## 关键原则

- 每个任务应该是明确可完成的
- 建议在开始前先定义 tech 约束
- 如果任务太多，建议拆分成多个 plan
- 参考 `@references/plan-guide.md` 了解任务拆分和版本号规范

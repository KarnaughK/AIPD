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
- 版本号规范见 `@references/planning/create-plan/plan-guide.md`（三级 A.B.C）

### 步骤 3: 确定 Plan 类型

询问用户本次计划的类型：
- **dev**（默认）：开发功能
- **research**：调研分析
- **review**：代码/方案审查

不同类型影响后续步骤拆分和子 Agent 的行为。

### 步骤 4: 定义本次目标

引导用户：
- 本次要做什么？涉及哪些业务/技术模块？
- 范围边界，明确不做什么
- 给这次迭代起个名字（如 `v0.2-search`）

### 步骤 5: 明确约束

- 引用已有的 `tech/` 文档
- 本次特有的约束（如"UI 暂不追求美观"）

### 步骤 6: 拆解任务清单

```markdown
## 任务清单

### 基础设施
- [ ] 任务 A
- [ ] 任务 B

### 功能开发
- [ ] 任务 C
- [ ] 任务 D
```

### 步骤 7: 拆分 C 级迭代步骤（关键步骤）

将任务清单拆分为多个 C 级迭代步骤，每个步骤是子 Agent 可独立执行的最小单元。

**拆分规则**：
1. 每个步骤对应一个独立的功能点
2. 步骤之间标注依赖关系
3. 每个步骤必须有明确的验收标准
4. 步骤粒度参考 `@references/planning/create-plan/plan-guide.md` 的 C 级步骤拆分规范

**操作**：
1. 在 Plan 主文档中添加"迭代步骤"表格
2. 为每个步骤在 `_adoc/plan/steps/` 下创建独立文件
3. 步骤文件格式参考 `@references/planning/create-plan/template-step.md`

**示例**：
```markdown
## 7. 迭代步骤 (Steps)

| 步骤 | 文件 | 依赖 | 状态 |
|------|------|------|------|
| v0.1.1 项目初始化 | steps/v0.1.1-project-init.md | 无 | 待执行 |
| v0.1.2 数据库搭建 | steps/v0.1.2-database.md | v0.1.1 | 待执行 |
| v0.1.3 API 骨架 | steps/v0.1.3-api-skeleton.md | v0.1.2 | 待执行 |
```

**注意**：
- 步骤文件中必须列出子 Agent 需要读的上下文文档（绝对路径或相对于项目根目录的路径）
- 步骤的"不做"部分要明确边界，防止子 Agent 做多余的事

### 步骤 8: 识别风险

- 技术不确定性
- 外部依赖
- 可能的阻塞点

### 步骤 9: 生成计划文档

使用 `@references/planning/create-plan/template-plan.md` 生成：`_adoc/plan/v0.x-xxx.md`

同时确保 `_adoc/plan/steps/` 目录存在，并生成所有步骤文件。

### 步骤 10: 确认并告知下一步

```
【计划创建完成】

文件: _adoc/plan/v0.2-search.md
类型: dev
目标: 实现搜索功能
任务数: 8 项
迭代步骤: 4 个（v0.2.1 ~ v0.2.4）

---
下次调用 /aipd 将进入「执行计划」阶段。
要现在开始执行吗？
```

---

## 关键原则

- 每个任务应该是明确可完成的
- 建议在开始前先定义 tech 约束
- 如果任务太多，建议拆分成多个 plan
- C 级步骤是子 Agent 执行的基本单位，必须足够精确
- 参考 `@references/planning/create-plan/plan-guide.md` 了解任务拆分和版本号规范

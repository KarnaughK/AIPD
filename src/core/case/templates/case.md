# Case: c{X.Y}-{case-name}

> **本次事项目标**：{一句话描述这次要处理什么}

## 目录结构

```
_adoc/case/c{X.Y}-{case-name}/
├── case.md          # 本文件，事项总览和上下文索引
├── steps/           # 可派发给子 Agent 的执行步骤
│   ├── c{X.Y.1}-{步骤名}.md
│   └── c{X.Y.2}-{步骤名}.md
└── doc/             # 执行时收集的参考资料、调研摘要、设计说明
```

## 1. 目标

- **{目标类型 A}**：{具体目标描述}
- **{目标类型 B}**：{具体目标描述}

## 2. 上下文索引

> 这里列出本次 case 最强相关的上下文。执行时优先读这些，不全量扫描项目。

### 项目认知

- `_adoc/L1-intent/intent.md` - {为什么需要读取}
- `_adoc/L3-core/index.md` - {为什么需要读取}
- `_adoc/L4-product/{module}/index.md` - {为什么需要读取}
- `_adoc/L5-dev/{module}/README.md` - {为什么需要读取}

### 页面 / 模块 README

- `src/{feature-or-page}/README.md` - {页面或模块局部认知}

### 代码入口

- `src/{feature-or-page}/index.{ext}` - {入口职责}
- `src/{feature-or-page}/components/{component}.{ext}` - {相关组件}

### 设计 / 原型 / 调研资料

- `doc/{file}.md` - {参考资料说明}

## 3. 本次边界

### 要做

- {明确本次要完成的事项}

### 不做

- {明确不在本次范围内的事项}

## 4. 约束

- **Dev**：{需要遵守的研发约束}
- **Product**：{需要遵守的产品边界}
- **Context**：只读取本 case 上下文索引及 step 明确要求的文件，除非执行中发现必要缺口。

## 5. Step 列表

- [ ] `steps/c{X.Y.1}-{步骤名}.md` - {一句话描述}
- [ ] `steps/c{X.Y.2}-{步骤名}.md` - {一句话描述}

> 如果本 case 暂时没有可执行 step，保留本节为空，并在讨论清楚后再补充 step。

## 6. 验收标准

- [ ] {验收标准 1}
- [ ] {验收标准 2}
- [ ] {验收标准 3}

## 7. 经验沉淀位置

- `_adoc/L4-product/{module}/` - {需要沉淀的产品经验}
- `_adoc/L5-dev/{module}/` - {需要沉淀的研发经验}
- `doc/{result}.md` - {本 case 内部资料}
- 相关 step 执行记录 - {执行中产生的局部经验}

## 8. 归档状态

- **状态**：待开始 / 执行中 / 待验收 / 已归档
- **创建时间**：{YYYY-MM-DD}
- **归档时间**：{YYYY-MM-DD 或留空}

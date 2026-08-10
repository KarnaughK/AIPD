# Work Package c8/wp-02: AIPD File Tree Readonly

## 目标

实现 AIPD 项目的只读文件树解析和展示。

## 上下文

- `../../case.md`
- `../../02-design/development-outline.md`
- `_adoc/index.md`
- `_adoc/map.md`

## 边界

要做：

- 读取项目路径。
- 识别 `_adoc/`。
- 展示 L1-L5、case、phase、work package、okr、inbox。
- 点击节点展示 markdown 原文或基础渲染。

不做：

- 不写入 AIPD 文件。
- 不创建 case。
- 不执行 skill。
- 不自动生成上下文。

## 数据模型候选

```ts
type AipdTreeNode = {
  id: string
  label: string
  kind: "level" | "doc" | "case" | "phase" | "work_package" | "okr" | "inbox" | "mmd"
  path: string
  children?: AipdTreeNode[]
}
```

## 验收

- 左侧能看到 L1-L5。
- 左侧能看到 case、phase 和 work package。
- 点击 markdown 能显示内容。
- 找不到 `_adoc/` 时有清晰错误态。

## 状态

- **当前状态**：candidate
- **说明**：这是旧 step 迁移来的候选 work package，已按新 case 的 work package / phase-first 结构更新执行语言。

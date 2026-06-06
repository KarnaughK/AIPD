---
name: aipd-mermaid
description: >
  在 AIPD 项目中创建、修改、评审 Mermaid/mmd 架构图，或用户明确要求预览/渲染 Mermaid 图时使用。默认只处理 Mermaid 源码和图的设计边界；不要因为只是提到 Mermaid/mmd 就渲染图片。
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
inject-from-core:
  - L5-dev/vue-architecture-diagram-guide.md
  - L5-dev/vue-provider-guide.md
---

# AIPD Mermaid

面向 AIPD 项目的 Mermaid / `.mmd` 图写作、修改、评审和按需预览入口。

## 先判断用户要什么

- **写图 / 改图**：读取目标 `.mmd`、相关 `_adoc/map.md`、就近 README / 代码入口，再修改 Mermaid 源码。
- **评审图**：按当前图的领域规范检查边界、节点职责、线条语义、是否过度塞细节。
- **预览图**：只有用户明确说“预览、渲染、看图、生成 PNG”时才运行渲染脚本。

默认不创建 case，不渲染 PNG，不把图搬位置。用户只要求小改图时，只做小改。

## 领域规范选择

先用用户描述、文件路径、图内容和项目 map 判断图属于哪类：

- Vue / Nuxt / 前端组件架构图：读取 `@references/L5-dev/vue-architecture-diagram-guide.md`。
- Vue `useXxx.ts/js`、provide / inject、provider、controller 数据源边界：再读 `@references/L5-dev/vue-provider-guide.md`。
- 后端 / 通用软件设计图：优先读项目 `_adoc/map.md`，再读相关 L3 / L4 / L5 和就近 README；没有稳定规范时，不要硬套 Vue 图规则。

## 写图原则

- 图先表达架构边界，不追求把所有实现细节塞满。
- 节点内容只写稳定、必要、可反向定位源码的信息。
- Mermaid 语法服务于理解，不为了图形复杂度而增加菱形、连线和模块。
- 如果图会指导后续实现，提醒用户把稳定图落到代码就近目录；如果只是讨论稿，保留在当前文件即可。

## 预览

仅当用户明确要求预览 / 渲染时运行：

```bash
python3 {skill_dir}/scripts/render_mermaid.py path/to/file.mmd
```

如果缺少 `mmdc`，先说明需要临时使用 `npx`，用户同意后再运行：

```bash
python3 {skill_dir}/scripts/render_mermaid.py path/to/file.mmd --allow-npx
```

回复保持短：说明改了什么、是否预览、文件路径。

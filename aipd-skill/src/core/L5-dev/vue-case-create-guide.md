# Vue 前端 Case Create 按需指南

本指南只在 case 被判断为 Vue / Nuxt 纯前端实现型时读取。`aipd-case` 主入口只负责场景分流，不承载本文件细节。

## 适用场景

- 页面、弹框、抽屉、Tab、Step、表单、搜索、表格和组件协作。
- Nuxt / Vue 项目中本次 case 明确只处理前端界面部分。
- 需要在开发前确认组件嵌套、数据注入、事件流和 work package 粒度。

不适用于后端、综合项目的跨端整体设计、L2/L3/L4 目标型研究。

## 前置设计

纯前端实现型 case 默认先做前端架构设计，不直接拆实现 work package。

前置设计的核心不是把 UI 细节写满，而是先和用户对齐“文件黑箱如何嵌套”和“数据 / 事件如何单向流动”：

1. 先画 Mermaid 组件架构草图。除非目标明显是单文件微调，否则在创建实现 work package 前，先用 `.mmd` 草图描述 `index.vue`、页面根组件、复杂弹框根组件或模块根组件如何挂载子组件。
2. 以入口文件为起点。优先从 `index.vue` / `IndexView.vue` / 弹框根组件开始，按页面生命周期梳理：加载页面 -> 创建或调用 `useXxx.js` / provider / controller -> 拉取或注入数据 -> 根组件按状态渲染子组件 -> 子组件各自自治。
3. 把渲染链和提交流程分开。第一张图或第一轮讨论优先确认渲染结构、组件嵌套、provider 注入起点和主要数据读取；用户修改、局部提交、整体提交、切换步骤、关闭刷新等属于后续事件流，可在同一图的独立模块或后续图中补充。
4. 先细化根组件和 `useXxx.js`。如果本 case 会新增或重构模块，work package 拆分前应先确认根组件职责、`useXxx.js` 输出数据 / 输出方法、provide / inject 边界、controller 引入点，再讨论末端组件内部实现。
5. 架构图稳定后再写 work package。图只是设计讨论稿时放在 case `02-design/`；一旦它会指导实现，必须在第一个相关实现 work package 中落到代码就近目录，case 只保留链接。

组件图画法读取 `L5-dev/vue-architecture-diagram-guide.md`，不要把 Mermaid 细节复制回 `aipd-case/SKILL.md`。

## Work Package 粒度

纯前端实现型 case 的 work package 拆分默认以文件为最小稳定单元：

- 一个要新建或重点改造的 `.vue` / `.js` / `.ts` 文件，默认对应一个 work package；该 work package 负责实现、校验、打磨和自检这个文件。
- 复制现有组件再改造成新组件，也按新文件单独成 work package；不要因为来源是复制，就把它并入其他文件。
- 一个 work package 可以读取多个上下文文件，但默认不同时创建多个业务文件。只有强耦合到无法独立验证的极小配套文件，才允许在同一 work package 中说明原因后合并处理。
- 根组件和 `useXxx.js` / `useXxx.ts` 通常先于末端组件。推荐顺序是：架构图落位 -> `index.vue` / 根组件骨架 -> `useXxx` / provider / controller -> 直接子组件 -> 末端组件 -> 提交 / 切换 / 收尾校验。
- work package 名称应直接指向目标文件，例如 `实现 DialogRoot.vue`、`细化 useCreateDialog.ts`、`实现 BlockForm.vue`，避免用“完善页面第一阶段”这类看不出文件边界的名称。

这里的“一个文件一个 work package”是默认粒度，不是教条。若用户明确要求快速小改，或同一个文件内的局部改动无需 Case Execute 拆解，可以保持更轻；若一个文件过大且包含多个独立业务黑箱，也可以先在 Design phase 中继续讨论是否需要拆文件。

## Agent 推荐

- Vue 页面、Vue 组件、HTML/CSS、组件通信、前端状态组织：`aipd_vue_architect`
- Vue `useXxx.ts/js`、provide / inject、页面级 API 数据源、详情数据下发、provider/controller 边界：`aipd_vue_provider`

涉及 `useXxx.ts/js` 细节时，再读取 `L5-dev/vue-provider-guide.md`。

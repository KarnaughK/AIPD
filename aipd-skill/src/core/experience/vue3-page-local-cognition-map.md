# Vue3 复杂页面局部认知入口与架构图实践经验

## 来源

- 来源类型：真实 Vue3 后台项目的页面 README、`_map.md`、Mermaid 架构图覆盖审计，以及 AIPD 当前 Vue 架构图规则校准。
- 真实规模：`src/views` 中有 83 个 `index.vue`、20 张正式组件架构图；约 11 张被 README / `_map.md` 明确索引，其余图的入口可发现性不足。
- 经验性质：Vue3 / Nuxt 前端的 L6 局部认知实践。它说明什么时候需要局部入口和图，不复制详细 Mermaid 语法。

## 适用场景

在复杂 Vue3 / Nuxt 页面、Dialog、Drawer、Tab、Step 或多组件业务区块进入 Design / Execute 时，应读取本经验。

这条经验不是要求所有页面画图，而是保证复杂页面有一个靠近代码、能让人和 AI 快速恢复结构的入口。

## 核心结论

“每个页面下面都有架构图”不应按文件名机械执行。

真实项目里的 `index.vue` 同时可能表示路由页面、Step、弹框入口、Tab 或普通目录入口；其中大量页面结构很简单。稳定规则应是：

- 每个长期维护的业务页面 / 模块都有局部认知入口。
- 简单页可以只有薄 README 或 `_map.md`，明确入口、数据源和“无复杂联动”。
- 复杂页才需要 README / `_map.md` + `README-component-architecture.mmd`。
- 架构图必须被局部入口链接；只有文件没有入口，AI 很可能不知道应该读取它。

## 复杂度触发信号

出现以下任一组合时，通常值得画图：

- 多个 Field / Section / Block / Dialog / Drawer / Tab / Step。
- 存在页面级 provider、AipdModalBox、AipdForm 或 AipdSearch。
- 存在跨组件显隐、禁用、回填、刷新、保存或步骤切换。
- 入口文件只负责挂载，单看它无法恢复真实数据流和事件流。
- 组件关系会直接决定 work package 或执行文件边界。

单文件展示页、薄列表页、直接父子结构没有这些信号时，不必为了覆盖率制造图。

## 图在 AIPD 生命周期中的位置

架构图不是 L5 通用知识正文，它描述的是当前页面真实 L6 文件结构。

推荐流转：

```text
Case Design
  -> 02-design/{module}-component-architecture-draft.mmd
  -> 用户 / 设计确认文件关系和上下文边界
  -> 第一个实现 work package
  -> 落到代码就近目录 README-component-architecture.mmd
  -> README / _map.md 建立入口链接
```

case 里的图是设计草稿；代码就近图是实现事实源。代码落地后不要让两个位置长期维护两份等价正文。

## 图应该回答什么

- 页面、弹框或模块的入口文件是什么。
- `.vue` 文件之间如何挂载。
- `useXxx.js` / provider 在哪里创建，输出哪些稳定数据和方法。
- AipdModalBox、AipdForm、AipdSearch 这类 controller 在哪个根组件引入。
- 哪些少量关键条件决定同层子组件分组。
- 用户动作如何进入当前范围内的提交 / 刷新边界。

它不应该展开：

- 每个输入框的 Element Plus 组件类型。
- 完整接口参数和所有异常分支。
- CSS 尺寸与颜色。
- 当前图范围之外的整站流程。
- 组件内部一眼可从源码读出的短判断。

## README / `_map.md` 的职责

局部入口只需记录：

- 入口组件。
- 架构图链接。
- provider / controller 入口。
- 关键数据源与提交边界。
- 重要但不直观的跨组件关系。

不要把每个组件内部代码重新解释一遍。组件自身仍应是最小可读黑箱。

## 维护触发

以下变化发生时，应同步更新局部入口和图：

- 新增 / 删除关键文件或改变组件嵌套。
- provider owner 或注入起点变化。
- AipdForm / AipdSearch / ModalBox 引入点变化。
- 首次渲染链、提交 owner 或关键跨组件协作变化。

字段文案、局部样式、单组件内部校验变化通常不需要更新架构图。

## Nuxt 前端借鉴

Nuxt 页面图除了普通 Vue 组件关系，还应在确实影响边界时标出：

- `pages/`、`layouts/` 和业务组件的挂载关系。
- server data / `useAsyncData` 与客户端 provider 的交接点。
- client-only 组件或动态浮层边界。
- route middleware 或 page meta 对主路径的影响。

不要把 Nuxt 文件路由树完整复制进每张业务图；只保留当前页面理解所必需的框架边界。

## 详细画法唯一入口

节点图形、HTML label、provider 圆柱、controller 六边形、AipdForm update 模块和粒度检查等详细规范，以 AIPD 内部文件为唯一事实源：

`aipd-skill/src/core/L5-dev/vue-architecture-diagram-guide.md`

实践经验只负责告诉 Agent 什么时候读它、图应落在哪里、什么时候维护，不复制整套模板形成双事实源。

## 不做

- 不要求每个 `index.vue` 画图。
- 不创建没有 README / `_map.md` 入口的孤儿 MMD。
- 不让架构图替代组件源码。
- 不在图里塞满字段、样式和完整接口细节。
- 不把旧 case 路径或过时模板复制成新规则。

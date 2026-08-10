# Target Project Audit

## Branch Goal

从 CaiShen Vue3 项目中收集五个必查方向及 L5 补充候选的真实证据，避免凭抽象概念编写经验。

## Trigger

新建 case 从 Think 开始；经验条目数量、ModalBox 迁移面和额外候选尚需事实校准。

## Scope / Stop Condition

- 范围：四个核心组件 / 规范、页面架构图、目标项目 L5、相关真实使用页面、验证工具链。
- 停止：满足 `01-think/think.md` 中的停止条件。

## Evidence

- `QlmModalBox` 是运行时独立挂载的浮层基座：每次 `show()` 创建独立容器和 VNode，继承主应用 `appContext`，内容组件通过注入 controller 关闭并回传结果。
- ModalBox 当前有 27 个 Dialog 构造实例、26 个真实打开实例、32 个 `.show()` 调用；没有真实 Drawer 实例，也没有 `controller.update()` 真实调用。
- ModalBox 的代表案例覆盖复杂交付任务表单、带 QlmForm 和业务 provider 的周期变更弹框、被多个入口复用的审核编辑弹框。
- 所有外部消费者都从 `@/components/QlmModalBox` barrel 导入，没有深路径依赖；56 个源码文件直接导入旧 barrel。旧名共影响 65 个运行时代码文件和 83 个 Markdown / Mermaid 文件，其中 52 个属于历史 case。
- `QlmForm` 有 13 个 provider 根、52 个 FormItem 和 4 个 ref 适配点。FormItem 均成对注册 / 注销；controller 只协调注册、校验、取值和事实通知，业务 DTO 仍由页面显式拼装。
- `QlmSearch` 有 20 个 controller、83 个 Filter、13 个 Pagination，114 个源码文件导入相关资产。Filter 自治维护 UI 状态和查询值，页面层显式收集并发请求，Pagination 是带搜索语义的特殊 Filter。
- 排除三套 controller 后，项目仍有 21 个成对的普通 `provideXxx / injectXxx` 文件，证明局部页面 / 模块上下文已经是稳定实践。
- provider 的真实边界不是替代全部 props / emits：深层子树和同一局部会话使用 provide / inject；直接一层、列表项和纯 UI 输入输出仍使用 props / emits；跨页面长期状态交给 Pinia。
- L5 额外候选中，`component-autonomy-guide.md` 的“组件自治 + 事实通知”是三套架构共同的上位原则，应并入本次经验；SCSS、mock-first、若依字典 / 路由等有价值，但不属于本 case 核心边界。
- `src/views` 下有 83 个 `index.vue` 和 20 张正式架构图，只有约 11 张被 README / `_map.md` 明确索引；现有图来自多代规范，不能推导出“每个 index.vue 必须画图”。
- AIPD 源项目已有更新版 `vue-architecture-diagram-guide.md`。正式经验应保留复杂度触发条件、局部入口和维护责任，并索引该指南，不复制目标项目旧版规则。

## Conclusion

- 正式经验拆成五条：局部上下文与组件自治、AipdModalBox、QlmForm、QlmSearch、复杂页面局部认知与架构图。
- `QlmModalBox` 的 canonical 名称采用 `AipdModalBox`，公共 API 同步采用 `Aipd*`；保留旧 barrel 的薄兼容 facade，历史 case 不机械改写。
- 活跃源码和活跃文档迁移到新名；旧 CSS 类可短期双挂，降低视觉回归风险。
- Drawer、ModalBox update、QlmSearch 动态 Filter 注销等没有真实正向证据的能力必须在经验里标注边界，不写成成熟结论。
- Think 停止条件已满足，结论进入 Design。

## Return To

`02-design/design.md`

## Invalidates

当前没有已确认设计或 work package，不使下游 artifact 失效。

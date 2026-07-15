# Vue3 AipdModalBox 上下文解耦浮层实践经验

## 来源

- 来源类型：真实 Vue3 后台项目的浮层实现、使用面审计、命名迁移和生产构建验证。
- 真实规模：27 个 Dialog 构造实例，26 个有真实打开调用，合计 32 个 `.show()` 调用。
- 经验性质：Vue3 代码实践经验。AIPD canonical 名称是 `AipdModalBox`。

## 附带源码

- 仓库路径：`experience-assets/vue3-context-decoupling/src/aipd-modal-box/`
- 使用说明：`experience-assets/vue3-context-decoupling/README.md`
- 测试：`experience-assets/vue3-context-decoupling/test/aipd-modal-box.test.js`
- Vue runtime 测试：`experience-assets/vue3-context-decoupling/test/integration/modal-runtime.test.js`
- 来源 / 权限：`experience-assets/vue3-context-decoupling/SOURCE.md`、`experience-assets/vue3-context-decoupling/LICENSE.md`
- 远端状态：当前未发布；合并到 `main` 后的 latest 模板为 `https://github.com/KarnaughK/AIPD/tree/main/experience-assets/vue3-context-decoupling/src/aipd-modal-box`。
- commit-pinned 规则：发布后把 `{full-commit-sha}` 替换为真实完整 SHA：`https://github.com/KarnaughK/AIPD/tree/{full-commit-sha}/experience-assets/vue3-context-decoupling/src/aipd-modal-box`

源码资产位于 AIPD 仓库而不随 Skill 打包。仓库所有者或已获授权的使用者应读取 / 复制该资产并保留测试；其他读者在许可证明确前只审阅和引用。不要只根据本文重新手写浮层生命周期。

## 适用场景

在 Vue3 或 Nuxt 客户端中，如果复杂 Dialog / Drawer 需要按需创建、关闭后销毁、被多个入口复用，或者内容组件内部还要拥有自己的 provider、AipdForm、AipdSearch 和业务子树，应读取本经验。

简单确认框、长期嵌在当前页面内的区块、直接父子组件不需要使用这套架构。

## 解决的具体问题

传统写法常把弹框长期挂在页面 template 中：页面保存 `visible`、内容数据、多个事件处理器和刷新逻辑。随着弹框变复杂，页面入口逐渐知道内容组件的内部结构。

AipdModalBox 把浮层提升为独立运行时黑箱：

```text
调用页面
  -> DialogInstance.show(openProps)
  -> 创建独立 DOM container + Vue VNode
  -> 继承主应用 appContext
  -> 内容组件读取 props 和 pro_controller
  -> pro_controller.close(result)
  -> 调用方收到 result
  -> unmount + remove container
```

调用页面只知道“怎么打开”和“关闭后返回什么”，不持有内容组件的内部字段与事件。

## 具象 API

canonical public API：

- `AipdBaseElDialog`
- `AipdBaseElDrawer`
- `useAipdModalBox`
- `AipdModalHeader`
- `setAipdModalBoxAppContext`

业务目录的 `index.js` 只创建实例：

```js
import { AipdBaseElDialog } from "@/shared/aipd/aipd-modal-box";
import DialogContent from "./DialogContent.vue";

export default new AipdBaseElDialog(DialogContent, {
    width: "640px",
    closeOnClickModal: false,
    destroyOnClose: true,
});
```

内容组件通过局部 controller 收口：

```js
const { pro_controller } = useAipdModalBox();

pro_controller.close({ action: "success", data: savedData });
```

`pro_controller` 保留 `pro_`，因为它表达 provider 来源；品牌迁移不应把来源语义一起改掉。

## 为什么必须继承 `appContext`

动态 `createVNode` / `render` 创建的新子树不天然等同于主应用子树。真实实现显式把主应用 `appContext` 赋给 wrapper VNode，使内容组件继续使用 Router、Pinia、全局组件和应用级 provide。

如果只把 VNode render 到 body，却没有继承 appContext，简单弹框可能能显示，但一进入真实业务组件就会出现路由、store 或全局能力缺失。

## Promise 与 callback 两种完成协议

### Promise

```js
const result = await DialogInstance.show({ recordId });
if (result?.action === "success") reload();
```

适合调用方只关心最终结果的场景。

### Callback

```js
DialogInstance.show({ recordId }, {
    callbacks: {
        close(result) {
            if (result?.action === "success") reload();
        },
        update(message) {
            handleMessage(message);
        },
    },
});
```

真实项目已经验证 close callback；`update` 虽有来源实现但没有真实业务使用证据，不能写成成熟业务能力。附带源码对两种协议和重复 close 做了单元测试。

## 已验证的组合方式

来源项目以原实现验证了这些代表性组合，AIPD 参考源码把同一机制映射为 `AipdModalBox` 与 `AipdForm`：

- 复杂交付任务表单：callback close 后刷新外层列表。
- 周期变更弹框：AipdModalBox 子树内部继续创建业务 provider 和 AipdForm，各层上下文互不混用。
- 审核编辑弹框：同一浮层实例被多个业务入口复用，内容内部拥有自己的编辑上下文。

这说明它的价值不只是“少写一个 `v-model`”，而是为复杂业务子树提供独立生命周期和上下文边界。

## 验证分层

- 来源模式：Dialog 有大量生产使用；Drawer 没有正向业务案例。
- AIPD 参考源码：session、重复关闭、回调异常和 app context fail-fast 已单测；jsdom + Vue runtime 已验证 app-level provide 继承与强制清理；public barrel 与 SFC 已通过 Vite 编译 smoke。
- 未自动验证：Element Plus 浏览器动画 / Teleport、Router / Pinia 插件行为和 Nuxt client plugin / hydration，必须在消费项目冒烟。

## 失败路径与护栏

### Promise 完成语义

来源实现只有 `pro_controller.close()` 会 resolve Promise，因此原生关闭可能造成等待悬挂。AIPD 附带源码已经把 controller close、`update:modelValue=false` 和 `closed` 统一到幂等 session：第一次关闭决定结果，后续关闭不重复通知；原生关闭以 `undefined` 结算。

消费项目如果换掉 Element Plus adapter，必须保留这条完成协议，不能只复制动态挂载部分。

### 注入保护

AIPD 附带源码导出 `Symbol` injection key，并在 `useAipdModalBox()` 缺少 provider 时立即抛错。不要退回字符串 key 或延迟到调用 close 时才报错。

### Drawer 尚未真实验证

Drawer 与 Dialog 有同构 factory，但审计时没有发现真实 Drawer 实例。经验可以借鉴它的设计，不能声称 Drawer 已在真实业务中成熟。

### 生命周期清理

容器在 Element Plus 的 closed 生命周期中 unmount 并删除。内容组件如果有定时器、订阅或外部监听，仍需在自身 unmount 中清理，不能只依赖容器删除。

## Nuxt 前端借鉴

AipdModalBox 内部调用 `document.createElement` 和 `document.body.appendChild`，所以在 Nuxt 中只能在客户端交互阶段调用：

- 可以在用户点击、`onMounted` 之后或明确的 client-only 逻辑中 `show()`。
- 不能在 SSR setup 求值期间直接创建浮层。
- 在 `.client.ts` plugin 中把 `nuxtApp.vueApp._context` 传给 `setAipdModalBoxAppContext()`。
- 内容组件里的普通 Vue provider、Pinia 和 Router 仍可复用，前提是新 VNode 正确继承 Nuxt 应用上下文。

## 不做

- 不把所有 Dialog 都改成运行时挂载。
- 不让 ModalBox controller 理解业务 DTO、字段联动或列表刷新规则。
- 不把 `update` 和 Drawer 写成已经验证的成熟路径。
- 不在复制 adapter 时丢掉统一关闭协议。
- 不在 Nuxt SSR 阶段访问 DOM。

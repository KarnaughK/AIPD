# Vue3 局部上下文与组件自治实践经验

## 来源

- 来源类型：真实 Vue3 后台项目的 L5 规范、代码使用面审计和用户技术经验回流。
- 真实规模：排除 ModalBox、AipdForm、AipdSearch 三套 controller 后，项目中仍有 21 个成对的普通 `provideXxx / injectXxx` 上下文 Hook。
- 经验性质：Vue3 代码实践经验。保留真实命名、生命周期和选择边界，不把它压缩成“多用 provide / inject”这一句口号。

## 适用场景

在 Vue3 或 Nuxt 的前端 Design / Execute 阶段，如果一个页面、复杂弹框、抽屉、Tab、Step 或业务区块包含多层组件，并且多个末端组件共享同一局部会话的数据或能力，应读取本经验。

它不适用于跨页面长期状态，也不要求浅层父子组件放弃 props / emits。

## 核心判断

这套实践的重点不是减少 props 的字符数，而是让上下文 owner、消费范围和业务决策位置保持清楚：

- 页面或模块根组件拥有局部上下文。
- 中间组件不为“转交”数据和事件而机械增加 props / emits。
- 末端组件直接读取需要的原始事实，并对自己的显示、禁用、清空、校验和提交片段负责。
- provider 只提供状态和稳定能力，不替末端组件理解业务。

## 三种通信方式的边界

| 场景 | 优先方式 | 原因 |
|---|---|---|
| 直接一层父子关系、列表项、纯 UI 输入输出 | props / emits | 关系显式、距离短，没有必要引入上下文 |
| 页面、复杂弹框、抽屉、Tab、Step 内的深层子树 | provide / inject | 避免中间层只做转发，让局部会话能力直达消费组件 |
| 跨页面共享、长期保留、需要独立调试的全局状态 | Pinia 等 store | 生命周期和所有权已经超出单个组件子树 |

列表是 props / emits 的高频正例：父组件持有数组，列表项接收当前 item 并回传用户动作，通常比为每一行创建 provider 更透明。

## 普通上下文 Hook 的具象形态

真实项目中，普通上下文 Hook 稳定采用 `provideXxx / injectXxx`，与 AipdForm、ModalBox 等 controller 自己的 `createXxx / useXxx` 命名区分开。

推荐形态：

```js
import { readonly, provide, inject, ref } from "vue";

const pageContextKey = Symbol("page-context");

export function providePageContext() {
    const detail = ref(null);
    const loading = ref(false);

    async function initDetail(id) {
        loading.value = true;
        try {
            detail.value = await loadDetail(id);
        } finally {
            loading.value = false;
        }
    }

    const context = {
        pro_detail: readonly(detail),
        pro_loading: readonly(loading),
        pro_initDetail: initDetail,
    };

    provide(pageContextKey, context);
    return context;
}

export function injectPageContext() {
    const context = inject(pageContextKey);
    if (!context) throw new Error("injectPageContext must be used under providePageContext");
    return context;
}
```

这里有几条经过真实项目校准的细节：

- key 使用 `Symbol`，避免字符串碰撞。
- provider 同步注册响应式上下文；异步加载由显式 `initXxx` 承担，再由 owner 在生命周期中调用。
- 下发状态优先 `readonly`，写入通过明确方法完成。
- 必需上下文缺失时 fail fast；只有可选增强能力才给默认值。
- 一个 Hook 不必被硬限制为“只能导出两个函数”；如果存在稳定、同域的辅助能力，可以一起导出，但不能变成杂物桶。

## `pro_` 是来源标记

从 provider 解构出的成员保留 `pro_` 前缀，例如：

```js
const { pro_detail, pro_loading, pro_reload } = injectPageContext();
```

它的作用是让读者在组件内部看到变量时，立即知道它来自上层上下文，而不是本地 ref、props 或全局 store。

不要把注入成员解构后改成普通本地名，也不要反过来给本地 computed / ref 滥加 `pro_`。前缀表达来源，不表达“重要”或“公共”。

## 组件自治与事实通知

provide / inject 解决的是能力如何到达深层组件；组件自治解决的是业务判断应该落在哪里。

末端组件优先自己负责：

- 显示 / 隐藏。
- disabled / loading。
- options 加载。
- 清空与回填。
- 局部校验。
- 自己的提交值或查询值。

跨组件联动时，发起方传递事实，不传递对接收方的命令：

```js
// 推荐：接收组件根据事实决定自己的行为
controller.updateItem(TargetComponent, { contractType, startTime });

// 不推荐：发起方越权控制接收组件内部状态
controller.updateItem(TargetComponent, { hidden: true, clear: true, disabled: true });
```

强业务联动应显式指出接收方，不优先用全局事件总线。controller 是局部基础设施，不是业务指挥官。

## Nuxt 前端借鉴

Nuxt 组件仍然是 Vue3 组件，这套局部上下文规则可以直接用于页面、layout 内业务区块和客户端弹框。

需要额外注意：

- provider 状态必须在组件实例或请求作用域内创建，不要把可变 ref 放成模块级单例，否则 SSR 请求之间可能串状态。
- 只依赖 Vue 响应式能力的 Hook 可以在 SSR 中创建；依赖 `window`、`document` 或客户端插件的初始化应放到客户端生命周期。
- 如果 Nuxt 已经通过 `useState` 或服务端数据能力承担跨请求 / hydration 状态，不要再用局部 provider 复制第二份事实源。

## 不做

- 不规定 provide / inject 的使用数量必须超过 props / emits。
- 不用 provider 替代清楚的直接父子 API。
- 不把页面局部上下文升级成全局 store。
- 不让 provider 生成 title、statusText、buttons 等展示配置替末端组件做决定。
- 不把本地变量伪装成 `pro_` 来源。

## 后续借鉴方式

- 设计复杂 Vue3 / Nuxt 前端页面时，先确认上下文 owner 和消费子树，再选择通信方式。
- 如果复杂度来自表单字段注册和统一校验，继续读取 `vue3-aipd-form-page-controller.md`。
- 如果复杂度来自筛选器、分页和搜索触发，继续读取 `vue3-aipd-search-page-controller.md`。
- 如果复杂度来自按需创建的独立浮层，继续读取 `vue3-aipd-modal-box.md`。

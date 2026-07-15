# Vue3 AipdForm 页面级 Controller 实践经验

## 来源

- 来源类型：真实 Vue3 后台项目的表单 controller 实现、L5 表单规则和使用面审计。
- 真实规模：13 个页面级 controller 根、52 个 FormItem 相关使用点、4 个组件 ref 适配点；52 个点中包含一个只展示 sample code、未做注销的 demo 页面。
- 经验性质：基于已验证机制重写的复杂表单代码实践经验，AIPD canonical 名称为 `AipdForm`。

## 附带源码

- 仓库路径：`experience-assets/vue3-context-decoupling/src/aipd-form/`
- 资产总览：`experience-assets/vue3-context-decoupling/README.md`
- 示例：`experience-assets/vue3-context-decoupling/examples/ComplexFormPage.vue`
- 测试：`experience-assets/vue3-context-decoupling/test/aipd-form.test.js`
- Vue runtime 测试：`experience-assets/vue3-context-decoupling/test/integration/vue-context.test.js`
- 来源 / 权限：`experience-assets/vue3-context-decoupling/SOURCE.md`、`experience-assets/vue3-context-decoupling/LICENSE.md`
- 远端状态：当前未发布；合并到 `main` 后的 latest 模板为 `https://github.com/KarnaughK/AIPD/tree/main/experience-assets/vue3-context-decoupling/src/aipd-form`。
- commit-pinned 规则：发布后替换真实完整 SHA：`https://github.com/KarnaughK/AIPD/tree/{full-commit-sha}/experience-assets/vue3-context-decoupling/src/aipd-form`

源码资产不随 Skill 打包。仓库所有者或已获授权的使用者优先使用其中的 controller、item、Symbol context 和测试；其他读者在许可证明确前只审阅和引用，不根据本文重写一份近似实现。

## 适用场景

在 Vue3 或 Nuxt 前端 Design / Execute 阶段，如果复杂表单页面或复杂表单弹框包含多个自治区块 / 字段组件，需要统一校验、收集提交值和处理跨字段事实通知，应读取本经验。

只有几个字段、单个组件可以清楚完成的表单，不需要引入页面级 controller。

## 核心结构

```text
页面 / 复杂弹框根组件
  -> createAipdForm()
  -> provide pro_formController
  -> 统一触发 validate / getSubmitValue

FormItem 组件
  -> useAipdFormItem()
  -> setup 同步 register
  -> effect scope dispose 时 unregister
  -> 自己维护字段、显隐、校验和提交片段
```

controller 负责协调，不负责业务：

- 注册 / 注销 FormItem。
- 按目标查找 FormItem。
- 统一触发校验。
- 收集每个 FormItem 的提交值。
- 向明确的 FormItem 转发原始事实。
- 清理注册表。

它不负责：

- 理解具体字段含义。
- 决定某个字段是否显示或必填。
- 把所有字段拼成后端 DTO。
- 代替字段组件加载自己的 options。

## FormItem 自治

一个 FormItem 不一定只是一行输入框，也可以是一个 Section / Block。它是否值得成为 FormItem，取决于它能否形成稳定的局部业务黑箱。

FormItem 负责：

- 自己的本地状态和回显。
- 自己的显示 / 隐藏、disabled 和 loading。
- 自己的校验规则。
- 自己的 `getSubmitValue()`。
- 接到其他组件的事实通知后，自行决定清空、恢复或跳过校验。

来源项目的生产业务 FormItem 按 mounted 注册、beforeUnmount 注销；使用面扫描里另有一个只展示 sample code、没有注销逻辑的 demo，不能把它当成生产正例。AIPD 参考源码改为 setup 同步注册、effect scope dispose 注销，使 SSR render 也能看到已创建的 item。无论采用哪种时点，生命周期成对都是必要护栏：动态显隐或路由切换后，controller 不能保留已经卸载的组件。

## 事实通知，不传控制命令

跨字段联动使用明确目标和原始事实：

```js
pro_formController.updateItem(TargetFormItem, {
    contractType,
    serviceStartTime,
});
```

TargetFormItem 自己判断是否显示、是否必填以及是否清空。

不要传：

```js
{ hidden: true, required: false, clear: true }
```

后一种写法让来源组件知道目标组件内部状态，新的联动会不断加长命令对象，使 controller 变成业务编排中心。

## 提交 DTO 保持显式

页面根组件统一触发校验和取值，但最终请求参数仍应在页面 / 提交 owner 中显式拼装：

```js
const validateResult = await pro_formController.validate();
if (!validateResult.valid) return;

const baseInfo = await pro_formController.getSubmitValue(BaseInfoFormItem);
const serviceInfo = await pro_formController.getSubmitValue(ServiceFormItem);

await submitForm({
    ...baseInfo,
    ...serviceInfo,
    recordId,
});
```

这样 controller 保持业务无知，接口字段也不会藏进一个通用 `getAllValues()` 黑箱。接口改变时，读者能在提交现场看到真实 DTO。

## 页面级与弹框级都成立

来源项目以原实现验证两类主要场景；AIPD 参考源码保持相同边界：

- 页面级复杂编辑：多个 Section 作为 FormItem，统一校验后由页面显式拼请求。
- 复杂弹框表单：AipdModalBox 提供外层浮层生命周期，弹框内部再创建 AipdForm，字段组件在自己的局部上下文中自治。

来源项目还存在基于组件 ref 的适配变体，适用于根组件已经直接掌握少量字段 ref 的页面。AIPD 附带源码暂不收录该变体，避免把两条路径混成一个抽象；需要时应作为独立 adapter 补测试后再加入。

## 组件 key 的真实约束

来源生产实现使用带 `name` 的 Vue 组件对象作为注册 key。AIPD 附带源码同时接受稳定字符串和带 `name` 的组件对象，并在 `useAipdFormItem()` 中默认取当前组件名。使用时必须确认：

- 组件名稳定且不重复。
- 动态组件不会因匿名定义导致无法注册。
- 查找和 update 使用同一组件 identity。

不要使用匿名组件或运行时变化的 name；显式字符串也必须在当前 controller scope 内唯一。

## 验证分层

- 来源模式：复杂页面 / 弹框有真实生产使用面。
- AIPD 参考源码：controller 注册、注销、校验归一化、取值、update 和初始化已单测；Vue runtime 已验证 provide / inject 下的同步注册与 scope dispose；SFC 示例已通过 Vite 编译 smoke。
- 未自动验证：Nuxt SSR / hydration 和具体 UI 表单库集成，消费项目必须补 runtime 验证。

## Nuxt 前端借鉴

AipdForm context 和同步注册可以参与 Nuxt SSR render；真实表单交互、浏览器校验和 client-side 弹框仍发生在 hydration 后。

如果页面有 SSR 初始数据：

- 初始数据可以来自 Nuxt 数据加载能力。
- AipdForm 仍只负责 hydration 后的字段自治、校验和提交协调。
- 不要让每个 FormItem 在服务端和客户端重复发同一初始化请求。
- controller 必须按组件实例创建，不能做成模块级跨请求单例。

## 不做

- 不为简单表单引入 controller。
- 不让 controller 理解业务 DTO。
- 不用 update 命令远程操纵目标组件内部状态。
- 不省略动态 FormItem 的 unregister。
- 不把所有字段机械拆成一个文件；拆分应以稳定业务黑箱为准。

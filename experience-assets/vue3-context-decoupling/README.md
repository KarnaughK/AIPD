# Vue3 Context Decoupling Reference Source

这是一套从真实 Vue3 后台项目校准后重新整理的参考实现，包含：

- `AipdModalBox`：运行时创建 Dialog / Drawer，内容子树继承主应用 context，通过局部 controller 返回结果。
- `AipdForm`：复杂表单页面 / 弹框的页面级 controller，字段组件自治，页面统一校验并显式拼 DTO。
- `AipdSearch`：复杂检索页的搜索会话，Filter / Pagination 自治，页面显式发请求。

它不是已发布 npm 包。仓库所有者或已经取得相应授权的使用者，可以按当前项目需要复制整个 `src/`，或者只复制其中一个子目录并保留对应测试；其他读者在许可证明确前只应审阅和引用。不要从 README 重新手写一个近似 controller。

## 目录

```text
src/
├── aipd-modal-box/
│   ├── AipdOverlay.js
│   ├── AipdModalHeader.vue
│   ├── appContext.js
│   ├── context.js
│   ├── elementPlus.js
│   ├── session.js
│   └── styles.css
├── aipd-form/
│   ├── AipdFormController.js
│   ├── AipdFormItem.js
│   └── context.js
└── aipd-search/
    ├── AipdSearchController.js
    ├── AipdSearchFilter.js
    ├── AipdSearchPagination.js
    └── context.js
```

## 依赖与前提

- Vue `>= 3.3`
- Element Plus `>= 2.7`，只被 `aipd-modal-box/elementPlus.js` 使用
- ModalBox 只能在浏览器客户端打开
- Form / Search controller 必须在每个页面、Tab 或浮层实例内创建，不能做模块级共享单例

宿主项目负责引入 Element Plus 基础样式：

```js
import 'element-plus/dist/index.css'
```

## AipdModalBox

### Vite Vue3 注册

必须在 Router、Pinia、Element Plus 等插件安装完成后记录 app context：

```js
import { createApp } from 'vue'
import App from './App.vue'
import { setAipdModalBoxAppContext } from '@/shared/aipd/aipd-modal-box'

const app = createApp(App)
app.use(router)
app.use(pinia)
setAipdModalBoxAppContext(app._context)
app.mount('#app')
```

关键是插件先安装，再在 `mount` 前记录最终 `app._context`。

定义一个可复用实例：

```js
import EditorDialog from './EditorDialog.vue'
import { AipdBaseElDialog } from '@/shared/aipd/aipd-modal-box'

export const editorDialog = new AipdBaseElDialog(EditorDialog, {
  width: '720px',
})
```

调用方可以等待结果：

```js
const result = await editorDialog.show({ recordId: 42 })
if (result?.saved) await reloadCurrentPage()
```

需要 callback 或单次 Element Plus 配置时使用显式 options，避免把含 `close` / `update` 字段的普通配置误判成回调协议：

```js
editorDialog.show(
  { recordId: 42 },
  {
    callbacks: {
      update: (message) => handleMessage(message),
      close: (result) => result?.saved && reloadCurrentPage(),
    },
    config: { width: '800px' },
  },
)
```

内容组件不声明“关闭事件”向多层父组件冒泡，而是读取当前浮层 controller：

```js
const { pro_controller } = useAipdModalBox()

await save()
pro_controller.close({ saved: true })
```

如果用户通过 Element Plus 自带关闭路径退出，Promise 会以 `undefined` 结算，不会永久 pending。`close()` / 原生关闭重复发生时只采用第一次结果。`destroy()` 是无动画的强制清理逃生口，正常业务应使用 `close()`。

Dialog 来自大量真实业务调用；Drawer 保留同构 adapter 并通过编译检查，但来源项目没有正向业务调用证据。采用 Drawer 前必须在消费项目单独做打开、关闭、遮罩、ESC、上下文继承和卸载冒烟。

### Nuxt 注册

创建 `plugins/aipd-modal-box.client.ts`：

```ts
import { setAipdModalBoxAppContext } from '~/shared/aipd/aipd-modal-box'

export default defineNuxtPlugin((nuxtApp) => {
  setAipdModalBoxAppContext(nuxtApp.vueApp._context)
})
```

只在点击事件、`onMounted` 或其他客户端路径调用 `show()`。服务端调用会显式报错。动态挂载内容能继承 Vue app context；依赖 Nuxt request context 的 composable 仍应由项目自行做客户端验证，不要把 app context 继承等同于所有 SSR request context 都可用。

## AipdForm

页面根组件在 `setup` 中创建独立 scope：

```js
const { pro_formController } = createAipdForm()

async function submit() {
  const validation = await pro_formController.validate()
  if (!validation.valid) return

  const profile = await pro_formController.getSubmitValue(ProfileSection)
  const plan = await pro_formController.getSubmitValue(PlanSection)
  await api.save({ ...profile, ...plan })
}
```

字段 / Section 组件使用 `useAipdFormItem()` 注册。默认 key 来自组件 `name`，因此必须使用 `defineOptions({ name: 'ProfileSection' })`；也可以显式传 `itemName`。

```js
const form = reactive({ name: '' })
const formRef = ref()

const { pro_formController } = useAipdFormItem({
  getValue: () => form,
  getSubmitValue: () => ({ name: form.name.trim() }),
  validate: () => formRef.value.validate(),
  update: ({ departmentId }) => loadOptions(departmentId),
  clear: () => { form.name = '' },
  clearValidate: () => formRef.value.clearValidate(),
})
```

helper 在 setup 中同步注册，并在当前 Vue effect scope 销毁时自动注销 item；这使 SSR render 也能看到当前组件已注册的 item。跨字段联动只传原始事实，例如 `{ departmentId }`；接收字段自行决定隐藏、禁用、清空或重新校验。controller 不负责拼业务 DTO。

## AipdSearch

页面 / Tab 创建独立搜索会话：

```js
const { pro_searchController } = createAipdSearch()

pro_searchController
  .bindInit(loadDepartmentOptions)
  .onSearch(async ({ filters, pagination }) => {
    const params = {
      ...filters.KeywordFilter,
      ...filters.DepartmentFilter,
      ...pagination,
    }
    rows.value = await api.list(params)
  })

const loadError = ref('')

onMounted(async () => {
  try {
    await pro_searchController.initialize()
  } catch (error) {
    loadError.value = error instanceof Error ? error.message : String(error)
  }
})
```

Filter 组件自治，在 setup 中同步注册并随当前 effect scope 自动注销：

```js
const keyword = ref('')
const { pro_searchController } = useAipdSearchFilter({
  getValue: () => keyword.value,
  getPostValue: () => ({ keyword: keyword.value.trim() }),
  clear: () => { keyword.value = '' },
})

function search() {
  return pro_searchController.triggerSearch()
}
```

普通搜索默认把页码改为 1；分页器触发时使用 `resetPageNo: false`。`initialize()` 会等待全部异步选项加载，任一初始化失败就向上传播且不发首个搜索，页面可以统一展示错误。

## 为什么仍然显式拼参数

Form / Search controller 只管理组件会话，不理解接口 DTO。页面显式把若干 item / filter 的输出拼成请求参数，可以保持这些边界：

- 字段和筛选组件只知道自身语义。
- controller 只知道注册、生命周期和统一触发。
- 页面知道当前接口需要什么。

把 DTO 拼装塞进 controller 会把一个局部协调器变成新的全局业务黑箱。

## 验证

纯 controller 与 Modal session 不依赖 Vue runtime，可直接验证：

```bash
cd experience-assets/vue3-context-decoupling
npm run verify
```

安装锁定的开发依赖后，运行 Vue runtime 与 Vite SFC / public barrel 完整验证：

```bash
cd experience-assets/vue3-context-decoupling
npm install
npm run verify:full
```

当前自动测试覆盖 Promise / callback 结算、重复关闭、app context fail-fast、表单注册 / 注销 / 校验 / update、搜索初始化幂等、Filter 生命周期 / 异步分页语义。资产总入口和三个 Vue SFC 示例已使用 Vite 6.4.3、Vue 3.5.26、Element Plus 2.13.1 做过生产编译 smoke；消费项目仍应使用自身依赖版本构建，并对 Dialog、Drawer、Router / Pinia context 做浏览器冒烟。

| 层级 | 状态 |
|---|---|
| 来源架构模式的生产使用面 | 已审计；Dialog、Form、Search 有真实使用，Drawer 无正向案例 |
| AIPD 纯 controller / session 单测 | 已通过 |
| AIPD Vue SFC / public barrel 生产编译 | 已通过 Vite smoke |
| AIPD Vue lifecycle / provide-inject runtime 自动测试 | 已覆盖 Form / Search 注册注销，以及 Modal app provide 继承与强制清理 |
| Element Plus 浏览器动画 / Teleport、Router / Pinia 插件行为 | 未覆盖自动化，需浏览器冒烟 |
| Nuxt client plugin / hydration / request context | 未做集成验证，按本节边界接入后验证 |

## 版本化链接

- 当前发布状态：尚未提交 / 推送，本 case 不把 404 模板声称为可用远端地址。
- 合并到默认分支后的 latest 模板：`https://github.com/KarnaughK/AIPD/tree/main/experience-assets/vue3-context-decoupling`
- 发布后 pinned 规则：把 `{full-commit-sha}` 替换为真实包含本资产的完整 commit SHA：`https://github.com/KarnaughK/AIPD/tree/{full-commit-sha}/experience-assets/vue3-context-decoupling`

来源和许可证边界分别见 `SOURCE.md`、`LICENSE.md`。

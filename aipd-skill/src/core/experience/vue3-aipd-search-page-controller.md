# Vue3 AipdSearch 复杂检索页实践经验

## 来源

- 来源类型：真实 Vue3 后台项目的搜索会话 controller、L5 列表规则和使用面审计。
- 真实规模：20 个 SearchController、83 个 Filter、13 个 Pagination，114 个源码文件导入相关资产。
- 经验性质：来源架构模式已经大规模使用，不是试验思路；AIPD reference implementation 是重写实现，当前通过核心单测与编译 smoke，不等于已经大规模生产运行。

## 附带源码

- 仓库路径：`experience-assets/vue3-context-decoupling/src/aipd-search/`
- 资产总览：`experience-assets/vue3-context-decoupling/README.md`
- 示例：`experience-assets/vue3-context-decoupling/examples/ComplexSearchPage.vue`
- 测试：`experience-assets/vue3-context-decoupling/test/aipd-search.test.js`
- Vue runtime 测试：`experience-assets/vue3-context-decoupling/test/integration/vue-context.test.js`
- 来源 / 权限：`experience-assets/vue3-context-decoupling/SOURCE.md`、`experience-assets/vue3-context-decoupling/LICENSE.md`
- 远端状态：当前未发布；合并到 `main` 后的 latest 模板为 `https://github.com/KarnaughK/AIPD/tree/main/experience-assets/vue3-context-decoupling/src/aipd-search`。
- commit-pinned 规则：发布后替换真实完整 SHA：`https://github.com/KarnaughK/AIPD/tree/{full-commit-sha}/experience-assets/vue3-context-decoupling/src/aipd-search`

AIPD 附带源码实现了动态 Filter 注销、Symbol context、可 await 初始化、初始化错误传播和循环依赖清理；核心层和 Vue scope runtime 已单测，浏览器请求竞争与 Nuxt SSR / hydration 仍需消费项目验证。仓库所有者或已获授权的使用者落地时读取源码与测试；其他读者在许可证明确前只审阅和引用。

## 适用场景

在 Vue3 或 Nuxt 前端 Design / Execute 阶段，如果列表页面包含多个业务 Filter、分页、异步筛选项、Tab 内独立搜索会话、导出或弹框完成后的原位刷新，应读取本经验。

只有一个输入框和一个请求参数的简单列表不需要引入 AipdSearch。

## 复杂度爆点

复杂检索页最容易膨胀的不是表格渲染，而是查询参数组装和搜索时机：

- 每增加一个筛选项，都要在页面 state、template、reset 和请求参数中修改一次。
- 部门树、人员选项等异步数据未完成时，首次搜索可能过早执行。
- 普通搜索需要回第一页，翻页搜索又必须保留当前页。
- 弹框关闭后的刷新需要保留当前搜索会话。

AipdSearch 把这些变化横向铺到 Filter：

```text
页面 / Tab
  -> 创建 SearchController
  -> provide pro_searchController
  -> 明确声明 onSearch()

Filter
  -> 自己维护 UI state
  -> 注册到 controller
  -> 暴露 getPostValue()

SearchPagination
  -> 作为独立 pagination collaborator
  -> 同样贡献请求参数
  -> 普通搜索重置页码
  -> 翻页触发时保留页码
```

## Filter 自治

每个 Filter 自己负责：

- 控件状态和默认值。
- options 加载和展示。
- reset。
- 把 UI 值转换成当前筛选项的请求片段。
- 必要时声明自己的异步初始化。

页面不读取 Filter 内部 ref，也不为每个筛选项维护一份镜像状态。

## 页面仍显式拥有 API 请求

controller 负责“什么时候搜索”和“向 Filter 收什么”，不负责完整接口 DTO。页面的 `onSearch()` 仍应显式：

```js
pro_searchController.onSearch(async ({ filters, pagination }) => {
    tableData.value = await loadList({
        ...filters.ContractFilter,
        ...filters.StatusFilter,
        ...pagination,
    });
});
```

这样接口字段和筛选组合留在页面现场。不要做一个“自动收集全部 Filter 并直接请求任意 API”的万能 controller，否则接口变化会再次被藏进配置层。

## Pagination 是特殊 Filter

Pagination 在参数贡献和搜索语义上类似特殊 Filter，但参考实现中是通过 `registerPagination()` 独立注册的协作者：

- 用户改变普通筛选条件再搜索：页码回到第一页。
- 用户点击翻页：保留新页码触发同一搜索。
- 弹框操作完成后刷新：通常保留当前页，避免用户跳回列表开头。

把分页完全放回页面，很容易让每个列表重新实现这三种分支；把它当成特殊 Filter，可以复用稳定语义而不让普通 Filter 知道分页。

## 异步初始化

部门树、人员列表、字典等 Filter 可能要先加载选项，再允许首次搜索。真实实现通过 `bindInit()` 协调这些初始化任务。

这个能力应只等待“搜索成立所必需”的前置数据。非阻塞增强数据不应拖住整页首次查询。

需要明确错误语义：如果初始化失败后仍继续搜索，页面要能解释筛选缺失；如果失败必须阻塞搜索，就不能只打印错误然后继续。

## 多 Tab 搜索会话

页面内不同 Tab 可以各自创建 SearchController。这样每个 Tab 拥有自己的 Filter、分页和刷新语义，不需要把所有条件堆进页面根组件的一个巨大 state。

这也是 provide / inject 的典型局部作用域：controller 服务当前 Tab 子树，不成为全局 store。

## 已知风险

- 来源实现使用字符串 context 且缺少 inject fail-fast；AIPD 附带源码已改为 Symbol 和明确错误。
- 来源审计没有发现 Filter unregister；AIPD 附带源码的 Vue helper 已成对注册 / 注销，复制时不得删掉卸载逻辑。
- controller 不自动解决 API 并发竞争；快速连续搜索时，页面仍需处理取消、序号或最后请求覆盖策略。
- AIPD 附带源码默认向上传播初始化失败且不触发首次搜索；页面必须把错误转成明确产品状态，不能只打印日志。
- 旧 README 曾写“暂未落地”，与 20 个真实 controller 冲突；经验以代码使用面为事实源。

## 验证分层

- 来源模式：20 个 controller、83 个 Filter、13 个 Pagination 的真实使用面。
- AIPD 参考源码：controller、Filter、Pagination、异步 init、初始化幂等和异步页码语义已单测；Vue runtime 已验证 provide / inject 下的同步注册与 scope dispose；SFC 示例已通过 Vite 编译 smoke。
- 未自动验证：浏览器请求竞争和 Nuxt SSR / hydration，消费项目必须补 runtime 验证。

## Nuxt 前端借鉴

AipdSearch 可以用于 Nuxt 的客户端交互列表，但要先决定 SSR 首屏数据与客户端搜索的关系：

- SSR / `useAsyncData` 已经获取首屏列表时，hydration 后不要无条件再触发同一首次搜索。
- URL query 是可分享、可返回的页面状态时，页面 owner 负责在 route query 与各 Filter 初值之间建立明确映射；controller 不应偷偷接管路由。
- SearchController 按页面或 Tab 实例创建，不能成为模块级单例。
- 只在客户端可用的筛选 options 应在 hydration 后初始化，并明确 loading / unavailable 状态。

## 不做

- 不为简单列表强行使用 controller。
- 不让 Filter 直接调用列表 API。
- 不让 controller 猜测任意接口字段。
- 不忽略动态 Filter 的注销和请求竞争。
- 不把不同 Tab 的搜索会话合并成全局状态。

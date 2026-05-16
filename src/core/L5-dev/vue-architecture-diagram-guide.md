# Vue 架构设计图画法

## 定位

这类图用于描述复杂 Vue 页面、弹框、抽屉、Tab 或区块的开发前架构关系。

它不是源码细节图，也不是 UI 结构图。核心目标是让开发前先把这些事情说清楚：

- 代码文件之间怎么嵌套和挂载
- 组件与组件之间怎么协作
- 数据从哪里注入，哪些组件读取
- 事件从哪里触发，往哪里回传
- 哪些条件会决定组件展示、切换或提交分支
- 哪些跨组件架构从哪里引入，例如表单 controller、搜索 controller

字段内部用输入框、日期选择器还是上传组件，不放进架构图。那是组件自己的内部实现，直接看组件源码更清楚。

## 使用阶段

复杂前端 case 在 case-create 阶段可以先把图放到 case 目录：

```text
_adoc/case/{case}/doc/{module}-component-architecture-draft.mmd
```

这时它是讨论稿，用来和用户确认业务状态、数据所有权、架构流转和组件划分。

等 case-run 真正写代码并且图稳定后，再把最终图落到对应业务目录：

```text
src/views/xxx/README-component-architecture.mmd
```

`README.md` 或 `readme.md` 里只保留入口链接，不把大段 Mermaid 源码直接塞进 README。

## 图形语义

默认使用 Mermaid `flowchart`。

```mermaid
flowchart LR
    Component["方块：业务组件"]
    Judge{"菱形：逻辑判断 / 接口分支"}
    Store[("圆柱：数据源 / provider hook / 状态桶")]
    Controller[["双边框：事件架构 / controller"]]
```

### 方块：业务组件

方块只表示 Vue 组件或明确的业务组件。

适合：

- `index.vue`
- `BlockForm.vue`
- `BlockView.vue`
- `FormItemDataNum.vue`
- 业务 Header、Log、Dialog 内容组件

不适合：

- 接口调用
- 状态判断
- composable hook
- controller 架构

组件图的主结构优先表达代码文件嵌套关系。跨组件通知、事件监听、update 联动不要画成父子层级；如果组件实际在代码里是平级挂载，就在图里保持平级，再把联动写进接收方组件节点内部。

### 菱形：逻辑判断

菱形用于描述会影响组件展示、组件切换或提交分支的数据判断。

推荐：

```mermaid
flowchart TD
    IndexVue["index.vue"]
    IndexVueRecordJudge{"index.vue 数据判断<br/>recordId 为空：不查详情<br/>recordId 存在：loadDetail(recordId)<br/>拿到 reviewStatus / logList"}
    BlockFormVue["BlockForm.vue"]
    BlockViewVue["BlockView.vue"]

    IndexVue -->|进入记录判断| IndexVueRecordJudge
    IndexVueRecordJudge -->|无 recordId / 可编辑状态| BlockFormVue
    IndexVueRecordJudge -->|reviewStatus=0/1| BlockViewVue
```

避免：

- 菱形连菱形
- 为简单条件单独画一个菱形
- 在菱形里写完“创建态”，线上又重复写“无 recordId”

能合并的判断合进一个菱形，保持架构图是“决策摘要”，不是完整代码流程图。

### 圆柱：数据源 / provider hook

圆柱用于表示以数据为核心、附带基础方法的 hook 或 provider。

```mermaid
flowchart TD
    UseNumberDeliveryRecordJs[("useNumberDeliveryRecord.js<br/>输出数据：pro_recordForm / loading<br/>输出方法：loadDetail / closeDialog")]
    IndexVue["index.vue"]

    UseNumberDeliveryRecordJs -->|provide 注入起点| IndexVue
```

规则：

- 圆柱只连到注册 / provide 它的组件。
- 其他 inject 它的组件不要继续画线，否则图会乱。
- 其他组件在自己的方块内部用模块说明自己从这个 hook 里拿了什么。

### 双边框：事件架构 / controller

双边框用于表示不以存值为核心，而是协调跨组件事件、注册、校验、取值或搜索触发的 controller 架构。

适合：

- `QlmForm`
- `QlmSearch`
- 后续类似的表单、搜索、表格上层 controller

示例：

```mermaid
flowchart TD
    QlmFormController[["【QlmForm】<br/>创建 controller<br/>协调 FormItem 注册<br/>统一 validate / getSubmitValue"]]
    BlockFormVue["BlockForm.vue"]

    QlmFormController -->|controller 架构来源| BlockFormVue
```

规则：

- controller 架构块只连到引入它的组件。
- 子组件不必都连回 controller；在子组件方块内部写 `【QlmForm】` 模块即可。
- 这样能表达“从引入组件往下都带上 QlmForm 模块”，但不把图画成满屏交叉线。

## 节点内容写法

节点内部使用 HTML 标签，让模块层次清楚。

所有 Vue 组件节点的第一个模块必须是 `组件概览`，先说明这个组件是干什么的。这样用户和 AI 先看懂组件职责，再看数据、事件和 controller 细节。

推荐格式：

```mermaid
flowchart TD
    BlockFormVue["<h2>BlockForm.vue</h2><fieldset><legend>组件概览</legend><ul><li>表单填写区组件</li><li>负责承载字段组件和提交动作</li></ul></fieldset><fieldset><legend>【useNumberDeliveryRecord.js】</legend><ul><li>读取详情作为只读回显源</li></ul></fieldset><fieldset><legend>【QlmForm】</legend><ul><li>创建 controller</li><li>收集 FormItem 提交值</li></ul></fieldset>"]
```

约定：

- `<h2>`：组件名或节点主标题
- `<fieldset>`：一个模块块
- `<legend>`：模块名
- `<ul><li>`：模块内做的事情

常见模块名：

- `组件概览`
- `弹框入口`
- `输出数据`
- `输出方法`
- `接口调用`
- `【useXxx.js】`
- `【QlmForm】`
- `【QlmForm-update：FormItemXxx.vue】`
- `【QlmSearch】`

模块名尽量使用对应文件名或架构名。

如果模块来自 hook / provider 文件，`legend` 直接写文件名，保留 `.js` 后缀。  
如果模块来自跨组件 controller 架构，`legend` 写架构名，不加文件后缀。

推荐：

- `【useConstruct.js】`
- `【useCreateStep.js】`
- `【useNumberDeliveryRecord.js】`
- `【QlmForm】`
- `【QlmSearch】`

避免：

- `【contract context】`
- `【form context】`
- `【page data】`
- `【全局状态】`

原因是图要能反向定位源码。看到 `【useConstruct.js】` 时，开发者可以直接去找这个文件；看到 `【QlmForm】` 时，开发者知道这是一个表单 controller 架构，而不是某个本地 hook 文件。

## QlmForm 模块写法

如果组件本身是一个 FormItem，节点里写 `【QlmForm】` 模块，说明它如何注册、校验、贡献字段。

```html
<fieldset>
  <legend>【QlmForm】</legend>
  <ul>
    <li>注册 FormItem</li>
    <li>贡献提前开通原因字段</li>
    <li>显示状态下参与必填校验</li>
  </ul>
</fieldset>
```

如果组件还会接收另一个 FormItem 的 update 事件，不要把这条关系画成组件层级线；在接收方节点里增加独立模块：

```html
<fieldset>
  <legend>【QlmForm-update：FormItemServiceTime.vue】</legend>
  <ul>
    <li>事件来源：服务时间 FormItem 的时间判断结果</li>
    <li>主合同且开始时间早于签约时间时，本组件显示并开启必填校验</li>
    <li>主合同且开始时间不早于签约时间时，本组件隐藏并跳过必填校验</li>
    <li>子合同场景下，本组件隐藏并跳过必填校验</li>
  </ul>
</fieldset>
```

拆成两个模块的原因：

- `【QlmForm】` 说明“我自己作为 FormItem 做什么”。
- `【QlmForm-update：来源组件】` 说明“我接收谁的 update 后做什么”。

这能同时表达组件自身职责和跨组件事件关系，不污染代码嵌套层级。

设计阶段不要提前发明未来代码变量名。比如还没写代码时，不要直接写 `isBeforeContractTime`；应该写“服务时间 FormItem 的主合同时间判断结果”。等代码落地后，再按真实变量名更新图。

## 数据与事件的表达

### 数据源只画注入起点

`useXxx.js` 这类 provider hook 用圆柱表示。

它往 `index.vue` 或对应 provider 组件画一条线，表示注入起点。

字段组件、查看组件、日志组件如果读取它，不额外连线，只在方块内部说明：

```html
<fieldset>
  <legend>【useNumberDeliveryRecord.js】</legend>
  <ul>
    <li>读取 pro_recordForm.dataNum 作为默认值</li>
  </ul>
</fieldset>
```

### 事件架构只画来源

`QlmForm` 这类 controller 用双边框表示。

它只连到引入 controller 的组件，例如 `BlockForm.vue`。

子 `FormItem*` 方块里说明自己：

```html
<fieldset>
  <legend>【QlmForm】</legend>
  <ul>
    <li>注册 FormItem</li>
    <li>返回字段片段</li>
  </ul>
</fieldset>
```

### 只画当前范围内的事件

事件箭头只画会影响当前图范围内组件联动的事件。

如果当前图是 `Step1`，可以画：

- 父入口如何进入 `Step1`
- `Step1` 如何渲染字段组件
- 字段组件如何把跨字段事件回传给 `Step1`
- `Step1` 内部如何进入提交判断

不要画：

- `Step1` 保存成功后外层 `create/index.vue` 怎么切到 `Step2`
- 外层页面如何处理后续步骤
- 当前范围之外的刷新、跳转和缓存细节

这些属于上层流程图或完整 create 页面图。局部图只保留必要入口，不把结果线再拉回外层页面，避免一张局部图变成全页面流程图。

## 节点命名

Mermaid 源码里的节点名要尽量接近源码文件名，方便从图回到代码。

推荐：

```mermaid
flowchart TD
    BlockFormVue["BlockForm.vue"]
    FormItemDataNumVue["FormItemDataNum.vue"]
    UseNumberDeliveryRecordJs[("useNumberDeliveryRecord.js")]
    IndexVueRecordJudge{"index.vue 数据判断"}
```

避免：

```mermaid
flowchart TD
    a["BlockForm.vue"]
    node1["FormItemDataNum.vue"]
    form["BlockForm.vue"]
    check{"判断"}
```

判断节点可以带所属组件前缀，例如：

- `IndexVueRecordJudge`
- `BlockFormSubmitJudge`
- `BlockFormSaveApiFlow`

## 粒度控制

架构图只保留会影响架构判断的信息。

复杂模块组件多时，图变大是可以接受的。画架构图的目的就是把复杂组件关系说明白；组件少、关系简单的模块本来就不一定需要画图。

如果一个页面由多个 Tab / Step / Block 组成，优先以当前要说明的 Tab / Step / Block 为起点画局部图，而不是默认从整个页面入口画到底。只有当目标是说明完整页面流程时，才画完整页面图。

应该写：

- `FormItemDataNum.vue` 读取 `pro_recordForm.dataNum` 作为默认值
- `FormItemDataNum.vue` 注册 `FormItem` 并返回字段片段
- `BlockForm.vue` 提交前统一 `validate`，再显式拼 `params`
- `FormItemAdvanceReason.vue` 接收 `FormItemServiceTime.vue` 的 QlmForm update 后自行决定显示和校验

不应该写：

- 交付时间用的是 `el-date-picker`
- 上传按钮隐藏规则
- textarea 限制 50 字
- 某个 class 的宽度和间距

这些属于组件内部实现，留在组件源码或局部 README 里即可。

## 推荐模板

```mermaid
flowchart TD
    PageVue["<h2>Page.vue</h2><fieldset><legend>组件概览</legend><ul><li>页面入口组件</li><li>渲染业务区块</li></ul></fieldset>"]

    UsePageContextJs[("<h2>usePageContext.js</h2><fieldset><legend>输出数据</legend><ul><li>detail</li><li>loading</li></ul></fieldset><fieldset><legend>输出方法</legend><ul><li>loadDetail(id)</li><li>close(action)</li></ul></fieldset>")]

    PageStateJudge{"<h2>Page.vue 数据判断</h2><fieldset><legend>【usePageContext.js】</legend><ul><li>id 为空：新建</li><li>id 存在：loadDetail(id)</li><li>拿到 status / logList</li></ul></fieldset>"}

    Controller[["<h2>【QlmForm】</h2><fieldset><legend>事件架构</legend><ul><li>创建 controller</li><li>协调 item 注册</li><li>统一 validate / getSubmitValue</li></ul></fieldset>"]]

    BlockFormVue["<h2>BlockForm.vue</h2><fieldset><legend>组件概览</legend><ul><li>表单填写区组件</li></ul></fieldset><fieldset><legend>【usePageContext.js】</legend><ul><li>读取详情作为只读回显源</li></ul></fieldset><fieldset><legend>【QlmForm】</legend><ul><li>创建 controller</li><li>收集 item 提交值</li></ul></fieldset>"]

    FormItemA["<h2>FormItemA.vue</h2><fieldset><legend>组件概览</legend><ul><li>A 字段组件</li></ul></fieldset><fieldset><legend>【QlmForm】</legend><ul><li>注册 FormItem</li><li>贡献 A 字段</li></ul></fieldset>"]

    FormItemB["<h2>FormItemB.vue</h2><fieldset><legend>组件概览</legend><ul><li>B 字段组件</li></ul></fieldset><fieldset><legend>【QlmForm】</legend><ul><li>注册 FormItem</li><li>贡献 B 字段</li></ul></fieldset><fieldset><legend>【QlmForm-update：FormItemA.vue】</legend><ul><li>接收 A 字段 update 后自行决定显示、隐藏或校验策略</li></ul></fieldset>"]

    BlockViewVue["<h2>BlockView.vue</h2><fieldset><legend>组件概览</legend><ul><li>只读展示组件</li></ul></fieldset><fieldset><legend>【usePageContext.js】</legend><ul><li>读取详情并只读展示</li></ul></fieldset>"]

    UsePageContextJs -->|provide 注入起点| PageVue
    PageVue -->|进入数据判断| PageStateJudge
    PageStateJudge -->|新建 / 可编辑| BlockFormVue
    PageStateJudge -->|只读状态| BlockViewVue
    Controller -->|controller 架构来源| BlockFormVue
    BlockFormVue -->|字段组件| FormItemA
    BlockFormVue -->|字段组件| FormItemB
```

## 判断清单

画图前先过一遍：

- 方块是不是都是真组件？
- 组件图主结构是不是优先表达代码文件嵌套？
- 每个 Vue 组件节点的第一个模块是不是 `组件概览`？
- `组件概览` 第一条有没有说清这个组件是干什么的？
- 判断是不是合并到了少量菱形里？
- 简单条件是不是写在线上，而不是单独画菱形？
- `useXxx.js` 是否用圆柱，并且只连到 provide 起点？
- `QlmForm / QlmSearch` 是否用双边框，并且只连到引入 controller 的组件？
- FormItem 自身注册逻辑是否写在 `【QlmForm】` 模块？
- 接收其他 FormItem update 的逻辑是否单独写在 `【QlmForm-update：来源组件】` 模块？
- 跨组件 update 有没有避免画成错误的父子层级？
- 图里有没有提前发明未来实现变量名？
- 图里有没有塞进本该留给组件源码的 UI 细节？
- Mermaid 节点名是否接近源码文件名？

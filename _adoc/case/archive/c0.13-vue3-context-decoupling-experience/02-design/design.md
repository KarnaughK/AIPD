# Design：Vue3 上下文解耦实践经验与 AipdModalBox 迁移

## Design Intake

- Case 类型：research-to-implementation + docs / process + 小范围 frontend refactor。
- Design 模式：frontend-first。
- 当前节点：Design Readiness Gate。
- 节点状态：passed。
- 停止点：已形成可执行文件边界和两个 work package；按 Case Contract 的自主推进授权进入 Execute。

## Requirements Status

### Confirmed

- 从真实 Vue3 后台项目提炼经验，Vue3 和 Nuxt 前端都应能命中。
- ModalBox、provider/inject、QlmForm、QlmSearch 必须进入正式经验。
- 页面架构图作为经验保留，但详细规则已有事实源时只建立索引。
- 扫描 L5 并给出额外候选结论。
- `QlmModalBox` 改为 `AipdModalBox`，补充描述和真实案例。

### Assumed

- 用户口述的 “AIPD model box” 按现有组件语义解释为 `AipdModalBox`；Modal 是弹框 / 抽屉领域词，Model 会造成含义错误。
- 旧 barrel 兼容层保留一段迁移期，不妨碍 canonical 新名生效。

### Open

- 无阻塞级 open question。

## Brownfield Delta

### 目标项目

- ADDED：`src/components/AipdModalBox/` canonical 目录及局部说明。
- MODIFIED：活跃源码 import、public API、内部组件名 / 样式名和活跃文档索引改为 `Aipd*`。
- MODIFIED：`src/components/QlmModalBox/index.js` 收缩为 deprecated compatibility facade。
- PRESERVED：ModalBox 的 Promise / callback、appContext、controller 和 DOM 生命周期行为。
- PRESERVED：归档 case 中的历史名称；不机械篡改历史过程事实。

### AIPD 源项目

- ADDED：五条 Vue3 实践经验正文。
- MODIFIED：统一实践经验索引，增加 Vue3 / Nuxt 前端命中入口。
- PRESERVED：已有 `vue-architecture-diagram-guide.md` 作为详细画图事实源，不复制其模板。

## Frontend / State Design

### AipdModalBox

- canonical factory 继续负责运行时独立挂载、主应用 appContext 继承、Promise / callback 回传和卸载。
- 内容组件仍通过 `pro_controller` 与浮层 owner 协作；该命名表达 provider 来源，不需要品牌迁移。
- public API 迁移为 `AipdBaseElDialog`、`AipdBaseElDrawer`、`useAipdModalBox`、`AipdDialogHeader`、`AipdDrawerHeader`。
- 旧 public API 只在兼容 facade 中以 alias 暴露，不继续作为新代码示例。
- 不在本次改名中顺手重构注入 key、原生关闭协议或 update 机制；这些作为风险写入经验。

### 正式经验条目

1. `vue3-local-context-component-autonomy.md`
   - 普通 provide / inject、`pro_` 来源命名、props / emits / Pinia 边界、组件自治和事实通知。
2. `vue3-aipd-modal-box.md`
   - 运行时独立挂载、appContext、内容 controller、结果回传、真实案例和未验证边界。
3. `vue3-aipd-form-page-controller.md`
   - 复杂表单页面 / 弹框、FormItem 自治、统一校验取值、事实 update、页面 DTO 边界。
4. `vue3-aipd-search-page-controller.md`
   - 复杂检索页、Filter 自治、Pagination、异步 init、页面显式查询和风险。
5. `vue3-page-local-cognition-map.md`
   - README / `_map.md` + 架构图的复杂度触发条件、Design 到 L6 落位、维护责任和 AIPD 指南索引。

## Context Boundary

- 经验条目保留框架名、API 形状、目录关系、使用规模、失败风险和最终取舍；清除外部项目绝对路径及业务私有名词。
- 真实案例只描述场景类型，不在正式经验中写外部项目本机路径；case Think 证据保留本地定位。
- 五条经验各自按读取时机独立，避免未来仅需要 QlmSearch 时加载整套 Vue3 长文。
- 组件自治作为 provider、Form、Search、ModalBox 的共同上位原则，但只在第一条完整解释，其余条目建立关联。
- 页面架构图经验不复制 Mermaid 节点语法；详细画法始终回到 `aipd-skill/src/core/L5-dev/vue-architecture-diagram-guide.md`。

## 设计护栏

- 不把 provide / inject 写成 props / emits 的绝对替代。
- 不把 Drawer 和 ModalBox update 写成已被真实项目验证的成熟能力。
- 不把 QlmForm controller 变成业务 DTO assembler。
- 不把 QlmSearch controller 变成统一拼参黑箱。
- 不要求简单页面或每个 `index.vue` 机械创建架构图。
- 不修改归档 case 来伪装历史名称一直是 AipdModalBox。
- 不借品牌迁移改变浮层运行时行为。

## Work Package Draft

### WP-01：AipdModalBox canonical 迁移

- 目标：完成目标项目目录 / API / 活跃引用迁移，保留薄兼容层，新增可执行说明和案例。
- 边界：目标项目 `src/components/AipdModalBox/`、兼容 facade、运行时代码与活跃局部文档。
- 验收：生产构建通过；新代码无旧 import；旧目录只剩预期 facade；归档历史不改。

### WP-02：Vue3 实践经验库回流

- 目标：新增五条具象经验并更新统一索引。
- 边界：AIPD `aipd-skill/src/core/experience/`。
- 验收：每条有来源、场景、真实机制、边界、风险、借鉴方式；Vue3 / Nuxt 可索引命中；AIPD build 通过。

## Readiness Gate

- 阻塞级 open requirement：无。
- Brownfield delta：已明确。
- 运行时兼容护栏：已明确。
- 文件边界：已明确。
- 经验隐私与抽象边界：已明确。
- Verify 入口：引用扫描、目标项目生产构建、AIPD build、case 验收清单。
- 结论：passed。

## Latest Checkpoint

- 用户已预授权跨 phase 连续推进。
- Think 证据已收口，Design 不需要回跳。
- 下一步：创建 WP-01 / WP-02，进入 Execute。
- 压缩后恢复入口：`case.md` -> 本文件 -> `03-execute/execute.md` -> 当前 work package。

## 2026-07-15 Reopen：源码资产层

### Reopen 原因

第一次 Verify 只证明目标项目迁移和文字经验准确，没有证明实现型经验附带可直接阅读、复制和验证的源码。用户指出：如果消费方只能根据 MD 重写 controller，真实实现中的生命周期、错误处理和适配细节仍会丢失。因此原 Close 不满足扩展后的 Case Contract。

### 资产边界

- 根目录新增 `experience-assets/`，与 `aipd-skill/` 平级。
- `aipd-skill/src/core/experience/` 继续保存会被 Skill 注入的语义经验，只引用资产，不复制完整源码。
- 当前 build 只从 `aipd-skill/src/skills/` 和 `aipd-skill/src/core/` 选择性复制；根级资产不会进入 `aipd-skill/dist` 或安装产物。
- GitHub latest 入口使用默认分支 `main`；不可变引用格式使用完整 commit SHA 占位规则。资产尚未提交时不写一个实际不存在的 pinned SHA。

### 目录设计

```text
experience-assets/
├── README.md
└── vue3-context-decoupling/
    ├── README.md
    ├── SOURCE.md
    ├── LICENSE.md
    ├── package.json
    ├── src/
    │   ├── aipd-modal-box/
    │   ├── aipd-form/
    │   └── aipd-search/
    ├── examples/
    └── test/
```

### 实现设计

#### AipdModalBox

- 用导出的 `Symbol` 提供 controller，缺少 provider 时 fail-fast。
- 由资产内部显式保存 app context，Vite 在插件安装后注册 `app._context`；Nuxt 通过 `.client.ts` plugin 注册 `nuxtApp.vueApp._context`。
- Dialog / Drawer 共用一套 overlay session，统一 Promise / callback、update、close、原生关闭结算、重复 close 幂等和 DOM 卸载协议。
- Element Plus 只作为适配器依赖；浏览器 DOM 检查、主应用上下文继承和配置覆盖顺序写进源码，不再依赖目标项目 `@/appContext`、全局工具类或自动图标导入。

#### AipdForm

- 纯 JavaScript `AipdFormController` / `AipdFormItem` 承担注册、注销、统一校验、取值、事实 update 和清理。
- Vue context helper 负责 provide / inject 和 mounted / beforeUnmount 生命周期绑定；item 的业务状态仍留在字段组件内。
- 页面层必须显式拼业务 DTO，controller 不理解接口字段。

#### AipdSearch

- 纯 JavaScript `AipdSearchController` / `AipdSearchFilter` / `AipdSearchPagination` 承担搜索会话。
- 增加 filter 注销、可 await 初始化、初始化错误传播和明确的分页触发协议；消除原实现循环 import 和返回 `Error` 而不抛出的缺陷。
- Vue context helper 用 Symbol 隔离页面 / Tab 搜索会话，动态 filter 自动注销。

### 来源与授权

- 资产是基于用户指定机制重新整理的 AIPD canonical 参考实现，不直接复制业务 Dialog、业务数据、私有路径、品牌素材和项目工具类。
- `SOURCE.md` 记录来源性质、重写范围与未复制内容。
- 当前 AIPD 仓库没有顶级许可证；本 case 不擅自代表仓库所有者授予新开源许可证。`LICENSE.md` 明确“当前仅按仓库可见参考，公开再分发 / 复用许可证待仓库所有者选择”，避免把 GitHub 可见错误解释为已授权。

### 品牌迁移

- AIPD 自有正式实现和文档统一使用 `AipdModalBox`、`AipdForm`、`AipdSearch`。
- 文件名、标题、示例、架构图图例、Agent 指南和 experience 索引同步迁移。
- c0.13 的来源审计、迁移说明和目标业务项目真实路径可保留旧名，因为它们描述历史事实；正式消费入口不得再要求读者使用旧品牌。

### 新 Work Package

#### WP-03：非打包 Vue3 源码资产

- 目标：实现三套 portable reference source、示例、来源 / 许可边界和无第三方安装即可执行的核心测试。
- 验收：核心测试通过；所有 JS 通过语法检查；README 给出 Vite / Nuxt 适配；源码中无目标项目私有路径或旧品牌。

#### WP-04：经验引用与 AIPD 品牌迁移

- 目标：正式经验、索引、Vue 架构图指南和相关 Agent / Learn 规则改为 Aipd canonical，并声明代码实践经验的附带资产协议。
- 验收：正式面 `QLM|Qlm` 扫描仅剩显式来源 / 历史说明；本地和 GitHub 引用规则一致；AIPD build 通过且 dist 不含源码资产。

### Reopen Readiness Gate

- 资产目录与 Skill 打包边界：明确。
- 三套实现的 portable boundary：明确。
- Vite / Nuxt 适配责任：明确。
- 来源与许可证风险：明确，不擅自授权。
- 品牌迁移范围：明确。
- 自动验证入口：明确。
- 结论：passed，进入 Execute。

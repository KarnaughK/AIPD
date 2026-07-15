# AIPD 实践经验库索引

实践经验库保存真实项目里已经跑过的具象经验。它不是抽象规则库，也不是 case 执行记录。

抽象规则回答“原则是什么”；实践经验回答“这个原则在某个技术栈、领域或信息获取场景里实际长什么样”。因此实践经验默认保留必要的技术栈名称、目录结构、框架机制、失败路径和最终取舍，只做隐私清理和结构化整理，不二次抽象成通用原则。

## 使用方式

AI 运行仍按 case 流程推进：Think -> Design -> Execute -> Verify -> Close。

实践经验是另一条上下文维度。进入某个 case 阶段后，先看本索引中是否有和当前阶段、技术栈、领域或任务类型匹配的经验；命中后读取对应正文。不要为每个阶段单独维护一份经验索引。

代码实践经验如果只靠文字会丢失关键实现细节，可以声明仓库级源码资产。源码资产放在 AIPD 仓库根级 `experience-assets/`，不进入 Skill build / install；经验正文同时给出资产路径、远端发布状态和 commit-pinned 规则。在许可证允许的范围内优先读取或复制已验证源码，不根据 Markdown 从零重写 controller。

## 经验列表

| 经验 | 适用阶段 | 类型 | 技术栈 / 领域 | 什么时候读 | 正文 |
|---|---|---|---|---|---|
| Nuxt 后端上下文解耦 | Design | 代码实践经验 | Nuxt / 后端 / API / 上下文解耦 | 设计 Nuxt 后端目录、API handler、route scanner、业务 context、shared 上移条件时 | `experience/nuxt-backend-context-decoupling.md` |
| Vue3 局部上下文与组件自治 | Design / Execute | 代码实践经验 | Vue3 / Nuxt 前端 / provide / inject / 组件自治 | 复杂页面、弹框、抽屉、Tab 或 Step 需要选择 props / emits、provide / inject、Pinia，并设计事实通知时 | `experience/vue3-local-context-component-autonomy.md` |
| Vue3 AipdModalBox 上下文解耦浮层 | Design / Execute | 代码实践经验 | Vue3 / Nuxt 前端 / Dialog / Drawer / 运行时挂载 | 复杂浮层需要按需创建、独立上下文、结果回传、关闭销毁或被多个入口复用时 | `experience/vue3-aipd-modal-box.md` |
| Vue3 AipdForm 页面级 Controller | Design / Execute | 代码实践经验 | Vue3 / Nuxt 前端 / 复杂表单 / Controller | 复杂表单页面或弹框需要 FormItem 自治、统一校验取值和跨字段事实通知时 | `experience/vue3-aipd-form-page-controller.md` |
| Vue3 AipdSearch 复杂检索页 | Design / Execute | 代码实践经验 | Vue3 / Nuxt 前端 / 搜索 / Filter / Pagination | 多筛选项、分页、异步初始化、Tab 搜索会话或弹框后原位刷新使检索页开始膨胀时 | `experience/vue3-aipd-search-page-controller.md` |
| Vue3 复杂页面局部认知入口与架构图 | Design / Execute / Verify | 代码认知经验 | Vue3 / Nuxt 前端 / README / Mermaid / L6 | 复杂页面、弹框、Tab、Step 或多组件区块需要用局部入口和架构图承接设计与代码理解时 | `experience/vue3-page-local-cognition-map.md` |
| 部署型 SEO 网站 Close 检查 | Verify / Close | 部署验收经验 | SEO 网站 / 上线部署 / 域名切换 | case 涉及上线部署，且目标是 SEO 网站、内容站、工具站或游戏站时 | `experience/deployment-seo-site-close-checklist.md` |

## 经验分类

- **代码实践经验**：某个技术栈下的上下文边界、目录结构、框架机制、文件组织、shared 上移条件和真实执行取舍。常在 Design 阶段读取。
- **调研 / 信息获取经验**：SEO、竞品、开源项目、深度搜索、数据接口等用于形成判断依据的经验。常在 Think 阶段读取。
- **部署验收经验**：上线、域名、预发环境、运行时配置、API smoke test、SEO 基础入口和回滚边界等验证经验。常在 Verify / Close 阶段读取。
- **工具 / SOP 经验**：某个经验已经变成可重复执行动作时，应进入 `_adoc/sop/` 或对应 SOP 模板；本索引只保留“什么时候用它”的经验入口。

## 收录原则

- 只收已经经过真实项目实践、真实设计讨论或真实工具使用校准的经验。
- 保留具象上下文，不把经验压缩回抽象原则。
- 不记录外部项目的本机绝对路径、外部 case 文件路径或只在某台机器存在的 transcript 路径；这些路径只属于回流过程，不属于可迁移经验正文。
- 如果一条经验同时产生抽象规则和实践样本，分开处理：抽象规则写入 core / skill 规则，实践样本写入本经验库。
- 如果经验仍属于某个业务项目自己的长期认知，不写进 AIPD 框架经验库，应交给该项目的 `aipd-weave`。
- 实现型经验附带源码时，语义经验留在 `aipd-skill/src/core/experience/`，源码、示例和资产测试放在根级 `experience-assets/`；不得为了方便引用而把整套源码注入 Skill。
- 资产必须声明来源、许可证边界、依赖和验证入口；GitHub 可见不等于已授权复制或再分发。

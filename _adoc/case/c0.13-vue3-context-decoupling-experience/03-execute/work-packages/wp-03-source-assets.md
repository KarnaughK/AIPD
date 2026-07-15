# WP-03：非打包 Vue3 源码资产

## 状态

completed / local

## 目标

在 AIPD 仓库根级建立不随 Skill 打包的实现型经验资产层，提供可阅读、可复制、可验证的 `AipdModalBox`、`AipdForm`、`AipdSearch` canonical 参考源码。

## 上下文

- `case.md`
- `02-design/design.md` 的 Reopen 章节
- `aipd-skill/src/core/experience/vue3-aipd-modal-box.md`
- `aipd-skill/src/core/experience/vue3-aipd-form-page-controller.md`
- `aipd-skill/src/core/experience/vue3-aipd-search-page-controller.md`
- 目标项目三套组件源码，仅作为机制证据，不原样复制业务耦合。

## 文件边界

- `experience-assets/**`
- 本 work package 与 `03-execute/execute.md` 状态记录

## 验收

- [x] 资产总入口、包入口、来源说明和许可证边界齐全。
- [x] 三套源码使用 `Aipd*` canonical 命名，无旧品牌与目标项目私有路径。
- [x] AipdModalBox 处理 app context、Promise / callback、外部关闭、重复关闭、卸载与 SSR 边界。
- [x] AipdForm 处理注册 / 注销、校验归一化、取值、update 与 Vue 生命周期。
- [x] AipdSearch 处理 filter 生命周期、异步 init、分页重置 / 保持和搜索错误传播。
- [x] Vite Vue3 与 Nuxt 客户端适配示例清晰。
- [x] 核心测试、Vue runtime 测试、Vite smoke 与 JS 语法检查通过。
- [x] 仓库级统一验证器覆盖 manifest、必需文件、经验引用、发布状态、品牌、依赖审计、Skill build 和 dist 隔离。

## 执行记录

- 2026-07-15：进入执行；采用 clean reference implementation，不复制目标项目业务代码与私有样式。
- 2026-07-15：完成 16 项 core tests、3 项 Vue runtime tests、Vite public barrel / SFC smoke；修正独立复核发现的校验、关闭清理、SSR 注册、分页和初始化问题。
- 2026-07-15：`npm audit` 发现 Vite 6.4.1 high advisory，非破坏升级到 6.4.3 后 audit 为 0。
- 2026-07-15：新增 `experience-assets/scripts/verify-assets.mjs`；`--full` 模式实际通过 19 项测试、Vite smoke、0 漏洞审计和双平台 Skill build。

# Close：Vue3 上下文解耦实践经验

## Close Result

**superseded / reopened**。

本文件以下内容是第一次 Close 的历史快照。2026-07-15 用户指出实现型经验缺少附带源码后，Case 已恢复到 Execute / Verify；当前事实以 `case.md` 和 `04-verify/verify.md` 的 “Reopen Verify” 为准。不得再用本快照判断 Case 已归档。

本 case 已完成从真实项目证据审计、经验设计、AipdModalBox 命名迁移、五条实践经验回流、两仓构建、独立复核到修正复验的完整闭环。

## Case Contract 达成情况

- AipdModalBox：已完成 canonical 迁移、兼容 facade、活跃引用与描述更新。
- provider / inject：已形成“局部上下文 + 组件自治”经验，并校准 props / emits / Pinia 边界。
- QlmForm：已形成复杂表单页面 / 弹框的页面级 controller 经验。
- QlmSearch：已形成复杂检索页的 Filter / Pagination / init / search session 经验。
- 页面架构图：已形成局部认知入口经验，详细画法索引 AIPD 唯一指南。
- L5 补充扫描：组件自治与事实通知已吸收；其他候选已分类。

## Work Packages

- WP-01：completed。目标项目生产构建两次通过；独立复核发现的全局 Dialog selector 遗漏已修复。
- WP-02：completed。AIPD build 两次通过；QlmForm 示例与统计口径已按独立复核修正。

## 长期认知审计

### 已回写

- AIPD 实践经验库新增五条 Vue3 / Nuxt 前端经验并更新统一索引。
- 目标项目 canonical AipdModalBox README 已包含真实机制、调用协议、案例和边界。
- 目标项目活跃 `_adoc/map.md`、兼容 context map、L4 / L5 入口和代码就近 README / MMD 已迁移到 AipdModalBox 新名。

### 无需再 weave

- 本 case 的稳定 AIPD 框架经验已由 `aipd-learn` 直接进入实践经验库。
- 目标项目自身的活跃长期认知和局部入口已随改名同步，不存在仍保留旧 canonical 入口的知识缺口。

### 仅留 case

- 目标项目扫描数量、具体证据路径、独立复核过程和验证命令属于本次回流证据，不进入 L1-L5 正文。
- 归档 case 中的旧 QlmModalBox 名称保留为历史事实，没有机械改写。

### 延后候选

- Vue3 SCSS：可搜索类名、简化 BEM、布局贴近 template。
- mock-first 页面交付：接口未完成时先稳定页面结构和交互契约。
- 若依 Vue3 专题：字典、路由、菜单与权限。
- 轻量 API facade：项目约定较强，需更多跨项目证据后再决定是否进入通用经验。

这些候选不影响本 case 完成；如要沉淀，应另开 case，避免把本次明确的上下文解耦主题继续膨胀。

## 验证摘要

- 目标项目：`npm run build:prod` 两次通过，Vite 6.4.1，3264 modules transformed。
- AIPD：`./aipd-skill/scripts/build` 两次通过，Claude / Codex 各 9 个 skill，Codex Agent 模板生成成功。
- Codex / Claude 的 `aipd-case` 与 `aipd-learn` 构建产物均包含五条经验和新索引。
- 旧名扫描、JS syntax check、隐私扫描和两仓 `git diff --check` 通过。
- 独立复核发现的三项问题已修正并回查关闭。

## 残留风险

- 没有在浏览器中逐个点击全部真实 Dialog；生产构建与静态验证通过，合并后可优先冒烟 Promise、callback 和复杂 QlmForm 弹框。
- Drawer 与 ModalBox update 仍缺真实正向案例，经验已明确标注。
- AIPD 只 build，未 install；需要用户显式确认后才能改写运行环境。

## Archive 决策

- 移动前引用检查只命中 case 自身和 `_adoc/case/index.md`，没有外部 case、L3 / L4 / L5、README 或 SOP 引用。
- 可以安全移动到 `_adoc/case/archive/c0.13-vue3-context-decoupling-experience/`。
- 不执行 git add、commit、merge 或 push。

## Reopen publication gate

- 本地源码资产、AIPD 品牌迁移、19 项 core / Vue runtime 测试、Vite smoke、AIPD build 和 dist 隔离已经完成。
- 重新 Close 前只剩需要用户权限的发布决定：公开许可证；隔离 commit / push；远端 latest / pinned 实测。
- AIPD install 是独立可选动作，不影响源码资产本地验收，但仍只能在用户明确确认后执行。

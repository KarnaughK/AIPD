# Verify：Vue3 上下文解耦实践经验

## 当前 Verify Result

**local gates passed，publication in progress**。第一次 Verify 的代码与经验验收仍然有效，但后续因“实现型经验缺少可复用源码资产”而重开；当前结论以文末 `Reopen Verify` 为准。用户已授权 WP-05，发布完成后返回本 phase 做远端验收。

## 第一次 Verify Result（已被 Reopen Verify 覆盖）

**当时 passed**。首轮 Verify 后增加独立复核，发现三项问题并回跳 Execute 修正；当时的 Case Contract、两个 work package 和 Design Guardrails 均已满足，因此进入过第一次 Close。该结论不包含后来新增的源码资产与发布验收，不能作为当前 Close 依据。

## Case Contract 验收

- [x] ModalBox 已找到多个真实使用案例，记录了运行时独立挂载、appContext、controller、Promise / callback 和销毁机制。
- [x] `QlmModalBox` 已迁移为 canonical `AipdModalBox`；运行时代码和活跃文档使用新入口，旧目录仅保留单文件 alias facade。
- [x] provider 经验明确 props / emits、provide / inject、Pinia、列表项和局部上下文边界。
- [x] QlmForm 经验覆盖复杂表单页面、复杂表单弹框、FormItem 生命周期、统一校验取值、事实通知和页面 DTO 边界。
- [x] QlmSearch 经验覆盖复杂检索页、Filter 自治、Pagination、异步 init、Tab 搜索会话和 API 并发风险。
- [x] 页面架构图经验说明复杂度触发、Design 草图到 L6 落位、README / `_map.md` 索引和维护触发，并链接唯一详细指南。
- [x] 目标项目 L5 已扫描；“组件自治 + 事实通知”并入本次正式经验，SCSS、mock-first、若依字典 / 路由等列为后续候选。
- [x] 实践经验索引已新增五条 Vue3 / Nuxt 前端入口。
- [x] 目标项目生产构建与 AIPD build 均通过。

## Work Package 验收

### WP-01

- 新 canonical 和 compatibility facade：通过。
- 活跃源码 / 文档迁移：通过。
- 旧名扫描：运行时代码仅 facade 保留预期 aliases；活跃文档仅 canonical README 迁移说明保留旧路径。
- JS syntax check：canonical factory、barrel、hook 和 facade 均通过 `node --check`。
- 生产构建：Vite 6.4.1，3264 modules transformed，exit code 0。
- diff whitespace：`git diff --check` 通过。
- 独立复核修正：全局 `.QlmElDialog` selector 已迁移为 `.AipdElDialog`，factory class 与完整 Dialog 布局样式重新一致。

### WP-02

- 五条正文结构：通过，均包含来源、场景、Nuxt 借鉴和不做边界。
- 隐私清理：通过，正式经验中没有外部项目绝对路径或目录名。
- 经验索引：通过，阶段 / 类型 / 领域 / 读取时机 / 正文路径齐全。
- 构建注入：Codex / Claude 的 `aipd-case`、`aipd-learn` 均包含五条正文和索引。
- AIPD build：exit code 0。
- 独立复核修正：QlmForm 示例已检查 `validateResult.valid` 并 `await getSubmitValue()`；FormItem 使用规模已明确 demo 例外。

## Design Guardrails

- [x] 没有把 provide / inject 写成 props / emits 的绝对替代。
- [x] 没有把 Drawer、ModalBox update 写成已验证成熟能力。
- [x] QlmForm controller 保持业务无知，DTO 仍由页面 owner 显式拼装。
- [x] QlmSearch controller 没有接管任意 API DTO。
- [x] 没有要求每个 `index.vue` 机械创建架构图。
- [x] 没有改写目标项目归档 case 的历史名称。
- [x] AipdModalBox 迁移没有改变浮层运行时协议。

## 残留风险

- 没有浏览器端逐个点击 26 个真实 Dialog；生产构建、引用扫描和关键语法检查已通过。首次合并后可优先人工冒烟 Promise 返回、callback 刷新和带 QlmForm 的复杂弹框。
- Drawer 和 `controller.update` 缺真实使用证据，已在 README 与经验中明确标记。
- compatibility facade 没有被当前活跃源码引用，因此生产构建不会自然覆盖旧 import 路径；已做语法、相对路径和 alias 内容检查。
- AIPD build 已完成但未执行 install；遵守 install 需要用户显式确认的边界。

## 独立复核

- 首轮结论：不建议 Close；发现 Dialog 全局样式回归、QlmForm 示例 contract 错误和 FormItem 统计夸大。
- 修正：三项均在原 work package 内定点修复，两仓重新 build。
- 回查结论：三项真正关闭，两仓 `diff --check` 通过，可以 Close。

## 用户验收状态

- 用户已在 Case Contract 创建时明确授权持续推进到完成，并允许跨 phase 自动推进。
- 本轮按该授权完成客观验收；最终交付时仍需向用户说明 residual risks 和是否安装。

## Close 归档候选

- 五条经验已直接进入 AIPD 实践经验库，不需要再 weave 到 L3 / L4 / L5。
- 目标项目 AipdModalBox README、活跃 map / L4 / L5 和局部 MMD 已同步，不再产生额外项目知识回写候选。
- 后续候选：Vue3 SCSS 可搜索类名、mock-first 页面交付、若依字典 / 路由 / 菜单权限，应另开 case，不并入本 case。

---

## Reopen Verify：源码资产与 AIPD 品牌迁移

### 当前结论

**local gates passed，publication in progress**。

第一次 Close 被撤销后新增的 WP-03 / WP-04 已完成本地实现和两轮独立复核回跳。2026-07-15 13:46 CST 用户已授权发布；当前回跳 Execute 执行 WP-05，完成后返回本节验证真实 latest / pinned 地址。

### Reopen Contract 验收

- [x] 根级 `experience-assets/` 有总入口、asset manifest、包 README、SOURCE、LICENSE 边界、源码、示例、测试和 package lock。
- [x] `AipdModalBox` 提供 app context fail-fast、Symbol controller、显式 show options、Promise / callback、原生关闭结算、重复关闭幂等、首次 render 失败清理和 SSR DOM 护栏。
- [x] `AipdForm` 提供纯 controller / item、Symbol context、setup 同步注册、scope dispose、校验归一化、显式逐 item 提交值和事实 update。
- [x] `AipdSearch` 提供 Filter / Pagination / Controller、Symbol context、scope dispose、可 await init、并发初始化幂等、错误传播和异步分页语义。
- [x] Vite Vue3 与 Nuxt client plugin / SSR 边界有接入说明；来源验证、AIPD core / runtime 验证和未验证浏览器边界已分层。
- [x] 三条实现型经验给出本地源码、总览、示例、测试、来源 / 权限、远端未发布状态、latest 模板和 pinned 规则。
- [x] AIPD 正式经验、指南、索引、Agent / Learn 规则和附带资产无旧品牌残留；case / Inbox 来源历史保留事实。
- [x] `aipd-learn` 已把“实现型经验附带非 Skill 打包源码资产”固化为通用回流规则。
- [x] 根 README、`_adoc/map.md`、L5 已增加源码资产入口和 build 边界。
- [x] 发布继续维持 owner / authorized-only 状态，不擅自授予公开复用许可证。
- [ ] 用户授权隔离 commit / push 后，实测 GitHub latest 并用真实 SHA 更新 pinned 引用。

### 自动验证证据

- `npm run verify:full`：通过。
  - core tests：16 / 16。
  - Vue runtime tests：3 / 3。
  - Vite 6.4.3 public barrel + 三个 SFC examples production smoke：通过，25 modules transformed。
- `npm audit --audit-level=high`：0 vulnerabilities。初始 Vite 6.4.1 advisory 已通过同 major patch 6.4.3 修复。
- `./aipd-skill/scripts/build`：Claude 9 skills、Codex 9 skills，均通过。
- 品牌扫描：排除 case / Inbox 来源历史后，正式面与 dist 的 `QLM|Qlm` 为 0。
- 本地路径扫描：正式经验声明的 `experience-assets/` 路径全部存在。
- dist 隔离：无 `experience-assets` 目录；无 `AipdOverlay` / `AipdFormController` / `AipdSearchController` 源码内容；资产与 dist 文件 SHA-256 无交集。
- `git diff --check`：通过。
- `node experience-assets/scripts/verify-assets.mjs --full`：作为仓库级统一入口新增并实际通过；覆盖 manifest、必需文件、经验引用、本地路径、发布状态、品牌、19 项资产测试、依赖审计、AIPD build 和 dist 隔离。
- 来源项目 `npm run build:prod`：重新运行通过；Vite 6.4.1，3264 modules transformed，exit code 0。

### 独立复核回跳

第一次复核发现并已修正：

- 校验结果含 errors / fields 但未显式 `valid:false` 时错误放行。
- close callback 抛错阻断浮层隐藏 / cleanup。
- app context 文档要求与实现静默降级冲突。
- Form / Search mounted 注册使 SSR controller 为空。
- 异步分页重置未 await、初始化重复执行。
- 首次 render 抛错可能遗留挂载点。
- ModalBox 重载签名歧义。
- Form / Search 示例校验与错误处理不闭环。
- 来源生产验证与 AIPD 重写验证混写。
- 未发布 GitHub 模板、许可证动作与“可复制”表述冲突。

所有代码问题均有回归测试或可重复编译 smoke；文档问题已通过正式面扫描和路径检查重验。

最终独立回查：未发现仍存在的确定性本地阻塞 bug；同步 initializer 失败重试、destroy / onClosed 结算顺序和异步 pagination reset 三个末轮边缘态也已通过回归测试。代码与文档可以进入发布授权门。

### 保留风险

- Element Plus Dialog / Drawer 动画、Teleport、遮罩、ESC、Router / Pinia 插件行为尚未做真实浏览器自动化；已明确要求消费项目冒烟。Drawer 来源侧也无真实业务案例。
- Nuxt client plugin / hydration / request context 未建独立 Nuxt fixture；当前只验证 Vue app-level provide 继承和 SSR-safe scope 注册机制。
- 首个完整源码资产提交已发布，pinned tree、源码与测试均实测可访问；默认分支 latest 待合并后验证。
- 仓库顶级没有已确认的公共许可证；本 case 不擅自创建 MIT / Apache 授权。
- AIPD build 后未 install；仍需用户显式确认。

### 下一步

1. 提交包含真实 pinned SHA 的发布元数据。
2. 合并默认分支并实测 latest URL。
3. 回到 Verify 更新本节为 passed，重新 Close 并归档。

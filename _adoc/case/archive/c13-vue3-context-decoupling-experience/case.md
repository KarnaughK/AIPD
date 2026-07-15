# Case: c13-vue3-context-decoupling-experience

> **本次事项目标**：从 CaiShen Vue3 后台项目提炼可供 Vue3 与 Nuxt 前端复用的上下文解耦实践经验，并完成 ModalBox 命名迁移与必要说明补充。
> **当前 Phase**：Close（completed）

## Case Contract

### 目标

- 基于真实项目 `/Users/yangzongru/Desktop/qianlima/2026/CaiShen-vue3-ruoyi`，提炼一条或多条 Vue3 前端实践经验。
- 经验必须至少覆盖：上下文解耦弹框 / 抽屉、provide / inject、QlmForm、QlmSearch、页面架构图。
- 经验适用于 Vue3 前端，并保证 Nuxt 项目开发 Vue3 前端时能通过索引命中和参考。
- 扫描目标项目 `_adoc/L5-dev/`，发现并评估用户未点名但值得进入 AIPD 实践经验库的候选。
- 将目标项目的 `QlmModalBox` 改名为 `AipdModalBox`，同步必要引用、案例和组件描述。
- 为实现型经验建立不随 Skill 打包、可在 AIPD GitHub 仓库直接阅读和版本化引用的源码资产层。
- 提炼可移植的 `AipdModalBox`、`AipdForm`、`AipdSearch` 参考实现、示例与验证入口，避免使用者根据文字经验重新猜写关键细节。
- 将 AIPD 自有正式经验、指南、索引和附带源码资产中的 `QLM` / `Qlm` 品牌迁移为 `AIPD` / `Aipd`。

### 已确认边界

- 用户点名的前四项必须形成正式经验内容，不能只留作候选。
- 页面架构图必须作为经验的一部分处理；若详细画图规则已有单独事实源，经验正文建立索引而不是复制整套规则。
- 经验保留真实 Vue3 技术机制、目录结构、使用方式、失败路径和取舍，不二次压缩为纯抽象原则。
- 允许拆成多条经验；拆分依据是读取时机和执行边界，不是为了数量。
- 目标项目代码修改范围仅限 `QlmModalBox -> AipdModalBox` 命名迁移、相关引用、使用案例与必要说明更新。
- AIPD 仓库只修改本 case、实践经验库及其必要索引；保留工作区已有未提交改动。
- AIPD 仓库内的正式经验、附带源码、示例和活跃指南统一使用 `Aipd*` 命名；原始业务项目仍可作为来源证据，其 `QlmForm` / `QlmSearch` 生产代码不在本轮做全量迁移。
- 源码资产位于 AIPD 仓库、接受 Git 版本控制和 GitHub 浏览，但不复制进 Skill 构建 / 安装产物；Skill 只保留语义经验与资产引用。

### 不做

- 不借本 case 重构目标项目全部 Vue 页面或统一所有历史命名。
- 不把目标项目私有业务规则、绝对路径或一次性 case 过程写入正式经验正文。
- 不把 provide / inject 推成所有父子通信的绝对替代；需要从真实代码中校准列表、浅层 props / emits 与页面级上下文的边界。
- 不自动执行 AIPD 用户级 / 项目级 install。
- 不提交、不推送两个仓库。
- 不把参考源码伪装成无需判断即可直接发布的 npm 包；它是带依赖声明、适配说明和验证入口的可移植参考实现。
- 不机械改写历史归档 case 中用于说明来源和迁移过程的旧品牌事实。

### 验收标准

- [x] 找到并记录 `QlmModalBox` 的多个真实使用案例、公共协议、弹框 / 抽屉统一方式和上下文解耦机制。
- [x] `QlmModalBox` 已迁移为 `AipdModalBox`，必要引用和文档同步，旧命名无非预期残留。
- [x] provider hook 经验明确 props / emits、provide / inject、列表项通信和页面 / 弹框上下文的适用边界。
- [x] QlmForm 经验说明其如何支撑复杂表单页面和复杂表单弹框，以及它依赖的 controller / provider 协议。
- [x] QlmSearch 经验说明其如何支撑复杂检索页面，以及筛选项自治、参数收集与触发搜索的边界。
- [x] 页面架构图经验说明它作为 L6 代码入口图的价值、存放位置、覆盖要求，并索引到 AIPD 已有 Mermaid / Vue 画图规则。
- [x] 完成目标项目 L5 扫描，给出额外经验候选的收录 / 不收录判断和依据。
- [x] AIPD 实践经验索引能让 Vue3 与 Nuxt 前端任务命中新增经验。
- [x] 对目标项目执行适配其工具链的静态检查、测试或构建；对 AIPD 经验和 case 链接执行一致性检查。
- [x] 根级非打包源码资产目录有清晰边界、总索引、来源 / 许可证说明和版本化引用规则。
- [x] `AipdModalBox` 参考源码携带运行所需依赖或适配器，覆盖打开、关闭、结果返回、应用上下文继承和异常关闭等关键行为。
- [x] `AipdForm`、`AipdSearch` 有可阅读、在授权范围内可复制、可运行验证的参考源码和最小示例，保留组件自治、显式拼参和生命周期注销等关键细节。
- [x] 正式经验文档同时提供仓库内源码入口、远端发布状态与 GitHub 引用规则；使用者无需根据 MD 从零重写核心 controller。
- [x] AIPD 自有正式经验、活跃指南、索引和附带资产中不再出现 `QLM` / `Qlm` 品牌残留；来源证据与迁移历史除外。
- [x] 自动验证证明源码资产通过自身测试，AIPD build 通过，且 `experience-assets/` 没有进入 `aipd-skill/dist` 或安装产物。
- [x] 许可证状态明确并与发布文案一致：继续维持 owner / authorized-only，不因公开可读而擅自授予 MIT / Apache 等公开复用权。
- [x] 已隔离提交 / 推送并通过 PR #1 合入 `main`；GitHub latest 与 commit-pinned 地址均实测 HTTP 200。

### 上下文索引

- AIPD 项目入口：`_adoc/index.md`、`_adoc/map.md`
- AIPD Case：`aipd-skill/src/skills/aipd-case/SKILL.md`、`aipd-skill/src/core/case/overview.md`
- 实践经验库：`aipd-skill/src/core/experience/index.md`
- Vue Agent 规则：`aipd-skill/src/core/agent-guides/aipd_vue_architect.md`
- Provider 规则：`aipd-skill/src/core/agent-guides/aipd_vue_provider.md`
- Vue 架构图规则：`aipd-skill/src/core/L5-dev/vue-architecture-diagram-guide.md`
- 目标项目入口：`/Users/yangzongru/Desktop/qianlima/2026/CaiShen-vue3-ruoyi`
- 必查组件：`src/components/QlmModalBox/`、`src/components/QlmForm/`、`src/components/QlmSearch/`
- 必查规范：`_adoc/L5-dev/dev-conventions/provider-hook.md`、目标项目 `_adoc/L5-dev/`

### 自主推进授权

- 用户于 2026-07-15 明确要求在其休息期间持续推进，并在 07:00 前根据剩余时间继续深挖。
- 本 case 获得跨 Think / Design / Execute / Verify / Close 的连续推进授权，不因常规逐 phase 确认点停住。
- 每次 phase 跳转、工作包执行和重要判断仍必须先写回文件 checkpoint；发现目标边界冲突、破坏性动作或外部副作用时仍停止。

## Case Runtime

### Current Phase

Close（completed）

### Phase State

- Think: completed / 2026-07-15 补充源码资产缺口判断
- Design: completed / reopen Readiness Gate passed
- Execute: WP-01 至 WP-05 completed
- Verify: passed / local and remote publication gates passed
- Close: completed / ready for archive

### 当前焦点

源码资产、经验文档和发布元数据已经由 PR #1 合入 `main`；latest 与 pinned 均已验证可访问。

### 下一步

归档本 case，并把最终归档状态合入 `main`。

### 待确认项

- 代码中的 `QlmModalBox` 按组件语义解释为 ModalBox；迁移目标采用 Vue 组件命名 `AipdModalBox`，避免把 modal 误写成 model。
- GitHub 稳定引用同时支持默认分支 latest 地址和锁定首个完整源码资产提交的 pinned 地址；两者均已实测 HTTP 200。
- 许可证继续维持 owner / authorized-only；当前 `LICENSE.md` 只说明权利边界，不擅自授予 MIT / Apache 等许可。
- 发布从 `origin/main` 的独立 worktree / 分支完成，已确认没有混入 c12 与原工作区其他未提交改动。

### 阻塞项

- 无。2026-07-15 13:46 CST 用户明确要求“发布”，原授权阻塞已解除；发布保持 owner / authorized-only 权限说明。

## Phase Summaries

### Think

- 状态：已完成。
- 入口：`01-think/think.md`
- 审计分支：`01-think/target-project-audit/summary.md`
- 摘要：确认五条经验拆分；校准 provide / inject 边界、ModalBox 真实使用规模、QlmForm / QlmSearch 机制、架构图复杂度触发规则和 L5 额外候选。

### Design

- 状态：已完成，Readiness Gate passed。
- 入口：`02-design/design.md`
- 决策：AipdModalBox 新 canonical + 旧 facade；经验拆成五条；历史 case 不机械改名；架构图索引唯一指南。

### Execute

- 状态：WP-01 至 WP-05 全部完成。
- 入口：`03-execute/execute.md`
- WP-01：AipdModalBox 迁移完成，目标项目生产构建通过。
- WP-02：五条实践经验回流完成，AIPD build 通过。
- WP-03：根级源码资产、19 项核心 / Vue runtime 测试、Vite smoke、依赖审计完成。
- WP-04：正式经验 / 指南 / 索引品牌迁移与资产引用完成；正式面旧品牌清零。
- WP-05：源码资产提交 `f7c36f250d8c45eb9cb7600aa0186e800c33df1e` 已推送；PR #1 合入 `main`，latest / pinned 均验证通过。

### Verify

- 状态：第二轮 Verify passed；本地门禁、pinned 和默认分支 latest 全部通过。
- 入口：`04-verify/verify.md`
- 回跳修正：全局 Dialog selector、QlmForm 示例和 FormItem 统计口径已修复并重验。
- 第二轮回跳修正：校验错误放行、callback 异常清理、app context fail-fast、同步注册 / scope dispose、异步分页、初始化幂等、首次 render cleanup、显式 show options、示例错误处理和验证分层已修复。

### Close

- 状态：completed。原 Close 撤销后新增的源码资产、许可证边界、GitHub 发布和远端引用验收均已闭环。
- 入口：`05-close/close.md`
- 原有成果仍有效：五条经验已回流；目标项目活跃 map / L4 / L5 / README / MMD 已同步。
- 最终归档路径：`_adoc/case/archive/c13-vue3-context-decoupling-experience/`。
- 延后候选：Vue3 SCSS、mock-first、若依字典 / 路由 / 权限、轻量 API facade。

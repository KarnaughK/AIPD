# Case: c0.8-aipd-desktop-zero

> **本次事项目标**：讨论并沉淀 AIPD Desktop 的第零版边界：先做 AIPD 项目结构可视化和真实 Agent 聊天接入，不提前扩展成重型 Agent 编排工厂。
>
> **暂停说明（2026-06-27）**：AIPD Desktop 是否继续做尚不确定。本 case 暂停推进，不进入执行，不创建 `aipd-desktop/`，已有调研、技术路线和候选 step 只作为后续重新判断时的参考。

## 目录结构

```text
_adoc/case/c0.8-aipd-desktop-zero/
├── case.md
├── steps/
│   ├── s1-project-bootstrap.md
│   ├── s2-aipd-file-tree-readonly.md
│   ├── s3-codex-appserver-spike.md
│   ├── s4-chat-ui-mvp.md
│   └── s5-preview-and-context-chips.md
└── doc/
    ├── deep-research-agent-client.md
    ├── development-outline.md
    ├── project-placement.md
    ├── tauri-architecture-overview.mmd
    ├── tauri-vue-bootstrap.md
    └── reference-notes.md
```

## 1. 目标

- **收束产品方向**：把本轮讨论从“Agent 编排器 / 工厂”收回到“以 AIPD 项目为外壳的聊天客户端”。
- **定义第零版地基**：明确第零版只要求 AIPD 文件树解析 + 流畅聊天接入，不急于做 case workspace、自动上下文规划或多 Agent 流程控制。
- **记录 Case 使用痛点**：Codex 桌面端以“对话”为组织单位，而 AIPD 以 Case / Step 为组织单位，两者不一致导致聊天记录暴增、上下文分散、并行线难以管理。
- **记录桌面端落位**：当前桌面端产品名暂定为 AIPD Desktop，作为 AIPD 的增强客户端放在本仓库 `aipd-desktop/` 下孵化。
- **保留后续讨论入口**：当前事项还在方案讨论中，本 case 只做上下文容器，不创建执行 step。

## 2. 场景分流

- **项目类型**：AIPD 框架项目。
- **Case 类型**：L3 / L4 / L5 交叉的产品形态与工程入口讨论，偏目标型 / 认知型 case。
- **适用流程**：通用 case-create。当前只沉淀目标、上下文索引、讨论结论和参考资料。
- **不适用经验**：不套用 Vue 前端实现型 case，不创建页面 / 组件 / provider / 架构图实现 step。

## 3. 上下文索引

### 层级判断

- **L1 Intent**：涉及 AIPD 是否从 Skill / Agent 约束扩展到桌面工作台，但当前不改方向文件。
- **L3 Core**：涉及 AIPD 的组织单位、Case / Step、上下文显性化、Agent 自由度与流程控制边界。
- **L4 Product**：涉及 AIPD Desktop 的产品形态、第零版 / 第一版边界、左侧导航、聊天区、预览区。
- **L5 Dev**：涉及 Codex App Server / SDK / `codex exec --json`、Claude Code / OpenCode adapter 可能性，但当前仅记录参考，不做实现设计。
- **Case / 历史 Step**：后续继续讨论时，应把本 case 作为上下文容器，避免散落在多个普通聊天里。

### 项目认知

- `_adoc/index.md` - AIPD 项目状态、L1-L5 入口、case / okr / inbox 入口。
- `_adoc/map.md` - 路由到 Case Create、Case Run、Agent 调度、Weave、Codex 平台适配等高频入口。
- `_adoc/L3-core/index.md` - AIPD 核心认知：上下文解耦、黑箱上移、扁平化检索、Case / Step 和 Weave。
- `_adoc/L3-core/horizontal-capabilities.md` - 横向能力：map 检索、Case 系统、Weave、Agent Entry、未来上下文服务。
- `_adoc/L3-core/vertical-concept-modules.md` - 纵向模块：L1-L6、OKR、Case、Step、Agent Entry、Agent 使用方案。
- `_adoc/L4-product/map.md` - AIPD 产品功能线入口，尤其 Case Create / Case Run / Weave / Learn / Update。
- `_adoc/L5-dev/index.md` - Codex 优先适配、Agent 调度、构建安装等工程语境。

### 参考资料

- `doc/reference-notes.md` - 本轮讨论引用的外部 / 项目参考资料和接口路线摘要。
- `doc/deep-research-agent-client.md` - Codex / Claude Code / OpenCode 客户端套壳项目深度调研，以及 Electron / Tauri 技术栈取舍。
- `doc/development-outline.md` - AIPD Desktop 第零版总开发纲要、阶段拆分和验收口径。
- `doc/project-placement.md` - AIPD Desktop 在本仓库中的落位判断：推荐 `aipd-desktop/`。
- `doc/tauri-architecture-overview.mmd` - Tauri 前后端分层、IPC、Rust backend、sidecar 与 Agent adapter 关系图。
- `doc/tauri-vue-bootstrap.md` - Tauri + Vue + TypeScript 官方模板创建指南和交互项建议。
- GitHub 仓库 `alchaincyf/fanbox` - 作为反例 / 参照：它是 terminal cockpit，不是 AIPD Desktop。
- OpenAI Codex manual - Programmatic Interfaces：Codex App Server、Codex SDK、`codex exec --json`、Codex MCP server。

### 兜底搜索

- `rg "Case / Step|上下文解耦|黑箱上移|Agent Entry|Weave|Codex App Server|codex exec|SDK" _adoc src README.md`
- `rg "case-run|case-create|fork_context|推荐 Agent|agent-guides|Codex 平台适配" _adoc src`
- `rg "MMD|Mermaid|预览|聊天|Agent 项目|Case Workspace|Chat Client" _adoc src README.md docs`

## 4. 已确认讨论结论

### 4.1 产品定位

- 当前目标不是做重型 Agent 编排工厂，也不是把 Agent 限制成固定流程按钮。
- 更准确的第一阶段方向是 **AIPD Desktop**：以 AIPD 项目结构为外壳，提供更好的聊天输入、项目上下文展示和轻量快捷 `@`。
- Codex / Claude Code / OpenCode 等 Agent 是底层执行与对话能力来源；AIPD UI 先辅助它们，而不是替代它们。
- AIPD Desktop 是现有 AIPD Skill / ADOC 体系的增强壳，不是基础 skill 的运行前提；普通 Codex / Claude Code / CLI 仍应能直接使用 AIPD 基础能力。

### 4.1.1 项目落位与命名

- **产品名**：AIPD Desktop。
- **目录名**：`aipd-desktop/`。
- **仓库策略**：先放在当前 `AIPD-2` 主仓库内孵化，便于直接使用真实 `_adoc`、case、skill 和 MMD 文件做开发样本；成熟后再评估是否拆独立仓库。
- **依赖方向**：AIPD Desktop 可以读取和增强 AIPD 文件结构，但 AIPD Skill / ADOC 体系不能反向依赖 AIPD Desktop。
- **技术倾向**：Tauri + Vue 3 + Vite + TypeScript + Rust backend；Codex-first 接入 App Server / SDK。

### 4.2 第零版边界

第零版必须先做两条地基：

- **AIPD 文件树解析**：左侧展示 L1-L5、Case / Step、OKR、Inbox 和 `_adoc` 其他入口。
- **真实 Agent 聊天接入**：中间能像 Codex 桌面端一样流畅聊天，具备正常 UI 输入框、流式输出、多轮对话、会话恢复 / 历史和基本错误处理。

第零版暂不做：

- 自动上下文规划器。
- 多 Agent 派发工厂。
- 自动验收 / 自动 weave / 完整状态机。
- 完整 IDE / 文件管理器 / 代码编辑器。
- 强制把 case / step 变成按钮式流水线。

### 4.3 快捷上下文层

后续可以做的是轻量快捷 `@`，不是重型上下文 planner：

- 左侧选中某个 L1-L5 文档、case 或 step 后，在底部聊天时默认可附加当前对象。
- 点击“创建 case / 执行 case / weave”等入口，本质是帮用户快速插入或触发对应 skill，而不是启动复杂编排系统。
- 用户仍然和 Agent 自然聊天，Agent 仍可自由判断、提出改 case、跳出当前讨论或补充新方向。

### 4.4 Case 使用痛点

当前 Codex 桌面端按“聊天”组织工作，而 AIPD 按“Case / Step”组织工作，导致：

- 创建 case、执行 case、修改 case、讨论 step、验收 step 经常分散在多个聊天里。
- 用户不确定后续修改应该回到 create case 的聊天，还是 run case 的聊天。
- 并行多条线时，很快找不到刚才在哪个聊天里讨论过什么。
- Case 本身应该是任务空间和上下文容器，而不是只是一组 markdown 文件。

后续第一版可讨论 **Case Workspace**：把相关聊天、case.md、steps、执行记录、修改记录和参考资料收纳在同一 case 下。但这不是第零版必须完成的内容。

## 5. 本次边界

### 要做

- 创建本 case，记录本轮讨论结论和参考资料。
- 明确第零版 / 后续第一版的初步边界。
- 为上下文压缩后的继续讨论提供稳定入口。

### 不做

- 不实现 AIPD Desktop。
- 不创建执行 step。
- 不决定技术栈。
- 不设计完整 AgentAdapter 接口细节。
- 不把本轮未确认想法回写到 L1 / L3 / L4 / L5 长期认知。

## 6. Step 列表

当前 step 是候选开发纲要。因 Desktop 方向已暂停，以下内容只作为参考，不进入执行。

- `steps/s1-project-bootstrap.md` - 创建 `aipd-desktop/`，使用官方 Tauri + Vue + TypeScript 模板，验证空壳启动。
- `steps/s2-aipd-file-tree-readonly.md` - 实现 AIPD 文件树只读解析和展示。
- `steps/s3-codex-appserver-spike.md` - 验证 Codex App Server / SDK 接入路线。
- `steps/s4-chat-ui-mvp.md` - 实现基础聊天输入、流式输出、中断和错误态。
- `steps/s5-preview-and-context-chips.md` - 实现 Mermaid / MMD 预览和轻量上下文 chip。

## 7. 后续候选事项

- **第零版技术调研**：已形成初步结论，详见 `doc/deep-research-agent-client.md`。当前倾向：Codex-first 优先 App Server / SDK，PTY 只做 fallback。
- **项目创建指南**：已沉淀到 `doc/tauri-vue-bootstrap.md`，推荐官方 Tauri 创建器 + Vue 3 + TypeScript。
- **目录落位判断**：已沉淀到 `doc/project-placement.md`，当前推荐 `aipd-desktop/`，不使用 `apps/` 层，也不把 Tauri 文件直接散落在仓库根目录。
- **AgentAdapter 草案**：只在第零版聊天接入确认后，再设计 Codex / Claude Code / OpenCode 的最小适配接口。
- **项目创建方案**：下一步讨论如何在 `aipd-desktop/` 初始化 Tauri + Vue 3 + TypeScript 项目，以及如何保持它与 AIPD 基础 skill 解耦。
- **Case Workspace 设计**：讨论如何把聊天、case.md、step、run 记录和参考资料收进同一个 case 容器。
- **快捷 `@` 设计**：讨论左侧选中文档 / case / step 如何转成发送前的上下文 chip。
- **MMD / Mermaid 预览**：作为轻量预览增强，后续可独立拆分。

## 8. 验收标准

- [x] case 文件记录本轮关键结论：不是 Agent 工厂，而是 AIPD Desktop。
- [x] case 文件明确第零版地基：AIPD 文件树解析 + 真实 Agent 聊天接入。
- [x] case 文件记录 Case 使用痛点和后续 Case Workspace 候选。
- [x] case 文件包含后续继续讨论所需的上下文索引和参考资料入口。
- [x] 当前未确认事项只进入候选区，没有提前创建执行 step。

## 9. Weave 反向编织候选

> 本区只记录候选归属。真正回写长期 ADOC、局部 README 或 map 时，使用 `aipd-weave` 先给回写方案，用户确认后再写入。

- `_adoc/L3-core/horizontal-capabilities.md` - 若 Case Workspace 成为稳定方向，可补充“Case 作为聊天 / 执行收纳空间”的横向能力。
- `_adoc/L4-product/map.md` - 若 AIPD Desktop 进入产品功能线，可新增入口。
- `_adoc/L5-dev/index.md` - 若确定 Codex App Server / SDK / `codex exec --json` 的工程适配路径，可新增平台适配规则。
- `_adoc/map.md` - 若本方向成为高频事项，可增加“AIPD Desktop / Case Workspace / 快捷 @ / AgentAdapter”路由入口。
- 本 case 后续 step - 当前讨论过程只保留在本 case，不建议直接写入长期 ADOC。

## 10. 自迭代观察锚点

- [ ] 后续继续讨论时，Agent 是否能先回到本 case，而不是重新散落在普通聊天里。
- [ ] Agent 是否区分“快捷上下文层”和“自动上下文规划器”，避免再次滑向重型 Agent 工厂。
- [ ] Agent 是否把第零版限定为 AIPD 文件树 + 真实聊天接入，而不是提前设计完整 Case Workspace。
- [ ] 涉及 Codex 接入时，Agent 是否优先引用 Codex App Server / SDK / `codex exec --json` 等公开 programmatic interface，而不是只包终端。
- [ ] 涉及长期知识回写时，Agent 是否先提出 weave 候选，而不是直接改 L3 / L4 / L5。

## 11. 归档状态

- **状态**：已暂停，暂不推进
- **创建时间**：2026-06-13
- **归档时间**：

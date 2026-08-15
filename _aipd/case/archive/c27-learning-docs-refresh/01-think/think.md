# Think：AIPD V2 学习文档事实包与漂移盘点

## 调研前 checkpoint

- **当前问题**：现有 `docs/**` 与 AIPD V2 的真实能力、用户可见边界和学习路径之间存在哪些漂移，怎样形成可执行的文档设计输入。
- **触发来源**：Case Contract；最近完成 Knowledge Schema v2、版本化 Update、显式 Leader、代码拓扑、交互协议与 Main / Child 等连续升级。
- **范围**：只读核对当前 docs、根 README、Knowledge、Skill 源码、脚本与归档 c18-c24；不外部调研，不修改 docs，不检查历史 Case 的旧术语是否需要重写。
- **预期输出**：当前事实包、页面 / 概念覆盖矩阵、活跃旧语义清单、保留 / 新增 / 重组建议。
- **停止条件**：所有成功判据都能映射到明确页面职责和事实源，且不存在需要 Leader 决策的内容所有权冲突。
- **返回位置**：完成后回写本文件结论与 `case.md` Think 摘要，进入 Design。

## 输入

- Case Contract 与 Leader 派发成功判据。
- `_aipd/map.md` 命中的 Core / Product / Engineering 权威文档。
- `README.md`、`aipd-skill/README.md`、`aipd-skill/src/**`、`aipd-skill/scripts/**`。
- `docs/**` 现状与 `_aipd/case/archive/c18-*` 至 `c24-*` 的结论。
- 教学文档产品化经验：按用户旅程组织教学、按系统对象组织参考；根 README / guide / modules 分工。

## 待回答

1. 三条入口分别缺哪些 V2 学习面？
2. 首次闭环应该让用户得到什么可见结果，哪些命令与文件参与？
3. guide 的因果旅程是否仍成立，需如何吸收 Map-first、Case 生命周期与 Weave / Update / Leader？
4. modules 哪些页面可更新，哪些主题需新增独立参考页？
5. 哪些易变事实应链接权威入口，而不是复制内部合同？

## 事实包与差异矩阵

### 已确认的当前事实

- 当前发布为 AIPD V2；机器事实源是安装包 `updates/catalog.json#currentVersion`，项目成功应用版本是 `_aipd/manifest.json#aipdVersion`。
- 普通 AIPD 读写前先过项目状态 gate；`P=I` 才继续，`unversioned-v2`、`P<I` 或必要入口 drift 进入 `aipd-update`，`P>I` / 双根 / symlink / 非法 manifest 硬停止。
- 一次性 migrator 只把完整旧 `_adoc` 工作区原子迁为无版本 Schema v2；Update 才读取 Release Records 和 current authority，一次语义收敛到本机版本并在验证后写版本与 update log。
- 五类 Knowledge 已在现有 docs 中正确表达为并列存储分类；Map-first、局部 README、真实代码和流程状态的分工基本一致。
- Case 已正确表达为 `Case Contract -> Think -> Design -> Execute -> Verify -> Close`；Work Package 只在 Execute 内，是状态 / 恢复 / 验收边界，不等于派发节点。
- Leader 只由 `$aipd-leader` 显式启动；一个项目一个 Leader、一个 active Mission、一个 Case 一个同级 Codex task；Case task 可在内部选择 Child，但不再创建同级 task。
- 公共构建集合为 9 个 Skill；`aipd-learn` 是 AIPD 源码仓库级第 10 个入口，不进入公共 build / dist / install。Codex 当前构建 3 个 custom Agent；`aipd_product_manager` 只有平台无关领域指引，不是已构建 custom Agent。
- Agent MD 初始化等级为 0 / 1 / 2；等级 1 安装 Project Entry，等级 2 额外安装 Interaction Protocol。协议只约束讨论 / 执行切换和回复结构，不是项目认知入口。
- AI 友好代码拓扑的当前模型是横向基座、横向共享能力、纵向业务上下文与显式组合边界；`Decouple first, DRY later` 是 shared 晋升判断，不等于全面纵向化。

### 页面覆盖与漂移

| 学习面 | 当前页面 | 判断 | Design 输入 |
|---|---|---|---|
| 三条入口 | `docs/README.md` | 结构正确，但未暴露 Update、交互协议、代码拓扑独立入口 | 保持三条旅程，补全问题查阅面 |
| 初始化 / Map-first | guide 02 / 03 / 06、modules Agent Entry / Map | 主线正确；缺项目状态 gate、`update-log.md`、Agent MD 等级与可选 Leader 目录边界 | 在不增加首次闭环负担的前提下补当前事实 |
| Case / Think / Main-Child | guide 04、对应 modules | 基本准确 | 仅校准角色产物数量与 guide-only 边界 |
| Weave / Learn | guide 05、Weave / Skill 概览 | 分工基本准确 | 强化 Learn 仅在 AIPD 源码仓库、项目知识仍用 Weave |
| Update / 迁移 | build 页和 Skill 概览中的短段 | 缺独立可查阅页面；无法完整解释 gate、P/I、migrator 与 Update 分工 | 新增 `modules/update-and-migration.md` |
| Interaction Protocol | 无 | 当前产品能力缺页；Agent Entry 也未解释 0 / 1 / 2 | 新增 `modules/interaction-protocol.md`，更新 Agent Entry 与 guide |
| AI 友好代码拓扑 | guide 05 后半、context-decoupling | 只讲纵向黑箱和 DRY 后置，缺三类模块、显式组合、shared 晋升、Case 三段合同 | 新增 `modules/ai-friendly-code-topology.md`；context 页负责原理并链接具体拓扑 |
| Leader | `modules/leader.md`、Skill 概览 | 基本准确 | 把显式 Leader 放进完整学习面，但不加入首次闭环必经步骤 |
| 构建 / 安装 | `modules/build-and-install.md` | 9 Skill、build / install 权限边界正确；迁移和版本 Update 混在尾部 | 保留脚本参考，把更新语义链接到新页 |

### 保留判断

- 保留“任务前读认知 -> 任务中承接状态 -> 任务后回写经验”的六章因果旅程；内部模块升级没有改变第一次成功时刻。
- 第一次成功时刻仍是：一个真实词能从 Map 命中上下文，一个 Case 完成并有 Verify 证据，稳定事实被 Weave 或明确判断无需回写。
- 保留现有文件路径与六章编号，避免破坏深链接；在页面内增量校准，不把 `project-state.md`、Leader runtime 或 Case 模板整段复制给用户。
- 旧 `_adoc`、L1-L5 和旧 Case 命令只在迁移 / 历史说明中出现，属于允许的历史语义。

## 结论

- 采用“保留用户旅程、补齐 V2 参考面、校准关键操作点”的增量刷新，不重做 c18 已验证的信息架构。
- 新增 Update / 迁移、Interaction Protocol、AI 友好代码拓扑 3 个模块页；更新 docs 导航、guide 02 / 03 / 05 / 06，以及 Agent Entry、构建安装、Main / Child、上下文解耦、Skill 概览的交叉链接和事实边界。
- 所有成功判据已映射到明确页面与权威事实源，无需 Leader 方向决策，也未发现内容所有权冲突；进入 Design。

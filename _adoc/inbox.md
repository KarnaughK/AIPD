# AIPD Inbox

Inbox 是未整理信息的收件箱，只负责接住临时材料，不承诺执行、不承诺稳定、不承诺归属。

## 使用原则

- 这里只记录“先存一下，回头再判断”的信息。
- 不在这里拆 step，不在这里承诺要做。
- 不把这里的内容直接当作 L1-L5 的稳定认知。
- 整理时再判断是否迁移到 L2 / L3 / L4 / L5 / OKR / Case，或直接删除。
- 如果已经明确要推进，创建 Case；如果已经是稳定认知，使用 Weave 回写。

## 条目

### 2026-06-16 - v2-todo 历史待办迁移索引

来源：
- `c0.7-repo-structure-reclassification` 仓库结构重分类。
- 原根目录 `v2-todo/` 曾迁移到 `docs/legacy/v2-todo/`，后在 C0.7 legacy 清理中从工作树删除。
- 删除前快照已通过 Git tag `c0.7-before-legacy-cleanup` 保留。

原始记录：
- `git show c0.7-before-legacy-cleanup:docs/legacy/v2-todo/todo.md` 可回看早期 AIPD 待讨论事项，包括已有项目刷新机制、Agent 身份后续迭代、降低 AIPD 侵入感、对外定位表述、AIPD 框架上移与 Case-as-Goal。
- `c0.7-before-legacy-cleanup:docs/legacy/v2-todo/archive/` 保留了早期已完成事项记录。

待判断：
- `已有项目刷新机制` 是否已经被 `aipd-update` 覆盖，是否还需要新 case。
- `Agent 身份后续迭代` 是否在真实 Vue / Desktop case 后再评估。
- `降低 AIPD 侵入感` 是否需要单独产品体验 case。
- `对外定位表述` 是否进入 docs / README 后续打磨。
- `Case-as-Goal` 是否与当前 Codex Goal mode 结合后形成新 case。

### 2026-06-16 - 模块接口注册表候选事项降级待整理

来源：
- 原 case：`_adoc/case/c0.4-module-interface-registry/case.md`。

原始记录：
- 原事项目标是统计 AIPD 当前模块，并讨论是否需要模块级标准接口 / 模块注册表，让初始化、update、weave 等横向流程复用各模块自己的初始化、审计、写入规则、标记区块、必选 / 可选属性和用户确认问题。
- 候选模块包括 L1-L5、OKR、Case、Step、Agent Entry、Agent 使用方案、Map、Weave、Learn、Update、初始化、构建 / 安装、Interaction Style、平台适配、角色 Agent。
- 原 case 尚未执行，没有 step 文件和执行记录；当前先从 case 列表移出，降级为 inbox 待整理事项。

待判断：
- 是否仍值得研究模块注册表 / 标准接口？
- 是否影响初始化、update、weave、learn 的长期工程规则？
- 是否应重新创建为新的 case，还是并入未来 AIPD update / 架构整理事项？
- 是否可以删除？

### 2026-06-07 - 财神V3若1 项目 QLM 代码迁到 AIPD 待整理

来源：
- 当前对话。

原始记录：
- 关于另一个项目“财神V3若1”（路径：`/Users/yangzongru/Desktop/qianlima/2026/CaiShen-vue3-ruoyi`），事项先待定，后续仍需要处理。
- 当前体系里还保留一些 QLM 相关代码，后续大方向是把这些内容都改成 AIPD。
- 用户倾向认为它可能不应该放在 inbox，而应放在“case 待定”；但也指出“case 待定”的逻辑可能有问题，候选事项如果散落在各处会难以回收，或许应该统一回到 inbox。
- 暂时只简单记录，明天睡醒后再继续讨论。

待判断：
- 是否值得研究？
- 是否影响项目方向、核心认知、产品能力或工程规则？
- 是否形成候选 case？
- 是否可以删除？
- “case 待定”是否应收敛回 inbox，避免待定事项分散在多个位置？

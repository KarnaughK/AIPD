# Execute

## 状态

completed

用户已确认方向：Case 是主流程 + 可回跳迭代，Think 是调研/实验工作台，Design 需要承接需求契约、后端/前端设计和上下文解耦。因此本轮进入 Execute，直接把 c0.11 方案写入 `aipd-case` skill 源内容。

## 候选 work package

| 候选包 | 目标 | 依赖 |
|---|---|---|
| `wp-update-case-design-phase.md` | 更新 `aipd-skill/src/core/case/phases/design.md`，把 Design 扩展为需求契约、领域规则、brownfield delta、后端、前端、上下文边界、work package 和 readiness gate 流程 | `02-design/source-change-plan.md` |
| `wp-update-case-overview.md` | 同步 `aipd-skill/src/core/case/overview.md`，保留复杂度爆点和横向铺模块故事，同时补上需求到执行切片的大流程 | `wp-update-case-design-phase.md` |
| `wp-update-case-templates.md` | 同步 `case.md` 和 `work-package.md` 模板，增加 Design 模式、artifact 链接、readiness gate 和“不允许固化的假设” | `wp-update-case-design-phase.md` |
| `wp-add-product-manager-guide.md` | 新增 `aipd-skill/src/core/agent-guides/aipd_product_manager.md`，把 PM / Requirements Steward 能力固化为可派发角色指引 | `02-design/product-manager-agent-guide-draft.md` |
| `wp-build-and-verify-aipd-skill.md` | 运行 build，检查 skill 文档一致性；build 后询问用户是否 install | 前面源码修改完成 |

## 当前执行记录

### 2026-06-28

已执行：

- 更新 `aipd-skill/src/core/case/phases/design.md`：加入 Design 大流程、回跳 Think、Design 模式、requirements / backend / frontend / context / readiness gate。
- 更新 `aipd-skill/src/core/case/phases/think.md`：明确 Think 是调研、实验、数据采样、方案比较和证据沉淀的探索工作台，可由 Design / Execute / Verify 回跳触发。
- 更新 `aipd-skill/src/core/case/overview.md`：加入主流程可回跳、Think 分支工作台和 Design artifact 模型。
- 更新 `aipd-skill/src/core/case/templates/case.md`：加入可选 Design artifact、回跳记录、Design 模式、需求契约、readiness gate。
- 更新 `aipd-skill/src/core/case/templates/work-package.md`：加入 Design 输入、不允许固化的假设和回跳记录。
- 新增 `aipd-skill/src/core/agent-guides/aipd_product_manager.md`。
- 更新 `_adoc/map.md` 和 `_adoc/L5-dev/index.md` 的稳定入口。

验证：

- 已运行 `./aipd-skill/scripts/build`，构建通过。
- 已在 `aipd-skill/dist/codex/skills/aipd-case` 和 `aipd-skill/dist/claude/skills/aipd-case` 中检索到新增的回跳规则、Design 大流程、case 模板字段和 `aipd_product_manager.md` 指引。

安装：

- 用户已确认执行 Codex 安装。
- 已运行 `./aipd-skill/scripts/install-codex`。
- 已安装到 `/Users/yangzongru/.codex/skills/` 和 `/Users/yangzongru/.codex/agents/`。
- 已在安装后的 `~/.codex/skills/aipd-case` 中检索确认新增 Design 流程、回跳记录和 `aipd_product_manager.md` 指引存在。

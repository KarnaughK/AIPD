# Work Package: c0.13.2 - Vue3 实践经验库回流

> **所属 Case**: c0.13-vue3-context-decoupling-experience
> **Phase**: Execute
> **类型**: docs
> **推荐 Agent**: Main Agent
> **依赖**: WP-01

## 目标

新增五条 Vue3 具象实践经验，更新统一经验索引，并保证 Vue3 与 Nuxt 前端 case 能准确命中。

## 设计依据

- Context Boundary：`02-design/design.md`
- Readiness Gate：passed
- 复杂度爆点：五类能力共享上位理念，但读取时机、协议和失败风险不同。
- 解耦方式：按能力拆经验，公共上位原则只在局部上下文条目完整解释。
- 主干职责：`experience/index.md` 只路由，不承载正文。
- 文件边界：AIPD `aipd-skill/src/core/experience/`。

## 不允许固化的假设

- 不把外部项目绝对路径、业务私有对象和历史 case 路径写进正式经验。
- 不把未验证能力写成成熟实践。

## 横向模块

- [x] Vue3 局部上下文与组件自治。
- [x] AipdModalBox。
- [x] QlmForm 页面级 controller。
- [x] QlmSearch 搜索会话 controller。
- [x] 页面局部认知入口与架构图索引。
- [x] 统一经验索引。

## 执行前 checkpoint

- **当前目标**：以 Think 证据和 WP-01 最终 API 编写可迁移经验。
- **恢复入口**：本 work package、`02-design/design.md`、Think summary。
- **执行边界**：只改 AIPD 实践经验库及索引。
- **预期输出**：五条正文、索引和 AIPD build 结果。
- **停止条件**：完成、发现经验与实现不一致，或 build 失败。
- **返回位置**：写回本文件和 `03-execute/execute.md`，进入 Verify。

## 验收标准

- [x] 五条经验均有来源、适用场景、具象机制、边界 / 风险和借鉴方式。
- [x] 索引标明阶段、类型、Vue3 / Nuxt 前端领域和读取时机。
- [x] 页面架构图详细规范只引用唯一事实源。
- [x] `./aipd-skill/scripts/build` 通过。

## 不做

- 不顺手重写现有 Vue Agent 指引。
- 不执行 install。

## 执行记录

**状态**：completed

**完成时间**：2026-07-15

**主要改动**：

- 新增 `vue3-local-context-component-autonomy.md`。
- 新增 `vue3-aipd-modal-box.md`。
- 新增的表单经验后来迁名为 `vue3-aipd-form-page-controller.md`。
- 新增的搜索经验后来迁名为 `vue3-aipd-search-page-controller.md`。
- 新增 `vue3-page-local-cognition-map.md`。
- 更新 `experience/index.md`，为 Vue3 与 Nuxt 前端标注阶段、类型、触发场景和正文入口。

**验证结果**：

- 五条经验均包含来源、适用场景、Nuxt 前端借鉴和不做边界。
- 隐私扫描未发现外部项目绝对路径或项目目录名。
- Codex / Claude 的 `aipd-case` 与 `aipd-learn` 构建产物均包含五条经验及更新后的索引。
- `./aipd-skill/scripts/build` exit code 0，共构建 9 个 Claude skill 和 9 个 Codex skill，并生成 Codex Agent 模板。

**执行后 checkpoint**：

- **当前结论**：WP-02 完成。
- **下一步**：进入 Verify，逐项验收 Case Contract 和 Design Guardrails。
- **恢复入口**：`04-verify/verify.md`。

**遇到的问题**：一次组合校验命令误用 AIPD cwd 检查目标项目相对路径，已改用绝对路径重跑并通过；不属于实现失败。

**Verify 回跳修正**：

- 独立复核发现 QlmForm 提交示例漏了 `validateResult.valid` 判断和异步 `getSubmitValue()` 的 `await`，已按真实 controller contract 修正。
- “52 个 FormItem 均成对注册 / 注销”的统计口径过强；扫描中包含一个只展示 sample code、未注销的 demo，已收窄为生产业务 FormItem 的规则并明确 demo 例外。
- 修正后重新执行 AIPD build 和经验结构检查。

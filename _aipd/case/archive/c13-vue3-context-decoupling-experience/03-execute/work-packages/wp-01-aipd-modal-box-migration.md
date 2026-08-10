# Work Package: wp-01 - AipdModalBox canonical 迁移

> **所属 Case**: c13-vue3-context-decoupling-experience
> **Phase**: Execute
> **类型**: dev + docs
> **推荐 Agent**: Main Agent
> **依赖**: `02-design/design.md`

## 目标

把目标项目的 QlmModalBox 迁移为 AipdModalBox，补充定位、协议、案例和边界说明，同时保留不复制实现的旧名兼容 facade。

## 设计依据

- Brownfield Delta：`02-design/design.md`
- Context Boundary：`02-design/design.md`
- Readiness Gate：passed
- 复杂度爆点：运行时创建浮层涉及目录、public API、56 个 import、内部样式和活跃文档的成套命名。
- 解耦方式：新目录为唯一实现，旧目录只 re-export aliases。
- 主干职责：factory 行为保持不变，只做 canonical 命名迁移。
- 文件边界：目标项目 `src/components/AipdModalBox/`、`src/components/QlmModalBox/index.js`、活跃运行时代码和活跃文档。

## 不允许固化的假设

- 不假设 Drawer 或 controller.update 已有真实项目验证。
- 不假设归档 case 需要改写历史名称。

## 横向模块

- [x] canonical 目录和 public API 迁移。
- [x] 活跃源码 import / symbol / CSS 迁移。
- [x] 旧名 compatibility facade。
- [x] README 描述、使用协议和真实案例。
- [x] 活跃 map / L5 / 局部 README / MMD 引用更新。

## 执行前 checkpoint

- **当前目标**：在不改变运行时行为的前提下完成品牌命名迁移。
- **恢复入口**：本 work package 和 `02-design/design.md`。
- **执行边界**：允许改目标项目上述文件；不改业务行为、不改归档 case。
- **预期输出**：新 canonical、兼容 facade、描述、引用扫描和生产构建结果。
- **停止条件**：完成、构建阻塞，或发现必须改变运行时协议。
- **返回位置**：写回本文件和 `03-execute/execute.md`，再进入 WP-02。

## 验收标准

- [x] 活跃源码使用 `@/components/AipdModalBox` 和 `Aipd*` public API。
- [x] 旧目录只保留兼容 facade，canonical 实现只有一份。
- [x] README 能说明创建、show、内容注入、关闭回传、Promise / callback 和已验证案例。
- [x] 归档 case 未被机械改写。
- [x] `npm run build:prod` 通过。

## 不做

- 不重构 injection key、原生关闭或 update 行为。
- 不人工冒充 Drawer 已有案例。
- 不修改 QlmForm / QlmSearch 品牌名称。

## 执行记录

**状态**：completed

**完成时间**：2026-07-15

**主要改动**：

- 新增 canonical `src/components/AipdModalBox/`，public API、内部组件、CSS class 和活跃调用统一使用 `Aipd*`。
- `src/components/QlmModalBox/index.js` 收缩为 deprecated alias facade，未保留第二份实现。
- 迁移运行时代码、活跃 `_adoc` map / L4 / L5、代码就近 README / `_map.md` / MMD；归档 case 保留历史名。
- 重写 canonical README，补运行时机制、Promise / callback、三个真实案例、Nuxt / 生命周期相关风险的事实基础，并修正旧文档失真。

**验证结果**：

- 旧名称扫描只剩 canonical README 的迁移说明和兼容 facade 中的预期 alias。
- `npm run build:prod` 通过：Vite 6.4.1，3264 modules transformed，exit code 0。
- `git diff --check` 通过。

**执行后 checkpoint**：

- **当前结论**：WP-01 完成，未发现需要回 Design 的运行时协议变化。
- **下一步**：执行 WP-02。
- **恢复入口**：`wp-02-vue3-experience-library.md`。

**遇到的问题**：无阻塞；Drawer 和 `controller.update` 仍缺真实案例，已保留为经验边界。

**Verify 回跳修正**：

- 独立复核发现全局 `src/assets/styles/element-ui.scss` 仍只匹配 `.QlmElDialog`，新 factory 的 `.AipdElDialog` 会丢失圆角、header 隐藏和 body flex / overflow。
- 已将全局 selector 迁移为 `.AipdElDialog`。旧 facade 仍创建 canonical factory，因此不需要继续生成旧 CSS class。
- 修正后重新执行目标项目生产构建和旧名扫描。

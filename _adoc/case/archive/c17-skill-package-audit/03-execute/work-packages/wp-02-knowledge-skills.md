# Work Package: wp-02 - 知识型 Skill 边界与平台承诺

> **所属 Case**: c17-skill-package-audit
> **Phase**: Execute
> **类型**: docs / process
> **推荐 Agent**: Main Agent
> **依赖**: `02-design/design.md`

## 目标

收紧 Inbox / Weave / Learn 的 owner 边界，并同步 OKR、Mermaid 注入和公共 overview 的当前术语。

## 设计依据

- Requirements / Brownfield / Context Boundary：`02-design/design.md`
- Readiness Gate：passed
- 复杂度爆点：平台特有会话定位混入公共 Learn；capture 与长期回写授权边界松动。
- 解耦方式：公共行为平台中立，定位细节由平台 reference 注入；每种知识状态只有一个写入 owner。
- 文件边界：对应 `src/skills/*`、`src/core/overview.md`、`src/core/okr/guide.md`、Vue provider guide 和 Learn 平台 reference。

## 横向模块

- [x] Inbox 只 capture，迁移由目标流程完成。
- [x] Weave 稳定性改为真实落地 + 相称验证证据的组合门槛。
- [x] Learn 公共描述平台中立，Codex / Claude 定位能力分别注入。
- [x] OKR Goal phase、provider step、overview 独立 Goal 叙事更新。

## 验收标准

- [ ] Inbox / Weave owner 边界无自相矛盾。
- [ ] Claude Learn 产物不承诺 Codex-only 自动定位。
- [ ] 公共知识型 Skill 不再把 Goal 当 Case phase、把 step 当当前执行容器。

## 不做

- 不改经验资产正文。
- 不增加网络、第三方服务或安装依赖。

## 执行记录

**状态**：completed

**完成时间**：2026-07-21

**主要改动**：Inbox 目标写入转交 owner；Weave 收紧稳定门槛；Learn 新增平台会话定位注入；OKR / provider / overview 术语同步。

**验证结果**：Codex / Claude Learn 仅 locator reference 不同；Claude 产物不含 Codex-only 承诺；知识边界二次复审通过。

**执行后 checkpoint**：completed；进入 WP-03；无 Design 回跳。

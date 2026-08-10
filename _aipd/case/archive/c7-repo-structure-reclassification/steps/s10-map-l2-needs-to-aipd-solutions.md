# Step: s10-map-l2-needs-to-aipd-solutions

> **目标**：基于已刷新的 `_adoc/L2-research/index.md`，为每条 L2 痛点 / 需求线建立到 AIPD 解决方案的索引，让 Agent 能从需求痛点角度进入项目，再路由到对应 L3 / L4 / L5 / SOP / case / 源码入口。

## 1. 状态

- **状态**：待执行
- **创建时间**：2026-06-17

## 2. 背景判断

L1 是项目大方向，变化频率低。

从 L2 开始，认知已经不只是单向层级，而是网状关系：一个痛点可能由多个 AIPD 能力共同解决；一个能力也可能服务多个痛点。

当前 `_adoc/L2-research/index.md` 已经列出 AIPD 面向的痛点 / 需求线，但还没有把它们关联到“我们如何解决”。这会导致 Agent 从架构角度能理解 AIPD，但从需求痛点角度进入时，仍需要自己猜对应的 L3 / L4 / L5 / 代码入口。

## 3. 本 step 要做

为 L2 建立一张“需求痛点 -> AIPD 解决方案”的映射表。

建议至少覆盖：

- Agent 上下文问题 -> `_adoc/map.md`、L1-L5、局部 README、Agent Entry、Weave。
- 项目文档完整性问题 -> ADOC 分层、Weave、map、局部 README、Update。
- AI 长时间工作问题 -> OKR、Case、Step、分身 Agent、执行记录、case-run、case-archive。
- AI 原生代码架构扩展问题 -> 上下文解耦、纵向黑箱、技术栈经验库、MMD、局部 README、Vue / Nuxt 等技术目录候选。
- SOP / AI 程序需求 -> `_adoc/sop/`、SOP map、Case 记录执行实例、Weave 回写。
- 未整理信息暂存与分流 -> Inbox、Weave、Case 候选、SOP 候选。
- AI 工作控制、验收和信任 -> Step 验收、执行记录、Weave Candidate、case-archive、git push。
- AIPD 框架自迭代 -> `aipd-learn`、transcript、回流包、skill / 模板 / Agent 行为规则更新。
- 已接入项目的 AIPD 架构升级迁移 -> `aipd-update`、Agent Entry、map、case 模板、L3-L5 结构同步。
- Desktop 文件查询与观看 -> AIPD Desktop、L1-L5 / Case / Step / SOP / MMD 文件树、预览和上下文 chip。
- CLI Agent 桌面化使用 -> AIPD Desktop、Codex / Claude Code / OpenCode adapter、聊天 UI、上下文引用。
- MMD 高带宽交流 -> `aipd-mermaid`、MMD 预览、架构图规范、Desktop 预览。

## 4. 推荐落点

优先更新：

- `_adoc/L2-research/index.md`

可选同步：

- `_adoc/map.md`：如果“从痛点进入项目”成为高频入口，可新增 L2 痛点路由。
- `_adoc/L3-core/horizontal-capabilities.md`：如果映射暴露出横向能力缺口，再同步 L3。
- `_adoc/L4-product/map.md`：如果某些痛点明确对应产品功能线，可补 L4 入口。

## 5. 边界

### 要做

- 建立 L2 痛点 / 需求线到 AIPD 能力的映射。
- 明确每条痛点主要靠哪些 L3 / L4 / L5 / SOP / case / skill 解决。
- 保持 L2 仍然是外部世界和需求来源，不把 L3 / L4 / L5 细节正文塞进 L2。

### 不做

- 不重写 L3 / L4 / L5。
- 不设计 Desktop 功能细节。
- 不设计 Vue / Nuxt 技术目录结构。
- 不把 L2 变成完整架构说明书。

## 6. 验收标准

- `_adoc/L2-research/index.md` 中可以从每条痛点找到对应的 AIPD 解决能力。
- Agent 从“需求痛点”角度进入项目时，不需要自己猜应该读哪些 L3 / L4 / L5 / skill。
- 映射是索引，不重复大段 L3 / L4 / L5 正文。
- 通过 `git diff --check`。

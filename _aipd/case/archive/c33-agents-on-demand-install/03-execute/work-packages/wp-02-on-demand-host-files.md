# Work Package: wp-02 - Leader / Case 按需文件

> **所属 Case**: c33-agents-on-demand-install
> **Phase**: Execute
> **类型**: dev
> **推荐 Agent**: Main Agent
> **依赖**: wp-01
> **拓扑敏感**: 是

## 目标

只有 Leader 和 Case 在 `SKILL.md` 旁边有按需目录。Agent 按当前对话宿主只读自己那一份。常驻正文不再带别家调度细节。

## 设计依据

- Requirements Contract：`02-design/requirements-contract.md`
- Context Boundary：`02-design/context-boundary.md`
- Readiness Gate：passed
- 复杂度爆点：同一份 `SKILL.md` 同时讲两家调度
- 解耦方式：包内 `runtime/{host}.md` / `agent-guide/{host}.md`；末尾小列表
- 文件 / 文件夹边界：只改 `aipd-skill/skills/aipd-leader/` 与 `aipd-skill/skills/aipd-case/`

## 代码拓扑护栏

- **纵向业务上下文**：Leader 包、Case 包
- **允许的横向依赖**：无新 shared
- **显式组合边界**：`SKILL.md` 末尾列表点名包内相对路径
- **禁止的边界穿透**：把宿主文件放到 `shared/` 或继续用 `src/platforms` 覆盖
- **共享变化权限**：不准再上移 shared
- **独立验收边界**：改 Leader 的 Cursor runtime 不必打开 Codex 文件
- **认知回写**：无

## 不允许固化的假设

- 无差异的六个 Skill 不加空的按需目录

## 并列工作项

- [x] `aipd-leader/runtime/{codex,cursor,grok,claude}.md`
- [x] `aipd-case/agent-guide.md` + `agent-guide/{codex,cursor,grok,claude}.md`
- [x] Leader / Case `SKILL.md` 末尾列表；正文删掉 Codex 模型表、`cursor-agent` 步骤、「当前构建注入的就是本平台合同」
- [x] 废掉公共 `leader/runtime.md` 那份会漏细节的索引

## 上下文文档

- `case.md`
- `02-design/context-boundary.md`
- `aipd-skill/src/platforms/codex/core/leader/runtime.md`
- `aipd-skill/src/platforms/cursor/core/leader/runtime.md`
- `aipd-skill/src/platforms/codex/core/agent-guide.md`
- `aipd-skill/src/core/agent-guide.md`

## 执行前 checkpoint

- **当前目标**：按需文件 + 列表 + 删常驻别家调度
- **恢复入口**：本文件
- **执行边界**：不改另外六个 Skill；不装到本机
- **预期输出**：包内按需目录和更新后的 `SKILL.md`
- **停止条件**：验收通过
- **返回位置**：本文件 + `execute.md`

## 验收标准

- [x] Leader 正文不再带别家调度细节
- [x] 列表路径是包内相对路径
- [x] Grok / Claude 文件有正文（可写暂不支持），不靠缺文件
- [x] 无差异的六个 Skill 没有空的 `runtime/` / `agent-guide/` 目录

## 不做

- 不改 init 逻辑
- 不装到本机
- 不删 `src/` `dist/`（wp-04）

## 执行记录

**状态**：completed

**完成时间**：2026-09-14

**主要改动**：
- Leader `runtime/{codex,cursor,grok,claude}.md`；Grok/Claude 写暂不支持
- Case 通用 `agent-guide.md` + 四个宿主文件
- 两份 `SKILL.md` 末尾列表；Leader 常驻正文去掉模型表和 cursor-agent 步骤

**验证结果**：
- `check-skills` 含按需文件与正文约束

**执行后 checkpoint**：
- **当前结论**：完成
- **下一步**：wp-03
- **恢复入口**：`wp-03-install-entrypoints.md`

**遇到的问题**：无

**回跳 / 重开**：无

**Weave 候选**：按需加载模型，Close 再判断

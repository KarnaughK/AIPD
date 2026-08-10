# Close：Codex GPT-5.6 Sol 调度适配

## Close Result

**passed / archived**。

2026-07-15，用户确认 c12 规则已在实际使用中运行，目前没有明确问题，同意与 c13 一并保留在 `main`。c12 代码已通过 PR #3 合入 `main`，merge commit 为 `9558a7105db2d279dc79cbe962ac697ae77fad87`。

## Case Contract 达成情况

- 已完成近期 Codex 会话审计，并区分官方事实、本地可观察事实和推断。
- 已形成 Sol High 日常基线与 Ultra 使用边界。
- Work Package 已与子 Agent 派发解绑定。
- Main / Child 已按上下文隔离收益、真实并发收益、主线耦合度和调度成本选择。
- 已移除“子 Agent 授权 / 前置询问”叙事，保留用户明确禁用和外部副作用边界。
- AIPD 双平台 build、生成物扫描、Codex 用户级 install、Git 审阅和 `main` 合并均通过。

## Work Packages

- WP-01：Main / Child 运行时路由，completed。
- WP-02：移除子 Agent 授权叙事，completed。

## 长期认知审计

### 已回写

- `_adoc/L5-dev/index.md`：Sol High / Ultra 边界、Main / Child 四维收益判定和 Work Package 解绑定。
- `AGENTS.md` 与 `aipd-skill/src/core/agent-entry/template.md`：项目级运行时调度规则。
- `aipd-skill/src/platforms/codex/core/agent-guide.md`：Codex 平台详细路由、最小上下文和 single-owner evidence。
- `aipd-skill/src/skills/aipd-case/SKILL.md`、Execute phase、OKR skill 和 `docs/modules/clone-agents.md`：直接相关规则副本。

### 无需再 weave

- 本 case 的已验证稳定规则已直接写入 L5、Agent Entry、平台 guide、skill 和用户文档，不存在仍停留在 case 中的已实现长期事实。

### 仅留 case

- 2026-07-10 的会话抽样、时间盒过程、对话级耗时观察和 `fork_turns="all"` 反例属于本次决策证据，只保留在归档 case。

### 延后候选

- Sol High / Ultra 同 prompt A/B。
- Codex transcript 延迟、Child 数量、调用数和重复证据面的评测 SOP。
- generic 调研 Child 的 model / effort 与 `fork_turns` 配置。
- 浏览器异常状态的具体超时、重试和停止阈值。

这些候选尚未形成稳定实现，不进入当前长期规则；后续如有明确问题再单独开 case。

## 验证与发布证据

- `git diff --check`：passed。
- AIPD build：Claude 9 skills、Codex 9 skills 和 Codex Agent 模板，passed。
- 授权叙事扫描：源码、Codex / Claude dist 和安装目录无旧叙事命中。
- Codex 用户级 install：passed。
- c12 source commits：`9ae1cec7366d5c4e6af3a62917a7c27bb771c1d1`、`fd381c04e4e5e841dd86f670a976c3e52d053a29`。
- 发布 PR：`https://github.com/KarnaughK/AIPD/pull/3`。
- `main` merge commit：`9558a7105db2d279dc79cbe962ac697ae77fad87`。
- 用户验收：实际使用中没有明确问题，同意合并和收口。

## Archive 决策

- 外部路径引用只命中 `_adoc/case/index.md`，没有 L3 / L4 / L5、README、SOP 或其他 case 依赖当前活动路径。
- 可以安全移动到 `_adoc/case/archive/c12-codex-gpt-5-6-sol-adaptation/`。
- c13 已独立归档；两个 case 的代码与认知结果均保留在 `main`。

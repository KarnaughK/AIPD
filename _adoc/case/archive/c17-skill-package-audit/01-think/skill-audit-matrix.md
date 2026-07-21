# 首轮 Skill 打包产物审计矩阵

## 审计口径

- 事实入口：`aipd-skill/dist/codex/skills/*`、`aipd-skill/dist/claude/skills/*`。
- 溯源入口：`src/skills/*`、`src/core/*`、`src/platforms/*`、`scripts/build`、`scripts/install*`、`scripts/dev*`。
- 基线：Map-first、Case Contract、Think / Design / Execute / Verify / Close、Work Package、文件优先 checkpoint、Main / Child 净收益调度、Goal Mode 覆盖、Inbox capture、Weave 稳定事实门槛、飞书 OKR、平台等价语义。
- 判定：`pass` 表示当前无需修改；`needs-fix` 表示产物行为与当前基线有可回溯差异。

## 产物完整性基线

- Codex 与 Claude 都打包 9 个 Skill，名称集合一致。
- 所有静态 `@references/...` 引用均可解析；Mermaid 脚本引用存在。
- 除 `aipd-case/references/agent-guide.md` 的显式平台覆盖外，两套 Skill 文件一致。
- `src/skills/*/SKILL.md` 与对应主产物一致，问题来自源码语义或平台覆盖，不是构建漏文件。

## 逐 Skill 结论

| Skill | 首轮结论 | 产物层发现 | 源码 owner | 目标修复 |
|---|---|---|---|---|
| `aipd` | needs-fix / 高 | 状态扫描仍输出阶段和 Step 计数；扫描机械绑定分身；初始化先写 Agent Entry 后询问 0/1/2；L1 引导仍是固定阶段流 | `src/skills/aipd/SKILL.md`、`src/skills/aipd/references/scan-agent.md`、`src/core/L1-intent/*` | 状态改为 Current Phase / Phase State / Work Package；按净收益选择 Main / Child；先选 Agent MD 等级再写；初始化完成后回到自然任务路由 |
| `aipd-case` | needs-fix / 高 | Codex guide 暴露旧 `fork_context` 接口叙事且恢复链漏 map；Claude guide 未保持 phase-first、Case Contract、Goal Mode、checkpoint 等价语义；平台和角色 guide 缺明确加载路由 | `src/skills/aipd-case/SKILL.md`、`src/core/case/phases/execute.md`、`src/platforms/{codex,claude}/core/agent-guide.md` | 平台 API 中立化；补完整恢复链；统一平台语义，仅保留真实平台差异；派发后显式加载平台及角色 guide |
| `aipd-update` | needs-fix / 高 | 仍称 “AIPD 2”；宣称审计 Case 但没有 Case Contract / phase-first / 旧结构迁移矩阵；仍写 case step | `src/skills/aipd-update/SKILL.md` | 改为当前 AIPD 标准；补 Case / index / Work Package 审计和破坏性迁移边界；统一 Work Package 术语 |
| `aipd-inbox` | needs-fix / 中 | 整理流程允许 Inbox 自己“修改对应文件”，与只 capture 的 owner 边界冲突 | `src/skills/aipd-inbox/SKILL.md` | 目标写入交给 weave / case / OKR 等 owner；Inbox 只在迁移完成后删除或标记原条目 |
| `aipd-weave` | needs-fix / 中 | 稳定性判定使用“现有代码 / 已验收规则 / 可复用事实”任一满足，可能写入已实现但未验证的信息 | `src/skills/aipd-weave/SKILL.md` | 改为组合门槛：真实行为或规则 + 已落地 + 相称验证/验收证据 |
| `aipd-learn` | needs-fix / 中 | Claude 最终产物仍默认承诺 Codex 会话 ID / SQLite / session 自动定位；两平台完全同包 | `src/skills/aipd-learn/SKILL.md`、平台注入与 `scripts/build` | 公共描述改为平台中性的会话定位；把定位方式做成平台 reference，Codex 保留自动定位，Claude 明确最小转交卡与 transcript 输入边界 |
| `aipd-okr` | needs-fix / 中 | 注入 guide 仍把 OKR 用于 Case “Goal / Execute / Close” | `src/core/okr/guide.md` | 改为 Case Contract 及 Think / Design / Execute / Verify / Close 的目标对齐 |
| `aipd-mermaid` | needs-fix / 低 | 注入的 Vue provider 指南仍要求在 `step` 回流里说明兼容字段 | `src/core/L5-dev/vue-provider-guide.md` | 改为 Work Package 执行记录或相邻代码说明 |
| `aipd-git-push` | pass | 分支检查、只 push 当前分支、禁止隐式 add / commit / merge / rebase / stash / force，确认边界完整 | 无 | 保持不变，用构建后二次检查防回归 |

## 跨 Skill / 工具链发现

| 严重度 | 发现 | owner | 处理方向 |
|---|---|---|---|
| 高 | 6 个 install / dev 脚本的 legacy cleanup 列表不一致，只有 Codex 用户级入口清理 `aipd-case-create/run/archive` | `scripts/install*`、`scripts/dev*` | 抽出共享 legacy 清单，所有入口复用；保持 install 外部动作不在本 Case 执行 |
| 中 | 最终产物缺少一个可重复的整体健康检查，当前只能靠人工逐项扫 | `scripts/` | 新增只读 `check-dist`：Skill 集合、source/dist 主文件、引用、平台差异、关键旧词、cleanup 入口一致性 |
| 低 | 公共 overview 写 `Case / Goal / Work Package` 承接长期状态，容易把 Goal 读成已废弃独立 phase | `src/core/overview.md` | 明确 Case / Work Package 是文件事实，Goal Mode 只是运行覆盖 |
| 低 | 根 README 和教学材料仍有旧流程 | 教学文档 | 本 Case 不处理，只进入 Close 的下个 Case 候选 |

## Think 结论

1. 打包链没有丢失 Skill 或静态 reference；根因是公共源码、平台覆盖和安装入口随流程演进不同步。
2. 修复必须落在唯一源码 owner，随后统一 build；禁止直接编辑 `dist`。
3. 一次性人工审计不足以长期兜底，应新增 `check-dist` 把结构性结果变成可重复测试。
4. 问题可按“核心入口与 Case”“知识型 Skill”“构建安装与回归检查”三个边界执行；教学文档继续排除。

# 二次 Skill 产物审计矩阵

| Skill | 二次结论 | 关键证据 |
|---|---|---|
| `aipd` | pass | 状态扫描输出 Current Phase / Phase State / Work Package；Main / Child 按净收益；Agent MD 先选等级；L1 不再进入固定下一阶段 |
| `aipd-case` | pass | Codex / Claude 都从 index -> map -> case index -> Case Contract -> Current Phase 恢复；Goal Mode、checkpoint、角色 guide 路由齐全；仅平台能力表达不同 |
| `aipd-update` | pass | 使用“当前 AIPD 标准”；注入 Case index / case / work-package 模板；实际审计 Case Contract、phase-first、旧结构破坏性迁移 |
| `aipd-inbox` | pass | 仍只 capture；目标文件写入明确转交 weave / case / OKR owner |
| `aipd-weave` | pass | 长期回写要求真实行为或规则 + 实现落地 + 相称验证 / 验收证据 |
| `aipd-learn` | pass | 公共 Skill 平台中立；Codex locator 有本地映射，Claude locator 明确最小转交卡与用户提供 transcript 的降级路径 |
| `aipd-okr` | pass | OKR 对齐 Case Contract 与完整 Think / Design / Execute / Verify / Close，不再引用 Goal phase |
| `aipd-mermaid` | pass | provider 注入使用 Work Package 执行记录，不再要求 step 回流；渲染和 npx 确认边界保持不变 |
| `aipd-git-push` | pass | 未改动；仍只检查并 push 当前分支，不隐式 add / commit / merge / rebase / stash / force |

## 平台与引用

- 两平台 Skill 集合均为 9 个；逐 Skill 文件数分别一致。
- 允许的平台内容差异只有：`aipd-case/references/agent-guide.md`、`aipd-learn/references/learn-session-locator.md`。
- 所有静态 `@references` 都能从所属 Skill 的 `references/` 根解析。
- 旧 `steps/`、`01-goal/`、`case-create/run/archive` 的剩余命中均用于检测、拒绝、迁移或历史经验读取，不作为当前运行入口。

## 工具链

- `scripts/build`：通过。
- `scripts/check-dist`：通过。
- `bash -n`：build、check-dist、legacy-skills、6 个 install / dev 入口通过。
- `git diff --check -- aipd-skill ...`：通过。
- install：未执行。

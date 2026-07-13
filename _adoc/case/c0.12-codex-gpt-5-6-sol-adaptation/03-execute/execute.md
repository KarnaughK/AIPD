# Execute：Codex Main / Child 调度适配

## 当前执行游标

- **Work Package**：`work-packages/wp-01-main-child-runtime-routing.md`
- **状态**：completed
- **执行者**：Main Agent
- **设计输入**：`../02-design/design.md`

## 执行前 checkpoint

- **当前目标**：一次性统一 AIPD Agent Entry、Codex guide、Case Execute 与相关文档中的 Main / Child 调度语义。
- **执行边界**：只修改子 Agent 选择、Work Package 关系、上下文继承、并发与浏览器窄边界；保留工作区其他未提交变化。
- **验收标准**：不再把多入口检索、文件修改、构建测试或 Work Package 机械等同于子 Agent；保留最小上下文、single-owner evidence、压缩回流和 build / install 边界。
- **禁止事项**：不修改模型配置；不实现 benchmark SOP；不固化浏览器秒级超时；不执行 install、commit 或 push。
- **恢复入口**：本文件、当前 Work Package、`../case.md`、`../02-design/design.md`。
- **停止条件**：实现与 build 均完成后进入 Verify；若发现需求或规则结构冲突则回 Design。

## Work Packages

| Work Package | 状态 | 执行者 | 说明 |
|---|---|---|---|
| `wp-01-main-child-runtime-routing.md` | completed | Main Agent | 高耦合规则统一、残留扫描、diff 审查与 build |

## 执行记录

- 2026-07-14：用户授权从 Execute 到整体验证一次性推进；建立 WP-01 与执行前 checkpoint。
- 2026-07-14：统一 Agent Entry、Case / Execute、Codex / Claude 平台 guide、L3 / L5 / map 与直接相关 docs 的 Main / Child 语义。
- 2026-07-14：残留扫描发现 Claude guide 仍把每个 Work Package 默认交给 Agent Team，补齐平台规则后重新 build。
- 2026-07-14：AIPD build 成功生成 9 个 Claude skills、9 个 Codex skills 和 Codex agent templates；转入 Verify。

## Verification Notes

- `git diff --check` 通过。
- 旧机械派发语义定向扫描无命中。
- Codex / Claude dist 均包含 Work Package 解绑定、上下文隔离、真实并发和 single-owner 规则。
- 未发现可运行的项目测试套件；本次 docs / process 改动以 build、生成物语义扫描和 Git diff 审查为验证入口。
- install、commit、push 均未执行。

## 最近 checkpoint

- **当前结论**：WP-01 已完成，Execute 验收项全部满足。
- **下一步**：进入 Verify，等待用户最终验收；build 后单独确认是否 install。
- **恢复入口**：`../04-verify/verify.md` 与 `work-packages/wp-01-main-child-runtime-routing.md`。

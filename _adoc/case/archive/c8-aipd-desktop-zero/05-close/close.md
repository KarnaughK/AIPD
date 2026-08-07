# Close: AIPD Desktop Zero

## 状态

- **当前状态**：completed / stopped / killed
- **触发时间**：2026-08-07
- **触发原因**：用户实际试用后确认 Desktop 不是 AIPD 所需产品，明确决定取消并删除全部实验代码。

## 清理 checkpoint

- **专用工作树**：`/Users/yangzongru/Desktop/CodeKKK/AIPD-2-c8-aipd-desktop`，约 1.2GB，包含全部未提交实验代码、依赖和构建产物。
- **本地分支**：`codex/c8-aipd-desktop`；没有独有提交，没有对应远端分支。
- **实验子 Case**：`c16-desktop-activity-navigation` 只存在于专用工作树的未提交内容中，随实验清理；主线索引保留编号占位。
- **主线代码**：版本跟踪中只有 `aipd-desktop/README.md` 占位文件；另有少量被 Git 忽略的空构建目录，两者均已删除，没有可运行 Desktop 实现。
- **长期认知冲突**：L1 / L2 / L4 / map / README / 构建文档仍把 Desktop 描述为现行或规划中方向，需要撤下。
- **保留范围**：C8 调研、设计和取消原因；发展日志和历史 case 中已发生过的 Desktop 讨论。

## 清理结果

- 专用工作树及其中约 1.2GB 的未提交实验代码、依赖、构建产物、设计 QA 图片和 C16 子 Case 已删除。
- 本地分支 `codex/c8-aipd-desktop` 已删除；该分支没有独有提交，也没有对应远端分支。
- 主线 `aipd-desktop/` 已完整删除，包括占位 README 和被 Git 忽略的残留目录。
- L1 / L2 / L4 / map / README / 构建文档中的现行 Desktop 产品入口已撤下。
- C16 在 case 索引中只保留编号占位，避免编号复用；不保留其未提交实验文档。
- 主工作区中与 C8 无关的未提交内容未被清理或覆盖。

## 反向编织候选

| 候选内容 | 候选归属 | 状态 |
|---|---|---|
| AIPD Desktop 作为增强客户端而非基础依赖 | L4 Product / map | 不回写；产品方向已取消，移除现行入口 |
| Case Workspace 作为聊天与执行收纳空间 | 仅留 case | 未形成稳定产品，不回写 |
| Codex 接入优先 App Server / SDK，PTY 作为 fallback | 仅留 case | 未形成稳定实现，不回写 |
| Desktop 实际试用后不符合 AIPD 所需产品 | L1 / L2 / L4 / map / README | 已完成；撤下现行产品方向并保留取消结论 |

## 关闭记录

- 2026-07-01：完成旧结构迁移；未关闭。
- 2026-08-07：用户确认取消 Desktop；写入删除工作树、分支、实验代码和现行产品入口的 Close checkpoint。
- 2026-08-07：完成删除与验证；C8 以 `stopped / killed` 归档到 `_adoc/case/archive/c8-aipd-desktop-zero/`。

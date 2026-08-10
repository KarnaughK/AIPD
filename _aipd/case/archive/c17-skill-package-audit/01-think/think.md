# Think：Skill 打包产物全量审计

## 当前问题

如何从最终打包结果出发，对全部 Skill 做一致、可重复的审计，并把每个发现准确回溯到源码、公共 core、平台覆盖或构建 / 安装脚本。

## 审计对象

- `aipd-skill/dist/codex/skills/*`
- `aipd-skill/dist/claude/skills/*`
- 对应 `src/skills/*`、注入的 `src/core/*`、平台覆盖和构建 / 安装脚本。

## 核心对照基线

- 项目方向与边界：`_adoc/L1-intent/intent.md`
- 核心模型：`_adoc/L3-core/index.md`、`horizontal-capabilities.md`、`vertical-concept-modules.md`
- 产品功能线：`_adoc/L4-product/index.md`、`map.md`
- 工程和平台规则：`_adoc/L5-dev/index.md`、`aipd-skill/src/core/agent-entry/template.md`、`aipd-skill/src/platforms/*/core/agent-guide.md`
- Case 事实源：`aipd-skill/src/core/case/overview.md`、phase 文档和模板。

## 每个 Skill 的测试维度

1. Skill 名称、description 和触发关键词是否仍准确。
2. 用户入口、职责边界和路由是否与当前功能线一致。
3. 是否仍包含旧 Case / Step / Goal phase / AIPD2 / context-map / fork-first /授权叙事。
4. 注入 references 是否完整、是否包含过期或互相矛盾的内容。
5. Codex 与 Claude 产物差异是否来自明确平台覆盖。
6. 外部副作用、写入确认、install / push / delete 边界是否一致。
7. 文件优先 checkpoint、恢复链路、Main / Child 净收益调度、Goal Mode 是否在相关 Skill 中正确体现。
8. 产物问题的源码 owner、修复方式和回归检查是什么。

## 预期产物

- `01-think/skill-audit-matrix.md`：首轮逐 Skill 证据矩阵。
- `02-design/design.md`：统一修复策略、文件边界和 Work Package。
- `03-execute/work-packages/`：按独立源码 owner 划分的修复包。
- `04-verify/verify.md`：build、引用完整性、旧术语和二次逐 Skill审计证据。

## 停止条件

- 全部打包 Skill 已登记。
- 每个 Skill 已给出 pass / needs-fix / investigate 结论。
- 所有 needs-fix 已能回溯到源码 owner。
- 可以据此完成 Design 和 Readiness Gate。

## 返回位置

- 首轮审计完成后写回 `case.md` Think 摘要，并进入 `02-design/design.md`。

## 调研结果

- **状态**：completed
- **完整矩阵**：`skill-audit-matrix.md`
- **结论**：9 个 Skill 与静态引用都完整；8 个 Skill 存在语义更新项，`aipd-git-push` 通过。问题集中在旧阶段 / Step 叙事、Case 平台覆盖不等价、知识 Skill owner 边界、Learn 平台承诺和 install / dev cleanup 漂移。
- **源码可追溯性**：全部 needs-fix 均已定位到 `src/skills`、`src/core`、`src/platforms` 或 `scripts` 唯一 owner。
- **Design 输入**：以三条修复线拆 Work Package，并新增可重复 `check-dist` 作为二次验收入口。
- **open / assumed**：无阻塞项；教学文档与 install 继续排除。

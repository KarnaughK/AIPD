# Mission：让用户更快看见 AIPD 的价值

## 状态

- Mission：`m2-documentation-value-clarity`
- 状态：completed / Leader accepted
- 启动日期：2026-08-13
- 完成日期：2026-08-13
- 方向依据：用户确认“让每一次 AI 开发都建立在上一次之上，而不是重新理解整个项目”准确表达了首要价值。
- 当前基线：上一 Mission 的文档改动已集成当前 checkout，但尚未 commit；Git HEAD 仍为 `e22f97e`。

## 想达成的结果

让第一次看到 AIPD 的用户，不需要先理解“项目记忆、认知系统、Map、Case”等框架语言，就能马上意识到自己的变化：新的 Agent 不再每次重新解释、重新猜测和重复踩坑，而是能够继承项目过去的判断、当前工作和已验证经验，继续往前推进。

## 边界

- 只调整面向人的价值入口：根 `README.md`、`docs/README.md`、学习 guide 01 / 02 的开场与必要衔接。
- 允许重排、删除和改写首屏 / 开场内容，以用户结果优先，而不是给现有内部术语换同义词。
- 保留后续技术正文、教程结构、命令、链接和已验证能力边界；除必要衔接外不扩写其他模块页。
- 不修改 `_aipd` 长期 Knowledge、Skill、脚本、dist 或运行行为；不 install、commit、push、发布。

## 成功判据

1. README 前 3-5 行先说明用户得到的变化，而不是先定义 AIPD 或要求用户翻译内部概念。
2. 用户在首屏能理解现状问题、AIPD 带来的结果、为什么值得继续读；“项目记忆”等概念在价值被理解后再出现。
3. README、docs 索引、guide 01 / 02 的价值主线一致，但各自承担不同职责，不复制同一段营销文案。
4. “让每次 AI 开发建立在上一次之上”落实为具体继承对象：项目判断与边界、当前任务状态、已验证经验；不夸张承诺 Agent 永不出错。
5. 原有本地链接 / 锚点、快速开始与技术事实不退化，并通过用户视角的减法审计。

## Case 队列

| Case | 内容 owner | 状态 / task |
|---|---|---|
| `c28-documentation-value-clarity` | `README.md` 首屏价值入口、`docs/README.md` 开场、`docs/guide/01-*` 与 `02-*` 的开场 / 必要衔接 | Leader accepted / integrated；Case 已 Close 并归档；task `019ff768-ee55-7033-9f75-1a77030bc4b4`；host `local`；worktree `/Users/yangzongru/.codex/worktrees/c8ed/AIPD`；cursor `576b5d5d-d34a-468e-8d05-393515c7a57e:32`；Fast 未核验 |

## 用户关注与汇报

- 清晰优先于抓人；清晰指用户更快意识到项目价值，而不是术语描述更准确。
- 默认完成一版并用用户视角验收后汇报；若需要改变 AIPD 长期定位或扩大文档范围，再回到用户确认。

## 当前 checkpoint

- 已完成：AIPD v2 gate、四入口价值顺序审计、c28 全 phase、Case 验收与精确语义集成；没有覆盖上一 Mission 的未提交文档成果。
- 下一动作：Mission 已完成；等待用户继续判断文案效果或决定后续 Git 动作。
- 集成约束：Case task 默认从 Git 基线启动；Leader 只吸收其明确所有权内的价值入口 diff，不覆盖上一 Mission 已集成的其他文档改动。
- 返回位置：本文件“成功判据”“Case 队列”和当前 checkout 的四个用户入口文件。

## Mission 级验收

- 根 README 第 3 行直接给出用户结果，随后具体说明项目判断与边界、当前任务状态、已验证经验，最后才命名项目记忆与 AIPD。
- docs 索引只做先体验 / 连续学习 / 工作时查阅的意图分流；Guide 01 证明“下一次又从零开始”的失败机制；Guide 02 解释三类成果怎样在任务前 / 中 / 后产生累积。
- 四个入口共享一条因果主线但没有复制同一段；“项目记忆”不再是理解价值的前提。
- Reduction Delta 包含 delete / merge / defer / reorder；四文件合计净增 1 行，根 README 首屏净减少 6 行。
- Case 验证的 39 个本地链接 / 锚点、Markdown 格式、写入范围、内部术语竞争和开场原文重复检查通过。
- Leader 已在当前含上一 Mission 未提交改动的 checkout 上按小块集成；后续将以组合后的完整文档再次验证。

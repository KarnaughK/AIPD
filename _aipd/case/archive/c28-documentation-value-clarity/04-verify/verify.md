# Verify：用户价值清晰度与 Reduction Scan

## 验收输入

- Case Contract 与成功判据。
- `02-design/design.md` 的 Attention Contract、Design Reduction Scan 与 Readiness Gate。
- wp-01 执行记录和四个文档的真实 diff。

## 用户价值清晰度

| 入口 | 第一眼 | 随后理解 | 自然下一步 | 结果 |
|---|---|---|---|---|
| 根 README | 第 3 行直接出现“每一次 AI 开发都建立在上一次之上” | 三类成果先被看见，随后才命名“项目记忆 / AIPD”；明确不保证永不出错 | 紧邻入口链接和“没有 AIPD 时”的真实示例 | passed |
| docs 索引 | 已经做过的 AI 开发应该继续产生作用 | 不必先学内部对象，可按先体验 / 连续学习 / 工作时查阅分流 | README 或完整操作卡，以及三类路径 | passed |
| Guide 01 | 失败不是不会写，而是下一次又从零开始 | 搜索、聊天和代码为什么不能单独承接判断、状态、经验 | 把三类内容概括为项目记忆，再进入下一章 | passed |
| Guide 02 | 承接前章，明确三类成果要留给下一次 | 任务前 / 中 / 后分别让判断、状态、经验产生累积 | 进入完整地图，再到下一章的最小闭环 | passed |

根 README 前 3-5 行无需理解 Knowledge、Case、Work Package 等内部对象即可完成价值识别。三类继承对象分别明确为项目判断与边界、当前任务状态、已验证经验；“项目记忆 / AIPD”出现在结果和对象之后，作为概念总结与框架命名。

## Reduction Scan

### 触发器检查

- 同段主重点竞争：未命中。每页只有一个主问题，支撑内容从属于该问题。
- 无法说清第一眼与下一步：未命中，见上表。
- 为“显得完整”保留低价值内容：未命中；内部对象和完整机制后置到原有正文。
- 内部分类压过用户问题：未命中；四个开场前 8 行没有 Knowledge、Case、Work Package、Intent / Research / Core / Product / Engineering 等内部对象竞争。
- 简化偏好未传播：未命中；价值优先顺序已传播到声明的四入口路径，但文案职责不同。
- 只有加法没有减法：未命中；真实 diff 包含删除、合并、后置和重排。

### Reduction Delta

- **delete**：根 README 删除过早 slogan、三条能力清单和重复一句话总结；Guide 01 删除四项机制式清单。
- **merge**：把散落的失忆症状和任务前 / 中 / 后能力，收束为三类可继承成果。
- **defer**：Knowledge、Case / Work Package、Weave 等内部对象保留在用户已理解价值后的现有机制正文。
- **reorder**：四个入口都先出现处境 / 结果，再命名项目记忆 / AIPD；分别承担价值识别、意图分流、失败机制和累积机制。
- **outcome**：用户可先判断 AIPD 是否解决自己的重复解释、重新猜测和反复踩坑，再选择开始、学习或查阅。
- **line delta**：四个目标文件合计 26 行新增、25 行删除，净增 1 行；根 README 为 6 行新增、12 行删除，首屏净减少 6 行。

一次完整扫描未命中回跳触发器；继续迭代没有新证据或新观察视角，只会变成同义润色，按自适应停止条件收敛。

## 自动检查

| 检查 | 结果 | 证据 |
|---|---|---|
| 本地链接与锚点 | passed | 四个目标文档共检查 39 个本地链接 / 锚点，输出 `LINKS_AND_ANCHORS_OK 39` |
| Markdown / diff 格式 | passed | `git diff --check` 无输出 |
| 写入范围 | passed | tracked 改动仅四个授权文档和 `_aipd/case/index.md`；untracked 仅 c28 Case 目录 |
| 开场内部术语竞争 | passed | 四个开场价值区没有 Knowledge、Case、Work Package 或五类 Knowledge 名称 |
| 四入口原文复制 | passed | 开场长段落精确重复检查输出 `OPENING_EXACT_DUPLICATES_OK` |
| 核心价值与准确性 | passed | README 明确三类继承成果，并保留“不保证 Agent 永不出错”；Guide 01 同样说明不是让模型本身变聪明 |

按用户边界未运行 build、install 或 dist 检查；本 Case 不修改运行行为或构建产物，这些检查不属于验收入口。

## Case Contract 验收

- [x] README 前 3-5 行出现用户处境和目标结果。
- [x] 项目判断与边界、当前任务状态、已验证经验三类继承对象明确。
- [x] 项目记忆 / AIPD 在价值被理解后再命名。
- [x] 四入口主线一致、职责不同、无同段复制。
- [x] Design / Verify 均完成用户价值清晰度和 Reduction Scan。
- [x] 链接、锚点、术语、格式和写入范围通过。

## Verify Result

- **状态**：passed。
- **未通过项**：无。
- **需要回跳**：无。
- **用户验收状态**：用户已在任务合同中给出明确成功判据；本地证据全部满足，无需新增用户独有判断。
- **残留风险**：Leader checkout 有上一轮未提交文档改动；集成时需挑选 c28 的语义小块，不能整段覆盖其当前版本。
- **下一步**：进入 Close，完成归档与索引收束。

---
name: aipd-learn
description: >
  AIPD 源码仓库专用的框架自迭代入口。仅在 AIPD 仓库内，基于当前对话、外部 transcript / 会话定位、用户反馈、Case 或补充文件诊断并迭代 AIPD 自身的 Skill、模板、Agent 规则、项目认知或实践经验库。关键词：AIPD learn、框架自迭代、经验回流、transcript 诊断、观察锚点、规则更新。不要把本 Skill 安装或分发到业务项目；业务项目知识回写使用 aipd-weave。
---

# AIPD Learn

把真实协作中暴露的问题回流到 AIPD 框架自身。不要归档 Case、合并分支、自动提交或自动安装。

## 仓库级定位

`aipd-learn` 是 AIPD 仓库级 Skill，事实源固定为：

```text
.agents/skills/aipd-learn/
```

遵守以下边界：

- 不把它放回 `aipd-skill/src/skills/`。
- 不把它构建进 `aipd-skill/dist/`。
- 不把它安装到用户级 Skill 目录或外部项目。
- 外部项目产生的反馈，返回 AIPD 仓库后通过 transcript path、会话定位卡、用户粘贴内容或补充文件输入。
- 当前业务项目的 Knowledge、局部 README、Map 和 Case 稳定知识仍由该项目的 `aipd-weave` 处理。

开始前确认当前目录确实是 AIPD 源码仓库：

- 存在 `aipd-skill/src/core/overview.md`。
- 存在 `.agents/skills/aipd-learn/SKILL.md`。
- `_aipd/index.md` 标识当前项目为 AIPD。

任一身份信号不成立时停止框架写回，提示用户切回 AIPD 源码仓库。不要在其他仓库中创建本 Skill 的副本。

## 项目状态 gate

进入任何 AIPD 读取或写入前，先读取：

```text
aipd-skill/src/core/workspace/project-state.md
aipd-skill/src/core/updates/catalog.json
```

按项目状态合同检查新旧工作区路径项、symlink、manifest 双形态和项目版本 `P` / 本机版本 `I`。只有状态为 `current` 且本任务所需入口类型安全时继续；其他状态按合同停止或路由 `aipd-update`。项目版本不从 Agent Entry、Git tag 或远端推断。

通过 gate 后读取 `_aipd/index.md` 和 `_aipd/map.md`，再按当前反馈命中的 Knowledge、源码、README、Case 或 SOP 下钻，不全量扫描 `_aipd/`。

## 职责边界

只处理以下内容：

- AIPD Skill、模板、Agent 行为规则和平台适配。
- AIPD 框架的 transcript / session 行为诊断。
- AIPD 源码仓库的稳定 Product、Engineering、Map 和用户文档事实同步。
- 已校准实践经验及必要的仓库级源码资产。

不要执行以下动作：

- 不替用户推进或归档当前 Case。
- 不把外部业务项目细节原样写进 AIPD 通用规则。
- 不用 Learn 代替业务项目的 Weave。
- 不主动提交、推送、发布、安装或删除现有用户级 Skill。

## 经验来源

按以下优先级使用最少但足够的原始材料：

1. 当前对话和用户刚刚给出的纠正；内容足够时不要强迫用户提供 transcript。
2. 用户带回的会话 ID、定位卡或 transcript path。
3. 用户指定的反馈文件、Case、Work Package 或 `自我察觉迭代.md`。
4. 用户粘贴的外部经验、错误日志、diff 或验证记录。

需要定位当前 Codex 会话时读取 `references/learn-session-locator.md`。定位信息只作为原始上下文引用，不要在回复中展开完整 transcript。

如果用户给出 Case，先读取 `_aipd/case/index.md`、对应 `case.md` 和与反馈直接相关的 phase / Work Package。优先检查：

```text
_aipd/case/{case}/自我察觉迭代.md
_aipd/case/{case}/05-close/close.md
_aipd/case/{case}/03-execute/work-packages/
```

旧结构只作为证据读取，不按旧结构继续执行。

## 诊断方法

先找当前任务已经声明的观察锚点：

- 当前 Case 的“自迭代观察锚点”。
- `_aipd/map.md` 的“自迭代观察锚点”。
- `AGENTS.md` 和 `_aipd/index.md` 声明的上下文检索、讨论 / 执行与恢复规则。

再对照真实行为，优先识别以下信号：

1. 用户反复纠正 Agent 的意图理解、流程顺序或默认动作。
2. Agent 在讨论阶段过早写文件、拆 Work Package 或进入执行。
3. Case Contract、Think、Design、Execute、Verify、Close 的职责混淆。
4. 已确认内容没有及时落盘，导致压缩恢复后丢失边界或保真度。
5. Agent 没有先读 `_aipd/map.md`，或 Map 无法一跳命中必要上下文。
6. 核心概念、产品规则、跨模块工程规则或局部实现读取了错误的 Knowledge / README。
7. Skill、Agent、模板、平台适配和项目认知之间的 owner 放错。
8. 已有规则正确但 Agent 未执行，说明触发条件、停止条件或入口显著性不足。

诊断时区分：

- 提示词未执行。
- Map 缺入口或命中不清。
- Skill 流程不够明确。
- 文档 owner 或结构有问题。
- 平台能力与框架假设不一致。

不要按时间线复述完整聊天。优先回答“用户纠正了什么、AIPD 为什么会这样反应、应该改哪个 owner”。

## 经验分流

| 经验类型 | Owner |
|---|---|
| Learn 本身的触发、诊断和写回流程 | `.agents/skills/aipd-learn/` |
| AIPD 通用知识、结构规则、模板 | `aipd-skill/src/core/` |
| 对外发布的 AIPD Skill 行为 | `aipd-skill/src/skills/` |
| Codex 或其他平台专用差异 | `aipd-skill/src/platforms/{platform}/` |
| 已校准的真实项目实践样本 | `aipd-skill/src/core/experience/` |
| 文字不足以可靠复用的实现资产 | `experience-assets/{asset-name}/` |
| AIPD 仓库当前稳定产品 / 工程事实和检索入口 | `_aipd/knowledge/`、`_aipd/map.md`、局部 README |
| 面向使用者的当前行为说明 | 根 `README.md`、`docs/`、`aipd-skill/README.md` |

抽象规则只保留可跨 AIPD 项目复用的判断标准、触发条件、职责边界和停止条件。外部项目的模块名、字段、权限、角色、路径和业务黑话只用于定位证据，不进入通用规则正文。

实践经验需要保留具象上下文，但不要写入外部项目的本机绝对路径、私有 transcript 路径或无授权源码。涉及经验库时先读取：

```text
aipd-skill/src/core/experience/index.md
experience-assets/README.md
```

涉及源码资产时再读取对应资产说明与 `experience-assets/scripts/verify-assets.mjs`，并遵守来源、许可、latest / pinned、验证层级和 dist 隔离约束。

## 输出与确认

默认先输出精简诊断：

```md
【AIPD 自迭代诊断】

来源：
- 当前对话 / transcript / Case / 反馈文件：...

用户纠正点：
- ...

Agent 反应问题：
- ...

观察锚点审计：
- 应观察：...
- 实际行为：...
- 偏离原因：...

可回写判断：
- ...

建议修改位置：
- `path`：原因
```

如果用户明确要求回流包，再输出包含来源定位、场景摘要、问题、可复用判断、建议位置、原始引用和隐私边界的结构化回流包。摘要只做导航，不替代原始证据。

写文件前展示并确认：

```md
【经验迭代方案】
来源：当前对话 / transcript / Case / 反馈文件
类型：AIPD 框架规则 / 实践经验 / 项目稳定事实
准备修改：
- 文件 A：原因
- 文件 B：原因

明确不做：
- ...
```

用户已经明确确认同一方案时直接执行，不重复确认。若后续发现需要扩大到新的 owner、破坏性清理、安装或发布，重新请求授权。

## 写回与验证

执行时遵守：

1. 优先修改唯一 owner，不创建语义重复的文件。
2. 同步更新受影响的稳定 Product / Engineering / Map 和用户文档；历史 Release Record、Case 和 update log 保持历史真实性。
3. 只改本次确认范围，不顺手重构无关内容。
4. 修改 `.agents/skills/aipd-learn/` 后运行 Skill 结构校验。
5. 修改 `aipd-skill/src/`、构建或安装边界后运行 `./aipd-skill/scripts/build` 和 `./aipd-skill/scripts/check-dist`。
6. 修改经验源码资产后运行 `node experience-assets/scripts/verify-assets.mjs`；发布前再运行 `--full`。
7. 仓库级 Skill 由 Codex 从 `.agents/skills` 自动发现，不需要 install；若未刷新，提示重启 Codex。
8. build 是低风险验证，可以直接执行；install 会改写运行环境，必须另行获得用户明确确认。
9. 旧用户级 `aipd-learn` 副本属于退役清理目标，但当前任务没有删除授权时只报告，不直接删除。
10. 不自动提交，除非用户明确要求。

完成后报告修改文件、验证结果、公共 dist 是否排除 `aipd-learn`，以及是否仍存在待用户确认的安装或旧副本清理。

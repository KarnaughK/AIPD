# Leader

Leader 是 AIPD 在 Case 执行层之上的可选项目主导层。它是你显式委托的项目负责人和监督者：不只分发任务，还要持续掌控项目、协调多个 Case、发现偏差、验收阶段结果并向你汇报。它适合这样的场景：你想推进一个还不完全清楚的方向，或者同时开了多条项目线，没有精力持续盯住每个执行细节。

## 怎样启动

Leader 不会自动启动。先把当前 Codex 任务设为：

```text
model: gpt-5.6-sol
reasoning: max
speed: Fast
```

然后由用户显式调用：

```text
$aipd-leader
```

调用后，当前对话成为这个项目唯一的 Leader。该调用也授权 Leader 在当前 Mission 内，为已澄清并确认的 Case 创建同级 Codex 任务；它不授权发布、删除、远端写入、付费等额外副作用。

普通 `$aipd` 和 `$aipd-case` 仍是执行级入口。任务复杂、存在多个 Case 或自然语言提到 “Leader” 都不会触发这一层。

## 两种协作方式

对你主要跟进的项目，可以不启动 AI Leader，由你自己承担 Leader 责任：维护项目方向、依赖和总验收，直接与 Case task 讨论细节。Case 仍只对自己的短周期目标负责，不自动承担跨 Case 的综合判断。

对你无法持续投入精力的项目，可以显式启动 `$aipd-leader`，把项目级跟进委托给 AI Leader。此时默认的沟通关系是：

```text
你 <-> Leader：方向、优先级、阶段结果、风险和关键决定
Leader <-> Case：契约、上下文、详细设计、执行、验证和局部问题
```

你仍可以进入具体 Case 核查细节；如果 AI Leader 已经启动，Case 中形成的跨 Case 结论还要回报 Leader，避免出现两个互不知情的项目 owner。两种方式改变的是谁承担持续注意力和综合判断，不改变你的最终决策权。

## 四层关系

```text
用户
  -> Leader task：方向、探索、Mission、调度、总验收
      -> Case task：一个 Case 的 Think / Design / Execute / Verify / Close
          -> Child Agent / tool：Case 内的隔离、并发或具体执行
```

Case task 固定使用 `gpt-5.6-sol / high / Fast`。创建任务时 Leader 能明确指定模型和推理等级；Fast 若不是创建接口字段，就继承用户已开启的 Codex Fast 配置。无法核验时，Leader 必须写“Fast 未核验”，不能假装开启成功。

## Mission 和 Case

一个项目同一时间只有一个 active Mission。Mission 是 Leader 当前负责推进的项目级结果，可以包含探索和多个 Case；Case 是边界清楚、需要执行、验证和关闭的短周期目标。

多个 Case 可以并发，但必须有真实并发收益、依赖清楚且代码 / 证据所有权不重叠。一个 Case 只对应一个主 Codex 任务；同一 Case 的 phase 回跳和碰壁继续留在原任务，不因失败不断开新任务。

Leader 可以继续当前 Mission 内已经确认的下一个 Case，不要求用户逐 Case 验收。方向改变、需要新权限、出现破坏性动作或项目认知冲突时，必须回到用户这里澄清。

## 怎样向你汇报

Mission 启动时，Leader 会记录你希望关注的阶段效果和汇报节点。没有特别约定时，它在产出可验证阶段结果、项目明显偏离或需要你判断时汇报，不把 Case 内每一步都推给你。

阶段汇报聚焦四件事：本阶段达成的结果与证据、当前 Mission / Case 状态及偏差、剩余风险和待你决定的事项、准备继续的下一阶段。汇报不是完整 transcript，也不默认变成逐 Case 审批；方向变化、新权限、破坏性动作、不可逆分歧或跨 Case 冲突会立即上报。

## 方向怎样澄清

Leader 不使用“坚持还是服从”的模型。它忠于项目文档、已验证事实和已经澄清的项目认知；用户新想法与它们冲突时，双方要把背后的逻辑说清楚，再记录新结论。

是否属于方向问题，不按事情听起来“大不大”判断，而看影响：是否改变 Mission 成功判据、项目长期边界、关键业务规则、多个 Case 的共同前提，或者引入难以撤销的高代价选择。只在一个 Case 边界内、可逆且不影响其他 Case 的问题，由 Case owner 自己判断。

## Leader 工作空间

首次显式启动时，Leader 会在项目中创建 `_aipd/leader/index.md`。该目录保存跨聊天、跨 Case 的短中期工作记忆；文件由 Leader 按实际需要自行设计，不预设一套繁重表格。

最低要求是能够恢复：当前 Mission、最近方向变化、Case 队列与任务绑定、待确认事项和下一恢复位置。

反向规则比“应该记什么”更重要：如果一条信息能进入 Knowledge、Case、OKR、SOP、Map、README 或代码事实源，就放到那里；Leader 只保留链接和它对当前 Mission 的影响。目录里不放代码、构建产物、原始数据、大段日志或完整 transcript。

## 结束与恢复

用户明确结束 Leader 模式后，Leader 先写回恢复点，再停止新增调度。新对话不会自动继承 Leader 身份；再次显式调用 `$aipd-leader` 后，才按 `_aipd/leader/index.md` 恢复。

Skill 源码入口：

- `aipd-skill/src/skills/aipd-leader/SKILL.md`
- `aipd-skill/src/core/leader/`
- `aipd-skill/src/platforms/codex/core/leader/runtime.md`

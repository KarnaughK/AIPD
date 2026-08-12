# 多 Agent 协作机制

AIPD 的多 Agent 设计目标是：在不破坏主线连续性的前提下，用分身 Agent 隔离高噪声上下文或并发推进真正独立的工作线。

## 角色分工

- **主 Agent**：与用户沟通、读取 case、选择并直接执行内聚任务，或在有净收益时派发分身，最后更新状态。
- **分身 Agent**：读取短 prompt、work package 和指定上下文完成一个隔离或并发分支，返回压缩结果；只有必要时继承主线聊天。

## 核心原则

1. **运行时按净收益选择**：同时判断上下文隔离收益、真实并发收益、主线耦合度和调度成本，不按任务类型机械派发。
2. **能力通用于 AIPD 项目**：分身 Agent 不是 Case Execute 专属能力；普通对话和正式 case 使用同一套选择逻辑。
3. **Main 可以连续执行**：内聚模块、高耦合实现 / 调试和上下文可控的跨文件任务，可以由 Main 直接完成。
4. **Work Package 用于状态与验收**：`03-execute/work-packages/` 校准目标、上下文、恢复和验收边界，不是默认派发节点。旧 `steps/` 只作为旧称识别，不再兼容运行。
5. **最小上下文**：case、work package 和显式文件足够时，不 fork 完整聊天；只有依赖尚未落盘主线判断时才继承更多上下文。
6. **single-owner evidence**：每条证据面只交给一个 owner，Main 不重复调查；分身只回流结论、依据、风险、建议、改动文件和验证结果。
7. **平台实现不混用**：不同运行时的分身能力可能不同，构建时会选择目标平台的完整实现文档；没有专用覆盖时使用平台中立的公共降级规则。

## 项目状态 Gate

派发任何会读取 AIPD Workspace 的分身前，Main 先读取 `@references/workspace/project-state.md` 和 `@references/updates/catalog.json`，执行路径项存在性、symlink、manifest 双形态和 `P/I` gate。双根、symlink、invalid 或 `P > I` 停止；`unversioned-v2` 或 `P < I` 返回 `needs-aipd-update`；只有 `P = I` 才继续普通检索或 Case。

派发上下文检索 Agent 时，prompt 同时提供两份 reference 的可读路径和已判定的版本状态，让它重新验证安全门。分身不从 Agent Entry 推断项目版本。安全的额外 Workspace 模块作为项目定制保留，不作为默认扫描范围。

## Main Agent 直接处理边界

以下情况优先 Main Agent：

- 单一路径或内聚模块，执行过程持续依赖前序设计、代码或调试判断。
- 上下文规模可控，Case / Work Package 已足以承接压缩恢复。
- 启动、等待和合并分身的成本预计高于收益。

以下情况优先分身 Agent：

- 长文档、长日志、大量页面结构、批量扫描等高噪声材料，Main 最终只需要少量结论。
- 两条以上真正独立、可同时推进且不会写入冲突的工作线。
- 不需要继承整条主线的独立复核。

浏览器新流程、异常状态或路径不确定时，先与用户沟通，不让 Agent 无边界深入或盲目绕路。

## 平台差异

本文件只描述 AIPD 的抽象协作思路。

具体调度方式由 `aipd-skill/src/platforms/{platform}/core/agent-guide.md` 提供。构建时如果目标平台存在该覆盖文件，就使用平台实现；否则使用本文件，并且不假设任何专用 Agent API、上下文继承或目标模式能力。

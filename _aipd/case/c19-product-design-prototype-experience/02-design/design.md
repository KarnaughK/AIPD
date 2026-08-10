# Design：产品注意力与触发式减法机制

## Design Intake

- **Case 类型**：docs / process，research-to-implementation。
- **Design 模式**：quick。
- **最大风险**：把产品设计经验做成僵硬的大流程，或只写成一段需要每个任务手工粘贴的 Prompt。
- **设计目标**：复用现有 Case 回跳与 Goal Mode，只补产品类任务的判断镜头、触发条件、回跳产物和停止条件。

## Requirements Contract

### confirmed

- 机制主要在 AIPD Case 执行中生效，不依赖任务 Prompt 解释完整方法。
- 绑定 Case 的 Goal Mode 可以在既定目标与边界内自主推进、回跳和再验收，不要求用户逐轮监督。
- 产品类交付不能一次生成就结束；但普通任务不能被无差别强制多轮推导。
- Agent 必须能删除或推翻自己的既有设计，而不是只补充内容。
- “太复杂 / 要简化”要传播到同类页面或完整用户路径，不能只修用户点名的单页。
- 停止条件来自证据收敛，不来自固定轮数、Token 或运行时间。

### open / assumed

- 无阻塞级 open。
- 当前先用 Markdown 规则和 Case artifact 约束行为；独立行为 eval 以后由真实 Case 运行数据决定是否增加，本 Case 不预建评测系统。

## 归属决策

### 采用

1. `experience/product-design-attention-reduction.md`：保存真实失败模式、Attention Contract、触发器、Reduction Delta、权限和停止边界。
2. `case/phases/design.md`：仅在产品文档、原型、信息架构、用户界面或明确简化反馈下，要求短 Attention Contract。
3. `case/phases/verify.md`：对真实产物做一次 Reduction Scan；触发时回到 Design，不触发时直接收敛。
4. `case/goal-mode.md`：明确这类回跳属于内部质量 Gate，可以自主滚动，不把每轮变成用户确认。

### 不采用

- 不新增新的 Case phase。Verify -> Design 已能表达循环。
- 不新增大型 `product-design` Skill。当前触发入口由 `aipd-case` 的经验索引和 phase 文档承接。
- 不创建 SOP。这里不是一串每次机械执行的固定动作，而是一组条件判断。
- 不规定两轮、三轮或 Token 目标。
- 不把视觉审美、真实用户研究或业务方向取舍伪装成 Agent 已经验证的事实。

## 运行模型

```text
Design
  -> 产品类任务条件命中
  -> Attention Contract
Execute
  -> 形成真实文档 / 原型 / 页面
Verify
  -> 一次低成本 Reduction Scan
  -> 未命中触发器：Close
  -> 命中触发器：记录证据并回到 Design
Design
  -> Reduction Delta + 传播范围
Execute
  -> 修正受影响产物
Verify
  -> 再扫描，直到证据收敛
```

## 自主权限边界

### Case Contract 内可自主推翻

- 信息层级、分组、顺序、默认状态。
- 页面区块、视觉权重、文案密度和渐进披露。
- 已经完成但不再服务用户目标的局部设计或实现。

### 必须暂停询问

- 产品目标、目标用户、角色 / 权限和业务规则变化。
- Case 范围、验收标准、不可逆决策变化。
- 需要用户独有事实、主观方向判断或新的外部副作用授权。

## Brownfield Delta

### ADDED

- 产品设计注意力与触发式减法经验正文。
- Design 的条件式 Attention Contract。
- Verify 的条件式 Reduction Scan、回跳记录和 Reduction Delta 约束。
- Goal Mode 的产品类自主回跳语义。

### MODIFIED

- 经验索引新增产品设计经验类别与读取入口。

### 不改变

- Case 生命周期和目录结构。
- 普通 Case 的逐节点确认规则。
- Goal Mode 的启用条件、权限和外部副作用边界。
- 非产品类代码任务的默认运行成本。

## 文件计划

- `aipd-skill/src/core/experience/product-design-attention-reduction.md`
- `aipd-skill/src/core/experience/index.md`
- `aipd-skill/src/core/case/phases/design.md`
- `aipd-skill/src/core/case/phases/verify.md`
- `aipd-skill/src/core/case/goal-mode.md`
- 本 Case 的 Design / Execute / Verify 状态文件。

## Work Package Draft

### wp-01：嵌入触发式减法循环

- 把方法、触发、回跳、自主权限和停止条件写入上述四个运行落点。
- 验收：Agent 只需绑定目标并按 AIPD Case 推进，就能在产品类 Verify 中命中规则；不需要任务 Prompt 重述整套方法。
- 验收：没有固定轮数；非产品类任务不会增加强制流程。
- 验收：build、check-dist 和安装后产物包含新经验与规则。

## Readiness Gate

- **需求 open**：无。
- **目标 / 权限边界**：清楚。
- **最小性**：不新增 phase、Skill、SOP 或模板字段。
- **运行入口**：experience index -> Design / Verify；Goal Mode 接管自主回跳。
- **Verify 入口**：关键词、构建产物、平台一致性、安装产物。
- **状态**：passed。

## Design Checkpoint

- **当前节点**：readiness-gate。
- **节点状态**：completed。
- **停止点**：用户已经明确授权落盘，不再等待 Design 节点确认。
- **下一步**：进入 Execute，完成 `wp-01-embed-triggered-reduction-loop`。
- **恢复入口**：本文件 -> `03-execute/work-packages/wp-01-embed-triggered-reduction-loop.md`。

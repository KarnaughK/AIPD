# Design：显式 Leader 模式

> 本文根据用户已确认决定和最终实现恢复设计，不表示当时按本文顺序执行。

## 角色与运行层级

```text
User
  -> Leader task（一个项目一个 Leader，一个 active Mission）
      -> Case task（一个 Case 一个同级 Codex task）
          -> Child Agent / role Agent / tools（Case 内局部执行）
```

- Leader 对项目推进负责，可以在用户给定方向内探索、碰壁和调整局部路径。
- Case task 使用 `aipd-case`，允许 phase 回跳，但不创建新的同级 task。
- Child Agent 只承担 Case 内上下文隔离、真实并发或独立复核，不掌握跨 Case 方向。

## 启动与状态合同

- 只有显式调用 `$aipd-leader` 才启动；`allow_implicit_invocation: false` 是机器门禁。
- 自然语言提到 Leader、项目负责人、Mission、多 Case 或复杂任务只用于解释和建议。
- 一个项目不并发多个 Leader；Case 可以并发，但同一时刻只有一个 active Mission。
- 当前 task 的 Leader 身份不能由 Skill 自行切换模型；用户在启动 task 时设置。

## 工作记忆合同

- `_aipd/leader/` 是短中期恢复空间，不是第六类 Knowledge。
- Knowledge、Case、OKR、SOP、Map、README 或代码已有事实时，只留链接与当前影响摘要。
- Leader 可自主创建文字文件，但必须能恢复 Mission、方向变化、Case / task 绑定、待确认事项和下一位置。
- 失效内容删除；成熟内容迁往更权威位置。

## 模型合同

- Leader task：`gpt-5.6-sol / max / Fast`，由用户设置。
- Case task：创建时使用 `gpt-5.6-sol / high`；Fast 继承当前 Codex 配置，无法核验时显式说明。
- 不把当前模型名写成平台无关的永久哲学；它是当前 Codex 运行策略。

## 文件边界

- `src/skills/aipd-leader/`：用户显式入口与隐式调用策略。
- `src/core/leader/`：平台无关角色、Mission 和工作空间合同。
- `src/platforms/codex/core/leader/`：Codex 同级 task 生命周期和模型参数边界。
- `src/core/agent-entry/`：普通模式与 Leader / Case task 的第一跳规则。
- `src/core/updates/`：V2 release record 和 current authority。
- 项目 `_aipd/leader/`：项目定制的恢复入口。

## 复杂度爆点与护栏

- **爆点**：把“Leader 创建同级 Case task”和“Main 在 Case 内派发 Child Agent”混成递归调度。
- **最小解耦**：Leader / Case task 由显式 Skill 和 Codex runtime 约束；Case / Child 继续由现有 Agent Entry 与 `aipd-case` 约束。
- **禁止事项**：自动升级 Leader、Case task 再建同级 task、工作记忆复制正文、用 Skill 猜模型、仅凭 task 自报完成就总验收通过。

## Readiness 结果

- 用户已确认命名、角色、显式启动、工作空间、方向澄清和模型策略。
- 设计可独立投影到 Skill、core、Codex runtime、Agent Entry、Knowledge 和 release bundle；readiness passed。

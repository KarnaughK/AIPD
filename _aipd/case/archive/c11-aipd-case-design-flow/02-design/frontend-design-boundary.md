# Frontend Design Boundary

## 核心判断

AIPD Case Design 不需要承担完整视觉创意，也不应该替代 Figma、v0、设计师或专门 UI Agent。但只要 case 涉及前端，AIPD 必须把用户可见行为、状态、组件边界和验证方式设计清楚，否则 Execute 阶段会用猜测填补接口、状态和视觉空白。

## AIPD 必须负责的前端设计

### 信息架构

- 页面由哪些区域组成。
- 每个区域承载什么用户任务。
- 数据从哪里来，用户在哪些位置做输入 / 决策 / 提交。
- 哪些区域是主路径，哪些是辅助信息。

### 用户流程

- 用户从哪里进入。
- 成功路径是什么。
- 失败后留在原地、重试、回滚、跳转还是提示。
- 是否存在确认、撤销、取消、二次编辑。

### 交互状态

至少检查：

- empty。
- loading。
- success。
- error。
- disabled。
- dirty / unsaved。
- submitted。
- retry。
- permission denied。
- partial success。

### 前端状态模型

- 状态来源：URL、API、local form、global store、provider、component local。
- 生命周期：初始化、更新、提交、重置、销毁。
- 提交边界：何时写入后端，何时只保留在前端。
- 回滚和错误恢复。

### 组件边界

- 页面根组件负责什么。
- 哪些组件是业务黑箱，哪些是基础设施。
- 是否需要 provider / controller。
- 哪些数据应保持原始下发，哪些可以就地派生。
- 哪些组件状态值得写 Storybook stories 或截图验证。

### 验证入口

参考 Storybook 和 Playwright 的启发，AIPD 可以在 Design 阶段提出验证要求，但不在 Design 阶段执行验证：

- Storybook / component stories：适合硬到达 UI 状态、组件 variants、边缘状态和设计系统组件。
- Playwright E2E：适合用户主路径、跨页面流程、权限、提交和错误恢复。
- Playwright screenshot / visual comparison：适合布局、状态和关键视觉回归。
- 手工截图检查：适合低成本 case 或尚未接入自动化视觉测试的项目。

## AIPD 不默认负责的前端设计

- 生成完整视觉品牌方案。
- 产出高保真 Figma 稿。
- 写长篇 UI 文案策略。
- 选择字体、插画、品牌图形等审美资产。
- 在没有用户要求时引入 Storybook、Chromatic、Playwright visual baseline 等新工具链。

## 何时需要外部 UI / 视觉能力

出现以下情况时，Design 应标注“需要视觉参考 / UI Agent / 设计工具”，而不是在 AIPD 内部硬猜：

- 用户要求明显的视觉风格或品牌表达。
- 当前项目没有设计系统，但页面对视觉完成度要求高。
- 需要图像、插画、宣传页、活动页、复杂动效。
- 需要和竞品视觉对齐。
- 需要跨桌面 / 移动端精细响应式验收。

## Frontend Design artifact 建议结构

```md
# Frontend Design

## Scope

- 页面 / 组件：
- 用户角色：
- 入口：

## Information Architecture

| Area | User Task | Data Source | Notes |
|---|---|---|---|

## User Flow

1. ...

## Interaction States

| State | Trigger | UI Behavior | Backend / API Dependency |
|---|---|---|---|

## State Model

- Source:
- Lifecycle:
- Mutation path:
- Recovery:

## Component Boundary

| Component | Responsibility | Inputs | Emits / Context | Not Responsible For |
|---|---|---|---|---|

## Visual / QA Requirements

- Storybook stories:
- Playwright E2E:
- Screenshot / visual comparison:
- Manual screenshot:

## Open Questions

- ...
```

## 对 AIPD Design 流程的影响

- 前端设计应在需求契约和后端 / API contract 至少有草案后进行。
- 如果前端设计暴露出后端 contract 缺口，应回到 Backend Design，而不是由前端猜字段兜底。
- 如果视觉创意是核心风险，应在 Design Intake 阶段标为 `frontend-first` 或单独外部设计分支。
- Verify phase 不只检查功能可用，也要检查关键 UI 状态和设计护栏。

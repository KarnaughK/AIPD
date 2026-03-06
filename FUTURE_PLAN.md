# AIPD 未来演进计划

## 背景

当前 AIPD 是一个理念框架，单 Agent 串行执行。存在的问题：
- Claude Code 内置 todo 系统是通用的，不适合 AIPD 固定工作流
- 内置 subagent 不好用
- 单 Agent 串行执行太慢，一个功能拆成多个 plan 后只能一个个做

## 核心构想：多 Agent 调度 + SOP 资产积累

### 1. Plan 阶段设计分工（静态分配，非动态调度）

参考现实中的团队协作模式：
- 在创建 plan 时就规划好哪些任务可以并行、怎么拆模块、最后怎么拼
- 就像项目经理开工前分好活，不是运行时动态拉人
- 先把核心/重叠部分搞定，再让各 Agent 各干各的模块
- 最后由主 Agent 拼装整合

架构示意：
```
主 Agent（对话 + 调度）
  ├── Claude Code 实例 A → 执行 plan: 列表基础功能
  ├── Claude Code 实例 B → 执行 plan: 分页功能（独立模块）
  └── Claude Code 实例 C → 执行 plan: 搜索功能（独立模块）
```

### 2. 通过 Agent SDK 启动独立 Claude Code 实例

- 不用内置 subagent，而是用 Claude Code 的 Agent SDK 调新的 Claude Code 实例
- 每个实例能读 `_adoc/` 文档体系，拿到自己的 plan 独立干活
- 主 Agent 只管分发任务和收结果
- 好处：并发提速 + 节省主 Agent 上下文窗口（只拿结论做判断）

### 3. SOP 是越积越多的资产

- 每个流程跑通一次就沉淀成 SOP（如：多语言 SOP 已从实际项目中产出）
- SOP 内置到 AIPD 框架中，开箱即用
- 未来目标：所有开发流程都积攒成 SOP
- 每个 SOP 可以直接调一个单独的 Agent SDK 实例去执行

### 4. 渐进式文档加载（已在做）

- 之前所有内容写在 skill.md 里，现在拆到 references/ 下按阶段加载
- 后续继续往下叠加更多阶段文件和 SOP 文件

## 待解决的问题

1. **并发冲突**：多个 Agent 同时改代码时的文件冲突处理（考虑模块化隔离、git worktree 等方案）
2. **依赖分析**：plan 中任务的依赖关系判断（手动指定 vs 自动分析）
3. **Agent SDK 集成方式**：具体用什么语言/脚本调用（用户之前用过，待确认细节）

## 演进路线

```
现在：理念框架，单 Agent 串行
  ↓
近期：Plan 支持并行标记 + Agent SDK 调度原型
  ↓
中期：内置 SOP 库 + 多 Agent 并发执行
  ↓
远期：完整的多 Agent 开发框架，SOP 持续积累
```

# Docs Benchmark：优秀开源文档产品方法

## Branch Goal

研究 Vue、React 及少量文档口碑较好的开源项目，提炼适合 AIPD 的文档信息架构与教学流程。

## Trigger

来自 Case Think；需要在决定 README 与学习文档主线前获得外部证据。

## Scope / Stop Condition

- 调研首页价值表达、快速开始、教程 / 指南 / 概念 / 参考的分工、渐进披露和用户路径。
- 优先官方文档与维护者公开说明；社区口碑只作为发现线索，不作为唯一证据。
- 至少覆盖 Vue、React，并选择 2-4 个结构有代表性的开源项目。
- 当证据足以形成 AIPD 的采用 / 不采用原则和候选信息架构时停止。

## Evidence

- **Vue**：官方 Introduction 先解释产品定位与渐进采用方式，再明确先决知识，并在页尾让读者按学习偏好选择 Tutorial、Guide 或 Examples。可迁移点是“先让人判断适不适合，再给多条学习入口”，而不是要求所有人从同一目录顺序读到底。来源：<https://vuejs.org/guide/introduction>
- **React**：首页直接用可运行的产品能力证明价值；新版文档把 `Learn` 与 `API Reference` 分开，Learn 是可自学课程，Quick Start 给短导览，Tutorial 用项目让概念落地，Reference 页面也把形式定义与 Usage / Troubleshooting 分开。React 团队还明确把旧教程归档，避免新用户先学一套过时心智再重学。来源：<https://react.dev/>、<https://react.dev/blog/2023/03/16/introducing-react-dev>
- **Django / Diátaxis**：Django 首页先给 First steps，再公开说明 Tutorials、Topic guides、Reference、How-to 的不同职责。Diátaxis 将其概括为四种用户需求：学习、完成目标、查信息、建立理解；混写会同时削弱教程和操作指南。来源：<https://docs.djangoproject.com/en/4.2/>、<https://diataxis.fr/>、<https://diataxis.fr/map/>
- **Rust**：The Book 明确读者前提和阅读方法，交替安排概念章与项目章；既允许从头顺读，也给想先动手或先理解细节的人不同入口。Rust Documentation 再把学习书籍与标准库 Reference 分开。来源：<https://doc.rust-lang.org/book/ch00-00-introduction.html>、<https://doc.rust-lang.org/stable/>
- **Next.js**：Getting Started 围绕“创建第一个应用并掌握每个项目都会用到的能力”排序，另有从成品目标出发的完整项目课程；Guides 与 API Reference 独立承接工作时查阅。来源：<https://nextjs.org/docs/app/getting-started>、<https://nextjs.org/learn/dashboard-app>
- **社区口碑线索**：公开讨论中，Vue、Django、Rust、Symfony 反复因“可以直接靠官方文档学会”“从零带着做”“查阅舒服”被提名。它们不是质量证明本身，但与官方结构观察一致：读者赞赏的往往不是信息数量，而是能被带进门、能完成一件事、也能在工作时快速查到。线索：<https://www.reddit.com/r/opensource/comments/1ib8kr8/>、<https://www.reddit.com/r/webdev/comments/c2zz2z/>、<https://www.reddit.com/r/vuejs/comments/1g6h80d/>

## Pattern Comparison

| 项目 / 方法 | 首次接触 | 学习主线 | 工作时查阅 | 对 AIPD 的启发 |
|---|---|---|---|---|
| Vue | 定位、采用方式、前提 | Tutorial / Guide / Examples 可选 | API 与进阶主题 | 首页先帮助判断适配性，再分流 |
| React | 直接展示能力和价值 | Quick Start + 自学课程 + 项目教程 | Reference + Usage + Troubleshooting | “学会”与“查对象”必须分开 |
| Django / Diátaxis | First steps | Tutorial | How-to / Reference / Explanation | 每类页面只有一个主要工作 |
| Rust | 读者前提与阅读说明 | 概念章和项目章交替 | 独立 Reference / Bookshelf | 学习路径可以连续，也允许按偏好切入 |
| Next.js | 先决条件与第一应用 | 围绕完整成品的课程 | Guides / API Reference | 用最终可见结果牵引概念，而不是先铺术语 |

## Conclusion

- AIPD 应采用“首页决策页 + 连续教程 + 按需解释 / 参考”的三层结构，但不需要为了套框架新建完整文档站。
- 根 README 的任务不是列全功能，而是完成五件事：制造问题共鸣、给一句话心智模型、展示完整循环、提供最低摩擦开始方式、把不同读者导向正确下一站。
- `docs/guide/` 必须是一条能够顺读的首次旅程，并交替安排心智模型与实际动作；不能把 modules 换个顺序串起来冒充教程。
- `docs/modules/` 保留为 explanation / reference 层，允许从搜索或链接直接进入；每篇先说“何时需要它”和“它在完整循环里的位置”，再解释对象。
- AIPD 暂无可嵌入交互式沙箱，因此不模仿 React 的交互规模；用真实目录、真实指令、完整 Case 生命周期和可验证结果替代抽象玩具示例。
- 不把 Diátaxis 当成首页导航的四宫格标签。它用于约束内容职责；用户仍应看到自然语言的“先体验、再理解、工作时查”。

## Return To

- `../think.md`：写入外部调研结论与叙事主线建议。
- `../../02-design/design.md`：转化为 README / guide / modules 的页面职责和用户路径。

## Invalidates

当前没有下游设计或工作包，不使既有 artifact 失效。

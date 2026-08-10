# Think：AIPD 知识域与工作区命名

## 问题

L1-L5 最初来自项目从痛点到产品实现的推导过程，后来又承担长期知识库存储分类。编号使人和 AI 容易把它误读成固定递进读取顺序；同时 `_adoc/` 已经包含 SOP、Case、OKR、Inbox，不再只是知识文档目录。

## 已确认判断

- L1-L5 不是真正的运行层级，而是五类并列的长期知识域。
- 项目从 0→1 的推导过程、项目从 1→10 的业务线组织、AI 当前任务的读取顺序是三条不同链路，不应由同一组编号承担。
- Map 负责声明“哪里有什么”和按场景缩小范围；SOP 负责“如何读取或执行”；Case 负责当前目标的可恢复状态。
- 业务线、功能线和 shared capability 是跨知识域的场景视图，不应取代知识域分类。

## 命名比较

- `adoc_intent`：重复前缀且像变量名。
- `adoc.intent`：适合作为逻辑标识，不适合作为物理目录。
- `_aipd/adoc/intent`：品牌术语清楚，但 `adoc` 仍需解释。
- `_aipd/knowledge/intent`：工作区与长期知识语义最直接，未来新增知识域也不需要继续发明编号。

## 决策

采用 `_aipd/knowledge/{intent,research,core,product,engineering}`。物理路径不再使用 L1-L5；需要类型标识时使用 `knowledge.intent`、`knowledge.research`、`knowledge.core`、`knowledge.product`、`knowledge.engineering`。

迁移采用一次性转换器。新运行时只识别新 Schema，不保留旧路径双读、别名或 fallback。

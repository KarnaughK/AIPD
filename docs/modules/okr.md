# OKR

OKR 是 AIPD 的长期目标管理辅助能力。AIPD 里提到 OKR 时，默认就是飞书 OKR。

它不替代 `_adoc` 知识库，也不替代 Case / Work Package。它回答的是：当前阶段为什么要做这些事项，以及哪些结果说明项目方向被推进了。

实际操作优先使用 `/aipd-okr`。这个 skill 会读取 AIPD 中记录的飞书入口、按需查询飞书 OKR，并把周期、O/KR、飞书 ID、风险和建议压缩成 OKR 经验包，避免主 Agent 为了找 OKR 规则翻源码或加载完整 CLI 输出。

## 和三条主线的关系

OKR 主要服务第二层：Case / Work Package 开发逻辑。

它可以帮助判断：

- 哪些 case 更接近当前阶段目标。
- 某个 step 是否还在推进目标，而不是变成局部忙碌。
- case 归档时，哪些经验值得进入长期知识库。

OKR 也会连接 L1 Intent，因为阶段目标不能偏离项目长期方向。

在个人多项目场景中，通常会有一个全局 AIPD 项目承载最高视野和大 O，再把 KR 分配到多个子项目执行。飞书 OKR 维护这种跨项目关系；子项目 AIPD 只需要在创建和归档 case 时引用相关 KR。

## OKR 不是什么

OKR 不是 todo 列表。

它不负责记录每个具体任务的执行细节。具体事项应该进入 case，具体执行应该进入 step。

OKR 也不是产品路线图的完整替代品。它只保留当前阶段对 AI 协作有用的目标、关键结果和判断标准。

## 常见使用方式

一个常见链路是：

```text
L1 Intent
-> OKR
-> Case
-> Work Package
-> Weave Candidate
```

L1 定方向，飞书 OKR 定阶段目标，Case 固化一次短周期事项，Work Package 执行局部目标包，Weave Candidate 再判断执行经验是否回到知识库。

`/aipd-okr` 只做最小 CLI 检测：`command -v lark-cli` 和 `lark-cli auth status`。没有安装或未登录时，提示用户安装 / 登录即可。飞书查询输出应裁剪后返回，不把完整 JSON 当作聊天正文。

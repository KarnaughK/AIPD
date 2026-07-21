# OKR 目标管理 — 基础指引

## 这一层在做什么

AIPD 里的 OKR 默认指飞书 OKR。OKR 管理项目的中短期目标，并用于定期复盘执行情况。

OKR 和 Case 是项目执行的两条并行线：Case 管"做什么"，OKR 管"做到什么程度"。两者松耦合，可以先跑 Case 再回顾 OKR，也可以先定 OKR 再拆 Case。

## 飞书 OKR 在 AIPD 中的角色

飞书 OKR 是项目执行的方向锚点：

- 帮你记住这段时间最重要的结果是什么。
- 避免 Case 做了很多，但离目标没有更近。
- 给 `aipd-case` 的 Case Contract 以及 Think / Design / Execute / Verify / Close 提供目标对齐判断。
- 串联全局目标、子项目 KR 和具体 Case。

## O / KR 写法

O 要有方向感，KR 要可判断。

- O（Objective）：定性的方向，读起来让人知道"我们要去哪"。
- KR（Key Result）：可判断完成与否的结果，不是任务清单。

例如：

- O：让提示词的迭代过程可追溯、可验证。
- KR1：提示词支持版本对比。
- KR2：每个版本可关联测试用例运行结果。
- KR3：历史版本可一键回滚。

KR 不应写成"完成搜索功能开发"这种任务描述，而应尽量写成可判断的结果。

## OKR 和 Case 的关系

```text
飞书 OKR: 这段时间要达成什么
  ↕ 松耦合
AIPD Case: 具体做哪些事来推进
```

一个 KR 可能对应多个 Case，一个 Case 也可能推进多个 KR。不需要强制一一对应。

实际操作中，常见节奏是：

1. 在飞书 OKR 中定 O / KR。
2. 在相关 AIPD 项目里创建和执行 Case。
3. 定期回顾：这段时间的 Case 推进了哪些 KR？有没有偏离？

## 飞书 CLI 最小经验

Agent 只做最小检测：

```bash
command -v lark-cli
lark-cli auth status
```

如果没有安装或未登录，提示用户安装 / 登录 `lark-cli`。不要写复杂的兼容检测。

常用只读命令：

```bash
lark-cli okr +cycle-list --user-id <open_id> --user-id-type open_id
lark-cli okr +cycle-detail --cycle-id <cycle_id>
```

常用写入命令：

```bash
lark-cli okr +batch-create --cycle-id <cycle_id> --input '[{"text":"O","krs":[{"text":"KR1"}]}]'
lark-cli okr objectives delete --objective-id <objective_id> --yes
```

项目级可复用流程见 `_adoc/sop/feishu-okr-cli/README.md`。

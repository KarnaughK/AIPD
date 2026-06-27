# 飞书 OKR CLI 操作 SOP

## 目标

让 Agent 通过 `lark-cli` 读写飞书 OKR。AIPD 里提到 OKR 时，默认就是飞书 OKR。

本 SOP 只记录个人使用所需的最小流程，不做复杂环境兼容。

## 输入

- 用户要查看、创建、同步或删除的 OKR 内容。
- 目标飞书账号已安装并登录 `lark-cli`。
- 如需写入，用户允许对飞书 OKR 远端做修改。

## 最小检测

先检查 CLI 是否存在：

```bash
command -v lark-cli
```

如果不存在，提示用户安装：

```bash
npx @larksuite/cli@latest install
lark-cli config init
lark-cli auth login --recommend
```

如果存在，再看登录状态：

```bash
lark-cli auth status
```

登录状态里需要关注：

- `identity` 是否为 `user`。
- `identities.user.status` 是否为 `ready`。
- `openId`，后续查询用户 OKR 周期要用。
- scope 中是否有 `okr:okr.period:readonly`、`okr:okr.content:readonly`；写入时还需要 OKR write 相关 scope。

## 读取周期

用当前用户的 `openId` 查询周期：

```bash
lark-cli okr +cycle-list --user-id <open_id> --user-id-type open_id --format json
```

也可以限制时间范围：

```bash
lark-cli okr +cycle-list --user-id <open_id> --user-id-type open_id --time-range 2026-06--2026-06 --format json
```

记录需要写入的 `cycle_id`。

## 读取周期详情

```bash
lark-cli okr +cycle-detail --cycle-id <cycle_id> --format json
```

只看数量时：

```bash
lark-cli okr +cycle-detail --cycle-id <cycle_id> --jq '{cycle_id:.data.cycle_id,total:.data.total}' --format json
```

## 创建 O / KR

先 dry-run，确认请求结构：

```bash
lark-cli okr +batch-create \
  --cycle-id <cycle_id> \
  --input '[{"text":"目标文本","krs":[{"text":"关键结果 1"},{"text":"关键结果 2"}]}]' \
  --dry-run \
  --format json
```

确认后执行：

```bash
lark-cli okr +batch-create \
  --cycle-id <cycle_id> \
  --input '[{"text":"目标文本","krs":[{"text":"关键结果 1"},{"text":"关键结果 2"}]}]' \
  --format json
```

返回里会包含 `objective_id` 和 KR id。写入后再用 `+cycle-detail` 验收。

## 删除测试 Objective

删除 objective 是 high-risk-write，需要 `--yes`：

```bash
lark-cli okr objectives delete --objective-id <objective_id> --yes --format json
```

删除后再查周期详情，确认 `total` 和 `objectives` 符合预期。

## AIPD 记录规则

- `_adoc/okr/index.md` 记录飞书 OKR 的入口、周期 ID、目标 ID 或协作边界。
- Case / Work Package 需要对齐 OKR 时，读取飞书 OKR 或引用 `_adoc/okr/index.md` 中记录的飞书 ID。
- 一次性测试创建和删除过程不写入长期认知；只有可复用的 CLI 操作经验进入本 SOP。

## 本次验证过的经验

- `lark-cli okr +cycle-list` 可读取当前用户 2026 年 1 月到 7 月周期。
- 空周期的 `+cycle-detail` 会返回 `objectives: []` 和 `total: 0`。
- `+batch-create` 会先创建 Objective，再把 KR 挂到该 Objective 下。
- `objectives delete` 可以删除刚创建的 Objective；删除后 2026-06 周期重新变为空。

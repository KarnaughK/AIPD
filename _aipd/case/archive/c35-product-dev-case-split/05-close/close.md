# Close: c35-product-dev-case-split

## 闭环

- 状态：completed。用户 2026-11-17 确认本轮 Case 体系迭代完成并要求结束。
- 已完成：产品 Case / 开发 Case 拆分（含拆分理由、开发 Case 强制项目架构分析）、知识基线（map 路由定向读、标出处、Close 对照回写）写入 `aipd-case` 及副本；`check-skills` 通过。
- 未执行：真实项目试跑一对 `cN` + `cN_dev`。用户选择先结束本 Case，试跑反馈留给后续使用，有问题时另开 Case。
- 通用 Case：用户未提出异议，按现规则保留。

## 归档候选 / 反向编织候选

| 内容 | 来源 | 状态 | 归属 | Close 判断 |
|---|---|---|---|---|
| Case 分产品 / 开发两类、`cN_dev`、一对一、拆分理由 | 本 Case | 已实现 | Core `horizontal-capabilities.md`、Product `index.md`、`_aipd/map.md` | 已回写 |
| 知识基线 | 本 Case | 已实现 | 同上 | 已回写 |
| 维护者发布流程改为 push -> `magpie library skill update` | Verify 记录 / 用户确认 | 已在用 | Engineering `index.md`、`AGENTS.md` 与 Agent Entry 模板、`docs/modules/build-and-install.md`、`aipd-skill/README.md`、map | 已回写 |
| 可执行验收分层 | 本 Case | 已实现 | Skill 规则即事实源 | 不单独回写 |
| 根 README、docs/guide 生命周期与 install 叙事 | 本 Case | 未处理 | 用户文档 | 延后：对外用户仍可用 install 脚本，叙事更新另开文档 Case |

## 长期认知审计

- 已回写：见上表。
- 仅留 Case：讨论过程、grok 会话依据。
- 未发布新 AIPD 版本，catalog / update-log 未动。
- archive：移动到 `_aipd/case/archive/c35-product-dev-case-split/`。移动前 `rg` 确认除 case index 外无其他引用。

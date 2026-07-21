# Close：README 与学习文档产品化

## 关闭前状态

- Think：completed。
- Design：completed，Readiness Gate passed。
- Execute：wp-01 / wp-02 completed。
- Verify：passed。
- 阻塞：无。

## 待处理

- [x] 汇总交付、验证和残留风险。
- [x] 判断 Close 归档候选的稳定归属。
- [x] 更新 `_adoc/case/index.md`，将 c18 从进行中移入归档。
- [x] 更新 Case 状态；平台目标在目录归档与最终检查完成后标记 complete。

## 交付摘要

- 根 `README.md` 从“三条主线功能说明”升级为项目决策页：问题共鸣、记忆循环、五分钟开始、一次完整闭环、九个 Skill、核心原理、适用边界和继续学习。
- `docs/README.md` 改为先体验、连续学习、工作时查阅三种入口。
- 六篇 `docs/guide/` 保留稳定路径，重写为从问题到第一轮闭环的连续课程。
- 11 篇 `docs/modules/` 全部完成一致性校准；重点更新 phase-first Case、Case 内 Think、文件 checkpoint、Goal Mode、Main / Child、Weave / Learn、SOP、实践经验和构建边界。
- 外部调研、Design、两个 Work Package 与 Verify 证据完整留在本 Case。

## 验证摘要

- 20 个用户文档文件的 Markdown 本地链接目标全部存在。
- 文档 Skill 集合与源码一致：9 项。
- 文档引用的 8 个脚本路径全部存在。
- `git diff --check` 通过。
- 旧 Think / step / fork 语义未作为现行规则残留。
- `./aipd-skill/scripts/check-dist` 通过：源码 / 产物同步、静态引用、平台差异、关键语义和 cleanup 入口正常。
- README 快速体验、六章连续学习、modules 按问题查阅三条路径人工检查通过。

## 归档候选 / 反向编织候选

| 内容 | 触发来源 | 当前状态 | 候选归属 | Close 判断 |
|---|---|---|---|---|
| README 是决策页、guide 是连续教程、modules 是 explanation / reference 层 | Think / Design / Execute / Verify | 已完成、已验收 | `_adoc/L5-dev/index.md` | 延后回写；`aipd-weave` 要求长期 ADOC 写入前单独确认，且用户原始范围是根 README + 学习文档 |
| 项目 map 的“docs / 学习文档 / 三条主线”入口应改为“记忆循环 / 快速体验 / 连续课程 / 按需查阅” | Verify 长期认知审计 | 已完成、已验收 | `_adoc/map.md` | 延后回写；与上项同批确认后处理 |
| `aipd-skill/README.md` 仍描述旧 Case / Step 和旧 Skill 目录 | Verify 人工路径检查 | 已确认过时，但不属于本次目标文档 | 源码局部 README | 新建后续专项或与上两项一起处理；本次已移除从用户学习路径到该旧文档的链接 |
| Vue / React / Django / Rust / Next.js / Diátaxis 调研过程 | Think | 一次性外部调研 | 仅留 Case | 不回写长期 L2；其稳定产物已经体现在现行 README / docs 结构中 |

## 长期认知审计

- **已回写**：根 README 与 `docs/` 已成为当前对外事实。
- **延后回写**：`_adoc/L5-dev/index.md` 与 `_adoc/map.md` 的旧“三条主线”描述，等待用户单独确认 `aipd-weave` 方案。
- **仅留 Case**：外部资料对比、现状差距清单、Design 取舍和验收过程。
- **无需回写**：没有新增 L3 核心模型、L4 产品能力或 SOP。

## Archive 决策

- `rg "c18-readme-learning-docs-productization" _adoc` 只命中本 Case 自身和 `_adoc/case/index.md`，没有其他 Case、长期认知或 SOP 依赖当前路径。
- `_adoc/case/index.md` 已改为 `archive/c18-readme-learning-docs-productization`。
- 决策：移动到 `_adoc/case/archive/`。

## 未执行的外部动作

- 未执行 install、Git add / commit / push、发布或远端消息。
- 本 Case 只修改 Markdown，无需运行 Skill build；执行的 `check-dist` 是只读一致性验证。

## 关闭结果

- **状态**：completed / archived。
- **关闭时间**：2026-07-21。
- **残留风险**：三个延后文档候选已明确，不影响本 Case 的根 README 与学习文档交付。

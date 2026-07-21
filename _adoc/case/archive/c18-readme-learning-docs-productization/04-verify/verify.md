# Verify：README 与学习文档产品化

## 验收目标

依据 Case Contract 检查：

1. 外部调研和采用 / 不采用原则是否可追溯。
2. 根 README 是否完成价值吸引、心智建立、快速开始和下一步分流。
3. guide 是否形成不依赖对象字典的连续旅程。
4. Skill、核心理念、运行原理和边界是否与源码一致。
5. 链接、命令、术语、目录和 Markdown 格式是否通过检查。
6. Case 状态与执行证据是否可恢复。

## 验收计划

- [x] Markdown 相对链接目标全部存在；忽略外部 URL 和纯锚点。
- [x] `git diff --check` 通过。
- [x] 文档列出的 Skill 集合与源码 / `check-dist` 一致。
- [x] 文档中的脚本命令和路径在仓库中存在。
- [x] 旧入口、旧目录和旧语义只出现在明确的迁移说明中。
- [x] 从 README -> 五分钟开始 / 完整学习 -> 第一轮操作卡的两条路径人工检查通过。
- [x] 外部调研 evidence 和 Design 决策可从 Case 恢复。

## 验收结果

自动检查首轮发现：根 README 的源码维护分流仍指向未纳入本 Case 更新范围、且包含旧 Case 模型的 `aipd-skill/README.md`。已按文档职责边界移除该用户路径，改为指向本轮更新后的构建模块和项目 map；旧局部 README 作为后续源码文档专项候选，不阻塞本 Case。

### 自动检查

| 检查 | 结果 | 证据 |
|---|---|---|
| Markdown 相对链接 | passed | `LINKS_OK 20 files`；根 README + 19 个 `docs/**/*.md` 的本地目标均存在 |
| Skill 集合 | passed | `SKILLS_OK 9`；与 `aipd-skill/src/skills/` 一致 |
| 脚本路径 | passed | `SCRIPTS_OK 8`；文档出现的 8 个用户 / 维护脚本均存在 |
| Markdown / diff 格式 | passed | `git diff --check` 无输出 |
| 旧现行语义 | passed | Case 前 Think、step 现行执行、`fork_context: true` 通用规则等匹配为空；旧命令 / 目录只留迁移说明 |
| Skill 构建产物一致性 | passed | `./aipd-skill/scripts/check-dist`：9 个 Skill、源码同步、静态引用、平台差异、关键语义和 cleanup 入口均正常 |

### 人工路径检查

1. **快速体验路径**：README Hero -> AIPD 如何工作 -> 五分钟开始 -> 第一个真实 Case -> `docs/guide/06-first-complete-flow.md`。读者不需要先理解九个 Skill 或 L1-L6 全部细节即可开始。
2. **连续学习路径**：README -> `docs/README.md` -> 六章课程。课程按问题、记忆循环、最小认知、首个 Case、项目学习、完整操作卡递进，每章都有下一章链接。
3. **工作时查阅路径**：`docs/README.md` 按“读懂项目 / 完成目标 / 捕获回写 / 工程深入”分流到 modules；modules 可独立进入，不承担首次教程。

### Case Contract 验收

- **调研可追溯**：passed。Vue、React、Django / Diátaxis、Rust、Next.js 和社区口碑线索记录在 `01-think/docs-benchmark/summary.md`，包含采用与不采用原则。
- **README 决策能力**：passed。短路径内回答项目问题、价值、差异、运行循环、开始方式、适用边界和下一站。
- **连续用户旅程**：passed。六篇 guide 不再按对象平铺，能够走到一次完整实践。
- **能力与实现原理准确**：passed。九个 Skill、Map-first、文件 checkpoint、phase-first Case、Goal Mode、Main / Child、Weave / Learn、SOP、实践经验和构建边界已在对应层级解释。
- **Case 状态可恢复**：passed。Think、Design、两个 Work Package 和 Verify 证据均已写回。

## Verify Result

- **状态**：passed。
- **未通过项**：无。
- **残留风险**：`aipd-skill/README.md` 是源码目录局部说明，包含尚未迁移的历史 Case / Step 结构；本 Case 已移除对它的用户学习路径引用，建议另建源码局部 README 更新事项，不把它混入本次根 README / 学习文档范围。
- **用户验收状态**：Goal Mode 下依据 Case Contract 与自动 / 人工证据自主通过；没有必须由用户独有事实判断的验收项。
- **下一步**：进入 Close。

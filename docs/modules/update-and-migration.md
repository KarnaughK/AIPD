# Update 与 Schema 迁移

当一个项目已经接入 AIPD，但本机 Skill 升级了、项目仍使用旧 `_adoc/`，或同版本入口出现漂移时查这篇。

Schema 迁移和 AIPD Update 是两件不同的事：迁移器只改变旧工作区的数据形状，Update 才把项目的 AIPD 规则完整收敛到当前电脑已经安装的发布版本。

## 两个版本字段

`_aipd/manifest.json` 同时记录两种事实：

```json
{
  "schema": "aipd-project",
  "schemaVersion": 2,
  "aipdVersion": 2
}
```

- `schemaVersion` 表示 Workspace 的数据形状。
- `aipdVersion` 表示这个项目最后成功应用的完整 AIPD 发布快照，记作项目版本 `P`。
- 当前电脑已安装 AIPD 的 `updates/catalog.json#currentVersion` 是目标版本 `I`。

`I` 不从 Git tag、远端仓库、项目 `AGENTS.md` 或 README 推断。Update 面向“本机已经安装的版本”，不是联网追逐最新版。

## 普通任务前先过项目 gate

所有普通 AIPD 读取和写入都先确认项目身份与版本：

| 项目状态 | 含义 | 普通 Skill 的行为 |
|---|---|---|
| 未初始化 | `_aipd` 和 `_adoc` 都不存在 | 交给 `aipd` 初始化 |
| legacy | 只有旧 `_adoc` | 交给 `aipd-update`，先做一次性迁移 |
| `unversioned-v2` | v2 manifest 只有 `schema` 与 `schemaVersion` | 返回 `needs-aipd-update` |
| stale | `P < I` | 返回 `needs-aipd-update` |
| current | `P = I` | 检查本任务必要入口后继续；缺入口属于可修复 drift |
| future | `P > I` | 本机包太旧，硬停止，不降级项目 |
| invalid | 双根、symlink、非法 manifest 或保留路径类型冲突 | 硬停止并报告精确原因 |

这道 gate 防止旧项目局部套用新规则。`P = I` 也不代表每个可选文件都存在；当前版本缺少必要入口时，仍由 Update 做同版本 drift repair。

## 一次性 migrator 做什么

`migrate-project-schema` 只处理完整旧 `_adoc` 工作区到 `_aipd/knowledge/*` 的确定性结构迁移：

- 先 dry-run，拒绝 dirty、双根、混合状态、symlink、ignored AIPD 文件、目标碰撞和无法可靠归类的裸编号语义。
- 原子切换目录、Agent Entry 标记区块和项目级 Agent 配置。
- 迁移结果写精确两键 manifest，状态是 `unversioned-v2`。

它不写 `aipdVersion`，也不代表项目已经应用当前发布。迁移完成后必须继续 Update。

源码仓库中的命令和完整拒绝边界见[构建与安装](build-and-install.md#旧项目一次性迁移)。安装后的 `aipd` Skill 也会随包携带同一脚本，Agent 不需要依赖 AIPD 源码 checkout。

## Update 怎样工作

`aipd-update` 不逐版本回放文件修改，而是先理解演进，再一次合并到最终态：

```text
项目版本 P + 本机版本 I
-> 完整读取 (P,I] Release Records
-> 读取 I 的 current authority
-> 读取项目真实内容和定制
-> 一次语义收敛到 I
-> 验证
-> 最后写 update-log 与 manifest#aipdVersion=I
```

Release Records 只解释“发生过什么、什么被替代、什么要保护”。最终结果以版本 `I` 的当前权威文档和模板为准；项目不会逐个落到可能已经被后续版本撤销的中间状态。

## 谁拥有哪些内容

- **AIPD-owned**：manifest、AIPD 标记区块和框架入口，按当前发布收敛。
- **project-owned**：五类 Knowledge 正文、业务事实、代码就近 README 和 Agent Entry 标记外内容，默认保留。
- **mixed**：项目 index / map、流程索引和进行中 Case，按语义合并，不能拿模板整文件覆盖。

安全的 additive 与明确语义更新默认执行。删除、移动、覆盖项目内容或无法判断的项目定制冲突会暂停，只询问解决冲突所需的最小问题。

Update 不会自动提高 Agent MD 等级，也不会顺便 install、commit、push 或写远端。

## 怎样判断更新完成

只有在结构、入口、标记区块、项目正文和进行中状态都验证通过后，Update 才同时：

1. 在 `_aipd/update-log.md` 记录原版本、目标版本、已读记录、实际合并、验证和保留差异。
2. 把 manifest 的 `aipdVersion` 写为 `I`，作为最终成功标记。

同版本没有 drift 时返回 no-op，不为制造日志而修改项目。任一步失败时都不能声称项目已经更新完成。

相关入口：

- `aipd-skill/src/skills/aipd-update/SKILL.md`
- `aipd-skill/src/core/workspace/project-state.md`
- `aipd-skill/src/core/updates/`
- `aipd-skill/scripts/migrate-project-schema`

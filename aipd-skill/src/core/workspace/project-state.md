# AIPD 项目状态合同

本合同把路径安全、Schema 身份、项目已应用版本和 Workspace 完整度分开判断。普通 AIPD Skill 在读取或写入项目之前，先读取 `@references/updates/catalog.json`，从 `currentVersion` 取得本机版本 `I`；不得从 `AGENTS.md`、Git tag 或远端推断版本。

## 1. 路径项与安全门

先以路径项存在性分别检查 `_aipd` 和 `_adoc`；损坏 symlink 和同名普通文件也算存在。

| 路径状态 | 结果 |
|---|---|
| 两者都不存在 | `absent`；只有 `aipd` 初始化入口可以创建新项目 |
| 仅 `_adoc` 存在 | `legacy-needs-migration`；普通 Skill 停止，交给 `aipd-update` / 一次性 Schema 迁移器 |
| 两者同时存在 | `invalid`；双根硬停止，不猜测、不合并 |
| 仅 `_aipd` 存在 | 继续安全与 manifest 检查 |

当前根必须是真实目录而不是 symlink，且 `_aipd/` 内不得存在任何 symlink。`manifest.json` 必须是非 symlink 的普通文件和有效 JSON object。以下状态都属于 `invalid` 并立即停止：

- 根、工作区内部或必要入口是 symlink，包括损坏 symlink。
- `manifest.json` 缺失、不是普通文件、JSON 损坏或不是 object。
- AIPD 保留文件位置被目录占用，或保留目录位置被普通文件占用。
- `_aipd/` 内出现真实源码 / 构建目录，例如顶层 `src/`、`app/`、`lib/`、`packages/`、`code/`、`node_modules/`、`dist/` 或 `build/`；真实代码应留在项目源码目录。

`manifest.json` 是身份硬门；`index.md`、`map.md`、Knowledge 或流程入口缺失则是可修复的 Update diff，不因“不是最新结构”提前判成 invalid。如果这些入口存在但类型冲突或是 symlink，仍然硬停止。

AIPD 保留文件位置是 `manifest.json`、`index.md`、`map.md`、`inbox.md` 和 `update-log.md`；保留目录位置是 `knowledge/`、`sop/`、`case/` 和 `okr/`。对这些路径只区分“缺失可修复”与“存在但类型冲突需停止”，不猜测改名。

除保留名、代码目录、symlink 和类型冲突外，额外的真实文件或目录可以是项目自定义 Workspace 模块。普通 Skill 不把它们当成当前 AIPD 必选结构；Update 应先理解用途并默认保留，不得因为目录未知就删除或判 invalid。

## 2. Manifest 双形态

Schema v2 只识别以下两种形态；JSON key 顺序不重要，但 key 集合必须精确匹配。

无版本 v2：

```json
{
  "schema": "aipd-project",
  "schemaVersion": 2
}
```

已版本化 v2：

```json
{
  "schema": "aipd-project",
  "schemaVersion": 2,
  "aipdVersion": 2
}
```

`aipdVersion` 必须是 JSON 正整数。错误 schema / schemaVersion、非正整数、字符串版本、未知额外字段或其他 key 组合都属于 `invalid`。缺少 `aipdVersion` 是已识别的 `unversioned-v2`，不是 invalid，也不能伪造为 V0。

## 3. 版本状态

对通过身份安全门的项目，以 manifest 的项目版本 `P` 和 catalog 的本机版本 `I` 判断：

| 状态 | 条件 | 普通 Skill 行为 |
|---|---|---|
| `unversioned-v2` | 精确两键 manifest | 返回 `needs-aipd-update`，不做项目 AIPD 读写 |
| `stale` | `P < I` | 返回 `needs-aipd-update`，不局部套用新规则 |
| `current` | `P = I` | 可继续；再检查本任务所需入口是否存在且类型安全 |
| `future-project` | `P > I` | 硬停止；本机安装包太旧，不降级项目，也不查询远端 |
| `invalid` | 身份、类型或版本不合法 | 硬停止并报告精确依据 |

返回 `needs-aipd-update` 时，应说明项目状态和项目版本（如有），并路由当前安装的 `aipd-update`。只有 `aipd-update` 可以把安全的 unversioned / stale / current-drift 项目作为更新输入；普通 Skill 不写 `aipdVersion`。

`P = I` 只说明上次完整更新已经成功，不保证每个可选文件都存在。必要入口缺失时路由 Update 做 drift repair；安全的项目自定义模块继续保留。

## 4. Schema 迁移与发布更新

一次性迁移器只负责确定性的 `_adoc -> _aipd` 结构切换，迁移后写精确两键 `unversioned-v2` manifest。它不写 `aipdVersion`，也不代表已经应用当前发布。

Update 完整读取版本记录、当前权威和项目事实，一次收敛到最终态；只有最终验证通过后才把 `aipdVersion` 写为 `I` 并追加 `_aipd/update-log.md`。Release Records 是演进上下文，不是逐版执行脚本。

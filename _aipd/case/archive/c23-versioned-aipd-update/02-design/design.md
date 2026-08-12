# Design：基于本机发布快照的 AIPD Update

## Design Intake

- **Case 类型**：framework refactor / docs-process / versioned migration。
- **模式**：full。
- **主要风险**：把 Schema 合法性、项目已应用版本和本机发布版本混成一个字段；或把版本日志误做成必须逐条执行的迁移脚本。
- **阻塞级 open**：无。
- **当前状态**：brownfield 文件面已审计，进入 Execute。

## Requirement Contract

### Confirmed

- 多个项目可独立记录各自已应用的 AIPD 版本。
- 本机安装包声明唯一当前版本 I；Update 不访问远端。
- Update 选择 `(P,I]` 版本记录作为演进上下文，但不逐版本落盘。
- I 对应的当前文档 / 模板是最终目标，目标项目实际内容是需要保留的定制事实。
- 正常安全更新默认执行；只对破坏性或无法判定的冲突停下确认。
- 成功验证以后才写 `aipdVersion=I` 和项目更新日志。

### Assumed

- 第一版正式版本化基线使用整数 `1`；版本只表达有序发布快照，不借用 Git tag、日期或 SemVer 的兼容性承诺。
- 现有缺少 `aipdVersion`、但结构安全且 `schema=aipd-project/schemaVersion=2` 的项目称为 `unversioned-v2`，通过 V1 bootstrap 记录升级。
- Schema 仍为 v2；`schemaVersion` 表达工作区数据形状，`aipdVersion` 表达已应用的完整 AIPD 发布快照，两者分工而非互相替代。

### Open

- 无阻塞项。具体文件清单可在 brownfield 审计后扩充，但不得改变上述对象模型和远端边界。

## 核心对象

| 对象 | 事实源 | 职责 |
|---|---|---|
| 本机当前版本 I | 随 Skill 打包的机器可读版本目录 | 声明本机可更新到哪里 |
| Release Record | 每版一份顺序更新记录 | 说明变化背景、替代关系、保护点和最终事实源入口；不作为逐版执行脚本 |
| Current Snapshot Guide | 当前版本说明 | 指向本机包内的现行结构、模板、Agent Entry 和流程文档 |
| 项目已应用版本 P | `_aipd/manifest.json#aipdVersion` | 声明该项目最后一次成功应用的完整 AIPD 版本 |
| 项目更新日志 | `_aipd/update-log.md` | 记录 P -> I、实际合并摘要、验证和需要保留的项目差异 |
| Schema version | `_aipd/manifest.json#schemaVersion` | 识别工作区数据形状；不表示完整 AIPD 功能版本 |

## 本机版本目录合同

建议源码边界：

```text
aipd-skill/src/core/updates/
├── catalog.json          # currentVersion、记录顺序和 record 路径
├── current.md            # 当前快照的权威文档 / 模板入口
└── releases/
    └── v1.md             # 第一版正式记录；包含 unversioned-v2 bootstrap 语义
```

`catalog.json` 是唯一当前版本机器事实源。每次发布必须：

- `currentVersion` 等于 releases 中最后一个版本。
- 版本严格递增、唯一、无空洞；每个 record 文件存在。
- workspace manifest 模板的 `aipdVersion` 等于 `currentVersion`。
- `aipd-update` 产物包含完整目录和 `current.md` 引用的当前事实源。
- 一次性 Schema 迁移器继续产出无版本 v2，不能因为完成目录迁移就冒充已经应用当前发布；其 fixture 必须证明 versioned v2 可校验、旧根迁移后仍需进入 Update。

## 项目 manifest 合同

当前目标形态：

```json
{
  "schema": "aipd-project",
  "schemaVersion": 2,
  "aipdVersion": 1
}
```

状态判定分两层：

1. **结构安全 gate**：根路径项、真实目录、symlink、manifest 普通文件、JSON 类型和 Schema 身份；任何歧义 / 非法类型立即停止。`index.md` / `map.md` 等当前内容缺失属于 Update diff，不在身份 gate 提前阻塞。
2. **版本 gate**：
   - 精确两键且缺少 `aipdVersion`：`unversioned-v2`，只允许进入 Update / bootstrap；缺失版本不是伪造的 V0。
   - `P < I`：stale，可更新；普通写入 Skill 路由到 `aipd-update`。
   - `P = I`：current，正常运行；Update 返回 no-op。
   - `P > I`：future-project，本机包太旧，硬停止且不降级项目。
   - 非正整数、未知额外字段或 Schema 不识别：invalid，硬停止。versioned manifest 只接受精确三键形态。

安全但不占用保留名的额外 Workspace 模块属于项目 customization，例如当前项目实验性的 `_aipd/leader/`。它不因此进入初始化模板或成为 V1 必选结构，但 Update 和 current check 必须保留它；`_aipd/code`、`_aipd/knowledge/code`、旧编号目录、symlink 和文件 / 目录类型冲突仍明确拒绝。

## Update 主流程

```text
安全识别项目状态
-> 读取本机 catalog，得到 I
-> 读取项目 P（缺失则为 unversioned-v2 bootstrap）
-> 选择并完整读取 (P,I] Release Records
-> 汇总演进、替代关系、保护点和当前事实源入口
-> 读取 current.md 指向的版本 I 文档 / 模板
-> 读取目标项目真实状态、用户正文、Agent MD 标记区块和项目定制
-> 形成一次 P -> I 的最终态差异与风险
-> 自动执行 additive / 可证明安全的 semantic 合并
-> 仅在 destructive / 歧义冲突时暂停并请求精确选择
-> 验证最终项目
-> 最后原子写 aipdVersion=I，并追加 update-log
```

重要护栏：Release Records 是上下文，不是逐版待办清单。只有目录移动等确定性的底层结构迁移允许内部按依赖排序；最终项目不暴露中间版本状态。

## Update 停止条件

只在以下情况停止：

- `_adoc` / `_aipd` 双根、根或必要入口是 symlink / 错误类型、工作区内 symlink。
- manifest 损坏、Schema 身份不可识别、项目版本不是合法整数或高于本机版本。
- 本机 catalog、record、当前快照文档或打包产物不一致。
- Git 存在 unresolved conflict，或即将改写的目标处于无法安全保护的脏状态。
- 用户正文与当前最终态存在必须删除 / 覆盖 / 重命名的真实冲突，且无法保留两者语义。

缺失最新目录、索引、模板区块、旧措辞或过期 Agent Entry 都是正常更新输入，不是停止原因。

## 一次性 Schema 迁移器边界

`migrate-project-schema` 只完成可确定的 `_adoc -> _aipd` 结构与路径迁移：

- 旧根迁移完成后写入精确两键的无版本 v2 manifest，不写 `aipdVersion`。
- `--check` 同时接受精确两键 unversioned v2 和精确三键 versioned v2；未知额外字段仍拒绝。
- 迁移完成后明确引导运行 `aipd-update`，由后者读取 V1 bootstrap 记录、当前事实源和项目内容，完成语义收敛后才写版本。
- 这样 Schema 迁移的成功不会被误报成完整 AIPD 发布已经应用。

## Brownfield Delta

### ADDED

- `src/core/updates/` 本机版本目录。
- `_aipd/update-log.md` 项目更新结果日志及模板。
- 版本目录一致性 validator / fixture。

### MODIFIED

- `aipd-update`：从规则副本 + 审计确认模式改为版本区间上下文 + 当前事实源 + 一次语义收敛。
- manifest 模板、初始化入口、Schema migrator 和 fixture。
- 所有直接读写项目的 Skill / Agent gate：安全 Schema 与发布版本分层判定。
- Agent Entry、项目结构文档、Product / Engineering / Map 和公开 Skill 说明。
- build / check-dist：验证本机完整快照一致性。

### REMOVED

- `aipd-update` 内部复制的整套“最新项目必须长什么样”硬编码正文。
- 普通 safe update 一律先输出清单再等待用户确认的固定 gate。
- “不是精确当前 manifest 就一律未知 / 停止”的单层判断。

### 不能破坏的行为

- Schema v2 的双根、path-entry、symlink 和非法类型安全门。
- Agent MD 标记区块外内容不覆盖。
- Knowledge 正文不凭模板重写，未验证 Case 结论不织入长期知识。
- build 后 install 必须再次获得用户明确确认。

## Context Boundary / Code Topology Contract

- **拓扑敏感**：是。
- **纵向业务上下文**：AIPD 版本化项目更新；owner 为 `src/core/updates/` 与 `src/skills/aipd-update/`。
- **允许的横向依赖**：workspace templates、Agent Entry、Case templates、Schema migrator、build/check-dist。
- **显式组合边界**：catalog 只声明版本和记录；release record 只描述演进；current guide 只索引最终事实源；Update Skill 负责编排；项目 manifest / update-log 只存应用结果。
- **禁止事项**：Release Record 复制完整当前文档；Skill 再维护第二份当前结构；运行时联网；逐版落盘；用 AGENTS.md 推断项目版本。
- **共享变化权限**：允许统一修改项目版本 gate 和发布校验；不建立组件级版本解析框架。
- **独立验收边界**：版本目录、项目状态机、Update Skill 产物、Schema migrator、默认 Codex 包和通用平台 fallback 可分别验证。
- **认知回写**：通过 Verify 后更新 Core / Product / Engineering / Map 当前事实源。

## 预定 Work Package

1. **wp-01 release contract and runtime gates**：版本目录、manifest、初始化 / 迁移与直接 Skill gate。
2. **wp-02 update orchestration and project knowledge**：重写 `aipd-update`，补 Update 产品 / 核心认知和当前项目版本日志。
3. **wp-03 build validation and integration**：版本 validator / fixture、check-dist、默认 Codex build、通用平台护栏与攻击性回归。

## Readiness Gate

- **状态**：passed。
- **需求 / 领域规则**：ready。
- **版本对象与状态机**：ready。
- **远端边界**：ready，明确不做。
- **用户授权**：已授权完整 Case 的设计与执行；install 仍需单独确认。
- **Brownfield 文件面**：manifest、8 个项目运行 Skill、scan / Agent Entry / platform guides、迁移器与 fixture、build/check-dist、Product / Engineering / Map 和公开 Skill 文档均已定位。
- **Work Package owner**：wp-01 负责版本与运行 gate；wp-02 负责 Update 编排与产品语义；wp-03 负责脚本、fixture 和集成，文件不重叠。
- **停止条件**：安装包内部版本不一致、无法保持安全 gate、破坏性目标项目冲突、验证失败或需要 install 权限。

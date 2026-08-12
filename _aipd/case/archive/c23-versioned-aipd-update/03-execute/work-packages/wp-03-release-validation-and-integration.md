# Work Package: wp-03-release-validation-and-integration

## 目标

为本机发布快照、manifest 双形态和一次性迁移器建立确定性校验，阻止 source / dist / records / templates 版本漂移。

## 上下文

- `../../case.md`
- `../../02-design/design.md`
- `aipd-skill/scripts/build`
- `aipd-skill/scripts/check-dist`
- `aipd-skill/scripts/migrate-project-schema`
- `aipd-skill/scripts/check-schema-migrator`

## 文件 owner

- `aipd-skill/scripts/**` 中与本 Case 有关的 validator、fixture、migrator、check-dist；不修改 install 脚本。
- 不修改 `aipd-skill/src/**`、项目 `_aipd/**` 或 dist。

## 合同

- 新 release validator 校验 catalog schema、正整数连续版本、唯一 record、record 文件与标题、currentAuthority 路径、manifest 模板版本。
- check-dist 校验默认 Codex 产物中的 catalog / records / authority / manifest / update-log 与 source 同步，并调用 release validator；通用多目标构建的 fallback / override 合同继续由现有护栏验证。
- Schema migrator 旧根迁移仍写精确两键 unversioned v2；`--check` 接受严格两键和严格三键，拒绝额外键 / 非法版本。
- fixture 覆盖 unversioned、versioned、malformed、symlink / 双根原安全攻击面，以及“迁移后必须 Update”的提示。
- 增加项目状态选择 fixture：unversioned -> records 全量、P<I -> 区间、P=I -> no-op、P>I -> fail；不得访问网络。

## 完成标准

- [x] 独立 release / selection fixture 可执行并通过。
- [x] check-schema-migrator 原有攻击集无回归，新 manifest 双形态通过。
- [x] check-dist 能检测任一版本快照漂移。
- [x] 脚本语法、可执行位和帮助文本正确。

## 执行记录

- 状态：completed
- 完成时间：2026-08-12

### 实现

- 新增 `aipd-skill/scripts/check-release-bundle`：校验 catalog 精确 Schema、V1 起连续正整数版本、record 唯一路径与标题、current guide、currentAuthority、manifest 模板版本，以及默认 Codex dist 与 source 的完整同步。
- 新增 `aipd-skill/scripts/check-release-bundle-fixtures`：在隔离目录攻击错误 catalog、版本空洞、record 缺失 / 错标题 / symlink / orphan、authority 缺失、manifest 漂移和 dist 漂移；覆盖 unversioned 全量、P5 -> I9 区间、P=I no-op、P>I fail。
- fixture 增加同一主题在 V6-V9 反复修改 / 撤销的 forward guard：记录只作为 V6-V9 上下文，最终 authority 只保留 V9；同时 validator 静态约束 `aipd-update` 必须按 records -> current authority -> 一次收敛的顺序执行，禁止逐版 replay 或写入中间版本。
- `migrate-project-schema` 保持旧根迁移写精确两键 unversioned v2；`--check` 接受精确两键或精确三键正整数 manifest，拒绝未知额外字段和非法版本；迁移完成后明确提示继续运行 `aipd-update`。
- 当前 Schema 校验允许 `_aipd/leader/` 等安全项目自定义 Workspace 模块，同时继续拒绝代码目录、任意 `L*-*` 半迁移目录、额外 Knowledge 目录、symlink 和类型冲突；legacy `_adoc/custom-dir` 仍拒绝。
- `check-dist` 已接入 release validator / fixture，并改为验证公共 `workspace/project-state.md` + catalog 投影，而不是要求每个 Skill 重复硬编码完整 gate 文字；保留 Codex 默认、通用多目标 fallback、frontmatter normalization 和 Codex Agent 严格校验。

### 验证

- `./aipd-skill/scripts/build`：通过；默认只构建 Codex，9 个 Skill、3 个 Agent。
- `./aipd-skill/scripts/check-dist`：通过；release bundle、Schema migrator、静态引用、源码同步、多目标 fallback、代码拓扑、Agent 与 cleanup 护栏全部通过。
- `./aipd-skill/scripts/check-release-bundle --project-root ... --dist-skills ...`：通过；V1 source / Codex dist 一致。
- `./aipd-skill/scripts/check-release-bundle-fixtures`：通过；包含 V5 -> V9 同主题反复变化的最终态收敛回归。
- `./aipd-skill/scripts/check-schema-migrator`：通过；原攻击集与 manifest 双形态 / leader 扩展无回归。
- `./aipd-skill/scripts/migrate-project-schema --check /Users/yangzongru/Desktop/CodeKKK/AIPD-2`：通过。
- `bash -n`、四个 Node 脚本 `node --check`、可执行位、`--help`、无远端命令扫描、`git diff --check`：通过。
- 未执行 install、commit、push 或任何网络访问。

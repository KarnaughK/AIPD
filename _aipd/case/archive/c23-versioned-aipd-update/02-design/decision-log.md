# Decision Log

## D1：本机安装包定义最高版本

- **状态**：confirmed
- **决定**：`aipd-update` 只以本机随包 catalog 的 `currentVersion` 为目标，不查询 GitHub / 远端。
- **理由**：本机 Skill、更新记录和当前文档必须构成一个自洽快照；远端即使更高也不影响当前闭环。

## D2：更新记录是演进上下文，不是逐版脚本

- **状态**：confirmed
- **决定**：完整读取 `(P,I]`，再以 I 的当前文档做一次最终态合并。
- **理由**：中间版本可能反复修改同一事物，逐次落盘会执行已被废弃的路径。

## D3：Schema 与 AIPD 发布版本分离

- **状态**：design confirmed
- **决定**：保留 `schemaVersion: 2`，新增整数 `aipdVersion`；前者识别工作区形状，后者识别项目已应用的完整发布快照。

## D4：第一版正式基线

- **状态**：design confirmed
- **决定**：当前 c22 后的完整本机框架记为 AIPD V1；合法但缺少 `aipdVersion` 的既有 v2 项目通过 V1 bootstrap 更新，不伪造更早版本。

## D5：远端发现延期

- **状态**：deferred
- **决定**：远端版本比较、下载、提醒、自动升级本机 Skill 均不进入 c23。

## D6：Schema 迁移器不写当前 AIPD 版本

- **状态**：design confirmed
- **决定**：旧 `_adoc` 项目完成一次性结构迁移后保持精确两键的 unversioned v2 manifest，再由 `aipd-update` 完成当前发布的语义收敛并写 `aipdVersion`。
- **理由**：目录与路径迁移并未执行本机版本记录中的全部变化，提前写当前版本会让 Update 误判 no-op。

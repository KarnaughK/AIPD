# Verify

## 状态

- **状态**：passed

## 验收项

- [x] 目录 Schema 与 Design 一致。
- [x] 新项目初始化只生成新 Schema。
- [x] 一次性迁移器通过旧版、新版、混合状态和异常路径攻击 fixture。
- [x] 当前项目可沿 `AGENTS -> manifest -> index -> map -> knowledge / process -> code` 恢复。
- [x] 除一次性迁移器、拒绝性哨兵和明确迁移说明外，活动源码、模板、Skills、Agent Entry、公开文档无旧运行时路径。
- [x] `aipd_context_retriever` 构建并取代旧身份。
- [x] build 通过。
- [x] check-dist 通过。
- [x] Verify 阶段未执行 install；通过后仅在用户明确授权的 Close 阶段执行 Codex 用户级安装。

## 设计护栏审计

- [x] 无运行时双读或 fallback。
- [x] SOP、Case、OKR、Inbox 未混入 `knowledge/`。
- [x] 代码仍在真实源码目录，不建立知识库代码层。
- [x] 迁移器独立于日常运行时。
- [x] 运行时和迁移器都按路径项存在性识别双根，并拒绝损坏 symlink、同名普通文件、symlink 工作区及工作区内 symlink。
- [x] 五类知识域仍可独立理解和维护，Map / SOP / Case 只通过明确入口组合，没有形成新的隐式递进依赖。

## 验收结果

- **状态**：passed

### 证据

- `_aipd/manifest.json` 仅含 `schema` 与 `schemaVersion`，五类长期知识只位于 `_aipd/knowledge/{intent,research,core,product,engineering}/`。
- 旧 tracked 工作区文件 189/189 均映射到唯一新目标；当前 `_aipd/` 共 200 个文件，无碰撞或丢失。
- `check-schema-migrator` 攻击集覆盖完整迁移、已迁移检查、混合根、staged deletion、ignored 路径、裸相对链接、额外目录与多类 symlink 边界，全部通过。
- 当前仓库、Codex 打包迁移器和 Claude 打包迁移器的 `--check` 均通过；三份脚本 byte-identical。
- Codex / Claude 各构建 9 个 Skill，Codex 构建 3 个 Agent；`check-dist` 验证源码同步、静态引用、平台差异、Schema、迁移器和运行时 gate 全部通过。
- `aipd_context_retriever` 已替换旧身份；旧身份只保留在一次性清理和迁移语义中。
- 126 个活动 Markdown 文档的 52 条本地链接通过；experience assets、Node / shell 语法和 `git diff --check` 通过。
- Verify 阶段未执行 install，也未迁移其他项目；用户随后在 Close 阶段明确授权 Codex 用户级安装。

### Code Topology Contract 结论

- 没有新增运行时双读、shared 检索服务或向量层；一次性迁移器不进入日常读取链。
- Workspace 流程模块与五类长期知识保持并列，代码仍由真实源码目录和局部 README 承载。
- 新 AGENTS、Map、Knowledge、Skills、Agent guides 与双平台产物使用同一 Schema 合同，没有跨上下文私有状态穿透。

### Product Reduction Scan

- 本 Case 是框架 Schema 与文档架构迁移，Design 未声明 Attention Contract，也没有用户可见页面或原型；不触发产品界面 Reduction Scan。

### 残留风险

- 其他已初始化项目尚未迁移，必须逐项目在干净 Git 工作树中执行一次性迁移器。
- 无法可靠判定的裸编号语义会在 dry-run 硬停止，需要人工归类；这是防止误改的安全边界。
- `_aipd/case/archive/` 作为不可执行历史快照保留旧术语，恢复前必须先按当前合同迁出并重建上下文索引。
- Claude Code、项目级环境和其他项目仍未安装或迁移，不属于本次用户授权范围。

## 下一步

- Verify 已通过；用户随后明确授权 Codex 用户级 install，安装与归档结果记录在 `05-close/close.md`。

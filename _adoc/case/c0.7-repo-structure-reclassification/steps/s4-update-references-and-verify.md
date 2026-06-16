# Step 4: Update References And Verify

## 目标

更新仓库中所有受迁移影响的路径引用，并验证 AIPD Skill 构建 / 安装链路仍可用。

## 上下文

- `../case.md`
- `../doc/target-structure.md`
- `../doc/migration-plan.md`
- Step 2 / Step 3 执行结果

## 要做

- 更新 `README.md` 项目结构。
- 更新 `docs/modules/build-and-install.md`。
- 更新 `_adoc/map.md` 和必要 L5 文档。
- 更新 shell scripts 中的相对路径。
- 更新 `c0.8-aipd-desktop-zero` 中的路径假设。
- 运行构建 / 安装相关验证命令。

## 不做

- 不创建 Desktop。
- 不新增 AgentAdapter。
- 不改 Skill 功能。

## 验收

- `rg` 不再命中过期路径，或命中处有明确历史语义。
- 构建命令通过。
- 安装 / 开发安装路径可用。
- README 与实际目录一致。

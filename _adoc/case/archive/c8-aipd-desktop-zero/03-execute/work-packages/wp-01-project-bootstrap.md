# Work Package c8/wp-01: Project Bootstrap

## 目标

在 `aipd-desktop/` 创建 AIPD Desktop 的 Tauri + Vue 3 + TypeScript 项目骨架。

## 上下文

- `../../case.md`
- `../../02-design/project-placement.md`
- `../../02-design/tauri-vue-bootstrap.md`
- `../../02-design/development-outline.md`

## 边界

要做：

- 使用官方 Tauri 创建器。
- 创建 `aipd-desktop/`。
- 验证 Tauri 窗口能启动。
- 验证 Vue 页面能显示。
- 验证一个最小 Rust command 能被前端调用。

不做：

- 不接 Codex。
- 不解析 AIPD 文件树。
- 不做 UI 设计系统。
- 不引入复杂组件库。
- 不配置 monorepo workspace，除非创建器或包管理需要。

## 推荐命令

```bash
cd /Users/yangzongru/Desktop/CodeKKK/AIPD-2
pnpm create tauri-app
```

交互建议：

```text
Project name: aipd-desktop
Identifier: com.aipd.desktop
Frontend language: TypeScript / JavaScript
Package manager: pnpm
UI template: Vue
UI flavor: TypeScript
```

## 验收

- `aipd-desktop/` 存在。
- `src/`、`src-tauri/`、`package.json` 存在。
- 本地能启动桌面窗口。
- README 或 case 执行记录写明实际启动命令。

## 状态

- **当前状态**：candidate
- **说明**：这是旧 step 迁移来的候选 work package。AIPD Desktop 方向重新确认前，不进入执行。

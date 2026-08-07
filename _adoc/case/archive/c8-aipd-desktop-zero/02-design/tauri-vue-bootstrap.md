# Tauri + Vue Bootstrap Guide

> 本文记录 AIPD Desktop 第零版项目创建建议。当前目标是标准、可维护、少走偏路，不追求复杂模板。

## 1. 推荐路线

使用 Tauri 官方创建器，不使用第三方模板。

官方入口：

- [Tauri Create a Project](https://v2.tauri.app/start/create-project/)
- [Tauri Vite Guide](https://v2.tauri.app/start/frontend/vite/)
- [Calling Rust from Frontend](https://v2.tauri.app/develop/calling-rust/)

原因：

- 第零版真正的风险在 Codex App Server、AIPD 文件树解析、审批事件和聊天状态，不在 UI 模板。
- 官方模板最少魔法，后续排查成本低。
- Vue 是用户最熟悉的前端栈，可以降低节奏风险。

## 2. 创建目录

推荐位置：

```bash
cd /Users/yangzongru/Desktop/CodeKKK/AIPD-2
pnpm create tauri-app
```

交互项建议：

```text
Project name: aipd-desktop
Identifier: com.aipd.desktop
Choose which language to use for your frontend: TypeScript / JavaScript
Choose your package manager: pnpm
Choose your UI template: Vue
Choose your UI flavor: TypeScript
```

如果创建器支持非交互参数，后续可以再改成脚本化命令；第一次建议交互创建，避免参数与当前 Tauri 版本不一致。

## 3. 预期目录结构

```text
aipd-desktop/
├── index.html
├── package.json
├── vite.config.ts
├── src/
│   ├── App.vue
│   └── main.ts
└── src-tauri/
    ├── Cargo.toml
    ├── tauri.conf.json
    └── src/
        └── main.rs
```

## 4. 首次运行

```bash
cd /Users/yangzongru/Desktop/CodeKKK/AIPD-2/aipd-desktop
pnpm install
pnpm tauri dev
```

如果 `pnpm tauri dev` 不存在，按生成的 `package.json` scripts 为准；常见脚本可能是：

```bash
pnpm dev
pnpm tauri dev
```

## 5. 第一次不要做的事

- 不接 Codex。
- 不引入复杂 UI 组件库。
- 不做全局 monorepo 配置。
- 不写 AIPD parser。
- 不做 case workspace。

第一次只验证：

- Tauri app 能启动。
- Vue 页面能显示。
- Rust command 能被前端调用。
- 应用能读取当前仓库路径或让用户选择项目路径。

## 6. 第零版推荐基础结构

前端：

```text
src/
├── App.vue
├── main.ts
├── layouts/
├── features/
│   ├── project-tree/
│   ├── chat/
│   └── preview/
└── services/
    └── tauriApi.ts
```

后端：

```text
src-tauri/src/
├── main.rs
├── commands/
│   ├── project.rs
│   └── agent.rs
├── services/
│   ├── aipd_parser.rs
│   └── codex_appserver.rs
└── models/
```

这只是初始建议。创建项目时可以先保留官方结构，等第一个功能进入时再拆目录。

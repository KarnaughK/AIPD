# System 架构索引

> 本项目的技术架构和约束文档。按需查阅具体模块。

## 技术栈

- **Framework**: Astro（静态站点生成）
- **Routing**: @inox-tools/custom-routing（strictCustomRouting）
- **Component**: React（岛屿架构，按需使用）
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Deployment**: Cloudflare Pages

## 核心模块

| 模块 | 文档 | 说明 |
|------|------|------|
| 路由系统 | [routing.md](./routing.md) | strictCustomRouting、路由生成、目录结构 |
| 多语言 | [i18n.md](./i18n.md) | 语言配置、页面级翻译、工具函数 |
| 内容管理 | [content.md](./content.md) | Content Collections、文档组织 |

## 目录结构概览

```
src/
├── astro/              ← Astro 框架配置
│   ├── i18n.ts         ← 语言配置、工具函数
│   └── routes.ts       ← 路由生成逻辑
│
├── views/              ← 页面模块（DDD 风格）
│   ├── home/           ← 首页（自包含：组件 + i18n）
│   └── docs/           ← 文档页
│       ├── index.astro ← 文档页面入口
│       ├── Sidebar.astro ← 侧边栏组件
│       └── nav/        ← 导航配置（按语言）
│           ├── en.ts
│           └── zh-cn.ts
│
├── components/         ← 全局通用组件
├── layouts/            ← 页面布局
└── docs/               ← Markdown 文档内容
```

## 设计原则

1. **DDD 风格**：页面模块自包含（组件、i18n 放在页面目录下）
2. **显式路由**：使用 strictCustomRouting，禁用文件系统自动路由
3. **页面级 i18n**：每个页面有自己的 i18n.json，宁可冗余不要耦合
4. **岛屿架构**：静态内容用 Astro，交互组件用 React

## 快速定位

- 要修改路由？→ 看 [routing.md](./routing.md)
- 要修改多语言？→ 看 [i18n.md](./i18n.md)
- 要修改文档内容？→ 看 [content.md](./content.md)
- 要新增页面？→ 在 `src/views/` 下创建模块，然后更新 `src/astro/routes.ts`

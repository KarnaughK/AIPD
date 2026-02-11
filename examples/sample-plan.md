# Plan: v0.3 首页改造

> **本次迭代目标**：将 Kimi Agent 生成的完整首页内容迁移到 Astro 项目，打造专业的产品落地页

## 1. 目标 (Objectives)

- **完整迁移**：将 `src/Kimi_Agent_页面优化GitHub/` 中的首页内容完整迁移到 Astro
- **组件化改造**：将 HTML 页面拆分为 Astro 组件，保持可维护性
- **多语言支持**：同时支持中文和英文版本的首页
- **响应式优化**：确保在桌面和移动端都有良好的体验

## 2. 涉及的模块

- `business/docs/spec-translation.md` - 官方文档翻译功能（首页需要链接到文档）

## 3. 约束 (Constraints)

- **设计保持**：完全保留 Kimi Agent 生成的设计风格和视觉效果
- **技术栈**：
  - 使用 Astro 组件替代纯 HTML
  - 保留 TailwindCSS 样式
  - 保留 Lucide Icons
  - 保留所有动画效果
- **路由规则**：
  - 中文首页：`/` 或 `/zh`
  - 英文首页：`/en`
  - 文档入口：`/docs`

## 4. 现有首页分析

### 4.1 页面结构（共 9 个模块）

1. **Navigation** - 导航栏（固定顶部）
2. **Hero Section** - 主标题区（渐变文字 + CTA 按钮）
3. **Social Proof** - 数据展示（4 个统计卡片）
4. **What is OpenClaw** - 产品介绍（左右布局）
5. **Core Features** - 核心功能（6 个功能卡片）
6. **Quick Start** - 快速上手（3 步安装指南）
7. **Use Cases** - 使用案例（4 个场景卡片）
8. **FAQ** - 常见问题（4 个折叠问答）
9. **Final CTA** - 最终行动号召
10. **Footer** - 页脚

### 4.2 技术特点

- **渐变效果**：大量使用渐变背景和文字
- **光晕动画**：`.glow-bg` 背景光晕效果
- **悬停动画**：卡片悬停时上浮效果
- **响应式设计**：移动端菜单、网格布局自适应
- **代码块**：带复制按钮的代码展示

## 5. 任务清单 (Tasks)

### 5.1 准备工作
- [ ] 分析现有 `src/components/pages/HomePage.astro` 的实现
- [ ] 规划组件拆分策略（哪些需要独立组件）
- [ ] 确定样式管理方案（全局 CSS vs 组件内样式）

### 5.2 组件拆分
- [ ] 创建 `Navigation.astro` - 导航栏组件
- [ ] 创建 `HeroSection.astro` - 主标题区组件
- [ ] 创建 `SocialProof.astro` - 数据展示组件
- [ ] 创建 `WhatIsOpenClaw.astro` - 产品介绍组件
- [ ] 创建 `CoreFeatures.astro` - 核心功能组件
- [ ] 创建 `QuickStart.astro` - 快速上手组件
- [ ] 创建 `UseCases.astro` - 使用案例组件
- [ ] 创建 `FAQ.astro` - 常见问题组件
- [ ] 创建 `FinalCTA.astro` - 最终行动号召组件
- [ ] 创建 `Footer.astro` - 页脚组件

### 5.3 样式迁移
- [ ] 提取全局样式到 `src/styles/homepage.css`
- [ ] 迁移 TailwindCSS 配置（颜色、动画等）
- [ ] 确保所有渐变效果正常工作
- [ ] 确保所有动画效果正常工作

### 5.4 多语言支持
- [ ] 创建中文版首页 `src/pages/index.astro`（或 `src/pages/zh/index.astro`）
- [ ] 创建英文版首页 `src/pages/en/index.astro`
- [ ] 提取文案到 i18n 配置文件
- [ ] 实现语言切换逻辑

### 5.5 交互功能
- [ ] 实现移动端菜单切换
- [ ] 实现代码块复制功能
- [ ] 实现平滑滚动锚点跳转
- [ ] 初始化 Lucide Icons

### 5.6 测试和优化
- [ ] 测试桌面端显示效果
- [ ] 测试移动端显示效果
- [ ] 测试所有链接跳转
- [ ] 测试语言切换功能
- [ ] 优化页面加载速度

## 6. 技术方案

### 6.1 组件组织结构

```
src/components/
├── layout/
│   ├── Navigation.astro       # 导航栏
│   └── Footer.astro            # 页脚
└── home/
    ├── HeroSection.astro       # 主标题区
    ├── SocialProof.astro       # 数据展示
    ├── WhatIsOpenClaw.astro     # 产品介绍
    ├── CoreFeatures.astro      # 核心功能
    ├── QuickStart.astro        # 快速上手
    ├── UseCases.astro          # 使用案例
    ├── FAQ.astro               # 常见问题
    └── FinalCTA.astro          # 最终行动号召
```

### 6.2 页面结构

```astro
---
// src/pages/index.astro (中文版)
import Navigation from '@/components/layout/Navigation.astro';
import HeroSection from '@/components/home/HeroSection.astro';
import SocialProof from '@/components/home/SocialProof.astro';
// ... 其他组件
---

<html lang="zh-cn">
  <head>
    <!-- Meta tags, styles -->
  </head>
  <body>
    <Navigation lang="zh" />
    <HeroSection lang="zh" />
    <SocialProof lang="zh" />
    <!-- ... 其他组件 -->
  </body>
</html>
```

### 6.3 样式管理

**方案 1: 全局样式**（推荐）
- 将所有自定义样式提取到 `src/styles/homepage.css`
- 在页面中引入：`import '@/styles/homepage.css'`
- 优点：样式集中管理，易于维护

**方案 2: 组件内样式**
- 每个组件内部包含自己的 `<style>` 标签
- 优点：组件独立性强
- 缺点：样式重复，难以统一管理

### 6.4 多语言方案

**文案提取**：
```typescript
// src/i18n/homepage.ts
export const homePageText = {
  zh: {
    hero: {
      title: 'OpenClaw 中文指南',
      subtitle: '从入门到精通，轻松驾驭你的开源 AI 助手。',
      cta1: '5分钟快速上手',
      cta2: '阅读完整文档',
    },
    // ... 其他文案
  },
  en: {
    hero: {
      title: 'OpenClaw Guide',
      subtitle: 'From beginner to expert, master your open-source AI assistant with ease.',
      cta1: '5-Minute Quick Start',
      cta2: 'Read Full Docs',
    },
    // ... 其他文案
  },
};
```

## 7. 风险 (Risks)

- **样式兼容性**：从纯 HTML 迁移到 Astro 可能导致样式问题
  - **应对**：逐个组件迁移，每次迁移后立即测试
- **动画失效**：JavaScript 动画可能在 Astro 中失效
  - **应对**：使用 `<script>` 标签或 `client:load` 指令
- **TailwindCSS 配置**：自定义配置可能需要调整
  - **应对**：将 HTML 中的 `tailwind.config` 迁移到 `tailwind.config.mjs`

## 8. 验收标准 (Acceptance Criteria)

本次迭代完成的标志：

- [ ] 访问 `/` 可以看到完整的中文首页
- [ ] 访问 `/en` 可以看到完整的英文首页
- [ ] 所有 9 个模块都正常显示
- [ ] 所有渐变效果和动画正常工作
- [ ] 移动端菜单可以正常切换
- [ ] 代码块复制功能正常
- [ ] 所有链接跳转正确（包括锚点跳转）
- [ ] 桌面端和移动端都显示正常
- [ ] 页面加载速度 < 2 秒
- [ ] Lucide Icons 正常显示

## 9. 后续优化（不在本次范围）

- [ ] 添加页面过渡动画
- [ ] 添加 SEO 优化（结构化数据）
- [ ] 添加 Google Analytics
- [ ] 添加暗色/亮色主题切换
- [ ] 添加更多语言版本（日语、韩语等）

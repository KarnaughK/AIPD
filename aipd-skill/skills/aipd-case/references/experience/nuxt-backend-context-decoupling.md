# Nuxt 后端上下文解耦实践经验

## 来源

- 来源类型：已完成外部项目 case 的设计复盘。
- 来源模块：Nuxt 后端设计应显式记录框架扫描机制与业务上下文目录规则。
- 经验性质：实践经验库条目。保留 Nuxt 后端里的具象机制和取舍，不二次抽象为通用上下文解耦原则。

## 适用场景

在 AIPD Case Design 阶段，如果目标涉及 Nuxt 后端、API handler、server route、目录结构、业务 context、route scanner 或 shared / domain 边界，应读取本经验。

不要把它当作所有后端框架的通用模板。Next.js、NestJS、Express、Fastify 等框架可以借鉴其中的问题意识，但需要在真实项目里重新校准对应框架的文件扫描、路由注册和目录约束。

## 触发背景

一次 Nuxt 后端目录设计复盘中，讨论先从“一个 API 一个目录”推进到“API path 聚合目录”，随后用户连续校正：

- 前端代码通常以页面为大模块，功能文档按功能线串多个页面；后端没有页面，一等模块更接近业务上下文 / 小功能。
- 后端上下文可以承载多个强相关 API，不必按单个 GET / POST 拆得过细。
- Nuxt 默认 `server/api` 自动扫描会限制内部模块摆放，容易把业务内部文件误扫成 API；应结合框架机制设计 custom route scanner。
- 业务上下文之间不应为了复用暴露内部查询接口，否则会陷入“返回 ABCD / ABC / BCD，还是让调用方选择字段”的隐性共享层问题。
- 项目级统一 response wrapper 可以抽到 shared；业务 domain / stores 默认不跨 context 复用。

本次最终形成独立 Design artifact：

- `02-design/backend-nuxt-design.md`

## 经验正文

开发类 case 的后端目录设计不能只从通用分层概念出发，也不能只按 API URL 机械切分。需要同时看三件事：

1. 技术框架的文件扫描 / 路由注册机制。
2. 当前业务的上下文边界和 API 相关性。
3. AIPD 的上下文隔离目标：让后续 Agent 打开一个业务目录即可恢复足够上下文。

在 Nuxt 这类约定式框架中，如果默认扫描目录和 AIPD 上下文隔离目标冲突，应允许在 Design phase 明确设计一层项目级 scanner / adapter，而不是被框架默认目录绑死。

## Nuxt 具体取舍

- Design phase 如果涉及后端目录结构，应检查 Nuxt 的自动扫描 / 约定式注册机制，例如 route scan、server handlers、file-based routing。
- 后端一等目录优先按业务上下文 / 小功能划分，而不是默认按单个 API path、全局 controller / service / repository 或前端页面划分。
- 一个业务 context 可以包含多个强相关 API；context 内部可使用 route controller、可选 service、domain、stores、types 等轻量分组。
- `service` 不必强制存在；当 route handler 的业务编排很短时，可以直接放在 handler 中，复杂后再抽 `*.service.ts`。
- 项目级模板 / 基础设施可进入 shared，例如统一 response wrapper；具体业务规则、读模型和 stores 默认留在 context 内。
- 跨 context 默认不互调 service、不暴露内部查询接口；弱关系数据需求优先在本 context 内自建读模型 / 查询。
- 如果框架默认目录扫描会误注册内部模块，Design 应允许定义 custom scanner，并把 scanner 规则作为正式后端设计规范沉淀。

## 已处理结果

- 已新增 `02-design/backend-nuxt-design.md`，记录 Nuxt custom route scanner、`server/{context}/` 业务上下文目录、route 文件、domain、stores、shared 和跨上下文规则。
- 已在 `project-architecture.md`、`design.md`、`case.md` 中挂载该设计规范。
- 已把当前 API URL 统一为：
  - `GET /api/similarity-game/daily-puzzle`
  - `POST /api/similarity-game/guess`

## 后续借鉴方式

- 做 Nuxt 后端 Design 时，可以直接借鉴本经验。
- 做 Next.js 后端 Design 时，只能借鉴“先检查框架路由 / 文件扫描机制，再决定业务 context 目录”的问题意识，不能直接套 Nuxt scanner 方案。
- 如果 Next.js 后续也完成真实项目实践，应另建 Next.js 实践经验条目，而不是修改本 Nuxt 条目来兼容。

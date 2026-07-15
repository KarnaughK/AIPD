# Source and provenance

## 来源性质

本资产基于一个真实 Vue3 后台项目中已经长期使用的三类机制重新整理：运行时浮层、页面级表单 controller、搜索会话 controller。来源项目由用户在 AIPD case `c0.13-vue3-context-decoupling-experience` 中指定并授权用于经验提炼。

本目录不是来源项目文件的镜像，而是 AIPD canonical reference implementation：

- API 和品牌统一为 `Aipd*`。
- 删除业务 Dialog、接口字段、业务数据、私有路径、项目工具类和品牌素材。
- 消除 `@/appContext`、全局 CSS、自动图标导入、字符串 injection key 和 controller 循环 import 等项目耦合。
- 增加原实现使用面暴露出的生命周期注销、原生关闭结算、SSR 边界、初始化错误传播和自动测试。

## 未复制内容

- 来源项目的业务页面与业务组件。
- 业务接口、字段、权限、路由和数据。
- 来源项目的 README、架构图和历史 case 正文。
- 来源项目的品牌名称与兼容 facade。

## 授权边界

来源项目没有在本资产中附带可核验的公开许可证。本资产因此采用重新组织和重写的通用实现，不声明来源项目代码已经公开授权。AIPD 资产自身的当前使用边界见 `LICENSE.md`。

# Decision Log

## D-01：经验拆成五条

- 决策：按读取时机拆分局部上下文、ModalBox、QlmForm、QlmSearch、页面局部认知图。
- 原因：它们虽共享上下文解耦理念，但执行入口、风险和命中场景独立；拆开可降低未来 case 的加载成本。

## D-02：Modal 而不是 Model

- 决策：canonical 名称使用 `AipdModalBox`。
- 原因：该资产负责 Dialog / Drawer 浮层，`Modal` 是准确领域词；`Model` 会误指数据模型。

## D-03：新 canonical + 旧 facade

- 决策：迁移所有活跃源码到 `Aipd*`，旧 `QlmModalBox` 仅保留 deprecated alias facade。
- 原因：既完成品牌迁移，又为历史引用和遗漏调用提供低成本兼容；所有消费者均走 barrel，兼容层不需要复制实现。

## D-04：历史 case 不机械改名

- 决策：只更新运行时代码、活跃 L5 / map 和代码就近 README / MMD，归档 case 保留旧名。
- 原因：历史 case 是过程事实；批量改写会制造错误历史，也显著扩大无价值 diff。

## D-05：架构图建立经验索引，不复制指南

- 决策：新增短经验条目说明触发和落位，详细画法指向 AIPD 当前指南。
- 原因：目标项目旧版指南带有过时 case 路径；复制会形成双事实源。

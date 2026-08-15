# Work Package: wp-01 - write dispatch checkpoint

> **所属 Case**: c29-dsh-headless-dispatch
> **Phase**: Execute
> **类型**: docs
> **推荐 Agent**: 留空
> **依赖**: 无
> **拓扑敏感**: 否

## 目标

DSH 作为本 Case 的执行层，写回一份可被 Leader 验收的短结果文件。

## 设计依据

- 这是 runtime 调通，不是产品功能。
- 文件即状态；不要依赖 DSH 会话记忆。

## 不允许固化的假设

- 不要假设 DSH runtime 已经写入 `$aipd-leader` 正式发布。
- 不要假设需要改 Skill 或 install。

## 并列工作项

- [ ] 读取 Case 与本 work package
- [ ] 创建 `03-execute/dsh-dispatch-result.md`
- [ ] 更新 `03-execute/execute.md` 和 `case.md` 状态

## 上下文文档

执行前必须读取：

- `/Users/yangzongru/Desktop/CodeKKK/AIPD/_aipd/case/c29-dsh-headless-dispatch/case.md`
- `/Users/yangzongru/Desktop/CodeKKK/AIPD/_aipd/case/c29-dsh-headless-dispatch/03-execute/work-packages/wp-01-write-dispatch-checkpoint.md`

## 文件边界

只允许写入：

- `_aipd/case/c29-dsh-headless-dispatch/03-execute/dsh-dispatch-result.md`
- `_aipd/case/c29-dsh-headless-dispatch/03-execute/execute.md`
- `_aipd/case/c29-dsh-headless-dispatch/case.md`

`dsh-dispatch-result.md` 至少包含：

- Case id：`c29-dsh-headless-dispatch`
- 自己是 Case 执行 Agent，不是 Leader
- 调用方式：`dsh --profile headless`
- 完成时间
- 改了哪些文件

## 验收标准

- [ ] 上述三个文件都被更新或创建
- [ ] 没有改 Case 目录以外的文件
- [ ] 返回压缩结果，不写长过程

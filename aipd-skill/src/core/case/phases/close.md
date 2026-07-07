# Case Phase: Close

Close phase 负责把一个 case 变成完整闭环。

Case 完成后不应留下“其实还没做完，只是推进了一部分”的状态。若目标仍未完成，应回到 Think / Design / Execute / Verify，而不是强行 Close。

## 要回答的问题

- 用户是否已经验收？
- case 是否达成 Case Contract 中的目标和验收标准？
- case.md 是否记录了完整 phase 状态？
- Work Packages 是否都有执行记录或明确取消原因？
- 归档候选 / 反向编织候选是否整理完成？
- 已实现 / 已验证事实是否已经同步到相关 L3 / L4 / L5 / README / map，还是长期文档仍保留早期假设？
- case index 是否更新？
- 是否需要移动到 archive，还是先标记为完成待归档？
- 移动 archive 是否会破坏其他 case、map 或长期文档里的路径引用？
- 是否涉及分支合并、提交、推送？

## 输入

- case.md。
- `03-execute/work-packages/`。
- git diff。
- Verify Result。
- 用户验收结论。
- 相关 L3 / L4 / L5 / README / map 入口。
- case 路径引用搜索结果。

## 输出

- 更新 `_adoc/case/index.md`。
- 更新 `05-close/close.md`。
- 移动 case 到 `_adoc/case/archive/`，或标记为完成待归档。
- 整理归档候选 / 反向编织候选。
- 记录长期认知审计结果：已回写、延后回写、仅留 case、无需回写。
- 记录 archive 决策：已移动 / 完成待归档 / 暂不归档，以及原因。
- 如用户确认，执行 git add / commit / merge / push。

Close 不替代 `aipd-weave`。如果 case 产生稳定知识，Close 只整理候选和建议，真正回写长期 ADOC 时使用 `aipd-weave`。

## 归档候选 / 反向编织候选

进行中 case 里如果用户说“记一下 / 看需不需要反编织 / 以后要回写”，不要直接写入 L1-L5、README 或 map。把它先记到 `05-close/close.md` 的归档候选区，等待 Close 统一判断。

候选记录应包含：

- 内容：要复核的判断、规则、入口或经验。
- 触发来源：用户讨论 / Think / Design / Execute / Verify / work package。
- 当前状态：未完成 / 待验证 / 已实现待验收 / 已完成可评估。
- 候选归属：L3 / L4 / L5 / README / map / SOP / 仅留 case。
- Close 判断：回写 / 不回写 / 延后判断，以及原因。

Close 阶段只把已经完成、已实现、已验收并能描述现有项目事实的候选交给 `aipd-weave`。未实现设计、未来计划、临时讨论和未完成 work package 继续留在 case，不进入长期知识库。

如果 case 根目录存在 `自我察觉迭代.md`，Close phase 必须读取并整理回流候选：哪些应进入 `aipd-case` skill、case 模板、Agent Entry、SOP 或长期 ADOC；哪些只是本 case 的一次性过程。该文件不进入普通项目认知 map，只在 case 复盘或 AIPD 框架迭代时读取。

## 长期认知与 archive 审计

Close 不能只把 case 标记完成。它还要检查 case 结论、真实代码 / 线上验证和长期认知是否一致：

```text
case 结论 -> 真实代码 / 线上验证 -> L3 / L4 / L5 / README / map 是否仍一致
```

审计时重点看：

- `case.md` 和 `04-verify/verify.md` 中已经完成、已实现、已验收的事实。
- `_adoc/map.md`、相关 L3 / L4 / L5 map、局部 README 是否仍保留早期假设、旧入口、旧字段、旧流程或旧部署路径。
- Close 候选是否已经分成：已回写、延后回写、仅留 case、无需回写。
- 一次性调研、临时实验、未实现设计和未来计划是否仍留在 case / work package，没有误写进长期知识库。

移动 archive 前必须检查路径引用风险：

```bash
rg "{case-dir}" _adoc
```

如果当前 case 路径仍被其他 case、map、L3 / L4 / L5、局部 README 或 SOP 引用，不要急着移动目录。先把 case 标记为“完成待归档”，记录需要批量更新的引用，等引用更新完成后再移动到 `_adoc/case/archive/`。

Close 输出应明确说明：

- 已更新哪些长期认知入口。
- 哪些候选延后给 `aipd-weave` / SOP / `aipd-learn` 判断。
- 哪些内容只保留在 case。
- archive 决策和引用风险。

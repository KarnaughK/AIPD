# Case Phase: Close

Close phase 负责把一个 case 变成完整闭环。

Case 完成后不应留下“其实还没做完，只是推进了一部分”的状态。若目标仍未完成，应回到 Think / Design / Execute / Verify，而不是强行 Close。

## 要回答的问题

- 用户是否已经验收？
- case 是否达成 Case Contract 中的目标和验收标准？
- case.md 是否记录了完整 phase 状态？
- Work Packages 是否都有执行记录或明确取消原因？
- 归档候选 / 反向编织候选是否整理完成？
- case index 是否更新？
- 是否需要移动到 archive？
- 是否涉及分支合并、提交、推送？

## 输入

- case.md。
- `03-execute/work-packages/`。
- git diff。
- Verify Result。
- 用户验收结论。

## 输出

- 更新 `_adoc/case/index.md`。
- 更新 `05-close/close.md`。
- 移动 case 到 `_adoc/case/archive/`，或标记为完成待归档。
- 整理归档候选 / 反向编织候选。
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

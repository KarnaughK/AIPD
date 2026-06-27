# Case Phase: Close

Close phase 负责把一个 case 变成完整闭环。

Case 完成后不应留下“其实还没做完，只是推进了一部分”的状态。若目标仍未完成，应回到 Think / Design / Execute / Verify，而不是强行 Close。

## 要回答的问题

- 用户是否已经验收？
- case 是否达成 Goal？
- case.md 是否记录了完整 phase 状态？
- Work Packages 是否都有执行记录或明确取消原因？
- Weave Candidate 是否整理完成？
- case index 是否更新？
- 是否需要移动到 archive？
- 是否涉及分支合并、提交、推送？

## 输入

- case.md。
- `04-execute/work-packages/`。
- git diff。
- Verify Result。
- 用户验收结论。

## 输出

- 更新 `_adoc/case/index.md`。
- 更新 `06-close/close.md`。
- 移动 case 到 `_adoc/case/archive/`，或标记为完成待归档。
- 整理 Weave Candidate。
- 如用户确认，执行 git add / commit / merge / push。

Close 不替代 `aipd-weave`。如果 case 产生稳定知识，Close 只整理候选和建议，真正回写长期 ADOC 时使用 `aipd-weave`。

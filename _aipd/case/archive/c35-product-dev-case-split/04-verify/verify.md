# Verify: c35

## 已通过

- [x] `./aipd-skill/scripts/check-skills` 通过（9 个完整包、副本一致、Learn 隔离）。
- [x] `case/overview.md` 三份、`templates/{case,work-package,index}.md` 各副本 md5 一致。
- [x] 旧「Case ID 只用 `cN-slug`」表述已无残留。
- [x] 未触碰历史 Case、release、catalog、update-log、用户未提交的 experience 文件。

## 待完成

- [x] 通用 Case：用户未提异议，按现规则保留。
- [ ] 在真实项目跑通一对 `cN` + `cN_dev`：用户选择先结束，转为后续使用反馈。
- [x] 用户验收（2026-11-17）。

## 残留风险

- 本机 Skill 已更新（2026-11-17）：已推送 `53058c4`；magpie Library 中 9 个 AIPD Skill 的来源改为 GitHub `KarnaughK/AIPD` / `aipd-skill/skills/<name>`，内容与源码一致。以后的更新流程是：push，然后运行 `magpie library skill update`。
- README 与 docs/guide 仍只描述单一生命周期，已列为 Close 候选。

# Verify: c35

## 已通过

- [x] `./aipd-skill/scripts/check-skills` 通过（9 个完整包、副本一致、Learn 隔离）。
- [x] `case/overview.md` 三份、`templates/{case,work-package,index}.md` 各副本 md5 一致。
- [x] 旧「Case ID 只用 `cN-slug`」表述已无残留。
- [x] 未触碰历史 Case、release、catalog、update-log、用户未提交的 experience 文件。

## 待完成

- [ ] 用户确认“通用 Case”类型。
- [ ] 在真实项目跑通一对 `cN` + `cN_dev`（或独立 `cN_dev`），记录试跑反馈。
- [ ] 用户验收。

## 残留风险

- 已安装到本机 / 其他宿主的 Skill 尚未更新，实际试跑前需要 install 或经 magpie 发布。
- README 与 docs/guide 仍只描述单一生命周期，已列为 Close 候选。

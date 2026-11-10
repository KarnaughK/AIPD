# 有代码初始化扫描

本指引只在 `aipd-init` 确认项目 **absent**（没有 `_aipd` / `_adoc`）之后使用。扫描前必须已经按 `@references/workspace/project-state.md` 和 `@references/updates/catalog.json` 做完安全门。不要用本文件给已接入项目做状态面板，也不要在这里引导 Intent。

## 有代码 / 空项目

忽略这些路径后再判断：`.git`、`.github`、`.gitignore`、`.editorconfig`、`.vscode`、`.idea`、`LICENSE*`、`README*`、`CHANGELOG*`、`CONTRIBUTING*`、`node_modules`、`dist`、`build`、`vendor`、`target`、`.venv`、`__pycache__`、`coverage`。

**有代码**（任一成立）：

- 存在带文件的源码目录：`src` `app` `lib` `packages` `cmd` `internal` `server` `web` `frontend` `backend` `android` `ios` `services` `api` `pkg`
- 存在软件清单：`package.json` `pnpm-workspace.yaml` `go.mod` `pyproject.toml` `setup.py` `Cargo.toml` `pom.xml` `build.gradle` `composer.json` `Gemfile` `CMakeLists.txt` `*.sln`
- 存在至少一个源码文件：`py` `js` `ts` `tsx` `jsx` `vue` `go` `rs` `java` `kt` `swift` `cs` `php` `rb` `c` `cpp` `h` `m` `mm` `dart` `scala`

否则是 **空项目**。只有 README / LICENSE / git 的仓库按空项目走方向路径。

## 有代码时扫什么

有界扫描，不读 `node_modules`、`dist`、`.git` 全文：

1. 顶层文件和目录。
2. README 前部（若存在）。
3. 软件清单里的包名、脚本和依赖线索。
4. 源码树 1–2 层。
5. 少量 `rg`：页面、路由、主入口、README、领域词。命中太多就停，只保留高频入口。

不要做全仓百科。不要访谈用户方向或痛点。

## 写入口径

只写从仓库看见的事实。来源记为「仓库扫描」，不是用户确认的长期方向。

| 文件 | 写什么 |
|---|---|
| `_aipd/map.md` | 用真实模块 / 关键词 / 代码入口替换占位行；没有的区块留空表 |
| `_aipd/knowledge/core/index.md` | 看见的对象、领域词、关系；3–7 条为宜 |
| `_aipd/knowledge/product/index.md` | 看见的功能、页面、用户能力 |
| `_aipd/knowledge/engineering/index.md` | 技术栈、目录布局、跨模块约定 |
| `_aipd/index.md` | 把已扫描知识域的状态从「待补充」改为「已从代码扫描建立索引」 |

不写 `_aipd/knowledge/intent/intent.md`。不默认写 Research。不确定的对象标「待确认」，或只作为 map 关键词。

每个索引控制在约一页。禁止编造用户、痛点、愿景或成功标准。

## 返回摘要

```text
【aipd-init 有代码】
仓库类型：已有代码
Agent MD：等级 1（或用户当场指定）
已写入：map / core / product / engineering
未写：intent.md
看见的模块：...
建议下一步：直接做任务，或用 aipd-case；方向以后有了再写 Intent
```

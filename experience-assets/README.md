# AIPD Experience Assets

这里保存“只靠文字不足以可靠复用”的实践经验附带源码、示例和验证入口。

## 与 Skill 的边界

- `aipd-skill/src/core/experience/` 保存语义经验，供 AIPD Skill 渐进加载。
- `experience-assets/` 保存仓库级源码资产，接受 Git 版本控制和 GitHub 浏览，但不进入 Skill build / install 产物。
- 正式经验正文可以引用这里的文件；不要把整套源码复制进 Skill references。

## 当前资产

| 资产 | 技术栈 | 内容 | 入口 |
|---|---|---|---|
| Vue3 上下文解耦参考实现 | Vue3 / Nuxt 前端 | AipdModalBox、AipdForm、AipdSearch | `vue3-context-decoupling/README.md` |

## 引用规则

仓库内使用相对路径。GitHub 上提供两类入口：

- 发布后 latest：`https://github.com/KarnaughK/AIPD/tree/main/experience-assets/{asset}`
- 发布后 pinned：`https://github.com/KarnaughK/AIPD/tree/{full-commit-sha}/experience-assets/{asset}`

发布经验或在长期项目中落地时，优先记录完整 commit SHA。尚未提交的资产必须标记未发布，不得把 latest 模板写成当前可用地址，也不得伪造 pinned 链接。

## 收录最低要求

每个资产包至少包含：

- `README.md`：适用场景、目录、依赖、接入和验证。
- `SOURCE.md`：来源、重写 / 复制性质、清理内容和上游授权状态。
- `LICENSE.md` 或明确许可证文件：不得把 GitHub 可见误当成已授权复用。
- 可执行验证：测试、构建、静态检查或与资产风险相称的其他证据。

每个资产包必须提供 `asset.json`，让 Agent 不展开长 README 也能读取 canonical 名称、入口、验证状态、打包边界和远端链接模板。

业务项目中的私有代码、数据、截图、品牌素材和本机路径不得直接进入本目录。

## 仓库级验证

只检查 manifest、必需文件、经验引用、本地路径、发布元数据、品牌迁移和 Skill dist 隔离：

```bash
node experience-assets/scripts/verify-assets.mjs
```

发布前运行完整验证；它还会执行每个资产包声明的测试、依赖审计和 AIPD Skill build：

```bash
node experience-assets/scripts/verify-assets.mjs --full
```

`github.published: false` 时，相关正式经验必须明确标记“当前未发布”。发布后必须在 `asset.json` 中记录 40 位完整 commit SHA、latest 和 pinned URL，并把相同 pinned SHA 写入正式经验。

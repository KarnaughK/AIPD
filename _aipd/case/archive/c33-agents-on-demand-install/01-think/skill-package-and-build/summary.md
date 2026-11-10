# Think branch: skill-package-and-build

- **branch goal**：核对安装后 Skill 的真实文件形态，以及 `src/` → `dist/` 打包还剩多少用处。
- **trigger**：用户纠正「按需文件应在当前 Skill 包内」；并问现在这套源码/打包体系是否还适用。
- **scope / stop condition**：只扫本仓库现有 build / dist / 已安装 Skill / 仓库级 learn。不写 Skill 源码，不执行 install。
- **return to**：Case Contract + `01-think/think.md`
- **invalidates**：上一轮把按需文件放进 `src/core/{stem}-{host}.md`、运行时再靠 inject 落到 `references/` 的命名假设。尚未使代码失效。

## 证据

### 安装后的形态（用户说的就是现在的产物）

用户级 `~/.agents/skills/` 和 `aipd-skill/dist/codex/skills/` 都是：

```text
skills/
  aipd-case/SKILL.md + references/ + …
  aipd-leader/SKILL.md + references/ + …
  aipd-mermaid/SKILL.md + scripts/render_mermaid.py
```

每个 Skill 一个独立文件夹。Agent 读的是这个包里的文件，例如 `@references/workspace/project-state.md`、`{skill_dir}/scripts/render_mermaid.py`。不会去读 `aipd-skill/src/`。

`SKILL.md` 分两截：

- YAML 头：`name` / `description`（有的还有 `allowed-tools`）。宿主扫描 Skill 目录时用它做目录卡。
- 正文：调用该 Skill 时才进上下文。旁边的子文件、目录默认不进上下文，要正文点名才读。

`aipd-mermaid` 已经是「包内旁路文件」先例。仓库级 `aipd-learn` 更进一步：`.agents/skills/aipd-learn/` 本身就是源码和运行体，不 build、不 dist、不 install。

### 上一轮命名错在哪

`{stem}-{host}.md` 放进 `src/core/`，再靠 `inject-from-core` 灌进 `references/`，说的是**仓库作者怎么写**，不是**装出去 Agent 读哪**。用户要的是装出去之后：

```text
aipd-leader/
  SKILL.md          # 通用正文 + 末尾几行列表
  runtime/
    codex.md
    cursor.md
    grok.md
    claude.md
```

列表里写的是当前 Skill 包内的相对路径，例如 `runtime/codex.md`。

### build 实际在做什么

`scripts/build` 没有编译。它做四件事：

1. 把 `src/skills/{name}/` 复制到 `dist/{platform}/skills/{name}/`。
2. 按 `inject-from-core` 从 `src/core/` 拷文件进该包 `references/`；同路径若存在 `src/platforms/{platform}/core/` 则覆盖。
3. 从产物 `SKILL.md` 头里删掉 `inject-from-core` 列表。
4. 给 Codex 打 `dist/codex/agents/*.toml`（custom agent，本 Case 不管）。

源码侧 `src/skills/` 只有 12 个文件（几乎是 9 份 `SKILL.md` 加少量旁路）；`src/core/` 65 个文件；`dist/codex/skills/` 119 个文件。默认只打 Codex；仓库里没有 `dist/cursor`。

### 多包重复的真实规模

`dist/codex` 里出现在 2 个以上 Skill 中的文件：

| 次数 | 文件 |
|---|---|
| 8 | `catalog.json`、`project-state.md` |
| 4 | `overview.md` |
| 3 | 若干模板 / `aipd-project-structure.md` / `case/overview.md` |
| 2 | 主要是 `aipd` 与 `aipd-update` 共用的初始化模板、Agent Entry、intent 方法 |

其余 `src/core` 文件其实只进一个 Skill，例如 Case phase 文档几乎只进 `aipd-case`。它们待在 `src/core/` 是作者组织习惯，不是运行时共享。

### 打包还剩的理由

| 当初的理由 | 现在还成立吗 |
|---|---|
| 按平台覆盖打出内容不同的包 | 不成立。本 Case 要废的就是这件事。 |
| Markdown 需要编译成另一种运行格式 | 不成立。产物还是 Markdown + YAML。 |
| 禁止手改 dist，避免改到副本 | 是流程护栏，不是格式需要。代价是改完必须 build，和「打开 Skill 文件夹就是装出去的东西」对着干。 |
| `inject-from-core` 避免 8 份 `catalog.json` 手抄漂移 | **成立**。版本 gate 必须多包一致。 |
| 把 Case phase 等单 Skill 文档集中放 core | 组织偏好。可以改成直接放在 `aipd-case/` 里。 |
| Codex custom agent toml 注入 | 本 Case 不管。 |
| 仓库级 Skill 已是「目录即产物」 | `aipd-learn` 已经在用，说明这套对 Markdown Skill 够用。 |

## 结论

1. 按需文件必须在**当前 Skill 包内**的小目录里，运行时不读仓库源码。
2. 前端式「源码 / 打包结果」对 AIPD Skill 是错位类比。没有语言变换，build 主要是复制 + 注入 + 平台覆盖。
3. 平台覆盖可以废。真正还值一留的只有「必须多包字节一致」的少量文件（至少 `catalog.json`、`project-state.md`）。
4. 建议：公共 Skill 改成和 `aipd-learn` 一样的完整包；`install` = 复制该文件夹。多包一致的文件留一个 owner，用校验（必要时 sync）防漂移，不再按平台生成 `dist/{platform}`。

2026-09-10 用户确认按该建议执行。

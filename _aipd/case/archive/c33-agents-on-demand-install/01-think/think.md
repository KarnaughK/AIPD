# Think: c33-agents-on-demand-install

## 调研前 checkpoint

- **当前问题**：已关闭。包内小目录 + 目录即产物、废按平台 dist。
- **为什么需要本轮 Think**：用户纠正上一轮把按需文件放到 `src/core/`；并要求校验源码/打包分层是否还成立。
- **调研 / 实验边界**：只扫本仓库 build / dist / 已安装 Skill / `aipd-learn`。不写 Skill 源码，不执行正式 install。
- **预期输出**：包内路径、打包是否还值，以及还要用户拍板的开口。
- **停止条件**：用户已确认包内目录和废打包。
- **返回位置**：Case Contract；进入 Design intake / requirements。
- **本轮证据**：`01-think/skill-package-and-build/summary.md`

## 实践经验

实践经验库未命中安装入口 / 多宿主 Skill 打包类条目。不发明经验。

## 已对齐（以原对话为准）

详见 `01-think/prior-conversation/summary.md`。压缩结论：

1. **一套安装包，不是一套运行时。** 公共 Skill 只维护一棵树。
2. **默认装进 `~/.agents/skills`。** Grok 不必再装 `~/.grok/skills`。Codex 官方用户路径也是这里。Cursor 通常也会读。
3. **Leader 不能通用调度。** Codex 开独立 task、Cursor 调 `cursor-agent`、Grok 用自己的续跑。能通用的是包装：按宿主拆文件，运行时只读自己那份。
4. **认宿主 = 当前这条对话是谁，不是这台机器装了什么。** 本机三套都在，`command -v cursor-agent` 在 Grok 里也会成功。
5. **`SKILL.md` 必须瘦。** 磁盘上可以躺着别家 runtime 文件；常驻正文里的 Codex 模型表会进上下文。
6. **Claude 单独复制同一棵树到 `~/.claude/skills`。** 不改其他 Skill 结构。
7. **custom agent 不管。**
8. **暂不支持写在按需文件里**，不靠缺文件。Grok Leader 若还不能跑，也在这棵树里放对应文件，正文写清楚暂不支持。
9. **同一棵树可以装到任意位置。** 默认 `~/.agents`；装到 Grok / Cursor / Claude 也是同一份完整代码。
10. **安装后只提示冲突，不自动删除。** 例如 `~/.cursor/skills` 和 `~/.agents/skills` 各有一份时，告诉用户 Cursor 可能读到两套。

## 现状事实（2026-09-10）

- 本机 `~/.agents/skills` 已有 8 个非 Leader 公共 Skill：`aipd`、`aipd-case`、`aipd-inbox`、`aipd-weave`、`aipd-update`、`aipd-okr`、`aipd-mermaid`、`aipd-git-push`。没有 `aipd-leader`。
- `~/.grok/skills` 里的临时 AIPD 拷贝已删除。
- 源码仍按平台打两份包：`build` 用 `src/platforms/{platform}/core` 覆盖注入；单文件 `leader/runtime.md` 在 Codex 包和 Cursor 包里内容不同。
- 公共 `src/core/leader/runtime.md` 已经是「按平台读取注入文件」的索引雏形，但构建会覆盖成单文件，`SKILL.md` 仍把 Codex / Cursor 细节写进常驻正文，并写「不要宿主猜测」。
- 泛名 `install` 委托 `install-codex`，写入 `~/.codex/skills` + `~/.codex/agents`。
- `install-cursor` 写入 `~/.cursor/skills`，并显式构建 Cursor 产物。
- Intent / Engineering / 构建文档仍写：默认构建和验证以 Codex 为交付目标。

## 用户确认（2026-09-10）

原 3 个开口已关闭，并上升为更清楚的两层模型：

### 1. 源码通用与按需加载

- 不只是 Leader。Case 的 `agent-guide` 以及任何多平台不同的内容，都走同一套。
- 默认读通用上下文。
- 「表」= 该 Skill `SKILL.md` 末尾的按需加载小列表，一行一个宿主；不是独立清单或数据库。
- Agent 按自己所属平台读对应 `{stem}-{host}.md`。
- 构建不再打多份内容不同的包；一份完整树，安装到任意位置都一样。

现状对照：`src/core/agent-guide.md` 已是通用层，`src/platforms/codex/core/agent-guide.md` 和两个 `leader/runtime.md` 是平台层。问题是 build 会按平台**覆盖成单文件**，装出去的包只剩一种合同。本 Case 要把覆盖改成「通用 + 全表都在树上」。

### 2. 灵活安装与局部加载

- 默认 `install-agents` -> `~/.agents/skills`。
- 同一棵树也可以装到 Grok、Cursor、Claude 或其他位置。
- 运行时仍然只加载通用部分 + 自己那一小份。
- 装完后扫描已知目录；发现多份 AIPD Skill 就提示冲突（例如 Cursor 目录和 `~/.agents` 各一份），**不自动删除**。
- 某平台暂时做不到的能力，写在对应按需文件里，例如「暂时不支持」，而不是这份树在 Grok 上缺文件。

## 用户确认（2026-09-10，表的形态）

「表」就是进了 Skill 之后本来就要读的 `SKILL.md` 末尾几行：

```md
## 按需加载

看本对话所属宿主，只读对应文件。不要看 PATH，也不要因为本机还装了别的宿主就改读别家文件。

- Codex：`runtime/codex.md`
- Cursor：`runtime/cursor.md`
- Grok：`runtime/grok.md`
- Claude：`runtime/claude.md`
```

路径是**当前这个 Skill 文件夹里的相对路径**，不是仓库 `src/`，也不是跨 Skill 的 `@references` 注入。Case 同形，只是目录换成 `agent-guide/`，并且先读通用 `agent-guide.md`。没有平台差异的 Skill 不加这一节。

## 文件命名（本轮定，随后被包内路径纠正）

上一轮把文件写成仓库 `src/core/{stem}-{host}.md`，再 inject 到 `references/`。用户指出这是错位：装出去之后 Agent 读的是**当前这个 Skill 文件夹**，不能读源码树。

纠正后的形态（待用户点头，建议如下）：

```text
aipd-leader/
  SKILL.md
  runtime/
    codex.md
    cursor.md
    grok.md
    claude.md

aipd-case/
  SKILL.md
  agent-guide.md          # 通用，默认读
  agent-guide/
    codex.md
    cursor.md
    grok.md
    claude.md
```

`SKILL.md` 末尾列表写包内相对路径，例如 `runtime/codex.md`。`host` 仍是小写 `codex` / `cursor` / `grok` / `claude`。没有平台差异的 Skill 不加空目录。

先例：`aipd-mermaid` 已经用 `{skill_dir}/scripts/render_mermaid.py`。

## 源码 / 打包分层（已确认）

详见 `01-think/skill-package-and-build/summary.md`。

2026-09-10 用户回复「按你说的」：

- 按需文件用当前 Skill 包内小目录：`runtime/{host}.md`、`agent-guide/{host}.md`。
- 公共 Skill 目录即产物，安装即复制；废掉按平台 `dist/`。必须多包一致的少量文件留一个 owner，用校验（必要时 sync）防漂移。

本 Case 实际要拆的 Skill 仍是：`aipd-leader`（`runtime/`）和 `aipd-case`（`agent-guide/`）。其他公共 Skill 这轮不预埋空列表。列表里出现的宿主必须有对应文件；文件可以写「暂不支持」。

## 可 assumed、Design 再展开

- 身份识别用当前对话/系统身份，不写探测脚本。
- `install-claude` 做复制脚本，不要求本机有 Claude 账号。
- custom agents 继续只存在于现有 Codex 安装，本 Case 不迁移、不删除。
- 是否升 V3：Design / readiness 再判断。
- 现有 `install` / `install-cursor` 入口名和警告文案：Design 定。
- 共享文件 owner 与仓库内 Skill 包落点：Design brownfield / context-boundary 定。

## 结论回流

- 包内路径与废打包 -> Case Contract（已写回）。
- 打包扫描 -> `01-think/skill-package-and-build/summary.md`。
- Intent / 文档过期 -> Close 归档候选。
- Think 已收口，进入 Design intake / requirements。

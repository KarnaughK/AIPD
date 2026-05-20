---
name: mermaid-preview
description: >
  预览 Mermaid 流程图和架构图文件。用户提到 Mermaid、mmd、.mmd、流程图、架构图预览、把图渲染成图片、手机端 Codex 看不了图时使用。
allowed-tools:
  - Read
  - Bash
---

# Mermaid Preview

把 Mermaid 源文件渲染为 PNG，并把生成的图片带回聊天上下文。

## 使用场景

- 用户给出 `.mmd` 文件路径，要看流程图、架构图或 Mermaid 图。
- 用户说 Codex 手机端 / 电脑端不能预览 Mermaid 图。
- 用户要求把 Mermaid 渲染成图片再检查。

## 工作流

1. 确认目标文件路径，优先使用用户给出的 `.mmd` 文件；如果只给关键词，用 `rg --files -g '*.mmd'` 查找候选。
2. 运行脚本渲染：

```bash
python3 {skill_dir}/scripts/render_mermaid.py path/to/file.mmd
```

3. 读取脚本输出中的 `output:` 路径。
4. 用本地图片查看工具把该 PNG 加入聊天上下文。
5. 简短回复用户：源文件、输出图片路径、渲染是否成功；如果渲染失败，给出 Mermaid CLI 的关键错误。

## Mermaid CLI 缺失时

脚本默认优先调用本机已有的 `mmdc`。

如果输出提示找不到 `mmdc`，可以在用户允许网络/安装命令后使用：

```bash
python3 {skill_dir}/scripts/render_mermaid.py path/to/file.mmd --allow-npx
```

这会通过 `npx -y @mermaid-js/mermaid-cli` 临时运行 Mermaid CLI，可能需要网络权限。不要静默安装全局依赖。

## 可选参数

```bash
python3 {skill_dir}/scripts/render_mermaid.py path/to/file.mmd --out /tmp/diagram.png
python3 {skill_dir}/scripts/render_mermaid.py path/to/file.mmd --theme neutral --background white --scale 2
```

## 约束

- 默认只渲染，不修改源 `.mmd` 文件。
- 如果输入是 Markdown，脚本只抽取第一个 ```mermaid 代码块。
- 生成图片默认放在系统临时目录的 `mermaid-preview/` 下，避免污染项目目录。

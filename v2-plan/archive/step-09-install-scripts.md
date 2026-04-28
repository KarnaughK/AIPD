# 第 9 步：创建安装脚本

## 任务

创建 3 个安装脚本，都需要 `chmod +x`。

---

## 9.1 `scripts/dev`（开发模式）

build 后用 symlink 链接到 `~/.claude/skills/`，改源码 + rebuild 即生效。

```bash
#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
DIST_DIR="$PROJECT_ROOT/dist/skills"
TARGET_DIR="$HOME/.claude/skills"

# 先 build
"$SCRIPT_DIR/build"

# 清理旧的 aipd 相关 symlink
for name in aipd aipd-init aipd-plan-create aipd-plan-run aipd-plan-archive; do
    target="$TARGET_DIR/$name"
    if [ -L "$target" ]; then
        rm "$target"
        echo "移除旧链接: $target"
    elif [ -d "$target" ]; then
        echo "警告: $target 是真实目录，跳过（请手动处理）"
        continue
    fi
    ln -s "$DIST_DIR/$name" "$target"
    echo "链接: $target → $DIST_DIR/$name"
done

echo ""
echo "开发模式安装完成。修改源码后运行 scripts/build 即可更新。"
```

---

## 9.2 `scripts/install`（安装到用户级）

build 后复制到 `~/.claude/skills/`。

```bash
#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
DIST_DIR="$PROJECT_ROOT/dist/skills"
TARGET_DIR="$HOME/.claude/skills"

# 先 build
"$SCRIPT_DIR/build"

# 复制
for name in aipd aipd-init aipd-plan-create aipd-plan-run aipd-plan-archive; do
    target="$TARGET_DIR/$name"
    # 清理旧的（无论是 symlink 还是目录）
    rm -rf "$target"
    cp -r "$DIST_DIR/$name" "$target"
    echo "安装: $target"
done

echo ""
echo "安装完成。skill 已复制到 $TARGET_DIR/"
```

---

## 9.3 `scripts/install-project`（安装到项目级）

build 后复制到指定项目的 `.claude/skills/`。

```bash
#!/bin/bash
set -e

if [ -z "$1" ]; then
    echo "用法: scripts/install-project <项目路径>"
    echo "示例: scripts/install-project /Users/xxx/my-project"
    exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
DIST_DIR="$PROJECT_ROOT/dist/skills"
TARGET_DIR="$1/.claude/skills"

# 先 build
"$SCRIPT_DIR/build"

# 确保目标目录存在
mkdir -p "$TARGET_DIR"

# 复制
for name in aipd aipd-init aipd-plan-create aipd-plan-run aipd-plan-archive; do
    target="$TARGET_DIR/$name"
    rm -rf "$target"
    cp -r "$DIST_DIR/$name" "$target"
    echo "安装: $target"
done

echo ""
echo "安装完成。skill 已复制到 $TARGET_DIR/"
```

## 验收

```bash
chmod +x scripts/dev scripts/install scripts/install-project
```

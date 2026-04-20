# 第 8 步：创建构建脚本 scripts/build

## 任务

创建 `scripts/build` 脚本，从 `src/` 构建自包含的 skill 到 `dist/`。

## 要写入的文件

`scripts/build`（Shell 脚本，需要 `chmod +x`）

## 脚本逻辑

```bash
#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
SRC_DIR="$PROJECT_ROOT/src"
DIST_DIR="$PROJECT_ROOT/dist/skills"

# 1. 清空 dist
rm -rf "$DIST_DIR"
mkdir -p "$DIST_DIR"

# 2. 遍历 src/skills/ 下每个 skill
for skill_dir in "$SRC_DIR/skills"/*/; do
    skill_name=$(basename "$skill_dir")
    dest="$DIST_DIR/$skill_name"

    echo "构建 $skill_name ..."

    # 3. 复制 skill 目录到 dist
    cp -r "$skill_dir" "$dest"

    # 4. 读取 SKILL.md 中的 inject-from-core 声明
    # 解析 YAML frontmatter 中 inject-from-core 下的每一行
    in_inject=false
    while IFS= read -r line; do
        # 检测进入 inject-from-core 区域
        if [[ "$line" =~ ^inject-from-core: ]]; then
            in_inject=true
            continue
        fi
        # 检测离开（遇到非 - 开头的行，且不是空行）
        if $in_inject; then
            if [[ "$line" =~ ^[[:space:]]*-[[:space:]] ]]; then
                # 提取文件路径（去掉 "  - " 前缀）
                src_path=$(echo "$line" | sed 's/^[[:space:]]*-[[:space:]]*//')

                # 处理通配符（如 L1-intent/*）
                if [[ "$src_path" == *"/*" ]]; then
                    dir_path="${src_path%/*}"
                    mkdir -p "$dest/references/$dir_path"
                    cp -r "$SRC_DIR/core/$dir_path"/* "$dest/references/$dir_path/"
                # 处理带重命名的（如 plan/overview.md → plan-overview.md）
                elif [[ "$src_path" == *" → "* ]]; then
                    from=$(echo "$src_path" | cut -d'→' -f1 | xargs)
                    to=$(echo "$src_path" | cut -d'→' -f2 | xargs)
                    cp "$SRC_DIR/core/$from" "$dest/references/$to"
                # 处理带子目录的路径（如 plan/templates/plan.md）
                elif [[ "$src_path" == *"/"* ]]; then
                    target_dir=$(dirname "$src_path")
                    mkdir -p "$dest/references/$target_dir"
                    cp "$SRC_DIR/core/$src_path" "$dest/references/$target_dir/"
                # 普通文件
                else
                    cp "$SRC_DIR/core/$src_path" "$dest/references/"
                fi
            elif [[ "$line" =~ ^--- ]] || [[ ! "$line" =~ ^[[:space:]] ]]; then
                in_inject=false
            fi
        fi
    done < "$dest/SKILL.md"

    echo "  完成 → $dest"
done

echo ""
echo "构建完成。产物在 $DIST_DIR/"
echo "共 $(ls -d "$DIST_DIR"/*/ 2>/dev/null | wc -l | xargs) 个 skill"
```

## 验收

```bash
chmod +x scripts/build
./scripts/build
# 应输出 5 个 skill 的构建信息
# dist/skills/ 下应有 5 个目录
# 每个目录的 references/ 下应包含注入的 core 文件
```

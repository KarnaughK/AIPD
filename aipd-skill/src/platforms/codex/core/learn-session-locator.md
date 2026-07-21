# 会话定位：Codex

Codex 中优先读取当前运行时直接提供的 thread ID。只有 ID 可见时，才尝试把它映射到 transcript：

```bash
thread_id="${CODEX_THREAD_ID:-}"

if [ -n "$thread_id" ] && [ -f "$HOME/.codex/state_5.sqlite" ]; then
  sqlite3 "$HOME/.codex/state_5.sqlite" \
    "select rollout_path from threads where id='$thread_id';" 2>/dev/null
fi
```

SQLite 不可用或没有结果时，可在 ID 非空的前提下查找会话文件和索引：

```bash
if [ -n "$thread_id" ]; then
  find "$HOME/.codex/sessions" "$HOME/.codex/archived_sessions" \
    -type f -name "*${thread_id}*.jsonl" 2>/dev/null | head -1
  rg -n "\"id\":\"${thread_id}\"" "$HOME/.codex/session_index.jsonl" 2>/dev/null
fi
```

- 不输出完整 transcript；只把路径作为原始上下文引用。
- 找不到 ID 或路径时明确标记“未识别”，不要扩大目录扫描范围。
- 跨项目读取必须显式打开 transcript 文件，不假设平台自动恢复上下文。

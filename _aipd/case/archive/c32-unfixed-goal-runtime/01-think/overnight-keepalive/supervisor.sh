#!/bin/zsh
# 过夜实验监督器（非正式 Skill）。
# 代码只做：08:00 停、互斥、固定 --resume 同一条对话、读 interval。
# 不判断「该不该干活」。
set -eu
ROOT="/Users/yangzongru/Desktop/CodeKKK/AIPD"
# 2026-08-21 已随 Case 归档；此脚本不再作为活动监督器。
KEEP="$ROOT/_aipd/case/archive/c32-unfixed-goal-runtime/01-think/overnight-keepalive"
LOG="$KEEP/supervisor.log"
STATUS="$KEEP/status.txt"
PIDFILE="$KEEP/worker.pid"
SUP_PIDFILE="$KEEP/supervisor.pid"
CHATFILE="$KEEP/chat-id.txt"
INTERVAL_FILE="$KEEP/interval-seconds.txt"
PROMPT_FILE="$KEEP/worker.prompt.md"
DOORBELL="$KEEP/doorbell.flag"
STOP_EPOCH=$(TZ=Asia/Shanghai date -j -f "%Y-%m-%d %H:%M:%S" "2026-08-18 08:00:00" +%s)
POLL_BUSY=20
DEFAULT_INTERVAL=60
MIN_INTERVAL=20

log() {
  TZ=Asia/Shanghai date "+%Y-%m-%d %H:%M:%S $*" >> "$LOG"
}

write_status() {
  local decision="$1"
  local extra="${2:-}"
  {
    TZ=Asia/Shanghai date "+updated=%Y-%m-%d %H:%M:%S%z"
    echo "decision=$decision"
    echo "supervisor_pid=$$"
    if [[ -f "$PIDFILE" ]]; then
      echo "worker_pid=$(cat "$PIDFILE")"
    else
      echo "worker_pid="
    fi
    if [[ -f "$CHATFILE" ]]; then
      echo "chat_id=$(cat "$CHATFILE")"
    else
      echo "chat_id="
    fi
    if [[ -f "$INTERVAL_FILE" ]]; then
      echo "interval_seconds=$(cat "$INTERVAL_FILE")"
    else
      echo "interval_seconds=$DEFAULT_INTERVAL"
    fi
    echo "stop_at=2026-08-18T08:00+08:00"
    if [[ -n "$extra" ]]; then
      echo "note=$extra"
    fi
  } > "$STATUS"
}

alive_pid() {
  local pid="$1"
  [[ -n "$pid" ]] && kill -0 "$pid" 2>/dev/null
}

worker_running() {
  if [[ ! -f "$PIDFILE" ]]; then
    return 1
  fi
  local pid
  pid=$(cat "$PIDFILE" 2>/dev/null || true)
  if alive_pid "$pid"; then
    return 0
  fi
  rm -f "$PIDFILE"
  return 1
}

read_interval() {
  local raw="$DEFAULT_INTERVAL"
  if [[ -f "$INTERVAL_FILE" ]]; then
    raw=$(cat "$INTERVAL_FILE" 2>/dev/null || echo "$DEFAULT_INTERVAL")
  fi
  raw=${raw%%[^0-9]*}
  if [[ -z "$raw" ]] || (( raw < MIN_INTERVAL )); then
    echo "$DEFAULT_INTERVAL"
    return
  fi
  echo "$raw"
}

sleep_capped() {
  local want="$1"
  local now remaining
  now=$(date +%s)
  remaining=$(( STOP_EPOCH - now ))
  if (( remaining <= 0 )); then
    return 0
  fi
  if (( want > remaining )); then
    want=$remaining
  fi
  sleep "$want"
}

# 单实例：已有活监督器则退出，避免双拉起。
if [[ -f "$SUP_PIDFILE" ]]; then
  old_sup=$(cat "$SUP_PIDFILE" 2>/dev/null || true)
  if alive_pid "$old_sup" && [[ "$old_sup" != "$$" ]]; then
    log "another supervisor alive pid=$old_sup; exit"
    exit 0
  fi
fi
echo $$ > "$SUP_PIDFILE"
trap 'rm -f "$SUP_PIDFILE"' EXIT

log "supervisor start pid=$$ stop=2026-08-18T08:00+08:00"
write_status "STARTED"

while true; do
  now=$(date +%s)
  if (( now >= STOP_EPOCH )); then
    log "stop time reached; supervisor exit"
    write_status "STOPPED_AT_08:00"
    echo "STOPPED_AT_08:00" >> "$LOG"
    exit 0
  fi

  if worker_running; then
    write_status "SKIP_BUSY" "poll=${POLL_BUSY}s"
    sleep_capped "$POLL_BUSY"
    continue
  fi

  if [[ ! -f "$CHATFILE" ]]; then
    log "missing chat-id.txt; sleep ${POLL_BUSY}"
    write_status "WAIT_CHAT_ID"
    sleep_capped "$POLL_BUSY"
    continue
  fi

  if [[ ! -f "$PROMPT_FILE" ]]; then
    log "missing worker.prompt.md; sleep ${POLL_BUSY}"
    write_status "WAIT_PROMPT"
    sleep_capped "$POLL_BUSY"
    continue
  fi

  chat_id=$(cat "$CHATFILE")
  interval=$(read_interval)
  wake_reason="interval"
  if [[ -f "$DOORBELL" ]]; then
    wake_reason="doorbell"
    rm -f "$DOORBELL"
    # 门铃：立刻拉起；拉起后仍读 interval，不由代码改频率。
  fi

  log "wake cursor-agent resume=$chat_id interval=${interval}s reason=$wake_reason"
  (
    cd "$ROOT"
    cursor-agent -p --force --trust --workspace "$ROOT" --resume "$chat_id" "$(cat "$PROMPT_FILE")"
  ) >> "$KEEP/worker.log" 2>&1 &
  echo $! > "$PIDFILE"
  write_status "WAKE" "reason=$wake_reason"
  wait $! || log "worker exit=$?"
  rm -f "$PIDFILE"
  log "worker finished; sleep ${interval}s then pull again"
  write_status "SLEEP_AFTER_WORKER" "sleep=${interval}s"
  sleep_capped "$interval"
done

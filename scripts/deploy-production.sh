#!/usr/bin/env bash
#
# A/B production deploy for trustivasetu-website (pm2 "trustivasetu-website",
# `next start -p 3001`, proxied by nginx at www.trustivasetu.com).
#
# Never builds over the live build: builds alternate between .next-a and
# .next-b, and .next-active records which one the server uses (next.config.ts
# reads it at startup). 16 Oct 2026: an in-place `npm run build` deleted the CSS
# the running server's HTML still pointed at, and the live site went unstyled.
#
#   1. Check the live site.
#   2. Build into the idle directory. The site stays up; a failed build changes nothing.
#   3. Copy the previous build's /_next/static forward, so pages already open in a
#      browser can still load their CSS/JS. Carried files older than 14 days are pruned.
#   4. Smoke-test the new build on a spare port.
#   5. Point .next-active at it and `pm2 restart` (no --update-env: the running
#      env is kept as is). If it isn't healthy, switch straight back.
#   6. Check the live site again.
#
# Deploys whatever is checked out (run `git pull` first). Doesn't run npm install.
#
# Usage:  bash scripts/deploy-production.sh
set -euo pipefail
export TZ=Asia/Kolkata

APP="trustivasetu-website"
LOCAL="http://127.0.0.1:3001"
LIVE="https://www.trustivasetu.com"
SPARE_PORT=3056
PAGES=(/ /contact /founders /clinics /privacy-policy /terms)
ERR_LOG="$HOME/.pm2/logs/$APP-error.log"

cd "$(dirname "$0")/.."
say() { echo "[$(date '+%F %T IST')] $*"; }

# Every page answers 200 and the homepage's CSS loads. Prints one line per URL.
check_site() {
  local base=$1 ok=0 code css n=0
  for p in "${PAGES[@]}"; do
    code=$(curl -s -o /dev/null -w '%{http_code}' --max-time 20 "$base$p" || true)
    echo "    $code  $p"; [ "$code" = 200 ] || ok=1
  done
  for css in $(curl -s --max-time 20 "$base/" | grep -oE '/_next/static/[^"]+\.css' | sort -u); do
    code=$(curl -s -o /dev/null -w '%{http_code}' --max-time 20 "$base$css" || true)
    echo "    $code  $css"; [ "$code" = 200 ] || ok=1; n=$((n + 1))
  done
  [ "$n" -gt 0 ] || { echo "    no stylesheet linked from $base/"; ok=1; }
  return $ok
}

wait_healthy() {
  for _ in $(seq 1 30); do
    [ "$(curl -s -o /dev/null -w '%{http_code}' "$1/" || true)" = 200 ] && return 0
    sleep 1
  done
  return 1
}

say "Deploying $(git log -1 --format='%h %s')"
if [ -n "$(git status --porcelain)" ]; then
  say "NOTE: uncommitted changes will be deployed too:"; git status --short | sed 's/^/    /'
fi

say "Live site before deploy:"
check_site "$LIVE" || say "WARNING: live site already has failures (continuing; this deploy may fix them)"

ACTIVE=$(cat .next-active 2>/dev/null || echo .next)
case "$ACTIVE" in .next-a) NEXT_DIR=.next-b ;; *) NEXT_DIR=.next-a ;; esac
say "Live build: $ACTIVE. Building into $NEXT_DIR (site stays up)..."

# next build rewrites tsconfig.json / next-env.d.ts to point at the dir it
# built; put back whatever was there so deploys don't dirty the working tree.
TMP=$(mktemp -d)
cp tsconfig.json "$TMP/"; [ -f next-env.d.ts ] && cp next-env.d.ts "$TMP/"
restore_files() { cp "$TMP/tsconfig.json" .; [ -f "$TMP/next-env.d.ts" ] && cp "$TMP/next-env.d.ts" .; rm -rf "$TMP"; }

rm -rf "$NEXT_DIR"
if ! NEXT_BUILD_DIR="$NEXT_DIR" npm run build; then
  restore_files; rm -rf "$NEXT_DIR"
  say "!! Build FAILED. Live site untouched, still serving $ACTIVE."; exit 1
fi
restore_files
[ -f "$NEXT_DIR/BUILD_ID" ] || { say "!! $NEXT_DIR/BUILD_ID missing. Aborting; live site untouched."; exit 1; }

if [ -d "$ACTIVE/static" ]; then
  say "Carrying previous static assets forward ($ACTIVE/static -> $NEXT_DIR/static)"
  cp -r --update=none --preserve=timestamps "$ACTIVE/static/." "$NEXT_DIR/static/"
  find "$NEXT_DIR/static" -type f -mtime +14 -delete
fi

say "Smoke-testing $NEXT_DIR on :$SPARE_PORT..."
NEXT_BUILD_DIR="$NEXT_DIR" setsid node_modules/.bin/next start -p "$SPARE_PORT" >/dev/null 2>&1 &
SPARE_PID=$!
stop_spare() { kill -- -"$SPARE_PID" 2>/dev/null || true; }
trap stop_spare EXIT
if ! wait_healthy "http://127.0.0.1:$SPARE_PORT" || ! check_site "http://127.0.0.1:$SPARE_PORT"; then
  say "!! New build failed its smoke test. Not switching; live site still serving $ACTIVE."; exit 1
fi
stop_spare; trap - EXIT

switch_to() {
  echo "$1" > .next-active.tmp && mv .next-active.tmp .next-active
  pm2 restart "$APP" >/dev/null
}

ERR_BEFORE=$(wc -l < "$ERR_LOG" 2>/dev/null || echo 0)
say "Switching $APP to $NEXT_DIR (pm2 restart)"
switch_to "$NEXT_DIR"
if ! wait_healthy "$LOCAL"; then
  say "!! $NEXT_DIR did not come up. Switching back to $ACTIVE."
  switch_to "$ACTIVE"
  wait_healthy "$LOCAL" && say "Rolled back; serving $ACTIVE." || say "!! Rollback not healthy either. Investigate now."
  exit 1
fi

say "Live site after deploy:"
if ! check_site "$LIVE"; then
  say "!! Live checks failed on $NEXT_DIR. Switching back to $ACTIVE."
  switch_to "$ACTIVE"; wait_healthy "$LOCAL" || true
  check_site "$LIVE" || true
  exit 1
fi

sleep 3
ERR_NEW=$(( $(wc -l < "$ERR_LOG" 2>/dev/null || echo 0) - ERR_BEFORE ))
pm2 ls | grep -E " $APP " || true
say "New pm2 error-log lines since switch: $ERR_NEW"
say "Deploy complete: serving $NEXT_DIR. Previous build kept in $ACTIVE (rollback: echo $ACTIVE > .next-active && pm2 restart $APP)."

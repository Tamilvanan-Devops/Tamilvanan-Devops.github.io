#!/usr/bin/env bash
# Regenerate assets/img/og-card.png (1200×630), the link-preview image shown by LinkedIn, Slack, X and others.
# It renders scripts/og-card.html, which reads assets/content.js.
# Usage: ./scripts/build-og-image.sh
set -euo pipefail

cd "$(dirname "$0")/.."
out="assets/img/og-card.png"

chrome=""
for c in "${CHROME:-}" \
         "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
         "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge" \
         "$(command -v google-chrome 2>/dev/null || true)" \
         "$(command -v chromium 2>/dev/null || true)"; do
  if [[ -n "$c" && -x "$c" ]]; then chrome="$c"; break; fi
done
if [[ -z "$chrome" ]]; then
  echo "Chrome/Edge/Chromium not found. Set CHROME=/path/to/browser and retry." >&2
  exit 1
fi

"$chrome" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
  --window-size=1200,630 --virtual-time-budget=8000 --run-all-compositor-stages-before-draw \
  --screenshot="$PWD/$out" "file://$PWD/scripts/og-card.html" >/dev/null 2>&1

echo "Wrote $out ($(du -h "$out" | cut -f1))"

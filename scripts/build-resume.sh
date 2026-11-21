#!/usr/bin/env bash
# Regenerate assets/Tamil-Vanan-Resume.pdf from resume.html (which reads assets/content.js).
# Usage: ./scripts/build-resume.sh
set -euo pipefail

cd "$(dirname "$0")/.."
out="assets/Tamil-Vanan-Resume.pdf"

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

"$chrome" --headless=new --disable-gpu --no-pdf-header-footer \
  --virtual-time-budget=8000 --run-all-compositor-stages-before-draw \
  --print-to-pdf="$PWD/$out" "file://$PWD/resume.html" >/dev/null 2>&1

echo "Wrote $out ($(du -h "$out" | cut -f1))"

#!/usr/bin/env bash
# Regenerate the resume PDF from resume.html (which reads assets/content.js).
#
# Public copy (served by the site, no phone number):
#   ./scripts/build-resume.sh
# Private copy for job applications (phone added, written outside the repo, never committed):
#   PHONE="+91 98xxx xxxxx" ./scripts/build-resume.sh ~/Downloads/Tamil_Vanan_Senior_DevOps_Engineer_Resume.pdf
set -euo pipefail

cd "$(dirname "$0")/.."
out="${1:-assets/Tamil-Vanan-Resume.pdf}"
[[ "$out" = /* ]] || out="$PWD/$out"

if [[ -n "${PHONE:-}" && "$out" == "$PWD/"* ]]; then
  echo "Refusing to write a PDF with your phone number inside the repo. Pass a path outside it, e.g. ~/Downloads/resume.pdf" >&2
  exit 1
fi

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

url="file://$PWD/resume.html"
if [[ -n "${PHONE:-}" ]]; then
  url+="?phone=$(printf '%s' "$PHONE" | sed -e 's/%/%25/g' -e 's/+/%2B/g' -e 's/ /%20/g')"
fi

mkdir -p "$(dirname "$out")"
"$chrome" --headless=new --disable-gpu --no-pdf-header-footer \
  --virtual-time-budget=8000 --run-all-compositor-stages-before-draw \
  --print-to-pdf="$out" "$url" >/dev/null 2>&1

echo "Wrote $out ($(du -h "$out" | cut -f1))"

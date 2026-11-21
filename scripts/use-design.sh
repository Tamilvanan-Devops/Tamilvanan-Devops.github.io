#!/usr/bin/env bash
# Promote one design to the site root (index.html) so it is served at your domain.
# Usage: ./scripts/use-design.sh orbit|executive|console|bento
set -euo pipefail

cd "$(dirname "$0")/.."
name="${1:-}"
if [[ -z "$name" || ! -f "designs/$name/index.html" ]]; then
  echo "Usage: $0 <design>   available: $(ls -d designs/*/ | xargs -n1 basename | tr '\n' ' ')" >&2
  exit 1
fi

# Design pages reference everything via "../../"; at the root that prefix becomes "".
sed -e 's#\.\./\.\./##g' -e '/name="robots"/d' "designs/$name/index.html" > index.html
echo "index.html now uses the '$name' design. Preview: python3 -m http.server 8080"

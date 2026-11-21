#!/usr/bin/env bash
# Publish the portfolio to GitHub Pages from your PERSONAL GitHub account.
#
# Usage:
#   ./scripts/publish.sh <github-username> [custom-domain]
#
# Examples:
#   ./scripts/publish.sh tamilvanan-dev
#   ./scripts/publish.sh tamilvanan-dev tamilvananv.com
#
# What it does:
#   1. Makes sure the GitHub CLI is using <github-username> (never a work account)
#   2. Sets your GitHub link in assets/content.js, rebuilds the resume PDF and the home page
#   3. Creates the public repo <github-username>.github.io (if needed) and pushes
#   4. Turns on GitHub Pages (GitHub Actions source) and, optionally, the custom domain
#   5. Switches the GitHub CLI back to the account you started with
set -euo pipefail

cd "$(dirname "$0")/.."

user="${1:-}"
domain="${2:-}"
if [[ -z "$user" || "$user" == -* ]]; then
  sed -n '2,10p' "$0" | sed 's/^# \{0,1\}//'
  exit 1
fi
repo="$user/$user.github.io"

command -v gh >/dev/null || { echo "GitHub CLI (gh) is not installed: brew install gh" >&2; exit 1; }
command -v git >/dev/null || { echo "git is not installed" >&2; exit 1; }

# --- 1. Use the personal account -------------------------------------------------------------
logged_in() { gh auth status --hostname github.com 2>&1 | grep -Eo 'account [^ ]+' | awk '{print $2}'; }
active() { gh api user --jq .login 2>/dev/null || true; }

original="$(active)"
if ! logged_in | grep -qx "$user"; then
  cat >&2 <<EOF
The GitHub CLI is not logged in as '$user' yet. Add your personal account (your work
login stays in place), then re-run this script:

  gh auth login --hostname github.com --git-protocol https --web

When the browser opens, sign in as '$user' (use a private window if the browser is
signed in to a work account).
EOF
  exit 1
fi
if [[ "$original" != "$user" ]]; then
  gh auth switch --hostname github.com --user "$user" >/dev/null
fi
restore() {
  if [[ -n "$original" && "$original" != "$user" ]]; then
    gh auth switch --hostname github.com --user "$original" >/dev/null 2>&1 || true
    echo "GitHub CLI switched back to '$original'."
  fi
}
trap restore EXIT

[[ "$(active)" == "$user" ]] || { echo "Could not activate GitHub account '$user'." >&2; exit 1; }
orgs="$(gh api user/orgs --jq '[.[].login] | join(", ")' 2>/dev/null || true)"
echo "Publishing a PUBLIC repo as GitHub user: $user${orgs:+  (member of: $orgs)}"
if [[ "${PORTFOLIO_YES:-}" != "1" ]]; then
  read -r -p "Is '$user' your personal account? [y/N] " ok
  [[ "$ok" =~ ^[Yy]$ ]] || { echo "Aborted."; exit 1; }
fi

# --- 2. Content, resume, home page -----------------------------------------------------------
python3 - "$user" <<'PY'
import re, sys
user = sys.argv[1]
p = "assets/content.js"
s = open(p).read()
s2 = re.sub(r'(\n\s*github:\s*)"[^"]*"', rf'\1"https://github.com/{user}"', s, count=1)
open(p, "w").write(s2)
print("GitHub link:", f"https://github.com/{user}")
PY
./scripts/build-resume.sh || echo "warning: resume PDF not rebuilt (Chrome/Edge not found); existing PDF kept." >&2
./scripts/use-design.sh orbit >/dev/null

# --- 3. Commit and push ----------------------------------------------------------------------
[[ -d .git ]] || git init -q -b main
# Commit as the personal account (private noreply address), never the global/work git identity.
uid="$(gh api user --jq .id)"
uname="$(gh api user --jq '.name // empty')"
git config user.name "${uname:-$user}"
git config user.email "${uid}+${user}@users.noreply.github.com"
git add -A
if ! git diff --cached --quiet; then
  git commit -q -m "Publish portfolio" && echo "Committed changes."
fi

if ! gh repo view "$repo" >/dev/null 2>&1; then
  gh repo create "$repo" --public --description "Personal portfolio of Tamil Vanan" --homepage "https://$user.github.io" >/dev/null
  echo "Created https://github.com/$repo"
fi

# --- 4. GitHub Pages (enable before pushing so the first deployment succeeds) ------------------
enable_pages() {
  if gh api "repos/$repo/pages" >/dev/null 2>&1; then
    gh api -X PUT "repos/$repo/pages" -f build_type=workflow >/dev/null 2>&1
  else
    gh api -X POST "repos/$repo/pages" -f build_type=workflow >/dev/null 2>&1
  fi
}
pages_before_push=false
enable_pages && pages_before_push=true

remote="https://$user@github.com/$repo.git"
if git remote get-url origin >/dev/null 2>&1; then git remote set-url origin "$remote"; else git remote add origin "$remote"; fi
# Use only the GitHub CLI credential of the now-active personal account (ignores any work credentials in the keychain).
git -c credential.helper= -c 'credential.helper=!gh auth git-credential' push -u origin main

if ! $pages_before_push; then
  enable_pages || { echo "Could not enable GitHub Pages; enable it in https://github.com/$repo/settings/pages (Source: GitHub Actions)." >&2; exit 1; }
  sleep 3
  gh workflow run deploy.yml --repo "$repo" >/dev/null 2>&1 || true
fi
echo "GitHub Pages enabled (source: GitHub Actions)."

if [[ -n "$domain" ]]; then
  gh api -X PUT "repos/$repo/pages" -f cname="$domain" >/dev/null
  echo "Custom domain set to $domain. Add the DNS records from README.md in Cloudflare, then enable 'Enforce HTTPS' in the repo's Pages settings once the certificate is issued."
fi

echo
echo "Done. Deployment status: https://github.com/$repo/actions"
echo "Your site (live in ~1 minute): https://$user.github.io${domain:+  and later https://$domain}"

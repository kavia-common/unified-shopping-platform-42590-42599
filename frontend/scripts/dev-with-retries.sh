#!/usr/bin/env bash
# PUBLIC_INTERFACE
# /** Start Vite dev server trying ports 3000, 3001, then 3002 with strictPort.
#  *  If any of those ports already hosts a server, report that URL and exit 0.
#  */
set -euo pipefail

BASE_CMD="vite dev --host 0.0.0.0 --strictPort"
PORTS=("3000" "3001" "3002")

detect_running() {
  local p="$1"
  # Try a quick HTTP check; tolerate self-signed/redirects and short timeout
  if curl -fsS -m 1 "http://127.0.0.1:${p}/" >/dev/null 2>&1; then
    return 0
  fi
  # Fallback: check if something is listening on the port
  if command -v ss >/dev/null 2>&1; then
    if ss -ltn "( sport = :${p} )" | awk 'NR>1 {print $4}' | grep -q ":${p}\$"; then
      return 0
    fi
  fi
  return 1
}

# 1) If any desired port already has a server, report it and exit success
for p in "${PORTS[@]}"; do
  if detect_running "${p}"; then
    echo "Detected running server on port ${p}."
    echo "Dev server URL: http://localhost:${p}"
    exit 0
  fi
done

# 2) Otherwise attempt to start Vite on the first free port among 3000, 3001, 3002
for p in "${PORTS[@]}"; do
  echo "Attempting to start Vite on port ${p}..."
  if VITE_PORT="${p}" ${BASE_CMD} --port "${p}"; then
    echo "Dev server started."
    echo "Dev server URL: http://localhost:${p}"
    exit 0
  else
    echo "Port ${p} is in use or start failed, trying next..."
    sleep 1
  fi
done

echo "Failed to start or detect server on ports ${PORTS[*]}." >&2
exit 1

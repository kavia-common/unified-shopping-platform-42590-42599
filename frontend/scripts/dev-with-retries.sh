#!/usr/bin/env bash
# PUBLIC_INTERFACE
# /** Start Vite dev server trying ports 3000, 3001, then 3002 with strictPort. */
set -euo pipefail

BASE_CMD="vite dev --host 0.0.0.0 --strictPort"
PORTS=("3000" "3001" "3002")

for p in "${PORTS[@]}"; do
  echo "Attempting to start Vite on port ${p}..."
  VITE_PORT="${p}" ${BASE_CMD} --port "${p}" && exit 0 || {
    echo "Port ${p} is in use or start failed, trying next..."
    sleep 1
  }
done

echo "Failed to start Vite on ports ${PORTS[*]}." >&2
exit 1

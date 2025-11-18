# Dev Server Notes

- Preferred dev port is 3000. If it's already in use in the environment, you can start Vite on a different port using:
  - Environment variable:
    - VITE_PORT=3002 npm run dev
  - Convenience script:
    - PORT=3002 npm run dev:port

- The dev script now uses host 0.0.0.0 for container access.

- If you run into missing modules after updating dependencies, perform a clean reinstall:
  1. mv node_modules node_modules.old-$(date +%s)
  2. mv package-lock.json package-lock.old-$(date +%s)
  3. npm install --no-audit --no-fund --progress=false

- Current Vite/Vue versions are aligned for Vue 3 with Vite 5.

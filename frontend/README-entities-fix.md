# Entities decode.js fix for Vite/Vue compiler

Symptom:
- Vite failed to load config with: Cannot find module `entities/lib/decode.js` from `@vue/compiler-core/dist/compiler-core.cjs.js`.

Clean fix implemented:
- Enforced `entities@^4.5.0` via package.json `overrides` (including `parse5/entities`) so `node_modules/entities/lib/decode.js` exists.
- Removed brittle shims and deep alias hacks from `vite.config.ts`.

How to verify (clean install required):
1. From `frontend/`:
   - rm -rf node_modules package-lock.json
   - npm install --prefer-offline --no-audit --progress=false
   - npm run dev
2. Confirm:
   - node_modules/entities/package.json shows version 4.x
   - node_modules/entities/lib/decode.js exists
   - Vite starts successfully without the decode.js error.

Notes:
- If a future dependency introduces `entities@6.x`, the `overrides` will continue to force a single 4.x instance, maintaining compatibility with the Vue compiler's CJS deep import expectation.

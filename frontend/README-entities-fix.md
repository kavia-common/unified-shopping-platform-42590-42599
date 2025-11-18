# Entities decode.js fix for Vite/Vue compiler

Symptom:
- Vite failed to load config with: Cannot find module `entities/lib/decode.js` from `@vue/compiler-core/dist/compiler-core.cjs.js`.

Fixes applied:
- Pinned `entities` to `^4.5.0` and added `overrides` forcing transitive deps (e.g., `parse5`) to use `entities@^4.5.0`.
- Added a Vite alias for `entities/lib/decode.js` pointing to `src/lib/entities-decode-shim.js` (safety net).
- Added a minimal ESLint flat config to satisfy ESLint 9 in CI.

How to verify:
1. From `frontend/`:
   - npm install
   - npm run dev
2. Vite should start successfully without the decode.js error.

Notes:
- If a future upgrade pulls `entities@6.x`, ensure either the compiler is updated to not deep import `lib/decode.js`, or retain the alias/shim mapping.

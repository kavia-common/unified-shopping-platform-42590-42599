# Frontend dependency note: Vite/Rollup compatibility

We pinned Vite to 5.4.10 to resolve a startup failure:
Error: ERR_MODULE_NOT_FOUND: Cannot find module rollup/dist/es/parseAst.js imported from vite/dist/node/cli.js

Root cause: Vite 6.x in some environments pulls a Rollup build that omits internal paths Vite tried to import. Vite 5.4.x is compatible with Node 18 and does not import internal `rollup/dist/es/parseAst.js`.

Additional fixes:
- Added `@vue/compiler-sfc@3.5.13` to align with `vue@3.5.13`. This ensures the compiler used by Vite matches the runtime and resolves transitive dependency mismatches like `entities` resolution.
- Removed `vite-plugin-vue-devtools` to avoid pulling conflicting Vue compiler versions and to ensure the dev server starts cleanly.

Current matrix (Node 18):
- Vite: 5.4.10
- Vue: 3.5.13
- @vitejs/plugin-vue: 5.2.x
- @vitejs/plugin-vue-jsx: 4.1.x

If upgrading Vite to 6.x in the future, ensure the Rollup version and Vite’s internals are compatible, then reintroduce devtools if desired.

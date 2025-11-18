# Frontend dependency note: Vite/Rollup compatibility

We pinned Vite to 5.4.10 to resolve a startup failure:
Error: ERR_MODULE_NOT_FOUND: Cannot find module rollup/dist/es/parseAst.js imported from vite/dist/node/cli.js

Root cause: Vite 6.1.0 pulled Rollup 4.53.x and referenced an internal path that does not exist in the installed Rollup distribution in our environment. Vite 5.4.x uses a compatible Rollup API and does not import internal `rollup/dist/es/parseAst.js`.

- Node: 18.x
- Vite: 5.4.10
- Rollup: ^4.21 (resolved transitively by Vite)
- Vue: 3.5.x
- @vitejs/plugin-vue: 5.2.x (compatible with Vite 5 & 6)

If upgrading Vite to 6.x in the future, ensure the Rollup version and Vite’s internal imports are compatible, then remove this pin.

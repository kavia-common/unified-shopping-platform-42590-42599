vite-plugin-vue-devtools has been disabled in vite.config.ts.

Reason:
- With Vite 5.4.x, vite-plugin-vue-devtools 7.7.x attempts to import @vue/devtools-kit at runtime and failed to resolve it in this environment.
- This blocked the dev server startup after we pinned Vite to 5.4.10 to fix the Rollup parseAst import error.

If you want to re-enable the plugin:
- Ensure a version matrix where all of these are compatible: Vite, vite-plugin-vue-devtools, @vue/devtools-kit, Node 18.
- Alternatively, upgrade to a compatible Vite 6 + plugin pair and verify dev server starts cleanly.

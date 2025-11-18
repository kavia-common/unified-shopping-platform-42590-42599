import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  // Note: vite-plugin-vue-devtools and JSX plugin disabled to avoid dependency resolution issues in this environment.
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      // Ensure entities resolves to package root; @vue/compiler-core CJS expects lib/decode.js in v4.x
      entities: fileURLToPath(new URL('./node_modules/entities', import.meta.url)),
      // Direct mapping for deep import used by @vue/compiler-core CJS bundle
      'entities/lib/decode.js': fileURLToPath(new URL('./src/lib/entities-decode-shim.js', import.meta.url)),
    },
  },
  server: {
    host: '0.0.0.0',
    allowedHosts: ['.kavia.ai'],
    port: 3000,
    strictPort: true,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    watch: {
      usePolling: true,
    },
  },
})

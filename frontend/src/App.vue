<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useShopStore } from './stores/shop'
import { onMounted, computed } from 'vue'

const store = useShopStore()
const apiBase = computed(() => import.meta.env.VITE_API_BASE || 'http://localhost:3001/api')

onMounted(() => {
  // Load data at startup; errors are handled in the store
  store.loadProducts()
  store.loadCart()
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 text-gray-900">
    <header class="bg-white shadow-sm sticky top-0 z-10">
      <div class="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <RouterLink to="/" class="flex items-center gap-2">
          <span class="inline-block w-3 h-3 rounded-full" style="background:#2563EB"></span>
          <h1 class="text-lg font-semibold">Ocean Shop</h1>
        </RouterLink>
        <nav class="flex items-center gap-6">
          <RouterLink to="/" class="hover:text-blue-600 transition">Products</RouterLink>
          <RouterLink to="/checkout" class="hover:text-blue-600 transition">Checkout</RouterLink>
          <RouterLink to="/checkout" class="relative">
            <span class="inline-flex items-center gap-2 bg-blue-600 text-white px-3 py-1.5 rounded-full shadow-sm hover:bg-blue-700 transition">
              Cart
              <span class="text-xs bg-amber-400 text-black px-2 py-0.5 rounded-full">
                {{ store.cart?.items.length ?? 0 }}
              </span>
            </span>
          </RouterLink>
        </nav>
      </div>
      <div v-if="store.error" class="bg-red-50 text-red-700 text-sm px-4 py-2 border-t border-red-200">
        {{ store.error }}
      </div>
      <div class="bg-gray-50 text-gray-500 text-xs px-4 py-1 border-t">
        API: {{ apiBase }}
      </div>
    </header>

    <main class="max-w-6xl mx-auto px-4 py-8">
      <RouterView />
    </main>

    <footer class="bg-white border-t">
      <div class="max-w-6xl mx-auto px-4 py-6 text-sm text-gray-500">
        © {{ new Date().getFullYear() }} Ocean Shop. All rights reserved.
      </div>
    </footer>
  </div>
</template>

<style scoped>
.min-h-screen { min-height: 100vh; }
.bg-gray-50 { background: #f9fafb; }
.text-gray-900 { color: #111827; }
.bg-white { background: #ffffff; }
.shadow-sm { box-shadow: 0 1px 2px rgba(0,0,0,.06); }
.border-t { border-top: 1px solid #e5e7eb; }
.max-w-6xl { max-width: 72rem; }
.mx-auto { margin-left: auto; margin-right: auto; }
.px-4 { padding-left: 1rem; padding-right: 1rem; }
.py-4 { padding-top: 1rem; padding-bottom: 1rem; }
.py-6 { padding-top: 1.5rem; padding-bottom: 1.5rem; }
.py-8 { padding-top: 2rem; padding-bottom: 2rem; }
.flex { display: flex; }
.items-center { align-items: center; }
.justify-between { justify-content: space-between; }
.gap-2 { gap: .5rem; }
.gap-6 { gap: 1.5rem; }
.text-lg { font-size: 1.125rem; }
.font-semibold { font-weight: 600; }
.hover\:text-blue-600:hover { color: #2563EB; }
.bg-blue-600 { background: #2563EB; }
.hover\:bg-blue-700:hover { background: #1d4ed8; }
.text-white { color: #fff; }
.rounded-full { border-radius: 9999px; }
.rounded { border-radius: .5rem; }
.shadow-sm { box-shadow: 0 1px 2px rgba(0,0,0,.06); }
.transition { transition: all .2s ease; }
.text-sm { font-size: .875rem; }
.text-gray-500 { color: #6b7280; }
.bg-amber-400 { background: #F59E0B; }
.text-black { color: #000; }
.sticky { position: sticky; }
.top-0 { top: 0; }
.z-10 { z-index: 10; }
.inline-block { display: inline-block; }
.w-3 { width: .75rem; }
.h-3 { height: .75rem; }
</style>

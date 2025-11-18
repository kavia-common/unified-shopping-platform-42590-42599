<script setup lang="ts">
import { useShopStore } from '@/stores/shop'
import { RouterLink } from 'vue-router'
const store = useShopStore()

function add(pid: number) {
  store.add(pid, 1)
}
</script>

<template>
  <div>
    <h2 class="text-2xl font-semibold mb-6">Products</h2>
    <div v-if="store.loading" class="text-gray-500">Loading...</div>
    <div v-else class="grid">
      <div v-for="p in store.products" :key="p.id" class="card">
        <img :src="p.image_url" :alt="p.name" class="thumb" />
        <div class="p-4">
          <h3 class="text-lg font-semibold mb-1">{{ p.name }}</h3>
          <p class="text-sm text-gray-600 h-10 overflow-hidden">{{ p.description }}</p>
          <div class="flex items-center justify-between mt-3">
            <span class="text-blue-700 font-semibold">$ {{ Number(p.price).toFixed(2) }}</span>
            <div class="flex gap-2">
              <RouterLink :to="`/product/${p.id}`" class="btn-secondary">Details</RouterLink>
              <button class="btn-primary" @click="add(p.id)">Add</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p v-if="store.error" class="text-red-600 mt-4">{{ store.error }}</p>
  </div>
</template>

<style scoped>
.text-2xl { font-size: 1.5rem; }
.font-semibold { font-weight: 600; }
.mb-6 { margin-bottom: 1.5rem; }
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1rem;
}
.card {
  background: #fff;
  border-radius: .75rem;
  box-shadow: 0 1px 2px rgba(0,0,0,.06);
  overflow: hidden;
}
.thumb {
  width: 100%;
  aspect-ratio: 3/2;
  object-fit: cover;
  background: linear-gradient(135deg, rgba(37,99,235,.1), rgba(249,250,251,1));
}
.p-4 { padding: 1rem; }
.text-sm { font-size: .875rem; }
.text-gray-600 { color: #4b5563; }
.mt-3 { margin-top: .75rem; }
.text-blue-700 { color: #1d4ed8; }
.flex { display: flex; }
.items-center { align-items: center; }
.justify-between { justify-content: space-between; }
.gap-2 { gap: .5rem; }
.btn-primary {
  background: #2563EB;
  color: white;
  padding: .5rem .75rem;
  border-radius: .5rem;
  border: none;
  cursor: pointer;
  transition: all .2s ease;
}
.btn-primary:hover { background: #1d4ed8; }
.btn-secondary {
  background: #F59E0B;
  color: #111827;
  padding: .5rem .75rem;
  border-radius: .5rem;
  text-decoration: none;
  transition: all .2s ease;
}
.btn-secondary:hover { filter: brightness(.95); }
.text-red-600 { color: #dc2626; }
.mt-4 { margin-top: 1rem; }
</style>

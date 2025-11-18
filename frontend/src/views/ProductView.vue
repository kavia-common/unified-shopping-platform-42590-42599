<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getProduct, type Product } from '@/lib/api'
import { useRoute } from 'vue-router'
import { useShopStore } from '@/stores/shop'

const route = useRoute()
const product = ref<Product | null>(null)
const qty = ref(1)
const loading = ref(true)
const store = useShopStore()

onMounted(async () => {
  loading.value = true
  const id = Number(route.params.id)
  product.value = await getProduct(id)
  loading.value = false
})

function add() {
  if (product.value) {
    store.add(product.value.id, qty.value)
  }
}
</script>

<template>
  <div v-if="loading">Loading...</div>
  <div v-else-if="product" class="flex gap-8">
    <img :src="product.image_url" :alt="product.name" class="w-1/2 rounded shadow-sm" />
    <div class="w-1/2">
      <h2 class="text-2xl font-semibold mb-2">{{ product.name }}</h2>
      <div class="text-blue-700 font-semibold mb-4">$ {{ Number(product.price).toFixed(2) }}</div>
      <p class="text-gray-700 mb-6">{{ product.description }}</p>

      <div class="flex items-center gap-3 mb-6">
        <label class="text-sm text-gray-600">Quantity</label>
        <input type="number" min="1" v-model.number="qty" class="qty" />
      </div>

      <button class="btn-primary" @click="add">Add to Cart</button>
    </div>
  </div>
</template>

<style scoped>
.flex { display: flex; }
.gap-8 { gap: 2rem; }
.w-1\/2 { width: 50%; }
.rounded { border-radius: .75rem; }
.shadow-sm { box-shadow: 0 1px 2px rgba(0,0,0,.06); }
.text-2xl { font-size: 1.5rem; }
.font-semibold { font-weight: 600; }
.mb-2 { margin-bottom: .5rem; }
.mb-4 { margin-bottom: 1rem; }
.mb-6 { margin-bottom: 1.5rem; }
.text-blue-700 { color: #1d4ed8; }
.text-gray-700 { color: #374151; }
.text-sm { font-size: .875rem; }
.qty {
  width: 80px;
  padding: .4rem .5rem;
  border: 1px solid #e5e7eb;
  border-radius: .5rem;
}
.btn-primary {
  background: #2563EB;
  color: white;
  padding: .6rem 1rem;
  border-radius: .5rem;
  border: none;
  cursor: pointer;
  transition: all .2s ease;
}
.btn-primary:hover { background: #1d4ed8; }
</style>

<script setup lang="ts">
import { useShopStore } from '@/stores/shop'
const store = useShopStore()
</script>

<template>
  <div>
    <div class="muted text-sm">Items: {{ store.cart?.items.length ?? 0 }}</div>
    <div class="text-sm">Total: $ {{ store.cart ? Number(store.cart.total_amount).toFixed(2) : '0.00' }}</div>
  </div>
</template>

<style scoped>
.text-sm { font-size: .875rem; }
.muted { color: #6b7280; }
</style>

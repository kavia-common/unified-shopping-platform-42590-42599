<script setup lang="ts">
import { reactive } from 'vue'
import { useShopStore } from '@/stores/shop'

const store = useShopStore()

const form = reactive({
  email: '',
  full_name: '',
  address_line1: '',
  address_line2: '',
  city: '',
  country: 'US',
  postal_code: '',
})

async function submit() {
  try {
    const res = await store.doCheckout(form)
    alert(`Order placed! #${res.order_number} - Total $${res.total_amount}`)
  } catch (e: any) {
    alert(e.message)
  }
}
</script>

<template>
  <div class="grid-2">
    <section>
      <h2 class="title">Your Cart</h2>
      <div v-if="!store.cart || store.cart.items.length === 0" class="muted">Cart is empty.</div>
      <ul v-else class="list">
        <li v-for="it in store.cart.items" :key="it.id" class="row">
          <div class="name">{{ it.product.name }}</div>
          <div class="qty">
            <button @click="store.updateItem(it.id, Math.max(1, it.quantity-1))">-</button>
            <span>{{ it.quantity }}</span>
            <button @click="store.updateItem(it.id, it.quantity+1)">+</button>
          </div>
          <div class="price">$ {{ (Number(it.product.price) * it.quantity).toFixed(2) }}</div>
          <button class="remove" @click="store.removeItem(it.id)">Remove</button>
        </li>
      </ul>
      <div class="total" v-if="store.cart">Total: $ {{ Number(store.cart.total_amount).toFixed(2) }}</div>
    </section>

    <section>
      <h2 class="title">Checkout</h2>
      <form @submit.prevent="submit" class="form">
        <label>Email <input v-model="form.email" type="email" required /></label>
        <label>Full name <input v-model="form.full_name" required /></label>
        <label>Address line 1 <input v-model="form.address_line1" required /></label>
        <label>Address line 2 <input v-model="form.address_line2" /></label>
        <div class="grid-2-compact">
          <label>City <input v-model="form.city" required /></label>
          <label>Country <input v-model="form.country" maxlength="2" required /></label>
          <label>Postal code <input v-model="form.postal_code" required /></label>
        </div>
        <button class="btn-primary" type="submit" :disabled="!store.cart || store.cart.items.length===0">Place order</button>
      </form>
    </section>
  </div>
</template>

<style scoped>
.grid-2 {
  display: grid;
  grid-template-columns: 1.2fr .8fr;
  gap: 2rem;
}
.title { font-size: 1.25rem; font-weight: 600; margin-bottom: 1rem; }
.muted { color: #6b7280; }
.list { list-style: none; padding: 0; margin: 0; display: grid; gap: .75rem; }
.row {
  background: #fff;
  border-radius: .75rem;
  box-shadow: 0 1px 2px rgba(0,0,0,.06);
  padding: .75rem 1rem;
  display: grid;
  grid-template-columns: 1fr auto auto auto;
  gap: 1rem;
  align-items: center;
}
.name { font-weight: 500; }
.qty { display: inline-flex; gap: .5rem; align-items: center; }
.qty button {
  background: #e5e7eb;
  border: none;
  width: 28px;
  height: 28px;
  border-radius: .375rem;
  cursor: pointer;
}
.price { color: #1d4ed8; font-weight: 600; }
.remove {
  background: #F59E0B;
  border: none;
  padding: .4rem .6rem;
  border-radius: .5rem;
  cursor: pointer;
}
.total { margin-top: 1rem; font-weight: 600; }
.form { display: grid; gap: .75rem; }
.form label { display: grid; gap: .25rem; font-size: .9rem; color: #374151; }
.form input {
  border: 1px solid #e5e7eb;
  border-radius: .5rem;
  padding: .5rem .6rem;
}
.btn-primary {
  background: #2563EB;
  color: white;
  padding: .6rem 1rem;
  border-radius: .5rem;
  border: none;
  cursor: pointer;
  transition: all .2s ease;
  margin-top: .5rem;
}
.btn-primary:hover { background: #1d4ed8; }
@media (max-width: 900px) {
  .grid-2 { grid-template-columns: 1fr; }
}
</style>

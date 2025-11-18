import { defineStore } from 'pinia'
import { listProducts, getCart, addToCart, updateCartItem, removeCartItem, checkout, type Product, type Cart } from '@/lib/api'

function ensureCartId(): string {
  let id = localStorage.getItem('cart_id')
  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem('cart_id', id)
  }
  return id
}

export const useShopStore = defineStore('shop', {
  state: () => ({
    products: [] as Product[],
    cart: null as Cart | null,
    loading: false as boolean,
    error: '' as string | null,
    orderConfirmation: null as { order_number: string, total_amount: string | number } | null,
  }),
  actions: {
    async loadProducts() {
      this.loading = true
      this.error = null
      try {
        this.products = await listProducts()
      } catch (e: any) {
        this.error = e.message
      } finally {
        this.loading = false
      }
    },
    async loadCart() {
      const cartId = ensureCartId()
      this.cart = await getCart(cartId)
    },
    async add(productId: number, quantity = 1) {
      const cartId = ensureCartId()
      this.cart = await addToCart(cartId, productId, quantity)
    },
    async updateItem(itemId: number, quantity: number) {
      const cartId = ensureCartId()
      this.cart = await updateCartItem(cartId, itemId, quantity)
    },
    async removeItem(itemId: number) {
      const cartId = ensureCartId()
      this.cart = await removeCartItem(cartId, itemId)
    },
    async doCheckout(payload: {
      email: string
      full_name: string
      address_line1: string
      address_line2?: string
      city: string
      country: string
      postal_code: string
    }) {
      const cartId = ensureCartId()
      const res = await checkout(cartId, payload)
      this.orderConfirmation = { order_number: res.order_number, total_amount: res.total_amount }
      // refresh empty cart
      this.cart = await getCart(cartId)
      return res
    }
  }
})

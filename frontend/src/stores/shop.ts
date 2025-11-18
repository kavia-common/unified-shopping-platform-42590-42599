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

/**
 * PUBLIC_INTERFACE
 * useShopStore exposes the shopping domain state:
 * - products: list of products to browse
 * - cart: current user's cart (identified via a persisted cart_id)
 * - loading/error: general loading and error state
 * Actions handle API communication and are resilient to backend failures to keep the UI responsive.
 */
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
        // Set a friendly error and keep UI functional
        this.error = e?.message || 'Failed to load products.'
        this.products = []
        // do not rethrow to avoid crashing initial render
      } finally {
        this.loading = false
      }
    },
    async loadCart() {
      const cartId = ensureCartId()
      try {
        this.cart = await getCart(cartId)
      } catch (e: any) {
        // If backend is unreachable, keep an empty cart so UI renders
        this.error = this.error || e?.message || 'Failed to load cart.'
        this.cart = { cart_id: cartId, items: [], total_amount: 0 }
      }
    },
    async add(productId: number, quantity = 1) {
      const cartId = ensureCartId()
      try {
        this.cart = await addToCart(cartId, productId, quantity)
      } catch (e: any) {
        this.error = e?.message || 'Failed to add to cart.'
      }
    },
    async updateItem(itemId: number, quantity: number) {
      const cartId = ensureCartId()
      try {
        this.cart = await updateCartItem(cartId, itemId, quantity)
      } catch (e: any) {
        this.error = e?.message || 'Failed to update item.'
      }
    },
    async removeItem(itemId: number) {
      const cartId = ensureCartId()
      try {
        this.cart = await removeCartItem(cartId, itemId)
      } catch (e: any) {
        this.error = e?.message || 'Failed to remove item.'
      }
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
      try {
        const res = await checkout(cartId, payload)
        this.orderConfirmation = { order_number: res.order_number, total_amount: res.total_amount }
        // refresh empty cart
        this.cart = await getCart(cartId).catch(() => ({ cart_id: cartId, items: [], total_amount: 0 }))
        return res
      } catch (e: any) {
        this.error = e?.message || 'Checkout failed.'
        throw e // surface error to caller for UI message
      }
    }
  }
})

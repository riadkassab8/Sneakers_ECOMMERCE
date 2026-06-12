'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface Product {
  id: string
  name: string
  brand: string
  category: string
  colorway: string
  price: number
  salePrice: number | null
  images: string[]
  sizes: { size: string; available: boolean }[]
  rating: number
  reviewCount: number
  isNew: boolean
  isLimited: boolean
  tags: string[]
  description: string
  details: string[]
  gender: string
}

interface CartItem {
  product: Product
  size: string
  quantity: number
}

interface CartStore {
  items: CartItem[]
  addItem: (product: Product, size: string, quantity?: number) => void
  removeItem: (productId: string, size: string) => void
  updateQuantity: (productId: string, size: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
  getItemCount: () => number
}

interface WishlistStore {
  items: Product[]
  toggle: (product: Product) => void
  isWishlisted: (id: string) => boolean
}

interface UIStore {
  cartOpen: boolean
  searchOpen: boolean
  mobileMenuOpen: boolean
  setCartOpen: (open: boolean) => void
  setSearchOpen: (open: boolean) => void
  setMobileMenuOpen: (open: boolean) => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, size, quantity = 1) => {
        const items = get().items
        const existingIndex = items.findIndex(
          (item) => item.product.id === product.id && item.size === size
        )
        if (existingIndex > -1) {
          const newItems = [...items]
          newItems[existingIndex].quantity += quantity
          set({ items: newItems })
        } else {
          set({ items: [...items, { product, size, quantity }] })
        }
      },
      removeItem: (productId, size) => {
        set({
          items: get().items.filter(
            (item) => !(item.product.id === productId && item.size === size)
          ),
        })
      },
      updateQuantity: (productId, size, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, size)
          return
        }
        set({
          items: get().items.map((item) =>
            item.product.id === productId && item.size === size
              ? { ...item, quantity }
              : item
          ),
        })
      },
      clearCart: () => set({ items: [] }),
      getTotal: () => {
        return get().items.reduce((total, item) => {
          const price = item.product.salePrice || item.product.price
          return total + price * item.quantity
        }, 0)
      },
      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0)
      },
    }),
    {
      name: 'sneaker-cart',
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    }
  )
)

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      toggle: (product) => {
        const items = get().items
        const exists = items.find((item) => item.id === product.id)
        if (exists) {
          set({ items: items.filter((item) => item.id !== product.id) })
        } else {
          set({ items: [...items, product] })
        }
      },
      isWishlisted: (id) => {
        return get().items.some((item) => item.id === id)
      },
    }),
    {
      name: 'sneaker-wishlist',
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    }
  )
)

export const useUIStore = create<UIStore>((set) => ({
  cartOpen: false,
  searchOpen: false,
  mobileMenuOpen: false,
  setCartOpen: (open) => set({ cartOpen: open }),
  setSearchOpen: (open) => set({ searchOpen: open }),
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
}))

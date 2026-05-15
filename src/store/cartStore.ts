import { create } from "zustand"
import type { Product } from "../types"

interface CartItem {
    product: Product
    quantity: number
}

interface CartState {
    items: CartItem[]
    addItem: (product: Product) => void
    removeItem: (productId: string) => void
    increaseQuantity: (productId: string) => void
    decreaseQuantity: (productId: string) => void
    clearCart: () => void
    totalAmount: () => number
}

export const useCartStore = create<CartState>((set, get) => ({
    items: [],

    addItem: (product) => {
        const items = get().items
        const existing = items.find(item => item.product._id === product._id)
        if (existing) {
            set({ items: items.map(item =>
                item.product._id === product._id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )})
        } else {
            set({ items: [...items, { product, quantity: 1 }] })
        }
    },

    removeItem: (productId) => {
        set({ items: get().items.filter(item => item.product._id !== productId) })
    },

    increaseQuantity: (productId) => {
        set({ items: get().items.map(item =>
            item.product._id === productId
                ? { ...item, quantity: item.quantity + 1 }
                : item
        )})
    },

    decreaseQuantity: (productId) => {
        set({ items: get().items.map(item =>
            item.product._id === productId && item.quantity > 1
                ? { ...item, quantity: item.quantity - 1 }
                : item
        )})
    },

    clearCart: () => set({ items: [] }),

    totalAmount: () => {
        return get().items.reduce((total, item) => 
            total + item.product.price * item.quantity, 0
        )
    }
}))
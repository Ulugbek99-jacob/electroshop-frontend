export interface User {
    _id: string
    name: string
    email: string
    role: "customer" | "admin"
    phone?: string
    address?: string
}

export interface Product {
    _id: string
    name: string
    slug: string
    description: string
    price: number
    stock: number
    brand: string
    category: Category
    images: string[]
    specs?: Record<string, string>
    isActive: boolean
    isFeatured: boolean
    createdAt: string
}

export interface Category {
    _id: string
    name: string
    slug: string
    description?: string
    image?: string
}

export interface Order {
    _id: string
    user: string
    items: OrderItem[]
    totalAmount: number
    status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled"
    shippingAddress: string
    paymentStatus: "unpaid" | "paid" | "refunded"
    createdAt: string
}

export interface OrderItem {
    product: Product
    quantity: number
    price: number
}

export interface Review {
    _id: string
    user: User
    product: string
    rating: number
    comment: string
    createdAt: string
}
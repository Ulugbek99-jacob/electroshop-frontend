import { useState } from "react"
import { useCartStore } from "../store/cartStore"
import { useNavigate } from "react-router-dom"
import api from "../api/axios"

const Checkout = () => {
    const [address, setAddress] = useState("")
    const { items, totalAmount, clearCart } = useCartStore()
    const navigate = useNavigate()

    const handleOrder = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await api.post("/orders", {
                items: items.map(item => ({
                    product: item.product._id,
                    quantity: item.quantity,
                    price: item.product.price
                })),
                shippingAddress: address,
                totalAmount: totalAmount()
            })
            clearCart()
            navigate("/orders")
        } catch (error) {
            alert("Something went wrong")
        }
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-2xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Checkout</h1>
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-xl font-semibold mb-4">Total: {totalAmount()} $</h3>
                    <form onSubmit={handleOrder} className="flex flex-col gap-4">
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Shipping address"
                            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white py-3 rounded font-semibold"
                        >
                            Place Order
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Checkout
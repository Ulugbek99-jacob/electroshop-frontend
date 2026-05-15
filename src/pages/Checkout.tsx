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
            alert("Xato yuz berdi")
        }
    }

    return (
        <div>
            <h1>Buyurtma berish</h1>
            <h3>Jami: {totalAmount()} $</h3>
            <form onSubmit={handleOrder}>
                <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Yetkazib berish manzili"
                />
                <button type="submit">Buyurtma berish</button>
            </form>
        </div>
    )
}

export default Checkout
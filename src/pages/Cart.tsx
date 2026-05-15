import { useCartStore } from "../store/cartStore"
import { useNavigate } from "react-router-dom"

const Cart = () => {
    const { items, removeItem, increaseQuantity, decreaseQuantity, totalAmount } = useCartStore()
    const navigate = useNavigate()

    if (items.length === 0) {
        return (
            <div>
                <h1>Savat</h1>
                <p>Savat bo'sh</p>
                <button onClick={() => navigate("/products")}>Mahsulotlarga o'tish</button>
            </div>
        )
    }

    return (
        <div>
            <h1>Savat</h1>
            {items.map((item) => (
                <div key={item.product._id}>
                    <h3>{item.product.name}</h3>
                    <p>{item.product.price} $</p>
                    <button onClick={() => decreaseQuantity(item.product._id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item.product._id)}>+</button>
                    <button onClick={() => removeItem(item.product._id)}>O'chirish</button>
                </div>
            ))}
            <h2>Jami: {totalAmount()} $</h2>
            <button onClick={() => navigate("/checkout")}>Buyurtma berish</button>
        </div>
    )
}

export default Cart
import { useCartStore } from "../store/cartStore"
import { useNavigate } from "react-router-dom"

const Cart = () => {
    const { items, removeItem, increaseQuantity, decreaseQuantity, totalAmount } = useCartStore()
    const navigate = useNavigate()

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Cart</h1>
                <p className="text-gray-500 mb-6">Your cart is empty</p>
                <button
                    onClick={() => navigate("/products")}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
                >
                    Go to Products
                </button>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-4xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Cart</h1>
                <div className="flex flex-col gap-4">
                    {items.map((item) => (
                        <div key={item.product._id} className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                {item.product.images?.[0] && (
                                    <img src={item.product.images[0]} alt={item.product.name} className="w-16 h-16 object-cover rounded" />
                                )}
                                <div>
                                    <h3 className="font-semibold text-gray-800">{item.product.name}</h3>
                                    <p className="text-blue-600 font-bold">{item.product.price} $</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={() => decreaseQuantity(item.product._id)} className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded">-</button>
                                <span className="font-semibold">{item.quantity}</span>
                                <button onClick={() => increaseQuantity(item.product._id)} className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded">+</button>
                                <button onClick={() => removeItem(item.product._id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded ml-2">Remove</button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="bg-white rounded-lg shadow p-4 mt-6 flex justify-between items-center">
                    <h2 className="text-xl font-bold">Total: {totalAmount()} $</h2>
                    <button
                        onClick={() => navigate("/checkout")}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded font-semibold"
                    >
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Cart